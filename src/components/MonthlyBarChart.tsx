"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/types/transaction"; // Optional: centralized type

interface Props {
  transactions: Transaction[];
}

// Group and sum transactions by month
function groupByMonth(transactions: Transaction[]) {
  const grouped: { [key: string]: number } = {};

  transactions.forEach((txn) => {
    if (!txn.date || typeof txn.amount !== "number") return;

    const date = new Date(txn.date);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    grouped[month] = (grouped[month] || 0) + txn.amount;
  });

  return Object.entries(grouped).map(([month, amount]) => ({
    month,
    amount,
  }));
}

export default function MonthlyBarChart({ transactions }: Props) {
  const data = groupByMonth(transactions);

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">📊 Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value: number) => `₹${value}`} />
          <Bar dataKey="amount" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
