"use client";

import { useCMS } from "@/context/CMSContext";
import { Phone, Mail, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { getOverride } = useCMS();

  const logoText = getOverride("footer_logo_text", "DP");
  const brandTitle = getOverride("footer_brand_title", "DUC PHUC PE FOAM");
  const address = getOverride(
    "footer_address",
    "Ấp Lập Điền, Xã Tân Mỹ, Huyện Đức Hòa, Tỉnh Long An, Việt Nam."
  );
  const phone = getOverride("footer_phone", "083 572 6666");
  const email = getOverride("footer_email", "phuocpefoam@gmail.com");
  const copyright = getOverride(
    "footer_copyright",
    "© 2026 CÔNG TY TNHH SẢN XUẤT PE FOAM ĐỨC PHÚC. All rights reserved."
  );

  return (
    <footer className="bg-[#041E38] text-white border-t border-[#0B3B6F] pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B63CE] to-[#041E38] border border-[#38BDF8]/40 text-white font-extrabold text-lg flex items-center justify-center shadow-lg"
                data-cms-section="footer"
                data-cms-id="footer_logo_text"
                data-cms-type="logo"
              >
                {logoText}
              </div>
              <span
                className="font-extrabold text-lg tracking-wider text-white block"
                data-cms-section="footer"
                data-cms-id="footer_brand_title"
                data-cms-type="text"
              >
                {brandTitle}
              </span>
            </div>
            <p className="text-xs text-[#D9E4EF] leading-relaxed">
              Nhà máy sản xuất màng LDPE, túi ni lông công nghiệp, cuộn xốp PE Foam chống sốc và khay mút định hình CNC hàng đầu khu vực miền Nam.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Chứng nhận ISO 9001:2015 & SGS REACH/RoHS</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Danh mục sản phẩm</h4>
            <ul className="space-y-2 text-xs text-[#D9E4EF]">
              <li>
                <a href="#san-pham" className="hover:text-[#38BDF8] transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-[#38BDF8]" />
                  <span>Màng & Túi LDPE Công Nghiệp</span>
                </a>
              </li>
              <li>
                <a href="#san-pham" className="hover:text-[#38BDF8] transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-[#38BDF8]" />
                  <span>Cuộn & Tấm PE Foam Chống Sốc</span>
                </a>
              </li>
              <li>
                <a href="#san-pham" className="hover:text-[#38BDF8] transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-[#38BDF8]" />
                  <span>Mút Định Hình EPE CNC</span>
                </a>
              </li>
              <li>
                <a href="#san-pham" className="hover:text-[#38BDF8] transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-[#38BDF8]" />
                  <span>Ống Mút & Nẹp Góc PE Foam</span>
                </a>
              </li>
              <li>
                <a href="#san-pham" className="hover:text-[#38BDF8] transition-colors flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3 text-[#38BDF8]" />
                  <span>Nệm PE Foam G3 Chính Hãng</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Thông tin liên hệ</h4>
            <div className="space-y-2.5 text-xs text-[#D9E4EF]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span data-cms-section="footer" data-cms-id="footer_address" data-cms-type="contact">
                  {address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="hover:text-[#38BDF8] transition-colors font-bold"
                  data-cms-section="footer"
                  data-cms-id="footer_phone"
                  data-cms-type="contact"
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-[#38BDF8] transition-colors"
                  data-cms-section="footer"
                  data-cms-id="footer_email"
                  data-cms-type="contact"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Factory Maps & Cert */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">Nhà máy sản xuất</h4>
            <p className="text-xs text-[#D9E4EF] leading-relaxed">
              Diện tích nhà máy hơn 10.000m² tại Huyện Đức Hòa, Tỉnh Long An. Dây chuyền đùn màng & thổi mút xốp tự động hóa 100%.
            </p>
            <a
              href="#bao-gia"
              className="inline-flex items-center justify-center w-full btn-primary text-xs py-2.5 shadow-md"
            >
              <span>Liên hệ tham quan nhà máy</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9FB3C8]">
          <span data-cms-section="footer" data-cms-id="footer_copyright" data-cms-type="text">
            {copyright}
          </span>
          <div className="flex items-center gap-4">
            <a href="/admin" className="hover:text-white transition-colors">
              Đăng nhập Admin CMS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
