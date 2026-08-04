// ==========================================
// Journal whatWeMonitor → Ingredient Keywords Dictionary
// ==========================================
// JournalCondition.whatWeMonitor entries use broad phrases (e.g.
// "Dairy Products", "Refined Sugar") rather than precise ingredient
// names. This map expands each phrase into concrete ingredient
// keywords so scan matching (case-insensitive, partial match) can
// actually find them in a product's ingredient/packaging/allergen
// text, mirroring PREFERENCE_INGREDIENT_MAP.
// ==========================================

const ALCOHOL = [
  "alcohol", "ethanol", "wine", "beer", "liquor", "spirits",
  "vodka", "whiskey", "rum", "tequila", "champagne", "malt beverage",
];

const CAFFEINE = [
  "caffeine", "coffee", "espresso", "black tea", "green tea",
  "energy drink", "guarana", "yerba mate", "kola nut",
];

const DAIRY = [
  "milk", "cream", "butter", "buttermilk", "cheese", "casein",
  "caseinate", "sodium caseinate", "whey", "whey protein",
  "lactalbumin", "lactoglobulin", "lactose", "milk solids",
  "milk powder", "skimmed milk", "skim milk", "whole milk",
  "milk fat", "condensed milk", "evaporated milk", "milk protein",
  "yogurt", "yoghurt", "kefir", "ghee", "curds", "half-and-half",
  "custard", "ice cream", "pudding",
];

const SUGAR = [
  "sugar", "cane sugar", "white sugar", "brown sugar", "dextrose",
  "sucrose", "corn syrup", "high fructose corn syrup", "HFCS",
  "glucose syrup", "invert sugar", "fructose",
];

const REFINED_CARBS = [
  "white flour", "enriched flour", "refined flour", "white bread",
  "white rice", "white pasta", "refined grain", "wheat flour",
];

const ARTIFICIAL_SWEETENERS = [
  "aspartame", "sucralose", "saccharin", "acesulfame",
  "acesulfame potassium", "acesulfame-K", "neotame", "advantame",
  "cyclamate", "sugar alcohol", "sorbitol", "mannitol", "xylitol",
  "erythritol", "maltitol",
];

const SPICY_FOODS = [
  "chili", "chilli", "cayenne", "hot sauce", "jalapeno", "habanero",
  "sriracha", "crushed red pepper", "capsaicin", "hot pepper",
];

const ACIDIC_FOODS = [
  "citric acid", "vinegar", "citrus", "lemon", "lime", "orange juice",
  "tomato", "vinaigrette", "grapefruit",
];

const CITRUS = ["citrus", "lemon", "lime", "orange", "grapefruit", "citric acid"];

const TOMATOES = ["tomato", "tomato sauce", "tomato paste", "ketchup", "marinara"];

const CHOCOLATE = ["chocolate", "cocoa", "cacao"];

const MINT = ["mint", "peppermint", "spearmint", "menthol"];

const FATTY_FRIED_FOODS = [
  "fried", "deep fried", "hydrogenated oil", "partially hydrogenated",
  "saturated fat", "trans fat", "shortening", "lard", "palm oil",
];

const HISTAMINE_RICH_FOODS = [
  "aged cheese", "cured meat", "fermented", "sauerkraut", "kimchi",
  "soy sauce", "vinegar", "wine", "smoked fish", "processed meat",
];

const MSG = [
  "monosodium glutamate", "MSG", "glutamic acid",
  "monopotassium glutamate", "calcium glutamate", "sodium glutamate",
  "yeast extract", "hydrolyzed protein", "hydrolyzed vegetable protein",
  "autolyzed yeast",
];

const NITRATES_NITRITES = [
  "nitrate", "nitrite", "sodium nitrate", "sodium nitrite",
  "potassium nitrate", "potassium nitrite", "saltpeter",
  "celery powder", "celery juice", "celery extract",
];

const PROCESSED_FOODS = [
  "preservative", "artificial flavor", "artificial flavour",
  "artificial color", "artificial colour", "modified starch",
  "modified food starch", "maltodextrin", "hydrolyzed protein",
];

const SODIUM = [
  "sodium", "salt", "sodium chloride", "sodium nitrate",
  "sodium benzoate", "monosodium glutamate",
];

const SULFITES = [
  "sulfite", "sulphite", "sulfur dioxide", "potassium metabisulfite",
  "sodium metabisulfite", "sodium sulfite",
];

const TYRAMINE = [
  "aged cheese", "cured meat", "fermented", "soy sauce", "sauerkraut",
  "smoked fish", "red wine", "beer",
];

const ARGININE_RICH_FOODS = [
  "chocolate", "nuts", "peanut", "almond", "walnut", "cashew",
  "seeds", "gelatin",
];

const DRY_CRUNCHY_FOODS = ["cracker", "chip", "crisps", "toast", "pretzel", "crouton"];

export const JOURNAL_INGREDIENT_MAP: Record<string, string[]> = {
  "Alcohol": ALCOHOL,
  "More Alcohol": ALCOHOL,

  "Caffeine": CAFFEINE,
  "Caffeine (Excess)": CAFFEINE,
  "Caffeine (timing)": CAFFEINE,
  "Caffeine (withdrawal)": CAFFEINE,

  "Dairy Products": DAIRY,
  "Dairy (for children)": DAIRY,
  "Dairy (timing)": DAIRY,

  "Sugar": SUGAR,
  "Sugar (Excess)": SUGAR,
  "Refined Sugar": SUGAR,
  "Processed Sugar": SUGAR,

  "Refined Carbohydrates": REFINED_CARBS,

  "Artificial Sweeteners": ARTIFICIAL_SWEETENERS,

  "Spicy Foods": SPICY_FOODS,

  "Acidic Foods": ACIDIC_FOODS,
  "Acidic Foods/Drinks": ACIDIC_FOODS,

  "Citrus": CITRUS,
  "Tomatoes": TOMATOES,
  "Chocolate": CHOCOLATE,
  "Mint": MINT,

  "Fatty Foods": FATTY_FRIED_FOODS,
  "Fried Foods": FATTY_FRIED_FOODS,
  "Fried/Fatty Foods": FATTY_FRIED_FOODS,
  "Greasy Foods": FATTY_FRIED_FOODS,
  "High-Fat Foods": FATTY_FRIED_FOODS,
  "Heavy, Fatty Foods": FATTY_FRIED_FOODS,

  "Histamine-Rich Foods": HISTAMINE_RICH_FOODS,
  "High-Histamine Foods": HISTAMINE_RICH_FOODS,

  "MSG": MSG,
  "Nitrates/Nitrites": NITRATES_NITRITES,
  "Processed Foods": PROCESSED_FOODS,

  "Sodium (Excess)": SODIUM,

  "Sulfites": SULFITES,
  "Tyramine": TYRAMINE,
  "Arginine-Rich Foods": ARGININE_RICH_FOODS,
  "Dry/Crunchy Foods": DRY_CRUNCHY_FOODS,
};
