import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { PREFERENCE_INGREDIENT_MAP, PREFERENCE_EXCLUSIONS } from "@/app/lib/preference-ingredients";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await params;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId query parameter is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { slug: slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const userAilments = await prisma.userAilment.findMany({
      where: { userId, ailmentId: { not: null } },
      include: {
        ailment: {
          include: { flaggedIngredients: { include: { sources: true } } },
        },
      },
    });

    const userPreferences = await prisma.userPreference.findMany({
      where: { userId },
      include: { preference: true },
    });

    const flaggedIngredients: {
      ingredient: string;
      reason: string;
      source: "ailment" | "preference";
      sourceName: string;
      flaggedFrom: "ingredients" | "packaging" | "allergens";
      sources?: { title: string; url: string }[];
    }[] = [];

    const allProductItems = [
      ...product.ingredients.map((i) => ({ name: i, from: "ingredients" as const })),
      ...(product.packaging || []).map((p) => ({ name: p, from: "packaging" as const })),
      ...(product.allergens || []).map((a) => ({ name: a, from: "allergens" as const })),
    ];

    for (const ua of userAilments) {
      if (!ua.ailment) continue;
      for (const fi of ua.ailment.flaggedIngredients) {
        const match = allProductItems.find(
          (item) => item.name.toLowerCase().includes(fi.name.toLowerCase()) ||
                   fi.name.toLowerCase().includes(item.name.toLowerCase())
        );
        if (match) {
          flaggedIngredients.push({
            ingredient: fi.name,
            reason: fi.reason,
            source: "ailment",
            sourceName: ua.ailment.name,
            flaggedFrom: match.from,
            sources: fi.sources.map((s) => ({ title: s.title, url: s.url })),
          });
        }
      }
    }

    for (const up of userPreferences) {
      if (!up.preference) continue;
      const prefName = up.preference.name;
      const keywords = PREFERENCE_INGREDIENT_MAP[prefName] || [prefName.toLowerCase()];
      const alreadyFlagged = new Set<string>();
      
      const exclusions = (PREFERENCE_EXCLUSIONS[prefName] || []).map(e => e.toLowerCase());
      
      for (const keyword of keywords) {
        const kw = keyword.toLowerCase();
        for (const item of allProductItems) {
          const itemLower = item.name.toLowerCase();
          // Check if this item matches the keyword
          if (itemLower.includes(kw) && !alreadyFlagged.has(item.name)) {
            // Check it's not an excluded term (e.g. "shea butter" excluded from dairy "butter")
            const isExcluded = exclusions.some(ex => itemLower.includes(ex));
            if (!isExcluded) {
              alreadyFlagged.add(item.name);
              flaggedIngredients.push({
                ingredient: item.name,
                reason: up.preference.description,
                source: "preference",
                sourceName: up.preference.name,
                flaggedFrom: item.from,
              });
            }
          }
        }
      }
    }

    const allInCategory = await prisma.product.findMany({
      where: {
        category: product.category,
        isActive: true,
        id: { not: product.id },
      },
    });

    const alternatives = allInCategory.filter((alt) => {
      const altItems = [...alt.ingredients, ...(alt.packaging || [])];
      for (const ua of userAilments) {
        if (!ua.ailment) continue;
        for (const fi of ua.ailment.flaggedIngredients) {
          const match = altItems.find(
            (item) => item.toLowerCase().includes(fi.name.toLowerCase())
          );
          if (match) return false;
        }
      }
      for (const up of userPreferences) {
        if (!up.preference) continue;
        const prefName = up.preference.name;
        const keywords = PREFERENCE_INGREDIENT_MAP[prefName] || [prefName.toLowerCase()];
        for (const keyword of keywords) {
          const kw = keyword.toLowerCase();
          const match = altItems.find(
            (item) => item.toLowerCase().includes(kw)
          );
          if (match) return false;
        }
      }
      return true;
    });


    return NextResponse.json({
      product,
      isRecommended: flaggedIngredients.length === 0,
      flaggedIngredients,
      alternatives,
    });
  } catch (error) {
    console.error("Error scanning product:", error);
    return NextResponse.json({ error: "Failed to scan product" }, { status: 500 });
  }
}