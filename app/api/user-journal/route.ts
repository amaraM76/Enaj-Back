import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// POST /api/user-journal
// Replaces all journal entries for a user with the provided condition
// slugs (plus an optional custom entry).
// Body: { userId: string, journalSlugs: string[], customEntry?: string }
export async function POST(request: Request) {
  try {
    const { userId, journalSlugs, customEntry } = await request.json();
    if (!userId || !Array.isArray(journalSlugs)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
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
    await prisma.userJournalEntry.deleteMany({ where: { userId: dbUserId } });
    let savedCount = 0;
    for (const slug of journalSlugs) {
      const condition = await prisma.journalCondition.findUnique({ where: { slug } });
      if (condition) {
        await prisma.userJournalEntry.create({
          data: { userId: dbUserId, conditionId: condition.id, source: "SELECTED" },
        });
        savedCount++;
      }
    }
    if (customEntry) {
      await prisma.userJournalEntry.create({
        data: { userId: dbUserId, customEntry, source: "CUSTOM" },
      });
      savedCount++;
    }
    return NextResponse.json({ saved: true, count: savedCount });
  } catch (error) {
    console.error("journal save error:", error);
    return NextResponse.json({ error: "Failed to save journal" }, { status: 500 });
  }
}
