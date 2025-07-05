// src/components/SpendingInsights.tsx
"use client";
import { Transaction } from "@/types/transaction";
import { Budget } from "@/types/budget";

interface Props {
  transactions: Transaction[];
  budgets: any[];
  selectedMonth: string;
}

export default function SpendingInsights({ transactions, budgets, selectedMonth }: Props) {
  const spending: Record<string, number> = {};

  const filteredTxns = transactions.filter((txn) =>
    txn.date.startsWith(selectedMonth)
  );

  for (const txn of filteredTxns) {
    spending[txn.category] = (spending[txn.category] || 0) + txn.amount;
  }

  const overBudget = Array.isArray(budgets)
    ? budgets
        .filter((b) => b.month === selectedMonth)
        .filter((b) => spending[b.category] > b.amount)
    : [];

  if (overBudget.length === 0) return null;

  return (
    <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded mb-6">
      <h2 className="font-bold mb-2">⚠️ Over Budget Warnings</h2>
      <ul>
        {overBudget.map((b) => (
          <li key={b._id}>
            {b.category}: Spent ₹{spending[b.category]} of ₹{b.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
