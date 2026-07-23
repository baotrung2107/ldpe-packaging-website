"use client";

import { useCMS } from "@/context/CMSContext";
import { Layers, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

interface ProductCatalogSectionProps {
  onSelectProduct?: (productTitle: string) => void;
}

export default function ProductCatalogSection({ onSelectProduct }: ProductCatalogSectionProps) {
  const { getOverride } = useCMS();

  const title = getOverride("catalog_title", "Danh Mục Sản Phẩm Màng LDPE & Xốp PE Foam Đức Phúc");

  const defaultProducts = [
    {
      title: "Màng & Túi LDPE Công Nghiệp",
      image: "/images/ldpe/mang-ldpe.png",
      desc: "Màng co LDPE, cuộn màng nilông đóng gói hàng hóa, túi LDPE đục lỗ, túi dán keo chống bụi ẩm.",
      cta: "Tư vấn khổ cuộn & độ dày túi LDPE",
    },
    {
      title: "Cuộn & Tấm PE Foam Chống Sốc",
      image: "/images/ldpe/pe-foam-cuon.png",
      desc: "Mút xốp PE foam dạng cuộn, dạng tấm bọc hàng chống va đập độ dày từ 0.5mm, 1mm, 2mm đến 50mm.",
      cta: "Chọn độ dày xốp PE Foam phù hợp",
    },
    {
      title: "Mút Định Hình EPE / PE Foam CNC",
      image: "/images/ldpe/pe-foam-dinh-hinh.png",
      desc: "Khay xốp định hình dập mút EPE dán nhiều lớp bọc hộp quà, linh kiện điện tử, thiết bị y tế.",
      cta: "Gửi mẫu để thiết kế khay định hình",
    },
    {
      title: "Ống Mút & Nẹp Góc PE Foam Chữ U/L",
      image: "/images/ldpe/ong-mut-nep-goc.png",
      desc: "Nẹp góc xốp PE foam chữ U, chữ L bảo vệ cạnh bàn gỗ, gốm sứ, kính và các ống mút xốp tròn.",
      cta: "Tư vấn nẹp góc & ống mút xốp",
    },
    {
      title: "Nệm PE Foam G3 Đa Năng (2.5F - 10F)",
      image: "/images/ldpe/nem-pe-foam.png",
      desc: "Nệm xốp PE foam gấp 3 tiện lợi độ dày từ 2.5cm đến 10cm thích hợp cho ký túc xá, văn phòng.",
      cta: "Báo giá sỉ Nệm PE Foam G3",
    },
    {
      title: "Gia Công LDPE & PE Foam Theo Yêu Cầu",
      image: "/images/ldpe/gia-cong-cnc.png",
      desc: "Gia công cắt cuộn, dập tấm, dán màng OPP cách nhiệt, gia công ép cuộn foam theo kích thước.",
      cta: "Gửi bản vẽ nhận báo giá gia công",
    },
  ];

  const products = getOverride("products_list", defaultProducts);

  return (
    <section id="san-pham" className="py-16 md:py-24 bg-white text-[#102A43] border-b border-[#D9E4EF]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3.5 py-1.5 rounded-full border border-[#0B63CE]/20">
            <Layers className="w-4 h-4 text-[#0B63CE]" />
            DANH MỤC SẢN PHẨM CHÍNH
          </span>
          <h2
            className="text-[30px] md:text-[40px] font-extrabold text-[#102A43] tracking-tight"
            data-cms-section="products"
            data-cms-id="catalog_title"
            data-cms-type="text"
          >
            {title}
          </h2>
          <p className="text-[16px] text-[#6B7C93] leading-relaxed">
            Dây chuyền sản xuất đa dạng quy cách màng cuộn LDPE, xốp PE foam chống tĩnh điện ESD, khay định hình CNC tự động.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item: any, idx: number) => (
            <div
              key={idx}
              className="bg-[#F7FAFC] rounded-2xl overflow-hidden border border-[#D9E4EF] hover:border-[#0B63CE] transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
              data-cms-section="products"
              data-cms-id={`product_item_${idx}`}
              data-cms-type="repeater"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border-b border-[#D9E4EF]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-cms-section="products"
                  data-cms-id={`product_image_${idx}`}
                  data-cms-type="image"
                />
                <div className="absolute top-3 left-3 bg-[#062B4F] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                  B2B ĐỨC PHÚC
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3
                    className="text-[18px] font-bold text-[#102A43] group-hover:text-[#0B63CE] transition-colors leading-snug"
                    data-cms-section="products"
                    data-cms-id={`product_title_${idx}`}
                    data-cms-type="text"
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs text-[#6B7C93] leading-relaxed line-clamp-3"
                    data-cms-section="products"
                    data-cms-id={`product_desc_${idx}`}
                    data-cms-type="text"
                  >
                    {item.desc || item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D9E4EF]">
                  <a
                    href="#bao-gia"
                    onClick={() => onSelectProduct && onSelectProduct(item.title)}
                    className="btn-primary text-xs py-2.5 px-4 w-full justify-center shadow-md group-hover:bg-[#084FA6]"
                  >
                    <span>{item.cta || "Nhận Báo Giá Ngay"}</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
