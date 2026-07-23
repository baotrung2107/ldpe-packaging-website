import { Cpu, Wine, Home, ShoppingBag, Factory, Snowflake, Activity } from "lucide-react";

export default function IndustrySolutionsSection() {
  const industries = [
    {
      title: "Điện tử & Linh kiện tinh vi",
      desc: "Hạn chế trầy xước, rung lắc và chống tĩnh điện ESD cho vi mạch, bo mạch, màn hình & thiết bị điện tử trong lưu kho và vận chuyển.",
      image: "/images/ldpe/industry-electronics.png",
      products: "Khay xốp PE Foam định hình ESD màu hồng/trắng, túi LDPE anti-static, xốp nẹp bảo vệ.",
      icon: Cpu,
    },
    {
      title: "Kính, Gốm sứ & Hàng dễ vỡ",
      desc: "Tăng khả năng bảo vệ cạnh, góc và bề mặt của kính kiến trúc, gốm sứ tinh xảo trước tác động rung lắc bốc xếp.",
      image: "/images/ldpe/industry-glass.png",
      products: "Nẹp góc PE foam chữ U/L, ống xốp bọc cạnh kính, cuộn màng xốp bọc chèn.",
      icon: Wine,
    },
    {
      title: "Nội thất & Gỗ xuất khẩu",
      desc: "Bảo vệ bề mặt sơn pu, cạnh góc bàn tủ gỗ, kính và mặt đá cao cấp khỏi trầy xước va đập đường xa.",
      image: "/images/ldpe/industry-furniture.png",
      products: "Nẹp góc PE foam bọc cạnh gỗ, màng LDPE phủ chống trầy xước, cuộn PE foam lót mặt.",
      icon: Home,
    },
    {
      title: "Thương mại điện tử & Logistics",
      desc: "Tối ưu thao tác đóng gói nhanh, giảm khoảng trống trong thùng carton và bảo vệ an toàn cho đơn hàng ship COD.",
      image: "/images/ldpe/industry-ecommerce.png",
      products: "Túi LDPE niêm phong tự dính, túi xốp bọt khí bọc hàng, màng bóng khí bảo vệ.",
      icon: ShoppingBag,
    },
    {
      title: "Cơ khí & Chế tạo máy",
      desc: "Bảo vệ chi tiết máy kim loại đắt tiền, động cơ và linh kiện cơ khí nặng chống gỉ sét, trầy xước & biến dạng.",
      image: "/images/ldpe/industry-machinery.png",
      products: "Khay xốp PE foam tỉ trọng cao dập định hình, màng LDPE bọc kín chống ẩm bụi.",
      icon: Factory,
    },
    {
      title: "Nông nghiệp & Thực phẩm lạnh",
      desc: "Màng bọc LDPE bảo quản độ ẩm và lót xốp lưới bảo vệ trái cây hoa quả nông sản xuất khẩu tránh dập nát.",
      image: "/images/ldpe/industry-agri.png",
      products: "Màng LDPE phủ nông nghiệp/kho lạnh, xốp lưới PE lót trái cây xuất khẩu.",
      note: "Lưu ý: Vật liệu LDPE thực phẩm cần được xác minh tiêu chuẩn vệ sinh an toàn và điều kiện sử dụng cụ thể.",
      icon: Snowflake,
    },
    {
      title: "Y tế & Thiết bị đo lường",
      desc: "Định hình vô trùng, chống va đập tuyệt đối cho dụng cụ đo lường chính xác, thiết bị y tế và máy y khoa cao cấp.",
      image: "/images/ldpe/industry-medical.png",
      products: "Khay xốp định hình CNC trắng vô trùng, hộp xốp chèn thiết bị đo lường.",
      icon: Activity,
    },
  ];

  return (
    <section id="giai-phap" className="py-16 md:py-24 bg-white border-y border-[#D9E4EF]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3 py-1 rounded-full border border-[#D9E4EF]">
            ỨNG DỤNG THỰC TẾ TRONG CÔNG NGHIỆP
          </span>
          <h2 className="text-[30px] md:text-[40px] font-bold text-[#102A43]">
            Giải pháp bảo vệ theo từng ngành hàng
          </h2>
          <p className="text-[16px] md:text-[17px] text-[#40566F]">
            Mỗi nhóm sản phẩm có đặc tính cơ lý riêng. Chúng tôi thiết kế cấu trúc xốp và màng tương ứng với đặc thù đóng gói của từng ngành.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="bg-[#F7FAFC] rounded-2xl overflow-hidden border border-[#D9E4EF] hover:border-[#0B63CE] transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#062B4F]">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-transparent to-transparent opacity-75" />

                  <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-white/10 backdrop-blur-md text-[#EAF3FC] border border-white/20">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-[20px] font-bold text-[#102A43]">
                      {ind.title}
                    </h3>

                    <p className="text-[14px] text-[#40566F] leading-relaxed">
                      {ind.desc}
                    </p>

                    <div className="bg-white p-3 rounded-xl border border-[#D9E4EF] space-y-1">
                      <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider block">
                        Sản phẩm đề xuất:
                      </span>
                      <p className="text-xs text-[#0B63CE] font-semibold">
                        {ind.products}
                      </p>
                    </div>

                    {ind.note && (
                      <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs leading-relaxed font-medium">
                        ⚠️ {ind.note}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#D9E4EF] flex items-center justify-between text-xs text-[#6B7C93]">
                    <span>Hỗ trợ đo mẫu tận nơi</span>
                    <a href="#bao-gia" className="text-[#0B63CE] font-semibold hover:underline flex items-center gap-1">
                      Nhận tư vấn ngành →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
