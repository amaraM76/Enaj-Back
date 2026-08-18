// Educational content for each ailment/health condition
// This provides sources for ingredient-related information

export interface AilmentIngredientEducation {
    reason: string
    sources: { title: string; url: string }[]
  }
  
  export interface AilmentEducation {
    description: string
    generalSources: { title: string; url: string }[]
    ingredientInfo: Record<string, AilmentIngredientEducation>
  }
  
  // Helper function to get ailment education with flexible matching
  export function getAilmentEducation(slug: string): AilmentEducation | undefined {
    const normalizedSlug = slug.toLowerCase().trim()
    
    // Direct match
    if (ailmentEducationData[normalizedSlug]) {
      return ailmentEducationData[normalizedSlug]
    }
    
    // Try with hyphens replaced by nothing
    const noHyphens = normalizedSlug.replace(/-/g, '')
    if (ailmentEducationData[noHyphens]) {
      return ailmentEducationData[noHyphens]
    }
    
    // Try common variations
    const variations = [
      normalizedSlug,
      normalizedSlug.replace(/-/g, ''),
      normalizedSlug.replace(/s$/, ''), // Remove trailing 's'
      normalizedSlug + 's', // Add trailing 's'
      normalizedSlug.replace(/-disease$/, ''),
      normalizedSlug.replace(/-disorder$/, ''),
      normalizedSlug.replace(/-syndrome$/, ''),
      normalizedSlug + '-disease',
    ]
    
    for (const variation of variations) {
      if (ailmentEducationData[variation]) {
        return ailmentEducationData[variation]
      }
    }
    
    // Search for partial matches
    const keys = Object.keys(ailmentEducationData)
    for (const key of keys) {
      if (key.includes(normalizedSlug) || normalizedSlug.includes(key)) {
        return ailmentEducationData[key]
      }
    }
    
    return undefined
  }
  
  export const ailmentEducationData: Record<string, AilmentEducation> = {
    // Neurological Conditions
    'alzheimers': {
      description: 'Alzheimer\'s disease is a progressive neurodegenerative disorder in which brain cells gradually degenerate and die, driven in part by the buildup of amyloid plaques and tau tangles, leading to worsening memory loss, confusion, and cognitive decline over years. It\'s the most common cause of dementia, and while age and genetics are the strongest risk factors, the Alzheimer\'s Association and NIH point to a growing body of research linking modifiable factors - including diets high in trans fats and added sugar, associated with vascular damage and brain insulin resistance - to elevated risk. No diet has been shown to prevent or cure Alzheimer\'s, but many researchers consider heart-healthy eating patterns like the Mediterranean or MIND diet a reasonable part of a broader risk-reduction strategy.',
      generalSources: [
        { title: 'Alzheimer\'s Association', url: 'https://www.alz.org/alzheimers-dementia/what-is-alzheimers' },
        { title: 'NIH - Alzheimer\'s Disease', url: 'https://www.nia.nih.gov/health/alzheimers-and-dementia/alzheimers-disease-fact-sheet' },
      ],
      ingredientInfo: {
        'Aluminum': {
          reason: 'Some studies have explored a potential link between aluminum exposure and Alzheimer\'s, though the evidence remains inconclusive. Some people choose to limit exposure as a precaution.',
          sources: [
            { title: 'Alzheimer\'s Society - Aluminum', url: 'https://www.alzheimers.org.uk/about-dementia/risk-factors-and-prevention/metals-and-dementia' },
            { title: 'NIH - Aluminum and Alzheimer\'s', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3056430/' },
          ],
        },
        'Artificial Sweeteners': {
          reason: 'Some research suggests artificial sweeteners may affect brain health, though more studies are needed to establish clear connections.',
          sources: [
            { title: 'Stroke Journal Study', url: 'https://www.ahajournals.org/doi/10.1161/STROKEAHA.116.016027' },
          ],
        },
        'Trans Fats': {
          reason: 'Diets high in trans fats have been associated with increased risk of cognitive decline and dementia in some studies.',
          sources: [
            { title: 'Neurology Journal', url: 'https://n.neurology.org/content/93/19/e1774' },
            { title: 'Harvard Health - Brain Foods', url: 'https://www.health.harvard.edu/mind-and-mood/foods-linked-to-better-brainpower' },
          ],
        },
        'Processed Meats': {
          reason: 'Nitrates in processed meats may produce compounds that could contribute to brain inflammation and degeneration.',
          sources: [
            { title: 'Alzheimer\'s & Dementia Journal', url: 'https://pubmed.ncbi.nlm.nih.gov/32614156/' },
          ],
        },
      },
    },
    'dementia': {
      description: 'Dementia is a general term - not a single disease - for a decline in memory, language, problem-solving, and other cognitive abilities severe enough to interfere with daily life. Alzheimer\'s disease is the most common underlying cause, but vascular dementia, Lewy body dementia, and other conditions can also produce dementia symptoms, often with overlapping risk factors related to cardiovascular and metabolic health. The World Health Organization and Alzheimer\'s Association note that several modifiable lifestyle factors - including diets high in added sugar, trans fats, and processed meats - are associated with higher dementia risk in long-term studies, likely through their effects on blood vessels, blood sugar regulation, and chronic inflammation in the brain, which is why heart-healthy eating patterns are commonly recommended as part of dementia risk reduction.',
      generalSources: [
        { title: 'Alzheimer\'s Association - What Is Dementia', url: 'https://www.alz.org/alzheimers-dementia/what-is-dementia' },
        { title: 'WHO - Dementia', url: 'https://www.who.int/news-room/fact-sheets/detail/dementia' },
      ],
      ingredientInfo: {
        'Excess Sugar': {
          reason: 'High sugar intake has been linked to cognitive decline and may increase dementia risk through its effects on blood sugar and inflammation.',
          sources: [
            { title: 'Diabetologia Study', url: 'https://link.springer.com/article/10.1007/s00125-017-4541-7' },
          ],
        },
        'Saturated Fats': {
          reason: 'Diets high in saturated fats may increase the risk of cognitive impairment and dementia.',
          sources: [
            { title: 'Annals of Neurology', url: 'https://pubmed.ncbi.nlm.nih.gov/22234724/' },
          ],
        },
      },
    },
    'migraine': {
      description: 'Migraines are severe headaches often accompanied by nausea, vomiting, and sensitivity to light and sound. Identifying and avoiding triggers is key to management.',
      generalSources: [
        { title: 'American Migraine Foundation', url: 'https://americanmigrainefoundation.org/resource-library/what-is-migraine/' },
        { title: 'Mayo Clinic - Migraine', url: 'https://www.mayoclinic.org/diseases-conditions/migraine-headache/symptoms-causes/syc-20360201' },
      ],
      ingredientInfo: {
        'MSG': {
          reason: 'Monosodium glutamate (MSG) is a known migraine trigger for many individuals, potentially affecting neurotransmitter activity.',
          sources: [
            { title: 'American Migraine Foundation - MSG', url: 'https://americanmigrainefoundation.org/resource-library/msg-and-migraine/' },
          ],
        },
        'Tyramine': {
          reason: 'Tyramine, found in aged cheeses and fermented foods, can trigger migraines by affecting blood vessel constriction.',
          sources: [
            { title: 'Cleveland Clinic - Tyramine', url: 'https://my.clevelandclinic.org/health/articles/22530-tyramine' },
          ],
        },
        'Nitrates': {
          reason: 'Nitrates and nitrites in processed meats can dilate blood vessels and trigger migraine headaches.',
          sources: [
            { title: 'Headache Journal', url: 'https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.12878' },
          ],
        },
        'Artificial Sweeteners': {
          reason: 'Aspartame and other artificial sweeteners have been reported as migraine triggers by some individuals.',
          sources: [
            { title: 'AMF - Diet and Migraine', url: 'https://americanmigrainefoundation.org/resource-library/diet/' },
          ],
        },
        'Caffeine': {
          reason: 'While small amounts may help migraines, caffeine withdrawal or excessive intake can trigger attacks.',
          sources: [
            { title: 'American Migraine Foundation - Caffeine', url: 'https://americanmigrainefoundation.org/resource-library/caffeine-and-migraine/' },
          ],
        },
      },
    },
    'ms': {
      description: 'Multiple Sclerosis (MS) is a chronic autoimmune disease in which the immune system attacks myelin, the protective sheath insulating nerve fibers in the brain and spinal cord, disrupting communication between the brain and the rest of the body and producing symptoms from fatigue and numbness to vision problems and mobility issues. While no diet treats MS directly, the National MS Society highlights research into dietary patterns like the Swank diet - which limits saturated fat - and notes that some patients report fewer symptoms avoiding dairy and gluten, theorized to relate to structural similarities between certain food proteins and myelin itself. Evidence for specific foods remains preliminary, so dietary changes are generally recommended as a complement to, not a replacement for, disease-modifying medication.',
      generalSources: [
        { title: 'National MS Society', url: 'https://www.nationalmssociety.org/What-is-MS' },
        { title: 'Mayo Clinic - MS', url: 'https://www.mayoclinic.org/diseases-conditions/multiple-sclerosis/symptoms-causes/syc-20350269' },
      ],
      ingredientInfo: {
        'Gluten': {
          reason: 'Some research suggests gluten sensitivity may be more prevalent in MS patients, and a gluten-free diet may help reduce inflammation in sensitive individuals.',
          sources: [
            { title: 'National MS Society - Diet', url: 'https://www.nationalmssociety.org/Living-Well-With-MS/Diet-Exercise-Healthy-Behaviors/Diet-Nutrition' },
            { title: 'NIH - MS and Diet', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6413101/' },
          ],
        },
        'Dairy': {
          reason: 'Butyrophilin, a protein in cow\'s milk, shares molecular similarities with myelin and may trigger immune responses in MS patients.',
          sources: [
            { title: 'Autoimmunity Journal Study', url: 'https://pubmed.ncbi.nlm.nih.gov/9360298/' },
            { title: 'MS Society - Nutrition', url: 'https://www.mssociety.org.uk/about-ms/treatments-and-therapies/diet' },
          ],
        },
        'Saturated Fat': {
          reason: 'High saturated fat intake may worsen MS symptoms and promote neuroinflammation. The Swank Diet, which limits saturated fat, has been studied for MS management.',
          sources: [
            { title: 'National MS Society - Swank Diet', url: 'https://www.nationalmssociety.org/Living-Well-With-MS/Diet-Exercise-Healthy-Behaviors/Diet-Nutrition' },
            { title: 'Lancet Study - Saturated Fat and MS', url: 'https://pubmed.ncbi.nlm.nih.gov/13982627/' },
          ],
        },
        'Refined Sugar': {
          reason: 'Excess sugar promotes systemic inflammation which may exacerbate MS symptoms and fatigue.',
          sources: [
            { title: 'MS Society - Healthy Eating', url: 'https://www.mssociety.org.uk/about-ms/treatments-and-therapies/diet' },
          ],
        },
        'Artificial Sweeteners': {
          reason: 'Some artificial sweeteners may affect gut microbiome composition, which is increasingly being studied for its role in MS immune function.',
          sources: [
            { title: 'NIH - Gut Microbiome and MS', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5490583/' },
          ],
        },
      },
    },
    'als': {
      description: 'Amyotrophic Lateral Sclerosis (ALS), also known as Lou Gehrig\'s disease, is a progressive neurodegenerative disease in which motor neurons - the nerve cells in the brain and spinal cord that control voluntary muscle movement - gradually break down and die, leading to worsening muscle weakness, loss of motor control, and eventually the ability to move, speak, swallow, and breathe. Most cases have no identifiable cause, though a small percentage are inherited, and researchers continue to study environmental and dietary exposures that might influence who develops ALS or how quickly it progresses once diagnosed. One area of ongoing research involves excitotoxicity, a process where excess glutamate signaling overstimulates and eventually damages motor neurons, which has led some researchers to examine excitotoxin-type food additives like MSG and aspartame, alongside heavy metal and pesticide exposure, as potential contributing factors - though none of this is established as a cause of ALS. Because ALS has no cure, the ALS Association notes that most research into diet and environmental exposure focuses on risk reduction and symptom management rather than treatment, and any dietary changes should be discussed with a neurologist as part of a broader care plan.',
      generalSources: [
        { title: 'ALS Association', url: 'https://www.als.org/understanding-als/what-is-als' },
        { title: 'Mayo Clinic - ALS', url: 'https://www.mayoclinic.org/diseases-conditions/amyotrophic-lateral-sclerosis/symptoms-causes/syc-20354022' },
        { title: 'NIH - ALS', url: 'https://www.ninds.nih.gov/health-information/disorders/amyotrophic-lateral-sclerosis-als' },
      ],
      ingredientInfo: {
        'Monosodium Glutamate': {
          reason: 'MSG is an excitotoxin that may contribute to motor neuron damage by overstimulating glutamate receptors, a mechanism studied in ALS research.',
          sources: [
            { title: 'NIH - Excitotoxicity and ALS', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4117557/' },
            { title: 'ALS Association - Research', url: 'https://www.als.org/research' },
          ],
        },
        'Aspartame': {
          reason: 'Aspartame breaks down into aspartate, an excitatory amino acid. Some researchers have explored whether excitotoxins like aspartate may contribute to motor neuron vulnerability in ALS.',
          sources: [
            { title: 'Journal of Neuropathology - Excitotoxins', url: 'https://pubmed.ncbi.nlm.nih.gov/1385189/' },
          ],
        },
        'Mercury': {
          reason: 'Heavy metal exposure, including mercury, has been studied as a potential environmental risk factor for ALS. High-mercury fish and mercury-containing products should be avoided.',
          sources: [
            { title: 'Environmental Health Perspectives - ALS and Metals', url: 'https://ehp.niehs.nih.gov/doi/10.1289/ehp.1306900' },
            { title: 'ALS Association - Environmental Factors', url: 'https://www.als.org/understanding-als/causes' },
          ],
        },
        'Lead': {
          reason: 'Some epidemiological studies suggest occupational or environmental lead exposure may be associated with increased ALS risk.',
          sources: [
            { title: 'Neurology Journal - Lead and ALS', url: 'https://pubmed.ncbi.nlm.nih.gov/16170087/' },
            { title: 'NIH - Heavy Metals and Neurodegeneration', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4477227/' },
          ],
        },
        'Pesticide Residue': {
          reason: 'Multiple studies have linked occupational and environmental pesticide exposure to elevated ALS risk, particularly organophosphate and organochlorine compounds.',
          sources: [
            { title: 'European Journal of Epidemiology - Pesticides and ALS', url: 'https://pubmed.ncbi.nlm.nih.gov/22068561/' },
            { title: 'ALS Association - Environmental Causes', url: 'https://www.als.org/understanding-als/causes' },
          ],
        },
      },
    },
    'epilepsy': {
      description: 'Epilepsy is a neurological disorder characterized by a tendency toward recurrent, unprovoked seizures, caused by abnormal, excessive electrical activity in the brain. It has many possible underlying causes, from genetics to brain injury, and treatment usually centers on anti-seizure medication, though therapeutic diets like the ketogenic diet are also an established treatment option for some forms of drug-resistant epilepsy. Outside of formal dietary therapy, some people with epilepsy identify specific personal triggers - excitotoxin-type additives like MSG and aspartame, or high caffeine intake, both of which can overstimulate neural activity - though the evidence for these as triggers is largely from self-report rather than controlled trials, so any changes to diet or medication should go through a neurologist.',
      generalSources: [
        { title: 'Epilepsy Foundation', url: 'https://www.epilepsy.com/what-is-epilepsy' },
        { title: 'Mayo Clinic - Epilepsy', url: 'https://www.mayoclinic.org/diseases-conditions/epilepsy/symptoms-causes/syc-20350093' },
      ],
      ingredientInfo: {
        'Artificial Sweeteners': {
          reason: 'Some reports suggest artificial sweeteners like aspartame may lower seizure thresholds in sensitive individuals.',
          sources: [
            { title: 'Epilepsy Foundation - Triggers', url: 'https://www.epilepsy.com/what-is-epilepsy/seizure-triggers' },
          ],
        },
        'Excess Caffeine': {
          reason: 'High caffeine intake may increase seizure risk in some people with epilepsy.',
          sources: [
            { title: 'Epilepsy Society', url: 'https://epilepsysociety.org.uk/about-epilepsy/epileptic-seizures/seizure-triggers' },
          ],
        },
        'Alcohol': {
          reason: 'Alcohol can interfere with seizure medications and may trigger seizures, especially during withdrawal.',
          sources: [
            { title: 'Epilepsy Foundation - Alcohol', url: 'https://www.epilepsy.com/stories/alcohol-and-epilepsy' },
          ],
        },
      },
    },
  
    // Cardiovascular Conditions
    'heart-disease': {
      description: 'Heart disease encompasses various conditions affecting the heart, including coronary artery disease, heart rhythm problems, and heart defects. Diet plays a crucial role in prevention and management.',
      generalSources: [
        { title: 'American Heart Association', url: 'https://www.heart.org/en/health-topics/heart-attack/about-heart-attacks' },
        { title: 'CDC - Heart Disease', url: 'https://www.cdc.gov/heartdisease/' },
      ],
      ingredientInfo: {
        'Trans Fats': {
          reason: 'Trans fats raise LDL (bad) cholesterol and lower HDL (good) cholesterol, significantly increasing heart disease risk.',
          sources: [
            { title: 'AHA - Trans Fats', url: 'https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/fats/trans-fat' },
          ],
        },
        'Excess Sodium': {
          reason: 'High sodium intake can raise blood pressure, a major risk factor for heart disease and stroke.',
          sources: [
            { title: 'AHA - Sodium', url: 'https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sodium/sodium-and-salt' },
          ],
        },
        'Saturated Fats': {
          reason: 'High saturated fat intake can raise blood cholesterol levels, contributing to arterial plaque buildup.',
          sources: [
            { title: 'AHA - Saturated Fats', url: 'https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/fats/saturated-fats' },
          ],
        },
        'Added Sugars': {
          reason: 'Excess sugar consumption is linked to obesity, inflammation, and increased heart disease risk.',
          sources: [
            { title: 'Harvard Health - Sugar and Heart', url: 'https://www.health.harvard.edu/heart-health/the-sweet-danger-of-sugar' },
          ],
        },
      },
    },
    'high-blood-pressure': {
      description: 'High blood pressure (hypertension) is when the force of blood against artery walls is too high, increasing risk of heart disease and stroke.',
      generalSources: [
        { title: 'American Heart Association - High Blood Pressure', url: 'https://www.heart.org/en/health-topics/high-blood-pressure' },
        { title: 'Mayo Clinic - Hypertension', url: 'https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/symptoms-causes/syc-20373410' },
      ],
      ingredientInfo: {
        'Sodium': {
          reason: 'Excess sodium causes the body to retain water, increasing blood volume and blood pressure.',
          sources: [
            { title: 'AHA - How Salt Affects Blood Pressure', url: 'https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/shaking-the-salt-habit-to-lower-high-blood-pressure' },
          ],
        },
        'Caffeine': {
          reason: 'Caffeine can cause a short-term spike in blood pressure, which may be concerning for those with hypertension.',
          sources: [
            { title: 'Mayo Clinic - Caffeine and Blood Pressure', url: 'https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/expert-answers/blood-pressure/faq-20058543' },
          ],
        },
        'Alcohol': {
          reason: 'Regular heavy drinking can raise blood pressure and reduce the effectiveness of blood pressure medications.',
          sources: [
            { title: 'AHA - Alcohol and Blood Pressure', url: 'https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/limiting-alcohol-to-manage-high-blood-pressure' },
          ],
        },
      },
    },
    'high-cholesterol': {
      description: 'High cholesterol is when there\'s too much cholesterol in your blood, which can build up in arteries and increase heart disease risk.',
      generalSources: [
        { title: 'American Heart Association - Cholesterol', url: 'https://www.heart.org/en/health-topics/cholesterol' },
        { title: 'CDC - Cholesterol', url: 'https://www.cdc.gov/cholesterol/' },
      ],
      ingredientInfo: {
        'Trans Fats': {
          reason: 'Trans fats are the worst type of fat for cholesterol levels, raising LDL and lowering HDL cholesterol.',
          sources: [
            { title: 'AHA - Trans Fats and Cholesterol', url: 'https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/fats/trans-fat' },
          ],
        },
        'Saturated Fats': {
          reason: 'Saturated fats raise total cholesterol and LDL cholesterol, contributing to cardiovascular risk.',
          sources: [
            { title: 'Mayo Clinic - Cholesterol Diet', url: 'https://www.mayoclinic.org/diseases-conditions/high-blood-cholesterol/in-depth/cholesterol/art-20045192' },
          ],
        },
      },
    },
  
    'contact-dermatitis': {
      description: 'Contact dermatitis is a localized skin reaction that occurs in one of two ways: irritant contact dermatitis, where a substance directly damages the skin\'s outer barrier (harsh soaps or solvents, for example), and allergic contact dermatitis, where the immune system becomes sensitized to a specific substance and mounts a delayed reaction - often 24 to 48 hours later - on repeated exposure. Because allergic contact dermatitis requires prior sensitization, someone can use a product containing a particular allergen for years without issue before suddenly developing a reaction once the immune system "learns" to recognize it. Fragrance, nickel, and preservatives like parabens and formaldehyde-releasers are among the most common culprits identified through patch testing, according to the American Academy of Dermatology, and identifying and eliminating the specific trigger - rather than treating symptoms alone - is the only way to prevent recurrence. Because the same ingredient can be tolerated by most people and still cause a significant reaction in someone sensitized to it, contact dermatitis triggers are highly individual and often require a dermatologist\'s patch test to pin down definitively.',
      generalSources: [
        { title: 'AAD - Contact Dermatitis', url: 'https://www.aad.org/public/diseases/a-z/contact-dermatitis-overview' },
        { title: 'Mayo Clinic - Contact Dermatitis', url: 'https://www.mayoclinic.org/diseases-conditions/contact-dermatitis/symptoms-causes/syc-20352742' },
      ],
      ingredientInfo: {
        'Synthetic Fragrance': {
          reason: 'Fragrance is the most common cause of allergic contact dermatitis, triggering immune reactions in sensitized individuals.',
          sources: [{ title: 'ACAAI - Fragrance Allergy', url: 'https://acaai.org/allergies/allergic-conditions/skin-allergy/fragrance-allergy/' }],
        },
        'Parabens': {
          reason: 'Parabens are a well-documented cause of allergic contact dermatitis, especially in leave-on skincare products.',
          sources: [{ title: 'Contact Dermatitis Journal', url: 'https://pubmed.ncbi.nlm.nih.gov/25041497/' }],
        },
        'Formaldehyde': {
          reason: 'Formaldehyde and formaldehyde-releasing preservatives are common contact allergens.',
          sources: [{ title: 'AAD - Formaldehyde Allergy', url: 'https://www.aad.org/public/diseases/a-z/contact-dermatitis-causes' }],
        },
      },
    },
    
    'keratosis-pilaris': {
      description: 'Keratosis pilaris (KP) is a common, harmless skin condition that causes small, rough, bumpy patches - often nicknamed "chicken skin" - typically on the upper arms, thighs, cheeks, and buttocks. It happens when keratin, a protein that normally sheds from the skin\'s surface, instead builds up and plugs individual hair follicles, creating the condition\'s signature texture. KP tends to run in families and often improves with age, and typically responds best to gentle exfoliation and consistent moisturizing rather than harsh cleansing, since ingredients that strip the skin\'s natural oils - like sulfates and drying alcohols - can dehydrate the area further and make the bumps and redness more noticeable.',
      generalSources: [
        { title: 'AAD - Keratosis Pilaris', url: 'https://www.aad.org/public/diseases/a-z/keratosis-pilaris-overview' },
        { title: 'Mayo Clinic - Keratosis Pilaris', url: 'https://www.mayoclinic.org/diseases-conditions/keratosis-pilaris/symptoms-causes/syc-20351149' },
      ],
      ingredientInfo: {
        'Sodium Lauryl Sulfate': {
          reason: 'Harsh sulfates strip the skin of its natural oils, worsening dryness and the rough texture characteristic of KP.',
          sources: [{ title: 'AAD - Dry Skin Care', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/dry/dermatologists-tips-relieve-dry-skin' }],
        },
        'Alcohol Denat': {
          reason: 'Drying alcohols further dehydrate already dry KP-prone skin, worsening texture and redness.',
          sources: [{ title: 'Cleveland Clinic - KP', url: 'https://my.clevelandclinic.org/health/diseases/17734-keratosis-pilaris' }],
        },
      },
    },
    
    'sulfite-sensitivity': {
      description: 'Sulfite sensitivity is an adverse reaction to sulfite compounds widely used as preservatives to prevent browning and spoilage in food, wine, and some medications. Reactions occur when the body doesn\'t fully break down sulfites, and can range from mild - hives, flushing, a runny nose - to severe, including asthma-like bronchospasm or, rarely, anaphylaxis, particularly in people who also have asthma. The FDA has required sulfite disclosure on food labels since 1986 specifically because of these reactions, and unlike a true food allergy, sulfite sensitivity doesn\'t involve IgE antibodies, though the reactions it causes can be just as serious.',
      generalSources: [
        { title: 'AAAAI - Sulfite Sensitivity', url: 'https://www.aaaai.org/conditions-treatments/related-conditions/sulfite-sensitivity' },
        { title: 'FDA - Sulfites', url: 'https://www.fda.gov/food/food-additives-petitions/sulfites-food' },
      ],
      ingredientInfo: {
        'Sodium Bisulfite': {
          reason: 'A common food preservative that directly triggers sulfite sensitivity reactions including asthma and hives.',
          sources: [{ title: 'AAAAI - Sulfites', url: 'https://www.aaaai.org/conditions-treatments/related-conditions/sulfite-sensitivity' }],
        },
        'Sulfur Dioxide': {
          reason: 'Used in dried fruits, wine, and some beverages — a primary trigger for sulfite-sensitive individuals.',
          sources: [{ title: 'FDA - Sulfites in Food', url: 'https://www.fda.gov/food/food-additives-petitions/sulfites-food' }],
        },
      },
    },
    
    'sibo': {
      description: 'Small Intestinal Bacterial Overgrowth (SIBO) occurs when bacteria that should mostly reside in the large intestine migrate into and overgrow within the small intestine, where they ferment food before the body has a chance to digest and absorb it - producing excess gas, bloating, diarrhea or constipation, and over time, nutrient malabsorption. Because the small intestine isn\'t built to host large bacterial populations, fermentable carbohydrates that would be harmless in a healthy gut - like certain fibers and sugar alcohols - can trigger significant symptoms in SIBO by feeding the overgrown bacteria directly. Many people manage SIBO with a low-FODMAP diet during a flare, worked out with a doctor or dietitian, alongside treatment aimed at the underlying overgrowth itself.',
      generalSources: [
        { title: 'Mayo Clinic - SIBO', url: 'https://www.mayoclinic.org/diseases-conditions/small-intestinal-bacterial-overgrowth/symptoms-causes/syc-20370168' },
        { title: 'NIH - SIBO', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3099351/' },
      ],
      ingredientInfo: {
        'Fructose': {
          reason: 'Fructose is a fermentable sugar that feeds bacterial overgrowth in the small intestine, worsening SIBO symptoms.',
          sources: [{ title: 'Monash University - FODMAPs', url: 'https://www.monashfodmap.com/' }],
        },
        'Inulin': {
          reason: 'Inulin is a prebiotic fiber that feeds both good and bad bacteria — problematic in SIBO where overgrowth already exists.',
          sources: [{ title: 'NIH - SIBO and Diet', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3099351/' }],
        },
      },
    },
    
    'gastritis': {
      description: 'Gastritis is inflammation of the stomach lining that can be acute (a short-term flare, often from alcohol, NSAIDs, or a stomach bug) or chronic, most commonly caused by long-term infection with H. pylori bacteria, which burrow into the stomach\'s protective mucus layer and provoke ongoing immune activity. Left untreated, chronic gastritis can thin the stomach lining over time and, in some cases, raise the risk of ulcers or stomach cancer, which is why the NIDDK recommends identifying and addressing the underlying cause rather than only managing symptoms like pain and nausea. Regardless of the underlying trigger, certain foods and substances can further irritate an already-inflamed stomach lining by increasing acid production or directly damaging the mucosa - alcohol, caffeine, and highly acidic or spicy ingredients are among the most consistently reported aggravators. Because gastritis symptoms can overlap with more serious conditions, the Mayo Clinic recommends medical evaluation - often including H. pylori testing - rather than relying on diet changes alone.',
      generalSources: [
        { title: 'Mayo Clinic - Gastritis', url: 'https://www.mayoclinic.org/diseases-conditions/gastritis/symptoms-causes/syc-20355807' },
        { title: 'NIDDK - Gastritis', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/gastritis' },
      ],
      ingredientInfo: {
        'Alcohol': {
          reason: 'Alcohol directly irritates and erodes the stomach lining, worsening gastritis and increasing ulcer risk.',
          sources: [{ title: 'Mayo Clinic - Gastritis', url: 'https://www.mayoclinic.org/diseases-conditions/gastritis/symptoms-causes/syc-20355807' }],
        },
        'Caffeine': {
          reason: 'Caffeine stimulates excess acid production, aggravating the already inflamed stomach lining.',
          sources: [{ title: 'NIDDK - Gastritis', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/gastritis' }],
        },
        'Capsaicin': {
          reason: 'Spicy compounds can irritate the stomach lining, worsening pain and nausea in gastritis.',
          sources: [{ title: 'Cleveland Clinic - Gastritis', url: 'https://my.clevelandclinic.org/health/diseases/10349-gastritis' }],
        },
      },
    },
    
    'diverticulosis': {
      description: 'Diverticulosis develops when small, bulging pouches (diverticula) form in weak spots of the colon wall, most often where blood vessels penetrate the muscle layer, typically as a result of increased pressure inside the colon over many years. A low-fiber diet is considered a major contributing factor because it produces smaller, harder stools that require more pressure to pass, and diverticulosis becomes markedly more common with age in populations that eat a typically low-fiber Western diet. Most people with diverticulosis have no symptoms and never know they have it, but the pouches can become inflamed or infected - a related but distinct condition called diverticulitis - causing pain, fever, and sometimes serious complications. Because of the role low fiber intake plays in formation, the NIDDK recommends a high-fiber diet as a protective measure, while red meat and refined grains have been associated with higher risk in large prospective studies like those published in the journal Gut.',
      generalSources: [
        { title: 'NIDDK - Diverticular Disease', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/diverticulosis-diverticulitis' },
        { title: 'Mayo Clinic - Diverticulosis', url: 'https://www.mayoclinic.org/diseases-conditions/diverticulosis/symptoms-causes/syc-20352752' },
      ],
      ingredientInfo: {
        'Red Meat': {
          reason: 'High red meat consumption is associated with increased risk of diverticulosis in several large studies.',
          sources: [{ title: 'Gut Journal - Red Meat and Diverticular Disease', url: 'https://gut.bmj.com/content/67/7/1325' }],
        },
        'Refined Grains': {
          reason: 'Low-fiber refined grains slow digestion and increase pressure in the colon, contributing to diverticula formation.',
          sources: [{ title: 'NIDDK - Diverticular Disease Diet', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/diverticulosis-diverticulitis/eating-diet-nutrition' }],
        },
      },
    },
    
    'egg-allergy': {
      description: 'Egg allergy is one of the most common food allergies in children, though many children outgrow it by their teenage years. It\'s an IgE-mediated immune reaction to proteins found primarily in egg whites - ovalbumin and ovomucoid chief among them - though yolk proteins can trigger reactions too, and symptoms can range from hives and digestive upset to severe anaphylaxis. Because eggs and egg derivatives like albumin, lysozyme, and egg lecithin appear in a wide range of processed foods, baked goods, and some personal care products, careful label reading is essential for people managing an egg allergy.',
      generalSources: [
        { title: 'FARE - Egg Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/egg' },
        { title: 'ACAAI - Egg Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/egg/' },
      ],
      ingredientInfo: {
        'Albumin': {
          reason: 'Albumin is an egg-derived protein found in many baked goods, processed foods, and some cosmetics.',
          sources: [{ title: 'FARE - Egg Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/egg' }],
        },
        'Lysozyme': {
          reason: 'Lysozyme is an egg-white enzyme used as a natural preservative in some cheeses and processed foods.',
          sources: [{ title: 'ACAAI - Egg Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/egg/' }],
        },
        'Egg Lecithin': {
          reason: 'Egg-derived lecithin is used as an emulsifier in some products and may trigger reactions in egg-allergic individuals.',
          sources: [{ title: 'FARE - Hidden Egg Ingredients', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/egg' }],
        },
      },
    },
    
    'histamine-intolerance': {
      description: 'Histamine intolerance occurs when the body can\'t efficiently break down the histamine naturally present in many foods, most often due to reduced activity of diamine oxidase (DAO), the enzyme responsible for metabolizing dietary histamine in the gut. When histamine builds up faster than the body can clear it, it can produce a wide range of symptoms - headaches, hives, flushing, digestive upset, and nasal congestion - that can look similar to a true food allergy but involve a different mechanism entirely. Histamine levels rise the longer a food ferments or ages, which is why aged cheese, cured meats, fermented foods, and alcohol are among the most commonly flagged triggers, and some foods and additives can also directly trigger the body\'s own mast cells to release additional histamine.',
      generalSources: [
        { title: 'NIH - Histamine Intolerance', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7463562/' },
        { title: 'Allergy Journal - Histamine Intolerance', url: 'https://pubmed.ncbi.nlm.nih.gov/11359937/' },
      ],
      ingredientInfo: {
        'Vinegar': {
          reason: 'Fermented vinegar is naturally high in histamine and commonly triggers intolerance reactions.',
          sources: [{ title: 'NIH - Histamine in Foods', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7463562/' }],
        },
        'Aged Cheese': {
          reason: 'Aged cheeses are among the highest dietary sources of histamine due to the fermentation process.',
          sources: [{ title: 'NIH - Histamine Intolerance', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7463562/' }],
        },
        'Artificial Colors': {
          reason: 'Certain food dyes can trigger histamine release even in individuals without a true allergy.',
          sources: [{ title: 'Allergy Journal - Pseudoallergic Reactions', url: 'https://pubmed.ncbi.nlm.nih.gov/11359937/' }],
        },
        'Alcohol': {
          reason: 'Alcohol both contains histamine and inhibits the DAO enzyme that breaks it down, doubling the effect.',
          sources: [{ title: 'NIH - Alcohol and Histamine', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7463562/' }],
        },
      },
    },
    
    'mcas': {
      description: 'Mast Cell Activation Syndrome (MCAS) is a condition in which mast cells - immune cells normally involved in allergic and defensive responses - release histamine and other chemical mediators inappropriately or excessively, without a clear allergic trigger. Because mast cells are distributed throughout the body, MCAS symptoms can affect multiple systems at once: skin flushing and hives, GI cramping and diarrhea, rapid heart rate, and headaches or brain fog, often in unpredictable combinations. Triggers vary widely between individuals and can include foods, fragrances, temperature changes, and stress, which is why many people with MCAS keep a detailed symptom and trigger log and work with an allergist or immunologist to identify their own pattern rather than relying on a generic list.',
      generalSources: [
        { title: 'The Mastocytosis Society - MCAS', url: 'https://www.tmsforacure.org/mast-cell-disorders/mast-cell-activation-syndrome-mcas/' },
        { title: 'NIH - MCAS', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4701915/' },
      ],
      ingredientInfo: {
        'Synthetic Fragrance': {
          reason: 'Fragrances are one of the most common environmental triggers of mast cell activation in MCAS patients.',
          sources: [{ title: 'The Mastocytosis Society - Triggers', url: 'https://www.tmsforacure.org/mast-cell-disorders/mast-cell-activation-syndrome-mcas/' }],
        },
        'Artificial Colors': {
          reason: 'Artificial food dyes are common MCAS triggers that cause mast cell degranulation in sensitive individuals.',
          sources: [{ title: 'NIH - MCAS', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4701915/' }],
        },
        'Sulfites': {
          reason: 'Sulfite preservatives are a well-documented MCAS trigger causing widespread mediator release.',
          sources: [{ title: 'The Mastocytosis Society', url: 'https://www.tmsforacure.org/mast-cell-disorders/mast-cell-activation-syndrome-mcas/' }],
        },
      },
    },
    
    'pots': {
      description: 'Postural Orthostatic Tachycardia Syndrome (POTS) is a form of dysautonomia in which the autonomic nervous system fails to properly constrict blood vessels when a person stands up, causing blood to pool in the lower body and the heart to compensate with a dramatic increase in heart rate - often 30 or more beats per minute within ten minutes of standing - to maintain blood flow to the brain. This can produce dizziness, palpitations, fatigue, brain fog, and fainting, and POTS is frequently seen alongside connective tissue disorders like Ehlers-Danlos syndrome and autoimmune or post-viral conditions. Because blood volume and vascular tone are central to the condition, increased fluid and sodium intake is a first-line, non-medication management strategy recommended by Dysautonomia International, which is part of why substances that promote fluid loss or vessel dilation - alcohol and excess caffeine among them - are commonly flagged as symptom aggravators. Managing POTS typically combines these dietary and lifestyle strategies with compression garments, exercise, and medication tailored to an individual\'s specific triggers.',
      generalSources: [
        { title: 'Dysautonomia International - POTS', url: 'https://www.dysautonomiainternational.org/page.php?ID=30' },
        { title: 'Mayo Clinic - POTS', url: 'https://www.mayoclinic.org/diseases-conditions/postural-tachycardia-syndrome/symptoms-causes/syc-20376042' },
      ],
      ingredientInfo: {
        'Alcohol': {
          reason: 'Alcohol causes vasodilation and dehydration, significantly worsening POTS symptoms like dizziness and racing heart.',
          sources: [{ title: 'Dysautonomia International - Diet', url: 'https://www.dysautonomiainternational.org/page.php?ID=30' }],
        },
        'Caffeine': {
          reason: 'Caffeine can worsen heart rate irregularities and contribute to dehydration in POTS patients.',
          sources: [{ title: 'Mayo Clinic - POTS', url: 'https://www.mayoclinic.org/diseases-conditions/postural-tachycardia-syndrome/diagnosis-treatment/drc-20376046' }],
        },
        'Refined Sugar': {
          reason: 'Blood sugar spikes and crashes from sugary foods can worsen POTS symptoms including fatigue and brain fog.',
          sources: [{ title: 'Dysautonomia International - POTS Management', url: 'https://www.dysautonomiainternational.org/page.php?ID=30' }],
        },
      },
    },
    
    'ibd': {
      description: 'Inflammatory Bowel Disease (IBD) is an umbrella term for a group of conditions - primarily Crohn\'s disease and ulcerative colitis - that cause chronic, relapsing inflammation of the digestive tract, driven by an immune system that overreacts to the gut\'s own bacteria and tissue. Diet does not cause IBD, but the Crohn\'s & Colitis Foundation and a growing body of research point to specific food additives - emulsifiers like polysorbate 80, thickeners like carrageenan, and certain artificial sweeteners - that can erode the gut\'s protective mucus layer or shift bacterial balance in ways that promote the inflammation central to flares. Because individual trigger foods vary widely between patients, many people with IBD work with a gastroenterologist or dietitian to identify their own pattern rather than following one fixed diet.',
      generalSources: [
        { title: 'Crohn\'s & Colitis Foundation', url: 'https://www.crohnscolitisfoundation.org/what-is-ibd' },
        { title: 'Mayo Clinic - IBD', url: 'https://www.mayoclinic.org/diseases-conditions/inflammatory-bowel-disease/symptoms-causes/syc-20353315' },
      ],
      ingredientInfo: {
        'Polysorbate 80': {
          reason: 'Research suggests this emulsifier may disrupt the gut mucous layer and promote inflammation in IBD.',
          sources: [{ title: 'Nature - Emulsifiers and Gut Inflammation', url: 'https://www.nature.com/articles/nature14232' }],
        },
        'Carrageenan': {
          reason: 'Carrageenan has been linked to gut inflammation and may worsen IBD symptoms in some patients.',
          sources: [{ title: 'NIH - Carrageenan and IBD', url: 'https://pubmed.ncbi.nlm.nih.gov/28028998/' }],
        },
        'Alcohol': {
          reason: 'Alcohol directly irritates the gut lining and can trigger IBD flares.',
          sources: [{ title: 'CCF - Diet and IBD', url: 'https://www.crohnscolitisfoundation.org/diet-and-nutrition' }],
        },
      },
    },
    
    'sjogrens': {
      description: 'Sjögren\'s syndrome is a chronic autoimmune disease in which the immune system attacks the body\'s moisture-producing exocrine glands - primarily the salivary and tear glands - causing persistent dry mouth and dry eyes, though the disease can also affect the skin, joints, and other organs. It occurs both on its own (primary Sjögren\'s) and alongside other autoimmune conditions like rheumatoid arthritis or lupus (secondary Sjögren\'s), and it\'s thought to involve immune cells infiltrating and damaging glandular tissue over time. Because the mouth and eyes are already deprived of their normal protective moisture, the Sjögren\'s Foundation notes that substances which further dry or irritate these tissues - caffeine, alcohol, and harsh surfactants like SLS in toothpaste - tend to be especially poorly tolerated compared to their effect on unaffected people. Dry mouth from Sjögren\'s also raises the risk of dental decay, so limiting sugar and maintaining rigorous oral care are commonly recommended alongside medical treatment.',
      generalSources: [
        { title: 'Sjögren\'s Foundation', url: 'https://www.sjogrens.org/understanding-sjogrens/what-is-sjogrens' },
        { title: 'Mayo Clinic - Sjögren\'s Syndrome', url: 'https://www.mayoclinic.org/diseases-conditions/sjogrens-syndrome/symptoms-causes/syc-20353216' },
      ],
      ingredientInfo: {
        'Caffeine': {
          reason: 'Caffeine is a diuretic that worsens the dry mouth and dry eyes that define Sjögren\'s syndrome.',
          sources: [{ title: 'Sjögren\'s Foundation - Diet', url: 'https://www.sjogrens.org/living-with-sjogrens/treatments-and-therapies/other-therapies/nutrition' }],
        },
        'Alcohol': {
          reason: 'Alcohol further dehydrates and irritates already dry mucous membranes in Sjögren\'s patients.',
          sources: [{ title: 'Mayo Clinic - Sjögren\'s', url: 'https://www.mayoclinic.org/diseases-conditions/sjogrens-syndrome/symptoms-causes/syc-20353216' }],
        },
        'Sodium Lauryl Sulfate': {
          reason: 'SLS in toothpaste and cleansers is particularly harsh on the oral tissues already compromised by Sjögren\'s dry mouth.',
          sources: [{ title: 'Sjögren\'s Foundation - Oral Care', url: 'https://www.sjogrens.org/living-with-sjogrens/managing-symptoms/mouth' }],
        },
      },
    },
    
    'graves-disease': {
      description: 'Graves\' disease is an autoimmune disorder in which the immune system produces antibodies that mimic thyroid-stimulating hormone (TSH), binding to and continuously activating the thyroid gland so that it produces far more thyroid hormone than the body needs. The resulting hyperthyroidism speeds up metabolism throughout the body, causing rapid heartbeat, anxiety, weight loss, heat intolerance, and, in some patients, a distinctive bulging of the eyes caused by inflammation behind the eye sockets. Because thyroid hormone production depends on iodine as a raw material, the American Thyroid Association notes that excess dietary iodine can further fuel an already overactive thyroid in Graves\' disease, while soy has been studied for its potential to interfere with thyroid hormone absorption when taken close to thyroid medication. Graves\' disease is typically treated with anti-thyroid medication, radioactive iodine, or surgery, and dietary choices are generally used to avoid aggravating symptoms alongside - not instead of - medical treatment.',
      generalSources: [
        { title: 'American Thyroid Association - Graves\' Disease', url: 'https://www.thyroid.org/graves-disease/' },
        { title: 'Mayo Clinic - Graves\' Disease', url: 'https://www.mayoclinic.org/diseases-conditions/graves-disease/symptoms-causes/syc-20356240' },
      ],
      ingredientInfo: {
        'Iodine': {
          reason: 'Excess dietary iodine can worsen hyperthyroidism in Graves\' disease by providing more substrate for excessive thyroid hormone production.',
          sources: [{ title: 'ATA - Iodine and Thyroid', url: 'https://www.thyroid.org/iodine-deficiency/' }],
        },
        'Caffeine': {
          reason: 'Caffeine worsens the heart palpitations, anxiety, and tremors already caused by excess thyroid hormone in Graves\' disease.',
          sources: [{ title: 'Mayo Clinic - Graves\' Treatment', url: 'https://www.mayoclinic.org/diseases-conditions/graves-disease/diagnosis-treatment/drc-20356245' }],
        },
        'Soy': {
          reason: 'Soy may interfere with thyroid medication absorption and affect thyroid hormone levels.',
          sources: [{ title: 'ATA - Soy and Thyroid', url: 'https://www.thyroid.org/thyroid-and-diet/' }],
        },
      },
    },
    
    'ankylosing-spondylitis': {
      description: 'Ankylosing spondylitis (AS) is a chronic inflammatory form of arthritis that primarily targets the spine and sacroiliac joints (where the spine meets the pelvis), causing pain and stiffness that in severe, longstanding cases can lead to new bone formation and fusion of the vertebrae. It\'s strongly associated with the HLA-B27 gene, though not everyone who carries the gene develops AS, suggesting other immune or environmental factors are also involved. One less mainstream but persistently studied theory, sometimes called the London AS Diet, proposes that Klebsiella bacteria - fed by starchy foods - may trigger or sustain the autoimmune response behind AS in genetically susceptible people, and some patients report symptom improvement on a low-starch diet, though this hasn\'t been established through large controlled trials. More broadly, the Spondylitis Association of America notes that an anti-inflammatory eating pattern - limiting added sugar, alcohol, and pro-inflammatory fats - is commonly used by AS patients alongside medication to help manage joint pain and stiffness.',
      generalSources: [
        { title: 'Spondylitis Association of America', url: 'https://www.spondylitis.org/about-spondylitis' },
        { title: 'Mayo Clinic - Ankylosing Spondylitis', url: 'https://www.mayoclinic.org/diseases-conditions/ankylosing-spondylitis/symptoms-causes/syc-20354808' },
      ],
      ingredientInfo: {
        'Refined Starch': {
          reason: 'The London AS Diet suggests that Klebsiella bacteria fed by starch may trigger the autoimmune response in AS. Many patients report improvement on a low-starch diet.',
          sources: [{ title: 'SAA - Diet and AS', url: 'https://www.spondylitis.org/as-information/diet' }],
        },
        'Refined Sugar': {
          reason: 'Sugar promotes systemic inflammation that can worsen AS joint pain and stiffness.',
          sources: [{ title: 'Arthritis Foundation - Inflammatory Diet', url: 'https://www.arthritis.org/health-wellness/healthy-living/nutrition/anti-inflammatory/the-ultimate-arthritis-diet' }],
        },
        'Alcohol': {
          reason: 'Alcohol may worsen inflammation and interact with medications commonly used for AS.',
          sources: [{ title: 'Mayo Clinic - AS Treatment', url: 'https://www.mayoclinic.org/diseases-conditions/ankylosing-spondylitis/diagnosis-treatment/drc-20354813' }],
        },
      },
    },
    
    'psoriatic-arthritis': {
      description: 'Psoriatic arthritis is an inflammatory arthritis associated with psoriasis, causing joint pain, stiffness, and swelling alongside skin plaques. An anti-inflammatory diet may help manage both skin and joint symptoms.',
      generalSources: [
        { title: 'National Psoriasis Foundation - PsA', url: 'https://www.psoriasis.org/psoriatic-arthritis/' },
        { title: 'Arthritis Foundation - PsA', url: 'https://www.arthritis.org/diseases/psoriatic-arthritis' },
      ],
      ingredientInfo: {
        'Refined Sugar': {
          reason: 'Sugar increases inflammatory markers and may worsen both joint pain and skin flares in psoriatic arthritis.',
          sources: [{ title: 'NPF - Diet and Psoriasis', url: 'https://www.psoriasis.org/diet/' }],
        },
        'Alcohol': {
          reason: 'Alcohol is linked to worsened psoriasis and psoriatic arthritis symptoms and may reduce effectiveness of medications.',
          sources: [{ title: 'NPF - Alcohol and Psoriasis', url: 'https://www.psoriasis.org/alcohol/' }],
        },
        'Seed Oils': {
          reason: 'High omega-6 from seed oils promotes the inflammation that drives both skin and joint symptoms in psoriatic arthritis.',
          sources: [{ title: 'Arthritis Foundation - Omega-6', url: 'https://www.arthritis.org/health-wellness/healthy-living/nutrition/anti-inflammatory/the-ultimate-arthritis-diet' }],
        },
      },
    },
    
    'interstitial-cystitis': {
      description: 'Interstitial cystitis (IC), also known as painful bladder syndrome, is a chronic condition causing recurring bladder pressure, pelvic pain, and urinary urgency or frequency, without the bacterial infection found in a typical UTI. Its exact cause isn\'t fully understood, but it\'s thought to involve a compromised bladder lining that allows irritating substances in urine to reach and inflame the nerve-rich tissue underneath. Because of this, many foods and drinks that would be harmless for most people - anything highly acidic, carbonated, caffeinated, or high in artificial sweeteners - are well-documented bladder irritants for IC, and identifying and eliminating personal trigger foods is considered a first-line, non-medical part of symptom management.',
      generalSources: [
        { title: 'Interstitial Cystitis Association', url: 'https://www.ichelp.org/about-ic/what-is-interstitial-cystitis/' },
        { title: 'Mayo Clinic - Interstitial Cystitis', url: 'https://www.mayoclinic.org/diseases-conditions/interstitial-cystitis/symptoms-causes/syc-20354357' },
      ],
      ingredientInfo: {
        'Caffeine': {
          reason: 'Caffeine is a well-known bladder irritant that worsens urgency and pain in interstitial cystitis.',
          sources: [{ title: 'ICA - IC Diet', url: 'https://www.ichelp.org/living-with-ic/interstitial-cystitis-and-diet/' }],
        },
        'Citric Acid': {
          reason: 'Citric acid in citrus fruits and many beverages is one of the most common IC food triggers.',
          sources: [{ title: 'ICA - IC and Diet', url: 'https://www.ichelp.org/living-with-ic/interstitial-cystitis-and-diet/' }],
        },
        'Artificial Sweeteners': {
          reason: 'Artificial sweeteners are frequently reported as bladder irritants by IC patients.',
          sources: [{ title: 'ICA - Elimination Diet', url: 'https://www.ichelp.org/living-with-ic/interstitial-cystitis-and-diet/' }],
        },
        'Alcohol': {
          reason: 'Alcohol is highly acidic and irritates the bladder lining, making it one of the top IC triggers.',
          sources: [{ title: 'Mayo Clinic - IC Management', url: 'https://www.mayoclinic.org/diseases-conditions/interstitial-cystitis/diagnosis-treatment/drc-20354361' }],
        },
      },
    },
    
    'diabetes-type-1': {
      description: 'Type 1 diabetes is an autoimmune condition where the immune system destroys insulin-producing cells in the pancreas. People with Type 1 require insulin therapy and must carefully manage blood sugar through diet and lifestyle.',
      generalSources: [
        { title: 'ADA - Type 1 Diabetes', url: 'https://diabetes.org/about-diabetes/type-1' },
        { title: 'JDRF - Type 1 Diabetes', url: 'https://www.jdrf.org/t1d-resources/about/' },
      ],
      ingredientInfo: {
        'Refined Sugar': {
          reason: 'Refined sugar causes rapid blood glucose spikes that require precise insulin dosing in Type 1 diabetes.',
          sources: [{ title: 'ADA - Carbohydrate Counting', url: 'https://diabetes.org/food-nutrition/understanding-carbs' }],
        },
        'High Fructose Corn Syrup': {
          reason: 'HFCS rapidly elevates blood glucose and complicates blood sugar management in Type 1 diabetes.',
          sources: [{ title: 'ADA - Sweeteners', url: 'https://diabetes.org/food-nutrition/understanding-carbs/sweeteners' }],
        },
        'Trans Fats': {
          reason: 'Trans fats increase cardiovascular risk, which is already elevated in people with Type 1 diabetes.',
          sources: [{ title: 'ADA - Fats and Diabetes', url: 'https://diabetes.org/food-nutrition/eating-healthy/fats' }],
        },
      },
    },
    
    'diabetes-type-2': {
      description: 'Type 2 diabetes is a metabolic condition where the body becomes resistant to insulin or does not produce enough of it. It is strongly influenced by diet, and managing carbohydrate and sugar intake is central to treatment.',
      generalSources: [
        { title: 'ADA - Type 2 Diabetes', url: 'https://diabetes.org/about-diabetes/type-2' },
        { title: 'CDC - Type 2 Diabetes', url: 'https://www.cdc.gov/diabetes/basics/type2.html' },
      ],
      ingredientInfo: {
        'High Fructose Corn Syrup': {
          reason: 'HFCS strongly promotes insulin resistance and is linked to Type 2 diabetes development and progression.',
          sources: [{ title: 'Princeton Study - HFCS', url: 'https://www.princeton.edu/news/2010/03/22/sweet-problem-princeton-researchers-find-high-fructose-corn-syrup-prompts' }],
        },
        'Trans Fats': {
          reason: 'Trans fats worsen insulin resistance and cardiovascular risk in Type 2 diabetes.',
          sources: [{ title: 'ADA - Fats and Diabetes', url: 'https://diabetes.org/food-nutrition/eating-healthy/fats' }],
        },
        'Refined Grains': {
          reason: 'Refined grains are quickly converted to glucose, spiking blood sugar and worsening insulin resistance.',
          sources: [{ title: 'Harvard - Whole Grains vs Refined', url: 'https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/whole-grains/' }],
        },
      },
    },
    
    'thalassemia-minor': {
      description: 'Thalassemia minor (also called thalassemia trait) is a mild inherited blood disorder where the body produces slightly less hemoglobin than normal. Most carriers have mild or no anemia and live normal lives, but should be mindful of iron intake.',
      generalSources: [
        { title: 'CDC - Thalassemia', url: 'https://www.cdc.gov/ncbddd/thalassemia/' },
        { title: 'Mayo Clinic - Thalassemia', url: 'https://www.mayoclinic.org/diseases-conditions/thalassemia/symptoms-causes/syc-20354995' },
      ],
      ingredientInfo: {
        'Iron Supplements': {
          reason: 'Unlike iron-deficiency anemia, thalassemia minor does not typically require iron supplementation. Unsupervised iron supplementation can lead to iron overload.',
          sources: [{ title: 'CDC - Thalassemia Management', url: 'https://www.cdc.gov/ncbddd/thalassemia/' }],
        },
        'Caffeine': {
          reason: 'Caffeine inhibits iron absorption, which can worsen mild anemia associated with thalassemia minor.',
          sources: [{ title: 'NIH - Iron Absorption', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2959994/' }],
        },
      },
    },
    
    'thalassemia-major': {
      description: 'Thalassemia major (Cooley\'s anemia) is a severe inherited blood disorder requiring regular blood transfusions. These transfusions lead to iron overload, making careful management of iron intake critical.',
      generalSources: [
        { title: 'CDC - Thalassemia', url: 'https://www.cdc.gov/ncbddd/thalassemia/' },
        { title: 'Cooley\'s Anemia Foundation', url: 'https://www.thalassemia.org/learn-about-thalassemia/' },
      ],
      ingredientInfo: {
        'Iron Supplements': {
          reason: 'Thalassemia major causes significant iron overload from regular transfusions. Additional iron from supplements is dangerous and must be avoided without medical supervision.',
          sources: [{ title: 'Cooley\'s Anemia Foundation - Iron Overload', url: 'https://www.thalassemia.org/learn-about-thalassemia/complications/iron-overload/' }],
        },
        'Vitamin C Supplements': {
          reason: 'High-dose vitamin C significantly increases iron absorption, worsening the already dangerous iron overload in thalassemia major.',
          sources: [{ title: 'NIH - Iron Overload', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2959994/' }],
        },
        'Alcohol': {
          reason: 'Alcohol places additional stress on the liver, which is already strained by iron overload in thalassemia major.',
          sources: [{ title: 'Cooley\'s Anemia Foundation', url: 'https://www.thalassemia.org/learn-about-thalassemia/complications/' }],
        },
      },
    },
    
    'endometriosis': {
      description: 'Endometriosis is a chronic condition where tissue similar to the uterine lining grows outside the uterus, causing significant pain, inflammation, and in some cases, fertility issues. An anti-inflammatory diet may help manage symptoms.',
      generalSources: [
        { title: 'Endometriosis Foundation of America', url: 'https://www.endofound.org/' },
        { title: 'Mayo Clinic - Endometriosis', url: 'https://www.mayoclinic.org/diseases-conditions/endometriosis/symptoms-causes/syc-20354656' },
      ],
      ingredientInfo: {
        'Trans Fats': {
          reason: 'Trans fats are associated with higher risk of endometriosis and promote pelvic inflammation.',
          sources: [{ title: 'Human Reproduction Study', url: 'https://academic.oup.com/humrep/article/25/6/1528/590935' }],
        },
        'Red Meat': {
          reason: 'High red meat consumption has been linked to increased endometriosis risk and worsened symptoms in some studies.',
          sources: [{ title: 'American Journal of Obstetrics & Gynecology', url: 'https://pubmed.ncbi.nlm.nih.gov/29627352/' }],
        },
        'Alcohol': {
          reason: 'Alcohol raises estrogen levels, which can stimulate endometrial tissue growth and worsen symptoms.',
          sources: [{ title: 'Endometriosis Foundation - Diet', url: 'https://www.endofound.org/endometriosis-diet' }],
        },
        'Caffeine': {
          reason: 'Caffeine may increase estrogen levels and has been associated with higher endometriosis risk in some studies.',
          sources: [{ title: 'NIH - Caffeine and Endometriosis', url: 'https://pubmed.ncbi.nlm.nih.gov/11739677/' }],
        },
      },
    },
    
    'pmdd': {
      description: 'Premenstrual Dysphoric Disorder (PMDD) is a severe form of PMS causing debilitating mood changes, depression, anxiety, and physical symptoms in the week before menstruation. Diet and lifestyle have a significant impact on symptom severity.',
      generalSources: [
        { title: 'ACOG - PMDD', url: 'https://www.acog.org/womens-health/faqs/premenstrual-syndrome' },
        { title: 'Mayo Clinic - PMDD', url: 'https://www.mayoclinic.org/diseases-conditions/premenstrual-syndrome/symptoms-causes/syc-20376780' },
      ],
      ingredientInfo: {
        'Caffeine': {
          reason: 'Caffeine worsens anxiety, breast tenderness, and sleep disruption that are particularly severe in PMDD.',
          sources: [{ title: 'ACOG - PMS and PMDD', url: 'https://www.acog.org/womens-health/faqs/premenstrual-syndrome' }],
        },
        'Refined Sugar': {
          reason: 'Blood sugar instability from refined sugar worsens mood swings, fatigue, and irritability in PMDD.',
          sources: [{ title: 'NIH - Nutrition and PMS', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3737202/' }],
        },
        'Alcohol': {
          reason: 'Alcohol is a depressant that significantly worsens the mood symptoms central to PMDD.',
          sources: [{ title: 'Mayo Clinic - PMDD', url: 'https://www.mayoclinic.org/diseases-conditions/premenstrual-syndrome/diagnosis-treatment/drc-20376787' }],
        },
        'Excess Salt': {
          reason: 'High sodium intake worsens bloating and water retention that are already pronounced during the luteal phase in PMDD.',
          sources: [{ title: 'ACOG - Lifestyle Changes for PMDD', url: 'https://www.acog.org/womens-health/faqs/premenstrual-syndrome' }],
        },
      },
    },
  
    // Autoimmune Conditions
    'lupus': {
      description: 'Lupus (systemic lupus erythematosus) is a chronic autoimmune disease in which the immune system attacks healthy tissue throughout the body, including the skin, joints, kidneys, and cardiovascular system, producing a wide and often unpredictable range of symptoms. Flares can be triggered by sun exposure, infection, stress, and - for some patients - certain foods and supplements that stimulate immune activity, such as alfalfa sprouts (which contain the amino acid L-canavanine) and immune-boosting herbs like echinacea and garlic. The Lupus Foundation of America notes that because lupus varies so much between individuals, trigger identification is highly personal, and any dietary or supplement changes are best made in coordination with a rheumatologist.',
      generalSources: [
        { title: 'Lupus Foundation of America', url: 'https://www.lupus.org/resources/what-is-lupus' },
        { title: 'Mayo Clinic - Lupus', url: 'https://www.mayoclinic.org/diseases-conditions/lupus/symptoms-causes/syc-20365789' },
      ],
      ingredientInfo: {
        'Alfalfa': {
          reason: 'Alfalfa contains L-canavanine, an amino acid that can trigger lupus flares and worsen symptoms.',
          sources: [
            { title: 'Lupus Foundation - Diet', url: 'https://www.lupus.org/resources/how-can-diet-impact-lupus' },
            { title: 'Johns Hopkins - Lupus and Diet', url: 'https://www.hopkinslupus.org/lupus-info/lifestyle-additional-information/lupus-diet/' },
          ],
        },
        'Garlic': {
          reason: 'Garlic may stimulate the immune system and potentially trigger lupus flares in some individuals.',
          sources: [
            { title: 'Lupus Foundation - Foods to Avoid', url: 'https://www.lupus.org/resources/how-can-diet-impact-lupus' },
          ],
        },
        'Echinacea': {
          reason: 'Echinacea and other immune-boosting supplements may overstimulate the already overactive immune system in lupus.',
          sources: [
            { title: 'Hospital for Special Surgery', url: 'https://www.hss.edu/conditions_lupus-diet-nutrition.asp' },
          ],
        },
      },
    },
    'rheumatoid-arthritis': {
      description: 'Rheumatoid arthritis is an autoimmune disorder causing chronic inflammation of the joints. Anti-inflammatory diets may help manage symptoms.',
      generalSources: [
        { title: 'Arthritis Foundation', url: 'https://www.arthritis.org/diseases/rheumatoid-arthritis' },
        { title: 'Mayo Clinic - RA', url: 'https://www.mayoclinic.org/diseases-conditions/rheumatoid-arthritis/symptoms-causes/syc-20353648' },
      ],
      ingredientInfo: {
        'Omega-6 Fatty Acids': {
          reason: 'Excess omega-6 fatty acids (found in many vegetable oils) may promote inflammation in RA.',
          sources: [
            { title: 'Arthritis Foundation - Diet', url: 'https://www.arthritis.org/health-wellness/healthy-living/nutrition/anti-inflammatory/the-ultimate-arthritis-diet' },
          ],
        },
        'Sugar': {
          reason: 'Added sugars can increase inflammation and may worsen RA symptoms.',
          sources: [
            { title: 'Arthritis Foundation - Sugar', url: 'https://www.arthritis.org/health-wellness/healthy-living/nutrition/foods-to-limit/8-foods-to-avoid-with-arthritis' },
          ],
        },
        'Processed Foods': {
          reason: 'Highly processed foods often contain pro-inflammatory ingredients that may trigger RA flares.',
          sources: [
            { title: 'Cleveland Clinic - RA Diet', url: 'https://my.clevelandclinic.org/health/articles/22729-rheumatoid-arthritis-diet' },
          ],
        },
      },
    },

    'multiple-sclerosis': {
      description: 'Multiple sclerosis (MS) is an autoimmune disease where the immune system attacks the protective covering of nerves. Diet may play a role in managing symptoms.',
      generalSources: [
        { title: 'National MS Society', url: 'https://www.nationalmssociety.org/What-is-MS' },
        { title: 'Mayo Clinic - MS', url: 'https://www.mayoclinic.org/diseases-conditions/multiple-sclerosis/symptoms-causes/syc-20350269' },
      ],
      ingredientInfo: {
        'Saturated Fats': {
          reason: 'Some research suggests high saturated fat intake may worsen MS symptoms and inflammation.',
          sources: [
            { title: 'National MS Society - Diet', url: 'https://www.nationalmssociety.org/Living-Well-With-MS/Diet-Exercise-Healthy-Behaviors/Diet-Nutrition' },
          ],
        },
        'Added Sugars': {
          reason: 'Excess sugar may promote inflammation and fatigue, common concerns in MS management.',
          sources: [
            { title: 'MS Society - Healthy Eating', url: 'https://www.mssociety.org.uk/about-ms/treatments-and-therapies/diet' },
          ],
        },
      },
    },
  
    // Respiratory Conditions
    'asthma': {
      description: 'Asthma is a chronic respiratory condition causing airway inflammation and breathing difficulties. Certain foods and additives can trigger symptoms.',
      generalSources: [
        { title: 'American Lung Association', url: 'https://www.lung.org/lung-health-diseases/lung-disease-lookup/asthma' },
        { title: 'Mayo Clinic - Asthma', url: 'https://www.mayoclinic.org/diseases-conditions/asthma/symptoms-causes/syc-20369653' },
      ],
      ingredientInfo: {
        'Sulfites': {
          reason: 'Sulfites, used as preservatives in wine, dried fruits, and some foods, can trigger asthma attacks in sensitive individuals.',
          sources: [
            { title: 'AAAAI - Sulfite Sensitivity', url: 'https://www.aaaai.org/conditions-treatments/related-conditions/sulfite-sensitivity' },
          ],
        },
        'Artificial Food Colors': {
          reason: 'Some artificial colors and preservatives may trigger asthma symptoms in sensitive people.',
          sources: [
            { title: 'Asthma UK - Food Triggers', url: 'https://www.asthma.org.uk/advice/triggers/food/' },
          ],
        },
        'Salicylates': {
          reason: 'Salicylates (aspirin-like compounds) in some foods can trigger asthma in those with salicylate sensitivity.',
          sources: [
            { title: 'Cleveland Clinic - Samter\'s Triad', url: 'https://my.clevelandclinic.org/health/diseases/17664-samters-triad' },
          ],
        },
      },
    },
    'copd': {
      description: 'Chronic Obstructive Pulmonary Disease (COPD) is a chronic inflammatory lung disease that obstructs airflow. Nutrition plays an important role in managing symptoms.',
      generalSources: [
        { title: 'American Lung Association - COPD', url: 'https://www.lung.org/lung-health-diseases/lung-disease-lookup/copd' },
        { title: 'Mayo Clinic - COPD', url: 'https://www.mayoclinic.org/diseases-conditions/copd/symptoms-causes/syc-20353679' },
      ],
      ingredientInfo: {
        'Excess Salt': {
          reason: 'High sodium intake can cause fluid retention, making breathing more difficult for COPD patients.',
          sources: [
            { title: 'COPD Foundation - Nutrition', url: 'https://www.copdfoundation.org/What-is-COPD/Living-with-COPD/Nutrition.aspx' },
          ],
        },
        'Sulfites': {
          reason: 'Sulfites can trigger respiratory symptoms and should be avoided by those with COPD.',
          sources: [
            { title: 'Cleveland Clinic - COPD Diet', url: 'https://my.clevelandclinic.org/health/articles/9451-nutritional-guidelines-for-people-with-copd' },
          ],
        },
      },
    },
  
    // Kidney Conditions
    'kidney-disease': {
      description: 'Chronic kidney disease (CKD) is a gradual loss of kidney function. Diet management is crucial to prevent further damage and manage symptoms.',
      generalSources: [
        { title: 'National Kidney Foundation', url: 'https://www.kidney.org/atoz/content/about-chronic-kidney-disease' },
        { title: 'Mayo Clinic - CKD', url: 'https://www.mayoclinic.org/diseases-conditions/chronic-kidney-disease/symptoms-causes/syc-20354521' },
      ],
      ingredientInfo: {
        'Sodium': {
          reason: 'High sodium intake increases blood pressure and fluid retention, worsening kidney function.',
          sources: [
            { title: 'NKF - Sodium and CKD', url: 'https://www.kidney.org/atoz/content/sodiumckd' },
          ],
        },
        'Potassium': {
          reason: 'Damaged kidneys cannot properly filter potassium, so intake may need to be limited to prevent dangerous buildup.',
          sources: [
            { title: 'NKF - Potassium and CKD', url: 'https://www.kidney.org/atoz/content/potassium' },
          ],
        },
        'Phosphorus': {
          reason: 'Excess phosphorus can cause bone and heart problems in CKD patients whose kidneys cannot remove it efficiently.',
          sources: [
            { title: 'NKF - Phosphorus and CKD', url: 'https://www.kidney.org/atoz/content/phosphorus' },
          ],
        },
      },
    },
  
    // Skin Conditions
    'eczema': {
      description: 'Eczema (atopic dermatitis) is a chronic inflammatory skin condition causing dry, itchy, and inflamed skin. Managing eczema often involves avoiding irritants and allergens that can trigger flare-ups.',
      generalSources: [
        { title: 'National Eczema Association', url: 'https://nationaleczema.org/eczema/' },
        { title: 'AAD - Eczema Resource Center', url: 'https://www.aad.org/public/diseases/eczema' },
      ],
      ingredientInfo: {
        'Artificial Fragrance': {
          reason: 'Synthetic fragrances are one of the most common triggers for eczema flare-ups, causing skin irritation and allergic reactions in sensitive individuals.',
          sources: [
            { title: 'NEA - Eczema and Fragrance', url: 'https://nationaleczema.org/eczema/causes-and-triggers-of-eczema/' },
            { title: 'AAD - Contact Dermatitis', url: 'https://www.aad.org/public/diseases/a-z/contact-dermatitis-causes' },
          ],
        },
        'Sulfates': {
          reason: 'Sulfates like SLS strip the skin of natural oils, disrupting the skin barrier that is already compromised in eczema patients.',
          sources: [
            { title: 'Journal of Clinical Medicine - Eczema Triggers', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6479297/' },
            { title: 'Cleveland Clinic - Eczema Care', url: 'https://health.clevelandclinic.org/eczema-friendly-skin-care-routine' },
          ],
        },
        'Parabens': {
          reason: 'Parabens can cause skin sensitization and allergic reactions in people with eczema, potentially worsening inflammation.',
          sources: [
            { title: 'Contact Dermatitis Journal', url: 'https://pubmed.ncbi.nlm.nih.gov/25041497/' },
            { title: 'NEA - Product Selection', url: 'https://nationaleczema.org/eczema/treatment/bathing/' },
          ],
        },
        'Alcohol': {
          reason: 'Drying alcohols can severely dehydrate eczema-prone skin, exacerbating dryness, cracking, and irritation.',
          sources: [
            { title: 'AAD - Dry Skin Relief', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/dry/dermatologists-tips-relieve-dry-skin' },
          ],
        },
        'Essential Oils': {
          reason: 'Many essential oils, even natural ones, can be irritating or allergenic to sensitive eczema-prone skin.',
          sources: [
            { title: 'NEA - Natural Doesn\'t Mean Safe', url: 'https://nationaleczema.org/blog/natural-doesnt-mean-safe/' },
          ],
        },
      },
    },
    'rosacea': {
      description: 'Rosacea is a chronic inflammatory skin condition that causes persistent facial redness, visible blood vessels, and sometimes small, acne-like bumps, most commonly across the cheeks, nose, forehead, and chin. Its exact cause isn\'t fully understood, but it\'s thought to involve a combination of blood vessel reactivity, immune system overactivity, and a lower tolerance for irritation than typical skin. The National Rosacea Society\'s own patient surveys consistently identify certain skincare ingredients - fragrance, alcohol, and harsh surfactants like SLS chief among them - as common triggers, since they either irritate an already-reactive skin barrier directly or provoke the flushing response central to a flare, which is why gentle, fragrance-free skincare is a cornerstone of rosacea management alongside any prescribed treatment.',
      generalSources: [
        { title: 'National Rosacea Society', url: 'https://www.rosacea.org/' },
        { title: 'AAD - Rosacea', url: 'https://www.aad.org/public/diseases/rosacea' },
      ],
      ingredientInfo: {
        'Alcohol': {
          reason: 'Alcohol in skincare can cause vasodilation and irritation, triggering rosacea flare-ups and increasing redness.',
          sources: [
            { title: 'NRS - Rosacea Triggers', url: 'https://www.rosacea.org/patients/rosacea-triggers/factors-that-may-trigger-rosacea-flare-ups' },
            { title: 'AAD - Rosacea Treatment', url: 'https://www.aad.org/public/diseases/rosacea/triggers/tips' },
          ],
        },
        'Fragrance': {
          reason: 'Fragrances, both synthetic and natural, are common irritants that can trigger rosacea symptoms.',
          sources: [
            { title: 'NRS - Skin Care Tips', url: 'https://www.rosacea.org/patients/materials/skin-care-tips-for-rosacea' },
          ],
        },
        'Menthol': {
          reason: 'Menthol and other cooling agents can cause burning and stinging sensations in rosacea-prone skin.',
          sources: [
            { title: 'Journal of Drugs in Dermatology', url: 'https://jddonline.com/articles/rosacea-S1545961621P0133X' },
          ],
        },
        'Witch Hazel': {
          reason: 'Witch hazel can be too astringent for rosacea skin and may contain alcohol that worsens symptoms.',
          sources: [
            { title: 'NRS - Ingredients to Avoid', url: 'https://www.rosacea.org/patients/materials/skin-care-tips-for-rosacea' },
          ],
        },
      },
    },
    'psoriasis': {
      description: 'Psoriasis is an autoimmune condition that causes rapid skin cell turnover, resulting in thick, scaly patches. Avoiding irritating ingredients helps manage symptoms and prevent flare-ups.',
      generalSources: [
        { title: 'National Psoriasis Foundation', url: 'https://www.psoriasis.org/' },
        { title: 'AAD - Psoriasis', url: 'https://www.aad.org/public/diseases/psoriasis' },
      ],
      ingredientInfo: {
        'Fragrance': {
          reason: 'Fragrances can irritate psoriatic plaques and trigger inflammation, worsening the condition.',
          sources: [
            { title: 'NPF - Skin Care', url: 'https://www.psoriasis.org/skin-care/' },
          ],
        },
        'Alcohol': {
          reason: 'Alcohol-based products can dry out psoriatic skin, causing cracking and increasing discomfort.',
          sources: [
            { title: 'Cleveland Clinic - Psoriasis Management', url: 'https://my.clevelandclinic.org/health/diseases/6866-psoriasis' },
          ],
        },
        'Sulfates': {
          reason: 'Harsh sulfates can strip oils from already dry psoriatic skin, exacerbating scaling and irritation.',
          sources: [
            { title: 'NPF - Managing Triggers', url: 'https://www.psoriasis.org/triggers/' },
          ],
        },
      },
    },
    'acne': {
      description: 'Acne is a skin condition that occurs when hair follicles become clogged with oil and dead skin cells. Avoiding comedogenic ingredients helps prevent breakouts.',
      generalSources: [
        { title: 'AAD - Acne', url: 'https://www.aad.org/public/diseases/acne' },
        { title: 'Mayo Clinic - Acne', url: 'https://www.mayoclinic.org/diseases-conditions/acne/symptoms-causes/syc-20368047' },
      ],
      ingredientInfo: {
        'Comedogenic Oils': {
          reason: 'Certain oils like coconut oil and cocoa butter can clog pores and worsen acne breakouts.',
          sources: [
            { title: 'AAD - Acne Care', url: 'https://www.aad.org/public/diseases/acne/skin-care/tips' },
          ],
        },
        'Heavy Silicones': {
          reason: 'Some silicones can trap dirt and bacteria against skin, potentially leading to breakouts.',
          sources: [
            { title: 'Journal of Clinical and Aesthetic Dermatology', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2923944/' },
          ],
        },
      },
    },
  
    // Food Allergies
    'dairy-allergy': {
      description: 'Dairy allergy is an immune response to proteins in cow\'s milk, primarily casein and whey. It can affect both diet and topical products containing dairy derivatives.',
      generalSources: [
        { title: 'ACAAI - Milk Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/milk-dairy/' },
        { title: 'Mayo Clinic - Milk Allergy', url: 'https://www.mayoclinic.org/diseases-conditions/milk-allergy/symptoms-causes/syc-20375101' },
      ],
      ingredientInfo: {
        'Casein': {
          reason: 'Casein is the main protein in milk and a primary allergen for those with dairy allergies.',
          sources: [
            { title: 'FARE - Milk Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/milk' },
          ],
        },
        'Whey': {
          reason: 'Whey protein can trigger allergic reactions in people with dairy allergies.',
          sources: [
            { title: 'ACAAI - Hidden Dairy', url: 'https://acaai.org/allergies/allergic-conditions/food/milk-dairy/' },
          ],
        },
        'Lactose': {
          reason: 'While lactose intolerance differs from allergy, products with lactose may also contain allergenic milk proteins.',
          sources: [
            { title: 'NIH - Lactose vs Milk Allergy', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/lactose-intolerance' },
          ],
        },
        'Lactic Acid': {
          reason: 'Although usually synthetically produced, lactic acid can occasionally be dairy-derived. Check sources for sensitive individuals.',
          sources: [
            { title: 'Verywell Health - Hidden Dairy', url: 'https://www.verywellhealth.com/dairy-derivatives-and-milk-allergy-1324355' },
          ],
        },
      },
    },
    'gluten-intolerance': {
      description: 'Gluten intolerance (including celiac disease and non-celiac gluten sensitivity) requires avoiding wheat, barley, and rye proteins. This extends to certain personal care products.',
      generalSources: [
        { title: 'Celiac Disease Foundation', url: 'https://celiac.org/' },
        { title: 'Mayo Clinic - Celiac Disease', url: 'https://www.mayoclinic.org/diseases-conditions/celiac-disease/symptoms-causes/syc-20352220' },
      ],
      ingredientInfo: {
        'Wheat': {
          reason: 'Wheat contains gluten and must be avoided in foods. In cosmetics, wheat-derived ingredients may be a concern for some individuals.',
          sources: [
            { title: 'CDF - Gluten in Cosmetics', url: 'https://celiac.org/gluten-free-living/what-is-gluten/sources-of-gluten/' },
          ],
        },
        'Barley': {
          reason: 'Barley and its derivatives contain gluten and appear in some foods, beverages, and personal care products.',
          sources: [
            { title: 'NIDDK - Celiac Disease', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease' },
          ],
        },
        'Hydrolyzed Wheat Protein': {
          reason: 'Found in hair care products, this ingredient is derived from wheat and contains gluten.',
          sources: [
            { title: 'Gluten Intolerance Group', url: 'https://gluten.org/2019/10/01/gluten-in-personal-care-products/' },
          ],
        },
      },
    },
    'soy-allergy': {
      description: 'Soy allergy is an immune reaction to soy proteins, one of the top 8 food allergens. Soy derivatives appear in many processed foods and some cosmetic products.',
      generalSources: [
        { title: 'ACAAI - Soy Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/soy/' },
        { title: 'FARE - Soy Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/soy' },
      ],
      ingredientInfo: {
        'Soy Lecithin': {
          reason: 'Soy lecithin is a common emulsifier that may trigger reactions in highly sensitive soy-allergic individuals.',
          sources: [
            { title: 'FARE - Soy Allergen', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/soy' },
          ],
        },
        'Soy Protein': {
          reason: 'Soy protein isolates and concentrates are the primary allergenic components in soy.',
          sources: [
            { title: 'ACAAI - Managing Soy Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/soy/' },
          ],
        },
        'Vitamin E (Tocopherol)': {
          reason: 'Vitamin E is often derived from soybeans, though highly refined forms may be safe for many soy-allergic individuals.',
          sources: [
            { title: 'Food Allergy Research & Education', url: 'https://www.foodallergy.org/resources/more-allergens' },
          ],
        },
      },
    },
  
    // Neurological Conditions
    'parkinsons': {
      description: 'Parkinson\'s disease is a progressive neurological disorder that results from the loss of dopamine-producing neurons in the brain, leading to tremor, stiffness, slowed movement, and balance difficulties that worsen over time. Its exact cause is unknown, but the CDC and multiple large epidemiological studies have identified chronic pesticide exposure as one of the most consistently replicated environmental risk factors, alongside other studied contributors like heavy metal exposure and dietary patterns high in trans fats and sugar that promote neuroinflammation. There\'s no dietary cure, but many people with Parkinson\'s work with their care team on nutrition both to support overall brain health and to manage how certain foods interact with Parkinson\'s medications like levodopa.',
      generalSources: [
        { title: 'Parkinson\'s Foundation', url: 'https://www.parkinson.org/' },
        { title: 'NIH - Parkinson\'s Disease', url: 'https://www.ninds.nih.gov/health-information/disorders/parkinsons-disease' },
      ],
      ingredientInfo: {
        'Pesticides': {
          reason: 'Exposure to certain pesticides like paraquat and rotenone has been linked to increased Parkinson\'s risk in research studies.',
          sources: [
            { title: 'NIH - Pesticides and Parkinson\'s', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2725018/' },
            { title: 'Parkinson\'s Foundation - Causes', url: 'https://www.parkinson.org/understanding-parkinsons/causes' },
          ],
        },
        'Heavy Metals': {
          reason: 'Some studies suggest occupational exposure to heavy metals like manganese may increase Parkinson\'s risk.',
          sources: [
            { title: 'Environmental Health Perspectives', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3440133/' },
          ],
        },
        'Industrial Solvents': {
          reason: 'Exposure to certain solvents like trichloroethylene (TCE) has been associated with increased Parkinson\'s risk.',
          sources: [
            { title: 'Annals of Neurology Study', url: 'https://pubmed.ncbi.nlm.nih.gov/22069219/' },
            { title: 'Michael J. Fox Foundation', url: 'https://www.michaeljfox.org/news/environmental-factors-and-parkinsons-disease' },
          ],
        },
      },
    },
  
    // Digestive Conditions
    'ibs': {
      description: 'Irritable Bowel Syndrome (IBS) is a chronic digestive disorder affecting the large intestine. Managing IBS often involves identifying and avoiding trigger foods and additives.',
      generalSources: [
        { title: 'IFFGD - IBS', url: 'https://aboutibs.org/' },
        { title: 'Mayo Clinic - IBS', url: 'https://www.mayoclinic.org/diseases-conditions/irritable-bowel-syndrome/symptoms-causes/syc-20360016' },
      ],
      ingredientInfo: {
        'FODMAPs': {
          reason: 'Fermentable carbohydrates (FODMAPs) can trigger IBS symptoms in many individuals.',
          sources: [
            { title: 'Monash University FODMAP', url: 'https://www.monashfodmap.com/' },
          ],
        },
        'Artificial Sweeteners': {
          reason: 'Sugar alcohols like sorbitol and xylitol can cause digestive distress in IBS patients.',
          sources: [
            { title: 'AGA - IBS Diet', url: 'https://gastro.org/practice-guidance/gi-patient-center/topic/irritable-bowel-syndrome/' },
          ],
        },
        'Gums and Thickeners': {
          reason: 'Some food gums like carrageenan may trigger digestive symptoms in sensitive individuals.',
          sources: [
            { title: 'NIH - Carrageenan', url: 'https://pubmed.ncbi.nlm.nih.gov/28028998/' },
          ],
        },
        'Caffeine': {
          reason: 'Caffeine can stimulate the gut and worsen IBS symptoms, particularly diarrhea-predominant IBS.',
          sources: [
            { title: 'IFFGD - Diet and IBS', url: 'https://aboutibs.org/treatment/diet/' },
          ],
        },
      },
    },
    'crohns': {
      description: 'Crohn\'s disease is a form of inflammatory bowel disease that can cause chronic inflammation anywhere along the digestive tract, from the mouth to the anus, though it most often affects the end of the small intestine and the beginning of the colon. Unlike ulcerative colitis, Crohn\'s inflammation can penetrate through multiple layers of the bowel wall, part of why it can lead to complications like strictures and fistulas if unmanaged. Diet doesn\'t cause Crohn\'s, but research reviewed by the Crohn\'s & Colitis Foundation has linked several common food additives - emulsifiers, certain thickeners, and some artificial sweeteners - to gut barrier disruption and bacterial shifts that can worsen flares, which is why many patients track and limit them alongside their prescribed treatment.',
      generalSources: [
        { title: 'Crohn\'s & Colitis Foundation', url: 'https://www.crohnscolitisfoundation.org/' },
        { title: 'Mayo Clinic - Crohn\'s', url: 'https://www.mayoclinic.org/diseases-conditions/crohns-disease/symptoms-causes/syc-20353304' },
      ],
      ingredientInfo: {
        'Fiber (during flares)': {
          reason: 'High-fiber foods may worsen symptoms during active flares, though fiber can be beneficial during remission.',
          sources: [
            { title: 'CCF - Diet Tips', url: 'https://www.crohnscolitisfoundation.org/diet-and-nutrition' },
          ],
        },
        'Emulsifiers': {
          reason: 'Some research suggests food emulsifiers like carboxymethylcellulose may affect gut inflammation.',
          sources: [
            { title: 'Nature - Emulsifiers Study', url: 'https://www.nature.com/articles/nature14232' },
          ],
        },
      },
    },
  
    // Thyroid Conditions
    'hashimotos': {
      description: 'Hashimoto\'s thyroiditis is an autoimmune condition in which the immune system gradually attacks the thyroid gland, most often leading to hypothyroidism as thyroid tissue is damaged over time. It\'s the most common cause of hypothyroidism in the United States and is usually managed with thyroid hormone replacement medication. Some researchers have studied "molecular mimicry" - a structural resemblance between gluten\'s gliadin protein and thyroid tissue - as one possible reason some Hashimoto\'s patients report fewer flares gluten-free, and soy and excess iodine are commonly flagged because they can interfere with thyroid hormone absorption or worsen autoimmune activity. None of these dietary choices replace medication, but many patients use them alongside it.',
      generalSources: [
        { title: 'American Thyroid Association', url: 'https://www.thyroid.org/hashimotos-thyroiditis/' },
        { title: 'Mayo Clinic - Hashimoto\'s', url: 'https://www.mayoclinic.org/diseases-conditions/hashimotos-disease/symptoms-causes/syc-20351855' },
      ],
      ingredientInfo: {
        'Gluten': {
          reason: 'Some research suggests a link between celiac disease and Hashimoto\'s, and gluten-free diets may help some patients.',
          sources: [
            { title: 'Thyroid Research Study', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7078847/' },
          ],
        },
        'Soy': {
          reason: 'Soy may interfere with thyroid hormone absorption and affect thyroid function in some individuals.',
          sources: [
            { title: 'Journal of Clinical Endocrinology', url: 'https://pubmed.ncbi.nlm.nih.gov/16571087/' },
          ],
        },
        'Goitrogens': {
          reason: 'Goitrogenic foods (raw cruciferous vegetables, millet) may interfere with thyroid function when consumed in large amounts.',
          sources: [
            { title: 'ATA - Thyroid and Diet', url: 'https://www.thyroid.org/thyroid-and-diet/' },
          ],
        },
      },
    },
    'hypothyroidism': {
      description: 'Hypothyroidism is a condition where the thyroid gland doesn\'t produce enough thyroid hormones. Certain foods and substances can interfere with thyroid medication and function.',
      generalSources: [
        { title: 'American Thyroid Association', url: 'https://www.thyroid.org/hypothyroidism/' },
        { title: 'NIDDK - Hypothyroidism', url: 'https://www.niddk.nih.gov/health-information/endocrine-diseases/hypothyroidism' },
      ],
      ingredientInfo: {
        'Soy': {
          reason: 'Soy can interfere with the absorption of thyroid medication if consumed too close to taking medication.',
          sources: [
            { title: 'Thyroid Journal Study', url: 'https://www.thyroid.org/patient-thyroid-information/ct-for-patients/december-2017/vol-10-issue-12-p-8-9/' },
          ],
        },
        'Calcium Supplements': {
          reason: 'Calcium can interfere with thyroid hormone absorption and should be taken separately from medication.',
          sources: [
            { title: 'Mayo Clinic - Thyroid Medication', url: 'https://www.mayoclinic.org/diseases-conditions/hypothyroidism/expert-answers/hypothyroidism/faq-20058536' },
          ],
        },
        'High-Fiber Foods': {
          reason: 'Very high fiber intake can affect thyroid medication absorption; timing medication appropriately is important.',
          sources: [
            { title: 'ATA - Thyroid Medication', url: 'https://www.thyroid.org/thyroid-hormone-treatment/' },
          ],
        },
      },
    },
  
    // Skin Conditions (additional)
    'dandruff': {
      description: 'Dandruff is a common scalp condition causing visible flaking and itching, most often linked to an overgrowth of Malassezia, a yeast that naturally lives on the scalp and feeds on the oils it produces, though dry skin and sensitivity to hair product ingredients can cause or worsen it too. Because dandruff can stem from genuinely different mechanisms - an oily, yeast-driven scalp versus a dry, irritated one - the ingredients that help or hurt can differ from person to person: harsh sulfates and drying alcohols tend to worsen the dry type, while heavy oils like coconut oil can feed Malassezia and worsen the yeast-driven type. Persistent or severe flaking is also worth discussing with a dermatologist, since it can overlap with seborrheic dermatitis.',
      generalSources: [
        { title: 'AAD - Dandruff', url: 'https://www.aad.org/public/diseases/a-z/dandruff-how-to-treat' },
        { title: 'Mayo Clinic - Dandruff', url: 'https://www.mayoclinic.org/diseases-conditions/dandruff/symptoms-causes/syc-20353850' },
      ],
      ingredientInfo: {
        'Harsh Sulfates': {
          reason: 'Sulfates like SLS can strip the scalp of natural oils, potentially worsening dryness and flaking.',
          sources: [
            { title: 'Cleveland Clinic - Dandruff Care', url: 'https://my.clevelandclinic.org/health/diseases/21608-dandruff' },
          ],
        },
        'Alcohol': {
          reason: 'Drying alcohols in hair products can irritate the scalp and exacerbate dandruff symptoms.',
          sources: [
            { title: 'Healthline - Dandruff Causes', url: 'https://www.healthline.com/health/skin-disorders/dandruff-causes' },
          ],
        },
        'Heavy Silicones': {
          reason: 'Buildup from silicones can trap dead skin cells and oils, potentially worsening scalp conditions.',
          sources: [
            { title: 'AAD - Scalp Care', url: 'https://www.aad.org/public/diseases/a-z/dandruff-how-to-treat' },
          ],
        },
      },
    },
    'seborrheic-dermatitis': {
      description: 'Seborrheic dermatitis is a common skin condition causing scaly patches, red skin, and stubborn dandruff. It mainly affects oily areas of the body.',
      generalSources: [
        { title: 'AAD - Seborrheic Dermatitis', url: 'https://www.aad.org/public/diseases/a-z/seborrheic-dermatitis-overview' },
        { title: 'Mayo Clinic - Seborrheic Dermatitis', url: 'https://www.mayoclinic.org/diseases-conditions/seborrheic-dermatitis/symptoms-causes/syc-20352710' },
      ],
      ingredientInfo: {
        'Oleic Acid': {
          reason: 'Oleic acid from oils like olive oil can feed the Malassezia yeast associated with seborrheic dermatitis.',
          sources: [
            { title: 'Journal of Investigative Dermatology', url: 'https://www.jidonline.org/article/S0022-202X(15)41316-X/fulltext' },
          ],
        },
        'Coconut Oil': {
          reason: 'Despite being a common remedy, coconut oil is high in oleic acid and may worsen seborrheic dermatitis.',
          sources: [
            { title: 'DermNet NZ', url: 'https://dermnetnz.org/topics/seborrhoeic-dermatitis' },
          ],
        },
      },
    },
  
    // Neurological/Mental Health Conditions
    'adhd': {
      description: 'Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental condition that affects focus, impulse control, and activity regulation, typically diagnosed in childhood but often persisting into adulthood. Its causes are primarily genetic and neurological, involving differences in dopamine and norepinephrine signaling - diet does not cause ADHD. That said, research including the widely cited UK Southampton study found that certain synthetic food dyes and preservatives can measurably increase hyperactive behavior in a subset of children, which is why the UK and EU (though not the US) require warning labels on foods containing them. Many families managing ADHD choose to limit these additives, added sugar, and caffeine as part of a broader approach alongside medical treatment, though responses vary from person to person.',
      generalSources: [
        { title: 'CHADD - About ADHD', url: 'https://chadd.org/about-adhd/overview/' },
        { title: 'CDC - ADHD', url: 'https://www.cdc.gov/ncbddd/adhd/' },
        { title: 'Mayo Clinic - ADHD', url: 'https://www.mayoclinic.org/diseases-conditions/adhd/symptoms-causes/syc-20350889' },
      ],
      ingredientInfo: {
        'Artificial Food Colors': {
          reason: 'Some studies suggest artificial colors may worsen hyperactivity in some children with ADHD, though research is mixed.',
          sources: [
            { title: 'FDA - Food Additives and ADHD', url: 'https://www.fda.gov/food/food-additives-petitions/questions-and-answers-food-dyes-and-hyperactivity' },
            { title: 'AAP - Food Additives', url: 'https://publications.aap.org/pediatrics/article/142/2/e20181408/37584' },
          ],
        },
        'Artificial Preservatives': {
          reason: 'Preservatives like sodium benzoate have been studied for potential links to hyperactivity in some children.',
          sources: [
            { title: 'Lancet Study', url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(07)61306-3/fulltext' },
          ],
        },
        'Added Sugars': {
          reason: 'While sugar does not cause ADHD, some parents report behavioral changes with high sugar intake.',
          sources: [
            { title: 'CHADD - Sugar and ADHD', url: 'https://chadd.org/attention-article/diet-and-adhd-a-comprehensive-review/' },
          ],
        },
      },
    },
    'anxiety': {
      description: 'Anxiety disorders involve excessive worry and fear that interfere with daily activities. Diet and certain substances can influence anxiety symptoms.',
      generalSources: [
        { title: 'ADAA - Anxiety Disorders', url: 'https://adaa.org/understanding-anxiety' },
        { title: 'NIMH - Anxiety', url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders' },
      ],
      ingredientInfo: {
        'Caffeine': {
          reason: 'Caffeine can trigger or worsen anxiety symptoms by stimulating the nervous system.',
          sources: [
            { title: 'Harvard Health - Caffeine and Anxiety', url: 'https://www.health.harvard.edu/blog/nutritional-psychiatry-your-brain-on-food-201511168626' },
          ],
        },
        'Alcohol': {
          reason: 'While alcohol may temporarily reduce anxiety, it can increase anxiety as it wears off and with regular use.',
          sources: [
            { title: 'ADAA - Alcohol and Anxiety', url: 'https://adaa.org/understanding-anxiety/related-illnesses/substance-abuse' },
          ],
        },
        'Added Sugars': {
          reason: 'Blood sugar fluctuations from high sugar intake may contribute to mood instability and anxiety.',
          sources: [
            { title: 'Journal of Psychiatric Research', url: 'https://pubmed.ncbi.nlm.nih.gov/29229015/' },
          ],
        },
      },
    },
    'depression': {
      description: 'Depression is a mood disorder causing persistent feelings of sadness and loss of interest. Nutrition and lifestyle factors may play a supporting role in mental health.',
      generalSources: [
        { title: 'NIMH - Depression', url: 'https://www.nimh.nih.gov/health/topics/depression' },
        { title: 'Mayo Clinic - Depression', url: 'https://www.mayoclinic.org/diseases-conditions/depression/symptoms-causes/syc-20356007' },
      ],
      ingredientInfo: {
        'Alcohol': {
          reason: 'Alcohol is a depressant that can worsen depression symptoms and interfere with medications.',
          sources: [
            { title: 'NIAAA - Alcohol and Mental Health', url: 'https://www.niaaa.nih.gov/publications/brochures-and-fact-sheets/alcohol-and-mental-health' },
          ],
        },
        'Processed Foods': {
          reason: 'Diets high in processed foods have been associated with increased risk of depression in some studies.',
          sources: [
            { title: 'British Journal of Psychiatry', url: 'https://www.cambridge.org/core/journals/british-journal-of-psychiatry/article/dietary-pattern-and-depressive-symptoms-in-middle-age/00D2D0CB6DCD7F1D95F4F9C1B1F5D2CF' },
          ],
        },
        'Trans Fats': {
          reason: 'Trans fat consumption has been linked to increased risk of depression in some research.',
          sources: [
            { title: 'PLOS ONE Study', url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0016268' },
          ],
        },
      },
    },
  
    // Digestive Conditions (additional)
    'gerd': {
      description: 'Gastroesophageal Reflux Disease (GERD) is a chronic condition in which stomach acid frequently flows backward into the esophagus, causing heartburn, regurgitation, and sometimes damage to the esophageal lining over time. It happens when the lower esophageal sphincter - the muscular valve between the stomach and esophagus - relaxes or weakens more than it should. According to the Mayo Clinic and NIH, certain foods and drinks are well-documented triggers because they either relax that sphincter directly (caffeine, peppermint, chocolate) or add extra acid load to a stomach that\'s already refluxing too easily (citrus, tomato, vinegar), which is why identifying and limiting personal trigger foods is a first-line recommendation alongside any prescribed acid-reducing medication.',
      generalSources: [
        { title: 'NIDDK - GERD', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults' },
        { title: 'Mayo Clinic - GERD', url: 'https://www.mayoclinic.org/diseases-conditions/gerd/symptoms-causes/syc-20361940' },
        { title: 'ACG - GERD', url: 'https://gi.org/topics/acid-reflux/' },
      ],
      ingredientInfo: {
        'Caffeine': {
          reason: 'Caffeine can relax the lower esophageal sphincter, allowing acid to reflux into the esophagus.',
          sources: [
            { title: 'NIDDK - GERD Treatment', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/treatment' },
          ],
        },
        'Chocolate': {
          reason: 'Chocolate contains compounds that may relax the esophageal sphincter and trigger reflux.',
          sources: [
            { title: 'Cleveland Clinic - GERD Diet', url: 'https://my.clevelandclinic.org/health/articles/7240-acid-reflux--gerd' },
          ],
        },
        'Peppermint': {
          reason: 'Peppermint can relax the lower esophageal sphincter, worsening reflux symptoms.',
          sources: [
            { title: 'Johns Hopkins - GERD Diet', url: 'https://www.hopkinsmedicine.org/health/conditions-and-diseases/gerd-diet-foods-that-help-with-acid-reflux-heartburn' },
          ],
        },
        'Acidic Foods': {
          reason: 'Citrus, tomatoes, and other acidic foods can irritate the esophagus and worsen GERD symptoms.',
          sources: [
            { title: 'ACG - Diet and GERD', url: 'https://gi.org/topics/acid-reflux/' },
          ],
        },
        'Spicy Foods': {
          reason: 'Spicy foods can irritate the esophagus and may trigger GERD symptoms in some people.',
          sources: [
            { title: 'Mayo Clinic - Heartburn', url: 'https://www.mayoclinic.org/diseases-conditions/heartburn/symptoms-causes/syc-20373223' },
          ],
        },
      },
    },
    'acid-reflux': {
      description: 'Acid reflux occurs when stomach acid flows back into the esophagus, causing heartburn and discomfort. Dietary modifications can help manage symptoms.',
      generalSources: [
        { title: 'NIDDK - Acid Reflux', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults' },
        { title: 'Mayo Clinic - Heartburn', url: 'https://www.mayoclinic.org/diseases-conditions/heartburn/symptoms-causes/syc-20373223' },
      ],
      ingredientInfo: {
        'Caffeine': {
          reason: 'Caffeine relaxes the lower esophageal sphincter, allowing acid to flow back up.',
          sources: [
            { title: 'Johns Hopkins - Heartburn', url: 'https://www.hopkinsmedicine.org/health/conditions-and-diseases/gerd-diet-foods-that-help-with-acid-reflux-heartburn' },
          ],
        },
        'Fatty Foods': {
          reason: 'High-fat foods slow digestion and can increase pressure on the esophageal sphincter.',
          sources: [
            { title: 'Cleveland Clinic - Acid Reflux', url: 'https://my.clevelandclinic.org/health/articles/7240-acid-reflux--gerd' },
          ],
        },
      },
    },
    'ulcerative-colitis': {
      description: 'Ulcerative colitis is an inflammatory bowel disease causing inflammation and ulcers in the digestive tract, primarily affecting the colon.',
      generalSources: [
        { title: 'Crohn\'s & Colitis Foundation', url: 'https://www.crohnscolitisfoundation.org/what-is-ulcerative-colitis' },
        { title: 'Mayo Clinic - Ulcerative Colitis', url: 'https://www.mayoclinic.org/diseases-conditions/ulcerative-colitis/symptoms-causes/syc-20353326' },
      ],
      ingredientInfo: {
        'Dairy': {
          reason: 'Many people with UC have difficulty digesting dairy, which can worsen symptoms.',
          sources: [
            { title: 'CCF - Diet and UC', url: 'https://www.crohnscolitisfoundation.org/diet-and-nutrition' },
          ],
        },
        'High-Fiber Foods (during flares)': {
          reason: 'Raw fruits, vegetables, and whole grains may irritate the colon during active flares.',
          sources: [
            { title: 'Mayo Clinic - UC Diet', url: 'https://www.mayoclinic.org/diseases-conditions/ulcerative-colitis/symptoms-causes/syc-20353326' },
          ],
        },
      },
    },
  
    // Women\'s Health
    'pcos': {
    description: 'Polycystic Ovary Syndrome (PCOS) is a hormonal disorder affecting women of reproductive age, causing irregular periods, excess androgen levels, and sometimes small cysts on the ovaries. Diet plays a significant role in managing insulin resistance, inflammation, and hormonal balance.',
    generalSources: [
      { title: 'ACOG - PCOS', url: 'https://www.acog.org/womens-health/faqs/polycystic-ovary-syndrome-pcos' },
      { title: 'Mayo Clinic - PCOS', url: 'https://www.mayoclinic.org/diseases-conditions/pcos/symptoms-causes/syc-20353439' },
    ],
    ingredientInfo: {
      'Refined Sugar': {
        reason: 'High sugar intake worsens insulin resistance, a key driver of PCOS symptoms including weight gain, irregular periods, and elevated androgens.',
        sources: [{ title: 'PCOS Awareness Association', url: 'https://www.pcosaa.org/pcos-diet' }],
      },
      'Dairy': {
        reason: 'Dairy contains hormones and growth factors like IGF-1 that may increase androgen levels and worsen hormonal imbalance in PCOS.',
        sources: [{ title: 'Journal of the Academy of Nutrition and Dietetics', url: 'https://jandonline.org/article/S2212-2672(17)30013-X/fulltext' }],
      },
      'Soy': {
        reason: 'Phytoestrogens in soy may interfere with hormonal regulation in women with PCOS, though research is mixed.',
        sources: [{ title: 'Mayo Clinic - PCOS', url: 'https://www.mayoclinic.org/diseases-conditions/pcos/symptoms-causes/syc-20353439' }],
      },
      'Seed Oils': {
        reason: 'High omega-6 fatty acids in seed oils promote inflammation that can worsen insulin resistance and hormonal imbalance in PCOS.',
        sources: [{ title: 'NIH - Inflammation and PCOS', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6266413/' }],
      },
    },
  },
  'hormonal-acne': {
    description: 'Hormonal acne is triggered by fluctuations in hormones — particularly androgens like testosterone — that increase oil production and clog pores. It typically appears along the jawline, chin, and neck and is influenced by diet, stress, and skincare products.',
    generalSources: [
      { title: 'AAD - Hormonal Acne', url: 'https://www.aad.org/public/diseases/acne/causes/hormonal' },
      { title: 'Mayo Clinic - Acne', url: 'https://www.mayoclinic.org/diseases-conditions/acne/symptoms-causes/syc-20368047' },
    ],
    ingredientInfo: {
      'Dairy': {
        reason: 'Dairy products contain hormones and growth factors that stimulate oil glands and increase androgen activity, directly contributing to hormonal acne.',
        sources: [
          { title: 'AAD - Diet and Acne', url: 'https://www.aad.org/public/diseases/acne/causes/diet' },
          { title: 'Journal of the Academy of Nutrition and Dietetics - Dairy and Acne', url: 'https://pubmed.ncbi.nlm.nih.gov/16029679/' },
        ],
      },
      'Whey Protein': {
        reason: 'Whey protein spikes insulin and IGF-1 levels, both of which increase sebum production and androgen activity linked to hormonal acne.',
        sources: [{ title: 'AAD - Diet and Acne', url: 'https://www.aad.org/public/diseases/acne/causes/diet' }],
      },
      'Refined Sugar': {
        reason: 'High glycemic foods cause insulin spikes that trigger androgen production and increase sebum, worsening hormonal acne.',
        sources: [{ title: 'Harvard Health - Acne and Diet', url: 'https://www.health.harvard.edu/diseases-and-conditions/can-the-right-diet-get-rid-of-acne' }],
      },
      'Coconut Oil': {
        reason: 'Coconut oil is highly comedogenic and clogs pores, worsening acne breakouts especially in hormonal acne-prone skin.',
        sources: [{ title: 'AAD - Acne Skin Care', url: 'https://www.aad.org/public/diseases/acne/skin-care/tips' }],
      },
    },
  },
    'breastfeeding': {
      description: 'While breastfeeding, certain ingredients in food, drink, and personal care products can pass through breast milk to your baby. Being mindful of what you consume and apply helps protect your newborn\'s health and development.',
      generalSources: [
        { title: 'La Leche League - Foods and Breastfeeding', url: 'https://www.llli.org/breastfeeding-info/food/' },
        { title: 'CDC - Breastfeeding Nutrition', url: 'https://www.cdc.gov/breastfeeding/breastfeeding-special-circumstances/diet-and-micronutrients/maternal-diet.html' },
        { title: 'Mayo Clinic - Breastfeeding Nutrition', url: 'https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/breastfeeding-nutrition/art-20046912' },
      ],
      ingredientInfo: {
        'Caffeine': {
          reason: 'Caffeine passes into breast milk, typically peaking 1–2 hours after consumption. While small amounts are generally considered safe, high intake can cause infant irritability, poor sleep, and fussiness.',
          sources: [
            { title: 'CDC - Caffeine and Breastfeeding', url: 'https://www.cdc.gov/breastfeeding/breastfeeding-special-circumstances/diet-and-micronutrients/maternal-diet.html' },
            { title: 'AAP - Breastfeeding and Caffeine', url: 'https://www.healthychildren.org/English/ages-stages/baby/breastfeeding/Pages/Maternal-Diet.aspx' },
          ],
        },
        'Alcohol': {
          reason: 'Alcohol passes directly into breast milk at concentrations similar to blood alcohol levels. The AAP recommends waiting at least 2 hours per drink before nursing. Regular or heavy alcohol use should be avoided.',
          sources: [
            { title: 'CDC - Alcohol and Breastfeeding', url: 'https://www.cdc.gov/breastfeeding/breastfeeding-special-circumstances/vaccinations-medications-drugs/alcohol.html' },
            { title: 'AAP - Alcohol and Breastfeeding', url: 'https://publications.aap.org/pediatrics/article/142/2/e20181428/39150' },
          ],
        },
        'Peppermint Oil': {
          reason: 'Menthol and peppermint oil in large amounts have been traditionally associated with reduced milk supply. While occasional dietary use is fine, high-dose peppermint supplements and teas should be used cautiously.',
          sources: [
            { title: 'La Leche League - Herbs and Milk Supply', url: 'https://www.llli.org/breastfeeding-info/herbs/' },
            { title: 'KellyMom - Herbs That Decrease Milk Supply', url: 'https://kellymom.com/bf/can-i-breastfeed/herbs/herbs-that-decrease-milk-supply/' },
          ],
        },
        'Sage': {
          reason: 'Sage is traditionally known to reduce breast milk supply and has been used historically as a weaning herb. Large amounts — such as in supplements or strong teas — should be avoided while breastfeeding.',
          sources: [
            { title: 'KellyMom - Herbs That Decrease Milk Supply', url: 'https://kellymom.com/bf/can-i-breastfeed/herbs/herbs-that-decrease-milk-supply/' },
          ],
        },
        'Parsley': {
          reason: 'In large amounts, parsley may reduce milk supply. Culinary use in normal food portions is considered safe, but parsley supplements or teas should be avoided.',
          sources: [
            { title: 'La Leche League - Herbs and Breastfeeding', url: 'https://www.llli.org/breastfeeding-info/herbs/' },
          ],
        },
        'Retinol': {
          reason: 'Topical retinoids can potentially pass into breast milk. Most dermatologists and the AAP recommend avoiding prescription retinoids and high-dose retinol products during breastfeeding as a precaution.',
          sources: [
            { title: 'AAD - Skin Care While Breastfeeding', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/anti-aging/is-it-safe-to-use-retinol-while-pregnant' },
            { title: 'LactMed - Tretinoin', url: 'https://www.ncbi.nlm.nih.gov/books/NBK501906/' },
          ],
        },
        'Parabens': {
          reason: 'Parabens have been detected in breast milk and can act as endocrine disruptors. Many healthcare providers recommend minimizing paraben exposure during breastfeeding.',
          sources: [
            { title: 'EWG - Parabens', url: 'https://www.ewg.org/what-are-parabens' },
            { title: 'Journal of Exposure Science - Parabens in Breast Milk', url: 'https://pubmed.ncbi.nlm.nih.gov/22237635/' },
          ],
        },
        'Artificial Sweeteners': {
          reason: 'Some artificial sweeteners can pass into breast milk. Research is limited, but many health organizations recommend caution. Saccharin in particular is generally advised against during breastfeeding.',
          sources: [
            { title: 'CDC - Breastfeeding and Diet', url: 'https://www.cdc.gov/breastfeeding/breastfeeding-special-circumstances/diet-and-micronutrients/maternal-diet.html' },
          ],
        },
        'Mercury': {
          reason: 'Mercury passes into breast milk and can affect infant neurological development. High-mercury fish should be limited during breastfeeding for the same reasons as during pregnancy.',
          sources: [
            { title: 'FDA - Fish Advice for Breastfeeding Mothers', url: 'https://www.fda.gov/food/environmental-contaminants-food/advice-about-eating-fish' },
            { title: 'EPA - Mercury and Breastfeeding', url: 'https://www.epa.gov/mercury/guidelines-mercury-exposure-pregnant-women-nursing-mothers-and-young-children' },
          ],
        },
        'Sodium Nitrite': {
          reason: 'Nitrites found in processed and cured meats can pass into breast milk. Minimizing intake of processed meats is generally recommended during breastfeeding.',
          sources: [
            { title: 'CDC - Breastfeeding Maternal Diet', url: 'https://www.cdc.gov/breastfeeding/breastfeeding-special-circumstances/diet-and-micronutrients/maternal-diet.html' },
          ],
        },
        'Formaldehyde': {
          reason: 'Formaldehyde is a carcinogen found in some hair treatments and nail products. Exposure should be minimized during breastfeeding as it can enter the bloodstream through skin and respiratory absorption.',
          sources: [
            { title: 'CDC - Formaldehyde', url: 'https://www.cdc.gov/niosh/topics/formaldehyde/default.html' },
          ],
        },
        'BPA': {
          reason: 'BPA has been detected in breast milk and can affect infant hormonal development. Using BPA-free bottles and containers and avoiding canned foods with BPA linings is recommended during breastfeeding.',
          sources: [
            { title: 'NIH - BPA', url: 'https://www.niehs.nih.gov/health/topics/agents/sya-bpa' },
            { title: 'AAP - BPA and Children', url: 'https://www.healthychildren.org/English/safety-prevention/all-around/Pages/Bisphenol-A-BPA.aspx' },
          ],
        },
        'Salicylic Acid': {
          reason: 'High-dose topical salicylic acid may be absorbed into the bloodstream and potentially pass into breast milk. High-concentration formulas should be discussed with a doctor while breastfeeding.',
          sources: [
            { title: 'LactMed - Salicylic Acid', url: 'https://www.ncbi.nlm.nih.gov/books/NBK501864/' },
          ],
        },
      },
    },
    'pregnant': {
      description: 'Pregnancy is a time when what you eat, drink, and apply to your skin can affect both your health and your baby\'s development. Certain ingredients in food, skincare, and household products should be avoided or minimized during pregnancy.',
      generalSources: [
        { title: 'ACOG - Nutrition During Pregnancy', url: 'https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy' },
        { title: 'CDC - Pregnancy Health', url: 'https://www.cdc.gov/pregnancy/index.html' },
        { title: 'Mayo Clinic - Pregnancy Nutrition', url: 'https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20045082' },
      ],
      ingredientInfo: {
        'Retinol': {
          reason: 'High-dose vitamin A derivatives are teratogenic — meaning they can cause birth defects. Prescription retinoids (tretinoin, adapalene) and high-dose supplements must be avoided. Skincare with retinol should also be discontinued during pregnancy.',
          sources: [
            { title: 'AAD - Skin Care During Pregnancy', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/anti-aging/is-it-safe-to-use-retinol-while-pregnant' },
            { title: 'March of Dimes - Vitamins During Pregnancy', url: 'https://www.marchofdimes.org/pregnancy/vitamins-and-other-nutrients-during-pregnancy.aspx' },
          ],
        },
        'Oxybenzone': {
          reason: 'Oxybenzone is a chemical UV filter that can be absorbed through the skin into the bloodstream. Studies suggest it may act as an endocrine disruptor. Mineral sunscreens with zinc oxide or titanium dioxide are recommended during pregnancy instead.',
          sources: [
            { title: 'EWG - Sunscreen During Pregnancy', url: 'https://www.ewg.org/sunscreen/report/the-trouble-with-sunscreen-chemicals/' },
            { title: 'American Pregnancy Association - Safe Sunscreen', url: 'https://americanpregnancy.org/healthy-pregnancy/is-it-safe/sunscreen-during-pregnancy/' },
          ],
        },
        'Formaldehyde': {
          reason: 'Formaldehyde is a known carcinogen and developmental toxin. It is found in some hair straightening treatments, nail hardeners, and cosmetics. Exposure during pregnancy should be avoided.',
          sources: [
            { title: 'CDC - Formaldehyde', url: 'https://www.cdc.gov/niosh/topics/formaldehyde/default.html' },
            { title: 'FDA - Hair Smoothing Products', url: 'https://www.fda.gov/cosmetics/cosmetic-products/hair-smoothing-products-release-formaldehyde' },
          ],
        },
        'Phthalates': {
          reason: 'Phthalates are endocrine disruptors commonly hidden under the term "fragrance" on ingredient labels. Studies have linked prenatal phthalate exposure to developmental issues in babies.',
          sources: [
            { title: 'NIH - Phthalates and Pregnancy', url: 'https://www.niehs.nih.gov/health/topics/agents/endocrine' },
            { title: 'Harvard Health - Phthalates', url: 'https://www.health.harvard.edu/staying-healthy/phthalates-everywhere-and-the-health-risks-arent-clear' },
          ],
        },
        'Parabens': {
          reason: 'Parabens can cross the placental barrier and have been detected in newborn cord blood. They can mimic estrogen and may affect fetal development.',
          sources: [
            { title: 'Environmental Working Group - Parabens', url: 'https://www.ewg.org/what-are-parabens' },
            { title: 'FDA - Parabens in Cosmetics', url: 'https://www.fda.gov/cosmetics/cosmetic-ingredients/parabens-cosmetics' },
          ],
        },
        'Artificial Sweeteners': {
          reason: 'Some artificial sweeteners, particularly saccharin, are not recommended during pregnancy as they can cross the placenta. Research on others like aspartame and sucralose during pregnancy is limited.',
          sources: [
            { title: 'American Pregnancy Association - Artificial Sweeteners', url: 'https://americanpregnancy.org/healthy-pregnancy/pregnancy-health-wellness/artificial-sweeteners-and-pregnancy/' },
            { title: 'Mayo Clinic - Sweeteners During Pregnancy', url: 'https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/expert-answers/pregnancy-and-aspartame/faq-20058128' },
          ],
        },
        'Caffeine': {
          reason: 'Caffeine crosses the placenta and fetuses cannot metabolize it efficiently. High caffeine intake is associated with low birth weight and increased miscarriage risk. Most guidelines recommend limiting intake to under 200mg per day.',
          sources: [
            { title: 'ACOG - Caffeine During Pregnancy', url: 'https://www.acog.org/womens-health/faqs/moderate-caffeine-consumption-during-pregnancy' },
            { title: 'March of Dimes - Caffeine', url: 'https://www.marchofdimes.org/find-support/topics/pregnancy/caffeine-pregnancy' },
          ],
        },
        'Alcohol': {
          reason: 'No safe level of alcohol consumption during pregnancy has been established. Alcohol crosses the placenta and can cause fetal alcohol spectrum disorders (FASDs), which include physical, behavioral, and learning disabilities.',
          sources: [
            { title: 'CDC - Alcohol During Pregnancy', url: 'https://www.cdc.gov/ncbddd/fasd/alcohol-use.html' },
            { title: 'ACOG - Alcohol and Pregnancy', url: 'https://www.acog.org/womens-health/faqs/alcohol-and-pregnancy' },
          ],
        },
        'Mercury': {
          reason: 'High-mercury fish (shark, swordfish, king mackerel, tilefish, and bigeye tuna) should be avoided during pregnancy. Mercury can damage the fetal nervous system and brain development.',
          sources: [
            { title: 'FDA - Advice About Eating Fish During Pregnancy', url: 'https://www.fda.gov/food/environmental-contaminants-food/advice-about-eating-fish' },
            { title: 'EPA - Mercury and Pregnancy', url: 'https://www.epa.gov/mercury/guidelines-mercury-exposure-pregnant-women-nursing-mothers-and-young-children' },
          ],
        },
        'BPA': {
          reason: 'BPA (bisphenol A) is an endocrine disruptor found in plastics and can linings. It can cross the placenta and has been linked to developmental issues, behavioral problems, and altered hormonal function in children.',
          sources: [
            { title: 'NIH - BPA and Pregnancy', url: 'https://www.niehs.nih.gov/health/topics/agents/sya-bpa' },
            { title: 'Mayo Clinic - BPA', url: 'https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/bpa/faq-20058331' },
          ],
        },
        'Sodium Nitrite': {
          reason: 'Nitrates and nitrites found in processed and cured meats can form nitrosamines, which are potentially harmful. High intake during pregnancy has been associated with adverse outcomes and is best minimized.',
          sources: [
            { title: 'American Pregnancy Association - Foods to Avoid', url: 'https://americanpregnancy.org/healthy-pregnancy/pregnancy-health-wellness/foods-to-avoid-during-pregnancy/' },
          ],
        },
        'Unpasteurized Ingredients': {
          reason: 'Raw and unpasteurized dairy products, juices, and soft cheeses can harbor listeria, a bacteria especially dangerous during pregnancy that can cause miscarriage, stillbirth, or severe illness in newborns.',
          sources: [
            { title: 'CDC - Listeria and Pregnancy', url: 'https://www.cdc.gov/listeria/risk-groups/pregnant-women.html' },
            { title: 'FDA - Foods to Avoid During Pregnancy', url: 'https://www.fda.gov/food/buy-store-serve-safe-food/food-safety-for-pregnant-women-and-their-unborn-babies' },
          ],
        },
        'Salicylic Acid': {
          reason: 'High-dose oral salicylates are associated with complications during pregnancy. Topical salicylic acid in skincare is a lower risk but high concentrations or large surface area application should be avoided as a precaution.',
          sources: [
            { title: 'AAD - Acne Treatment During Pregnancy', url: 'https://www.aad.org/public/diseases/acne/diy/pregnancy-safe' },
          ],
        },
      },
    },
    'postpartum': {
      description: 'The postpartum period is a time of physical recovery and hormonal shifts after childbirth. Whether or not you are breastfeeding, certain ingredients in food, personal care products, and household items may affect your recovery, hormone balance, and overall wellbeing during this sensitive time.',    generalSources: [
        { title: 'La Leche League - Foods and Breastfeeding', url: 'https://www.llli.org/breastfeeding-info/food/' },
        { title: 'CDC - Breastfeeding Nutrition', url: 'https://www.cdc.gov/breastfeeding/breastfeeding-special-circumstances/diet-and-micronutrients/maternal-diet.html' },
        { title: 'Mayo Clinic - Breastfeeding Nutrition', url: 'https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/breastfeeding-nutrition/art-20046912' },
      ],
      ingredientInfo: {
        'Caffeine': {
          reason: 'Caffeine passes into breast milk, typically peaking 1–2 hours after consumption. While small amounts are generally considered safe, high intake can cause infant irritability, poor sleep, and fussiness.',
          sources: [
            { title: 'CDC - Caffeine and Breastfeeding', url: 'https://www.cdc.gov/breastfeeding/breastfeeding-special-circumstances/diet-and-micronutrients/maternal-diet.html' },
            { title: 'AAP - Breastfeeding and Caffeine', url: 'https://www.healthychildren.org/English/ages-stages/baby/breastfeeding/Pages/Maternal-Diet.aspx' },
          ],
        },
        'Alcohol': {
          reason: 'Alcohol passes directly into breast milk at concentrations similar to blood alcohol levels. The AAP recommends waiting at least 2 hours per drink before nursing. Regular or heavy alcohol use should be avoided.',
          sources: [
            { title: 'CDC - Alcohol and Breastfeeding', url: 'https://www.cdc.gov/breastfeeding/breastfeeding-special-circumstances/vaccinations-medications-drugs/alcohol.html' },
            { title: 'AAP - Alcohol and Breastfeeding', url: 'https://publications.aap.org/pediatrics/article/142/2/e20181428/39150' },
          ],
        },
        'Peppermint Oil': {
          reason: 'Menthol and peppermint oil in large amounts have been traditionally associated with reduced milk supply. While occasional dietary use is fine, high-dose peppermint supplements and certain teas should be used cautiously.',
          sources: [
            { title: 'La Leche League - Herbs and Milk Supply', url: 'https://www.llli.org/breastfeeding-info/herbs/' },
            { title: 'KellyMom - Herbs That Decrease Milk Supply', url: 'https://kellymom.com/bf/can-i-breastfeed/herbs/herbs-that-decrease-milk-supply/' },
          ],
        },
        'Sage': {
          reason: 'Sage is traditionally known to reduce breast milk supply and has been used historically as a weaning herb. Large amounts — such as in supplements or strong teas — should be avoided while breastfeeding.',
          sources: [
            { title: 'KellyMom - Herbs That Decrease Milk Supply', url: 'https://kellymom.com/bf/can-i-breastfeed/herbs/herbs-that-decrease-milk-supply/' },
          ],
        },
        'Parsley': {
          reason: 'In large amounts, parsley may reduce milk supply. Culinary use in normal food portions is considered safe, but parsley supplements or teas should be avoided.',
          sources: [
            { title: 'La Leche League - Herbs and Breastfeeding', url: 'https://www.llli.org/breastfeeding-info/herbs/' },
          ],
        },
        'Retinol': {
          reason: 'Topical retinoids can potentially pass into breast milk. Most dermatologists and the AAP recommend avoiding prescription retinoids and high-dose retinol products during breastfeeding as a precaution.',
          sources: [
            { title: 'AAD - Skin Care While Breastfeeding', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/anti-aging/is-it-safe-to-use-retinol-while-pregnant' },
            { title: 'LactMed - Tretinoin', url: 'https://www.ncbi.nlm.nih.gov/books/NBK501906/' },
          ],
        },
        'Parabens': {
          reason: 'Parabens have been detected in breast milk and can act as endocrine disruptors. Many healthcare providers recommend minimizing paraben exposure during breastfeeding.',
          sources: [
            { title: 'EWG - Parabens', url: 'https://www.ewg.org/what-are-parabens' },
            { title: 'Journal of Exposure Science - Parabens in Breast Milk', url: 'https://pubmed.ncbi.nlm.nih.gov/22237635/' },
          ],
        },
        'Artificial Sweeteners': {
          reason: 'Some artificial sweeteners can pass into breast milk. Research is limited, but many health organizations recommend caution. Saccharin in particular is generally advised against during breastfeeding.',
          sources: [
            { title: 'CDC - Breastfeeding and Diet', url: 'https://www.cdc.gov/breastfeeding/breastfeeding-special-circumstances/diet-and-micronutrients/maternal-diet.html' },
          ],
        },
        'Mercury': {
          reason: 'Mercury passes into breast milk and can affect infant neurological development. High-mercury fish should be limited during breastfeeding for the same reasons as during pregnancy.',
          sources: [
            { title: 'FDA - Fish Advice for Breastfeeding Mothers', url: 'https://www.fda.gov/food/environmental-contaminants-food/advice-about-eating-fish' },
            { title: 'EPA - Mercury and Breastfeeding', url: 'https://www.epa.gov/mercury/guidelines-mercury-exposure-pregnant-women-nursing-mothers-and-young-children' },
          ],
        },
        'Sodium Nitrite': {
          reason: 'Nitrites found in processed and cured meats can pass into breast milk. While occasional consumption is unlikely to cause harm, minimizing intake of processed meats is generally recommended for overall health during breastfeeding.',
          sources: [
            { title: 'CDC - Breastfeeding Maternal Diet', url: 'https://www.cdc.gov/breastfeeding/breastfeeding-special-circumstances/diet-and-micronutrients/maternal-diet.html' },
          ],
        },
        'Formaldehyde': {
          reason: 'Formaldehyde is a carcinogen found in some hair treatments and nail products. Exposure should be minimized during breastfeeding as it can enter the bloodstream through skin and respiratory absorption.',
          sources: [
            { title: 'CDC - Formaldehyde', url: 'https://www.cdc.gov/niosh/topics/formaldehyde/default.html' },
          ],
        },
        'BPA': {
          reason: 'BPA has been detected in breast milk and can affect infant hormonal development. Using BPA-free bottles, containers, and avoiding canned foods with BPA linings is recommended during breastfeeding.',
          sources: [
            { title: 'NIH - BPA', url: 'https://www.niehs.nih.gov/health/topics/agents/sya-bpa' },
            { title: 'AAP - BPA and Children', url: 'https://www.healthychildren.org/English/safety-prevention/all-around/Pages/Bisphenol-A-BPA.aspx' },
          ],
        },
        'Salicylic Acid': {
          reason: 'High-dose topical salicylic acid may be absorbed into the bloodstream and potentially pass into breast milk. Using it on small, limited areas is generally considered low risk, but high-concentration formulas should be discussed with a doctor.',
          sources: [
            { title: 'LactMed - Salicylic Acid', url: 'https://www.ncbi.nlm.nih.gov/books/NBK501864/' },
          ],
        },
      },
    },
    'perimenopause': {
      description: 'Perimenopause is the transition period leading up to menopause, often lasting several years, during which estrogen and progesterone levels fluctuate unpredictably rather than declining steadily. This hormonal instability - not a hormone deficit outright - is what makes perimenopause symptoms like irregular periods, hot flashes, mood swings, and sleep disruption often feel more erratic than post-menopausal symptoms. Because the fluctuations themselves drive many symptoms, some people find that stabilizing blood sugar and moderating stimulants like caffeine and alcohol helps smooth out day-to-day symptom severity, though the underlying hormonal shifts continue regardless of diet until the transition completes.',
      generalSources: [
        { title: 'Mayo Clinic - Perimenopause', url: 'https://www.mayoclinic.org/diseases-conditions/perimenopause/symptoms-causes/syc-20354666' },
        { title: 'NAMS - Perimenopause', url: 'https://www.menopause.org/for-women/menopauseflashes/menopause-symptoms-and-treatments/menopause-101-a-primer-for-the-perimenopausal' },
        { title: 'Cleveland Clinic - Perimenopause', url: 'https://my.clevelandclinic.org/health/diseases/21608-perimenopause' },
      ],
      ingredientInfo: {
        'Caffeine': {
          reason: 'Caffeine may worsen hot flashes, sleep problems, and anxiety during perimenopause.',
          sources: [
            { title: 'Mayo Clinic - Hot Flashes', url: 'https://www.mayoclinic.org/diseases-conditions/hot-flashes/diagnosis-treatment/drc-20352795' },
          ],
        },
        'Alcohol': {
          reason: 'Alcohol can trigger hot flashes and disrupt sleep, both common perimenopause concerns.',
          sources: [
            { title: 'NAMS - Alcohol and Menopause', url: 'https://www.menopause.org/for-women' },
          ],
        },
        'Spicy Foods': {
          reason: 'Spicy foods are a common trigger for hot flashes during perimenopause.',
          sources: [
            { title: 'Harvard Health - Hot Flash Triggers', url: 'https://www.health.harvard.edu/womens-health/dealing-with-the-symptoms-of-menopause' },
          ],
        },
        'Added Sugars': {
          reason: 'High sugar intake can contribute to weight gain and blood sugar swings during hormonal changes.',
          sources: [
            { title: 'Cleveland Clinic - Menopause Diet', url: 'https://my.clevelandclinic.org/health/articles/15224-menopause--diet' },
          ],
        },
      },
    },
    'bariatric': {
      description: 'Bariatric surgery is an umbrella term for procedures like gastric bypass and sleeve gastrectomy that support significant weight loss by restricting how much food the stomach can hold, altering how nutrients are absorbed, or both. These anatomical changes mean food and drink move through the digestive system very differently than before surgery - sugar and fat can trigger dumping syndrome, alcohol is absorbed faster and more intensely, and carbonation has far less room to expand comfortably in a much smaller stomach pouch. Because these changes are permanent, careful post-surgery dietary management - eating slowly, prioritizing protein, and working closely with a bariatric dietitian - is critical both to prevent complications and to support the intended long-term outcomes of the surgery.',
      generalSources: [
        { title: 'American Society for Metabolic and Bariatric Surgery', url: 'https://asmbs.org/patients/bariatric-surgery-procedures' },
        { title: 'Mayo Clinic - Bariatric Surgery', url: 'https://www.mayoclinic.org/tests-procedures/bariatric-surgery/about/pac-20394258' },
      ],
      ingredientInfo: {
        'Refined Sugar': {
          reason: 'Sugar causes dumping syndrome after bariatric surgery — rapid emptying of stomach contents causing nausea, dizziness, and diarrhea.',
          sources: [{ title: 'ASMBS - Post-Op Diet', url: 'https://asmbs.org/patients/life-after-bariatric-surgery' }],
        },
        'High Fructose Corn Syrup': {
          reason: 'HFCS triggers dumping syndrome and promotes weight regain after bariatric surgery.',
          sources: [{ title: 'Mayo Clinic - Bariatric Diet', url: 'https://www.mayoclinic.org/tests-procedures/gastric-bypass-surgery/in-depth/bariatric-surgery/art-20048440' }],
        },
        'Carbonated Water': {
          reason: 'Carbonation causes painful gas and bloating in the reduced stomach pouch after bariatric surgery.',
          sources: [{ title: 'ASMBS - Post-Op Guidelines', url: 'https://asmbs.org/patients/life-after-bariatric-surgery' }],
        },
        'Alcohol': {
          reason: 'Alcohol is absorbed much faster after bariatric surgery, leading to rapid intoxication and increased risk of alcohol dependency.',
          sources: [{ title: 'NIH - Alcohol After Bariatric Surgery', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3771431/' }],
        },
      },
    },
    
    'gastrectomy': {
      description: 'Gastrectomy is the surgical removal of all or part of the stomach, typically performed to treat stomach cancer, severe ulcers, or other serious stomach conditions. Because the stomach normally regulates how quickly food moves into the small intestine, removing part or all of it changes that timing dramatically - food, especially sugar, can reach the small intestine too fast, pulling in fluid and triggering dumping syndrome (cramping, nausea, and a rapid heartbeat), while functions like lactose digestion and nutrient absorption are often disrupted too. Careful, often lifelong dietary management - smaller meals, limited sugar and fat, and monitoring for nutrient deficiencies - is a central part of recovery and long-term health after gastrectomy.',
      generalSources: [
        { title: 'Mayo Clinic - Gastrectomy', url: 'https://www.mayoclinic.org/tests-procedures/gastrectomy/about/pac-20384556' },
        { title: 'Cancer Research UK - Life After Gastrectomy', url: 'https://www.cancerresearchuk.org/about-cancer/stomach-cancer/treatment/surgery/total-gastrectomy' },
      ],
      ingredientInfo: {
        'Refined Sugar': {
          reason: 'Sugar causes dumping syndrome after gastrectomy, leading to rapid gastric emptying, nausea, and diarrhea.',
          sources: [{ title: 'Mayo Clinic - Dumping Syndrome', url: 'https://www.mayoclinic.org/diseases-conditions/dumping-syndrome/symptoms-causes/syc-20371915' }],
        },
        'High Fructose Corn Syrup': {
          reason: 'HFCS can trigger dumping syndrome in patients who have had stomach surgery.',
          sources: [{ title: 'Mayo Clinic - Gastrectomy Diet', url: 'https://www.mayoclinic.org/tests-procedures/gastrectomy/about/pac-20384556' }],
        },
        'Lactose': {
          reason: 'Lactose intolerance is common after gastrectomy due to reduced digestive capacity.',
          sources: [{ title: 'Cancer Research UK - Gastrectomy', url: 'https://www.cancerresearchuk.org/about-cancer/stomach-cancer/treatment/surgery/total-gastrectomy' }],
        },
        'Carbonated Water': {
          reason: 'Carbonation causes bloating and discomfort in the reduced stomach after gastrectomy.',
          sources: [{ title: 'Mayo Clinic - Dumping Syndrome Diet', url: 'https://www.mayoclinic.org/diseases-conditions/dumping-syndrome/diagnosis-treatment/drc-20371919' }],
        },
      },
    },
    
    'rheumatoid': {
      description: 'Rheumatoid arthritis (RA) is a chronic autoimmune disease in which the immune system mistakenly attacks the synovium, the lining of the joints, causing painful swelling, stiffness, and - left untreated - progressive joint damage and deformity. Unlike osteoarthritis, which results from mechanical wear, RA is systemic and can also affect the eyes, lungs, and cardiovascular system. Diet doesn\'t cause or cure RA, but the Arthritis Foundation and multiple studies note that inflammatory markers like CRP - the same ones doctors track to monitor RA activity - respond to dietary patterns, which is why many RA patients pair their prescribed medication with an anti-inflammatory approach that limits refined sugar, trans fats, and omega-6-heavy seed oils.',
      generalSources: [
        { title: 'Arthritis Foundation - RA', url: 'https://www.arthritis.org/diseases/rheumatoid-arthritis' },
        { title: 'Mayo Clinic - Rheumatoid Arthritis', url: 'https://www.mayoclinic.org/diseases-conditions/rheumatoid-arthritis/symptoms-causes/syc-20353648' },
        { title: 'NIH - RA', url: 'https://www.niams.nih.gov/health-topics/rheumatoid-arthritis' },
      ],
      ingredientInfo: {
        'Seed Oils': {
          reason: 'Seed oils are high in omega-6 fatty acids which promote the inflammatory processes that drive RA joint pain and swelling.',
          sources: [{ title: 'Arthritis Foundation - Diet', url: 'https://www.arthritis.org/health-wellness/healthy-living/nutrition/anti-inflammatory/the-ultimate-arthritis-diet' }],
        },
        'Refined Sugar': {
          reason: 'Excess sugar increases inflammatory markers and may worsen RA symptoms and flares.',
          sources: [{ title: 'Arthritis Foundation - Sugar', url: 'https://www.arthritis.org/health-wellness/healthy-living/nutrition/foods-to-limit/8-foods-to-avoid-with-arthritis' }],
        },
        'Trans Fats': {
          reason: 'Trans fats promote systemic inflammation, worsening joint damage in RA.',
          sources: [{ title: 'Cleveland Clinic - RA Diet', url: 'https://my.clevelandclinic.org/health/articles/22729-rheumatoid-arthritis-diet' }],
        },
        'Gluten': {
          reason: 'Some RA patients have gluten sensitivity that may exacerbate autoimmune activity and joint inflammation.',
          sources: [{ title: 'NIH - Gluten and Autoimmune Arthritis', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6566844/' }],
        },
      },
    },
    
    'anemia': {
      description: 'Anemia is a condition in which the blood lacks enough healthy red blood cells, or enough hemoglobin within them, to carry adequate oxygen to the body\'s tissues - producing fatigue, weakness, and pale skin. Iron-deficiency anemia is the most common type worldwide, according to the NIH, often resulting from inadequate dietary iron, blood loss, or poor absorption. Because iron absorption is a delicate process, several everyday food compounds - tannins in tea, phytates in whole grains, calcium in dairy and supplements, and polyphenols in coffee - can meaningfully reduce how much iron the body actually absorbs from a meal, which is why people managing anemia are often advised to separate these from iron-rich foods or supplements by a couple of hours.',
      generalSources: [
        { title: 'Mayo Clinic - Anemia', url: 'https://www.mayoclinic.org/diseases-conditions/anemia/symptoms-causes/syc-20351360' },
        { title: 'NIH - Anemia', url: 'https://www.nhlbi.nih.gov/health/anemia' },
        { title: 'American Society of Hematology - Anemia', url: 'https://www.hematology.org/education/patients/anemia' },
      ],
      ingredientInfo: {
        'Calcium Carbonate': {
          reason: 'High calcium intake from supplements or fortified foods can block iron absorption when taken at the same time.',
          sources: [{ title: 'NIH - Iron Absorption', url: 'https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/' }],
        },
        'Tannins': {
          reason: 'Tannins found in tea, coffee, and red wine bind to iron in the digestive tract and significantly reduce its absorption.',
          sources: [{ title: 'NIH - Tannins and Iron', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2959994/' }],
        },
        'Phytic Acid': {
          reason: 'Phytates found in whole grains, legumes, and nuts bind to iron and reduce how much is absorbed.',
          sources: [{ title: 'NIH - Phytates and Iron', url: 'https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/' }],
        },
        'Caffeine': {
          reason: 'Caffeine inhibits iron absorption when consumed with iron-rich meals or supplements.',
          sources: [{ title: 'American Journal of Clinical Nutrition', url: 'https://academic.oup.com/ajcn/article/37/3/416/4691750' }],
        },
      },
    },
    
    'neuropathy': {
      description: 'Peripheral neuropathy is damage to the peripheral nerves - the network outside the brain and spinal cord - causing weakness, numbness, tingling, or pain that usually starts in the hands and feet. Diabetes is the leading cause, since chronically high blood sugar damages small nerve fibers over time, but nutritional deficiencies, toxin exposure, chemotherapy, and autoimmune conditions can all cause it as well. Because nerve damage from high blood sugar and inflammation tends to be cumulative, the NIH and Mayo Clinic both note that tightly managing blood sugar and limiting inflammatory foods - added sugar, trans fats, and for some patients gluten - is one of the few modifiable ways to help slow further nerve damage alongside any underlying medical treatment.',
      generalSources: [
        { title: 'Mayo Clinic - Peripheral Neuropathy', url: 'https://www.mayoclinic.org/diseases-conditions/peripheral-neuropathy/symptoms-causes/syc-20352061' },
        { title: 'NIH - Peripheral Neuropathy', url: 'https://www.ninds.nih.gov/health-information/disorders/peripheral-neuropathy' },
        { title: 'Foundation for Peripheral Neuropathy', url: 'https://www.foundationforpn.org/what-is-peripheral-neuropathy/' },
      ],
      ingredientInfo: {
        'Monosodium Glutamate': {
          reason: 'MSG is an excitotoxin that may worsen nerve sensitivity and pain in peripheral neuropathy.',
          sources: [{ title: 'NIH - Excitotoxicity', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4117557/' }],
        },
        'Refined Sugar': {
          reason: 'High blood sugar from excess sugar directly damages peripheral nerves over time.',
          sources: [{ title: 'Foundation for Peripheral Neuropathy - Diet', url: 'https://www.foundationforpn.org/living-well/self-management/diet/' }],
        },
        'Trans Fats': {
          reason: 'Trans fats promote inflammation that can worsen nerve damage and pain in neuropathy.',
          sources: [{ title: 'Mayo Clinic - Neuropathy', url: 'https://www.mayoclinic.org/diseases-conditions/peripheral-neuropathy/symptoms-causes/syc-20352061' }],
        },
        'Alcohol': {
          reason: 'Alcohol is directly toxic to peripheral nerves and is a leading cause of alcoholic neuropathy.',
          sources: [{ title: 'NIH - Alcoholic Neuropathy', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3839912/' }],
        },
        'Gluten': {
          reason: 'Gluten sensitivity has been linked to peripheral neuropathy in some individuals, even without celiac disease.',
          sources: [{ title: 'Journal of Neurology - Gluten Neuropathy', url: 'https://pubmed.ncbi.nlm.nih.gov/12486246/' }],
        },
      },
    },
    
    'sensitive-skin': {
      description: 'Sensitive skin is a common condition where the skin is easily irritated by products, environmental factors, or lifestyle choices. It often presents as redness, itching, burning, or dryness in response to triggers that do not affect most people.',
      generalSources: [
        { title: 'AAD - Sensitive Skin', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/sensitive/sensitive-skin-care' },
        { title: 'Cleveland Clinic - Sensitive Skin', url: 'https://my.clevelandclinic.org/health/diseases/21987-sensitive-skin' },
      ],
      ingredientInfo: {
        'Synthetic Fragrance': {
          reason: 'Fragrance is the leading cause of irritation and allergic reactions in sensitive skin — both synthetic and some natural fragrances.',
          sources: [{ title: 'AAD - Fragrance and Sensitive Skin', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/sensitive/sensitive-skin-care' }],
        },
        'Alcohol Denat': {
          reason: 'Drying alcohols disrupt the skin barrier in sensitive skin, causing redness, stinging, and dehydration.',
          sources: [{ title: 'AAD - Dry Skin Tips', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/dry/dermatologists-tips-relieve-dry-skin' }],
        },
        'Sodium Lauryl Sulfate': {
          reason: 'SLS is a harsh surfactant that strips the natural moisture barrier, worsening sensitivity and causing irritation.',
          sources: [{ title: 'Cleveland Clinic - Skin Irritants', url: 'https://my.clevelandclinic.org/health/diseases/21987-sensitive-skin' }],
        },
        'Retinol': {
          reason: 'Retinol can cause peeling, redness, and burning in sensitive skin, especially when starting use.',
          sources: [{ title: 'AAD - Retinol and Sensitive Skin', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/anti-aging/is-it-safe-to-use-retinol-while-pregnant' }],
        },
        'Essential Oils': {
          reason: 'Many essential oils, even natural ones, can trigger allergic contact dermatitis in sensitive skin.',
          sources: [{ title: 'NEA - Natural Ingredients and Skin', url: 'https://nationaleczema.org/blog/natural-doesnt-mean-safe/' }],
        },
        'Formaldehyde': {
          reason: 'Formaldehyde and formaldehyde-releasing preservatives are common sensitizers that trigger reactions in sensitive skin.',
          sources: [{ title: 'AAD - Formaldehyde Allergy', url: 'https://www.aad.org/public/diseases/a-z/contact-dermatitis-causes' }],
        },
      },
    },
    
    'celiac': {
      description: 'Celiac disease is a serious autoimmune disorder where the ingestion of gluten leads to damage in the small intestine. It affects about 1 in 100 people worldwide and requires strict lifelong adherence to a gluten-free diet.',
      generalSources: [
        { title: 'Celiac Disease Foundation', url: 'https://celiac.org/about-celiac-disease/what-is-celiac-disease/' },
        { title: 'Mayo Clinic - Celiac Disease', url: 'https://www.mayoclinic.org/diseases-conditions/celiac-disease/symptoms-causes/syc-20352220' },
        { title: 'NIDDK - Celiac Disease', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease' },
      ],
      ingredientInfo: {
        'Gluten': {
          reason: 'Gluten triggers an autoimmune response that damages the villi lining the small intestine, leading to malabsorption of nutrients.',
          sources: [{ title: 'CDF - What is Gluten', url: 'https://celiac.org/gluten-free-living/what-is-gluten/' }],
        },
        'Wheat': {
          reason: 'Wheat contains gluten and must be strictly avoided in all forms including flour, starch, and wheat derivatives.',
          sources: [{ title: 'CDF - Sources of Gluten', url: 'https://celiac.org/gluten-free-living/what-is-gluten/sources-of-gluten/' }],
        },
        'Barley': {
          reason: 'Barley and its derivatives (malt, barley extract) contain gluten and must be avoided in celiac disease.',
          sources: [{ title: 'NIDDK - Celiac Diet', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease/eating-diet-nutrition' }],
        },
        'Rye': {
          reason: 'Rye is a gluten-containing grain that triggers the autoimmune response in celiac disease.',
          sources: [{ title: 'Celiac Disease Foundation - Grains', url: 'https://celiac.org/gluten-free-living/what-is-gluten/sources-of-gluten/' }],
        },
        'Malt': {
          reason: 'Malt is derived from barley and contains gluten — commonly found in beer, cereals, and flavoring syrups.',
          sources: [{ title: 'Beyond Celiac - Hidden Gluten', url: 'https://www.beyondceliac.org/gluten-free-diet/hidden-gluten/' }],
        },
      },
    },
    
    'nut-allergy': {
      description: 'Nut allergy is one of the most common and potentially severe food allergies, involving an immune reaction to proteins in tree nuts or peanuts. Reactions can range from mild (hives, itching) to life-threatening anaphylaxis.',
      generalSources: [
        { title: 'FARE - Tree Nut Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/tree-nut' },
        { title: 'ACAAI - Nut Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/tree-nut/' },
        { title: 'Mayo Clinic - Nut Allergy', url: 'https://www.mayoclinic.org/diseases-conditions/nut-allergy/symptoms-causes/syc-20377733' },
      ],
      ingredientInfo: {
        'Almonds': {
          reason: 'Almonds are a common tree nut allergen and must be avoided including almond flour, almond milk, and almond oil.',
          sources: [{ title: 'FARE - Tree Nut Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/tree-nut' }],
        },
        'Cashews': {
          reason: 'Cashews are among the most allergenic tree nuts, often causing severe reactions.',
          sources: [{ title: 'ACAAI - Tree Nut Allergy', url: 'https://acaai.org/allergies/allergic-conditions/food/tree-nut/' }],
        },
        'Walnuts': {
          reason: 'Walnuts are a top tree nut allergen frequently hidden in baked goods and sauces.',
          sources: [{ title: 'FARE - Hidden Nut Allergens', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/tree-nut' }],
        },
        'Peanuts': {
          reason: 'Peanuts are technically legumes but are one of the most common and severe food allergens. Cross-reactivity with tree nuts is common.',
          sources: [{ title: 'FARE - Peanut Allergy', url: 'https://www.foodallergy.org/living-food-allergies/food-allergy-essentials/common-allergens/peanut' }],
        },
        'Natural Flavors': {
          reason: 'Natural flavors can sometimes be derived from nuts without being explicitly labeled, posing a hidden risk.',
          sources: [{ title: 'FARE - Hidden Allergens', url: 'https://www.foodallergy.org/resources/hidden-allergens' }],
        },
      },
    },
    
    'migraines': {
      description: 'Chronic migraines are recurring headaches occurring 15 or more days per month, often accompanied by nausea, light sensitivity, and visual disturbances. Identifying and avoiding dietary triggers is a key part of migraine management.',
      generalSources: [
        { title: 'American Migraine Foundation', url: 'https://americanmigrainefoundation.org/resource-library/what-is-migraine/' },
        { title: 'Mayo Clinic - Chronic Migraine', url: 'https://www.mayoclinic.org/diseases-conditions/chronic-daily-headaches/symptoms-causes/syc-20370891' },
        { title: 'NIH - Migraine', url: 'https://www.ninds.nih.gov/health-information/disorders/migraine' },
      ],
      ingredientInfo: {
        'Monosodium Glutamate': {
          reason: 'MSG is one of the most frequently reported migraine triggers, potentially affecting neurotransmitter activity.',
          sources: [{ title: 'American Migraine Foundation - MSG', url: 'https://americanmigrainefoundation.org/resource-library/msg-and-migraine/' }],
        },
        'Sodium Nitrite': {
          reason: 'Nitrates in processed meats cause blood vessel dilation that can trigger migraines.',
          sources: [{ title: 'Headache Journal - Nitrates', url: 'https://headachejournal.onlinelibrary.wiley.com/doi/10.1111/head.12878' }],
        },
        'Aspartame': {
          reason: 'Aspartame is a frequently reported migraine trigger in sensitive individuals.',
          sources: [{ title: 'AMF - Diet and Migraine', url: 'https://americanmigrainefoundation.org/resource-library/diet/' }],
        },
        'Tyramine': {
          reason: 'Tyramine found in aged cheeses and fermented foods is a well-documented migraine trigger that affects blood vessel tone.',
          sources: [{ title: 'Cleveland Clinic - Tyramine', url: 'https://my.clevelandclinic.org/health/articles/22530-tyramine' }],
        },
        'Caffeine': {
          reason: 'Caffeine can both trigger migraines and cause rebound headaches during withdrawal.',
          sources: [{ title: 'AMF - Caffeine and Migraine', url: 'https://americanmigrainefoundation.org/resource-library/caffeine-and-migraine/' }],
        },
        'Alcohol': {
          reason: 'Alcohol, particularly red wine, is one of the most common migraine triggers due to compounds like tyramine and histamine.',
          sources: [{ title: 'American Migraine Foundation - Alcohol', url: 'https://americanmigrainefoundation.org/resource-library/alcohol-and-migraine/' }],
        },
      },
    },
    
    'fibromyalgia': {
      description: 'Fibromyalgia is a chronic condition marked by widespread musculoskeletal pain, profound fatigue, unrefreshing sleep, and cognitive difficulties often described as "fibro fog." Researchers believe it involves central sensitization - the nervous system amplifying pain signals - rather than damage to muscles or joints themselves, which is part of why fibromyalgia doesn\'t show up on standard imaging or bloodwork. While no single diet causes or cures fibromyalgia, many patients and the Mayo Clinic note that certain foods can worsen the inflammation, sleep disruption, and pain sensitivity that define a flare. Common approaches include limiting added sugar, artificial sweeteners, and excitotoxin-type additives like MSG alongside a broader anti-inflammatory eating pattern, though individual triggers vary and any major dietary change is best discussed with a healthcare provider.',
      generalSources: [
        { title: 'Mayo Clinic - Fibromyalgia', url: 'https://www.mayoclinic.org/diseases-conditions/fibromyalgia/symptoms-causes/syc-20354780' },
        { title: 'NIH - Fibromyalgia', url: 'https://www.niams.nih.gov/health-topics/fibromyalgia' },
        { title: 'American Fibromyalgia Syndrome Association', url: 'https://www.afsafund.org/' },
      ],
      ingredientInfo: {
        'Monosodium Glutamate': {
          reason: 'MSG is an excitotoxin that may increase pain sensitivity in fibromyalgia by overstimulating pain receptors.',
          sources: [{ title: 'NIH - MSG and Fibromyalgia', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2969045/' }],
        },
        'Aspartame': {
          reason: 'Some fibromyalgia patients report worsened pain and symptoms when consuming aspartame.',
          sources: [{ title: 'Annals of Pharmacotherapy - Aspartame and Fibromyalgia', url: 'https://pubmed.ncbi.nlm.nih.gov/11847945/' }],
        },
        'Refined Sugar': {
          reason: 'Excess sugar can worsen inflammation and energy crashes associated with fibromyalgia.',
          sources: [{ title: 'Mayo Clinic - Fibromyalgia', url: 'https://www.mayoclinic.org/diseases-conditions/fibromyalgia/symptoms-causes/syc-20354780' }],
        },
        'Caffeine': {
          reason: 'While caffeine may temporarily help with fatigue, it can disrupt sleep quality which is already compromised in fibromyalgia.',
          sources: [{ title: 'NIH - Sleep and Fibromyalgia', url: 'https://www.niams.nih.gov/health-topics/fibromyalgia' }],
        },
        'Gluten': {
          reason: 'Some fibromyalgia patients report symptom improvement on a gluten-free diet, particularly those with undiagnosed gluten sensitivity.',
          sources: [{ title: 'Arthritis Research & Therapy - Gluten and Fibromyalgia', url: 'https://pubmed.ncbi.nlm.nih.gov/24507677/' }],
        },
      },
    },
    'menopause': {
      description: 'Menopause is the point marking the end of menstrual cycles, typically occurring in the late 40s to early 50s and diagnosed after twelve consecutive months without a period. It results from the ovaries producing less estrogen and progesterone, a hormonal shift that can bring hot flashes, night sweats, mood changes, sleep disruption, and long-term effects on bone and cardiovascular health. According to the North American Menopause Society and the Mayo Clinic, foods and drinks like caffeine, alcohol, and spicy or sugary items are commonly reported to trigger or worsen hot flashes and disrupt already-fragile sleep, so many people going through menopause choose to moderate them as one part of symptom management alongside medical options like hormone therapy.',
      generalSources: [
        { title: 'NAMS - Menopause', url: 'https://www.menopause.org/' },
        { title: 'Mayo Clinic - Menopause', url: 'https://www.mayoclinic.org/diseases-conditions/menopause/symptoms-causes/syc-20353397' },
      ],
      ingredientInfo: {
        'Caffeine': {
          reason: 'Caffeine can exacerbate hot flashes and interfere with sleep quality.',
          sources: [
            { title: 'Mayo Clinic - Menopause', url: 'https://www.mayoclinic.org/diseases-conditions/menopause/diagnosis-treatment/drc-20353401' },
          ],
        },
        'Alcohol': {
          reason: 'Alcohol may trigger hot flashes and affect bone density, a concern post-menopause.',
          sources: [
            { title: 'NIH - Alcohol and Bone Health', url: 'https://www.bones.nih.gov/health-info/bone/osteoporosis/conditions-behaviors/alcoholism' },
          ],
        },
      },
    },
  
    // Bone & Joint Conditions
    'osteoporosis': {
      description: 'Osteoporosis is a condition causing bones to become weak and brittle. Nutrition, particularly calcium and vitamin D, plays a crucial role in bone health.',
      generalSources: [
        { title: 'NOF - Osteoporosis', url: 'https://www.nof.org/' },
        { title: 'Mayo Clinic - Osteoporosis', url: 'https://www.mayoclinic.org/diseases-conditions/osteoporosis/symptoms-causes/syc-20351968' },
      ],
      ingredientInfo: {
        'Excess Caffeine': {
          reason: 'High caffeine intake may interfere with calcium absorption and contribute to bone loss.',
          sources: [
            { title: 'NIH - Caffeine and Bones', url: 'https://www.bones.nih.gov/health-info/bone/osteoporosis/conditions-behaviors/bone-mass-measure' },
          ],
        },
        'Excess Sodium': {
          reason: 'High sodium intake increases calcium loss through urine, potentially weakening bones.',
          sources: [
            { title: 'NOF - Food and Bone Health', url: 'https://www.nof.org/patients/treatment/nutrition/' },
          ],
        },
        'Alcohol': {
          reason: 'Excessive alcohol consumption interferes with calcium balance and bone-building cells.',
          sources: [
            { title: 'NIH - Alcohol and Osteoporosis', url: 'https://www.bones.nih.gov/health-info/bone/osteoporosis/conditions-behaviors/alcoholism' },
          ],
        },
      },
    },
    'gout': {
      description: 'Gout is a form of arthritis caused by excess uric acid crystals in the joints. Diet management is essential for preventing painful flare-ups.',
      generalSources: [
        { title: 'Arthritis Foundation - Gout', url: 'https://www.arthritis.org/diseases/gout' },
        { title: 'Mayo Clinic - Gout', url: 'https://www.mayoclinic.org/diseases-conditions/gout/symptoms-causes/syc-20372897' },
      ],
      ingredientInfo: {
        'Purines': {
          reason: 'High-purine foods like organ meats and shellfish increase uric acid production and can trigger gout attacks.',
          sources: [
            { title: 'Arthritis Foundation - Gout Diet', url: 'https://www.arthritis.org/health-wellness/healthy-living/nutrition/foods-to-limit/which-foods-are-safe-for-gout' },
          ],
        },
        'Fructose': {
          reason: 'Fructose, especially from sugary drinks, increases uric acid levels and gout risk.',
          sources: [
            { title: 'BMJ Study', url: 'https://www.bmj.com/content/336/7639/309' },
          ],
        },
        'Alcohol': {
          reason: 'Alcohol, especially beer, increases uric acid production and triggers gout flares.',
          sources: [
            { title: 'Mayo Clinic - Gout Diet', url: 'https://www.mayoclinic.org/diseases-conditions/gout/diagnosis-treatment/drc-20372903' },
          ],
        },
      },
    },
  
    // Skin Conditions (additional)
    'perioral-dermatitis': {
      description: 'Perioral dermatitis is a facial rash that causes bumps, redness, and scaling around the mouth, nose, and sometimes eyes. It commonly affects women aged 20-45 and can be triggered or worsened by certain skincare products and topical steroids.',
      generalSources: [
        { title: 'AAD - Perioral Dermatitis', url: 'https://www.aad.org/public/diseases/a-z/perioral-dermatitis-overview' },
        { title: 'Mayo Clinic - Perioral Dermatitis', url: 'https://www.mayoclinic.org/diseases-conditions/perioral-dermatitis/symptoms-causes/syc-20376957' },
        { title: 'DermNet NZ - Perioral Dermatitis', url: 'https://dermnetnz.org/topics/perioral-dermatitis' },
      ],
      ingredientInfo: {
        'Topical Steroids': {
          reason: 'Topical corticosteroids are a leading trigger for perioral dermatitis. While they may temporarily improve symptoms, they often cause rebound flares when discontinued.',
          sources: [
            { title: 'AAD - Perioral Dermatitis Treatment', url: 'https://www.aad.org/public/diseases/a-z/perioral-dermatitis-treatment' },
          ],
        },
        'Heavy Moisturizers': {
          reason: 'Thick, occlusive creams and ointments can worsen perioral dermatitis by clogging pores and trapping irritants.',
          sources: [
            { title: 'Cleveland Clinic - Perioral Dermatitis', url: 'https://my.clevelandclinic.org/health/diseases/21611-perioral-dermatitis' },
          ],
        },
        'Fluoride': {
          reason: 'Fluoride in toothpaste has been associated with perioral dermatitis flares in some individuals.',
          sources: [
            { title: 'DermNet NZ - Perioral Dermatitis', url: 'https://dermnetnz.org/topics/perioral-dermatitis' },
          ],
        },
        'SLS (Sodium Lauryl Sulfate)': {
          reason: 'SLS in cleansers and toothpaste can irritate sensitive skin and trigger or worsen perioral dermatitis.',
          sources: [
            { title: 'National Eczema Association', url: 'https://nationaleczema.org/eczema/causes-and-triggers-of-eczema/' },
          ],
        },
        'Fragrances': {
          reason: 'Synthetic fragrances in skincare products can irritate the delicate facial skin affected by perioral dermatitis.',
          sources: [
            { title: 'AAD - Sensitive Skin', url: 'https://www.aad.org/public/everyday-care/skin-care-basics/sensitive/sensitive-skin-care' },
          ],
        },
      },
    },
  }
  