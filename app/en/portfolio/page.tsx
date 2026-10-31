import type { Metadata } from "next";
import Portfolio from "@/views/Portfolio";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return <Portfolio />;
}
