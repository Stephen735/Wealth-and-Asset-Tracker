"use client";

// Main page: Transaction Management

import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

interface Transaction {
    id: number;
    date: string;
    desc: string;
    type: string;
    amount: number;
}

export default function Home() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Load transactions from the API
    function loadTransactions() {
        fetch("/api/transactions")
        .then(function(res) { return res.json(); })
        .then(function(data) { setTransactions(data); })
        .catch(function(err) { console.error("Failed to load transactions:", err); });
    }

    // Load transactions when the component mounts
    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <main>
            <TransactionForm onAdd={loadTransactions} />
            <TransactionList transactions={transactions} onDelete={loadTransactions} />
        </main>
    );
}