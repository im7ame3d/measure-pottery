import type { Metadata } from "next";
import Shop from "@/views/Shop";

export const metadata: Metadata = { title: "المتجر" };

export default function ShopPage() {
  return <Shop lang="ar" />;
}
