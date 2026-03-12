// ==========================================
// Preference → Ingredient Keywords Dictionary
// ==========================================
// When a user selects a preference like "Dairy", the scan should
// flag ANY of these ingredient keywords found in a product.
// Matching is case-insensitive and uses partial matching
// (e.g. "casein" matches "Sodium Caseinate").
// ==========================================

export const PREFERENCE_INGREDIENT_MAP: Record<string, string[]> = {

    // ── Hormone & Endocrine Disruptors ──
  
    "Parabens": [
      "paraben", "methylparaben", "ethylparaben", "propylparaben",
      "butylparaben", "isobutylparaben", "isopropylparaben",
      "benzylparaben", "heptylparaben",
    ],
  
    "Phthalates": [
      "phthalate", "diethyl phthalate", "dibutyl phthalate",
      "dimethyl phthalate", "benzyl butyl phthalate",
      "di-2-ethylhexyl phthalate", "DEHP", "DBP", "DEP", "BBP",
      "di-isononyl phthalate", "DINP",
    ],
  
    "Synthetic Fragrance": [
      "fragrance", "parfum", "perfume", "aroma", "synthetic fragrance",
      "artificial fragrance",
    ],
  
    "Oxybenzone": [
      "oxybenzone", "benzophenone-3", "BP-3",
    ],
  
    "BPA & BPS": [
      "bisphenol", "BPA", "BPS", "bisphenol A", "bisphenol S",
    ],
  
    // ── Skin & Eye Irritants ──
  
    "Sulfates": [
      "sulfate", "sulphate", "sodium lauryl sulfate", "SLS",
      "sodium laureth sulfate", "SLES", "ammonium lauryl sulfate",
      "ammonium laureth sulfate", "sodium coco sulfate",
      "sodium myreth sulfate",
    ],
  
    "Alcohol in Skin Products": [
      "alcohol denat", "denatured alcohol", "ethanol", "isopropyl alcohol",
      "SD alcohol", "ethyl alcohol", "methanol", "benzyl alcohol",
    ],
  
    "Silicones": [
      "silicone", "dimethicone", "cyclomethicone", "cyclopentasiloxane",
      "cyclohexasiloxane", "trimethicone", "amodimethicone",
      "phenyl trimethicone", "dimethiconol", "cetearyl methicone",
      "cetyl dimethicone", "stearyl dimethicone",
    ],
  
    // ── Harsh Preservatives & Antimicrobials ──
  
    "Triclosan": [
      "triclosan", "triclocarban", "microban",
    ],
  
    "Formaldehyde": [
      "formaldehyde", "formalin", "methylene glycol",
      "DMDM hydantoin", "diazolidinyl urea", "imidazolidinyl urea",
      "quaternium-15", "bronopol", "2-bromo-2-nitropropane-1,3-diol",
      "sodium hydroxymethylglycinate", "glyoxal",
      "methenamine", "5-bromo-5-nitro-1,3-dioxane",
    ],
  
    "Nitrates/Nitrites": [
      "nitrate", "nitrite", "sodium nitrate", "sodium nitrite",
      "potassium nitrate", "potassium nitrite", "saltpeter",
      "celery powder", "celery juice", "celery extract",
    ],
  
    // ── Artificial Additives & Food ──
  
    "Artificial Flavors": [
      "artificial flavor", "artificial flavour", "artificial flavoring",
      "artificial flavouring", "synthetic flavor",
    ],
  
    "MSG": [
      "monosodium glutamate", "MSG", "glutamic acid",
      "monopotassium glutamate", "calcium glutamate",
      "sodium glutamate", "yeast extract", "hydrolyzed protein",
      "hydrolyzed vegetable protein", "autolyzed yeast",
      "textured protein",
    ],
  
    "Food Dyes": [
      "Red 40", "Red 3", "Red No", "Yellow 5", "Yellow 6", "Yellow No",
      "Blue 1", "Blue 2", "Blue No", "Green 3", "Green No",
      "FD&C", "tartrazine", "allura red", "brilliant blue",
      "indigotine", "erythrosine", "sunset yellow", "fast green",
      "citrus red", "artificial color", "artificial colour",
      "food coloring", "food colouring", "caramel color",
      "E102", "E104", "E110", "E122", "E123", "E124", "E127",
      "E129", "E131", "E132", "E133", "E142", "E151", "E155",
    ],
  
    "Gums & Fillers": [
      "xanthan gum", "guar gum", "cellulose gum", "cellulose",
      "carboxymethylcellulose", "locust bean gum", "tara gum",
      "gellan gum", "acacia gum", "gum arabic", "konjac gum",
      "methylcellulose", "hydroxypropyl methylcellulose",
      "microcrystalline cellulose", "maltodextrin", "corn maltodextrin",
      "polydextrose", "modified food starch",
    ],
  
    "Citric Acid": [
      "citric acid", "E330", "sodium citrate", "potassium citrate",
      "calcium citrate",
    ],
  
    "Carrageenan": [
      "carrageenan", "E407", "irish moss", "chondrus crispus",
    ],
  
    "Soy": [
      "soy", "soya", "soybean", "soy lecithin", "soy protein",
      "soy flour", "soy milk", "soy sauce", "soy oil",
      "soybean oil", "hydrolyzed soy", "soy isolate",
      "textured soy", "edamame", "tofu", "tempeh", "miso",
      "E322",
    ],
  
    "Dairy": [
      "milk", "cream", "butter", "butterfat", "buttermilk",
      "cheese", "casein", "caseinate", "sodium caseinate",
      "calcium caseinate", "potassium caseinate",
      "whey", "whey protein", "whey concentrate", "whey isolate",
      "lactalbumin", "lactoglobulin", "lactose",
      "milk solids", "milk powder", "skimmed milk", "skim milk",
      "whole milk", "milk fat", "milkfat", "nonfat milk",
      "condensed milk", "evaporated milk", "milk protein",
      "yogurt", "yoghurt", "kefir", "ghee", "curds",
      "half-and-half", "half and half", "custard",
      "ice cream", "sherbet", "pudding",
      "lactulose", "recaldent", "tagatose",
    ],
  
    "Gluten-Free": [
      "wheat", "barley", "rye", "spelt", "kamut", "triticale",
      "semolina", "durum", "farina", "graham flour",
      "wheat flour", "whole wheat", "wheat starch", "wheat germ",
      "wheat bran", "wheat protein", "wheat gluten",
      "malt extract", "malt vinegar", "malt flavoring",
      "barley malt", "brewer's yeast",
      "gluten", "seitan", "vital wheat gluten",
      "couscous", "bulgur", "einkorn", "emmer",
      "matzo", "panko", "orzo",
      "hydrolyzed wheat protein", "modified wheat starch",
    ],
    
    "Nuts": [
        "peanut", "peanuts", "peanut butter", "peanut oil",
        "almond", "almonds", "almond butter", "almond oil", "almond flour", "almond milk",
        "cashew", "cashews", "cashew butter",
        "walnut", "walnuts",
        "pecan", "pecans",
        "pistachio", "pistachios",
        "macadamia", "macadamia nuts",
        "hazelnut", "hazelnuts", "filbert",
        "brazil nut", "brazil nuts",
        "pine nut", "pine nuts",
        "chestnut", "chestnuts",
        "coconut",
        "tree nut", "tree nuts", "mixed nuts",
        "nut butter", "nut oil", "nut flour",
        "praline", "marzipan", "nougat", "gianduja",
        "mandelonas", "nutella",
      ],
  
    "Non-GMO": [
      "genetically modified", "bioengineered", "GMO",
    ],
  
    "Organic Only": [
      // This is a label/certification check, not an ingredient match.
      // Products without "organic" in their name or lacking organic
      // certification would be flagged. Hard to match by ingredient.
    ],
  
    "Cruelty-Free": [
      // This is a certification check, not an ingredient match.
      // Cannot be determined from ingredient list alone.
    ],
  
    "Vegan Beauty": [
      "beeswax", "carmine", "lanolin", "collagen", "elastin",
      "keratin", "silk", "silk amino acids", "shellac",
      "guanine", "squalene", "tallow", "stearic acid",
      "oleic acid", "musk", "ambergris", "civet",
      "casein", "lactose", "whey", "honey",
      "royal jelly", "propolis", "albumen", "gelatin",
      "bone char", "pearl", "mother of pearl",
      "cochineal", "E120", "E904",
    ],
  
    // ── Metabolic & Blood Sugar Disruptors ──
  
    "Artificial Sugar": [
      "aspartame", "sucralose", "saccharin", "acesulfame",
      "acesulfame potassium", "acesulfame-K", "neotame",
      "advantame", "cyclamate", "sugar alcohol",
      "sorbitol", "mannitol", "xylitol", "erythritol",
      "maltitol", "isomalt", "lactitol",
      "E950", "E951", "E952", "E954", "E955", "E961", "E962",
    ],
  
    "High Fructose Corn Syrup": [
      "high fructose corn syrup", "HFCS", "high fructose",
      "corn syrup", "glucose-fructose syrup", "isoglucose",
      "glucose-fructose", "fructose-glucose",
    ],
  
    "Trans Fats": [
      "trans fat", "partially hydrogenated", "hydrogenated oil",
      "hydrogenated vegetable oil", "hydrogenated soybean oil",
      "hydrogenated palm oil", "hydrogenated coconut oil",
      "hydrogenated cottonseed oil", "margarine", "shortening",
      "partially hydrogenated soybean",
      "partially hydrogenated cottonseed",
    ],
  
    "Seed Oils": [
      "canola oil", "rapeseed oil", "soybean oil", "sunflower oil",
      "safflower oil", "corn oil", "cottonseed oil", "grapeseed oil",
      "rice bran oil", "vegetable oil",
      "peanut oil", "sesame oil",
    ],
  
    // ── Environmental & "Forever" Chemicals ──
  
    "PFAS (Forever Chemicals)": [
      "PFAS", "PFOA", "PFOS", "perfluoro", "polyfluoro",
      "fluorotelomer", "PTFE", "teflon",
      "perfluorooctanoic", "perfluorooctane",
      "GenX",
    ],
  
    "Microplastics": [
      "microplastic", "polyethylene", "polypropylene",
      "nylon", "polyester", "acrylic", "PET",
      "plastic micro", "plastic particle",
      "polymethyl methacrylate", "PMMA",
      "polytetrafluoroethylene",
      // Also flag from packaging
      "plastic bottle", "plastic cap", "plastic wrap",
      "plastic film", "plastic bag", "plastic lining",
      "plastic straw", "plastic shrink wrap",
      "plastic tube", "plastic pump", "plastic sprayer",
      "plastic wand", "plastic jar", "plastic lid",
      "plastic trigger", "plastic inner bag",
    ],
  
    "Bleached Fabrics": [
      "chlorine bleach", "sodium hypochlorite", "bleached",
      "chlorine", "optical brightener",
    ],
  
    "Animal Cruelty Free": [
      // Same as Cruelty-Free — certification check, not ingredient match.
    ],
  
    "Eco-Friendly Packaging": [
      // This is checked against the packaging array, not ingredients.
      // Products with "plastic" in packaging would be flagged.
      "plastic",
    ],
  };

  export const PREFERENCE_EXCLUSIONS: Record<string, string[]> = {
    "Dairy": [
      "shea butter", "BUTYROSPERMUM PARKII BUTTER / SHEA BUTTER", "butyrospermum parkii", "cocoa butter", "mango butter",
      "mango seed butter", "almond butter", "peanut butter", "cashew butter",
      "sunflower butter", "coconut butter", "body butter", "murumuru butter",
      "cupuacu butter", "avocado butter", "hemp butter", "seed butter",
      "nut butter", "apple butter", "cookie butter", "kokum butter",
      "illipe butter", "sal butter", "tucuma butter",
    ],
  };