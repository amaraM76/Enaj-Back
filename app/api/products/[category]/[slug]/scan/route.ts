import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { scanProduct } from "@/app/lib/scan-product";
import { getUserFlagSources } from "@/app/lib/user-flags";

async function resolveUserId(userId: string): Promise<string | null> {
  if (!userId.startsWith('user_')) return userId
  const authRecord = await prisma.userAuth.findUnique({
    where: { clerkId: userId },
    select: { userId: true }
  })
  return authRecord?.userId ?? null
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await params;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId query parameter is required" }, { status: 400 });
    }

    const dbUserId = await resolveUserId(userId)
    if (!dbUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const product = await prisma.product.findUnique({
      where: { slug: slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const flagSources = await getUserFlagSources(dbUserId, { includeIngredientSources: true });

    const flaggedIngredients = scanProduct(product, flagSources);

    const allInCategory = await prisma.product.findMany({
      where: {
        category: product.category,
        isActive: true,
        id: { not: product.id },
      },
    });

    const alternatives = allInCategory.filter(
      (alt) => scanProduct(alt, flagSources).length === 0
    );

    return NextResponse.json({
      product,
      isRecommended: flaggedIngredients.length === 0,
      flaggedIngredients,
      alternatives,
    });
  } catch (error) {
    console.error("Error scanning product:", error);
    return NextResponse.json({ error: "Failed to scan product" }, { status: 500 });
  }
}
