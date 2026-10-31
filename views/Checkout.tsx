"use client";

import Link from "next/link";
import { useState } from "react";
import { GIFT_WRAP, useCart } from "@/components/Cart";
import { Logo } from "@/components/Chrome";
import Icon from "@/components/Icon";
import { useLang } from "@/components/Lang";
import { href, num, tr } from "@/lib/i18n";
import { bySlug, img, pName, sar } from "@/lib/products";

const DELIVERY = [
  { id: "standard", title: "Standard delivery", sub: "2–4 business days", price: 25, ar: ["توصيل عادي", "٢–٤ أيام عمل"] },
  { id: "express", title: "Express delivery", sub: "Next business day · Riyadh only", price: 45, ar: ["توصيل سريع", "يوم العمل التالي · داخل الرياض فقط"] },
  { id: "pickup", title: "Studio pickup", sub: "Ready in 1 business day", price: 0, ar: ["الاستلام من المرسم", "جاهز خلال يوم عمل واحد"] },
];
const PAYMENT = [["card", "mada / Visa / Mastercard", "Card", "مدى / فيزا / ماستركارد", "بطاقة"], ["apple", "Apple Pay", "Apple Pay", "Apple Pay", "Apple Pay"], ["tamara", "Split into 4 payments", "tamara", "قسّمها على ٤ دفعات", "تمارا"]];
const CITIES = [["Riyadh", "الرياض"], ["Jeddah", "جدة"], ["Dammam", "الدمام"], ["Khobar", "الخبر"], ["Makkah", "مكة المكرمة"], ["Madinah", "المدينة المنورة"]];

export default function Checkout() {
  const { lines, subtotal, giftWrap, clear } = useCart();
  const lang = useLang();
  const t = tr(lang);
  const free_ = t("Free", "مجاناً");
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
        <div className="cksteps" aria-label={t("Checkout steps", "خطوات الطلب")}>
          {t(["Shipping", "Payment", "Confirmation"], ["الشحن", "الدفع", "التأكيد"]).map((s, i) => (
            <span key={s} className="row" style={{ gap: 14 }}>
              <span className={`row ${i + 1 <= step ? "on" : ""}`} style={{ gap: 10 }}><span className="dot">{num(i + 1, lang)}</span><span className="label">{s}</span></span>
              {i < 2 && <span className="bar" />}
            </span>
          ))}
        </div>
        <span className="small muted row" style={{ gap: 8 }}><Icon name="lock" size={16} /> {t("Secure checkout", "دفع آمن")}</span>
      </header>

      {placed ? (
        <main className="wrap" style={{ padding: "120px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div className="eyebrow">{t("Order", "الطلب")} {placed}</div>
          <h1>{t("Thank you — your order is in.", "شكراً لك — تم استلام طلبك.")}</h1>
          <p className="lead" style={{ maxWidth: 520 }}>{t(<>We&apos;ll pack it by hand and send your OTO tracking link within two business days.</>, "سنغلّفه بأيدينا ونرسل لك رابط تتبّع الشحنة من OTO خلال يومي عمل.")}</p>
          <Link className="btn primary" href={href(lang, "/shop")}>{t("Keep shopping", "متابعة التسوق")}</Link>
        </main>
      ) : lines.length === 0 ? (
        <main className="wrap" style={{ padding: "120px 0", textAlign: "center" }}>
          <h1>{t("Your cart is empty", "سلتك فارغة")}</h1>
          <p className="lead" style={{ margin: "16px auto 28px" }}>{t("Add a piece or two, then come back here to check out.", "أضف قطعة أو اثنتين، ثم عد إلى هنا لإتمام الطلب.")}</p>
          <Link className="btn primary" href={href(lang, "/shop")}>{t("Shop pieces", "تسوّق القطع")}</Link>
        </main>
      ) : (
        <form className="wrap checkout" onSubmit={(e) => { e.preventDefault(); setPlaced("#" + num(1000 + Math.floor(Math.random() * 9000), lang).replace(/[,٬]/g, "")); clear(); window.scrollTo(0, 0); }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
            <fieldset style={{ border: 0 }}>
              <h3 style={{ marginBottom: 22 }}>{t("Contact", "بيانات التواصل")}</h3>
              <div className="grid2">
                <div className="field"><label htmlFor="em">{t("Email", "البريد الإلكتروني")}</label><input id="em" className="input" type="email" required placeholder="name@email.com" /></div>
                <div className="field"><label htmlFor="ph">{t("Mobile number", "رقم الجوال")}</label><input id="ph" className="input" type="tel" dir="ltr" required placeholder="+966 5X XXX XXXX" /></div>
              </div>
            </fieldset>
            <fieldset style={{ border: 0 }}>
              <h3 style={{ marginBottom: 22 }}>{t("Shipping address", "عنوان الشحن")}</h3>
              <div className="grid2">
                <div className="field"><label htmlFor="fn">{t("First name", "الاسم الأول")}</label><input id="fn" className="input" required /></div>
                <div className="field"><label htmlFor="ln">{t("Last name", "اسم العائلة")}</label><input id="ln" className="input" required /></div>
                <div className="field span2"><label htmlFor="st">{t("Street address", "عنوان الشارع")}</label><input id="st" className="input" required placeholder={t("Street, building number", "الشارع، رقم المبنى")} /></div>
                <div className="field"><label htmlFor="ct">{t("City", "المدينة")}</label><select id="ct" className="input">{CITIES.map(([en, ar]) => <option key={en} value={en}>{t(en, ar)}</option>)}</select></div>
                <div className="field"><label htmlFor="ds">{t("District", "الحي")}</label><input id="ds" className="input" required /></div>
                <div className="field"><label htmlFor="pc">{t("Postal code", "الرمز البريدي")}</label><input id="pc" className="input" inputMode="numeric" placeholder="12345" /></div>
                <div className="field"><label htmlFor="na">{t("National address short code", "الرمز المختصر للعنوان الوطني")}</label><input id="na" className="input" placeholder="ABCD1234" /></div>
              </div>
            </fieldset>
            <fieldset style={{ border: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <legend><h3>{t("Delivery method", "طريقة التوصيل")}</h3><p className="small muted" style={{ margin: "6px 0 18px" }}>{t("Shipped and tracked via OTO.", "الشحن والتتبّع عبر OTO.")}</p></legend>
              {DELIVERY.map((d) => (
                <label key={d.id} className="radio-opt">
                  <input type="radio" name="ship" checked={ship === d.id} onChange={() => setShip(d.id)} />
                  <span style={{ flex: 1 }}><b style={{ fontWeight: 500, display: "block" }}>{t(d.title, d.ar[0])}</b><span className="small muted">{t(d.sub, d.ar[1])}</span></span>
                  <b style={{ fontWeight: 500 }}>{d.price ? (d.id === "standard" && free ? free_ : sar(d.price, lang)) : free_}</b>
                </label>
              ))}
            </fieldset>
            <fieldset style={{ border: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <legend><h3 style={{ marginBottom: 18 }}>{t("Payment", "الدفع")}</h3></legend>
              {PAYMENT.map(([id, en, tag, ar, tagAr]) => (
                <label key={id} className="radio-opt">
                  <input type="radio" name="pay" checked={pay === id} onChange={() => setPay(id)} />
                  <span style={{ flex: 1, fontWeight: 500 }}>{t(en, ar)}</span><span className="tag">{t(tag, tagAr)}</span>
                </label>
              ))}
            </fieldset>
            <button className="btn primary" style={{ alignSelf: "flex-start", padding: "0 44px" }}>{t("Place order", "تأكيد الطلب")} — {sar(total, lang)}</button>
          </div>
          <aside className="card summary">
            <h4>{t("Order summary", "ملخص الطلب")}</h4>
            {lines.map((l) => {
              const p = bySlug(l.slug)!;
              return (
                <div className="line" key={l.slug}>
                  <div className="photo"><img src={img(p.image)} alt={pName(p, lang)} /></div>
                  <div style={{ flex: 1 }}><div className="serif" style={{ fontSize: 19 }}>{pName(p, lang)}</div><div className="xs muted">{t("Qty", "الكمية")} {num(l.qty, lang)}</div></div>
                  <span className="small" style={{ fontWeight: 500 }}>{sar(p.price * l.qty, lang)}</span>
                </div>
              );
            })}
            {giftWrap && <div className="row small" style={{ gap: 10, padding: "12px 14px", background: "var(--bg)", borderRadius: 8 }}><Icon name="gift" size={18} /> {t("Gift wrapping + handwritten note", "تغليف هدايا + بطاقة بخط اليد")} <span style={{ marginInlineStart: "auto" }}>{sar(GIFT_WRAP, lang)}</span></div>}
            <div className="divider" />
            <div className="sumrow"><span className="muted">{t("Subtotal", "المجموع الفرعي")}</span><span>{sar(subtotal, lang)}</span></div>
            <div className="sumrow"><span className="muted">{t("Shipping", "الشحن")}</span><span>{free || !shipping ? free_ : sar(shipping, lang)}</span></div>
            <div className="sumrow"><span className="muted">{t("VAT (15%) included", "شامل ضريبة القيمة المضافة (١٥٪)")}</span><span>{sar(Math.round((total - total / 1.15) * 100) / 100, lang)}</span></div>
            <div className="divider" />
            <div className="sumrow total"><span>{t("Total", "الإجمالي")}</span><span>{sar(total, lang)}</span></div>
            <p className="xs muted">{t(<>or 4 interest-free payments of {sar(Math.round((total / 4) * 100) / 100)} with Tamara</>, <>أو ٤ دفعات بدون فوائد قيمة كل منها {sar(Math.round((total / 4) * 100) / 100, lang)} مع تمارا</>)}</p>
          </aside>
        </form>
      )}
    </>
  );
}
