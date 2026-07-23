"use client";

import { useCMS } from "@/context/CMSContext";
import { ShieldCheck, CheckCircle2, ArrowRight, Play, Award, Sparkles, Factory, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const { getOverride } = useCMS();

  const badge = getOverride("hero_badge", "GIẢI PHÁP LDPE VÀ PE FOAM THEO YÊU CẦU DÀNH CHO DOANH NGHIỆP");
  const title = getOverride(
    "hero_title",
    "Ôm trọn sản phẩm. Bảo vệ hàng hóa. Giữ vững uy tín thương hiệu."
  );
  const desc = getOverride(
    "hero_desc",
    "Chuyên sản xuất màng cuộn LDPE, túi nilông đóng gói công nghiệp, cuộn xốp PE Foam chống sốc, khay mút định hình CNC và nệm PE Foam 3 gấp chính hãng. Đáp ứng chuẩn xuất khẩu SGS REACH, RoHS & ISO 9001:2015."
  );
  const bgImageUrl = getOverride("hero_image_url", "/images/ldpe/ldpe-factory-bg.jpg");
  const ctaPrimary = getOverride("hero_cta_primary", "Nhận tư vấn & báo giá ngay");
  const ctaSecondary = getOverride("hero_cta_secondary", "Khám phá danh mục sản phẩm");
  const youtubeUrl = getOverride("hero_youtube_url", "");

  return (
    <section className="relative min-h-[90vh] bg-[#041E38] text-white flex items-center overflow-hidden border-b border-[#0B3B6F]">
      {/* Background High-Tech Factory Showcase Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImageUrl}
          alt="LDPE Factory Background"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-all duration-1000"
          data-cms-section="hero"
          data-cms-id="hero_image_url"
          data-cms-type="image"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041E38] via-[#041E38]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041E38] via-transparent to-[#041E38]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Action Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] uppercase tracking-wider bg-[#0B63CE]/30 px-3.5 py-1.5 rounded-full border border-[#38BDF8]/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span data-cms-section="hero" data-cms-id="hero_badge" data-cms-type="text">
              {badge}
            </span>
          </div>

          <h1
            className="text-[34px] sm:text-[44px] lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.15]"
            data-cms-section="hero"
            data-cms-id="hero_title"
            data-cms-type="text"
          >
            {title}
          </h1>

          <p
            className="text-[16px] md:text-[18px] text-[#D9E4EF] font-normal leading-relaxed max-w-2xl"
            data-cms-section="hero"
            data-cms-id="hero_desc"
            data-cms-type="text"
          >
            {desc}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#bao-gia"
              className="btn-primary text-sm py-3.5 px-7 shadow-xl shadow-black/30 flex items-center justify-center gap-2 group"
              data-cms-section="hero"
              data-cms-id="hero_cta_primary"
              data-cms-type="button"
            >
              <span>{ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#san-pham"
              className="btn-secondary text-sm py-3.5 px-7 justify-center border-white/30 text-white hover:bg-white/10 backdrop-blur-md"
              data-cms-section="hero"
              data-cms-id="hero_cta_secondary"
              data-cms-type="button"
            >
              <span>{ctaSecondary}</span>
            </a>
          </div>

          {/* Key Trust Stats */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/15">
            <div>
              <span className="text-xl md:text-2xl font-extrabold text-[#38BDF8]">10.000m²</span>
              <span className="text-[11px] text-[#D9E4EF] block font-medium">Quy mô nhà máy Long An</span>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-extrabold text-[#38BDF8]">ISO 9001</span>
              <span className="text-[11px] text-[#D9E4EF] block font-medium">Hệ thống quản lý chất lượng</span>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-extrabold text-[#38BDF8]">SGS PASS</span>
              <span className="text-[11px] text-[#D9E4EF] block font-medium">REACH 235 SVHC & RoHS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Card Showcase or Embedded Video */}
        <div className="lg:col-span-5 relative">
          {youtubeUrl ? (
            <div
              className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black"
              data-cms-section="hero"
              data-cms-id="hero_youtube_url"
              data-cms-type="youtube"
            >
              <iframe
                src={youtubeUrl}
                title="LDPE Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#062B4F]/90 backdrop-blur-md p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-[#38BDF8]" />
                  <span className="font-bold text-sm text-white">NHÀ MÁY ĐỨC PHÚC PE FOAM</span>
                </div>
                <span className="text-[10px] bg-emerald-500/80 text-white px-2 py-0.5 rounded font-bold">
                  B2B TRỰC TIẾP
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs text-[#D9E4EF]">
                    Đùn màng LDPE & thổi mút PE Foam độ dày từ 0.5mm - 100mm.
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs text-[#D9E4EF]">
                    Gia công dập khay mút định hình CNC chính xác theo kích thước sản phẩm.
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs text-[#D9E4EF]">
                    Giao hàng nhanh toàn quốc, đáp ứng đơn hàng xuất khẩu Châu Âu & Mỹ.
                  </span>
                </div>
              </div>

              <a
                href="#bao-gia"
                className="w-full btn-primary text-xs py-3 justify-center shadow-lg shadow-black/20"
              >
                <span>Nhận Catalogue & Bảng Giá Sỉ</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
