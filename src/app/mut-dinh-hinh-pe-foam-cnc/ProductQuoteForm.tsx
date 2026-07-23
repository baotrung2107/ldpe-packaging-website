"use client";

import { useState } from "react";
import { Send, Upload, CheckCircle2, Phone, Mail, Building, ChevronDown, ChevronUp } from "lucide-react";

export default function ProductQuoteForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    productToPack: "Mút xốp định hình PE Foam CNC",
    materialGroup: "Khay và xốp định hình theo sản phẩm",
    dimensions: "",
    quantity: "",
    storageCondition: "Vận chuyển nội địa & xuất khẩu",
    processingRequirements: "Gia công cắt phay CNC theo bản vẽ",
    consultingContent: "",
    file: null as File | null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [showMoreMobile, setShowMoreMobile] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const payload = {
        companyName: formData.companyName,
        contactName: formData.contactName,
        phone: formData.phone,
        email: formData.email,
        productToPack: formData.productToPack,
        materialGroup: formData.materialGroup,
        dimensions: formData.dimensions,
        quantity: formData.quantity,
        storageCondition: formData.storageCondition,
        processingRequirements: formData.processingRequirements,
        consultingContent: formData.consultingContent,
        fileName: formData.file ? formData.file.name : null,
      };

      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Quote submission error:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Information Column */}
      <div className="lg:col-span-5 space-y-6">
        <span className="text-xs font-semibold text-[#0B63CE] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#D9E4EF]">
          YÊU CẦU BÁO GIÁ MÚT XỐP CNC
        </span>

        <h2 className="text-[26px] sm:text-[36px] font-extrabold text-[#102A43] leading-snug">
          Nhận Tư Vấn &amp; Báo Giá Gia Công Mút Xốp CNC
        </h2>

        <p className="text-sm sm:text-base text-[#40566F] leading-relaxed">
          Gửi bản vẽ thiết kế 2D/3D hoặc kích thước sản phẩm. Kỹ sư Đức Phúc sẽ liên hệ tư vấn mật độ xốp, phương án phay CNC và báo giá cạnh tranh nhất.
        </p>

        <div className="bg-white p-5 rounded-2xl border border-[#D9E4EF] shadow-sm space-y-3 text-xs sm:text-sm text-[#40566F]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#EAF3FC] text-[#0B63CE] shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-[#6B7C93] block">Hotline Kỹ Thuật CNC</span>
              <a href="tel:0835726666" className="font-bold text-[#102A43] hover:text-[#0B63CE]">
                083 572 6666 (Zalo / Call)
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#EAF3FC] text-[#0B63CE] shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-[#6B7C93] block">Email tiếp nhận file CAD</span>
              <span className="font-bold text-[#102A43] font-mono">phuocpefoam@gmail.com</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#EAF3FC] text-[#0B63CE] shrink-0">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-[#6B7C93] block">Nhà máy sản xuất</span>
              <span className="font-bold text-[#102A43]">Ấp Lập Điền, Xã Tân Mỹ, Huyện Đức Hòa, Long An</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Column */}
      <div className="lg:col-span-7 bg-white p-5 sm:p-8 rounded-2xl border border-[#D9E4EF] shadow-xl">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#102A43]">Đã gửi yêu cầu thành công!</h3>
            <p className="text-sm text-[#40566F] max-w-md mx-auto">
              Hệ thống đã nhận yêu cầu báo giá mút xốp CNC và tự động chuyển về Telegram Bot nhà máy. Kỹ sư tư vấn sẽ phản hồi bạn trong 15 phút.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary text-xs py-2 px-5"
            >
              Gửi thêm yêu cầu khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#D9E4EF] gap-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#102A43]">
                Form Đăng Ký Nhận Báo Giá Mút Định Hình CNC
              </h3>
              <span className="text-xs text-red-600 font-semibold italic">
                (*) Thông tin bắt buộc
              </span>
            </div>

            {/* 2 MANDATORY FIELDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">
                  Người liên hệ <span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  required
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] mb-1">
                  Số điện thoại (Zalo) <span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="083 572 6666"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                />
              </div>
            </div>

            {/* OPTIONAL DETAILED FIELDS */}
            <div className={`${showMoreMobile ? "block" : "hidden sm:block"} space-y-4 pt-1`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1">
                    Tên doanh nghiệp / Cơ sở
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Công ty TNHH ABC..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1">
                    Email tiếp nhận báo giá
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="phuocpefoam@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1">
                    Kích thước hộp / khay (D x R x C cm)
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    placeholder="Vd: 35 x 25 x 10 cm"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1">
                    Số lượng dự kiến (khay)
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Vd: 1.000 khay"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Tải bản vẽ CAD / 3D hoặc hình ảnh sản phẩm (nếu có)
                </label>
                <div className="border-2 border-dashed border-[#D9E4EF] rounded-lg p-3 text-center bg-[#F7FAFC] hover:border-[#0B63CE] transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center justify-center gap-2 text-xs text-[#6B7C93]">
                    <Upload className="w-4 h-4 text-[#0B63CE]" />
                    <span>
                      {formData.file ? (
                        <strong className="text-[#0B63CE] font-semibold">{formData.file.name}</strong>
                      ) : (
                        "Kéo thả file bản vẽ / hình ảnh vào đây (PDF, PNG, JPG, STEP, CAD)"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Consulting Content */}
              <div>
                <label className="block text-xs font-semibold text-[#102A43] mb-1">
                  Ghi chú yêu cầu gia công thêm
                </label>
                <textarea
                  name="consultingContent"
                  rows={3}
                  value={formData.consultingContent}
                  onChange={handleInputChange}
                  placeholder="Yêu cầu xốp hồng ESD chống tĩnh điện, dán keo 2 mặt, ghép nhiều màu..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                />
              </div>
            </div>

            {/* Mobile Toggle Button */}
            <div className="sm:hidden pt-1">
              <button
                type="button"
                onClick={() => setShowMoreMobile(!showMoreMobile)}
                className="w-full py-2 px-3 bg-[#EAF3FC] text-[#0B63CE] font-bold text-xs rounded-lg border border-[#D9E4EF] flex items-center justify-center gap-1.5"
              >
                {showMoreMobile ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Thu gọn thông tin chi tiết</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>+ Điền thêm bản vẽ &amp; quy cách (Không bắt buộc)</span>
                  </>
                )}
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button type="submit" className="w-full btn-primary py-3 justify-center gap-2 text-base shadow-lg">
                <Send className="w-4 h-4" />
                <span>Gửi yêu cầu báo giá CNC ngay</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
