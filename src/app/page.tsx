"use client";

import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import PainPointsSection from "@/components/sections/PainPointsSection";
import ProductCatalogSection from "@/components/sections/ProductCatalogSection";
import IndustrySolutionsSection from "@/components/sections/IndustrySolutionsSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import QuoteFormSection from "@/components/sections/QuoteFormSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  const handleSelectProduct = (productTitle: string) => {
    setSelectedProduct(productTitle);
  };

  return (
    <main className="min-h-screen bg-brand-bg flex flex-col font-sans relative">
      {/* Sticky Header Navbar */}
      <Navbar />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Giới thiệu ngành LDPE */}
      <IntroSection />

      {/* 3. Vấn đề khách hàng */}
      <PainPointsSection />

      {/* 4. Danh mục sản phẩm */}
      <ProductCatalogSection onSelectProduct={handleSelectProduct} />

      {/* 5. Giải pháp theo ngành */}
      <IndustrySolutionsSection />

      {/* 6. Lợi ích dành cho doanh nghiệp */}
      <BenefitsSection />

      {/* 7. Chứng nhận kiểm định SGS REACH & RoHS */}
      <CertificationsSection />

      {/* 8. Quy trình làm việc 6 bước */}
      <WorkflowSection />

      {/* 9. Khối báo giá & Tích hợp SePay QR Payment */}
      <QuoteFormSection preselectedProduct={selectedProduct} />

      {/* 10. Kiến thức LDPE */}
      <FaqSection />

      {/* 11. CTA Cuối trang */}
      <FinalCtaSection />

      {/* Footer */}
      <Footer />

      {/* Floating Quick Contact Widget (Zalo & Hotline Call) */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5">
        <a
          href="https://zalo.me/0835726666"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0068FF] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform border border-white/40 backdrop-blur-md"
          title="Chat Zalo B2B 24/7"
        >
          <span className="font-bold text-[10px] sm:text-[11px]">Zalo</span>
        </a>
        <a
          href="tel:0835726666"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform border border-white/40 animate-bounce"
          title="Gọi Hotline 083 572 6666"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>
    </main>
  );
}
