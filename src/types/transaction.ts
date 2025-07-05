// src/types/transaction.ts
export interface Transaction {
  _id: string;
  description: string;
  amount: number;
  date: string;     // stored as ISO string on frontend
  category: string; // ✅ made required
}
