import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount = 100000, prefix = "LDPE" } = body;

    // Generate unique order code (6 digits)
    const orderCode = Math.floor(100000 + Math.random() * 900000).toString();
    const memo = `${prefix}${orderCode}`;

    const bank = process.env.SEPAY_BANK || "MBBank";
    const account = process.env.SEPAY_ACCOUNT || "0123456789";

    const qrUrl = `https://qr.sepay.vn/img?acc=${account}&bank=${bank}&amount=${amount}&des=${memo}`;

    return NextResponse.json({
      success: true,
      orderCode,
      memo,
      amount,
      bank,
      account,
      qrUrl,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
