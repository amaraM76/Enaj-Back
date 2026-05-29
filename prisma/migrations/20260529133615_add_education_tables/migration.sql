/*
  Warnings:

  - You are about to drop the column `description` on the `Ailment` table. All the data in the column will be lost.
  - You are about to drop the column `generalSources` on the `Ailment` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientInfo` on the `Ailment` table. All the data in the column will be lost.
  - You are about to drop the column `commonlyFoundIn` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `educationSources` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `whatItIs` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `whyPeopleAvoid` on the `Preference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ailment" DROP COLUMN "description",
DROP COLUMN "generalSources",
DROP COLUMN "ingredientInfo";

-- AlterTable
ALTER TABLE "Preference" DROP COLUMN "commonlyFoundIn",
DROP COLUMN "educationSources",
DROP COLUMN "whatItIs",
DROP COLUMN "whyPeopleAvoid";

-- CreateTable
CREATE TABLE "ailment_education" (
    "id" TEXT NOT NULL,
    "ailmentId" TEXT NOT NULL,
    "description" TEXT,
    "generalSources" JSONB,
    "ingredientInfo" JSONB,

    CONSTRAINT "ailment_education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preference_education" (
    "id" TEXT NOT NULL,
    "preferenceId" TEXT NOT NULL,
    "whatItIs" TEXT,
    "commonlyFoundIn" TEXT[],
    "whyPeopleAvoid" TEXT,
    "sources" JSONB,

    CONSTRAINT "preference_education_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ailment_education_ailmentId_key" ON "ailment_education"("ailmentId");

-- CreateIndex
CREATE UNIQUE INDEX "preference_education_preferenceId_key" ON "preference_education"("preferenceId");

-- AddForeignKey
ALTER TABLE "ailment_education" ADD CONSTRAINT "ailment_education_ailmentId_fkey" FOREIGN KEY ("ailmentId") REFERENCES "Ailment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preference_education" ADD CONSTRAINT "preference_education_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "Preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
