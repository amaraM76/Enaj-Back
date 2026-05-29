// Educational content for each preference
// This provides detailed information about what each ingredient/preference is,
// where it's commonly found, and why some people choose to avoid it.

export interface PreferenceEducation {
    whatItIs: string
    commonlyFoundIn: string[]
    whyPeopleAvoid: string
    sources: { title: string; url: string }[]
  }
  
  // Helper function to find education content by slug with flexible matching
  export function getPreferenceEducation(slug: string): PreferenceEducation | undefined {
    const normalizedSlug = slug.toLowerCase().trim()
    
    // All possible keys to try
    const keysToTry: string[] = [
      normalizedSlug,
    ]
    
    // Add variations with/without "no-" prefix
    if (normalizedSlug.startsWith('no-')) {
      const withoutNo = normalizedSlug.slice(3)
      keysToTry.push(withoutNo)
      keysToTry.push(withoutNo + '-free')
    } else {
      keysToTry.push('no-' + normalizedSlug)
    }
    
    // Add variations with/without "-free" suffix
    if (normalizedSlug.endsWith('-free')) {
      const withoutFree = normalizedSlug.slice(0, -5)
      keysToTry.push(withoutFree)
      keysToTry.push('no-' + withoutFree)
    } else {
      keysToTry.push(normalizedSlug + '-free')
    }
    
    // Handle special cases like "paraben" vs "parabens"
    if (normalizedSlug.endsWith('s')) {
      keysToTry.push(normalizedSlug.slice(0, -1))
      keysToTry.push(normalizedSlug.slice(0, -1) + '-free')
    } else {
      keysToTry.push(normalizedSlug + 's')
      keysToTry.push(normalizedSlug + 's-free')
    }
    
    // Try each key
    for (const key of keysToTry) {
      if (preferenceEducationData[key]) {
        return preferenceEducationData[key]
      }
    }
    
    // Last resort: search all keys for partial matches
    const allKeys = Object.keys(preferenceEducationData)
    for (const key of allKeys) {
      // Check if the key contains the slug or vice versa
      if (key.includes(normalizedSlug) || normalizedSlug.includes(key.replace(/-free$|^no-/g, ''))) {
        return preferenceEducationData[key]
      }
    }
    
    return undefined
  }
  
  export const preferenceEducationData: Record<string, PreferenceEducation> = {
    // Allergens
    'dairy-free': {
      whatItIs: 'Dairy refers to milk and milk-derived products from mammals, primarily cows. Dairy ingredients include milk, cream, butter, cheese, whey, casein, lactose, and milk solids. These can appear in foods, supplements, and even some skincare products.',
      commonlyFoundIn: [
        'Milk and cream',
        'Cheese and yogurt',
        'Ice cream',
        'Baked goods',
        'Chocolate',
        'Protein powders',
        'Salad dressings',
        'Some medications',
        'Skincare products',
      ],
      whyPeopleAvoid: 'People avoid dairy for various reasons including lactose intolerance (difficulty digesting milk sugar), milk protein allergies (immune reaction to casein or whey), digestive sensitivities, skin conditions like acne or eczema that may be triggered by dairy, or dietary choices like veganism.',
      sources: [
        { title: 'NIH - Lactose Intolerance', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/lactose-intolerance' },
        { title: 'Mayo Clinic - Milk Allergy', url: 'https://www.mayoclinic.org/diseases-conditions/milk-allergy/symptoms-causes/syc-20375101' },
      ],
    },
    'gluten-free': {
      whatItIs: 'Gluten is a group of proteins found in wheat, barley, rye, and their derivatives. It gives bread its chewy texture and helps foods maintain their shape. Gluten can be found in obvious sources like bread and pasta, as well as hidden in sauces, seasonings, and processed foods.',
      commonlyFoundIn: [
        'Bread and pasta',
        'Cereals',
        'Baked goods',
        'Beer',
        'Soy sauce',
        'Salad dressings',
        'Processed meats',
        'Some supplements',
        'Cosmetics and lip products',
      ],
      whyPeopleAvoid: 'People avoid gluten due to celiac disease (an autoimmune condition where gluten damages the small intestine), non-celiac gluten sensitivity (experiencing symptoms without having celiac disease), wheat allergies, or personal preference believing it improves digestion or energy levels.',
      sources: [
        { title: 'Celiac Disease Foundation', url: 'https://celiac.org/about-celiac-disease/what-is-celiac-disease/' },
        { title: 'Mayo Clinic - Gluten-Free Diet', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/gluten-free-diet/art-20048530' },
      ],
    },
    'soy-free': {
      whatItIs: 'Soy is derived from soybeans and appears in many forms including soy protein, soy lecithin, soybean oil, tofu, tempeh, and soy sauce. It is one of the most common food allergens and is widely used as an additive in processed foods.',
      commonlyFoundIn: [
        'Tofu and tempeh',
        'Soy milk',
        'Soy sauce',
        'Processed foods',
        'Baked goods',
        'Infant formulas',
        'Protein bars',
        'Vegetable oils',
        'Some supplements',
      ],
      whyPeopleAvoid: 'People avoid soy due to soy allergies (one of the top 8 food allergens), concerns about phytoestrogens and their potential hormonal effects, thyroid considerations, digestive sensitivities, or as part of elimination diets to identify food intolerances.',
      sources: [
        { title: 'ACAAI - Soy Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/soy/' },
        { title: 'Harvard Health - Soy', url: 'https://www.hsph.harvard.edu/nutritionsource/soy/' },
      ],
    },
    'nut-free': {
      whatItIs: 'Tree nuts include almonds, cashews, walnuts, pecans, pistachios, Brazil nuts, macadamia nuts, and hazelnuts. Nut ingredients can appear as whole nuts, nut butters, nut oils, nut flours, and nut extracts in both foods and cosmetic products.',
      commonlyFoundIn: [
        'Baked goods',
        'Cereals and granola',
        'Nut butters',
        'Chocolate and candy',
        'Asian cuisine',
        'Pesto and sauces',
        'Ice cream',
        'Skincare products',
        'Hair care products',
      ],
      whyPeopleAvoid: 'Tree nut allergies are among the most common and potentially severe food allergies, often causing anaphylaxis. Unlike some childhood allergies, tree nut allergies typically persist into adulthood. Some people also avoid nuts due to digestive issues or as part of certain dietary protocols.',
      sources: [
        { title: 'FARE - Tree Nut Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/tree-nut' },
        { title: 'Mayo Clinic - Tree Nut Allergy', url: 'https://www.mayoclinic.org/diseases-conditions/tree-nut-allergy/symptoms-causes/syc-20377371' },
      ],
    },
  
    // Lifestyle
    'vegan': {
      whatItIs: 'Vegan products contain no animal-derived ingredients whatsoever. This includes obvious ingredients like meat, dairy, eggs, and honey, as well as less obvious ones like gelatin, carmine (red dye from insects), lanolin (from sheep wool), and beeswax.',
      commonlyFoundIn: [
        'Gelatin (candies, capsules)',
        'Carmine/cochineal (red coloring)',
        'Lanolin (lip balms, lotions)',
        'Beeswax (cosmetics)',
        'Casein (supplements)',
        'Whey (protein products)',
        'Shellac (candy coating)',
        'Isinglass (beverages)',
      ],
      whyPeopleAvoid: 'People choose vegan products for ethical reasons (animal welfare), environmental concerns (animal agriculture\'s impact on climate and resources), health motivations, or religious and cultural beliefs. Some also find plant-based alternatives work better for sensitive skin.',
      sources: [
        { title: 'The Vegan Society - Definition', url: 'https://www.vegansociety.com/go-vegan/definition-veganism' },
        { title: 'PETA - Hidden Animal Ingredients', url: 'https://www.peta.org/living/food/animal-ingredients-list/' },
      ],
    },
    'cruelty-free': {
      whatItIs: 'Cruelty-free means a product and its ingredients were not tested on animals at any stage of development. This is different from vegan - a product can be cruelty-free but still contain animal ingredients, or be vegan but tested on animals.',
      commonlyFoundIn: [
        'Cosmetics',
        'Skincare products',
        'Hair care products',
        'Household cleaners',
        'Personal care items',
      ],
      whyPeopleAvoid: 'People seek cruelty-free products due to ethical concerns about animal testing, which can cause suffering and is often considered unnecessary given modern alternatives. Many countries have banned cosmetic animal testing, and consumers increasingly support brands that don\'t test on animals.',
      sources: [
        { title: 'Leaping Bunny - Cruelty-Free', url: 'https://www.leapingbunny.org/about/the-standard' },
        { title: 'Humane Society - Animal Testing', url: 'https://www.humanesociety.org/resources/cosmetics-testing-faq' },
      ],
    },
    'organic': {
      whatItIs: 'Organic products are made from ingredients grown without synthetic pesticides, herbicides, GMOs, or artificial fertilizers. For processed foods, organic certification requires that at least 95% of ingredients meet organic standards. Organic cosmetics have varying standards depending on the certifying body.',
      commonlyFoundIn: [
        'Produce and grains',
        'Dairy products',
        'Meat and poultry',
        'Packaged foods',
        'Skincare products',
        'Hair care products',
        'Baby products',
      ],
      whyPeopleAvoid: 'People choose organic products to reduce exposure to synthetic pesticides and chemicals, support sustainable farming practices, avoid GMOs, and potentially obtain higher nutrient content. Some also prefer the taste or have concerns about the environmental impact of conventional agriculture.',
      sources: [
        { title: 'USDA Organic Standards', url: 'https://www.usda.gov/topics/organic' },
        { title: 'EPA - Organic Farming', url: 'https://www.epa.gov/agriculture/organic-farming' },
      ],
    },
  
    // Chemicals & Additives
    'synthetic-fragrance': {
      whatItIs: 'Synthetic fragrances are lab-created scent compounds used to add pleasant smells to products. A single "fragrance" or "parfum" listing on a label can contain dozens to hundreds of individual chemical ingredients, many of which manufacturers aren\'t required to disclose.',
      commonlyFoundIn: [
        'Perfumes and colognes',
        'Lotions and creams',
        'Shampoos and conditioners',
        'Laundry detergents',
        'Household cleaners',
        'Candles',
        'Air fresheners',
        'Deodorants',
      ],
      whyPeopleAvoid: 'Synthetic fragrances can trigger allergic reactions, headaches, respiratory issues, and skin irritation. Some fragrance chemicals are potential endocrine disruptors. People with asthma, migraines, multiple chemical sensitivity, or skin conditions like eczema often need to avoid synthetic fragrances.',
      sources: [
        { title: 'EWG - Fragrance', url: 'https://www.ewg.org/the-toxic-twelve-chemicals-and-contaminants-in-cosmetics#702702' },
        { title: 'AAD - Fragrance Allergy', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/care/fragrance-allergy' },
      ],
    },
    'parabens': {
      whatItIs: 'Parabens are synthetic preservatives used to prevent bacterial and fungal growth in products. Common types include methylparaben, propylparaben, butylparaben, and ethylparaben. They\'ve been used in cosmetics and personal care products since the 1920s.',
      commonlyFoundIn: [
        'Moisturizers',
        'Shampoos and conditioners',
        'Makeup',
        'Shaving products',
        'Sunscreens',
        'Toothpaste',
        'Some food products',
        'Pharmaceuticals',
      ],
      whyPeopleAvoid: 'Parabens can mimic estrogen in the body and are classified as potential endocrine disruptors. Studies have found parabens in breast cancer tissue, though a direct causal link hasn\'t been established. Some people experience skin irritation or allergic reactions. The EU has restricted certain parabens in cosmetics.',
      sources: [
        { title: 'FDA - Parabens in Cosmetics', url: 'https://www.fda.gov/cosmetics/cosmetic-ingredients/parabens-cosmetics' },
        { title: 'EWG - Parabens', url: 'https://www.ewg.org/what-are-parabens' },
      ],
    },
    'sulfates': {
      whatItIs: 'Sulfates are surfactants (cleaning agents) that create lather and help remove oil and dirt. The most common are sodium lauryl sulfate (SLS) and sodium laureth sulfate (SLES). They\'re effective cleansers but can be harsh, especially for sensitive skin and hair.',
      commonlyFoundIn: [
        'Shampoos',
        'Body washes',
        'Face cleansers',
        'Toothpaste',
        'Dish soap',
        'Laundry detergent',
        'Bubble bath',
        'Hand soap',
      ],
      whyPeopleAvoid: 'Sulfates can strip natural oils from skin and hair, causing dryness, irritation, and frizz. People with eczema, rosacea, or sensitive skin often find sulfates too harsh. Those with color-treated or curly hair avoid sulfates to maintain moisture and color longevity.',
      sources: [
        { title: 'Cleveland Clinic - Sulfates', url: 'https://health.clevelandclinic.org/sulfates' },
        { title: 'AAD - Caring for Sensitive Skin', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/sensitive/sensitive-skin-care' },
      ],
    },
    'phthalates': {
      whatItIs: 'Phthalates are a group of chemicals used to make plastics more flexible and to help fragrances last longer. They\'re often hidden under the term "fragrance" on ingredient labels. Common types include DEP, DBP, and DEHP.',
      commonlyFoundIn: [
        'Fragranced products',
        'Nail polish',
        'Hair spray',
        'Plastic containers',
        'Vinyl flooring',
        'Shower curtains',
        'Personal care products',
        'Some medications',
      ],
      whyPeopleAvoid: 'Phthalates are known endocrine disruptors linked to reproductive issues, developmental problems in children, and potential hormonal effects. Several phthalates are banned in children\'s products in the US and EU. People trying to reduce their chemical exposure often prioritize avoiding phthalates.',
      sources: [
        { title: 'CDC - Phthalates Factsheet', url: 'https://www.cdc.gov/biomonitoring/Phthalates_FactSheet.html' },
        { title: 'NIH - Phthalates', url: 'https://www.niehs.nih.gov/health/topics/agents/endocrine' },
      ],
    },
    'formaldehyde': {
      whatItIs: 'Formaldehyde is a preservative and disinfectant that can be present directly or released by "formaldehyde-releasing" preservatives like DMDM hydantoin, imidazolidinyl urea, diazolidinyl urea, quaternium-15, and bronopol.',
      commonlyFoundIn: [
        'Hair straightening treatments',
        'Nail polish and hardeners',
        'Shampoos',
        'Body washes',
        'Eyelash glue',
        'Some makeup products',
        'Building materials',
      ],
      whyPeopleAvoid: 'Formaldehyde is a known human carcinogen and can cause allergic reactions, skin irritation, and respiratory issues. High exposure from hair straightening treatments has caused serious health problems. The EU restricts formaldehyde in cosmetics, and many consumers actively avoid it.',
      sources: [
        { title: 'American Cancer Society - Formaldehyde', url: 'https://www.cancer.org/cancer/risk-prevention/chemicals/formaldehyde.html' },
        { title: 'FDA - Hair Smoothing Products', url: 'https://www.fda.gov/cosmetics/cosmetic-products/hair-smoothing-products-release-formaldehyde' },
      ],
    },
    'mineral-oil': {
      whatItIs: 'Mineral oil is a colorless, odorless petroleum derivative used as a moisturizing and protective ingredient. It creates a barrier on skin that prevents water loss. Related ingredients include petrolatum, paraffin, and liquid paraffin.',
      commonlyFoundIn: [
        'Moisturizers',
        'Baby oil',
        'Lip balms',
        'Makeup removers',
        'Hair products',
        'Ointments',
        'Some medications',
      ],
      whyPeopleAvoid: 'While cosmetic-grade mineral oil is highly refined and generally considered safe, some people prefer plant-based alternatives. Concerns include potential pore-clogging (comedogenic effects), environmental sustainability of petroleum products, and preference for naturally-derived ingredients.',
      sources: [
        { title: 'Paula\'s Choice - Mineral Oil', url: 'https://www.paulaschoice.com/ingredient-dictionary/emollients/mineral-oil.html' },
        { title: 'CIR - Mineral Oil Safety', url: 'https://www.cir-safety.org/ingredients' },
      ],
    },
    'silicones': {
      whatItIs: 'Silicones are synthetic polymers that create a smooth, silky feel and form a protective barrier on skin and hair. Common silicones include dimethicone, cyclomethicone, cyclopentasiloxane, and anything ending in "-cone" or "-siloxane."',
      commonlyFoundIn: [
        'Hair conditioners',
        'Serums and primers',
        'Foundations',
        'Moisturizers',
        'Sunscreens',
        'Anti-frizz products',
        'Scar treatments',
      ],
      whyPeopleAvoid: 'Silicones can build up on hair over time, causing dullness and weighing hair down. Some people find they clog pores or prevent other beneficial ingredients from penetrating skin. Those following "curly girl method" often avoid silicones. Environmental concerns exist as they don\'t biodegrade easily.',
      sources: [
        { title: 'Healthline - Silicone in Skincare', url: 'https://www.healthline.com/health/beauty-skin-care/is-silicone-bad-for-skin' },
        { title: 'Allure - Silicones in Hair', url: 'https://www.allure.com/story/silicones-in-hair-products' },
      ],
    },
    'aluminum': {
      whatItIs: 'Aluminum compounds like aluminum chlorohydrate and aluminum zirconium are the active ingredients in antiperspirants that temporarily block sweat glands. Aluminum is also found in some antacids, food additives, and cookware.',
      commonlyFoundIn: [
        'Antiperspirants',
        'Some deodorants',
        'Antacids',
        'Processed cheese',
        'Baking powder',
        'Some vaccines',
        'Cookware',
      ],
      whyPeopleAvoid: 'Some people avoid aluminum antiperspirants due to concerns about breast cancer links (though scientific evidence doesn\'t support this) or Alzheimer\'s disease (also not scientifically supported). Others avoid it due to skin irritation, yellow staining on clothes, or preference for allowing natural sweating.',
      sources: [
        { title: 'American Cancer Society - Antiperspirants', url: 'https://www.cancer.org/cancer/risk-prevention/chemicals/antiperspirants-and-breast-cancer-risk.html' },
        { title: 'NIH - Aluminum', url: 'https://ods.od.nih.gov/factsheets/Aluminum-Consumer/' },
      ],
    },
  
    // Food Additives
    'artificial-colors': {
      whatItIs: 'Artificial colors are synthetic dyes derived from petroleum used to enhance the appearance of food, drugs, and cosmetics. Common ones include Red 40, Yellow 5, Yellow 6, Blue 1, and Blue 2. They\'re identified by color and number on labels.',
      commonlyFoundIn: [
        'Candy and sweets',
        'Soft drinks',
        'Cereals',
        'Snack foods',
        'Baked goods',
        'Medications',
        'Cosmetics',
        'Personal care products',
      ],
      whyPeopleAvoid: 'Some studies suggest artificial colors may contribute to hyperactivity in sensitive children. Certain dyes have been linked to allergic reactions. The EU requires warning labels on foods containing certain artificial colors. Many people prefer natural alternatives for general health and wellness.',
      sources: [
        { title: 'FDA - Color Additives', url: 'https://www.fda.gov/industry/color-additives' },
        { title: 'CSPI - Food Dyes', url: 'https://www.cspinet.org/eating-healthy/ingredients-of-concern/food-dyes' },
      ],
    },
    'artificial-sweeteners': {
      whatItIs: 'Artificial sweeteners are synthetic sugar substitutes that provide sweetness without calories. Common types include aspartame, sucralose, saccharin, and acesulfame potassium. They\'re often hundreds of times sweeter than sugar.',
      commonlyFoundIn: [
        'Diet sodas',
        'Sugar-free candy',
        'Low-calorie foods',
        'Chewing gum',
        'Protein powders',
        'Yogurt',
        'Some medications',
        'Tabletop sweeteners',
      ],
      whyPeopleAvoid: 'Some research suggests artificial sweeteners may negatively affect gut bacteria, trigger cravings for sweet foods, or cause digestive issues in sensitive individuals. People with phenylketonuria (PKU) must avoid aspartame. Others simply prefer natural sweeteners or no added sweetness.',
      sources: [
        { title: 'Harvard Health - Artificial Sweeteners', url: 'https://www.health.harvard.edu/blog/artificial-sweeteners-sugar-free-but-at-what-cost-201207165030' },
        { title: 'Mayo Clinic - Artificial Sweeteners', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/artificial-sweeteners/art-20046936' },
      ],
    },
    'msg': {
      whatItIs: 'Monosodium glutamate (MSG) is a flavor enhancer made from glutamic acid, an amino acid naturally found in many foods. While glutamate occurs naturally in tomatoes, cheese, and mushrooms, MSG is the isolated, concentrated form.',
      commonlyFoundIn: [
        'Chinese restaurant food',
        'Chips and snacks',
        'Canned soups',
        'Frozen meals',
        'Fast food',
        'Seasoning blends',
        'Instant noodles',
        'Processed meats',
      ],
      whyPeopleAvoid: 'Some people report symptoms like headaches, flushing, and sweating after consuming MSG, though controlled studies haven\'t confirmed a consistent link. People with certain sensitivities or those following clean eating approaches often prefer to avoid added MSG.',
      sources: [
        { title: 'FDA - MSG', url: 'https://www.fda.gov/food/food-additives-petitions/questions-and-answers-monosodium-glutamate-msg' },
        { title: 'Mayo Clinic - MSG', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/monosodium-glutamate/faq-20058196' },
      ],
    },
    'high-fructose-corn-syrup': {
      whatItIs: 'High-fructose corn syrup (HFCS) is a sweetener made from corn starch that has been processed to convert some glucose into fructose. It became popular in the 1970s as a cheaper alternative to sugar in processed foods and beverages.',
      commonlyFoundIn: [
        'Soft drinks',
        'Fruit juices',
        'Candy',
        'Bread',
        'Condiments',
        'Cereals',
        'Yogurt',
        'Salad dressings',
      ],
      whyPeopleAvoid: 'HFCS has been associated with obesity, diabetes, and metabolic syndrome in some studies. While the debate continues about whether it\'s worse than regular sugar, many people avoid it as part of reducing overall added sugar intake or preferring less processed sweeteners.',
      sources: [
        { title: 'Harvard Health - HFCS', url: 'https://www.health.harvard.edu/heart-health/the-sweet-danger-of-sugar' },
        { title: 'Mayo Clinic - HFCS', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/high-fructose-corn-syrup/faq-20058201' },
      ],
    },
    'gums-and-fillers': {
      whatItIs: 'Gums are thickening and stabilizing agents derived from various sources. Common food gums include xanthan gum, guar gum, carrageenan, locust bean gum, and cellulose gum. They improve texture, prevent separation, and extend shelf life.',
      commonlyFoundIn: [
        'Ice cream',
        'Non-dairy milks',
        'Gluten-free baked goods',
        'Salad dressings',
        'Sauces and gravies',
        'Yogurt',
        'Protein shakes',
        'Processed foods',
      ],
      whyPeopleAvoid: 'Some people experience digestive issues like bloating, gas, or discomfort from certain gums, particularly carrageenan. Those with IBS or sensitive digestive systems may find gums problematic. Some prefer whole foods without additives, and certain gums may feed bacterial overgrowth in the gut.',
      sources: [
        { title: 'Healthline - Food Gums', url: 'https://www.healthline.com/nutrition/xanthan-gum' },
        { title: 'NIH - Carrageenan', url: 'https://pubmed.ncbi.nlm.nih.gov/28028998/' },
      ],
    },
    'seed-oils': {
      whatItIs: 'Seed oils (also called vegetable oils) are extracted from the seeds of plants, often using industrial processing methods. Common seed oils include canola, soybean, corn, sunflower, safflower, and cottonseed oils. They\'re high in omega-6 fatty acids.',
      commonlyFoundIn: [
        'Fried foods',
        'Baked goods',
        'Salad dressings',
        'Mayonnaise',
        'Margarine',
        'Processed snacks',
        'Restaurant food',
        'Many packaged foods',
      ],
      whyPeopleAvoid: 'Some health advocates argue that the high omega-6 content in seed oils can promote inflammation when omega-6 to omega-3 ratios are imbalanced. Industrial processing and oxidation are also concerns. Many people prefer traditional fats like olive oil, butter, coconut oil, or avocado oil.',
      sources: [
        { title: 'Harvard Health - Vegetable Oils', url: 'https://www.health.harvard.edu/staying-healthy/the-truth-about-fats-bad-and-good' },
        { title: 'NIH - Omega-6 Fatty Acids', url: 'https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/' },
      ],
    },
  
    // Preservatives
    'sodium-benzoate': {
      whatItIs: 'Sodium benzoate is a preservative used to prevent the growth of bacteria, yeast, and mold in acidic products. It\'s often used in combination with other preservatives and is particularly effective in foods with low pH levels.',
      commonlyFoundIn: [
        'Soft drinks',
        'Fruit juices',
        'Pickles',
        'Salad dressings',
        'Condiments',
        'Jams and jellies',
        'Mouthwash',
        'Some medications',
      ],
      whyPeopleAvoid: 'When combined with vitamin C (ascorbic acid), sodium benzoate can form benzene, a known carcinogen. Some studies suggest it may increase hyperactivity in children. People with sensitivities may experience allergic reactions, and some prefer to avoid synthetic preservatives generally.',
      sources: [
        { title: 'FDA - Benzene in Beverages', url: 'https://www.fda.gov/food/chemical-contaminants-food/questions-and-answers-occurrence-benzene-soft-drinks-and-other-beverages' },
        { title: 'PubMed - Sodium Benzoate Safety', url: 'https://pubmed.ncbi.nlm.nih.gov/17825880/' },
      ],
    },
    'bha-bht': {
      whatItIs: 'BHA (butylated hydroxyanisole) and BHT (butylated hydroxytoluene) are synthetic antioxidants used to prevent fats and oils from going rancid. They extend the shelf life of many processed foods and cosmetic products.',
      commonlyFoundIn: [
        'Cereal',
        'Chewing gum',
        'Snack foods',
        'Butter and lard',
        'Baked goods',
        'Cosmetics',
        'Rubber and petroleum products',
      ],
      whyPeopleAvoid: 'BHA is listed as "reasonably anticipated to be a human carcinogen" by the National Toxicology Program. Both may have endocrine-disrupting effects. California requires cancer warning labels for BHA. Many people choose products preserved with natural alternatives like vitamin E.',
      sources: [
        { title: 'NTP - BHA Report', url: 'https://ntp.niehs.nih.gov/ntp/roc/content/profiles/butylatedhydroxyanisole.pdf' },
        { title: 'EWG - BHA & BHT', url: 'https://www.ewg.org/foodscores/content/natural-vs-artificial-preservatives' },
      ],
    },
  
    // Sun Protection Related  
    'chemical-sunscreens': {
      whatItIs: 'Chemical sunscreens use organic (carbon-based) compounds that absorb UV radiation and convert it to heat. Common chemical UV filters include oxybenzone, avobenzone, octinoxate, octisalate, and homosalate. They differ from mineral sunscreens which physically block UV rays.',
      commonlyFoundIn: [
        'Sunscreens',
        'Moisturizers with SPF',
        'Makeup with SPF',
        'Lip balms',
        'Anti-aging products',
        'BB and CC creams',
      ],
      whyPeopleAvoid: 'Some chemical UV filters, particularly oxybenzone and octinoxate, are potential endocrine disruptors and have been banned in Hawaii and Key West for harming coral reefs. Chemical sunscreens may cause skin irritation or allergic reactions. Many people prefer mineral alternatives (zinc oxide, titanium dioxide).',
      sources: [
        { title: 'EWG - Sunscreen Guide', url: 'https://www.ewg.org/sunscreen/report/the-trouble-with-sunscreen-chemicals/' },
        { title: 'FDA - Sunscreen', url: 'https://www.fda.gov/news-events/press-announcements/fda-advances-new-proposed-regulation-make-sure-sunscreens-are-safe-and-effective' },
      ],
    },
  
    // Alcohols
    'drying-alcohols': {
      whatItIs: 'Drying alcohols are short-chain alcohols that evaporate quickly and can strip moisture from skin. Common drying alcohols include SD alcohol, denatured alcohol, alcohol denat, isopropyl alcohol, and ethanol. They\'re different from fatty alcohols which are moisturizing.',
      commonlyFoundIn: [
        'Toners',
        'Astringents',
        'Acne treatments',
        'Hand sanitizers',
        'Hair sprays',
        'Aftershaves',
        'Some moisturizers',
        'Makeup setting sprays',
      ],
      whyPeopleAvoid: 'Drying alcohols can disrupt the skin barrier, cause dryness and irritation, and may worsen conditions like eczema or rosacea. While they can help products absorb quickly and feel lightweight, the long-term effects of stripping natural oils can be counterproductive for skin health.',
      sources: [
        { title: 'Paula\'s Choice - Alcohol in Skincare', url: 'https://www.paulaschoice.com/expert-advice/skincare-advice/basic-skin-care-tips/alcohol-in-skincare-the-facts.html' },
        { title: 'Healthline - Alcohol in Skincare', url: 'https://www.healthline.com/health/alcohol-on-skin' },
      ],
    },
  
    // Additional preferences with alternative IDs
    'no-pfas': {
      whatItIs: 'PFAS (per- and polyfluoroalkyl substances) are a group of synthetic chemicals known as "forever chemicals" because they don\'t break down in the environment or the human body. They\'re used to make products resistant to water, grease, and stains.',
      commonlyFoundIn: [
        'Non-stick cookware',
        'Waterproof cosmetics',
        'Stain-resistant fabrics',
        'Food packaging',
        'Dental floss',
        'Some sunscreens',
        'Water-resistant clothing',
        'Pizza boxes and fast food wrappers',
      ],
      whyPeopleAvoid: 'PFAS are linked to serious health concerns including cancer, thyroid disease, immune system effects, reproductive issues, and developmental problems. They accumulate in the body over time and have been found in the blood of 98% of Americans tested. The EPA has issued health advisories for PFAS in drinking water.',
      sources: [
        { title: 'EPA - PFAS Explained', url: 'https://www.epa.gov/pfas/pfas-explained' },
        { title: 'NIH - PFAS Health Effects', url: 'https://www.niehs.nih.gov/health/topics/agents/pfc' },
      ],
    },
    'no-triclosan': {
      whatItIs: 'Triclosan is an antibacterial and antifungal agent that was widely used in personal care products before being banned from consumer antiseptic wash products by the FDA in 2016. It may still appear in some toothpastes, cosmetics, and other products.',
      commonlyFoundIn: [
        'Some toothpastes',
        'Hand sanitizers (older formulations)',
        'Deodorants',
        'Cosmetics',
        'Cutting boards',
        'Some clothing and toys',
      ],
      whyPeopleAvoid: 'Triclosan is a known endocrine disruptor that can interfere with thyroid hormones and may contribute to antibiotic resistance. Studies have linked it to liver toxicity, muscle function impairment, and potential tumor growth. The FDA banned it from consumer hand soaps due to lack of proven benefit over regular soap.',
      sources: [
        { title: 'FDA - Triclosan', url: 'https://www.fda.gov/consumers/consumer-updates/5-things-know-about-triclosan' },
        { title: 'EWG - Triclosan', url: 'https://www.ewg.org/skindeep/ingredients/706623-TRICLOSAN/' },
      ],
    },
    'no-parabens': {
      whatItIs: 'Parabens are synthetic preservatives used to prevent bacterial and fungal growth in products. Common types include methylparaben, propylparaben, butylparaben, and ethylparaben. They\'ve been used in cosmetics and personal care products since the 1920s.',
      commonlyFoundIn: [
        'Moisturizers',
        'Shampoos and conditioners',
        'Makeup',
        'Shaving products',
        'Sunscreens',
        'Toothpaste',
        'Some food products',
        'Pharmaceuticals',
      ],
      whyPeopleAvoid: 'Parabens can mimic estrogen in the body and are classified as potential endocrine disruptors. Studies have found parabens in breast cancer tissue, though a direct causal link hasn\'t been established. Some people experience skin irritation or allergic reactions. The EU has restricted certain parabens in cosmetics.',
      sources: [
        { title: 'FDA - Parabens in Cosmetics', url: 'https://www.fda.gov/cosmetics/cosmetic-ingredients/parabens-cosmetics' },
        { title: 'EWG - Parabens', url: 'https://www.ewg.org/what-are-parabens' },
      ],
    },
    'no-sulfates': {
      whatItIs: 'Sulfates are surfactants (cleaning agents) that create lather and help remove oil and dirt. The most common are sodium lauryl sulfate (SLS) and sodium laureth sulfate (SLES). They\'re effective cleansers but can be harsh, especially for sensitive skin and hair.',
      commonlyFoundIn: [
        'Shampoos',
        'Body washes',
        'Face cleansers',
        'Toothpaste',
        'Dish soap',
        'Laundry detergent',
        'Bubble bath',
        'Hand soap',
      ],
      whyPeopleAvoid: 'Sulfates can strip natural oils from skin and hair, causing dryness, irritation, and frizz. People with eczema, rosacea, or sensitive skin often find sulfates too harsh. Those with color-treated or curly hair avoid sulfates to maintain moisture and color longevity.',
      sources: [
        { title: 'Cleveland Clinic - Sulfates', url: 'https://health.clevelandclinic.org/sulfates' },
        { title: 'AAD - Caring for Sensitive Skin', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/sensitive/sensitive-skin-care' },
      ],
    },
    'no-phthalates': {
      whatItIs: 'Phthalates are a group of chemicals used to make plastics more flexible and to help fragrances last longer. They\'re often hidden under the term "fragrance" on ingredient labels. Common types include DEP, DBP, and DEHP.',
      commonlyFoundIn: [
        'Fragranced products',
        'Nail polish',
        'Hair spray',
        'Plastic containers',
        'Vinyl flooring',
        'Shower curtains',
        'Personal care products',
        'Some medications',
      ],
      whyPeopleAvoid: 'Phthalates are known endocrine disruptors linked to reproductive issues, developmental problems in children, and potential hormonal effects. Several phthalates are banned in children\'s products in the US and EU. People trying to reduce their chemical exposure often prioritize avoiding phthalates.',
      sources: [
        { title: 'CDC - Phthalates Factsheet', url: 'https://www.cdc.gov/biomonitoring/Phthalates_FactSheet.html' },
        { title: 'NIH - Phthalates', url: 'https://www.niehs.nih.gov/health/topics/agents/endocrine' },
      ],
    },
    'no-synthetic-fragrance': {
      whatItIs: 'Synthetic fragrances are lab-created scent compounds used to add pleasant smells to products. A single "fragrance" or "parfum" listing on a label can contain dozens to hundreds of individual chemical ingredients, many of which manufacturers aren\'t required to disclose.',
      commonlyFoundIn: [
        'Perfumes and colognes',
        'Lotions and creams',
        'Shampoos and conditioners',
        'Laundry detergents',
        'Household cleaners',
        'Candles',
        'Air fresheners',
        'Deodorants',
      ],
      whyPeopleAvoid: 'Synthetic fragrances can trigger allergic reactions, headaches, respiratory issues, and skin irritation. Some fragrance chemicals are potential endocrine disruptors. People with asthma, migraines, multiple chemical sensitivity, or skin conditions like eczema often need to avoid synthetic fragrances.',
      sources: [
        { title: 'EWG - Fragrance', url: 'https://www.ewg.org/the-toxic-twelve-chemicals-and-contaminants-in-cosmetics#702702' },
        { title: 'AAD - Fragrance Allergy', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/care/fragrance-allergy' },
      ],
    },
    'no-formaldehyde': {
      whatItIs: 'Formaldehyde is a preservative and disinfectant that can be present directly or released by "formaldehyde-releasing" preservatives like DMDM hydantoin, imidazolidinyl urea, diazolidinyl urea, quaternium-15, and bronopol.',
      commonlyFoundIn: [
        'Hair straightening treatments',
        'Nail polish and hardeners',
        'Shampoos',
        'Body washes',
        'Eyelash glue',
        'Some makeup products',
        'Building materials',
      ],
      whyPeopleAvoid: 'Formaldehyde is a known human carcinogen and can cause allergic reactions, skin irritation, and respiratory issues. High exposure from hair straightening treatments has caused serious health problems. The EU restricts formaldehyde in cosmetics, and many consumers actively avoid it.',
      sources: [
        { title: 'American Cancer Society - Formaldehyde', url: 'https://www.cancer.org/cancer/risk-prevention/chemicals/formaldehyde.html' },
        { title: 'FDA - Hair Smoothing Products', url: 'https://www.fda.gov/cosmetics/cosmetic-products/hair-smoothing-products-release-formaldehyde' },
      ],
    },
  
    // Additional key aliases for flexible matching
    'dairy': {
      whatItIs: 'Dairy refers to milk and milk-derived products from mammals, primarily cows. Dairy ingredients include milk, cream, butter, cheese, whey, casein, lactose, and milk solids. These can appear in foods, supplements, and even some skincare products.',
      commonlyFoundIn: ['Milk and cream', 'Cheese and yogurt', 'Ice cream', 'Baked goods', 'Chocolate', 'Protein powders', 'Salad dressings', 'Some medications', 'Skincare products'],
      whyPeopleAvoid: 'People avoid dairy for various reasons including lactose intolerance (difficulty digesting milk sugar), milk protein allergies (immune reaction to casein or whey), digestive sensitivities, skin conditions like acne or eczema that may be triggered by dairy, or dietary choices like veganism.',
      sources: [
        { title: 'NIH - Lactose Intolerance', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/lactose-intolerance' },
        { title: 'Mayo Clinic - Milk Allergy', url: 'https://www.mayoclinic.org/diseases-conditions/milk-allergy/symptoms-causes/syc-20375101' },
      ],
    },
    'gluten': {
      whatItIs: 'Gluten is a group of proteins found in wheat, barley, rye, and their derivatives. It gives bread its chewy texture and helps foods maintain their shape. Gluten can be found in obvious sources like bread and pasta, as well as hidden in sauces, seasonings, and processed foods.',
      commonlyFoundIn: ['Bread and pasta', 'Cereals', 'Baked goods', 'Beer', 'Soy sauce', 'Salad dressings', 'Processed meats', 'Some supplements', 'Cosmetics and lip products'],
      whyPeopleAvoid: 'People avoid gluten due to celiac disease (an autoimmune condition where gluten damages the small intestine), non-celiac gluten sensitivity (experiencing symptoms without having celiac disease), wheat allergies, or personal preference believing it improves digestion or energy levels.',
      sources: [
        { title: 'Celiac Disease Foundation', url: 'https://celiac.org/about-celiac-disease/what-is-celiac-disease/' },
        { title: 'Mayo Clinic - Gluten-Free Diet', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/gluten-free-diet/art-20048530' },
      ],
    },
    'soy': {
      whatItIs: 'Soy is derived from soybeans and appears in many forms including soy protein, soy lecithin, soybean oil, tofu, tempeh, and soy sauce. It is one of the most common food allergens and is widely used as an additive in processed foods.',
      commonlyFoundIn: ['Tofu and tempeh', 'Soy milk', 'Soy sauce', 'Processed foods', 'Baked goods', 'Infant formulas', 'Protein bars', 'Vegetable oils', 'Some supplements'],
      whyPeopleAvoid: 'People avoid soy due to soy allergies (one of the top 8 food allergens), concerns about phytoestrogens and their potential hormonal effects, thyroid considerations, digestive sensitivities, or as part of elimination diets to identify food intolerances.',
      sources: [
        { title: 'ACAAI - Soy Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/soy/' },
        { title: 'Harvard Health - Soy', url: 'https://www.hsph.harvard.edu/nutritionsource/soy/' },
      ],
    },
    'nuts': {
      whatItIs: 'Tree nuts include almonds, cashews, walnuts, pecans, pistachios, Brazil nuts, macadamia nuts, and hazelnuts. Nut ingredients can appear as whole nuts, nut butters, nut oils, nut flours, and nut extracts in both foods and cosmetic products.',
      commonlyFoundIn: ['Baked goods', 'Cereals and granola', 'Nut butters', 'Chocolate and candy', 'Asian cuisine', 'Pesto and sauces', 'Ice cream', 'Skincare products', 'Hair care products'],
      whyPeopleAvoid: 'Tree nut allergies are among the most common and potentially severe food allergies, often causing anaphylaxis. Unlike some childhood allergies, tree nut allergies typically persist into adulthood. Some people also avoid nuts due to digestive issues or as part of certain dietary protocols.',
      sources: [
        { title: 'FARE - Tree Nut Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/tree-nut' },
        { title: 'Mayo Clinic - Tree Nut Allergy', url: 'https://www.mayoclinic.org/diseases-conditions/tree-nut-allergy/symptoms-causes/syc-20377371' },
      ],
    },
    'pfas': {
      whatItIs: 'PFAS (per- and polyfluoroalkyl substances) are a group of synthetic chemicals known as "forever chemicals" because they don\'t break down in the environment or the human body. They\'re used to make products resistant to water, grease, and stains.',
      commonlyFoundIn: ['Non-stick cookware', 'Waterproof cosmetics', 'Stain-resistant fabrics', 'Food packaging', 'Dental floss', 'Some sunscreens', 'Water-resistant clothing', 'Pizza boxes and fast food wrappers'],
      whyPeopleAvoid: 'PFAS are linked to serious health concerns including cancer, thyroid disease, immune system effects, reproductive issues, and developmental problems. They accumulate in the body over time and have been found in the blood of 98% of Americans tested. The EPA has issued health advisories for PFAS in drinking water.',
      sources: [
        { title: 'EPA - PFAS Explained', url: 'https://www.epa.gov/pfas/pfas-explained' },
        { title: 'NIH - PFAS Health Effects', url: 'https://www.niehs.nih.gov/health/topics/agents/pfc' },
      ],
    },
    'triclosan': {
      whatItIs: 'Triclosan is an antibacterial and antifungal agent that was widely used in personal care products before being banned from consumer antiseptic wash products by the FDA in 2016. It may still appear in some toothpastes, cosmetics, and other products.',
      commonlyFoundIn: ['Some toothpastes', 'Hand sanitizers (older formulations)', 'Deodorants', 'Cosmetics', 'Cutting boards', 'Some clothing and toys'],
      whyPeopleAvoid: 'Triclosan is a known endocrine disruptor that can interfere with thyroid hormones and may contribute to antibiotic resistance. Studies have linked it to liver toxicity, muscle function impairment, and potential tumor growth. The FDA banned it from consumer hand soaps due to lack of proven benefit over regular soap.',
      sources: [
        { title: 'FDA - Triclosan', url: 'https://www.fda.gov/consumers/consumer-updates/5-things-know-about-triclosan' },
        { title: 'EWG - Triclosan', url: 'https://www.ewg.org/skindeep/ingredients/706623-TRICLOSAN/' },
      ],
    },
  
    // Additional aliases for common backend IDs
    'no-mineral-oil': {
      whatItIs: 'Mineral oil is a clear, odorless oil derived from petroleum. It is used in skincare products as an occlusive agent that creates a barrier on the skin to prevent moisture loss. Common names include liquid paraffin, paraffinum liquidum, and white oil.',
      commonlyFoundIn: ['Baby oil', 'Lotions and creams', 'Lip balms', 'Makeup removers', 'Hair products', 'Some medications', 'Industrial lubricants'],
      whyPeopleAvoid: 'Some people avoid mineral oil due to concerns about its petroleum origin and potential for clogging pores (comedogenicity). While highly refined cosmetic-grade mineral oil is generally considered safe, some prefer plant-based alternatives. There are also environmental concerns about petroleum-derived ingredients.',
      sources: [
        { title: 'Healthline - Mineral Oil', url: 'https://www.healthline.com/health/mineral-oil-for-skin' },
        { title: 'Paula\'s Choice - Mineral Oil', url: 'https://www.paulaschoice.com/ingredient-dictionary/emollients/mineral-oil.html' },
      ],
    },
    'no-silicones': {
      whatItIs: 'Silicones are synthetic polymers that create a smooth, silky feel in products. Common silicones include dimethicone, cyclomethicone, and cyclopentasiloxane. They form a protective barrier on skin and hair, making products feel luxurious.',
      commonlyFoundIn: ['Hair conditioners and serums', 'Primers', 'Foundations', 'Moisturizers', 'Sunscreens', 'Anti-frizz products', 'Scar treatments'],
      whyPeopleAvoid: 'Some people avoid silicones because they can build up on hair over time, potentially making it feel heavy or greasy. In skincare, some believe silicones can trap bacteria and sebum under the skin. Those following "clean beauty" or "silicone-free" hair care routines specifically avoid these ingredients.',
      sources: [
        { title: 'Cleveland Clinic - Silicone in Skincare', url: 'https://health.clevelandclinic.org/is-silicone-bad-for-skin' },
        { title: 'Healthline - Silicone in Hair Products', url: 'https://www.healthline.com/health/silicone-hair-products' },
      ],
    },
    'no-aluminum': {
      whatItIs: 'Aluminum compounds (like aluminum chlorohydrate and aluminum zirconium) are the active ingredients in antiperspirants that temporarily block sweat glands. Aluminum can also appear in cosmetics, antacids, and processed foods.',
      commonlyFoundIn: ['Antiperspirants', 'Some deodorants', 'Antacids', 'Processed cheese', 'Baking powder', 'Some cosmetics', 'Food additives'],
      whyPeopleAvoid: 'Concerns about aluminum include potential links to breast cancer and Alzheimer\'s disease, though scientific evidence is inconclusive. Some people experience skin irritation from aluminum-based antiperspirants. Others prefer natural alternatives or have concerns about blocking the body\'s natural sweating process.',
      sources: [
        { title: 'National Cancer Institute - Antiperspirants', url: 'https://www.cancer.gov/about-cancer/causes-prevention/risk/myths/antiperspirants-fact-sheet' },
        { title: 'Cleveland Clinic - Aluminum-Free Deodorant', url: 'https://health.clevelandclinic.org/aluminum-free-deodorant' },
      ],
    },
    'no-artificial-colors': {
      whatItIs: 'Artificial colors are synthetic dyes used to give products a specific color. In the US, certified color additives have names like FD&C Red No. 40, Yellow No. 5, and Blue No. 1. In the EU, they may be listed as E numbers (e.g., E102, E129).',
      commonlyFoundIn: ['Candy and sweets', 'Soft drinks', 'Cereals', 'Snack foods', 'Cosmetics', 'Medications', 'Personal care products'],
      whyPeopleAvoid: 'Some artificial colors have been linked to hyperactivity in children, and certain dyes are banned in some countries but allowed in others. Some people are sensitive or allergic to specific dyes. Those seeking "clean" or natural products often avoid synthetic colorants in favor of plant-based alternatives.',
      sources: [
        { title: 'FDA - Color Additives', url: 'https://www.fda.gov/industry/color-additives' },
        { title: 'CSPI - Food Dyes', url: 'https://www.cspinet.org/eating-healthy/chemical-cuisine/food-dyes' },
      ],
    },
    'no-artificial-sweeteners': {
      whatItIs: 'Artificial sweeteners are synthetic sugar substitutes that provide sweetness without calories. Common ones include aspartame, sucralose, saccharin, and acesulfame potassium (Ace-K). They\'re significantly sweeter than sugar, so small amounts are used.',
      commonlyFoundIn: ['Diet sodas', 'Sugar-free products', 'Chewing gum', 'Yogurt', 'Protein powders', 'Medications', 'Toothpaste'],
      whyPeopleAvoid: 'Some studies suggest artificial sweeteners may negatively affect gut microbiome, increase cravings for sweet foods, or have other metabolic effects. Some people report headaches or digestive issues. Those preferring "whole foods" often avoid highly processed sweetening agents.',
      sources: [
        { title: 'Harvard Health - Artificial Sweeteners', url: 'https://www.health.harvard.edu/blog/artificial-sweeteners-sugar-free-but-at-what-cost-201207165030' },
        { title: 'Mayo Clinic - Artificial Sweeteners', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/artificial-sweeteners/art-20046936' },
      ],
    },
    'no-msg': {
      whatItIs: 'MSG (monosodium glutamate) is a flavor enhancer that adds a savory, umami taste to foods. It\'s the sodium salt of glutamic acid, an amino acid naturally found in many foods like tomatoes, parmesan cheese, and mushrooms.',
      commonlyFoundIn: ['Chinese food', 'Processed snacks', 'Canned soups', 'Frozen meals', 'Fast food', 'Seasoning blends', 'Instant noodles'],
      whyPeopleAvoid: 'Some people report symptoms like headaches, flushing, and sweating after consuming MSG ("Chinese Restaurant Syndrome"), though controlled studies have not consistently confirmed these effects. Those with sensitivities or following elimination diets may choose to avoid it.',
      sources: [
        { title: 'FDA - MSG', url: 'https://www.fda.gov/food/food-additives-petitions/questions-and-answers-monosodium-glutamate-msg' },
        { title: 'Mayo Clinic - MSG', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/monosodium-glutamate/faq-20058196' },
      ],
    },
    'no-gums-and-fillers': {
      whatItIs: 'Gums are thickening and stabilizing agents derived from plants, seaweed, or bacteria. Common ones include xanthan gum, guar gum, carrageenan, and locust bean gum. Fillers are inexpensive ingredients used to bulk up products.',
      commonlyFoundIn: ['Ice cream', 'Yogurt', 'Plant milks', 'Salad dressings', 'Gluten-free baked goods', 'Supplements', 'Processed foods'],
      whyPeopleAvoid: 'Some people experience digestive discomfort (bloating, gas) from certain gums. Carrageenan in particular has been controversial, with some studies suggesting it may cause inflammation. Those with IBS or sensitive digestion often try eliminating gums to see if symptoms improve.',
      sources: [
        { title: 'Healthline - Guar Gum', url: 'https://www.healthline.com/nutrition/guar-gum' },
        { title: 'Harvard Health - Carrageenan', url: 'https://www.health.harvard.edu/staying-healthy/is-carrageenan-safe' },
      ],
    },
    'no-seed-oils': {
      whatItIs: 'Seed oils are vegetable oils extracted from the seeds of plants, including soybean oil, canola oil, corn oil, sunflower oil, safflower oil, and cottonseed oil. They are high in omega-6 polyunsaturated fatty acids and are widely used in processed foods.',
      commonlyFoundIn: ['Restaurant food', 'Fried foods', 'Processed snacks', 'Salad dressings', 'Mayonnaise', 'Baked goods', 'Margarine'],
      whyPeopleAvoid: 'Critics argue that seed oils may promote inflammation due to high omega-6 content and that the industrial extraction process using heat and chemicals is concerning. Some nutrition philosophies (ancestral, paleo, carnivore) specifically exclude these oils in favor of traditional fats.',
      sources: [
        { title: 'Healthline - Seed Oils', url: 'https://www.healthline.com/nutrition/are-vegetable-and-seed-oils-bad' },
        { title: 'Harvard Health - Omega-6', url: 'https://www.health.harvard.edu/newsletter_article/no-need-to-avoid-healthy-omega-6-fats' },
      ],
    },
    'no-chemical-sunscreens': {
      whatItIs: 'Chemical sunscreens use organic (carbon-containing) compounds like oxybenzone, avobenzone, octinoxate, and homosalate to absorb UV radiation and convert it to heat. They differ from mineral sunscreens which use zinc oxide or titanium dioxide to physically block rays.',
      commonlyFoundIn: ['Sunscreens', 'Moisturizers with SPF', 'Makeup with SPF', 'Lip balms with SPF', 'After-sun products'],
      whyPeopleAvoid: 'Some chemical UV filters (especially oxybenzone and octinoxate) have been shown to harm coral reefs, leading to bans in Hawaii and other locations. There are also concerns about potential hormone disruption and skin absorption. Some people experience skin irritation from chemical filters.',
      sources: [
        { title: 'EWG - Sunscreen Guide', url: 'https://www.ewg.org/sunscreen/report/the-trouble-with-sunscreen-chemicals/' },
        { title: 'FDA - Sunscreen', url: 'https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun' },
      ],
    },
  
    // Additional alias variations for flexible matching
    'fragrance-free': {
      whatItIs: 'Synthetic fragrances are lab-created scent compounds used to add pleasant smells to products. A single "fragrance" or "parfum" listing on a label can contain dozens to hundreds of individual chemical ingredients, many of which manufacturers aren\'t required to disclose.',
      commonlyFoundIn: ['Perfumes and colognes', 'Lotions and creams', 'Shampoos and conditioners', 'Laundry detergents', 'Household cleaners', 'Candles', 'Air fresheners', 'Deodorants'],
      whyPeopleAvoid: 'Synthetic fragrances can trigger allergic reactions, headaches, respiratory issues, and skin irritation. Some fragrance chemicals are potential endocrine disruptors. People with asthma, migraines, multiple chemical sensitivity, or skin conditions like eczema often need to avoid synthetic fragrances.',
      sources: [
        { title: 'EWG - Fragrance', url: 'https://www.ewg.org/the-toxic-twelve-chemicals-and-contaminants-in-cosmetics#702702' },
        { title: 'AAD - Fragrance Allergy', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/care/fragrance-allergy' },
      ],
    },
    'paraben-free': {
      whatItIs: 'Parabens are synthetic preservatives used to prevent bacterial and fungal growth in products. Common types include methylparaben, propylparaben, butylparaben, and ethylparaben. They\'ve been used in cosmetics and personal care products since the 1920s.',
      commonlyFoundIn: ['Moisturizers', 'Shampoos and conditioners', 'Makeup', 'Shaving products', 'Sunscreens', 'Toothpaste', 'Some food products', 'Pharmaceuticals'],
      whyPeopleAvoid: 'Parabens can mimic estrogen in the body and are classified as potential endocrine disruptors. Studies have found parabens in breast cancer tissue, though a direct causal link hasn\'t been established. Some people experience skin irritation or allergic reactions. The EU has restricted certain parabens in cosmetics.',
      sources: [
        { title: 'FDA - Parabens in Cosmetics', url: 'https://www.fda.gov/cosmetics/cosmetic-ingredients/parabens-cosmetics' },
        { title: 'EWG - Parabens', url: 'https://www.ewg.org/what-are-parabens' },
      ],
    },
    'sulfate-free': {
      whatItIs: 'Sulfates are surfactants (cleaning agents) that create lather and help remove oil and dirt. The most common are sodium lauryl sulfate (SLS) and sodium laureth sulfate (SLES). They\'re effective cleansers but can be harsh, especially for sensitive skin and hair.',
      commonlyFoundIn: ['Shampoos', 'Body washes', 'Face cleansers', 'Toothpaste', 'Dish soap', 'Laundry detergent', 'Bubble bath', 'Hand soap'],
      whyPeopleAvoid: 'Sulfates can strip natural oils from skin and hair, causing dryness, irritation, and frizz. People with eczema, rosacea, or sensitive skin often find sulfates too harsh. Those with color-treated or curly hair avoid sulfates to maintain moisture and color longevity.',
      sources: [
        { title: 'Cleveland Clinic - Sulfates', url: 'https://health.clevelandclinic.org/sulfates' },
        { title: 'AAD - Caring for Sensitive Skin', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/sensitive/sensitive-skin-care' },
      ],
    },
    'phthalate-free': {
      whatItIs: 'Phthalates are a group of chemicals used to make plastics more flexible and to help fragrances last longer. They\'re often hidden under the term "fragrance" on ingredient labels. Common types include DEP, DBP, and DEHP.',
      commonlyFoundIn: ['Fragranced products', 'Nail polish', 'Hair spray', 'Plastic containers', 'Vinyl flooring', 'Shower curtains', 'Personal care products', 'Some medications'],
      whyPeopleAvoid: 'Phthalates are known endocrine disruptors linked to reproductive issues, developmental problems in children, and potential hormonal effects. Several phthalates are banned in children\'s products in the US and EU. People trying to reduce their chemical exposure often prioritize avoiding phthalates.',
      sources: [
        { title: 'CDC - Phthalates Factsheet', url: 'https://www.cdc.gov/biomonitoring/Phthalates_FactSheet.html' },
        { title: 'NIH - Phthalates', url: 'https://www.niehs.nih.gov/health/topics/agents/endocrine' },
      ],
    },
    'alcohol-free': {
      whatItIs: 'Drying alcohols are short-chain alcohols that evaporate quickly and can strip moisture from skin. Common drying alcohols include SD alcohol, denatured alcohol, alcohol denat, isopropyl alcohol, and ethanol. They\'re different from fatty alcohols which are moisturizing.',
      commonlyFoundIn: ['Toners', 'Astringents', 'Acne treatments', 'Hand sanitizers', 'Hair sprays', 'Aftershaves', 'Some moisturizers', 'Makeup setting sprays'],
      whyPeopleAvoid: 'Drying alcohols can disrupt the skin barrier, cause dryness and irritation, and may worsen conditions like eczema or rosacea. While they can help products absorb quickly and feel lightweight, the long-term effects of stripping natural oils can be counterproductive for skin health.',
      sources: [
        { title: 'Paula\'s Choice - Alcohol in Skincare', url: 'https://www.paulaschoice.com/expert-advice/skincare-advice/basic-skin-care-tips/alcohol-in-skincare-the-facts.html' },
        { title: 'Healthline - Alcohol in Skincare', url: 'https://www.healthline.com/health/alcohol-on-skin' },
      ],
    },
    'clean-beauty': {
      whatItIs: 'Clean beauty refers to products made without ingredients considered potentially harmful or toxic. While there\'s no official definition, clean beauty typically excludes parabens, sulfates, phthalates, synthetic fragrances, formaldehyde, and other controversial ingredients.',
      commonlyFoundIn: ['Conventional cosmetics', 'Conventional skincare', 'Hair care products', 'Personal care items'],
      whyPeopleAvoid: 'People choose clean beauty to reduce exposure to synthetic chemicals, potential endocrine disruptors, and irritating ingredients. Those with sensitive skin, allergies, or health concerns often find cleaner formulations work better for them.',
      sources: [
        { title: 'Healthline - Clean Beauty', url: 'https://www.healthline.com/health/beauty-skin-care/clean-beauty' },
        { title: 'EWG - Skin Deep Database', url: 'https://www.ewg.org/skindeep/' },
      ],
    },
    'no-drying-alcohols': {
      whatItIs: 'Drying alcohols are short-chain alcohols that evaporate quickly and can strip moisture from skin. Common drying alcohols include SD alcohol, denatured alcohol, alcohol denat, isopropyl alcohol, and ethanol. They\'re different from fatty alcohols which are moisturizing.',
      commonlyFoundIn: ['Toners', 'Astringents', 'Acne treatments', 'Hand sanitizers', 'Hair sprays', 'Aftershaves', 'Some moisturizers', 'Makeup setting sprays'],
      whyPeopleAvoid: 'Drying alcohols can disrupt the skin barrier, cause dryness and irritation, and may worsen conditions like eczema or rosacea. While they can help products absorb quickly and feel lightweight, the long-term effects of stripping natural oils can be counterproductive for skin health.',
      sources: [
        { title: 'Paula\'s Choice - Alcohol in Skincare', url: 'https://www.paulaschoice.com/expert-advice/skincare-advice/basic-skin-care-tips/alcohol-in-skincare-the-facts.html' },
        { title: 'Healthline - Alcohol in Skincare', url: 'https://www.healthline.com/health/alcohol-on-skin' },
      ],
    },
    'no-bha-bht': {
      whatItIs: 'BHA (butylated hydroxyanisole) and BHT (butylated hydroxytoluene) are synthetic antioxidants used to prevent fats and oils from going rancid. They extend the shelf life of many processed foods and cosmetic products.',
      commonlyFoundIn: ['Cereal', 'Chewing gum', 'Snack foods', 'Butter and lard', 'Baked goods', 'Cosmetics', 'Rubber and petroleum products'],
      whyPeopleAvoid: 'BHA is listed as "reasonably anticipated to be a human carcinogen" by the National Toxicology Program. Both may have endocrine-disrupting effects. California requires cancer warning labels for BHA. Many people choose products preserved with natural alternatives like vitamin E.',
      sources: [
        { title: 'NTP - BHA Report', url: 'https://ntp.niehs.nih.gov/ntp/roc/content/profiles/butylatedhydroxyanisole.pdf' },
        { title: 'EWG - BHA & BHT', url: 'https://www.ewg.org/foodscores/content/natural-vs-artificial-preservatives' },
      ],
    },
    'no-sodium-benzoate': {
      whatItIs: 'Sodium benzoate is a preservative used to prevent the growth of bacteria, yeast, and mold in acidic products. It\'s often used in combination with other preservatives and is particularly effective in foods with low pH levels.',
      commonlyFoundIn: ['Soft drinks', 'Fruit juices', 'Pickles', 'Salad dressings', 'Condiments', 'Jams and jellies', 'Mouthwash', 'Some medications'],
      whyPeopleAvoid: 'When combined with vitamin C (ascorbic acid), sodium benzoate can form benzene, a known carcinogen. Some studies suggest it may increase hyperactivity in children. People with sensitivities may experience allergic reactions, and some prefer to avoid synthetic preservatives generally.',
      sources: [
        { title: 'FDA - Benzene in Beverages', url: 'https://www.fda.gov/food/chemical-contaminants-food/questions-and-answers-occurrence-benzene-soft-drinks-and-other-beverages' },
        { title: 'PubMed - Sodium Benzoate Safety', url: 'https://pubmed.ncbi.nlm.nih.gov/17825880/' },
      ],
    },
    'no-hfcs': {
      whatItIs: 'High-fructose corn syrup (HFCS) is a sweetener made from corn starch that has been processed to convert some glucose into fructose. It became popular in the 1970s as a cheaper alternative to sugar in processed foods and beverages.',
      commonlyFoundIn: ['Soft drinks', 'Fruit juices', 'Candy', 'Bread', 'Condiments', 'Cereals', 'Yogurt', 'Salad dressings'],
      whyPeopleAvoid: 'HFCS has been associated with obesity, diabetes, and metabolic syndrome in some studies. While the debate continues about whether it\'s worse than regular sugar, many people avoid it as part of reducing overall added sugar intake or preferring less processed sweeteners.',
      sources: [
        { title: 'Harvard Health - HFCS', url: 'https://www.health.harvard.edu/heart-health/the-sweet-danger-of-sugar' },
        { title: 'Mayo Clinic - HFCS', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/high-fructose-corn-syrup/faq-20058201' },
      ],
    },
    'no-high-fructose-corn-syrup': {
      whatItIs: 'High-fructose corn syrup (HFCS) is a sweetener made from corn starch that has been processed to convert some glucose into fructose. It became popular in the 1970s as a cheaper alternative to sugar in processed foods and beverages.',
      commonlyFoundIn: ['Soft drinks', 'Fruit juices', 'Candy', 'Bread', 'Condiments', 'Cereals', 'Yogurt', 'Salad dressings'],
      whyPeopleAvoid: 'HFCS has been associated with obesity, diabetes, and metabolic syndrome in some studies. While the debate continues about whether it\'s worse than regular sugar, many people avoid it as part of reducing overall added sugar intake or preferring less processed sweeteners.',
      sources: [
        { title: 'Harvard Health - HFCS', url: 'https://www.health.harvard.edu/heart-health/the-sweet-danger-of-sugar' },
        { title: 'Mayo Clinic - HFCS', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/high-fructose-corn-syrup/faq-20058201' },
      ],
    },
    'egg-free': {
      whatItIs: 'Eggs and egg derivatives include whole eggs, egg whites, egg yolks, albumin, lysozyme, mayonnaise, meringue, and lecithin (when derived from eggs). They\'re used in baked goods, sauces, and many processed foods.',
      commonlyFoundIn: ['Baked goods', 'Mayonnaise', 'Pasta', 'Ice cream', 'Marshmallows', 'Salad dressings', 'Some vaccines', 'Cosmetics'],
      whyPeopleAvoid: 'Egg allergies are one of the most common food allergies, especially in children. Symptoms can range from mild skin reactions to severe anaphylaxis. Some people also avoid eggs for ethical reasons (veganism) or due to cholesterol concerns.',
      sources: [
        { title: 'ACAAI - Egg Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/egg/' },
        { title: 'Mayo Clinic - Egg Allergy', url: 'https://www.mayoclinic.org/diseases-conditions/egg-allergy/symptoms-causes/syc-20372115' },
      ],
    },
    'shellfish-free': {
      whatItIs: 'Shellfish include crustaceans (shrimp, crab, lobster, crawfish) and mollusks (clams, mussels, oysters, scallops, squid, octopus). Shellfish derivatives can appear in foods, supplements, and even some cosmetics.',
      commonlyFoundIn: ['Seafood dishes', 'Asian cuisine', 'Caesar dressing', 'Worcestershire sauce', 'Glucosamine supplements', 'Some cosmetics', 'Fish sauce'],
      whyPeopleAvoid: 'Shellfish allergy is one of the most common and potentially severe food allergies in adults. It typically develops in adulthood and is usually lifelong. Reactions can range from hives to life-threatening anaphylaxis.',
      sources: [
        { title: 'ACAAI - Shellfish Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/shellfish/' },
        { title: 'FARE - Shellfish Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/shellfish' },
      ],
    },
    'peanut-free': {
      whatItIs: 'Peanuts are legumes (not tree nuts) that can cause severe allergic reactions. Peanut derivatives include peanut oil, peanut flour, peanut butter, and arachis hypogaea (the scientific name often used in cosmetics).',
      commonlyFoundIn: ['Peanut butter', 'Candy and chocolate', 'Baked goods', 'Asian dishes', 'Sauces', 'Ice cream', 'Some cosmetics and skincare'],
      whyPeopleAvoid: 'Peanut allergy is one of the most common causes of food-related anaphylaxis and can be fatal. Even trace amounts can trigger severe reactions in sensitive individuals. Unlike some allergies, peanut allergy is usually lifelong.',
      sources: [
        { title: 'ACAAI - Peanut Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/peanut/' },
        { title: 'FARE - Peanut Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/peanut' },
      ],
    },
    'wheat-free': {
      whatItIs: 'Wheat and wheat derivatives include flour, bread, pasta, bulgur, couscous, semolina, spelt, farro, and many processed foods. Wheat is different from gluten - wheat-free products may still contain gluten from barley or rye.',
      commonlyFoundIn: ['Bread and baked goods', 'Pasta', 'Cereals', 'Beer', 'Soy sauce', 'Processed meats', 'Soups and sauces', 'Some cosmetics'],
      whyPeopleAvoid: 'Wheat allergy is an immune reaction to proteins in wheat (different from celiac disease). Symptoms can include hives, difficulty breathing, nausea, and anaphylaxis. Some people also have wheat sensitivity without a true allergy.',
      sources: [
        { title: 'ACAAI - Wheat Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/wheat-gluten/' },
        { title: 'Mayo Clinic - Wheat Allergy', url: 'https://www.mayoclinic.org/diseases-conditions/wheat-allergy/symptoms-causes/syc-20378897' },
      ],
    },
    'sesame-free': {
      whatItIs: 'Sesame appears as sesame seeds, sesame oil, tahini, and halvah. As of 2023, sesame is the 9th major food allergen that must be labeled in the US. It\'s common in Middle Eastern, Asian, and African cuisines.',
      commonlyFoundIn: ['Hummus and tahini', 'Bread and bagels', 'Asian dishes', 'Salad dressings', 'Falafel', 'Some cosmetics and soaps'],
      whyPeopleAvoid: 'Sesame allergy is increasing and can cause severe reactions including anaphylaxis. It\'s now recognized as a major allergen requiring clear labeling. Cross-contamination is common in restaurants and food processing.',
      sources: [
        { title: 'FARE - Sesame Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/sesame' },
        { title: 'FDA - Sesame Labeling', url: 'https://www.fda.gov/food/food-allergies/sesame-allergy' },
      ],
    },
    'corn-free': {
      whatItIs: 'Corn and corn derivatives include corn starch, corn syrup, high-fructose corn syrup, corn oil, dextrose, maltodextrin, and many food additives. Corn is used in thousands of products and can be difficult to avoid.',
      commonlyFoundIn: ['Soft drinks', 'Candy', 'Baked goods', 'Processed foods', 'Medications', 'Vitamins', 'Paper products', 'Adhesives'],
      whyPeopleAvoid: 'Corn allergy or intolerance can cause digestive issues, skin reactions, and respiratory problems. Because corn derivatives are so ubiquitous, avoiding corn requires careful label reading and often requires avoiding many processed foods entirely.',
      sources: [
        { title: 'ACAAI - Corn Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/corn/' },
        { title: 'Healthline - Corn Allergy', url: 'https://www.healthline.com/health/allergies/corn' },
      ],
    },
    'kosher': {
      whatItIs: 'Kosher refers to foods that comply with Jewish dietary laws (kashrut). Kosher certification ensures products meet specific requirements including the separation of meat and dairy, prohibition of certain animals, and proper slaughter methods.',
      commonlyFoundIn: ['Products with kosher certification symbols (OU, OK, Star-K, etc.)'],
      whyPeopleAvoid: 'People seek kosher products for religious observance, perceived quality control, or specific dietary needs. Kosher certification can also help those avoiding certain ingredients, as it requires clear identification of dairy and meat products.',
      sources: [
        { title: 'OU Kosher - What is Kosher', url: 'https://oukosher.org/the-kosher-primer/' },
        { title: 'Star-K - Kosher Basics', url: 'https://www.star-k.org/articles/kashrus-kurrents/28/kosher-basics/' },
      ],
    },
    'halal': {
      whatItIs: 'Halal refers to foods permissible under Islamic dietary laws. This includes requirements for animal slaughter, prohibition of pork and alcohol, and avoidance of certain additives derived from non-halal sources.',
      commonlyFoundIn: ['Products with halal certification'],
      whyPeopleAvoid: 'Muslims seek halal products for religious compliance. Others may choose halal for the specific slaughter methods or to avoid certain ingredients like alcohol-based additives.',
      sources: [
        { title: 'Islamic Food and Nutrition Council', url: 'https://www.ifanca.org/pages/whatIsHalal.jsp' },
        { title: 'Halal Certification Services', url: 'https://www.halalcertificationservices.com/what-is-halal/' },
      ],
    },
    'non-gmo': {
      whatItIs: 'Non-GMO products are made without genetically modified organisms. GMOs are plants or animals whose genetic material has been altered using genetic engineering techniques that do not occur naturally.',
      commonlyFoundIn: ['Corn', 'Soy', 'Cotton (cottonseed oil)', 'Canola', 'Sugar beets', 'Papaya', 'Zucchini', 'Some dairy products'],
      whyPeopleAvoid: 'People avoid GMOs due to environmental concerns (impact on biodiversity, pesticide use), potential unknown health effects, preference for traditional agriculture methods, or desire for more "natural" foods.',
      sources: [
        { title: 'Non-GMO Project', url: 'https://www.nongmoproject.org/gmo-facts/' },
        { title: 'FDA - GMOs', url: 'https://www.fda.gov/food/agricultural-biotechnology/how-gmos-are-regulated-united-states' },
      ],
    },
    'keto': {
      whatItIs: 'Keto-friendly products are low in carbohydrates and sugar to support a ketogenic diet, which puts the body into ketosis - a metabolic state where fat is burned for energy instead of carbohydrates.',
      commonlyFoundIn: ['Bread and pasta (high-carb versions)', 'Sugar', 'Most fruits', 'Starchy vegetables', 'Grains', 'Most beans and legumes'],
      whyPeopleAvoid: 'People follow keto diets for weight loss, blood sugar management, improved mental clarity, or management of certain medical conditions like epilepsy. The diet requires avoiding high-carb foods.',
      sources: [
        { title: 'Harvard Health - Keto Diet', url: 'https://www.health.harvard.edu/staying-healthy/should-you-try-the-keto-diet' },
        { title: 'Mayo Clinic - Keto Diet', url: 'https://www.mayoclinic.org/healthy-lifestyle/weight-loss/in-depth/low-carb-diet/art-20045831' },
      ],
    },
    'paleo': {
      whatItIs: 'Paleo-friendly products align with the Paleolithic diet, which focuses on foods similar to what might have been eaten during the Paleolithic era. It emphasizes whole foods and excludes processed foods, grains, legumes, and dairy.',
      commonlyFoundIn: ['Grains', 'Legumes', 'Dairy', 'Refined sugar', 'Processed foods', 'Vegetable oils', 'Artificial sweeteners'],
      whyPeopleAvoid: 'Paleo dieters believe that eating like our ancestors promotes better health. They avoid foods that became common after farming developed, theorizing that our bodies haven\'t fully adapted to modern agricultural foods.',
      sources: [
        { title: 'Mayo Clinic - Paleo Diet', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/paleo-diet/art-20111182' },
        { title: 'Harvard Health - Paleo Diet', url: 'https://www.health.harvard.edu/healthy-eating/diet-review-paleo-diet-for-weight-loss' },
      ],
    },
    'low-fodmap': {
      whatItIs: 'Low-FODMAP products are low in fermentable oligosaccharides, disaccharides, monosaccharides, and polyols - short-chain carbohydrates that can cause digestive issues in sensitive individuals, especially those with IBS.',
      commonlyFoundIn: ['Wheat', 'Onions and garlic', 'Certain fruits (apples, pears)', 'Dairy with lactose', 'Legumes', 'Sugar alcohols', 'Honey'],
      whyPeopleAvoid: 'The low-FODMAP diet is clinically proven to help manage IBS symptoms. It\'s often used as an elimination diet to identify specific trigger foods, then gradually reintroduce foods to determine individual tolerance.',
      sources: [
        { title: 'Monash University FODMAP', url: 'https://www.monashfodmap.com/about-fodmap-and-ibs/' },
        { title: 'Johns Hopkins - FODMAP Diet', url: 'https://www.hopkinsmedicine.org/health/wellness-and-prevention/fodmap-diet-what-you-need-to-know' },
      ],
    },
  
    // Additional chemicals and additives
    'bpa': {
      whatItIs: 'BPA (Bisphenol A) is a chemical used to make polycarbonate plastics and epoxy resins. BPS (Bisphenol S) is a common replacement that may have similar concerns. These chemicals can leach from containers into food and beverages, especially when heated.',
      commonlyFoundIn: ['Plastic bottles', 'Food can linings', 'Receipt paper', 'Plastic containers', 'Water bottles', 'Baby bottles (historically)', 'Food storage containers', 'Dental sealants'],
      whyPeopleAvoid: 'BPA is an endocrine disruptor that can mimic estrogen in the body. Studies link it to reproductive issues, heart disease, diabetes, and developmental problems in children. While BPS was introduced as a "safer" alternative, research suggests it may have similar hormonal effects.',
      sources: [
        { title: 'NIH - Bisphenol A', url: 'https://www.niehs.nih.gov/health/topics/agents/sya-bpa' },
        { title: 'FDA - BPA', url: 'https://www.fda.gov/food/food-additives-petitions/bisphenol-bpa-use-food-contact-application' },
        { title: 'Mayo Clinic - BPA', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/bpa/faq-20058331' },
      ],
    },
    'bpa-bps': {
      whatItIs: 'BPA (Bisphenol A) and BPS (Bisphenol S) are industrial chemicals used in plastics and resins. BPS was developed as a BPA replacement but research shows it may have similar endocrine-disrupting properties.',
      commonlyFoundIn: ['Plastic bottles', 'Food can linings', 'Receipt paper', 'Plastic containers', 'Water bottles', 'Food storage containers', 'Some dental materials'],
      whyPeopleAvoid: 'Both BPA and BPS are endocrine disruptors linked to hormonal imbalances, reproductive issues, and developmental concerns. Many people seek products labeled "BPA-free" but experts recommend also avoiding BPS since it may pose similar risks.',
      sources: [
        { title: 'NIH - Bisphenol A', url: 'https://www.niehs.nih.gov/health/topics/agents/sya-bpa' },
        { title: 'Environmental Health Perspectives', url: 'https://ehp.niehs.nih.gov/doi/10.1289/ehp.1408989' },
      ],
    },
    'oxybenzone': {
      whatItIs: 'Oxybenzone (benzophenone-3) is a chemical UV filter used in sunscreens to absorb UVB and short UVA rays. It\'s one of the most commonly used sunscreen ingredients in the US but has faced increasing scrutiny.',
      commonlyFoundIn: ['Sunscreens', 'Moisturizers with SPF', 'Lip balms with SPF', 'Makeup with SPF', 'Hair products with UV protection', 'Nail polish'],
      whyPeopleAvoid: 'Oxybenzone is a known endocrine disruptor that can be absorbed through skin into the bloodstream. It\'s been linked to coral reef bleaching, leading to bans in Hawaii and other locations. Studies show it may affect hormone function and cause allergic skin reactions.',
      sources: [
        { title: 'EWG - Oxybenzone', url: 'https://www.ewg.org/sunscreen/report/the-trouble-with-sunscreen-chemicals/' },
        { title: 'FDA - Sunscreen Safety', url: 'https://www.fda.gov/news-events/press-announcements/fda-advances-new-proposed-regulation-make-sure-sunscreens-are-safe-and-effective' },
        { title: 'NOAA - Sunscreen and Coral', url: 'https://oceanservice.noaa.gov/news/sunscreen-702702.html' },
      ],
    },
    'nitrates': {
      whatItIs: 'Nitrates and nitrites are preservatives used to cure meats and prevent bacterial growth. They give cured meats their pink color and distinctive flavor. When cooked at high heat, they can form nitrosamines, which are potentially carcinogenic.',
      commonlyFoundIn: ['Bacon', 'Hot dogs', 'Deli meats', 'Ham', 'Sausages', 'Beef jerky', 'Cured fish', 'Some cheeses'],
      whyPeopleAvoid: 'The World Health Organization classifies processed meats (which typically contain nitrates) as carcinogenic. Nitrosamines formed during cooking are linked to increased cancer risk. Some people also experience migraines or other reactions to nitrates.',
      sources: [
        { title: 'WHO - Processed Meat', url: 'https://www.who.int/news-room/questions-and-answers/item/cancer-carcinogenicity-of-the-consumption-of-red-meat-and-processed-meat' },
        { title: 'American Cancer Society - Processed Meat', url: 'https://www.cancer.org/cancer/risk-prevention/diet-physical-activity/does-eating-processed-or-red-meat-cause-cancer.html' },
      ],
    },
    'nitrites': {
      whatItIs: 'Nitrites (and nitrates) are chemical compounds used as preservatives in cured and processed meats. They prevent bacterial growth, especially botulism, and give processed meats their characteristic color and taste.',
      commonlyFoundIn: ['Bacon', 'Hot dogs', 'Deli meats', 'Ham', 'Sausages', 'Salami', 'Pepperoni', 'Corned beef'],
      whyPeopleAvoid: 'When heated or combined with stomach acids, nitrites can form nitrosamines, which are carcinogenic. Processed meats containing nitrites are classified as Group 1 carcinogens by WHO. Some people with migraines find nitrites trigger headaches.',
      sources: [
        { title: 'WHO - Red and Processed Meat', url: 'https://www.who.int/news-room/questions-and-answers/item/cancer-carcinogenicity-of-the-consumption-of-red-meat-and-processed-meat' },
        { title: 'Harvard Health - Nitrates', url: 'https://www.health.harvard.edu/staying-healthy/the-truth-about-nitrites-and-nitrates' },
      ],
    },
    'artificial-flavors': {
      whatItIs: 'Artificial flavors are synthetic chemical compounds designed to mimic natural flavors. A single artificial flavor can contain dozens of chemical ingredients. They\'re created in labs to be more stable and cost-effective than natural alternatives.',
      commonlyFoundIn: ['Candy', 'Soft drinks', 'Chips and snacks', 'Ice cream', 'Baked goods', 'Cereals', 'Yogurt', 'Processed foods'],
      whyPeopleAvoid: 'Some artificial flavors may contain allergens or cause sensitivities. People prefer natural flavors for perceived health benefits and to avoid synthetic chemicals. Some artificial flavors have been linked to behavioral issues in children or allergic reactions.',
      sources: [
        { title: 'FDA - Flavors', url: 'https://www.fda.gov/food/food-ingredients-packaging/food-flavoring-and-flavorings' },
        { title: 'EWG - Artificial Flavors', url: 'https://www.ewg.org/foodscores/content/natural-vs-artificial-flavors' },
      ],
    },
    'carrageenan': {
      whatItIs: 'Carrageenan is a thickener and stabilizer extracted from red seaweed. It\'s used to improve texture in foods and personal care products. There are food-grade and degraded forms, with concerns mainly about the degraded type.',
      commonlyFoundIn: ['Non-dairy milk alternatives', 'Ice cream', 'Yogurt', 'Deli meats', 'Infant formula', 'Protein shakes', 'Toothpaste', 'Some medications'],
      whyPeopleAvoid: 'Research suggests carrageenan may cause inflammation and digestive issues in some people. Some studies link it to intestinal problems, though results are debated. People with IBS or digestive sensitivities often report improvements after eliminating carrageenan.',
      sources: [
        { title: 'NIH - Carrageenan', url: 'https://pubmed.ncbi.nlm.nih.gov/17008019/' },
        { title: 'Cornucopia Institute - Carrageenan', url: 'https://www.cornucopia.org/carrageenan-how-a-natural-food-additive-is-making-us-sick/' },
      ],
    },
    'citric-acid': {
      whatItIs: 'Citric acid is an organic acid naturally found in citrus fruits but is now mostly manufactured through fermentation of sugars using the mold Aspergillus niger. It\'s used as a preservative, flavor enhancer, and pH adjuster.',
      commonlyFoundIn: ['Soft drinks', 'Candy', 'Canned foods', 'Frozen foods', 'Skincare products', 'Cleaning products', 'Medications', 'Wine'],
      whyPeopleAvoid: 'Manufactured citric acid (MCA) may contain trace mold residues that trigger reactions in sensitive individuals. Some people experience digestive upset, mouth irritation, or skin reactions. Those with mold sensitivities or severe citrus allergies may need to avoid it.',
      sources: [
        { title: 'Healthline - Citric Acid', url: 'https://www.healthline.com/nutrition/citric-acid' },
        { title: 'PubMed - Manufactured Citric Acid', url: 'https://pubmed.ncbi.nlm.nih.gov/30183916/' },
      ],
    },
    'food-dyes': {
      whatItIs: 'Food dyes are synthetic colorings derived from petroleum used to enhance the visual appeal of food products. Common dyes include Red 40, Yellow 5, Yellow 6, Blue 1, Blue 2, and Green 3. Each is identified by a color and number.',
      commonlyFoundIn: ['Candy', 'Breakfast cereals', 'Soft drinks', 'Sports drinks', 'Baked goods', 'Ice cream', 'Macaroni and cheese', 'Pickles'],
      whyPeopleAvoid: 'Studies link food dyes to hyperactivity and behavioral issues in some children. Some dyes are banned in other countries. Red 3 has been linked to cancer in animal studies. Many people experience allergic reactions or sensitivities to specific dyes.',
      sources: [
        { title: 'CSPI - Food Dyes Report', url: 'https://www.cspinet.org/eating-healthy/ingredients-of-concern/food-dyes' },
        { title: 'FDA - Color Additives', url: 'https://www.fda.gov/industry/color-additives' },
        { title: 'AAP - Food Additives', url: 'https://publications.aap.org/pediatrics/article/142/2/e20181408/37584' },
      ],
    },
    'gums': {
      whatItIs: 'Gums and fillers are thickening and stabilizing agents used to improve texture, extend shelf life, and reduce costs. Common types include xanthan gum, guar gum, carrageenan, cellulose gum, and locust bean gum.',
      commonlyFoundIn: ['Ice cream', 'Salad dressings', 'Gluten-free products', 'Non-dairy milk', 'Yogurt', 'Sauces', 'Baked goods', 'Supplements'],
      whyPeopleAvoid: 'Gums can cause digestive issues like bloating, gas, and diarrhea in sensitive individuals. People with IBS or SIBO often find relief by avoiding gums. Some gums may interfere with nutrient absorption or cause allergic reactions.',
      sources: [
        { title: 'Healthline - Xanthan Gum', url: 'https://www.healthline.com/nutrition/xanthan-gum' },
        { title: 'Harvard Health - Food Additives', url: 'https://www.health.harvard.edu/staying-healthy/the-lowdown-on-gut-health-food-additives' },
      ],
    },
    'fillers': {
      whatItIs: 'Fillers are ingredients added to products to increase volume or bulk without adding significant nutritional value or active ingredients. In supplements, they can include cellulose, maltodextrin, silicon dioxide, and magnesium stearate.',
      commonlyFoundIn: ['Supplements', 'Processed foods', 'Protein powders', 'Baked goods', 'Medications', 'Cosmetics'],
      whyPeopleAvoid: 'Fillers can reduce the potency of supplements, cause digestive issues, or contain allergens. Some fillers like maltodextrin can spike blood sugar. People seeking cleaner products prefer minimal or no fillers.',
      sources: [
        { title: 'ConsumerLab - Supplement Additives', url: 'https://www.consumerlab.com/answers/what-are-common-fillers-additives-in-supplements/supplement-additives/' },
        { title: 'Healthline - Maltodextrin', url: 'https://www.healthline.com/nutrition/maltodextrin' },
      ],
    },
    'bleached-fabrics': {
      whatItIs: 'Bleached fabrics are textiles treated with chlorine bleach or other whitening agents to achieve a bright white color. The bleaching process can leave chemical residues and may weaken fabric fibers over time.',
      commonlyFoundIn: ['White cotton products', 'Bed sheets', 'Towels', 'Paper products', 'Feminine hygiene products', 'Diapers', 'Cotton balls', 'Bandages'],
      whyPeopleAvoid: 'Bleaching can leave traces of dioxins and other chlorine byproducts, which are environmental pollutants and potential carcinogens. People with sensitive skin may react to bleach residues. Unbleached alternatives are considered more natural and environmentally friendly.',
      sources: [
        { title: 'EPA - Dioxins', url: 'https://www.epa.gov/dioxin' },
        { title: 'FDA - Tampons and Dioxin', url: 'https://www.fda.gov/consumers/consumer-updates/facts-tampons-and-how-use-them-safely' },
      ],
    },
    'microplastics': {
      whatItIs: 'Microplastics are tiny plastic particles less than 5mm in size. In personal care, they appear as microbeads (polyethylene, polypropylene) used for exfoliation. They\'re also found as contamination in food, water, and air from plastic pollution.',
      commonlyFoundIn: ['Exfoliating scrubs', 'Toothpaste', 'Cosmetics', 'Bottled water', 'Seafood', 'Sea salt', 'Beer', 'Honey'],
      whyPeopleAvoid: 'Microplastics don\'t biodegrade and accumulate in oceans, harming marine life. They\'ve been found in human blood, lungs, and placentas. The health effects are still being studied, but concerns include inflammation and potential toxic effects from plastic additives.',
      sources: [
        { title: 'NIH - Microplastics', url: 'https://www.niehs.nih.gov/health/topics/agents/microplastics' },
        { title: 'NOAA - Microplastics', url: 'https://oceanservice.noaa.gov/facts/microplastics.html' },
        { title: 'WHO - Microplastics in Water', url: 'https://www.who.int/news/item/22-08-2019-who-calls-for-more-research-into-microplastics-and-a-crackdown-on-plastic-pollution' },
      ],
    },
    'trans-fat': {
      whatItIs: 'Trans fats are unsaturated fats that have been hydrogenated to make them solid at room temperature. They were widely used in processed foods for their stability and long shelf life. Artificial trans fats are now banned in the US but may still appear in some products.',
      commonlyFoundIn: ['Margarine', 'Fried foods', 'Baked goods', 'Snack foods', 'Coffee creamers', 'Frozen pizza', 'Refrigerated doughs', 'Some imported foods'],
      whyPeopleAvoid: 'Trans fats are strongly linked to heart disease - they raise bad cholesterol (LDL) and lower good cholesterol (HDL). They increase inflammation and insulin resistance. The FDA banned artificial trans fats in 2018, but trace amounts may still appear.',
      sources: [
        { title: 'AHA - Trans Fats', url: 'https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/fats/trans-fat' },
        { title: 'FDA - Trans Fat Ban', url: 'https://www.fda.gov/food/food-additives-petitions/trans-fat' },
        { title: 'Harvard Health - Trans Fats', url: 'https://www.health.harvard.edu/staying-healthy/the-truth-about-fats-bad-and-good' },
      ],
    },
    'trans-fats': {
      whatItIs: 'Trans fats (trans-fatty acids) are created through hydrogenation, which turns liquid oils into solid fats. They increase shelf life but are the most harmful type of dietary fat for cardiovascular health.',
      commonlyFoundIn: ['Margarine', 'Fried foods', 'Baked goods', 'Snack foods', 'Coffee creamers', 'Microwave popcorn', 'Frozen pizza', 'Packaged cookies'],
      whyPeopleAvoid: 'Trans fats significantly increase the risk of heart disease, stroke, and type 2 diabetes. They raise LDL cholesterol while lowering HDL cholesterol. Though largely banned, they may still appear in foods as "partially hydrogenated oils."',
      sources: [
        { title: 'AHA - Trans Fats', url: 'https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/fats/trans-fat' },
        { title: 'WHO - Trans Fats', url: 'https://www.who.int/news-room/questions-and-answers/item/nutrition-trans-fat' },
      ],
    },
    'msg': {
      whatItIs: 'MSG (monosodium glutamate) is a flavor enhancer that adds umami taste to foods. It\'s the sodium salt of glutamic acid, an amino acid naturally present in foods like tomatoes and parmesan cheese.',
      commonlyFoundIn: ['Chinese food', 'Chips and snacks', 'Canned soups', 'Processed meats', 'Instant noodles', 'Salad dressings', 'Fast food', 'Seasoning blends'],
      whyPeopleAvoid: 'Some people report "MSG symptom complex" including headaches, sweating, and numbness, though scientific studies haven\'t consistently confirmed this link. People with migraine triggers or sensitivities may choose to avoid it.',
      sources: [
        { title: 'FDA - MSG', url: 'https://www.fda.gov/food/food-additives-petitions/questions-and-answers-monosodium-glutamate-msg' },
        { title: 'Mayo Clinic - MSG', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/monosodium-glutamate/faq-20058196' },
      ],
    },
    'triclosan': {
      whatItIs: 'Triclosan is an antibacterial and antifungal agent that was widely used in hand soaps, body washes, and toothpaste. The FDA banned it from consumer antiseptic wash products in 2016 but it\'s still found in some products.',
      commonlyFoundIn: ['Some toothpastes', 'Certain cosmetics', 'Some cleaning products', 'Surgical soaps', 'Athletic clothing'],
      whyPeopleAvoid: 'Triclosan is an endocrine disruptor that may affect thyroid function and contribute to antibiotic resistance. Studies link it to hormone disruption and potential liver effects. It accumulates in the environment and in human bodies.',
      sources: [
        { title: 'FDA - Triclosan', url: 'https://www.fda.gov/consumers/consumer-updates/5-things-know-about-triclosan' },
        { title: 'NIH - Triclosan', url: 'https://www.niehs.nih.gov/health/topics/agents/endocrine' },
      ],
    },
    'talc': {
      whatItIs: 'Talc is a naturally occurring mineral used as an absorbent powder and to create a silky texture in cosmetics. It can sometimes be contaminated with asbestos, a known carcinogen, depending on where it\'s mined.',
      commonlyFoundIn: ['Baby powder', 'Face powder', 'Eye shadow', 'Blush', 'Foundation', 'Deodorant', 'Some medications'],
      whyPeopleAvoid: 'Talc contaminated with asbestos is linked to cancer. Even asbestos-free talc has been associated with ovarian cancer in some studies, though this link is debated. Many prefer alternatives like cornstarch or arrowroot powder.',
      sources: [
        { title: 'American Cancer Society - Talcum Powder', url: 'https://www.cancer.org/cancer/risk-prevention/chemicals/talcum-powder-and-cancer.html' },
        { title: 'FDA - Talc', url: 'https://www.fda.gov/cosmetics/cosmetic-ingredients/talc' },
      ],
    },
    'palm-oil': {
      whatItIs: 'Palm oil is a vegetable oil derived from the fruit of oil palms. It\'s the most widely produced vegetable oil in the world, valued for its versatility, stability, and low cost. It appears under many names on ingredient lists.',
      commonlyFoundIn: ['Processed foods', 'Cookies and crackers', 'Chocolate', 'Ice cream', 'Margarine', 'Soaps', 'Cosmetics', 'Biofuels'],
      whyPeopleAvoid: 'Palm oil production is a major driver of deforestation, destroying rainforests and threatening endangered species like orangutans. It also contributes to climate change and human rights issues in producing regions. Some seek sustainable (RSPO-certified) palm oil as a compromise.',
      sources: [
        { title: 'WWF - Palm Oil', url: 'https://www.worldwildlife.org/industries/palm-oil' },
        { title: 'Rainforest Foundation - Palm Oil', url: 'https://www.rainforestfoundation.org/our-work/areas-of-focus/deforestation-commodities-palm-oil/' },
      ],
    },
    'sodium-benzoate': {
      whatItIs: 'Sodium benzoate is a preservative used to prevent the growth of bacteria, yeast, and mold in acidic products. It\'s often used in combination with other preservatives and is particularly effective in foods with low pH levels.',
      commonlyFoundIn: ['Soft drinks', 'Fruit juices', 'Pickles', 'Salad dressings', 'Condiments', 'Jams and jellies', 'Mouthwash', 'Some medications'],
      whyPeopleAvoid: 'When combined with vitamin C (ascorbic acid), sodium benzoate can form benzene, a known carcinogen. Some studies suggest it may increase hyperactivity in children. People with sensitivities may experience allergic reactions.',
      sources: [
        { title: 'FDA - Benzene in Beverages', url: 'https://www.fda.gov/food/chemical-contaminants-food/questions-and-answers-occurrence-benzene-soft-drinks-and-other-beverages' },
        { title: 'PubMed - Sodium Benzoate', url: 'https://pubmed.ncbi.nlm.nih.gov/17825880/' },
      ],
    },
    'propylene-glycol': {
      whatItIs: 'Propylene glycol is a synthetic liquid used as a solvent, humectant, and preservative. It\'s considered "generally recognized as safe" by the FDA but is also used in industrial applications like antifreeze.',
      commonlyFoundIn: ['Ice cream', 'Salad dressings', 'Soft drinks', 'Cosmetics', 'Medications', 'E-cigarettes', 'Deodorants', 'Lotions'],
      whyPeopleAvoid: 'Some people experience skin irritation or allergic reactions. High doses in animal studies have shown kidney and liver effects. People prefer to minimize exposure to synthetic chemicals or worry about its industrial uses.',
      sources: [
        { title: 'EWG - Propylene Glycol', url: 'https://www.ewg.org/skindeep/ingredients/705315-PROPYLENE_GLYCOL/' },
        { title: 'Healthline - Propylene Glycol', url: 'https://www.healthline.com/nutrition/propylene-glycol' },
      ],
    },
    'polysorbates': {
      whatItIs: 'Polysorbates are emulsifiers that help mix oil and water. Common types include Polysorbate 20, 60, and 80. They\'re used to improve texture and stability in food and cosmetics.',
      commonlyFoundIn: ['Ice cream', 'Salad dressings', 'Baked goods', 'Cosmetics', 'Medications', 'Vaccines', 'Vitamins'],
      whyPeopleAvoid: 'Some research suggests polysorbates may affect gut bacteria and intestinal lining, potentially contributing to inflammation. They may cause allergic reactions in sensitive individuals. Some prefer products with simpler ingredient lists.',
      sources: [
        { title: 'NIH - Polysorbate 80', url: 'https://pubmed.ncbi.nlm.nih.gov/25731162/' },
        { title: 'Healthline - Polysorbate 80', url: 'https://www.healthline.com/nutrition/polysorbate-80' },
      ],
    },
    'seed-oils': {
      whatItIs: 'Seed oils (also called vegetable oils) are extracted from seeds of plants like soybeans, corn, canola, sunflower, and safflower. They\'re high in omega-6 fatty acids and are heavily processed using high heat and chemical solvents.',
      commonlyFoundIn: ['Fried foods', 'Packaged snacks', 'Salad dressings', 'Mayonnaise', 'Margarine', 'Baked goods', 'Restaurant food'],
      whyPeopleAvoid: 'Seed oils are high in omega-6 fatty acids, which may promote inflammation when consumed in excess. The processing can create harmful compounds. Some people following ancestral or low-inflammation diets avoid them in favor of olive oil, coconut oil, or animal fats.',
      sources: [
        { title: 'Harvard Health - Omega-6', url: 'https://www.health.harvard.edu/newsletter_article/no-need-to-avoid-healthy-omega-6-fats' },
        { title: 'NIH - Seed Oils Review', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7468872/' },
      ],
    },
    'enaj-baseline': {
      whatItIs: 'The Enaj Non-Toxic Baseline is for people who want to live a healthier lifestyle but aren\'t sure exactly what to avoid yet. It\'s a curated list of the most commonly flagged toxic and harmful ingredients that health-conscious people typically avoid. Enable this one preference and Enaj will monitor for all of them across every product you scan.',
      commonlyFoundIn: [
        'Processed and packaged foods',
        'Skincare and moisturizers',
        'Shampoos and conditioners',
        'Makeup and cosmetics',
        'Sunscreens',
        'Household cleaning products',
        'Deodorants and antiperspirants',
        'Canned and preserved foods',
        'Fast food and restaurant meals',
        'Personal care products',
      ],
      whyPeopleAvoid: `The Enaj Non-Toxic Baseline monitors for ingredients across five categories that health-conscious people most commonly avoid:
    
    Synthetic Chemicals & Preservatives: Fragrance and parfum (which can hide hundreds of undisclosed chemicals), parabens (methylparaben, propylparaben, butylparaben), formaldehyde and formaldehyde-releasing preservatives (DMDM hydantoin, diazolidinyl urea, imidazolidinyl urea), phthalates, triclosan and triclocarban, and sulfates (SLS and SLES). These are commonly found in personal care products and are linked to hormone disruption, skin irritation, and long-term health concerns.
    
    Plastics & Forever Chemicals: BPA, bisphenol compounds, PFAS, PFOA, and perfluoro chemicals — known as "forever chemicals" because they don't break down in the body or environment. They are linked to cancer, thyroid disease, immune system effects, and reproductive issues.
    
    Harmful Food Additives: High fructose corn syrup, artificial flavors and colors (Red 40, Yellow 5, Yellow 6, Blue 1, FD&C dyes), MSG, artificial sweeteners (aspartame, sucralose, saccharin, acesulfame), sodium nitrite and nitrate, carrageenan, polysorbate 80, carboxymethylcellulose, and trans fats and partially hydrogenated oils. These additives are associated with inflammation, metabolic issues, digestive problems, and increased disease risk.
    
    Inflammatory Seed Oils: Canola oil, soybean oil, sunflower oil, corn oil, and cottonseed oil. These heavily processed oils are high in omega-6 fatty acids and are avoided by many following anti-inflammatory or ancestral diets.
    
    Heavy Metals, Toxins & Chemical UV Filters: Lead, mercury, aluminum compounds, talc, oxybenzone, and octinoxate. These ingredients are linked to neurological damage, hormonal disruption, and environmental harm — oxybenzone and octinoxate in particular are banned in several locations for damaging coral reefs.
    
    Microplastics: Polyethylene beads and polypropylene beads found in exfoliants and cosmetics. They don't biodegrade and have been detected in human blood, lungs, and organs.`,
      sources: [
        { title: 'EWG - Toxic Twelve Chemicals in Cosmetics', url: 'https://www.ewg.org/the-toxic-twelve-chemicals-and-contaminants-in-cosmetics' },
        { title: 'NIH - Endocrine Disruptors', url: 'https://www.niehs.nih.gov/health/topics/agents/endocrine' },
        { title: 'WHO - Chemical Safety', url: 'https://www.who.int/health-topics/chemical-safety' },
        { title: 'FDA - Food Additives Overview', url: 'https://www.fda.gov/food/food-ingredients-packaging/overview-food-ingredients-additives-colors' },
        { title: 'EPA - PFAS Explained', url: 'https://www.epa.gov/pfas/pfas-explained' },
        { title: 'NIH - Microplastics Health Effects', url: 'https://www.niehs.nih.gov/health/topics/agents/microplastics' },
        { title: 'AHA - Trans Fats', url: 'https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/fats/trans-fat' },
        { title: 'American Cancer Society - Processed Meat', url: 'https://www.cancer.org/cancer/risk-prevention/diet-physical-activity/does-eating-processed-or-red-meat-cause-cancer.html' },
      ],
    },
  }
  