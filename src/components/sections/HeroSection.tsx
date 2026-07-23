"use client";

import { CheckCircle2, ArrowRight, ShieldCheck, PackageCheck, Factory, Sparkles, Clock3, Award } from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import SmartTextRenderer from "@/components/SmartTextRenderer";

export default function HeroSection() {
  const { getOverride } = useCMS();

  const badge = getOverride("hero_badge", "GIẢI PHÁP LDPE VÀ PE FOAM THEO YÊU CẦU");
  const title = getOverride("hero_title", "Ôm trọn sản phẩm. Bảo vệ hàng hóa. Giữ vững uy tín thương hiệu.");
  const desc = getOverride(
    "hero_desc",
    "Cung cấp màng LDPE, túi đóng gói, xốp PE foam chống sốc, khay định hình và các giải pháp bảo vệ sản phẩm theo kích thước, đặc tính và quy trình vận chuyển thực tế.\n\nTừ một mẫu sản phẩm, chúng tôi tư vấn vật liệu, độ dày, kích thước và cấu trúc đóng gói phù hợp, giúp doanh nghiệp giảm rủi ro móp, xước, vỡ hoặc biến dạng hàng hóa."
  );
  const ctaPrimary = getOverride("hero_cta_primary", "Nhận tư vấn và báo giá");
  const ctaSecondary = getOverride("hero_cta_secondary", "Khám phá sản phẩm LDPE");
  const factoryBg = getOverride("hero_bg_image", "/images/ldpe/ldpe-factory-bg.jpg");
  const heroImage = getOverride("hero_image_url", "/images/ldpe/pe-foam-dinh-hinh.png");
  const youtubeUrl = getOverride("hero_youtube_url", "");

  return (
    <section className="relative bg-[#041B32] text-white py-12 sm:py-16 lg:py-24 overflow-hidden border-b border-[#0B3B6F]">
      {/* High-Tech LDPE Factory Floor Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={factoryBg}
          alt="Nhà máy sản xuất LDPE & PE Foam"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105"
          data-cms-section="hero"
          data-cms-id="hero_bg_image"
          data-cms-type="image"
        />
        {/* Navy Gradient Overlay for High Readability & Glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041A30]/95 via-[#062B4F]/85 to-[#062B4F]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(#0B63CE_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Glassmorphism Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0B63CE]/25 border border-[#38BDF8]/40 px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-[#EAF3FC] tracking-wider uppercase backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <Factory className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span
                data-cms-section="hero"
                data-cms-id="hero_badge"
                data-cms-type="text"
              >
                {badge}
              </span>
            </div>

            {/* Main Title with Responsive Mobile Heading Wrap */}
            <h1
              className="text-[28px] sm:text-[42px] lg:text-[54px] font-extrabold leading-[1.2] sm:leading-[1.15] text-white tracking-tight drop-shadow-sm [text-wrap:balance]"
              data-cms-section="hero"
              data-cms-id="hero_title"
              data-cms-type="text"
            >
              {title.includes("Giữ vững uy") ? (
                <>
                  <span className="block">Ôm&nbsp;trọn sản&nbsp;phẩm.</span>
                  <span className="block">Bảo&nbsp;vệ hàng&nbsp;hóa.</span>
                  <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent inline-block">
                    Giữ&nbsp;vững uy&nbsp;tín thương&nbsp;hiệu.
                  </span>
                </>
              ) : (
                <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent">
                  {title}
                </span>
              )}
            </h1>

            {/* Subtext Paragraph */}
            <div
              className="text-[14px] sm:text-[16px] lg:text-[17px] text-[#D9E4EF] leading-relaxed max-w-2xl font-normal"
              data-cms-section="hero"
              data-cms-id="hero_desc"
              data-cms-type="text"
            >
              <SmartTextRenderer text={desc} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="#bao-gia"
                className="btn-primary shadow-xl shadow-[#0B63CE]/40 hover:shadow-[#0B63CE]/60 group justify-center text-sm py-3"
                data-cms-section="hero"
                data-cms-id="hero_cta_primary"
                data-cms-type="button"
              >
                <span>{ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#san-pham"
                className="btn-secondary backdrop-blur-md bg-white/90 justify-center text-sm py-3"
                data-cms-section="hero"
                data-cms-id="hero_cta_secondary"
                data-cms-type="button"
              >
                <span>{ctaSecondary}</span>
              </a>
            </div>

            {/* Value Proposition Badges Grid (Clean responsive mobile spacing) */}
            <div className="pt-4 sm:pt-6 border-t border-[#103E6B]/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs md:text-sm text-[#D9E4EF]">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38BDF8] shrink-0" />
                <span className="text-[11px] sm:text-xs">Tư&nbsp;vấn theo&nbsp;mẫu</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38BDF8] shrink-0" />
                <span className="text-[11px] sm:text-xs">Gia&nbsp;công kích&nbsp;thước</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38BDF8] shrink-0" />
                <span className="text-[11px] sm:text-xs">Hỗ&nbsp;trợ thử&nbsp;mẫu</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38BDF8] shrink-0" />
                <span className="text-[11px] sm:text-xs">Sản&nbsp;xuất nhu&nbsp;cầu</span>
              </div>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group bg-[#062B4F]/90 backdrop-blur-md">
              {youtubeUrl ? (
                <div
                  className="aspect-video w-full"
                  data-cms-section="hero"
                  data-cms-id="hero_youtube_url"
                  data-cms-type="youtube"
                >
                  <iframe
                    src={youtubeUrl}
                    title="YouTube video player"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={heroImage}
                    alt="Sản phẩm mút xốp định hình LDPE"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-cms-section="hero"
                    data-cms-id="hero_image_url"
                    data-cms-type="image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041B32]/95 via-transparent to-black/30" />

                  {/* Sleek Header Glass Pill Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#041B32]/85 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>ISO 9001:2015</span>
                    <span className="text-[#38BDF8] font-bold">| ĐỨC PHÚC</span>
                  </div>

                  {/* Clean Bottom Overlay Information Bar (Optimized for Mobile) */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#041B32] via-[#041B32]/90 to-transparent p-3.5 sm:p-5 space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 [text-wrap:balance]">
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38BDF8] shrink-0" />
                      Khay Xốp PE Foam Định&nbsp;Hình CNC Cao&nbsp;Cấp
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#D9E4EF] leading-relaxed [text-wrap:pretty] line-clamp-2 sm:line-clamp-none">
                      Dây chuyền đùn thổi màng LDPE & dập định&nbsp;hình CNC chính&nbsp;xác theo kích&nbsp;thước sản&nbsp;phẩm.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Clean Feature Info Badges Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="bg-white text-[#102A43] p-3 sm:p-3.5 rounded-xl border border-[#D9E4EF] shadow-lg flex items-center gap-3">
                <div className="p-2 sm:p-2.5 bg-[#EAF3FC] text-[#0B63CE] rounded-lg shrink-0">
                  <PackageCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-[#102A43]">Chính&nbsp;xác 100%</div>
                  <div className="text-[11px] text-[#6B7C93] [text-wrap:pretty]">
                    Khay định&nbsp;hình vừa&nbsp;vặn tuyệt&nbsp;đối
                  </div>
                </div>
              </div>

              <div className="bg-[#0B3B6F]/80 backdrop-blur-md text-white p-3 sm:p-3.5 rounded-xl border border-[#38BDF8]/30 shadow-lg flex items-center gap-3">
                <div className="p-2 sm:p-2.5 bg-[#38BDF8]/20 text-[#38BDF8] rounded-lg shrink-0">
                  <Clock3 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-white">Thử&nbsp;mẫu nhanh&nbsp;24h</div>
                  <div className="text-[11px] text-[#D9E4EF] [text-wrap:pretty]">
                    Tư&nbsp;vấn & thiết&nbsp;kế 3D miễn&nbsp;phí
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
