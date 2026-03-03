#!/bin/bash

# ============================================
# Enaj API — Test Commands
# ============================================
# Backend runs on port 3001
# Replace USER_ID with actual UUIDs from your seeded data.
# To get IDs, run: npx prisma studio
# ============================================

BASE_URL="http://localhost:3001/api"


# ============================================
# BROWSER-PASTEABLE URLs
# ============================================
# Copy and paste any of these directly into Chrome, Safari,
# Firefox, or Edge to test GET endpoints:
#
# All ailment categories + conditions:
#   http://localhost:3001/api/ailments
#
# Rosacea linked preferences:
#   http://localhost:3001/api/ailments/rosacea/linked-preferences
#
# Celiac linked preferences:
#   http://localhost:3001/api/ailments/celiac/linked-preferences
#
# Eczema linked preferences:
#   http://localhost:3001/api/ailments/eczema/linked-preferences
#
# Asthma linked preferences:
#   http://localhost:3001/api/ailments/asthma/linked-preferences
#
# Diabetes linked preferences:
#   http://localhost:3001/api/ailments/diabetes/linked-preferences
#
# All preference categories:
#   http://localhost:3001/api/preferences
#
# Products by category:
#   http://localhost:3001/api/products/skin-body
#   http://localhost:3001/api/products/haircare
#   http://localhost:3001/api/products/makeup
#   http://localhost:3001/api/products/food
#   http://localhost:3001/api/products/cleaning
#   http://localhost:3001/api/products/fragrance
#   http://localhost:3001/api/products/household
#
# Products with scan (replace USER_ID):
#   http://localhost:3001/api/products/skin-body?userId=USER_ID
#   http://localhost:3001/api/products/makeup?userId=USER_ID
#   http://localhost:3001/api/products/food?userId=USER_ID
#
# Single product scan (replace USER_ID):
#   http://localhost:3001/api/products/skin-body/glow-radiance-sunscreen/scan?userId=USER_ID
#   http://localhost:3001/api/products/makeup/flawless-matte-foundation/scan?userId=USER_ID
#   http://localhost:3001/api/products/cleaning/heavy-duty-bathroom-cleaner/scan?userId=USER_ID
#   http://localhost:3001/api/products/food/berry-blast-protein-bar/scan?userId=USER_ID
#
# Saved products (replace USER_ID):
#   http://localhost:3001/api/saved-products?userId=USER_ID
#
# User profile (replace USER_ID):
#   http://localhost:3001/api/users/USER_ID
#
# ============================================


# ============================================
# AILMENTS (Health Conditions)
# ============================================

# Get all ailment categories with ailments, flagged ingredients, and linked preferences
echo "=== All Ailment Categories ==="
curl -s "$BASE_URL/ailments" | jq

# Get linked preferences for Rosacea (what gets auto-selected on Preferences page)
echo "\n=== Rosacea Linked Preferences ==="
curl -s "$BASE_URL/ailments/rosacea/linked-preferences" | jq

# Get linked preferences for Celiac Disease
echo "\n=== Celiac Linked Preferences ==="
curl -s "$BASE_URL/ailments/celiac/linked-preferences" | jq

# Get linked preferences for Asthma
echo "\n=== Asthma Linked Preferences ==="
curl -s "$BASE_URL/ailments/asthma/linked-preferences" | jq


# ============================================
# PREFERENCES
# ============================================

# Get all preference categories with descriptions (powers the Preferences page)
echo "\n=== All Preference Categories ==="
curl -s "$BASE_URL/preferences" | jq

# Save user preferences (POST — cannot test in browser, use curl or Postman)
echo "\n=== Save User Preferences ==="
curl -s -X POST "$BASE_URL/preferences" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "preferences": [
      { "preferenceSlug": "no-fragrance", "source": "PRESELECTED" },
      { "preferenceSlug": "no-sulfates", "source": "PRESELECTED" },
      { "preferenceSlug": "cruelty-free", "source": "SELECTED" },
      { "customEntry": "No palm oil", "source": "CUSTOM" }
    ]
  }' | jq


# ============================================
# PRODUCTS
# ============================================

# Get all skin & body care products
echo "\n=== Skin & Body Care Products ==="
curl -s "$BASE_URL/products/skin-body" | jq

# Get makeup products
echo "\n=== Makeup Products ==="
curl -s "$BASE_URL/products/makeup" | jq

# Get food products
echo "\n=== Food Products ==="
curl -s "$BASE_URL/products/food" | jq

# Get cleaning products
echo "\n=== Cleaning Products ==="
curl -s "$BASE_URL/products/cleaning" | jq

# Get fragrance products
echo "\n=== Fragrance Products ==="
curl -s "$BASE_URL/products/fragrance" | jq

# Get household products
echo "\n=== Household Products ==="
curl -s "$BASE_URL/products/household" | jq

# Get haircare products
echo "\n=== Haircare Products ==="
curl -s "$BASE_URL/products/haircare" | jq

# Products with scan results for Sarah (has Rosacea)
# Should flag Alcohol Denat, Fragrance, SLS in products
echo "\n=== Skin Products With Scan for Sarah ==="
curl -s "$BASE_URL/products/skin-body?userId=USER_ID" | jq

# Cleaning products with scan for Marcus (has Asthma)
echo "\n=== Cleaning Products With Scan for Marcus ==="
curl -s "$BASE_URL/products/cleaning?userId=USER_ID" | jq

# Food products with scan for Priya (Celiac + Dairy Allergy)
echo "\n=== Food Products With Scan for Priya ==="
curl -s "$BASE_URL/products/food?userId=USER_ID" | jq

# Invalid category (should return 400)
echo "\n=== Invalid Category ==="
curl -s "$BASE_URL/products/invalid" | jq


# ============================================
# PRODUCT SCAN (single product)
# ============================================

# Sarah scans Glow Radiance Sunscreen (has Alcohol Denat + Fragrance)
# Should flag both and recommend Pure Mineral + Gentle Shield
echo "\n=== Sarah Scans Glow Radiance Sunscreen ==="
curl -s "$BASE_URL/products/skin-body/glow-radiance-sunscreen/scan?userId=USER_ID" | jq

# Sarah scans Flawless Matte Foundation (has Fragrance + Parabens)
echo "\n=== Sarah Scans Flawless Matte Foundation ==="
curl -s "$BASE_URL/products/makeup/flawless-matte-foundation/scan?userId=USER_ID" | jq

# Marcus scans Heavy-Duty Bathroom Cleaner (has PFAS)
echo "\n=== Marcus Scans Heavy-Duty Cleaner ==="
curl -s "$BASE_URL/products/cleaning/heavy-duty-bathroom-cleaner/scan?userId=USER_ID" | jq

# Priya scans Berry Blast Protein Bar (has Soy Lecithin, Whey)
echo "\n=== Priya Scans Berry Blast Protein Bar ==="
curl -s "$BASE_URL/products/food/berry-blast-protein-bar/scan?userId=USER_ID" | jq


# ============================================
# SAVED PRODUCTS
# ============================================

# Get Sarah's saved products
echo "\n=== Sarah's Saved Products ==="
curl -s "$BASE_URL/saved-products?userId=USER_ID" | jq

# Save a product (POST — cannot test in browser, use curl or Postman)
echo "\n=== Save a Product ==="
curl -s -X POST "$BASE_URL/saved-products" \
  -H "Content-Type: application/json" \
  -d '{ "userId": "USER_ID", "productSlug": "organic-daily-moisturizer" }' | jq

# Save duplicate (should return 409)
echo "\n=== Save Duplicate (expect 409) ==="
curl -s -X POST "$BASE_URL/saved-products" \
  -H "Content-Type: application/json" \
  -d '{ "userId": "USER_ID", "productSlug": "organic-daily-moisturizer" }' | jq

# Remove saved product (DELETE — cannot test in browser, use curl or Postman)
echo "\n=== Remove Saved Product ==="
curl -s -X DELETE "$BASE_URL/saved-products" \
  -H "Content-Type: application/json" \
  -d '{ "userId": "USER_ID", "productSlug": "organic-daily-moisturizer" }' | jq


# ============================================
# USER PROFILE
# ============================================

# Get Sarah's full profile (ailments, preferences, saved products)
echo "\n=== Sarah's Full Profile ==="
curl -s "$BASE_URL/users/USER_ID" | jq

echo "\n=== Marcus's Full Profile ==="
curl -s "$BASE_URL/users/USER_ID" | jq

echo "\n=== Priya's Full Profile ==="
curl -s "$BASE_URL/users/USER_ID" | jq
