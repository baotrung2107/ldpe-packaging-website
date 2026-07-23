"use client";

import { useState } from "react";
import { Package, Layers, ShieldCheck, Wrench, ArrowRight, Check, Sparkles, Box, Grid } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

export default function ProductCatalogSection({ onSelectProduct }: { onSelectProduct?: (productTitle: string) => void }) {
  const { getOverride } = useCMS();

  const catalogTitle = getOverride("catalog_title", "Danh Mục Sản Phẩm LDPE & Xốp PE Foam Nhà Máy Đức Phúc");

  // Real product catalog derived from "DANH MỤC HÀNG HÓA Công ty.xlsx" & LDPE folder photos
  const productsList = getOverride<any[]>("products_list", [
    {
      id: "mang-tui-ldpe",
      title: "Màng & Túi LDPE Công Nghiệp",
      description: "Sản xuất từ hạt nhựa LDPE nguyên sinh (2426H, 2427H). Màng nhựa dẻo dai, chống thấm nước, bảo vệ bề mặt linh kiện và sản phẩm khỏi bụi bẩn, độ ẩm.",
      image: "/images/ldpe/mang-ldpe.png",
      applications: "Bọc nguyên liệu, lót thùng hàng, bao bọc thiết bị máy móc, linh kiện điện tử, hàng xuất khẩu.",
      customizations: [
        "Cuộn khổ 1.05m - 1.4m - 1.6m",
        "Độ dày 0.5mm, 1mm, 2mm, 3mm, 5mm",
        "Túi LDPE cắt theo kích thước",
        "Màu sắc trong suốt hoặc đục"
      ],
      skusSample: ["Hạt nhựa LDPE 2426H/2427H", "Cuộn màng 0.5mm*1.4m*600m", "Màng LDPE 2mm*105cm*150m"],
      cta: "Tư vấn khổ cuộn & độ dày túi LDPE",
      icon: Package,
      featured: false,
    },
    {
      id: "cuon-tam-pe-foam",
      title: "Cuộn & Tấm PE Foam Chống Sốc",
      description: "Xốp PE Foam cấu trúc bọt khí khép kín, trọng lượng nhẹ, độ đàn hồi cao giúp hấp thụ chấn động vượt trội khi vận chuyển đường dài.",
      image: "/images/ldpe/pe-foam-cuon.png",
      applications: "Quấn bao bọc đồ gỗ, kính, thiết bị điện tử, đồ gia dụng, lót chống xước bề mặt linh kiện.",
      customizations: [
        "Độ dày từ 0.5mm đến 100mm (10cm)",
        "Gia công cắt tấm theo quy cách",
        "Cuộn chống sốc khổ rộng 1m - 1.6m",
        "Tráng màng nilon chống bám bụi"
      ],
      skusSample: ["PE Foam 1mm*1.05m*300m", "Tấm PE Foam 10mm*100mm*635mm", "Tấm xốp dầy 20mm*1600mm*2000mm"],
      cta: "Chọn độ dày xốp PE Foam phù hợp",
      icon: Layers,
      featured: true,
    },
    {
      id: "mut-epe-dinh-hinh",
      title: "Mút Định Hình EPE / PE Foam CNC",
      description: "Gia công dập dán, cắt rãnh CNC theo hình dáng 3D thực tế của sản phẩm. Giúp cố định hàng hóa tuyệt đối trong hộp carton hay vali bảo vệ.",
      image: "/images/ldpe/pe-foam-dinh-hinh.png",
      applications: "Bảo vệ máy đo chính xác, kính hiển vi, linh kiện cơ khí, đồ sứ cao cấp, chai vang, mỹ phẩm quà tặng.",
      benefits: "Ôm sát từng đường nét sản phẩm, xếp gọn dễ kiểm đếm, tạo cảm giác mở hộp cực kỳ sang trọng.",
      customizations: [
        "Mút EPE độ dầy 0.3cm - 5cm",
        "Khay xốp CNC định hình 20mm*185mm",
        "Xốp ESD chống tĩnh điện màu hồng",
        "Gia công theo bản vẽ CAD/PDF"
      ],
      skusSample: ["Mút EPE 0.3cm*66cm*50cm", "Mút PE Foam định hình 40mm*305mm*470mm"],
      cta: "Gửi mẫu để thiết kế khay định hình",
      icon: Sparkles,
      featured: true,
    },
    {
      id: "ong-mut-nep-goc",
      title: "Ống Mút & Nẹp Góc PE Foam Chữ U/L",
      description: "Thanh nẹp xốp chữ U, chữ L và ống mút tròn rỗng chuyên dụng để bọc bảo vệ cạnh sắc, viền kính và góc bàn ghế gỗ chống móp trầy.",
      image: "/images/ldpe/ong-mut-nep-goc.png",
      applications: "Nẹp cạnh cửa gỗ, góc tấm kính cường lực, viền khung tranh, chân bàn ghế, khung kim loại xuất khẩu.",
      customizations: [
        "Ống rỗng Ø20mm, Ø30mm, Ø50mm, Ø80mm",
        "Nẹp chữ U 35*70*10mm*1900mm",
        "Nẹp góc chữ L 30mm*100*100mm",
        "Màu sắc: Trắng, Xám, Xanh lá"
      ],
      skusSample: ["Ống chữ U 35*70*10mm*1900mm", "Ống EPE Ø60mm*Ø80mm Trắng", "Nẹp L30*100*100mm"],
      cta: "Tư vấn nẹp góc & ống mút xốp",
      icon: Wrench,
      featured: false,
    },
    {
      id: "nem-pe-foam-g3",
      title: "Nệm PE Foam G3 Đa Năng (2.5F - 10F)",
      description: "Dòng nệm PE Foam G3 nén tỷ trọng cao, cấu trúc 3 gấp thông minh. Độ êm ái đàn hồi tốt, không sụt lún, phù hợp cho nhà ở, ký túc xá, kho lạnh.",
      image: "/images/ldpe/nem-pe-foam.png",
      applications: "Nệm nghỉ trưa văn phòng, nệm trải sàn gia đình, nệm trải kho lạnh, xuất khẩu Hàn Quốc/Nhật Bản.",
      customizations: [
        "Khổ giường 1m2 - 1m4 - 1m6 - 1m8",
        "Độ dày 2.5F (2.5cm), 4F, 5F, 10F (10cm)",
        "Áo nệm vải thun/kaki có dây kéo",
        "Thiết kế 3 gấp gọn nhẹ"
      ],
      skusSample: ["PE FOAM G3 2.5F*1m6 (NỆM)", "PE FOAM G3 5F*1m8 (NỆM)", "PE FOAM G3 10F*1m6 (NỆM)"],
      cta: "Báo giá sỉ Nệm PE Foam G3",
      icon: Box,
      featured: false,
    },
    {
      id: "gia-cong-ldpe-b2b",
      title: "Gia Công LDPE & PE Foam Theo Đơn Đặt Hàng",
      description: "Cung cấp trọn gói dịch vụ cắt chia khổ, ép nhiệt, dán màng bọc, đục lỗ xả khí, sản xuất túi zipper và cắt khay mẫu thử miễn phí.",
      image: "/images/ldpe/gia-cong-cnc.png",
      applications: "Cung ứng vật tư quy mô lớn cho các nhà máy tại KCN Tân Bình, Tiên Sơn, VSIP, Amata, Nhơn Trạch...",
      customizations: [
        "Nhận bản vẽ 2D / 3D CAD",
        "Gửi mẫu thử nghiệm tận nơi",
        "Hỗ trợ đơn hàng gấp trong 24h",
        "Đáp ứng chuẩn ISO & RoHS"
      ],
      skusSample: ["Gia công màng LDPE cuộn lớn", "Sản xuất khay định hình linh kiện máy"],
      cta: "Gửi bản vẽ nhận báo giá gia công",
      icon: Grid,
      featured: true,
    },
  ]);

  const handleCtaClick = (title: string) => {
    if (onSelectProduct) {
      onSelectProduct(title);
    }
    const target = document.getElementById("bao-gia");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="san-pham" className="py-16 md:py-24 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3.5 py-1 rounded-full border border-[#D9E4EF]">
            DANH MỤC HÀNG HÓA & SẢN XUẤT NHÀ MÁY ĐỨC PHÚC
          </span>
          <h2 className="text-[30px] md:text-[40px] font-bold text-[#102A43]">
            {catalogTitle}
          </h2>
          <p className="text-[16px] md:text-[17px] text-[#40566F]">
            Tất cả quy cách màng LDPE, cuộn mút PE Foam, nẹp góc và khay xốp định hình được sản xuất trực tiếp từ quy trình hiện đại, đáp ứng mọi chuẩn tiêu chuẩn đóng gói B2B.
          </p>
        </div>

        {/* Product Grid with Images (Bento Card Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsList.map((p, idx) => {
            const Icon = p.icon || Package;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group ${
                  p.featured ? "border-[#0B63CE] ring-1 ring-[#0B63CE]/30 shadow-md" : "border-[#D9E4EF]"
                }`}
              >
                {/* Product Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#062B4F]">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#6B7C93] text-xs">
                      [Hình ảnh sản phẩm]
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/80 via-transparent to-transparent" />

                  {p.featured && (
                    <span className="absolute top-3 right-3 bg-[#0B63CE] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                      SẢN XUẤT HOT
                    </span>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] text-[#EAF3FC] font-semibold tracking-wider uppercase bg-[#062B4F]/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      NHÀ MÁY ĐỨC PHÚC
                    </span>
                  </div>
                </div>

                {/* Product Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EAF3FC] text-[#0B63CE] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-[20px] font-bold text-[#102A43] leading-snug">
                        {p.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-[14px] text-[#40566F] leading-relaxed">
                      {p.description}
                    </p>

                    {/* Benefit notice if any */}
                    {p.benefits && (
                      <div className="p-3 rounded-lg bg-[#EAF3FC]/80 border border-[#D9E4EF] text-xs text-[#102A43] font-medium leading-relaxed">
                        💡 {p.benefits}
                      </div>
                    )}

                    {/* Customizations */}
                    {p.customizations && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-semibold text-[#102A43] uppercase tracking-wider block">
                          Quy cách tùy chỉnh:
                        </span>
                        <div className="grid grid-cols-2 gap-1.5 text-xs text-[#40566F]">
                          {p.customizations.map((item: string, i: number) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#0B63CE] shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sample SKUs from Company Catalog */}
                    {p.skusSample && (
                      <div className="bg-[#F7FAFC] p-2.5 rounded-lg border border-[#D9E4EF]/80 space-y-1">
                        <span className="text-[11px] font-bold text-[#6B7C93] uppercase tracking-wider block">
                          Quy cách SKU mẫu:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {p.skusSample.map((sku: string, sIdx: number) => (
                            <span
                              key={sIdx}
                              className="bg-white border border-[#D9E4EF] text-[#102A43] text-[10px] px-2 py-0.5 rounded font-mono"
                            >
                              {sku}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 border-t border-[#D9E4EF] mt-4">
                    <button
                      onClick={() => handleCtaClick(p.title)}
                      className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2 group"
                    >
                      <span>{p.cta || "Nhận báo giá ngay"}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
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
