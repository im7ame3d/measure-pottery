import type { Metadata } from "next";
import Business from "@/views/Business";

export const metadata: Metadata = { title: "For cafés & restaurants" };

export default function BusinessPage() {
  return <Business lang="en" />;
}
