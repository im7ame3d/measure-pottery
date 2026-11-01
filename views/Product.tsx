import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import Icon from "@/components/Icon";
import ProductCard from "@/components/ProductCard";
import { href, tr, type Lang } from "@/lib/i18n";
import { PRODUCTS, catLabel, pName, type Product as P } from "@/lib/products";
import BuyBox from "./BuyBox";

export default function Product({ p, lang }: { p: P; lang: Lang }) {
  const t = tr(lang);
  const h = (x: string) => href(lang, x);
  const related = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 4);
  return (
    <>
      <Header />
      <main>
        <section className="wrap" style={{ paddingTop: 36 }}>
          <div className="crumb"><Link href={h("/")}>{t("Home", "الرئيسية")}</Link> / <Link href={h("/shop")}>{t("Shop", "المتجر")}</Link> / <Link href={h(`/shop?c=${encodeURIComponent(p.category)}`)}>{catLabel(p.category, lang)}</Link> / {pName(p, lang)}</div>
        </section>
        <BuyBox p={p} />
        <section className="wrap" style={{ paddingBottom: 96 }}>
          <div className="dark-banner">
            <div><div className="eyebrow" style={{ color: "#bdbdbd" }}>{t("For business", "للأعمال")}</div><h3 style={{ marginTop: 10 }}>{t("Love this glaze for your café?", "أعجبك هذا الطلاء لمقهاك؟")}</h3><p style={{ color: "#cfcfcf", marginTop: 8 }}>{t("We can make cups, plates and bowls in the same finish, in the quantities you need.", "نصنع لك أكواباً وأطباقاً وزبادي بنفس اللمسة، وبالكميات التي تحتاجها.")}</p></div>
            <Link className="btn light" href="#enquiry">{t("Request a quote", "اطلب عرض سعر")} <Icon name="arrow" /></Link>
          </div>
        </section>
        {related.length > 0 && (
          <section className="wrap" style={{ paddingBottom: 112 }}>
            <h2 style={{ marginBottom: 36 }}>{t("You may also like", "قد يعجبك أيضاً")}</h2>
            <div className="grid4">{related.map((r) => <ProductCard key={r.slug} p={r} lang={lang} />)}</div>
          </section>
        )}
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: pName(p, lang), description: lang === "ar" ? p.ar.description : p.description, offers: { "@type": "Offer", price: p.price, priceCurrency: "SAR" } }) }} />
    </>
  );
}
