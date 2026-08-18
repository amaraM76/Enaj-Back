import { NextResponse } from "next/server";
import { resolveUserId } from "@/app/lib/resolve-user";
import { parseIngredientText } from "@/app/lib/parse-ingredients";
import { getUserFlagSources } from "@/app/lib/user-flags";
import { scanProduct, type ScannableProduct } from "@/app/lib/scan-product";

// POST /api/scan-text
// Scans raw pasted ingredient text against a user's flags, without
// requiring a stored Product row. Used by the "paste ingredients"
// box on the web scanner page and the browser extension popup.
//
// Body: { userId: string, ingredientsText: string }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, ingredientsText } = body;

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    if (!ingredientsText || typeof ingredientsText !== "string" || !ingredientsText.trim()) {
      return NextResponse.json({ error: "ingredientsText is required" }, { status: 400 });
    }

    const dbUserId = await resolveUserId(userId);
    if (!dbUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const ingredients = parseIngredientText(ingredientsText);

    const flagSources = await getUserFlagSources(dbUserId, { includeIngredientSources: true });

    const fakeProduct: ScannableProduct = {
      ingredients,
      packaging: [],
      allergens: [],
    };

    const flaggedIngredients = scanProduct(fakeProduct, flagSources);

    return NextResponse.json({
      ingredients,
      flaggedIngredients,
      isRecommended: flaggedIngredients.length === 0,
    });
  } catch (error) {
    console.error("Error scanning ingredient text:", error);
    return NextResponse.json({ error: "Failed to scan ingredient text" }, { status: 500 });
  }
}
