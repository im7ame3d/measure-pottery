"use client";

import { useCart } from "./Cart";
import { useLang } from "./Lang";

/** Full-width button that drops one of this product into the cart (the cart drawer opens). */
export default function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const lang = useLang();
  return <button type="button" className="btn primary block" onClick={() => add(slug, 1)}>{lang === "ar" ? "اقتنِه الآن" : "Get it now"}</button>;
}
