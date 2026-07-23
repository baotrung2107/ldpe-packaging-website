"use client";

import { useState } from "react";
import { ShieldCheck, CheckCircle2, Download, FileText, Award, Building2, Sparkles, Eye, X } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

export default function CertificationsSection() {
  const [activeModalImage, setActiveModalImage] = useState<{ src: string; title: string } | null>(null);
  const { getOverride } = useCMS();

  const title = getOverride("cert_title", "Hồ sơ chứng nhận chất lượng Nhà Máy Đức Phúc");
  const desc = getOverride(
    "cert_desc",
    "100% hình ảnh giấy chứng nhận ISO 9001:2015, kết quả thử nghiệm SGS REACH, SGS RoHS và Eurofins MTS chính thức của Công ty TNHH Sản Xuất PE Foam Đức Phúc."
  );

  const certs = [
    {
      badge: "ISO 9001:2015 CHÍNH THỨC",
      number: "9199293409672-QMS",
      date: "24/05/2022 - 23/05/2025",
      title: "Giấy Chứng Nhận ISO 9001:2015 ISOCERT",
      lab: "Tổ Chức ISOCERT (ThS. Vũ Văn Thao)",
      desc: "Chứng nhận Hệ thống Quản lý Chất lượng cho sản phẩm Xốp PE FOAM, Xốp OPP cách nhiệt & Xốp chống tĩnh điện. QĐ 24052201/QĐ-ISOCERT.",
      image: "/images/ldpe/cert-isocert-iso9001.jpg",
      pdfUrl: "#",
      status: "ĐẠT CHUẨN ISOCERT",
    },
    {
      badge: "SGS REACH SVHC (EU)",
      number: "VNHL2401000844EE",
      date: "16/01/2024",
      title: "Chứng Nhận Kiểm Định SGS REACH (235 SVHC)",
      lab: "Tập Đoàn SGS Vietnam Ltd",
      desc: "Kiểm định 235 hợp chất nguy hại (SVHC) theo Quy định (EC) No 1907/2006 REACH Liên minh Châu Âu. Kết quả PASS (Hàm lượng ≤ 0.1% w/w).",
      image: "/images/ldpe/cert-sgs-reach.jpg",
      pdfUrl: "/test reach. VNHL2401000844EE .pdf",
      status: "ĐẠT TIÊU CHUẨN PASS",
    },
    {
      badge: "SGS ROHS 2.0 (EU)",
      number: "VNHL2204007729EE",
      date: "22/04/2022",
      title: "Chứng Nhận SGS RoHS 2.0 An Toàn Hóa Chất",
      lab: "Tập Đoàn SGS Vietnam Ltd",
      desc: "Chỉ thị 2011/65/EU [Directive (EU) 2015/863]. An toàn 100% không chứa 10 kim loại nặng độc hại (Chì, Thủy ngân, Cadmium, Hexavalent Chromium...).",
      image: "/images/ldpe/cert-sgs-rohs.jpg",
      pdfUrl: "/TEST REPORT - ĐƯỚC PHÚC.pdf",
      status: "ĐẠT TIÊU CHUẨN COMPLY",
    },
    {
      badge: "EUROFINS / MTS REPORT",
      number: "76122-070905",
      date: "03/08/2022",
      title: "Báo Cáo Kiểm Định Eurofins / MTS Quốc Tế",
      lab: "Eurofins MTS Vietnam Ltd",
      desc: "Kiểm định chất lượng kỹ thuật sản phẩm Poly Seat Wedge Đức Phúc đạt đánh giá OVERALL RATING: PASS (X) tiêu chuẩn xuất khẩu quốc tế.",
      image: "/images/ldpe/cert-eurofins-mts.jpg",
      pdfUrl: "#",
      status: "OVERALL RATING: PASS",
    },
  ];

  return (
    <section id="chung-nhan" className="py-16 md:py-24 bg-[#041E38] text-white relative overflow-hidden border-t border-[#0B3B6F]">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0B63CE]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0B63CE]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 space-y-12">
        {/* Section Header (Fixed "chất lượng" splitting!) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] uppercase tracking-wider bg-[#0B63CE]/20 px-3.5 py-1.5 rounded-full border border-[#38BDF8]/30 backdrop-blur-md">
            <Award className="w-4 h-4 text-[#38BDF8]" />
            CHỨNG NHẬN CHẤT LƯỢNG ISO 9001:2015 & SGS / EUROFINS QUỐC TẾ
          </span>
          <h2
            className="text-[30px] md:text-[40px] font-extrabold text-white tracking-tight [text-wrap:balance]"
            data-cms-section="certifications"
            data-cms-id="cert_title"
            data-cms-type="text"
          >
            {title.includes("Nhà Máy Đức Phúc") ? (
              <>
                <span className="inline-block">Hồ sơ chứng&nbsp;nhận chất&nbsp;lượng</span>{" "}
                <span className="inline-block">Nhà&nbsp;Máy Đức&nbsp;Phúc</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p
            className="text-[16px] md:text-[17px] text-[#D9E4EF] font-normal leading-relaxed [text-wrap:pretty]"
            data-cms-section="certifications"
            data-cms-id="cert_desc"
            data-cms-type="text"
          >
            {desc}
          </p>
        </div>

        {/* 4 Official Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((c, i) => (
            <div
              key={i}
              className="bg-[#062B4F]/90 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden hover:border-[#38BDF8] transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group"
              data-cms-section="certifications"
              data-cms-id={`cert_item_${i}`}
              data-cms-type="repeater"
            >
              {/* Document Image Thumbnail Preview Header */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border-b border-white/10">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  data-cms-section="certifications"
                  data-cms-id={`cert_image_${i}`}
                  data-cms-type="image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062B4F] via-transparent to-black/10" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#38BDF8] tracking-wider uppercase bg-[#041E38]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#38BDF8]/30 shadow">
                    {c.badge}
                  </span>
                  <span className="text-[9px] bg-emerald-500/90 text-white font-bold px-2 py-0.5 rounded-full shadow">
                    {c.status}
                  </span>
                </div>

                {/* Hover Quick Zoom Button */}
                <button
                  onClick={() => setActiveModalImage({ src: c.image, title: c.title })}
                  className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-[#062B4F]/80 hover:bg-[#0B63CE] text-white backdrop-blur-md transition-colors border border-white/30 shadow-lg"
                  title="Phóng to giấy chứng nhận"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Document Text Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3
                    className="text-[16px] font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug [text-wrap:balance]"
                    data-cms-section="certifications"
                    data-cms-id={`cert_title_${i}`}
                    data-cms-type="text"
                  >
                    {c.title}
                  </h3>
                  <div className="text-[11px] text-[#9FB3C8] font-mono">
                    Mã số: <span className="text-white font-semibold">{c.number}</span>
                  </div>
                  <p
                    className="text-xs text-[#D9E4EF] leading-relaxed line-clamp-3 [text-wrap:pretty]"
                    data-cms-section="certifications"
                    data-cms-id={`cert_desc_${i}`}
                    data-cms-type="text"
                  >
                    {c.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#9FB3C8] text-[11px] truncate">{c.lab}</span>
                  <button
                    onClick={() => setActiveModalImage({ src: c.image, title: c.title })}
                    className="text-[#38BDF8] font-bold hover:underline flex items-center gap-1 shrink-0 text-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Xem ảnh
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Registered Legal Information Banner */}
        <div className="bg-gradient-to-r from-[#0B3B6F] via-[#0B63CE] to-[#041E38] p-6 md:p-8 rounded-2xl border border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              CÔNG TY TNHH SẢN XUẤT PE FOAM ĐỨC PHÚC
            </div>
            <h3 className="text-lg md:text-xl font-extrabold text-white [text-wrap:balance]">
              Nhà máy chính thức: Ấp Lập Điền, Xã Tân Mỹ, Huyện Đức Hòa, Tỉnh Long An
            </h3>
            <p className="text-xs text-[#EAF3FC] max-w-2xl [text-wrap:pretty]">
              100% tài liệu chứng nhận thật: ISO 9001:2015 9199293409672-QMS, SGS REACH VNHL2401000844EE, SGS RoHS VNHL2204007729EE & Eurofins MTS 76122-070905 sẵn sàng đáp ứng mọi tiêu chuẩn kiểm định B2B.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#bao-gia"
              className="btn-primary text-xs py-3 px-6 shadow-xl shadow-black/20 flex items-center gap-2 whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>Yêu cầu bản gốc kiểm định</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Image Preview Modal */}
      {activeModalImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute -top-12 right-0 text-white bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h4 className="text-white text-sm font-bold mb-3 text-center">
              {activeModalImage.title}
            </h4>
            <img
              src={activeModalImage.src}
              alt={activeModalImage.title}
              className="max-h-[80vh] w-auto object-contain rounded-xl border border-white/20 shadow-2xl bg-white p-2"
            />
          </div>
        </div>
      )}
    </section>
  );
}
