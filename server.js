const express = require("express");
const app = express();
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
app.get("/api/transactions", function (req, res) {
  res.json(transactions);
});

// POST /api/transactions — receive a new transaction and add it to the array
app.post("/api/transactions", function (req, res) {
  const { date, desc, type, amount } = req.body;

  // Basic validation
  if (!date || !desc || !type || !amount) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Build the new transaction object
  const newTransaction = {
    id: Date.now(),
    date,
    desc,
    type,
    amount: parseFloat(amount)
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// DELETE /api/transactions/:id — remove a transaction by id
app.delete("/api/transactions/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const index = transactions.findIndex(function (t) { return t.id === id; });

  if (index === -1) {
    return res.status(404).json({ error: "Transaction not found." });
  }

  transactions.splice(index, 1);
  res.json({ message: "Transaction deleted." });
});

// 404 handler — catch any routes that don't exist
app.use(function (req, res) {
  res.status(404).json({ error: "Route not found." });
});

// Start the server
app.listen(PORT, function () {
  console.log("Server running at http://localhost:" + PORT);
});
