import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// POST /api/users/:userId/ailments
// Saves the user's selected ailments from the Health Conditions page.
// Body: { ailmentSlugs: string[], customEntry?: string }
export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { ailmentSlugs, customEntry } = await request.json();

    // Clear existing
    await prisma.userAilment.deleteMany({ where: { userId } });

    // Save selected ailments
    if (ailmentSlugs?.length) {
      for (const slug of ailmentSlugs) {
        const ailment = await prisma.ailment.findUnique({ where: { slug } });
        if (ailment) {
          await prisma.userAilment.create({
            data: { userId, ailmentId: ailment.id, source: "SELECTED" },
          });
        }
      }
    }

    // Save custom entry if provided
    if (customEntry) {
      await prisma.userAilment.create({
        data: { userId, customEntry, source: "CUSTOM" },
      });
    }

    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error("Error saving ailments:", error);
    return NextResponse.json({ error: "Failed to save ailments" }, { status: 500 });
  }
}