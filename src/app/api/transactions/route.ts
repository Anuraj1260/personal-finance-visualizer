// src/app/api/transactions/route.ts
import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { ITransaction } from "@/models/Transaction";


// ✅ GET: Fetch all transactions
export async function GET() {
  try {
    await connectMongo();

    const transactions = await Transaction.find().sort({ date: -1 });

    return NextResponse.json(
  transactions.map((txn: ITransaction & { _id: any }) => ({
    _id: txn._id.toString(),
    description: txn.description,
    amount: txn.amount,
    date: txn.date.toISOString(),
    category: txn.category,
  }))
);
  } catch (error) {
    console.error("❌ GET /api/transactions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new transaction
export async function POST(req: Request) {
  try {
    await connectMongo();

    const { description, amount, date, category } = await req.json();

    // ✅ Basic Validation
    if (
      !description ||
      typeof amount !== "number" ||
      !date ||
      typeof category !== "string"
    ) {
      return NextResponse.json(
        { error: "All fields are required and must be valid." },
        { status: 400 }
      );
    }

    const newTxn = await Transaction.create({
      description,
      amount,
      date: new Date(date),
      category,
    });

    return NextResponse.json({
      _id: newTxn._id.toString(),
      description: newTxn.description,
      amount: newTxn.amount,
      date: newTxn.date.toISOString(),
      category: newTxn.category,
    });
  } catch (error) {
    console.error("❌ POST /api/transactions error:", error);
    return NextResponse.json(
      { error: "Failed to add transaction" },
      { status: 500 }
    );
  }
}
