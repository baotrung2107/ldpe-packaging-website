"use client";

import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import SmartTextRenderer from "@/components/SmartTextRenderer";

export default function FinalCtaSection() {
  const { getOverride } = useCMS();

  const ctaTitle = getOverride("final_cta_title", "Đừng để bao bì trở thành điểm yếu của một sản phẩm tốt");
  const ctaSubtext = getOverride(
    "final_cta_subtext",
    "Một giải pháp LDPE hoặc PE foam phù hợp giúp sản phẩm được bảo vệ tốt hơn, đóng gói nhanh hơn và đến tay khách hàng trong trạng thái chỉn chu hơn."
  );
  const phone = getOverride("nav_phone", "083 572 6666");

  return (
    <section className="py-16 md:py-24 bg-[#062B4F] text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#0B63CE]/20 border border-[#0B63CE]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#EAF3FC] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#0B63CE]" />
          <span>BẢO VỆ TOÀN DIỆN THƯƠNG HIỆU</span>
        </div>

        {/* H2 Title with Smart Text Wrapping */}
        <h2
          className="text-[30px] md:text-[40px] font-bold leading-snug text-white max-w-3xl mx-auto [text-wrap:balance]"
          data-cms-section="final_cta"
          data-cms-id="final_cta_title"
          data-cms-type="text"
        >
          {ctaTitle}
        </h2>

        {/* Subtext Paragraph */}
        <div
          className="text-[16px] md:text-[17px] text-[#D9E4EF] max-w-2xl mx-auto leading-relaxed"
          data-cms-section="final_cta"
          data-cms-id="final_cta_subtext"
          data-cms-type="text"
        >
          <SmartTextRenderer text={ctaSubtext} />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a href="#bao-gia" className="btn-primary w-full sm:w-auto group">
            <span>Nhận tư vấn giải pháp</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>

          <a href="#bao-gia" className="btn-secondary w-full sm:w-auto">
            <span>Gửi mẫu để nhận báo giá</span>
          </a>
        </div>

        {/* Price Info Notice */}
        <div className="pt-6 border-t border-[#103E6B] max-w-xl mx-auto">
          <p className="text-xs md:text-sm text-[#D9E4EF] font-medium flex items-center justify-center gap-2 [text-wrap:pretty]">
            <PhoneCall className="w-4 h-4 text-[#0B63CE] shrink-0" />
            <span>
              Liên hệ hotline <strong className="text-white">{phone}</strong> để được tư vấn và báo giá theo kích thước, vật liệu, sản lượng và yêu cầu gia công.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
