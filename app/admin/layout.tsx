import type { Metadata } from "next";
import { arFontVars } from "@/lib/fonts-ar";
import "../globals.css";
import "./admin.css";

export const metadata: Metadata = {
  title: { default: "لوحة التحكم · Measure Ceramics", template: "%s · لوحة التحكم" },
  robots: { index: false, follow: false },
  icons: { icon: "/logo/mark.svg" },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={arFontVars}>
      <body className="admin-body">{children}</body>
    </html>
  );
}
