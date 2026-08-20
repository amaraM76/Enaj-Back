import { PrismaClient, ProductCategory, ConditionSource, PreferenceSource } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { ailmentEducationData } from '../app/lib/ailment-education'
import { preferenceEducationData } from '../app/lib/preference-education'
import { journalCategoriesSeedData } from '../app/lib/journal-data'

const prisma = new PrismaClient();
async function main() {
  // Clear existing data in correct order
  await prisma.userPreference.deleteMany();
  await prisma.userJournalEntry.deleteMany();
  await prisma.userAilment.deleteMany();
  await prisma.ailmentLinkedPreference.deleteMany();
  await prisma.ingredientSource.deleteMany();
  await prisma.ailmentFlaggedIngredient.deleteMany();
  await prisma.preference.deleteMany();
  await prisma.preferenceCategory.deleteMany();
  await prisma.ailment.deleteMany();
  await prisma.ailmentCategory.deleteMany();
  await prisma.journalCondition.deleteMany();
  await prisma.journalCategory.deleteMany();
  // Only delete seeded products, not imported ones (imported slugs start with "off-")
  await prisma.product.deleteMany({
  where: { slug: { not: { startsWith: "off-" } } }
  });
  await prisma.userAuth.deleteMany();
  await prisma.userProfile.deleteMany();

  // ==========================================
  // Ailment Categories
  // ==========================================
  const ailmentCategories = await Promise.all(
    [
      { slug: "skin", label: "Skin Conditions", sortOrder: 1 },
      { slug: "digestive", label: "Digestive & Gut Health", sortOrder: 2 },
      { slug: "allergies", label: "Allergies & Sensitivities", sortOrder: 3 },
      { slug: "neurological", label: "Neurological & Chronic Conditions", sortOrder: 4 },
      { slug: "autoimmune", label: "Autoimmune & Inflammatory", sortOrder: 5 },
      { slug: "respiratory", label: "Respiratory Conditions", sortOrder: 6 },
      { slug: "hormonal", label: "Hormonal & Reproductive", sortOrder: 7 },
      { slug: "surgery", label: "Surgery & Post-Operative", sortOrder: 8 },
    ].map((cat) => prisma.ailmentCategory.create({ data: cat }))
  );

  const ailCatMap = Object.fromEntries(ailmentCategories.map((c) => [c.slug, c.id]));

  // ==========================================
  // Ailments
  // ==========================================
  const ailments = await Promise.all(
    [
      // Skin
      { slug: "rosacea", name: "Rosacea", categoryId: ailCatMap["skin"] },
      { slug: "eczema", name: "Eczema", categoryId: ailCatMap["skin"] },
      { slug: "sensitive-skin", name: "Sensitive Skin", categoryId: ailCatMap["skin"] },
      { slug: "psoriasis", name: "Psoriasis", categoryId: ailCatMap["skin"] },
      { slug: "perioral-dermatitis", name: "Perioral Dermatitis", categoryId: ailCatMap["skin"] },
      { slug: "acne", name: "Acne", categoryId: ailCatMap["skin"] },
      { slug: "dandruff", name: "Dandruff", categoryId: ailCatMap["skin"] },
      { slug: "contact-dermatitis", name: "Contact Dermatitis", categoryId: ailCatMap["skin"] },
      { slug: "keratosis-pilaris", name: "KP (Keratosis Pilaris)", categoryId: ailCatMap["skin"] },
      { slug: "sulfite-sensitivity", name: "Sulfite Sensitivity", categoryId: ailCatMap["skin"] },


      // Digestive
      { slug: "celiac", name: "Celiac Disease", categoryId: ailCatMap["digestive"] },
      { slug: "ibs", name: "IBS (Irritable Bowel Syndrome)", categoryId: ailCatMap["digestive"] },
      { slug: "crohns", name: "Crohn's Disease", categoryId: ailCatMap["digestive"] },
      { slug: "gerd", name: "GERD / Acid Reflux", categoryId: ailCatMap["digestive"] },
      { slug: "sibo", name: "SIBO (Small Intestinal Bacterial Overgrowth)", categoryId: ailCatMap["digestive"] },
      { slug: "gastritis", name: "Gastritis", categoryId: ailCatMap["digestive"] },
      { slug: "diverticulosis", name: "Diverticulosis", categoryId: ailCatMap["digestive"] },


      // Allergies
      { slug: "dairy-allergy", name: "Dairy Allergy / Lactose Intolerance", categoryId: ailCatMap["allergies"] },
      { slug: "nut-allergy", name: "Nut Allergy", categoryId: ailCatMap["allergies"] },
      { slug: "gluten-intolerance", name: "Gluten Intolerance", categoryId: ailCatMap["allergies"] },
      { slug: "soy-allergy", name: "Soy Allergy", categoryId: ailCatMap["allergies"] },
      { slug: "egg-allergy", name: "Egg Allergy", categoryId: ailCatMap["allergies"] },
      { slug: "histamine-intolerance", name: "Histamine Intolerance", categoryId: ailCatMap["allergies"] },


      // Neurological
      { slug: "parkinsons", name: "Parkinson's Disease", categoryId: ailCatMap["neurological"] },
      { slug: "dementia", name: "Dementia", categoryId: ailCatMap["neurological"] },
      { slug: "alzheimers", name: "Alzheimer's Disease", categoryId: ailCatMap["neurological"] },
      { slug: "epilepsy", name: "Epilepsy", categoryId: ailCatMap["neurological"] },
      { slug: "ms", name: "MS (Multiple Sclerosis)", categoryId: ailCatMap["neurological"] },
      { slug: "migraines", name: "Chronic Migraines", categoryId: ailCatMap["neurological"] },
      { slug: "neuropathy", name: "Peripheral Neuropathy", categoryId: ailCatMap["neurological"] },
      { slug: "adhd", name: "ADHD", categoryId: ailCatMap["neurological"] },
      { slug: "fibromyalgia", name: "Fibromyalgia", categoryId: ailCatMap["neurological"] },
      { slug: "als", name: "ALS (Amyotrophic Lateral Sclerosis)", categoryId: ailCatMap["neurological"] },
      { slug: "thalassemia-minor", name: "Thalassemia Minor", categoryId: ailCatMap["neurological"] },
      { slug: "thalassemia-major", name: "Thalassemia Major", categoryId: ailCatMap["neurological"] },


      // Autoimmune
      { slug: "lupus", name: "Lupus", categoryId: ailCatMap["autoimmune"] },
      { slug: "hashimotos", name: "Hashimoto's Thyroiditis", categoryId: ailCatMap["autoimmune"] },
      { slug: "rheumatoid", name: "Rheumatoid Arthritis", categoryId: ailCatMap["autoimmune"] },
      { slug: "anemia", name: "Anemia", categoryId: ailCatMap["autoimmune"] },
      { slug: "mcas", name: "MCAS (Mast Cell Activation Syndrome)", categoryId: ailCatMap["autoimmune"] },
      { slug: "pots", name: "POTS (Postural Orthostatic Tachycardia Syndrome)", categoryId: ailCatMap["autoimmune"] },
      { slug: "ibd", name: "IBD (Inflammatory Bowel Disease)", categoryId: ailCatMap["autoimmune"] },
      { slug: "sjogrens", name: "Sjögren's Syndrome", categoryId: ailCatMap["autoimmune"] },
      { slug: "graves-disease", name: "Graves' Disease", categoryId: ailCatMap["autoimmune"] },
      { slug: "ankylosing-spondylitis", name: "Ankylosing Spondylitis", categoryId: ailCatMap["autoimmune"] },
      { slug: "psoriatic-arthritis", name: "Psoriatic Arthritis", categoryId: ailCatMap["autoimmune"] },
      { slug: "interstitial-cystitis", name: "Interstitial Cystitis", categoryId: ailCatMap["autoimmune"] },
      { slug: "diabetes-type-1", name: "Diabetes Type 1", categoryId: ailCatMap["neurological"] },
      { slug: "diabetes-type-2", name: "Diabetes Type 2", categoryId: ailCatMap["neurological"] },


      // Respiratory
      { slug: "asthma", name: "Asthma", categoryId: ailCatMap["respiratory"] },

      // Hormonal
      { slug: "menopause", name: "Menopause", categoryId: ailCatMap["hormonal"] },
      { slug: "perimenopause", name: "Perimenopause", categoryId: ailCatMap["hormonal"] },
      { slug: "pregnant", name: "Pregnant", categoryId: ailCatMap["hormonal"] },
      { slug: "postpartum", name: "Postpartum", categoryId: ailCatMap["hormonal"] },
      { slug: "breastfeeding", name: "Breastfeeding", categoryId: ailCatMap["hormonal"] },
      { slug: "pcos", name: "PCOS (Polycystic Ovary Syndrome)", categoryId: ailCatMap["hormonal"] },
      { slug: "hormonal-acne", name: "Hormonal Acne", categoryId: ailCatMap["skin"] },
      { slug: "endometriosis", name: "Endometriosis", categoryId: ailCatMap["hormonal"] },
      { slug: "pmdd", name: "PMDD (Premenstrual Dysphoric Disorder)", categoryId: ailCatMap["hormonal"] },


      // Surgery
      { slug: "gastrectomy", name: "Gastrectomy Surgery", categoryId: ailCatMap["surgery"] },
      { slug: "bariatric", name: "Bariatric Surgery", categoryId: ailCatMap["surgery"] },
    ].map((a) => prisma.ailment.create({ data: a }))
  );

  const ailMap = Object.fromEntries(ailments.map((a) => [a.slug, a.id]));

  // ==========================================
  // Ailment Flagged Ingredients (with sources)
  // Only seeding a representative subset — Rosacea, Eczema, Celiac, Asthma
  // ==========================================


  // --- Contact Dermatitis ---
  const contactDermatitisIngredients = [
    { slug: "fragrance-cd", name: "Synthetic Fragrance", reason: "Patch testing studies consistently identify fragrance mixes as the single most common cause of allergic contact dermatitis, since fragrance blends often contain dozens of individual sensitizing compounds under one label term." },
    { slug: "nickel-cd", name: "Nickel", reason: "The most common metal allergen worldwide; once the immune system is sensitized to nickel, even brief skin contact can trigger a delayed, itchy rash 24-48 hours later." },
    { slug: "parabens-cd", name: "Parabens", reason: "Well-documented preservative allergens, especially on skin that's already broken or irritated, where they're more likely to penetrate and trigger a sensitized immune reaction." },
    { slug: "formaldehyde-cd", name: "Formaldehyde", reason: "A potent sensitizer and irritant on its own, and formaldehyde-releasing preservatives (which slowly release small amounts of it) are among the top allergens identified through dermatology patch testing." },
    { slug: "sls-cd", name: "Sodium Lauryl Sulfate", reason: "A harsh surfactant that strips protective oils from the skin's outer layer, making it easier for other allergens to penetrate and increasing the likelihood of an irritant reaction on its own." },
    { slug: "rubber-cd", name: "Thiuram Mix", reason: "A rubber accelerator chemical used in latex gloves and elastic bands; it's one of the most frequently positive allergens on standard contact dermatitis patch test panels." },
  ]
  for (const ing of contactDermatitisIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["contact-dermatitis"] } })
  }

  // --- Keratosis Pilaris ---
  const kpIngredients = [
    { slug: "sls-kp", name: "Sodium Lauryl Sulfate", reason: "A harsh surfactant that strips the skin's already-limited natural oils, worsening the dryness that makes KP's rough, bumpy texture more pronounced." },
    { slug: "fragrance-kp", name: "Synthetic Fragrance", reason: "A common irritant for skin already inflamed around clogged hair follicles, capable of increasing the redness surrounding KP bumps." },
    { slug: "mineral-oil-kp", name: "Mineral Oil", reason: "An occlusive ingredient that can sit on skin and further block hair follicles already plugged with keratin in KP, though lighter, non-comedogenic grades are sometimes better tolerated." },
    { slug: "alcohol-kp", name: "Alcohol Denat", reason: "Evaporates quickly and dries the skin surface, which can worsen the rough texture and redness that define keratosis pilaris." },
  ]
  for (const ing of kpIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["keratosis-pilaris"] } })
  }

  // --- Sulfite Sensitivity ---
  const sulfiteSensitivityIngredients = [
    { slug: "sodium-sulfite", name: "Sodium Sulfite", reason: "Releases sulfur dioxide gas when it reacts with stomach acid, and it's inhaling or ingesting that gas that triggers reactions like wheezing and flushing in sulfite-sensitive people." },
    { slug: "sodium-bisulfite", name: "Sodium Bisulfite", reason: "Converts to sulfur dioxide in the body, the same reactive compound the FDA estimates causes reactions in roughly 1 in 100 people, and a much higher share of people with asthma." },
    { slug: "potassium-metabisulfite", name: "Potassium Metabisulfite", reason: "Widely used to prevent oxidation and browning in wine and dried fruit; the FDA has required sulfite labeling on packaged foods since 1986 specifically because of reactions like these." },
    { slug: "sulfur-dioxide", name: "Sulfur Dioxide", reason: "The gas form of sulfite and the compound directly responsible for triggering airway irritation, hives, or gastrointestinal symptoms in sensitive individuals." },
    { slug: "sodium-metabisulfite", name: "Sodium Metabisulfite", reason: "One of the sulfite preservatives most frequently linked to asthma exacerbation, since inhaled sulfur dioxide can directly trigger bronchospasm in susceptible people." },
  ]
  for (const ing of sulfiteSensitivityIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["sulfite-sensitivity"] } })
  }

  // --- SIBO ---
  const siboIngredients = [
    { slug: "fructose-sibo", name: "Fructose", reason: "In SIBO, bacteria that should mostly live in the colon overgrow in the small intestine, where they ferment poorly absorbed sugars like excess fructose, producing the gas and bloating typical of a SIBO flare." },
    { slug: "lactose-sibo", name: "Lactose", reason: "Many people with SIBO also develop secondary lactose intolerance from bacterial damage to the gut lining, so undigested lactose reaching the overgrown bacteria produces excess gas and bloating." },
    { slug: "inulin-sibo", name: "Inulin", reason: "An excellent prebiotic fiber for a healthy colon, but it can dramatically worsen SIBO, since it's rapidly fermented by the very small-intestinal bacteria that are already overgrown." },
    { slug: "sorbitol-sibo", name: "Sorbitol", reason: "A sugar alcohol the small intestine absorbs slowly, giving SIBO bacteria extra time and substrate to ferment it into gas." },
    { slug: "guar-gum-sibo", name: "Guar Gum", reason: "A highly fermentable fiber thickener that the bacterial overgrowth in the small intestine can rapidly ferment into gas, often making SIBO bloating worse." },
    { slug: "xylitol-sibo", name: "Xylitol", reason: "Like other sugar alcohols, xylitol is poorly absorbed and readily fermented by small intestinal bacteria, a combination that frequently triggers SIBO symptoms." },
  ]
  for (const ing of siboIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["sibo"] } })
  }

  // --- Gastritis ---
  const gastritisIngredients = [
    { slug: "alcohol-gastritis", name: "Alcohol", reason: "Directly damages the protective mucus layer of the stomach and increases acid secretion, a combination that can erode an already inflamed lining and raise ulcer risk." },
    { slug: "caffeine-gastritis", name: "Caffeine", reason: "Stimulates the stomach to secrete more acid, which can further irritate a lining that's already inflamed and slower to heal in gastritis." },
    { slug: "citric-acid-gastritis", name: "Citric Acid", reason: "Its high acidity can directly irritate an inflamed stomach lining and lower the overall pH of stomach contents, worsening discomfort during a gastritis flare." },
    { slug: "capsaicin-gastritis", name: "Capsaicin", reason: "The compound responsible for chili heat directly stimulates pain receptors in the stomach lining, which can intensify the burning and discomfort of gastritis even though it doesn't damage tissue in most people." },
    { slug: "artificial-sweeteners-gastritis", name: "Artificial Sweeteners", reason: "Some non-nutritive sweeteners have been shown to shift gut bacteria balance, a change that may compound the digestive irritation already present in gastritis." },
    { slug: "vinegar-gastritis", name: "Vinegar", reason: "Highly acidic and capable of directly irritating a stomach lining that's already inflamed, often worsening the burning sensation associated with gastritis." },
  ]
  for (const ing of gastritisIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["gastritis"] } })
  }

  // --- Diverticulosis ---
  const diverticulosisIngredients = [
    { slug: "red-meat-diver", name: "Red Meat", reason: "Large prospective studies, including one published in the journal Gut, have linked high red meat consumption to increased diverticulosis risk, possibly through its effects on gut bacteria and inflammation." },
    { slug: "refined-grains-diver", name: "Refined Grains", reason: "Low in fiber compared to whole grains, refined grains produce smaller, harder stools that require more pressure to pass - the same colon pressure thought to drive pouch formation in diverticulosis." },
    { slug: "seed-oils-diver", name: "Seed Oils", reason: "Diets high in omega-6 fats from seed oils skew the body toward producing more pro-inflammatory compounds, which may contribute to the gut inflammation associated with diverticular flares." },
    { slug: "artificial-sweeteners-diver", name: "Artificial Sweeteners", reason: "Some non-nutritive sweeteners have been shown to alter the gut microbiome, a shift some researchers believe could influence diverticular disease activity." },
  ]
  for (const ing of diverticulosisIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["diverticulosis"] } })
  }

  // --- Egg Allergy ---
  const eggAllergyIngredients = [
    { slug: "egg-whole", name: "Egg", reason: "Contains ovalbumin and ovomucoid, the two proteins most responsible for triggering IgE-mediated allergic reactions to egg." },
    { slug: "egg-white", name: "Egg White", reason: "Carries the majority of egg's allergenic protein load, including ovalbumin, the single protein most commonly implicated in egg allergy reactions." },
    { slug: "egg-yolk", name: "Egg Yolk", reason: "Contains allergenic proteins like livetin, and while typically less reactive than egg white, it can still trigger a reaction in people with a true egg allergy." },
    { slug: "albumin-egg", name: "Albumin", reason: "A general term for the egg-white proteins responsible for most egg allergy reactions; it appears in many processed and baked foods as a hidden source of egg exposure." },
    { slug: "lysozyme-egg", name: "Lysozyme", reason: "An egg-derived antimicrobial enzyme used to extend shelf life in some cheeses and processed meats - a lesser-known but real hidden source of egg protein." },
    { slug: "mayonnaise-egg", name: "Mayonnaise", reason: "An egg-yolk-based emulsion that carries egg allergens even though many people don't think of it as an 'egg' product." },
    { slug: "lecithin-egg", name: "Egg Lecithin", reason: "Egg-derived lecithin retains trace allergenic protein, unlike the far more common soy lecithin, so it's worth checking the source when lecithin is listed on a label." },
  ]
  for (const ing of eggAllergyIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["egg-allergy"] } })
  }

  // --- Histamine Intolerance ---
  const histamineIngredients = [
    { slug: "vinegar-histamine", name: "Vinegar", reason: "A fermented product that accumulates histamine during processing; in people who don't break down dietary histamine efficiently (often due to lower DAO enzyme activity), it can trigger flushing, headache, or hives." },
    { slug: "alcohol-histamine", name: "Alcohol", reason: "Contains histamine from fermentation and also inhibits the DAO enzyme responsible for breaking histamine down - a double effect that makes alcohol one of the most reliable histamine intolerance triggers." },
    { slug: "aged-cheese-histamine", name: "Aged Cheese", reason: "Histamine accumulates the longer a cheese ages, so aged varieties like cheddar and parmesan carry some of the highest histamine levels of any food." },
    { slug: "fermented-foods-histamine", name: "Fermented Foods", reason: "The fermentation process behind sauerkraut, kimchi, and kefir also generates histamine as a byproduct, often at levels many times higher than the fresh vegetable." },
    { slug: "artificial-dyes-histamine", name: "Artificial Colors", reason: "Some synthetic dyes can trigger direct histamine release from mast cells, independent of dietary histamine load, compounding symptoms in sensitive individuals." },
    { slug: "msg-histamine", name: "Monosodium Glutamate", reason: "While not itself a histamine source, MSG has been reported to trigger histamine-like flushing and headache reactions in some sensitive individuals." },
    { slug: "tomatoes-histamine", name: "Tomatoes", reason: "Naturally high in histamine and also a histamine liberator, meaning they can trigger the body's own mast cells to release additional histamine." },
    { slug: "spinach-histamine", name: "Spinach", reason: "One of the few vegetables naturally high in histamine, making it a commonly flagged trigger for people managing histamine intolerance." },
  ]
  for (const ing of histamineIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["histamine-intolerance"] } })
  }

  // --- MCAS ---
  const mcasIngredients = [
    { slug: "alcohol-mcas", name: "Alcohol", reason: "A well-documented direct trigger of mast cell degranulation, the process at the core of MCAS symptoms like flushing, hives, and gastrointestinal upset." },
    { slug: "artificial-dyes-mcas", name: "Artificial Colors", reason: "One of the most frequently reported non-IgE mast cell triggers in MCAS, capable of provoking a reaction independent of any true allergy." },
    { slug: "msg-mcas", name: "Monosodium Glutamate", reason: "Some MCAS patients report MSG as a direct trigger of mast cell activation, producing flushing or headache reactions shortly after eating it." },
    { slug: "artificial-sweeteners-mcas", name: "Artificial Sweeteners", reason: "Reported by some MCAS patients as a trigger of mast cell symptoms, though the exact mechanism isn't well characterized in the research." },
    { slug: "fragrance-mcas", name: "Synthetic Fragrance", reason: "Airborne fragrance chemicals are among the most consistently reported environmental MCAS triggers, capable of provoking a reaction from inhalation alone." },
    { slug: "sulfites-mcas", name: "Sulfites", reason: "Sulfite preservatives are well documented to trigger mast cell degranulation directly, making them one of the more predictable dietary MCAS triggers." },
    { slug: "benzoates-mcas", name: "Sodium Benzoate", reason: "A preservative frequently implicated in non-IgE mast cell activation, triggering MCAS symptoms through a different pathway than a true food allergy." },
    { slug: "histamine-mcas", name: "High-Histamine Foods", reason: "Histamine is one of the primary mediators mast cells release, so histamine-rich foods can directly add to the symptom burden in MCAS on top of what the cells release on their own." },
  ]
  for (const ing of mcasIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["mcas"] } })
  }

  // --- POTS ---
  const potsIngredients = [
    { slug: "alcohol-pots", name: "Alcohol", reason: "Widens blood vessels (vasodilation) and promotes fluid loss, a combination that can drop blood pressure further and intensify the dizziness and racing heart already characteristic of POTS." },
    { slug: "caffeine-pots", name: "Caffeine", reason: "A diuretic that increases fluid loss, working against the increased fluid intake POTS management typically relies on, while also directly aggravating heart rate irregularities in sensitive individuals." },
    { slug: "artificial-sweeteners-pots", name: "Artificial Sweeteners", reason: "Some research suggests non-nutritive sweeteners may influence autonomic nervous system signaling, the same system that's already dysregulated in POTS." },
    { slug: "high-sugar-pots", name: "Refined Sugar", reason: "Causes rapid blood sugar spikes followed by crashes that can compound the fatigue, lightheadedness, and energy instability many people with POTS already experience." },
  ]
  for (const ing of potsIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["pots"] } })
  }

  // --- IBD ---
  const ibdIngredients = [
    { slug: "emulsifiers-ibd", name: "Polysorbate 80", reason: "Lab studies have shown this emulsifier can erode the protective mucus layer lining the gut, letting bacteria get closer to the intestinal wall and triggering the immune response central to IBD." },
    { slug: "carrageenan-ibd", name: "Carrageenan", reason: "Derived from seaweed, carrageenan has been shown in animal and cell studies to provoke gut inflammation, making it one of the most commonly cited additives of concern for people with IBD." },
    { slug: "artificial-sweeteners-ibd", name: "Artificial Sweeteners", reason: "Several non-nutritive sweeteners have been shown to shift the balance of gut bacteria in ways that may promote the intestinal inflammation central to IBD." },
    { slug: "gluten-ibd", name: "Gluten", reason: "Gluten's effect on intestinal permeability - sometimes called 'leaky gut' - is theorized to aggravate the immune response already elevated in IBD, though findings across studies are inconsistent." },
    { slug: "seed-oils-ibd", name: "Seed Oils", reason: "Diets high in omega-6 seed oils skew the body toward producing pro-inflammatory compounds, a pattern researchers have linked to more frequent IBD flares." },
    { slug: "alcohol-ibd", name: "Alcohol", reason: "Irritates and increases the permeability of the intestinal lining, a combination that frequently triggers flares in both Crohn's disease and ulcerative colitis." },
  ]
  for (const ing of ibdIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["ibd"] } })
  }

  // --- Sjögren's Syndrome ---
  const sjogrensIngredients = [
    { slug: "alcohol-sjogrens", name: "Alcohol", reason: "A diuretic that promotes further fluid loss, compounding the dry mouth and dry eyes already caused by Sjögren's attack on moisture-producing glands." },
    { slug: "caffeine-sjogrens", name: "Caffeine", reason: "Its diuretic effect increases fluid loss throughout the body, which can measurably worsen the dry mouth and dry eye symptoms that define Sjögren's." },
    { slug: "gluten-sjogrens", name: "Gluten", reason: "Sjögren's frequently co-occurs with celiac disease and other autoimmune conditions, and some patients report reduced overall autoimmune symptom burden avoiding gluten, though evidence specific to Sjögren's is limited." },
    { slug: "sugar-sjogrens", name: "Refined Sugar", reason: "With saliva's natural cavity-fighting flow already reduced by Sjögren's, sugar left sitting on teeth for longer periods raises the risk of the dental decay Sjögren's patients are already prone to." },
    { slug: "fragrance-sjogrens", name: "Synthetic Fragrance", reason: "Skin and eyes that are already dry and under-lubricated from Sjögren's tend to react more readily to common irritants like synthetic fragrance." },
    { slug: "sls-sjogrens", name: "Sodium Lauryl Sulfate", reason: "A harsh surfactant in toothpaste and cleansers that can further irritate oral tissue already compromised by the chronic dry mouth central to Sjögren's." },
  ]
  for (const ing of sjogrensIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["sjogrens"] } })
  }

  // --- Graves' Disease ---
  const gravesDiseaseIngredients = [
    { slug: "iodine-graves", name: "Iodine", reason: "The thyroid needs iodine as a raw material to make thyroid hormone, so excess dietary iodine can provide more fuel for the already-overactive thyroid in Graves' disease and worsen hyperthyroid symptoms." },
    { slug: "caffeine-graves", name: "Caffeine", reason: "Stimulates the heart and nervous system in a way that layers on top of - and can intensify - the palpitations, tremors, and anxiety already caused by excess thyroid hormone in Graves' disease." },
    { slug: "soy-graves", name: "Soy", reason: "Compounds in soy can bind to thyroid medication in the gut and reduce its absorption, so taking soy products too close to thyroid medication may blunt its effectiveness." },
    { slug: "gluten-graves", name: "Gluten", reason: "Autoimmune thyroid conditions like Graves' disease co-occur with celiac disease and gluten sensitivity more often than chance would predict, leading some patients and researchers to explore gluten's role in autoimmune thyroid activity." },
    { slug: "sugar-graves", name: "Refined Sugar", reason: "Promotes the kind of systemic inflammation that can compound the metabolic strain an already-overactive thyroid places on the body in Graves' disease." },
  ]
  for (const ing of gravesDiseaseIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["graves-disease"] } })
  }

  // --- Ankylosing Spondylitis ---
  const ankylSpondIngredients = [
    { slug: "starch-as", name: "Refined Starch", reason: "The London AS Diet theory holds that starchy foods feed Klebsiella bacteria in the gut, and that this bacterial overgrowth may trigger or sustain the autoimmune response driving AS flares in genetically susceptible people." },
    { slug: "sugar-as", name: "Refined Sugar", reason: "Promotes the kind of systemic, low-grade inflammation that can worsen the joint pain and stiffness central to AS." },
    { slug: "gluten-as", name: "Gluten", reason: "Often eliminated alongside starch under the low-starch AS diet theory, and some AS patients report reduced joint symptoms after cutting both." },
    { slug: "seed-oils-as", name: "Seed Oils", reason: "High omega-6 fat intake shifts the body toward producing more pro-inflammatory compounds, a pattern the Arthritis Foundation links to worsened symptoms across inflammatory arthritis conditions including AS." },
    { slug: "alcohol-as", name: "Alcohol", reason: "Can promote systemic inflammation and may also interact with NSAIDs and other medications commonly used to manage AS, raising the risk of gastrointestinal side effects." },
  ]
  for (const ing of ankylSpondIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["ankylosing-spondylitis"] } })
  }

  // --- Psoriatic Arthritis ---
  const psoriaticArthritisIngredients = [
    { slug: "sugar-pa", name: "Refined Sugar", reason: "Raises inflammatory markers in the bloodstream, a pathway shared by both the joint pain and skin plaques that define psoriatic arthritis." },
    { slug: "gluten-pa", name: "Gluten", reason: "Some psoriatic arthritis patients report improvement in both joint and skin symptoms on a gluten-free diet, particularly those with an undiagnosed gluten sensitivity." },
    { slug: "seed-oils-pa", name: "Seed Oils", reason: "High omega-6 fat intake promotes pro-inflammatory compounds that can worsen both the joint and skin inflammation central to psoriatic arthritis." },
    { slug: "alcohol-pa", name: "Alcohol", reason: "Linked to worsened psoriasis and psoriatic arthritis flares, and can also reduce the effectiveness of - or interact dangerously with - methotrexate and other common PsA medications." },
    { slug: "dairy-pa", name: "Dairy", reason: "Some psoriatic arthritis patients report that dairy worsens inflammation and skin flares, though the evidence is more anecdotal than for other triggers like sugar and alcohol." },
    { slug: "fragrance-pa", name: "Synthetic Fragrance", reason: "Can irritate the psoriatic skin plaques that often accompany psoriatic arthritis, triggering itching and inflammation on already-compromised skin." },
  ]
  for (const ing of psoriaticArthritisIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["psoriatic-arthritis"] } })
  }

  // --- Interstitial Cystitis ---
  const icIngredients = [
    { slug: "caffeine-ic", name: "Caffeine", reason: "Acts as both a bladder irritant and a diuretic, increasing urine acidity and frequency in a way that's one of the most consistently reported IC triggers." },
    { slug: "alcohol-ic", name: "Alcohol", reason: "Highly acidic and a diuretic, a combination that directly irritates the already-inflamed bladder lining in interstitial cystitis." },
    { slug: "citric-acid-ic", name: "Citric Acid", reason: "Found in citrus fruit and many packaged beverages, its high acidity is one of the most commonly cited dietary triggers among IC patients." },
    { slug: "artificial-sweeteners-ic", name: "Artificial Sweeteners", reason: "Several non-nutritive sweeteners are frequently reported by IC patients as symptom triggers, thought to act as direct bladder irritants in sensitive individuals." },
    { slug: "vinegar-ic", name: "Vinegar", reason: "Highly acidic, and acidity is one of the most consistently reported irritant properties for the sensitized bladder lining in IC." },
    { slug: "msg-ic", name: "Monosodium Glutamate", reason: "Reported by many IC patients as a trigger, possibly through a direct irritant effect on the bladder lining, though the mechanism isn't fully understood." },
    { slug: "carbonation-ic", name: "Carbonated Water", reason: "Carbonation itself, independent of any sweetener, is frequently reported by IC patients to aggravate bladder pain and urgency." },
  ]
  for (const ing of icIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["interstitial-cystitis"] } })
  }

  // --- Diabetes Type 1 ---
  const diabetes1Ingredients = [
    { slug: "refined-sugar-d1", name: "Refined Sugar", reason: "Because Type 1 diabetes leaves the body unable to produce its own insulin, refined sugar's rapid glucose spike has to be precisely matched with an insulin dose, making it one of the harder carbohydrates to manage safely." },
    { slug: "hfcs-d1", name: "High Fructose Corn Syrup", reason: "Raises blood glucose quickly and unpredictably, complicating the insulin dosing that people with Type 1 diabetes rely on to keep blood sugar in range." },
    { slug: "artificial-sweeteners-d1", name: "Artificial Sweeteners", reason: "Some research suggests non-nutritive sweeteners can alter gut bacteria in ways that affect blood glucose response, adding an extra layer of unpredictability to insulin dosing." },
    { slug: "trans-fats-d1", name: "Trans Fats", reason: "Raise LDL cholesterol and promote insulin resistance, compounding the elevated cardiovascular risk that already accompanies Type 1 diabetes over time." },
  ]
  for (const ing of diabetes1Ingredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["diabetes-type-1"] } })
  }

  // --- Diabetes Type 2 ---
  const diabetes2Ingredients = [
    { slug: "refined-sugar-d2", name: "Refined Sugar", reason: "Repeated blood sugar spikes from refined sugar force the pancreas to release more and more insulin over time, a pattern that drives the worsening insulin resistance at the core of Type 2 diabetes." },
    { slug: "hfcs-d2", name: "High Fructose Corn Syrup", reason: "Metabolized differently than regular sugar in ways researchers, including a widely cited Princeton study, have linked to promoting the insulin resistance central to Type 2 diabetes development and progression." },
    { slug: "trans-fats-d2", name: "Trans Fats", reason: "Interferes with normal insulin signaling at the cellular level while also raising LDL cholesterol, compounding both the insulin resistance and cardiovascular risk that define Type 2 diabetes." },
    { slug: "artificial-sweeteners-d2", name: "Artificial Sweeteners", reason: "Some studies suggest non-nutritive sweeteners can alter gut bacteria and blunt normal insulin signaling, potentially working against the blood sugar control Type 2 diabetes management depends on." },
    { slug: "seed-oils-d2", name: "Seed Oils", reason: "High omega-6 fat intake promotes the chronic, low-grade inflammation that research increasingly links to worsening insulin resistance in Type 2 diabetes." },
    { slug: "refined-carbs-d2", name: "Refined Grains", reason: "Stripped of the fiber that slows digestion, refined grains convert to glucose quickly, producing the kind of blood sugar spike that's hardest to manage with existing insulin resistance." },
  ]
  for (const ing of diabetes2Ingredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["diabetes-type-2"] } })
  }

  // --- Thalassemia Minor ---
  const thalMinorIngredients = [
    { slug: "iron-supplements-thal-minor", name: "Iron Supplements", reason: "Unlike iron-deficiency anemia, thalassemia minor isn't caused by low iron, so supplementing without first confirming an actual deficiency can build up excess iron in the body over time." },
    { slug: "alcohol-thal-minor", name: "Alcohol", reason: "Places extra strain on the liver, which already plays a role in processing and storing iron, and can worsen the mild anemia some people with thalassemia minor experience." },
    { slug: "caffeine-thal-minor", name: "Caffeine", reason: "Inhibits the body's absorption of dietary iron, which can push already-mild anemia in thalassemia minor slightly lower." },
  ]
  for (const ing of thalMinorIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["thalassemia-minor"] } })
  }

  // --- Thalassemia Major ---
  const thalMajorIngredients = [
    { slug: "iron-rich-thal-major", name: "Iron Supplements", reason: "Regular blood transfusions already deliver more iron than the body can naturally excrete in thalassemia major, so additional iron from supplements can accelerate the organ damage chelation therapy is meant to prevent." },
    { slug: "alcohol-thal-major", name: "Alcohol", reason: "The liver is already one of the organs most burdened by transfusion-related iron overload in thalassemia major, and alcohol adds further stress that can accelerate liver damage." },
    { slug: "vitamin-c-supplements-thal", name: "Vitamin C Supplements", reason: "Vitamin C significantly boosts how much iron the body absorbs from food, which is the opposite of what's needed when transfusion-related iron overload is already a central risk in thalassemia major." },
  ]
  for (const ing of thalMajorIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["thalassemia-major"] } })
  }

  // --- Endometriosis ---
  const endometriosisIngredients = [
    { slug: "trans-fats-endo", name: "Trans Fats", reason: "A 2010 study in Human Reproduction associated higher trans fat intake with increased endometriosis risk, likely through its role in promoting the pelvic inflammation that drives the condition." },
    { slug: "red-meat-endo", name: "Red Meat", reason: "Research published in the American Journal of Obstetrics & Gynecology has linked high red meat consumption to increased endometriosis risk, possibly through its influence on estrogen metabolism and inflammation." },
    { slug: "alcohol-endo", name: "Alcohol", reason: "Can raise circulating estrogen levels, and since endometrial-like tissue growth in endometriosis is estrogen-sensitive, this may fuel further tissue growth and worsen symptoms." },
    { slug: "caffeine-endo", name: "Caffeine", reason: "Some research has associated higher caffeine intake with elevated estrogen levels, a hormonal shift that could theoretically stimulate the estrogen-sensitive tissue growth central to endometriosis." },
    { slug: "seed-oils-endo", name: "Seed Oils", reason: "High omega-6 fat intake promotes pro-inflammatory compounds that can compound the chronic pelvic inflammation already driving endometriosis pain." },
    { slug: "gluten-endo", name: "Gluten", reason: "Some endometriosis patients report meaningful pain reduction on a gluten-free diet, though the mechanism isn't fully understood and evidence is still preliminary." },
    { slug: "dairy-endo", name: "Dairy", reason: "Contains hormones and growth factors that some endometriosis patients find worsen inflammation and pelvic pain, though individual response varies." },
  ]
  for (const ing of endometriosisIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["endometriosis"] } })
  }

  // --- PMDD ---
  const pmddIngredients = [
    { slug: "caffeine-pmdd", name: "Caffeine", reason: "A stimulant that can heighten anxiety and disrupt sleep, both of which compound the mood symptoms already amplified during PMDD's luteal-phase sensitivity." },
    { slug: "alcohol-pmdd", name: "Alcohol", reason: "A depressant that can directly worsen the depression and mood instability that define PMDD, particularly during the luteal phase when the brain's serotonin sensitivity is already disrupted." },
    { slug: "refined-sugar-pmdd", name: "Refined Sugar", reason: "The blood sugar swings that follow refined sugar intake can compound the mood instability and fatigue PMDD already produces during the luteal phase." },
    { slug: "salt-pmdd", name: "Excess Salt", reason: "Promotes water retention that adds to the bloating and physical discomfort many people with PMDD already experience in the days before their period." },
    { slug: "artificial-sweeteners-pmdd", name: "Artificial Sweeteners", reason: "Some research has explored whether certain sweeteners affect serotonin pathways, the same neurotransmitter system implicated in PMDD's heightened sensitivity to hormonal shifts." },
    { slug: "seed-oils-pmdd", name: "Seed Oils", reason: "High omega-6 fat intake promotes systemic inflammation that may compound the physical and mood symptoms that intensify during PMDD's luteal phase." },
  ]
  for (const ing of pmddIngredients) {
    await prisma.ailmentFlaggedIngredient.create({ data: { ...ing, ailmentId: ailMap["pmdd"] } })
  }
  // --- Rosacea ---
  const rosaceaIngredients = [
    { slug: "alcohol-denat", name: "Alcohol Denat", reason: "Dehydrates the skin surface and disrupts the barrier, a combination strongly linked in the National Rosacea Society's own patient-reported trigger surveys to flare-ups involving redness and stinging.", sources: [{ title: "National Rosacea Society - Skin Care Ingredients to Avoid", url: "https://www.rosacea.org/patients/skin-care-and-cosmetics" }, { title: "American Academy of Dermatology - Rosacea Triggers", url: "https://www.aad.org/public/diseases/rosacea/triggers/find" }] },
    { slug: "fragrance-rosacea", name: "Synthetic Fragrance", reason: "Consistently ranks among the top reported rosacea triggers in patient surveys, likely because fragrance compounds directly irritate skin that's already more reactive and permeable than typical skin.", sources: [{ title: "National Rosacea Society - Triggers Survey", url: "https://www.rosacea.org/patients/materials/triggersgraph.php" }, { title: "Journal of Clinical and Aesthetic Dermatology", url: "https://jcadonline.com/rosacea-triggers/" }] },
    { slug: "menthol", name: "Menthol", reason: "Creates a cooling sensation by stimulating nerve receptors in the skin, a stimulation that can trigger the flushing response central to a rosacea flare.", sources: [{ title: "National Rosacea Society - Skin Care Ingredients", url: "https://www.rosacea.org/patients/skin-care-and-cosmetics" }] },
    { slug: "witch-hazel", name: "Witch Hazel", reason: "Contains tannins that, despite its astringent reputation, can irritate and dry the already-compromised skin barrier common in rosacea.", sources: [{ title: "American Academy of Dermatology - Rosacea Treatment", url: "https://www.aad.org/public/diseases/rosacea/treatment" }] },
    { slug: "eucalyptus", name: "Eucalyptus Oil", reason: "A volatile plant oil frequently identified as an irritant for rosacea-prone skin, capable of triggering the stinging and redness of a flare.", sources: [{ title: "DermNet NZ - Rosacea", url: "https://dermnetnz.org/topics/rosacea" }] },
    { slug: "sodium-lauryl", name: "Sodium Lauryl Sulfate", reason: "Strips the skin's protective lipid barrier, and a weakened barrier is one of the underlying features that makes rosacea-prone skin more reactive to everyday products.", sources: [{ title: "Environmental Working Group - SLS Safety", url: "https://www.ewg.org/skindeep/ingredient/706110/SODIUM_LAURYL_SULFATE/" }, { title: "National Eczema Association", url: "https://nationaleczema.org/eczema-products/" }] },
  ];

  for (const ing of rosaceaIngredients) {
    const { sources, ...ingredientData } = ing;
    const created = await prisma.ailmentFlaggedIngredient.create({
      data: { ...ingredientData, ailmentId: ailMap["rosacea"] },
    });
    if (sources) {
      await Promise.all(
        sources.map((s) =>
          prisma.ingredientSource.create({ data: { ...s, flaggedIngredientId: created.id } })
        )
      );
    }
  }

  // --- Eczema ---
  const eczemaIngredients = [
    { slug: "fragrance-eczema", name: "Artificial Fragrance", reason: "One of the most frequently reported eczema triggers - fragrance chemicals can penetrate an already-compromised skin barrier and set off an inflammatory flare.", sources: [{ title: "National Eczema Association - Ingredients to Avoid", url: "https://nationaleczema.org/eczema-products/" }] },
    { slug: "parabens-eczema", name: "Parabens", reason: "Preservatives that some people with eczema find irritating to already-sensitized skin, though the reaction is less common than with fragrance.", sources: [{ title: "National Eczema Association", url: "https://nationaleczema.org/eczema-products/" }] },
    { slug: "sls-eczema", name: "Sodium Lauryl Sulfate", reason: "A harsh surfactant that strips the skin's natural oils and disrupts the already-weakened eczema skin barrier, worsening dryness and itching.", sources: [{ title: "National Eczema Association - SLS and Eczema", url: "https://nationaleczema.org/eczema-products/" }] },
    { slug: "coconut-oil-eczema", name: "Coconut Oil", reason: "Moisturizing for some, but its comedogenic (pore-clogging) properties and lauric acid content can worsen eczema in others - individual tolerance varies widely.", sources: [{ title: "National Eczema Association - Natural Oils", url: "https://nationaleczema.org/eczema-products/" }] },
    { slug: "lanolin", name: "Lanolin", reason: "Derived from sheep's wool wax and one of the more common contact allergens in people with eczema, despite being marketed as a gentle moisturizer.", sources: [{ title: "DermNet NZ - Lanolin Allergy", url: "https://dermnetnz.org/topics/lanolin-allergy" }] },
    { slug: "propylene-glycol", name: "Propylene Glycol", reason: "A common humectant and solvent that is one of the more frequently identified contact allergens in patch testing for eczema and contact dermatitis.", sources: [{ title: "National Eczema Association", url: "https://nationaleczema.org/eczema-products/" }] },
  ];

  for (const ing of eczemaIngredients) {
    const { sources, ...ingredientData } = ing;
    const created = await prisma.ailmentFlaggedIngredient.create({
      data: { ...ingredientData, ailmentId: ailMap["eczema"] },
    });
    if (sources.length > 0) {
      await Promise.all(
        sources.map((s) =>
          prisma.ingredientSource.create({ data: { ...s, flaggedIngredientId: created.id } })
        )
      );
    }
  }

  // --- Celiac ---
  const celiacIngredients = [
    { slug: "gluten", name: "Gluten", reason: "Directly triggers the autoimmune response that damages the small intestine's lining in celiac disease, even in trace amounts." },
    { slug: "wheat", name: "Wheat", reason: "The most common dietary source of gluten; wheat's gliadin protein is what the immune system reacts to in celiac disease." },
    { slug: "barley", name: "Barley", reason: "Contains hordein, a gluten protein that triggers the same autoimmune intestinal damage as wheat gluten in celiac disease." },
    { slug: "rye", name: "Rye", reason: "Contains secalin, a gluten protein structurally similar to wheat gluten that can trigger celiac's autoimmune response." },
    { slug: "malt", name: "Malt", reason: "Usually derived from barley, so malt and malt extract carry gluten proteins unless specifically labeled gluten-free." },
    { slug: "brewers-yeast", name: "Brewer's Yeast", reason: "Often cultured on a barley or wheat substrate, so it can carry gluten residue even though yeast itself is gluten-free." },
  ];

  for (const ing of celiacIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["celiac"] },
    });
  }

  // --- Asthma ---
  const asthmaIngredients = [
    { slug: "sulfites-asthma", name: "Sulfites", reason: "A well-documented asthma trigger - sulfite preservatives release sulfur dioxide gas that can irritate the airways and provoke bronchospasm in sulfite-sensitive asthmatics." },
    { slug: "artificial-colors-asthma", name: "Artificial Colors", reason: "Some synthetic dyes, particularly tartrazine (Yellow 5), have been reported to trigger asthma symptoms in a subset of sensitive individuals." },
    { slug: "benzoates", name: "Benzoates", reason: "Preservatives like sodium benzoate can trigger bronchospasm in aspirin-sensitive asthmatics and are sometimes grouped with sulfites as a food-additive respiratory trigger." },
  ];

  for (const ing of asthmaIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["asthma"] },
    });
  }

  // --- IBS ---
  const ibsIngredients = [
    { slug: "artificial-sweeteners-ibs", name: "Artificial Sweeteners", reason: "Sugar alcohols and some non-nutritive sweeteners are poorly absorbed in the small intestine and can ferment in the gut, drawing in water and gas that trigger IBS bloating and cramping." },
    { slug: "high-fructose", name: "High Fructose Corn Syrup", reason: "A high-FODMAP sweetener - excess fructose that isn't fully absorbed reaches the colon, where gut bacteria ferment it and produce the gas and bloating typical of an IBS flare." },
    { slug: "sorbitol", name: "Sorbitol", reason: "A sugar alcohol that the gut absorbs slowly and incompletely; the unabsorbed portion ferments in the colon and has a laxative effect, commonly triggering IBS diarrhea and cramping." },
    { slug: "inulin", name: "Inulin", reason: "A high-FODMAP prebiotic fiber that resists digestion and is rapidly fermented by colon bacteria, a common source of the gas and bloating that trigger IBS symptoms." },
    { slug: "lactose", name: "Lactose", reason: "Many people with IBS also have some degree of lactose malabsorption, so undigested lactose ferments in the colon and can trigger classic IBS symptoms like bloating and diarrhea." },
  ];

  for (const ing of ibsIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["ibs"] },
    });
  }

  // --- Nut Allergy ---
  const nutAllergyIngredients = [
    { slug: "peanuts", name: "Peanuts", reason: "A legume rather than a true tree nut, but one of the most common food allergens and a frequent cause of severe, potentially life-threatening reactions." },
    { slug: "almonds", name: "Almonds", reason: "A tree nut allergen; proteins in almonds can trigger reactions ranging from hives and swelling to anaphylaxis." },
    { slug: "cashews", name: "Cashews", reason: "A tree nut allergen closely related to pistachios, and among the tree nuts most associated with severe allergic reactions." },
    { slug: "walnuts", name: "Walnuts", reason: "A tree nut allergen that frequently cross-reacts with pecans due to their close botanical relation." },
    { slug: "pecans", name: "Pecans", reason: "A tree nut allergen closely related to walnuts; people allergic to one often react to the other." },
    { slug: "pistachios", name: "Pistachios", reason: "A tree nut allergen closely related to cashews; cross-reactivity between the two is common." },
    { slug: "macadamia", name: "Macadamia Nuts", reason: "A tree nut allergen; less common than other tree nut allergies, but reactions can still be severe." },
    { slug: "hazelnuts", name: "Hazelnuts", reason: "A tree nut allergen widely used in chocolate and baked goods, which makes accidental exposure especially common." },
    { slug: "brazil-nuts", name: "Brazil Nuts", reason: "A tree nut allergen containing potent seed storage proteins that can trigger reactions even in small amounts." },
    { slug: "pine-nuts", name: "Pine Nuts", reason: "Technically a seed rather than a true tree nut, but commonly grouped with tree nut allergens and capable of triggering similar reactions." },
  ];

  for (const ing of nutAllergyIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["nut-allergy"] },
    });
  }

  // --- Dairy Allergy ---
  const dairyAllergyIngredients = [
    { slug: "milk-dairy", name: "Milk", reason: "Contains the casein and whey proteins responsible for milk allergy reactions, plus lactose for those with lactose intolerance." },
    { slug: "cream-dairy", name: "Cream", reason: "A milk-derived product that carries the same casein and whey proteins that trigger milk allergy reactions." },
    { slug: "butter-dairy", name: "Butter", reason: "Made from milk fat, but can retain trace casein and whey - enough to trigger a reaction in highly milk-allergic individuals." },
    { slug: "butterfat-dairy", name: "Butterfat", reason: "The fat portion of milk, which can carry residual milk proteins capable of triggering a reaction in those with milk allergy." },
    { slug: "cheese-dairy", name: "Cheese", reason: "Made by concentrating milk proteins, so it carries a high concentration of the casein responsible for most milk allergy reactions." },
    { slug: "casein-dairy", name: "Casein", reason: "The primary milk protein and one of the two main triggers, along with whey, of true milk allergy reactions." },
    { slug: "caseinate-dairy", name: "Caseinate", reason: "A processed form of casein, such as sodium or calcium caseinate, used as an additive that still carries the allergenic milk protein." },
    { slug: "whey-dairy", name: "Whey", reason: "One of the two primary milk proteins, along with casein, responsible for milk allergy reactions; common in protein powders and baked goods." },
    { slug: "lactose-dairy", name: "Lactose", reason: "Milk sugar rather than a protein, so it doesn't trigger a true allergic reaction, but it is what causes symptoms in lactose intolerance." },
    { slug: "lactalbumin-dairy", name: "Lactalbumin", reason: "A whey protein fraction of milk that can trigger a reaction in people allergic to milk proteins." },
    { slug: "lactoglobulin-dairy", name: "Lactoglobulin", reason: "The major whey protein in cow's milk and a common trigger of milk allergy reactions." },
    { slug: "milk-solids-dairy", name: "Milk Solids", reason: "Concentrated milk proteins and sugars, including casein and lactose, that can trigger both milk allergy and lactose intolerance." },
    { slug: "milk-powder-dairy", name: "Milk Powder", reason: "Dehydrated milk that retains its full protein and lactose content, carrying the same allergy and intolerance risk as liquid milk." },
    { slug: "yogurt-dairy", name: "Yogurt", reason: "A fermented milk product; fermentation reduces lactose somewhat, but the casein and whey proteins remain and can still trigger milk allergy." },
    { slug: "ghee-dairy", name: "Ghee", reason: "Clarified butter with most milk solids removed, but trace casein can remain - potentially enough to trigger a reaction in highly sensitive individuals." },
  ];

  for (const ing of dairyAllergyIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["dairy-allergy"] },
    });
  }

  // --- Soy Allergy ---
  const soyAllergyIngredients = [
    { slug: "soy-allergy", name: "Soy", reason: "Soy protein is one of the most common food allergens and can trigger reactions ranging from mild hives to anaphylaxis." },
    { slug: "soybean-allergy", name: "Soybean", reason: "The whole legume that soy allergens derive from, containing the storage proteins responsible for most soy allergy reactions." },
    { slug: "soy-lecithin-allergy", name: "Soy Lecithin", reason: "A soy-derived emulsifier; manufacturing removes most of the protein, but trace amounts can still trigger a reaction in highly sensitive individuals." },
    { slug: "soy-protein-allergy", name: "Soy Protein", reason: "A concentrated or isolated soy protein additive that carries the same allergenic proteins responsible for soy allergy." },
    { slug: "soy-flour-allergy", name: "Soy Flour", reason: "Ground whole soybeans, retaining the full protein content responsible for soy allergy reactions." },
    { slug: "soybean-oil-allergy", name: "Soybean Oil", reason: "Highly refined soybean oil typically contains only trace protein, but cold-pressed or unrefined versions can carry more." },
    { slug: "tofu-allergy", name: "Tofu", reason: "Made from soy protein curds, so it carries the full allergenic protein load of soybeans." },
    { slug: "tempeh-allergy", name: "Tempeh", reason: "A fermented whole-soybean product; fermentation doesn't eliminate the proteins responsible for soy allergic reactions." },
    { slug: "miso-allergy", name: "Miso", reason: "A fermented soybean paste that retains soy allergens even after the fermentation process." },
    { slug: "edamame-allergy", name: "Edamame", reason: "Whole immature soybeans, carrying the same allergenic proteins as mature soybeans." },
    { slug: "hydrolyzed-soy-allergy", name: "Hydrolyzed Soy Protein", reason: "Soy protein broken down into smaller peptides for use as a flavor enhancer or filler; can still trigger a reaction in soy-allergic individuals." },
  ];

  for (const ing of soyAllergyIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["soy-allergy"] },
    });
  }

  // --- Gluten Intolerance ---
  const glutenIntoleranceIngredients = [
    { slug: "wheat-gluten", name: "Wheat", reason: "The most common source of dietary gluten; its gliadin protein is what triggers digestive and systemic symptoms in gluten sensitivity." },
    { slug: "barley-gluten", name: "Barley", reason: "Contains hordein, a gluten protein that can trigger the same digestive and inflammatory symptoms as wheat gluten." },
    { slug: "rye-gluten", name: "Rye", reason: "Contains secalin, a gluten protein similar to wheat gluten, commonly found in rye bread and crackers." },
    { slug: "spelt-gluten", name: "Spelt", reason: "An ancient wheat variety that still contains gluten, despite sometimes being marketed as easier to digest." },
    { slug: "kamut-gluten", name: "Kamut", reason: "An ancient wheat relative that contains gluten and can trigger the same symptoms as modern wheat." },
    { slug: "triticale-gluten", name: "Triticale", reason: "A wheat-rye hybrid grain that carries gluten from both parent grains." },
    { slug: "semolina-gluten", name: "Semolina", reason: "Milled from durum wheat, so it carries the full gluten content of wheat; common in pasta." },
    { slug: "durum-gluten", name: "Durum", reason: "A high-gluten wheat variety used mainly in pasta, and one of the more concentrated dietary gluten sources." },
    { slug: "wheat-flour-gluten", name: "Wheat Flour", reason: "Ground wheat retains its full gluten content, making it one of the most common hidden sources of gluten in processed foods." },
    { slug: "wheat-starch-gluten", name: "Wheat Starch", reason: "Most gluten protein is removed during processing, but residual amounts can remain unless the product is specifically labeled gluten-free." },
    { slug: "barley-malt-gluten", name: "Barley Malt Extract", reason: "Derived from barley, so it carries gluten and is a common hidden source in cereals, candy, and flavored snacks." },
    { slug: "gluten-gluten", name: "Gluten", reason: "The general term for the wheat, barley, and rye proteins responsible for digestive and systemic symptoms in gluten sensitivity." },
    { slug: "seitan-gluten", name: "Seitan", reason: "Made almost entirely of concentrated wheat gluten, making it one of the highest-gluten foods commonly eaten." },
    { slug: "couscous-gluten", name: "Couscous", reason: "Made from semolina wheat, so it carries a significant gluten content despite its small, grain-like appearance." },
    { slug: "bulgur-gluten", name: "Bulgur", reason: "A cracked wheat product that retains the full gluten content of the wheat kernel." },
  ];

  for (const ing of glutenIntoleranceIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["gluten-intolerance"] },
    });
  }

  // --- Sensitive Skin ---
  const sensitiveSkinIngredients = [
    { slug: "fragrance-sensitive", name: "Sythetic Fragrance", reason: "The single most frequently reported cause of cosmetic contact reactions - a listed 'fragrance' can be dozens of undisclosed chemicals, any of which can irritate reactive skin." },
    { slug: "alcohol-sensitive", name: "Alcohol", reason: "Short-chain drying alcohols evaporate quickly and strip the skin's protective lipid barrier, which reactive skin depends on more than most." },
    { slug: "retinol-sensitive", name: "Retinol", reason: "Increases skin cell turnover, which is effective for many but can cause redness, peeling, and heightened sensitivity to other irritants, especially at higher strengths." },
    { slug: "aha-sensitive", name: "Alpha Hydroxy Acids", reason: "Chemical exfoliants that dissolve the bonds between dead skin cells - useful in moderation, but can over-exfoliate and compromise the barrier on already-reactive skin." },
    { slug: "essential-oils-sensitive", name: "Essential Oils", reason: "Concentrated plant compounds (like citrus, lavender, or tea tree oil) that are among the most common causes of allergic contact reactions in sensitive skin, despite being 'natural.'" },
    { slug: "formaldehyde-sensitive", name: "Formaldehyde", reason: "A recognized skin sensitizer and irritant; even the low levels released by formaldehyde-donor preservatives can be enough to trigger a reaction in sensitive skin." },
    { slug: "sls-sensitive", name: "Sodium Lauryl Sulfate", reason: "A harsh surfactant designed to strip oil and dirt, which also strips the skin's own protective oils, often leaving reactive skin drier and more irritated." },
  ];

  for (const ing of sensitiveSkinIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["sensitive-skin"] },
    });
  }

  // --- Psoriasis ---
  const psoriasisIngredients = [
    { slug: "alcohol-psoriasis", name: "Alcohol", reason: "Drying alcohols evaporate quickly and pull moisture from psoriasis plaques, worsening the scaling and cracking that already make the skin barrier fragile." },
    { slug: "fragrance-psoriasis", name: "Synthetic Fragrance", reason: "A frequently reported trigger for psoriasis flare-ups - fragrance chemicals can irritate skin that is already inflamed and more permeable than typical skin." },
    { slug: "dyes-psoriasis", name: "Synthetic Dyes", reason: "Some synthetic colorants can irritate psoriatic skin directly, and a subset of people with psoriasis report dye sensitivity as part of broader chemical sensitivity." },
    { slug: "sulfates-psoriasis", name: "Sodium Lauryl Sulfate", reason: "A harsh cleansing surfactant that strips lipids from the skin surface, worsening the dryness and moisture loss that already accompany psoriasis plaques." },
    { slug: "retinoid-psoriasis", name: "Retinoids", reason: "Increase skin cell turnover and can thin the epidermis, which may worsen irritation on plaques unless used under a dermatologist's specific guidance for psoriasis." },
    { slug: "salicylic-psoriasis", name: "Salicylic Acid", reason: "A keratolytic used in some psoriasis treatments to soften scale, but it can sting and irritate when applied to actively inflamed or cracked plaques." },
  ];

  for (const ing of psoriasisIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["psoriasis"] },
    });
  }

  // --- Perioral Dermatitis ---
  const perioralIngredients = [
    { slug: "sls-pd", name: "Sodium Lauryl Sulfate", reason: "A harsh surfactant that strips the skin's natural oils and can irritate the already-compromised barrier around the mouth in perioral dermatitis, worsening redness and bumps." },
    { slug: "fluoride-pd", name: "Fluoride", reason: "Fluoride toothpaste is one of the most frequently reported triggers for perioral dermatitis, possibly because residual toothpaste around the mouth acts as a mild, repeated irritant to sensitive skin there." },
    { slug: "fragrance-pd", name: "Synthetic Fragrance", reason: "A common irritant for the sensitive, already-inflamed skin around the mouth affected by perioral dermatitis, capable of triggering or worsening a flare." },
    { slug: "steroids-pd", name: "Topical Steroids", reason: "Often used to calm the rash short-term, but corticosteroids can feed an underlying rebound cycle in perioral dermatitis, where symptoms return worse than before once the steroid is stopped." },
    { slug: "heavy-moisturizers-pd", name: "Petrolatum", reason: "Thick, occlusive products can trap moisture, bacteria, and irritants against skin already inflamed by perioral dermatitis, potentially prolonging a flare rather than helping it heal." },
    { slug: "cinnamon-pd", name: "Cinnamon", reason: "A well-documented skin irritant and allergen, often found in flavored lip products and toothpaste, that can directly trigger flare-ups on the sensitive skin around the mouth." },
    { slug: "paraben-pd", name: "Parabens", reason: "Preservatives that some people find irritating on skin that's already inflamed and barrier-compromised, as is typical in an active perioral dermatitis flare." },
  ];

  for (const ing of perioralIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["perioral-dermatitis"] },
    });
  }

  // --- Acne ---
  const acneIngredients = [
    { slug: "coconut-oil-acne", name: "Coconut Oil", reason: "Rated highly comedogenic on standard scales - its fatty acid profile is prone to clogging pores and can worsen breakouts in acne-prone skin." },
    { slug: "isopropyl-myristate-acne", name: "Isopropyl Myristate", reason: "A synthetic emollient commonly flagged in dermatology comedogenicity studies for clogging pores and contributing to acne breakouts." },
    { slug: "lanolin-acne", name: "Lanolin", reason: "A moderately comedogenic wax-based moisturizer that can sit on the skin surface and block pores in those prone to acne." },
    { slug: "mineral-oil-acne", name: "Mineral Oil", reason: "An occlusive ingredient that seals the skin surface; in acne-prone skin it can trap oil, dead skin cells, and bacteria inside the pore, contributing to breakouts." },
    { slug: "dimethicone-acne", name: "Dimethicone", reason: "A silicone that forms a film on skin; while non-comedogenic for most people, it can trap debris and oil against the skin in those prone to congestion and breakouts." },
    { slug: "cocoa-butter-acne", name: "Cocoa Butter", reason: "A rich, waxy butter that is highly comedogenic for many, meaning it's especially likely to clog pores and contribute to breakouts in acne-prone skin." },
    { slug: "algae-acne", name: "Algae Extract", reason: "Some algae and seaweed extracts are moderately comedogenic and can contribute to clogged pores in those with acne-prone skin, despite their 'natural' marketing." },
  ];

  for (const ing of acneIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["acne"] },
    });
  }

  // --- Dandruff ---
  const dandruffIngredients = [
    { slug: "sls-dandruff", name: "Sodium Lauryl Sulfate", reason: "A harsh surfactant that strips the scalp's natural protective oils, leaving skin more prone to the dryness and flaking that define dandruff." },
    { slug: "alcohol-dandruff", name: "Alcohol Denat", reason: "Evaporates quickly and pulls moisture from the scalp, which can worsen flaking - especially for the dry-skin type of dandruff rather than the oily, yeast-driven type." },
    { slug: "fragrance-dandruff", name: "Synthetic Fragrance", reason: "A frequently reported scalp irritant capable of triggering the itching and inflammation that accompany a dandruff flare-up." },
    { slug: "coconut-oil-dandruff", name: "Coconut Oil", reason: "Its fatty acid profile is a preferred food source for Malassezia, the yeast most strongly linked to dandruff, so it can worsen flaking in some people despite its moisturizing reputation." },
    { slug: "dimethicone-dandruff", name: "Dimethicone", reason: "A film-forming silicone that can build up on the scalp with repeated use, trapping dead skin flakes and irritants against the skin." },
    { slug: "parabens-dandruff", name: "Parabens", reason: "Preservatives that some people with an already inflamed, sensitive scalp find irritating, potentially compounding dandruff symptoms." },
  ];

  for (const ing of dandruffIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["dandruff"] },
    });
  }

  // --- Crohn's Disease ---
  const crohnsIngredients = [
    { slug: "carrageenan-crohns", name: "Carrageenan", reason: "Shown in animal studies to trigger gut inflammation and ulceration patterns resembling those seen in Crohn's flares, which is why it's a frequently cited additive of concern for the condition." },
    { slug: "food-dyes-crohns", name: "Artificial Colors", reason: "Some synthetic dyes have been shown in lab studies to increase intestinal permeability, a mechanism that could worsen the gut barrier dysfunction already present in Crohn's disease." },
    { slug: "emulsifiers-crohns", name: "Polysorbate 80", reason: "Erodes the protective mucus lining of the gut in animal studies, exposing the intestinal wall to bacteria in a way that can provoke the inflammatory response driving Crohn's flares." },
    { slug: "cmc-crohns", name: "Carboxymethylcellulose", reason: "A common thickener shown in controlled trials to alter gut bacteria composition and promote low-grade intestinal inflammation, raising concern for people managing Crohn's disease." },
    { slug: "maltodextrin-crohns", name: "Maltodextrin", reason: "May suppress beneficial gut bacteria while encouraging the growth of species linked to intestinal inflammation, a shift of particular concern in Crohn's disease." },
    { slug: "artificial-sweeteners-crohns", name: "Artificial Sweeteners", reason: "Some sweeteners alter the balance of gut bacteria in ways researchers believe can promote the chronic intestinal inflammation central to Crohn's disease." },
    { slug: "sulfites-crohns", name: "Sulfites", reason: "Sulfite preservatives can act as a direct gut irritant, and some Crohn's patients report them as a trigger for digestive flares." },
  ];

  for (const ing of crohnsIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["crohns"] },
    });
  }

  // --- GERD / Acid Reflux ---
  const gerdIngredients = [
    { slug: "caffeine-gerd", name: "Caffeine", reason: "Relaxes the lower esophageal sphincter, the muscular valve that normally keeps stomach acid from rising into the esophagus, making reflux more likely." },
    { slug: "citric-acid-gerd", name: "Citric Acid", reason: "Highly acidic, and can directly irritate an esophagus already sensitized by repeated acid exposure, worsening the burning sensation of reflux." },
    { slug: "peppermint-gerd", name: "Peppermint", reason: "Relaxes the lower esophageal sphincter in the same way caffeine does, which is why peppermint - often thought of as a stomach soother - can actually make reflux worse." },
    { slug: "chocolate-gerd", name: "Chocolate", reason: "Contains methylxanthines and fat that both relax the esophageal sphincter, making chocolate one of the most consistently reported GERD triggers." },
    { slug: "tomato-gerd", name: "Tomato", reason: "Highly acidic, and its acidity can directly irritate the esophageal lining as well as lower the pH of stomach contents that reflux upward." },
    { slug: "vinegar-gerd", name: "Vinegar", reason: "Highly acidic, capable of increasing stomach acidity and irritating an esophagus already inflamed by frequent reflux episodes." },
  ];

  for (const ing of gerdIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["gerd"] },
    });
  }

  // --- Parkinson's Disease ---
  const parkinsonsIngredients = [
    { slug: "msg-parkinsons", name: "Monosodium Glutamate", reason: "As an excitotoxin, glutamate overstimulation is one of several mechanisms researchers have studied in the neurodegeneration that characterizes Parkinson's." },
    { slug: "artificial-sweeteners-parkinsons", name: "Artificial Sweeteners", reason: "Some research has looked at whether non-nutritive sweeteners affect dopamine signaling, the neurotransmitter pathway most directly affected in Parkinson's, though evidence remains preliminary." },
    { slug: "pesticide-residue-parkinsons", name: "Pesticide Residue", reason: "Among the most consistently replicated environmental risk factors for Parkinson's - large epidemiological studies have linked chronic pesticide exposure to a significantly elevated risk of developing the disease." },
    { slug: "trans-fats-parkinsons", name: "Trans Fats", reason: "Promotes the neuroinflammation researchers increasingly believe plays a role in the progressive neuron loss underlying Parkinson's." },
    { slug: "hfcs-parkinsons", name: "High Fructose Corn Syrup", reason: "Chronic high sugar intake promotes systemic and neural inflammation, a pathway of ongoing interest in Parkinson's disease progression." },
  ];

  for (const ing of parkinsonsIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["parkinsons"] },
    });
  }

  // --- Dementia ---
  const dementiaIngredients = [
    { slug: "artificial-sweeteners-dementia", name: "Artificial Sweeteners", reason: "Large cohort studies have found an association between daily consumption of artificially sweetened beverages and a higher risk of dementia and stroke, though a causal mechanism hasn't been confirmed." },
    { slug: "trans-fats-dementia", name: "Trans Fats", reason: "Longitudinal studies link higher trans fat intake to smaller brain volume and a greater risk of cognitive decline, likely through their effects on vascular health and inflammation." },
    { slug: "msg-dementia", name: "Monosodium Glutamate", reason: "As an excitotoxin, glutamate is theorized by some researchers to contribute to the neuronal damage seen in progressive cognitive decline, though this remains an active area of research." },
    { slug: "aluminum-dementia", name: "Aluminum", reason: "Detected in the brain plaques associated with some forms of dementia, but major health bodies consider the evidence for aluminum as a direct cause inconclusive rather than settled." },
    { slug: "nitrates-dementia", name: "Sodium Nitrite", reason: "Converts to nitrosamines in the body, compounds studied for their role in the oxidative stress implicated in the neuronal damage underlying dementia." },
  ];

  for (const ing of dementiaIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["dementia"] },
    });
  }

  // --- Alzheimer's Disease ---
  const alzheimersIngredients = [
    { slug: "trans-fats-alzheimers", name: "Trans Fats", reason: "Multiple longitudinal studies have linked higher trans fat intake to increased Alzheimer's risk and worse cognitive test performance, likely via effects on vascular and brain health." },
    { slug: "nitrates-alzheimers", name: "Sodium Nitrite", reason: "Nitrosamines formed from nitrites have been studied for a possible role in the brain insulin resistance some researchers describe as a contributor to Alzheimer's-related decline." },
    { slug: "aluminum-alzheimers", name: "Aluminum", reason: "Found concentrated in Alzheimer's brain plaques, though the Alzheimer's Association and most researchers now consider it a bystander rather than a proven cause." },
    { slug: "hfcs-alzheimers", name: "High Fructose Corn Syrup", reason: "Chronic high sugar intake is linked to insulin resistance in the brain, a mechanism increasingly studied as a contributor to Alzheimer's-related cognitive decline." },
    { slug: "artificial-colors-alzheimers", name: "Artificial Colors", reason: "Research into whether some synthetic dyes can cross the blood-brain barrier and affect neural tissue is ongoing, though evidence specific to Alzheimer's risk is limited." },
  ];

  for (const ing of alzheimersIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["alzheimers"] },
    });
  }

  const alsIngredients = [
    { slug: "msg-als", name: "Monosodium Glutamate", reason: "Excitotoxin that may accelerate motor neuron damage" },
    { slug: "aspartame-als", name: "Aspartame", reason: "May contribute to excitotoxicity in ALS" },
    { slug: "mercury-als", name: "Mercury", reason: "Heavy metal linked to motor neuron toxicity" },
    { slug: "lead-als", name: "Lead", reason: "Heavy metal exposure associated with increased ALS risk" },
    { slug: "pesticides-als", name: "Pesticide Residue", reason: "Environmental toxin linked to elevated ALS risk" },
  ]
  
  for (const ing of alsIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["als"] },
    })
  }

  // --- Epilepsy ---
  const epilepsyIngredients = [
    { slug: "msg-epilepsy", name: "Monosodium Glutamate", reason: "As an excitotoxin, glutamate can overexcite neurons, and some people with epilepsy report it lowers their seizure threshold, though rigorous controlled evidence in humans is limited." },
    { slug: "aspartame-epilepsy", name: "Aspartame", reason: "Breaks down partly into aspartic acid, another excitatory amino acid; some individuals with epilepsy report increased seizure activity after consuming aspartame-sweetened products." },
    { slug: "food-dyes-epilepsy", name: "Artificial Colors", reason: "Some synthetic dyes have been studied for effects on neuronal excitability, and a subset of people with epilepsy self-report certain dyes as a personal trigger." },
    { slug: "caffeine-epilepsy", name: "Caffeine", reason: "High doses can overstimulate the central nervous system and have been documented to lower the seizure threshold in susceptible individuals." },
    { slug: "sucralose-epilepsy", name: "Sucralose", reason: "Emerging research suggests non-nutritive sweeteners can affect neural signaling and gut-brain communication, an area of ongoing study for people with seizure disorders." },
  ];

  for (const ing of epilepsyIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["epilepsy"] },
    });
  }

  // --- Multiple Sclerosis ---
  const msIngredients = [
    { slug: "gluten-ms", name: "Gluten", reason: "Some MS patients report symptom improvement on a gluten-free diet, and researchers have explored whether gluten-triggered intestinal permeability could influence the autoimmune activity driving MS." },
    { slug: "dairy-ms", name: "Dairy", reason: "Dairy proteins share a structural similarity with myelin oligodendrocyte glycoprotein, a component of the myelin sheath MS attacks - a resemblance researchers have studied as a possible immune trigger, dubbed butyrophilin cross-reactivity." },
    { slug: "saturated-fat-ms", name: "Saturated Fat", reason: "Cohort studies have associated diets high in saturated fat with more active MS lesions and faster disability progression, part of the reasoning behind low-saturated-fat approaches like the Swank diet." },
    { slug: "sugar-ms", name: "Refined Sugar", reason: "Promotes the systemic inflammation that some studies have linked to more frequent MS relapses." },
    { slug: "artificial-sweeteners-ms", name: "Artificial Sweeteners", reason: "Gut bacteria play a role in regulating immune function, and some non-nutritive sweeteners have been shown to alter that bacterial balance in ways researchers are still studying for MS relevance." },
  ];

  for (const ing of msIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["ms"] },
    });
  }

  // --- Chronic Migraines ---
  const migraineIngredients = [
    { slug: "msg-migraines", name: "Monosodium Glutamate", reason: "One of the most frequently self-reported migraine triggers - some researchers believe MSG can affect blood vessels and nerve signaling in susceptible people, though evidence is mixed." },
    { slug: "nitrates-migraines", name: "Sodium Nitrite", reason: "A vasodilator (widens blood vessels) used in cured and processed meats; the resulting change in blood flow is a well-documented migraine trigger sometimes called 'hot dog headache.'" },
    { slug: "artificial-sweeteners-migraines", name: "Aspartame", reason: "One of the most frequently reported dietary migraine triggers in patient surveys, though controlled studies on the mechanism have produced mixed results." },
    { slug: "tyramine-migraines", name: "Tyramine", reason: "A compound that builds up in aged, fermented, and cured foods; it can affect blood vessel tone and is a well-established migraine trigger, especially for those on certain medications." },
    { slug: "sulfites-migraines", name: "Sulfites", reason: "Preservatives common in wine and dried fruit that can trigger migraines in sensitive individuals, likely through a vascular or histamine-related mechanism." },
    { slug: "caffeine-migraines", name: "Caffeine", reason: "Can trigger a migraine directly in some people, but is more often a problem in withdrawal - a missed dose causes blood vessels to dilate rebound-style, setting off a headache." },
    { slug: "phenylethylamine-migraines", name: "Chocolate", reason: "Contains phenylethylamine and some caffeine-like compounds that can affect blood vessels and neurotransmitter levels, making chocolate a commonly reported migraine trigger." },
  ];

  for (const ing of migraineIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["migraines"] },
    });
  }

  // --- Peripheral Neuropathy ---
  const neuropathyIngredients = [
    { slug: "msg-neuropathy", name: "Monosodium Glutamate", reason: "As an excitotoxin, glutamate can overstimulate nerve receptors, a mechanism some researchers believe may aggravate the nerve pain and hypersensitivity of peripheral neuropathy." },
    { slug: "artificial-sweeteners-neuropathy", name: "Artificial Sweeteners", reason: "Some non-nutritive sweeteners have been studied for effects on peripheral nerve signaling and gut-nerve interactions, though evidence specific to neuropathy remains preliminary." },
    { slug: "gluten-neuropathy", name: "Gluten", reason: "Gluten sensitivity, including in people without confirmed celiac disease, has been linked in case studies to peripheral nerve damage that can improve on a gluten-free diet." },
    { slug: "sugar-neuropathy", name: "Refined Sugar", reason: "Chronically high blood sugar is the leading cause of diabetic peripheral neuropathy, damaging small nerve fibers over time through a well-documented mechanism." },
    { slug: "trans-fats-neuropathy", name: "Trans Fats", reason: "Promotes vascular inflammation that can impair blood flow to peripheral nerves, worsening the nerve damage underlying neuropathy." },
  ];

  for (const ing of neuropathyIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["neuropathy"] },
    });
  }

  // --- ADHD ---
  const adhdIngredients = [
    { slug: "food-dyes-adhd", name: "Artificial Colors", reason: "Randomized trials, including the widely cited Southampton study, found synthetic dyes like Red 40 and Yellow 5 measurably increased hyperactivity in children, which is why the UK and EU (though not the US) now require a warning label on foods containing them." },
    { slug: "hfcs-adhd", name: "High Fructose Corn Syrup", reason: "Diets high in added sugar cause blood sugar swings that some studies link to worsened impulsivity and attention difficulties, particularly in children already diagnosed with ADHD." },
    { slug: "artificial-flavors-adhd", name: "Artificial Flavors", reason: "Grouped alongside synthetic dyes in pediatric additive studies as part of a broader mix shown to increase hyperactive behavior in sensitive children." },
    { slug: "sodium-benzoate-adhd", name: "Sodium Benzoate", reason: "The same Southampton study that flagged synthetic dyes found sodium benzoate amplified their effect on hyperactivity when the two were consumed together." },
    { slug: "msg-adhd", name: "Monosodium Glutamate", reason: "As an excitotoxin, glutamate is theorized to overstimulate neural pathways involved in attention and impulse control, though evidence specific to ADHD is limited." },
    { slug: "caffeine-adhd", name: "Caffeine", reason: "Can make it harder to fall and stay asleep, and poor sleep reliably worsens inattention and irritability the next day in both children and adults with ADHD." },
  ];

  for (const ing of adhdIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["adhd"] },
    });
  }

  // --- Fibromyalgia ---
  const fibromyalgiaIngredients = [
    { slug: "msg-fibro", name: "Monosodium Glutamate", reason: "As an excitotoxin, glutamate can overactivate pain-signaling neurons; some fibromyalgia patients report flares after high-MSG meals, though clinical trials on dietary glutamate restriction have produced mixed results." },
    { slug: "aspartame-fibro", name: "Aspartame", reason: "Breaks down into phenylalanine and aspartic acid, compounds some researchers believe can amplify the central pain sensitization seen in fibromyalgia, though the mechanism remains debated." },
    { slug: "gluten-fibro", name: "Gluten", reason: "Even without confirmed celiac disease, some fibromyalgia patients report less pain and fatigue on a gluten-free trial, possibly reflecting an overlapping subset with non-celiac gluten sensitivity." },
    { slug: "sugar-fibro", name: "Refined Sugar", reason: "Blood sugar spikes and crashes can deepen the fatigue and brain fog that already accompany fibromyalgia, and added sugar promotes the low-grade inflammation linked to heightened pain sensitivity." },
    { slug: "caffeine-fibro", name: "Caffeine", reason: "Late-day caffeine can fragment the deep sleep fibromyalgia patients already struggle to get, and poor sleep is one of the most consistent drivers of next-day pain flares in the condition." },
  ];

  for (const ing of fibromyalgiaIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["fibromyalgia"] },
    });
  }

  // --- Lupus ---
  const lupusIngredients = [
    { slug: "alfalfa-lupus", name: "Alfalfa Sprouts", reason: "Contains L-canavanine, an amino acid documented in case reports to reactivate or worsen lupus symptoms by stimulating an already overactive immune system." },
    { slug: "garlic-lupus", name: "Garlic", reason: "Contains compounds like allicin that stimulate immune activity, which some lupus patients find worsens flares of a condition already driven by excess immune response." },
    { slug: "echinacea-lupus", name: "Echinacea", reason: "Marketed to 'boost' the immune system - exactly the mechanism that makes it risky in lupus, an autoimmune condition where excess immune activation drives disease flares." },
    { slug: "sulfites-lupus", name: "Sulfites", reason: "Sulfite preservatives have been reported to trigger sensitivity reactions in some lupus patients, potentially compounding the photosensitivity and skin flares many already experience." },
    { slug: "saturated-fat-lupus", name: "Saturated Fat", reason: "Diets high in saturated fat are linked to higher inflammatory markers, which can aggravate the systemic inflammation that defines a lupus flare." },
    { slug: "trans-fats-lupus", name: "Trans Fats", reason: "Raises inflammatory markers and impairs blood vessel function, both especially relevant in lupus, which already carries an elevated risk of cardiovascular complications." },
  ];

  for (const ing of lupusIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["lupus"] },
    });
  }

  // --- Hashimoto's Thyroiditis ---
  const hashimotosIngredients = [
    { slug: "gluten-hashimotos", name: "Gluten", reason: "Gluten's gliadin protein shares a structural resemblance to thyroid tissue, a phenomenon called molecular mimicry that some researchers believe can confuse the immune system and worsen thyroid antibody activity." },
    { slug: "soy-hashimotos", name: "Soy", reason: "Isoflavones in soy can interfere with the absorption of levothyroxine and other thyroid medications, and some studies suggest they may also affect thyroid peroxidase enzyme function." },
    { slug: "excess-iodine-hashimotos", name: "Iodine", reason: "While iodine is essential for thyroid hormone production, excess intake can accelerate autoimmune thyroid damage in people already predisposed to Hashimoto's." },
    { slug: "processed-sugar-hashimotos", name: "Refined Sugar", reason: "Promotes the low-grade systemic inflammation that can aggravate autoimmune thyroid activity and worsen the fatigue already common in Hashimoto's." },
    { slug: "seed-oils-hashimotos", name: "Seed Oils", reason: "Their high omega-6 content skews the body's inflammatory balance, potentially intensifying the autoimmune inflammation driving Hashimoto's." },
  ];

  for (const ing of hashimotosIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["hashimotos"] },
    });
  }

  // --- Rheumatoid Arthritis ---
  const rheumatoidIngredients = [
    { slug: "seed-oils-ra", name: "Seed Oils", reason: "Their high omega-6 content promotes the production of inflammatory prostaglandins, compounds implicated in the joint swelling and pain that characterize RA flares." },
    { slug: "gluten-ra", name: "Gluten", reason: "Some RA patients, particularly those with an underlying gluten sensitivity, report fewer flares on a gluten-free diet, though evidence for a direct autoimmune trigger is still preliminary." },
    { slug: "sugar-ra", name: "Refined Sugar", reason: "Raises inflammatory markers like CRP - one of the same markers doctors use in bloodwork to track RA disease activity." },
    { slug: "trans-fats-ra", name: "Trans Fats", reason: "Measurably raises systemic inflammatory markers, and cohort studies have linked higher trans fat intake to an increased risk of developing RA." },
    { slug: "msg-ra", name: "Monosodium Glutamate", reason: "Some RA patients report increased joint pain after eating MSG-heavy foods, though large controlled studies linking it specifically to RA activity are limited." },
    { slug: "nightshades-ra", name: "Nightshade", reason: "Solanine content is anecdotally linked to worsened joint pain in a subset of RA patients, though rigorous clinical evidence for a nightshade-arthritis connection remains thin." },
  ];

  for (const ing of rheumatoidIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["rheumatoid"] },
    });
  }

  // --- Anemia ---
  const anemiaIngredients = [
    { slug: "calcium-anemia", name: "Calcium Carbonate", reason: "Calcium competes with iron for the same absorption pathway in the small intestine, so a high-calcium supplement or meal taken alongside iron-rich food can significantly reduce how much iron the body actually absorbs." },
    { slug: "tannins-anemia", name: "Tannins", reason: "Tannins in tea and wine bind to dietary iron in the gut, forming a compound the body can't absorb - drinking tea with an iron-rich meal can blunt iron uptake substantially." },
    { slug: "phytates-anemia", name: "Phytic Acid", reason: "Found in whole grains, legumes, and nuts, phytic acid binds to non-heme iron in the gut and is one of the most well-documented dietary inhibitors of iron absorption." },
    { slug: "oxalates-anemia", name: "Oxalic Acid", reason: "Found in foods like spinach and rhubarb, oxalic acid can bind iron in the digestive tract and reduce the amount that's actually absorbed into the bloodstream." },
    { slug: "caffeine-anemia", name: "Caffeine", reason: "Compounds in coffee and tea, including caffeine and polyphenols, can reduce iron absorption by as much as half when consumed alongside an iron-rich meal." },
  ];

  for (const ing of anemiaIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["anemia"] },
    });
  }

  // --- Menopause ---
  const menopauseIngredients = [
    { slug: "caffeine-menopause", name: "Caffeine", reason: "Stimulates the nervous system in a way that can trigger or intensify hot flashes, while also disrupting the sleep that hormonal changes already make harder to get." },
    { slug: "sugar-menopause", name: "Refined Sugar", reason: "Blood sugar swings compound the mood volatility that declining estrogen already causes, and some studies link higher added-sugar intake to more frequent hot flashes." },
    { slug: "alcohol-menopause", name: "Alcohol", reason: "A well-documented hot flash and night sweat trigger; it dilates blood vessels and disrupts the sleep architecture that hormonal changes have already made fragile." },
    { slug: "spicy-menopause", name: "Capsaicin", reason: "Triggers the body's heat and sweat response directly, which is why spicy foods set off flashes for many people going through menopause." },
    { slug: "msg-menopause", name: "Monosodium Glutamate", reason: "Some people notice MSG-triggered headaches becoming more frequent during the hormonal fluctuations of menopause, though a direct causal link isn't well established." },
    { slug: "artificial-sweeteners-menopause", name: "Artificial Sweeteners", reason: "Emerging research on how non-nutritive sweeteners affect the gut microbiome is relevant here, since gut bacteria play a role in how the body metabolizes and recycles estrogen." },
  ];

  for (const ing of menopauseIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["menopause"] },
    });
  }

  // --- Perimenopause ---
  const perimenopauseIngredients = [
    { slug: "caffeine-perimeno", name: "Caffeine", reason: "Overstimulates a nervous system already sensitized by fluctuating estrogen, which is why many people find caffeine intensifies both hot flashes and the anxiety common in perimenopause." },
    { slug: "sugar-perimeno", name: "Refined Sugar", reason: "Blood sugar spikes and crashes layer on top of the hormonal swings already driving mood instability during perimenopause, often making both worse together." },
    { slug: "alcohol-perimeno", name: "Alcohol", reason: "Dilates blood vessels and disrupts sleep, a combination that frequently triggers hot flashes and night sweats during the unpredictable hormone swings of perimenopause." },
    { slug: "soy-perimeno", name: "Soy", reason: "Contains phytoestrogens - plant compounds that weakly bind estrogen receptors - which can have an unpredictable effect on symptoms during a phase when the body's own estrogen is already fluctuating erratically." },
    { slug: "artificial-sweeteners-perimeno", name: "Artificial Sweeteners", reason: "Some research links non-nutritive sweeteners to shifts in gut bacteria, which play a role in hormone metabolism and may compound the mood and symptom fluctuations of perimenopause." },
  ];

  for (const ing of perimenopauseIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["perimenopause"] },
    });
  }

  // --- Pregnant ---
const pregnantIngredients = [
  { slug: "retinol-pregnant", name: "Retinol", reason: "High doses of vitamin A derivatives are linked to birth defects and should be avoided during pregnancy" },
  { slug: "retinoids-pregnant", name: "Retinoids", reason: "Prescription retinoids (tretinoin, adapalene) are teratogenic and must be avoided during pregnancy" },
  { slug: "salicylic-acid-pregnant", name: "Salicylic Acid", reason: "High-dose salicylic acid is not recommended during pregnancy; low concentrations in rinse-off products may be acceptable but should be discussed with a doctor" },
  { slug: "benzoyl-peroxide-pregnant", name: "Benzoyl Peroxide", reason: "Typically avoided during pregnancy due to limited safety data" },
  { slug: "oxybenzone-pregnant", name: "Oxybenzone", reason: "Chemical UV filter that is absorbed into the bloodstream and may disrupt hormones — mineral sunscreens are preferred during pregnancy" },
  { slug: "formaldehyde-pregnant", name: "Formaldehyde", reason: "Known carcinogen and developmental toxin — avoid in hair treatments and nail products during pregnancy" },
  { slug: "phthalates-pregnant", name: "Phthalates", reason: "Endocrine disruptors linked to developmental harm — commonly hidden under 'fragrance' on labels" },
  { slug: "parabens-pregnant", name: "Parabens", reason: "Potential endocrine disruptors that can cross the placenta — many healthcare providers recommend avoiding during pregnancy" },
  { slug: "artificial-sweeteners-pregnant", name: "Artificial Sweeteners", reason: "Some artificial sweeteners (e.g. saccharin) are not recommended during pregnancy due to potential fetal exposure" },
  { slug: "caffeine-pregnant", name: "Caffeine", reason: "High caffeine intake is associated with low birth weight and pregnancy complications — limit to under 200mg/day" },
  { slug: "alcohol-pregnant", name: "Alcohol", reason: "No safe level of alcohol has been established during pregnancy — linked to fetal alcohol spectrum disorders" },
  { slug: "high-mercury-fish-pregnant", name: "Mercury", reason: "High-mercury fish (shark, swordfish, king mackerel) should be avoided during pregnancy due to neurodevelopmental risks" },
  { slug: "nitrates-pregnant", name: "Sodium Nitrite", reason: "Found in processed meats — associated with adverse pregnancy outcomes when consumed in large amounts" },
  { slug: "bpa-pregnant", name: "BPA", reason: "Endocrine disruptor found in plastics and can linings — linked to developmental issues and should be avoided during pregnancy" },
  { slug: "listeria-pregnant", name: "Unpasteurized Ingredients", reason: "Raw/unpasteurized dairy and juices carry listeria risk which is especially dangerous during pregnancy" },
];

for (const ing of pregnantIngredients) {
  await prisma.ailmentFlaggedIngredient.create({
    data: { ...ing, ailmentId: ailMap["pregnant"] },
  });
}

// --- Postpartum ---
const postpartumIngredients = [
  { slug: "caffeine-postpartum", name: "Caffeine", reason: "Passes into breast milk — excessive intake can cause infant irritability and sleep disruption" },
  { slug: "alcohol-postpartum", name: "Alcohol", reason: "Passes into breast milk — should be avoided or timed carefully around feeding sessions" },
  { slug: "artificial-sweeteners-postpartum", name: "Artificial Sweeteners", reason: "Some sweeteners pass into breast milk — safety data during breastfeeding is limited" },
  { slug: "peppermint-postpartum", name: "Peppermint Oil", reason: "Large amounts of peppermint/menthol may reduce milk supply in breastfeeding mothers" },
  { slug: "sage-postpartum", name: "Sage", reason: "Sage is traditionally known to reduce breast milk supply and should be avoided in large amounts while breastfeeding" },
  { slug: "parsley-postpartum", name: "Parsley", reason: "Large amounts may reduce milk supply — occasional culinary use is fine but supplements should be avoided" },
  { slug: "retinol-postpartum", name: "Retinol", reason: "Passes into breast milk — topical retinoids are generally avoided during breastfeeding" },
  { slug: "salicylic-acid-postpartum", name: "Salicylic Acid", reason: "High-dose salicylates may pass into breast milk — limited use on small areas is typically considered safer" },
  { slug: "parabens-postpartum", name: "Parabens", reason: "Endocrine disruptors that can pass into breast milk — many healthcare providers recommend avoiding during breastfeeding" },
  { slug: "high-mercury-postpartum", name: "Mercury", reason: "High-mercury fish should be limited during breastfeeding as mercury passes into breast milk" },
  { slug: "nitrates-postpartum", name: "Sodium Nitrite", reason: "Found in processed meats — best minimized while breastfeeding" },
  { slug: "formaldehyde-postpartum", name: "Formaldehyde", reason: "Known carcinogen — avoid in hair treatments and nail products while breastfeeding" },
  { slug: "bpa-postpartum", name: "BPA", reason: "Can pass into breast milk — use BPA-free bottles and food storage while breastfeeding" },
];

for (const ing of postpartumIngredients) {
  await prisma.ailmentFlaggedIngredient.create({
    data: { ...ing, ailmentId: ailMap["postpartum"] },
  });
}

// --- BreastFeeding ---
const breastfeedingIngredients = [
  { slug: "caffeine-breastfeeding", name: "Caffeine", reason: "Passes into breast milk — excessive intake can cause infant irritability and sleep disruption" },
  { slug: "alcohol-breastfeeding", name: "Alcohol", reason: "Passes into breast milk — should be avoided or timed carefully around feeding sessions" },
  { slug: "artificial-sweeteners-breastfeeding", name: "Artificial Sweeteners", reason: "Some sweeteners pass into breast milk — safety data during breastfeeding is limited" },
  { slug: "peppermint-breastfeeding", name: "Peppermint Oil", reason: "Large amounts of peppermint/menthol may reduce milk supply in breastfeeding mothers" },
  { slug: "sage-breastfeeding", name: "Sage", reason: "Traditionally known to reduce breast milk supply — avoid in large amounts while breastfeeding" },
  { slug: "parsley-breastfeeding", name: "Parsley", reason: "Large amounts may reduce milk supply — supplements should be avoided" },
  { slug: "retinol-breastfeeding", name: "Retinol", reason: "Passes into breast milk — topical retinoids are generally avoided during breastfeeding" },
  { slug: "salicylic-acid-breastfeeding", name: "Salicylic Acid", reason: "High-dose salicylates may pass into breast milk — high-concentration formulas should be avoided" },
  { slug: "parabens-breastfeeding", name: "Parabens", reason: "Endocrine disruptors that can pass into breast milk — minimize exposure during breastfeeding" },
  { slug: "high-mercury-breastfeeding", name: "Mercury", reason: "High-mercury fish should be limited during breastfeeding as mercury passes into breast milk" },
  { slug: "nitrates-breastfeeding", name: "Sodium Nitrite", reason: "Found in processed meats — best minimized while breastfeeding" },
  { slug: "formaldehyde-breastfeeding", name: "Formaldehyde", reason: "Known carcinogen — avoid in hair treatments and nail products while breastfeeding" },
  { slug: "bpa-breastfeeding", name: "BPA", reason: "Can pass into breast milk — use BPA-free bottles and food storage while breastfeeding" },
];

for (const ing of breastfeedingIngredients) {
  await prisma.ailmentFlaggedIngredient.create({
    data: { ...ing, ailmentId: ailMap["breastfeeding"] },
  });
}

// --- PCOS ---
const pcosIngredients = [
  { slug: "refined-sugar-pcos", name: "Refined Sugar", reason: "Drives the insulin spikes that, in PCOS, feed back into higher androgen production - the same cycle that underlies irregular periods, acne, and excess hair growth." },
  { slug: "hfcs-pcos", name: "High Fructose Corn Syrup", reason: "Rapidly raises blood sugar and insulin levels, reinforcing the insulin resistance that sits at the center of PCOS for many patients." },
  { slug: "artificial-sweeteners-pcos", name: "Artificial Sweeteners", reason: "Some research suggests non-nutritive sweeteners can alter gut bacteria and blunt normal insulin response, potentially working against the insulin sensitivity that's central to managing PCOS." },
  { slug: "seed-oils-pcos", name: "Seed Oils", reason: "High omega-6 fat intake promotes the kind of chronic inflammation that research has linked to worsened insulin resistance and hormonal imbalance in PCOS." },
  { slug: "dairy-pcos", name: "Dairy", reason: "Contains hormones and growth factors like IGF-1 that some studies suggest can raise androgen activity, potentially worsening the excess androgen levels that define PCOS." },
  { slug: "soy-pcos", name: "Soy", reason: "Its plant-based phytoestrogens can interact with the body's hormone receptors, and while research is mixed, some PCOS patients report symptom changes tied to soy intake." },
]

for (const ing of pcosIngredients) {
  await prisma.ailmentFlaggedIngredient.create({
    data: { ...ing, ailmentId: ailMap["pcos"] },
  })
}

// --- Hormonal Acne ---
const hormonalAcneIngredients = [
  { slug: "dairy-hormonal-acne", name: "Dairy", reason: "Contains naturally occurring hormones and growth factors like IGF-1 that stimulate oil glands and increase androgen activity, directly feeding the mechanism behind hormonal acne breakouts." },
  { slug: "whey-hormonal-acne", name: "Whey Protein", reason: "Spikes both insulin and IGF-1 more sharply than most other proteins, a hormonal combination that increases sebum production and androgen activity linked to hormonal acne." },
  { slug: "refined-sugar-hormonal-acne", name: "Refined Sugar", reason: "High-glycemic foods cause rapid insulin spikes that in turn trigger androgen production and increased sebum output, worsening hormonal acne." },
  { slug: "hfcs-hormonal-acne", name: "High Fructose Corn Syrup", reason: "Produces a sharp insulin spike similar to refined sugar, driving the same androgen and sebum response that worsens hormonal acne." },
  { slug: "seed-oils-hormonal-acne", name: "Seed Oils", reason: "High omega-6 fat content promotes skin inflammation that can compound the hormonally driven breakouts characteristic of this acne type." },
  { slug: "artificial-sweeteners-hormonal-acne", name: "Artificial Sweeteners", reason: "Some research suggests non-nutritive sweeteners can alter gut bacteria in ways that may influence hormonal balance and, in turn, acne activity." },
  { slug: "coconut-oil-hormonal-acne", name: "Coconut Oil", reason: "Rated highly comedogenic on standard scales, meaning its fatty acid profile is especially likely to clog pores already prone to breakouts from hormonal fluctuations." },
  { slug: "isopropyl-hormonal-acne", name: "Isopropyl Myristate", reason: "A synthetic emollient frequently flagged in dermatology comedogenicity studies for clogging pores, adding another breakout risk on top of hormonally driven oil production." },
]

for (const ing of hormonalAcneIngredients) {
  await prisma.ailmentFlaggedIngredient.create({
    data: { ...ing, ailmentId: ailMap["hormonal-acne"] },
  })
}

  // --- Gastrectomy Surgery ---
  const gastrectomyIngredients = [
    { slug: "sugar-gastrectomy", name: "Refined Sugar", reason: "With a smaller or bypassed stomach, sugar reaches the small intestine too quickly, pulling in fluid and triggering dumping syndrome - cramping, nausea, and a rapid heart rate." },
    { slug: "hfcs-gastrectomy", name: "High Fructose Corn Syrup", reason: "Rapidly absorbed sugars like high fructose corn syrup can flood the shortened digestive tract and trigger dumping syndrome after gastrectomy." },
    { slug: "artificial-sweeteners-gastrectomy", name: "Artificial Sweeteners", reason: "Some sugar substitutes, particularly sugar alcohols, can cause gas and diarrhea in a digestive system that's already adjusting to a smaller stomach." },
    { slug: "lactose-gastrectomy", name: "Lactose", reason: "Gastrectomy can reduce the enzyme activity needed to digest lactose, making new or worsened lactose intolerance common after surgery." },
    { slug: "carbonation-gastrectomy", name: "Carbonated Water", reason: "A smaller stomach has far less room to accommodate gas, so carbonated drinks are a common cause of post-gastrectomy bloating and discomfort." },
    { slug: "fat-gastrectomy", name: "High Fat Content", reason: "With reduced stomach capacity and altered digestive enzyme timing, high-fat foods are harder to break down after gastrectomy and can cause nausea or diarrhea." },
  ];

  for (const ing of gastrectomyIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["gastrectomy"] },
    });
  }

  // --- Bariatric Surgery ---
  const bariatricIngredients = [
    { slug: "sugar-bariatric", name: "Refined Sugar", reason: "Rapidly absorbed sugar reaching the shortened small intestine too quickly is the classic trigger for dumping syndrome after bariatric surgery, causing cramping, nausea, and a rapid heartbeat." },
    { slug: "hfcs-bariatric", name: "High Fructose Corn Syrup", reason: "Quickly digested sugars like high fructose corn syrup can trigger dumping syndrome and are calorie-dense in a way that can undermine post-surgery weight loss." },
    { slug: "artificial-sweeteners-bariatric", name: "Artificial Sweeteners", reason: "Some patients find sweet-tasting substitutes keep sugar cravings active, and certain sugar alcohols can cause gas and diarrhea in the altered post-surgery gut." },
    { slug: "carbonation-bariatric", name: "Carbonated Water", reason: "A much smaller stomach pouch has little room for gas expansion, making carbonated beverages a common source of pain and bloating after bariatric surgery." },
    { slug: "alcohol-bariatric", name: "Alcohol", reason: "Bariatric surgery changes stomach anatomy so alcohol reaches the bloodstream faster and in higher concentrations, meaning intoxication and impairment set in much more quickly than before surgery." },
    { slug: "fat-bariatric", name: "High Fat Content", reason: "A smaller stomach and altered bile flow make fat harder to digest after bariatric surgery, often causing nausea or dumping syndrome." },
  ];

  for (const ing of bariatricIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["bariatric"] },
    });
  }

  // ==========================================
  // Preference Categories
  // ==========================================
  const prefCategories = await Promise.all(
    [
      { slug: "hormone-endocrine", label: "Hormone & Endocrine Disruptors", description: "Endocrine disruptors are chemicals that can mimic, block, or interfere with the body's natural hormones. They are found in many everyday products including plastics, cosmetics, and sunscreens. Research from the Endocrine Society and the National Institutes of Health has linked prolonged exposure to reproductive health concerns, thyroid disruption, and developmental effects. Some individuals, particularly those with hormone-sensitive conditions, choose to limit their exposure.", sortOrder: 1 },
      { slug: "skin-eye-irritants", label: "Skin & Eye Irritants", description: "These are ingredients commonly identified by dermatologists as potential triggers for skin reactions, redness, dryness, or irritation. Sulfates (like SLS) are strong surfactants that can strip the skin's natural moisture barrier. Alcohol-based ingredients can cause dryness, and silicones may trap debris in pores. People with sensitive skin, eczema, rosacea, or contact dermatitis often find that avoiding these ingredients reduces flare-ups.", sortOrder: 2 },
      { slug: "preservatives-antimicrobials", label: "Harsh Preservatives & Antimicrobials", description: "Preservatives extend product shelf life and antimicrobials prevent bacterial growth, but some have come under regulatory scrutiny. Triclosan was banned by the FDA from consumer hand soaps in 2016. Formaldehyde is classified as a known human carcinogen by the National Toxicology Program. Nitrates and nitrites are used in processed foods and have been studied by the World Health Organization for their potential health effects when consumed in large amounts.", sortOrder: 3 },
      { slug: "artificial-food", label: "Artificial Additives & Food", description: "Artificial additives are lab-made ingredients used to enhance flavor, color, texture, or shelf life in food products. Some, like certain food dyes (Red 40, Yellow 5), have been reviewed by the FDA and are subject to ongoing research. MSG is generally recognized as safe but some individuals report sensitivity. Carrageenan, a common thickener derived from seaweed, has been studied for its effects on digestive health. Many consumers prefer whole-food alternatives based on dietary goals or sensitivities.", sortOrder: 4 },
      { slug: "metabolic-blood-sugar", label: "Metabolic & Blood Sugar Disruptors", description: "These ingredients have been studied for their effects on blood sugar levels, insulin response, and metabolic function. Artificial sweeteners, while calorie-free, have been researched by the National Institutes of Health for their impact on gut bacteria and glucose metabolism. High fructose corn syrup is processed differently by the liver than regular sugar. Trans fats have been largely phased out due to their well-documented effects on cardiovascular health. Seed oils are a topic of active nutritional research and debate.", sortOrder: 5 },
      { slug: "environmental-forever", label: "Environmental & \"Forever\" Chemicals", description: "PFAS (per- and polyfluoroalkyl substances) are called \"forever chemicals\" because they do not break down naturally in the environment or the human body. The EPA has set health advisories for certain PFAS in drinking water. Microplastics are tiny plastic particles that have been detected in water, food, and human tissue, and are currently being studied for long-term health effects. Many consumers also consider the environmental footprint of product packaging and manufacturing practices when making purchasing decisions.", sortOrder: 6 },
      { slug: "non-toxic-lifestyle", label: "Non-Toxic Lifestyle", description: "Not sure exactly what to avoid? The enaJ Non-Toxic Baseline monitors for the most commonly flagged toxic ingredients across food, skincare, and household products — synthetic chemicals, harmful additives, endocrine disruptors, heavy metals, and more. A great starting point for anyone looking to live cleaner without needing to know every ingredient.", sortOrder: 0 },
    ].map((cat) => prisma.preferenceCategory.create({ data: cat }))
  );

  const prefCatMap = Object.fromEntries(prefCategories.map((c) => [c.slug, c.id]));

  // ==========================================
  // Preferences
  // ==========================================
  const preferences = await Promise.all(
    [
      //Non-Toxic Lifestyle
      { slug: "enaj-baseline", name: "enaJ Non-Toxic Baseline", description: "Monitor for the most commonly flagged toxic ingredients across food, skincare, and household products", categoryId: prefCatMap["non-toxic-lifestyle"] },

      // Hormone & Endocrine
      { slug: "no-parabens", name: "Parabens", description: "Parabens are synthetic preservatives used in cosmetics and personal care products to prevent the growth of bacteria and mold.", categoryId: prefCatMap["hormone-endocrine"] },
      { slug: "no-phthalates", name: "Phthalates", description: "Phthalates are chemicals used to make plastics more flexible and are also used as solvents in some cosmetic and fragrance products.", categoryId: prefCatMap["hormone-endocrine"] },
      { slug: "no-fragrance", name: "Synthetic Fragrance", description: "Synthetic fragrance is a blend of scent ingredients that, under FDA labeling rules, manufacturers are not required to individually disclose.", categoryId: prefCatMap["hormone-endocrine"] },
      { slug: "no-oxybenzone", name: "Oxybenzone", description: "Oxybenzone is a chemical UV filter approved by the FDA for use in sunscreens to absorb ultraviolet light.", categoryId: prefCatMap["hormone-endocrine"] },
      { slug: "no-bpa-bps", name: "BPA & BPS", description: "BPA and BPS are industrial chemicals used to manufacture certain plastics and the epoxy linings of food and beverage cans.", categoryId: prefCatMap["hormone-endocrine"] },

      // Skin & Eye Irritants
      { slug: "no-sulfates", name: "Sulfates", description: "Sulfates, including SLS and SLES, are surfactants used in shampoos, soaps, and cleansers to create lather and remove oil and dirt.", categoryId: prefCatMap["skin-eye-irritants"] },
      { slug: "no-alcohol-skin", name: "Alcohol in Skin Products", description: "Certain fast-evaporating alcohols are used in skincare formulas to help other ingredients absorb and to create a lightweight texture.", categoryId: prefCatMap["skin-eye-irritants"] },
      { slug: "no-silicones", name: "Silicones", description: "Silicones are synthetic polymers used in cosmetics and haircare to create a smooth texture and add shine.", categoryId: prefCatMap["skin-eye-irritants"] },

      // Preservatives & Antimicrobials
      { slug: "no-triclosan", name: "Triclosan", description: "Triclosan is an antibacterial agent the FDA banned from over-the-counter antiseptic hand and body washes in 2016 for insufficient safety and effectiveness data.", categoryId: prefCatMap["preservatives-antimicrobials"] },
      { slug: "no-formaldehyde", name: "Formaldehyde", description: "Formaldehyde is a chemical used as a preservative in household and personal care products; the EPA and IARC classify it as a known human carcinogen.", categoryId: prefCatMap["preservatives-antimicrobials"] },
      { slug: "no-nitrates", name: "Nitrates/Nitrites", description: "Sodium nitrate and sodium nitrite are FDA-approved preservatives used in cured meats to inhibit bacterial growth and preserve color.", categoryId: prefCatMap["preservatives-antimicrobials"] },

      // Artificial Additives & Food
      { slug: "no-artificial-flavors", name: "Artificial Flavors", description: "Artificial flavors are FDA-regulated compounds manufactured to replicate natural flavors in food and beverages.", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-msg", name: "MSG", description: "Monosodium glutamate (MSG) is a food additive that enhances savory flavor and is classified by the FDA as generally recognized as safe (GRAS).", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-food-dyes", name: "Food Dyes", description: "Artificial food dyes, such as Red 40, Yellow 5, and Blue 1, are FDA-certified synthetic colorants used in food and beverages.", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-gums-fillers", name: "Gums & Fillers", description: "Gums and fillers, such as xanthan gum, guar gum, and cellulose, are FDA-approved additives used to thicken or stabilize food products.", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-citric-acid", name: "Citric Acid", description: "Citric acid is a food additive used for flavor and preservation, most commonly produced through fermentation of the mold Aspergillus niger.", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-carrageenan", name: "Carrageenan", description: "Carrageenan is a food additive extracted from red seaweed and used as a thickener and stabilizer in dairy and plant-based products.", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-soy", name: "Soy", description: "Soy is a legume used in food in forms such as soybean oil, soy protein, soy lecithin, and soy flour.", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-dairy", name: "Dairy", description: "Dairy refers to milk and milk-derived foods, such as cheese, yogurt, and butter.", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-nuts", name: "Nuts", description: "Tree nuts and peanuts are foods regulated by the FDA as major allergens due to their potential to cause serious allergic reactions.", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-gluten", name: "Gluten", description: "Gluten is a group of proteins found in wheat, barley, and rye that gives baked goods their structure and elasticity.", categoryId: prefCatMap["artificial-food"] },
      { slug: "non-gmo", name: "Non-GMO", description: "Non-GMO products are made without ingredients derived from genetically modified organisms.", categoryId: prefCatMap["artificial-food"] },
      { slug: "organic", name: "Organic Only", description: "USDA Certified Organic products meet federal standards limiting synthetic pesticides, fertilizers, and additives in production.", categoryId: prefCatMap["artificial-food"] },
      { slug: "cruelty-free", name: "Cruelty-Free", description: "Cruelty-free products are formulated and manufactured without animal testing.", categoryId: prefCatMap["artificial-food"] },
      { slug: "vegan-beauty", name: "Vegan Beauty", description: "Vegan beauty products contain no animal-derived ingredients, such as beeswax, lanolin, or carmine.", categoryId: prefCatMap["artificial-food"] },

      // Metabolic & Blood Sugar
      { slug: "no-artificial-sweeteners", name: "Artificial Sweeteners", description: "Artificial sweeteners, such as aspartame, sucralose, and saccharin, are FDA-approved sugar substitutes used in food and beverages.", categoryId: prefCatMap["metabolic-blood-sugar"] },
      { slug: "no-high-fructose", name: "High Fructose Corn Syrup", description: "High fructose corn syrup is a sweetener made from corn starch that is processed to convert some of its glucose into fructose.", categoryId: prefCatMap["metabolic-blood-sugar"] },
      { slug: "no-trans-fats", name: "Trans Fats", description: "Trans fats form when liquid oils are partially hydrogenated into solid fats; the FDA determined partially hydrogenated oils are not generally recognized as safe and banned them from the food supply in 2018.", categoryId: prefCatMap["metabolic-blood-sugar"] },
      { slug: "no-seed-oils", name: "Seed Oils", description: "Seed oils, such as canola, soybean, and sunflower oil, are vegetable oils extracted from plant seeds and commonly used in cooking and processed foods.", categoryId: prefCatMap["metabolic-blood-sugar"] },

      // Environmental
      { slug: "no-pfas", name: "PFAS (Forever Chemicals)", description: "PFAS are a group of man-made chemicals used for water, stain, and grease resistance that the EPA has identified as persistent in the environment and human body.", categoryId: prefCatMap["environmental-forever"] },
      { slug: "no-microplastics", name: "Microplastics", description: "Microplastics are plastic particles smaller than 5 millimeters that can originate from packaging, synthetic fabrics, and the breakdown of larger plastic debris.", categoryId: prefCatMap["environmental-forever"] },
      { slug: "no-polyester", name: "Polyester", description: "Polyester is a synthetic fiber made from petroleum-based plastic, commonly used in clothing and textiles.", categoryId: prefCatMap["environmental-forever"] },
      { slug: "no-bleached-fabrics", name: "Bleached Fabrics", description: "Bleached fabrics are textiles treated with chlorine or other agents to whiten or remove natural color.", categoryId: prefCatMap["environmental-forever"] },
      { slug: "animal-cruelty-free", name: "Animal Cruelty Free", description: "Animal cruelty-free products are not tested on animals and contain no animal-derived ingredients.", categoryId: prefCatMap["environmental-forever"] },
      { slug: "eco-packaging", name: "Eco-Friendly Packaging", description: "Eco-friendly packaging is made from recyclable, biodegradable, or reduced-plastic materials to lower environmental impact.", categoryId: prefCatMap["environmental-forever"] },
    ].map((p) => prisma.preference.create({ data: p }))
  );

  const prefMap = Object.fromEntries(preferences.map((p) => [p.slug, p.id]));

  // ==========================================
  // Ailment → Linked Preferences
  // ==========================================
  const linkedPrefs: { ailmentSlug: string; prefSlugs: string[] }[] = [
    { ailmentSlug: "rosacea", prefSlugs: ["no-fragrance", "no-alcohol-skin", "no-sulfates"] },
    { ailmentSlug: "eczema", prefSlugs: ["no-fragrance", "no-parabens", "no-sulfates"] },
    { ailmentSlug: "sensitive-skin", prefSlugs: ["no-fragrance", "no-alcohol-skin", "no-parabens"] },
    { ailmentSlug: "psoriasis", prefSlugs: ["no-fragrance", "no-sulfates"] },
    { ailmentSlug: "perioral-dermatitis", prefSlugs: ["no-fragrance", "no-sulfates"] },
    { ailmentSlug: "acne", prefSlugs: ["no-silicones"] },
    { ailmentSlug: "dandruff", prefSlugs: ["no-sulfates", "no-fragrance", "no-silicones"] },
    { ailmentSlug: "celiac", prefSlugs: ["no-gluten"] },
    { ailmentSlug: "nut-allergy", prefSlugs: ["no-nuts"] },
    { ailmentSlug: "ibs", prefSlugs: ["no-artificial-sweeteners", "no-high-fructose"] },
    { ailmentSlug: "crohns", prefSlugs: ["no-carrageenan", "no-food-dyes"] },
    { ailmentSlug: "dairy-allergy", prefSlugs: ["no-dairy"] },
    { ailmentSlug: "gluten-intolerance", prefSlugs: ["no-gluten"] },
    { ailmentSlug: "soy-allergy", prefSlugs: ["no-soy"] },
    { ailmentSlug: "parkinsons", prefSlugs: ["no-msg", "no-artificial-sweeteners"] },
    { ailmentSlug: "dementia", prefSlugs: ["no-artificial-sweeteners", "no-trans-fats", "no-msg"] },
    { ailmentSlug: "alzheimers", prefSlugs: ["no-trans-fats", "no-nitrates"] },
    { ailmentSlug: "epilepsy", prefSlugs: ["no-msg", "no-artificial-sweeteners", "no-food-dyes"] },
    { ailmentSlug: "ms", prefSlugs: ["no-gluten", "no-dairy"] },
    { ailmentSlug: "migraines", prefSlugs: ["no-msg", "no-nitrates", "no-artificial-sweeteners"] },
    { ailmentSlug: "neuropathy", prefSlugs: ["no-msg", "no-artificial-sweeteners", "no-gluten"] },
    { ailmentSlug: "als", prefSlugs: ["no-msg", "no-artificial-sweeteners"] },
    { ailmentSlug: "adhd", prefSlugs: ["no-food-dyes", "no-high-fructose", "no-artificial-flavors"] },
    { ailmentSlug: "fibromyalgia", prefSlugs: ["no-msg", "no-artificial-sweeteners", "no-gluten"] },
    { ailmentSlug: "hashimotos", prefSlugs: ["no-gluten", "no-soy"] },
    { ailmentSlug: "rheumatoid", prefSlugs: ["no-seed-oils", "no-gluten"] },
    { ailmentSlug: "asthma", prefSlugs: ["no-food-dyes"] },
    { ailmentSlug: "menopause", prefSlugs: ["no-artificial-sweeteners", "no-fragrance"] },
    { ailmentSlug: "perimenopause", prefSlugs: ["no-artificial-sweeteners", "no-fragrance"] },
    { ailmentSlug: "breastfeeding", prefSlugs: ["no-parabens", "no-artificial-sweeteners", "no-fragrance"] },
    { ailmentSlug: "pregnant", prefSlugs: ["no-parabens", "no-phthalates", "no-fragrance", "no-bpa-bps", "no-artificial-sweeteners", "no-formaldehyde"] },
    { ailmentSlug: "postpartum", prefSlugs: ["no-parabens", "no-artificial-sweeteners", "no-fragrance"] },
    { ailmentSlug: "pcos", prefSlugs: ["no-artificial-sweeteners", "no-high-fructose", "no-seed-oils", "no-dairy"] },
    { ailmentSlug: "hormonal-acne", prefSlugs: ["no-dairy", "no-silicones"] },
    { ailmentSlug: "gastrectomy", prefSlugs: ["no-artificial-sweeteners", "no-high-fructose"] },
    { ailmentSlug: "bariatric", prefSlugs: ["no-artificial-sweeteners", "no-high-fructose"] },
    { ailmentSlug: "contact-dermatitis", prefSlugs: ["no-fragrance", "no-parabens", "no-sulfates"] },
    { ailmentSlug: "keratosis-pilaris", prefSlugs: ["no-sulfates", "no-fragrance"] },
    { ailmentSlug: "sulfite-sensitivity", prefSlugs: ["no-nitrates"] },
    { ailmentSlug: "sibo", prefSlugs: ["no-artificial-sweeteners", "no-high-fructose"] },
    { ailmentSlug: "gastritis", prefSlugs: ["no-artificial-sweeteners"] },
    { ailmentSlug: "diverticulosis", prefSlugs: ["no-seed-oils"] },
    { ailmentSlug: "egg-allergy", prefSlugs: [] },
    { ailmentSlug: "histamine-intolerance", prefSlugs: ["no-artificial-sweeteners", "no-food-dyes"] },
    { ailmentSlug: "mcas", prefSlugs: ["no-fragrance", "no-food-dyes", "no-artificial-sweeteners"] },
    { ailmentSlug: "pots", prefSlugs: ["no-artificial-sweeteners"] },
    { ailmentSlug: "ibd", prefSlugs: ["no-carrageenan", "no-artificial-sweeteners", "no-seed-oils"] },
    { ailmentSlug: "sjogrens", prefSlugs: ["no-fragrance", "no-sulfates", "no-alcohol-skin"] },
    { ailmentSlug: "graves-disease", prefSlugs: ["no-soy"] },
    { ailmentSlug: "ankylosing-spondylitis", prefSlugs: ["no-gluten", "no-seed-oils"] },
    { ailmentSlug: "psoriatic-arthritis", prefSlugs: ["no-fragrance", "no-sulfates", "no-seed-oils"] },
    { ailmentSlug: "interstitial-cystitis", prefSlugs: ["no-artificial-sweeteners", "no-msg"] },
    { ailmentSlug: "diabetes-type-1", prefSlugs: ["no-high-fructose", "no-artificial-sweeteners", "no-trans-fats"] },
    { ailmentSlug: "diabetes-type-2", prefSlugs: ["no-high-fructose", "no-artificial-sweeteners", "no-trans-fats", "no-seed-oils"] },
    { ailmentSlug: "thalassemia-minor", prefSlugs: [] },
    { ailmentSlug: "thalassemia-major", prefSlugs: [] },
    { ailmentSlug: "endometriosis", prefSlugs: ["no-trans-fats", "no-seed-oils", "no-fragrance"] },
    { ailmentSlug: "pmdd", prefSlugs: ["no-artificial-sweeteners", "no-seed-oils"] },

  ];

  for (const { ailmentSlug, prefSlugs } of linkedPrefs) {
    for (const prefSlug of prefSlugs) {
      if (ailMap[ailmentSlug] && prefMap[prefSlug]) {
        await prisma.ailmentLinkedPreference.create({
          data: { ailmentId: ailMap[ailmentSlug], preferenceId: prefMap[prefSlug] },
        });
      }
    }
  }


  for (const ailment of ailments) {
    const edu = ailmentEducationData[ailment.slug]
    if (!edu) continue
    await prisma.ailmentEducation.create({
      data: {
        ailmentId: ailment.id,
        description: edu.description,
        generalSources: edu.generalSources as any,
        ingredientInfo: edu.ingredientInfo as any,
      },
    })
  }
  
  for (const pref of preferences) {
    const edu = preferenceEducationData[pref.slug]
      || preferenceEducationData[pref.slug.replace(/^no-/, '')]
      || preferenceEducationData[pref.slug.replace(/^no-/, '') + '-free']
      || preferenceEducationData[pref.slug + '-free']
    if (!edu) continue
    await prisma.preferenceEducation.create({
      data: {
        preferenceId: pref.id,
        whatItIs: edu.whatItIs,
        commonlyFoundIn: edu.commonlyFoundIn,
        whyPeopleAvoid: edu.whyPeopleAvoid,
        sources: edu.sources as any,
        sections: edu.sections as any,
      },
    })
  }

  // ==========================================
  // Journal Categories & Conditions
  // ==========================================
  const journalCategories = await Promise.all(
    journalCategoriesSeedData.map((cat) =>
      prisma.journalCategory.create({
        data: { slug: cat.slug, label: cat.label, icon: cat.icon, sortOrder: cat.sortOrder },
      })
    )
  );
  const journalCatMap = Object.fromEntries(journalCategories.map((c) => [c.slug, c.id]));
  const journalConditions = await Promise.all(
    journalCategoriesSeedData.flatMap((cat) =>
      cat.conditions.map((cond) =>
        prisma.journalCondition.create({
          data: {
            slug: cond.slug,
            name: cond.name,
            categoryId: journalCatMap[cat.slug],
            description: cond.description,
            whatWeMonitor: cond.whatWeMonitor as any,
            funFacts: cond.funFacts,
            tips: cond.tips,
            generalSources: cond.generalSources as any,
          },
        })
      )
    )
  );
  const journalCondMap = Object.fromEntries(journalConditions.map((c) => [c.slug, c.id]));


  // ==========================================
  // Products (matching frontend DEMO_PRODUCTS)
  // ==========================================
  const products = await Promise.all(
    [
      // // Skin & Body Care
      // { slug: "glow-radiance-sunscreen", name: "Glow Radiance Face Sunscreen SPF 50", brand: "SunCare Co.", price: "$24.99", ingredients: ["Water", "Homosalate", "Alcohol Denat", "Octocrylene", "Butyl Methoxydibenzoylmethane", "Fragrance", "Phenoxyethanol", "Tocopherol"], packaging: ["Plastic Tube", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      // { slug: "pure-mineral-sunscreen", name: "Pure Mineral Face Sunscreen SPF 45", brand: "CleanSkin Labs", price: "$28.99", ingredients: ["Water", "Zinc Oxide", "Titanium Dioxide", "Glycerin", "Jojoba Oil", "Aloe Vera", "Vitamin E"], packaging: ["Recyclable Aluminum Tube", "Aluminum Cap"], category: ProductCategory.SKIN_BODY },
      // { slug: "gentle-shield-sunscreen", name: "Gentle Shield Mineral Sunscreen SPF 40", brand: "NatureGlow", price: "$22.50", ingredients: ["Water", "Zinc Oxide", "Shea Butter", "Green Tea Extract", "Hyaluronic Acid", "Squalane"], packaging: ["Glass Bottle", "Bamboo Cap"], category: ProductCategory.SKIN_BODY },
      // { slug: "organic-daily-moisturizer", name: "Organic Daily Moisturizer", brand: "PureBloom", price: "$19.99", ingredients: ["Water", "Aloe Vera", "Jojoba Oil", "Shea Butter", "Vitamin E", "Chamomile Extract"], packaging: ["Glass Jar", "Bamboo Lid"], category: ProductCategory.SKIN_BODY },
      // { slug: "calming-body-lotion", name: "Calming Body Lotion", brand: "SoftTouch", price: "$16.99", ingredients: ["Water", "Glycerin", "Dimethicone", "Fragrance", "Parabens", "Cetyl Alcohol", "Aloe Vera"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.SKIN_BODY },

      // // Haircare
      // { slug: "volumizing-shampoo", name: "Volumizing Shampoo", brand: "LushLocks", price: "$14.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Cocamidopropyl Betaine", "Fragrance", "Dimethicone", "Citric Acid", "Sodium Chloride"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      // { slug: "sulfate-free-repair-shampoo", name: "Sulfate-Free Repair Shampoo", brand: "GentleMane", price: "$18.50", ingredients: ["Water", "Decyl Glucoside", "Glycerin", "Argan Oil", "Keratin", "Aloe Vera", "Vitamin E"], packaging: ["Recyclable Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      // { slug: "deep-conditioning-mask", name: "Deep Conditioning Mask", brand: "SilkRoots", price: "$22.00", ingredients: ["Water", "Cetearyl Alcohol", "Coconut Oil", "Shea Butter", "Dimethicone", "Fragrance", "Propylene Glycol"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.HAIRCARE },

      // // Makeup
      // { slug: "flawless-matte-foundation", name: "Flawless Matte Foundation", brand: "GlowUp", price: "$32.00", ingredients: ["Water", "Dimethicone", "Titanium Dioxide", "Fragrance", "Parabens", "Talc", "Glycerin", "Iron Oxides"], packaging: ["Glass Bottle", "Plastic Cap", "Plastic Pump"], category: ProductCategory.MAKEUP },
      // { slug: "clean-coverage-bb-cream", name: "Clean Coverage BB Cream", brand: "BareSkin", price: "$26.00", ingredients: ["Water", "Zinc Oxide", "Jojoba Oil", "Glycerin", "Hyaluronic Acid", "Aloe Vera", "Iron Oxides"], packaging: ["Aluminum Tube", "Aluminum Cap"], category: ProductCategory.MAKEUP },
      // { slug: "long-lasting-mascara", name: "Long-Lasting Mascara", brand: "BoldLash", price: "$15.00", ingredients: ["Water", "Beeswax", "Carnauba Wax", "Iron Oxides", "Parabens", "Fragrance", "Polyethylene"], packaging: ["Plastic Tube", "Plastic Wand"], category: ProductCategory.MAKEUP },

      // Food
      // { slug: "berry-blast-protein-bar", name: "Berry Blast Protein Bar", brand: "FitFuel", price: "$3.49", ingredients: ["Whey Protein", "Oats", "Honey", "Mixed Berries", "Coconut Oil", "Soy Lecithin", "Natural Flavors"], packaging: ["Plastic Wrapper", "Cardboard Box"], category: ProductCategory.FOOD },
      // { slug: "clean-protein-bar", name: "Clean Protein Bar", brand: "GreenFit", price: "$4.29", ingredients: ["Pea Protein", "Oats", "Maple Syrup", "Almonds", "Cocoa Butter", "Sea Salt"], packaging: ["Compostable Wrapper", "Recycled Cardboard Box"], category: ProductCategory.FOOD },
      // { slug: "sparkling-citrus-energy-drink", name: "Sparkling Citrus Energy Drink", brand: "ZestBoost", price: "$2.99", ingredients: ["Carbonated Water", "High Fructose Corn Syrup", "Citric Acid", "Natural Flavors", "Caffeine", "Sucralose", "Red 40", "Yellow 5"], packaging: ["Plastic Bottle", "Plastic Cap", "Plastic Shrink Wrap Label"], category: ProductCategory.FOOD },
      // { slug: "organic-trail-mix", name: "Organic Trail Mix", brand: "NatureHarvest", price: "$7.99", ingredients: ["Almonds", "Cashews", "Raisins", "Dark Chocolate", "Coconut Flakes", "Sea Salt"], packaging: ["Recyclable Stand-Up Pouch", "Plastic Zipper"], category: ProductCategory.FOOD },
      { slug: "nature-valley-crunchy-oat-dark-chocolate", name: "Crunchy Avoine & Chocolat Noir", brand: "Nature Valley", price: "$4.99", ingredients: ["Wholemeal Oats", "Sugar", "Sunflower Oil", "Dark Chocolate Chips", "Cocoa Paste", "Soy Lecithin", "Natural Vanilla Flavor", "Lean Cocoa Powder", "Honey", "Salt", "Molasses", "Sunflower Lecithin", "Sodium Bicarbonate", "Natural Flavor"], packaging: ["Plastic Film", "Cardboard Box"], category: ProductCategory.FOOD },
      { slug: "kitkat-cereal", name: "KitKat Cereal", brand: "Nestlé", price: "$5.99", ingredients: ["Whole Wheat Flour", "Cornmeal", "Sugar", "Dextrose", "Palm Oil", "Wheat Flour", "Cocoa Powder", "Glucose Syrup", "Wheat Starch", "Skimmed Milk Powder", "Sunflower Oil", "Calcium Carbonate", "Barley Malt Extract", "Fat Reduced Cocoa Powder", "Natural Flavouring", "Cocoa Butter", "Salt", "Cocoa Paste", "Soy Lecithin", "Whey", "Butterfat", "Tocopherols", "Iron", "Niacin", "Pantothenic Acid", "Vitamin B6", "Riboflavin", "Folic Acid"], packaging: ["Cardboard Box", "Plastic Inner Bag"], category: ProductCategory.FOOD },
      { slug: "cheetos-crunchy", name: "Cheetos Crunchy", brand: "Frito-Lay", price: "$1.99", ingredients: ["Enriched Corn Meal", "Corn Oil", "Canola Oil", "Sunflower Oil", "Whey", "Cheddar Cheese", "Milk", "Cheese Cultures", "Salt", "Enzymes", "Corn Maltodextrin", "Natural Flavors", "Artificial Flavors", "Whey Protein Concentrate", "Monosodium Glutamate", "Lactic Acid", "Citric Acid", "Yellow 6"], packaging: ["Plastic Bag"], category: ProductCategory.FOOD },
      // ====================================================
      // 400 PRODUCTS FOR ENAJ SEED DATA
      // Paste these into your prisma/seed.ts products array
      // alongside your existing 3 food products
      // ====================================================

      // ══════════════════════════════════════════════════════
      // CLEANING SUPPLIES (50)
      // ══════════════════════════════════════════════════════
      // ====================================================
      // 400 PRODUCTS FOR ENAJ SEED DATA
      // Copy everything below into your prisma/seed.ts
      // products array, alongside your existing 3 food products
      // ====================================================

      // ══════════════════════════════════════════════════════
      // CLEANING SUPPLIES (50)
      // ══════════════════════════════════════════════════════
      { slug: "lysol-disinfectant-spray", name: "Lysol Disinfectant Spray - Crisp Linen", brand: "Lysol", price: "$5.99", ingredients: ["Ethanol", "Alkyl Dimethyl Benzyl Ammonium Saccharinate", "Carbon Dioxide", "Fragrance", "Myristamine Oxide"], packaging: ["Aerosol Can", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "clorox-disinfecting-wipes", name: "Clorox Disinfecting Wipes - Fresh Scent", brand: "Clorox", price: "$4.99", ingredients: ["Water", "Alkyl Dimethyl Benzyl Ammonium Chloride", "Alkyl Dimethyl Ethyl Benzyl Ammonium Chloride", "Isopropyl Alcohol", "Fragrance"], packaging: ["Plastic Canister", "Plastic Lid"], category: ProductCategory.CLEANING },
      { slug: "mr-clean-magic-eraser", name: "Mr. Clean Magic Eraser Extra Durable", brand: "Mr. Clean", price: "$4.49", ingredients: ["Melamine Foam", "Formaldehyde-Melamine-Sodium Bisulfite Copolymer"], packaging: ["Cardboard Box", "Plastic Wrap"], category: ProductCategory.CLEANING },
      { slug: "windex-glass-cleaner", name: "Windex Original Glass Cleaner", brand: "Windex", price: "$4.29", ingredients: ["Water", "2-Hexoxyethanol", "Isopropanolamine", "Sodium Dodecylbenzene Sulfonate", "Lauramine Oxide", "Ammonium Hydroxide", "Fragrance", "Blue 1"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "seventh-gen-all-purpose", name: "Seventh Generation All Purpose Cleaner", brand: "Seventh Generation", price: "$4.99", ingredients: ["Water", "Decyl Glucoside", "Sodium Citrate", "Citric Acid", "Lemongrass Essential Oil"], packaging: ["Recycled Plastic Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "mrs-meyers-lavender", name: "Mrs. Meyer's Multi-Surface Cleaner - Lavender", brand: "Mrs. Meyer's", price: "$4.49", ingredients: ["Water", "Decyl Glucoside", "Sodium Carbonate", "Lactic Acid", "Lavender Oil", "Sodium Chloride", "Fragrance"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "pine-sol-original", name: "Pine-Sol Multi-Surface Cleaner - Original", brand: "Pine-Sol", price: "$3.99", ingredients: ["Water", "C10-12 Alcohol Ethoxylate", "Glycolic Acid", "Pine Oil", "Sodium Alkyl Sulfonate", "Isopropyl Alcohol", "Fragrance", "Yellow 5", "Blue 1"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "dawn-original-dish-soap", name: "Dawn Ultra Dishwashing Liquid - Original", brand: "Dawn", price: "$3.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Sodium Laureth Sulfate", "Lauramine Oxide", "Sodium Chloride", "Fragrance", "Methylisothiazolinone", "Blue 1", "Yellow 5"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "method-all-purpose-pink", name: "Method All-Purpose Cleaner - Pink Grapefruit", brand: "Method", price: "$4.49", ingredients: ["Water", "Decyl Glucoside", "Sodium Carbonate", "Potassium Hydrate", "Lactic Acid", "Fragrance", "Colorant"], packaging: ["Recycled Plastic Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "ajax-multi-purpose", name: "Ajax All Purpose Cleaner - Lavender", brand: "Ajax", price: "$2.99", ingredients: ["Water", "Ammonium C12-15 Alcohol Ethoxylate Sulfate", "Butoxydiglycol", "Sodium Dodecylbenzene Sulfonate", "Fragrance", "Colorant"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "simple-green-all-purpose", name: "Simple Green All-Purpose Cleaner", brand: "Simple Green", price: "$3.99", ingredients: ["Water", "C10-16 Alcohol Ethoxylate", "Sodium Citrate", "Tetrasodium Glutamate Diacetate", "Fragrance"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "scrubbing-bubbles-bathroom", name: "Scrubbing Bubbles Bathroom Cleaner", brand: "Scrubbing Bubbles", price: "$4.29", ingredients: ["Water", "Butane", "Propane", "Diethylene Glycol Butyl Ether", "Sodium Dodecylbenzene Sulfonate", "Fragrance", "Lauramine Oxide"], packaging: ["Aerosol Can", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "comet-soft-cleanser", name: "Comet Soft Cleanser with Bleach", brand: "Comet", price: "$2.49", ingredients: ["Water", "Calcium Carbonate", "Sodium Hypochlorite", "Sodium Carbonate", "Sodium Hydroxide", "Alkyl Polyglucoside", "Fragrance"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "bar-keepers-friend", name: "Bar Keepers Friend Soft Cleanser", brand: "Bar Keepers Friend", price: "$5.99", ingredients: ["Water", "Feldspar", "Oxalic Acid", "Citric Acid", "Linear Alcohol Ethoxylate", "Xanthan Gum"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "lysol-toilet-bowl", name: "Lysol Toilet Bowl Cleaner - Power Gel", brand: "Lysol", price: "$3.49", ingredients: ["Water", "Hydrochloric Acid", "Alkyl Dimethyl Benzyl Ammonium Chloride", "Fragrance", "Blue 1"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "clorox-toilet-wand", name: "Clorox ToiletWand Refills", brand: "Clorox", price: "$7.99", ingredients: ["Sodium Bisulfate", "Sodium Carbonate", "Sodium Percarbonate", "Fragrance", "Blue 1"], packaging: ["Cardboard Box", "Plastic Inner Wrap"], category: ProductCategory.CLEANING },
      { slug: "soft-scrub-bleach", name: "Soft Scrub with Bleach Cleanser", brand: "Soft Scrub", price: "$3.49", ingredients: ["Water", "Calcium Carbonate", "Sodium Hypochlorite", "Alkyl Polyglucoside", "Fragrance"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "mrs-meyers-dish-soap", name: "Mrs. Meyer's Dish Soap - Basil", brand: "Mrs. Meyer's", price: "$4.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Lauramidopropylamine Oxide", "SD Alcohol 3A", "Decyl Glucoside", "Basil Essential Oil", "Fragrance", "Sodium Chloride", "Citric Acid", "Colorant"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "finish-dishwasher-tabs", name: "Finish Powerball Dishwasher Tabs", brand: "Finish", price: "$14.99", ingredients: ["Sodium Carbonate", "Sodium Carbonate Peroxide", "Sodium Silicate", "Subtilisin", "Amylase", "Sodium Polyacrylate", "Fragrance"], packaging: ["Cardboard Box", "Plastic Inner Bag"], category: ProductCategory.CLEANING },
      { slug: "cascade-platinum-pods", name: "Cascade Platinum ActionPacs", brand: "Cascade", price: "$15.99", ingredients: ["Sodium Carbonate", "Sodium Carbonate Peroxide", "Nonionic Surfactant", "Polyacrylate", "Subtilisin", "Amylase", "Benzotriazole", "Fragrance"], packaging: ["Plastic Tub", "Plastic Lid"], category: ProductCategory.CLEANING },
      { slug: "clorox-bleach", name: "Clorox Regular Bleach", brand: "Clorox", price: "$4.99", ingredients: ["Water", "Sodium Hypochlorite", "Sodium Chloride", "Sodium Carbonate", "Sodium Chlorate", "Sodium Hydroxide"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "oxiclean-versatile", name: "OxiClean Versatile Stain Remover", brand: "OxiClean", price: "$8.99", ingredients: ["Sodium Percarbonate", "Sodium Carbonate", "Ethoxylated Alcohol C12-16", "Sodium Silicate", "Tetraacetylethylenediamine"], packaging: ["Plastic Tub", "Plastic Lid"], category: ProductCategory.CLEANING },
      { slug: "kaboom-foam-tastic", name: "Kaboom Foam-Tastic Bathroom Cleaner", brand: "Kaboom", price: "$4.49", ingredients: ["Water", "Sodium Dodecylbenzene Sulfonate", "Sodium Xylene Sulfonate", "Citric Acid", "Fragrance", "Tetrasodium EDTA"], packaging: ["Aerosol Can", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "zep-multi-surface", name: "Zep All-Purpose Cleaner & Degreaser", brand: "Zep", price: "$5.49", ingredients: ["Water", "2-Butoxyethanol", "Sodium Metasilicate", "Sodium Hydroxide", "Tetrasodium EDTA", "Fragrance"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "ecover-dish-soap", name: "Ecover Zero Dish Soap", brand: "Ecover", price: "$4.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Citric Acid", "Sodium Citrate", "Alcohol"], packaging: ["Recycled Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "better-life-all-purpose", name: "Better Life All-Purpose Cleaner", brand: "Better Life", price: "$5.99", ingredients: ["Water", "Coco Betaine", "Decyl Glucoside", "Baking Soda", "Lemon Oil", "Tea Tree Oil", "Eucalyptus Oil"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "pledge-multi-surface", name: "Pledge Multi-Surface Cleaner", brand: "Pledge", price: "$4.49", ingredients: ["Water", "C9-11 Pareth-8", "Citric Acid", "Ethanol", "Fragrance", "Methylisothiazolinone", "Blue 1"], packaging: ["Aerosol Can", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "murphy-oil-soap", name: "Murphy Oil Soap Original Wood Cleaner", brand: "Murphy", price: "$4.99", ingredients: ["Water", "Sodium Tallate", "Lauramidopropylamine Oxide", "Sodium Laureth Sulfate", "Propylene Glycol", "Fragrance", "DMDM Hydantoin"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "fantastik-all-purpose", name: "Fantastik All-Purpose Cleaner", brand: "Fantastik", price: "$3.99", ingredients: ["Water", "Alkyl Dimethyl Benzyl Ammonium Chloride", "Butoxydiglycol", "Ethanolamine", "Fragrance", "Yellow 5"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "lysol-kitchen-pro", name: "Lysol Kitchen Pro Antibacterial Cleaner", brand: "Lysol", price: "$4.29", ingredients: ["Water", "Citric Acid", "C10-16 Alcohol Ethoxylate", "Sodium Dodecylbenzene Sulfonate", "Fragrance"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "weiman-granite-cleaner", name: "Weiman Granite & Stone Cleaner", brand: "Weiman", price: "$5.99", ingredients: ["Water", "Isopropyl Alcohol", "Decyl Glucoside", "Fragrance", "Potassium Sorbate", "Citric Acid"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "drano-max-gel", name: "Drano Max Gel Clog Remover", brand: "Drano", price: "$6.99", ingredients: ["Water", "Sodium Hypochlorite", "Sodium Hydroxide", "Sodium Silicate", "Sodium Chloride"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "easy-off-oven-cleaner", name: "Easy-Off Heavy Duty Oven Cleaner", brand: "Easy-Off", price: "$5.49", ingredients: ["Butane", "Monoethanolamine", "Diethylene Glycol Monobutyl Ether", "Sodium Hydroxide", "Diethanolamine", "Fragrance"], packaging: ["Aerosol Can", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "tilex-mold-mildew", name: "Tilex Mold & Mildew Remover", brand: "Tilex", price: "$4.49", ingredients: ["Water", "Sodium Hypochlorite", "Sodium Hydroxide", "Lauramine Oxide", "Fragrance"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "greenworks-all-purpose", name: "Green Works All-Purpose Cleaner", brand: "Green Works", price: "$3.99", ingredients: ["Water", "Ethanol", "Alkyl Polyglucoside", "Potassium Carbonate", "Fragrance", "Essential Oil"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "meyers-glass-cleaner", name: "Mrs. Meyer's Glass Cleaner - Lemon Verbena", brand: "Mrs. Meyer's", price: "$4.99", ingredients: ["Water", "Decyl Glucoside", "Vinegar", "Lemon Verbena Essential Oil", "Fragrance", "Colorant"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "swiffer-wet-jet-solution", name: "Swiffer WetJet Multi-Purpose Solution", brand: "Swiffer", price: "$5.99", ingredients: ["Water", "Propylene Glycol n-Propyl Ether", "Alkyl Polyglucoside", "Didecyl Dimethyl Ammonium Chloride", "Fragrance", "Benzisothiazolinone"], packaging: ["Plastic Bottle"], category: ProductCategory.CLEANING },
      { slug: "spic-span-antibacterial", name: "Spic and Span Antibacterial Cleaner", brand: "Spic and Span", price: "$3.49", ingredients: ["Water", "Sodium Dodecylbenzene Sulfonate", "Alcohol Ethoxylate", "Fragrance", "DMDM Hydantoin", "Blue 1"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "resolve-carpet-cleaner", name: "Resolve Carpet Cleaner Spray", brand: "Resolve", price: "$5.49", ingredients: ["Water", "Butoxydiglycol", "Alcohol Ethoxylate", "Sodium Lauryl Sulfate", "Fragrance", "Methylchloroisothiazolinone"], packaging: ["Aerosol Can", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "puracy-all-purpose", name: "Puracy Natural All Purpose Cleaner", brand: "Puracy", price: "$5.99", ingredients: ["Water", "Sodium Gluconate", "Coco Glucoside", "Citric Acid", "Glycerin", "Green Tea Extract"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "cal-rid-lime-calcium", name: "CLR Calcium Lime Rust Remover", brand: "CLR", price: "$6.99", ingredients: ["Water", "Lactic Acid", "Gluconic Acid", "Lauramine Oxide", "Propylene Glycol n-Butyl Ether"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "ajax-powder-cleanser", name: "Ajax Powder Cleanser with Bleach", brand: "Ajax", price: "$1.49", ingredients: ["Calcium Carbonate", "Sodium Dodecylbenzene Sulfonate", "Trichloroisocyanuric Acid", "Fragrance"], packaging: ["Plastic Canister", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "cif-cream-cleaner", name: "Cif Cream Cleaner - Original", brand: "Cif", price: "$3.49", ingredients: ["Water", "Calcium Carbonate", "Sodium Dodecylbenzene Sulfonate", "Cocamidopropyl Betaine", "Fragrance", "Limonene"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "biokleen-all-purpose", name: "Biokleen Bac-Out All-Purpose Cleaner", brand: "Biokleen", price: "$5.49", ingredients: ["Water", "Alcohol Ethoxylate", "Sodium Citrate", "Lime Essential Oil", "Enzyme Blend", "Grapefruit Seed Extract"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "attitude-bathroom-cleaner", name: "Attitude Bathroom Cleaner - Citrus Zest", brand: "Attitude", price: "$5.99", ingredients: ["Water", "Coco Glucoside", "Sodium Coco Sulfate", "Citric Acid", "Sodium Citrate", "Lemon Peel Oil"], packaging: ["Recycled Plastic Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "grove-tub-tile", name: "Grove Co. Tub & Tile Cleaner Concentrate", brand: "Grove Co.", price: "$5.99", ingredients: ["Water", "Citric Acid", "Decyl Glucoside", "Sodium Citrate", "Fragrance"], packaging: ["Glass Bottle", "Aluminum Cap"], category: ProductCategory.CLEANING },
      { slug: "bon-ami-powder-cleanser", name: "Bon Ami Powder Cleanser", brand: "Bon Ami", price: "$2.49", ingredients: ["Feldspar", "Limestone", "Sodium Bicarbonate", "Alkyl Polyglucoside"], packaging: ["Cardboard Canister", "Metal Bottom"], category: ProductCategory.CLEANING },
      { slug: "fabuloso-multi-purpose", name: "Fabuloso Multi-Purpose Cleaner - Lavender", brand: "Fabuloso", price: "$2.99", ingredients: ["Water", "Sodium Dodecylbenzene Sulfonate", "Sodium Laureth Sulfate", "C9-11 Pareth-8", "Fragrance", "Glutaraldehyde", "Colorant"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "meguiars-all-purpose", name: "Meguiar's All Purpose Cleaner", brand: "Meguiar's", price: "$7.99", ingredients: ["Water", "Alcohol Ethoxylate", "Sodium Metasilicate", "Tetrasodium EDTA", "Fragrance"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "aunt-fannies-vinegar-wash", name: "Aunt Fannie's Vinegar Floor Wash", brand: "Aunt Fannie's", price: "$7.99", ingredients: ["Water", "Distilled White Vinegar", "Alcohol Ethoxylate", "Fragrance"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },

      // ══════════════════════════════════════════════════════
      // LAUNDRY (50)
      // ══════════════════════════════════════════════════════
      { slug: "tide-original-liquid", name: "Tide Original Liquid Detergent", brand: "Tide", price: "$12.99", ingredients: ["Water", "Alcohol Ethoxylate", "Linear Alkylbenzene Sulfonate", "Propylene Glycol", "Citric Acid", "Sodium Hydroxide", "Borax", "Ethanolamine", "Sodium Fatty Acids", "Protease", "Fragrance", "Dimethicone", "Blue 1", "Red 33"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "tide-pods-original", name: "Tide PODS Original Scent", brand: "Tide", price: "$13.99", ingredients: ["PEG/PPG Copolymer", "Alcohol Ethoxylate", "Sodium Fatty Acids", "Subtilisin", "Mannanase", "Amylase", "Sodium Borate", "Fragrance", "Ethanolamine", "Calcium Chloride"], packaging: ["Plastic Tub", "Plastic Lid"], category: ProductCategory.CLEANING },
      { slug: "tide-free-gentle-liquid", name: "Tide Free & Gentle Liquid Detergent", brand: "Tide", price: "$12.99", ingredients: ["Water", "Alcohol Ethoxylate", "Linear Alkylbenzene Sulfonate", "Propylene Glycol", "Citric Acid", "Sodium Hydroxide", "Borax", "Ethanolamine", "Protease", "Amylase"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "gain-original-liquid", name: "Gain Original Liquid Detergent", brand: "Gain", price: "$11.99", ingredients: ["Water", "Alcohol Ethoxylate", "Linear Alkylbenzene Sulfonate", "Sodium Fatty Acids", "Propylene Glycol", "Citric Acid", "Borax", "Fragrance", "Blue 1", "Yellow 5"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "persil-proclean-liquid", name: "Persil ProClean Original Liquid", brand: "Persil", price: "$13.49", ingredients: ["Water", "Alcohol Ethoxylate", "Sodium Laureth Sulfate", "Propylene Glycol", "Sodium Citrate", "Sodium Hydroxide", "Protease", "Amylase", "Mannanase", "Fragrance", "Blue 1"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "seventh-gen-free-clear-laundry", name: "Seventh Generation Free & Clear Laundry", brand: "Seventh Generation", price: "$11.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Laureth-6", "Sodium Citrate", "Oleic Acid", "Glycerin", "Sodium Hydroxide", "Protease", "Mannanase", "Amylase"], packaging: ["Recycled Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "all-free-clear-liquid", name: "All Free Clear Liquid Detergent", brand: "All", price: "$9.99", ingredients: ["Water", "Alcohol Ethoxylate", "Sodium Dodecylbenzene Sulfonate", "Sodium Citrate", "Citric Acid", "Sodium Hydroxide", "Borax", "Protease", "Calcium Chloride"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "arm-hammer-sensitive", name: "Arm & Hammer Sensitive Skin Detergent", brand: "Arm & Hammer", price: "$7.99", ingredients: ["Water", "Sodium Carbonate", "Alcohol Ethoxylate", "Sodium Fatty Acids", "Sodium Citrate", "Citric Acid", "Protease", "Calcium Chloride"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "dreft-stage-1", name: "Dreft Stage 1 Newborn Detergent", brand: "Dreft", price: "$12.99", ingredients: ["Water", "Alcohol Ethoxylate", "Sodium Fatty Acids", "Linear Alkylbenzene Sulfonate", "Propylene Glycol", "Citric Acid", "Sodium Hydroxide", "Borax", "Fragrance", "Protease"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "method-laundry-liquid", name: "Method Laundry Detergent - Free + Clear", brand: "Method", price: "$11.99", ingredients: ["Water", "Lauryl Glucoside", "Sodium Citrate", "Oleic Acid", "Sodium Fatty Acids", "Sodium Hydroxide", "Glycerin", "Protease", "Amylase"], packaging: ["Recycled Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "woolite-delicates", name: "Woolite Delicates Laundry Detergent", brand: "Woolite", price: "$7.99", ingredients: ["Water", "Alcohol Ethoxylate", "Sodium Laureth Sulfate", "Sodium Chloride", "Citric Acid", "Fragrance", "Methylisothiazolinone"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "ecos-laundry-free-clear", name: "ECOS Laundry Detergent Free & Clear", brand: "ECOS", price: "$12.99", ingredients: ["Water", "Coconut Oil Based Surfactants", "Built-in Fabric Softener", "Sodium Citrate"], packaging: ["Recycled Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "charlie-soap-laundry", name: "Charlie's Soap Laundry Liquid", brand: "Charlie's Soap", price: "$16.99", ingredients: ["Water", "Coconut Based Surfactant Blend", "Sodium Carbonate", "Sodium Metasilicate"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "downy-unstopables", name: "Downy Unstopables In-Wash Scent Booster", brand: "Downy", price: "$11.99", ingredients: ["Modified Starch", "Fragrance", "Cellulose", "Denatonium Benzoate"], packaging: ["Plastic Tub", "Plastic Lid"], category: ProductCategory.CLEANING },
      { slug: "downy-fabric-softener", name: "Downy Ultra Fabric Softener - April Fresh", brand: "Downy", price: "$8.99", ingredients: ["Water", "Diethyl Ester Dimethyl Ammonium Chloride", "Calcium Chloride", "Fragrance", "Formic Acid", "Colorant"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "bounce-dryer-sheets", name: "Bounce Dryer Sheets - Outdoor Fresh", brand: "Bounce", price: "$6.99", ingredients: ["Dipalmitoylethyl Hydroxyethylmonium Methosulfate", "Fatty Acids", "Fragrance", "Polyester Sheet"], packaging: ["Cardboard Box"], category: ProductCategory.CLEANING },
      { slug: "gain-flings-pods", name: "Gain Flings Laundry Pods - Original", brand: "Gain", price: "$14.99", ingredients: ["PEG/PPG Copolymer", "Alcohol Ethoxylate", "Linear Alkylbenzene Sulfonate", "Fragrance", "Protease", "Amylase", "Sodium Borate", "Denatonium Benzoate", "Blue 1", "Yellow 5"], packaging: ["Plastic Tub", "Plastic Lid"], category: ProductCategory.CLEANING },
      { slug: "purex-free-clear-liquid", name: "Purex Free & Clear Liquid Detergent", brand: "Purex", price: "$6.99", ingredients: ["Water", "Alcohol Ethoxylate", "Sodium Dodecylbenzene Sulfonate", "Laureth-7", "Sodium Citrate", "Citric Acid", "Sodium Hydroxide", "Protease"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "oxiclean-laundry-booster", name: "OxiClean White Revive Laundry Booster", brand: "OxiClean", price: "$8.99", ingredients: ["Sodium Percarbonate", "Sodium Carbonate", "Ethoxylated Alcohol", "Sodium Silicate", "Tetraacetylethylenediamine", "Fragrance"], packaging: ["Plastic Tub", "Plastic Lid"], category: ProductCategory.CLEANING },
      { slug: "mrs-meyers-laundry-lavender", name: "Mrs. Meyer's Laundry Detergent - Lavender", brand: "Mrs. Meyer's", price: "$12.99", ingredients: ["Water", "Decyl Glucoside", "Sodium Citrate", "Oleic Acid", "Sodium Fatty Acids", "Glycerin", "Lavender Oil", "Fragrance", "Protease", "Amylase"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "biokleen-laundry-liquid", name: "Biokleen Free & Clear Laundry Liquid", brand: "Biokleen", price: "$14.99", ingredients: ["Water", "Alcohol Ethoxylate", "Sodium Citrate", "Sodium Fatty Acids", "Glycerin", "Enzyme Blend", "Grapefruit Seed Extract"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "the-laundress-signature", name: "The Laundress Signature Detergent", brand: "The Laundress", price: "$24.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Glycerin", "Alcohol Ethoxylate", "Sodium Citrate", "Fragrance", "Protease", "Amylase", "Methylisothiazolinone"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "nellie-laundry-soda", name: "Nellie's Laundry Soda", brand: "Nellie's", price: "$19.99", ingredients: ["Sodium Carbonate", "Linear Alkylbenzene Sulfonate", "Coconut Diethanolamide", "Sodium Metasilicate", "Sodium Carboxymethyl Cellulose"], packaging: ["Metal Tin"], category: ProductCategory.CLEANING },
      { slug: "dropps-stain-detergent-pods", name: "Dropps Stain & Odor Laundry Pods", brand: "Dropps", price: "$22.99", ingredients: ["Sodium Carbonate", "Sodium Carbonate Peroxide", "Sodium Citrate", "Alcohol Ethoxylate", "Protease", "Amylase", "Cellulase"], packaging: ["Compostable Film", "Cardboard Box"], category: ProductCategory.CLEANING },
      { slug: "molly-suds-original", name: "Molly's Suds Original Laundry Powder", brand: "Molly's Suds", price: "$17.99", ingredients: ["Sodium Carbonate", "Sodium Bicarbonate", "Sodium Percarbonate", "Coconut Oil Based Surfactant", "Sea Salt", "Peppermint Essential Oil"], packaging: ["Cardboard Canister", "Metal Lid"], category: ProductCategory.CLEANING },
      { slug: "grab-green-3in1-pods", name: "Grab Green 3-in-1 Laundry Pods - Fragrance Free", brand: "Grab Green", price: "$14.99", ingredients: ["Sodium Carbonate", "Sodium Bicarbonate", "PEG/PPG Copolymer", "Laureth-7", "Sodium Citrate", "Protease"], packaging: ["Plastic Pouch"], category: ProductCategory.CLEANING },
      { slug: "clorox2-color-safe-bleach", name: "Clorox 2 Stain Remover & Color Booster", brand: "Clorox", price: "$7.99", ingredients: ["Water", "Hydrogen Peroxide", "C12-15 Alcohol Ethoxylate", "Sodium Borate", "Fragrance", "Colorant"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "snuggle-fabric-softener", name: "Snuggle Blue Sparkle Fabric Softener", brand: "Snuggle", price: "$5.99", ingredients: ["Water", "Diethyl Ester Dimethyl Ammonium Chloride", "Calcium Chloride", "Fragrance", "Formic Acid", "Methylisothiazolinone", "Blue 1"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "hex-performance-detergent", name: "Hex Performance Laundry Detergent - Free & Clear", brand: "Hex", price: "$15.99", ingredients: ["Water", "Alcohol Ethoxylate", "Sodium Citrate", "Citric Acid", "Sodium Fatty Acids", "Protease", "Amylase", "Mannanase"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "puracy-natural-laundry", name: "Puracy Natural Laundry Detergent - Free & Clear", brand: "Puracy", price: "$13.99", ingredients: ["Water", "Decyl Glucoside", "Sodium Citrate", "Glycerin", "Sodium Gluconate", "Protease", "Amylase"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "kirkland-ultra-clean-pods", name: "Kirkland Ultra Clean Laundry Pods", brand: "Kirkland", price: "$16.99", ingredients: ["PEG/PPG Copolymer", "Alcohol Ethoxylate", "Propylene Glycol", "Subtilisin", "Mannanase", "Amylase", "Fragrance", "Denatonium Benzoate"], packaging: ["Plastic Tub", "Plastic Lid"], category: ProductCategory.CLEANING },
      { slug: "attitude-laundry-unscented", name: "Attitude Laundry Detergent - Unscented", brand: "Attitude", price: "$14.99", ingredients: ["Water", "Coco Glucoside", "Sodium Coco Sulfate", "Sodium Chloride", "Citric Acid", "Sodium Citrate"], packaging: ["Recycled Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "aspen-clean-laundry", name: "AspenClean Laundry Detergent - Eucalyptus", brand: "AspenClean", price: "$18.99", ingredients: ["Water", "Decyl Glucoside", "Sodium Citrate", "Sodium Carbonate", "Eucalyptus Oil", "Lavender Oil"], packaging: ["Recycled Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "zum-clean-laundry-soap", name: "Zum Clean Laundry Soap - Sea Salt", brand: "Zum", price: "$13.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Coconut Oil", "Baking Soda", "Vegetable Glycerin", "Essential Oils"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "meliora-laundry-powder", name: "Meliora Laundry Powder", brand: "Meliora", price: "$16.99", ingredients: ["Sodium Bicarbonate", "Sodium Carbonate", "Sodium Percarbonate", "Coconut Oil Soap", "Lemon Essential Oil"], packaging: ["Cardboard Box"], category: ProductCategory.CLEANING },
      { slug: "rockin-green-classic-rock", name: "Rockin' Green Classic Rock Laundry Detergent", brand: "Rockin' Green", price: "$16.99", ingredients: ["Sodium Carbonate", "Sodium Percarbonate", "Sodium Sulfate", "Linear Alkylbenzene Sulfonate", "Alkyl Polyglucoside", "Fragrance"], packaging: ["Plastic Bag"], category: ProductCategory.CLEANING },
      { slug: "tide-to-go-pen", name: "Tide To Go Instant Stain Remover Pen", brand: "Tide", price: "$3.49", ingredients: ["Water", "Alcohol Ethoxylate", "Propylene Glycol", "Hydrogen Peroxide", "Citric Acid", "Sodium Hydroxide", "Fragrance"], packaging: ["Plastic Pen"], category: ProductCategory.CLEANING },
      { slug: "shout-stain-remover", name: "Shout Advanced Stain Remover Spray", brand: "Shout", price: "$4.99", ingredients: ["Water", "Alcohol Ethoxylate", "Hydrogen Peroxide", "Sodium Percarbonate", "Sodium Silicate", "Fragrance"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "spray-n-wash-laundry", name: "Spray 'n Wash Laundry Stain Remover", brand: "Spray 'n Wash", price: "$4.49", ingredients: ["Water", "Alcohol Ethoxylate", "Sodium Dodecylbenzene Sulfonate", "Hydrogen Peroxide", "Fragrance", "Tetrasodium EDTA"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      { slug: "mrs-meyers-fabric-softener", name: "Mrs. Meyer's Fabric Softener - Lavender", brand: "Mrs. Meyer's", price: "$7.99", ingredients: ["Water", "Diethyl Ester Dimethyl Ammonium Chloride", "Calcium Chloride", "Lavender Oil", "Fragrance", "Methylisothiazolinone"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "grove-laundry-sheets", name: "Grove Co. Laundry Detergent Sheets - Free & Clear", brand: "Grove Co.", price: "$14.99", ingredients: ["PVA Film", "Alcohol Ethoxylate", "Glycerin", "Sodium Citrate", "Coconut Oil Based Surfactant"], packaging: ["Cardboard Box"], category: ProductCategory.CLEANING },
      { slug: "earth-breeze-eco-sheets", name: "Earth Breeze Eco Sheets - Fragrance Free", brand: "Earth Breeze", price: "$15.99", ingredients: ["PVA Film", "Coconut Oil Based Surfactant", "Glycerin", "Protease", "Amylase", "Sodium Citrate"], packaging: ["Cardboard Envelope"], category: ProductCategory.CLEANING },
      { slug: "ecover-zero-laundry", name: "Ecover Zero Laundry Detergent", brand: "Ecover", price: "$12.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Laureth-7", "Sodium Citrate", "Oleic Acid", "Sodium Hydroxide", "Protease"], packaging: ["Recycled Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "sun-triple-clean-pods", name: "Sun Triple Clean Laundry Pods", brand: "Sun", price: "$8.99", ingredients: ["PEG/PPG Copolymer", "Alcohol Ethoxylate", "Sodium Carbonate", "Subtilisin", "Fragrance", "Denatonium Benzoate", "Blue 1"], packaging: ["Plastic Bag"], category: ProductCategory.CLEANING },
      { slug: "caldrea-laundry-detergent", name: "Caldrea Laundry Detergent - Sea Salt Neroli", brand: "Caldrea", price: "$16.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Glycerin", "Sodium Citrate", "Oleic Acid", "Fragrance", "Protease", "Amylase", "Colorant"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "cheer-colorguard-liquid", name: "Cheer Colorguard Liquid Detergent", brand: "Cheer", price: "$10.99", ingredients: ["Water", "Alcohol Ethoxylate", "Linear Alkylbenzene Sulfonate", "Propylene Glycol", "Citric Acid", "Sodium Hydroxide", "Borax", "Fragrance", "Protease"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "arm-hammer-oxiclean-pods", name: "Arm & Hammer Plus OxiClean Power Paks", brand: "Arm & Hammer", price: "$10.99", ingredients: ["Sodium Carbonate", "Sodium Percarbonate", "PEG/PPG Copolymer", "Alcohol Ethoxylate", "Subtilisin", "Fragrance", "Denatonium Benzoate"], packaging: ["Plastic Tub", "Plastic Lid"], category: ProductCategory.CLEANING },
      { slug: "branch-basics-concentrate", name: "Branch Basics Laundry Concentrate", brand: "Branch Basics", price: "$49.00", ingredients: ["Water", "Coco Glucoside", "Decyl Glucoside", "Chamomile Extract", "Sodium Bicarbonate", "Sodium Phytate"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },
      { slug: "defunkify-active-wash", name: "Defunkify Active Wash Laundry Detergent", brand: "Defunkify", price: "$16.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Sodium Citrate", "Sodium Gluconate", "Protease", "Amylase", "Fragrance"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },

      // ══════════════════════════════════════════════════════
      // HOUSEHOLD ITEMS (50)
      // ══════════════════════════════════════════════════════
      { slug: "febreze-air-linen", name: "Febreze Air Freshener - Linen & Sky", brand: "Febreze", price: "$4.99", ingredients: ["Water", "Alcohol", "Cyclodextrin", "Dialkyl Sodium Sulfosuccinate", "Hydrogenated Castor Oil", "Citric Acid", "Fragrance", "Benzisothiazolinone"], packaging: ["Aerosol Can", "Plastic Cap"], category: ProductCategory.HOUSEHOLD },
      { slug: "glade-plugins-lavender", name: "Glade PlugIns Scented Oil - Lavender", brand: "Glade", price: "$6.99", ingredients: ["Fragrance", "Isopropyl Myristate", "Dipropylene Glycol", "Linalool", "Geraniol", "Hexamethylindanopyran"], packaging: ["Plastic Housing", "Glass Oil Container"], category: ProductCategory.HOUSEHOLD },
      { slug: "bounty-paper-towels", name: "Bounty Select-A-Size Paper Towels", brand: "Bounty", price: "$5.99", ingredients: ["Virgin Wood Pulp Fiber"], packaging: ["Plastic Wrap"], category: ProductCategory.HOUSEHOLD },
      { slug: "glad-forceflex-trash", name: "Glad ForceFlex Tall Kitchen Trash Bags", brand: "Glad", price: "$9.99", ingredients: ["Linear Low-Density Polyethylene", "Fragrance"], packaging: ["Cardboard Box", "Plastic Inner Wrap"], category: ProductCategory.HOUSEHOLD },
      { slug: "air-wick-essential-mist", name: "Air Wick Essential Mist - Lavender", brand: "Air Wick", price: "$9.99", ingredients: ["Water", "Propylene Glycol", "Lavender Essential Oil", "Fragrance", "Sodium Benzoate"], packaging: ["Plastic Diffuser", "Plastic Refill"], category: ProductCategory.HOUSEHOLD },
      { slug: "yankee-candle-vanilla", name: "Yankee Candle - Vanilla Cupcake", brand: "Yankee Candle", price: "$29.99", ingredients: ["Paraffin Wax", "Fragrance", "Dye"], packaging: ["Glass Jar", "Metal Lid"], category: ProductCategory.HOUSEHOLD },
      { slug: "bath-body-candle-eucalyptus", name: "Bath & Body Works Candle - Eucalyptus Spearmint", brand: "Bath & Body Works", price: "$26.50", ingredients: ["Soy Wax Blend", "Paraffin Wax", "Fragrance", "Dye"], packaging: ["Glass Jar", "Metal Lid"], category: ProductCategory.HOUSEHOLD },
      { slug: "mrs-meyers-soy-candle", name: "Mrs. Meyer's Soy Candle - Lavender", brand: "Mrs. Meyer's", price: "$9.99", ingredients: ["Soy Wax", "Vegetable Wax", "Cotton Wick", "Lavender Essential Oil", "Fragrance"], packaging: ["Glass Jar", "Metal Lid"], category: ProductCategory.HOUSEHOLD },
      { slug: "hefty-ultra-strong-trash", name: "Hefty Ultra Strong Trash Bags", brand: "Hefty", price: "$10.99", ingredients: ["Linear Low-Density Polyethylene", "Fragrance"], packaging: ["Cardboard Box"], category: ProductCategory.HOUSEHOLD },
      { slug: "charmin-ultra-soft", name: "Charmin Ultra Soft Toilet Paper", brand: "Charmin", price: "$12.99", ingredients: ["Virgin Wood Pulp Fiber", "Water"], packaging: ["Plastic Wrap"], category: ProductCategory.HOUSEHOLD },
      { slug: "cottonelle-ultra-clean", name: "Cottonelle Ultra Clean Toilet Paper", brand: "Cottonelle", price: "$11.99", ingredients: ["Virgin Wood Pulp Fiber", "Water"], packaging: ["Plastic Wrap"], category: ProductCategory.HOUSEHOLD },
      { slug: "scott-1000-toilet-paper", name: "Scott 1000 Sheets Per Roll Toilet Paper", brand: "Scott", price: "$8.99", ingredients: ["Recycled Fiber", "Water"], packaging: ["Plastic Wrap"], category: ProductCategory.HOUSEHOLD },
      { slug: "swiffer-dry-cloths", name: "Swiffer Sweeper Dry Sweeping Cloths", brand: "Swiffer", price: "$7.99", ingredients: ["Polyester", "Polypropylene"], packaging: ["Cardboard Box", "Plastic Inner Wrap"], category: ProductCategory.HOUSEHOLD },
      { slug: "swiffer-wet-pads", name: "Swiffer Sweeper Wet Mopping Pads", brand: "Swiffer", price: "$8.99", ingredients: ["Water", "Propylene Glycol n-Propyl Ether", "Fragrance", "Didecyl Dimethyl Ammonium Chloride", "Benzisothiazolinone"], packaging: ["Plastic Package"], category: ProductCategory.HOUSEHOLD },
      { slug: "ziploc-gallon-bags", name: "Ziploc Gallon Storage Bags", brand: "Ziploc", price: "$5.99", ingredients: ["Polyethylene"], packaging: ["Cardboard Box"], category: ProductCategory.HOUSEHOLD },
      { slug: "reynolds-aluminum-foil", name: "Reynolds Wrap Aluminum Foil", brand: "Reynolds", price: "$5.49", ingredients: ["Aluminum"], packaging: ["Cardboard Box"], category: ProductCategory.HOUSEHOLD },
      { slug: "glad-cling-wrap", name: "Glad Press'n Seal Cling Wrap", brand: "Glad", price: "$4.99", ingredients: ["Polyethylene", "Adhesive"], packaging: ["Cardboard Box"], category: ProductCategory.HOUSEHOLD },
      { slug: "brawny-paper-towels", name: "Brawny Tear-A-Square Paper Towels", brand: "Brawny", price: "$5.49", ingredients: ["Virgin Wood Pulp Fiber"], packaging: ["Plastic Wrap"], category: ProductCategory.HOUSEHOLD },
      { slug: "sparkle-paper-towels", name: "Sparkle Pick-A-Size Paper Towels", brand: "Sparkle", price: "$4.49", ingredients: ["Virgin Wood Pulp Fiber"], packaging: ["Plastic Wrap"], category: ProductCategory.HOUSEHOLD },
      { slug: "febreze-fabric-refresher", name: "Febreze Fabric Refresher - Gain Original", brand: "Febreze", price: "$5.99", ingredients: ["Water", "Alcohol", "Cyclodextrin", "Hydrogenated Castor Oil", "Fragrance", "Citric Acid", "Sodium Hydroxide", "Benzisothiazolinone"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.HOUSEHOLD },
      { slug: "renuzit-gel-air-freshener", name: "Renuzit Gel Air Freshener - After The Rain", brand: "Renuzit", price: "$1.49", ingredients: ["Water", "Carrageenan", "Fragrance", "Sodium Chloride", "Citric Acid", "Colorant"], packaging: ["Plastic Cone"], category: ProductCategory.HOUSEHOLD },
      { slug: "poo-pourri-original", name: "Poo~Pourri Original Citrus Toilet Spray", brand: "Poo~Pourri", price: "$9.99", ingredients: ["Water", "Essential Oils", "Lemongrass Oil", "Bergamot Oil", "Grapefruit Oil", "Alcohol"], packaging: ["Glass Bottle", "Plastic Sprayer"], category: ProductCategory.HOUSEHOLD },
      { slug: "caldrea-linen-spray", name: "Caldrea Linen & Room Spray - Sea Salt Neroli", brand: "Caldrea", price: "$11.99", ingredients: ["Water", "Alcohol", "Fragrance", "PEG-40 Hydrogenated Castor Oil"], packaging: ["Glass Bottle", "Plastic Sprayer"], category: ProductCategory.HOUSEHOLD },
      { slug: "vitruvi-essential-oil-diffuser", name: "Vitruvi Stone Diffuser Essential Oil Blend", brand: "Vitruvi", price: "$22.00", ingredients: ["Lavender Essential Oil", "Eucalyptus Essential Oil", "Bergamot Essential Oil"], packaging: ["Glass Bottle"], category: ProductCategory.HOUSEHOLD },
      { slug: "seventh-gen-paper-towels", name: "Seventh Generation Paper Towels - Unbleached", brand: "Seventh Generation", price: "$6.99", ingredients: ["Unbleached Recycled Fiber"], packaging: ["Paper Wrap"], category: ProductCategory.HOUSEHOLD },
      { slug: "who-gives-crap-tp", name: "Who Gives A Crap Toilet Paper - Bamboo", brand: "Who Gives A Crap", price: "$12.99", ingredients: ["Bamboo Fiber", "Sugarcane Fiber"], packaging: ["Paper Wrap"], category: ProductCategory.HOUSEHOLD },
      { slug: "method-hand-soap-gel", name: "Method Gel Hand Soap - Waterfall", brand: "Method", price: "$4.49", ingredients: ["Water", "Sodium Lauryl Sulfate", "Lauramidopropyl Betaine", "Sodium Chloride", "Fragrance", "Aloe Vera Extract", "Vitamin E", "Colorant"], packaging: ["Recycled Plastic Bottle", "Plastic Pump"], category: ProductCategory.HOUSEHOLD },
      { slug: "mrs-meyers-hand-soap", name: "Mrs. Meyer's Hand Soap - Basil", brand: "Mrs. Meyer's", price: "$4.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Lauramidopropyl Betaine", "Decyl Glucoside", "Basil Essential Oil", "Glycerin", "Aloe Vera", "Fragrance", "Colorant"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.HOUSEHOLD },
      { slug: "softsoap-moisturizing-hand", name: "Softsoap Moisturizing Hand Soap - Milk & Honey", brand: "Softsoap", price: "$2.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Fragrance", "PEG-18 Glyceryl Oleate", "Polyquaternium-7", "DMDM Hydantoin", "Yellow 5", "Red 4"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.HOUSEHOLD },
      { slug: "dial-antibacterial-hand", name: "Dial Antibacterial Hand Soap - Gold", brand: "Dial", price: "$2.49", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Benzalkonium Chloride", "Fragrance", "DMDM Hydantoin", "Yellow 5", "Red 40"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.HOUSEHOLD },
      { slug: "j-r-watkins-hand-soap", name: "J.R. Watkins Hand Soap - Lemon", brand: "J.R. Watkins", price: "$5.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Cocamidopropyl Betaine", "Glycerin", "Lemon Essential Oil", "Aloe Vera", "Vitamin E"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.HOUSEHOLD },
      { slug: "grove-hand-soap-refill", name: "Grove Co. Hydrating Hand Soap - Free & Clear", brand: "Grove Co.", price: "$5.99", ingredients: ["Water", "Decyl Glucoside", "Coco Glucoside", "Glycerin", "Aloe Vera", "Citric Acid"], packaging: ["Recycled Plastic Bottle", "Plastic Pump"], category: ProductCategory.HOUSEHOLD },
      { slug: "clorox-compostable-wipes", name: "Clorox Compostable Cleaning Wipes", brand: "Clorox", price: "$5.49", ingredients: ["Water", "Citric Acid", "Decyl Glucoside", "Lauramine Oxide", "Fragrance"], packaging: ["Compostable Pouch"], category: ProductCategory.HOUSEHOLD },
      { slug: "babyganics-wipes", name: "Babyganics All-Purpose Surface Wipes", brand: "Babyganics", price: "$5.99", ingredients: ["Water", "Decyl Glucoside", "Sodium Citrate", "Tocopheryl Acetate", "Chamomile Extract"], packaging: ["Plastic Tub", "Plastic Lid"], category: ProductCategory.HOUSEHOLD },
      { slug: "lysol-laundry-sanitizer", name: "Lysol Laundry Sanitizer - Crisp Linen", brand: "Lysol", price: "$8.99", ingredients: ["Water", "Alkyl Dimethyl Benzyl Ammonium Chloride", "Fragrance", "Colorant"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HOUSEHOLD },
      { slug: "caldrea-hand-soap-refill", name: "Caldrea Hand Soap Refill - Pear Blossom Agave", brand: "Caldrea", price: "$9.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Cocamidopropyl Betaine", "Glycerin", "Aloe Vera", "Fragrance", "Sodium Chloride"], packaging: ["Plastic Pouch"], category: ProductCategory.HOUSEHOLD },
      { slug: "blueland-hand-soap-tablet", name: "Blueland Hand Soap Tablet Refill", brand: "Blueland", price: "$2.99", ingredients: ["Sodium Coco Sulfate", "Sodium Bicarbonate", "Citric Acid", "Decyl Glucoside", "Fragrance"], packaging: ["Paper Wrapper"], category: ProductCategory.HOUSEHOLD },
      { slug: "ecos-hand-soap-free-clear", name: "ECOS Hand Soap - Free & Clear", brand: "ECOS", price: "$3.99", ingredients: ["Water", "Cocamidopropyl Betaine", "Decyl Glucoside", "Glycerin", "Citric Acid", "Vitamin E"], packaging: ["Recycled Plastic Bottle", "Plastic Pump"], category: ProductCategory.HOUSEHOLD },
      { slug: "raw-sugar-hand-soap", name: "Raw Sugar Hand Soap - Lemon Sugar", brand: "Raw Sugar", price: "$4.99", ingredients: ["Water", "Sodium Coco Sulfate", "Cocamidopropyl Betaine", "Glycerin", "Raw Turbinado Sugar", "Cold Pressed Lemon Oil", "Coconut Oil"], packaging: ["Recycled Plastic Bottle", "Plastic Pump"], category: ProductCategory.HOUSEHOLD },
      { slug: "everspring-hand-soap", name: "Everspring Hand Soap - Lemon & Mint", brand: "Everspring", price: "$3.99", ingredients: ["Water", "Sodium Coco Sulfate", "Cocamidopropyl Betaine", "Glycerin", "Sodium Chloride", "Lemon Oil", "Peppermint Oil"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.HOUSEHOLD },
      { slug: "puracy-hand-soap", name: "Puracy Natural Hand Soap - Lavender & Vanilla", brand: "Puracy", price: "$5.99", ingredients: ["Water", "Decyl Glucoside", "Coco Glucoside", "Glycerin", "Sea Salt", "Lavender Oil", "Vanilla Extract", "Aloe Vera", "Vitamin E"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.HOUSEHOLD },
      { slug: "better-life-hand-soap", name: "Better Life Hand Soap - Citrus Mint", brand: "Better Life", price: "$5.99", ingredients: ["Water", "Decyl Glucoside", "Coco Glucoside", "Vegetable Glycerin", "Citric Acid", "Lemon Oil", "Peppermint Oil", "Aloe Vera"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.HOUSEHOLD },
      { slug: "glad-odorshield-trash", name: "Glad OdorShield Kitchen Trash Bags", brand: "Glad", price: "$8.99", ingredients: ["Linear Low-Density Polyethylene", "Fragrance", "Febreze"], packaging: ["Cardboard Box"], category: ProductCategory.HOUSEHOLD },
      { slug: "hefty-recycling-bags", name: "Hefty Recycling Bags", brand: "Hefty", price: "$6.99", ingredients: ["Linear Low-Density Polyethylene"], packaging: ["Cardboard Box"], category: ProductCategory.HOUSEHOLD },
      { slug: "simple-truth-trash-bags", name: "Simple Truth Compostable Trash Bags", brand: "Simple Truth", price: "$7.99", ingredients: ["PLA Bioplastic", "PBAT Biodegradable Polymer"], packaging: ["Cardboard Box"], category: ProductCategory.HOUSEHOLD },

      // ══════════════════════════════════════════════════════
      // SKINCARE & BODY (50)
      // ══════════════════════════════════════════════════════
      { slug: "cerave-moisturizing-cream", name: "CeraVe Moisturizing Cream", brand: "CeraVe", price: "$16.99", ingredients: ["Water", "Glycerin", "Cetearyl Alcohol", "Caprylic Triglyceride", "Cetyl Alcohol", "Ceteareth-20", "Petrolatum", "Ceramide NP", "Ceramide AP", "Ceramide EOP", "Carbomer", "Dimethicone", "Sodium Hyaluronate", "Cholesterol", "Phenoxyethanol", "Tocopherol", "Phytosphingosine", "Xanthan Gum"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.SKIN_BODY },
      { slug: "cetaphil-gentle-cleanser", name: "Cetaphil Gentle Skin Cleanser", brand: "Cetaphil", price: "$11.99", ingredients: ["Water", "Cetyl Alcohol", "Propylene Glycol", "Sodium Lauryl Sulfate", "Stearyl Alcohol", "Methylparaben", "Propylparaben", "Butylparaben"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.SKIN_BODY },
      { slug: "eucerin-original-cream", name: "Eucerin Original Healing Cream", brand: "Eucerin", price: "$9.99", ingredients: ["Water", "Petrolatum", "Mineral Oil", "Ceresin", "Lanolin Alcohol", "Methylchloroisothiazolinone", "Methylisothiazolinone"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.SKIN_BODY },
      { slug: "aveeno-daily-moisturizer", name: "Aveeno Daily Moisturizing Lotion", brand: "Aveeno", price: "$10.49", ingredients: ["Water", "Glycerin", "Distearyldimonium Chloride", "Petrolatum", "Isopropyl Palmitate", "Cetyl Alcohol", "Dimethicone", "Avena Sativa Kernel Flour", "Benzyl Alcohol", "Sodium Chloride"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.SKIN_BODY },
      { slug: "neutrogena-hydro-boost", name: "Neutrogena Hydro Boost Water Gel", brand: "Neutrogena", price: "$19.99", ingredients: ["Water", "Dimethicone", "Glycerin", "Dimethicone Crosspolymer", "Sodium Hyaluronate", "Polyacrylamide", "Ethylhexylglycerin", "Phenoxyethanol", "Fragrance", "Carbomer", "Sodium Hydroxide", "Blue 1"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.SKIN_BODY },
      { slug: "nivea-creme", name: "NIVEA Creme", brand: "NIVEA", price: "$6.99", ingredients: ["Water", "Mineral Oil", "Petrolatum", "Glycerin", "Microcrystalline Wax", "Lanolin Alcohol", "Paraffin", "Panthenol", "Fragrance", "Limonene", "Geraniol", "Hydroxycitronellal", "Linalool", "Citronellol", "Benzyl Benzoate"], packaging: ["Metal Tin"], category: ProductCategory.SKIN_BODY },
      { slug: "vaseline-petroleum-jelly", name: "Vaseline Original Petroleum Jelly", brand: "Vaseline", price: "$4.99", ingredients: ["White Petrolatum"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.SKIN_BODY },
      { slug: "aquaphor-healing-ointment", name: "Aquaphor Healing Ointment", brand: "Aquaphor", price: "$12.99", ingredients: ["Petrolatum", "Mineral Oil", "Ceresin", "Lanolin Alcohol", "Panthenol", "Glycerin", "Bisabolol"], packaging: ["Plastic Tube", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "dove-deep-moisture-bodywash", name: "Dove Deep Moisture Body Wash", brand: "Dove", price: "$7.99", ingredients: ["Water", "Sodium Lauroyl Isethionate", "Cocamidopropyl Betaine", "Sodium Lauryl Sulfate", "Stearic Acid", "Fragrance", "Guar Hydroxypropyltrimonium Chloride", "Tetrasodium EDTA", "Methylisothiazolinone"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "dr-bronners-peppermint", name: "Dr. Bronner's Pure-Castile Soap - Peppermint", brand: "Dr. Bronner's", price: "$11.99", ingredients: ["Water", "Organic Coconut Oil", "Potassium Hydroxide", "Organic Palm Kernel Oil", "Organic Olive Oil", "Mentha Arvensis", "Organic Hemp Oil", "Organic Jojoba Oil", "Citric Acid", "Tocopherol"], packaging: ["Recycled Plastic Bottle", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "irish-spring-original-bw", name: "Irish Spring Original Body Wash", brand: "Irish Spring", price: "$5.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Fragrance", "Citric Acid", "Sodium Benzoate", "Tetrasodium EDTA", "Green 3", "Yellow 5"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "native-coconut-vanilla-bw", name: "Native Body Wash - Coconut & Vanilla", brand: "Native", price: "$8.99", ingredients: ["Water", "Sodium Lauroyl Methyl Isethionate", "Cocamidopropyl Betaine", "Glycerin", "Coconut Oil", "Fragrance", "Aloe Barbadensis Leaf Juice", "Tocopheryl Acetate", "Citric Acid"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "banana-boat-sport-spf50", name: "Banana Boat Sport Ultra SPF 50", brand: "Banana Boat", price: "$8.99", ingredients: ["Avobenzone", "Homosalate", "Octisalate", "Octocrylene", "Oxybenzone", "Water", "Sorbitol", "Beeswax", "Stearic Acid", "Fragrance", "Methylparaben", "BHT"], packaging: ["Plastic Tube", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "supergoop-unseen-spf40", name: "Supergoop! Unseen Sunscreen SPF 40", brand: "Supergoop!", price: "$38.00", ingredients: ["Avobenzone", "Homosalate", "Octisalate", "Octocrylene", "Dimethicone", "Silica", "Meadowfoam Estolide", "Tocopheryl Acetate", "Red Algae Extract"], packaging: ["Plastic Tube", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "secret-clinical-strength", name: "Secret Clinical Strength Antiperspirant", brand: "Secret", price: "$10.99", ingredients: ["Aluminum Zirconium Trichlorohydrex Gly", "Cyclopentasiloxane", "Stearyl Alcohol", "PPG-14 Butyl Ether", "Hydrogenated Castor Oil", "Fragrance", "Dimethicone", "BHT"], packaging: ["Plastic Stick", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "native-deodorant-coconut", name: "Native Deodorant - Coconut & Vanilla", brand: "Native", price: "$12.99", ingredients: ["Caprylic Triglyceride", "Tapioca Starch", "Ozokerite", "Beeswax", "Coconut Oil", "Shea Butter", "Sodium Bicarbonate", "Fragrance"], packaging: ["Plastic Stick", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "dove-sensitive-deodorant", name: "Dove 0% Aluminum Deodorant - Sensitive", brand: "Dove", price: "$6.99", ingredients: ["Propanediol", "Stearyl Alcohol", "Sunflower Seed Oil", "Glyceryl Stearate", "Zinc Ricinoleate", "Tapioca Starch"], packaging: ["Plastic Stick", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "colgate-total-whitening", name: "Colgate Total Whitening Toothpaste", brand: "Colgate", price: "$4.99", ingredients: ["Water", "Glycerin", "Hydrated Silica", "Sodium Lauryl Sulfate", "Stannous Fluoride", "PVM/MA Copolymer", "Cellulose Gum", "Flavor", "Carrageenan", "Sodium Saccharin", "Titanium Dioxide", "Sucralose", "Blue 1"], packaging: ["Plastic Tube", "Cardboard Box"], category: ProductCategory.SKIN_BODY },
      { slug: "sensodyne-pronamel", name: "Sensodyne Pronamel Gentle Whitening", brand: "Sensodyne", price: "$6.49", ingredients: ["Water", "Sorbitol", "Hydrated Silica", "Glycerin", "Potassium Nitrate", "PEG-6", "Sodium Fluoride", "Cocamidopropyl Betaine", "Flavor", "Xanthan Gum", "Sodium Saccharin", "Sucralose", "Titanium Dioxide"], packaging: ["Plastic Tube", "Cardboard Box"], category: ProductCategory.SKIN_BODY },
      { slug: "la-roche-posay-toleriane", name: "La Roche-Posay Toleriane Double Repair Moisturizer", brand: "La Roche-Posay", price: "$19.99", ingredients: ["Water", "Glycerin", "Dimethicone", "Niacinamide", "Shea Butter", "Glyceryl Stearate", "Propanediol", "Ceramide NP", "Sodium Hyaluronate", "Tocopherol", "Phenoxyethanol"], packaging: ["Plastic Tube", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "the-ordinary-niacinamide", name: "The Ordinary Niacinamide 10% + Zinc 1%", brand: "The Ordinary", price: "$5.90", ingredients: ["Water", "Niacinamide", "Pentylene Glycol", "Zinc PCA", "Dimethyl Isosorbide", "Tamarindus Indica Seed Gum", "Xanthan Gum", "Isoceteth-20", "Ethoxydiglycol", "Phenoxyethanol", "Chlorphenesin"], packaging: ["Glass Bottle", "Plastic Dropper"], category: ProductCategory.SKIN_BODY },
      { slug: "cerave-foaming-cleanser", name: "CeraVe Foaming Facial Cleanser", brand: "CeraVe", price: "$14.99", ingredients: ["Water", "Cocamidopropyl Hydroxysultaine", "Glycerin", "Sodium Lauroyl Sarcosinate", "PEG-150 Pentaerythrityl Tetrastearate", "Niacinamide", "Ceramide NP", "Ceramide AP", "Ceramide EOP", "Sodium Hyaluronate", "Cholesterol", "Phenoxyethanol", "Sodium Methyl Cocoyl Taurate"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.SKIN_BODY },
      { slug: "kiehls-ultra-facial-cream", name: "Kiehl's Ultra Facial Cream", brand: "Kiehl's", price: "$35.00", ingredients: ["Water", "Squalane", "Glycerin", "Cyclohexasiloxane", "Sucrose Stearate", "Stearyl Alcohol", "Myristyl Myristate", "Prunus Armeniaca Kernel Oil", "Phenoxyethanol", "Caprylyl Glycol"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.SKIN_BODY },
      { slug: "olay-regenerist-moisturizer", name: "Olay Regenerist Micro-Sculpting Cream", brand: "Olay", price: "$28.99", ingredients: ["Water", "Glycerin", "Niacinamide", "Dimethicone", "Isohexadecane", "Aluminum Starch Octenylsuccinate", "Panthenol", "Tocopheryl Acetate", "Sodium Hyaluronate", "Amino Peptide Complex", "Fragrance", "Phenoxyethanol", "Red 33"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.SKIN_BODY },
      { slug: "jergens-ultra-healing", name: "Jergens Ultra Healing Body Lotion", brand: "Jergens", price: "$7.99", ingredients: ["Water", "Glycerin", "Cetyl Alcohol", "Mineral Oil", "Petrolatum", "Dimethicone", "Stearic Acid", "Fragrance", "Vitamins C and E", "DMDM Hydantoin", "Methylparaben"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.SKIN_BODY },
      { slug: "lubriderm-daily-moisture", name: "Lubriderm Daily Moisture Lotion", brand: "Lubriderm", price: "$8.49", ingredients: ["Water", "Mineral Oil", "Glycerin", "Cetyl Alcohol", "Petrolatum", "Emulsifying Wax", "Dimethicone", "DMDM Hydantoin", "Fragrance", "Methylparaben"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.SKIN_BODY },
      { slug: "gold-bond-healing", name: "Gold Bond Ultimate Healing Lotion", brand: "Gold Bond", price: "$9.99", ingredients: ["Water", "Glycerin", "Dimethicone", "Jojoba Esters", "Petrolatum", "Cetyl Alcohol", "Aloe Vera", "Vitamins A C E", "Fragrance", "Phenoxyethanol"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.SKIN_BODY },
      { slug: "palmers-cocoa-butter", name: "Palmer's Cocoa Butter Formula Lotion", brand: "Palmer's", price: "$6.99", ingredients: ["Water", "Theobroma Cacao Seed Butter", "Mineral Oil", "Glycerin", "Stearic Acid", "Cetyl Alcohol", "Dimethicone", "Fragrance", "Methylparaben", "Propylparaben", "Tocopheryl Acetate"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "cetaphil-moisturizing-cream", name: "Cetaphil Moisturizing Cream", brand: "Cetaphil", price: "$14.99", ingredients: ["Water", "Glycerin", "Petrolatum", "Dicaprylyl Ether", "Dimethicone", "Glyceryl Stearate", "Cetyl Alcohol", "Sweet Almond Oil", "Niacinamide", "Panthenol", "Phenoxyethanol"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.SKIN_BODY },
      { slug: "first-aid-beauty-ultra-repair", name: "First Aid Beauty Ultra Repair Cream", brand: "First Aid Beauty", price: "$38.00", ingredients: ["Water", "Stearic Acid", "Glycerin", "C12-15 Alkyl Benzoate", "Caprylic Triglyceride", "Glyceryl Stearate", "Colloidal Oatmeal", "Shea Butter", "Allantoin", "Dimethicone", "Squalane", "Phenoxyethanol", "Ceramide NP"], packaging: ["Plastic Tube", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "tatcha-water-cream", name: "Tatcha The Water Cream", brand: "Tatcha", price: "$69.00", ingredients: ["Water", "Squalane", "Glycerin", "Diphenylsiloxy Phenyl Trimethicone", "BG", "Hadasei-3 Complex", "Japanese Wild Rose", "Japanese Leopard Lily", "Sodium Hyaluronate", "Phenoxyethanol"], packaging: ["Glass Jar", "Plastic Lid"], category: ProductCategory.SKIN_BODY },
      { slug: "drunk-elephant-protini", name: "Drunk Elephant Protini Polypeptide Cream", brand: "Drunk Elephant", price: "$68.00", ingredients: ["Water", "Dicaprylyl Carbonate", "Glycerin", "Cetearyl Alcohol", "Cetearyl Olivate", "Sorbitan Olivate", "Sclerocarya Birrea Seed Oil", "Signal Peptides", "Sodium Hyaluronate", "Pygmy Waterlily Extract", "Phenoxyethanol"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.SKIN_BODY },
      { slug: "elta-md-uv-clear-spf46", name: "EltaMD UV Clear SPF 46", brand: "EltaMD", price: "$39.00", ingredients: ["Zinc Oxide", "Octinoxate", "Water", "Niacinamide", "Hyaluronic Acid", "Lactic Acid", "Tocopheryl Acetate", "Dimethicone"], packaging: ["Plastic Tube", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "vanicream-moisturizing-cream", name: "Vanicream Moisturizing Skin Cream", brand: "Vanicream", price: "$14.99", ingredients: ["Water", "White Petrolatum", "Sorbitol", "Cetearyl Alcohol", "Propylene Glycol", "Ceteareth-20", "Simethicone", "Glyceryl Monostearate", "PEG-30 Dipolyhydroxystearate", "Sodium Hydroxide"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.SKIN_BODY },
      { slug: "honest-body-lotion", name: "The Honest Company Body Lotion - Lavender", brand: "The Honest Company", price: "$12.99", ingredients: ["Water", "Glycerin", "Caprylic Triglyceride", "Cetearyl Alcohol", "Butyrospermum Parkii Butter", "Cocos Nucifera Oil", "Jojoba Oil", "Lavender Oil", "Tocopherol", "Phenoxyethanol"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.SKIN_BODY },
      { slug: "every-man-jack-face-wash", name: "Every Man Jack Daily Face Wash", brand: "Every Man Jack", price: "$8.99", ingredients: ["Water", "Sodium Cocoyl Isethionate", "Cocamidopropyl Betaine", "Glycerin", "Salicylic Acid", "Activated Charcoal", "Aloe Barbadensis Leaf Juice", "Menthol", "Fragrance"], packaging: ["Plastic Tube", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "cerave-sa-cleanser", name: "CeraVe Renewing SA Cleanser", brand: "CeraVe", price: "$14.99", ingredients: ["Water", "Cocamidopropyl Hydroxysultaine", "Glycerin", "Sodium Lauroyl Sarcosinate", "Salicylic Acid", "Niacinamide", "Ceramide NP", "Ceramide AP", "Ceramide EOP", "Cholesterol", "Hyaluronic Acid", "Phenoxyethanol"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.SKIN_BODY },
      { slug: "bioderma-sensibio-micellar", name: "Bioderma Sensibio H2O Micellar Water", brand: "Bioderma", price: "$14.99", ingredients: ["Water", "PEG-6 Caprylic Glycerides", "Fructooligosaccharides", "Mannitol", "Xylitol", "Rhamnose", "Cetrimonium Bromide", "Disodium EDTA"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "paula-choice-bha-exfoliant", name: "Paula's Choice 2% BHA Liquid Exfoliant", brand: "Paula's Choice", price: "$32.00", ingredients: ["Water", "Methylpropanediol", "Butylene Glycol", "Salicylic Acid", "Polysorbate 20", "Green Tea Extract", "Methylcellulose", "Sodium Hydroxide", "Sodium Metabisulfite"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.SKIN_BODY },
      { slug: "hero-mighty-patch", name: "Hero Cosmetics Mighty Patch Original", brand: "Hero Cosmetics", price: "$12.99", ingredients: ["Hydrocolloid"], packaging: ["Plastic Sheet", "Cardboard Box"], category: ProductCategory.SKIN_BODY },

      // ══════════════════════════════════════════════════════
      // HAIRCARE (50)
      // ══════════════════════════════════════════════════════
      { slug: "head-shoulders-classic", name: "Head & Shoulders Classic Clean Shampoo", brand: "Head & Shoulders", price: "$6.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Sodium Laureth Sulfate", "Glycol Distearate", "Zinc Pyrithione", "Cocamidopropyl Betaine", "Dimethicone", "Fragrance", "Sodium Chloride", "Methylchloroisothiazolinone", "Blue 1"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "pantene-daily-moisture-shampoo", name: "Pantene Pro-V Daily Moisture Renewal Shampoo", brand: "Pantene", price: "$6.49", ingredients: ["Water", "Sodium Lauryl Sulfate", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Dimethicone", "Sodium Chloride", "Fragrance", "Panthenol", "Citric Acid", "Methylchloroisothiazolinone"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "sheamoisture-coconut-shampoo", name: "SheaMoisture Coconut & Hibiscus Shampoo", brand: "SheaMoisture", price: "$10.99", ingredients: ["Water", "Decyl Glucoside", "Cocamidopropyl Betaine", "Shea Butter", "Coconut Oil", "Silk Amino Acids", "Panthenol", "Hibiscus Flower Extract", "Mango Seed Butter", "Jojoba Oil", "Fragrance"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "olaplex-no4-shampoo", name: "Olaplex No.4 Bond Maintenance Shampoo", brand: "Olaplex", price: "$30.00", ingredients: ["Water", "Sodium Lauroyl Methyl Isethionate", "Cocamidopropyl Betaine", "Sodium Methyl Oleoyl Taurate", "Bis-Aminopropyl Diglycol Dimaleate", "Glycerin", "Phenoxyethanol", "Fragrance", "Citric Acid"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "tresemme-keratin-shampoo", name: "TRESemmé Keratin Smooth Shampoo", brand: "TRESemmé", price: "$5.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Dimethiconol", "Fragrance", "Hydrolyzed Keratin", "Marula Oil", "Methylchloroisothiazolinone"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "garnier-whole-blends-honey", name: "Garnier Whole Blends Honey Treasures Shampoo", brand: "Garnier", price: "$4.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Coco-Betaine", "Sodium Chloride", "Glycol Distearate", "Honey Extract", "Royal Jelly Extract", "Propolis Extract", "Fragrance", "Sodium Benzoate"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "herbal-essences-argan-oil", name: "Herbal Essences Bio:Renew Argan Oil Shampoo", brand: "Herbal Essences", price: "$6.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Sodium Lauryl Sulfate", "Cocamidopropyl Betaine", "Dimethicone", "Glycol Distearate", "Argan Oil", "Fragrance", "Sodium Chloride", "Sodium Benzoate", "Citric Acid", "Colorant"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "suave-daily-clarifying", name: "Suave Essentials Daily Clarifying Shampoo", brand: "Suave", price: "$2.49", ingredients: ["Water", "Sodium Laureth Sulfate", "Sodium Lauryl Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Fragrance", "Citric Acid", "Tetrasodium EDTA", "DMDM Hydantoin", "Blue 1"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "ogx-biotin-collagen-shampoo", name: "OGX Thick & Full Biotin & Collagen Shampoo", brand: "OGX", price: "$6.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Biotin", "Collagen", "Hydrolyzed Wheat Protein", "Dimethicone", "Fragrance", "DMDM Hydantoin", "Red 33", "Blue 1"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "briogeo-dont-despair-shampoo", name: "Briogeo Don't Despair, Repair! Shampoo", brand: "Briogeo", price: "$36.00", ingredients: ["Water", "Sodium Cocoyl Isethionate", "Cocamidopropyl Betaine", "Glycerin", "Panthenol", "Biotin", "Algae Extract", "Rosehip Oil", "Argan Oil", "Coconut Oil", "Aloe Barbadensis Leaf Juice"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "aussie-moist-shampoo", name: "Aussie Miracle Moist Shampoo", brand: "Aussie", price: "$3.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Sodium Lauryl Sulfate", "Cocamidopropyl Betaine", "Glycol Distearate", "Dimethicone", "Fragrance", "Sodium Chloride", "Aloe Vera", "Methylchloroisothiazolinone"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "dove-dermacare-scalp-shampoo", name: "Dove DermaCare Scalp Anti-Dandruff Shampoo", brand: "Dove", price: "$5.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Zinc Pyrithione", "Glycol Distearate", "Dimethicone", "Fragrance", "Guar Hydroxypropyltrimonium Chloride", "Carbomer"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "moroccanoil-treatment", name: "Moroccanoil Treatment Original", brand: "Moroccanoil", price: "$48.00", ingredients: ["Cyclomethicone", "Dimethicone", "Argania Spinosa Kernel Oil", "Linseed Extract", "Fragrance", "D&C Yellow 11", "D&C Red 17", "Coumarin", "Alpha-Isomethyl Ionone"], packaging: ["Glass Bottle", "Plastic Pump"], category: ProductCategory.HAIRCARE },
      { slug: "redken-all-soft-shampoo", name: "Redken All Soft Shampoo", brand: "Redken", price: "$25.00", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Glycol Distearate", "Dimethicone", "Argan Oil", "Soy Protein", "Fragrance", "Citric Acid", "Sodium Benzoate", "Methylchloroisothiazolinone"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "paul-mitchell-tea-tree", name: "Paul Mitchell Tea Tree Special Shampoo", brand: "Paul Mitchell", price: "$14.50", ingredients: ["Water", "Sodium Laureth Sulfate", "Sodium Lauryl Sulfate", "Cocamidopropyl Betaine", "Tea Tree Oil", "Peppermint Oil", "Lavender Oil", "Sodium Chloride", "Fragrance", "Tetrasodium EDTA"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "living-proof-phd-shampoo", name: "Living Proof Perfect Hair Day Shampoo", brand: "Living Proof", price: "$30.00", ingredients: ["Water", "Sodium Lauroyl Methyl Isethionate", "Cocamidopropyl Betaine", "Sodium Methyl Cocoyl Taurate", "Glycerin", "Guar Hydroxypropyltrimonium Chloride", "Fragrance", "Phenoxyethanol", "Citric Acid"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "cantu-shea-butter-shampoo", name: "Cantu Shea Butter Cleansing Cream Shampoo", brand: "Cantu", price: "$5.49", ingredients: ["Water", "Cetearyl Alcohol", "Behentrimonium Methosulfate", "Shea Butter", "Coconut Oil", "Glycerin", "Fragrance", "Phenoxyethanol", "Honey"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "not-your-mothers-curl-talk", name: "Not Your Mother's Curl Talk Shampoo", brand: "Not Your Mother's", price: "$7.99", ingredients: ["Water", "Sodium C14-16 Olefin Sulfonate", "Cocamidopropyl Betaine", "Glycol Distearate", "Rice Oil", "Avocado Oil", "Fragrance", "Polyquaternium-7", "DMDM Hydantoin"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "kerastase-bain-satin-shampoo", name: "Kérastase Nutritive Bain Satin Shampoo", brand: "Kérastase", price: "$38.00", ingredients: ["Water", "Sodium Laureth Sulfate", "Glycerin", "Coco-Betaine", "Sodium Chloride", "Glucose", "Xylose", "Salicylic Acid", "Coconut Acid", "Fragrance", "Phenoxyethanol", "Citric Acid"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "nizoral-dandruff-shampoo", name: "Nizoral Anti-Dandruff Shampoo", brand: "Nizoral", price: "$15.49", ingredients: ["Water", "Sodium Laureth Sulfate", "Ketoconazole", "Cocamidopropyl Betaine", "Glycol Distearate", "Sodium Chloride", "Fragrance", "Sodium Hydroxide", "Red 40"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "john-frieda-frizz-ease", name: "John Frieda Frizz Ease Shampoo", brand: "John Frieda", price: "$8.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Dimethiconol", "Sodium Chloride", "Fragrance", "Keratin", "Silk Protein", "DMDM Hydantoin", "Citric Acid"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "aveda-rosemary-mint-shampoo", name: "Aveda Rosemary Mint Purifying Shampoo", brand: "Aveda", price: "$26.00", ingredients: ["Water", "Babassu Oil", "Sodium Coco Sulfate", "Decyl Glucoside", "Sodium Lauroyl Lactylate", "Rosemary Oil", "Peppermint Oil", "Spearmint Oil", "Organic Aloe"], packaging: ["Recycled Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "chi-silk-infusion", name: "CHI Silk Infusion", brand: "CHI", price: "$16.00", ingredients: ["Cyclomethicone", "Dimethiconol", "C12-15 Alkyl Benzoate", "Silk Amino Acids", "Hydrolyzed Wheat Protein", "Fragrance"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "matrix-total-results-shampoo", name: "Matrix Total Results Moisture Me Rich Shampoo", brand: "Matrix", price: "$17.00", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Glycol Distearate", "Sodium Chloride", "Glycerin", "Apricot Oil", "Fragrance", "Sodium Benzoate", "Citric Acid", "Methylchloroisothiazolinone"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "bumble-bumble-gentle-shampoo", name: "Bumble and Bumble Gentle Shampoo", brand: "Bumble and Bumble", price: "$32.00", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Rosemary Extract", "Sage Extract", "Ivy Extract", "Chamomile Extract", "Nettle Extract", "Fragrance", "Phenoxyethanol", "Citric Acid"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "pureology-hydrate-shampoo", name: "Pureology Hydrate Shampoo", brand: "Pureology", price: "$35.00", ingredients: ["Water", "Sodium Cocoyl Isethionate", "Cocamidopropyl Betaine", "Sodium Lauroyl Methyl Isethionate", "Green Tea Extract", "Sage Leaf Extract", "Jojoba Esters", "Glycerin", "Fragrance", "Phenoxyethanol"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "vo5-kiwi-lime-shampoo", name: "V05 Kiwi Lime Squeeze Shampoo", brand: "V05", price: "$1.49", ingredients: ["Water", "Sodium Laureth Sulfate", "Sodium Lauryl Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Kiwi Extract", "Lime Extract", "Fragrance", "Citric Acid", "DMDM Hydantoin", "Yellow 5", "Blue 1"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "maple-holistics-tea-tree", name: "Maple Holistics Tea Tree Shampoo", brand: "Maple Holistics", price: "$9.99", ingredients: ["Water", "Sodium C14-16 Olefin Sulfonate", "Cocamidopropyl Betaine", "Glycerin", "Tea Tree Oil", "Lavender Oil", "Rosemary Oil", "Jojoba Oil", "Keratin", "Botanical Keratin", "Phenoxyethanol"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "it-a-10-miracle-shampoo", name: "It's a 10 Miracle Shampoo Plus Keratin", brand: "It's a 10", price: "$21.00", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Keratin", "Panthenol", "Green Tea Extract", "Sunflower Seed Extract", "Fragrance", "DMDM Hydantoin", "Citric Acid"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "nexxus-therappe-shampoo", name: "Nexxus Therappe Moisturizing Shampoo", brand: "Nexxus", price: "$15.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Glycol Distearate", "Dimethicone", "Marine Collagen", "Elastin Protein", "Fragrance", "Methylchloroisothiazolinone", "Citric Acid"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "mixed-chicks-gentle-shampoo", name: "Mixed Chicks Gentle Clarifying Shampoo", brand: "Mixed Chicks", price: "$12.99", ingredients: ["Water", "Sodium Cocoyl Isethionate", "Cocamidopropyl Betaine", "Glycerin", "Jojoba Oil", "Avocado Oil", "Shea Butter", "Aloe Vera", "Fragrance", "Phenoxyethanol"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "joico-k-pak-shampoo", name: "Joico K-PAK Reconstructing Shampoo", brand: "Joico", price: "$18.00", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Keratin", "Hydrolyzed Wheat Protein", "Guajava Fruit Extract", "Glycerin", "Fragrance", "Citric Acid", "Phenoxyethanol"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "devacurl-no-poo-cleanser", name: "DevaCurl No-Poo Original Cleanser", brand: "DevaCurl", price: "$24.00", ingredients: ["Water", "Cetearyl Alcohol", "Behentrimonium Chloride", "Peppermint Oil", "Grapeseed Oil", "Chamomile Extract", "Glycerin", "Fragrance", "Phenoxyethanol"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "fekkai-apple-cider-shampoo", name: "Fekkai Apple Cider Detox Shampoo", brand: "Fekkai", price: "$25.00", ingredients: ["Water", "Sodium Cocoyl Isethionate", "Cocamidopropyl Betaine", "Apple Cider Vinegar", "Ginger Root Extract", "Cardamom Extract", "Glycerin", "Fragrance", "Phenoxyethanol"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "acure-curiously-clarifying", name: "Acure Curiously Clarifying Shampoo", brand: "Acure", price: "$9.99", ingredients: ["Water", "Cocamidopropyl Betaine", "Sodium Coco Sulfate", "Glycerin", "Lemongrass Oil", "Argan Oil", "Broccoli Seed Oil", "Pumpkin Seed Oil", "Phenoxyethanol"], packaging: ["Recycled Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "dove-daily-moisture-shampoo", name: "Dove Daily Moisture Shampoo", brand: "Dove", price: "$5.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Sodium Chloride", "Dimethiconol", "Glycol Distearate", "Fragrance", "Guar Hydroxypropyltrimonium Chloride", "Carbomer", "Sodium Hydroxide", "DMDM Hydantoin"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "loreal-elvive-total-repair", name: "L'Oreal Elvive Total Repair 5 Shampoo", brand: "L'Oreal", price: "$4.99", ingredients: ["Water", "Sodium Laureth Sulfate", "Sodium Lauryl Sulfate", "Cocamidopropyl Betaine", "Glycol Distearate", "Dimethicone", "Sodium Chloride", "Ceramide", "Protein", "Fragrance", "Citric Acid", "Methylchloroisothiazolinone"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "tree-hut-shea-conditioner", name: "Tree Hut Shea Moisturizing Conditioner", brand: "Tree Hut", price: "$6.99", ingredients: ["Water", "Cetearyl Alcohol", "Behentrimonium Methosulfate", "Shea Butter", "Coconut Oil", "Macadamia Oil", "Glycerin", "Fragrance", "Phenoxyethanol", "Citric Acid"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "maui-moisture-coconut-milk", name: "Maui Moisture Curl Quench Coconut Oil Shampoo", brand: "Maui Moisture", price: "$8.99", ingredients: ["Water", "Cocamidopropyl Betaine", "Sodium C14-16 Olefin Sulfonate", "Glycerin", "Coconut Oil", "Plumeria Extract", "Papaya Butter", "Coconut Milk", "Aloe Vera", "Fragrance"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },
      { slug: "ouai-fine-hair-shampoo", name: "OUAI Fine Hair Shampoo", brand: "OUAI", price: "$30.00", ingredients: ["Water", "Sodium Lauroyl Methyl Isethionate", "Cocamidopropyl Betaine", "Sodium Methyl Oleoyl Taurate", "Biotin", "Chia Seed Oil", "Keratin", "Tamarind Seed Extract", "Fragrance", "Phenoxyethanol"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.HAIRCARE },

      // ══════════════════════════════════════════════════════
      // MAKEUP (50)
      // ══════════════════════════════════════════════════════
      { slug: "maybelline-fit-me-foundation", name: "Maybelline Fit Me Matte + Poreless Foundation", brand: "Maybelline", price: "$8.99", ingredients: ["Water", "Cyclopentasiloxane", "Titanium Dioxide", "Glycerin", "Isododecane", "Dimethicone", "Alcohol Denat", "Aluminum Hydroxide", "Phenoxyethanol", "Fragrance", "Iron Oxides"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.MAKEUP },
      { slug: "loreal-true-match-foundation", name: "L'Oreal True Match Foundation", brand: "L'Oreal", price: "$10.99", ingredients: ["Water", "Dimethicone", "Isohexadecane", "Glycerin", "Nylon-12", "PEG-10 Dimethicone", "Alcohol Denat", "Fragrance", "Phenoxyethanol", "Tocopheryl Acetate", "Iron Oxides", "Titanium Dioxide"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.MAKEUP },
      { slug: "nyx-epic-ink-liner", name: "NYX Professional Epic Ink Liner", brand: "NYX", price: "$8.49", ingredients: ["Water", "Butylene Glycol", "Acrylates Copolymer", "Phenoxyethanol", "PEG-40 Hydrogenated Castor Oil", "Iron Oxides", "Black 2"], packaging: ["Plastic Pen", "Plastic Cap"], category: ProductCategory.MAKEUP },
      { slug: "elf-camo-concealer", name: "e.l.f. 16HR Camo Concealer", brand: "e.l.f.", price: "$6.00", ingredients: ["Water", "Cyclopentasiloxane", "Glycerin", "Dimethicone", "PEG-10 Dimethicone", "Phenoxyethanol", "Iron Oxides", "Titanium Dioxide"], packaging: ["Plastic Tube", "Plastic Applicator"], category: ProductCategory.MAKEUP },
      { slug: "maybelline-lash-sensational", name: "Maybelline Lash Sensational Mascara", brand: "Maybelline", price: "$9.99", ingredients: ["Water", "Paraffin", "Potassium Cetyl Phosphate", "Beeswax", "Ozokerite", "Acacia Senegal Gum", "Phenoxyethanol", "Fragrance", "Iron Oxides", "Black 2"], packaging: ["Plastic Tube", "Plastic Wand"], category: ProductCategory.MAKEUP },
      { slug: "covergirl-clean-fresh-foundation", name: "CoverGirl Clean Fresh Skin Milk Foundation", brand: "CoverGirl", price: "$11.99", ingredients: ["Water", "Coconut Alkanes", "Glycerin", "Dimethicone", "Niacinamide", "Squalane", "Sodium Hyaluronate", "Phenoxyethanol", "Fragrance", "Iron Oxides"], packaging: ["Plastic Tube", "Plastic Cap"], category: ProductCategory.MAKEUP },
      { slug: "revlon-colorstay-foundation", name: "Revlon ColorStay Foundation - Combo/Oily", brand: "Revlon", price: "$12.99", ingredients: ["Water", "Cyclopentasiloxane", "Titanium Dioxide", "Dimethicone", "Trimethylsiloxysilicate", "PEG-10 Dimethicone", "Isododecane", "Phenoxyethanol", "Fragrance", "Iron Oxides"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.MAKEUP },
      { slug: "fenty-pro-filtr-foundation", name: "Fenty Beauty Pro Filt'r Foundation", brand: "Fenty Beauty", price: "$40.00", ingredients: ["Water", "Dimethicone", "Trimethylsiloxysilicate", "PEG-10 Dimethicone", "Isododecane", "Isononyl Isononanoate", "Aluminum Hydroxide", "Nylon-12", "Sodium Hyaluronate", "Phenoxyethanol", "Iron Oxides", "Titanium Dioxide"], packaging: ["Glass Bottle", "Plastic Pump"], category: ProductCategory.MAKEUP },
      { slug: "mac-studio-fix-foundation", name: "MAC Studio Fix Fluid Foundation", brand: "MAC", price: "$39.00", ingredients: ["Water", "Dimethicone", "Trimethylsiloxysilicate", "PEG-10 Dimethicone", "Isododecane", "Butylene Glycol", "Phenoxyethanol", "Fragrance", "Salicylic Acid", "Iron Oxides", "Titanium Dioxide"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.MAKEUP },
      { slug: "nars-radiant-creamy-concealer", name: "NARS Radiant Creamy Concealer", brand: "NARS", price: "$32.00", ingredients: ["Water", "Dimethicone", "Cyclohexasiloxane", "Isododecane", "Glycerin", "Butylene Glycol", "PEG-10 Dimethicone", "Tocopheryl Acetate", "Magnolia Bark Extract", "Phenoxyethanol", "Iron Oxides"], packaging: ["Plastic Tube", "Plastic Applicator"], category: ProductCategory.MAKEUP },
      { slug: "too-faced-better-than-sex", name: "Too Faced Better Than Sex Mascara", brand: "Too Faced", price: "$28.00", ingredients: ["Water", "Paraffin", "Copernicia Cerifera Wax", "Beeswax", "Glyceryl Stearate", "Acacia Senegal Gum", "Stearic Acid", "Palmitic Acid", "Phenoxyethanol", "Fragrance", "Iron Oxides", "Black 2"], packaging: ["Plastic Tube", "Plastic Wand"], category: ProductCategory.MAKEUP },
      { slug: "benefit-benetint", name: "Benefit Benetint Cheek & Lip Stain", brand: "Benefit", price: "$26.00", ingredients: ["Water", "Alcohol Denat", "Ferric Ammonium Ferrocyanide", "Citric Acid", "Sodium Citrate", "Red 27", "Benzyl Alcohol"], packaging: ["Glass Bottle", "Brush Applicator"], category: ProductCategory.MAKEUP },
      { slug: "charlotte-tilbury-pillow-talk", name: "Charlotte Tilbury Pillow Talk Lipstick", brand: "Charlotte Tilbury", price: "$34.00", ingredients: ["Octyldodecanol", "Ricinus Communis Seed Oil", "Ethylhexyl Palmitate", "Diisostearyl Malate", "Hydrogenated Vegetable Oil", "Beeswax", "Ozokerite", "Silica", "Fragrance", "Tocopheryl Acetate", "Iron Oxides", "Red 7 Lake", "Titanium Dioxide"], packaging: ["Metal Tube", "Plastic Cap"], category: ProductCategory.MAKEUP },
      { slug: "nyx-butter-gloss", name: "NYX Professional Butter Gloss", brand: "NYX", price: "$5.00", ingredients: ["Polybutene", "Ethylhexyl Palmitate", "Trimethylolpropane Triisostearate", "Silica", "Tocopheryl Acetate", "Jojoba Oil", "Fragrance", "Iron Oxides", "Red 6", "Titanium Dioxide"], packaging: ["Plastic Tube", "Plastic Applicator"], category: ProductCategory.MAKEUP },
      { slug: "urban-decay-setting-spray", name: "Urban Decay All Nighter Setting Spray", brand: "Urban Decay", price: "$36.00", ingredients: ["Water", "Alcohol Denat", "PVP/VA Copolymer", "Methyl Trimethicone", "PEG-8 Dimethicone", "Aloe Barbadensis Leaf Juice", "Tocopheryl Acetate", "Fragrance", "Phenoxyethanol"], packaging: ["Plastic Bottle", "Plastic Sprayer"], category: ProductCategory.MAKEUP },
      { slug: "elf-poreless-putty-primer", name: "e.l.f. Poreless Putty Primer", brand: "e.l.f.", price: "$10.00", ingredients: ["Dimethicone", "Dimethicone Crosspolymer", "Silica", "Vinyl Dimethicone Crosspolymer", "Squalane", "Kaolin", "Phenoxyethanol"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.MAKEUP },
      { slug: "milani-baked-blush", name: "Milani Baked Blush - Luminoso", brand: "Milani", price: "$8.99", ingredients: ["Talc", "Mica", "Nylon-12", "Zinc Stearate", "Dimethicone", "Ethylhexyl Palmitate", "Silica", "Phenoxyethanol", "Iron Oxides", "Red 7 Lake", "Titanium Dioxide"], packaging: ["Plastic Compact"], category: ProductCategory.MAKEUP },
      { slug: "rare-beauty-soft-pinch-blush", name: "Rare Beauty Soft Pinch Liquid Blush", brand: "Rare Beauty", price: "$23.00", ingredients: ["Water", "Dimethicone", "Trimethylsiloxysilicate", "PEG-10 Dimethicone", "Glycerin", "Sodium Chloride", "Phenoxyethanol", "Iron Oxides", "Red 7 Lake", "Titanium Dioxide"], packaging: ["Glass Bottle", "Plastic Dropper"], category: ProductCategory.MAKEUP },
      { slug: "anastasia-brow-wiz", name: "Anastasia Beverly Hills Brow Wiz", brand: "Anastasia Beverly Hills", price: "$25.00", ingredients: ["Hydrogenated Coconut Oil", "Synthetic Wax", "Hydrogenated Coco-Glycerides", "Mica", "Iron Oxides", "Titanium Dioxide"], packaging: ["Plastic Pencil"], category: ProductCategory.MAKEUP },
      { slug: "wet-n-wild-photo-focus-foundation", name: "Wet n Wild Photo Focus Foundation", brand: "Wet n Wild", price: "$5.99", ingredients: ["Water", "Cyclopentasiloxane", "Glycerin", "Isododecane", "Dimethicone", "PEG-10 Dimethicone", "Nylon-12", "Phenoxyethanol", "Fragrance", "Iron Oxides", "Titanium Dioxide"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.MAKEUP },
      { slug: "smashbox-primer-water", name: "Smashbox Photo Finish Primer Water", brand: "Smashbox", price: "$32.00", ingredients: ["Water", "Glycerin", "Butylene Glycol", "Dimethicone", "Alcohol Denat", "PEG-8", "Phenoxyethanol", "Niacinamide", "Fragrance"], packaging: ["Plastic Bottle", "Plastic Sprayer"], category: ProductCategory.MAKEUP },
      { slug: "tarte-shape-tape-concealer", name: "Tarte Shape Tape Concealer", brand: "Tarte", price: "$31.00", ingredients: ["Water", "Dimethicone", "Glycerin", "Isododecane", "Cyclopentasiloxane", "PEG-10 Dimethicone", "Mango Seed Butter", "Shea Butter", "Licorice Root Extract", "Phenoxyethanol", "Iron Oxides", "Titanium Dioxide"], packaging: ["Plastic Tube", "Plastic Applicator"], category: ProductCategory.MAKEUP },
      { slug: "colourpop-super-shock-shadow", name: "ColourPop Super Shock Shadow", brand: "ColourPop", price: "$6.00", ingredients: ["Dimethicone", "Isononyl Isononanoate", "Synthetic Fluorphlogopite", "Calcium Aluminum Borosilicate", "Silica", "Phenoxyethanol", "Mica", "Iron Oxides", "Titanium Dioxide"], packaging: ["Plastic Pot", "Plastic Lid"], category: ProductCategory.MAKEUP },
      { slug: "physicians-formula-butter-bronzer", name: "Physicians Formula Butter Bronzer", brand: "Physicians Formula", price: "$14.99", ingredients: ["Talc", "Nylon-12", "Octyldodecyl Stearoyl Stearate", "Zinc Stearate", "Dimethicone", "Murumuru Butter", "Cupuacu Butter", "Tucuma Butter", "Fragrance", "Phenoxyethanol", "Iron Oxides", "Titanium Dioxide"], packaging: ["Plastic Compact"], category: ProductCategory.MAKEUP },
      { slug: "ilia-super-serum-skin-tint", name: "ILIA Super Serum Skin Tint SPF 40", brand: "ILIA", price: "$48.00", ingredients: ["Non-Nano Zinc Oxide", "Water", "Squalane", "Aloe Barbadensis Leaf Water", "Niacinamide", "Hyaluronic Acid", "Sodium Hyaluronate", "Argan Oil", "Marula Oil", "Phenoxyethanol", "Iron Oxides"], packaging: ["Glass Bottle", "Plastic Dropper"], category: ProductCategory.MAKEUP },
      { slug: "glossier-boy-brow", name: "Glossier Boy Brow", brand: "Glossier", price: "$17.00", ingredients: ["Water", "Beeswax", "Copernicia Cerifera Wax", "PVP", "VP/VA Copolymer", "Glycerin", "Oleic Acid", "Phenoxyethanol", "Iron Oxides"], packaging: ["Plastic Tube", "Plastic Wand"], category: ProductCategory.MAKEUP },
      { slug: "lancome-lash-idole-mascara", name: "Lancôme Lash Idôle Mascara", brand: "Lancôme", price: "$28.00", ingredients: ["Water", "Paraffin", "Stearic Acid", "Acacia Senegal Gum", "Triethanolamine", "Copernicia Cerifera Wax", "Beeswax", "Hydroxyethylcellulose", "Phenoxyethanol", "Fragrance", "Iron Oxides", "Black 2"], packaging: ["Plastic Tube", "Plastic Wand"], category: ProductCategory.MAKEUP },
      { slug: "loreal-infallible-concealer", name: "L'Oreal Infallible Full Wear Concealer", brand: "L'Oreal", price: "$10.99", ingredients: ["Water", "Dimethicone", "Glycerin", "Isododecane", "Cyclohexasiloxane", "PEG-10 Dimethicone", "Dimethicone Crosspolymer", "Phenoxyethanol", "Fragrance", "Iron Oxides", "Titanium Dioxide"], packaging: ["Plastic Tube", "Plastic Applicator"], category: ProductCategory.MAKEUP },
      { slug: "kosas-revealer-concealer", name: "Kosas Revealer Skin-Improving Concealer", brand: "Kosas", price: "$28.00", ingredients: ["Water", "Squalane", "Glycerin", "Caprylic Triglyceride", "Niacinamide", "Hyaluronic Acid", "Caffeine", "Arnica Extract", "Peptides", "Phenoxyethanol", "Iron Oxides", "Titanium Dioxide"], packaging: ["Plastic Tube", "Plastic Applicator"], category: ProductCategory.MAKEUP },
      { slug: "nyx-setting-spray-matte", name: "NYX Matte Finish Setting Spray", brand: "NYX", price: "$8.99", ingredients: ["Water", "Alcohol Denat", "PVP", "VP/VA Copolymer", "Fragrance", "Phenoxyethanol", "Potassium Sorbate"], packaging: ["Plastic Bottle", "Plastic Sprayer"], category: ProductCategory.MAKEUP },
      { slug: "maybelline-super-stay-ink", name: "Maybelline SuperStay Matte Ink Lipstick", brand: "Maybelline", price: "$9.49", ingredients: ["Dimethicone", "Trimethylsiloxysilicate", "Isododecane", "Nylon-611 Copolymer", "C30-45 Alkyl Dimethicone", "Dimethicone Crosspolymer", "Alumina", "Iron Oxides", "Red 7 Lake", "Titanium Dioxide"], packaging: ["Plastic Tube", "Plastic Applicator"], category: ProductCategory.MAKEUP },
      { slug: "clinique-moisture-surge", name: "Clinique Moisture Surge 100H Moisturizer", brand: "Clinique", price: "$42.00", ingredients: ["Water", "Dimethicone", "Butylene Glycol", "Glycerin", "Cetyl Alcohol", "Trisiloxane", "Sucrose", "Trehalose", "Aloe Barbadensis Leaf Water", "Caffeine", "Hyaluronic Acid", "Phenoxyethanol"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.MAKEUP },
      { slug: "elf-flawless-finish-foundation", name: "e.l.f. Flawless Finish Foundation", brand: "e.l.f.", price: "$6.00", ingredients: ["Water", "Cyclopentasiloxane", "Dimethicone", "PEG-10 Dimethicone", "Glycerin", "Cetyl PEG/PPG-10/1 Dimethicone", "Phenoxyethanol", "Iron Oxides", "Titanium Dioxide"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.MAKEUP },
      { slug: "morphe-setting-mist", name: "Morphe Continuous Setting Mist", brand: "Morphe", price: "$16.00", ingredients: ["Water", "Alcohol Denat", "VP/VA Copolymer", "PEG-8 Dimethicone", "Aloe Barbadensis Leaf Juice", "Green Tea Extract", "Chamomile Extract", "Fragrance"], packaging: ["Plastic Bottle", "Plastic Sprayer"], category: ProductCategory.MAKEUP },
      { slug: "honest-beauty-tinted-moisturizer", name: "Honest Beauty CCC Tinted Moisturizer SPF 30", brand: "Honest Beauty", price: "$22.00", ingredients: ["Zinc Oxide", "Water", "Caprylic Triglyceride", "Coco-Caprylate", "Coconut Alkanes", "Squalane", "Niacinamide", "Hyaluronic Acid", "Chamomile Extract", "Iron Oxides", "Titanium Dioxide"], packaging: ["Plastic Tube", "Plastic Cap"], category: ProductCategory.MAKEUP },
      { slug: "bareminerals-complexion-rescue", name: "bareMinerals Complexion Rescue Tinted Moisturizer", brand: "bareMinerals", price: "$38.00", ingredients: ["Water", "Mineral Pigments", "Glycerin", "Olive Squalane", "Dimethicone", "Shea Butter", "Mango Butter", "Sea Lavender Extract", "Marine Botanicals", "Iron Oxides", "Titanium Dioxide"], packaging: ["Plastic Tube", "Plastic Cap"], category: ProductCategory.MAKEUP },
      { slug: "pixi-glow-tonic", name: "Pixi Glow Tonic", brand: "Pixi", price: "$15.00", ingredients: ["Water", "Aloe Barbadensis Leaf Juice", "Glycolic Acid", "Glycerin", "Butylene Glycol", "Fructose", "Ginseng Root Extract", "Witch Hazel Extract", "Horse Chestnut Extract", "Phenoxyethanol", "Sodium Hydroxide"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.MAKEUP },
      { slug: "tower28-beauty-lip-jelly", name: "Tower 28 ShineOn Lip Jelly", brand: "Tower 28", price: "$15.00", ingredients: ["Polybutene", "Squalane", "Diisostearyl Malate", "Octyldodecanol", "Castor Seed Oil", "Raspberry Seed Oil", "Jojoba Oil", "Apricot Kernel Oil", "Tocopherol", "Mica", "Iron Oxides"], packaging: ["Plastic Tube", "Plastic Applicator"], category: ProductCategory.MAKEUP },
      { slug: "laneige-lip-sleeping-mask", name: "Laneige Lip Sleeping Mask - Berry", brand: "Laneige", price: "$24.00", ingredients: ["Diisostearyl Malate", "Hydrogenated Polyisobutene", "Phytosqualane", "Shea Butter", "Murumuru Butter", "Coconut Fruit Extract", "Berry Mix Complex", "Vitamin C", "Fragrance", "Red 7 Lake"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.MAKEUP },

      // ══════════════════════════════════════════════════════
      // FOOD & BEVERAGES (50)
      // ══════════════════════════════════════════════════════
      { slug: "oreo-original", name: "Oreo Original Cookies", brand: "Nabisco", price: "$4.99", ingredients: ["Unbleached Enriched Flour", "Sugar", "Palm Oil", "Canola Oil", "Cocoa", "High Fructose Corn Syrup", "Leavening", "Cornstarch", "Salt", "Soy Lecithin", "Vanillin", "Chocolate"], packaging: ["Plastic Tray", "Plastic Wrapper"], category: ProductCategory.FOOD },
      { slug: "lays-classic-chips", name: "Lay's Classic Potato Chips", brand: "Lay's", price: "$4.49", ingredients: ["Potatoes", "Vegetable Oil", "Canola Oil", "Corn Oil", "Soybean Oil", "Sunflower Oil", "Salt"], packaging: ["Plastic Bag"], category: ProductCategory.FOOD },
      { slug: "coca-cola-classic", name: "Coca-Cola Classic", brand: "Coca-Cola", price: "$2.29", ingredients: ["Carbonated Water", "High Fructose Corn Syrup", "Caramel Color", "Phosphoric Acid", "Natural Flavors", "Caffeine"], packaging: ["Aluminum Can"], category: ProductCategory.FOOD },
      { slug: "doritos-nacho-cheese", name: "Doritos Nacho Cheese", brand: "Doritos", price: "$4.49", ingredients: ["Corn", "Vegetable Oil", "Corn Oil", "Soybean Oil", "Sunflower Oil", "Maltodextrin", "Salt", "Cheddar Cheese", "Whey", "Monosodium Glutamate", "Buttermilk", "Romano Cheese", "Whey Protein Concentrate", "Onion Powder", "Corn Flour", "Natural Flavors", "Artificial Flavors", "Dextrose", "Tomato Powder", "Lactose", "Spices", "Artificial Color", "Lactic Acid", "Citric Acid", "Sugar", "Garlic Powder", "Skim Milk", "Red 40", "Yellow 6", "Yellow 5", "Blue 1"], packaging: ["Plastic Bag"], category: ProductCategory.FOOD },
      { slug: "ritz-crackers-original", name: "Ritz Crackers Original", brand: "Ritz", price: "$3.99", ingredients: ["Unbleached Enriched Flour", "Vegetable Oil", "Soybean Oil", "Palm Oil", "Canola Oil", "Sugar", "Salt", "Leavening", "High Fructose Corn Syrup", "Soy Lecithin", "Malted Barley Flour", "Natural Flavor"], packaging: ["Plastic Sleeve", "Cardboard Box"], category: ProductCategory.FOOD },
      { slug: "goldfish-cheddar", name: "Goldfish Cheddar Crackers", brand: "Pepperidge Farm", price: "$3.49", ingredients: ["Enriched Wheat Flour", "Cheddar Cheese", "Vegetable Oils", "Canola Oil", "Sunflower Oil", "Soybean Oil", "Salt", "Yeast", "Sugar", "Autolyzed Yeast Extract", "Paprika", "Spices", "Celery", "Onion Powder", "Annatto"], packaging: ["Plastic Bag", "Cardboard Carton"], category: ProductCategory.FOOD },
      { slug: "skippy-creamy-pb", name: "Skippy Creamy Peanut Butter", brand: "Skippy", price: "$3.99", ingredients: ["Roasted Peanuts", "Sugar", "Hydrogenated Vegetable Oils", "Rapeseed Oil", "Soybean Oil", "Cotton Seed Oil", "Salt"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.FOOD },
      { slug: "nutella-hazelnut-spread", name: "Nutella Hazelnut Spread", brand: "Ferrero", price: "$5.49", ingredients: ["Sugar", "Palm Oil", "Hazelnuts", "Cocoa", "Skim Milk", "Whey", "Lecithin", "Vanillin", "Soy Lecithin"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.FOOD },
      { slug: "cheerios-original", name: "Cheerios Original", brand: "General Mills", price: "$4.99", ingredients: ["Whole Grain Oats", "Cornstarch", "Sugar", "Salt", "Tripotassium Phosphate", "Vitamin E"], packaging: ["Cardboard Box", "Plastic Inner Bag"], category: ProductCategory.FOOD },
      { slug: "frosted-flakes", name: "Frosted Flakes", brand: "Kellogg's", price: "$4.79", ingredients: ["Milled Corn", "Sugar", "Malt Flavoring", "High Fructose Corn Syrup", "Salt", "BHT"], packaging: ["Cardboard Box", "Plastic Inner Bag"], category: ProductCategory.FOOD },
      { slug: "pop-tarts-strawberry", name: "Pop-Tarts Frosted Strawberry", brand: "Kellogg's", price: "$3.99", ingredients: ["Enriched Flour", "Corn Syrup", "High Fructose Corn Syrup", "Dextrose", "Soybean Oil", "Palm Oil", "Sugar", "Bleached Wheat Flour", "Salt", "Dried Strawberries", "Gelatin", "Modified Wheat Starch", "Soy Lecithin", "Xanthan Gum", "Red 40", "Yellow 6", "Blue 1", "Artificial Flavor"], packaging: ["Foil Wrapper", "Cardboard Box"], category: ProductCategory.FOOD },
      { slug: "campbell-tomato-soup", name: "Campbell's Condensed Tomato Soup", brand: "Campbell's", price: "$1.49", ingredients: ["Tomato Puree", "Water", "High Fructose Corn Syrup", "Wheat Flour", "Salt", "Citric Acid", "Potassium Chloride", "Flavoring", "Ascorbic Acid"], packaging: ["Metal Can", "Metal Lid"], category: ProductCategory.FOOD },
      { slug: "kraft-mac-cheese", name: "Kraft Macaroni & Cheese Original", brand: "Kraft", price: "$1.99", ingredients: ["Enriched Macaroni", "Wheat Flour", "Cheese Sauce Mix", "Whey", "Milkfat", "Milk Protein Concentrate", "Salt", "Sodium Tripolyphosphate", "Citric Acid", "Lactic Acid", "Sodium Phosphate", "Yellow 5", "Yellow 6", "Enzymes", "Cheese Culture", "Annatto"], packaging: ["Cardboard Box"], category: ProductCategory.FOOD },
      { slug: "clif-bar-chocolate-chip", name: "Clif Bar Chocolate Chip", brand: "Clif", price: "$1.49", ingredients: ["Organic Brown Rice Syrup", "Organic Rolled Oats", "Soy Protein Isolate", "Organic Cane Syrup", "Rice Flour", "Organic Roasted Soybeans", "Organic Soy Flour", "Cocoa Butter", "Chocolate Chips", "Sugar", "Cocoa", "Soy Lecithin", "Organic Oat Fiber", "Natural Flavors", "Salt", "Barley Malt Extract"], packaging: ["Plastic Wrapper"], category: ProductCategory.FOOD },
      { slug: "kind-bar-dark-chocolate-nuts", name: "KIND Bar - Dark Chocolate Nuts & Sea Salt", brand: "KIND", price: "$1.79", ingredients: ["Almonds", "Peanuts", "Chicory Root Fiber", "Honey", "Palm Kernel Oil", "Sugar", "Cocoa Powder", "Cocoa Butter", "Milk Powder", "Soy Lecithin", "Sea Salt"], packaging: ["Plastic Wrapper"], category: ProductCategory.FOOD },
      { slug: "chobani-greek-yogurt-vanilla", name: "Chobani Greek Yogurt - Vanilla", brand: "Chobani", price: "$1.49", ingredients: ["Nonfat Milk", "Cane Sugar", "Water", "Vanilla Extract", "Pectin", "Natural Flavors", "Locust Bean Gum", "Live Active Cultures"], packaging: ["Plastic Cup", "Foil Lid"], category: ProductCategory.FOOD },
      { slug: "oikos-triple-zero-vanilla", name: "Oikos Triple Zero Vanilla Greek Yogurt", brand: "Oikos", price: "$1.49", ingredients: ["Ultrafiltered Nonfat Milk", "Water", "Natural Flavors", "Chicory Root Fiber", "Stevia Leaf Extract", "Vegetable Juice", "Sea Salt", "Vitamin D3", "Live Active Cultures"], packaging: ["Plastic Cup", "Foil Lid"], category: ProductCategory.FOOD },
      { slug: "horizon-organic-whole-milk", name: "Horizon Organic Whole Milk", brand: "Horizon", price: "$5.99", ingredients: ["Organic Grade A Milk", "Vitamin D3"], packaging: ["Paper Carton", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "silk-oat-yeah-oatmilk", name: "Silk Oat Yeah Oatmilk - Original", brand: "Silk", price: "$4.99", ingredients: ["Oat Milk", "Water", "Oats", "Sunflower Oil", "Sea Salt", "Gellan Gum", "Dipotassium Phosphate", "Calcium Carbonate", "Vitamin A Palmitate", "Vitamin D2", "Riboflavin", "Vitamin B12"], packaging: ["Paper Carton", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "fairlife-milk-2percent", name: "Fairlife 2% Reduced Fat Ultra-Filtered Milk", brand: "Fairlife", price: "$4.99", ingredients: ["Reduced Fat Ultra-Filtered Milk", "Lactase Enzyme", "Vitamin A Palmitate", "Vitamin D3"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "simply-orange-juice", name: "Simply Orange Juice - Pulp Free", brand: "Simply", price: "$4.49", ingredients: ["Pure Squeezed Pasteurized Orange Juice"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "tropicana-orange-juice", name: "Tropicana Pure Premium Orange Juice", brand: "Tropicana", price: "$4.99", ingredients: ["100% Orange Juice"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "celsiuis-sparkling-orange", name: "Celsius Sparkling Orange Energy Drink", brand: "Celsius", price: "$2.49", ingredients: ["Carbonated Filtered Water", "Citric Acid", "Vegetable Juice", "Sucralose", "Natural Flavor", "Caffeine", "Taurine", "Guarana Seed Extract", "Ginger Root Extract", "Green Tea Extract", "Chromium Chelate"], packaging: ["Aluminum Can"], category: ProductCategory.FOOD },
      { slug: "monster-energy-original", name: "Monster Energy - Original", brand: "Monster", price: "$2.99", ingredients: ["Carbonated Water", "Sugar", "Glucose", "Citric Acid", "Natural Flavors", "Taurine", "Sodium Citrate", "Panax Ginseng Extract", "L-Carnitine", "Caffeine", "Sorbic Acid", "Benzoic Acid", "Niacinamide", "Sucralose", "Salt", "D-Glucuronolactone", "Inositol", "Guarana Extract", "Riboflavin", "Maltodextrin", "Cyanocobalamin"], packaging: ["Aluminum Can"], category: ProductCategory.FOOD },
      { slug: "rx-bar-chocolate-sea-salt", name: "RXBAR Chocolate Sea Salt", brand: "RXBAR", price: "$2.99", ingredients: ["Dates", "Egg Whites", "Almonds", "Cashews", "Chocolate", "Cocoa", "Sea Salt", "Natural Flavors"], packaging: ["Plastic Wrapper"], category: ProductCategory.FOOD },
      { slug: "larabar-peanut-butter-chocolate", name: "Larabar Peanut Butter Chocolate Chip", brand: "Larabar", price: "$1.69", ingredients: ["Dates", "Peanuts", "Chocolate Chips", "Sugar", "Cocoa Butter", "Unsweetened Chocolate", "Sea Salt"], packaging: ["Plastic Wrapper"], category: ProductCategory.FOOD },
      { slug: "annies-cheddar-bunnies", name: "Annie's Cheddar Bunnies", brand: "Annie's", price: "$3.99", ingredients: ["Organic Wheat Flour", "Organic Cheddar Cheese", "Organic Sunflower Oil", "Salt", "Organic Nonfat Milk", "Organic Butter", "Yeast Extract", "Paprika", "Annatto Extract"], packaging: ["Cardboard Box", "Plastic Inner Bag"], category: ProductCategory.FOOD },
      { slug: "bare-apple-chips", name: "Bare Baked Crunchy Apple Chips - Fuji & Reds", brand: "Bare", price: "$3.99", ingredients: ["Apples"], packaging: ["Plastic Bag"], category: ProductCategory.FOOD },
      { slug: "hippeas-chickpea-puffs", name: "Hippeas Organic Chickpea Puffs - Vegan White Cheddar", brand: "Hippeas", price: "$4.49", ingredients: ["Organic Chickpea Flour", "Organic Rice Flour", "Organic Sunflower Oil", "Organic Pea Protein", "Sea Salt", "Organic Onion Powder", "Organic Garlic Powder", "Yeast Extract", "Lactic Acid", "Citric Acid", "Organic Annatto"], packaging: ["Plastic Bag"], category: ProductCategory.FOOD },
      { slug: "siete-tortilla-chips", name: "Siete Grain Free Tortilla Chips - Sea Salt", brand: "Siete", price: "$4.99", ingredients: ["Cassava Flour", "Avocado Oil", "Coconut Flour", "Ground Chia Seeds", "Sea Salt"], packaging: ["Plastic Bag"], category: ProductCategory.FOOD },
      { slug: "hu-dark-chocolate-bar", name: "Hu Dark Chocolate Bar - Simple", brand: "Hu", price: "$5.99", ingredients: ["Organic Cacao", "Organic Coconut Sugar"], packaging: ["Paper Wrapper", "Foil Inner Wrap"], category: ProductCategory.FOOD },
      { slug: "primal-kitchen-mayo", name: "Primal Kitchen Avocado Oil Mayo", brand: "Primal Kitchen", price: "$9.99", ingredients: ["Avocado Oil", "Organic Eggs", "Organic Egg Yolks", "Organic Vinegar", "Sea Salt", "Organic Rosemary Extract"], packaging: ["Glass Jar", "Metal Lid"], category: ProductCategory.FOOD },
      { slug: "bragg-apple-cider-vinegar", name: "Bragg Organic Apple Cider Vinegar", brand: "Bragg", price: "$5.99", ingredients: ["Organic Apple Cider Vinegar", "Water"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "gt-kombucha-gingerade", name: "GT's Synergy Kombucha - Gingerade", brand: "GT's", price: "$3.99", ingredients: ["Organic Kombucha Culture", "Organic Raw Kombucha", "Organic Ginger Juice", "Organic Kiwi Juice"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "liquid-death-water", name: "Liquid Death Mountain Water", brand: "Liquid Death", price: "$1.89", ingredients: ["Mountain Water"], packaging: ["Aluminum Tallboy Can"], category: ProductCategory.FOOD },
      { slug: "hint-water-watermelon", name: "Hint Water - Watermelon", brand: "Hint", price: "$1.49", ingredients: ["Purified Water", "Natural Watermelon Flavor"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "vita-coco-coconut-water", name: "Vita Coco Coconut Water - Original", brand: "Vita Coco", price: "$2.99", ingredients: ["Coconut Water", "Less Than 1% Sugar", "Vitamin C"], packaging: ["Tetra Pak Carton", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "smartwater-vapor-distilled", name: "Smartwater Vapor Distilled Premium Water", brand: "Smartwater", price: "$2.29", ingredients: ["Vapor Distilled Water", "Calcium Chloride", "Magnesium Chloride", "Potassium Bicarbonate"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "la-croix-lime", name: "LaCroix Sparkling Water - Lime", brand: "LaCroix", price: "$5.99", ingredients: ["Carbonated Water", "Natural Lime Flavor"], packaging: ["Aluminum Can"], category: ProductCategory.FOOD },
      { slug: "bubly-cherry", name: "Bubly Sparkling Water - Cherry", brand: "Bubly", price: "$5.99", ingredients: ["Carbonated Water", "Natural Cherry Flavor"], packaging: ["Aluminum Can"], category: ProductCategory.FOOD },
      { slug: "olipop-vintage-cola", name: "OLIPOP Vintage Cola", brand: "OLIPOP", price: "$2.79", ingredients: ["Carbonated Water", "Cassava Root Syrup", "Chicory Root Inulin", "Kudzu Root Extract", "Marshmallow Root Extract", "Calendula Flower Extract", "Stevia Leaf Extract", "Apple Juice Concentrate", "Natural Flavors", "Lemon Juice Concentrate", "Himalayan Pink Salt"], packaging: ["Aluminum Can"], category: ProductCategory.FOOD },
      { slug: "poppi-strawberry-lemon", name: "Poppi Strawberry Lemon Prebiotic Soda", brand: "Poppi", price: "$2.49", ingredients: ["Carbonated Water", "Apple Cider Vinegar", "Cane Sugar", "Apple Juice Concentrate", "Strawberry Juice Concentrate", "Lemon Juice Concentrate", "Stevia Leaf Extract", "Natural Flavors"], packaging: ["Aluminum Can"], category: ProductCategory.FOOD },
      { slug: "oatly-oat-milk-barista", name: "Oatly Oat Milk Barista Edition", brand: "Oatly", price: "$5.99", ingredients: ["Oat Base", "Water", "Oats", "Rapeseed Oil", "Dipotassium Phosphate", "Calcium Carbonate", "Sea Salt", "Vitamins"], packaging: ["Paper Carton", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "almond-breeze-unsweetened", name: "Almond Breeze Unsweetened Almond Milk", brand: "Blue Diamond", price: "$3.99", ingredients: ["Almond Milk", "Water", "Almonds", "Calcium Carbonate", "Sea Salt", "Potassium Citrate", "Sunflower Lecithin", "Gellan Gum", "Vitamin A Palmitate", "Vitamin D2"], packaging: ["Paper Carton", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "bai-coconut-antioxidant", name: "Bai Molokai Coconut Antioxidant Infusion", brand: "Bai", price: "$2.19", ingredients: ["Filtered Water", "Erythritol", "Coconut Water Concentrate", "Citric Acid", "Natural Flavors", "Vegetable Juice", "Stevia Leaf Extract", "Coffeefruit Extract", "White Tea Extract", "Vitamin C"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.FOOD },
      { slug: "body-armor-strawberry-banana", name: "BodyArmor SuperDrink - Strawberry Banana", brand: "BodyArmor", price: "$1.99", ingredients: ["Filtered Water", "Cane Sugar", "Coconut Water Concentrate", "Citric Acid", "Dipotassium Phosphate", "Vegetable Juice Concentrate", "Ascorbic Acid", "Magnesium Oxide", "Natural Flavors", "D-Calcium Pantothenate", "Niacinamide", "Vitamin A Palmitate", "Pyridoxine Hydrochloride", "Vitamin D3", "Vitamin B12"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.FOOD },

      // ══════════════════════════════════════════════════════
      // FRAGRANCE (50)
      // ══════════════════════════════════════════════════════
      { slug: "bath-body-japanese-cherry", name: "Japanese Cherry Blossom Fine Fragrance Mist", brand: "Bath & Body Works", price: "$16.50", ingredients: ["Alcohol Denat", "Water", "Fragrance", "PEG-40 Hydrogenated Castor Oil", "Linalool", "Limonene", "Butylphenyl Methylpropional", "Hexyl Cinnamal", "Hydroxycitronellal", "Citronellol", "Geraniol", "Red 33", "Yellow 5"], packaging: ["Plastic Bottle", "Plastic Sprayer"], category: ProductCategory.FRAGRANCE },
      { slug: "old-spice-swagger-spray", name: "Old Spice Swagger Body Spray", brand: "Old Spice", price: "$6.99", ingredients: ["Alcohol Denat", "Hydrofluorocarbon 152A", "Fragrance", "Cyclomethicone"], packaging: ["Aerosol Can", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "axe-apollo-body-spray", name: "AXE Apollo Body Spray", brand: "AXE", price: "$5.99", ingredients: ["Butane", "Isobutane", "Propane", "Alcohol Denat", "Fragrance", "Disteardimonium Hectorite", "PPG-14 Butyl Ether"], packaging: ["Aerosol Can", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "sol-de-janeiro-bum-bum", name: "Sol de Janeiro Brazilian Bum Bum Cream", brand: "Sol de Janeiro", price: "$48.00", ingredients: ["Water", "Glycerin", "Dimethicone", "Cupuacu Butter", "Acai Fruit Oil", "Coconut Oil", "Guarana Seed Extract", "Caffeine", "Fragrance", "Phenoxyethanol", "Butylphenyl Methylpropional", "Linalool", "Limonene", "Hexyl Cinnamal"], packaging: ["Plastic Jar", "Plastic Lid"], category: ProductCategory.FRAGRANCE },
      { slug: "bath-body-warm-vanilla-lotion", name: "Warm Vanilla Sugar Body Lotion", brand: "Bath & Body Works", price: "$14.50", ingredients: ["Water", "Glycerin", "Cetyl Alcohol", "Cetearyl Alcohol", "Dimethicone", "Fragrance", "Petrolatum", "Shea Butter", "Aloe Barbadensis Leaf Juice", "Tocopheryl Acetate", "Phenoxyethanol", "DMDM Hydantoin", "Methylparaben"], packaging: ["Plastic Bottle", "Plastic Pump"], category: ProductCategory.FRAGRANCE },
      { slug: "dove-men-care-spray", name: "Dove Men+Care Clean Comfort Body Spray", brand: "Dove", price: "$5.99", ingredients: ["Butane", "Isobutane", "Propane", "Aluminum Chlorohydrate", "Cyclopentasiloxane", "PPG-14 Butyl Ether", "Fragrance", "Disteardimonium Hectorite", "BHT"], packaging: ["Aerosol Can", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "bath-body-thousand-wishes-mist", name: "A Thousand Wishes Fine Fragrance Mist", brand: "Bath & Body Works", price: "$16.50", ingredients: ["Alcohol Denat", "Water", "Fragrance", "PEG-40 Hydrogenated Castor Oil", "Linalool", "Benzyl Salicylate", "Butylphenyl Methylpropional", "Hexyl Cinnamal", "Alpha-Isomethyl Ionone", "Red 33"], packaging: ["Plastic Bottle", "Plastic Sprayer"], category: ProductCategory.FRAGRANCE },
      { slug: "victoria-secret-bombshell", name: "Victoria's Secret Bombshell Mist", brand: "Victoria's Secret", price: "$21.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "PEG-40 Hydrogenated Castor Oil", "Benzophenone-4", "Linalool", "Limonene", "Citronellol", "Geraniol", "Hexyl Cinnamal", "Alpha-Isomethyl Ionone", "Red 33", "Yellow 5"], packaging: ["Plastic Bottle", "Plastic Sprayer"], category: ProductCategory.FRAGRANCE },
      { slug: "ariana-grande-cloud", name: "Ariana Grande Cloud Eau de Parfum", brand: "Ariana Grande", price: "$55.00", ingredients: ["Alcohol Denat", "Fragrance", "Water", "Ethylhexyl Methoxycinnamate", "Diethylamino Hydroxybenzoyl Hexyl Benzoate", "BHT", "Linalool", "Hydroxycitronellal", "Benzyl Salicylate", "Coumarin", "Limonene"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "versace-bright-crystal", name: "Versace Bright Crystal EDT", brand: "Versace", price: "$85.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Butyl Methoxydibenzoylmethane", "Ethylhexyl Methoxycinnamate", "BHT", "Linalool", "Limonene", "Citronellol", "Alpha-Isomethyl Ionone", "Geraniol", "Benzyl Alcohol"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "ysl-libre-edp", name: "Yves Saint Laurent Libre EDP", brand: "YSL", price: "$120.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Ethylhexyl Methoxycinnamate", "Linalool", "Limonene", "Coumarin", "Geraniol", "Citral", "Citronellol", "Benzyl Salicylate", "Alpha-Isomethyl Ionone"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "chanel-chance-edt", name: "Chanel Chance Eau Tendre EDT", brand: "Chanel", price: "$142.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Citronellol", "Benzyl Salicylate", "Geraniol", "Citral", "Alpha-Isomethyl Ionone", "Benzyl Benzoate"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "dior-sauvage-edt", name: "Dior Sauvage EDT", brand: "Dior", price: "$105.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Limonene", "Linalool", "Citronellol", "Coumarin", "Geraniol", "Citral"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "dolce-gabbana-light-blue", name: "Dolce & Gabbana Light Blue EDT", brand: "Dolce & Gabbana", price: "$88.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Butyl Methoxydibenzoylmethane", "Ethylhexyl Methoxycinnamate", "Citronellol", "Geraniol", "Citral", "Alpha-Isomethyl Ionone", "BHT"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "marc-jacobs-daisy-edt", name: "Marc Jacobs Daisy EDT", brand: "Marc Jacobs", price: "$95.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Butylphenyl Methylpropional", "Hydroxycitronellal", "Alpha-Isomethyl Ionone", "Limonene", "Hexyl Cinnamal", "Benzyl Salicylate", "Citronellol", "Geraniol"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "acqua-di-gio-edt", name: "Giorgio Armani Acqua Di Giò EDT", brand: "Giorgio Armani", price: "$98.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Butylphenyl Methylpropional", "Citronellol", "Hydroxycitronellal", "Geraniol", "Coumarin", "Citral"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "coach-floral-edp", name: "Coach Floral EDP", brand: "Coach", price: "$75.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Benzyl Salicylate", "Hexyl Cinnamal", "Butylphenyl Methylpropional", "Citronellol", "Geraniol", "Alpha-Isomethyl Ionone"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "tom-ford-black-orchid", name: "Tom Ford Black Orchid EDP", brand: "Tom Ford", price: "$168.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Ethylhexyl Methoxycinnamate", "Linalool", "Hydroxycitronellal", "Limonene", "Citronellol", "Hexyl Cinnamal", "Alpha-Isomethyl Ionone", "Coumarin", "Geraniol", "Benzyl Benzoate"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "byredo-gypsy-water-edp", name: "Byredo Gypsy Water EDP", brand: "Byredo", price: "$195.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Limonene", "Linalool", "Citronellol", "Geraniol", "Citral"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "le-labo-santal-33", name: "Le Labo Santal 33 EDP", brand: "Le Labo", price: "$215.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Limonene", "Linalool", "Coumarin", "Alpha-Isomethyl Ionone", "Citronellol", "Geraniol"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "maison-margiela-lazy-sunday", name: "Maison Margiela Replica Lazy Sunday Morning", brand: "Maison Margiela", price: "$140.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Alpha-Isomethyl Ionone", "Geraniol", "Citronellol", "Citral"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "clean-reserve-skin-edp", name: "Clean Reserve Skin EDP", brand: "Clean Reserve", price: "$52.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Limonene", "Linalool", "Hydroxycitronellal", "Citronellol", "Geraniol"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "phlur-missing-person-edp", name: "Phlur Missing Person EDP", brand: "Phlur", price: "$96.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Coumarin", "Hexyl Cinnamal", "Citronellol"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "ouai-melrose-place-edp", name: "OUAI Melrose Place EDP", brand: "OUAI", price: "$60.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Hydroxycitronellal", "Alpha-Isomethyl Ionone", "Citronellol", "Geraniol"], packaging: ["Glass Bottle", "Metal Sprayer"], category: ProductCategory.FRAGRANCE },
      { slug: "replica-bubble-bath", name: "Maison Margiela Replica Bubble Bath", brand: "Maison Margiela", price: "$140.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Coumarin", "Alpha-Isomethyl Ionone", "Citronellol", "Geraniol", "Citral"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "glossier-you-edp", name: "Glossier You EDP", brand: "Glossier", price: "$70.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Limonene", "Linalool", "Amyl Cinnamal", "Geraniol", "Alpha-Isomethyl Ionone", "Citronellol", "Hydroxycitronellal"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "sol-de-janeiro-brazilian-mist", name: "Sol de Janeiro Brazilian Bum Bum Body Mist", brand: "Sol de Janeiro", price: "$35.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "PEG-40 Hydrogenated Castor Oil", "Butylphenyl Methylpropional", "Linalool", "Limonene", "Hexyl Cinnamal", "Coumarin", "Benzyl Salicylate", "Citronellol"], packaging: ["Plastic Bottle", "Plastic Sprayer"], category: ProductCategory.FRAGRANCE },
      { slug: "jimmy-choo-edp", name: "Jimmy Choo Eau de Parfum", brand: "Jimmy Choo", price: "$88.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Ethylhexyl Methoxycinnamate", "Butyl Methoxydibenzoylmethane", "Linalool", "Alpha-Isomethyl Ionone", "Butylphenyl Methylpropional", "Limonene", "Benzyl Salicylate", "Citronellol", "Hexyl Cinnamal", "Geraniol"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "gucci-bloom-edp", name: "Gucci Bloom EDP", brand: "Gucci", price: "$110.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Hydroxycitronellal", "Geraniol", "Alpha-Isomethyl Ionone", "Citronellol", "Limonene"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "burberry-her-edp", name: "Burberry Her EDP", brand: "Burberry", price: "$105.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Benzyl Salicylate", "Coumarin", "Alpha-Isomethyl Ionone", "Citronellol", "Hexyl Cinnamal", "Geraniol"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "carolina-herrera-good-girl", name: "Carolina Herrera Good Girl EDP", brand: "Carolina Herrera", price: "$118.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Ethylhexyl Methoxycinnamate", "Linalool", "Limonene", "Coumarin", "Hydroxycitronellal", "Citronellol", "Alpha-Isomethyl Ionone", "Geraniol", "Hexyl Cinnamal", "Benzyl Benzoate"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "ralph-lauren-romance-edp", name: "Ralph Lauren Romance EDP", brand: "Ralph Lauren", price: "$95.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Citronellol", "Geraniol", "Limonene", "Hydroxycitronellal", "Alpha-Isomethyl Ionone", "Citral"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "lancome-la-vie-est-belle", name: "Lancôme La Vie Est Belle EDP", brand: "Lancôme", price: "$120.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Ethylhexyl Methoxycinnamate", "Butyl Methoxydibenzoylmethane", "Ethylhexyl Salicylate", "Linalool", "Coumarin", "Alpha-Isomethyl Ionone", "Limonene", "Citronellol", "Geraniol"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "jo-malone-peony-blush", name: "Jo Malone Peony & Blush Suede Cologne", brand: "Jo Malone", price: "$145.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Hydroxycitronellal", "Geraniol", "Citronellol", "Hexyl Cinnamal", "Benzyl Salicylate", "Limonene", "Alpha-Isomethyl Ionone"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "nest-golden-nectar-edp", name: "Nest New York Golden Nectar EDP", brand: "Nest", price: "$88.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Benzyl Benzoate", "Coumarin", "Geraniol", "Citronellol", "Eugenol", "Alpha-Isomethyl Ionone"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "diptyque-do-son-edt", name: "Diptyque Do Son EDT", brand: "Diptyque", price: "$145.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Alpha-Isomethyl Ionone", "Benzyl Salicylate", "Citronellol", "Geraniol", "Hydroxycitronellal"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "aerin-rose-de-grasse", name: "AERIN Rose de Grasse Eau de Parfum", brand: "AERIN", price: "$165.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Limonene", "Linalool", "Citronellol", "Geraniol", "Hydroxycitronellal", "Hexyl Cinnamal", "Benzyl Benzoate", "Alpha-Isomethyl Ionone"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "replica-by-the-fireplace", name: "Maison Margiela Replica By The Fireplace EDT", brand: "Maison Margiela", price: "$140.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Coumarin", "Benzyl Benzoate", "Alpha-Isomethyl Ionone", "Citronellol", "Geraniol", "Eugenol", "Isoeugenol"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "kayali-vanilla-28", name: "Kayali Vanilla 28 EDP", brand: "Kayali", price: "$88.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Benzyl Benzoate", "Linalool", "Limonene", "Coumarin", "Citronellol", "Benzyl Salicylate", "Alpha-Isomethyl Ionone"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "dedcool-milk-edp", name: "DedCool Milk EDP", brand: "DedCool", price: "$88.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Coumarin", "Alpha-Isomethyl Ionone"], packaging: ["Recycled Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "henry-rose-jake-edp", name: "Henry Rose Jake's House EDP", brand: "Henry Rose", price: "$120.00", ingredients: ["Alcohol", "Water", "Fragrance", "Limonene", "Linalool", "Geraniol", "Citronellol", "Coumarin"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "ellis-brooklyn-sweet-edp", name: "Ellis Brooklyn SWEET EDP", brand: "Ellis Brooklyn", price: "$105.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Coumarin", "Hexyl Cinnamal", "Limonene", "Alpha-Isomethyl Ionone", "Citronellol"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "skylar-vanilla-sky-edp", name: "Skylar Vanilla Sky EDP", brand: "Skylar", price: "$85.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Citronellol", "Coumarin", "Geraniol"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "snif-way-with-woods-edt", name: "Snif A Way With Woods EDT", brand: "Snif", price: "$65.00", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Linalool", "Limonene", "Alpha-Isomethyl Ionone", "Coumarin", "Citronellol"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "mix-bar-vanilla-bourbon", name: "Mix:Bar Vanilla Bourbon EDP", brand: "Mix:Bar", price: "$19.99", ingredients: ["Alcohol Denat", "Water", "Fragrance", "Benzyl Benzoate", "Linalool", "Coumarin", "Limonene", "Citronellol"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FRAGRANCE },
      { slug: "fine-fragrance-cloud-nine", name: "Fine'ry Cloud Nine Fragrance Mist", brand: "Fine'ry", price: "$10.99", ingredients: ["Alcohol Denat", "Water", "Fragrance", "PEG-40 Hydrogenated Castor Oil", "Linalool", "Limonene", "Alpha-Isomethyl Ionone", "Hexyl Cinnamal", "Citronellol"], packaging: ["Glass Bottle", "Plastic Sprayer"], category: ProductCategory.FRAGRANCE },


      // // Beverages
      // { slug: "mountain-spring-water", name: "Mountain Spring Water", brand: "CrystalPeak", price: "$1.99", ingredients: ["Spring Water", "Minerals"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.FOOD },
      // { slug: "glass-bottle-spring-water", name: "Glass Bottle Spring Water", brand: "PureFlow", price: "$3.49", ingredients: ["Spring Water", "Minerals"], packaging: ["Glass Bottle", "Plastic Cap"], category: ProductCategory.FOOD },
      // { slug: "aluminum-spring-water", name: "Aluminum Can Spring Water", brand: "EverPure", price: "$2.49", ingredients: ["Spring Water", "Electrolytes"], packaging: ["Aluminum Can", "Aluminum Pull Tab"], category: ProductCategory.FOOD },
      // { slug: "boxed-water", name: "Boxed Water", brand: "BoxedH2O", price: "$2.29", ingredients: ["Purified Water"], packaging: ["Paper Carton", "Plastic Lining", "Plastic Cap"], category: ProductCategory.FOOD },
      // { slug: "kombucha-ginger-lemon", name: "Organic Kombucha - Ginger Lemon", brand: "GutGlow", price: "$4.99", ingredients: ["Filtered Water", "Organic Cane Sugar", "Organic Black Tea", "Organic Ginger", "Organic Lemon Juice", "Live Cultures"], packaging: ["Glass Bottle", "Metal Cap"], category: ProductCategory.FOOD },
      // { slug: "cold-pressed-green-juice", name: "Cold Pressed Green Juice", brand: "VitalGreens", price: "$8.99", ingredients: ["Kale", "Spinach", "Cucumber", "Celery", "Lemon", "Ginger"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.FOOD },
      // { slug: "oat-milk", name: "Organic Oat Milk", brand: "OatlyFresh", price: "$5.49", ingredients: ["Water", "Oats", "Rapeseed Oil", "Calcium", "Sea Salt", "Vitamins"], packaging: ["Paper Carton", "Plastic Lining", "Plastic Cap"], category: ProductCategory.FOOD },
      // { slug: "almond-milk-unsweetened", name: "Unsweetened Almond Milk", brand: "NutPure", price: "$4.99", ingredients: ["Filtered Water", "Almonds", "Calcium Carbonate", "Sea Salt", "Sunflower Lecithin", "Vitamin E"], packaging: ["Paper Carton", "Plastic Lining", "Plastic Cap"], category: ProductCategory.FOOD },
      // { slug: "coconut-water", name: "Pure Coconut Water", brand: "TropiCoco", price: "$3.29", ingredients: ["Coconut Water"], packaging: ["Tetra Pak Carton", "Plastic Straw", "Plastic Wrap"], category: ProductCategory.FOOD },
      // { slug: "sparkling-water-lime", name: "Sparkling Water - Lime", brand: "FizzClean", price: "$1.49", ingredients: ["Carbonated Water", "Natural Lime Flavor"], packaging: ["Aluminum Can"], category: ProductCategory.FOOD },

      // // // Cleaning
      // { slug: "all-purpose-surface-cleaner", name: "All-Purpose Surface Cleaner", brand: "SparkleHome", price: "$5.99", ingredients: ["Water", "Sodium Lauryl Sulfate", "Fragrance", "Triclosan", "Formaldehyde", "Chlorine Bleach", "Ammonia"], packaging: ["Plastic Spray Bottle", "Plastic Trigger"], category: ProductCategory.CLEANING },
      // { slug: "plant-based-multi-surface-spray", name: "Plant-Based Multi-Surface Spray", brand: "EcoClean", price: "$8.49", ingredients: ["Water", "Decyl Glucoside", "Citric Acid", "Essential Oils", "Aloe Vera"], packaging: ["Recycled Plastic Bottle", "Recyclable Trigger Sprayer"], category: ProductCategory.CLEANING },
      // { slug: "heavy-duty-bathroom-cleaner", name: "Heavy-Duty Bathroom Cleaner", brand: "PowerWash", price: "$6.49", ingredients: ["Water", "Sodium Hypochlorite", "Fragrance", "Sodium Lauryl Sulfate", "PFAS", "Formaldehyde"], packaging: ["Plastic Bottle", "Plastic Cap"], category: ProductCategory.CLEANING },

      // // Fragrance
      // { slug: "midnight-orchid-parfum", name: "Midnight Orchid Eau de Parfum", brand: "LuxeScent", price: "$85.00", ingredients: ["Alcohol Denat", "Fragrance", "Parfum", "Diethyl Phthalate", "Limonene", "Linalool", "Coumarin"], packaging: ["Glass Bottle", "Plastic Sprayer", "Cardboard Box"], category: ProductCategory.FRAGRANCE },
      // { slug: "clean-reserve-warm-cotton", name: "Clean Reserve Warm Cotton", brand: "PureAura", price: "$62.00", ingredients: ["Alcohol", "Water", "Limonene", "Linalool", "Citronellol"], packaging: ["Glass Bottle", "Metal Sprayer", "Recycled Cardboard Box"], category: ProductCategory.FRAGRANCE },
      // { slug: "botanical-body-mist", name: "Botanical Body Mist", brand: "GardenBloom", price: "$24.00", ingredients: ["Water", "Alcohol Denat", "Fragrance", "Propylene Glycol", "Parabens"], packaging: ["Plastic Bottle", "Plastic Sprayer"], category: ProductCategory.FRAGRANCE },

      // // Household
      // { slug: "scented-candle-lavender", name: "Scented Candle - Lavender Fields", brand: "WarmGlow", price: "$18.99", ingredients: ["Paraffin Wax", "Fragrance", "Phthalate", "Artificial Colors", "Lead-core Wick"], packaging: ["Glass Jar", "Cardboard Box", "Plastic Shrink Wrap"], category: ProductCategory.HOUSEHOLD },
      // { slug: "soy-candle-vanilla", name: "Soy Candle - Vanilla Bean", brand: "PureFlame", price: "$22.50", ingredients: ["Soy Wax", "Essential Oils", "Cotton Wick"], packaging: ["Glass Jar", "Cork Lid", "Recycled Cardboard Box"], category: ProductCategory.HOUSEHOLD },
      // { slug: "fabric-softener-sheets", name: "Fabric Softener Sheets", brand: "FreshHome", price: "$7.99", ingredients: ["Dipalmitoylethyl Hydroxyethylmonium Methosulfate", "Fragrance", "Formaldehyde", "Chlorine Bleach", "Artificial Colors"], packaging: ["Cardboard Box", "Plastic Inner Bag"], category: ProductCategory.HOUSEHOLD },
    ].map((p) => prisma.product.create({ data: p }))
  );

  const productMap = Object.fromEntries(products.map((p) => [p.slug, p.id]));

  // ==========================================
  // Users
  // ==========================================
  const SALT_ROUNDS = 10;

  // --- Sarah: Rosacea, also manually selects Parabens & Cruelty-Free ---
  const sarah = await prisma.userProfile.create({
    data: { firstName: "Sarah", lastName: "Johnson", email: "sarah@example.com", location: "New York, NY", age: "25-34", gender: "FEMALE", shoppingStores: "Sephora" },
  });
  await prisma.userAuth.create({ data: { userId: sarah.id, username: "sarahj", passwordHash: await bcrypt.hash("password123", SALT_ROUNDS) } });
  await prisma.userAilment.create({ data: { userId: sarah.id, ailmentId: ailMap["rosacea"], source: ConditionSource.SELECTED } });
  await Promise.all([
    prisma.userPreference.create({ data: { userId: sarah.id, preferenceId: prefMap["no-fragrance"], source: PreferenceSource.PRESELECTED } }),
    prisma.userPreference.create({ data: { userId: sarah.id, preferenceId: prefMap["no-alcohol-skin"], source: PreferenceSource.PRESELECTED } }),
    prisma.userPreference.create({ data: { userId: sarah.id, preferenceId: prefMap["no-sulfates"], source: PreferenceSource.PRESELECTED } }),
    prisma.userPreference.create({ data: { userId: sarah.id, preferenceId: prefMap["no-parabens"], source: PreferenceSource.SELECTED } }),
    prisma.userPreference.create({ data: { userId: sarah.id, preferenceId: prefMap["cruelty-free"], source: PreferenceSource.SELECTED } }),
  ]);
  await prisma.userJournalEntry.create({ data: { userId: sarah.id, conditionId: journalCondMap["common-cold"], source: ConditionSource.SELECTED } });

  // await Promise.all([
  //   prisma.savedProduct.create({ data: { userId: sarah.id, productId: productMap["pure-mineral-sunscreen"] } }),
  //   prisma.savedProduct.create({ data: { userId: sarah.id, productId: productMap["clean-coverage-bb-cream"] } }),
  //   prisma.savedProduct.create({ data: { userId: sarah.id, productId: productMap["plant-based-multi-surface-spray"] } }),
  // ]);

  // --- Marcus: Asthma + eco-conscious ---
  const marcus = await prisma.userProfile.create({
    data: { firstName: "Marcus", lastName: "Chen", email: "marcus@example.com", location: "San Francisco, CA", age: "25-34", gender: "MALE", shoppingStores: "Whole Foods" },
  });
  await prisma.userAuth.create({ data: { userId: marcus.id, username: "marcusc", passwordHash: await bcrypt.hash("password456", SALT_ROUNDS) } });
  await prisma.userAilment.create({ data: { userId: marcus.id, ailmentId: ailMap["asthma"], source: ConditionSource.SELECTED } });
  await Promise.all([
    prisma.userPreference.create({ data: { userId: marcus.id, preferenceId: prefMap["no-food-dyes"], source: PreferenceSource.PRESELECTED } }),
    prisma.userPreference.create({ data: { userId: marcus.id, preferenceId: prefMap["no-pfas"], source: PreferenceSource.SELECTED } }),
    prisma.userPreference.create({ data: { userId: marcus.id, preferenceId: prefMap["no-microplastics"], source: PreferenceSource.SELECTED } }),
    prisma.userPreference.create({ data: { userId: marcus.id, preferenceId: prefMap["eco-packaging"], source: PreferenceSource.SELECTED } }),
  ]);
  // await Promise.all([
  //   prisma.savedProduct.create({ data: { userId: marcus.id, productId: productMap["plant-based-multi-surface-spray"] } }),
  //   prisma.savedProduct.create({ data: { userId: marcus.id, productId: productMap["soy-candle-vanilla"] } }),
  // ]);

  // --- Priya: Celiac + Dairy Allergy + custom condition ---
  const priya = await prisma.userProfile.create({
    data: { firstName: "Priya", lastName: "Patel", email: "priya@example.com", location: "Austin, TX", age: "25-34", gender: "FEMALE", shoppingStores: "Target" },
  });
  await prisma.userAuth.create({ data: { userId: priya.id, username: "priyap", passwordHash: await bcrypt.hash("password789", SALT_ROUNDS) } });
  await prisma.userAilment.create({ data: { userId: priya.id, ailmentId: ailMap["celiac"], source: ConditionSource.SELECTED } });
  await prisma.userAilment.create({ data: { userId: priya.id, ailmentId: ailMap["dairy-allergy"], source: ConditionSource.SELECTED } });
  await prisma.userAilment.create({ data: { userId: priya.id, customEntry: "Histamine Intolerance", source: ConditionSource.CUSTOM } });
  await Promise.all([
    prisma.userPreference.create({ data: { userId: priya.id, preferenceId: prefMap["no-gluten"], source: PreferenceSource.PRESELECTED } }),
    prisma.userPreference.create({ data: { userId: priya.id, preferenceId: prefMap["no-dairy"], source: PreferenceSource.PRESELECTED } }),
    prisma.userPreference.create({ data: { userId: priya.id, preferenceId: prefMap["no-soy"], source: PreferenceSource.SELECTED } }),
    prisma.userPreference.create({ data: { userId: priya.id, preferenceId: prefMap["organic"], source: PreferenceSource.SELECTED } }),
    prisma.userPreference.create({ data: { userId: priya.id, preferenceId: prefMap["no-food-dyes"], source: PreferenceSource.SELECTED } }),
  ]);
  // await Promise.all([
  //   prisma.savedProduct.create({ data: { userId: priya.id, productId: productMap["clean-protein-bar"] } }),
  //   prisma.savedProduct.create({ data: { userId: priya.id, productId: productMap["organic-trail-mix"] } }),
  //   prisma.savedProduct.create({ data: { userId: priya.id, productId: productMap["organic-daily-moisturizer"] } }),
  // ]);



  // ==========================================
  // Summary
  // ==========================================

  console.log("Seed data created successfully!");

  console.log("Seed data created successfully!");
  console.log(`Created ${ailmentCategories.length} ailment categories`);
  console.log(`Created ${ailments.length} ailments`);
  console.log(`Created ${prefCategories.length} preference categories`);
  console.log(`Created ${preferences.length} preferences`);
  console.log(`Created ${products.length} products`);
  console.log(`Created ${journalCategories.length} journal categories`);
  console.log(`Created ${journalConditions.length} journal conditions`);

  console.log("Created 3 users with auth, ailments, preferences, and saved products:");
  console.log("  Sarah (sarahj) — Rosacea → No Fragrance/Alcohol/Sulfates preselected + No Parabens/Cruelty-Free selected");
  console.log("  Marcus (marcusc) — Asthma → No Food Dyes preselected + No PFAS/Microplastics/Eco Packaging selected");
  console.log("  Priya (priyap) — Celiac + Dairy Allergy + custom 'Histamine Intolerance' → Gluten-Free/Dairy preselected + No Soy/Organic/Food Dyes selected");

}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
