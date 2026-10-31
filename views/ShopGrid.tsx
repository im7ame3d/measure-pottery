"use client";

import { useSearchParams } from "next/navigation";
import { useLang } from "@/components/Lang";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";

/** Product grid. A ?c=<category> link (e.g. from the footer) quietly narrows it; there are no filter controls. */
export default function ShopGrid() {
  const lang = useLang();
  const c = useSearchParams().get("c") as Category | null;
  const list = c && CATEGORIES.includes(c) ? PRODUCTS.filter((p) => p.category === c) : PRODUCTS;
  return <div className="grid4">{list.map((p) => <ProductCard key={p.slug} p={p} lang={lang} />)}</div>;
}
