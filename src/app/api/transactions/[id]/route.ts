import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

// ✅ PATCH: Update a transaction
export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectMongo();
    const id = context.params.id;
    const data = await req.json();

    const updated = await Transaction.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
  }
}

// ✅ DELETE: Delete a transaction
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectMongo();
    const id = context.params.id;

    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
  }
}
