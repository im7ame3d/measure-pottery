"use client";

import { useSearchParams } from "next/navigation";
import { useLang } from "@/components/Lang";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, type Category, type Product } from "@/lib/products";

/** Product grid. A ?c=<category> link (e.g. from the footer) quietly narrows it; there are no filter controls. */
export default function ShopGrid({ products: PRODUCTS }: { products: Product[] }) {
  const lang = useLang();
  const c = useSearchParams().get("c") as Category | null;
  const inCat = c && CATEGORIES.includes(c) ? PRODUCTS.filter((p) => p.category === c) : [];
  const list = inCat.length ? inCat : PRODUCTS; // empty category: show everything rather than a blank page
  return <div className="grid4">{list.map((p) => <ProductCard key={p.slug} p={p} lang={lang} />)}</div>;
}
