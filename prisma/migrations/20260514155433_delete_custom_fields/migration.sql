/*
  Warnings:

  - You are about to drop the column `customHealthCondition` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `customPreference` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "customHealthCondition",
DROP COLUMN "customPreference";
