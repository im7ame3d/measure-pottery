"use client";

import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { useLang } from "@/components/Lang";
import Slides from "@/components/Slides";
import { href, tr } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";

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
            <article key={p.id} id={p.id} className="featured">
              <Slides images={p.images.map((im) => ({ src: im.src, alt: pick(im.alt) }))} label={(i, n) => t(`Photo ${i} of ${n}`, `الصورة ${i} من ${n}`)} />
              <div className="copy">
                <div className="project-title">
                  <img className="project-logo" src={p.logo.src} alt="" aria-hidden="true" width={p.logo.w} height={p.logo.h} style={{ height: p.logo.h }} />
                  <h2>{pick(p.name)}</h2>
                </div>
                <div className="row" style={{ gap: 8, flexWrap: "wrap" }}><span className="tag">{pick(p.type)}</span><span className="tag">{pick(p.city)}</span></div>
                <p className="muted">{pick(p.text)}</p>
                <Link className="btn secondary" href="#enquiry" style={{ alignSelf: "flex-start", marginTop: 8 }}>{t("Start a project like this", "اطلب مشروعاً مثل هذا")}</Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
