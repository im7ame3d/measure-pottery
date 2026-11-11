import type { Metadata } from "next";
import { CartProvider } from "@/components/Cart";
import { LangProvider } from "@/components/Lang";
import { enFontVars } from "@/lib/fonts-en";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Measure Ceramics — Handmade ceramics studio", template: "%s · Measure Ceramics" },
  description: "Handmade tableware for cafés and restaurants, and one-of-a-kind ceramics for your home and gifts. Made in Saudi Arabia.",
  icons: { icon: "/logo/mark.svg" },
  openGraph: { siteName: "Measure Ceramics", locale: "en_US", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={enFontVars}>
      <body>
        <LangProvider lang="en"><CartProvider>{children}</CartProvider></LangProvider>
      </body>
    </html>
  );
}
