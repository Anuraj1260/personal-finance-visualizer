"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/actions";
import { Transaction } from "@/types/transaction";

import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import SummaryCards from "@/components/SummaryCards";
import BudgetForm from "@/components/BudgetForm";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";
import SpendingInsights from "@/components/SpendingInsights";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    async function fetchData() {
      try {
        const txnRes = await fetch("/api/transactions");
        const txns = await txnRes.json();
        setTransactions(Array.isArray(txns) ? txns : []);

        const budgetRes = await fetch("/api/budgets");
        const budgetData = await budgetRes.json();
        setBudgets(Array.isArray(budgetData) ? budgetData : []);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  const handleAddTransaction = (newTxn: Transaction) => {
    setTransactions((prev) => [newTxn, ...prev]);
  };

  const handleTransactionListChange = (updatedTxns: Transaction[]) => {
    setTransactions(updatedTxns);
  };

  return (
    <main className="min-h-screen p-6 sm:p-10 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Personal Finance Visualizer 💸
      </h1>

      {/* Summary */}
      <section className="mb-6">
        <SummaryCards transactions={transactions} />
      </section>

      {/* Transaction Input */}
      <section className="mb-6 flex justify-center">
        <TransactionForm onAdd={handleAddTransaction} />
      </section>

      {/* Budget Input */}
      <section className="mb-6">
        <BudgetForm
          onAdd={() => {
            fetch("/api/budgets")
              .then((res) => res.json())
              .then((data) => setBudgets(Array.isArray(data) ? data : []));
          }}
        />
      </section>

{/* Select Month + Spending Insights together */}
<section className="mb-6">
  <label className="text-gray-700 dark:text-gray-200 mb-2 block">
    Select Month:
    <input
      type="month"
      value={month}
      onChange={(e) => setMonth(e.target.value)}
      className="ml-2 p-2 border rounded"
    />
  </label>

  <SpendingInsights
    transactions={transactions}
    budgets={budgets}
    selectedMonth={month}
  />
</section>


      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <MonthlyBarChart transactions={transactions} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <CategoryPieChart transactions={transactions} />
        </div>
      </section>

      {/* Budget Comparison */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-10">
        <BudgetComparisonChart
          transactions={transactions}
          budgets={budgets}
          selectedMonth={month}
        />
      </div>

      {/* Transactions List */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Transactions 📄
        </h2>
        <TransactionList
          transactions={transactions}
          onChange={handleTransactionListChange}
        />
      </section>
    </main>
  );
}
