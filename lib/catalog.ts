import { PRODUCTS, type Category, type Product } from "./products";
import { PROJECTS, type Project } from "./projects";
import { SUPABASE_KEY, SUPABASE_URL } from "./supabase-config";

/**
 * Server-side reads of the published catalogue from the database. Cached under the "catalog" tag
 * for a minute; the admin dashboard refreshes it straight away after a save (see /api/revalidate).
 * Falls back to the built-in data if the database can't be reached, so the shop never goes blank.
 */
async function rest<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: { apikey: SUPABASE_KEY },
      next: { revalidate: 60, tags: ["catalog"] },
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

type ProductRow = {
  slug: string; name_en: string; name_ar: string; description_en: string; description_ar: string;
  details_en: string; details_ar: string; price: number | string; capacity_en: string | null; capacity_ar: string | null;
  category: string; images: string[]; sold_out: boolean;
};
type ProjectRow = {
  slug: string; name_en: string; name_ar: string; type_en: string; type_ar: string; city_en: string; city_ar: string;
  text_en: string; text_ar: string; logo_url: string | null; logo_height: number;
  images: { src: string; alt_en?: string; alt_ar?: string }[];
};

const toProduct = (r: ProductRow): Product => ({
  slug: r.slug,
  name: r.name_en,
  price: Number(r.price),
  category: r.category as Category,
  glaze: "",
  image: r.images[0] ?? "",
  gallery: r.images,
  description: r.description_en,
  details: r.details_en,
  ar: { name: r.name_ar, description: r.description_ar, details: r.details_ar },
  capacity: r.capacity_ar || r.capacity_en ? { en: r.capacity_en || r.capacity_ar || "", ar: r.capacity_ar || r.capacity_en || "" } : undefined,
  soldOut: r.sold_out,
});

const toProject = (r: ProjectRow): Project => ({
  id: r.slug,
  name: [r.name_en, r.name_ar],
  type: [r.type_en, r.type_ar],
  city: [r.city_en, r.city_ar],
  text: [r.text_en, r.text_ar],
  logo: { src: r.logo_url ?? "", h: r.logo_height },
  images: (r.images ?? []).map((im) => ({ src: im.src, alt: [im.alt_en ?? "", im.alt_ar ?? ""] as const })),
});

export async function getProducts(): Promise<Product[]> {
  const rows = await rest<ProductRow[]>("products?select=*&published=eq.true&order=sort.asc,created_at.asc");
  return rows ? rows.map(toProduct) : PRODUCTS;
}

export async function getProjects(): Promise<readonly Project[]> {
  const rows = await rest<ProjectRow[]>("projects?select=*&published=eq.true&order=sort.asc,created_at.asc");
  return rows ? rows.map(toProject) : PROJECTS;
}
