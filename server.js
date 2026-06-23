const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// In-memory storage for transactions (replaces localStorage)
let transactions = [];

// Middleware: parse incoming JSON request bodies
app.use(express.json());

// Middleware: log every incoming request to the console
app.use(function (req, res, next) {
  console.log(req.method + " " + req.url);
  next();
});

// Middleware: serve static files (index.html, CSS, etc.) from the public folder
app.use(express.static("public"));

// GET /api/transactions — return all transactions as JSON
app.get("/api/transactions", async function (req, res) {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
});

// POST /api/transactions — receive a new transaction and add it to the array
app.post("/api/transactions", async function (req, res) {
  const { date, desc, type, amount } = req.body;

  // Basic validation
  if (!date || !desc || !type || !amount) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        date,
        desc,
        type,
        amount: parseFloat(amount)
      }
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save transaction." });
  }
});

// DELETE /api/transactions/:id — remove a transaction by id
app.delete("/api/transactions/:id", async function (req, res) {
  const id = parseInt(req.params.id);

  try {
    await prisma.transaction.delete({
      where: { id }
    });
    res.json({ message: "Transaction deleted." });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Transaction not found." });
  }
});

// 404 handler — catch any routes that don't exist
app.use(function (req, res) {
  res.status(404).json({ error: "Route not found." });
});

// Start the server
app.listen(PORT, function () {
  console.log("Server running at http://localhost:" + PORT);
});
