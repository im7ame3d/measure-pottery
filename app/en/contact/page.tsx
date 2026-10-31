import type { Metadata } from "next";
import Contact from "@/views/Contact";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <Contact lang="en" />;
}
