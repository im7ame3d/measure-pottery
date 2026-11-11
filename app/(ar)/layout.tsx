import type { Metadata } from "next";
import { CartProvider } from "@/components/Cart";
import { CatalogProvider } from "@/components/Catalog";
import { LangProvider } from "@/components/Lang";
import { arFontVars } from "@/lib/fonts-ar";
import { getProducts } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Measure Ceramics — خزف مصنوع يدوياً", template: "%s · Measure Ceramics" },
  description: "أوانٍ مصنوعة يدوياً للمقاهي والمطاعم، وقطع خزفية فريدة لبيتك وهداياك. صُنعت في المملكة العربية السعودية.",
  icons: { icon: "/logo/mark.svg" },
  openGraph: { siteName: "Measure Ceramics", locale: "ar_SA", type: "website" },
};

export default async function ArabicRootLayout({ children }: { children: React.ReactNode }) {
  const products = await getProducts();
  return (
    <html lang="ar" dir="rtl" className={arFontVars}>
      <body>
        <LangProvider lang="ar"><CatalogProvider products={products}><CartProvider>{children}</CartProvider></CatalogProvider></LangProvider>
      </body>
    </html>
  );
}
