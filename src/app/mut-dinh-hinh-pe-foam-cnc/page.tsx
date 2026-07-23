import Metadata from "next";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  Award,
  Sparkles,
  ArrowRight,
  Send,
  Upload,
  Ruler,
  Layers,
  Cpu,
  Clock3,
  Factory,
  PackageCheck,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Home,
  FileText,
  Boxes,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartTextRenderer from "@/components/SmartTextRenderer";
import ProductQuoteForm from "./ProductQuoteForm";

export const metadata = {
  title: "Mút Định Hình EPE & PE Foam CNC Cao Cấp | Báo Giá Nhà Máy Đức Phúc",
  description:
    "Nhà máy gia công mút xốp PE foam định hình CNC, khay xốp EPE chống sốc bảo vệ linh kiện điện tử, thiết bị y tế, chai lọ hàng cao cấp. Đạt chuẩn ISO 9001:2015, SGS REACH, SGS RoHS.",
  keywords: [
    "mút định hình pe foam",
    "khay xốp epe cnc",
    "xốp định hình cnc",
    "khay xốp chống sốc",
    "mút xốp đóng gói đức phúc",
    "pe foam cnc insert",
    "mút xốp lót hộp",
  ],
  openGraph: {
    title: "Gia Công Mút Định Hình EPE & PE Foam CNC Theo Bản Vẽ | Đức Phúc PE Foam",
    description:
      "Tư vấn thiết kế 3D & thử mẫu CNC miễn phí trong 24h. Bảo vệ 100% linh kiện & hàng hóa khỏi va đập, trầy xước.",
    url: "https://ldpe-packaging-website.vercel.app/mut-dinh-hinh-pe-foam-cnc",
    siteName: "Đức Phúc PE Foam Packaging",
    images: [
      {
        url: "https://ldpe-packaging-website.vercel.app/images/ldpe/pe-foam-dinh-hinh.png",
        width: 1200,
        height: 630,
        alt: "Khay mút xốp định hình PE Foam CNC Đức Phúc",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  alternates: {
    canonical: "https://ldpe-packaging-website.vercel.app/mut-dinh-hinh-pe-foam-cnc",
  },
};

export default function PeFoamCncLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "Mút Định Hình EPE & PE Foam CNC Cao Cấp",
        image: "https://ldpe-packaging-website.vercel.app/images/ldpe/pe-foam-dinh-hinh.png",
        description:
          "Giải pháp khay mút xốp PE Foam định hình cắt CNC chống sốc chính xác 100% cho linh kiện điện tử, dụng cụ y tế và hàng cao cấp.",
        brand: {
          "@type": "Brand",
          name: "Đức Phúc PE Foam",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "VND",
          lowPrice: "1000",
          highPrice: "50000",
          offerCount: "1000",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang chủ",
            item: "https://ldpe-packaging-website.vercel.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Mút Định Hình PE Foam CNC",
            item: "https://ldpe-packaging-website.vercel.app/mut-dinh-hinh-pe-foam-cnc",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Mút xốp EPE / PE Foam định hình CNC có tốt hơn xốp hạt trắng EPS không?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Mút xốp PE Foam / EPE có tính đàn hồi cao, không bị gãy vỡ, rớt vụn hạt hay bám bụi vào linh kiện như xốp EPS hạt trắng. Khả năng hấp thụ xung lực khi va đập và tái sử dụng vượt trội hơn hẳn.",
            },
          },
          {
            "@type": "Question",
            name: "Thời gian tư vấn thiết kế 3D và chạy thử mẫu CNC là bao lâu?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nhà máy Đức Phúc hỗ trợ dựng file 3D CAD và chạy mẫu thử nghiệm CNC hoàn thành trong vòng 24 giờ cho khách hàng.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white font-sans text-[#102A43]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* BREADCRUMB BAR */}
      <div className="bg-[#041A30] border-b border-[#0B3B6F] py-3 text-xs text-[#9FB3C8]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-2">
          <a href="/" className="hover:text-white flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </a>
          <ChevronRight className="w-3 h-3 text-[#38BDF8]" />
          <span className="text-[#38BDF8] font-semibold">Sản Phẩm Mút Định Hình EPE / PE Foam CNC</span>
        </div>
      </div>

      {/* 1. HERO BANNER - PRODUCT LANDING */}
      <section className="relative bg-[#041B32] text-white py-12 sm:py-16 lg:py-24 overflow-hidden border-b border-[#0B3B6F]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ldpe/ldpe-factory-bg.jpg"
            alt="Nhà máy gia công mút xốp PE foam CNC Đức Phúc"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041A30]/95 via-[#062B4F]/90 to-[#041A30]/75" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#0B63CE]/30 border border-[#38BDF8]/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#EAF3FC] tracking-wider uppercase backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                <span>CHUYÊN GIA CÔNG MÚT XỐP CNC CHỐNG SỐC B2B</span>
              </div>

              <h1 className="text-[28px] sm:text-[42px] lg:text-[52px] font-extrabold leading-[1.2] text-white tracking-tight drop-shadow-sm [text-wrap:balance]">
                Mút Định Hình EPE &amp; PE Foam CNC{" "}
                <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent block sm:inline">
                  Bảo Vệ Sản Phẩm Tuyệt Đối
                </span>
              </h1>

              <p className="text-[15px] sm:text-[17px] text-[#D9E4EF] leading-relaxed max-w-2xl font-normal [text-wrap:pretty]">
                Gia công khay mút xốp EPE / PE Foam định hình cắt phay CNC theo kích thước chuẩn 100% bản vẽ sản phẩm. Chống va đập, móp vỡ, chống tĩnh điện ESD chuyên dụng cho linh kiện điện tử, dụng cụ y tế và sản phẩm cao cấp.
              </p>

              {/* Key Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-[#EAF3FC]">
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Thử mẫu chạy CNC hoàn thành trong 24h</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Chính xác từng milimet theo bản vẽ CAD/3D</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Có màu đen, trắng &amp; hồng chống tĩnh điện ESD</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span>Đạt chứng nhận ISO 9001:2015, SGS REACH, RoHS</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#bao-gia-cnc"
                  className="btn-primary shadow-xl shadow-[#0B63CE]/40 justify-center text-sm py-3 px-6"
                >
                  <span>Gửi bản vẽ nhận báo giá CNC</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>

                <a
                  href="tel:0835726666"
                  className="btn-secondary bg-white text-[#041B32] justify-center text-sm py-3 px-6 font-bold"
                >
                  <Phone className="w-4 h-4 mr-2 text-[#0B63CE]" />
                  <span>Hotline: 083 572 6666</span>
                </a>
              </div>
            </div>

            {/* Right Media Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#062B4F] group">
                <img
                  src="/images/ldpe/pe-foam-dinh-hinh.png"
                  alt="Khay xốp PE foam định hình CNC cao cấp"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041B32] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 bg-[#041B32]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#38BDF8] border border-[#38BDF8]/40">
                  ⚡ CNC PROTOTYPE 24H
                </div>

                <div className="absolute bottom-4 inset-x-4 space-y-1">
                  <h3 className="text-sm font-bold text-white">Khay Xốp Định Hình CNC Bộ Dụng Cụ Kỹ Thuật</h3>
                  <p className="text-xs text-[#D9E4EF]">
                    Dập cắt CNC nhiều tầng ôm khít từng chi tiết máy, tay cầm và phụ kiện đi kèm.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#062B4F]/90 p-3 rounded-xl border border-white/15 flex items-center gap-2.5">
                  <Factory className="w-5 h-5 text-[#38BDF8] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Dây Chuyền CNC</div>
                    <div className="text-[10px] text-[#9FB3C8]">Công nghệ phay laser &amp; CNC</div>
                  </div>
                </div>
                <div className="bg-[#062B4F]/90 p-3 rounded-xl border border-white/15 flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">ISO 9001:2015</div>
                    <div className="text-[10px] text-[#9FB3C8]">Chuẩn quốc tế B2B</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TECHNICAL SPECIFICATIONS TABLE */}
      <section className="py-12 sm:py-16 bg-[#F7FAFC] border-b border-[#D9E4EF]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3 py-1 rounded-full border border-[#D9E4EF]">
              THÔNG SỐ KỸ THUẬT VẬT LIỆU
            </span>
            <h2 className="text-[24px] sm:text-[32px] font-extrabold text-[#102A43]">
              Bảng Quy Cách &amp; Thông Số Mút Xốp Định Hình PE Foam / EPE
            </h2>
            <p className="text-xs sm:text-sm text-[#40566F]">
              Được gia công tùy biến 100% theo yêu cầu của doanh nghiệp sản xuất &amp; đóng gói xuất khẩu.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9E4EF] overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-[#102A43]">
                <thead className="bg-[#062B4F] text-white uppercase text-[11px] font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Hạng Mục Kỹ Thuật</th>
                    <th className="p-4">Thông Số Tiêu Chuẩn</th>
                    <th className="p-4">Ứng Dụng Thực Tế</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9E4EF]">
                  <tr className="hover:bg-[#F7FAFC]">
                    <td className="p-4 font-bold text-[#0B63CE]">Tên vật liệu</td>
                    <td className="p-4">Expanded Polyethylene (EPE / PE Foam)</td>
                    <td className="p-4">Xốp mềm đàn hồi, dẻo dai, chống sốc nẩy</td>
                  </tr>
                  <tr className="hover:bg-[#F7FAFC]">
                    <td className="p-4 font-bold text-[#0B63CE]">Tỷ trọng (Density)</td>
                    <td className="p-4 font-semibold">18 kg/m³ – 35 kg/m³ (Loại nén cao cấp)</td>
                    <td className="p-4">Tối ưu theo trọng lượng thiết bị từ nhẹ đến rất nặng</td>
                  </tr>
                  <tr className="hover:bg-[#F7FAFC]">
                    <td className="p-4 font-bold text-[#0B63CE]">Độ dày gia công</td>
                    <td className="p-4 font-semibold">5mm – 150mm (Ghép nhiều tầng)</td>
                    <td className="p-4">Khay lót 1 tầng hoặc định hình khối 3D phức tạp</td>
                  </tr>
                  <tr className="hover:bg-[#F7FAFC]">
                    <td className="p-4 font-bold text-[#0B63CE]">Tùy chọn màu sắc</td>
                    <td className="p-4">Trắng tinh, Đen nhám, Hồng chống tĩnh điện</td>
                    <td className="p-4">Hồng ESD chống tĩnh điện 10^6 - 10^9 Ω cho điện tử</td>
                  </tr>
                  <tr className="hover:bg-[#F7FAFC]">
                    <td className="p-4 font-bold text-[#0B63CE]">Công nghệ gia công</td>
                    <td className="p-4">Cắt laser, Cắt phay CNC, Dập định hình khuôn</td>
                    <td className="p-4">Chính xác góc cạnh, không rớt bavia, rách mép</td>
                  </tr>
                  <tr className="hover:bg-[#F7FAFC]">
                    <td className="p-4 font-bold text-[#0B63CE]">Tiêu chuẩn an toàn</td>
                    <td className="p-4 font-bold text-emerald-600">SGS REACH (235 SVHC), SGS RoHS 2.0</td>
                    <td className="p-4">Đủ điều kiện xuất khẩu sang Châu Âu (EU), Mỹ, Nhật Bản</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDUSTRY APPLICATIONS BENTO GRID */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3 py-1 rounded-full border border-[#D9E4EF]">
              ỨNG DỤNG NGÀNH HÀNG
            </span>
            <h2 className="text-[24px] sm:text-[32px] font-extrabold text-[#102A43]">
              Khay Mút Định Hình CNC Cho Các Ngành Công Nghiệp
            </h2>
            <p className="text-xs sm:text-sm text-[#40566F]">
              Được thiết kế chuyên biệt để bảo vệ các sản phẩm nhạy cảm với va đập và trầy xước.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#F7FAFC] p-6 rounded-2xl border border-[#D9E4EF] hover:border-[#0B63CE] transition-all space-y-4 group">
              <div className="w-12 h-12 bg-[#EAF3FC] text-[#0B63CE] rounded-xl flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43] group-hover:text-[#0B63CE] transition-colors">
                Linh Kiện Điện Tử &amp; Bán Dẫn (ESD)
              </h3>
              <p className="text-xs text-[#6B7C93] leading-relaxed">
                Khay xốp PE foam hồng chống tĩnh điện ESD bảo vệ bo mạch PCBA, chip bán dẫn, màn hình cảm ứng và camera khỏi va đập và phóng điện tĩnh.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F7FAFC] p-6 rounded-2xl border border-[#D9E4EF] hover:border-[#0B63CE] transition-all space-y-4 group">
              <div className="w-12 h-12 bg-[#EAF3FC] text-[#0B63CE] rounded-xl flex items-center justify-center font-bold">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43] group-hover:text-[#0B63CE] transition-colors">
                Dụng Cụ Y Tế &amp; Thiết Bị Đo Kiểm
              </h3>
              <p className="text-xs text-[#6B7C93] leading-relaxed">
                Khay CNC dập khuôn vừa vặn từng thiết bị phẫu thuật, máy đo chính xác, ống kính quang học, đảm bảo không dịch chuyển khi vận chuyển.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F7FAFC] p-6 rounded-2xl border border-[#D9E4EF] hover:border-[#0B63CE] transition-all space-y-4 group">
              <div className="w-12 h-12 bg-[#EAF3FC] text-[#0B63CE] rounded-xl flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#102A43] group-hover:text-[#0B63CE] transition-colors">
                Chai Lọ Thủy Tinh, Mỹ Phẩm &amp; Rượu Cao Cấp
              </h3>
              <p className="text-xs text-[#6B7C93] leading-relaxed">
                Định hình lớp lót hộp quà tặng xa xỉ, chai nước hoa, hộp rượu ngoại cao cấp, tăng tính thẩm mỹ chỉn chu và nâng tầm giá trị thương hiệu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROTOTYPING & WORKFLOW SECTION */}
      <section className="py-12 sm:py-16 bg-[#041A30] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider bg-[#0B63CE]/30 px-3 py-1 rounded-full border border-[#38BDF8]/40">
              QUY TRÌNH THỰC HIỆN
            </span>
            <h2 className="text-[24px] sm:text-[32px] font-extrabold text-white">
              Quy Trình 5 Bước Tạo Khay Mút CNC Chuẩn Xác 100%
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="bg-[#062B4F] p-4 rounded-xl border border-white/15 space-y-2 text-center">
              <span className="w-8 h-8 rounded-full bg-[#0B63CE] text-white font-bold flex items-center justify-center mx-auto text-xs">
                01
              </span>
              <h4 className="font-bold text-xs text-white">Tiếp Nhận Bản Vẽ</h4>
              <p className="text-[11px] text-[#D9E4EF]">Nhận file CAD/3D hoặc sản phẩm thực tế từ khách hàng</p>
            </div>

            <div className="bg-[#062B4F] p-4 rounded-xl border border-white/15 space-y-2 text-center">
              <span className="w-8 h-8 rounded-full bg-[#0B63CE] text-white font-bold flex items-center justify-center mx-auto text-xs">
                02
              </span>
              <h4 className="font-bold text-xs text-white">Thiết Kế Layout</h4>
              <p className="text-[11px] text-[#D9E4EF]">Kỹ sư tính toán độ khít, khe lấy tay &amp; độ dày xốp</p>
            </div>

            <div className="bg-[#062B4F] p-4 rounded-xl border border-white/15 space-y-2 text-center">
              <span className="w-8 h-8 rounded-full bg-[#38BDF8] text-[#041A30] font-bold flex items-center justify-center mx-auto text-xs">
                03
              </span>
              <h4 className="font-bold text-xs text-white">Chạy Mẫu CNC 24h</h4>
              <p className="text-[11px] text-[#D9E4EF]">Cắt laser/phay mút chạy thử 1-2 khay mẫu gửi duyệt</p>
            </div>

            <div className="bg-[#062B4F] p-4 rounded-xl border border-white/15 space-y-2 text-center">
              <span className="w-8 h-8 rounded-full bg-[#0B63CE] text-white font-bold flex items-center justify-center mx-auto text-xs">
                04
              </span>
              <h4 className="font-bold text-xs text-white">Kiểm Thử Drop-Test</h4>
              <p className="text-[11px] text-[#D9E4EF]">Thử nghiệm thả rơi &amp; chịu lực nén va đập thực tế</p>
            </div>

            <div className="bg-[#062B4F] p-4 rounded-xl border border-white/15 space-y-2 text-center">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center mx-auto text-xs">
                05
              </span>
              <h4 className="font-bold text-xs text-white">Sản Xuất Hàng Loạt</h4>
              <p className="text-[11px] text-[#D9E4EF]">Chạy dây chuyền tự động &amp; giao hàng đúng tiến độ</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEDICATED QUOTE FORM WITH TELEGRAM BOT */}
      <section id="bao-gia-cnc" className="py-12 sm:py-16 bg-[#EAF3FC] border-t border-[#D9E4EF]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ProductQuoteForm />
        </div>
      </section>

      {/* 6. FAQ SECTION FOR PE FOAM CNC */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#D9E4EF]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3 py-1 rounded-full border border-[#D9E4EF]">
              HỎI ĐÁP KỸ THUẬT CNC
            </span>
            <h2 className="text-[24px] sm:text-[32px] font-extrabold text-[#102A43]">
              Câu Hỏi Thường Gặp Về Gia Công Mút Xốp CNC
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E4EF] space-y-2">
              <h4 className="font-bold text-[#102A43] text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#0B63CE] shrink-0" />
                Mút xốp EPE / PE Foam định hình CNC có tốt hơn xốp hạt trắng EPS không?
              </h4>
              <p className="text-[#40566F] leading-relaxed">
                Mút xốp PE Foam / EPE có tính đàn hồi cao, dẻo dai, không bị gãy vỡ hay bám bụi vụn hạt nhựa vào linh kiện như xốp hạt trắng EPS. Khả năng bảo vệ thiết bị đắt tiền khỏi lực nén và rơi tự do là tốt hơn rất nhiều.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E4EF] space-y-2">
              <h4 className="font-bold text-[#102A43] text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#0B63CE] shrink-0" />
                Số lượng đặt hàng tối thiểu (MOQ) khi làm khay CNC là bao nhiêu?
              </h4>
              <p className="text-[#40566F] leading-relaxed">
                Nhà máy Đức Phúc hỗ trợ cả các đơn hàng thử nghiệm số lượng nhỏ (từ vài chục khay) đến các đơn hàng công nghiệp hàng chục nghìn khay với đơn giá tại nhà máy.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E4EF] space-y-2">
              <h4 className="font-bold text-[#102A43] text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#0B63CE] shrink-0" />
                Nhà máy có cung cấp loại xốp PE foam chống tĩnh điện ESD không?
              </h4>
              <p className="text-[#40566F] leading-relaxed">
                Có. Chúng tôi sản xuất trực tiếp mút xốp PE Foam màu hồng chuyên dụng chống tĩnh điện (ESD: 10^6 - 10^9 Ω) kiểm định an toàn 100% cho linh kiện điện tử, vi mạch bán dẫn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
