import Link from "next/link";
import { Suspense } from "react";
import { Footer, Header } from "@/components/Chrome";
import ProductCard from "@/components/ProductCard";
import { href, tr, type Lang } from "@/lib/i18n";
import { getProducts } from "@/lib/catalog";
import ShopGrid from "./ShopGrid";

export default async function Shop({ lang }: { lang: Lang }) {
  const PRODUCTS = await getProducts();
  const t = tr(lang);
  return (
    <>
      <Header />
      <main>
        <section className="wrap shop-page">
          <div className="crumb"><Link href={href(lang, "/")}>{t("Home", "الرئيسية")}</Link> / {t("Shop", "المتجر")}</div>
          <h1>{t("Shop", "المتجر")}</h1>
          <Suspense fallback={<div className="grid4">{PRODUCTS.map((p) => <ProductCard key={p.slug} p={p} lang={lang} />)}</div>}>
            <ShopGrid products={PRODUCTS} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
