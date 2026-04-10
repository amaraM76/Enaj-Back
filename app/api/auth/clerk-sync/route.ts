// import { NextResponse } from "next/server";
// import { prisma } from "@/app/lib/prisma";

// export async function OPTIONS() {
//   return NextResponse.json({}, {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     }
//   })
// }

// export async function POST(request: Request) {
//   const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//   }

//   try {
//     const { clerkId, firstName, lastName, email } = await request.json()

//     if (!clerkId || !email) {
//       return NextResponse.json(
//         { error: 'clerkId and email are required' },
//         { status: 400, headers }
//       )
//     }

//     // Check if user already exists by clerkId
//     const existingAuth = await prisma.userAuth.findUnique({
//       where: { clerkId },
//       include: { user: true },
//     })

//     if (existingAuth) {
//       return NextResponse.json({ user: existingAuth.user }, { headers })
//     }

//     // Create new user directly
//     const newProfile = await prisma.userProfile.create({
//       data: {
//         firstName: firstName || '',
//         lastName: lastName || '',
//         email,
//         auth: {
//           create: { clerkId },
//         },
//       },
//     })

//     return NextResponse.json({ user: newProfile }, { status: 201, headers })
//   } catch (error) {
//     console.error('clerk-sync error:', error)
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Gender } from "@prisma/client";

const GENDER_MAP: Record<string, Gender> = {
  male: Gender.MALE,
  female: Gender.FEMALE,
  "prefer-not-to-say": Gender.PREFER_NOT_TO_SAY,
  "prefer not to say": Gender.PREFER_NOT_TO_SAY,
};

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }
  });
}

export async function POST(request: Request) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    const {
      clerkId,
      firstName,
      lastName,
      email,
      location,
      age,
      gender,
      shoppingStores,
    } = await request.json();

    if (!clerkId || !email) {
      return NextResponse.json(
        { error: "clerkId and email are required" },
        { status: 400, headers }
      );
    }

    const normalizedGender =
      typeof gender === "string" ? GENDER_MAP[gender.toLowerCase()] ?? null : null;

    const parsedAge =
      age === undefined || age === null || age === ""
        ? null
        : typeof age === "number"
          ? age
          : Number.parseInt(age, 10);

    const safeAge = Number.isNaN(parsedAge) ? null : parsedAge;

    // 1. Already linked by Clerk ID
    const existingAuth = await prisma.userAuth.findUnique({
      where: { clerkId },
      include: { user: true },
    });

    if (existingAuth) {
      const updatedUser = await prisma.userProfile.update({
        where: { id: existingAuth.user.id },
        data: {
          firstName: firstName ?? undefined,
          lastName: lastName ?? undefined,
          location: location ?? undefined,
          age: safeAge,
          gender: normalizedGender,
          shoppingStores: shoppingStores ?? undefined,
        },
      });

      return NextResponse.json({ user: updatedUser }, { headers });
    }

    // 2. Existing profile by email — link Clerk instead of creating duplicate
    const existingProfile = await prisma.userProfile.findUnique({
      where: { email },
    });

    if (existingProfile) {
      await prisma.userAuth.create({
        data: {
          clerkId,
          userId: existingProfile.id,
        },
      });

      const updatedUser = await prisma.userProfile.update({
        where: { id: existingProfile.id },
        data: {
          firstName: firstName ?? undefined,
          lastName: lastName ?? undefined,
          location: location ?? undefined,
          age: safeAge,
          gender: normalizedGender,
          shoppingStores: shoppingStores ?? undefined,
        },
      });

      return NextResponse.json({ user: updatedUser }, { headers });
    }

    // 3. Brand new profile
    const newProfile = await prisma.userProfile.create({
      data: {
        firstName: firstName || "",
        lastName: lastName || "",
        email,
        location: location || null,
        age: safeAge,
        gender: normalizedGender,
        shoppingStores: shoppingStores || null,
        auth: {
          create: { clerkId },
        },
      },
    });

    return NextResponse.json({ user: newProfile }, { status: 201, headers });
  } catch (error) {
    console.error("clerk-sync error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    );
  }
}