"use client";

import { useState } from "react";
import { Qty, useCart } from "@/components/Cart";
import Icon from "@/components/Icon";
import { useLang } from "@/components/Lang";
import { num, tr } from "@/lib/i18n";
import { img, pName, sar, type Product } from "@/lib/products";

export default function BuyBox({ p }: { p: Product }) {
  const { add } = useCart();
  const lang = useLang();
  const t = tr(lang);
  const name = pName(p, lang);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [gift, setGift] = useState(false);
  const unique = p.tag === "One of a kind";
  return (
    <section className="wrap pdp">
      <div className={`gallery${p.gallery.length > 1 ? "" : " single"}`}>
        {p.gallery.length > 1 && (
        <div className="thumbs">
          {p.gallery.map((g, i) => (
            <button key={g + i} className={i === active ? "on" : ""} onClick={() => setActive(i)} aria-label={t(`Show photo ${i + 1}`, `عرض الصورة ${num(i + 1, "ar")}`)}><img src={img(g)} alt="" /></button>
          ))}
        </div>
        )}
        <div className="photo mainpic"><img src={img(p.gallery[active])} alt={name} /></div>
      </div>
      <div>
        <h1 style={{ fontSize: 56, margin: "0 0 18px" }}>{name}</h1>
        <div className="serif" style={{ fontSize: 34 }}>{sar(p.price, lang)}</div>
        <div className="small muted" style={{ marginTop: 8 }}>{t(<>Or 4 interest-free payments of <b>{sar(Math.round((p.price / 4) * 100) / 100)}</b> with Tamara</>, <>أو ٤ دفعات بدون فوائد مع تمارا، قيمة كل دفعة <b>{sar(Math.round((p.price / 4) * 100) / 100, lang)}</b></>)}</div>
        <p className="muted" style={{ marginTop: 26 }}>{lang === "ar" ? p.ar.description : p.description}</p>
        <div className="divider" style={{ margin: "30px 0" }} />
        <label className="row" style={{ gap: 12, marginBottom: 16 }}>
          <input type="checkbox" className="check" checked={gift} onChange={(e) => setGift(e.target.checked)} />
          <Icon name="gift" size={18} /> {t("Add gift wrapping", "أضف تغليف الهدايا")} <span className="small muted">{t(`(+${sar(15)})`, `(+${sar(15, "ar")})`)}</span>
        </label>
        {gift && <div className="field" style={{ marginBottom: 8 }}><label htmlFor="msg">{t("Gift message (optional)", "رسالة الهدية (اختياري)")}</label><textarea id="msg" className="input" placeholder={t("Write a short note — we'll handwrite it on a card.", "اكتب رسالة قصيرة — سنكتبها بخط اليد على بطاقة.")} /></div>}
        <div className="row" style={{ gap: 12, marginTop: 18 }}>
          {!unique && <Qty value={qty} onChange={(n) => setQty(Math.max(1, n))} />}
          <button className="btn primary buy" style={{ flex: 1 }} onClick={() => add(p.slug, unique ? 1 : qty)}>{t("Get it now", "اقتنِه الآن")}</button>
        </div>
        {p.capacity && (
          <div style={{ marginTop: 28, borderTop: "1px solid var(--line)" }}>
            <details open><summary>{t("Capacity", "السعة")}</summary><p>{lang === "ar" ? p.capacity.ar : p.capacity.en}</p></details>
          </div>
        )}
      </div>
    </section>
  );
}
