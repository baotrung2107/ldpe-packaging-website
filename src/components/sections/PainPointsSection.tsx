"use client";

import { useCMS } from "@/context/CMSContext";
import { AlertCircle, ShieldAlert, PackageX, TrendingDown, Clock, HelpCircle } from "lucide-react";

export default function PainPointsSection() {
  const { getOverride } = useCMS();

  const title = getOverride("pain_points_title", "Những Rủi Rộ Thường Gặp Khi Chọn Sai Quy Cách Bao Bì");
  const desc = getOverride(
    "pain_points_desc",
    "Bao bì đóng gói không đúng tỉ trọng hoặc vật liệu bọc lót kéo kém dễ dẫn đến những tổn thất lớn cho doanh nghiệp."
  );

  return (
    <section className="py-16 md:py-24 bg-[#041E38] text-white relative border-b border-[#0B3B6F]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-950/60 px-3.5 py-1.5 rounded-full border border-amber-500/30">
            ⚠️ THÁCH THỨC ĐÓNG GÓI DOANH NGHIỆP
          </span>
          <h2
            className="text-[30px] md:text-[40px] font-extrabold text-white tracking-tight"
            data-cms-section="pain_points"
            data-cms-id="pain_points_title"
            data-cms-type="text"
          >
            {title}
          </h2>
          <p
            className="text-[16px] text-[#D9E4EF] leading-relaxed"
            data-cms-section="pain_points"
            data-cms-id="pain_points_desc"
            data-cms-type="text"
          >
            {desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#062B4F] rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 text-red-400 flex items-center justify-center border border-red-500/30">
              <PackageX className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Trầy Xước & Dập Nát Sản Phẩm</h3>
            <p className="text-xs text-[#D9E4EF] leading-relaxed">
              Mút xốp quá mỏng hoặc không đủ tỉ trọng khiến sản phẩm va đập vào thành thùng carton trong vận chuyển đường xa.
            </p>
          </div>

          <div className="p-6 bg-[#062B4F] rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 text-red-400 flex items-center justify-center border border-red-500/30">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Tốn Kém Chi Phí Đổi Trả</h3>
            <p className="text-xs text-[#D9E4EF] leading-relaxed">
              Hàng hóa bị hư hỏng khi giao đến tay khách dẫn đến chi phí bảo hành, đền bù và ảnh hưởng nghiêm trọng uy tín thương hiệu.
            </p>
          </div>

          <div className="p-6 bg-[#062B4F] rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 text-red-400 flex items-center justify-center border border-red-500/30">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Thao Tác Đóng Gói Chậm</h3>
            <p className="text-xs text-[#D9E4EF] leading-relaxed">
              Không dùng mút dập định hình CNC hoặc túi cắt sẵn khiến công nhân mất nhiều thời gian cắt quấn thủ công rườm rà.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
