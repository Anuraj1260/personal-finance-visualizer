"use client";

import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { Transaction } from "@/types/transaction";
import { Budget } from "@/types/budget";

function getMonth(txn: Transaction) {
  return txn.date.slice(0, 7); // YYYY-MM
}

export default function BudgetComparisonChart({
  transactions,
  budgets,
  selectedMonth,
}: {
  transactions: Transaction[];
  budgets: Budget[];
  selectedMonth: string;
}) {
  const spending: { [key: string]: number } = {};
  transactions
    .filter((txn) => getMonth(txn) === selectedMonth)
    .forEach((txn) => {
      spending[txn.category] = (spending[txn.category] || 0) + txn.amount;
    });

  const chartData = budgets
    .filter((b) => b.month === selectedMonth)
    .map((b) => ({
      category: b.category,
      Budgeted: b.amount,
      Spent: spending[b.category] || 0,
    }));

  if (chartData.length === 0) return <p className="text-gray-500">No data to display.</p>;

  return (
    <>
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
        📌 Insights for {selectedMonth}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budgeted" fill="#8884d8" />
          <Bar dataKey="Spent" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
