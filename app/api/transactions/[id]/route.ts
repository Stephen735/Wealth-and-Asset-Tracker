// DELETE API route for a specific transaction

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id);

        await prisma.transaction.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete transaction" }, { status: 404 });
    }
}
