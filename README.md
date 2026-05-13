# Enaj API (Backend)

## Tech Stack
- **Framework:** Next.js 14 (App Router, API routes only)
- **Database:** PostgreSQL (local + Railway production)
- **ORM:** Prisma

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Fill in your `DATABASE_URL` in `.env`.

### 3. Generate Prisma client & run migrations
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Seed the database
```bash
npx prisma db seed
```

### 5. Start the backend
```bash
npm run dev
```
Runs on **http://localhost:3001**

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Run app locally |
| `npx prisma db seed` | Seed the database |
| `npx prisma migrate dev --name <name>` | Create & apply a new migration |
| `npx prisma migrate reset` | Reset database and re-seed |
| `npm run prisma:studio:local` | View local database (localhost:5555) |
| `npm run prisma:studio:prod` | View production database (localhost:5556) |
| `npm run prisma:push:local` | Push schema changes to local database |
| `npm run prisma:push:prod` | Push schema changes to production database ⚠️ |

---

## Connecting the Frontend

In your frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Deployment

- Set `DATABASE_URL` in your host's environment variables
- Update CORS in `next.config.js` to your frontend's production domain

## Commit
  - git add .
  - git commit -m "your message"
  - git push