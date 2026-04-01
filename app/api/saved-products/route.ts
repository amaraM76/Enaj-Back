import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// Helper to resolve Clerk ID to database UUID
async function resolveUserId(userId: string): Promise<string | null> {
  if (!userId.startsWith('user_')) return userId
  const authRecord = await prisma.userAuth.findUnique({
    where: { clerkId: userId },
    select: { userId: true }
  })
  return authRecord?.userId ?? null
}

// GET /api/saved-products?userId=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId query parameter is required" }, { status: 400 });
    }

    const dbUserId = await resolveUserId(userId)
    if (!dbUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const savedProducts = await prisma.savedProduct.findMany({
      where: { userId: dbUserId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });

    const products = savedProducts.map((sp) => ({
      id: sp.product.slug,
      name: sp.product.name,
      brand: sp.product.brand,
      image: sp.product.image || "",
      price: sp.product.price,
      url: sp.product.url || "#",
      ingredients: sp.product.ingredients,
      category: sp.product.category.toLowerCase().replace("_", "-"),
    }));

    return NextResponse.json({ savedProducts: products });
  } catch (error) {
    console.error("Error fetching saved products:", error);
    return NextResponse.json({ error: "Failed to fetch saved products" }, { status: 500 });
  }
}

// POST /api/saved-products
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, productSlug, productUrl } = body;

    if (!userId || !productSlug) {
      return NextResponse.json({ error: "userId and productSlug are required" }, { status: 400 });
    }

    const dbUserId = await resolveUserId(userId)
    if (!dbUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const product = await prisma.product.findUnique({ where: { slug: productSlug } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (productUrl) {
      try {
        await prisma.product.update({
          where: { slug: productSlug },
          data: { url: productUrl },
        });
      } catch (e) {
        console.error("Could not update product URL:", e);
      }
    }

    const saved = await prisma.savedProduct.create({
      data: { userId: dbUserId, productId: product.id },
    });

    return NextResponse.json({ saved }, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "Product already saved" }, { status: 409 });
    }
    console.error("Full error:", error);
    return NextResponse.json({ error: "Failed to save product", details: error?.message }, { status: 500 });
  }
}

// DELETE /api/saved-products
export async function DELETE(request: Request) {
  try {
    const { userId, productSlug } = await request.json();

    if (!userId || !productSlug) {
      return NextResponse.json({ error: "userId and productSlug are required" }, { status: 400 });
    }

    const dbUserId = await resolveUserId(userId)
    if (!dbUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const product = await prisma.product.findUnique({ where: { slug: productSlug } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.savedProduct.deleteMany({
      where: { userId: dbUserId, productId: product.id },
    });

    return NextResponse.json({ removed: true });
  } catch (error) {
    console.error("Error removing saved product:", error);
    return NextResponse.json({ error: "Failed to remove saved product" }, { status: 500 });
  }
}