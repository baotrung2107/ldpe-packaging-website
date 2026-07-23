import { NextResponse } from "next/server";

// Simple memory store for demo payment statuses
const paidMemos = new Set<string>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const memo = searchParams.get("memo");

  if (!memo) {
    return NextResponse.json({ error: "Missing memo" }, { status: 400 });
  }

  const isPaid = paidMemos.has(memo);

  return NextResponse.json({
    memo,
    status: isPaid ? "paid" : "pending",
  });
}

// Internal helper endpoint to simulate SePay webhook callback
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, amount } = body;

    if (content) {
      paidMemos.add(content);
    }

    return NextResponse.json({ success: true, message: "Payment verified" });
  } catch (err) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
