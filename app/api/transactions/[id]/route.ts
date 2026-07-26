// DELETE API route for a specific transaction

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id: idParam } = await context.params;
        const id = parseInt(idParam);

        await prisma.transaction.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete transaction" }, { status: 404 });
    }
}
