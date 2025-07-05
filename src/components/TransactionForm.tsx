"use client";

import { useState } from "react";
import { Transaction } from "@/types/transaction"; // Optional: shared type

const categories = [
  "Food",
  "Transport",
  "Rent",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

interface TransactionFormProps {
  onAdd?: (newTxn: Transaction) => void;
}

export default function TransactionForm({ onAdd }: TransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Other");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!description || !amount || !date || !category) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          date: new Date(date),
          category,
        }),
      });

      if (!res.ok) throw new Error("Failed to add transaction");

      const newTxn: Transaction = await res.json();

      if (onAdd) onAdd(newTxn);

      setMessage("✅ Transaction added!");
      setDescription("");
      setAmount("");
      setDate("");
      setCategory("Other");
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError("❌ Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      {message && <div className="text-green-600">{message}</div>}
      {error && <div className="text-red-600">{error}</div>}

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 rounded"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Add Transaction
      </button>
    </form>
  );
}
