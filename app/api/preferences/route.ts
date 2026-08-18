import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { encryptField, blindIndex } from "@/app/lib/crypto";

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
          include: { education: true },
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
        whatItIs: p.education?.whatItIs ?? undefined,
        commonlyFoundIn: p.education?.commonlyFoundIn ?? [],
        whyPeopleAvoid: p.education?.whyPeopleAvoid ?? undefined,
        educationSources: (p.education?.sources as any) ?? [],
      })),
    }));
    
    return NextResponse.json({ categories: result });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json({ error: "Failed to fetch preferences" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, preferences } = body;
    if (!userId || !preferences) {
      return NextResponse.json({ error: "userId and preferences are required" }, { status: 400 });
    }

    // Resolve Clerk ID to database UUID if needed
    let dbUserId = userId
    if (userId.startsWith('user_')) {
      const authRecord = await prisma.userAuth.findUnique({
        where: { clerkId: userId },
        select: { userId: true }
      })
      if (!authRecord) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      dbUserId = authRecord.userId
    }

    // Delete existing and replace
    await prisma.userPreference.deleteMany({ where: { userId: dbUserId } });
    let savedCount = 0;
    for (const pref of preferences) {
      if (pref.preferenceSlug) {
        const found = await prisma.preference.findUnique({ where: { slug: pref.preferenceSlug } });
        if (found) {
          await prisma.userPreference.create({
            data: {
              userId: dbUserId,
              preferenceId: found.id,
              preferenceIdEnc: encryptField(found.id),
              preferenceIdBlind: blindIndex(`${dbUserId}:${found.id}`),
              source: pref.source,
            },
          });
          savedCount++;
        }
      } else if (pref.customEntry) {
        await prisma.userPreference.create({
          data: {
            userId: dbUserId,
            customEntry: pref.customEntry,
            customEntryEnc: encryptField(pref.customEntry),
            source: "CUSTOM",
          },
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
