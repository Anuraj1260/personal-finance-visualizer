// src/models/Transaction.ts
import mongoose, { Schema, Model, models } from "mongoose";

export interface ITransaction {
  description: string;
  amount: number;
  date: Date;
  category: string;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ SAFE GLOBAL STORAGE for hot reload
const Transaction =
  (globalThis as any).TransactionModel ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);

(globalThis as any).TransactionModel = Transaction;

export default Transaction;
