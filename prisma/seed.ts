import { PrismaClient, ProductCategory, ConditionSource, PreferenceSource } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data in correct order
  await prisma.userPreference.deleteMany();
  await prisma.savedProduct.deleteMany();
  await prisma.userAilment.deleteMany();
  await prisma.ailmentLinkedPreference.deleteMany();
  await prisma.ingredientSource.deleteMany();
  await prisma.ailmentFlaggedIngredient.deleteMany();
  await prisma.preference.deleteMany();
  await prisma.preferenceCategory.deleteMany();
  await prisma.ailment.deleteMany();
  await prisma.ailmentCategory.deleteMany();
  await prisma.product.deleteMany();
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

      // Digestive
      { slug: "celiac", name: "Celiac Disease", categoryId: ailCatMap["digestive"] },
      { slug: "ibs", name: "IBS (Irritable Bowel Syndrome)", categoryId: ailCatMap["digestive"] },
      { slug: "crohns", name: "Crohn's Disease", categoryId: ailCatMap["digestive"] },
      { slug: "gerd", name: "GERD / Acid Reflux", categoryId: ailCatMap["digestive"] },

      // Allergies
      { slug: "dairy-allergy", name: "Dairy Allergy / Lactose Intolerance", categoryId: ailCatMap["allergies"] },
      { slug: "nut-allergy", name: "Nut Allergy", categoryId: ailCatMap["allergies"] },
      { slug: "gluten-intolerance", name: "Gluten Intolerance", categoryId: ailCatMap["allergies"] },
      { slug: "soy-allergy", name: "Soy Allergy", categoryId: ailCatMap["allergies"] },

      // Neurological
      { slug: "parkinsons", name: "Parkinson's Disease", categoryId: ailCatMap["neurological"] },
      { slug: "dementia", name: "Dementia", categoryId: ailCatMap["neurological"] },
      { slug: "alzheimers", name: "Alzheimer's Disease", categoryId: ailCatMap["neurological"] },
      { slug: "epilepsy", name: "Epilepsy", categoryId: ailCatMap["neurological"] },
      { slug: "ms", name: "Multiple Sclerosis", categoryId: ailCatMap["neurological"] },
      { slug: "migraines", name: "Chronic Migraines", categoryId: ailCatMap["neurological"] },
      { slug: "neuropathy", name: "Peripheral Neuropathy", categoryId: ailCatMap["neurological"] },
      { slug: "adhd", name: "ADHD", categoryId: ailCatMap["neurological"] },
      { slug: "fibromyalgia", name: "Fibromyalgia", categoryId: ailCatMap["neurological"] },

      // Autoimmune
      { slug: "lupus", name: "Lupus", categoryId: ailCatMap["autoimmune"] },
      { slug: "hashimotos", name: "Hashimoto's Thyroiditis", categoryId: ailCatMap["autoimmune"] },
      { slug: "rheumatoid", name: "Rheumatoid Arthritis", categoryId: ailCatMap["autoimmune"] },
      { slug: "diabetes", name: "Diabetes", categoryId: ailCatMap["autoimmune"] },
      { slug: "anemia", name: "Anemia", categoryId: ailCatMap["autoimmune"] },

      // Respiratory
      { slug: "asthma", name: "Asthma", categoryId: ailCatMap["respiratory"] },

      // Hormonal
      { slug: "menopause", name: "Menopause", categoryId: ailCatMap["hormonal"] },
      { slug: "perimenopause", name: "Perimenopause", categoryId: ailCatMap["hormonal"] },

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

  // --- Rosacea ---
  const rosaceaIngredients = [
    { slug: "alcohol-denat", name: "Alcohol Denat", reason: "Can cause skin irritation and flare-ups", sources: [{ title: "National Rosacea Society - Skin Care Ingredients to Avoid", url: "https://www.rosacea.org/patients/skin-care-and-cosmetics" }, { title: "American Academy of Dermatology - Rosacea Triggers", url: "https://www.aad.org/public/diseases/rosacea/triggers/find" }] },
    { slug: "fragrance-rosacea", name: "Artificial Fragrance", reason: "Common trigger for rosacea flare-ups", sources: [{ title: "National Rosacea Society - Triggers Survey", url: "https://www.rosacea.org/patients/materials/triggersgraph.php" }, { title: "Journal of Clinical and Aesthetic Dermatology", url: "https://jcadonline.com/rosacea-triggers/" }] },
    { slug: "menthol", name: "Menthol", reason: "Can cause skin irritation and redness", sources: [{ title: "National Rosacea Society - Skin Care Ingredients", url: "https://www.rosacea.org/patients/skin-care-and-cosmetics" }] },
    { slug: "witch-hazel", name: "Witch Hazel", reason: "May aggravate rosacea symptoms", sources: [{ title: "American Academy of Dermatology - Rosacea Treatment", url: "https://www.aad.org/public/diseases/rosacea/treatment" }] },
    { slug: "eucalyptus", name: "Eucalyptus Oil", reason: "Known irritant for rosacea-prone skin", sources: [{ title: "DermNet NZ - Rosacea", url: "https://dermnetnz.org/topics/rosacea" }] },
    { slug: "sodium-lauryl", name: "Sodium Lauryl Sulfate", reason: "Harsh surfactant that can trigger flare-ups", sources: [{ title: "Environmental Working Group - SLS Safety", url: "https://www.ewg.org/skindeep/ingredient/706110/SODIUM_LAURYL_SULFATE/" }, { title: "National Eczema Association", url: "https://nationaleczema.org/eczema-products/" }] },
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
    { slug: "fragrance-eczema", name: "Artificial Fragrance", reason: "Common irritant for eczema", sources: [{ title: "National Eczema Association - Ingredients to Avoid", url: "https://nationaleczema.org/eczema-products/" }] },
    { slug: "parabens-eczema", name: "Parabens", reason: "Can trigger eczema flare-ups", sources: [{ title: "National Eczema Association", url: "https://nationaleczema.org/eczema-products/" }] },
    { slug: "sls-eczema", name: "Sodium Lauryl Sulfate", reason: "Strips natural oils from skin", sources: [{ title: "National Eczema Association - SLS and Eczema", url: "https://nationaleczema.org/eczema-products/" }] },
    { slug: "coconut-oil-eczema", name: "Coconut Oil", reason: "Can clog pores and worsen eczema for some", sources: [] },
    { slug: "lanolin", name: "Lanolin", reason: "Common allergen for eczema sufferers", sources: [{ title: "DermNet NZ - Lanolin Allergy", url: "https://dermnetnz.org/topics/lanolin-allergy" }] },
    { slug: "propylene-glycol", name: "Propylene Glycol", reason: "Can cause contact dermatitis", sources: [] },
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
    { slug: "gluten", name: "Gluten", reason: "Triggers autoimmune response in celiac disease" },
    { slug: "wheat", name: "Wheat", reason: "Contains gluten" },
    { slug: "barley", name: "Barley", reason: "Contains gluten" },
    { slug: "rye", name: "Rye", reason: "Contains gluten" },
    { slug: "malt", name: "Malt", reason: "Derived from barley, contains gluten" },
    { slug: "brewers-yeast", name: "Brewer's Yeast", reason: "Often contains gluten" },
  ];

  for (const ing of celiacIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["celiac"] },
    });
  }

  // --- Asthma ---
  const asthmaIngredients = [
    { slug: "sulfites-asthma", name: "Sulfites", reason: "Common asthma trigger" },
    { slug: "artificial-colors-asthma", name: "Artificial Colors", reason: "May trigger asthma symptoms" },
    { slug: "benzoates", name: "Benzoates", reason: "Can worsen asthma symptoms" },
  ];

  for (const ing of asthmaIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["asthma"] },
    });
  }

  // --- IBS ---
  const ibsIngredients = [
    { slug: "artificial-sweeteners-ibs", name: "Artificial Sweeteners", reason: "Can trigger IBS symptoms" },
    { slug: "high-fructose", name: "High Fructose Corn Syrup", reason: "FODMAPs trigger for IBS" },
    { slug: "sorbitol", name: "Sorbitol", reason: "Sugar alcohol that can cause digestive distress" },
    { slug: "inulin", name: "Inulin", reason: "High FODMAP ingredient" },
    { slug: "lactose", name: "Lactose", reason: "Common trigger for IBS symptoms" },
  ];

  for (const ing of ibsIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["ibs"] },
    });
  }

  // --- Diabetes ---
  const diabetesIngredients = [
    { slug: "hfcs-diabetes", name: "High Fructose Corn Syrup", reason: "Spikes blood sugar and contributes to insulin resistance" },
    { slug: "refined-sugar-diabetes", name: "Refined Sugar", reason: "Causes rapid blood sugar spikes" },
    { slug: "trans-fats-diabetes", name: "Trans Fats / Hydrogenated Oils", reason: "Increases insulin resistance and inflammation" },
    { slug: "artificial-sweeteners-diabetes", name: "Artificial Sweeteners", reason: "May disrupt insulin response and gut microbiome" },
    { slug: "seed-oils-diabetes", name: "Seed Oils", reason: "Promotes chronic inflammation linked to insulin resistance" },
  ];

  for (const ing of diabetesIngredients) {
    await prisma.ailmentFlaggedIngredient.create({
      data: { ...ing, ailmentId: ailMap["diabetes"] },
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
    ].map((cat) => prisma.preferenceCategory.create({ data: cat }))
  );

  const prefCatMap = Object.fromEntries(prefCategories.map((c) => [c.slug, c.id]));

  // ==========================================
  // Preferences
  // ==========================================
  const preferences = await Promise.all(
    [
      // Hormone & Endocrine
      { slug: "no-parabens", name: "Parabens", description: "Avoid paraben preservatives that can mimic estrogen", categoryId: prefCatMap["hormone-endocrine"] },
      { slug: "no-phthalates", name: "Phthalates", description: "Avoid phthalate plasticizers linked to hormone disruption", categoryId: prefCatMap["hormone-endocrine"] },
      { slug: "no-fragrance", name: "Synthetic Fragrance", description: "Avoid synthetic fragrances that often contain hidden endocrine disruptors", categoryId: prefCatMap["hormone-endocrine"] },
      { slug: "no-oxybenzone", name: "Oxybenzone", description: "Avoid this chemical UV filter that disrupts hormones and harms coral reefs", categoryId: prefCatMap["hormone-endocrine"] },
      { slug: "no-bpa-bps", name: "BPA & BPS", description: "Avoid bisphenol A and bisphenol S found in plastics and packaging", categoryId: prefCatMap["hormone-endocrine"] },

      // Skin & Eye Irritants
      { slug: "no-sulfates", name: "Sulfates", description: "Avoid SLS and SLES that strip natural oils", categoryId: prefCatMap["skin-eye-irritants"] },
      { slug: "no-alcohol-skin", name: "Alcohol in Skin Products", description: "Avoid drying alcohol in skincare", categoryId: prefCatMap["skin-eye-irritants"] },
      { slug: "no-silicones", name: "Silicones", description: "Avoid silicone-based ingredients that can clog pores", categoryId: prefCatMap["skin-eye-irritants"] },

      // Preservatives & Antimicrobials
      { slug: "no-triclosan", name: "Triclosan", description: "Avoid this antibacterial chemical linked to hormone disruption", categoryId: prefCatMap["preservatives-antimicrobials"] },
      { slug: "no-formaldehyde", name: "Formaldehyde", description: "Avoid formaldehyde in household and personal products", categoryId: prefCatMap["preservatives-antimicrobials"] },
      { slug: "no-nitrates", name: "Nitrates/Nitrites", description: "Avoid sodium nitrate and sodium nitrite preservatives", categoryId: prefCatMap["preservatives-antimicrobials"] },

      // Artificial Additives & Food
      { slug: "no-artificial-flavors", name: "Artificial Flavors", description: "Avoid synthetic flavor additives", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-msg", name: "MSG", description: "Avoid monosodium glutamate", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-food-dyes", name: "Food Dyes", description: "Avoid artificial food colorings (Red 40, Yellow 5, Blue 1, etc.)", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-gums-fillers", name: "Gums & Fillers", description: "Avoid xanthan gum, guar gum, cellulose, and other fillers", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-citric-acid", name: "Citric Acid", description: "Avoid manufactured citric acid (often derived from mold)", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-carrageenan", name: "Carrageenan", description: "Avoid this common thickener linked to gut inflammation", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-soy", name: "Soy", description: "Avoid all soy-based ingredients", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-dairy", name: "Dairy", description: "Avoid all dairy products", categoryId: prefCatMap["artificial-food"] },
      { slug: "no-gluten", name: "Gluten-Free", description: "Avoid gluten-containing ingredients", categoryId: prefCatMap["artificial-food"] },
      { slug: "non-gmo", name: "Non-GMO", description: "Only non-genetically modified ingredients", categoryId: prefCatMap["artificial-food"] },
      { slug: "organic", name: "Organic Only", description: "Prefer organic certified products", categoryId: prefCatMap["artificial-food"] },
      { slug: "cruelty-free", name: "Cruelty-Free", description: "Only products not tested on animals", categoryId: prefCatMap["artificial-food"] },
      { slug: "vegan-beauty", name: "Vegan Beauty", description: "No animal-derived ingredients", categoryId: prefCatMap["artificial-food"] },

      // Metabolic & Blood Sugar
      { slug: "no-artificial-sugar", name: "Artificial Sugar", description: "Avoid artificial sweeteners that can affect insulin response", categoryId: prefCatMap["metabolic-blood-sugar"] },
      { slug: "no-high-fructose", name: "High Fructose Corn Syrup", description: "Avoid HFCS linked to metabolic syndrome", categoryId: prefCatMap["metabolic-blood-sugar"] },
      { slug: "no-trans-fats", name: "Trans Fats", description: "Avoid hydrogenated and partially hydrogenated oils", categoryId: prefCatMap["metabolic-blood-sugar"] },
      { slug: "no-seed-oils", name: "Seed Oils", description: "Avoid canola, soybean, sunflower, and other seed oils", categoryId: prefCatMap["metabolic-blood-sugar"] },

      // Environmental
      { slug: "no-pfas", name: "PFAS (Forever Chemicals)", description: "Avoid per- and polyfluoroalkyl substances that persist in the body", categoryId: prefCatMap["environmental-forever"] },
      { slug: "no-microplastics", name: "Microplastics", description: "Avoid products with microplastic particles", categoryId: prefCatMap["environmental-forever"] },
      { slug: "no-bleached-fabrics", name: "Bleached Fabrics", description: "Avoid chlorine-bleached textiles and products", categoryId: prefCatMap["environmental-forever"] },
      { slug: "animal-cruelty-free", name: "Animal Cruelty Free", description: "Only products not tested on animals and no animal-derived ingredients", categoryId: prefCatMap["environmental-forever"] },
      { slug: "eco-packaging", name: "Eco-Friendly Packaging", description: "Prefer sustainable packaging", categoryId: prefCatMap["environmental-forever"] },
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
    { ailmentSlug: "ibs", prefSlugs: ["no-artificial-sugar", "no-high-fructose"] },
    { ailmentSlug: "crohns", prefSlugs: ["no-carrageenan", "no-food-dyes"] },
    { ailmentSlug: "dairy-allergy", prefSlugs: ["no-dairy"] },
    { ailmentSlug: "gluten-intolerance", prefSlugs: ["no-gluten"] },
    { ailmentSlug: "soy-allergy", prefSlugs: ["no-soy"] },
    { ailmentSlug: "parkinsons", prefSlugs: ["no-msg", "no-artificial-sugar"] },
    { ailmentSlug: "dementia", prefSlugs: ["no-artificial-sugar", "no-trans-fats", "no-msg"] },
    { ailmentSlug: "alzheimers", prefSlugs: ["no-trans-fats", "no-nitrates"] },
    { ailmentSlug: "epilepsy", prefSlugs: ["no-msg", "no-artificial-sugar", "no-food-dyes"] },
    { ailmentSlug: "ms", prefSlugs: ["no-gluten", "no-dairy"] },
    { ailmentSlug: "migraines", prefSlugs: ["no-msg", "no-nitrates", "no-artificial-sugar"] },
    { ailmentSlug: "neuropathy", prefSlugs: ["no-msg", "no-artificial-sugar", "no-gluten"] },
    { ailmentSlug: "adhd", prefSlugs: ["no-food-dyes", "no-high-fructose", "no-artificial-flavors"] },
    { ailmentSlug: "fibromyalgia", prefSlugs: ["no-msg", "no-artificial-sugar", "no-gluten"] },
    { ailmentSlug: "hashimotos", prefSlugs: ["no-gluten", "no-soy"] },
    { ailmentSlug: "rheumatoid", prefSlugs: ["no-seed-oils", "no-gluten"] },
    { ailmentSlug: "diabetes", prefSlugs: ["no-high-fructose", "no-artificial-sugar", "no-trans-fats", "no-seed-oils"] },
    { ailmentSlug: "asthma", prefSlugs: ["no-food-dyes"] },
    { ailmentSlug: "menopause", prefSlugs: ["no-artificial-sugar", "no-fragrance"] },
    { ailmentSlug: "perimenopause", prefSlugs: ["no-artificial-sugar", "no-fragrance"] },
    { ailmentSlug: "gastrectomy", prefSlugs: ["no-artificial-sugar", "no-high-fructose"] },
    { ailmentSlug: "bariatric", prefSlugs: ["no-artificial-sugar", "no-high-fructose"] },
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
    data: { firstName: "Sarah", lastName: "Johnson", email: "sarah@example.com", location: "New York, NY", age: 29, gender: "FEMALE", shoppingStores: "Sephora" },
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
  await Promise.all([
    prisma.savedProduct.create({ data: { userId: sarah.id, productId: productMap["pure-mineral-sunscreen"] } }),
    prisma.savedProduct.create({ data: { userId: sarah.id, productId: productMap["clean-coverage-bb-cream"] } }),
    prisma.savedProduct.create({ data: { userId: sarah.id, productId: productMap["plant-based-multi-surface-spray"] } }),
  ]);

  // --- Marcus: Asthma + eco-conscious ---
  const marcus = await prisma.userProfile.create({
    data: { firstName: "Marcus", lastName: "Chen", email: "marcus@example.com", location: "San Francisco, CA", age: 34, gender: "MALE", shoppingStores: "Whole Foods" },
  });
  await prisma.userAuth.create({ data: { userId: marcus.id, username: "marcusc", passwordHash: await bcrypt.hash("password456", SALT_ROUNDS) } });
  await prisma.userAilment.create({ data: { userId: marcus.id, ailmentId: ailMap["asthma"], source: ConditionSource.SELECTED } });
  await Promise.all([
    prisma.userPreference.create({ data: { userId: marcus.id, preferenceId: prefMap["no-food-dyes"], source: PreferenceSource.PRESELECTED } }),
    prisma.userPreference.create({ data: { userId: marcus.id, preferenceId: prefMap["no-pfas"], source: PreferenceSource.SELECTED } }),
    prisma.userPreference.create({ data: { userId: marcus.id, preferenceId: prefMap["no-microplastics"], source: PreferenceSource.SELECTED } }),
    prisma.userPreference.create({ data: { userId: marcus.id, preferenceId: prefMap["eco-packaging"], source: PreferenceSource.SELECTED } }),
  ]);
  await Promise.all([
    prisma.savedProduct.create({ data: { userId: marcus.id, productId: productMap["plant-based-multi-surface-spray"] } }),
    prisma.savedProduct.create({ data: { userId: marcus.id, productId: productMap["soy-candle-vanilla"] } }),
  ]);

  // --- Priya: Celiac + Dairy Allergy + custom condition ---
  const priya = await prisma.userProfile.create({
    data: { firstName: "Priya", lastName: "Patel", email: "priya@example.com", location: "Austin, TX", age: 31, gender: "FEMALE", shoppingStores: "Target" },
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
  console.log(`Created ${ailmentCategories.length} ailment categories`);
  console.log(`Created ${ailments.length} ailments`);
  console.log(`Created ${prefCategories.length} preference categories`);
  console.log(`Created ${preferences.length} preferences`);
  console.log(`Created ${products.length} products`);
  console.log("Created 3 users with auth, ailments, preferences, and saved products:");
  console.log("  Sarah (sarahj) — Rosacea → No Fragrance/Alcohol/Sulfates preselected + No Parabens/Cruelty-Free selected");
  console.log("  Marcus (marcusc) — Asthma → No Food Dyes preselected + No PFAS/Microplastics/Eco Packaging selected");
  console.log("  Priya (priyap) — Celiac + Dairy Allergy + custom 'Histamine Intolerance' → Gluten-Free/Dairy preselected + No Soy/Organic/Food Dyes selected");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
