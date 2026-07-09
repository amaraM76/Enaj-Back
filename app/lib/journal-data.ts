// Seed data for the Weekly Health Journal catalog (JournalCategory / JournalCondition).
// Mirrors the content that used to live only in the frontend's lib/journal-data.ts —
// temporary/short-term conditions users can track from the Journal tab.

export interface JournalConditionSeed {
    slug: string
    name: string
    description: string
    whatWeMonitor: {
      ingredient: string
      reason: string
      sources: { title: string; url: string }[]
    }[]
    funFacts: string[]
    tips: string[]
    generalSources: { title: string; url: string }[]
  }
  
  export interface JournalCategorySeed {
    slug: string
    label: string
    icon: string
    sortOrder: number
    conditions: JournalConditionSeed[]
  }
  
  export const journalCategoriesSeedData: JournalCategorySeed[] = [
    {
      slug: 'viral-bacterial',
      label: 'Common Illnesses (Viral & Bacterial)',
      icon: 'Thermometer',
      sortOrder: 1,
      conditions: [
        {
          slug: 'common-cold',
          name: 'Cold / Common Cold',
          description: 'The common cold is a viral infection of your nose and throat. While usually harmless, it can feel miserable. Most people recover within 7-10 days.',
          whatWeMonitor: [
            {
              ingredient: 'Dairy Products',
              reason: 'Dairy may thicken mucus production in some people, potentially worsening congestion during a cold.',
              sources: [
                { title: 'Mayo Clinic - Cold Remedies', url: 'https://www.mayoclinic.org/diseases-conditions/common-cold/in-depth/cold-remedies/art-20046403' },
              ],
            },
            {
              ingredient: 'Refined Sugar',
              reason: 'High sugar intake may temporarily suppress immune function, potentially slowing recovery.',
              sources: [
                { title: 'NIH - Sugar and Immunity', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5836209/' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol can dehydrate you and interfere with sleep quality, both of which are crucial for recovery.',
              sources: [
                { title: 'Cleveland Clinic - Foods When Sick', url: 'https://health.clevelandclinic.org/foods-to-eat-when-you-have-the-flu/' },
              ],
            },
          ],
          funFacts: [
            'Adults get an average of 2-3 colds per year, while children may get 6-8.',
            'The cold virus can survive on surfaces for up to 24 hours.',
            'Chicken soup really does help - it has mild anti-inflammatory effects and helps with hydration.',
            'Zinc supplements taken within 24 hours of symptoms may shorten cold duration.',
          ],
          tips: [
            'Stay hydrated - aim for at least 8 glasses of water daily',
            'Rest is your best medicine',
            'Honey can soothe a sore throat (for adults and children over 1)',
            'Use a humidifier to ease congestion',
          ],
          generalSources: [
            { title: 'CDC - Common Cold', url: 'https://www.cdc.gov/common-cold/about/index.html' },
            { title: 'Mayo Clinic - Common Cold', url: 'https://www.mayoclinic.org/diseases-conditions/common-cold/symptoms-causes/syc-20351605' },
          ],
        },
        {
          slug: 'flu',
          name: 'Flu (Influenza)',
          description: 'Influenza is a contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness and can lead to hospitalization or death in severe cases.',
          whatWeMonitor: [
            {
              ingredient: 'Processed Foods',
              reason: 'Processed foods are often high in sodium and low in nutrients your body needs to fight infection.',
              sources: [
                { title: 'Harvard Health - Flu Diet', url: 'https://www.health.harvard.edu/staying-healthy/how-to-boost-your-immune-system' },
              ],
            },
            {
              ingredient: 'Caffeine (Excess)',
              reason: 'Too much caffeine can interfere with sleep and cause dehydration when you need rest most.',
              sources: [
                { title: 'Cleveland Clinic - Flu Recovery', url: 'https://health.clevelandclinic.org/foods-to-eat-when-you-have-the-flu/' },
              ],
            },
            {
              ingredient: 'Fatty Foods',
              reason: 'High-fat foods can be harder to digest and may worsen nausea associated with the flu.',
              sources: [
                { title: 'Medical News Today - Flu Diet', url: 'https://www.medicalnewstoday.com/articles/324153' },
              ],
            },
          ],
          funFacts: [
            'The flu virus can spread up to 6 feet through respiratory droplets.',
            'You can spread the flu 1 day before symptoms appear and up to 7 days after getting sick.',
            'Flu season peaks between December and February in the Northern Hemisphere.',
            "The 1918 flu pandemic infected about one-third of the world's population.",
          ],
          tips: [
            'Get plenty of rest - your body needs energy to fight infection',
            'Drink warm liquids like broth and herbal tea',
            'Consider antiviral medication if diagnosed within 48 hours',
            'Stay home to avoid spreading the virus to others',
          ],
          generalSources: [
            { title: 'CDC - Flu', url: 'https://www.cdc.gov/flu/about/index.html' },
            { title: 'WHO - Influenza', url: 'https://www.who.int/news-room/fact-sheets/detail/influenza-(seasonal)' },
          ],
        },
        {
          slug: 'covid-19',
          name: 'COVID-19',
          description: 'COVID-19 is a respiratory illness caused by the SARS-CoV-2 virus. Symptoms can range from mild to severe, and proper nutrition can support your recovery.',
          whatWeMonitor: [
            {
              ingredient: 'Processed Sugar',
              reason: 'High sugar intake can increase inflammation and may impair immune response during COVID recovery.',
              sources: [
                { title: 'NIH - Nutrition and COVID', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7551447/' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol can weaken immune function and interact negatively with COVID medications.',
              sources: [
                { title: 'WHO - Alcohol and COVID', url: 'https://www.who.int/news-room/questions-and-answers/item/coronavirus-disease-covid-19-alcohol' },
              ],
            },
            {
              ingredient: 'Sodium (Excess)',
              reason: 'High sodium can contribute to inflammation and fluid retention, potentially worsening symptoms.',
              sources: [
                { title: 'Harvard Health - COVID Nutrition', url: 'https://www.health.harvard.edu/diseases-and-conditions/treatments-for-covid-19' },
              ],
            },
          ],
          funFacts: [
            'Loss of taste and smell is more common with COVID-19 than other respiratory illnesses.',
            'Vitamin D deficiency has been associated with more severe COVID outcomes.',
            'The average incubation period is 5 days, but can range from 2-14 days.',
            'Staying well-hydrated can help thin mucus and support recovery.',
          ],
          tips: [
            'Monitor your oxygen levels if available',
            'Eat anti-inflammatory foods like fruits, vegetables, and omega-3 rich fish',
            'Stay hydrated with water, broth, and electrolyte drinks',
            "Rest is essential - don't rush back to normal activities",
          ],
          generalSources: [
            { title: 'CDC - COVID-19', url: 'https://www.cdc.gov/covid/index.html' },
            { title: 'WHO - COVID-19', url: 'https://www.who.int/health-topics/coronavirus' },
          ],
        },
        {
          slug: 'strep-throat',
          name: 'Strep Throat',
          description: 'Strep throat is a bacterial infection that causes inflammation and pain in the throat. Unlike viral sore throats, strep requires antibiotic treatment.',
          whatWeMonitor: [
            {
              ingredient: 'Dairy Products',
              reason: 'Dairy can coat the throat and potentially increase mucus, making swallowing more uncomfortable during strep throat.',
              sources: [
                { title: 'Cleveland Clinic - Strep Throat', url: 'https://my.clevelandclinic.org/health/diseases/4602-strep-throat' },
              ],
            },
            {
              ingredient: 'Acidic Foods',
              reason: 'Citrus fruits, tomatoes, and vinegar-based foods can irritate an already inflamed throat.',
              sources: [
                { title: 'Mayo Clinic - Strep Throat', url: 'https://www.mayoclinic.org/diseases-conditions/strep-throat/diagnosis-treatment/drc-20350344' },
              ],
            },
            {
              ingredient: 'Artificial Sweeteners',
              reason: "Some artificial sweeteners may irritate the throat and don't provide the soothing benefits of natural honey.",
              sources: [
                { title: 'Healthline - Strep Diet', url: 'https://www.healthline.com/health/strep-throat' },
              ],
            },
            {
              ingredient: 'Spicy Foods',
              reason: 'Spicy foods can cause additional throat irritation and pain when you have strep.',
              sources: [
                { title: 'Medical News Today - Foods for Sore Throat', url: 'https://www.medicalnewstoday.com/articles/324766' },
              ],
            },
          ],
          funFacts: [
            'Strep throat is most common in children ages 5-15, but adults can get it too.',
            'Without treatment, strep can lead to rheumatic fever, which can damage the heart.',
            "You're no longer contagious 24 hours after starting antibiotics.",
            'Warm salt water gargles can provide temporary relief (1/4 teaspoon salt in 8 oz water).',
            'Honey has natural antibacterial properties that can help soothe strep symptoms.',
          ],
          tips: [
            'Complete your entire antibiotic course, even if you feel better',
            'Eat soft, soothing foods like warm soup and mashed potatoes',
            'Drink warm liquids - avoid very hot or very cold beverages',
            'Use a humidifier to keep your throat moist',
          ],
          generalSources: [
            { title: 'CDC - Strep Throat', url: 'https://www.cdc.gov/group-a-strep/about/strep-throat.html' },
            { title: 'Mayo Clinic - Strep Throat', url: 'https://www.mayoclinic.org/diseases-conditions/strep-throat/symptoms-causes/syc-20350338' },
          ],
        },
        {
          slug: 'mono',
          name: 'Mononucleosis',
          description: 'Mononucleosis (mono) is a viral infection usually caused by the Epstein-Barr virus. It\'s known as "the kissing disease" and causes extreme fatigue.',
          whatWeMonitor: [
            {
              ingredient: 'Alcohol',
              reason: 'Mono affects the liver, and alcohol can put additional strain on this organ during recovery.',
              sources: [
                { title: 'Mayo Clinic - Mono', url: 'https://www.mayoclinic.org/diseases-conditions/mononucleosis/symptoms-causes/syc-20350328' },
              ],
            },
            {
              ingredient: 'High-Fat Foods',
              reason: 'The liver processes fats, and reducing fat intake can ease the burden during mono recovery.',
              sources: [
                { title: 'Cleveland Clinic - Mono', url: 'https://my.clevelandclinic.org/health/diseases/13974-mononucleosis' },
              ],
            },
            {
              ingredient: 'Processed Foods',
              reason: 'Your body needs nutrient-dense foods to recover; processed foods offer little nutritional value.',
              sources: [
                { title: 'Healthline - Mono Diet', url: 'https://www.healthline.com/health/mononucleosis' },
              ],
            },
          ],
          funFacts: [
            "About 90% of adults have antibodies to EBV, meaning they've had mono at some point.",
            'Fatigue from mono can last for months, even after other symptoms resolve.',
            'You should avoid contact sports for at least a month due to risk of spleen rupture.',
            'The virus can remain dormant in your body for life after initial infection.',
          ],
          tips: [
            'Rest is crucial - mono fatigue is no joke',
            'Stay hydrated with water and electrolyte drinks',
            'Avoid strenuous activity to protect your spleen',
            'Eat small, frequent meals if appetite is low',
          ],
          generalSources: [
            { title: 'CDC - EBV and Mono', url: 'https://www.cdc.gov/epstein-barr/about/index.html' },
            { title: 'Mayo Clinic - Mononucleosis', url: 'https://www.mayoclinic.org/diseases-conditions/mononucleosis/symptoms-causes/syc-20350328' },
          ],
        },
        {
          slug: 'sinus-infection',
          name: 'Sinus Infection',
          description: 'A sinus infection (sinusitis) occurs when fluid builds up in the sinuses, allowing germs to grow. It can be caused by viruses, bacteria, or allergies.',
          whatWeMonitor: [
            {
              ingredient: 'Dairy Products',
              reason: 'Dairy may increase mucus production in some people, potentially worsening sinus congestion.',
              sources: [
                { title: 'Cleveland Clinic - Sinusitis', url: 'https://my.clevelandclinic.org/health/diseases/17701-sinusitis' },
              ],
            },
            {
              ingredient: 'Histamine-Rich Foods',
              reason: 'Foods high in histamine (aged cheese, fermented foods, alcohol) can worsen sinus inflammation.',
              sources: [
                { title: 'American Academy of Allergy - Sinusitis', url: 'https://www.aaaai.org/conditions-and-treatments/conditions-dictionary/sinusitis' },
              ],
            },
            {
              ingredient: 'Refined Sugar',
              reason: 'Sugar can increase inflammation throughout the body, including the sinuses.',
              sources: [
                { title: 'Healthline - Sinusitis Diet', url: 'https://www.healthline.com/health/sinusitis' },
              ],
            },
          ],
          funFacts: [
            'About 31 million Americans experience sinusitis each year.',
            'Spicy foods can actually help clear sinuses temporarily by thinning mucus.',
            'Steam inhalation can provide relief within minutes.',
            "Most sinus infections are viral and don't need antibiotics.",
          ],
          tips: [
            'Use a saline nasal rinse to flush out mucus',
            'Apply warm compresses to your face for relief',
            'Stay well-hydrated to thin mucus secretions',
            'Sleep with your head elevated to improve drainage',
          ],
          generalSources: [
            { title: 'CDC - Sinus Infection', url: 'https://www.cdc.gov/antibiotic-use/sinus-infection.html' },
            { title: 'Mayo Clinic - Sinusitis', url: 'https://www.mayoclinic.org/diseases-conditions/acute-sinusitis/symptoms-causes/syc-20351671' },
          ],
        },
        {
          slug: 'bronchitis',
          name: 'Bronchitis',
          description: 'Bronchitis is inflammation of the bronchial tubes that carry air to your lungs. Acute bronchitis often develops from a cold and usually improves within a week.',
          whatWeMonitor: [
            {
              ingredient: 'Dairy Products',
              reason: 'Some people find dairy thickens respiratory mucus, making coughing less productive.',
              sources: [
                { title: 'Cleveland Clinic - Bronchitis', url: 'https://my.clevelandclinic.org/health/diseases/3993-bronchitis' },
              ],
            },
            {
              ingredient: 'Sulfites',
              reason: 'Sulfites in wine and dried fruits can trigger respiratory symptoms in sensitive individuals.',
              sources: [
                { title: 'AAAAI - Sulfites', url: 'https://www.aaaai.org/conditions-and-treatments/library/allergy-library/sulfite-sensitivity' },
              ],
            },
            {
              ingredient: 'Fried Foods',
              reason: 'Greasy, fried foods can increase inflammation and mucus production.',
              sources: [
                { title: 'Healthline - Bronchitis', url: 'https://www.healthline.com/health/bronchitis' },
              ],
            },
          ],
          funFacts: [
            'A bronchitis cough can last for several weeks even after infection clears.',
            'Honey is as effective as some OTC cough medicines for relieving cough.',
            'Acute bronchitis is almost always caused by viruses, not bacteria.',
            'Smoking is the leading cause of chronic bronchitis.',
          ],
          tips: [
            'Use a humidifier to help loosen chest congestion',
            'Drink plenty of fluids to thin mucus',
            'Avoid smoke and other respiratory irritants',
            'Rest your voice if coughing is severe',
          ],
          generalSources: [
            { title: 'NHLBI - Bronchitis', url: 'https://www.nhlbi.nih.gov/health/bronchitis' },
            { title: 'Mayo Clinic - Bronchitis', url: 'https://www.mayoclinic.org/diseases-conditions/bronchitis/symptoms-causes/syc-20355566' },
          ],
        },
        {
          slug: 'ear-infection',
          name: 'Ear Infection',
          description: "An ear infection occurs when bacteria or viruses affect the middle ear. They're more common in children but can affect adults too.",
          whatWeMonitor: [
            {
              ingredient: 'Dairy (for children)',
              reason: 'Some studies suggest dairy allergies may contribute to recurrent ear infections in children.',
              sources: [
                { title: 'AAP - Ear Infections', url: 'https://www.healthychildren.org/English/health-issues/conditions/ear-nose-throat/Pages/Ear-Infection-Information.aspx' },
              ],
            },
            {
              ingredient: 'Sugar',
              reason: 'High sugar intake can weaken immune function, potentially prolonging infection.',
              sources: [
                { title: 'Cleveland Clinic - Ear Infections', url: 'https://my.clevelandclinic.org/health/diseases/8613-ear-infection-otitis-media' },
              ],
            },
            {
              ingredient: 'Processed Foods',
              reason: "Nutrient-poor processed foods don't support the immune system during recovery.",
              sources: [
                { title: 'Mayo Clinic - Ear Infections', url: 'https://www.mayoclinic.org/diseases-conditions/ear-infections/symptoms-causes/syc-20351616' },
              ],
            },
          ],
          funFacts: [
            'About 80% of children will have at least one ear infection by age 3.',
            'Breastfeeding can help protect infants from ear infections.',
            'Ear infections are more common in fall and winter.',
            'Secondhand smoke increases the risk of ear infections in children.',
          ],
          tips: [
            'Apply a warm compress to the affected ear for pain relief',
            'Stay upright when possible to help drainage',
            "Don't insert anything into the ear canal",
            'Complete all prescribed antibiotics if given',
          ],
          generalSources: [
            { title: 'CDC - Ear Infections', url: 'https://www.cdc.gov/antibiotic-use/ear-infection.html' },
            { title: 'Mayo Clinic - Ear Infections', url: 'https://www.mayoclinic.org/diseases-conditions/ear-infections/symptoms-causes/syc-20351616' },
          ],
        },
      ],
    },
    {
      slug: 'womens-health',
      label: "Women's Health",
      icon: 'Heart',
      sortOrder: 2,
      conditions: [
        {
          slug: 'uti',
          name: 'Urinary Tract Infection (UTI)',
          description: 'A UTI is an infection in any part of the urinary system. Most infections involve the lower urinary tract - the bladder and urethra.',
          whatWeMonitor: [
            {
              ingredient: 'Caffeine',
              reason: 'Caffeine is a bladder irritant and can worsen UTI symptoms like urgency and frequency.',
              sources: [
                { title: 'Cleveland Clinic - UTI', url: 'https://my.clevelandclinic.org/health/diseases/9135-urinary-tract-infections' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol irritates the bladder and can dehydrate you, worsening UTI symptoms.',
              sources: [
                { title: 'Mayo Clinic - UTI', url: 'https://www.mayoclinic.org/diseases-conditions/urinary-tract-infection/symptoms-causes/syc-20353447' },
              ],
            },
            {
              ingredient: 'Artificial Sweeteners',
              reason: 'Some artificial sweeteners can irritate the bladder lining.',
              sources: [
                { title: 'NIDDK - UTI', url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults' },
              ],
            },
            {
              ingredient: 'Spicy Foods',
              reason: 'Spicy foods can irritate the bladder and worsen the burning sensation.',
              sources: [
                { title: 'Urology Care Foundation', url: 'https://www.urologyhealth.org/urologic-conditions/urinary-tract-infections-in-adults' },
              ],
            },
          ],
          funFacts: [
            'About 50-60% of women will experience at least one UTI in their lifetime.',
            'Cranberries contain compounds that may help prevent bacteria from sticking to bladder walls.',
            'Wiping front to back can help prevent UTIs by keeping bacteria away from the urethra.',
            'Urinating after intercourse can help flush out bacteria.',
          ],
          tips: [
            'Drink plenty of water - aim for 6-8 glasses daily',
            "Don't hold your urine - go when you need to",
            'Consider unsweetened cranberry juice or supplements',
            'Wear breathable cotton underwear',
          ],
          generalSources: [
            { title: 'NIH - UTI', url: 'https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-infection-uti-in-adults' },
            { title: 'Mayo Clinic - UTI', url: 'https://www.mayoclinic.org/diseases-conditions/urinary-tract-infection/symptoms-causes/syc-20353447' },
          ],
        },
        {
          slug: 'yeast-infection',
          name: 'Yeast Infection',
          description: "A vaginal yeast infection is a fungal infection that causes irritation, discharge, and intense itchiness. It's caused by an overgrowth of Candida.",
          whatWeMonitor: [
            {
              ingredient: 'Refined Sugar',
              reason: 'Yeast feeds on sugar. High sugar intake can promote yeast overgrowth throughout the body.',
              sources: [
                { title: 'Cleveland Clinic - Yeast Infections', url: 'https://my.clevelandclinic.org/health/diseases/5019-yeast-infections' },
              ],
            },
            {
              ingredient: 'Refined Carbohydrates',
              reason: 'White bread, pasta, and other refined carbs quickly convert to sugar, feeding yeast.',
              sources: [
                { title: 'Healthline - Yeast Infection Diet', url: 'https://www.healthline.com/health/yeast-infection' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol can disrupt the balance of good bacteria and promote yeast growth.',
              sources: [
                { title: 'Medical News Today - Candida', url: 'https://www.medicalnewstoday.com/articles/322751' },
              ],
            },
            {
              ingredient: 'Processed Foods',
              reason: 'Many processed foods contain hidden sugars that can fuel yeast overgrowth.',
              sources: [
                { title: 'Mayo Clinic - Yeast Infection', url: 'https://www.mayoclinic.org/diseases-conditions/yeast-infection/symptoms-causes/syc-20378999' },
              ],
            },
          ],
          funFacts: [
            'About 75% of women will have at least one yeast infection in their lifetime.',
            'Probiotics, especially Lactobacillus strains, may help prevent yeast infections.',
            'Wearing tight clothing and non-breathable underwear increases infection risk.',
            'Antibiotics can trigger yeast infections by killing good bacteria.',
          ],
          tips: [
            'Wear loose, breathable cotton underwear',
            'Avoid douching - it disrupts natural bacteria balance',
            'Change out of wet swimsuits and workout clothes quickly',
            'Consider probiotic-rich foods like yogurt',
          ],
          generalSources: [
            { title: 'CDC - Yeast Infections', url: 'https://www.cdc.gov/fungal/diseases/candidiasis/genital/index.html' },
            { title: 'Mayo Clinic - Yeast Infection', url: 'https://www.mayoclinic.org/diseases-conditions/yeast-infection/symptoms-causes/syc-20378999' },
          ],
        },
        {
          slug: 'bv',
          name: 'Bacterial Vaginosis (BV)',
          description: 'BV is a type of vaginal inflammation caused by overgrowth of bacteria naturally found in the vagina, which upsets the natural balance.',
          whatWeMonitor: [
            {
              ingredient: 'Refined Sugar',
              reason: 'Sugar can feed harmful bacteria and disrupt the vaginal microbiome balance.',
              sources: [
                { title: 'NIH - BV', url: 'https://www.nichd.nih.gov/health/topics/bacterialvaginosis' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol can affect immune function and the bacterial balance in your body.',
              sources: [
                { title: 'Cleveland Clinic - BV', url: 'https://my.clevelandclinic.org/health/diseases/3963-bacterial-vaginosis' },
              ],
            },
            {
              ingredient: 'Processed Foods',
              reason: 'A diet high in processed foods may negatively impact the vaginal microbiome.',
              sources: [
                { title: 'ACOG - BV', url: 'https://www.acog.org/womens-health/faqs/vaginitis' },
              ],
            },
          ],
          funFacts: [
            'BV is the most common vaginal condition in women ages 15-44.',
            'BV is not a sexually transmitted infection, though sexual activity can increase risk.',
            'Douching can actually increase your risk of developing BV.',
            'Probiotic supplements may help restore healthy bacterial balance.',
          ],
          tips: [
            'Avoid douching and scented feminine products',
            'Complete all prescribed antibiotics',
            'Eat probiotic-rich foods to support good bacteria',
            'Wear breathable cotton underwear',
          ],
          generalSources: [
            { title: 'CDC - BV', url: 'https://www.cdc.gov/std/bv/stdfact-bacterial-vaginosis.htm' },
            { title: 'Mayo Clinic - BV', url: 'https://www.mayoclinic.org/diseases-conditions/bacterial-vaginosis/symptoms-causes/syc-20352279' },
          ],
        },
        {
          slug: 'pms',
          name: 'Period Cramps / PMS Symptoms',
          description: 'PMS includes physical and emotional symptoms that occur in the days before your period. Cramps (dysmenorrhea) are painful menstrual cramps felt in the lower abdomen.',
          whatWeMonitor: [
            {
              ingredient: 'Sodium (Excess)',
              reason: 'High sodium intake can worsen water retention and bloating during PMS.',
              sources: [
                { title: 'Cleveland Clinic - PMS', url: 'https://my.clevelandclinic.org/health/diseases/9132-premenstrual-syndrome-pms' },
              ],
            },
            {
              ingredient: 'Caffeine',
              reason: 'Caffeine can increase anxiety, breast tenderness, and sleep disturbances during PMS.',
              sources: [
                { title: 'ACOG - PMS', url: 'https://www.acog.org/womens-health/faqs/premenstrual-syndrome' },
              ],
            },
            {
              ingredient: 'Refined Sugar',
              reason: 'Sugar can cause blood sugar spikes and crashes, worsening mood swings and fatigue.',
              sources: [
                { title: 'Mayo Clinic - PMS', url: 'https://www.mayoclinic.org/diseases-conditions/premenstrual-syndrome/symptoms-causes/syc-20376780' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol can worsen mood swings, dehydration, and sleep quality during PMS.',
              sources: [
                { title: 'Harvard Health - PMS', url: 'https://www.health.harvard.edu/womens-health/treating-premenstrual-syndrome' },
              ],
            },
          ],
          funFacts: [
            'About 90% of women experience at least some PMS symptoms.',
            'Magnesium-rich foods like dark chocolate may actually help with cramps!',
            'Regular exercise can significantly reduce PMS symptoms.',
            'Calcium supplementation has been shown to reduce PMS symptoms.',
          ],
          tips: [
            'Try applying heat to your lower abdomen for cramp relief',
            'Exercise regularly - even light walking can help',
            'Eat smaller, more frequent meals to stabilize blood sugar',
            'Consider magnesium and calcium supplements',
          ],
          generalSources: [
            { title: 'ACOG - PMS', url: 'https://www.acog.org/womens-health/faqs/premenstrual-syndrome' },
            { title: 'Mayo Clinic - PMS', url: 'https://www.mayoclinic.org/diseases-conditions/premenstrual-syndrome/symptoms-causes/syc-20376780' },
          ],
        },
      ],
    },
    {
      slug: 'digestive',
      label: 'Digestive Issues',
      icon: 'Activity',
      sortOrder: 3,
      conditions: [
        {
          slug: 'acid-reflux',
          name: 'Acid Reflux / Heartburn',
          description: 'Acid reflux occurs when stomach acid frequently flows back into the esophagus. This backwash can irritate the lining of your esophagus, causing heartburn.',
          whatWeMonitor: [
            {
              ingredient: 'Citrus',
              reason: 'Citrus fruits and juices are highly acidic and can trigger or worsen reflux symptoms.',
              sources: [
                { title: 'NIH - GERD', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults' },
              ],
            },
            {
              ingredient: 'Tomatoes',
              reason: 'Tomatoes and tomato-based products are acidic and common reflux triggers.',
              sources: [
                { title: 'Mayo Clinic - GERD', url: 'https://www.mayoclinic.org/diseases-conditions/gerd/symptoms-causes/syc-20361940' },
              ],
            },
            {
              ingredient: 'Caffeine',
              reason: 'Caffeine can relax the lower esophageal sphincter, allowing acid to escape.',
              sources: [
                { title: 'Cleveland Clinic - GERD', url: 'https://my.clevelandclinic.org/health/diseases/17019-gerd-or-acid-reflux-or-heartburn-overview' },
              ],
            },
            {
              ingredient: 'Chocolate',
              reason: 'Chocolate contains methylxanthine which can relax the sphincter and trigger reflux.',
              sources: [
                { title: 'Harvard Health - Heartburn', url: 'https://www.health.harvard.edu/digestive-health/9-ways-to-relieve-acid-reflux-without-medication' },
              ],
            },
            {
              ingredient: 'Mint',
              reason: 'Peppermint and spearmint can relax the lower esophageal sphincter.',
              sources: [
                { title: 'IFFGD - Diet and GERD', url: 'https://iffgd.org/gi-disorders/gerd/diet-and-gerd/' },
              ],
            },
            {
              ingredient: 'Fried/Fatty Foods',
              reason: 'High-fat foods stay in the stomach longer and can increase pressure on the sphincter.',
              sources: [
                { title: 'NIH - GERD Diet', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/eating-diet-nutrition' },
              ],
            },
          ],
          funFacts: [
            'About 20% of Americans experience acid reflux at least once a week.',
            'Eating within 3 hours of bedtime increases reflux risk.',
            'Chewing gum after meals can help reduce reflux by increasing saliva production.',
            'Elevating the head of your bed 6-8 inches can reduce nighttime reflux.',
          ],
          tips: [
            'Eat smaller, more frequent meals',
            "Don't lie down within 3 hours of eating",
            'Avoid tight-fitting clothing around the abdomen',
            'Maintain a healthy weight - excess weight puts pressure on the stomach',
          ],
          generalSources: [
            { title: 'NIH - GERD', url: 'https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults' },
            { title: 'Mayo Clinic - GERD', url: 'https://www.mayoclinic.org/diseases-conditions/gerd/symptoms-causes/syc-20361940' },
          ],
        },
      ],
    },
    {
      slug: 'skin-eye',
      label: 'Skin, Eye & External',
      icon: 'Eye',
      sortOrder: 4,
      conditions: [
        {
          slug: 'pink-eye',
          name: 'Pink Eye',
          description: 'Pink eye (conjunctivitis) is inflammation of the transparent membrane that lines the eyelid and eyeball. It can be caused by viruses, bacteria, or allergies.',
          whatWeMonitor: [
            {
              ingredient: 'Dairy Products',
              reason: 'If pink eye is allergy-related, dairy can sometimes worsen inflammation in sensitive individuals.',
              sources: [
                { title: 'AAO - Conjunctivitis', url: 'https://www.aao.org/eye-health/diseases/pink-eye-conjunctivitis' },
              ],
            },
            {
              ingredient: 'Processed Foods',
              reason: 'Processed foods may increase inflammation, potentially slowing healing.',
              sources: [
                { title: 'Cleveland Clinic - Pink Eye', url: 'https://my.clevelandclinic.org/health/diseases/8614-pink-eye' },
              ],
            },
            {
              ingredient: 'High-Histamine Foods',
              reason: 'If allergies are the cause, histamine-rich foods may worsen symptoms.',
              sources: [
                { title: 'Mayo Clinic - Pink Eye', url: 'https://www.mayoclinic.org/diseases-conditions/pink-eye/symptoms-causes/syc-20376355' },
              ],
            },
          ],
          funFacts: [
            'Viral pink eye is highly contagious and can spread through touching contaminated surfaces.',
            'Cold compresses can help soothe viral pink eye, while warm compresses help bacterial pink eye.',
            "Pink eye caused by allergies isn't contagious at all.",
            'You should throw away any eye makeup used while infected to prevent reinfection.',
          ],
          tips: [
            'Wash your hands frequently to prevent spread',
            "Don't share towels, pillows, or eye cosmetics",
            'Use a clean washcloth for each eye if both are infected',
            "Don't wear contact lenses until the infection clears",
          ],
          generalSources: [
            { title: 'CDC - Pink Eye', url: 'https://www.cdc.gov/conjunctivitis/index.html' },
            { title: 'Mayo Clinic - Pink Eye', url: 'https://www.mayoclinic.org/diseases-conditions/pink-eye/symptoms-causes/syc-20376355' },
          ],
        },
        {
          slug: 'cold-sore',
          name: 'Cold Sore',
          description: "Cold sores are small, fluid-filled blisters usually around the lips caused by the herpes simplex virus. They're contagious and can recur throughout life.",
          whatWeMonitor: [
            {
              ingredient: 'Arginine-Rich Foods',
              reason: 'Arginine (found in nuts, chocolate, seeds) may promote herpes virus replication.',
              sources: [
                { title: 'Cleveland Clinic - Cold Sores', url: 'https://my.clevelandclinic.org/health/diseases/21136-cold-sores' },
              ],
            },
            {
              ingredient: 'Acidic Foods',
              reason: 'Citrus, tomatoes, and other acidic foods can irritate cold sores and slow healing.',
              sources: [
                { title: 'Mayo Clinic - Cold Sores', url: 'https://www.mayoclinic.org/diseases-conditions/cold-sore/symptoms-causes/syc-20371017' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol can weaken the immune system and may trigger outbreaks.',
              sources: [
                { title: 'AAD - Cold Sores', url: 'https://www.aad.org/public/diseases/a-z/cold-sores-treatment' },
              ],
            },
          ],
          funFacts: [
            'About 67% of the global population has HSV-1, the virus that causes cold sores.',
            'Lysine, an amino acid, may help prevent cold sore outbreaks.',
            'Stress and sun exposure are common cold sore triggers.',
            'Cold sores are most contagious when blisters are present or oozing.',
          ],
          tips: [
            'Apply sunscreen to your lips when outdoors',
            "Don't touch or pick at cold sores",
            'Consider lysine supplements during outbreaks',
            'Keep the area clean and dry',
          ],
          generalSources: [
            { title: 'AAD - Cold Sores', url: 'https://www.aad.org/public/diseases/a-z/cold-sores-overview' },
            { title: 'Mayo Clinic - Cold Sores', url: 'https://www.mayoclinic.org/diseases-conditions/cold-sore/symptoms-causes/syc-20371017' },
          ],
        },
        {
          slug: 'sunburn',
          name: 'Sunburn',
          description: 'Sunburn is red, painful skin that feels hot to the touch. It results from overexposure to UV rays from the sun or artificial sources like tanning beds.',
          whatWeMonitor: [
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol dehydrates you, which can worsen sunburn and slow healing.',
              sources: [
                { title: 'AAD - Sunburn', url: 'https://www.aad.org/public/everyday-care/injured-skin/burns/treat-sunburn' },
              ],
            },
            {
              ingredient: 'Caffeine',
              reason: 'Like alcohol, caffeine can contribute to dehydration when you need maximum hydration.',
              sources: [
                { title: 'Skin Cancer Foundation', url: 'https://www.skincancer.org/risk-factors/sunburn/' },
              ],
            },
            {
              ingredient: 'Processed Foods',
              reason: 'High sodium in processed foods can worsen dehydration.',
              sources: [
                { title: 'Cleveland Clinic - Sunburn', url: 'https://my.clevelandclinic.org/health/diseases/12441-sunburn' },
              ],
            },
          ],
          funFacts: [
            'A single blistering sunburn in childhood doubles your lifetime risk of melanoma.',
            'Aloe vera has been used to treat burns for over 6,000 years.',
            'Sunburn can happen in as little as 15 minutes.',
            'You can get sunburned on cloudy days - up to 80% of UV rays penetrate clouds.',
          ],
          tips: [
            'Drink extra water to combat dehydration',
            'Apply aloe vera or moisturizer frequently',
            'Take cool baths or showers',
            "Don't pop blisters - they protect healing skin beneath",
          ],
          generalSources: [
            { title: 'AAD - Sunburn Treatment', url: 'https://www.aad.org/public/everyday-care/injured-skin/burns/treat-sunburn' },
            { title: 'Mayo Clinic - Sunburn', url: 'https://www.mayoclinic.org/diseases-conditions/sunburn/symptoms-causes/syc-20355922' },
          ],
        },
        {
          slug: 'minor-burn',
          name: 'Minor Burn',
          description: 'Minor burns affect only the outer layer of skin (first-degree) or partially through the second layer (second-degree). Common causes include hot liquids, steam, and touching hot objects.',
          whatWeMonitor: [
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol can slow wound healing and dehydrate the body during recovery.',
              sources: [
                { title: 'Mayo Clinic - Burns', url: 'https://www.mayoclinic.org/first-aid/first-aid-burns/basics/art-20056649' },
              ],
            },
            {
              ingredient: 'Sugar (Excess)',
              reason: 'High blood sugar can impair wound healing.',
              sources: [
                { title: 'Cleveland Clinic - Burns', url: 'https://my.clevelandclinic.org/health/diseases/12063-burns' },
              ],
            },
            {
              ingredient: 'Processed Foods',
              reason: 'Your body needs nutrients for healing - processed foods offer little nutritional support.',
              sources: [
                { title: 'NIH - Wound Healing', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2903966/' },
              ],
            },
          ],
          funFacts: [
            'Burns should be cooled with cool (not ice cold) running water for at least 10 minutes.',
            'Honey has been used as a burn treatment for thousands of years and has antibacterial properties.',
            'Butter on burns is a myth - it can trap heat and cause infection.',
            'Most minor burns heal within 1-3 weeks without scarring.',
          ],
          tips: [
            'Cool the burn under running water immediately',
            "Don't apply ice, butter, or toothpaste",
            'Cover with a sterile bandage',
            'Take over-the-counter pain relievers if needed',
          ],
          generalSources: [
            { title: 'Mayo Clinic - Burns First Aid', url: 'https://www.mayoclinic.org/first-aid/first-aid-burns/basics/art-20056649' },
            { title: 'Cleveland Clinic - Burns', url: 'https://my.clevelandclinic.org/health/diseases/12063-burns' },
          ],
        },
      ],
    },
    {
      slug: 'pain-discomfort',
      label: 'Pain & Physical Discomfort',
      icon: 'Zap',
      sortOrder: 5,
      conditions: [
        {
          slug: 'headache',
          name: 'Headache',
          description: 'Headaches are pain in any region of the head. The most common types are tension headaches, which feel like a tight band around the head.',
          whatWeMonitor: [
            {
              ingredient: 'MSG',
              reason: 'MSG is a known headache trigger for many people, causing "Chinese restaurant syndrome".',
              sources: [
                { title: 'Mayo Clinic - Headaches', url: 'https://www.mayoclinic.org/diseases-conditions/tension-headache/symptoms-causes/syc-20353977' },
              ],
            },
            {
              ingredient: 'Artificial Sweeteners',
              reason: 'Aspartame and other artificial sweeteners are reported headache triggers.',
              sources: [
                { title: 'Cleveland Clinic - Headaches', url: 'https://my.clevelandclinic.org/health/diseases/9639-headaches' },
              ],
            },
            {
              ingredient: 'Tyramine',
              reason: 'Found in aged cheeses and cured meats, tyramine can trigger headaches.',
              sources: [
                { title: 'National Headache Foundation', url: 'https://headaches.org/understanding-headache/diet-and-headache/' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol causes dehydration and contains compounds that can trigger headaches.',
              sources: [
                { title: 'Harvard Health - Headaches', url: 'https://www.health.harvard.edu/pain/headache-when-to-worry-what-to-do' },
              ],
            },
          ],
          funFacts: [
            'About 90% of headaches are tension headaches.',
            'Dehydration is one of the most common and preventable causes of headaches.',
            'Skipping meals can trigger headaches due to low blood sugar.',
            'Regular sleep schedules can significantly reduce headache frequency.',
          ],
          tips: [
            'Stay well-hydrated throughout the day',
            'Get regular sleep - both too little and too much can trigger headaches',
            'Manage stress through relaxation techniques',
            'Keep a headache diary to identify your personal triggers',
          ],
          generalSources: [
            { title: 'NIH - Headaches', url: 'https://www.ninds.nih.gov/health-information/disorders/headache' },
            { title: 'Mayo Clinic - Tension Headaches', url: 'https://www.mayoclinic.org/diseases-conditions/tension-headache/symptoms-causes/syc-20353977' },
          ],
        },
        {
          slug: 'migraine-temp',
          name: 'Migraine',
          description: 'Migraines are intense, throbbing headaches often accompanied by nausea, vomiting, and sensitivity to light and sound. They can last hours to days.',
          whatWeMonitor: [
            {
              ingredient: 'MSG',
              reason: 'Monosodium glutamate is a well-documented migraine trigger for many sufferers.',
              sources: [
                { title: 'American Migraine Foundation', url: 'https://americanmigrainefoundation.org/resource-library/msg-and-migraine/' },
              ],
            },
            {
              ingredient: 'Tyramine',
              reason: 'Tyramine in aged cheeses, cured meats, and fermented foods triggers migraines.',
              sources: [
                { title: 'Cleveland Clinic - Migraine Triggers', url: 'https://my.clevelandclinic.org/health/diseases/5005-migraine-headaches' },
              ],
            },
            {
              ingredient: 'Nitrates/Nitrites',
              reason: 'Preservatives in processed meats can dilate blood vessels and trigger migraines.',
              sources: [
                { title: 'AMF - Nitrates', url: 'https://americanmigrainefoundation.org/resource-library/diet/' },
              ],
            },
            {
              ingredient: 'Artificial Sweeteners',
              reason: 'Aspartame is a reported trigger for many migraine sufferers.',
              sources: [
                { title: 'Mayo Clinic - Migraines', url: 'https://www.mayoclinic.org/diseases-conditions/migraine-headache/symptoms-causes/syc-20360201' },
              ],
            },
            {
              ingredient: 'Caffeine (withdrawal)',
              reason: 'Both caffeine and caffeine withdrawal can trigger migraines.',
              sources: [
                { title: 'AMF - Caffeine', url: 'https://americanmigrainefoundation.org/resource-library/caffeine-and-migraine/' },
              ],
            },
          ],
          funFacts: [
            'Migraines affect about 12% of the population, and women are 3 times more likely to get them.',
            'Some people experience "aura" - visual disturbances before the headache begins.',
            'Migraines often run in families - if one parent has them, children have a 50% chance.',
            'Regular magnesium supplementation may help prevent migraines.',
          ],
          tips: [
            'Identify and avoid your personal triggers',
            'Maintain regular eating and sleeping schedules',
            'Consider preventive supplements like magnesium and riboflavin',
            'Create a dark, quiet space to rest during attacks',
          ],
          generalSources: [
            { title: 'American Migraine Foundation', url: 'https://americanmigrainefoundation.org/resource-library/what-is-migraine/' },
            { title: 'Mayo Clinic - Migraines', url: 'https://www.mayoclinic.org/diseases-conditions/migraine-headache/symptoms-causes/syc-20360201' },
          ],
        },
        {
          slug: 'sore-throat-temp',
          name: 'Sore Throat',
          description: 'A sore throat is pain, scratchiness, or irritation that often worsens when swallowing. Most are caused by viruses and resolve on their own.',
          whatWeMonitor: [
            {
              ingredient: 'Acidic Foods',
              reason: 'Citrus and other acidic foods can irritate an already inflamed throat.',
              sources: [
                { title: 'Mayo Clinic - Sore Throat', url: 'https://www.mayoclinic.org/diseases-conditions/sore-throat/symptoms-causes/syc-20351635' },
              ],
            },
            {
              ingredient: 'Spicy Foods',
              reason: 'Spicy foods can cause additional irritation and pain.',
              sources: [
                { title: 'Cleveland Clinic - Sore Throat', url: 'https://my.clevelandclinic.org/health/symptoms/21125-sore-throat-pharyngitis' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol can dehydrate and irritate the throat lining.',
              sources: [
                { title: 'Healthline - Sore Throat', url: 'https://www.healthline.com/health/sore-throat' },
              ],
            },
            {
              ingredient: 'Dry/Crunchy Foods',
              reason: 'Toast, chips, and crackers can scratch and irritate a sore throat.',
              sources: [
                { title: 'Medical News Today - Sore Throat Foods', url: 'https://www.medicalnewstoday.com/articles/324766' },
              ],
            },
          ],
          funFacts: [
            'Honey is as effective as some OTC medicines for soothing sore throats.',
            "Most sore throats are caused by viruses and don't need antibiotics.",
            'Gargling with warm salt water can provide quick relief.',
            'Cold foods like ice cream can temporarily numb throat pain.',
          ],
          tips: [
            'Stay hydrated with warm liquids like tea with honey',
            'Use throat lozenges or hard candy to stimulate saliva',
            'Run a humidifier to add moisture to the air',
            'Rest your voice as much as possible',
          ],
          generalSources: [
            { title: 'CDC - Sore Throat', url: 'https://www.cdc.gov/antibiotic-use/sore-throat.html' },
            { title: 'Mayo Clinic - Sore Throat', url: 'https://www.mayoclinic.org/diseases-conditions/sore-throat/symptoms-causes/syc-20351635' },
          ],
        },
      ],
    },
    {
      slug: 'allergies',
      label: 'Allergies & Sensitivities',
      icon: 'Wind',
      sortOrder: 6,
      conditions: [
        {
          slug: 'seasonal-allergies',
          name: 'Seasonal Allergies',
          description: 'Seasonal allergies (hay fever) occur when your immune system overreacts to outdoor allergens like pollen. Symptoms include sneezing, congestion, and itchy eyes.',
          whatWeMonitor: [
            {
              ingredient: 'Histamine-Rich Foods',
              reason: 'Foods high in histamine (aged cheese, wine, fermented foods) can worsen allergy symptoms.',
              sources: [
                { title: 'AAAAI - Food Allergies', url: 'https://www.aaaai.org/tools-for-the-public/conditions-library/allergies/food-allergy' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol contains histamine and can worsen nasal congestion.',
              sources: [
                { title: 'ACAAI - Allergies', url: 'https://acaai.org/allergies/allergic-conditions/hay-fever/' },
              ],
            },
            {
              ingredient: 'Dairy Products',
              reason: 'Dairy may increase mucus production in some people, worsening congestion.',
              sources: [
                { title: 'Cleveland Clinic - Allergies', url: 'https://my.clevelandclinic.org/health/diseases/8622-allergic-rhinitis-hay-fever' },
              ],
            },
          ],
          funFacts: [
            'About 25% of adults suffer from seasonal allergies.',
            'Local honey may help build tolerance to local pollen (though evidence is mixed).',
            'Pollen counts are typically highest in the morning.',
            'Showering and changing clothes after being outside can reduce symptoms.',
          ],
          tips: [
            'Check pollen counts and limit outdoor time on high-pollen days',
            'Keep windows closed during allergy season',
            'Wash bedding frequently in hot water',
            'Consider a HEPA air purifier for your bedroom',
          ],
          generalSources: [
            { title: 'ACAAI - Hay Fever', url: 'https://acaai.org/allergies/allergic-conditions/hay-fever/' },
            { title: 'Mayo Clinic - Hay Fever', url: 'https://www.mayoclinic.org/diseases-conditions/hay-fever/symptoms-causes/syc-20373039' },
          ],
        },
      ],
    },
    {
      slug: 'recovery',
      label: 'Recovery / Treatment States',
      icon: 'Pill',
      sortOrder: 7,
      conditions: [
        {
          slug: 'on-antibiotics',
          name: 'On Antibiotics',
          description: 'Taking antibiotics can disrupt your gut microbiome. Supporting your digestive system during and after treatment is important for recovery.',
          whatWeMonitor: [
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol can interact with many antibiotics and strain your liver during treatment.',
              sources: [
                { title: 'NHS - Antibiotics', url: 'https://www.nhs.uk/conditions/antibiotics/' },
              ],
            },
            {
              ingredient: 'Dairy (timing)',
              reason: 'Calcium in dairy can interfere with absorption of some antibiotics like tetracyclines.',
              sources: [
                { title: 'Mayo Clinic - Antibiotics', url: 'https://www.mayoclinic.org/healthy-lifestyle/consumer-health/in-depth/antibiotics/art-20045720' },
              ],
            },
            {
              ingredient: 'Sugar (Excess)',
              reason: 'High sugar can feed harmful bacteria and yeast that may overgrow during antibiotic treatment.',
              sources: [
                { title: 'Harvard Health - Antibiotics', url: 'https://www.health.harvard.edu/blog/how-to-rebuild-your-gut-after-antibiotics-2018092614926' },
              ],
            },
          ],
          funFacts: [
            'Antibiotics kill good bacteria along with bad - probiotics can help restore balance.',
            'Spacing certain antibiotics from dairy by 2 hours ensures proper absorption.',
            'Fermented foods like yogurt with live cultures support gut recovery.',
            'Your gut microbiome can take weeks to months to fully recover after antibiotics.',
          ],
          tips: [
            'Take antibiotics exactly as prescribed - complete the full course',
            'Consider probiotic supplements or foods',
            'Eat fiber-rich foods to feed good bacteria',
            'Stay hydrated and rest',
          ],
          generalSources: [
            { title: 'CDC - Antibiotics', url: 'https://www.cdc.gov/antibiotic-use/index.html' },
            { title: 'Harvard Health - Gut Recovery', url: 'https://www.health.harvard.edu/blog/how-to-rebuild-your-gut-after-antibiotics-2018092614926' },
          ],
        },
        {
          slug: 'recovering-illness',
          name: 'Recovering from Illness',
          description: 'Your body needs extra support during recovery. Proper nutrition helps rebuild strength and supports immune function after illness.',
          whatWeMonitor: [
            {
              ingredient: 'Processed Foods',
              reason: 'Your recovering body needs nutrients - processed foods offer little nutritional value.',
              sources: [
                { title: 'Cleveland Clinic - Recovery', url: 'https://health.clevelandclinic.org/foods-to-eat-when-you-have-the-flu/' },
              ],
            },
            {
              ingredient: 'Sugar (Excess)',
              reason: 'High sugar can suppress immune function when you need it working at full capacity.',
              sources: [
                { title: 'NIH - Sugar and Immunity', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5836209/' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol can impair immune function and interfere with medications.',
              sources: [
                { title: 'Harvard Health - Recovery', url: 'https://www.health.harvard.edu/staying-healthy/how-to-boost-your-immune-system' },
              ],
            },
          ],
          funFacts: [
            "Your body burns extra calories fighting infection - don't severely restrict calories during recovery.",
            'Protein is essential for immune function and tissue repair.',
            "Sleep is when your body does most of its healing and repair work.",
            'Vitamin C and zinc support immune function during recovery.',
          ],
          tips: [
            'Eat nutrient-dense, easy-to-digest foods',
            "Get plenty of rest - don't rush back to normal activities",
            'Stay hydrated with water, broth, and herbal teas',
            'Listen to your body and rest when needed',
          ],
          generalSources: [
            { title: 'Harvard Health - Immune System', url: 'https://www.health.harvard.edu/staying-healthy/how-to-boost-your-immune-system' },
            { title: 'Cleveland Clinic - Foods When Sick', url: 'https://health.clevelandclinic.org/foods-to-eat-when-you-have-the-flu/' },
          ],
        },
        {
          slug: 'jet-lag',
          name: 'Post-Travel Fatigue / Jet Lag',
          description: "Jet lag occurs when your internal clock is out of sync with the time zone you're in. It can cause fatigue, insomnia, digestive issues, and difficulty concentrating.",
          whatWeMonitor: [
            {
              ingredient: 'Caffeine (timing)',
              reason: 'While helpful in morning, caffeine after 2pm can worsen jet lag by disrupting sleep.',
              sources: [
                { title: 'Mayo Clinic - Jet Lag', url: 'https://www.mayoclinic.org/diseases-conditions/jet-lag/symptoms-causes/syc-20374027' },
              ],
            },
            {
              ingredient: 'Alcohol',
              reason: 'Alcohol disrupts sleep quality and can worsen dehydration from travel.',
              sources: [
                { title: 'Cleveland Clinic - Jet Lag', url: 'https://my.clevelandclinic.org/health/diseases/12781-jet-lag' },
              ],
            },
            {
              ingredient: 'Heavy, Fatty Foods',
              reason: 'Heavy meals can disrupt your digestive system and make it harder to sleep.',
              sources: [
                { title: 'Sleep Foundation - Jet Lag', url: 'https://www.sleepfoundation.org/travel-and-sleep/jet-lag' },
              ],
            },
          ],
          funFacts: [
            'It takes about one day per time zone crossed to fully adjust.',
            "Traveling east is harder than traveling west because it's easier to stay up late than wake up early.",
            'Sunlight exposure is the most powerful tool for resetting your circadian rhythm.',
            'Melatonin supplements can help shift your sleep schedule.',
          ],
          tips: [
            "Get sunlight exposure at your destination's morning time",
            'Avoid screens before bed at your new location',
            'Stay hydrated - dehydration worsens jet lag symptoms',
            'Try to adjust to local meal times quickly',
          ],
          generalSources: [
            { title: 'CDC - Jet Lag', url: 'https://wwwnc.cdc.gov/travel/page/jet-lag' },
            { title: 'Mayo Clinic - Jet Lag', url: 'https://www.mayoclinic.org/diseases-conditions/jet-lag/symptoms-causes/syc-20374027' },
          ],
        },
        {
          slug: 'hangover',
          name: 'Hangover',
          description: 'A hangover is a collection of symptoms that occur after drinking too much alcohol. The main cause is dehydration, but alcohol also affects sleep, stomach lining, and blood sugar.',
          whatWeMonitor: [
            {
              ingredient: 'Caffeine (Excess)',
              reason: 'While small amounts may help, too much caffeine can worsen dehydration and stomach irritation.',
              sources: [
                { title: 'Mayo Clinic - Hangovers', url: 'https://www.mayoclinic.org/diseases-conditions/hangovers/symptoms-causes/syc-20373012' },
              ],
            },
            {
              ingredient: 'Greasy Foods',
              reason: 'Contrary to myth, greasy foods can further irritate your already upset stomach.',
              sources: [
                { title: 'Cleveland Clinic - Hangovers', url: 'https://health.clevelandclinic.org/hangover-cures/' },
              ],
            },
            {
              ingredient: 'More Alcohol',
              reason: '"Hair of the dog" only delays the inevitable and can lead to worse hangovers or dependence.',
              sources: [
                { title: 'Harvard Health - Hangovers', url: 'https://www.health.harvard.edu/staying-healthy/7-steps-to-cure-your-hangover' },
              ],
            },
            {
              ingredient: 'Acidic Foods/Drinks',
              reason: 'Orange juice and other acidic items can worsen nausea and stomach irritation.',
              sources: [
                { title: 'Healthline - Hangovers', url: 'https://www.healthline.com/health/hangover' },
              ],
            },
          ],
          funFacts: [
            'You need to drink about 1.5 liters of water for every liter of alcohol consumed to stay hydrated.',
            'Darker alcoholic drinks (whiskey, red wine) contain more congeners, which worsen hangovers.',
            'Eggs contain cysteine, which helps break down acetaldehyde, a toxic alcohol byproduct.',
            'Your body processes alcohol at about one standard drink per hour.',
            'Electrolyte drinks are more effective than plain water for rehydration.',
          ],
          tips: [
            'Drink plenty of water and electrolyte-rich beverages',
            'Eat bland, easy-to-digest foods like toast and bananas',
            'Rest - sleep helps your body recover',
            'Take ibuprofen or aspirin for headaches (but avoid acetaminophen/Tylenol with alcohol)',
          ],
          generalSources: [
            { title: 'Mayo Clinic - Hangovers', url: 'https://www.mayoclinic.org/diseases-conditions/hangovers/symptoms-causes/syc-20373012' },
            { title: 'Harvard Health - Hangover Cures', url: 'https://www.health.harvard.edu/staying-healthy/7-steps-to-cure-your-hangover' },
          ],
        },
      ],
    },
  ]