import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/catalog";
import { pName } from "@/lib/products";
import Product from "@/views/Product";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const p = (await getProducts()).find((x) => x.slug === slug);
  return { title: p ? pName(p, "ar") : "منتج", description: p?.ar.description };
}

export default async function ProductPage({ params }: Props) {
  const products = await getProducts();
  const slug = (await params).slug;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  return <Product p={p} products={products} lang="ar" />;
}
