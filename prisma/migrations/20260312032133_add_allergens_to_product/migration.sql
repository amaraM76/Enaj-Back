/*
  Warnings:

  - Made the column `location` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `age` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `gender` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shoppingStores` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "allergens" TEXT[];

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "location" SET NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "shoppingStores" SET NOT NULL;
