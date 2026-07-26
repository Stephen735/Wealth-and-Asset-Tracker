"use client";

import { useState } from "react";

interface StockData {
    symbol: string;
    price: string;
    change: string;
    changePercent: string;
}

export default function StockLookup() {
    const [symbol, setSymbol] = useState("");
    const [stock, setStock] = useState<StockData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleLookup() {
        if (!symbol.trim()) {
            setError("Please enter a stock symbol.");
            return;
        }

        setLoading(true);
        setError("");
        setStock(null);

        fetch("/api/stocks?symbol=" + symbol.toUpperCase())
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.error) {
                setError(data.error);
            } else {
                setStock(data);
            }
            setLoading(false);
        })
        .catch(function(err) {
            console.error("Failed to fetch stock data:", err);
            setError("Sorry, try again.");
            setLoading(false);
        });
    }

    const isPositive = stock && parseFloat(stock.change) >= 0;

    return (
        <section>
            <h2>Stock Lookup</h2>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="stock-symbol">Ticker Symbol</label>
                    <input
                        type="text"
                        id="stock-symbol"
                        placeholder="ex. AAPL"
                        value={symbol}
                        onChange={function(e) { setSymbol(e.target.value.toUpperCase()); }}
                        />
                        </div>
                        <div className="form-group" style={{ justifyContent: "flex-end"}}>
                            <button onClick={handleLookup} disabled={loading}>
                                {loading ? "Loading..." : "Lookup"}
                            </button>
                        </div>
                    </div>
                    {error && (<p style={{ color: "#c62828", fontSize: "0.875rem", marginTop: "0.5rem" }}>{error}</p>)}

                    {stock && (
                        <div className="stock-result">
                            <div className="stock-symbol">{stock.symbol}</div>
                            <div className="stock-price">${stock.price}</div>
                            <div className="stock-change" style={{ color: isPositive ? "#2e7d32" : "#c62828" }}>
                                {isPositive ? "+" : ""}{stock.change} ({isPositive ? "+" : ""}{stock.changePercent}%)
                            </div>
                        </div>
                    )}
        </section>
    );
}
 