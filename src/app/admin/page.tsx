"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  User,
  Save,
  RotateCcw,
  Monitor,
  Smartphone,
  LogOut,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Image as ImageIcon,
  AlertTriangle,
  Sparkles,
  Eye,
  Check,
  History,
  Upload,
  Globe,
  Layers,
  Search,
  ArrowUp,
  ArrowDown,
  Power,
} from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import Home from "@/app/page";
import VisualEditorOverlay from "@/components/cms/VisualEditorOverlay";
import CMSInlineDrawer from "@/components/cms/CMSInlineDrawer";

export default function AdminPage() {
  const {
    isAdmin,
    draft,
    revisions,
    mediaList,
    updateDraft,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    reorderArrayItems,
    saveDraft,
    publish,
    restoreRev,
    uploadMediaFile,
    resetDraft,
    hasUnsavedChanges,
    previewMode,
    setPreviewMode,
    isVisualEditActive,
    setIsVisualEditActive,
  } = useCMS();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"content" | "repeaters" | "media" | "seo" | "revisions">("content");
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [isLoggedInState, setIsLoggedInState] = useState(false);

  useEffect(() => {
    fetch("/api/admin/cms")
      .then((res) => res.json())
      .then((data) => {
        if (data.isAdmin) {
          setIsLoggedInState(true);
        }
      });
  }, []);

  // Browser reload unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời đi?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });
      const data = await res.json();

      if (data.success) {
        setIsLoggedInState(true);
        window.location.reload();
      } else {
        setLoginError(data.error || "Sai tên đăng nhập hoặc mật khẩu");
      }
    } catch (err) {
      setLoginError("Không thể kết nối máy chủ");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsLoggedInState(false);
    window.location.reload();
  };

  const handleSaveDraftAction = async () => {
    const ok = await saveDraft();
    if (ok) {
      setSaveMessage("Đã lưu bản nháp thành công!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handlePublishAction = async () => {
    if (confirm("Bạn có chắc chắn muốn Xuất Bản (Publish) thay đổi này lên website công khai?")) {
      const ok = await publish();
      if (ok) {
        setSaveMessage("Đã Xuất Bản (Publish) thành công!");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    }
  };

  const handleRestoreRevision = async (revId: string) => {
    if (confirm("Bạn có chắc chắn muốn khôi phục phiên bản này? Thay đổi hiện tại sẽ được thay bằng phiên bản chọn.")) {
      const ok = await restoreRev(revId);
      if (ok) {
        setSaveMessage("Đã khôi phục phiên bản thành công!");
        setTimeout(() => setSaveMessage(""), 3000);
      }
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingMedia(true);
    await uploadMediaFile(file, file.name);
    setUploadingMedia(false);
  };

  // Login Screen Render
  if (!isLoggedInState && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#062B4F] flex items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl space-y-6 border border-[#D9E4EF]">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#0B63CE] text-white font-bold text-2xl rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              DP
            </div>
            <h2 className="text-2xl font-bold text-[#102A43]">Đăng nhập Admin CMS</h2>
            <p className="text-xs text-[#6B7C93]">CÔNG TY TNHH SẢN XUẤT PE FOAM ĐỨC PHÚC</p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1">
                Tên đăng nhập (Admin ID)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#6B7C93] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="baotrung2107"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B7C93] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary py-3 justify-center text-sm font-bold">
              Đăng nhập Quản trị
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[11px] text-[#6B7C93]">
              Bảo mật mã hóa SHA-256 hash • Phân quyền Server-side
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Admin Split-Screen CMS Interface Render
  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col font-sans relative overflow-x-hidden">
      <VisualEditorOverlay />
      <CMSInlineDrawer />

      {/* Top Controls Toolbar */}
      <header className="bg-[#062B4F] text-white px-6 py-3 flex items-center justify-between sticky top-0 z-50 border-b border-[#103E6B] shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0B63CE] font-bold text-white flex items-center justify-center text-sm">
            DP
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none text-white">Bảng Quản Trị CMS — ĐỨC PHÚC PE FOAM</h1>
            <span className="text-[11px] text-[#D9E4EF]">Quyền: Admin (baotrung2107)</span>
          </div>

          {hasUnsavedChanges && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse ml-2">
              Có thay đổi bản nháp
            </span>
          )}

          {saveMessage && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full ml-2 flex items-center gap-1">
              <Check className="w-3 h-3" />
              {saveMessage}
            </span>
          )}
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center gap-3">
          {/* Visual Direct Edit Toggle */}
          <button
            onClick={() => setIsVisualEditActive(!isVisualEditActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              isVisualEditActive
                ? "bg-amber-400 text-slate-950 shadow-lg ring-2 ring-amber-300"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isVisualEditActive ? "Tắt Chỉnh Trực Quan" : "Bật Chỉnh Trực Quan"}</span>
          </button>

          {/* Viewport Preview Switcher */}
          <div className="bg-[#102A43] p-1 rounded-lg flex items-center gap-1 border border-[#D9E4EF]/20">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors ${
                previewMode === "desktop" ? "bg-[#0B63CE] text-white" : "text-[#D9E4EF] hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors ${
                previewMode === "mobile" ? "bg-[#0B63CE] text-white" : "text-[#D9E4EF] hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Reset Draft */}
          <button
            onClick={resetDraft}
            disabled={!hasUnsavedChanges}
            className="btn-secondary text-xs py-1.5 px-3 min-h-[36px] bg-transparent text-white border-white/40 hover:bg-white/10 disabled:opacity-40"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Hoàn tác</span>
          </button>

          {/* Save Draft */}
          <button
            onClick={handleSaveDraftAction}
            className="btn-secondary text-xs py-1.5 px-3 min-h-[36px] bg-[#103E6B] text-white hover:bg-[#0B63CE]"
          >
            <Save className="w-3.5 h-3.5 mr-1" />
            <span>Lưu Bản Nháp</span>
          </button>

          {/* Publish Button */}
          <button
            onClick={handlePublishAction}
            className="btn-primary text-xs py-1.5 px-4 min-h-[36px] bg-emerald-600 hover:bg-emerald-700 font-bold shadow-lg"
          >
            <Globe className="w-3.5 h-3.5 mr-1" />
            <span>Xuất Bản (Publish)</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 text-[#D9E4EF] hover:text-red-400 transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Split-Screen Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Form Panel (50% width) */}
        <div className="w-full lg:w-1/2 border-r border-[#D9E4EF] bg-white overflow-y-auto flex flex-col">
          {/* Tabs Navigation */}
          <div className="flex items-center border-b border-[#D9E4EF] bg-[#F7FAFC] px-4 pt-3 gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("content")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === "content"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              Nội dung Văn Bản
            </button>

            <button
              onClick={() => setActiveTab("repeaters")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === "repeaters"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              Khối Lặp (Repeaters)
            </button>

            <button
              onClick={() => setActiveTab("media")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === "media"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              Thư Viện Ảnh (Media)
            </button>

            <button
              onClick={() => setActiveTab("seo")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === "seo"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              SEO & Metadata
            </button>

            <button
              onClick={() => setActiveTab("revisions")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === "revisions"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              Lịch Sử (Revisions)
            </button>
          </div>

          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            {/* TAB 1: TEXT CONTENT */}
            {activeTab === "content" && (
              <div className="space-y-3">
                <FormSectionAccordion
                  title="1. Header & Thanh Menu (Navbar)"
                  id="navbar"
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                >
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Logo Text Badge (Icon)</label>
                      <input
                        type="text"
                        value={draft.nav_logo_text || "DP"}
                        onChange={(e) => updateDraft("nav_logo_text", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Tên Thương Hiệu Header</label>
                      <input
                        type="text"
                        value={draft.nav_brand_title || "DUC PHUC PE FOAM"}
                        onChange={(e) => updateDraft("nav_brand_title", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Hotline điện thoại</label>
                      <input
                        type="text"
                        value={draft.nav_phone || "083 572 6666"}
                        onChange={(e) => updateDraft("nav_phone", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                  </div>
                </FormSectionAccordion>

                <FormSectionAccordion
                  title="2. Khối Hero (Banner Đầu Trang)"
                  id="hero"
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                >
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Nhãn nhỏ (Badge)</label>
                      <input
                        type="text"
                        value={draft.hero_badge || ""}
                        onChange={(e) => updateDraft("hero_badge", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Tiêu đề chính H1</label>
                      <textarea
                        rows={2}
                        value={draft.hero_title || ""}
                        onChange={(e) => updateDraft("hero_title", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Mô tả Hero</label>
                      <textarea
                        rows={3}
                        value={draft.hero_desc || ""}
                        onChange={(e) => updateDraft("hero_desc", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Ảnh Nền Nhà Máy Hero (URL)</label>
                      <input
                        type="text"
                        value={draft.hero_image_url || "/images/ldpe/ldpe-factory-bg.jpg"}
                        onChange={(e) => updateDraft("hero_image_url", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Video YouTube Giới Thiệu (URL)</label>
                      <input
                        type="text"
                        value={draft.hero_youtube_url || ""}
                        onChange={(e) => updateDraft("hero_youtube_url", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                  </div>
                </FormSectionAccordion>

                <FormSectionAccordion
                  title="3. Giới Thiệu & Lợi Thế Nhà Máy"
                  id="intro"
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                >
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Tiêu đề Giới thiệu</label>
                      <input
                        type="text"
                        value={draft.intro_title || ""}
                        onChange={(e) => updateDraft("intro_title", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Mô tả Giới thiệu</label>
                      <textarea
                        rows={3}
                        value={draft.intro_desc || ""}
                        onChange={(e) => updateDraft("intro_desc", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                  </div>
                </FormSectionAccordion>

                <FormSectionAccordion
                  title="4. Biểu Mẫu Nhận Báo Giá (Quote Form)"
                  id="quote_form"
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                >
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Tiêu đề biểu mẫu</label>
                      <input
                        type="text"
                        value={draft.form_title || "Yêu cầu tư vấn & báo giá PE Foam / LDPE"}
                        onChange={(e) => updateDraft("form_title", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#102A43] block mb-1">Nút Gửi Yêu Cầu (Label)</label>
                      <input
                        type="text"
                        value={draft.form_submit_btn || "GỬI YÊU CẦU BÁO GIÁ NGAY"}
                        onChange={(e) => updateDraft("form_submit_btn", e.target.value)}
                        className="admin-input font-bold text-[#0B63CE]"
                      />
                    </div>
                  </div>
                </FormSectionAccordion>
              </div>
            )}

            {/* TAB 2: REPEATERS */}
            {activeTab === "repeaters" && (
              <div className="space-y-6">
                {/* 1. Products Repeater */}
                <div className="space-y-3 bg-[#F7FAFC] p-4 rounded-xl border border-[#D9E4EF]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#102A43]">Danh Mục Sản Phẩm (Products List)</h3>
                    <button
                      onClick={() =>
                        addArrayItem("products_list", {
                          title: "Sản phẩm mới",
                          image: "/images/ldpe/mang-ldpe.png",
                          description: "Mô tả quy cách sản phẩm mới...",
                          enabled: true,
                        })
                      }
                      className="btn-primary text-xs py-1 px-3"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      <span>Thêm Sản Phẩm</span>
                    </button>
                  </div>

                  {(draft.products_list || []).map((prod: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-[#D9E4EF] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#0B63CE]">#{idx + 1}</span>
                          <span className="font-bold text-xs text-[#102A43]">{prod.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => reorderArrayItems("products_list", idx, Math.max(0, idx - 1))}
                            disabled={idx === 0}
                            className="p-1 text-[#6B7C93] hover:text-[#0B63CE] disabled:opacity-30"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              reorderArrayItems("products_list", idx, Math.min((draft.products_list || []).length - 1, idx + 1))
                            }
                            disabled={idx === (draft.products_list || []).length - 1}
                            className="p-1 text-[#6B7C93] hover:text-[#0B63CE] disabled:opacity-30"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeArrayItem("products_list", idx)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          value={prod.title || ""}
                          onChange={(e) => updateArrayItem("products_list", idx, "title", e.target.value)}
                          placeholder="Tên sản phẩm"
                          className="admin-input font-semibold"
                        />
                        <input
                          type="text"
                          value={prod.image || ""}
                          onChange={(e) => updateArrayItem("products_list", idx, "image", e.target.value)}
                          placeholder="/images/ldpe/..."
                          className="admin-input"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2. FAQ Repeater */}
                <div className="space-y-3 bg-[#F7FAFC] p-4 rounded-xl border border-[#D9E4EF]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#102A43]">Danh Sách FAQ Hỏi Đáp</h3>
                    <button
                      onClick={() =>
                        addArrayItem("faq_list", {
                          question: "Câu hỏi thắc mắc mới?",
                          answer: "Giải đáp chi tiết kỹ thuật...",
                        })
                      }
                      className="btn-primary text-xs py-1 px-3"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      <span>Thêm FAQ</span>
                    </button>
                  </div>

                  {(draft.faq_list || []).map((faq: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-[#D9E4EF] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0B63CE]">FAQ #{idx + 1}</span>
                        <button
                          onClick={() => removeArrayItem("faq_list", idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={faq.question || ""}
                        onChange={(e) => updateArrayItem("faq_list", idx, "question", e.target.value)}
                        placeholder="Câu hỏi"
                        className="admin-input font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={faq.answer || ""}
                        onChange={(e) => updateArrayItem("faq_list", idx, "answer", e.target.value)}
                        placeholder="Câu trả lời"
                        className="admin-input"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: MEDIA LIBRARY */}
            {activeTab === "media" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#102A43]">Thư Viện Hình Ảnh Media</h3>
                  <label className="btn-primary text-xs py-2 px-4 cursor-pointer">
                    <Upload className="w-4 h-4 mr-1.5 inline" />
                    <span>{uploadingMedia ? "Đang tải lên..." : "Tải Ảnh Mới Lên"}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/svg+xml"
                      onChange={handleMediaUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {mediaList.map((m, i) => (
                    <div key={i} className="p-2 bg-[#F7FAFC] rounded-xl border border-[#D9E4EF] space-y-1">
                      <div className="aspect-square rounded-lg overflow-hidden bg-white border border-[#D9E4EF] flex items-center justify-center">
                        <img src={m.url} alt={m.altText} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] text-[#102A43] font-bold truncate block">{m.fileName}</span>
                      <span className="text-[9px] text-[#6B7C93] block font-mono">{m.url}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SEO MANAGER */}
            {activeTab === "seo" && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-[#102A43]">Cấu Hình SEO Meta & Social Card</h3>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Meta Title trang web</label>
                  <input
                    type="text"
                    value={draft.seo_title || "ĐỨC PHÚC PE FOAM — Màng LDPE & Xốp PE Foam Chống Sốc"}
                    onChange={(e) => updateDraft("seo_title", e.target.value)}
                    className="admin-input font-bold text-[#0B63CE]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    value={draft.seo_description || "Nhà máy sản xuất cuộn màng LDPE, xốp PE Foam chống sốc, khay mút định hình CNC tại Long An đạt chuẩn ISO 9001:2015, SGS REACH, SGS RoHS."}
                    onChange={(e) => updateDraft("seo_description", e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Open Graph Image (Ảnh chia sẻ Facebook/Zalo)</label>
                  <input
                    type="text"
                    value={draft.seo_og_image || "/images/ldpe/ldpe-factory-bg.jpg"}
                    onChange={(e) => updateDraft("seo_og_image", e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: REVISIONS HISTORY */}
            {activeTab === "revisions" && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-[#102A43]">Lịch Sử Phiên Bản Đã Xuất Bản (Revisions)</h3>

                {revisions.length === 0 ? (
                  <p className="text-xs text-[#6B7C93] italic">Chưa có lịch sử phiên bản nào được lưu.</p>
                ) : (
                  revisions.map((rev, i) => (
                    <div
                      key={rev.revisionId}
                      className="p-3 bg-[#F7FAFC] rounded-xl border border-[#D9E4EF] flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-xs text-[#0B63CE] block">{rev.revisionId}</span>
                        <span className="text-[10px] text-[#6B7C93]">
                          {new Date(rev.createdAt).toLocaleString("vi-VN")} • Bởi {rev.createdBy}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRestoreRevision(rev.revisionId)}
                        className="btn-secondary text-[11px] py-1 px-3 bg-white hover:bg-[#0B63CE] hover:text-white"
                      >
                        Khôi phục
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Live Preview Panel (50% width) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#062B4F]/10 overflow-y-auto p-4 items-start justify-center relative">
          <div
            className={`bg-white shadow-2xl rounded-2xl overflow-hidden border border-[#D9E4EF] transition-all duration-300 ${
              previewMode === "mobile"
                ? "w-[375px] my-6 rounded-[36px] border-[8px] border-[#062B4F]"
                : "w-full"
            }`}
          >
            {/* Live Render Component */}
            <div className="pointer-events-auto">
              <Home />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Accordion Form Component
function FormSectionAccordion({
  title,
  id,
  activeSection,
  setActiveSection,
  children,
}: {
  title: string;
  id: string;
  activeSection: string;
  setActiveSection: (id: string) => void;
  children: React.ReactNode;
}) {
  const isOpen = activeSection === id;

  return (
    <div className="border border-[#D9E4EF] rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setActiveSection(isOpen ? "" : id)}
        className="w-full px-4 py-3 bg-[#F7FAFC] flex items-center justify-between text-left font-bold text-xs text-[#102A43] hover:bg-[#EAF3FC] transition-colors border-b border-[#D9E4EF]"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-[#0B63CE]" /> : <ChevronDown className="w-4 h-4 text-[#6B7C93]" />}
      </button>

      {isOpen && <div className="p-4 bg-white space-y-3">{children}</div>}
    </div>
  );
}
