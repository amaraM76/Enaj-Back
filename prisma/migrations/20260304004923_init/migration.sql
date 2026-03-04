-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('SKIN_BODY', 'HAIRCARE', 'MAKEUP', 'FOOD', 'CLEANING', 'FRAGRANCE', 'HOUSEHOLD');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "ConditionSource" AS ENUM ('SELECTED', 'CUSTOM');

-- CreateEnum
CREATE TYPE "PreferenceSource" AS ENUM ('PRESELECTED', 'SELECTED', 'CUSTOM');

-- CreateEnum
CREATE TYPE "FlagSource" AS ENUM ('AILMENT', 'PREFERENCE');

-- CreateTable
CREATE TABLE "UserAuth" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT,
    "age" TEXT,
    "gender" "Gender",
    "shoppingStores" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AilmentCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AilmentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ailment" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Ailment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AilmentFlaggedIngredient" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "ailmentId" TEXT NOT NULL,

    CONSTRAINT "AilmentFlaggedIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientSource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "flaggedIngredientId" TEXT NOT NULL,

    CONSTRAINT "IngredientSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAilment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ailmentId" TEXT,
    "customEntry" TEXT,
    "source" "ConditionSource" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAilment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreferenceCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PreferenceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preference" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AilmentLinkedPreference" (
    "id" TEXT NOT NULL,
    "ailmentId" TEXT NOT NULL,
    "preferenceId" TEXT NOT NULL,

    CONSTRAINT "AilmentLinkedPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferenceId" TEXT,
    "customEntry" TEXT,
    "source" "PreferenceSource" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "image" TEXT,
    "price" TEXT NOT NULL,
    "url" TEXT,
    "ingredients" TEXT[],
    "category" "ProductCategory" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_userId_key" ON "UserAuth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_username_key" ON "UserAuth"("username");

-- CreateIndex
CREATE INDEX "UserAuth_username_idx" ON "UserAuth"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "UserProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AilmentCategory_slug_key" ON "AilmentCategory"("slug");

-- CreateIndex
CREATE INDEX "AilmentCategory_sortOrder_idx" ON "AilmentCategory"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Ailment_slug_key" ON "Ailment"("slug");

-- CreateIndex
CREATE INDEX "Ailment_categoryId_idx" ON "Ailment"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "AilmentFlaggedIngredient_slug_key" ON "AilmentFlaggedIngredient"("slug");

-- CreateIndex
CREATE INDEX "AilmentFlaggedIngredient_ailmentId_idx" ON "AilmentFlaggedIngredient"("ailmentId");

-- CreateIndex
CREATE INDEX "IngredientSource_flaggedIngredientId_idx" ON "IngredientSource"("flaggedIngredientId");

-- CreateIndex
CREATE INDEX "UserAilment_userId_idx" ON "UserAilment"("userId");

-- CreateIndex
CREATE INDEX "UserAilment_ailmentId_idx" ON "UserAilment"("ailmentId");

-- CreateIndex
CREATE UNIQUE INDEX "PreferenceCategory_slug_key" ON "PreferenceCategory"("slug");

-- CreateIndex
CREATE INDEX "PreferenceCategory_sortOrder_idx" ON "PreferenceCategory"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_slug_key" ON "Preference"("slug");

-- CreateIndex
CREATE INDEX "Preference_categoryId_idx" ON "Preference"("categoryId");

-- CreateIndex
CREATE INDEX "AilmentLinkedPreference_ailmentId_idx" ON "AilmentLinkedPreference"("ailmentId");

-- CreateIndex
CREATE INDEX "AilmentLinkedPreference_preferenceId_idx" ON "AilmentLinkedPreference"("preferenceId");

-- CreateIndex
CREATE UNIQUE INDEX "AilmentLinkedPreference_ailmentId_preferenceId_key" ON "AilmentLinkedPreference"("ailmentId", "preferenceId");

-- CreateIndex
CREATE INDEX "UserPreference_userId_idx" ON "UserPreference"("userId");

-- CreateIndex
CREATE INDEX "UserPreference_preferenceId_idx" ON "UserPreference"("preferenceId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_preferenceId_key" ON "UserPreference"("userId", "preferenceId");

-- CreateIndex
CREATE INDEX "SavedProduct_userId_idx" ON "SavedProduct"("userId");

-- CreateIndex
CREATE INDEX "SavedProduct_productId_idx" ON "SavedProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedProduct_userId_productId_key" ON "SavedProduct"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_brand_idx" ON "Product"("brand");

-- CreateIndex
CREATE INDEX "Product_isActive_idx" ON "Product"("isActive");

-- AddForeignKey
ALTER TABLE "UserAuth" ADD CONSTRAINT "UserAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ailment" ADD CONSTRAINT "Ailment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AilmentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AilmentFlaggedIngredient" ADD CONSTRAINT "AilmentFlaggedIngredient_ailmentId_fkey" FOREIGN KEY ("ailmentId") REFERENCES "Ailment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientSource" ADD CONSTRAINT "IngredientSource_flaggedIngredientId_fkey" FOREIGN KEY ("flaggedIngredientId") REFERENCES "AilmentFlaggedIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAilment" ADD CONSTRAINT "UserAilment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAilment" ADD CONSTRAINT "UserAilment_ailmentId_fkey" FOREIGN KEY ("ailmentId") REFERENCES "Ailment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PreferenceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AilmentLinkedPreference" ADD CONSTRAINT "AilmentLinkedPreference_ailmentId_fkey" FOREIGN KEY ("ailmentId") REFERENCES "Ailment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AilmentLinkedPreference" ADD CONSTRAINT "AilmentLinkedPreference_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "Preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "Preference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedProduct" ADD CONSTRAINT "SavedProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedProduct" ADD CONSTRAINT "SavedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
