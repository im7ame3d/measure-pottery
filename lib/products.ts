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
};

export const PRODUCTS: Product[] = [
  { slug: "dune-vase", name: "Dune Vase", price: 420, tag: "One of a kind", category: "Vases", glaze: "#D9D2C7", image: "espresso", gallery: ["espresso", "studio", "cups_bisque", "mumsie"],
    description: "A tall, softly shouldered vase thrown in speckled stoneware and finished in our sand glaze. The glaze pools differently on every piece — this one is yours alone.",
    details: "Height 32 cm · Diameter 18 cm · Speckled stoneware, sand glaze · Food safe, watertight.",
    ar: { name: "مزهرية الكثبان", description: "مزهرية طويلة بكتفين ناعمين، مشكّلة على العجلة من الحجري المنقّط ومطلية بطلائنا الرملي. يتجمّع الطلاء بشكل مختلف في كل قطعة — وهذه القطعة لك وحدك.", details: "الارتفاع ٣٢ سم · القطر ١٨ سم · خزف حجري منقّط بطلاء رملي · آمنة للطعام ولا تسرّب الماء." } },
  { slug: "ash-glaze-cup-set", name: "Ash Glaze Cup Set", price: 260, category: "Cups & mugs", glaze: "#B9AFA2", image: "peekabrew", gallery: ["peekabrew", "eyes", "studio"],
    description: "Four everyday cups in our ash glaze, thrown to sit comfortably in the hand.",
    details: "250 ml each · Stoneware, ash glaze · Dishwasher safe.",
    ar: { name: "طقم أكواب بطلاء الرماد", description: "أربعة أكواب للاستخدام اليومي بطلاء الرماد، مشكّلة لتستقر براحة في اليد.", details: "٢٥٠ مل لكل كوب · خزف حجري بطلاء الرماد · آمنة في غسالة الصحون." } },
  { slug: "sand-serving-bowl", name: "Sand Serving Bowl", price: 310, tag: "New", category: "Bowls", glaze: "#D9D2C7", image: "cups_bisque", gallery: ["cups_bisque", "spread_close"],
    description: "A generous serving bowl with a soft, uneven rim — made for sharing.",
    details: "Diameter 28 cm · Stoneware, sand glaze · Dishwasher safe.",
    ar: { name: "زبدية تقديم رملية", description: "زبدية تقديم واسعة بحافة ناعمة غير منتظمة — صُنعت للمشاركة.", details: "القطر ٢٨ سم · خزف حجري بطلاء رملي · آمنة في غسالة الصحون." } },
  { slug: "stone-dinner-plate", name: "Stone Dinner Plate", price: 95, category: "Plates", glaze: "#8D8D8D", image: "spread_close", gallery: ["spread_close", "spread_wide"],
    description: "Our everyday dinner plate in speckled stoneware.",
    details: "Diameter 27 cm · Speckled stoneware · Dishwasher safe.",
    ar: { name: "طبق عشاء حجري", description: "طبق العشاء اليومي من الخزف الحجري المنقّط.", details: "القطر ٢٧ سم · خزف حجري منقّط · آمن في غسالة الصحون." } },
  { slug: "tide-bud-vase", name: "Tide Bud Vase", price: 180, tag: "One of a kind", category: "Vases", glaze: "#A7B3A5", image: "mumsie", gallery: ["mumsie", "studio"],
    description: "A small bud vase for a single stem. One of a kind.",
    details: "Height 14 cm · Stoneware · Watertight.",
    ar: { name: "مزهرية المدّ الصغيرة", description: "مزهرية صغيرة لزهرة واحدة. قطعة فريدة لا تتكرر.", details: "الارتفاع ١٤ سم · خزف حجري · لا تسرّب الماء." } },
  { slug: "espresso-cup-and-saucer", name: "Espresso Cup & Saucer", price: 85, category: "Cups & mugs", glaze: "#F2EEE8", image: "eyes", gallery: ["eyes", "peekabrew"],
    description: "A small, thick-walled espresso cup that keeps the heat in.",
    details: "90 ml · Stoneware · Dishwasher safe.",
    ar: { name: "فنجان إسبريسو مع صحن", description: "فنجان إسبريسو صغير بجدران سميكة تحفظ الحرارة.", details: "٩٠ مل · خزف حجري · آمن في غسالة الصحون." } },
  { slug: "fog-pasta-bowl", name: "Fog Pasta Bowl", price: 120, category: "Bowls", glaze: "#F2EEE8", image: "spread_wide", gallery: ["spread_wide", "spread_close"],
    description: "A wide, shallow bowl for pasta, salads and everything in between.",
    details: "Diameter 23 cm · Stoneware, fog glaze · Dishwasher safe.",
    ar: { name: "زبدية باستا الضباب", description: "زبدية عريضة وضحلة للباستا والسلطات وكل ما بينهما.", details: "القطر ٢٣ سم · خزف حجري بطلاء الضباب · آمنة في غسالة الصحون." } },
  { slug: "gift-set-morning-ritual", name: "Gift Set — Morning Ritual", price: 390, tag: "Gift set", category: "Gift sets", glaze: "#C9A88A", image: "studio", gallery: ["studio", "espresso"],
    description: "Two cups, two saucers and a small tray — gift-wrapped with a handwritten note.",
    details: "Gift-wrapped · Stoneware · Dishwasher safe.",
    ar: { name: "طقم هدايا — طقوس الصباح", description: "كوبان وصحنان وصينية صغيرة — مغلّفة كهدية مع بطاقة مكتوبة بخط اليد.", details: "مغلّف كهدية · خزف حجري · آمن في غسالة الصحون." } },
  { slug: "salt-side-plate", name: "Salt Side Plate", price: 70, category: "Plates", glaze: "#F2EEE8", image: "spread_close", gallery: ["spread_close"],
    description: "A side plate for bread, cake or small bites.",
    details: "Diameter 18 cm · Stoneware · Dishwasher safe.",
    ar: { name: "طبق جانبي بلون الملح", description: "طبق جانبي للخبز أو الكيك أو اللقيمات الصغيرة.", details: "القطر ١٨ سم · خزف حجري · آمن في غسالة الصحون." } },
];

export const CATEGORIES: Category[] = ["Cups & mugs", "Plates", "Bowls", "Vases", "Gift sets"];
export const GLAZES = ["#F2EEE8", "#D9D2C7", "#B9AFA2", "#8D8D8D", "#5E5A55", "#2B2B2B", "#A7B3A5", "#C9A88A"];

export const CATEGORY_AR: Record<Category, string> = { "Cups & mugs": "أكواب وفناجين", Plates: "أطباق", Bowls: "زبادي", Vases: "مزهريات", "Gift sets": "أطقم هدايا" };
export const TAG_AR: Record<string, string> = { "One of a kind": "قطعة فريدة", New: "جديد", "Gift set": "طقم هدايا" };

export const img = (key: string) => `/img/${key}.jpg`;
export const sar = (n: number, lang: Lang = "en") => (lang === "ar" ? `${num(n, "ar")} ر.س` : `${n.toLocaleString("en-US")} SAR`);
export const pName = (p: Product, lang: Lang) => (lang === "ar" ? p.ar.name : p.name);
export const catLabel = (c: Category, lang: Lang) => (lang === "ar" ? CATEGORY_AR[c] : c);
export const tagLabel = (t: string, lang: Lang) => (lang === "ar" ? TAG_AR[t] ?? t : t);
export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
