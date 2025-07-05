"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Transaction } from "@/types/transaction"; // ✅ Optional: use centralized type

interface Props {
  transactions: Transaction[];
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
];

export default function CategoryPieChart({ transactions }: Props) {
  const categoryTotals: { [key: string]: number } = {};

  transactions.forEach((txn) => {
    if (!txn.category || typeof txn.amount !== "number") return;
    categoryTotals[txn.category] =
      (categoryTotals[txn.category] || 0) + txn.amount;
  });

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  if (pieData.length === 0)
    return <p className="text-gray-500">No data to display.</p>;

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
