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
    | "revisions"
  >("contact");
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [isLoggedInState, setIsLoggedInState] = useState(false);

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

  // Optional manual scroll trigger strictly inside right preview container
  const handleManualScrollToTarget = (targetId: string) => {
    const container = previewContainerRef.current;
    if (!container) return;

    const mapping: Record<string, string> = {
      nav_phone: "navbar",
      nav_email: "navbar",
      quote_phone: "bao-gia",
      quote_email: "bao-gia",
      quote_factory_address: "bao-gia",
      footer_address: "footer",
      hero_badge: "hero",
      hero_title: "hero",
      hero_desc: "hero",
      catalog_title: "san-pham",
      cert_title: "chung-nhan",
      workflow_title: "quy-trinh",
      quote_title: "bao-gia",
      quote_desc: "bao-gia",
      form_title: "bao-gia",
      form_submit_btn: "bao-gia",
      final_cta_title: "final_cta",
    };

    const sectionId = mapping[targetId] || targetId;

    const targetEl =
      (container.querySelector(`[data-cms-id="${targetId}"]`) as HTMLElement) ||
      (container.querySelector(`#${sectionId}`) as HTMLElement) ||
      (container.querySelector(`[data-cms-section="${sectionId}"]`) as HTMLElement);

    if (targetEl && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const relativeTop = targetRect.top - containerRect.top + container.scrollTop;

      container.scrollTo({
        top: Math.max(0, relativeTop - 80),
        behavior: "smooth",
      });

      targetEl.classList.add("ring-4", "ring-[#0B63CE]", "ring-offset-2", "transition-all");
      setTimeout(() => {
        targetEl.classList.remove("ring-4", "ring-[#0B63CE]", "ring-offset-2", "transition-all");
      }, 2000);
    }
  };

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

          {hasUnsavedChanges && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse ml-2">
              Có thay đổi chưa xuất bản
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
              <span>Giấy Chứng Nhận</span>
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
              onClick={() => setActiveTab("final_cta")}
              className={`pb-3 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "final_cta"
                  ? "border-[#0B63CE] text-[#0B63CE]"
                  : "border-transparent text-[#6B7C93] hover:text-[#102A43]"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CTA Cuối Trang</span>
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
              <span>Thư Viện Ảnh</span>
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
              <span>Lịch Sử</span>
            </button>
          </div>

          {/* Left Form Content */}
          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            {/* TAB 1: HOTLINE, EMAIL & ADDRESS */}
            {activeTab === "contact" && (
              <div className="space-y-4">
                <div className="bg-[#EAF3FC] p-4 rounded-xl border border-[#D9E4EF] space-y-1">
                  <h3 className="font-bold text-sm text-[#102A43] flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#0B63CE]" />
                    Quản Lý Thông Tin Liên Hệ & Địa Chỉ Nhà Máy
                  </h3>
                  <p className="text-xs text-[#40566F]">
                    Thay đổi Hotline, Email và Địa chỉ nhà máy hiển thị tại Header, Footer và Biểu mẫu báo giá.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-xs text-[#102A43] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#0B63CE]" />
                        Hotline tư vấn kỹ thuật (Zalo / Call)
                      </label>
                      <button
                        onClick={() => handleManualScrollToTarget("nav_phone")}
                        className="text-[10px] text-[#0B63CE] font-semibold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> Xem vị trí web
                      </button>
                    </div>
                    <input
                      type="text"
                      value={draft.nav_phone || "083 572 6666"}
                      onChange={(e) => updateDraft("nav_phone", e.target.value)}
                      className="admin-input font-bold text-[#0B63CE]"
                    />
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-xs text-[#102A43] flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#0B63CE]" />
                        Email nhận bản vẽ & báo giá
                      </label>
                      <button
                        onClick={() => handleManualScrollToTarget("nav_email")}
                        className="text-[10px] text-[#0B63CE] font-semibold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> Xem vị trí web
                      </button>
                    </div>
                    <input
                      type="email"
                      value={draft.nav_email || "phuocpefoam@gmail.com"}
                      onChange={(e) => updateDraft("nav_email", e.target.value)}
                      className="admin-input font-bold text-[#102A43]"
                    />
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-xs text-[#102A43] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0B63CE]" />
                        Địa chỉ nhà máy sản xuất
                      </label>
                      <button
                        onClick={() => handleManualScrollToTarget("quote_factory_address")}
                        className="text-[10px] text-[#0B63CE] font-semibold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> Xem vị trí web
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={draft.footer_address || "Ấp Lập Điền, Xã Tân Mỹ, Huyện Đức Hòa, Tỉnh Long An"}
                      onChange={(e) => updateDraft("footer_address", e.target.value)}
                      className="admin-input font-medium text-[#102A43]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: HERO BANNER */}
            {activeTab === "hero" && (
              <div className="space-y-4">
                <div className="bg-[#EAF3FC] p-4 rounded-xl border border-[#D9E4EF] space-y-1">
                  <h3 className="font-bold text-sm text-[#102A43] flex items-center gap-2">
                    <HomeIcon className="w-4 h-4 text-[#0B63CE]" />
                    Chỉnh Sửa Văn Bản Banner Trang Chủ (Hero Section)
                  </h3>
                  <p className="text-xs text-[#40566F]">
                    Thay đổi huy hiệu, tiêu đề chính, mô tả và các nút kêu gọi hành động của trang chủ.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                    <label className="font-bold text-xs text-[#102A43] block">Huy hiệu trên cùng (Badge)</label>
                    <input
                      type="text"
                      value={draft.hero_badge || "GIẢI PHÁP LDPE VÀ PE FOAM THEO YÊU CẦU"}
                      onChange={(e) => updateDraft("hero_badge", e.target.value)}
                      className="admin-input font-bold text-[#0B63CE]"
                    />
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                    <label className="font-bold text-xs text-[#102A43] block">Tiêu đề chính Hero (H1)</label>
                    <input
                      type="text"
                      value={draft.hero_title || "Ôm trọn sản phẩm. Bảo vệ hàng hóa. Giữ vững uy tín thương hiệu."}
                      onChange={(e) => updateDraft("hero_title", e.target.value)}
                      className="admin-input font-bold text-[#102A43]"
                    />
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                    <label className="font-bold text-xs text-[#102A43] block">Mô tả chi tiết Hero</label>
                    <textarea
                      rows={4}
                      value={
                        draft.hero_desc ||
                        "Cung cấp màng LDPE, túi đóng gói, xốp PE foam chống sốc, khay định hình và các giải pháp bảo vệ sản phẩm theo kích thước, đặc tính và quy trình vận chuyển thực tế."
                      }
                      onChange={(e) => updateDraft("hero_desc", e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                      <label className="font-bold text-xs text-[#102A43] block">Nút chính (Primary CTA)</label>
                      <input
                        type="text"
                        value={draft.hero_cta_primary || "Nhận tư vấn và báo giá"}
                        onChange={(e) => updateDraft("hero_cta_primary", e.target.value)}
                        className="admin-input font-bold text-[#0B63CE]"
                      />
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                      <label className="font-bold text-xs text-[#102A43] block">Nút phụ (Secondary CTA)</label>
                      <input
                        type="text"
                        value={draft.hero_cta_secondary || "Khám phá sản phẩm LDPE"}
                        onChange={(e) => updateDraft("hero_cta_secondary", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRODUCTS CATALOG */}
            {activeTab === "products" && (
              <div className="space-y-4">
                <div className="bg-[#EAF3FC] p-4 rounded-xl border border-[#D9E4EF] space-y-1">
                  <h3 className="font-bold text-sm text-[#102A43] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#0B63CE]" />
                    Chỉnh Sửa Văn Bản Danh Mục Sản Phẩm (Bento Grid)
                  </h3>
                  <p className="text-xs text-[#40566F]">
                    Thay đổi tiêu đề chung và mô tả khối sản phẩm LDPE & PE Foam.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                  <label className="font-bold text-xs text-[#102A43] block">Tiêu đề khối sản phẩm (H2)</label>
                  <input
                    type="text"
                    value={draft.catalog_title || "Danh Mục Sản Phẩm LDPE & Xốp PE Foam Nhà Máy Đức Phúc"}
                    onChange={(e) => updateDraft("catalog_title", e.target.value)}
                    className="admin-input font-bold text-[#102A43]"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: QUOTE FORM */}
            {activeTab === "quote_form" && (
              <div className="space-y-4">
                <div className="bg-[#EAF3FC] p-4 rounded-xl border border-[#D9E4EF] space-y-1">
                  <h3 className="font-bold text-sm text-[#102A43] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0B63CE]" />
                    Chỉnh Sửa Văn Bản Biểu Mẫu Nhận Báo Giá
                  </h3>
                  <p className="text-xs text-[#40566F]">
                    Chỉnh sửa các tiêu đề, mô tả hướng dẫn, nhãn nút bấm và thông tin cọc mẫu SePay QR.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                    <label className="font-bold text-xs text-[#102A43] block">Tiêu đề khối báo giá (H2)</label>
                    <input
                      type="text"
                      value={draft.quote_title || "Bạn chưa biết nên chọn loại LDPE hoặc PE foam nào?"}
                      onChange={(e) => updateDraft("quote_title", e.target.value)}
                      className="admin-input font-bold text-[#102A43]"
                    />
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                    <label className="font-bold text-xs text-[#102A43] block">Mô tả hướng dẫn gửi mẫu</label>
                    <textarea
                      rows={3}
                      value={
                        draft.quote_desc ||
                        "Hãy gửi cho chúng tôi mẫu sản phẩm, kích thước, số lượng dự kiến và yêu cầu vận chuyển."
                      }
                      onChange={(e) => updateDraft("quote_desc", e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                    <label className="font-bold text-xs text-[#102A43] block">Chữ hiển thị Nút Gửi Báo Giá</label>
                    <input
                      type="text"
                      value={draft.form_submit_btn || "Gửi yêu cầu báo giá"}
                      onChange={(e) => updateDraft("form_submit_btn", e.target.value)}
                      className="admin-input font-bold text-[#0B63CE]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: CERTIFICATIONS */}
            {activeTab === "certifications" && (
              <div className="space-y-4">
                <div className="bg-[#EAF3FC] p-4 rounded-xl border border-[#D9E4EF] space-y-1">
                  <h3 className="font-bold text-sm text-[#102A43] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#0B63CE]" />
                    Chỉnh Sửa Văn Bản Chứng Nhận Chất Lượng
                  </h3>
                  <p className="text-xs text-[#40566F]">
                    Quản lý thông tin tiêu đề chứng chỉ ISO 9001:2015, SGS REACH & RoHS.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                  <label className="font-bold text-xs text-[#102A43] block">Tiêu đề khối chứng nhận</label>
                  <input
                    type="text"
                    value={draft.cert_title || "Chứng Nhận Chất Lượng & Tiêu Chuẩn Quốc Tế Nhà Máy Đức Phúc"}
                    onChange={(e) => updateDraft("cert_title", e.target.value)}
                    className="admin-input font-bold text-[#102A43]"
                  />
                </div>
              </div>
            )}

            {/* TAB 6: WORKFLOW */}
            {activeTab === "workflow" && (
              <div className="space-y-4">
                <div className="bg-[#EAF3FC] p-4 rounded-xl border border-[#D9E4EF] space-y-1">
                  <h3 className="font-bold text-sm text-[#102A43] flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#0B63CE]" />
                    Chỉnh Sửa Tiêu Đề Quy Trình Làm Việc
                  </h3>
                  <p className="text-xs text-[#40566F]">
                    Cập nhật tiêu đề và mô tả 6 bước tiếp nhận đơn hàng.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                  <label className="font-bold text-xs text-[#102A43] block">Tiêu đề quy trình làm việc</label>
                  <input
                    type="text"
                    value={draft.workflow_title || "Quy Trình 6 Bước Hợp Tác & Sản Xuất"}
                    onChange={(e) => updateDraft("workflow_title", e.target.value)}
                    className="admin-input font-bold text-[#102A43]"
                  />
                </div>
              </div>
            )}

            {/* TAB 7: FINAL CTA */}
            {activeTab === "final_cta" && (
              <div className="space-y-4">
                <div className="bg-[#EAF3FC] p-4 rounded-xl border border-[#D9E4EF] space-y-1">
                  <h3 className="font-bold text-sm text-[#102A43] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0B63CE]" />
                    Chỉnh Sửa Văn Bản Nút Kêu Gọi Cuối Trang (CTA)
                  </h3>
                  <p className="text-xs text-[#40566F]">
                    Cập nhật thông điệp chốt sale ở chân trang.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                    <label className="font-bold text-xs text-[#102A43] block">Tiêu đề CTA cuối trang</label>
                    <input
                      type="text"
                      value={draft.final_cta_title || "Đừng để bao bì trở thành điểm yếu của một sản phẩm tốt"}
                      onChange={(e) => updateDraft("final_cta_title", e.target.value)}
                      className="admin-input font-bold text-[#102A43]"
                    />
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] space-y-2 shadow-sm">
                    <label className="font-bold text-xs text-[#102A43] block">Mô tả CTA cuối trang</label>
                    <textarea
                      rows={3}
                      value={
                        draft.final_cta_subtext ||
                        "Một giải pháp LDPE hoặc PE foam phù hợp giúp sản phẩm được bảo vệ tốt hơn, đóng gói nhanh hơn."
                      }
                      onChange={(e) => updateDraft("final_cta_subtext", e.target.value)}
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: MEDIA */}
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
