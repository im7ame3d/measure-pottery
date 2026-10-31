"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CartButton } from "./Cart";
import Icon from "./Icon";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/business", label: "For Business" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function Logo({ light = false }: { light?: boolean }) {
  // Stacked lockup: vase mark above the MEASURE / POTTERY wordmark.
  return (
    <Link href="/" className="logo" aria-label="Measure Pottery, home">
      <img className="m" src="/logo/mark.svg" alt="" />
      <img className="w" src={light ? "/logo/wordmark-light.svg" : "/logo/wordmark.svg"} alt="Measure Pottery" />
    </Link>
  );
}

export function Header() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="announce">
        <span>Free delivery in Riyadh on orders over 500 SAR</span>
        <span className="sep">|</span>
        <span className="second">Split into 4 interest-free payments with Tamara</span>
      </div>
      <header className="header">
        <div className="wrap row" style={{ width: "100%", justifyContent: "space-between" }}>
          <Logo />
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => <Link key={n.href} href={n.href} className={path.startsWith(n.href) ? "on" : ""}>{n.label}</Link>)}
          </nav>
          <div className="tools">
            <Link href="/ar" className="lang hide-sm" lang="ar">العربية</Link>
            <Link href="/shop" className="hide-sm" aria-label="Search the shop"><Icon name="search" /></Link>
            <Link href="/contact" className="hide-sm" aria-label="Account"><Icon name="user" /></Link>
            <CartButton />
            <button className="menubtn" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Menu"><Icon name={menu ? "x" : "menu"} /></button>
          </div>
        </div>
      </header>
      {menu && (
        <nav className="wrap" aria-label="Mobile" style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
          {NAV.map((n) => <Link key={n.href} href={n.href} onClick={() => setMenu(false)} style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}>{n.label}</Link>)}
          <Link href="/ar" lang="ar" onClick={() => setMenu(false)} style={{ padding: "16px 0", fontFamily: "var(--arabic)" }}>العربية</Link>
        </nav>
      )}
    </>
  );
}

export function Footer() {
  const [joined, setJoined] = useState(false);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <Logo light />
            <p className="about">Handmade ceramics for cafés, restaurants and homes. Thrown, glazed and fired in our studio.</p>
          </div>
          <div><h5>Shop</h5><ul><li><Link href="/shop">All pieces</Link></li><li><Link href="/shop?c=Cups%20%26%20mugs">Cups &amp; mugs</Link></li><li><Link href="/shop?c=Plates">Plates &amp; bowls</Link></li><li><Link href="/shop?c=Vases">Vases</Link></li><li><Link href="/shop?c=Gift%20sets">Gift sets</Link></li></ul></div>
          <div><h5>Business</h5><ul><li><Link href="/business">For cafés &amp; restaurants</Link></li><li><Link href="/business#quote">Request a quote</Link></li><li><Link href="/portfolio">Portfolio</Link></li><li><Link href="/business#custom">Custom glazes</Link></li></ul></div>
          <div><h5>Help</h5><ul><li><Link href="/contact">Shipping &amp; delivery</Link></li><li><Link href="/contact">Returns &amp; exchanges</Link></li><li><Link href="/contact">Care guide</Link></li><li><Link href="/contact">Privacy policy</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
          <div>
            <h5>Studio letters</h5>
            <p className="small" style={{ color: "#bdbdbd" }}>New collections and studio news, once a month.</p>
            {joined ? <p className="small" style={{ color: "#fff", marginTop: 16 }}>Thanks — you&apos;re on the list.</p> : (
              <form className="news" onSubmit={(e) => { e.preventDefault(); setJoined(true); }}>
                <input type="email" required placeholder="Email address" aria-label="Email address" />
                <button className="btn sm light" style={{ height: 46 }}>Join</button>
              </form>
            )}
          </div>
        </div>
        <div className="bottom">
          <span>© 2026 Measure Pottery. All rights reserved.</span>
          <div className="row" style={{ gap: 20 }}><a href="https://instagram.com/measure.pottery" target="_blank" rel="noreferrer">Instagram</a><span>TikTok</span><span>Pinterest</span></div>
          <div className="pay"><span>mada</span><span>Apple Pay</span><span>VISA</span><span>Mastercard</span><span>tamara</span></div>
        </div>
      </div>
    </footer>
  );
}
