"use client";

import { useState } from "react";
import { Phone, Mail, Menu, X, ShieldCheck } from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import SepayModal from "./SepayModal";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSepayOpen, setIsSepayOpen] = useState(false);
  const { getOverride } = useCMS();

  const logoText = getOverride("nav_logo_text", "DP");
  const brandTitle = getOverride("nav_brand_title", "DUC PHUC PE FOAM");
  const phone = getOverride("nav_phone", "083 572 6666");

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#041E38]/95 backdrop-blur-md border-b border-[#0B3B6F] text-white shadow-lg">
        {/* Top bar info */}
        <div className="bg-[#062B4F] py-1.5 px-4 text-xs border-b border-[#0B3B6F]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 text-[#D9E4EF]">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 hover:text-[#38BDF8] transition-colors"
                data-cms-section="navbar"
                data-cms-id="nav_phone"
                data-cms-type="contact"
              >
                <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Hotline: {phone}</span>
              </a>
              <span className="hidden md:inline text-white/20">|</span>
              <span className="hidden md:inline text-[#D9E4EF]">
                Nhà Máy: Ấp Lập Điền, Xã Tân Mỹ, Huyện Đức Hòa, Tỉnh Long An
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] bg-[#0B63CE]/30 text-[#38BDF8] border border-[#38BDF8]/30 px-2 py-0.5 rounded font-medium">
                ISO 9001:2015 & SGS Certified
              </span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B63CE] to-[#041E38] border border-[#38BDF8]/40 text-white font-extrabold text-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"
              data-cms-section="navbar"
              data-cms-id="nav_logo_text"
              data-cms-type="logo"
            >
              {logoText}
            </div>
            <div>
              <span
                className="font-extrabold text-lg tracking-wider text-white group-hover:text-[#38BDF8] transition-colors block leading-tight"
                data-cms-section="navbar"
                data-cms-id="nav_brand_title"
                data-cms-type="text"
              >
                {brandTitle}
              </span>
              <span className="text-[10px] text-[#D9E4EF] uppercase tracking-widest block font-medium">
                LDPE & PE FOAM PACKAGING
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a href="#gioi-thieu" className="text-[#D9E4EF] hover:text-white transition-colors">
              Giới thiệu
            </a>
            <a href="#san-pham" className="text-[#D9E4EF] hover:text-white transition-colors">
              Sản phẩm
            </a>
            <a href="#giai-phap-nganh" className="text-[#D9E4EF] hover:text-white transition-colors">
              Giải pháp ngành
            </a>
            <a href="#quy-trinh" className="text-[#D9E4EF] hover:text-white transition-colors">
              Quy trình
            </a>
            <a href="#chung-nhan" className="text-[#D9E4EF] hover:text-white transition-colors">
              Chứng nhận SGS
            </a>
            <a href="#faq" className="text-[#D9E4EF] hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setIsSepayOpen(true)}
              className="btn-secondary text-xs py-2 px-4 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20"
            >
              <span>Thanh Toán QR</span>
            </button>

            <a href="#bao-gia" className="btn-primary text-xs py-2 px-4 shadow-lg shadow-black/20">
              <span>Báo giá nhanh</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#38BDF8]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#041E38] border-t border-[#0B3B6F] px-4 py-4 space-y-3 animate-fadeIn">
            <a
              href="#gioi-thieu"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#D9E4EF] py-2 border-b border-white/10"
            >
              Giới thiệu
            </a>
            <a
              href="#san-pham"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#D9E4EF] py-2 border-b border-white/10"
            >
              Sản phẩm
            </a>
            <a
              href="#giai-phap-nganh"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#D9E4EF] py-2 border-b border-white/10"
            >
              Giải pháp ngành
            </a>
            <a
              href="#quy-trinh"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#D9E4EF] py-2 border-b border-white/10"
            >
              Quy trình
            </a>
            <a
              href="#chung-nhan"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#D9E4EF] py-2 border-b border-white/10"
            >
              Chứng nhận SGS
            </a>
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSepayOpen(true);
                }}
                className="w-full btn-secondary text-xs py-2.5 justify-center border-emerald-500/40 text-emerald-300"
              >
                <span>Thanh Toán QR</span>
              </button>
              <a
                href="#bao-gia"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full btn-primary text-xs py-2.5 justify-center"
              >
                <span>Báo giá nhanh</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Sepay Modal */}
      <SepayModal isOpen={isSepayOpen} onClose={() => setIsSepayOpen(false)} />
    </>
  );
}
