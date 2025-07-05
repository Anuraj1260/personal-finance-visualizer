// src/app/api/budgets/route.ts
import { connectMongo } from "@/lib/mongodb";
import Budget from "@/models/Budget";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo();
    const budgets = await Budget.find();
    return NextResponse.json(budgets);
  } catch (err) {
    console.error("GET /api/budgets error:", err);
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectMongo();
    const { category, amount, month } = await req.json();

    // ✅ Basic validation
    if (!category || !amount || !month) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const newBudget = await Budget.create({ category, amount, month });
    return NextResponse.json(newBudget);
  } catch (err) {
    console.error("POST /api/budgets error:", err);
    return NextResponse.json({ error: "Failed to create budget" }, { status: 500 });
  }
}
