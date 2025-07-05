// src/models/Transaction.ts
import mongoose, { Schema, model, models, Model } from "mongoose";

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

// ✅ Properly type global cache to avoid `any`
type TransactionModelType = Model<ITransaction>;

const Transaction =
  (globalThis as any).TransactionModel ||
  model<ITransaction>("Transaction", TransactionSchema);

(globalThis as any).TransactionModel = Transaction;

export default Transaction;
