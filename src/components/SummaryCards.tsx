"use client";

import React from "react";
import { Transaction } from "@/types/transaction"; // ✅ Import shared type

type Props = {
  transactions: Transaction[];
};

const SummaryCards = ({ transactions }: Props) => {
  const total = transactions.reduce((sum, txn) => sum + txn.amount, 0);

  const categoryMap = transactions.reduce((acc: Record<string, number>, txn) => {
    const category = txn.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + txn.amount;
    return acc;
  }, {});

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">📊 Summary</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded">
          <h3 className="text-lg font-semibold">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">₹{total}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded">
          <h3 className="text-lg font-semibold">Category Breakdown</h3>
          {Object.entries(categoryMap).map(([category, amt]) => (
            <p key={category}>
              {category}: ₹{amt}
            </p>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          {recentTransactions.map((recentTxn) => (
            <div key={recentTxn._id} className="mb-2">
              <p>
                {recentTxn.description} — ₹{recentTxn.amount}
              </p>
              <p className="text-xs text-gray-500">
                {new Intl.DateTimeFormat("en-GB").format(new Date(recentTxn.date))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummaryCards;
