import { AlertTriangle, ShieldCheck, HeartHandshake } from "lucide-react";

export default function PainPointsSection() {
  const painPoints = [
    "Sản phẩm bị móp, xước, nứt hoặc vỡ trong quá trình vận chuyển.",
    "Kích thước túi hoặc khay không vừa với sản phẩm.",
    "Vật liệu quá mỏng, không đủ khả năng bảo vệ.",
    "Vật liệu quá dày, làm tăng chi phí không cần thiết.",
    "Đường hàn không ổn định, bao bì dễ bung hoặc rách.",
    "Đóng gói mất nhiều thời gian, làm chậm dây chuyền sản xuất.",
    "Khách hàng trả hàng hoặc đánh giá không tốt.",
    "Hình ảnh và uy tín thương hiệu bị ảnh hưởng.",
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        {/* Section Header (Fixed "xốp, mà" line break splitting!) */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>RỦI RO THƯỜNG GẶP TRONG ĐÓNG GÓI</span>
          </div>

          <h2 className="text-[30px] md:text-[40px] font-bold text-[#102A43] leading-snug [text-wrap:balance]">
            <span className="inline-block">Chi&nbsp;phí lớn&nbsp;nhất không nằm ở miếng&nbsp;xốp,</span>{" "}
            <span className="inline-block">mà ở sản&nbsp;phẩm bị hỏng</span>{" "}
            <span className="inline-block">khi đến&nbsp;tay khách&nbsp;hàng</span>
          </h2>

          <p className="text-[16px] md:text-[17px] text-[#40566F] [text-wrap:pretty]">
            Một phương án đóng gói không phù hợp có thể dẫn đến những tổn hại trực tiếp về chi phí và thương hiệu:
          </p>
        </div>

        {/* 8 Pain points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-[#F7FAFC] border border-[#D9E4EF] hover:border-[#0B63CE] transition-all duration-200 hover:shadow-md flex items-start gap-3 group"
            >
              <span className="w-7 h-7 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0B63CE] group-hover:text-white transition-colors">
                0{index + 1}
              </span>
              <p className="text-[15px] text-[#102A43] font-medium leading-relaxed [text-wrap:pretty]">
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* Message Banner with Clean Non-Breaking Lines */}
        <div className="bg-[#062B4F] text-white p-6 md:p-8 rounded-2xl border border-[#103E6B] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#0B63CE] rounded-xl shrink-0">
              <HeartHandshake className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white [text-wrap:balance]">
                Bảo vệ sản phẩm cũng chính là bảo vệ trải nghiệm khách hàng và <span className="inline-block">giá&nbsp;trị thương&nbsp;hiệu.</span>
              </h3>
              <p className="text-sm text-[#D9E4EF] mt-1 [text-wrap:pretty]">
                Liên hệ đội ngũ chuyên gia để đo đạc và đưa ra thiết kế bao bì tối ưu cho doanh nghiệp của bạn.
              </p>
            </div>
          </div>

          <a href="#bao-gia" className="btn-primary shrink-0 whitespace-nowrap">
            Tư vấn giải pháp ngay
          </a>
        </div>
      </div>
    </section>
  );
}
