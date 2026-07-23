import { NextResponse } from "next/server";
import { getCMSOverrides, saveCMSOverrides } from "@/lib/cms-store";

export async function GET() {
  const overrides = getCMSOverrides();
  return NextResponse.json({ success: true, overrides });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { overrides } = body;

    if (!overrides || typeof overrides !== "object") {
      return NextResponse.json({ success: false, error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }

    const saved = saveCMSOverrides(overrides);
    if (saved) {
      return NextResponse.json({ success: true, message: "Đã lưu CMS thành công", overrides });
    }

    return NextResponse.json({ success: false, error: "Không thể lưu dữ liệu" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
