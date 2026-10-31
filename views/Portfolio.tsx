"use client";

import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { useLang } from "@/components/Lang";
import { href, tr } from "@/lib/i18n";

// Real client projects. Add new ones here; each renders as a photo + details card.
const PROJECTS = [
  {
    id: "mumsie-bakery",
    name: ["Mumsie Bakery", "مخبز ممزي"],
    type: ["Bakery", "مخبز"],
    city: ["Dammam", "الدمام"],
    text: [
      "Hand-thrown cups in a soft pink glaze, lettered with the Mumsie logo and finished with sculpted clay handles.",
      "أكواب مشكّلة يدوياً بطلاء وردي ناعم، تحمل شعار Mumsie ومقابض طينية مشكّلة باليد.",
    ],
    logo: { src: "/clients/mumsie.svg", w: 87, h: 24 },
    images: [{ src: "/img/work-mumsie.jpg", alt: ["Pink-glazed Mumsie Bakery cups laid out on linen", "أكواب مخبز ممزي بطلاء وردي على قماش"] }],
  },
  {
    id: "peek-a-brew",
    name: ["Peek a Brew", "بيك ا برو"],
    type: ["Café", "مقهى"],
    city: ["Khobar", "الخبر"],
    text: [
      "Wheel-thrown cups stamped with the Peek a Brew logo in green, with “Have a brew-tiful day!” inside the rim and a pair of eyes peeking up from the bottom.",
      "أكواب مشكّلة على العجلة بختم شعار Peek a Brew الأخضر، مع عبارة «\u2068Have a brew-tiful day!\u2069» على الحافة الداخلية وعينين تختلسان النظر من القاع.",
    ],
    logo: { src: "/clients/hands.svg", w: 30, h: 34 },
    images: [
      { src: "/img/work-peekabrew-1.jpg", alt: ["Peek a Brew cups with the stamped green logo on a shelf", "أكواب Peek a Brew بختم الشعار الأخضر على رف"] },
      { src: "/img/work-peekabrew-2.jpg", alt: ["Looking into Peek a Brew cups: the rim message and the peeking eyes", "من داخل أكواب Peek a Brew: العبارة على الحافة والعينان في القاع"] },
    ],
  },
] as const;

export default function Portfolio() {
  const lang = useLang();
  const t = tr(lang);
  const pick = (pair: readonly [string, string]) => t(pair[0], pair[1]);
  return (
    <>
      <Header />
      <main>
        <section className="wrap" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="crumb"><Link href={href(lang, "/")}>{t("Home", "الرئيسية")}</Link> / {t("Portfolio", "أعمالنا")}</div>
          <h1 style={{ marginTop: 18 }}>{t("Our work", "أعمالنا")}</h1>
        </section>
        <section className="wrap projects" style={{ paddingBottom: 112 }}>
          {PROJECTS.map((p) => (
            <article key={p.id} className="featured">
              <div className={`project-photos n${p.images.length}`}>
                {p.images.map((im) => <div key={im.src} className="photo"><img src={im.src} alt={pick(im.alt)} loading="lazy" /></div>)}
              </div>
              <div className="copy">
                <div className="project-title">
                  <img className="project-logo" src={p.logo.src} alt="" aria-hidden="true" width={p.logo.w} height={p.logo.h} style={{ height: p.logo.h }} />
                  <h2>{pick(p.name)}</h2>
                </div>
                <div className="row" style={{ gap: 8, flexWrap: "wrap" }}><span className="tag">{pick(p.type)}</span><span className="tag">{pick(p.city)}</span></div>
                <p className="muted">{pick(p.text)}</p>
                <Link className="btn secondary" href={href(lang, "/business#quote")} style={{ alignSelf: "flex-start", marginTop: 8 }}>{t("Start a project like this", "ابدأ مشروعاً مثل هذا")}</Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
