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
} from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import Home from "@/app/page";

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const {
    overrides,
    updateDraft,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    saveAll,
    resetDraft,
    hasUnsavedChanges,
    previewMode,
    setPreviewMode,
  } = useCMS();

  // Check login on load
  useEffect(() => {
    fetch("/api/admin/cms")
      .then((res) => res.json())
      .then(() => {
        const savedAuth = localStorage.getItem("admin_logged_in");
        if (savedAuth === "true") {
          setIsAuth(true);
        }
      });
  }, []);

  // Unsaved changes browser warning
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
        setIsAuth(true);
        localStorage.setItem("admin_logged_in", "true");
      } else {
        setLoginError(data.error || "Đăng nhập thất bại");
      }
    } catch (err) {
      setLoginError("Không thể kết nối máy chủ");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuth(false);
    localStorage.removeItem("admin_logged_in");
  };

  const handleSave = async () => {
    const success = await saveAll();
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Login Screen Render
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#062B4F] flex items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl space-y-6 border border-[#D9E4EF]">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#0B63CE] text-white font-bold text-2xl rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              LD
            </div>
            <h2 className="text-2xl font-bold text-[#102A43]">Đăng nhập Admin CMS</h2>
            <p className="text-xs text-[#6B7C93]">Quản trị nội dung & giao diện website LDPE</p>
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
              Bảo mật mã hóa SHA-256 hash • Session hóa an toàn
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Admin Split-Screen CMS Interface Render
  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col font-sans">
      {/* Top Controls Toolbar */}
      <header className="bg-[#062B4F] text-white px-6 py-3 flex items-center justify-between sticky top-0 z-50 border-b border-[#103E6B] shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0B63CE] font-bold text-white flex items-center justify-center text-sm">
            CMS
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none text-white">Bảng Quản Trị Website LDPE</h1>
            <span className="text-[11px] text-[#D9E4EF]">Admin: baotrung2107</span>
          </div>
          {hasUnsavedChanges && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse ml-2">
              Có thay đổi chưa lưu
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Desktop/Mobile Mode Toggle */}
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

          {/* Reset Button */}
          <button
            onClick={resetDraft}
            disabled={!hasUnsavedChanges}
            className="btn-secondary text-xs py-1.5 px-3 min-h-[36px] bg-transparent text-white border-white/40 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Hoàn tác</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="btn-primary text-xs py-1.5 px-4 min-h-[36px] bg-[#0B63CE] hover:bg-[#084FA6]"
          >
            <Save className="w-3.5 h-3.5 mr-1" />
            <span>{saveSuccess ? "Đã lưu thành công!" : "Lưu tất cả"}</span>
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
        <div className="w-full lg:w-1/2 border-r border-[#D9E4EF] bg-white overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E4EF]">
            <div>
              <h2 className="font-bold text-lg text-[#102A43]">Nội dung & Hình ảnh CMS</h2>
              <p className="text-xs text-[#6B7C93]">
                Chỉnh sửa text, dán link hình ảnh từ thư mục LDPE để cập nhật giao diện trực tiếp.
              </p>
            </div>
          </div>

          {/* Accordion Form Sections */}
          <div className="space-y-3">
            {/* 1. BRAND & NAVBAR */}
            <FormSectionAccordion
              title="1. Header & Thanh Menu (Navbar)"
              id="navbar"
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            >
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Logo URL (Dán link ảnh hoặc để trống)</label>
                  <input
                    type="text"
                    value={overrides.nav_logo_url || ""}
                    onChange={(e) => updateDraft("nav_logo_url", e.target.value)}
                    placeholder="https://.../logo.png (Để trống = Logo chữ LD PE)"
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Hotline điện thoại</label>
                  <input
                    type="text"
                    value={overrides.nav_phone || ""}
                    onChange={(e) => updateDraft("nav_phone", e.target.value)}
                    placeholder="0900 000 000"
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Email liên hệ</label>
                  <input
                    type="text"
                    value={overrides.nav_email || ""}
                    onChange={(e) => updateDraft("nav_email", e.target.value)}
                    placeholder="lienhe@ldpe-packaging.vn"
                    className="admin-input"
                  />
                </div>
              </div>
            </FormSectionAccordion>

            {/* 2. HERO SECTION */}
            <FormSectionAccordion
              title="2. Khối Hero (Hình ảnh & Tiêu đề chính)"
              id="hero"
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            >
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Hình ảnh Hero chính (Link ảnh)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={overrides.hero_image_url || ""}
                      onChange={(e) => updateDraft("hero_image_url", e.target.value)}
                      placeholder="/images/ldpe/factory-hero.png"
                      className="admin-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Nhãn nhỏ (Badge)</label>
                  <input
                    type="text"
                    value={overrides.hero_badge || ""}
                    onChange={(e) => updateDraft("hero_badge", e.target.value)}
                    placeholder="GIẢI PHÁP LDPE VÀ PE FOAM THEO YÊU CẦU"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Tiêu đề chính H1</label>
                  <textarea
                    rows={2}
                    value={overrides.hero_title || ""}
                    onChange={(e) => updateDraft("hero_title", e.target.value)}
                    placeholder="Ôm trọn sản phẩm. Bảo vệ hàng hóa. Giữ vững uy tín thương hiệu."
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Mô tả Hero</label>
                  <textarea
                    rows={3}
                    value={overrides.hero_desc || ""}
                    onChange={(e) => updateDraft("hero_desc", e.target.value)}
                    placeholder="Cung cấp màng LDPE, túi đóng gói, xốp PE foam chống sốc..."
                    className="admin-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-[#102A43] block mb-1">Nút chính (Label)</label>
                    <input
                      type="text"
                      value={overrides.hero_cta_primary || ""}
                      onChange={(e) => updateDraft("hero_cta_primary", e.target.value)}
                      placeholder="Nhận tư vấn và báo giá"
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#102A43] block mb-1">Nút phụ (Label)</label>
                    <input
                      type="text"
                      value={overrides.hero_cta_secondary || ""}
                      onChange={(e) => updateDraft("hero_cta_secondary", e.target.value)}
                      placeholder="Khám phá sản phẩm LDPE"
                      className="admin-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Video YouTube Giới thiệu (Link URL YouTube)</label>
                  <input
                    type="text"
                    value={overrides.hero_youtube_url || ""}
                    onChange={(e) => updateDraft("hero_youtube_url", e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="admin-input"
                  />
                </div>
              </div>
            </FormSectionAccordion>

            {/* 3. PRODUCT CATALOG WITH IMAGES */}
            <FormSectionAccordion
              title="3. Danh mục Sản phẩm & Hình ảnh (Bento Layout)"
              id="products"
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            >
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Tiêu đề khối sản phẩm</label>
                  <input
                    type="text"
                    value={overrides.catalog_title || ""}
                    onChange={(e) => updateDraft("catalog_title", e.target.value)}
                    placeholder="Danh mục sản phẩm LDPE & Xốp PE Foam"
                    className="admin-input"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <span className="font-bold text-[#102A43] block uppercase tracking-wider text-[11px]">
                    DANH SÁCH SẢN PHẨM & HÌNH ẢNH
                  </span>

                  {(overrides.products_list || [
                    { title: "Màng & Túi LDPE Công Nghiệp", image: "/images/ldpe/mang-ldpe.png", cta: "Tư vấn khổ cuộn & độ dày túi LDPE" },
                    { title: "Cuộn & Tấm PE Foam Chống Sốc", image: "/images/ldpe/pe-foam-cuon.png", cta: "Chọn độ dày xốp PE Foam phù hợp" },
                    { title: "Mút Định Hình EPE / PE Foam CNC", image: "/images/ldpe/pe-foam-dinh-hinh.png", cta: "Gửi mẫu để thiết kế khay định hình" },
                    { title: "Ống Mút & Nẹp Góc PE Foam Chữ U/L", image: "/images/ldpe/ong-mut-nep-goc.png", cta: "Tư vấn nẹp góc & ống mút xốp" },
                    { title: "Nệm PE Foam G3 Đa Năng (2.5F - 10F)", image: "/images/ldpe/nem-pe-foam.png", cta: "Báo giá sỉ Nệm PE Foam G3" },
                    { title: "Gia Công LDPE & PE Foam Theo Đơn Đặt Hàng", image: "/images/ldpe/gia-cong-cnc.png", cta: "Gửi bản vẽ nhận báo giá gia công" },
                  ]).map((prod: any, idx: number) => (
                    <div key={idx} className="p-3 bg-[#F7FAFC] rounded-xl border border-[#D9E4EF] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0B63CE]">Sản phẩm #{idx + 1}</span>
                        <button
                          onClick={() => removeArrayItem("products_list", idx)}
                          className="text-red-500 hover:text-red-700"
                          title="Xóa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-[#6B7C93] block">Tên sản phẩm</label>
                          <input
                            type="text"
                            value={prod.title || ""}
                            onChange={(e) => updateArrayItem("products_list", idx, "title", e.target.value)}
                            className="admin-input font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#6B7C93] block">Link hình ảnh</label>
                          <input
                            type="text"
                            value={prod.image || ""}
                            onChange={(e) => updateArrayItem("products_list", idx, "image", e.target.value)}
                            placeholder="/images/ldpe/..."
                            className="admin-input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-[#6B7C93] block">Mô tả sản phẩm</label>
                        <textarea
                          rows={2}
                          value={prod.description || ""}
                          onChange={(e) => updateArrayItem("products_list", idx, "description", e.target.value)}
                          className="admin-input"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() =>
                      addArrayItem("products_list", {
                        title: "Sản phẩm LDPE mới",
                        image: "/images/ldpe/factory-hero.png",
                        cta: "Nhận báo giá ngay",
                      })
                    }
                    className="w-full btn-secondary text-xs py-2 justify-center border-dashed"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Thêm sản phẩm mới</span>
                  </button>
                </div>
              </div>
            </FormSectionAccordion>

            {/* 4. FAQS REPEATABLE ITEMS */}
            <FormSectionAccordion
              title="4. Danh sách FAQ Kiến thức LDPE"
              id="faqs"
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            >
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#102A43] block mb-1">Tiêu đề khối FAQ</label>
                  <input
                    type="text"
                    value={overrides.faq_title || ""}
                    onChange={(e) => updateDraft("faq_title", e.target.value)}
                    placeholder="Kiến thức vật liệu & Giải đáp thắc mắc LDPE"
                    className="admin-input"
                  />
                </div>

                <div className="space-y-3">
                  {(overrides.faq_list || [
                    { question: "LDPE và LLDPE có giống nhau không?", answer: "Cả hai đều thuộc nhóm polyethylene..." },
                    { question: "LDPE và HDPE khác nhau thế nào?", answer: "LDPE mềm, linh hoạt..." },
                    { question: "PE foam có phải là LDPE không?", answer: "Nhiều loại PE foam dùng trong đóng gói..." },
                  ]).map((faq: any, idx: number) => (
                    <div key={idx} className="p-3 bg-[#F7FAFC] rounded-xl border border-[#D9E4EF] space-y-2">
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
                        placeholder="Câu hỏi FAQ"
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

                  <button
                    onClick={() =>
                      addArrayItem("faq_list", {
                        question: "Câu hỏi kỹ thuật mới?",
                        answer: "Câu trả lời chi tiết cho thắc mắc của khách hàng.",
                      })
                    }
                    className="w-full btn-secondary text-xs py-2 justify-center border-dashed"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Thêm câu hỏi FAQ mới</span>
                  </button>
                </div>
              </div>
            </FormSectionAccordion>
          </div>
        </div>

        {/* Right Live Preview Panel (50% width) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#062B4F]/10 overflow-y-auto p-4 items-start justify-center">
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
