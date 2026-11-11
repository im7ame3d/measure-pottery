import type { Metadata } from "next";
import Privacy from "@/views/Privacy";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return <Privacy lang="en" />;
}
