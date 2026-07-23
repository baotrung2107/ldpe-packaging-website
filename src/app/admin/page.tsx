"use client";

import { useState, useEffect, useRef } from "react";
import {
  Lock,
  User,
  Save,
  RotateCcw,
  Monitor,
  Smartphone,
  LogOut,
  Image as ImageIcon,
  AlertTriangle,
  Sparkles,
  Check,
  History,
  Upload,
  Globe,
  Phone,
  Mail,
  MapPin,
  FileText,
  Eye,
  Layers,
  Award,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Home as HomeIcon,
  Send,
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
  const [activeTab, setActiveTab] = useState<
    | "contact"
    | "hero"
    | "intro"
    | "pain_points"
    | "products"
    | "quote_form"
    | "certifications"
    | "workflow"
    | "final_cta"
    | "media"
    | "seo"
    | "telegram"
    | "revisions"
  >("contact");
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const [telegramTestResult, setTelegramTestResult] = useState<any>(null);
  const [testingTelegram, setTestingTelegram] = useState(false);

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

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
      } else {
        setLoginError(data.error || "Tên đăng nhập hoặc mật khẩu không chính xác");
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
    const ok = await publish();
    if (ok) {
      setSaveMessage("Đã Xuất Bản (Publish) thành công lên trang web chính!");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleRestoreRevision = async (revId: string) => {
    if (confirm(`Bạn có chắc chắn muốn khôi phục phiên bản ${revId}?`)) {
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

  const handleTestTelegram = async () => {
    setTestingTelegram(true);
    setTelegramTestResult(null);
    try {
      const res = await fetch("/api/telegram/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: draft.telegram_chat_id }),
      });
      const data = await res.json();
      setTelegramTestResult(data);
    } catch (e: any) {
      setTelegramTestResult({ success: false, error: e.message || "Không thể kết nối Telegram API" });
    } finally {
      setTestingTelegram(false);
    }
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
            <h2 className="text-2xl font-bold text-[#102A43]">Đăng nhập Admin CMS Full Perms</h2>
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
              Bảo mật mã hóa SHA-256 hash • Phân quyền toàn bộ Văn bản Website
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Admin Split-Screen CMS Interface Render
  return (
    <div className="h-screen bg-[#F7FAFC] flex flex-col font-sans relative overflow-hidden">
      <VisualEditorOverlay />
      <CMSInlineDrawer />

      {/* Top Controls Toolbar (Fixed 57px) */}
      <header className="bg-[#062B4F] text-white px-6 py-3 flex items-center justify-between z-50 border-b border-[#103E6B] shadow-md shrink-0 h-[57px]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0B63CE] font-bold text-white flex items-center justify-center text-sm">
            DP
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none text-white">Quản Trị Nội Dung Toàn Trang (Full Admin Perms)</h1>
            <span className="text-[11px] text-[#D9E4EF]">Quyền: Admin (baotrung2107)</span>
          </div>
        </div>

        {/* Global Save Notification Toast */}
        {saveMessage && (
          <div className="bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full animate-bounce flex items-center gap-1.5 shadow-lg">
            <Check className="w-4 h-4" />
            <span>{saveMessage}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Visual Direct Edit Toggle */}
          <button
            onClick={() => setIsVisualEditActive(!isVisualEditActive)}
            className={`btn-secondary text-xs py-1.5 px-3 min-h-[36px] font-bold transition-all ${
              isVisualEditActive
                ? "bg-[#38BDF8] text-[#041B32] border-[#38BDF8] shadow-lg shadow-[#38BDF8]/20"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            title="Bật/Tắt chế độ chỉnh sửa trực tiếp bằng cách click chữ trên giao diện web"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#38BDF8]" />
            <span>Chỉnh Sửa Trực Tiếp ({isVisualEditActive ? "BẬT" : "TẮT"})</span>
          </button>

          {/* View Mode Toggle */}
          <div className="bg-[#041B32] p-1 rounded-xl flex items-center gap-1 border border-white/10">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                previewMode === "desktop" ? "bg-[#0B63CE] text-white" : "text-[#D9E4EF] hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                previewMode === "mobile" ? "bg-[#0B63CE] text-white" : "text-[#D9E4EF] hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Save Draft Button */}
          <button
            onClick={handleSaveDraftAction}
            className="btn-secondary text-xs py-1.5 px-3 min-h-[36px] bg-white text-[#102A43] hover:bg-gray-100 font-bold"
          >
            <Save className="w-3.5 h-3.5 mr-1 text-[#0B63CE]" />
            <span>Lưu Nháp</span>
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

      {/* Completely Independent 50-50 Split-Screen Layout */}
      <div className="h-[calc(100vh-57px)] w-full flex overflow-hidden">
        {/* LEFT COLUMN: Full Text Admin Edit Panel */}
        <div
          ref={leftPanelRef}
          className="w-full lg:w-1/2 h-full border-r border-[#D9E4EF] bg-white overflow-y-auto flex flex-col shrink-0"
        >
          {/* Sticky Left Tabs Header */}
          <div className="sticky top-0 z-20 flex items-center border-b border-[#D9E4EF] bg-[#F7FAFC] px-4 pt-3 gap-2 overflow-x-auto shrink-0 shadow-sm">
            <button
              onClick={() => setActiveTab("contact")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "contact"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline & Địa Chỉ</span>
            </button>

            <button
              onClick={() => setActiveTab("hero")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "hero"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Banner Hero</span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "products"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sản Phẩm (Bento)</span>
            </button>

            <button
              onClick={() => setActiveTab("quote_form")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "quote_form"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Biểu Mẫu Báo Giá</span>
            </button>

            <button
              onClick={() => setActiveTab("certifications")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "certifications"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Chứng Nhận ISO</span>
            </button>

            <button
              onClick={() => setActiveTab("workflow")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "workflow"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Quy Trình 6 Bước</span>
            </button>

            <button
              onClick={() => setActiveTab("telegram")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "telegram"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram Bot</span>
            </button>

            <button
              onClick={() => setActiveTab("media")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "media"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Thư Thư Viện Ảnh</span>
            </button>

            <button
              onClick={() => setActiveTab("seo")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "seo"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>SEO Meta</span>
            </button>

            <button
              onClick={() => setActiveTab("revisions")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "revisions"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Lịch Sử Phiên Bản</span>
            </button>
          </div>

          {/* Edit Panel Content Area */}
          <div className="p-6 space-y-6 flex-1">
            {/* TAB 1: HOTLINE & CONTACT */}
            {activeTab === "contact" && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-[#102A43]">Thông Tin Liên Hệ & Chân Trang (Navbar & Footer)</h3>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">
                    Số Điện Thoại Hotline / Zalo (Chính)
                  </label>
                  <input
                    type="text"
                    value={draft.nav_phone || "083 572 6666"}
                    onChange={(e) => updateDraft("nav_phone", e.target.value)}
                    className="admin-input font-bold text-[#0B63CE]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">
                    Email Tiếp Nhận Yêu Cầu Báo Giá
                  </label>
                  <input
                    type="email"
                    value={draft.nav_email || "phuocpefoam@gmail.com"}
                    onChange={(e) => updateDraft("nav_email", e.target.value)}
                    className="admin-input font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">
                    Địa Chỉ Nhà Máy Chính Thức
                  </label>
                  <textarea
                    rows={2}
                    value={draft.footer_address || "Ấp Lập Điền, Xã Tân Mỹ, Huyện Đức Hòa, Tỉnh Long An"}
                    onChange={(e) => updateDraft("footer_address", e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: HERO BANNER */}
            {activeTab === "hero" && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-[#102A43]">Nội Dung Khối Hero Banner Đầu Trang</h3>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Huy hiệu nhỏ (Badge)</label>
                  <input
                    type="text"
                    value={draft.hero_badge || "GIẢI PHÁP LDPE VÀ PE FOAM THEO YÊU CẦU"}
                    onChange={(e) => updateDraft("hero_badge", e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Tiêu đề chính H1</label>
                  <textarea
                    rows={2}
                    value={draft.hero_title || "Ôm trọn sản phẩm. Bảo vệ hàng hóa. Giữ vững uy tín thương hiệu."}
                    onChange={(e) => updateDraft("hero_title", e.target.value)}
                    className="admin-input font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">
                    Mô tả chi tiết Hero (Gõ Enter 1 lần xuống dòng, 2 lần tạo đoạn mới)
                  </label>
                  <textarea
                    rows={5}
                    value={draft.hero_desc || ""}
                    onChange={(e) => updateDraft("hero_desc", e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Link Ảnh Hero chính</label>
                  <input
                    type="text"
                    value={draft.hero_image_url || "/images/ldpe/pe-foam-dinh-hinh.png"}
                    onChange={(e) => updateDraft("hero_image_url", e.target.value)}
                    className="admin-input font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: PRODUCTS (BENTO) */}
            {activeTab === "products" && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-[#102A43]">Danh Mục Sản Phẩm LDPE & PE Foam (Bento Grid)</h3>
                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Tiêu đề phần sản phẩm</label>
                  <input
                    type="text"
                    value={draft.catalog_title || "Giải Pháp Sản Phẩm LDPE & PE Foam Theo Quy Cách"}
                    onChange={(e) => updateDraft("catalog_title", e.target.value)}
                    className="admin-input font-bold"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: QUOTE FORM */}
            {activeTab === "quote_form" && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-[#102A43]">Tiêu Đề Biểu Mẫu Nhận Báo Giá</h3>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Tiêu đề khối báo giá</label>
                  <textarea
                    rows={2}
                    value={draft.quote_title || "Bạn chưa biết nên chọn loại LDPE hoặc PE foam nào?"}
                    onChange={(e) => updateDraft("quote_title", e.target.value)}
                    className="admin-input font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Mô tả biểu mẫu</label>
                  <textarea
                    rows={3}
                    value={draft.quote_desc || ""}
                    onChange={(e) => updateDraft("quote_desc", e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: CERTIFICATIONS */}
            {activeTab === "certifications" && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-[#102A43]">Tiêu Đề Chứng Nhận ISO 9001:2015 & SGS</h3>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Tiêu đề chứng nhận</label>
                  <input
                    type="text"
                    value={draft.cert_title || "Hồ sơ chứng nhận chất lượng Nhà Máy Đức Phúc"}
                    onChange={(e) => updateDraft("cert_title", e.target.value)}
                    className="admin-input font-bold"
                  />
                </div>
              </div>
            )}

            {/* TAB 6: WORKFLOW */}
            {activeTab === "workflow" && (
              <div className="space-y-4 text-xs">
                <h3 className="font-bold text-sm text-[#102A43]">Tiêu Đề Quy Trình Làm Việc 6 Bước</h3>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Tiêu đề quy trình</label>
                  <input
                    type="text"
                    value={draft.workflow_title || "Quy Trình 6 Bước Hợp Tác Gia Công Đóng Gói Với Nhà Máy"}
                    onChange={(e) => updateDraft("workflow_title", e.target.value)}
                    className="admin-input font-bold"
                  />
                </div>
              </div>
            )}

            {/* TAB 7: TELEGRAM BOT INTEGRATION */}
            {activeTab === "telegram" && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#D9E4EF]">
                  <h3 className="font-bold text-sm text-[#102A43]">Cấu Hình Telegram Bot Thông Báo Báo Giá</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Bot Token Active
                  </span>
                </div>

                <div className="p-4 bg-[#EAF3FC] border border-[#D9E4EF] rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-[#102A43] block">Telegram Bot: @Nhamaydppepoam_bot</span>
                      <span className="text-[#6B7C93] text-[11px]">Tên Bot: Thông Tin Khách Hàng PE Poam</span>
                    </div>
                    <a
                      href="https://t.me/Nhamaydppepoam_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs py-1.5 px-3 bg-[#0088cc] hover:bg-[#0077b5] whitespace-nowrap"
                    >
                      Mở Bot Telegram & Bấm Start 🚀
                    </a>
                  </div>

                  <div className="text-[11px] text-[#40566F] space-y-1 bg-white p-3 rounded-lg border border-[#D9E4EF]">
                    <strong className="text-[#102A43] block font-semibold">📌 HƯỚNG DẪN KÍCH HOẠT VÀ KẾT NỐI TELEGRAM (30 giây):</strong>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Bấm nút <strong>"Mở Bot Telegram"</strong> ở trên (hoặc tìm <code>@Nhamaydppepoam_bot</code> trên app Telegram).</li>
                      <li>Bấm nút <strong>START</strong> (hoặc gõ 1 tin nhắn bất kỳ cho Bot).</li>
                      <li>Bấm nút <strong>"Gửi Tin Nhắn Thử Nghiệm Qua Telegram"</strong> bên dưới để kiểm tra nhận thông báo!</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">
                    Telegram Chat ID (Tùy chọn nhập thủ công ID người dùng / Group ID)
                  </label>
                  <input
                    type="text"
                    placeholder="Vd: 8957063322 hoặc -100xxxxxxxxx (Nếu để trống hệ thống sẽ tự động dò tìm)"
                    value={draft.telegram_chat_id || ""}
                    onChange={(e) => updateDraft("telegram_chat_id", e.target.value)}
                    className="admin-input font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleTestTelegram}
                    disabled={testingTelegram}
                    className="w-full btn-primary py-2.5 justify-center text-xs font-bold bg-[#0088cc] hover:bg-[#0077b5]"
                  >
                    {testingTelegram ? "Đang kết nối tới Telegram..." : "🔔 Gửi Tin Nhắn Thử Nghiệm Qua Telegram Ngay"}
                  </button>
                </div>

                {telegramTestResult && (
                  <div className={`p-4 rounded-xl text-xs space-y-2 border ${
                    telegramTestResult.success
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-amber-50 border-amber-200 text-amber-900"
                  }`}>
                    <div className="font-bold flex items-center gap-2">
                      <span>{telegramTestResult.success ? "✅ KẾT NỐI TELEGRAM THÀNH CÔNG!" : "⚠️ CẦN KÍCH HOẠT CHAT TELEGRAM"}</span>
                    </div>
                    <p className="leading-relaxed">{telegramTestResult.message || telegramTestResult.error}</p>
                    {!telegramTestResult.success && (
                      <div className="pt-2 border-t border-amber-200">
                        <a
                          href="https://t.me/Nhamaydppepoam_bot"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-[#0088cc] text-white font-bold rounded-lg hover:bg-[#0077b5]"
                        >
                          👉 Click vào đây để mở @Nhamaydppepoam_bot & Bấm START
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 8: MEDIA LIBRARY */}
            {activeTab === "media" && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#102A43]">Thư Viện Tệp Ảnh Đã Tải Lên</h3>
                  <label className="btn-primary text-xs py-1.5 px-3 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 mr-1" />
                    <span>{uploadingMedia ? "Đang tải..." : "Tải ảnh mới"}</span>
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

            {/* TAB 9: SEO MANAGER */}
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
              </div>
            )}

            {/* TAB 10: REVISIONS HISTORY */}
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
                        className="btn-secondary text-[11px] py-1 px-3 bg-[#102A43] text-white hover:bg-[#0B63CE]"
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

        {/* RIGHT COLUMN: Live Web Preview */}
        <div
          ref={previewContainerRef}
          id="admin-live-preview-window"
          className="hidden lg:flex lg:w-1/2 h-full bg-[#062B4F]/10 overflow-y-auto p-4 items-start justify-center relative shrink-0"
        >
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
