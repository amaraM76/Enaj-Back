import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET /api/users/:userId
// Returns the full user profile including ailments, preferences,
// and saved products — shaped to match the frontend UserProfile interface.
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
        journalEntries: {
          include: { condition: true },
        },
      },
    })

    // If not found, try by Clerk ID
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
              journalEntries: {
                include: { condition: true },
              },
            },
          },
        },
      })
      user = authRecord?.user ?? null
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Transform to match frontend shape
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
      customJournalEntry: user.journalEntries.find((je) => je.customEntry)?.customEntry || undefined,
    };

    return NextResponse.json({ user: profile });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
