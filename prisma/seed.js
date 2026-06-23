// This file seeds the database with initial mock data.
// Run with `node prisma/seed.js`

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.transaction.createMany({
        data: [
            { date: "2026-06-01", desc: "Salary", type: "Income", amount: 5000.00 },
            { date: "2026-06-02", desc: "Groceries", type: "Expense", amount: 150.00 },
            { date: "2026-06-03", desc: "Electricity Bill", type: "Expense", amount: 75.00 },
            { date: "2026-06-04", desc: "Dining Out", type: "Expense", amount: 60.00 }
        ]
    });
    console.log("Database seeded with sample transactions.");
}

main()
    .catch(function(e) {
        console.error(e);
        process.exit(1);
    })
    .finally(async function() {
        await prisma.$disconnect();
    });
