"use client";

import { useState } from "react";
import { Eye, X, Sparkles, Camera, Factory, CheckCircle2, Award } from "lucide-react";

export default function FactoryImageGallery() {
  const [activeCategory, setActiveCategory] = useState<"all" | "products" | "factory" | "certs">("all");
  const [activeModalImage, setActiveModalImage] = useState<{ image: string; title: string; desc: string; tag: string } | null>(null);

  const galleryItems = [
    {
      id: "cnc_machine",
      category: "factory",
      tag: "DÂY CHUYỀN CNC",
      title: "Dây Chuyền Cắt Phay Laser & CNC Mút PE Foam",
      desc: "Hệ thống máy phay CNC đa trục tự động dập cắt mút xốp EPE với độ chính xác đến ±0.1mm theo bản vẽ 3D.",
      image: "/images/ldpe/gia-cong-cnc.png",
    },
    {
      id: "tool_foam",
      category: "products",
      tag: "SẢN PHẨM KHAY CNC",
      title: "Khay Mút PE Foam Định Hình Bộ Dụng Cụ Kỹ Thuật",
      desc: "Khay xốp ghép nhiều tầng ôm khít từng chi tiết máy, tay cầm, tua vít và thiết bị đo kiểm.",
      image: "/images/ldpe/pe-foam-dinh-hinh.png",
    },
    {
      id: "factory_floor",
      category: "factory",
      tag: "NHÀ MÁY ĐỨC PHÚC",
      title: "Khu Vực Sản Xuất & Kho Nguyên Liệu PE Foam",
      desc: "Nhà máy chính thức rộng hàng nghìn m² tại Đức Hòa, Long An đáp ứng công suất hàng triệu sản phẩm mỗi tháng.",
      image: "/images/ldpe/factory-hero.png",
    },
    {
      id: "esd_foam",
      category: "products",
      tag: "KHAY CHỐNG TĨNH ĐIỆN",
      title: "Mút Xốp PE Foam Hồng Anti-Static ESD Linh Kiện",
      desc: "Giải pháp bảo vệ bo mạch PCBA, chip bán dẫn khỏi nguy cơ va đập và phóng điện tĩnh (ESD 10^6 - 10^9 Ω).",
      image: "/images/ldpe/industry-electronics.png",
    },
    {
      id: "medical_foam",
      category: "products",
      tag: "THIẾT BỊ Y TẾ",
      title: "Khay Xốp Định Hình Thiết Bị Y Tế & Dụng Cụ Phẫu Thuật",
      desc: "Gia công mút xốp dẻo dai vô trùng bảo vệ thiết bị y tế nhạy cảm khi đóng gói và vận chuyển.",
      image: "/images/ldpe/industry-medical.png",
    },
    {
      id: "glass_foam",
      category: "products",
      tag: "MỸ PHẨM & CHAI LỌ",
      title: "Khay Mút Lót Hộp Nước Hoa, Mỹ Phẩm & Chai Lọ Thủy Tinh",
      desc: "Tạo hình sang trọng, chống vỡ trầy xước, nâng tầm giá trị thương hiệu cho các sản phẩm xa xỉ.",
      image: "/images/ldpe/industry-glass.png",
    },
    {
      id: "machinery_foam",
      category: "products",
      tag: "CHI TIẾT MÁY",
      title: "Mút PE Foam Chịu Nén Cho Phụ Tùng Cơ Khí Lớn",
      desc: "Định hình các khối mút xốp dày chịu trọng tải nén lớn cho bánh răng, phụ tùng ô tô & máy móc.",
      image: "/images/ldpe/industry-machinery.png",
    },
    {
      id: "raw_foam_rolls",
      category: "factory",
      tag: "NGUYÊN LIỆU FOAM",
      title: "Kho Tấm & Cuộn Xốp PE Foam Chất Lượng Cao",
      desc: "Nguồn nguyên liệu mút xốp dẻo dai nguyên sinh 100%, sẵn sàng chạy khuôn dập theo yêu cầu.",
      image: "/images/ldpe/pe-foam-cuon.png",
    },
    {
      id: "iso_cert",
      category: "certs",
      tag: "CHỨNG NHẬN ISO",
      title: "Chứng Nhận ISO 9001:2015 Hệ Thống Quản Lý Chất Lượng",
      desc: "Giấy chứng nhận ISO 9001:2015 chính thức chứng nhận quy trình sản xuất mút PE foam đạt chuẩn quốc tế.",
      image: "/images/ldpe/cert-isocert-iso9001.jpg",
    },
    {
      id: "sgs_reach",
      category: "certs",
      tag: "SGS REACH (EU)",
      title: "Chứng Nhận SGS REACH 235 SVHC Liên Minh Châu Âu",
      desc: "Báo cáo kiểm định an toàn 235 hợp chất nguy hại REACH đạt chuẩn xuất khẩu sang thị trường Châu Âu.",
      image: "/images/ldpe/cert-sgs-reach.jpg",
    },
  ];

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#D9E4EF]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3.5 py-1.5 rounded-full border border-[#D9E4EF]">
            <Camera className="w-4 h-4 text-[#0B63CE]" />
            THƯ VIỆN HÌNH ẢNH THỰC TẾ NHÀ MÁY &amp; SẢN PHẨM
          </span>
          <h2 className="text-[24px] sm:text-[34px] font-extrabold text-[#102A43] [text-wrap:balance]">
            Hình Ảnh Thực Tế Dây Chuyền CNC &amp; Khay Mút Định Hình
          </h2>
          <p className="text-xs sm:text-sm text-[#40566F] [text-wrap:pretty]">
            100% hình ảnh chụp thực tế sản phẩm khay mút CNC, quy trình sản xuất và hồ sơ kiểm định tại Nhà Máy Đức Phúc.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === "all"
                ? "bg-[#062B4F] text-white shadow-md"
                : "bg-[#F7FAFC] text-[#40566F] hover:bg-[#EAF3FC] border border-[#D9E4EF]"
            }`}
          >
            Tất Cả Hình Ảnh ({galleryItems.length})
          </button>
          <button
            onClick={() => setActiveCategory("products")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === "products"
                ? "bg-[#062B4F] text-white shadow-md"
                : "bg-[#F7FAFC] text-[#40566F] hover:bg-[#EAF3FC] border border-[#D9E4EF]"
            }`}
          >
            Khay Mút CNC Sản Phẩm
          </button>
          <button
            onClick={() => setActiveCategory("factory")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === "factory"
                ? "bg-[#062B4F] text-white shadow-md"
                : "bg-[#F7FAFC] text-[#40566F] hover:bg-[#EAF3FC] border border-[#D9E4EF]"
            }`}
          >
            Nhà Máy &amp; Dây Chuyền CNC
          </button>
          <button
            onClick={() => setActiveCategory("certs")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === "certs"
                ? "bg-[#062B4F] text-white shadow-md"
                : "bg-[#F7FAFC] text-[#40566F] hover:bg-[#EAF3FC] border border-[#D9E4EF]"
            }`}
          >
            Hồ Sơ Chứng Nhận ISO/SGS
          </button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalImage(item)}
              className="bg-[#F7FAFC] rounded-2xl overflow-hidden border border-[#D9E4EF] hover:border-[#0B63CE] transition-all duration-300 hover:shadow-xl group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041A30]/80 via-transparent to-black/10 opacity-70 group-hover:opacity-90 transition-opacity" />

                <span className="absolute top-3 left-3 bg-[#041A30]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#38BDF8] border border-[#38BDF8]/30 shadow">
                  {item.tag}
                </span>

                <div className="absolute bottom-3 right-3 p-2 bg-[#0B63CE] text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#102A43] group-hover:text-[#0B63CE] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B7C93] mt-1 line-clamp-2 [text-wrap:pretty]">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-2 text-[11px] text-[#0B63CE] font-semibold flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click phóng to ảnh độ phân giải cao</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {activeModalImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute -top-12 right-0 text-white bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-white p-2 sm:p-3 rounded-2xl border border-white/20 shadow-2xl space-y-3 w-full max-h-[85vh] overflow-y-auto">
              <div className="relative aspect-[4/3] w-full max-h-[60vh] overflow-hidden rounded-xl bg-[#041A30]">
                <img
                  src={activeModalImage.image}
                  alt={activeModalImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-3 space-y-1">
                <span className="inline-block bg-[#0B63CE] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {activeModalImage.tag}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-[#102A43]">
                  {activeModalImage.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#40566F] leading-relaxed">
                  {activeModalImage.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
