// ==========================================
// Backfill: encrypt existing plaintext data
// ==========================================
// Populates the *Enc (and *Blind, where applicable) columns added by
// the add_encrypted_fields migration for rows that predate the
// encryption rollout. Run this manually, via `npm run encrypt:backfill`,
// against the real database during a maintenance window — AFTER
// DATA_ENCRYPTION_KEY and BLIND_INDEX_KEY are set in the environment.
//
// Safe to interrupt and re-run: every batch query filters to rows
// whose *Enc column is still null, so already-migrated rows are
// skipped and re-running only picks up where it left off. It does NOT
// touch or remove any plaintext column — this is additive-only, same
// as the migration.
//
// Usage:
//   DATA_ENCRYPTION_KEY=... BLIND_INDEX_KEY=... npm run encrypt:backfill
// ==========================================

import { PrismaClient } from "@prisma/client";
import { encryptField, blindIndex } from "../app/lib/crypto";

const prisma = new PrismaClient();

const BATCH_SIZE = 500;

// Note on pagination: each batch query re-runs the SAME "not yet
// backfilled" WHERE clause with no cursor/skip. This is deliberate,
// not an oversight — every row we successfully process in a batch
// stops matching that WHERE clause (its *Enc column is no longer
// null), so the matching set shrinks batch over batch and looping
// until it returns zero rows is both simpler and safer than
// cursor-pagination here: a cursor id from a just-backfilled row is
// no longer in the filtered set, which is exactly the kind of edge
// case this sidesteps. If a row is added by production traffic while
// this runs, it's already encrypted at write time (dual-write) and
// won't show up as "not yet backfilled" anyway.
async function backfillUserProfiles() {
  let processed = 0;

  for (;;) {
    const rows = await prisma.userProfile.findMany({
      where: {
        OR: [
          { location: { not: null }, locationEnc: null },
          { age: { not: null }, ageEnc: null },
          { gender: { not: null }, genderEnc: null },
          { shoppingStores: { not: null }, shoppingStoresEnc: null },
        ],
      },
      select: { id: true, location: true, age: true, gender: true, shoppingStores: true },
      take: BATCH_SIZE,
      orderBy: { id: "asc" },
    });

    if (rows.length === 0) break;

    for (const row of rows) {
      await prisma.userProfile.update({
        where: { id: row.id },
        data: {
          locationEnc: row.location != null ? encryptField(row.location) : undefined,
          ageEnc: row.age != null ? encryptField(row.age) : undefined,
          genderEnc: row.gender != null ? encryptField(row.gender) : undefined,
          shoppingStoresEnc: row.shoppingStores != null ? encryptField(row.shoppingStores) : undefined,
        },
      });
      processed++;
    }

    console.log(`UserProfile: backfilled ${processed} rows so far...`);

    if (rows.length < BATCH_SIZE) break;
  }

  console.log(`UserProfile: done. Total backfilled: ${processed}`);
}

async function backfillUserAilments() {
  let processed = 0;

  for (;;) {
    const rows = await prisma.userAilment.findMany({
      where: {
        OR: [
          { ailmentId: { not: null }, ailmentIdEnc: null },
          { customEntry: { not: null }, customEntryEnc: null },
        ],
      },
      select: { id: true, userId: true, ailmentId: true, customEntry: true },
      take: BATCH_SIZE,
      orderBy: { id: "asc" },
    });

    if (rows.length === 0) break;

    for (const row of rows) {
      await prisma.userAilment.update({
        where: { id: row.id },
        data: {
          ailmentIdEnc: row.ailmentId != null ? encryptField(row.ailmentId) : undefined,
          ailmentIdBlind:
            row.ailmentId != null ? blindIndex(`${row.userId}:${row.ailmentId}`) : undefined,
          customEntryEnc: row.customEntry != null ? encryptField(row.customEntry) : undefined,
        },
      });
      processed++;
    }

    console.log(`UserAilment: backfilled ${processed} rows so far...`);

    if (rows.length < BATCH_SIZE) break;
  }

  console.log(`UserAilment: done. Total backfilled: ${processed}`);
}

async function backfillUserPreferences() {
  let processed = 0;

  for (;;) {
    const rows = await prisma.userPreference.findMany({
      where: {
        OR: [
          { preferenceId: { not: null }, preferenceIdEnc: null },
          { customEntry: { not: null }, customEntryEnc: null },
        ],
      },
      select: { id: true, userId: true, preferenceId: true, customEntry: true },
      take: BATCH_SIZE,
      orderBy: { id: "asc" },
    });

    if (rows.length === 0) break;

    for (const row of rows) {
      await prisma.userPreference.update({
        where: { id: row.id },
        data: {
          preferenceIdEnc: row.preferenceId != null ? encryptField(row.preferenceId) : undefined,
          preferenceIdBlind:
            row.preferenceId != null ? blindIndex(`${row.userId}:${row.preferenceId}`) : undefined,
          customEntryEnc: row.customEntry != null ? encryptField(row.customEntry) : undefined,
        },
      });
      processed++;
    }

    console.log(`UserPreference: backfilled ${processed} rows so far...`);

    if (rows.length < BATCH_SIZE) break;
  }

  console.log(`UserPreference: done. Total backfilled: ${processed}`);
}

async function backfillUserJournalEntries() {
  let processed = 0;

  for (;;) {
    const rows = await prisma.userJournalEntry.findMany({
      where: {
        OR: [
          { conditionId: { not: null }, conditionIdEnc: null },
          { customEntry: { not: null }, customEntryEnc: null },
        ],
      },
      select: { id: true, userId: true, conditionId: true, customEntry: true },
      take: BATCH_SIZE,
      orderBy: { id: "asc" },
    });

    if (rows.length === 0) break;

    for (const row of rows) {
      await prisma.userJournalEntry.update({
        where: { id: row.id },
        data: {
          conditionIdEnc: row.conditionId != null ? encryptField(row.conditionId) : undefined,
          conditionIdBlind:
            row.conditionId != null ? blindIndex(`${row.userId}:${row.conditionId}`) : undefined,
          customEntryEnc: row.customEntry != null ? encryptField(row.customEntry) : undefined,
        },
      });
      processed++;
    }

    console.log(`UserJournalEntry: backfilled ${processed} rows so far...`);

    if (rows.length < BATCH_SIZE) break;
  }

  console.log(`UserJournalEntry: done. Total backfilled: ${processed}`);
}

async function main() {
  if (!process.env.DATA_ENCRYPTION_KEY || !process.env.BLIND_INDEX_KEY) {
    throw new Error(
      "DATA_ENCRYPTION_KEY and BLIND_INDEX_KEY must both be set before running this script."
    );
  }

  console.log("Starting encryption backfill...");
  await backfillUserProfiles();
  await backfillUserAilments();
  await backfillUserPreferences();
  await backfillUserJournalEntries();
  console.log("Encryption backfill complete.");
}

main()
  .catch((err) => {
    console.error("Backfill failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
