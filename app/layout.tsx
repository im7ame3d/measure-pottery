import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Sans_Arabic } from "next/font/google";
import { CartProvider } from "@/components/Cart";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cormorant" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });
const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500"], variable: "--font-arabic" });

export const metadata: Metadata = {
  title: { default: "Measure Pottery — Handmade ceramics", template: "%s · Measure Pottery" },
  description: "Handmade tableware for cafés and restaurants, and one-of-a-kind ceramics for your home and gifts. Made in Saudi Arabia.",
  icons: { icon: "/logo/mark.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${arabic.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
