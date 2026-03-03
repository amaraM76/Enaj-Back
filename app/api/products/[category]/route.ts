import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

const VALID_CATEGORIES: Record<string, string> = {
  "skin-body": "SKIN_BODY",
  haircare: "HAIRCARE",
  makeup: "MAKEUP",
  food: "FOOD",
  cleaning: "CLEANING",
  fragrance: "FRAGRANCE",
  household: "HOUSEHOLD",
};

// GET /api/products/:category
// Returns products filtered by category.
// If userId is provided, returns scan results: flagged ingredients
// from the user's ailments and preferences, plus alternatives.
//
// Query params:
//   category (path) — skin-body, haircare, makeup, food, cleaning, fragrance, household
//   userId (optional) — include scan warnings from user's ailments & preferences
//   brand (optional) — filter by brand name
//   maxPrice (optional) — filter by max price (strips $ from stored values)
export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const categoryEnum = VALID_CATEGORIES[params.category];

    if (!categoryEnum) {
      return NextResponse.json(
        { error: `Invalid category. Valid: ${Object.keys(VALID_CATEGORIES).join(", ")}` },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const brand = searchParams.get("brand");

    const products = await prisma.product.findMany({
      where: {
        category: categoryEnum as any,
        isActive: true,
        ...(brand && { brand: { equals: brand, mode: "insensitive" } }),
      },
      orderBy: { createdAt: "desc" },
    });

    if (!userId) {
      return NextResponse.json({ products });
    }

    // Get user's ailments with their flagged ingredients
    const userAilments = await prisma.userAilment.findMany({
      where: { userId, ailmentId: { not: null } },
      include: {
        ailment: {
          include: { flaggedIngredients: true },
        },
      },
    });

    // Get user's preferences
    const userPreferences = await prisma.userPreference.findMany({
      where: { userId },
      include: { preference: true },
    });

    // Build scan results for each product
    const productsWithScan = products.map((product) => {
      const flaggedIngredients: {
        ingredient: string;
        reason: string;
        source: "ailment" | "preference";
        sourceName: string;
      }[] = [];

      // Check ailment flagged ingredients against product ingredients
      for (const ua of userAilments) {
        if (!ua.ailment) continue;
        for (const fi of ua.ailment.flaggedIngredients) {
          const match = product.ingredients.find(
            (ing) => ing.toLowerCase().includes(fi.name.toLowerCase()) ||
                     fi.name.toLowerCase().includes(ing.toLowerCase())
          );
          if (match) {
            flaggedIngredients.push({
              ingredient: fi.name,
              reason: fi.reason,
              source: "ailment",
              sourceName: ua.ailment.name,
            });
          }
        }
      }

      // Check preference-based flags against product ingredients
      for (const up of userPreferences) {
        if (!up.preference) continue;
        const prefName = up.preference.name.toLowerCase();
        const match = product.ingredients.find(
          (ing) => ing.toLowerCase().includes(prefName) ||
                   prefName.includes(ing.toLowerCase())
        );
        if (match) {
          flaggedIngredients.push({
            ingredient: match,
            reason: up.preference.description,
            source: "preference",
            sourceName: up.preference.name,
          });
        }
      }

      return {
        ...product,
        isRecommended: flaggedIngredients.length === 0,
        flaggedIngredients,
      };
    });

    // Find alternatives (products in same category with no flags)
    const alternatives = productsWithScan
      .filter((p) => p.isRecommended)
      .map(({ flaggedIngredients: _, isRecommended: __, ...product }) => product);

    return NextResponse.json({
      products: productsWithScan,
      alternatives,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
