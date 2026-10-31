import type { Metadata } from "next";
import Home from "@/views/Home";

export const metadata: Metadata = { description: "خزفٌ مصنوع على مقاسك — أوانٍ يدوية للمقاهي والمطاعم، وقطع حصرية لبيتك وهداياك." };

export default function HomePage() {
  return <Home lang="ar" />;
}
