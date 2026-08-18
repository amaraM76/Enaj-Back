-- AlterTable: preference_education — add an optional structured
-- breakdown (sections) used instead of the flat whyPeopleAvoid
-- paragraph for preferences that cover many sub-categories, starting
-- with the enaJ Non-Toxic Baseline. Nullable/additive - every other
-- preference keeps rendering from whyPeopleAvoid unchanged.
ALTER TABLE "preference_education" ADD COLUMN "sections" JSONB;
