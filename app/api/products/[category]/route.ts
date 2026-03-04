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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const categoryEnum = VALID_CATEGORIES[category];

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
        ...(brand && { brand: { equals: brand, mode: "insensitive" as any } }),
      },
      orderBy: { createdAt: "desc" },
    });

    if (!userId) {
      return NextResponse.json({ products });
    }

    const userAilments = await prisma.userAilment.findMany({
      where: { userId, ailmentId: { not: null } },
      include: {
        ailment: {
          include: { flaggedIngredients: true },
        },
      },
    });

    const userPreferences = await prisma.userPreference.findMany({
      where: { userId },
      include: { preference: true },
    });

    const productsWithScan = products.map((product) => {
      const flaggedIngredients: {
        ingredient: string;
        reason: string;
        source: "ailment" | "preference";
        sourceName: string;
        flaggedFrom: "ingredients" | "packaging";
      }[] = [];

      const allProductItems = [
        ...product.ingredients.map((i) => ({ name: i, from: "ingredients" as const })),
        ...(product.packaging || []).map((p) => ({ name: p, from: "packaging" as const })),
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
            });
          }
        }
      }

      for (const up of userPreferences) {
        if (!up.preference) continue;
        const prefName = up.preference.name.toLowerCase();
        const match = allProductItems.find(
          (item) => item.name.toLowerCase().includes(prefName) ||
                   prefName.includes(item.name.toLowerCase())
        );
        if (match) {
          flaggedIngredients.push({
            ingredient: match.name,
            reason: up.preference.description,
            source: "preference",
            sourceName: up.preference.name,
            flaggedFrom: match.from,
          });
        }
      }

      return {
        ...product,
        isRecommended: flaggedIngredients.length === 0,
        flaggedIngredients,
      };
    });

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