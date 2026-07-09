import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// POST /api/user-journal
// Replaces all journal entries for a user with the provided slugs.
// Body: { userId: string, journalSlugs: string[] }
export async function POST(request: Request) {
  try {
    const { userId, journalSlugs } = await request.json();

    if (!userId || !Array.isArray(journalSlugs)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Resolve clerkId to internal userId if needed
    let internalUserId = userId;
    const directUser = await prisma.userProfile.findUnique({ where: { id: userId } });
    if (!directUser) {
      const authRecord = await prisma.userAuth.findUnique({ where: { clerkId: userId } });
      if (!authRecord) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      internalUserId = authRecord.userId;
    }

    // Delete all existing journal entries for this user
    await prisma.journalEntry.deleteMany({ where: { userId: internalUserId } });

    // Insert new ones
    if (journalSlugs.length > 0) {
      await prisma.journalEntry.createMany({
        data: journalSlugs.map((conditionSlug: string) => ({
          userId: internalUserId,
          conditionSlug,
        })),
        skipDuplicates: true,
      });
    }

    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error("journal save error:", error);
    return NextResponse.json({ error: "Failed to save journal" }, { status: 500 });
  }
}