# Wealth & Asset Tracker
Personal finance tracker with stock lookup, deployed to Vercel.

## Features
- Log income and expense transactions
- View live summary of income, expenses, and net balance
- Delete transactions
- Look up real-time stock prices via Alpha Vantage API
- Data persists in PostgreSQL database hosted on Neon
- Deployed live on Vercel

## How to Run
Install dependencies, generate Prisma client, then start dev server:

```
npm install
npm prisma generate
node run dev
```

Then open `http://localhost:3000` in a browser.

## Tech Used
- Next.js 16 with App Router
- React with useState and useEffect hooks
- TypeScript
- Prisma ORM with PostgreSQL on Neon
- Alpha Vantage API for real-time stock prices access
- Vercel for cloud deployment

## Live Demo
https://wealth-and-asset-tracker-stephen-tisdale-s-projects.vercel.app

