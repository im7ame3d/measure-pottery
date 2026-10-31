"use client";

import Link from "next/link";
import { useState } from "react";
import { Footer, Header } from "@/components/Chrome";
import Icon from "@/components/Icon";
import { useLang } from "@/components/Lang";
import { href, tr } from "@/lib/i18n";
import { img } from "@/lib/products";

const CASES = [
  { type: "Café", city: "Riyadh", text: "Custom espresso cups with a stamped logo and matte charcoal glaze.", im: "peekabrew", ar: ["مقهى", "الرياض", "فناجين إسبريسو مخصّصة بختم الشعار وطلاء فحمي مطفي."] },
  { type: "Restaurant", city: "Jeddah", text: "A full dinner service — plates, bowls and sharing platters.", im: "spread_wide", ar: ["مطعم", "جدة", "طقم عشاء كامل — أطباق وزبادي وأطباق مشاركة."] },
  { type: "Hotel", city: "AlUla", text: "Breakfast tableware in a desert-sand glaze for the lounge.", im: "cups_bisque", ar: ["فندق", "العُلا", "أواني إفطار بطلاء رمل الصحراء لصالة الضيوف."] },
  { type: "Café", city: "Khobar", text: "Pour-over sets and cups for a specialty coffee bar.", im: "eyes", ar: ["مقهى", "الخبر", "أطقم تقطير وأكواب لمقهى قهوة مختصة."] },
  { type: "Restaurant", city: "Riyadh", text: "Hand-thrown bowls for a tasting menu.", im: "mumsie", ar: ["مطعم", "الرياض", "زبادي مشكّلة يدوياً لقائمة تذوّق."] },
  { type: "Café", city: "Dammam", text: "Takeaway-counter mugs and saucers.", im: "studio", ar: ["مقهى", "الدمام", "أكواب وصحون لركن الطلبات الخارجية."] },
];
const FILTERS = ["All", "Cafés", "Restaurants", "Hotels"];
const FILTERS_AR: Record<string, string> = { All: "الكل", "Cafés": "المقاهي", Restaurants: "المطاعم", Hotels: "الفنادق" };

export default function Portfolio() {
  const lang = useLang();
  const t = tr(lang);
  const ar = lang === "ar";
  const [f, setF] = useState("All");
  const list = CASES.filter((c) => f === "All" || f.startsWith(c.type));
  return (
    <>
      <Header />
      <main>
        <section className="wrap" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="crumb">{t("Home / Portfolio", "الرئيسية / أعمالنا")}</div>
          <h1 style={{ marginTop: 18 }}>{t("Our clients", "عملاؤنا")}</h1>
          <p className="lead" style={{ marginTop: 12 }}>{t("Cafés, restaurants and hotels serving on Measure tableware.", "مقاهٍ ومطاعم وفنادق تقدّم ضيافتها في أواني Measure.")}</p>
          <div className="row" style={{ gap: 10, marginTop: 32, flexWrap: "wrap" }}>
            {FILTERS.map((x) => <button key={x} className={`chip ${f === x ? "on" : ""}`} aria-pressed={f === x} onClick={() => setF(x)}>{t(x, FILTERS_AR[x])}</button>)}
          </div>
        </section>
        <section className="wrap" style={{ paddingBottom: 96 }}>
          <div className="featured">
            <div className="photo"><img src={img("spread_close")} alt={t("Featured project: a restaurant tableware collection", "مشروع مميّز: مجموعة أواني لمطعم")} /></div>
            <div className="copy">
              <span className="eyebrow">{t("Featured project", "مشروع مميّز")}</span>
              <h2>{t("Client name", "اسم العميل")}</h2>
              <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>{t(["Restaurant", "Riyadh", "420 pieces"], ["مطعم", "الرياض", "٤٢٠ قطعة"]).map((x) => <span key={x} className="tag">{x}</span>)}</div>
              <p className="muted">{t(<>A complete tableware collection — from bread plates to dessert bowls — glazed to echo the restaurant&apos;s limestone walls.</>, "مجموعة أوانٍ متكاملة — من أطباق الخبز إلى زبادي الحلى — بطلاء يحاكي جدران المطعم الحجرية.")}</p>
              <div className="pull"><span className="serif" style={{ fontSize: 22 }}>{t("“Every plate feels like part of the room.”", "«كل طبق يبدو جزءاً من المكان.»")}</span><div className="xs muted" style={{ marginTop: 6 }}>{t("— Owner name, Head chef", "— اسم المالك، رئيس الطهاة")}</div></div>
              <Link className="btn secondary" href={href(lang, "/business#quote")} style={{ alignSelf: "flex-start", marginTop: 8 }}>{t("Start a project like this", "ابدأ مشروعاً مثل هذا")}</Link>
            </div>
          </div>
        </section>
        <section className="wrap cases" style={{ paddingBottom: 112 }}>
          {list.map((c, i) => {
            const [type, city, text] = ar ? c.ar : [c.type, c.city, c.text];
            return (
              <article key={i}>
                <div className="photo"><img src={img(c.im)} alt={t(`${c.type} project in ${c.city}`, `مشروع ${type} في ${city}`)} loading="lazy" /></div>
                <div className="row" style={{ gap: 8 }}><span className="tag">{type}</span><span className="tag">{city}</span></div>
                <h3 style={{ margin: "14px 0 6px" }}>{t("Client name", "اسم العميل")}</h3>
                <p className="small muted">{text}</p>
                <span className="row small" style={{ gap: 8, fontWeight: 500, marginTop: 12 }}>{t("View project", "عرض المشروع")} <Icon name="arrow" size={16} /></span>
              </article>
            );
          })}
        </section>
        <section className="wrap" style={{ paddingBottom: 112 }}>
          <div className="dark-banner">
            <div><h2>{t("Your venue could be next.", "قد يكون مكانك التالي.")}</h2><p style={{ color: "#cfcfcf", marginTop: 10 }}>{t(<>Tell us what you&apos;re opening and we&apos;ll take it from there.</>, "أخبرنا بما تستعد لافتتاحه، ونتولى الباقي.")}</p></div>
            <Link className="btn light" href={href(lang, "/business#quote")}>{t("Request a quote", "اطلب عرض سعر")} <Icon name="arrow" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
