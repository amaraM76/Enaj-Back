import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET /api/journal
// Returns all journal categories with their conditions, including the
// monitored ingredients, fun facts, tips, and sources for each.
// Powers the Weekly Health Journal tab and onboarding step.
export async function GET() {
  try {
    const categories = await prisma.journalCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        conditions: {
          orderBy: { name: "asc" },
        },
      },
    });

    // Transform to match frontend shape
    const result = categories.map((cat) => ({
      id: cat.slug,
      label: cat.label,
      icon: cat.icon,
      conditions: cat.conditions.map((c) => ({
        id: c.slug,
        name: c.name,
        category: cat.label,
        description: c.description,
        whatWeMonitor: c.whatWeMonitor,
        funFacts: c.funFacts,
        tips: c.tips,
        generalSources: c.generalSources,
      })),
    }));

    return NextResponse.json({ categories: result });
  } catch (error) {
    console.error("Error fetching journal:", error);
    return NextResponse.json({ error: "Failed to fetch journal" }, { status: 500 });
  }
}