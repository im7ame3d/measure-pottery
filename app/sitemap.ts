import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

/** Every public page in Arabic (at the root) and English (under /en). */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/shop", "/portfolio", "/story", "/contact", "/returns", "/privacy", "/terms", ...PRODUCTS.map((p) => `/product/${p.slug}`)];
  return paths.map((path) => {
    const ar = `${SITE_URL}${path === "/" ? "" : path}`;
    const en = `${SITE_URL}/en${path === "/" ? "" : path}`;
    return { url: ar, alternates: { languages: { ar, en } } };
  });
}
