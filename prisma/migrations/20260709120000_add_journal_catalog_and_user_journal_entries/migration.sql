/*
  Warnings:

  - You are about to drop the `JournalEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JournalEntry" DROP CONSTRAINT "JournalEntry_userId_fkey";

-- DropTable
DROP TABLE "JournalEntry";

-- CreateTable
CREATE TABLE "JournalCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "JournalCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalCondition" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "whatWeMonitor" JSONB NOT NULL,
    "funFacts" TEXT[],
    "tips" TEXT[],
    "generalSources" JSONB NOT NULL,

    CONSTRAINT "JournalCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserJournalEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "conditionId" TEXT,
    "customEntry" TEXT,
    "source" "ConditionSource" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserJournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JournalCategory_slug_key" ON "JournalCategory"("slug");

-- CreateIndex
CREATE INDEX "JournalCategory_sortOrder_idx" ON "JournalCategory"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "JournalCondition_slug_key" ON "JournalCondition"("slug");

-- CreateIndex
CREATE INDEX "JournalCondition_categoryId_idx" ON "JournalCondition"("categoryId");

-- CreateIndex
CREATE INDEX "UserJournalEntry_userId_idx" ON "UserJournalEntry"("userId");

-- CreateIndex
CREATE INDEX "UserJournalEntry_conditionId_idx" ON "UserJournalEntry"("conditionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserJournalEntry_userId_conditionId_key" ON "UserJournalEntry"("userId", "conditionId");

-- AddForeignKey
ALTER TABLE "JournalCondition" ADD CONSTRAINT "JournalCondition_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "JournalCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJournalEntry" ADD CONSTRAINT "UserJournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJournalEntry" ADD CONSTRAINT "UserJournalEntry_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "JournalCondition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
