import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET /api/products/:category/:slug/scan?userId=xxx
// Scans a specific product against the user's ailments and preferences.
// Returns the ScanResult shape matching the frontend interface:
// { product, isRecommended, flaggedIngredients, alternatives }
export async function GET(
  request: Request,
  { params }: { params: { category: string; slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId query parameter is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get user's ailments with flagged ingredients
    const userAilments = await prisma.userAilment.findMany({
      where: { userId, ailmentId: { not: null } },
      include: {
        ailment: {
          include: { flaggedIngredients: { include: { sources: true } } },
        },
      },
    });

    // Get user's preferences
    const userPreferences = await prisma.userPreference.findMany({
      where: { userId },
      include: { preference: true },
    });

    // Build flagged ingredients list
    const flaggedIngredients: {
      ingredient: string;
      reason: string;
      source: "ailment" | "preference";
      sourceName: string;
      sources?: { title: string; url: string }[];
    }[] = [];

    // Check ailment flagged ingredients
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
            sources: fi.sources.map((s) => ({ title: s.title, url: s.url })),
          });
        }
      }
    }

    // Check preference-based flags
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

    // Find alternatives in same category with no flags
    const allInCategory = await prisma.product.findMany({
      where: {
        category: product.category,
        isActive: true,
        id: { not: product.id },
      },
    });

    const alternatives = allInCategory.filter((alt) => {
      // Check if this alternative has zero overlap with user's flagged ingredients
      for (const ua of userAilments) {
        if (!ua.ailment) continue;
        for (const fi of ua.ailment.flaggedIngredients) {
          const match = alt.ingredients.find(
            (ing) => ing.toLowerCase().includes(fi.name.toLowerCase()) ||
                     fi.name.toLowerCase().includes(ing.toLowerCase())
          );
          if (match) return false;
        }
      }
      for (const up of userPreferences) {
        if (!up.preference) continue;
        const prefName = up.preference.name.toLowerCase();
        const match = alt.ingredients.find(
          (ing) => ing.toLowerCase().includes(prefName) ||
                   prefName.includes(ing.toLowerCase())
        );
        if (match) return false;
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
