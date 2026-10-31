import type { Metadata } from "next";
import Checkout from "@/views/Checkout";

export const metadata: Metadata = { title: "إتمام الطلب" };

export default function CheckoutPage() {
  return <Checkout />;
}
