/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `UserAuth` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserAuth" ADD COLUMN     "clerkId" TEXT,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "passwordHash" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "shoppingStores" DROP NOT NULL,
ALTER COLUMN "age" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_clerkId_key" ON "UserAuth"("clerkId");
