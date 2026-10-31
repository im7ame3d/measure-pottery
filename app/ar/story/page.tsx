import type { Metadata } from "next";
import Story from "@/views/Story";

export const metadata: Metadata = { title: "قصتنا" };

export default function StoryPage() {
  return <Story lang="ar" />;
}
