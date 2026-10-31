import { num, type Lang } from "./i18n";

export type Category = "Cups & mugs" | "Plates" | "Bowls" | "Vases" | "Gift sets";

export type Product = {
  slug: string;
  name: string;
  price: number;
  tag?: string;
  category: Category;
  glaze: string;
  image: string;
  gallery: string[];
  description: string;
  details: string;
  ar: { name: string; description: string; details: string };
  /** Shown under the "السعة" heading on the product page, e.g. { en: "250 ml", ar: "٢٥٠ مل" }. */
  capacity?: { en: string; ar: string };
};

export const PRODUCTS: Product[] = [
  { slug: "wave-whisper-cup-and-saucer", name: "Wave Whisper Cup & Saucer", price: 699, category: "Cups & mugs", glaze: "#8FB3B8", image: "wave-whisper", gallery: ["wave-whisper"],
    description: "A handmade cup and saucer. A soft sea-blue glaze flows over the rim like a whisper of waves, above bare, sand-coloured clay.",
    details: "Handmade cup with saucer · Glazed stoneware · Each piece varies slightly in glaze and form.",
    ar: { name: "كوب وصحن همس الموج", description: "كوب وصحن مصنوعان يدوياً، بطلاء أزرق بلون البحر ينساب على الحافة كهمس الموج، فوق طين بلون الرمل.", details: "كوب مع صحن مصنوعان يدوياً · خزف مطليّ · تختلف كل قطعة قليلاً في الطلاء والشكل." } },
  { slug: "beach-princess-mug", name: "Beach Princess Mug", price: 799, category: "Cups & mugs", glaze: "#2F6E86", image: "beach-princess", gallery: ["beach-princess"],
    description: "A handmade mug in a deep ocean-blue glaze that melts down onto bare sandy clay like a wave meeting the shore, with a small window framing a hand-painted blue flower.",
    details: "Handmade mug · Glazed stoneware · Each piece varies slightly in glaze and form.",
    ar: { name: "أميرة الشاطئ", description: "كوب مصنوع يدوياً بطلاء أزرق عميق يذوب نحو الأسفل كموجة تلامس الرمل، مع نافذة صغيرة تحتضن زهرة زرقاء مرسومة باليد.", details: "كوب مصنوع يدوياً · خزف مطليّ · تختلف كل قطعة قليلاً في الطلاء والشكل." } },
];

export const CATEGORIES: Category[] = ["Cups & mugs", "Plates", "Bowls", "Vases", "Gift sets"];
export const GLAZES = ["#F2EEE8", "#D9D2C7", "#B9AFA2", "#8D8D8D", "#5E5A55", "#2B2B2B", "#A7B3A5", "#C9A88A"];

export const CATEGORY_AR: Record<Category, string> = { "Cups & mugs": "أكواب وفناجين", Plates: "أطباق", Bowls: "زبادي", Vases: "مزهريات", "Gift sets": "أطقم هدايا" };
export const TAG_AR: Record<string, string> = { "One of a kind": "قطعة فريدة", New: "جديد", "Gift set": "طقم هدايا" };

export const img = (key: string) => `/img/${key}.jpg`;
export const sar = (n: number, lang: Lang = "en") => (lang === "ar" ? `${num(n, "ar")} ⃁` : `⃁ ${n.toLocaleString("en-US")}`);
export const pName = (p: Product, lang: Lang) => (lang === "ar" ? p.ar.name : p.name);
export const catLabel = (c: Category, lang: Lang) => (lang === "ar" ? CATEGORY_AR[c] : c);
export const tagLabel = (t: string, lang: Lang) => (lang === "ar" ? TAG_AR[t] ?? t : t);
export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
