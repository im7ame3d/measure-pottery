import type { Metadata } from "next";
import Returns from "@/views/Returns";

export const metadata: Metadata = { title: "سياسة الاستبدال والاسترجاع" };

export default function ReturnsPage() {
  return <Returns lang="ar" />;
}
