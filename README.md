# Wealth & Asset Tracker
Personal finance tracker refactored to use a PostgreSQL database via Prisma ORM.

## New Features
- Added Prisma ORM to replace in-memery server array
- Connected to hosted PostgreSQL database on Neon
- Transactions now persist after server restarts
- Database seeded with initial mock data

## How to Run
Install dependencies, push schema to database, seed it, and start the server:
```
npm install
npx prisma db push
node prisma/seed.js
node server.js
```
Then open `http://localhost:3000` in a browser.

## Tech Used
- Node.js and Express for the server
- Prisma ORM for database queries
- PostgreSQL hosted on Neon
- Environment variables via .env for database credentials