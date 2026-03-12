import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// POST /api/products/import
// Takes a product from Open Food Facts search results and saves it
// to our database. If it already exists (by barcode), returns the
// existing product. This is a "find or create" pattern.
//
// Body: {
//   barcode: string,
//   name: string,
//   brand: string,
//   image?: string,
//   ingredients: string[],
//   packaging: string[],
//   allergens?: string[],
//   category: string
// }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { barcode, name, brand, image, ingredients, packaging, allergens, category } = body;

    if (!name) {
      return NextResponse.json(
        { error: "name is required" },
        { status: 400 }
      );
    }

    // Generate a slug from the name
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 80);

    // Try to find by barcode first (if provided), then by slug
    let existing = null;

    if (barcode) {
      existing = await prisma.product.findFirst({
        where: { slug: { startsWith: `off-${barcode}` } },
      });
    }

    if (!existing) {
      existing = await prisma.product.findFirst({
        where: { slug: { startsWith: baseSlug } },
      });
    }

    if (existing) {
      // Update ingredients/packaging/allergens in case parsing improved
      const updated = await prisma.product.update({
        where: { id: existing.id },
        data: {
          ingredients: ingredients || existing.ingredients,
          packaging: packaging || existing.packaging,
          allergens: allergens || existing.allergens,
          image: image || existing.image,
        },
      });
      return NextResponse.json({ product: updated, created: false });
    }

    // Map category string to enum
    const CATEGORY_MAP: Record<string, string> = {
      "food": "FOOD",
      "skin-body": "SKIN_BODY",
      "haircare": "HAIRCARE",
      "makeup": "MAKEUP",
      "cleaning": "CLEANING",
      "fragrance": "FRAGRANCE",
      "household": "HOUSEHOLD",
    };

    const categoryEnum = CATEGORY_MAP[category] || "FOOD";

    // Create the slug with barcode prefix for uniqueness
    const slug = barcode ? `off-${barcode}-${baseSlug}` : `off-${baseSlug}-${Date.now()}`;

    const product = await prisma.product.create({
      data: {
        slug,
        name,
        brand: brand || "Unknown Brand",
        image: image || null,
        price: "",
        url: barcode ? `https://world.openfoodfacts.org/product/${barcode}` : null,
        ingredients: ingredients || [],
        packaging: packaging || [],
        allergens: allergens || [],
        category: categoryEnum as any,
        isActive: true,
      },
    });

    return NextResponse.json({ product, created: true }, { status: 201 });
  } catch (error: any) {
    console.error("Error importing product:", error);
    return NextResponse.json(
      { error: "Failed to import product" },
      { status: 500 }
    );
  }
}