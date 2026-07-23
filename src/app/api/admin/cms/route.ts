import { NextResponse } from "next/server";
import { getCMSStore, saveDraft, publishDraft, restoreRevision } from "@/lib/cms-store";
import { isAuthorizedAdmin } from "@/lib/cms-auth";

export async function GET() {
  const store = getCMSStore();
  const isAdmin = await isAuthorizedAdmin();

  if (isAdmin) {
    return NextResponse.json({
      success: true,
      isAdmin: true,
      published: store.published || {},
      draft: store.draft || store.published || {},
      revisions: store.revisions || [],
      media: store.media || [],
      updatedAt: store.updatedAt,
      updatedBy: store.updatedBy,
    });
  }

  // Public User: ONLY return Published data (Zero Draft, Zero Secrets)
  return NextResponse.json({
    success: true,
    isAdmin: false,
    published: store.published || {},
  });
}

export async function POST(request: Request) {
  try {
    const isAdmin = await isAuthorizedAdmin();
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "Unauthorized — Bạn không có quyền Admin" }, { status: 401 });
    }

    const body = await request.json();
    const { action = "save_draft", draft, revisionId, user = "admin" } = body;

    if (action === "save_draft") {
      if (!draft || typeof draft !== "object") {
        return NextResponse.json({ success: false, error: "Dữ liệu bản nháp không hợp lệ" }, { status: 400 });
      }
      const saved = saveDraft(draft, user);
      if (saved) {
        return NextResponse.json({ success: true, message: "Đã lưu bản nháp thành công", draft });
      }
      return NextResponse.json({ success: false, error: "Không thể lưu bản nháp" }, { status: 500 });
    }

    if (action === "publish") {
      if (draft && typeof draft === "object") {
        saveDraft(draft, user);
      }
      const published = publishDraft(user);
      if (published) {
        const store = getCMSStore();
        return NextResponse.json({
          success: true,
          message: "Đã Xuất Bản (Publish) thành công!",
          published: store.published,
          revisions: store.revisions,
        });
      }
      return NextResponse.json({ success: false, error: "Xuất bản thất bại" }, { status: 500 });
    }

    if (action === "restore") {
      if (!revisionId) {
        return NextResponse.json({ success: false, error: "Thiếu ID phiên bản khôi phục" }, { status: 400 });
      }
      const restored = restoreRevision(revisionId, user);
      if (restored) {
        const store = getCMSStore();
        return NextResponse.json({
          success: true,
          message: "Đã khôi phục phiên bản thành công!",
          draft: store.draft,
          published: store.published,
        });
      }
      return NextResponse.json({ success: false, error: "Không tìm thấy phiên bản khôi phục" }, { status: 404 });
    }

    return NextResponse.json({ success: false, error: "Hành động không hợp lệ" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
