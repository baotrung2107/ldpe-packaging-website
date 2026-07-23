"use client";

import { useState } from "react";
import { ShieldCheck, CheckCircle2, Download, FileText, Award, Building2, Sparkles, Eye, X } from "lucide-react";

export default function CertificationsSection() {
  const [activeModalImage, setActiveModalImage] = useState<{ src: string; title: string } | null>(null);

  const certs = [
    {
      badge: "SGS REACH COMPLIANT",
      number: "VNHL2401000844EE",
      date: "16/01/2024",
      title: "Chứng Nhận Kiểm Định REACH SVHC (Châu Âu)",
      lab: "SGS Vietnam Ltd",
      desc: "Kiểm định 235 hợp chất nguy hại (SVHC) theo Quy định (EC) No 1907/2006 REACH của Liên minh Châu Âu. Kết quả PASS (Hàm lượng ≤ 0.1% w/w), đủ điều kiện xuất khẩu toàn cầu.",
      image: "/images/ldpe/cert-sgs-reach.jpg",
      pdfUrl: "/test reach. VNHL2401000844EE .pdf",
      status: "ĐẠT TIÊU CHUẨN PASS",
    },
    {
      badge: "SGS ROHS COMPLIANT",
      number: "VNHL2204007729EE",
      date: "22/04/2022",
      title: "Chứng Nhận RoHS 2.0 (Chỉ thị 2011/65/EU)",
      lab: "SGS Vietnam Ltd",
      desc: "Cam kết an toàn tuyệt đối không chứa 10 kim loại nặng & hóa chất độc hại (Chì, Thủy ngân, Cadmium, Hexavalent Chromium, PBBs, PBDEs, DIBP, DEHP). An toàn cho linh kiện điện tử.",
      image: "/images/ldpe/cert-sgs-rohs.jpg",
      pdfUrl: "/TEST REPORT - ĐƯỚC PHÚC.pdf",
      status: "ĐẠT TIÊU CHUẨN COMPLY",
    },
    {
      badge: "ISO 9001:2015",
      number: "CERT-ISO-9001-DP",
      date: "Hệ thống quản lý",
      title: "Hệ Thống Quản Lý Chất Lượng Nhà Máy Đức Phúc",
      lab: "Nhà Máy Long An",
      desc: "Dây chuyền sản xuất màng LDPE, cuộn xốp PE Foam và khay định hình CNC tự động hóa đạt chuẩn ISO 9001:2015, kiểm soát dung sai và quy cách chính xác 100%.",
      image: "/images/ldpe/cert-iso-9001.jpg",
      pdfUrl: "#",
      status: "ĐÃ CHỨNG NHẬN",
    },
    {
      badge: "CATALOGUE SẢN PHẨM",
      number: "#27319-CATALOGUE-TK2",
      date: "2026 Edition",
      title: "Catalogue Quy Chuẩn Kỹ Thuật Nhà Máy Đức Phúc",
      lab: "Công Ty TNHH Sản Xuất PE Foam Đức Phúc",
      desc: "Bảng tổng hợp chi tiết quy cách, tỉ trọng, kích thước cuộn màng LDPE, tấm PE foam chống sốc, khay định hình CNC và các dòng nệm PE foam 3 gấp chính hãng.",
      image: "/images/ldpe/cert-catalogue.jpg",
      pdfUrl: "/#27319-catalogue-tk2.pdf",
      status: "XUẤT BẢN CHÍNH THỨC",
    },
  ];

  return (
    <section id="chung-nhan" className="py-16 md:py-24 bg-[#041E38] text-white relative overflow-hidden border-t border-[#0B3B6F]">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0B63CE]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0B63CE]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] uppercase tracking-wider bg-[#0B63CE]/20 px-3.5 py-1.5 rounded-full border border-[#38BDF8]/30 backdrop-blur-md">
            <Award className="w-4 h-4 text-[#38BDF8]" />
            TIÊU CHUẨN KIỂM ĐỊNH QUỐC TẾ & CHỨNG NHẬN SGS
          </span>
          <h2 className="text-[30px] md:text-[40px] font-extrabold text-white tracking-tight">
            Hồ sơ chứng nhận chất lượng Nhà Máy Đức Phúc
          </h2>
          <p className="text-[16px] md:text-[17px] text-[#D9E4EF] font-normal leading-relaxed">
            Tất cả sản phẩm màng LDPE & mút xốp PE Foam của Công ty TNHH Sản Xuất PE Foam Đức Phúc đều đi kèm tài liệu thử nghiệm thực tế tại tập đoàn SGS quốc tế.
          </p>
        </div>

        {/* 4 Certification Cards Grid with Image Preview Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((c, i) => (
            <div
              key={i}
              className="bg-[#062B4F]/90 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden hover:border-[#38BDF8] transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group"
            >
              {/* Document Image Thumbnail Preview Header */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#041E38] border-b border-white/10">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062B4F] via-transparent to-black/20" />

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
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors border border-white/30"
                  title="Phóng to chứng nhận"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Document Text Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-[16px] font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                    {c.title}
                  </h3>
                  <div className="text-[11px] text-[#9FB3C8] font-mono">
                    Mã số: <span className="text-white font-semibold">{c.number}</span>
                  </div>
                  <p className="text-xs text-[#D9E4EF] leading-relaxed line-clamp-3">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#9FB3C8] text-[11px] truncate">{c.lab}</span>
                  <a
                    href={c.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#38BDF8] font-bold hover:underline flex items-center gap-1 shrink-0 text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Tải PDF
                  </a>
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
            <h3 className="text-lg md:text-xl font-extrabold text-white">
              Nhà máy chính thức: Ấp Lập Điền, Xã Tân Mỹ, Huyện Đức Hòa, Tỉnh Long An
            </h3>
            <p className="text-xs text-[#EAF3FC] max-w-2xl">
              Cam kết 100% tài liệu chứng nhận thật: SGS REACH VNHL2401000844EE, SGS RoHS VNHL2204007729EE & Catalogue #27319 sẵn sàng cho các hợp đồng B2B xuất khẩu Châu Âu, Mỹ & Nhật Bản.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#bao-gia"
              className="btn-primary text-xs py-3 px-6 shadow-xl shadow-black/20 flex items-center gap-2 whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>Yêu cầu bản gốc SGS</span>
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
              className="max-h-[80vh] w-auto object-contain rounded-xl border border-white/20 shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
