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
  title: "Giải pháp LDPE & PE Foam Chống Sốc Theo Yêu Cầu | Sản xuất & Gia công Nhà máy",
  description: "Cung cấp màng LDPE, túi đóng gói, xốp PE foam chống sốc, khay định hình và các giải pháp bảo vệ sản phẩm theo kích thước, đặc tính và quy trình vận chuyển thực tế.",
  keywords: ["màng LDPE", "túi LDPE", "PE foam chống sốc", "khay định hình xốp PE", "bao bì bảo vệ sản phẩm", "gia công PE foam"],
  authors: [{ name: "Nhà Máy Sản Xuất & Gia Công LDPE" }],
  openGraph: {
    title: "Ôm trọn sản phẩm. Bảo vệ hàng hóa. Giữ vững uy tín thương hiệu.",
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
              "name": "Giải pháp LDPE & PE Foam Việt Nam",
              "url": "https://ldpe-packaging.vn",
              "logo": "https://ldpe-packaging.vn/logo.png",
              "description": "Nhà máy sản xuất màng nhựa LDPE, túi đóng gói, cuộn tấm PE foam chống sốc, khay xốp định hình theo yêu cầu.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+84-900-000-000",
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
