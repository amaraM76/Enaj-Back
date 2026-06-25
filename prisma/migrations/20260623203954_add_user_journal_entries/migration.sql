-- CreateTable
CREATE TABLE "UserJournalEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "conditionSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserJournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserJournalEntry_userId_idx" ON "UserJournalEntry"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserJournalEntry_userId_conditionSlug_key" ON "UserJournalEntry"("userId", "conditionSlug");

-- AddForeignKey
ALTER TABLE "UserJournalEntry" ADD CONSTRAINT "UserJournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
