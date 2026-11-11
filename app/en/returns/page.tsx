import type { Metadata } from "next";
import Returns from "@/views/Returns";

export const metadata: Metadata = { title: "Returns & exchanges" };

export default function ReturnsPage() {
  return <Returns lang="en" />;
}
