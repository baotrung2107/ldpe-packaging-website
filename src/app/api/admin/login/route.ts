import { NextResponse } from "next/server";
import { verifyAdminCredentials, generateSessionToken, SESSION_TOKEN_NAME } from "@/lib/cms-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Thiếu tên đăng nhập hoặc mật khẩu" }, { status: 400 });
    }

    if (verifyAdminCredentials(username, password)) {
      const token = generateSessionToken(username);
      const response = NextResponse.json({ success: true, message: "Đăng nhập thành công" });
      
      response.cookies.set(SESSION_TOKEN_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json({ success: false, error: "Sai tên đăng nhập hoặc mật khẩu" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Lỗi máy chủ" }, { status: 500 });
  }
}
