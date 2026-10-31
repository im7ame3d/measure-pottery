"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, GLAZES, PRODUCTS, type Category } from "@/lib/products";

const COLLECTIONS = ["All", "Exclusive pieces", "Everyday tableware", "Gift sets", "New arrivals"] as const;

export default function ShopGrid() {
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
        {COLLECTIONS.map((c) => <button key={c} className={`chip ${collection === c ? "on" : ""}`} onClick={() => setCollection(c)} aria-pressed={collection === c}>{c}</button>)}
      </div>
      <section className="wrap shop">
        <aside aria-label="Filters">
          <div className="row" style={{ justifyContent: "space-between", paddingBottom: 14, borderBottom: "1px solid var(--ink)" }}>
            <span style={{ fontWeight: 600 }}>Filters</span><button className="small muted" onClick={reset}>Clear all</button>
          </div>
          <div className="fgroup">
            <h6>Category</h6>
            {CATEGORIES.map((c) => (
              <div className="opt" key={c}>
                <label><input type="checkbox" className="check" checked={cats.includes(c)} onChange={() => toggle(c)} />{c}</label>
                <span className="muted">{PRODUCTS.filter((p) => p.category === c).length}</span>
              </div>
            ))}
          </div>
          <div className="fgroup">
            <h6>Glaze colour</h6>
            <div className="swatches">
              {GLAZES.map((g) => <button key={g} className={`swatch ${glaze === g ? "on" : ""}`} style={{ background: g }} onClick={() => setGlaze(glaze === g ? null : g)} aria-label={`Glaze ${g}`} aria-pressed={glaze === g} />)}
            </div>
          </div>
          <div className="fgroup">
            <h6>Price (SAR)</h6>
            <input type="range" min={50} max={500} step={10} value={max} onChange={(e) => setMax(+e.target.value)} style={{ width: "100%", accentColor: "var(--ink)" }} aria-label="Maximum price" />
            <div className="small muted">Up to {max} SAR</div>
          </div>
          <div className="fgroup">
            <h6>Availability</h6>
            <div className="opt"><label><input type="checkbox" className="check" checked={unique} onChange={(e) => setUnique(e.target.checked)} />One-of-a-kind only</label></div>
          </div>
        </aside>
        <div>
          <div className="toolbar">
            <span className="small muted">Showing {list.length} of {PRODUCTS.length} pieces</span>
            <label className="row small" style={{ gap: 10 }}><span className="muted">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
            </label>
          </div>
          {list.length ? <div className="grid3">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
            : <p className="empty">No pieces match these filters. <button className="btn ghost" onClick={reset}>Clear filters</button></p>}
        </div>
      </section>
    </>
  );
}
