import type { Metadata } from "next";
import { CartProvider } from "@/components/Cart";
import { LangProvider } from "@/components/Lang";
import { arFontVars } from "@/lib/fonts-ar";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: "Measure Ceramics — خزف مصنوع يدوياً", template: "%s · Measure Ceramics" },
  description: "أوانٍ مصنوعة يدوياً للمقاهي والمطاعم، وقطع خزفية فريدة لبيتك وهداياك. صُنعت في المملكة العربية السعودية.",
  icons: { icon: "/logo/mark.svg" },
  alternates: { languages: { en: "/en" } },
};

export default function ArabicRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={arFontVars}>
      <body>
        <LangProvider lang="ar"><CartProvider>{children}</CartProvider></LangProvider>
      </body>
    </html>
  );
}
