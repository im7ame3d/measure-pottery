import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, bySlug, pName } from "@/lib/products";
import Product from "@/views/Product";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return { title: p ? pName(p, "ar") : "منتج", description: p?.ar.description };
}

export default async function ProductPage({ params }: Props) {
  const p = bySlug((await params).slug);
  if (!p) notFound();
  return <Product p={p} lang="ar" />;
}
