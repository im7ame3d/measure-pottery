import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import HeroVideo from "@/components/HeroVideo";
import ProximityBlur, { BlurLines, BlurWords } from "@/components/ProximityBlur";
import FocusPanel from "@/components/FocusPanel";
import Icon from "@/components/Icon";
import ProductCard from "@/components/ProductCard";
import Slides from "@/components/Slides";
import { href, tr, type Lang } from "@/lib/i18n";
import { getProducts, getProjects } from "@/lib/catalog";
import { img } from "@/lib/products";

// Client logos: black SVGs in public/clients/, shown in the scrolling strip on the home page.
const CLIENTS = [
  { name: "Mumsie", logo: "/clients/mumsie.svg", h: 30, w: 108 },
  { name: "urbn.", logo: "/clients/urbn.svg", h: 30, w: 78 },
  { name: "طمية", logo: "/clients/tamya.svg", h: 46, w: 44 },
  { name: "KEU", logo: "/clients/keu.svg", h: 30, w: 97 },
  { name: "UR Specialty Coffee", logo: "/clients/ur-specialty-coffee.svg", h: 48, w: 43 },
  { name: "Client logo", logo: "/clients/calligraphy.svg", h: 44, w: 50 },
  { name: "ديمة للاستشارات التربوية والتعليمية", logo: "/clients/deema.svg", h: 50, w: 61 },
  { name: "Solaire Beauty Lounge", logo: "/clients/solaire.svg", h: 36, w: 76 },
  { name: "Brownie Specialty Coffee", logo: "/clients/brownie.svg", h: 30, w: 117 },
  { name: "UMQ Coffee", logo: "/clients/umq-coffee.svg", h: 52, w: 48 },
  { name: "Peek a Brew", logo: "/clients/hands.svg", h: 46, w: 40 },
];

export default async function Home({ lang }: { lang: Lang }) {
  const [PRODUCTS, PROJECTS] = await Promise.all([getProducts(), getProjects()]);
  const t = tr(lang);
  const h = (p: string) => href(lang, p);
  const STEPS = t(
    [["01", "Consult", "Tell us about your venue, menu and the pieces you need."], ["02", "Sample", "We throw and glaze samples for you to test in service."], ["03", "Production", "Your order is made in small batches, logo-stamped if you like."], ["04", "Delivery", "Packed with care and delivered to your door across the Kingdom."]],
    [["٠١", "الاستشارة", "حدّثنا عن مكانك وقائمتك والقطع التي تحتاجها."], ["٠٢", "العيّنات", "نشكّل عيّنات ونطليها لتجرّبها في الخدمة الفعلية."], ["٠٣", "الإنتاج", "نصنع طلبك على دفعات مقسمة، مع ختم شعارك إن رغبت."], ["٠٤", "التوصيل", "نغلّفه بعناية ونوصله إلى بابك في جميع أنحاء المملكة."]],
  );
  const title = <BlurLines lines={t(["Ceramics, made", "to measure."], ["خزفٌ مصنوع", "على قياسك."])} />;
  const eyebrow = <BlurWords text={t("Ceramics production studio · Saudi Arabia", "استوديو إنتاج خزف · المملكة العربية السعودية")} />;
  return (
    <>
      <Header overlay />
      <main>
        {/* Full-screen video hero with the header floating on top (all screen sizes). */}
        <section className="vhero">
          <HeroVideo src="/video/hero.mp4" poster="/video/hero-poster.jpg" />
          <ProximityBlur root=".vhero" />
          <div className="vhero-copy">
            <div className="eyebrow">{eyebrow}</div>
            <h1>{title}</h1>
            <p><BlurWords text={t("Tableware for cafés and restaurants, and one-of-a-kind pieces for your home.", "أوانٍ للمقاهي والمطاعم، وقطع فريدة لبيتك ولمن تحب.")} /></p>
            <div className="vhero-ctas">
              <Link className="btn primary" href={h("/portfolio")}>{t(<>For Cafés &amp; Restaurants</>, "للمقاهي والمطاعم")} <Icon name="arrow" /></Link>
              <Link className="btn secondary" href={h("/shop")}>{t("Shop", "المتجر")}</Link>
            </div>
          </div>
        </section>
        <section className="wrap clients">
          <h2 style={{ textAlign: "center", marginBottom: 36 }}>{t("Our clients", "عمــلاؤنـا")}</h2>
          {/* Endless marquee: the list is rendered twice and the track slides by exactly half its width. */}
          <div className="marquee">
            <div className="marquee-track">
              {[...CLIENTS, ...CLIENTS].map((c, i) => {
                const copy = i >= CLIENTS.length;
                return <div key={i} className="client" aria-hidden={copy || undefined}><img src={c.logo} alt={copy ? "" : c.name} width={c.w} height={c.h} style={{ width: c.w, height: c.h }} /></div>;
              })}
            </div>
          </div>
        </section>

        <FocusPanel label={t("For business", "للأعمال")}>
          <div className="path terra photo">
            <div className="path-media"><img src="/img/business-ceiling.jpg" alt={t("Terracotta coffered ceiling", "سقف خزفي بلون التيراكوتا")} loading="lazy" /></div>
            <div className="eyebrow">{t("For business", "للأعمال")}</div>
            <h2>{t("For your café, restaurant or business", "لمقهاك ولمطعمك ولمؤسستك")}</h2>
            <p style={{ maxWidth: 420 }}>{t("Custom tableware in your colours, with your logo, made in the quantities you need.", "أوانٍ مخصّصة بألوانك وشعارك، وبالكميات التي تحتاجها.")}</p>
            <ul>
              <li className="check-item"><Icon name="check" /> {t(<>Cups, plates, bowls &amp; serving pieces</>, "أكواب وأطباق وزبادي وقطع تقديم")}</li>
              <li className="check-item"><Icon name="check" /> {t(<>Logo stamping &amp; custom glazes</>, "ختم الشعار وطلاءات مخصّصة")}</li>
              <li className="check-item"><Icon name="check" /> {t("Samples before production", "عيّنات قبل الإنتاج")}</li>
            </ul>
            <Link className="btn panel-cta" href="#enquiry">{t("Start your order", "ابدأ طلبك")} <Icon name="arrow" /></Link>
          </div>
        </FocusPanel>

        {/* Our work: one card per portfolio project, side by side (swipeable row on phones) */}
        <section className="wrap work">
          <h2 style={{ textAlign: "center", marginBottom: 36 }}>{t("Our work", "أعــمالنا")}</h2>
          <div className="work-row">
            {PROJECTS.map((p) => (
              <article key={p.id} className="work-card">
                <Link href={h(`/portfolio#${p.id}`)} className="work-photo" tabIndex={-1} aria-hidden="true"><Slides images={p.images.map((im) => ({ src: im.src, alt: "" }))} mode="auto" /></Link>
                <div className="work-info">
                  <div className="work-title">
                    {p.logo.src && <img src={p.logo.src} alt="" aria-hidden="true" height={p.logo.h} style={{ height: Math.round(p.logo.h * 0.75) }} />}
                    <h3>{t(p.name[0], p.name[1])}</h3>
                  </div>
                  <div className="row" style={{ gap: 8, flexWrap: "wrap" }}><span className="tag">{t(p.type[0], p.type[1])}</span><span className="tag">{t(p.city[0], p.city[1])}</span></div>
                  <Link className="btn secondary" href={h(`/portfolio#${p.id}`)}>{t("View the work", "اعرض العمل")} <Icon name="arrow" /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap shop-strip">
          <div className="section-head inline">
            <h2>{t("Shop", "المتجر")}</h2>
            <Link className="btn secondary" href={h("/shop")}>{t("View shop", "عرض المتجر")} <Icon name="arrow" /></Link>
          </div>
          <div className="grid4">{PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} lang={lang} />)}</div>
        </section>

        <section>
          <div className="wrap section">
            <div className="section-head" style={{ marginBottom: 56 }}>
              <div><div className="eyebrow">{t("B2B ordering", "طلبات الأعمال")}</div><h2 style={{ marginTop: 12 }}>{t("How it works", "كيف نعمل")}</h2></div>
            </div>
            {/* same simple layout as the business page highlights: big display title + one muted line */}
            <div className="stats plain">
              {STEPS.map(([n, s, d]) => (
                <div key={n}><div className="v">{s}</div><div className="small muted">{d}</div></div>
              ))}
            </div>
            <Link className="btn primary" href="#enquiry" style={{ marginTop: 56 }}>{t("Start your order", "ابدأ طلبك")} <Icon name="arrow" /></Link>
          </div>
        </section>

        <section className="wrap section story">
          <div className="photo" style={{ height: 640 }}><img src="/img/story-table.jpg" alt={t("Glazed plates, saucers and cups stamped with the Solaire logo, laid out on a table in our studio", "أطباق وصحون وأكواب مطليّة مختومة بشعار Solaire على طاولة في معملنا")} loading="lazy" /></div>
          <div>
            <div className="eyebrow">{t("Our story", "قصتنا")}</div>
            <h2 style={{ margin: "14px 0 22px" }}>{t(<>From clay to kiln,<br />by hand.</>, <>من الطين إلى الفرن،<br />بأيدينا.</>)}</h2>
            <p className="lead">{t("Every piece starts as a lump of clay on our wheel. We throw, trim, glaze and fire in small batches, so each cup, plate and vase carries the marks of the hands that made it.", "تبدأ كل قطعة كتلةً من الطين على عجلتنا. نشكّلها ونهذّبها ونطليها ونحرقها على دفعات مقسمة، لتحمل كل كوب وطبق ومزهرية أثر الأيدي التي صنعتها.")}</p>
            <Link className="btn secondary" href={h("/story")} style={{ marginTop: 36 }}>{t("Meet the studio", "تعرّف على المعمل")}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
