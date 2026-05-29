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
      description: 'Alzheimer\'s disease is a progressive neurological disorder that causes brain cells to degenerate and die, leading to memory loss and cognitive decline. Research suggests certain environmental factors and dietary choices may influence risk.',
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
      description: 'Dementia is a general term for loss of memory, language, problem-solving and other thinking abilities severe enough to interfere with daily life. Alzheimer\'s is the most common cause.',
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
      description: 'Multiple Sclerosis (MS) is a chronic autoimmune disease where the immune system attacks the myelin sheath protecting nerve fibers, disrupting communication between the brain and body. Diet and lifestyle factors may help manage inflammation and symptoms.',
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
      description: 'Amyotrophic Lateral Sclerosis (ALS), also known as Lou Gehrig\'s disease, is a progressive neurodegenerative disease that affects nerve cells in the brain and spinal cord controlling voluntary muscle movement. Research is ongoing into environmental and dietary factors that may influence disease progression.',
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
      description: 'Epilepsy is a neurological disorder characterized by recurrent seizures. Certain substances and dietary factors may influence seizure activity.',
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
  
    // Metabolic Conditions
    'diabetes': {
      description: 'Diabetes is a chronic condition affecting how your body processes blood sugar (glucose). Managing carbohydrate intake and avoiding blood sugar spikes is essential.',
      generalSources: [
        { title: 'American Diabetes Association', url: 'https://diabetes.org/about-diabetes' },
        { title: 'CDC - Diabetes', url: 'https://www.cdc.gov/diabetes/' },
      ],
      ingredientInfo: {
        'Added Sugars': {
          reason: 'Added sugars can cause rapid blood sugar spikes and contribute to insulin resistance over time.',
          sources: [
            { title: 'ADA - Sugar and Diabetes', url: 'https://diabetes.org/food-nutrition/understanding-carbs/get-to-know-carbs' },
          ],
        },
        'Refined Carbohydrates': {
          reason: 'Refined carbs are quickly converted to glucose, causing blood sugar spikes that are challenging to manage.',
          sources: [
            { title: 'Harvard Health - Carbs and Diabetes', url: 'https://www.health.harvard.edu/diseases-and-conditions/glycemic-index-and-glycemic-load-for-100-foods' },
          ],
        },
        'Trans Fats': {
          reason: 'Trans fats may increase insulin resistance and inflammation, worsening diabetes control.',
          sources: [
            { title: 'ADA - Fats and Diabetes', url: 'https://diabetes.org/food-nutrition/eating-healthy/fats' },
          ],
        },
      },
    },
    'obesity': {
      description: 'Obesity is a complex disease involving an excessive amount of body fat. It increases risk for many health conditions and requires attention to caloric intake and food quality.',
      generalSources: [
        { title: 'CDC - Obesity', url: 'https://www.cdc.gov/obesity/' },
        { title: 'Mayo Clinic - Obesity', url: 'https://www.mayoclinic.org/diseases-conditions/obesity/symptoms-causes/syc-20375742' },
      ],
      ingredientInfo: {
        'High-Fructose Corn Syrup': {
          reason: 'HFCS is linked to increased caloric intake, weight gain, and metabolic dysfunction.',
          sources: [
            { title: 'Princeton Study', url: 'https://www.princeton.edu/news/2010/03/22/sweet-problem-princeton-researchers-find-high-fructose-corn-syrup-prompts' },
          ],
        },
        'Trans Fats': {
          reason: 'Trans fats promote abdominal fat gain and are linked to weight gain even at the same caloric intake.',
          sources: [
            { title: 'Wake Forest Study', url: 'https://news.wakehealth.edu/2006/06/16/trans-fat-leads-to-weight-gain-even-on-same-total-calories' },
          ],
        },
        'Ultra-Processed Foods': {
          reason: 'Ultra-processed foods are engineered to be hyperpalatable, leading to overconsumption and weight gain.',
          sources: [
            { title: 'NIH - Ultra-Processed Foods', url: 'https://www.nih.gov/news-events/nih-research-matters/eating-highly-processed-foods-linked-weight-gain' },
          ],
        },
      },
    },
  
    // Autoimmune Conditions
    'lupus': {
      description: 'Lupus is a chronic autoimmune disease where the immune system attacks healthy tissue. Avoiding certain triggers can help manage flare-ups.',
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
    'celiac-disease': {
      description: 'Celiac disease is an autoimmune disorder where gluten triggers an immune response damaging the small intestine. Strict gluten avoidance is essential.',
      generalSources: [
        { title: 'Celiac Disease Foundation', url: 'https://celiac.org/about-celiac-disease/what-is-celiac-disease/' },
        { title: 'Mayo Clinic - Celiac', url: 'https://www.mayoclinic.org/diseases-conditions/celiac-disease/symptoms-causes/syc-20352220' },
      ],
      ingredientInfo: {
        'Gluten': {
          reason: 'Gluten (found in wheat, barley, and rye) triggers an autoimmune response that damages the intestinal lining.',
          sources: [
            { title: 'CDF - What is Gluten', url: 'https://celiac.org/gluten-free-living/what-is-gluten/' },
          ],
        },
        'Hidden Gluten': {
          reason: 'Gluten can hide in sauces, seasonings, medications, and processed foods under various names.',
          sources: [
            { title: 'CDF - Sources of Gluten', url: 'https://celiac.org/gluten-free-living/what-is-gluten/sources-of-gluten/' },
          ],
        },
        'Cross-Contamination': {
          reason: 'Even small amounts of gluten from cross-contamination can cause damage in people with celiac disease.',
          sources: [
            { title: 'Beyond Celiac - Cross Contact', url: 'https://www.beyondceliac.org/gluten-free-diet/cross-contact/' },
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
      description: 'Rosacea is a chronic skin condition causing redness, visible blood vessels, and sometimes small bumps on the face. Managing rosacea requires avoiding known triggers that can cause flare-ups.',
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
      description: 'Parkinson\'s disease is a progressive neurological disorder affecting movement. Research suggests certain environmental toxins may be associated with increased risk.',
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
      description: 'Crohn\'s disease is an inflammatory bowel disease (IBD) that causes chronic inflammation of the digestive tract. Diet management can help reduce symptoms.',
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
      description: 'Hashimoto\'s thyroiditis is an autoimmune condition where the immune system attacks the thyroid gland. Managing the condition may involve avoiding certain substances that affect thyroid function.',
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
      description: 'Dandruff is a common scalp condition causing flaking and itching. It may be caused by a yeast-like fungus, dry skin, or sensitivity to hair products.',
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
      description: 'Attention Deficit Hyperactivity Disorder (ADHD) is a neurodevelopmental disorder affecting focus, impulse control, and activity levels. Some research explores potential dietary influences.',
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
      description: 'Gastroesophageal Reflux Disease (GERD) is a chronic condition where stomach acid flows back into the esophagus, causing heartburn and other symptoms.',
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
      description: 'Perimenopause is the transition period before menopause when hormone levels fluctuate. Certain substances may worsen symptoms like hot flashes and mood changes.',
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
    'menopause': {
      description: 'Menopause marks the end of menstrual cycles, typically occurring in the late 40s to early 50s. Managing symptoms often involves lifestyle and dietary adjustments.',
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
    'endometriosis': {
      description: 'Endometriosis is a condition where tissue similar to the uterine lining grows outside the uterus, causing pain and other symptoms.',
      generalSources: [
        { title: 'Endometriosis Foundation of America', url: 'https://www.endofound.org/' },
        { title: 'Mayo Clinic - Endometriosis', url: 'https://www.mayoclinic.org/diseases-conditions/endometriosis/symptoms-causes/syc-20354656' },
      ],
      ingredientInfo: {
        'Trans Fats': {
          reason: 'Trans fats may increase inflammation and have been associated with higher endometriosis risk.',
          sources: [
            { title: 'Human Reproduction Study', url: 'https://academic.oup.com/humrep/article/25/6/1528/590935' },
          ],
        },
        'Red Meat': {
          reason: 'High red meat consumption has been linked to increased endometriosis risk in some studies.',
          sources: [
            { title: 'American Journal of Obstetrics & Gynecology', url: 'https://pubmed.ncbi.nlm.nih.gov/29627352/' },
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
  