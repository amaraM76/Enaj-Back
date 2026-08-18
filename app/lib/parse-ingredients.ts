// ==========================================
// Shared ingredient-text parser
// ==========================================
// Canonical TypeScript port of the `parseIngredientText(text)` function
// that was duplicated across the browser extension's content-amazon.js,
// content-sephora.js, content-target.js, content-ulta.js, and
// content-walmart.js scripts. This is based primarily on the
// content-amazon.js and content-walmart.js versions, which had the most
// elaborate/battle-tested cleaning logic; overlapping rules from the
// other site scripts are folded in where they don't conflict.
//
// Takes a raw "Ingredients: Water, Glycerin, ..." style string (as
// scraped from a retailer page, or pasted directly by a user) and
// returns a clean, deduplicated array of ingredient names:
//   - strips "Active/Inactive/Other ingredients:" and "May Contain:"
//     labels
//   - strips percentages ("5%", "(0.5%)")
//   - strips F.I.L. (Fragrance Ingredient List) notes
//   - flattens parenthetical/bracketed ingredient info into the list
//   - splits on bullets, commas, semicolons, slashes, or (as a last
//     resort) capital-letter word boundaries
//   - filters out empty/overlong fragments, pure numbers, stray
//     conjunctions, and common non-ingredient marketing/safety copy
//   - deduplicates while preserving order
//
// Do not add new parsing rules here without also confirming they match
// (or intentionally improve on) the extension's proven-out behavior --
// this file is meant to become the single source of truth that the
// extension itself will eventually import instead of keeping six
// near-identical copies.
// ==========================================

export function parseIngredientText(text: string): string[] {
  if (!text) return [];

  let cleaned = text.trim();

  // Remove OTC-style "Purpose: ..." headings (Drug Facts panels).
  cleaned = cleaned.replace(/\.?\s*Purpose\s*:[^.]+\./gi, "");

  // Normalize "Inactive/Active/Other ingredients:" and "May Contain:"
  // labels. Inactive/Other/May-Contain become a comma so the list
  // doesn't get glued together; Active is just dropped.
  cleaned = cleaned.replace(/Inactive\s+ingredients?\s*:/gi, ",");
  cleaned = cleaned.replace(/Active\s+ingredients?\s*:/gi, "");
  cleaned = cleaned.replace(/Other\s+ingredients?\s*:/gi, ",");
  cleaned = cleaned.replace(/May\s+Contain[^:]*:/gi, ",");
  cleaned = cleaned.replace(/\+\/-\s*MAY CONTAIN\s*\/?/gi, ", ");
  cleaned = cleaned.replace(/MAY CONTAIN\s*\/?/gi, ", ");

  // Strip a leading "Ingredients:" label, including retailer-specific
  // forms like "XYZ INGREDIENTS:" or "ACTIVE INGREDIENTS:".
  cleaned = cleaned.replace(/^[A-Z0-9]+\s*INGREDIENTS?\s*[:\-]?\s*/i, "");
  cleaned = cleaned.replace(/^ACTIVE INGREDIENTS?\s*[:\-]?\s*/i, "");
  cleaned = cleaned.replace(/^[\s*]*ingredients?\s*[:\-]?\s*/i, "");

  // Remove percentages while keeping ingredient names, e.g.
  // "Retinol (0.5%)" -> "Retinol", "<5% Glycerin" -> "Glycerin".
  cleaned = cleaned.replace(/<?\s*\(?\s*\d+(?:\.\d+)?\s*%\s*\)?/g, "");

  // Remove F.I.L. (Fragrance Ingredient List) notes.
  cleaned = cleaned.replace(/\(F\.I\.L\.[^)]*\)/gi, "");

  // Flatten useful parenthetical/bracketed ingredient information into
  // the flat list rather than discarding it.
  cleaned = cleaned.replace(/\s*[([]/g, ", ");
  cleaned = cleaned.replace(/[)\]]/g, "");

  let items: string[];

  if (cleaned.includes("•")) {
    items = cleaned.split(/[•]/);
  } else if (cleaned.includes(",") || cleaned.includes(";") || cleaned.includes("/")) {
    items = cleaned.split(/[,;/]|\.\s+/);
  } else {
    // Last resort: split on capital-letter word boundaries (handles
    // ingredient lists with no punctuation at all). If that doesn't
    // yield a plausible list, treat the whole string as one item.
    items = cleaned.split(/\s+(?=[A-Z]{2})/);
    if (items.length < 3) items = [cleaned];
  }

  return items
    .map((item) => item.replace(/^\s*[-–—:*•·/]\s*/, ""))
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter((item) => item.length > 1 && item.length < 100)
    .filter((item) => !/^\d+$/.test(item))
    .filter((item) => !/^(and|or|with|from|as|the|a|an)$/i.test(item))
    .filter(
      (item) =>
        !/^(any oil will|statements regarding|cool dry|do not leave|do not heat|safety information|legal disclaimer|directions|from the manufacturer)/i.test(
          item
        )
    )
    .filter(
      (item) =>
        !/biodiversity|genetic engineering|conserve|synthetic materials|artificial colours|preservatives|flavours or/i.test(
          item
        )
    )
    .filter((value, index, self) => self.indexOf(value) === index);
}
