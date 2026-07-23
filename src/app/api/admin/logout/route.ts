import { NextResponse } from "next/server";
import { SESSION_TOKEN_NAME } from "@/lib/cms-auth";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Đã đăng xuất" });
  response.cookies.set(SESSION_TOKEN_NAME, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
