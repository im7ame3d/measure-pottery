"use client";

import { useState } from "react";
import { Qty, useCart } from "@/components/Cart";
import Icon from "@/components/Icon";
import { useLang } from "@/components/Lang";
import { num, tr } from "@/lib/i18n";
import { img, pName, sar, tagLabel, type Product } from "@/lib/products";

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
      <div className="gallery">
        <div className="thumbs">
          {p.gallery.map((g, i) => (
            <button key={g + i} className={i === active ? "on" : ""} onClick={() => setActive(i)} aria-label={t(`Show photo ${i + 1}`, `عرض الصورة ${num(i + 1, "ar")}`)}><img src={img(g)} alt="" /></button>
          ))}
        </div>
        <div className="photo mainpic"><img src={img(p.gallery[active])} alt={name} /></div>
      </div>
      <div>
        <div className="row" style={{ gap: 8 }}>
          {p.tag && <span className={`tag ${unique ? "dark" : ""}`}>{tagLabel(p.tag, lang)}</span>}
          {unique && <span className="tag">{t("Only 1 available", "متوفرة قطعة واحدة فقط")}</span>}
        </div>
        <h1 style={{ fontSize: 56, margin: "20px 0 12px" }}>{name}</h1>
        <div className="row" style={{ gap: 4, marginBottom: 22 }} aria-label={t("Rated 5 out of 5", "التقييم ٥ من ٥")}>
          {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" size={16} />)}<span className="small muted" style={{ marginInlineStart: 8 }}>{t("12 reviews", "١٢ تقييماً")}</span>
        </div>
        <div className="serif" style={{ fontSize: 34 }}>{sar(p.price, lang)}</div>
        <div className="tamara"><span className="tag" style={{ background: "#F3EFE8" }}>tamara</span>{t(<>Split into 4 payments of <b>{sar(Math.round((p.price / 4) * 100) / 100)}</b>. No interest.</>, <>قسّمها على ٤ دفعات بدون فوائد، قيمة كل دفعة <b>{sar(Math.round((p.price / 4) * 100) / 100, lang)}</b></>)}</div>
        <p className="muted" style={{ marginTop: 26 }}>{lang === "ar" ? p.ar.description : p.description}</p>
        <div className="divider" style={{ margin: "30px 0" }} />
        <label className="row" style={{ gap: 12, marginBottom: 16 }}>
          <input type="checkbox" className="check" checked={gift} onChange={(e) => setGift(e.target.checked)} />
          <Icon name="gift" size={18} /> {t("Add gift wrapping", "أضف تغليف الهدايا")} <span className="small muted">{t("(+15 SAR)", "(+١٥ ر.س)")}</span>
        </label>
        {gift && <div className="field" style={{ marginBottom: 8 }}><label htmlFor="msg">{t("Gift message (optional)", "رسالة الهدية (اختياري)")}</label><textarea id="msg" className="input" placeholder={t("Write a short note — we'll handwrite it on a card.", "اكتب رسالة قصيرة — سنكتبها بخط اليد على بطاقة.")} /></div>}
        <div className="row" style={{ gap: 12, marginTop: 18 }}>
          {!unique && <Qty value={qty} onChange={(n) => setQty(Math.max(1, n))} />}
          <button className="btn primary" style={{ flex: 1 }} onClick={() => add(p.slug, unique ? 1 : qty)}>{t("Add to cart", "أضف إلى السلة")} — {sar(p.price * (unique ? 1 : qty), lang)}</button>
        </div>
        <div className="row small muted" style={{ gap: 10, marginTop: 16 }}><Icon name="truck" size={18} /> {t("Ships in 2–4 days with OTO · Free over 500 SAR in Riyadh", "يُشحن خلال ٢–٤ أيام مع OTO · مجاناً فوق ٥٠٠ ريال داخل الرياض")}</div>
        <div style={{ marginTop: 28, borderTop: "1px solid var(--line)" }}>
          <details open><summary>{t(<>Details &amp; dimensions</>, "التفاصيل والمقاسات")}</summary><p>{lang === "ar" ? p.ar.details : p.details}</p></details>
          <details><summary>{t("Care", "العناية")}</summary><p>{t("Dishwasher and microwave safe unless noted. Avoid sudden temperature changes. Each piece is handmade, so small variations in glaze and shape are part of its character.", "آمنة في غسالة الصحون والمايكروويف ما لم يُذكر غير ذلك. تجنّب التغيّرات المفاجئة في الحرارة. كل قطعة مصنوعة يدوياً، لذا فإن الاختلافات البسيطة في الطلاء والشكل جزء من طابعها.")}</p></details>
          <details><summary>{t(<>Shipping &amp; returns</>, "الشحن والاسترجاع")}</summary><p>{t("Shipped with OTO within 2–4 business days across the Kingdom. Returns accepted within 7 days on unused pieces; one-of-a-kind and personalised pieces are final sale.", "نشحن مع OTO خلال ٢–٤ أيام عمل إلى جميع أنحاء المملكة. يُقبل الاسترجاع خلال ٧ أيام للقطع غير المستخدمة؛ القطع الفريدة والمخصّصة غير قابلة للاسترجاع.")}</p></details>
        </div>
      </div>
    </section>
  );
}
