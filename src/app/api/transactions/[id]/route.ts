// src/app/api/transactions/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

// ✅ PATCH: Update transaction
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const id = params.id;
    const data = await req.json();

    const updated = await Transaction.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
  }
}


export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongo();
    const { id } = await context.params;

    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Transaction deleted successfully." });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
  }
}
