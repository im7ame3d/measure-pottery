"use client";

import Link from "next/link";
import { useState } from "react";
import { GIFT_WRAP, useCart } from "@/components/Cart";
import { Logo } from "@/components/Chrome";
import Icon from "@/components/Icon";
import { bySlug, img, sar } from "@/lib/products";

const DELIVERY = [
  { id: "standard", title: "Standard delivery", sub: "2–4 business days", price: 25 },
  { id: "express", title: "Express delivery", sub: "Next business day · Riyadh only", price: 45 },
  { id: "pickup", title: "Studio pickup", sub: "Ready in 1 business day", price: 0 },
];
const PAYMENT = [["card", "mada / Visa / Mastercard", "Card"], ["apple", "Apple Pay", "Apple Pay"], ["tamara", "Split into 4 payments", "tamara"]];

export default function Checkout() {
  const { lines, subtotal, giftWrap, clear } = useCart();
  const [ship, setShip] = useState("standard");
  const [pay, setPay] = useState("card");
  const [placed, setPlaced] = useState<string | null>(null);
  const shipping = DELIVERY.find((d) => d.id === ship)!.price;
  const free = ship === "standard" && subtotal >= 500;
  const total = subtotal + (giftWrap ? GIFT_WRAP : 0) + (free ? 0 : shipping);
  const step = placed ? 3 : 1;

  return (
    <>
      <header className="wrap checkout-head">
        <Logo />
        <div className="cksteps" aria-label="Checkout steps">
          {["Shipping", "Payment", "Confirmation"].map((t, i) => (
            <span key={t} className="row" style={{ gap: 14 }}>
              <span className={`row ${i + 1 <= step ? "on" : ""}`} style={{ gap: 10 }}><span className="dot">{i + 1}</span><span className="label">{t}</span></span>
              {i < 2 && <span className="bar" />}
            </span>
          ))}
        </div>
        <span className="small muted row" style={{ gap: 8 }}><Icon name="lock" size={16} /> Secure checkout</span>
      </header>

      {placed ? (
        <main className="wrap" style={{ padding: "120px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div className="eyebrow">Order {placed}</div>
          <h1>Thank you — your order is in.</h1>
          <p className="lead" style={{ maxWidth: 520 }}>We&apos;ll pack it by hand and send your OTO tracking link within two business days.</p>
          <Link className="btn primary" href="/shop">Keep shopping</Link>
        </main>
      ) : lines.length === 0 ? (
        <main className="wrap" style={{ padding: "120px 0", textAlign: "center" }}>
          <h1>Your cart is empty</h1>
          <p className="lead" style={{ margin: "16px auto 28px" }}>Add a piece or two, then come back here to check out.</p>
          <Link className="btn primary" href="/shop">Shop pieces</Link>
        </main>
      ) : (
        <form className="wrap checkout" onSubmit={(e) => { e.preventDefault(); setPlaced("#" + (1000 + Math.floor(Math.random() * 9000))); clear(); window.scrollTo(0, 0); }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
            <fieldset style={{ border: 0 }}>
              <h3 style={{ marginBottom: 22 }}>Contact</h3>
              <div className="grid2">
                <div className="field"><label htmlFor="em">Email</label><input id="em" className="input" type="email" required placeholder="name@email.com" /></div>
                <div className="field"><label htmlFor="ph">Mobile number</label><input id="ph" className="input" type="tel" required placeholder="+966 5X XXX XXXX" /></div>
              </div>
            </fieldset>
            <fieldset style={{ border: 0 }}>
              <h3 style={{ marginBottom: 22 }}>Shipping address</h3>
              <div className="grid2">
                <div className="field"><label htmlFor="fn">First name</label><input id="fn" className="input" required /></div>
                <div className="field"><label htmlFor="ln">Last name</label><input id="ln" className="input" required /></div>
                <div className="field span2"><label htmlFor="st">Street address</label><input id="st" className="input" required placeholder="Street, building number" /></div>
                <div className="field"><label htmlFor="ct">City</label><select id="ct" className="input"><option>Riyadh</option><option>Jeddah</option><option>Dammam</option><option>Khobar</option><option>Makkah</option><option>Madinah</option></select></div>
                <div className="field"><label htmlFor="ds">District</label><input id="ds" className="input" required /></div>
                <div className="field"><label htmlFor="pc">Postal code</label><input id="pc" className="input" inputMode="numeric" placeholder="12345" /></div>
                <div className="field"><label htmlFor="na">National address short code</label><input id="na" className="input" placeholder="ABCD1234" /></div>
              </div>
            </fieldset>
            <fieldset style={{ border: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <legend><h3>Delivery method</h3><p className="small muted" style={{ margin: "6px 0 18px" }}>Shipped and tracked via OTO.</p></legend>
              {DELIVERY.map((d) => (
                <label key={d.id} className="radio-opt">
                  <input type="radio" name="ship" checked={ship === d.id} onChange={() => setShip(d.id)} />
                  <span style={{ flex: 1 }}><b style={{ fontWeight: 500, display: "block" }}>{d.title}</b><span className="small muted">{d.sub}</span></span>
                  <b style={{ fontWeight: 500 }}>{d.price ? (d.id === "standard" && free ? "Free" : sar(d.price)) : "Free"}</b>
                </label>
              ))}
            </fieldset>
            <fieldset style={{ border: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <legend><h3 style={{ marginBottom: 18 }}>Payment</h3></legend>
              {PAYMENT.map(([id, t, tag]) => (
                <label key={id} className="radio-opt">
                  <input type="radio" name="pay" checked={pay === id} onChange={() => setPay(id)} />
                  <span style={{ flex: 1, fontWeight: 500 }}>{t}</span><span className="tag">{tag}</span>
                </label>
              ))}
            </fieldset>
            <button className="btn primary" style={{ alignSelf: "flex-start", padding: "0 44px" }}>Place order — {sar(total)}</button>
          </div>
          <aside className="card summary">
            <h4>Order summary</h4>
            {lines.map((l) => {
              const p = bySlug(l.slug)!;
              return (
                <div className="line" key={l.slug}>
                  <div className="photo"><img src={img(p.image)} alt={p.name} /></div>
                  <div style={{ flex: 1 }}><div className="serif" style={{ fontSize: 19 }}>{p.name}</div><div className="xs muted">Qty {l.qty}</div></div>
                  <span className="small" style={{ fontWeight: 500 }}>{sar(p.price * l.qty)}</span>
                </div>
              );
            })}
            {giftWrap && <div className="row small" style={{ gap: 10, padding: "12px 14px", background: "var(--bg)", borderRadius: 8 }}><Icon name="gift" size={18} /> Gift wrapping + handwritten note <span style={{ marginLeft: "auto" }}>{GIFT_WRAP} SAR</span></div>}
            <div className="divider" />
            <div className="sumrow"><span className="muted">Subtotal</span><span>{sar(subtotal)}</span></div>
            <div className="sumrow"><span className="muted">Shipping</span><span>{free || !shipping ? "Free" : sar(shipping)}</span></div>
            <div className="sumrow"><span className="muted">VAT (15%) included</span><span>{sar(Math.round((total - total / 1.15) * 100) / 100)}</span></div>
            <div className="divider" />
            <div className="sumrow total"><span>Total</span><span>{sar(total)}</span></div>
            <p className="xs muted">or 4 interest-free payments of {sar(Math.round((total / 4) * 100) / 100)} with Tamara</p>
          </aside>
        </form>
      )}
    </>
  );
}
