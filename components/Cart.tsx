"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { href, num, tr } from "@/lib/i18n";
import { bySlug, img, pName, sar } from "@/lib/products";
import Icon from "./Icon";
import { useLang } from "./Lang";

type Line = { slug: string; qty: number };
type CartCtx = {
  lines: Line[];
  count: number;
  subtotal: number;
  giftWrap: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  setGiftWrap: (v: boolean) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "measure-cart";
export const FREE_DELIVERY = 500;
export const GIFT_WRAP = 15;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [giftWrap, setGiftWrap] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved?.lines) { setLines(saved.lines); setGiftWrap(!!saved.giftWrap); }
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ lines, giftWrap })); } catch {}
  }, [lines, giftWrap]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((ls) => (ls.some((l) => l.slug === slug) ? ls.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l)) : [...ls, { slug, qty }]));
    setOpen(true);
  }, []);
  const setQty = useCallback((slug: string, qty: number) => setLines((ls) => (qty <= 0 ? ls.filter((l) => l.slug !== slug) : ls.map((l) => (l.slug === slug ? { ...l, qty } : l)))), []);
  const remove = useCallback((slug: string) => setLines((ls) => ls.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => { setLines([]); setGiftWrap(false); }, []);

  const value = useMemo(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + (bySlug(l.slug)?.price || 0) * l.qty, 0);
    return { lines, count, subtotal, giftWrap, open, setOpen, add, setQty, remove, setGiftWrap, clear };
  }, [lines, giftWrap, open, add, setQty, remove, clear]);

  return <Ctx.Provider value={value}>{children}<CartDrawer /></Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export function CartButton() {
  const { count, setOpen } = useCart();
  const lang = useLang();
  return (
    <button className="cartbtn" onClick={() => setOpen(true)} aria-label={tr(lang)(`Open cart, ${count} items`, `افتح السلة، ${num(count, "ar")} قطع`)}>
      <Icon name="bag" />
      {count > 0 && <span className="badge">{num(count, lang)}</span>}
    </button>
  );
}

export function Qty({ value, onChange, small }: { value: number; onChange: (n: number) => void; small?: boolean }) {
  const lang = useLang();
  const t = tr(lang);
  return (
    <div className="qty" style={small ? { height: 36, borderRadius: 6 } : undefined}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label={t("Decrease quantity", "إنقاص الكمية")}>−</button>
      <span aria-live="polite">{num(value, lang)}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label={t("Increase quantity", "زيادة الكمية")}>+</button>
    </div>
  );
}

function CartDrawer() {
  const { lines, open, setOpen, subtotal, setQty, remove, giftWrap, setGiftWrap } = useCart();
  const lang = useLang();
  const t = tr(lang);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);
  if (!open) return null;
  const left = Math.max(0, FREE_DELIVERY - subtotal);
  return (
    <>
      <div className="scrim" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={t("Your cart", "سلة التسوق")}>
        <div className="dhead">
          <h4>{t("Your cart", "سلة التسوق")} ({num(lines.reduce((s, l) => s + l.qty, 0), lang)})</h4>
          <button onClick={() => setOpen(false)} aria-label={t("Close cart", "إغلاق السلة")}><Icon name="x" /></button>
        </div>
        {lines.length === 0 ? (
          <div className="items"><p className="empty">{t("Your cart is empty.", "سلتك فارغة.")}<br /><Link className="btn ghost" href={href(lang, "/shop")} onClick={() => setOpen(false)} style={{ marginTop: 16 }}>{t("Shop pieces", "تسوّق القطع")}</Link></p></div>
        ) : (
          <>
            <div style={{ padding: "16px 32px 0" }}>
              <p className="small" style={{ marginBottom: 8 }}>{left > 0 ? t(<>You&apos;re <b>{sar(left)}</b> away from free delivery in Riyadh</>, <>باقي <b>{sar(left, lang)}</b> على التوصيل المجاني داخل الرياض</>) : t("You’ve unlocked free delivery in Riyadh", "حصلت على توصيل مجاني داخل الرياض")}</p>
              <div className="progress"><i style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY) * 100)}%` }} /></div>
            </div>
            <div className="items">
              {lines.map((l) => {
                const p = bySlug(l.slug);
                if (!p) return null;
                return (
                  <div className="item" key={l.slug}>
                    <div className="photo"><img src={img(p.image)} alt={pName(p, lang)} /></div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                      <div className="serif" style={{ fontSize: 20 }}>{pName(p, lang)}</div>
                      <div className="small" style={{ fontWeight: 500 }}>{sar(p.price, lang)}</div>
                      <Qty small value={l.qty} onChange={(n) => setQty(l.slug, n)} />
                    </div>
                    <button className="xs muted" onClick={() => remove(l.slug)} style={{ alignSelf: "flex-start" }}>{t("Remove", "إزالة")}</button>
                  </div>
                );
              })}
              <label className="row small" style={{ gap: 12, padding: "18px 0" }}>
                <input type="checkbox" className="check" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} />
                <Icon name="gift" size={18} /> {t(<>Add gift wrapping (+{GIFT_WRAP} SAR)</>, <>أضف تغليف الهدايا (+{num(GIFT_WRAP, lang)} ر.س)</>)}
              </label>
            </div>
            <div className="dfoot">
              <div className="row" style={{ justifyContent: "space-between", fontWeight: 600, fontSize: 18 }}><span>{t("Subtotal", "المجموع الفرعي")}</span><span>{sar(subtotal + (giftWrap ? GIFT_WRAP : 0), lang)}</span></div>
              <p className="xs muted">{t("Shipping calculated at checkout · or 4 interest-free payments with Tamara", "تُحسب رسوم الشحن عند الدفع · أو ٤ دفعات بدون فوائد مع تمارا")}</p>
              <Link className="btn primary block" href={href(lang, "/checkout")} onClick={() => setOpen(false)}>{t("Checkout", "إتمام الطلب")}</Link>
              <button className="btn secondary block" onClick={() => setOpen(false)}>{t("Continue shopping", "متابعة التسوق")}</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
