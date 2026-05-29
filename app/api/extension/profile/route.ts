import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { PREFERENCE_INGREDIENT_MAP } from "@/app/lib/preference-ingredients"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 })
    }

    // Resolve Clerk ID to DB ID
    let dbUserId = userId
    if (userId.startsWith('user_')) {
      const auth = await prisma.userAuth.findUnique({
        where: { clerkId: userId },
        select: { userId: true }
      })
      if (!auth) return NextResponse.json({ error: "User not found" }, { status: 404 })
      dbUserId = auth.userId
    }

    // Get ailments with flagged ingredients
    const userAilments = await prisma.userAilment.findMany({
      where: { userId: dbUserId, ailmentId: { not: null } },
      include: {
        ailment: {
          include: { flaggedIngredients: true }
        }
      }
    })

    // Get preferences
    const userPreferences = await prisma.userPreference.findMany({
      where: { userId: dbUserId },
      include: { preference: true }
    })

    // Build flat flagged ingredients list for easy matching
    const flaggedIngredients: { name: string; reason: string; source: string; sourceName: string; sourceSlug: string }[] = []

    // From ailments
    for (const ua of userAilments) {
      if (!ua.ailment) continue
      for (const fi of ua.ailment.flaggedIngredients) {
        flaggedIngredients.push({
          name: fi.name.toLowerCase(),
          reason: fi.reason,
          source: 'ailment',
          sourceSlug: ua.ailment.slug,
          sourceName: ua.ailment.name,
        })
      }
    }

    // From preferences
    for (const up of userPreferences) {
      if (!up.preference) continue
      const keywords = PREFERENCE_INGREDIENT_MAP[up.preference.name] || [up.preference.name.toLowerCase()]
      for (const keyword of keywords) {
        flaggedIngredients.push({
          name: keyword.toLowerCase(),
          reason: up.preference.description,
          source: 'preference',
          sourceSlug: up.preference.slug,
          sourceName: up.preference.name,
        })
      }
    }

    return NextResponse.json({
        flaggedIngredients,
        ailments: userAilments
          .filter((ua) => ua.ailment)
          .map((ua) => ({
            id: ua.ailment!.id,
            name: ua.ailment!.name,
            slug: ua.ailment!.slug,
          })),
      
        preferences: userPreferences
          .filter((up) => up.preference)
          .map((up) => ({
            id: up.preference!.id,
            name: up.preference!.name,
            slug: up.preference!.slug,
          })),
      })
  } catch (error) {
    console.error("Extension profile error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}