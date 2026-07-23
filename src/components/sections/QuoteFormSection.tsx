"use client";

import { useState } from "react";
import { Send, Upload, CheckCircle2, QrCode, FileText, Phone, Mail, Building, Package } from "lucide-react";
import SepayModal from "../SepayModal";

export default function QuoteFormSection({ preselectedProduct }: { preselectedProduct?: string }) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    productToPack: "",
    materialGroup: preselectedProduct || "Khay và xốp định hình theo sản phẩm",
    dimensions: "",
    quantity: "",
    storageCondition: "Vận chuyển nội địa",
    processingRequirements: "Cắt định hình theo bản vẽ",
    consultingContent: "",
    file: null as File | null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSepayOpen, setIsSepayOpen] = useState(false);
  const [orderCode, setOrderCode] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleOpenSepayDeposit = () => {
    // Generate a random 6-digit order code
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOrderCode(randomCode);
    setIsSepayOpen(true);
  };

  return (
    <section id="bao-gia" className="py-16 md:py-24 bg-[#EAF3FC] border-t border-[#D9E4EF] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Information Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold text-[#0B63CE] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#D9E4EF]">
              TƯ VẤN & BÁO GIÁ TRỰC TIẾP
            </span>

            <h2 className="text-[30px] md:text-[40px] font-bold text-[#102A43] leading-snug">
              Bạn chưa biết nên chọn loại LDPE hoặc PE foam nào?
            </h2>

            <p className="text-[16px] md:text-[17px] text-[#40566F] leading-relaxed">
              Hãy gửi cho chúng tôi mẫu sản phẩm, kích thước, số lượng dự kiến và yêu cầu vận chuyển. Đội ngũ tư vấn sẽ hỗ trợ xác định phương án phù hợp trước khi báo giá.
            </p>

            <div className="bg-white p-6 rounded-2xl border border-[#D9E4EF] shadow-sm space-y-4">
              <h4 className="font-bold text-[#102A43] text-sm uppercase tracking-wider">
                HỖ TRỢ TRỰC TIẾP TỪ NHÀ MÁY
              </h4>

              <div className="space-y-3 text-sm text-[#40566F]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#EAF3FC] text-[#0B63CE]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7C93] block">Hotline tư vấn kỹ thuật</span>
                    <a href="tel:0900000000" className="font-bold text-[#102A43] hover:text-[#0B63CE]">
                      0900 000 000 (Zalo/Call)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#EAF3FC] text-[#0B63CE]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7C93] block">Email tiếp nhận bản vẽ & báo giá</span>
                    <span className="font-bold text-[#102A43]">baogia@ldpe-packaging.vn</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#EAF3FC] text-[#0B63CE]">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B7C93] block">Nhà máy sản xuất & gia công</span>
                    <span className="font-bold text-[#102A43]">KCN Tân Bình, TPHCM & KCN Tiên Sơn, Bắc Ninh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SePay Deposit Banner */}
            <div className="bg-[#062B4F] text-white p-5 rounded-2xl border border-[#103E6B] shadow-md space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B63CE] uppercase tracking-wider">
                <QrCode className="w-4 h-4" />
                <span>ĐẶT CỌC MẪU GIA CÔNG MÔ HÌNH THỬ NGHỆM</span>
              </div>
              <p className="text-xs text-[#D9E4EF]">
                Bạn muốn đặt cọc 100.000đ để kỹ sư làm khay mẫu chạy thử kích thước trước khi sản xuất hàng loạt?
              </p>
              <button
                onClick={handleOpenSepayDeposit}
                className="w-full btn-secondary text-xs py-2.5 justify-center font-bold"
              >
                Chuyển khoản cọc mẫu qua SePay QR
              </button>
            </div>
          </div>

          {/* Form Inputs Column */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-[#D9E4EF] shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#102A43]">Gửi yêu cầu thành công!</h3>
                <p className="text-[16px] text-[#40566F] max-w-md mx-auto">
                  Yêu cầu của bạn đã được ghi nhận. Bộ phận tư vấn sẽ kiểm tra thông tin và liên hệ lại trong thời gian sớm nhất.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-primary text-sm py-2 px-6"
                >
                  Gửi thêm yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-[21px] font-bold text-[#102A43] pb-2 border-b border-[#D9E4EF]">
                  Biểu mẫu thông tin yêu cầu báo giá
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      Tên doanh nghiệp / Cơ sở *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Công ty TNHH ABC..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      Người liên hệ *
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      Số điện thoại (Zalo) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0901234567"
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
                      placeholder="email@doanhnghiep.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      Sản phẩm cần đóng gói *
                    </label>
                    <input
                      type="text"
                      name="productToPack"
                      required
                      value={formData.productToPack}
                      onChange={handleInputChange}
                      placeholder="Vd: Chai lọ thủy tinh, Mạch điện tử..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      Nhóm vật liệu quan tâm
                    </label>
                    <select
                      name="materialGroup"
                      value={formData.materialGroup}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                    >
                      <option value="Màng LDPE dạng cuộn">Màng LDPE dạng cuộn</option>
                      <option value="Túi LDPE đóng gói">Túi LDPE đóng gói</option>
                      <option value="Màng co LDPE">Màng co LDPE</option>
                      <option value="Tấm và cuộn PE foam chống sốc">Tấm và cuộn PE foam chống sốc</option>
                      <option value="Khay và xốp định hình theo sản phẩm">Khay và xốp định hình theo sản phẩm</option>
                      <option value="Thanh, góc và nẹp PE foam">Thanh, góc và nẹp PE foam</option>
                      <option value="Túi và lớp đệm chống sốc">Túi và lớp đệm chống sốc</option>
                      <option value="Gia công LDPE và PE foam theo yêu cầu">Gia công LDPE và PE foam theo yêu cầu</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      Kích thước sản phẩm (D x R x C cm)
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      placeholder="Vd: 30 x 20 x 15 cm"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      Số lượng dự kiến (cái / cuộn)
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="Vd: 5.000 túi hoặc 100 cuộn"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      Điều kiện lưu kho hoặc vận chuyển
                    </label>
                    <input
                      type="text"
                      name="storageCondition"
                      value={formData.storageCondition}
                      onChange={handleInputChange}
                      placeholder="Kho lạnh, Chịu lực nén, Vận chuyển đường xa..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      Yêu cầu gia công
                    </label>
                    <input
                      type="text"
                      name="processingRequirements"
                      value={formData.processingRequirements}
                      onChange={handleInputChange}
                      placeholder="In logo, Cắt góc, Dán băng keo, Đục lỗ..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1">
                    Tải ảnh, bản vẽ hoặc tài liệu yêu cầu (nếu có)
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
                          "Kéo thả bản vẽ / hình ảnh sản phẩm vào đây (PDF, PNG, JPG, CAD)"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Consulting Content */}
                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1">
                    Nội dung cần tư vấn thêm
                  </label>
                  <textarea
                    name="consultingContent"
                    rows={3}
                    value={formData.consultingContent}
                    onChange={handleInputChange}
                    placeholder="Mô tả cụ thể mối lo ngại về chống sốc, yêu cầu độ bền hoặc tiến độ giao hàng..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D9E4EF] text-sm text-[#102A43] focus:outline-none focus:border-[#0B63CE]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button type="submit" className="w-full btn-primary py-3 justify-center gap-2 text-base">
                    <Send className="w-4 h-4" />
                    <span>Gửi yêu cầu báo giá</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* SePay QR Modal */}
      <SepayModal
        isOpen={isSepayOpen}
        onClose={() => setIsSepayOpen(false)}
        orderCode={orderCode || "102938"}
        amount={100000}
        customerName={formData.contactName || "Doanh nghiệp"}
      />
    </section>
  );
}
