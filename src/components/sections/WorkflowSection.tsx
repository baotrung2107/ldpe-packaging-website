"use client";

import { useCMS } from "@/context/CMSContext";
import { ClipboardList, Search, FileText, PackageCheck, Factory, RefreshCw } from "lucide-react";

export default function WorkflowSection() {
  const { getOverride } = useCMS();

  const title = getOverride("workflow_title", "Quy trình làm việc 6 bước chuẩn nhà máy");
  const desc = getOverride("workflow_desc", "Từ ý tưởng và mẫu sản phẩm ban đầu đến lô hàng hoàn chỉnh đạt chuẩn xuất xưởng.");

  const defaultSteps = [
    {
      step: "Bước một",
      title: "Tiếp nhận thông tin",
      desc: "Khách hàng cung cấp sản phẩm mẫu, kích thước, trọng lượng, sản lượng và yêu cầu vận chuyển.",
      icon: ClipboardList,
    },
    {
      step: "Bước hai",
      title: "Phân tích nhu cầu bảo vệ",
      desc: "Đánh giá bề mặt, cạnh, góc, điểm dễ va đập, khoảng trống và điều kiện lưu kho.",
      icon: Search,
    },
    {
      step: "Bước ba",
      title: "Đề xuất giải pháp",
      desc: "Tư vấn loại vật liệu, độ dày, kích thước, cấu trúc túi hoặc phương án xốp định hình.",
      icon: FileText,
    },
    {
      step: "Bước bốn",
      title: "Làm mẫu và kiểm tra",
      desc: "Sản xuất mẫu thử để kiểm tra độ vừa vặn, khả năng bảo vệ và thao tác đóng gói.",
      icon: PackageCheck,
    },
    {
      step: "Bước năm",
      title: "Sản xuất theo yêu cầu",
      desc: "Tiến hành sản xuất theo thông số đã thống nhất.",
      icon: Factory,
    },
    {
      step: "Bước sáu",
      title: "Theo dõi và tối ưu",
      desc: "Tiếp nhận phản hồi để điều chỉnh vật liệu hoặc cấu trúc đóng gói cho các đơn hàng tiếp theo.",
      icon: RefreshCw,
    },
  ];

  const steps = getOverride("workflow_steps", defaultSteps);

  return (
    <section id="quy-trinh" className="py-16 md:py-24 bg-white border-t border-[#D9E4EF]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-3 py-1 rounded-full border border-[#D9E4EF]">
            QUY TRÌNH HỢP TÁC B2B
          </span>
          <h2
            className="text-[30px] md:text-[40px] font-bold text-[#102A43]"
            data-cms-section="workflow"
            data-cms-id="workflow_title"
            data-cms-type="text"
          >
            {title}
          </h2>
          <p
            className="text-[16px] md:text-[17px] text-[#40566F]"
            data-cms-section="workflow"
            data-cms-id="workflow_desc"
            data-cms-type="text"
          >
            {desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((s: any, idx: number) => {
            const Icon = s.icon || Factory;
            return (
              <div
                key={idx}
                className="bg-[#F7FAFC] p-6 rounded-2xl border border-[#D9E4EF] hover:border-[#0B63CE] transition-all duration-200 relative group"
                data-cms-section="workflow"
                data-cms-id={`workflow_step_${idx}`}
                data-cms-type="repeater"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#0B63CE] uppercase tracking-wider bg-[#EAF3FC] px-2.5 py-1 rounded-md">
                    {s.step || `Bước ${idx + 1}`}
                  </span>
                  <div className="p-3 rounded-xl bg-[#062B4F] text-[#0B63CE] group-hover:bg-[#0B63CE] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3
                  className="text-[20px] font-bold text-[#102A43] mb-2"
                  data-cms-section="workflow"
                  data-cms-id={`workflow_title_${idx}`}
                  data-cms-type="text"
                >
                  {s.title}
                </h3>

                <p
                  className="text-[15px] text-[#40566F] leading-relaxed"
                  data-cms-section="workflow"
                  data-cms-id={`workflow_desc_${idx}`}
                  data-cms-type="text"
                >
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
