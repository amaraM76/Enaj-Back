import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId, ailmentSlugs, customEntry } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Delete existing and replace
    await prisma.userAilment.deleteMany({ where: { userId } });

    let savedCount = 0;

    if (ailmentSlugs?.length) {
      for (const slug of ailmentSlugs) {
        const ailment = await prisma.ailment.findUnique({ where: { slug } });
        if (ailment) {
          await prisma.userAilment.create({
            data: { userId, ailmentId: ailment.id, source: "SELECTED" },
          });
          savedCount++;
        }
      }
    }

    if (customEntry) {
      await prisma.userAilment.create({
        data: { userId, customEntry, source: "CUSTOM" },
      });
      savedCount++;
    }

    return NextResponse.json({ saved: savedCount });
  } catch (error) {
    console.error("Error saving ailments:", error);
    return NextResponse.json({ error: "Failed to save ailments" }, { status: 500 });
  }
}