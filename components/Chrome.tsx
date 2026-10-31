"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { href, switchHref, tr } from "@/lib/i18n";
import { CartButton } from "./Cart";
import Icon from "./Icon";
import { useLang } from "./Lang";

const NAV = [
  { href: "/shop", en: "Shop", ar: "المتجر" },
  { href: "/business", en: "For Business", ar: "للأعمال" },
  { href: "/portfolio", en: "Portfolio", ar: "أعمالنا" },
  { href: "/story", en: "Our Story", ar: "قصتنا" },
  { href: "/contact", en: "Contact", ar: "تواصل معنا" },
];

export function Logo({ light = false }: { light?: boolean }) {
  const lang = useLang();
  // Stacked lockup: mark above the MEASURE / CERAMICS wordmark (single SVG).
  return (
    <Link href={href(lang, "/")} className="logo" aria-label={tr(lang)("Measure Ceramics, home", "Measure Ceramics، الصفحة الرئيسية")}>
      <img className="lockup" src={light ? "/logo/logo-light.svg" : "/logo/logo.svg"} alt="Measure Ceramics" width={121} height={112} />
    </Link>
  );
}

function LangSwitch({ className, onClick, style }: { className?: string; onClick?: () => void; style?: React.CSSProperties }) {
  const lang = useLang();
  const path = usePathname();
  return lang === "ar"
    ? <Link href={switchHref(lang, path)} className={className} lang="en" onClick={onClick} style={{ fontFamily: "var(--sans)", ...style }}>EN</Link>
    : <Link href={switchHref(lang, path)} className={className} lang="ar" onClick={onClick} style={style}>العربية</Link>;
}

/**
 * overlay: on phones the header floats transparently over the full-screen
 * video hero (no announcement bar) and turns solid once the hero scrolls away.
 */
export function Header({ overlay = false, announce = true }: { overlay?: boolean; announce?: boolean }) {
  const lang = useLang();
  const t = tr(lang);
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [overHero, setOverHero] = useState(overlay);
  useEffect(() => {
    if (!overlay) return;
    const hero = document.querySelector(".vhero");
    const update = () => setOverHero(!!hero && hero.getBoundingClientRect().bottom > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [overlay]);
  const headCls = `header${overlay ? " overlay" : ""}${overlay && overHero && !menu ? " clear" : ""}`;
  return (
    <>
      {announce && (
      <div className={`announce${overlay ? " overlay-hide" : ""}`}>
          <span>{t("Free delivery across the Kingdom on orders over ⃁ 500", "توصيل مجاني لأنحاء المملكة للطلبات فوق ٥٠٠ ⃁")}</span>
          <span className="sep">|</span>
          <span className="second">{t("Split into 4 interest-free payments with Tamara", "قسّم مشترياتك على ٤ دفعات بدون فوائد مع تمارا")}</span>
        </div>
      )}
      <header className={headCls}>
        <div className="wrap row" style={{ width: "100%", justifyContent: "space-between" }}>
          <Logo />
          <nav className="nav" aria-label={t("Main", "القائمة الرئيسية")}>
            {NAV.map((n) => { const h = href(lang, n.href); return <Link key={n.href} href={h} className={path.startsWith(h) ? "on" : ""}>{t(n.en, n.ar)}</Link>; })}
          </nav>
          <div className="tools">
            <LangSwitch className="lang hide-sm" />
            <Link href={href(lang, "/shop")} className="hide-sm" aria-label={t("Search the shop", "ابحث في المتجر")}><Icon name="search" /></Link>
            <Link href={href(lang, "/contact")} className="hide-sm" aria-label={t("Account", "حسابي")}><Icon name="user" /></Link>
            <CartButton />
            <button className="menubtn" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={t("Menu", "القائمة")}><Icon name={menu ? "x" : "menu"} /></button>
          </div>
        </div>
      </header>
      {menu && (
        <nav className={`wrap mobile-menu${overlay ? " overlay" : ""}`} aria-label={t("Mobile", "قائمة الجوال")} style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
          {NAV.map((n) => <Link key={n.href} href={href(lang, n.href)} onClick={() => setMenu(false)} style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}>{t(n.en, n.ar)}</Link>)}
          <LangSwitch onClick={() => setMenu(false)} style={{ padding: "16px 0", ...(lang === "en" ? { fontFamily: "var(--arabic)" } : {}) }} />
        </nav>
      )}
    </>
  );
}

export function Footer() {
  const lang = useLang();
  const t = tr(lang);
  const h = (p: string) => href(lang, p);
  const [joined, setJoined] = useState(false);
  return (
    <>
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <Logo light />
            <p className="about">{t("Handmade ceramics for cafés, restaurants and homes. Thrown, glazed and fired in our studio.", "خزف مصنوع يدوياً للمقاهي والمطاعم والبيوت. نشكّله ونطليه ونحرقه في معملنا.")}</p>
          </div>
          <div className="links"><h5>{t("Explore", "تصفّح")}</h5><ul>{NAV.map((n) => <li key={n.href}><Link href={h(n.href)}>{t(n.en, n.ar)}</Link></li>)}</ul></div>
          <div>
            <h5>{t("Studio letters", "رسائل المعمل")}</h5>
            <p className="small" style={{ color: "#bdbdbd" }}>{t("New collections and studio news, once a month.", "المجموعات الجديدة وأخبار المعمل، مرة واحدة في الشهر.")}</p>
            {joined ? <p className="small" style={{ color: "#fff", marginTop: 16 }}>{t("Thanks — you're on the list.", "شكراً — تم تسجيلك في القائمة.")}</p> : (
              <form className="news" onSubmit={(e) => { e.preventDefault(); setJoined(true); }}>
                <input type="email" required placeholder={t("Email address", "البريد الإلكتروني")} aria-label={t("Email address", "البريد الإلكتروني")} />
                <button className="btn sm light" style={{ height: 46 }}>{t("Join", "اشترك")}</button>
              </form>
            )}
          </div>
        </div>
        <div className="bottom">
          <span>{t("© 2026 Measure Ceramics. All rights reserved.", "© ٢٠٢٦ Measure Ceramics. جميع الحقوق محفوظة.")}</span>
          <a href="https://instagram.com/measure.pottery" target="_blank" rel="noreferrer">{t("Instagram", "إنستغرام")}</a>
          <div className="pay"><span>mada</span><span>Apple Pay</span><span>VISA</span><span>Mastercard</span><span>tamara</span></div>
        </div>
      </div>
    </footer>
    {/* designer credit: a thin white banner under the footer */}
    <div className="credit-bar">
      <a className="credit" href="https://wa.me/966504553474" target="_blank" rel="noreferrer">{t("Design by Abdulhameed Boheliga", "تصميم عبد الحميد بوحليقة")}</a>
    </div>
    </>
  );
}
