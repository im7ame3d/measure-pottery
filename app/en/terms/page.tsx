import type { Metadata } from "next";
import Terms from "@/views/Terms";

export const metadata: Metadata = { title: "Terms & conditions" };

export default function TermsPage() {
  return <Terms lang="en" />;
}
