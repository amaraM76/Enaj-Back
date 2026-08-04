import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import {
  scanProduct,
  ailmentsToFlagInputs,
  preferencesToFlagInputs,
  journalEntriesToFlagInputs,
} from "@/app/lib/scan-product";

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
    const isAll = category === "all";
    const categoryEnum = isAll ? null : VALID_CATEGORIES[category];

    if (!isAll && !categoryEnum) {
      return NextResponse.json(
        { error: `Invalid category. Valid: all, ${Object.keys(VALID_CATEGORIES).join(", ")}` },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const brand = searchParams.get("brand");

    const products = await prisma.product.findMany({
      where: {
        ...(categoryEnum && { category: categoryEnum as any }),
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

    const userJournalEntries = await prisma.userJournalEntry.findMany({
      where: { userId, conditionId: { not: null } },
      include: { condition: true },
    });

    const flagSources = {
      ailments: ailmentsToFlagInputs(userAilments),
      preferences: preferencesToFlagInputs(userPreferences),
      journalEntries: journalEntriesToFlagInputs(userJournalEntries),
    };

    const productsWithScan = products.map((product) => {
      const flaggedIngredients = scanProduct(product, flagSources);
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
