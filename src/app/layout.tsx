import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { CMSProvider } from "@/context/CMSContext";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ĐỨC PHÚC PE FOAM | Nhà Máy Sản Xuất & Gia Công Màng LDPE, Xốp PE Foam",
  description: "Cung cấp màng LDPE, túi đóng gói, xốp PE foam chống sốc, khay định hình và các giải pháp bảo vệ sản phẩm theo kích thước, đặc tính và quy trình vận chuyển thực tế từ Nhà Máy Đức Phúc.",
  keywords: ["Đức Phúc PE Foam", "màng LDPE", "túi LDPE", "PE foam chống sốc", "khay định hình xốp PE", "bao bì bảo vệ sản phẩm", "gia công PE foam"],
  authors: [{ name: "Nhà Máy Đức Phúc PE Foam" }],
  openGraph: {
    title: "ĐỨC PHÚC PE FOAM — Ôm trọn sản phẩm. Bảo vệ hàng hóa.",
    description: "Cung cấp giải pháp đóng gói & chống sốc LDPE/PE Foam gia công theo yêu cầu cho nhà máy, logistics, thương mại điện tử.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ĐỨC PHÚC PE FOAM",
              "url": "https://ldpe-packaging-website.vercel.app",
              "logo": "https://ldpe-packaging-website.vercel.app/images/ldpe/factory-hero.png",
              "description": "Nhà máy Đức Phúc chuyên sản xuất màng nhựa LDPE, túi đóng gói, cuộn tấm PE foam chống sốc, khay xốp định hình theo yêu cầu.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+84-835-726-666",
                "contactType": "customer service",
                "areaServed": "VN",
                "availableLanguage": "Vietnamese"
              }
            })
          }}
        />
      </head>
      <body className="bg-brand-bg text-brand-body antialiased selection:bg-brand-light-blue selection:text-brand-blue">
        <CMSProvider>{children}</CMSProvider>
      </body>
    </html>
  );
}
