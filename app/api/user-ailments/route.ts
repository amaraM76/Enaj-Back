import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { encryptField, blindIndex } from "@/app/lib/crypto";

export async function POST(request: Request) {
  try {
    const { userId, ailmentSlugs, customEntry } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
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
    await prisma.userAilment.deleteMany({ where: { userId: dbUserId } });
    let savedCount = 0;
    if (ailmentSlugs?.length) {
      for (const slug of ailmentSlugs) {
        const ailment = await prisma.ailment.findUnique({ where: { slug } });
        if (ailment) {
          await prisma.userAilment.create({
            data: {
              userId: dbUserId,
              ailmentId: ailment.id,
              ailmentIdEnc: encryptField(ailment.id),
              ailmentIdBlind: blindIndex(`${dbUserId}:${ailment.id}`),
              source: "SELECTED",
            },
          });
          savedCount++;
        }
      }
    }
    if (customEntry) {
      await prisma.userAilment.create({
        data: {
          userId: dbUserId,
          customEntry,
          customEntryEnc: encryptField(customEntry),
          source: "CUSTOM",
        },
      });
      savedCount++;
    }
    return NextResponse.json({ saved: savedCount });
  } catch (error) {
    console.error("Error saving ailments:", error);
    return NextResponse.json({ error: "Failed to save ailments" }, { status: 500 });
  }
}