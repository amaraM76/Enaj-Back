import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { encryptField } from "@/app/lib/crypto";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    let user = await prisma.userProfile.findUnique({
      where: { id: userId },
      include: {
        ailments: {
          include: {
            ailment: {
              include: {
                category: true,
                flaggedIngredients: { include: { sources: true } },
              },
            },
          },
        },
        preferences: {
          include: {
            preference: {
              include: { category: true },
            },
          },
        },
        savedProducts: {
          include: { product: true },
        },
        journalEntries: { include: { condition: true } },
      },
    })

    if (!user) {
      const authRecord = await prisma.userAuth.findUnique({
        where: { clerkId: userId },
        include: {
          user: {
            include: {
              ailments: {
                include: {
                  ailment: {
                    include: {
                      category: true,
                      flaggedIngredients: { include: { sources: true } },
                    },
                  },
                },
              },
              preferences: {
                include: {
                  preference: {
                    include: { category: true },
                  },
                },
              },
              savedProducts: {
                include: { product: true },
              },
              journalEntries: { include: { condition: true } },
            },
          },
        },
      })
      user = authRecord?.user ?? null
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const profile = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      location: user.location || "",
      age: user.age || "",
      gender: user.gender || "",
      shoppingStores: user.shoppingStores || "",
      selectedAilments: user.ailments
        .filter((ua) => ua.ailment)
        .map((ua) => ({
          ailment: {
            id: ua.ailment!.slug,
            name: ua.ailment!.name,
            flaggedIngredients: ua.ailment!.flaggedIngredients.map((fi) => ({
              id: fi.slug,
              name: fi.name,
              reason: fi.reason,
              sources: fi.sources.map((s) => ({ title: s.title, url: s.url })),
            })),
          },
          activeIngredients: ua.ailment!.flaggedIngredients.map((fi) => ({
            id: fi.slug,
            name: fi.name,
            reason: fi.reason,
            sources: fi.sources.map((s) => ({ title: s.title, url: s.url })),
          })),
        })),
      selectedPreferences: user.preferences
        .filter((up) => up.preference)
        .map((up) => up.preference!.slug),
      savedProducts: user.savedProducts.map((sp) => ({
        id: sp.product.slug,
        name: sp.product.name,
        brand: sp.product.brand,
        image: sp.product.image || "",
        price: sp.product.price,
        url: sp.product.url || "#",
        ingredients: sp.product.ingredients,
        category: sp.product.category.toLowerCase().replace("_", "-"),
      })),
      journalEntries: user.journalEntries
        .filter((je) => je.condition)
        .map((je) => je.condition!.slug),
      customHealthCondition: user.ailments.find((ua) => ua.customEntry)?.customEntry || undefined,
      customPreference: user.preferences.find((up) => up.customEntry)?.customEntry || undefined,
    };

    return NextResponse.json({ user: profile });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      location,
      age,
      gender,
      shoppingStores,
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required to create or update a user" },
        { status: 400 }
      );
    }

    const GENDER_MAP: Record<string, "MALE" | "FEMALE" | "PREFER_NOT_TO_SAY"> = {
      male: "MALE",
      female: "FEMALE",
      "prefer-not-to-say": "PREFER_NOT_TO_SAY",
      PREFER_NOT_TO_SAY: "PREFER_NOT_TO_SAY",
      MALE: "MALE",
      FEMALE: "FEMALE",
    };

    const mappedGender = gender
      ? GENDER_MAP[String(gender).toLowerCase()] ?? undefined
      : undefined;

    // Dual-write AES-256-GCM encrypted counterparts alongside the
    // plaintext columns until a verified backfill removes the latter.
    const encryptedFields = {
      locationEnc: location !== undefined && location !== null ? encryptField(String(location)) : undefined,
      ageEnc: age !== undefined && age !== null ? encryptField(String(age)) : undefined,
      genderEnc: mappedGender ? encryptField(mappedGender) : undefined,
      shoppingStoresEnc:
        shoppingStores !== undefined && shoppingStores !== null
          ? encryptField(String(shoppingStores))
          : undefined,
    };

    const existingAuth = await prisma.userAuth.findUnique({
      where: { clerkId: userId },
      include: { user: true },
    });

    let user;

    if (existingAuth?.user) {
      user = await prisma.userProfile.update({
        where: { id: existingAuth.user.id },
        data: {
          firstName,
          lastName,
          email,
          location,
          age,
          gender: mappedGender,
          shoppingStores,
          ...encryptedFields,
        },
      });
    } else {
      const existingProfileByEmail = await prisma.userProfile.findUnique({
        where: { email },
      });

      if (existingProfileByEmail) {
        user = await prisma.userProfile.update({
          where: { id: existingProfileByEmail.id },
          data: {
            firstName,
            lastName,
            location,
            age,
            gender: mappedGender,
            shoppingStores,
            ...encryptedFields,
            auth: {
              upsert: {
                create: {
                  clerkId: userId,
                },
                update: {
                  clerkId: userId,
                },
              },
            },
          },
        });
      } else {
        user = await prisma.userProfile.create({
          data: {
            firstName,
            lastName,
            email,
            location,
            age,
            gender: mappedGender,
            shoppingStores,
            ...encryptedFields,
            auth: {
              create: {
                clerkId: userId,
              },
            },
          },
        });
      }
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: "Failed to save user" },
      { status: 500 }
    );
  }
}