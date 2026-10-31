import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import HeroVideo from "@/components/HeroVideo";
import Icon from "@/components/Icon";
import ProductCard from "@/components/ProductCard";
import { href, tr, type Lang } from "@/lib/i18n";
import { PRODUCTS, img } from "@/lib/products";

// Client logos: black SVGs in public/clients/. Remaining slots stay as placeholders.
const CLIENTS = [
  { name: "Mumsie", logo: "/clients/mumsie.svg", h: 30 },
  { name: "urbn.", logo: "/clients/urbn.svg", h: 30 },
  { name: "طمية", logo: "/clients/tamya.svg", h: 46 },
  { name: "KEU", logo: "/clients/keu.svg", h: 30 },
  { name: "UR Specialty Coffee", logo: "/clients/ur-specialty-coffee.svg", h: 48 },
  { name: "Client logo", logo: "/clients/calligraphy.svg", h: 44 },
];

export default function Home({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const h = (p: string) => href(lang, p);
  const STEPS = t(
    [["01", "Consult", "Tell us about your venue, menu and the pieces you need."], ["02", "Sample", "We throw and glaze samples for you to test in service."], ["03", "Production", "Your order is made in small batches, logo-stamped if you like."], ["04", "Delivery", "Packed with care and delivered to your door across the Kingdom."]],
    [["٠١", "الاستشارة", "حدّثنا عن مكانك وقائمتك والقطع التي تحتاجها."], ["٠٢", "العيّنات", "نشكّل عيّنات ونطليها لتجرّبها في الخدمة الفعلية."], ["٠٣", "الإنتاج", "نصنع طلبك على دفعات صغيرة، مع ختم شعارك إن رغبت."], ["٠٤", "التوصيل", "نغلّفه بعناية ونوصله إلى بابك في جميع أنحاء المملكة."]],
  );
  const GIFTS = t(
    [["Under 200 SAR", "espresso", "/shop"], ["Gift sets", "mumsie", "/shop?c=Gift%20sets"], ["One-of-a-kind pieces", "spread_wide", "/shop"]],
    [["أقل من ٢٠٠ ريال", "espresso", "/shop"], ["أطقم هدايا", "mumsie", "/shop?c=Gift%20sets"], ["قطع فريدة لا تتكرر", "spread_wide", "/shop"]],
  );
  const title = t(<>Ceramics, made<br />to measure.</>, <>خزفٌ مصنوع<br />على مقاسك.</>);
  return (
    <>
      <Header overlay />
      <main>
        {/* Phones: full-screen video hero with the header floating on top. */}
        <section className="vhero">
          <HeroVideo src="/video/hero.mp4" poster="/video/hero-poster.jpg" />
          <div className="vhero-copy">
            <div className="eyebrow">{t("Handmade ceramics studio · Saudi Arabia", "استوديو خزف يدوي · المملكة العربية السعودية")}</div>
            <h1>{title}</h1>
            <p>{t("Tableware for cafés and restaurants, and one-of-a-kind pieces for your home.", "أوانٍ للمقاهي والمطاعم، وقطع فريدة لبيتك ولمن تحب.")}</p>
            <div className="vhero-ctas">
              <Link className="btn primary" href={h("/business")}>{t(<>For Cafés &amp; Restaurants</>, "للمقاهي والمطاعم")} <Icon name="arrow" /></Link>
              <Link className="btn secondary" href={h("/shop")}>{t("Shop Pieces", "تسوّق القطع")}</Link>
            </div>
          </div>
        </section>
        {/* Tablet/desktop hero */}
        <section className="wrap hero">
          <div className="hero-copy">
            <div className="eyebrow">{t("Handmade ceramics studio · Saudi Arabia", "استوديو خزف يدوي · المملكة العربية السعودية")}</div>
            <h1>{title}</h1>
            <p className="lead" style={{ maxWidth: 500 }}>{t("Tableware crafted for cafés and restaurants that care about every detail — and exclusive, one-of-a-kind pieces for your home and the people you love.", "أوانٍ مصنوعة يدوياً للمقاهي والمطاعم التي تهتم بأدق التفاصيل، وقطع حصرية فريدة لبيتك ولمن تحب.")}</p>
            <div className="ctas">
              <Link className="btn primary" href={h("/business")}>{t(<>For Cafés &amp; Restaurants</>, "للمقاهي والمطاعم")} <Icon name="arrow" /></Link>
              <Link className="btn secondary" href={h("/shop")}>{t("Shop Exclusive Pieces", "تسوّق القطع الحصرية")}</Link>
            </div>
            <div className="checks small muted">
              <span className="check-item"><Icon name="check" /> {t("Small-batch, handmade", "دفعات صغيرة، صناعة يدوية")}</span>
              <span className="check-item"><Icon name="check" /> {t(<>Custom glazes &amp; logos</>, "طلاءات وشعارات مخصّصة")}</span>
            </div>
          </div>
          <div className="hero-pics">
            <div className="photo"><img src={img("cups_bisque")} alt={t("Hand-shaped cups drying before glazing", "أكواب مشكّلة باليد تجفّ قبل الطلاء")} /></div>
            <div className="stack">
              <div className="photo"><img src={img("peekabrew")} alt={t("Café cups stamped with the Peek a Brew logo", "أكواب مقهى مختومة بشعار Peek a Brew")} /></div>
              <div className="photo"><img src={img("mumsie")} alt={t("Pink-glazed cups lettered by hand", "أكواب بطلاء وردي وكتابة يدوية")} /></div>
            </div>
          </div>
        </section>

        <section className="wrap" style={{ paddingBottom: 96 }}>
          <div className="eyebrow" style={{ textAlign: "center", marginBottom: 28 }}>{t(<>Served at cafés &amp; restaurants across the Kingdom</>, "نخدم المقاهي والمطاعم في أنحاء المملكة")}</div>
          <div className="logos">
            {CLIENTS.map((c) => <div key={c.name} className="client"><img src={c.logo} alt={c.name} loading="lazy" style={{ height: c.h }} /></div>)}
            {Array.from({ length: Math.max(0, 6 - CLIENTS.length) }, (_, i) => <div key={i}>{t("CLIENT LOGO", "شعار العميل")}</div>)}
          </div>
        </section>

        <section className="wrap paths" style={{ paddingBottom: 112 }}>
          <div className="path dark">
            <div className="eyebrow" style={{ color: "#bdbdbd" }}>{t("For business", "للأعمال")}</div>
            <h2>{t(<>For your café<br />or restaurant</>, <>لمقهاك<br />أو مطعمك</>)}</h2>
            <p style={{ color: "#cfcfcf", maxWidth: 420 }}>{t("Custom tableware in your colours, with your logo, made in the quantities you need.", "أوانٍ مخصّصة بألوانك وشعارك، وبالكميات التي تحتاجها.")}</p>
            <ul style={{ color: "#e6e6e6" }}>
              <li className="check-item"><Icon name="check" /> {t(<>Cups, plates, bowls &amp; serving pieces</>, "أكواب وأطباق وزبادي وقطع تقديم")}</li>
              <li className="check-item"><Icon name="check" /> {t(<>Logo stamping &amp; custom glazes</>, "ختم الشعار وطلاءات مخصّصة")}</li>
              <li className="check-item"><Icon name="check" /> {t("Samples before production", "عيّنات قبل الإنتاج")}</li>
            </ul>
            <Link className="btn light" href={h("/business#quote")}>{t("Request a quote", "اطلب عرض سعر")} <Icon name="arrow" /></Link>
          </div>
          <div className="path sandbg">
            <div className="eyebrow">{t("For you", "لك")}</div>
            <h2>{t(<>For your home<br />&amp; gifting</>, <>لبيتك<br />وهداياك</>)}</h2>
            <p className="muted" style={{ maxWidth: 420 }}>{t(<>Limited, one-of-a-kind pieces — when they&apos;re gone, they&apos;re gone. Gift-wrapped with a handwritten note on request.</>, "قطع محدودة لا تتكرر — حين تنفد لا تعود. نغلّفها كهدية مع بطاقة مكتوبة بخط اليد عند الطلب.")}</p>
            <ul>
              <li className="check-item"><Icon name="check" /> {t("Exclusive pieces, never repeated", "قطع حصرية لا تتكرر")}</li>
              <li className="check-item"><Icon name="check" /> {t(<>Gift wrapping &amp; personal message</>, "تغليف هدايا ورسالة شخصية")}</li>
              <li className="check-item"><Icon name="check" /> {t("Pay in 4 with Tamara", "قسّمها على ٤ دفعات مع تمارا")}</li>
            </ul>
            <Link className="btn primary" href={h("/shop")}>{t("Shop the collection", "تسوّق المجموعة")} <Icon name="arrow" /></Link>
          </div>
        </section>

        <section className="wrap" style={{ paddingBottom: 112 }}>
          <div className="section-head">
            <div><div className="eyebrow">{t("Exclusive pieces", "قطع حصرية")}</div><h2 style={{ marginTop: 12 }}>{t("Featured this season", "مختارات هذا الموسم")}</h2></div>
            <Link className="btn secondary" href={h("/shop")}>{t("View all pieces", "عرض كل القطع")} <Icon name="arrow" /></Link>
          </div>
          <div className="grid4">{PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} lang={lang} />)}</div>
        </section>

        <section className="white">
          <div className="wrap section">
            <div className="section-head" style={{ marginBottom: 56 }}>
              <div><div className="eyebrow">{t("B2B ordering", "طلبات الأعمال")}</div><h2 style={{ marginTop: 12 }}>{t("How it works", "كيف نعمل")}</h2></div>
              <Link className="btn primary" href={h("/business#quote")}>{t("Start your order", "ابدأ طلبك")}</Link>
            </div>
            <div className="steps4">
              {STEPS.map(([n, s, d]) => (
                <div className="step" key={n}><div className="n">{n}</div><h4 style={{ margin: "10px 0 8px" }}>{s}</h4><p className="small muted">{d}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap section story">
          <div className="photo" style={{ height: 560 }}><img src={img("studio")} alt={t("The Measure studio with a table of glazed cups", "مرسم Measure وطاولة عليها أكواب مطليّة")} /></div>
          <div>
            <div className="eyebrow">{t("Our story", "قصتنا")}</div>
            <h2 style={{ margin: "14px 0 22px" }}>{t(<>From clay to kiln,<br />by hand.</>, <>من الطين إلى الفرن،<br />بأيدينا.</>)}</h2>
            <p className="lead">{t("Every piece starts as a lump of clay on our wheel. We throw, trim, glaze and fire in small batches — so each cup, plate and vase carries the marks of the hands that made it.", "تبدأ كل قطعة كتلةً من الطين على عجلتنا. نشكّلها ونهذّبها ونطليها ونحرقها على دفعات صغيرة — لتحمل كل كوب وطبق ومزهرية أثر الأيدي التي صنعتها.")}</p>
            <Link className="btn secondary" href={h("/story")} style={{ marginTop: 36 }}>{t("Meet the studio", "تعرّف على المرسم")}</Link>
          </div>
        </section>

        <section className="wrap" style={{ paddingBottom: 112 }}>
          <div className="eyebrow">{t("Gift ideas", "أفكار للهدايا")}</div>
          <h2 style={{ margin: "12px 0 40px" }}>{t("Something made by hand", "هدية مصنوعة باليد")}</h2>
          <div className="grid3">
            {GIFTS.map(([g, im, link]) => (
              <Link href={h(link)} key={g} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="photo" style={{ height: 360 }}><img src={img(im)} alt={g} loading="lazy" /></div>
                <div className="row" style={{ justifyContent: "space-between" }}><h4>{g}</h4><Icon name="arrow" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="quote">
          <div className="wrap">
            <blockquote>{t("“Our guests ask about the cups before they ask about the coffee. The pieces made our space feel like ours.”", "«يسأل ضيوفنا عن الأكواب قبل أن يسألوا عن القهوة. هذه القطع جعلت مكاننا يشبهنا.»")}</blockquote>
            <div className="small" style={{ marginTop: 28, fontWeight: 500 }}>{t("Client name", "اسم العميل")}</div>
            <div className="xs muted">{t("Owner, Café name — Riyadh", "مالك المقهى، اسم المقهى — الرياض")}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
