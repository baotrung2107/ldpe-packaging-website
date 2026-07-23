import { CheckCircle, ShieldCheck } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    "Tư vấn vật liệu theo sản phẩm thực tế.",
    "Lựa chọn kích thước và độ dày phù hợp.",
    "Giảm khoảng trống và chuyển động trong bao bì.",
    "Hạn chế tình trạng móp, xước, vỡ hoặc biến dạng.",
    "Tối ưu thao tác đóng gói.",
    "Hỗ trợ đồng bộ với dây chuyền sản xuất.",
    "Có thể gia công theo mẫu hoặc bản vẽ.",
    "Chủ động điều chỉnh theo từng nhóm sản phẩm.",
    "Nâng cao trải nghiệm mở hộp của khách hàng.",
    "Góp phần bảo vệ hình ảnh thương hiệu.",
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3 py-1 rounded-full border border-[#D9E4EF]">
            GIÁ TRỊ DOANH NGHIỆP
          </span>
          <h2 className="text-[30px] md:text-[40px] font-bold text-[#102A43]">
            Một giải pháp đóng gói tốt phải bảo vệ được cả sản phẩm và chi phí vận hành
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-[#D9E4EF] hover:border-[#0B63CE] transition-all duration-200 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAF3FC] text-[#0B63CE] flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <p className="text-[15px] font-semibold text-[#102A43] leading-snug">
                  {benefit}
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1.5 text-xs text-[#0B63CE] font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Tiêu chuẩn nhà máy</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
