// src/lib/actions.ts
import { connectMongo } from "./mongodb";
import Transaction from "@/models/Transaction";
import { Transaction as TransactionType } from "@/types/transaction";

export async function getTransactions(): Promise<TransactionType[]> {
  try {
    await connectMongo();
    console.log("🔍 Connected to DB");

    const transactions = await Transaction.find().sort({ date: -1 });
    console.log("🔍 Fetched transactions:", transactions);

    return transactions.map((txn: any) => ({
      _id: txn._id.toString(),
      description: txn.description,
      amount: txn.amount,
      date: txn.date.toISOString(),
      category: txn.category,
    }));
  } catch (error) {
    console.error("❌ Failed to fetch transactions:", error);
    return [];
  }
}
