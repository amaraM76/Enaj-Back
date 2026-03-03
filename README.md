# Enaj API (Backend)

Enaj helps people shop smarter by identifying ingredients and chemicals in products that may affect their health conditions or personal preferences. Users select their ailments, confirm preferences they want to avoid, and Enaj flags problematic products and recommends safer alternatives.

This is the **backend API** — a standalone Next.js project that serves data to the Enaj frontend.

## Tech Stack

- **Framework:** Next.js 14 (App Router, API routes only)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** bcrypt for password hashing
- **CORS:** Configured in `next.config.js` for cross-origin frontend requests

## Prerequisites

- Node.js 18+
- PostgreSQL installed and running
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone <your-backend-repo-url>
cd enaj-api
```

### 2. Install dependencies

```bash
npm install
```

All dependencies (Prisma, bcrypt, etc.) are already listed in `package.json`.

### 3. Set up environment variables

Copy the example and fill in your PostgreSQL credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/enaj?schema=public"
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Seed the database

```bash
npx prisma db seed
```

This creates:

- 8 ailment categories with 34 ailments
- 6 preference categories with 33 preferences (including descriptions for info icons)
- Ailment-to-preference linked mappings (e.g. Rosacea → No Fragrance, No Alcohol, No Sulfates)
- Flagged ingredients with reasons and source citations for Rosacea, Eczema, Celiac, Asthma, IBS, Diabetes
- 24 products across all 7 categories matching the frontend demo data
- 3 test users:
  - **Sarah** (sarahj / password123) — Rosacea → No Fragrance/Alcohol/Sulfates preselected + No Parabens/Cruelty-Free selected
  - **Marcus** (marcusc / password456) — Asthma → No Food Dyes preselected + No PFAS/Microplastics/Eco Packaging selected
  - **Priya** (priyap / password789) — Celiac + Dairy Allergy + custom "Histamine Intolerance" → Gluten-Free/Dairy preselected + No Soy/Organic/Food Dyes selected

### 6. Start the backend

```bash
npm run dev
```

Backend runs on **http://localhost:3001** (port 3001 so it doesn't conflict with the frontend on port 3000).

Visit http://localhost:3001 to see the list of available endpoints.

## Connecting the Frontend

In your frontend repo, add to `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Then in your frontend code, replace hardcoded data imports with API calls:

```typescript
// Before (hardcoded data)
import { AILMENT_CATEGORIES } from '@/lib/enaj-data'

// After (fetching from backend)
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ailments`)
const { categories } = await res.json()
```

```typescript
// Before (hardcoded data)
import { PREFERENCE_CATEGORIES } from '@/lib/enaj-data'

// After (fetching from backend)
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/preferences`)
const { categories } = await res.json()
```

```typescript
// Scanning a product for a user
const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/products/skin-body/glow-radiance-sunscreen/scan?userId=${userId}`
)
const { product, isRecommended, flaggedIngredients, alternatives } = await res.json()
```

## CORS

CORS is configured in `next.config.js`. During development it allows all origins (`*`). For production, update it to your frontend URL:

```javascript
// next.config.js
value: "https://your-frontend-domain.vercel.app"
```

## Project Structure

```
enaj-api/
├── prisma/
│   ├── schema.prisma                              # Database schema
│   └── seed.ts                                    # Seed data
├── app/
│   ├── lib/
│   │   └── prisma.ts                              # Shared Prisma client
│   ├── page.tsx                                   # Homepage listing endpoints
│   ├── layout.tsx                                 # Root layout
│   └── api/
│       ├── ailments/
│       │   ├── route.ts                           # GET all categories + ailments
│       │   └── [slug]/
│       │       └── linked-preferences/
│       │           └── route.ts                   # GET preferences to auto-select
│       ├── preferences/
│       │   └── route.ts                           # GET categories, POST save
│       ├── products/
│       │   └── [category]/
│       │       ├── route.ts                       # GET products with optional scan
│       │       └── [slug]/
│       │           └── scan/
│       │               └── route.ts               # GET scan result for one product
│       ├── saved-products/
│       │   └── route.ts                           # GET, POST, DELETE
│       └── users/
│           └── [userId]/
│               └── route.ts                       # GET full profile
├── next.config.js                                 # CORS configuration
├── package.json                                   # Dependencies + seed script
├── tsconfig.json                                  # TypeScript config
├── test-api.sh                                    # Curl commands for testing
├── .env.example                                   # Environment template
├── .gitignore                                     # Git ignore rules
└── README.md
```

## API Routes

### Ailments

**GET `/api/ailments`** — All ailment categories with ailments, flagged ingredients (with sources), and linked preferences. Response shaped to match the frontend `AILMENT_CATEGORIES` array.

**GET `/api/ailments/:slug/linked-preferences`** — Preferences to auto-select when an ailment is chosen. For example, `/api/ailments/rosacea/linked-preferences` returns No Fragrance, No Alcohol, No Sulfates.

### Preferences

**GET `/api/preferences`** — All preference categories with preferences and info icon descriptions. Response shaped to match the frontend `PREFERENCE_CATEGORIES` array.

**POST `/api/preferences`** — Save user's confirmed preference selections. Accepts `preferenceSlug` for predefined or `customEntry` for typed-in preferences.

### Products

**GET `/api/products/:category`** — Products by category. Valid categories: `skin-body`, `haircare`, `makeup`, `food`, `cleaning`, `fragrance`, `household`. Add `?userId=xxx` to include scan results with flagged ingredients and alternatives.

**GET `/api/products/:category/:slug/scan?userId=xxx`** — Full scan of a single product. Returns the `ScanResult` shape: flagged ingredients (from both ailments and preferences), whether the product is recommended, citation sources, and safe alternatives.

### Saved Products

**GET `/api/saved-products?userId=xxx`** — User's saved products.

**POST `/api/saved-products`** — Save a product. Body: `{ userId, productSlug }`. Returns 409 if already saved.

**DELETE `/api/saved-products`** — Remove a saved product. Body: `{ userId, productSlug }`.

### User Profile

**GET `/api/users/:userId`** — Full profile shaped to match the frontend `UserProfile` interface, including `selectedAilments` with `activeIngredients`, `selectedPreferences`, `savedProducts`, and custom entries.

## How Enaj Works (Example Flow)

1. **Sarah selects Rosacea** on the Health Conditions page → frontend calls `POST` to save `UserAilment`
2. **Frontend calls** `GET /api/ailments/rosacea/linked-preferences` → returns No Fragrance, No Alcohol, No Sulfates
3. **Preferences page** shows those three preselected. Sarah also checks No Parabens and Cruelty-Free manually.
4. **Sarah confirms** → frontend calls `POST /api/preferences` → five rows saved in `UserPreference` (3 PRESELECTED, 2 SELECTED)
5. **Sarah scans Glow Radiance Sunscreen** → frontend calls `GET /api/products/skin-body/glow-radiance-sunscreen/scan?userId=xxx` → API compares ingredients against her ailment's flagged ingredients → flags "Alcohol Denat" and "Fragrance" (source: ailment, Rosacea)
6. **API returns alternatives** → sunscreens with zero flags (Pure Mineral, Gentle Shield)

## Useful Commands

```bash
npm run dev                          # Start backend on port 3001
npx prisma studio                    # Visual database browser
npx prisma migrate reset             # Reset database and re-seed
npx prisma migrate dev --name <n>    # New migration after schema changes
npx prisma format                    # Format schema file
```

## Deployment

When deploying separately:

- **Backend:** Deploy to Vercel, Railway, Render, or any Node.js host. Set `DATABASE_URL` in environment variables.
- **Frontend:** Deploy separately. Set `NEXT_PUBLIC_API_URL` to your backend's production URL.
- **CORS:** Update `next.config.js` to allow only your frontend's production domain.
