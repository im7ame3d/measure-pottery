import type { Metadata } from "next";
import Terms from "@/views/Terms";

export const metadata: Metadata = { title: "الشروط والأحكام" };

export default function TermsPage() {
  return <Terms lang="ar" />;
}
