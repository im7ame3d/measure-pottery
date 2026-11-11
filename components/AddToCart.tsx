"use client";

import { useCart } from "./Cart";
import { useLang } from "./Lang";

/** Full-width button that drops one of this product into the cart (the cart drawer opens). */
export default function AddToCart({ slug, soldOut = false }: { slug: string; soldOut?: boolean }) {
  const { add } = useCart();
  const lang = useLang();
  if (soldOut) return <button type="button" className="btn primary block buy" disabled>{lang === "ar" ? "نفدت الكمية" : "Sold out"}</button>;
  return <button type="button" className="btn primary block buy" onClick={() => add(slug, 1)}>{lang === "ar" ? "اقتنِه الآن" : "Get it now"}</button>;
}
