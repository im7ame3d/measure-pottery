import type { Metadata } from "next";
import Contact from "@/views/Contact";

export const metadata: Metadata = { title: "تواصل معنا" };

export default function ContactPage() {
  return <Contact lang="ar" />;
}
