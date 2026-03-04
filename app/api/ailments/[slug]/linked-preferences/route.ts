import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET /api/ailments/:slug/linked-preferences
// Returns the preferences that should be auto-selected on the
// Preferences page when this ailment is selected.
// For example, Rosacea returns: no-fragrance, no-alcohol-skin, no-sulfates
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const ailment = await prisma.ailment.findUnique({
      where: { slug },
      include: {
        linkedPreferences: {
          include: {
            preference: {
              include: { category: true },
            },
          },
        },
      },
    });

    if (!ailment) {
      return NextResponse.json({ error: "Ailment not found" }, { status: 404 });
    }

    const preferences = ailment.linkedPreferences.map((lp) => ({
      id: lp.preference.slug,
      name: lp.preference.name,
      description: lp.preference.description,
      category: lp.preference.category.label,
    }));

    return NextResponse.json({
      ailment: ailment.name,
      linkedPreferences: preferences,
    });
  } catch (error) {
    console.error("Error fetching linked preferences:", error);
    return NextResponse.json({ error: "Failed to fetch linked preferences" }, { status: 500 });
  }
}
