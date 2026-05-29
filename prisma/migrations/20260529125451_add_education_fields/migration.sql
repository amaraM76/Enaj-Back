-- AlterTable
ALTER TABLE "Ailment" ADD COLUMN     "description" TEXT,
ADD COLUMN     "generalSources" JSONB,
ADD COLUMN     "ingredientInfo" JSONB;

-- AlterTable
ALTER TABLE "Preference" ADD COLUMN     "FoundIn" TEXT[],
ADD COLUMN     "eduSources" JSONB,
ADD COLUMN     "whatItIs" TEXT,
ADD COLUMN     "whyAvoid" TEXT;
