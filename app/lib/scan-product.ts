// ==========================================
// Shared product-scan matching logic
// ==========================================
// Flags a product's ingredients/packaging/allergens against a user's
// active ailments, preferences, and journal entries. Ailments match on
// their exact flagged-ingredient name; preferences and journal entries
// match via keyword expansion (PREFERENCE_INGREDIENT_MAP /
// JOURNAL_INGREDIENT_MAP) so broad category terms still catch real
// ingredient text. Later passes skip items already flagged by an
// earlier pass (ailment > preference > journal) to avoid duplicate
// flags for the same underlying product item.
// ==========================================

import { PREFERENCE_INGREDIENT_MAP, PREFERENCE_EXCLUSIONS } from "@/app/lib/preference-ingredients";
import { JOURNAL_INGREDIENT_MAP } from "@/app/lib/journal-ingredients";

export type ScanFlagSource = "ailment" | "preference" | "journal";

export interface ScanFlaggedIngredient {
  ingredient: string;
  reason: string;
  source: ScanFlagSource;
  sourceName: string;
  sourceSlug: string;
  flaggedFrom: "ingredients" | "packaging" | "allergens";
  sources?: { title: string; url: string }[];
}

export interface ScannableProduct {
  ingredients: string[];
  packaging?: string[] | null;
  allergens?: string[] | null;
}

type ProductItem = { name: string; from: "ingredients" | "packaging" | "allergens" };

export interface AilmentFlagInput {
  sourceName: string;
  sourceSlug: string;
  flaggedIngredients: {
    name: string;
    reason: string;
    sources?: { title: string; url: string }[];
  }[];
}

export interface PreferenceFlagInput {
  sourceName: string;
  sourceSlug: string;
  reason: string;
}

export interface JournalFlagInput {
  sourceName: string;
  sourceSlug: string;
  whatWeMonitor: {
    ingredient: string;
    reason: string;
    sources?: { title: string; url: string }[];
  }[];
}

function buildProductItems(product: ScannableProduct): ProductItem[] {
  return [
    ...product.ingredients.map((i) => ({ name: i, from: "ingredients" as const })),
    ...(product.packaging || []).map((p) => ({ name: p, from: "packaging" as const })),
    ...(product.allergens || []).map((a) => ({ name: a, from: "allergens" as const })),
  ];
}

export function scanProduct(
  product: ScannableProduct,
  sources: {
    ailments: AilmentFlagInput[];
    preferences: PreferenceFlagInput[];
    journalEntries: JournalFlagInput[];
  }
): ScanFlaggedIngredient[] {
  const allProductItems = buildProductItems(product);
  const flaggedIngredients: ScanFlaggedIngredient[] = [];
  const flaggedNames = new Set<string>();

  for (const ailment of sources.ailments) {
    for (const fi of ailment.flaggedIngredients) {
      const match = allProductItems.find((item) =>
        item.name.toLowerCase().includes(fi.name.toLowerCase())
      );
      if (match) {
        flaggedIngredients.push({
          ingredient: fi.name,
          reason: fi.reason,
          source: "ailment",
          sourceName: ailment.sourceName,
          sourceSlug: ailment.sourceSlug,
          flaggedFrom: match.from,
          sources: fi.sources,
        });
        flaggedNames.add(match.name.toLowerCase());
      }
    }
  }

  for (const pref of sources.preferences) {
    const keywords = PREFERENCE_INGREDIENT_MAP[pref.sourceName] || [pref.sourceName.toLowerCase()];
    const exclusions = (PREFERENCE_EXCLUSIONS[pref.sourceName] || []).map((e) => e.toLowerCase());
    const flaggedInThisPass = new Set<string>();

    for (const keyword of keywords) {
      const kw = keyword.toLowerCase();
      for (const item of allProductItems) {
        const itemLower = item.name.toLowerCase();
        if (
          itemLower.includes(kw) &&
          !flaggedInThisPass.has(item.name) &&
          !flaggedNames.has(itemLower) &&
          !exclusions.some((ex) => itemLower.includes(ex))
        ) {
          flaggedInThisPass.add(item.name);
          flaggedIngredients.push({
            ingredient: item.name,
            reason: pref.reason,
            source: "preference",
            sourceName: pref.sourceName,
            sourceSlug: pref.sourceSlug,
            flaggedFrom: item.from,
          });
        }
      }
    }
    flaggedInThisPass.forEach((name) => flaggedNames.add(name.toLowerCase()));
  }

  for (const entry of sources.journalEntries) {
    for (const monitor of entry.whatWeMonitor) {
      const keywords = JOURNAL_INGREDIENT_MAP[monitor.ingredient] || [monitor.ingredient.toLowerCase()];
      const flaggedInThisPass = new Set<string>();

      for (const keyword of keywords) {
        const kw = keyword.toLowerCase();
        for (const item of allProductItems) {
          const itemLower = item.name.toLowerCase();
          if (
            itemLower.includes(kw) &&
            !flaggedInThisPass.has(item.name) &&
            !flaggedNames.has(itemLower)
          ) {
            flaggedInThisPass.add(item.name);
            flaggedIngredients.push({
              ingredient: item.name,
              reason: monitor.reason,
              source: "journal",
              sourceName: entry.sourceName,
              sourceSlug: entry.sourceSlug,
              flaggedFrom: item.from,
              sources: monitor.sources,
            });
          }
        }
      }
      flaggedInThisPass.forEach((name) => flaggedNames.add(name.toLowerCase()));
    }
  }

  return flaggedIngredients;
}

// ── Adapters: Prisma query results → scanProduct() inputs ──

export function ailmentsToFlagInputs(
  userAilments: {
    ailment: {
      name: string;
      slug: string;
      flaggedIngredients: {
        name: string;
        reason: string;
        sources?: { title: string; url: string }[];
      }[];
    } | null;
  }[]
): AilmentFlagInput[] {
  return userAilments
    .filter((ua): ua is typeof ua & { ailment: NonNullable<typeof ua.ailment> } => !!ua.ailment)
    .map((ua) => ({
      sourceName: ua.ailment.name,
      sourceSlug: ua.ailment.slug,
      flaggedIngredients: ua.ailment.flaggedIngredients,
    }));
}

export function preferencesToFlagInputs(
  userPreferences: {
    preference: { name: string; slug: string; description: string } | null;
  }[]
): PreferenceFlagInput[] {
  return userPreferences
    .filter((up): up is typeof up & { preference: NonNullable<typeof up.preference> } => !!up.preference)
    .map((up) => ({
      sourceName: up.preference.name,
      sourceSlug: up.preference.slug,
      reason: up.preference.description,
    }));
}

export function journalEntriesToFlagInputs(
  userJournalEntries: {
    condition: { name: string; slug: string; whatWeMonitor: unknown } | null;
  }[]
): JournalFlagInput[] {
  return userJournalEntries
    .filter((uje): uje is typeof uje & { condition: NonNullable<typeof uje.condition> } => !!uje.condition)
    .map((uje) => ({
      sourceName: uje.condition.name,
      sourceSlug: uje.condition.slug,
      whatWeMonitor: (uje.condition.whatWeMonitor as JournalFlagInput["whatWeMonitor"]) || [],
    }));
}
