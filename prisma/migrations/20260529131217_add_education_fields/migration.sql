/*
  Warnings:

  - You are about to drop the column `FoundIn` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `eduSources` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `whyAvoid` on the `Preference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Preference" DROP COLUMN "FoundIn",
DROP COLUMN "eduSources",
DROP COLUMN "whyAvoid",
ADD COLUMN     "commonlyFoundIn" TEXT[],
ADD COLUMN     "educationSources" JSONB,
ADD COLUMN     "whyPeopleAvoid" TEXT;
