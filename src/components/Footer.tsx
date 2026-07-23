"use client";

import { ShieldCheck, Phone, Mail, MapPin } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

export default function Footer() {
  const { getOverride } = useCMS();

  const phone = getOverride("nav_phone", "0900 000 000");
  const email = getOverride("nav_email", "lienhe@ldpe-packaging.vn");
  const copyright = getOverride("footer_copyright", "© 2026 LDPE Packaging Solutions. Tất cả quyền được bảo lưu.");
  const logoUrl = getOverride("nav_logo_url", "");

  return (
    <footer id="lien-he" className="bg-[#062B4F] text-[#D9E4EF] pt-16 pb-12 border-t border-[#103E6B]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Company Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo Packaging" className="h-10 object-contain" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-[#0B63CE] text-white font-bold text-xl flex items-center justify-center">
                  LD
                </div>
              )}
              <span className="font-bold text-xl text-white tracking-wide">
                PACKAGING <span className="text-[#0B63CE]">LDPE</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed text-[#D9E4EF]">
              Nhà máy chuyên sản xuất và gia công các sản phẩm màng LDPE, túi nhựa, tấm cuộn PE foam chống sốc, khay định hình cao cấp theo yêu cầu doanh nghiệp.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-[#EAF3FC]">
              <ShieldCheck className="w-4 h-4 text-[#0B63CE]" />
              <span>Tiêu chuẩn quản lý chất lượng ISO 9001:2015</span>
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
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">LIÊN HỆ NHÀ MÁY</h4>
            <div className="space-y-2.5 text-xs text-[#D9E4EF]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0B63CE] shrink-0 mt-0.5" />
                <span>Nhà máy 1: Đường số 3, KCN Tân Bình, TPHCM</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0B63CE] shrink-0 mt-0.5" />
                <span>Nhà máy 2: KCN Tiên Sơn, Bắc Ninh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0B63CE] shrink-0" />
                <span className="font-bold text-white">{phone} (Hotline/Zalo B2B)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0B63CE] shrink-0" />
                <span>{email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#103E6B] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B7C93]">
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#D9E4EF]">Chính sách bảo mật</a>
            <a href="#" className="hover:text-[#D9E4EF]">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-[#D9E4EF]">Quy chuẩn kỹ thuật</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
