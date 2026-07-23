"use client";

import { useState, useEffect } from "react";
import { Menu, X, PhoneCall, ShieldCheck, ChevronRight } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getOverride } = useCMS();

  const logoUrl = getOverride("nav_logo_url", "");
  const phone = getOverride("nav_phone", "083 572 6666");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Trang chủ", href: "#" },
    { name: "Sản phẩm LDPE", href: "#san-pham" },
    { name: "Giải pháp theo ngành", href: "#giai-phap" },
    { name: "Gia công theo yêu cầu", href: "#gia-cong" },
    { name: "Quy trình sản xuất", href: "#quy-trinh" },
    { name: "Kiến thức LDPE", href: "#kien-thuc" },
    { name: "Báo giá", href: "#bao-gia" },
    { name: "Liên hệ", href: "#lien-he" },
  ];

  return (
    <header id="navbar" className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#041E38] text-white text-[12px] py-1.5 px-4 border-b border-[#0B3B6F]">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-medium text-[#D9E4EF]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B63CE] shrink-0" />
            <span className="truncate">Nhà máy sản xuất & gia công trực tiếp màng LDPE & Xốp PE Foam theo yêu cầu</span>
          </div>

          <div className="flex items-center gap-4 text-[#D9E4EF] shrink-0 text-[12px]">
            <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-white flex items-center gap-1.5 transition-colors group">
              <PhoneCall className="w-3.5 h-3.5 text-[#0B63CE] group-hover:scale-110 transition-transform" />
              <span
                className="font-bold text-white"
                data-cms-section="navbar"
                data-cms-id="nav_phone"
                data-cms-type="contact"
              >
                {phone}
              </span>
              <span className="text-[#9FB3C8] font-normal hidden sm:inline">(Hỗ trợ 24/7)</span>
            </a>
            <span className="hidden md:inline text-[#103E6B]">|</span>
            <span className="hidden md:inline text-[#9FB3C8]">Nhận hỗ trợ làm mẫu sản phẩm thực tế</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2.5 border-b border-[#D9E4EF]"
            : "bg-white py-3.5 border-b border-[#D9E4EF]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-6">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            {logoUrl ? (
              <img src={logoUrl} alt="DUC PHUC PE FOAM" className="h-10 object-contain" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#062B4F] flex items-center justify-center text-[#38BDF8] font-bold text-xl tracking-wider group-hover:bg-[#0B63CE] group-hover:text-white transition-colors shadow-md">
                DP
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-extrabold text-[17px] leading-tight text-[#102A43] tracking-tight">
                DUC PHUC <span className="text-[#0B63CE]">PE FOAM</span>
              </span>
              <span className="text-[10px] text-[#6B7C93] font-semibold tracking-wider uppercase">
                BẢO VỆ HÀNG HÓA CHUYÊN NGHIỆP
              </span>
            </div>
          </a>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[14px] font-medium text-[#40566F] hover:text-[#0B63CE] hover:bg-[#EAF3FC] px-2.5 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Header Action CTA Button */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href="#bao-gia"
              className="btn-primary text-xs py-2.5 px-5 shadow-md shadow-[#0B63CE]/20 whitespace-nowrap flex items-center gap-1.5 group"
            >
              <span>Nhận báo giá</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#102A43] hover:bg-[#EAF3FC] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#D9E4EF] px-4 py-4 space-y-2 shadow-2xl animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[14px] font-semibold text-[#102A43] hover:text-[#0B63CE] hover:bg-[#EAF3FC] px-3.5 py-2.5 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-[#D9E4EF]">
              <a
                href="#bao-gia"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center justify-center py-3 text-sm"
              >
                Nhận báo giá ngay
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
