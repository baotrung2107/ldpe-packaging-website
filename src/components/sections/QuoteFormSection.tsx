"use client";

import { useState, useEffect } from "react";
import { useCMS } from "@/context/CMSContext";
import { Send, CheckCircle2, PhoneCall, ShieldCheck, Clock } from "lucide-react";

interface QuoteFormSectionProps {
  preselectedProduct?: string;
}

export default function QuoteFormSection({ preselectedProduct }: QuoteFormSectionProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(preselectedProduct || "Cuộn & Tấm PE Foam Chống Sốc");
  const { getOverride } = useCMS();

  useEffect(() => {
    if (preselectedProduct) {
      setSelectedProduct(preselectedProduct);
    }
  }, [preselectedProduct]);

  const title = getOverride("form_title", "Yêu cầu tư vấn & báo giá PE Foam / LDPE");
  const submitBtn = getOverride("form_submit_btn", "GỬI YÊU CẦU BÁO GIÁ NGAY");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="bao-gia" className="py-16 md:py-24 bg-[#F7FAFC] text-[#102A43] border-t border-[#D9E4EF] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Form Header & Contact info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3.5 py-1.5 rounded-full border border-[#0B63CE]/20">
            <PhoneCall className="w-4 h-4 text-[#0B63CE]" />
            BÁO GIÁ SỈ TRỰC TIẾP TỪ NHÀ MÁY
          </div>

          <h2
            className="text-[30px] md:text-[38px] font-extrabold text-[#102A43] tracking-tight leading-tight"
            data-cms-section="quote_form"
            data-cms-id="form_title"
            data-cms-type="text"
          >
            {title}
          </h2>

          <p className="text-[15px] text-[#6B7C93] leading-relaxed">
            Điền thông tin quy cách sản phẩm (kích thước, độ dày, số lượng) để nhận bảng báo giá chi tiết và mẫu thử miễn phí gửi tận nơi trong 24 giờ.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-[#102A43]">
                Cam kết giá gốc tại nhà máy sản xuất không qua trung gian.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-[#102A43]">
                Gửi mẫu thử PE Foam / LDPE miễn phí trước khi sản xuất hàng loạt.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-[#102A43]">
                Hỗ trợ kỹ thuật đo mẫu & thiết kế khay mút CNC theo bản vẽ.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Quote Form Card */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-[#D9E4EF] shadow-xl">
          {formSubmitted ? (
            <div className="text-center py-12 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#102A43]">Đã gửi yêu cầu báo giá thành công!</h3>
              <p className="text-xs text-[#6B7C93] max-w-md mx-auto">
                Chuyên viên tư vấn Nhà máy Đức Phúc sẽ liên hệ với bạn qua điện thoại/Zalo trong vòng 15 phút.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Gửi yêu cầu khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1">
                    Họ và tên người liên hệ *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1">
                    Số điện thoại / Zalo *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0900 000 000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1">
                    Tên công ty / Doanh nghiệp
                  </label>
                  <input
                    type="text"
                    placeholder="Công ty TNHH ..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#102A43] mb-1">
                    Sản phẩm quan tâm *
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                  >
                    <option>Cuộn & Tấm PE Foam Chống Sốc</option>
                    <option>Màng & Túi LDPE Công Nghiệp</option>
                    <option>Mút Định Hình EPE CNC</option>
                    <option>Ống Mút & Nẹp Góc PE Foam</option>
                    <option>Nệm PE Foam G3 Đa Năng</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">
                  Mô tả quy cách (Độ dày, kích thước, số lượng dự kiến)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Cần 50 cuộn PE foam 2mm x 1.05m x 150m giao về Đức Hòa Long An..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3.5 justify-center text-sm font-extrabold shadow-lg shadow-black/20"
                data-cms-section="quote_form"
                data-cms-id="form_submit_btn"
                data-cms-type="button"
              >
                <Send className="w-4 h-4 mr-2" />
                <span>{submitBtn}</span>
              </button>

              <span className="text-[11px] text-[#6B7C93] text-center block pt-1">
                🔒 Cam kết bảo mật 100% thông tin khách hàng doanh nghiệp.
              </span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
