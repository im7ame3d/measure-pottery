import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { href, tr, type Lang } from "@/lib/i18n";
import { img } from "@/lib/products";

export default function Story({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const ar = lang === "ar";
  const PROCESS = t(
    [["Clay", "We wedge local and imported stoneware clays by hand.", "cups_bisque"], ["Wheel", "Each piece is thrown, trimmed and finished on the wheel.", "studio"], ["Glaze", "Glazes are mixed in the studio and tested on every batch.", "mumsie"], ["Kiln", "Fired to 1240°C for strength you can use every day.", "spread_close"]],
    [["الطين", "نعجن طين الخزف الحجري المحلي والمستورد بأيدينا.", "cups_bisque"], ["العجلة", "تُشكَّل كل قطعة وتُهذَّب وتُشطَّب على العجلة.", "studio"], ["الطلاء", "نخلط الطلاءات في المعمل ونختبرها مع كل دفعة.", "mumsie"], ["الفرن", "تُحرق على ١٢٤٠° مئوية لمتانة تناسب الاستخدام اليومي.", "spread_close"]],
  );
  const VALUES = t(
    [["Handmade", "No moulds, no shortcuts. Every piece passes through our hands."], ["Local", "Made in Saudi Arabia, for the way we gather and eat here."], ["Small-batch", "We make less, so every piece gets the time it deserves."]],
    [["صناعة يدوية", "لا قوالب ولا اختصارات. كل قطعة تمر بين أيدينا."], ["صناعة محلية", "صُنعت في السعودية، لطريقتنا في الاجتماع والأكل هنا."], ["دفعات مقسمة", "نصنع أقل، لتنال كل قطعة الوقت الذي تستحقه."]],
  );
  return (
    <>
      <Header />
      <main>
        <section className="story-hero">
          <div className="photo"><img src={img("studio")} alt={t("The Measure studio", "معمل Measure")} style={{ objectPosition: "40% 60%" }} /></div>
          <div className="card-over"><div className="eyebrow">{t("Our story", "قصتنا")}</div><h1 style={{ marginTop: 14 }}>{t(<>Made slowly,<br />made to last.</>, <>صُنعت بتأنٍّ،<br />لتدوم طويلاً.</>)}</h1></div>
        </section>
        <section className="wrap section story" style={{ alignItems: "start" }}>
          <h2>{t("Measure began with a single wheel and a simple idea.", "بدأت Measure بعجلة واحدة وفكرة بسيطة.")}</h2>
          <div className="lead" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p>{t(<>That the cup you drink from should feel as considered as what&apos;s in it. What started as a small home studio now supplies cafés and restaurants across the Kingdom — and still makes every piece by hand.</>, "أن يكون الكوب الذي تشرب منه مدروساً بقدر ما فيه. ما بدأ معملاً منزلياً صغيراً يزوّد اليوم المقاهي والمطاعم في أنحاء المملكة — وما زلنا نصنع كل قطعة بأيدينا.")}</p>
            <p>{t(<>Founder&apos;s story placeholder — two or three sentences about how the studio started, what inspires the forms and glazes, and who it&apos;s for.</>, "مساحة لقصة المؤسس — جملتان أو ثلاث عن بداية المعمل، وما يُلهم أشكاله وطلاءاته، ولمن يصنع.")}</p>
          </div>
        </section>
        <section className="wrap" style={{ paddingBottom: 112 }}>
          <div className="eyebrow">{t("The process", "مراحل الصنع")}</div>
          <h2 style={{ margin: "12px 0 40px" }}>{t("From clay to kiln", "من الطين إلى الفرن")}</h2>
          <div className="grid4">
            {PROCESS.map(([s, d, im], i) => (
              <div key={s} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="photo" style={{ height: 300 }}><img src={img(im)} alt={s} loading="lazy" /></div>
                <div className="serif" style={{ fontSize: 20, color: "var(--brand)" }}>{ar ? `٠${["١", "٢", "٣", "٤"][i]}` : `0${i + 1}`}</div>
                <h4>{s}</h4><p className="small muted">{d}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ background: "var(--ink)", color: "#fff" }}>
          <div className="wrap section">
            <div className="eyebrow" style={{ color: "#bdbdbd" }}>{t("What we value", "ما نؤمن به")}</div>
            <h2 style={{ margin: "12px 0 48px" }}>{t(<>Three things we won&apos;t compromise</>, "ثلاثة أشياء لا نتنازل عنها")}</h2>
            <div className="values">{VALUES.map(([v, d]) => <div key={v}><h3 style={{ marginBottom: 10 }}>{v}</h3><p style={{ color: "#cfcfcf" }}>{d}</p></div>)}</div>
          </div>
        </section>
        <section className="wrap section">
          <div className="eyebrow">{t("The makers", "الصنّاع")}</div>
          <h2 style={{ margin: "12px 0 40px" }}>{t("The hands behind the pieces", "الأيدي التي تصنع القطع")}</h2>
          <div className="grid3">
            {t(["Founder & potter", "Glaze & kiln lead", "Studio potter"], ["مؤسس وخزّاف", "مسؤول الطلاء والفرن", "خزّاف المعمل"]).map((r) => (
              <div key={r} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div className="photo" style={{ height: 380, display: "flex", alignItems: "center", justifyContent: "center" }}><span className="xs" style={{ letterSpacing: ".12em", color: "#8a8278" }}>{t("PORTRAIT", "صورة شخصية")}</span></div>
                <h4>{t("Maker name", "اسم الصانع")}</h4><p className="small muted">{r}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ background: "var(--sand)" }}>
          <div className="wrap row" style={{ padding: "96px clamp(20px, 8.3vw, 120px)", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div><h2>{t("Visit the studio", "زُر المعمل")}</h2><p className="muted" style={{ marginTop: 12, maxWidth: 440 }}>{t("See the wheels, the kiln and the pieces in progress. Studio visits by appointment.", "شاهد العجلات والفرن والقطع قيد الصنع. زيارة المعمل بموعد مسبق.")}</p></div>
            <div className="row" style={{ gap: 14, flexWrap: "wrap" }}><Link className="btn primary" href={href(lang, "/contact")}>{t("Book a visit", "احجز زيارة")}</Link><Link className="btn secondary" href={href(lang, "/shop")}>{t("Shop the collection", "تسوّق المجموعة")}</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
