import { Layers, ShieldCheck, Cpu, Ruler, Sparkles } from "lucide-react";

export default function IntroSection() {
  return (
    <section className="py-16 md:py-24 bg-[#EAF3FC] border-y border-[#D9E4EF]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Key Message */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold text-[#0B63CE] uppercase tracking-wider bg-white px-3 py-1 rounded-full inline-block border border-[#D9E4EF]">
              KIẾN THỨC VẬT LIỆU
            </span>

            {/* H2 Title - 40px desktop, 30px mobile */}
            <h2 className="text-[30px] md:text-[40px] font-bold text-[#102A43] leading-snug [text-wrap:balance]">
              LDPE là gì?
            </h2>

            <p className="text-[16px] md:text-[17px] text-[#40566F] leading-relaxed">
              LDPE là nhựa polyethylene mật độ thấp, có đặc tính mềm, nhẹ, linh hoạt và dễ gia công. Vật liệu này được sử dụng rộng rãi trong sản xuất màng nhựa, túi đóng gói, bao bì mềm, lớp bảo vệ và nhiều sản phẩm phục vụ công nghiệp, thương mại và đời sống.
            </p>

            <div className="p-4 bg-white rounded-xl border border-[#D9E4EF] shadow-sm space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#102A43] text-sm">
                <Sparkles className="w-4 h-4 text-[#0B63CE]" />
                <span>Giải pháp đa dạng từ LDPE gốc</span>
              </div>
              <p className="text-xs text-[#6B7C93]">
                Từ LDPE, doanh nghiệp có thể phát triển nhiều giải pháp khác nhau như màng cuộn, túi hàn nhiệt, màng co, tấm xốp PE foam, khay chống sốc và chi tiết định hình theo sản phẩm.
              </p>
            </div>
          </div>

          {/* Right Column: Decision Factors Cards */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-[#D9E4EF] shadow-md space-y-6">
            <h3 className="text-[21px] md:text-[24px] font-semibold text-[#102A43] [text-wrap:balance]">
              Các yếu tố quyết định khi lựa chọn <span className="inline-block">giải pháp đóng&nbsp;gói&nbsp;LDPE</span>
            </h3>

            <p className="text-[15px] text-[#40566F]">
              Việc lựa chọn đúng loại vật liệu không chỉ phụ thuộc vào độ dày. Cần xem xét toàn diện các thông số thực tế của sản phẩm và quy trình vận chuyển:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F7FAFC] border border-[#D9E4EF] flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#EAF3FC] text-[#0B63CE] shrink-0">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#102A43] text-sm">Kích thước & Trọng lượng</h4>
                  <p className="text-xs text-[#6B7C93] mt-1">Đánh giá khả năng chịu lực nén, lực kéo dãn và điểm phân bổ trọng lượng.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F7FAFC] border border-[#D9E4EF] flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#EAF3FC] text-[#0B63CE] shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#102A43] text-sm">Độ sắc cạnh & Bề mặt</h4>
                  <p className="text-xs text-[#6B7C93] mt-1">Lựa chọn xốp PE foam lót hoặc khay định hình chống đâm thủng, trầy sơn.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F7FAFC] border border-[#D9E4EF] flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#EAF3FC] text-[#0B63CE] shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#102A43] text-sm">Môi trường lưu kho</h4>
                  <p className="text-xs text-[#6B7C93] mt-1">Khả năng chống ẩm, bụi bẩn, chống tĩnh điện ESD hoặc bảo vệ trong kho lạnh.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F7FAFC] border border-[#D9E4EF] flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#EAF3FC] text-[#0B63CE] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#102A43] text-sm">Quãng đường vận chuyển</h4>
                  <p className="text-xs text-[#6B7C93] mt-1">Tính toán độ dày vật liệu chống xóc nẩy qua nhiều chặng giao vận.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
