import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import Reveal from "@/components/Reveal";
import { href, tr, type Lang } from "@/lib/i18n";
import { img } from "@/lib/products";

export default function Story({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const ar = lang === "ar";
  const PROCESS = t(
    [["Clay", "We wedge local and imported stoneware clays by hand.", "cups_bisque"], ["Wheel", "Each piece is thrown, trimmed and finished on the wheel.", "studio"], ["Glaze", "Glazes are mixed in the studio and tested on every batch.", "mumsie"], ["Kiln", "Fired to 1240°C for strength you can use every day.", "spread_close"]],
    [["الطين", "نعجن طين الخزف الحجري المحلي والمستورد بأيدينا.", "cups_bisque"], ["العجلة", "تُشكَّل كل قطعة وتُهذَّب وتُشطَّب على العجلة.", "studio"], ["الطلاء", "نخلط الطلاءات في المعمل ونختبرها مع كل دفعة.", "mumsie"], ["الفرن", "تُحرق على ١٢٤٠° مئوية لمتانة تناسب الاستخدام اليومي.", "spread_close"]],
  );
  // "What we value" as a short chat: a visitor asks, the studio answers with the value.
  const CHAT = t(
    [
      ["Is every piece really handmade?", "Handmade", "Yes. No moulds, no shortcuts — every piece passes through our hands."],
      ["Where is it made?", "Local", "Right here in Saudi Arabia, made for the way we gather and eat."],
      ["Why such small batches?", "Small-batch", "We make less, so every piece gets the time it deserves."],
    ],
    [
      ["كل قطعة يدوية فعلاً؟", "صناعة يدوية", "إيه والله، لا قوالب ولا اختصارات. كل قطعة تمر بين أيدينا."],
      ["وين تنصنع؟", "صناعة محلية", "هنا في السعودية، على طريقتنا في الجَمعة والسفرة."],
      ["ليش الكميات محدودة؟", "دفعات مقسمة", "نصنع أقل، عشان كل قطعة تاخذ وقتها اللي تستاهله."],
    ],
  );
  return (
    <>
      <Header />
      <main>
        <section className="story-hero">
          <div className="photo"><img src="/img/story-studio-wall.jpg" alt={t("The Measure Pottery sign on the studio wall above a red slab roller", "لوحة Measure Pottery على جدار المعمل فوق آلة فرد الطين الحمراء")} /></div>
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
            <Reveal className="chat">
              {CHAT.map(([q, v, d]) => (
                <div key={v} className="chat-pair">
                  <p className="bubble ask">{q}</p>
                  <div className="chat-reply">
                    <span className="chat-avatar" aria-hidden="true"><img src="/logo/mark.svg" alt="" /></span>
                    <p className="bubble reply"><b>{v}</b>{d}</p>
                  </div>
                </div>
              ))}
            </Reveal>
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
