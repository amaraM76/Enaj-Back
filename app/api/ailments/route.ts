import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET /api/ailments
// Returns all ailment categories with their ailments, flagged
// ingredients (with sources), and linked preferences.
// This powers the Health Conditions page during onboarding.
export async function GET() {
  try {
    const categories = await prisma.ailmentCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        ailments: {
          orderBy: { name: "asc" },
          include: {
            flaggedIngredients: {
              include: { sources: true },
            },
            linkedPreferences: {
              include: { preference: true },
            },
            education: true,
          },
        },
      },
    });

    // Transform to match frontend shape
    const result = categories.map((cat) => ({
      id: cat.slug,
      label: cat.label,
      ailments: cat.ailments.map((a) => ({
        id: a.slug,
        name: a.name,
        description: a.education?.description ?? undefined,
        generalSources: (a.education?.generalSources as any) ?? [],
        ingredientInfo: (a.education?.ingredientInfo as any) ?? {},
        linkedPreferences: a.linkedPreferences.map((lp) => lp.preference.slug),
        flaggedIngredients: a.flaggedIngredients.map((fi) => ({
          id: fi.slug,
          name: fi.name,
          reason: fi.reason,
          sources: fi.sources.map((s) => ({ title: s.title, url: s.url })),
        })),
      })),
    }));
    
    return NextResponse.json({ categories: result });
  } catch (error) {
    console.error("Error fetching ailments:", error);
    return NextResponse.json({ error: "Failed to fetch ailments" }, { status: 500 });
  }
}
