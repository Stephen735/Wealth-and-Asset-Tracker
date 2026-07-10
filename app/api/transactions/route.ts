// GET & POST API routes for transactions

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const transactions = await prisma.transaction.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json(transactions);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, desc, type, amount } = body;

        if (!date || !desc || !type || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newTransaction = await prisma.transaction.create({
            data: {
                date,
                desc,
                type,
                amount: parseFloat(amount),
            },
        });

        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
    }
}
