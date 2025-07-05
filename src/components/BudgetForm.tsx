"use client";

import { useState } from "react";

const categories = ["Food", "Transport", "Rent", "Bills", "Entertainment", "Other"];

export default function BudgetForm({ onAdd }: { onAdd: () => void }) {
  const [form, setForm] = useState({ category: "", amount: "", month: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/budgets", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        amount: parseFloat(form.amount),
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setForm({ category: "", amount: "", month: "" });
      onAdd();
      setMessage("✅ Budget added successfully");
    } else {
      setMessage("❌ Failed to add budget");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow"
    >
      {message && <p className="w-full text-sm text-green-600">{message}</p>}

      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="p-2 border rounded"
        required
      >
        <option value="">Category</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        className="p-2 border rounded"
        required
      />

      <input
        type="month"
        value={form.month}
        onChange={(e) => setForm({ ...form, month: e.target.value })}
        className="p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!form.category || !form.amount || !form.month}
      >
        Add Budget
      </button>
    </form>
  );
}
