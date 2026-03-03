import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET /api/preferences
// Returns all preference categories with their preferences.
// Includes the description field for the info icon popups.
// This powers the Preferences page during onboarding.
export async function GET() {
  try {
    const categories = await prisma.preferenceCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        preferences: {
          orderBy: { name: "asc" },
        },
      },
    });

    // Transform to match frontend shape
    const result = categories.map((cat) => ({
      id: cat.slug,
      label: cat.label,
      description: cat.description,
      preferences: cat.preferences.map((p) => ({
        id: p.slug,
        name: p.name,
        description: p.description,
      })),
    }));

    return NextResponse.json({ categories: result });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json({ error: "Failed to fetch preferences" }, { status: 500 });
  }
}

// POST /api/preferences
// Save the user's confirmed preference selections from the Preferences page.
// Replaces all existing preferences for this user.
// Body: { userId, preferences: [{ preferenceSlug, source, customEntry? }] }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, preferences } = body;

    if (!userId || !preferences) {
      return NextResponse.json({ error: "userId and preferences are required" }, { status: 400 });
    }

    // Delete existing and replace
    await prisma.userPreference.deleteMany({ where: { userId } });

    let savedCount = 0;
    for (const pref of preferences) {
      if (pref.preferenceSlug) {
        // Predefined preference
        const found = await prisma.preference.findUnique({ where: { slug: pref.preferenceSlug } });
        if (found) {
          await prisma.userPreference.create({
            data: { userId, preferenceId: found.id, source: pref.source },
          });
          savedCount++;
        }
      } else if (pref.customEntry) {
        // Custom preference typed in by user
        await prisma.userPreference.create({
          data: { userId, customEntry: pref.customEntry, source: "CUSTOM" },
        });
        savedCount++;
      }
    }

    return NextResponse.json({ saved: savedCount });
  } catch (error) {
    console.error("Error saving preferences:", error);
    return NextResponse.json({ error: "Failed to save preferences" }, { status: 500 });
  }
}
