import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

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
      flaggedFrom: "ingredients" | "packaging";
      sources?: { title: string; url: string }[];
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
            sources: fi.sources.map((s) => ({ title: s.title, url: s.url })),
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
            (item) => item.toLowerCase().includes(fi.name.toLowerCase()) ||
                     fi.name.toLowerCase().includes(item.toLowerCase())
          );
          if (match) return false;
        }
      }
      for (const up of userPreferences) {
        if (!up.preference) continue;
        const prefName = up.preference.name.toLowerCase();
        const match = altItems.find(
          (item) => item.toLowerCase().includes(prefName) ||
                   prefName.includes(item.toLowerCase())
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