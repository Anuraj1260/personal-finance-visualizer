"use client";

import { useState } from "react";
import { Transaction } from "@/types/transaction";

interface Props {
  transactions: Transaction[];
  onChange: (updatedTransactions: Transaction[]) => void;
}

const categories = [
  "Food",
  "Transport",
  "Rent",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

export default function TransactionList({ transactions, onChange }: Props) {
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete transaction");

      const updated = transactions.filter((txn) => txn._id !== id);
      onChange(updated);
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleEdit = async () => {
    if (!editingTxn) return;

    try {
      const res = await fetch(`/api/transactions/${editingTxn._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingTxn),
      });

      if (!res.ok) throw new Error("Failed to update transaction");

      const updated = transactions.map((txn) =>
        txn._id === editingTxn._id ? editingTxn : txn
      );
      onChange(updated);
      setEditingTxn(null);
    } catch (error) {
      console.error("Edit Error:", error);
    }
  };

  return (
    <div className="space-y-4">
      {transactions.map((txn) =>
        editingTxn?._id === txn._id ? (
          <div key={txn._id} className="p-4 bg-yellow-100 rounded">
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={editingTxn.description}
              onChange={(e) =>
                setEditingTxn({ ...editingTxn, description: e.target.value })
              }
            />

            <input
              type="number"
              className="w-full p-2 border rounded mb-2"
              value={editingTxn.amount === 0 ? "" : editingTxn.amount}
              onChange={(e) =>
                setEditingTxn({
                  ...editingTxn,
                  amount: e.target.value === "" ? 0 : parseFloat(e.target.value),
                })
              }
            />

            <input
              type="date"
              className="w-full p-2 border rounded mb-2"
              value={editingTxn.date.slice(0, 10)}
              onChange={(e) =>
                setEditingTxn({ ...editingTxn, date: e.target.value })
              }
            />

            <select
              className="w-full p-2 border rounded mb-2"
              value={editingTxn.category}
              onChange={(e) =>
                setEditingTxn({ ...editingTxn, category: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingTxn(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            key={txn._id}
            className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{txn.description}</p>
              <p className="text-sm text-gray-500">
                ₹{txn.amount} • {new Date(txn.date).toLocaleDateString()} •{" "}
                {txn.category}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingTxn(txn)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(txn._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
