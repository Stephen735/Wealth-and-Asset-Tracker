# Wealth & Asset Tracker
Personal finance tracker migrated to Next.js with React components and App Router API routes.

## Features
- Log income and expense transactions
- View live summary of income, expenses, and net balance
- Delete transactions
- Data persists in PostgreSQL database hosted via Neon

## How to Run
Install dependencies, generate Prisma client, then start dev server:

```
npm install
npx prisma generate
npm run dev
```

Then open `http://localhost:3000` in a browser.

## Tech Used
- Next.js 14 with App Router
- React with useState and useEffect hooks
- Tyescript
- Prisma ORM with PostgreSQL on Neon
