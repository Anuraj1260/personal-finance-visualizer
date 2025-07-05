// src/models/Budget.ts
import mongoose, { Schema, model, models } from "mongoose";

export interface IBudget {
  category: string;
  amount: number;
  month: string;
}

const BudgetSchema = new Schema<IBudget>({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
});

const Budget =
  (globalThis as any).BudgetModel || model<IBudget>("Budget", BudgetSchema);

(globalThis as any).BudgetModel = Budget;

export default Budget;
