# 📊 Personal Finance Visualizer

A simple and responsive web application to help users **track personal finances, categorize expenses, and manage budgets**, with intuitive visualizations and a clean UI.

---

## 🌐 Live Demo

🔗 [View App on Vercel](https://personal-finance-visualizer-smoky-two.vercel.app/)

---

## 📁 GitHub Repository

🔗 [GitHub Repo](https://github.com/Anuraj1260/personal-finance-visualizer)

---

## ✅ Features by Stage

### 🟩 Stage 1 – Basic Transaction Tracking
- Add/Edit/Delete transactions (amount, date, description)
- Transaction list view
- Monthly expenses bar chart (Recharts)
- Basic form validation and error states

---

### 🟨 Stage 2 – Categories
- All Stage 1 features +
- Predefined categories (e.g., Food, Travel, Rent)
- Pie chart for category-wise expense breakdown
- Dashboard with summary cards:
  - Total expenses
  - Most recent transactions
  - Category breakdown

---

### 🟥 Stage 3 – Budgeting
- All Stage 2 features +
- Set monthly budgets for each category
- Budget vs. Actual comparison chart
- Simple spending insights (e.g., over-budget alerts)

---

## 💻 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React, TypeScript, Tailwind CSS
- **UI**: shadcn/ui (Radix UI)
- **Data Visualization**: Recharts
- **Database**: MongoDB (via Mongoose)
- **Deployment**: Vercel

---

## ⚙️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/Anuraj1260/personal-finance-visualizer.git
   cd personal-finance-visualizer

2. Install dependencies:
   npm install
3. Create a .env.local file:
   MONGODB_URI=your_mongodb_connection_string
4. Run the app locally:
   