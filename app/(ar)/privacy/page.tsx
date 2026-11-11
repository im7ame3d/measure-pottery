import type { Metadata } from "next";
import Privacy from "@/views/Privacy";

export const metadata: Metadata = { title: "سياسة الخصوصية" };

export default function PrivacyPage() {
  return <Privacy lang="ar" />;
}
