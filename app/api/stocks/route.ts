import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol");

    if (!symbol) {
        return NextResponse.json({ error: "Missing required symbol" }, { status: 400 });
    }

    try {
        const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        const quote = data["Global Quote"];

        if (!quote || !quote["05. price"]) {
            return NextResponse.json({ error: "Could not find symbol." }, { status: 404 });
        }

        // Return needed fields
        return NextResponse.json({
            symbol: quote["01. symbol"],
            price: parseFloat(quote["05. price"]).toFixed(2),
            change: parseFloat(quote["09. change"]).toFixed(2),
            changePercent: quote["10. change percent"].replace("%", "").trim(),
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
    }
}
