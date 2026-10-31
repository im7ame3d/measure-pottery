import { Suspense } from "react";
import { Footer, Header } from "@/components/Chrome";
import { tr, type Lang } from "@/lib/i18n";
import ShopGrid from "./ShopGrid";

export default function Shop({ lang }: { lang: Lang }) {
  const t = tr(lang);
  return (
    <>
      <Header />
      <main>
        <section className="wrap" style={{ paddingTop: 48, paddingBottom: 40 }}>
          <div className="crumb">{t("Home / Shop", "الرئيسية / المتجر")}</div>
          <h1 style={{ marginTop: 18 }}>{t("Shop", "المتجر")}</h1>
          <p className="lead" style={{ marginTop: 12 }}>{t("Handmade pieces for your table, your shelves and your gifts.", "قطع مصنوعة يدوياً لمائدتك ورفوفك وهداياك.")}</p>
        </section>
        <Suspense><ShopGrid /></Suspense>
      </main>
      <Footer />
    </>
  );
}
