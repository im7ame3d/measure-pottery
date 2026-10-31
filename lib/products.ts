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
};

export const PRODUCTS: Product[] = [
  { slug: "dune-vase-no-07", name: "Dune Vase No. 07", price: 420, tag: "One of a kind", category: "Vases", glaze: "#D9D2C7", image: "espresso", gallery: ["espresso", "studio", "cups_bisque", "mumsie"],
    description: "A tall, softly shouldered vase thrown in speckled stoneware and finished in our sand glaze. The glaze pools differently on every piece — this one is yours alone.",
    details: "Height 32 cm · Diameter 18 cm · Speckled stoneware, sand glaze · Food safe, watertight." },
  { slug: "ash-glaze-cup-set", name: "Ash Glaze Cup Set ×4", price: 260, category: "Cups & mugs", glaze: "#B9AFA2", image: "peekabrew", gallery: ["peekabrew", "eyes", "studio"],
    description: "Four everyday cups in our ash glaze, thrown to sit comfortably in the hand.",
    details: "250 ml each · Stoneware, ash glaze · Dishwasher safe." },
  { slug: "sand-serving-bowl", name: "Sand Serving Bowl", price: 310, tag: "New", category: "Bowls", glaze: "#D9D2C7", image: "cups_bisque", gallery: ["cups_bisque", "spread_close"],
    description: "A generous serving bowl with a soft, uneven rim — made for sharing.",
    details: "Diameter 28 cm · Stoneware, sand glaze · Dishwasher safe." },
  { slug: "stone-dinner-plate", name: "Stone Dinner Plate", price: 95, category: "Plates", glaze: "#8D8D8D", image: "spread_close", gallery: ["spread_close", "spread_wide"],
    description: "Our everyday dinner plate in speckled stoneware.",
    details: "Diameter 27 cm · Speckled stoneware · Dishwasher safe." },
  { slug: "tide-bud-vase", name: "Tide Bud Vase", price: 180, tag: "One of a kind", category: "Vases", glaze: "#A7B3A5", image: "mumsie", gallery: ["mumsie", "studio"],
    description: "A small bud vase for a single stem. One of a kind.",
    details: "Height 14 cm · Stoneware · Watertight." },
  { slug: "espresso-cup-and-saucer", name: "Espresso Cup & Saucer", price: 85, category: "Cups & mugs", glaze: "#F2EEE8", image: "eyes", gallery: ["eyes", "peekabrew"],
    description: "A small, thick-walled espresso cup that keeps the heat in.",
    details: "90 ml · Stoneware · Dishwasher safe." },
  { slug: "fog-pasta-bowl", name: "Fog Pasta Bowl", price: 120, category: "Bowls", glaze: "#F2EEE8", image: "spread_wide", gallery: ["spread_wide", "spread_close"],
    description: "A wide, shallow bowl for pasta, salads and everything in between.",
    details: "Diameter 23 cm · Stoneware, fog glaze · Dishwasher safe." },
  { slug: "gift-set-morning-ritual", name: "Gift Set — Morning Ritual", price: 390, tag: "Gift set", category: "Gift sets", glaze: "#C9A88A", image: "studio", gallery: ["studio", "espresso"],
    description: "Two cups, two saucers and a small tray — gift-wrapped with a handwritten note.",
    details: "Gift-wrapped · Stoneware · Dishwasher safe." },
  { slug: "salt-side-plate", name: "Salt Side Plate", price: 70, category: "Plates", glaze: "#F2EEE8", image: "spread_close", gallery: ["spread_close"],
    description: "A side plate for bread, cake or small bites.",
    details: "Diameter 18 cm · Stoneware · Dishwasher safe." },
];

export const CATEGORIES: Category[] = ["Cups & mugs", "Plates", "Bowls", "Vases", "Gift sets"];
export const GLAZES = ["#F2EEE8", "#D9D2C7", "#B9AFA2", "#8D8D8D", "#5E5A55", "#2B2B2B", "#A7B3A5", "#C9A88A"];

export const img = (key: string) => `/img/${key}.jpg`;
export const sar = (n: number) => `${n.toLocaleString("en-US")} SAR`;
export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
