"use client";

import { ShieldCheck, CheckCircle2, Download, FileText, Award, Building2, Sparkles } from "lucide-react";

export default function CertificationsSection() {
  const certs = [
    {
      badge: "SGS REACH COMPLIANT",
      number: "VNHL2401000844EE",
      date: "16/01/2024",
      title: "Chứng Nhận Kiểm Định REACH SVHC (Châu Âu)",
      lab: "SGS Vietnam Ltd",
      desc: "Kiểm định 235 hợp chất nguy hại (SVHC) theo Quy định (EC) No 1907/2006 REACH của Liên minh Châu Âu. Kết quả PASS (Hàm lượng ≤ 0.1% w/w), đủ điều kiện xuất khẩu toàn cầu.",
      color: "from-blue-600 to-indigo-700",
      status: "ĐẠT TIÊU CHUẨN PASS",
    },
    {
      badge: "SGS ROHS COMPLIANT",
      number: "VNHL2204007729EE",
      date: "22/04/2022",
      title: "Chứng Nhận RoHS 2.0 (Chỉ thị 2011/65/EU)",
      lab: "SGS Vietnam Ltd",
      desc: "Cam kết an toàn tuyệt đối không chứa 10 kim loại nặng & hóa chất độc hại (Chì, Thủy ngân, Cadmium, Hexavalent Chromium, PBBs, PBDEs, DIBP, DEHP). An toàn cho linh kiện điện tử.",
      color: "from-emerald-600 to-teal-700",
      status: "ĐẠT TIÊU CHUẨN COMPLY",
    },
    {
      badge: "ISO 9001:2015",
      number: "CERT-ISO-9001-DP",
      date: "Hệ thống quản lý",
      title: "Hệ Thống Quản Lý Chất Lượng Nhà Máy Đức Phúc",
      lab: "Nhà Máy Long An",
      desc: "Dây chuyền sản xuất màng LDPE, cuộn xốp PE Foam và khay định hình CNC tự động hóa đạt chuẩn ISO 9001:2015, kiểm soát dung sai và quy cách chính xác 100%.",
      color: "from-sky-600 to-blue-800",
      status: "ĐÃ CHỨNG NHẬN",
    },
  ];

  return (
    <section id="chung-nhan" className="py-16 md:py-24 bg-[#041E38] text-white relative overflow-hidden border-t border-[#0B3B6F]">
      {/* Background Decorative Lighting */}
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
            Chứng nhận chất lượng nhà máy Đức Phúc
          </h2>
          <p className="text-[16px] md:text-[17px] text-[#D9E4EF] font-normal leading-relaxed">
            Tất cả sản phẩm màng LDPE & mút xốp PE Foam của Công ty TNHH Sản Xuất PE Foam Đức Phúc đều trải qua quy trình thử nghiệm khắt khe tại tập đoàn SGS quốc tế.
          </p>
        </div>

        {/* 3 Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((c, i) => (
            <div
              key={i}
              className="bg-[#062B4F]/80 backdrop-blur-md border border-white/15 rounded-2xl p-6 hover:border-[#38BDF8] transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#38BDF8] tracking-widest uppercase bg-[#0B63CE]/30 px-3 py-1 rounded-full border border-[#38BDF8]/20">
                    {c.badge}
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {c.status}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <h3 className="text-[18px] font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                    {c.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#9FB3C8]">
                    <span className="font-mono font-semibold text-white">Báo cáo số: {c.number}</span>
                    <span>•</span>
                    <span>SGS: {c.date}</span>
                  </div>
                </div>

                <p className="text-xs text-[#D9E4EF] leading-relaxed pt-1 border-t border-white/10">
                  {c.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#9FB3C8] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                  {c.lab}
                </span>
                <a
                  href="#bao-gia"
                  className="text-[#38BDF8] font-bold hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  Yêu cầu bản sao SGS →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Company Registered Legal Information Banner & Catalogue Download CTA */}
        <div className="bg-gradient-to-r from-[#0B3B6F] via-[#0B63CE] to-[#041E38] p-6 md:p-8 rounded-2xl border border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              CÔNG TY TNHH SẢN XUẤT PE FOAM ĐỨC PHÚC
            </div>
            <h3 className="text-lg md:text-xl font-extrabold text-white">
              Địa chỉ nhà máy: Ấp Lập Điền, Xã Tân Mỹ, Huyện Đức Hòa, Tỉnh Long An
            </h3>
            <p className="text-xs text-[#EAF3FC] max-w-2xl">
              Đầy đủ năng lực pháp lý, giấy kiểm định SGS REACH VNHL2401000844EE, RoHS VNHL2204007729EE và Catalogue quy chuẩn sản phẩm #27319 phục vụ các hợp đồng B2B xuất khẩu.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="#bao-gia"
              className="btn-primary text-xs py-3 px-6 shadow-xl shadow-black/20 flex items-center gap-2 whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>Tải Bảng Test Report SGS</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
