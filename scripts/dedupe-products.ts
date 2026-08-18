// ==========================================
// One-off cleanup: merge duplicate Product rows
// ==========================================
// Before the barcode column existed, dedup on import only matched a
// slug string prefix (off-<barcode>-<name>), which was fragile enough
// that scanning the same product more than once could create more than
// one row for it. This script finds those existing duplicates, keeps
// one canonical row per group, repoints any SavedProduct rows that
// reference a duplicate onto the canonical row, then deletes the
// duplicates.
//
// Safe to interrupt and re-run: each pass re-groups from the current
// state of the table, so a canonical row chosen on a previous run is
// simply re-selected (or the group no longer has duplicates at all).
//
// Usage:
//   npx tsx scripts/dedupe-products.ts        # dry run, prints the plan
//   npx tsx scripts/dedupe-products.ts --apply  # actually merges/deletes
// ==========================================

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DRY_RUN = !process.argv.includes("--apply");

// Older rows may not have a barcode backfilled yet even though it's
// encoded in their slug (off-<barcode>-<name>) - recover it so those
// rows group correctly by barcode instead of falling through to the
// weaker name+brand grouping below.
function barcodeFromSlug(slug: string): string | null {
  const match = slug.match(/^off-(\d+)-/);
  return match ? match[1] : null;
}

function normalizedNameBrandKey(name: string, brand: string): string {
  const norm = (s: string) => s.toLowerCase().trim().replace(/\s+/g, " ");
  return `${norm(brand)}::${norm(name)}`;
}

async function main() {
  console.log(DRY_RUN ? "Dry run (pass --apply to actually merge/delete)\n" : "Applying changes\n");

  const products = await prisma.$transaction(async (tx) => {
    // Backfill barcode from slug for rows created before the column existed.
    const missingBarcode = await tx.product.findMany({
      where: { barcode: null },
      select: { id: true, slug: true },
    });
    for (const p of missingBarcode) {
      const recovered = barcodeFromSlug(p.slug);
      if (!recovered) continue;
      // Another row may already legitimately own this barcode - don't
      // fight the unique constraint over a best-effort backfill.
      const owner = await tx.product.findUnique({ where: { barcode: recovered } });
      if (!owner) {
        await tx.product.update({ where: { id: p.id }, data: { barcode: recovered } });
      }
    }
    return tx.product.findMany({ orderBy: { createdAt: "asc" } });
  });

  const groups = new Map<string, typeof products>();
  for (const product of products) {
    const key = product.barcode ? `barcode:${product.barcode}` : `name:${normalizedNameBrandKey(product.name, product.brand)}`;
    const group = groups.get(key) ?? [];
    group.push(product);
    groups.set(key, group);
  }

  let duplicateGroups = 0;
  let rowsRemoved = 0;

  for (const [key, group] of groups) {
    if (group.length < 2) continue;
    duplicateGroups++;

    // Keep the oldest row (first scanned) as canonical; prefer one with
    // a populated image/price if the oldest is missing them.
    const canonical =
      group.find((p) => p.image && p.price) ?? group[0];
    const duplicates = group.filter((p) => p.id !== canonical.id);

    console.log(`Group ${key}: keeping ${canonical.id} (${canonical.name}), merging ${duplicates.length} duplicate(s)`);

    if (DRY_RUN) {
      rowsRemoved += duplicates.length;
      continue;
    }

    for (const dup of duplicates) {
      await prisma.$transaction(async (tx) => {
        // Repoint saved-product references; if a user already saved
        // both the duplicate and the canonical row, the unique
        // [userId, productId] constraint means we just drop the
        // now-redundant reference to the duplicate instead.
        const savedRefs = await tx.savedProduct.findMany({ where: { productId: dup.id } });
        for (const ref of savedRefs) {
          const alreadySaved = await tx.savedProduct.findUnique({
            where: { userId_productId: { userId: ref.userId, productId: canonical.id } },
          });
          if (alreadySaved) {
            await tx.savedProduct.delete({ where: { id: ref.id } });
          } else {
            await tx.savedProduct.update({ where: { id: ref.id }, data: { productId: canonical.id } });
          }
        }
        await tx.product.delete({ where: { id: dup.id } });
      });
      rowsRemoved++;
    }
  }

  console.log(`\n${duplicateGroups} duplicate group(s) found, ${rowsRemoved} row(s) ${DRY_RUN ? "would be" : "were"} removed.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
