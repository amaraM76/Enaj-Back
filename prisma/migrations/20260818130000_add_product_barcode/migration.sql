-- AlterTable: Product — add a real, indexed barcode column. Previously
-- the only "dedup key" was encoding the barcode into the slug string
-- (off-<barcode>-<name>) and matching with a slug prefix scan, which is
-- both slower than an index lookup and fragile (two different products
-- whose name-derived slug happens to share a prefix could false-match).
-- Nullable + unique: a unique index over a column with many NULLs is
-- safe in Postgres (NULLs are never considered equal to each other), so
-- existing rows with no barcode yet don't conflict with one another.
ALTER TABLE "Product" ADD COLUMN "barcode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");
