"use client";

import { useCMS } from "@/context/CMSContext";
import { ShieldCheck, Zap, DollarSign, Award, Layers, Sparkles } from "lucide-react";

export default function BenefitsSection() {
  const { getOverride } = useCMS();

  const title = getOverride("benefits_title", "Tại Sao Hơn 500+ Doanh Nghiệp Chọn ĐỨC PHÚC PE FOAM?");

  return (
    <section className="py-16 md:py-24 bg-[#F7FAFC] text-[#102A43] border-b border-[#D9E4EF]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3.5 py-1.5 rounded-full border border-[#0B63CE]/20">
            <Sparkles className="w-4 h-4 text-[#0B63CE]" />
            LỢI THẾ CẠNH TRANH VƯỢT TRỘI
          </span>
          <h2
            className="text-[30px] md:text-[38px] font-extrabold text-[#102A43] tracking-tight"
            data-cms-section="benefits"
            data-cms-id="benefits_title"
            data-cms-type="text"
          >
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#D9E4EF] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF3FC] text-[#0B63CE] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#102A43]">Bảo Vệ Hàng Hóa Tuyệt Đối</h3>
            <p className="text-xs text-[#6B7C93] leading-relaxed">
              Màng LDPE dẻo dai chống thấm nước và xốp PE Foam đàn hồi cao hấp thụ 99% chấn động va đập trong quá trình vận chuyển đường dài.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#D9E4EF] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF3FC] text-[#0B63CE] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#102A43]">Tối Ưu Chi Phí Đóng Gói</h3>
            <p className="text-xs text-[#6B7C93] leading-relaxed">
              Nhà máy sản xuất trực tiếp quy mô lớn giúp tiết kiệm 15% - 25% chi phí bao bì đóng gói so với mua qua các đơn vị thương mại trung gian.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#D9E4EF] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF3FC] text-[#0B63CE] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#102A43]">Tiến Độ Giao Hàng Nhanh 24/7</h3>
            <p className="text-xs text-[#6B7C93] leading-relaxed">
              Dây chuyền hoạt động liên tục 24/7 với kho bãi lớn luôn sẵn hàng mẫu tiêu chuẩn, giao hàng siêu tốc khu vực Long An, TP.HCM & Bình Dương.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
