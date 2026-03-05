import { NextResponse } from "next/server";

// The three Open Facts databases — same API, different domains
const DATABASES = {
  food: "https://world.openfoodfacts.org",
  beauty: "https://world.openbeautyfacts.org",
  products: "https://world.openproductsfacts.org",
};

// GET /api/product-search?q=nutella&source=food&page=1&pageSize=20
// GET /api/product-search?q=shampoo&source=beauty
// GET /api/product-search?q=shampoo&source=all  (searches all databases)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const source = searchParams.get("source") || "all";
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "20";

    if (!query) {
      return NextResponse.json(
        { error: "q query parameter is required" },
        { status: 400 }
      );
    }

    let databasesToSearch: { name: string; url: string }[] = [];

    if (source === "all") {
      databasesToSearch = [
        { name: "food", url: DATABASES.food },
        { name: "beauty", url: DATABASES.beauty },
      ];
    } else if (source === "food") {
      databasesToSearch = [{ name: "food", url: DATABASES.food }];
    } else if (source === "beauty") {
      databasesToSearch = [{ name: "beauty", url: DATABASES.beauty }];
    } else {
      return NextResponse.json(
        { error: "source must be 'food', 'beauty', or 'all'" },
        { status: 400 }
      );
    }

    const allProducts: any[] = [];
    let totalCount = 0;

    for (const db of databasesToSearch) {
      const url = new URL(`${db.url}/cgi/search.pl`);
      url.searchParams.set("search_terms", query);
      url.searchParams.set("json", "true");
      url.searchParams.set(
        "fields",
        "code,product_name,brands,ingredients_text,image_url,packaging_text_en,categories_tags_en"
      );
      url.searchParams.set("page", page);
      url.searchParams.set("page_size", pageSize);

      try {
        const response = await fetch(url.toString(), {
          headers: { "User-Agent": "Enaj/1.0 (https://enaj.app)" },
        });

        if (response.ok) {
          const data = await response.json();
          totalCount += data.count || 0;

          const products = (data.products || [])
            .filter((p: any) => p.product_name)
            .map((p: any) => ({
              barcode: p.code || null,
              name: p.product_name || "Unknown Product",
              brand: p.brands || "Unknown Brand",
              image: p.image_url || "",
              ingredients: parseIngredients(p.ingredients_text),
              packaging: parsePackaging(p.packaging_text_en),
              category: mapCategory(p.categories_tags_en, db.name),
              source: db.name,
            }));

          allProducts.push(...products);
        }
      } catch (err) {
        console.error(`Error fetching from ${db.name}:`, err);
      }
    }

    return NextResponse.json({
      query,
      count: totalCount,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      products: allProducts,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}

// POST /api/product-search
// Look up a single product by barcode — searches all databases
// Body: { barcode: "3017620422003" }
export async function POST(request: Request) {
  try {
    const { barcode } = await request.json();

    if (!barcode) {
      return NextResponse.json(
        { error: "barcode is required" },
        { status: 400 }
      );
    }

    // Try each database until we find the product
    for (const [name, baseUrl] of Object.entries(DATABASES)) {
      try {
        const url = `${baseUrl}/api/v2/product/${barcode}.json?fields=code,product_name,brands,ingredients_text,image_url,packaging_text_en,categories_tags_en`;

        const response = await fetch(url, {
          headers: { "User-Agent": "Enaj/1.0 (https://enaj.app)" },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.product && data.product.product_name) {
            const p = data.product;
            return NextResponse.json({
              product: {
                barcode: p.code || barcode,
                name: p.product_name,
                brand: p.brands || "Unknown Brand",
                image: p.image_url || "",
                ingredients: parseIngredients(p.ingredients_text),
                packaging: parsePackaging(p.packaging_text_en),
                category: mapCategory(p.categories_tags_en, name),
                source: name,
              },
            });
          }
        }
      } catch (err) {
        continue;
      }
    }

    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching product by barcode:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

function parseIngredients(text: string | undefined): string[] {
  if (!text) return [];
  return text
    .split(/,(?![^()]*\))/)
    .map((s) => s.replace(/\([^)]*\)/g, "").trim())
    .filter((s) => s.length > 0);
}

function parsePackaging(text: string | undefined): string[] {
  if (!text) return [];
  return text
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function mapCategory(
  categories: string[] | undefined,
  source: string
): string {
  if (source === "beauty") {
    const joined = (categories || []).join(" ").toLowerCase();
    if (joined.includes("hair") || joined.includes("shampoo") || joined.includes("conditioner")) return "haircare";
    if (joined.includes("makeup") || joined.includes("mascara") || joined.includes("foundation") || joined.includes("lipstick")) return "makeup";
    if (joined.includes("fragrance") || joined.includes("perfume") || joined.includes("cologne")) return "fragrance";
    if (joined.includes("body") || joined.includes("skin") || joined.includes("cream") || joined.includes("lotion") || joined.includes("sunscreen")) return "skin-body";
    return "skin-body"; // default for beauty products
  }

  if (source === "food") {
    const joined = (categories || []).join(" ").toLowerCase();
    if (joined.includes("cleaning") || joined.includes("detergent")) return "cleaning";
    if (joined.includes("household")) return "household";
    return "food";
  }

  return "food";
}