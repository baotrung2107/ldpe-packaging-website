"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import PainPointsSection from "@/components/sections/PainPointsSection";
import ProductCatalogSection from "@/components/sections/ProductCatalogSection";
import IndustrySolutionsSection from "@/components/sections/IndustrySolutionsSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
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
    <main className="min-h-screen bg-brand-bg flex flex-col font-sans">
      {/* Sticky Header Navbar */}
      <Navbar />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Giới thiệu ngành LDPE */}
      <IntroSection />

      {/* 3. Vấn đề khách hàng */}
      <PainPointsSection />

      {/* 4. Danh mục sản phẩm (8 sản phẩm & CTAs) */}
      <ProductCatalogSection onSelectProduct={handleSelectProduct} />

      {/* 5. Giải pháp theo ngành (7 ngành) */}
      <IndustrySolutionsSection />

      {/* 6. Lợi ích dành cho doanh nghiệp (10 lợi ích) */}
      <BenefitsSection />

      {/* 7. Quy trình làm việc 6 bước */}
      <WorkflowSection />

      {/* 8. Khối báo giá & Tích hợp SePay QR Payment */}
      <QuoteFormSection preselectedProduct={selectedProduct} />

      {/* 9. Kiến thức LDPE (6 FAQs Accordion) */}
      <FaqSection />

      {/* 10. CTA Cuối trang */}
      <FinalCtaSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
