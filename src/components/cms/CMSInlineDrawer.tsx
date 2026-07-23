"use client";

import { useState } from "react";
import { useCMS } from "@/context/CMSContext";
import { X, Upload, Check, AlertCircle, Save, Globe, FileText, Image as ImageIcon, Link as LinkIcon, Video } from "lucide-react";

export default function CMSInlineDrawer() {
  const {
    selectedElementMeta,
    setSelectedElementMeta,
    draft,
    updateDraft,
    saveDraft,
    uploadMediaFile,
    hasUnsavedChanges,
  } = useCMS();

  const [uploading, setUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"" | "saving" | "success" | "error">("");

  if (!selectedElementMeta) return null;

  const { cmsId, cmsSection, cmsType, label } = selectedElementMeta;
  const currentValue = draft[cmsId] !== undefined ? draft[cmsId] : "";

  const handleTextChange = (value: string) => {
    updateDraft(cmsId, value);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadedUrl = await uploadMediaFile(file, label || cmsId);
    setUploading(false);

    if (uploadedUrl) {
      updateDraft(cmsId, uploadedUrl);
    }
  };

  const handleQuickSave = async () => {
    setSaveStatus("saving");
    const ok = await saveDraft();
    if (ok) {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(""), 2500);
    } else {
      setSaveStatus("error");
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-[10000] w-full max-w-md bg-white shadow-2xl border-l border-[#D9E4EF] flex flex-col font-sans animate-slideLeft">
      {/* Header */}
      <div className="bg-[#062B4F] text-white p-4 flex items-center justify-between border-b border-[#103E6B]">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#0B63CE] font-bold text-white flex items-center justify-center text-xs">
            CMS
          </span>
          <div>
            <h3 className="font-bold text-sm text-white">Chỉnh Sửa Trực Quan</h3>
            <span className="text-[11px] text-[#38BDF8] font-mono">
              ID: {cmsId} ({cmsType})
            </span>
          </div>
        </div>
        <button
          onClick={() => setSelectedElementMeta(null)}
          className="p-1 text-[#D9E4EF] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        <div className="bg-[#F7FAFC] p-3 rounded-xl border border-[#D9E4EF] space-y-1">
          <span className="text-[10px] font-bold text-[#6B7C93] uppercase tracking-wider block">
            SECTION / VỊ TRÍ
          </span>
          <span className="text-xs font-semibold text-[#102A43] block">
            {cmsSection.toUpperCase()} — {label || cmsId}
          </span>
        </div>

        {/* 1. TEXT or RICH_TEXT or FORM_LABEL */}
        {(cmsType === "text" || cmsType === "rich_text" || cmsType === "form_label" || cmsType === "form_placeholder" || cmsType === "contact") && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#102A43] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#0B63CE]" />
              <span>Nội dung văn bản (Smart Text Wrapping)</span>
            </label>
            {cmsType === "text" || cmsType === "form_label" || cmsType === "form_placeholder" ? (
              <input
                type="text"
                value={currentValue}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                placeholder="Nhập nội dung..."
              />
            ) : (
              <textarea
                rows={6}
                value={currentValue}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE] font-sans"
                placeholder="Nhập nội dung văn bản chi tiết..."
              />
            )}
            <div className="p-2.5 bg-[#EAF3FC] rounded-lg border border-[#D9E4EF] text-[11px] text-[#40566F] space-y-1">
              <span className="font-bold text-[#0B63CE] block">💡 Hướng dẫn Ngắt Dòng Thông Minh:</span>
              <p>• Nhấn Enter 1 lần: Xuống dòng trong đoạn (\n).</p>
              <p>• Nhấn Enter 2 lần: Tạo đoạn văn mới (\n\n).</p>
              <p>• Trình duyệt tự ngắt dòng cân bằng, không bao giờ cắt đôi từ tiếng Việt.</p>
            </div>
          </div>
        )}

        {/* 2. IMAGE or LOGO */}
        {(cmsType === "image" || cmsType === "logo") && (
          <div className="space-y-4">
            <label className="text-xs font-bold text-[#102A43] flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-[#0B63CE]" />
              <span>Thay Đổi Hình Ảnh (Upload hoặc dán URL)</span>
            </label>

            {/* Preview Box */}
            {currentValue && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#D9E4EF] bg-slate-100 flex items-center justify-center">
                <img src={currentValue} alt="Preview" className="w-full h-full object-contain p-2" />
              </div>
            )}

            {/* Method A: Drag & Drop File Upload */}
            <div className="border-2 border-dashed border-[#0B63CE]/40 rounded-xl p-4 text-center bg-[#EAF3FC]/50 hover:bg-[#EAF3FC] transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-6 h-6 text-[#0B63CE] mx-auto mb-1" />
              <span className="text-xs font-bold text-[#102A43] block">
                {uploading ? "Đang tải ảnh lên..." : "Bấm hoặc Kéo & Thả ảnh vào đây"}
              </span>
              <span className="text-[10px] text-[#6B7C93] block">
                Hỗ trợ JPG, PNG, WebP (Tối đa 10MB)
              </span>
            </div>

            {/* Method B: Paste URL */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#102A43] block">Hoặc Dán Đường Dẫn Ảnh (URL)</label>
              <input
                type="text"
                value={currentValue}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="https://.../image.jpg hoặc /images/ldpe/..."
                className="w-full px-3 py-2 rounded-xl border border-[#D9E4EF] text-xs text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
              />
            </div>
          </div>
        )}

        {/* 3. LINK or BUTTON */}
        {(cmsType === "link" || cmsType === "button") && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#102A43] flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4 text-[#0B63CE]" />
              <span>Cấu Hình Nút Nối & Đường Dẫn (Link)</span>
            </label>

            <div>
              <label className="text-[11px] font-semibold text-[#102A43] block mb-1">Đường dẫn URL / Anchor</label>
              <input
                type="text"
                value={currentValue}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="https://... hoặc #bao-gia hoặc tel:0900000000"
                className="w-full px-3 py-2 rounded-xl border border-[#D9E4EF] text-xs text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
              />
            </div>

            <span className="text-[10px] text-[#6B7C93] block">
              Hỗ trợ link https://, link nội bộ /, anchor #, tel: hoặc mailto:. Chặn script nguy hiểm.
            </span>
          </div>
        )}

        {/* 4. YOUTUBE VIDEO */}
        {cmsType === "youtube" && (
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#102A43] flex items-center gap-1.5">
              <Video className="w-4 h-4 text-[#0B63CE]" />
              <span>Link Video YouTube Giới Thệu</span>
            </label>

            <input
              type="text"
              value={currentValue}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... hoặc Shorts"
              className="w-full px-3 py-2.5 rounded-xl border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
            />
            <span className="text-[11px] text-[#6B7C93] block">
              Tự động trích xuất Video ID và tạo Embed URL chuẩn bảo mật YouTube.
            </span>
          </div>
        )}

        {/* Feedback Message */}
        {saveStatus === "success" && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>Đã lưu bản nháp thành công!</span>
          </div>
        )}
        {saveStatus === "error" && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Không thể lưu dữ liệu. Vui lòng kiểm tra lại.</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-[#D9E4EF] bg-[#F7FAFC] flex items-center justify-between gap-3">
        <button
          onClick={() => setSelectedElementMeta(null)}
          className="px-4 py-2.5 text-xs font-semibold text-[#6B7C93] hover:text-[#102A43] transition-colors"
        >
          Đóng
        </button>

        <button
          onClick={handleQuickSave}
          disabled={!hasUnsavedChanges || saveStatus === "saving"}
          className="btn-primary text-xs py-2.5 px-5 bg-[#0B63CE] hover:bg-[#084FA6] flex items-center gap-1.5 shadow-md disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saveStatus === "saving" ? "Đang lưu..." : "Lưu Bản Nháp"}</span>
        </button>
      </div>
    </div>
  );
}
