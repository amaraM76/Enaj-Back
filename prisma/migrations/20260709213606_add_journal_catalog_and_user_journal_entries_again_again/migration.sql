/*
  Warnings:

  - You are about to drop the `JournalCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JournalCondition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserJournalEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JournalCondition" DROP CONSTRAINT "JournalCondition_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserJournalEntry" DROP CONSTRAINT "UserJournalEntry_conditionId_fkey";

-- DropForeignKey
ALTER TABLE "UserJournalEntry" DROP CONSTRAINT "UserJournalEntry_userId_fkey";

-- DropTable
DROP TABLE "JournalCategory";

-- DropTable
DROP TABLE "JournalCondition";

-- DropTable
DROP TABLE "UserJournalEntry";

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "conditionSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JournalEntry_userId_idx" ON "JournalEntry"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_userId_conditionSlug_key" ON "JournalEntry"("userId", "conditionSlug");

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
