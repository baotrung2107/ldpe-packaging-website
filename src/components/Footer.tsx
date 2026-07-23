"use client";

import { ShieldCheck, Phone, Mail, MapPin, Award } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

export default function Footer() {
  const { getOverride } = useCMS();

  const phone = getOverride("nav_phone", "083 572 6666");
  const email = getOverride("nav_email", "phuocpefoam@gmail.com");
  const address = getOverride("footer_address", "Ấp Lập Điền, Xã Tân Mỹ, Huyện Đức Hòa, Tỉnh Long An, Việt Nam");
  const copyright = getOverride("footer_copyright", "© 2026 CÔNG TY TNHH SẢN XUẤT PE FOAM ĐỨC PHÚC. Tất cả quyền được bảo lưu.");
  const logoUrl = getOverride("nav_logo_url", "");

  return (
    <footer id="footer" className="bg-[#062B4F] text-[#D9E4EF] pt-16 pb-12 border-t border-[#103E6B]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Company Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt="DUC PHUC PE FOAM" className="h-10 object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-[#0B63CE] text-white font-bold text-xl flex items-center justify-center shadow-md">
                  DP
                </div>
              )}
              <span className="font-extrabold text-xl text-white tracking-wide">
                DUC PHUC <span className="text-[#0B63CE]">PE FOAM</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed text-[#D9E4EF]">
              Công ty TNHH Sản Xuất PE Foam Đức Phúc chuyên sản xuất và gia công trực tiếp các sản phẩm màng LDPE, túi nhựa, tấm cuộn PE foam chống sốc, khay định hình cao cấp theo chuẩn SGS REACH & RoHS.
            </p>

            <div className="space-y-1.5 pt-1 text-xs text-[#EAF3FC]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0B63CE] shrink-0" />
                <span>ISO 9001:2015 • Kiếm định SGS REACH No. VNHL2401000844EE</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Kiểm định SGS RoHS 2.0 No. VNHL2204007729EE</span>
              </div>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">SẢN PHẨM & DỊCH VỤ</h4>
            <ul className="space-y-2 text-xs text-[#D9E4EF]">
              <li><a href="#san-pham" className="hover:text-white transition-colors">Màng LDPE dạng cuộn</a></li>
              <li><a href="#san-pham" className="hover:text-white transition-colors">Túi LDPE đóng gói</a></li>
              <li><a href="#san-pham" className="hover:text-white transition-colors">Màng co LDPE công nghiệp</a></li>
              <li><a href="#san-pham" className="hover:text-white transition-colors">Tấm & cuộn PE foam chống sốc</a></li>
              <li><a href="#san-pham" className="hover:text-white transition-colors">Khay xốp định hình CNC</a></li>
              <li><a href="#san-pham" className="hover:text-white transition-colors">Thanh nẹp góc PE foam</a></li>
              <li><a href="#san-pham" className="hover:text-white transition-colors">Gia công LDPE theo bản vẽ</a></li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">GIẢI PHÁP NGÀNH</h4>
            <ul className="space-y-2 text-xs text-[#D9E4EF]">
              <li><a href="#giai-phap" className="hover:text-white transition-colors">Linh kiện điện tử</a></li>
              <li><a href="#giai-phap" className="hover:text-white transition-colors">Kính & Gốm sứ</a></li>
              <li><a href="#giai-phap" className="hover:text-white transition-colors">Nội thất & Gỗ</a></li>
              <li><a href="#giai-phap" className="hover:text-white transition-colors">Thương mại điện tử</a></li>
              <li><a href="#giai-phap" className="hover:text-white transition-colors">Hàng tiêu dùng</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">LIÊN HỆ NHÀ MÁY ĐỨC PHÚC</h4>
            <div className="space-y-2.5 text-xs text-[#D9E4EF]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0B63CE] shrink-0 mt-0.5" />
                <span
                  data-cms-section="footer"
                  data-cms-id="footer_address"
                  data-cms-type="text"
                >
                  Nhà máy: {address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0B63CE] shrink-0" />
                <span
                  className="font-bold text-white"
                  data-cms-section="footer"
                  data-cms-id="nav_phone"
                  data-cms-type="contact"
                >
                  {phone} (Hotline/Zalo B2B)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0B63CE] shrink-0" />
                <span
                  data-cms-section="footer"
                  data-cms-id="nav_email"
                  data-cms-type="contact"
                >
                  {email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#103E6B] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B7C93]">
          <p
            data-cms-section="footer"
            data-cms-id="footer_copyright"
            data-cms-type="text"
          >
            {copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#chung-nhan" className="hover:text-[#D9E4EF]">Báo cáo SGS REACH</a>
            <a href="#chung-nhan" className="hover:text-[#D9E4EF]">Báo cáo SGS RoHS</a>
            <a href="#chung-nhan" className="hover:text-[#D9E4EF]">Catalogue #27319</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
