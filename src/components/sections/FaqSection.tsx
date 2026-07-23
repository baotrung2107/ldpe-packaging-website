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
        "Cả hai đều thuộc nhóm polyethylene nhưng có cấu trúc và đặc tính khác nhau. LDPE mềm và dễ gia công, trong khi LLDPE thường có độ dai và khả năng chịu kéo tốt hơn.",
    },
    {
      question: "LDPE và HDPE khác nhau thế nào?",
      answer:
        "LDPE mềm, linh hoạt và thường được dùng cho màng hoặc túi mềm. HDPE cứng và có mật độ cao hơn, thường được dùng cho chai, can, thùng hoặc các sản phẩm cần độ cứng.",
    },
    {
      question: "PE foam có phải là LDPE không?",
      answer:
        "Nhiều loại PE foam dùng trong đóng gói được sản xuất từ polyethylene, trong đó LDPE là một nguyên liệu phổ biến. Tuy nhiên, tính năng cuối cùng còn phụ thuộc vào mật độ xốp.",
    },
  ]);

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-t border-[#D9E4EF]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3 py-1 rounded-full border border-[#D9E4EF]">
            GIẢI ĐÁP KỸ THUẬT
          </span>
          <h2
            className="text-[30px] md:text-[40px] font-bold text-[#102A43]"
            data-cms-section="faq"
            data-cms-id="faq_title"
            data-cms-type="text"
          >
            {faqTitle}
          </h2>
          <p className="text-[16px] md:text-[17px] text-[#40566F]">
            Các câu hỏi thường gặp giúp doanh nghiệp lựa chọn đúng quy cách vật liệu bao bì.
          </p>
        </div>

        <div className="space-y-4">
          {faqsList.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#F7FAFC] rounded-2xl border border-[#D9E4EF] overflow-hidden transition-all duration-200"
                data-cms-section="faq"
                data-cms-id={`faq_item_${idx}`}
                data-cms-type="repeater"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#102A43] text-lg hover:text-[#0B63CE] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#0B63CE] shrink-0" />
                    <span
                      data-cms-section="faq"
                      data-cms-id={`faq_question_${idx}`}
                      data-cms-type="text"
                    >
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6B7C93] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0B63CE]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    className="px-5 pb-5 pt-1 text-[15px] text-[#40566F] leading-relaxed border-t border-[#D9E4EF]/60 bg-white"
                    data-cms-section="faq"
                    data-cms-id={`faq_answer_${idx}`}
                    data-cms-type="rich_text"
                  >
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
