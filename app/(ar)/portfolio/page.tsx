import type { Metadata } from "next";
import { getProjects } from "@/lib/catalog";
import Portfolio from "@/views/Portfolio";

export const metadata: Metadata = { title: "أعمالنا" };

export default async function PortfolioPage() {
  return <Portfolio projects={await getProjects()} />;
}
