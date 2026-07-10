import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

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
        journalEntries: true,
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
              journalEntries: true,
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
      journalEntries: user.journalEntries.map((je) => je.conditionId ?? '').filter(Boolean),
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
    const { firstName, lastName, email, location, age, gender, shoppingStores } = body;

    const GENDER_MAP: Record<string, string> = {
      'male': 'MALE',
      'female': 'FEMALE',
      'prefer-not-to-say': 'PREFER_NOT_TO_SAY',
    }
    const mappedGender = gender ? (GENDER_MAP[gender.toLowerCase()] ?? gender) : undefined

    // Resolve to internal user ID
    let internalUserId = userId
    const directUser = await prisma.userProfile.findUnique({ where: { id: userId } })
    if (!directUser) {
      const authRecord = await prisma.userAuth.findUnique({ where: { clerkId: userId } })
      if (!authRecord) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      internalUserId = authRecord.userId
    }

    const updated = await prisma.userProfile.update({
      where: { id: internalUserId },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(email && { email }),
        ...(location && { location }),
        ...(age !== undefined && { age }),
        ...(mappedGender && { gender: mappedGender as any }),
        ...(shoppingStores && { shoppingStores }),
      },
    })

    return NextResponse.json({ user: updated })
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}