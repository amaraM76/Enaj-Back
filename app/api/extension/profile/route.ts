import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import { PREFERENCE_INGREDIENT_MAP } from "@/app/lib/preference-ingredients"
import { JOURNAL_INGREDIENT_MAP } from "@/app/lib/journal-ingredients"
import { journalEntriesToFlagInputs } from "@/app/lib/scan-product"

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

    // Get active journal entries
    const userJournalEntries = await prisma.userJournalEntry.findMany({
      where: { userId: dbUserId, conditionId: { not: null } },
      include: { condition: true }
    })
    const journalEntries = journalEntriesToFlagInputs(userJournalEntries)

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

    // From active journal entries
    for (const entry of journalEntries) {
      for (const monitor of entry.whatWeMonitor) {
        const keywords = JOURNAL_INGREDIENT_MAP[monitor.ingredient] || [monitor.ingredient.toLowerCase()]
        for (const keyword of keywords) {
          flaggedIngredients.push({
            name: keyword.toLowerCase(),
            reason: monitor.reason,
            source: 'journal',
            sourceSlug: entry.sourceSlug,
            sourceName: entry.sourceName,
          })
        }
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

        journal: userJournalEntries
          .filter((uje) => uje.condition)
          .map((uje) => ({
            id: uje.condition!.id,
            name: uje.condition!.name,
            slug: uje.condition!.slug,
          })),
      })
  } catch (error) {
    console.error("Extension profile error:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}
