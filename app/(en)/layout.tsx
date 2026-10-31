import type { Metadata } from "next";
import { CartProvider } from "@/components/Cart";
import { LangProvider } from "@/components/Lang";
import { fontVars } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: "Measure Pottery — Handmade ceramics", template: "%s · Measure Pottery" },
  description: "Handmade tableware for cafés and restaurants, and one-of-a-kind ceramics for your home and gifts. Made in Saudi Arabia.",
  icons: { icon: "/logo/mark.svg" },
  alternates: { languages: { ar: "/ar" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <LangProvider lang="en"><CartProvider>{children}</CartProvider></LangProvider>
      </body>
    </html>
  );
}
