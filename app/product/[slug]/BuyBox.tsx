"use client";

import { useState } from "react";
import { Qty, useCart } from "@/components/Cart";
import Icon from "@/components/Icon";
import { img, sar, type Product } from "@/lib/products";

export default function BuyBox({ p }: { p: Product }) {
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [gift, setGift] = useState(false);
  const unique = p.tag === "One of a kind";
  return (
    <section className="wrap pdp">
      <div className="gallery">
        <div className="thumbs">
          {p.gallery.map((g, i) => (
            <button key={g + i} className={i === active ? "on" : ""} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`}><img src={img(g)} alt="" /></button>
          ))}
        </div>
        <div className="photo mainpic"><img src={img(p.gallery[active])} alt={p.name} /></div>
      </div>
      <div>
        <div className="row" style={{ gap: 8 }}>
          {p.tag && <span className={`tag ${unique ? "dark" : ""}`}>{p.tag}</span>}
          {unique && <span className="tag">Only 1 available</span>}
        </div>
        <h1 style={{ fontSize: 56, margin: "20px 0 12px" }}>{p.name}</h1>
        <div className="row" style={{ gap: 4, marginBottom: 22 }} aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" size={16} />)}<span className="small muted" style={{ marginLeft: 8 }}>12 reviews</span>
        </div>
        <div className="serif" style={{ fontSize: 34 }}>{sar(p.price)}</div>
        <div className="tamara"><span className="tag" style={{ background: "#F3EFE8" }}>tamara</span>Split into 4 payments of <b>{sar(Math.round((p.price / 4) * 100) / 100)}</b>. No interest.</div>
        <p className="muted" style={{ marginTop: 26 }}>{p.description}</p>
        <div className="divider" style={{ margin: "30px 0" }} />
        <label className="row" style={{ gap: 12, marginBottom: 16 }}>
          <input type="checkbox" className="check" checked={gift} onChange={(e) => setGift(e.target.checked)} />
          <Icon name="gift" size={18} /> Add gift wrapping <span className="small muted">(+15 SAR)</span>
        </label>
        {gift && <div className="field" style={{ marginBottom: 8 }}><label htmlFor="msg">Gift message (optional)</label><textarea id="msg" className="input" placeholder="Write a short note — we'll handwrite it on a card." /></div>}
        <div className="row" style={{ gap: 12, marginTop: 18 }}>
          {!unique && <Qty value={qty} onChange={(n) => setQty(Math.max(1, n))} />}
          <button className="btn primary" style={{ flex: 1 }} onClick={() => add(p.slug, unique ? 1 : qty)}>Add to cart — {sar(p.price * (unique ? 1 : qty))}</button>
          <button className="btn secondary" style={{ width: 52, padding: 0 }} aria-label="Add to wishlist"><Icon name="heart" /></button>
        </div>
        <div className="row small muted" style={{ gap: 10, marginTop: 16 }}><Icon name="truck" size={18} /> Ships in 2–4 days with OTO · Free over 500 SAR in Riyadh</div>
        <div style={{ marginTop: 28, borderTop: "1px solid var(--line)" }}>
          <details open><summary>Details &amp; dimensions</summary><p>{p.details}</p></details>
          <details><summary>Care</summary><p>Dishwasher and microwave safe unless noted. Avoid sudden temperature changes. Each piece is handmade, so small variations in glaze and shape are part of its character.</p></details>
          <details><summary>Shipping &amp; returns</summary><p>Shipped with OTO within 2–4 business days across the Kingdom. Returns accepted within 7 days on unused pieces; one-of-a-kind and personalised pieces are final sale.</p></details>
        </div>
      </div>
    </section>
  );
}
