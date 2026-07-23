"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, Copy, RefreshCw, ShieldCheck, QrCode } from "lucide-react";

interface SepayModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderCode?: string;
  amount?: number;
  customerName?: string;
}

export default function SepayModal({
  isOpen,
  onClose,
  orderCode = "DP8888",
  amount = 500000,
  customerName = "Khách hàng B2B",
}: SepayModalProps) {
  const [copiedMemo, setCopiedMemo] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success">("pending");
  const [secondsLeft, setSecondsLeft] = useState(1800); // 30 mins

  const bankName = "MBBank";
  const accountNumber = "0835726666";
  const accountHolder = "CONG TY TNHH SAN XUAT PE FOAM DUC PHUC";
  const prefix = "LDPE";
  const memo = `${prefix}${orderCode}`;

  const qrUrl = `https://qr.sepay.vn/img?acc=${accountNumber}&bank=${bankName}&amount=${amount}&des=${memo}`;

  useEffect(() => {
    if (!isOpen) return;

    // Timer countdown
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Polling payment status check
    const pollInterval = setInterval(() => {
      fetch(`/api/sepay/status?memo=${memo}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "paid") {
            setPaymentStatus("success");
          }
        })
        .catch(() => {});
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(pollInterval);
    };
  }, [isOpen, memo]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, type: "memo" | "acc") => {
    navigator.clipboard.writeText(text);
    if (type === "memo") {
      setCopiedMemo(true);
      setTimeout(() => setCopiedMemo(false), 2000);
    } else {
      setCopiedAcc(true);
      setTimeout(() => setCopiedAcc(false), 2000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D9E4EF]">
        {/* Modal Header */}
        <div className="bg-[#062B4F] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#0B63CE]" />
            <h3 className="font-bold text-lg">Thanh toán chuyển khoản SePay QR</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#6B7C93] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {paymentStatus === "pending" ? (
            <>
              {/* Status Notice */}
              <div className="bg-[#EAF3FC] border border-[#D9E4EF] p-3.5 rounded-xl flex items-center justify-between text-xs text-[#102A43]">
                <div className="flex items-center gap-2 font-medium">
                  <RefreshCw className="w-4 h-4 text-[#0B63CE] animate-spin" />
                  <span>Đang kiểm tra giao dịch tự động...</span>
                </div>
                <span className="font-bold text-amber-600 bg-white px-2 py-0.5 rounded border border-amber-200">
                  {formatTime(secondsLeft)}
                </span>
              </div>

              {/* QR Image & Bank Details */}
              <div className="flex flex-col md:flex-row items-center gap-6 bg-[#F7FAFC] p-4 rounded-xl border border-[#D9E4EF]">
                <div className="bg-white p-2 rounded-lg border border-[#D9E4EF] shadow-sm shrink-0">
                  <img
                    src={qrUrl}
                    alt={`SePay QR ${memo}`}
                    className="w-44 h-44 object-contain"
                  />
                  <p className="text-[10px] text-center text-[#6B7C93] mt-1">Quét bằng ứng dụng Ngân hàng</p>
                </div>

                <div className="space-y-3 text-sm w-full">
                  <div>
                    <span className="text-xs text-[#6B7C93] block">Ngân hàng thụ hưởng</span>
                    <span className="font-bold text-[#102A43]">{bankName}</span>
                  </div>

                  <div>
                    <span className="text-xs text-[#6B7C93] block">Số tài khoản</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#102A43]">{accountNumber}</span>
                      <button
                        onClick={() => copyToClipboard(accountNumber, "acc")}
                        className="text-xs text-[#0B63CE] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedAcc ? "Đã chép" : "Sao chép"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-[#6B7C93] block">Chủ tài khoản</span>
                    <span className="font-semibold text-[#102A43]">{accountHolder}</span>
                  </div>

                  <div>
                    <span className="text-xs text-[#6B7C93] block">Số tiền thanh toán</span>
                    <span className="font-bold text-[#0B63CE] text-lg">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Code Notice */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 uppercase">
                    NỘI DUNG CHUYỂN KHOẢN (BẮT BUỘC ĐÚNG)
                  </span>
                  <button
                    onClick={() => copyToClipboard(memo, "memo")}
                    className="text-xs font-bold text-[#0B63CE] hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedMemo ? "Đã chép mã" : "Sao chép mã"}
                  </button>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-amber-300 font-mono font-bold text-lg text-center text-[#102A43] tracking-wider">
                  {memo}
                </div>

                <p className="text-[11px] text-amber-800 leading-normal">
                  📌 Quý khách vui lòng điền đúng mã <strong className="font-bold text-[#102A43]">{memo}</strong> trong nội dung chuyển khoản để hệ thống tự động xác minh đơn hàng.
                </p>
              </div>

              {/* Manual Confirmation Button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setPaymentStatus("success")}
                  className="w-full btn-primary text-sm py-2.5 justify-center"
                >
                  Tôi đã hoàn tất chuyển khoản
                </button>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-[#102A43]">Thanh toán thành công!</h4>
              <p className="text-sm text-[#40566F] max-w-sm mx-auto">
                Cảm ơn quý khách <strong className="text-[#102A43]">{customerName}</strong>. Hệ thống đã ghi nhận thanh toán cho đơn hàng <strong className="text-[#0B63CE]">{memo}</strong>.
              </p>
              <div className="p-4 bg-[#EAF3FC] rounded-xl text-xs text-[#102A43] space-y-1 text-left">
                <p>• Bộ phận kỹ thuật sẽ tiến hành gia công / làm mẫu sản phẩm.</p>
                <p>• Nhân viên hỗ trợ sẽ gọi điện lại xác nhận lịch giao hàng.</p>
              </div>
              <button onClick={onClose} className="btn-primary text-sm py-2 px-6 mt-4">
                Đóng cửa sổ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
