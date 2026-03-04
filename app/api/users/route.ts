import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// POST /api/users
// Creates a new user profile during onboarding.
// Body: { firstName, lastName, email, location, age, gender, shoppingStores }
// Returns the created user with their ID.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, location, age, gender, shoppingStores } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "firstName, lastName, and email are required" },
        { status: 400 }
      );
    }

    const user = await prisma.userProfile.create({
      data: { firstName, lastName, email, location, age, gender, shoppingStores },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}