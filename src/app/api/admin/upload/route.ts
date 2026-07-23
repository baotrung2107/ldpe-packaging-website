import { NextResponse } from "next/server";
import { isAuthorizedAdmin } from "@/lib/cms-auth";
import { addMediaRecord } from "@/lib/cms-store";
import fs from "fs";
import path from "path";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  try {
    const isAdmin = await isAuthorizedAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized — Bạn không có quyền Upload" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json({ success: false, error: "Không tìm thấy file tải lên" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: "Định dạng file không được hỗ trợ (Chỉ nhận JPG, PNG, WebP, SVG)" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: "Dung lượng file vượt quá giới hạn 10MB" }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileExt = path.extname(file.name) || ".jpg";
    const safeBaseName = path.basename(file.name, fileExt).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFileName = `${safeBaseName}_${Date.now()}${fileExt}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/${uniqueFileName}`;
    const mediaId = `med_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const mediaRecord = {
      mediaId,
      fileName: file.name,
      url: fileUrl,
      mimeType: file.type,
      fileSize: file.size,
      altText: altText || file.name,
      createdAt: new Date().toISOString(),
    };

    addMediaRecord(mediaRecord);

    return NextResponse.json({
      success: true,
      message: "Tải ảnh lên thành công",
      url: fileUrl,
      media: mediaRecord,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Lỗi tải file lên máy chủ" }, { status: 500 });
  }
}
