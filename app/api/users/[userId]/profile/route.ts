import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

const GENDER_MAP: Record<string, string> = {
  male: "MALE",
  female: "FEMALE",
  "prefer-not-to-say": "PREFER_NOT_TO_SAY",
  "prefer not to say": "PREFER_NOT_TO_SAY",
};

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();
    const { firstName, lastName, email, location, age, gender, shoppingStores } = body;

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

    const updateData: any = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined) updateData.email = email;
    if (location !== undefined) updateData.location = location;
    if (age !== undefined) updateData.age = parseInt(age, 10);
    if (shoppingStores !== undefined) updateData.shoppingStores = shoppingStores;
    if (gender !== undefined) {
      updateData.gender = GENDER_MAP[gender.toLowerCase()] || null;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const user = await prisma.userProfile.update({
      where: { id: dbUserId },
      data: updateData,
    });

    return NextResponse.json({ user });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}