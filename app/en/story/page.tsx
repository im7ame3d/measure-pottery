import type { Metadata } from "next";
import Story from "@/views/Story";

export const metadata: Metadata = { title: "Our story" };

export default function StoryPage() {
  return <Story lang="en" />;
}
