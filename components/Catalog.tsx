"use client";

import { createContext, useContext, useMemo } from "react";
import type { Product } from "@/lib/products";

type CatalogCtx = { products: Product[]; bySlug: (slug: string) => Product | undefined };
const Ctx = createContext<CatalogCtx>({ products: [], bySlug: () => undefined });

/** Makes the published products (loaded on the server) available to the cart and checkout. */
export function CatalogProvider({ products, children }: { products: Product[]; children: React.ReactNode }) {
  const value = useMemo(() => {
    const map = new Map(products.map((p) => [p.slug, p]));
    return { products, bySlug: (slug: string) => map.get(slug) };
  }, [products]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCatalog = () => useContext(Ctx);
