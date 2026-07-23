"use client";

import { useCMS } from "@/context/CMSContext";
import { Factory, ShieldCheck, Cpu, Truck, CheckCircle2 } from "lucide-react";

export default function IntroSection() {
  const { getOverride } = useCMS();

  const title = getOverride(
    "intro_title",
    "Năng Lực Sản Xuất & Thế Mạnh Nhà Máy PE Foam Đức Phúc"
  );
  const desc = getOverride(
    "intro_desc",
    "Với diện tích nhà máy hơn 10.000m² đặt tại Đức Hòa, Long An, chúng tôi làm chủ 100% quy trình từ khâu nhập khẩu hạt nhựa LDPE nguyên sinh, thổi cuộn, tráng màng OPP đến cắt dập định hình CNC tự động."
  );

  return (
    <section id="gioi-thieu" className="py-16 md:py-24 bg-white text-[#102A43] relative border-b border-[#D9E4EF]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3.5 py-1.5 rounded-full border border-[#0B63CE]/20">
            <Factory className="w-4 h-4 text-[#0B63CE]" />
            NĂNG LỰC NHÀ MÁY ĐỨC PHÚC
          </span>
          <h2
            className="text-[30px] md:text-[40px] font-extrabold text-[#102A43] tracking-tight"
            data-cms-section="intro"
            data-cms-id="intro_title"
            data-cms-type="text"
          >
            {title}
          </h2>
          <p
            className="text-[16px] text-[#6B7C93] leading-relaxed"
            data-cms-section="intro"
            data-cms-id="intro_desc"
            data-cms-type="text"
          >
            {desc}
          </p>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#F7FAFC] rounded-2xl border border-[#D9E4EF] space-y-3 hover:border-[#0B63CE] transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#EAF3FC] text-[#0B63CE] flex items-center justify-center font-bold text-xl">
              01
            </div>
            <h3 className="font-bold text-lg text-[#102A43]">Hạt Nhựa Nguyên Sinh 100%</h3>
            <p className="text-xs text-[#6B7C93] leading-relaxed">
              Sử dụng hạt nhựa LDPE nhập khẩu chính ngạch, không pha tạp chất bẩn, đảm bảo độ dẻo dai và an toàn thực phẩm.
            </p>
          </div>

          <div className="p-6 bg-[#F7FAFC] rounded-2xl border border-[#D9E4EF] space-y-3 hover:border-[#0B63CE] transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#EAF3FC] text-[#0B63CE] flex items-center justify-center font-bold text-xl">
              02
            </div>
            <h3 className="font-bold text-lg text-[#102A43]">Cắt Dập Định Hình CNC</h3>
            <p className="text-xs text-[#6B7C93] leading-relaxed">
              Máy cắt dập tự động lập trình CNC tạo khay mút định hình ôm sát sản phẩm linh kiện điện tử, thủy tinh, gốm sứ.
            </p>
          </div>

          <div className="p-6 bg-[#F7FAFC] rounded-2xl border border-[#D9E4EF] space-y-3 hover:border-[#0B63CE] transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#EAF3FC] text-[#0B63CE] flex items-center justify-center font-bold text-xl">
              03
            </div>
            <h3 className="font-bold text-lg text-[#102A43]">Chứng Nhận SGS & ISO</h3>
            <p className="text-xs text-[#6B7C93] leading-relaxed">
              Đạt tiêu chuẩn ISO 9001:2015, SGS REACH 235 SVHC & RoHS 2.0 đủ điều kiện xuất khẩu sang các thị trường khó tính.
            </p>
          </div>

          <div className="p-6 bg-[#F7FAFC] rounded-2xl border border-[#D9E4EF] space-y-3 hover:border-[#0B63CE] transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-[#EAF3FC] text-[#0B63CE] flex items-center justify-center font-bold text-xl">
              04
            </div>
            <h3 className="font-bold text-lg text-[#102A43]">Giá Gốc Tại Nhà Máy</h3>
            <p className="text-xs text-[#6B7C93] leading-relaxed">
              Cung cấp trực tiếp từ xưởng không qua trung gian, chiết khấu hấp dẫn cho các đại lý & đơn hàng công nghiệp B2B.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
