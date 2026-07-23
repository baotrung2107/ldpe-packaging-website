import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/cms-auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (verifyAdminCredentials(username, password)) {
      const response = NextResponse.json({ success: true, message: "Đăng nhập thành công" });
      
      // Set HTTP-only session cookie valid for 7 days
      response.cookies.set("admin_session", "authenticated_baotrung2107_session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Tên đăng nhập hoặc mật khẩu không chính xác" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
