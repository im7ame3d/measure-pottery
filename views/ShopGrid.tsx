"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useLang } from "@/components/Lang";
import ProductCard from "@/components/ProductCard";
import { num, tr } from "@/lib/i18n";
import { CATEGORIES, GLAZES, PRODUCTS, catLabel, type Category } from "@/lib/products";

const COLLECTIONS = ["All", "Exclusive pieces", "Everyday tableware", "Gift sets", "New arrivals"] as const;
const COLLECTIONS_AR: Record<(typeof COLLECTIONS)[number], string> = { All: "الكل", "Exclusive pieces": "قطع حصرية", "Everyday tableware": "أواني يومية", "Gift sets": "أطقم هدايا", "New arrivals": "وصل حديثاً" };

export default function ShopGrid() {
  const lang = useLang();
  const t = tr(lang);
  const params = useSearchParams();
  const initial = params.get("c") as Category | null;
  const [cats, setCats] = useState<Category[]>(initial && CATEGORIES.includes(initial) ? [initial] : []);
  const [glaze, setGlaze] = useState<string | null>(null);
  const [max, setMax] = useState(500);
  const [unique, setUnique] = useState(false);
  const [collection, setCollection] = useState<(typeof COLLECTIONS)[number]>("All");
  const [sort, setSort] = useState("featured");

  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => (cats.length ? cats.includes(p.category) : true) && (!glaze || p.glaze === glaze) && p.price <= max && (!unique || p.tag === "One of a kind"));
    if (collection === "Exclusive pieces") l = l.filter((p) => p.tag === "One of a kind");
    if (collection === "Everyday tableware") l = l.filter((p) => !p.tag);
    if (collection === "Gift sets") l = l.filter((p) => p.category === "Gift sets");
    if (collection === "New arrivals") l = l.filter((p) => p.tag === "New");
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [cats, glaze, max, unique, collection, sort]);

  const toggle = (c: Category) => setCats((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));
  const reset = () => { setCats([]); setGlaze(null); setMax(500); setUnique(false); setCollection("All"); };

  return (
    <>
      <div className="wrap row" style={{ gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
        {COLLECTIONS.map((c) => <button key={c} className={`chip ${collection === c ? "on" : ""}`} onClick={() => setCollection(c)} aria-pressed={collection === c}>{t(c, COLLECTIONS_AR[c])}</button>)}
      </div>
      <section className="wrap shop">
        <aside aria-label={t("Filters", "الفلاتر")}>
          <div className="row" style={{ justifyContent: "space-between", paddingBottom: 14, borderBottom: "1px solid var(--ink)" }}>
            <span style={{ fontWeight: 600 }}>{t("Filters", "الفلاتر")}</span><button className="small muted" onClick={reset}>{t("Clear all", "مسح الكل")}</button>
          </div>
          <div className="fgroup">
            <h6>{t("Category", "الفئة")}</h6>
            {CATEGORIES.map((c) => (
              <div className="opt" key={c}>
                <label><input type="checkbox" className="check" checked={cats.includes(c)} onChange={() => toggle(c)} />{catLabel(c, lang)}</label>
                <span className="muted">{num(PRODUCTS.filter((p) => p.category === c).length, lang)}</span>
              </div>
            ))}
          </div>
          <div className="fgroup">
            <h6>{t("Glaze colour", "لون الطلاء")}</h6>
            <div className="swatches">
              {GLAZES.map((g) => <button key={g} className={`swatch ${glaze === g ? "on" : ""}`} style={{ background: g }} onClick={() => setGlaze(glaze === g ? null : g)} aria-label={t(`Glaze ${g}`, `طلاء ${g}`)} aria-pressed={glaze === g} />)}
            </div>
          </div>
          <div className="fgroup">
            <h6>{t("Price (SAR)", "السعر (ر.س)")}</h6>
            <input type="range" min={50} max={500} step={10} value={max} onChange={(e) => setMax(+e.target.value)} style={{ width: "100%", accentColor: "var(--ink)" }} aria-label={t("Maximum price", "الحد الأعلى للسعر")} />
            <div className="small muted">{t(<>Up to {max} SAR</>, <>حتى {num(max, lang)} ر.س</>)}</div>
          </div>
          <div className="fgroup">
            <h6>{t("Availability", "التوفّر")}</h6>
            <div className="opt"><label><input type="checkbox" className="check" checked={unique} onChange={(e) => setUnique(e.target.checked)} />{t("One-of-a-kind only", "القطع الفريدة فقط")}</label></div>
          </div>
        </aside>
        <div>
          <div className="toolbar">
            <span className="small muted">{t(<>Showing {list.length} of {PRODUCTS.length} pieces</>, <>عرض {num(list.length, lang)} من {num(PRODUCTS.length, lang)} قطع</>)}</span>
            <label className="row small" style={{ gap: 10 }}><span className="muted">{t("Sort by", "ترتيب حسب")}</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">{t("Featured", "المميّزة")}</option><option value="low">{t("Price: low to high", "السعر: من الأقل إلى الأعلى")}</option><option value="high">{t("Price: high to low", "السعر: من الأعلى إلى الأقل")}</option></select>
            </label>
          </div>
          {list.length ? <div className="grid3">{list.map((p) => <ProductCard key={p.slug} p={p} lang={lang} />)}</div>
            : <p className="empty">{t("No pieces match these filters.", "لا توجد قطع تطابق هذه الفلاتر.")} <button className="btn ghost" onClick={reset}>{t("Clear filters", "مسح الفلاتر")}</button></p>}
        </div>
      </section>
    </>
  );
}
