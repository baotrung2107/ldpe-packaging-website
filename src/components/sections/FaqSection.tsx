"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { getOverride } = useCMS();

  const faqTitle = getOverride("faq_title", "Kiến thức vật liệu & Giải đáp thắc mắc LDPE");
  const faqsList = getOverride<any[]>("faq_list", [
    {
      question: "LDPE và LLDPE có giống nhau không?",
      answer:
        "Cả hai đều thuộc nhóm polyethylene nhưng có cấu trúc và đặc tính khác nhau. LDPE mềm và dễ gia công, trong khi LLDPE thường có độ dai và khả năng chịu kéo tốt hơn. Vật liệu phù hợp phải được lựa chọn theo sản phẩm và mục đích sử dụng.",
    },
    {
      question: "LDPE và HDPE khác nhau thế nào?",
      answer:
        "LDPE mềm, linh hoạt và thường được dùng cho màng hoặc túi mềm. HDPE cứng và có mật độ cao hơn, thường được dùng cho chai, can, thùng hoặc các sản phẩm cần độ cứng.",
    },
    {
      question: "PE foam có phải là LDPE không?",
      answer:
        "Nhiều loại PE foam dùng trong đóng gói được sản xuất từ polyethylene, trong đó LDPE là một nguyên liệu phổ biến. Tuy nhiên, tính năng cuối cùng còn phụ thuộc vào mật độ xốp, độ dày, cấu trúc bọt và quy trình sản xuất.",
    },
    {
      question: "Có phải vật liệu càng dày càng bảo vệ tốt?",
      answer:
        "Không hoàn toàn. Khả năng bảo vệ phụ thuộc vào cấu trúc vật liệu, mật độ, diện tích tiếp xúc, trọng lượng sản phẩm và vị trí chịu va đập. Vật liệu quá dày có thể làm tăng chi phí nhưng chưa chắc giải quyết đúng điểm rủi ro.",
    },
    {
      question: "LDPE có thể tái chế không?",
      answer:
        "LDPE thuộc nhóm nhựa có thể tái chế. Tuy nhiên, khả năng thu gom và tái chế thực tế phụ thuộc vào độ sạch của vật liệu, cấu trúc sản phẩm và hệ thống thu gom tại từng khu vực.",
    },
    {
      question: "Có thể in logo lên túi LDPE không?",
      answer:
        "Có thể gia công in logo, thông tin sản phẩm hoặc hướng dẫn sử dụng tùy theo loại túi, màu sắc, số lượng và công nghệ in.",
    },
  ]);

  return (
    <section id="kien-thuc" className="py-12 md:py-24 bg-white border-t border-[#D9E4EF]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-8 sm:space-y-12">
        <div className="text-center space-y-3 sm:space-y-4">
          <span className="text-[11px] sm:text-xs font-semibold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3 py-1 rounded-full border border-[#D9E4EF]">
            GIẢI ĐÁP KỸ THUẬT
          </span>
          <h2
            className="text-[24px] sm:text-[30px] md:text-[40px] font-bold text-[#102A43] [text-wrap:balance]"
            data-cms-section="faq"
            data-cms-id="faq_title"
            data-cms-type="text"
          >
            {faqTitle.includes("Giải") ? (
              <>
                <span className="sm:inline-block">Kiến&nbsp;thức vật&nbsp;liệu</span> &amp;{" "}
                <span className="sm:inline-block">Giải&nbsp;đáp thắc&nbsp;mắc&nbsp;LDPE</span>
              </>
            ) : (
              faqTitle
            )}
          </h2>
          <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#40566F] [text-wrap:pretty]">
            Các câu hỏi thường gặp giúp doanh nghiệp lựa chọn đúng quy cách vật liệu bao bì.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqsList.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#F7FAFC] rounded-2xl border border-[#D9E4EF] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 font-bold text-[#102A43] text-base sm:text-lg hover:text-[#0B63CE] transition-colors"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B63CE] shrink-0" />
                    <span className="[text-wrap:balance]">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#6B7C93] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0B63CE]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-[14px] sm:text-[15px] text-[#40566F] leading-relaxed border-t border-[#D9E4EF]/60 bg-white [text-wrap:pretty]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
