import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import * as bcrypt from "bcrypt";
import { encryptField } from "@/app/lib/crypto";

const GENDER_MAP: Record<string, string> = {
  male: "MALE",
  female: "FEMALE",
  "prefer-not-to-say": "PREFER_NOT_TO_SAY",
  "prefer not to say": "PREFER_NOT_TO_SAY",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      location,
      age,
      gender,
      shoppingStores,
    } = body;

    if (!username || !password || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "username, password, firstName, lastName, and email are required" },
        { status: 400 }
      );
    }

    const mappedGender = gender ? GENDER_MAP[gender.toLowerCase()] || null : null;

    const user = await prisma.userProfile.create({
      data: {
        firstName,
        lastName,
        email,
        location,
        age: age || undefined,
        gender: mappedGender as any,
        shoppingStores,
        locationEnc: location ? encryptField(String(location)) : undefined,
        ageEnc: age ? encryptField(String(age)) : undefined,
        genderEnc: mappedGender ? encryptField(String(mappedGender)) : undefined,
        shoppingStoresEnc: shoppingStores ? encryptField(String(shoppingStores)) : undefined,
      },
    });

    const SALT_ROUNDS = 10;
    await prisma.userAuth.create({
      data: {
        userId: user.id,
        username,
        passwordHash: await bcrypt.hash(password, SALT_ROUNDS),
      },
    });

    return NextResponse.json({ userId: user.id, firstName: user.firstName }, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      const field = error.meta?.target?.[0] || "field";
      return NextResponse.json(
        { error: `A user with this ${field} already exists` },
        { status: 409 }
      );
    }
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}