import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET /api/saved-products?userId=xxx
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId query parameter is required" }, { status: 400 });
    }

    const savedProducts = await prisma.savedProduct.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });

    // Return in frontend Product shape
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
// Body: { userId, productSlug }
export async function POST(request: Request) {
  try {
    const { userId, productSlug, productUrl } = await request.json();

    if (!userId || !productSlug) {
      return NextResponse.json({ error: "userId and productSlug are required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { slug: productSlug } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update product URL if we have it
    if (productUrl) {
      await prisma.product.update({
        where: { slug: productSlug },
        data: { url: productUrl },
      });
    }

    const saved = await prisma.savedProduct.create({
      data: { userId, productId: product.id },
    });

    return NextResponse.json({ saved }, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "Product already saved" }, { status: 409 });
    }
    console.error("Error saving product:", error);
    return NextResponse.json({ error: "Failed to save product" }, { status: 500 });
  }
}

// DELETE /api/saved-products
// Body: { userId, productSlug }
export async function DELETE(request: Request) {
  try {
    const { userId, productSlug } = await request.json();

    if (!userId || !productSlug) {
      return NextResponse.json({ error: "userId and productSlug are required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { slug: productSlug } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.savedProduct.deleteMany({
      where: { userId, productId: product.id },
    });

    return NextResponse.json({ removed: true });
  } catch (error) {
    console.error("Error removing saved product:", error);
    return NextResponse.json({ error: "Failed to remove saved product" }, { status: 500 });
  }
}
