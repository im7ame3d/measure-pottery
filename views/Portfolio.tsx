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
    logo: { src: "/clients/mumsie.svg", w: 144, h: 40 },
    image: "/img/work-mumsie.jpg",
    alt: ["Pink-glazed Mumsie Bakery cups laid out on linen", "أكواب مخبز ممزي بطلاء وردي على قماش"],
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
              <div className="photo"><img src={p.image} alt={pick(p.alt)} /></div>
              <div className="copy">
                <img className="project-logo" src={p.logo.src} alt={p.name[0]} width={p.logo.w} height={p.logo.h} />
                <h2>{pick(p.name)}</h2>
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
