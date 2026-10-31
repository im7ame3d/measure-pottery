import type { Metadata } from "next";
import Business from "@/views/Business";

export const metadata: Metadata = { title: "للمقاهي والمطاعم" };

export default function BusinessPage() {
  return <Business lang="ar" />;
}
