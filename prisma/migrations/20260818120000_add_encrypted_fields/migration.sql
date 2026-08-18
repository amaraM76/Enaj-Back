-- AlterTable: UserProfile — add AES-256-GCM encrypted counterparts of
-- location/age/gender/shoppingStores. Nullable/additive, dual-written
-- alongside the existing plaintext columns until a verified backfill
-- and follow-up migration removes the plaintext ones.
ALTER TABLE "UserProfile" ADD COLUMN "locationEnc" TEXT;
ALTER TABLE "UserProfile" ADD COLUMN "ageEnc" TEXT;
ALTER TABLE "UserProfile" ADD COLUMN "genderEnc" TEXT;
ALTER TABLE "UserProfile" ADD COLUMN "shoppingStoresEnc" TEXT;

-- AlterTable: UserAilment — add encrypted ailmentId + blind index for
-- dedup lookups, and encrypted customEntry. Nullable/additive.
ALTER TABLE "UserAilment" ADD COLUMN "ailmentIdEnc" TEXT;
ALTER TABLE "UserAilment" ADD COLUMN "ailmentIdBlind" TEXT;
ALTER TABLE "UserAilment" ADD COLUMN "customEntryEnc" TEXT;

-- CreateIndex
CREATE INDEX "UserAilment_ailmentIdBlind_idx" ON "UserAilment"("ailmentIdBlind");

-- AlterTable: UserPreference — add encrypted preferenceId + blind
-- index for dedup lookups, and encrypted customEntry. Nullable/additive.
ALTER TABLE "UserPreference" ADD COLUMN "preferenceIdEnc" TEXT;
ALTER TABLE "UserPreference" ADD COLUMN "preferenceIdBlind" TEXT;
ALTER TABLE "UserPreference" ADD COLUMN "customEntryEnc" TEXT;

-- CreateIndex
CREATE INDEX "UserPreference_preferenceIdBlind_idx" ON "UserPreference"("preferenceIdBlind");

-- AlterTable: UserJournalEntry — add encrypted conditionId + blind
-- index for dedup lookups, and encrypted customEntry. Nullable/additive.
ALTER TABLE "UserJournalEntry" ADD COLUMN "conditionIdEnc" TEXT;
ALTER TABLE "UserJournalEntry" ADD COLUMN "conditionIdBlind" TEXT;
ALTER TABLE "UserJournalEntry" ADD COLUMN "customEntryEnc" TEXT;

-- CreateIndex
CREATE INDEX "UserJournalEntry_conditionIdBlind_idx" ON "UserJournalEntry"("conditionIdBlind");

-- NOTE: Deliberately NOT adding @@unique constraints on the *Blind
-- columns in this migration. Existing rows will have a null *Blind
-- value until scripts/encrypt-existing-data.ts backfills them, and a
-- unique index over a column with many NULLs is safe in Postgres
-- (NULLs are not considered equal) but a unique constraint combined
-- with new inserts racing the backfill is not worth the risk here.
-- Add `@@unique([userId, ailmentIdBlind])` (and the preference/journal
-- equivalents) in a separate follow-up migration once the backfill is
-- verified complete across all environments.
