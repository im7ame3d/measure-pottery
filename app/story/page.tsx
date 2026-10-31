import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { img } from "@/lib/products";

export const metadata: Metadata = { title: "Our story" };

const PROCESS = [["Clay", "We wedge local and imported stoneware clays by hand.", "cups_bisque"], ["Wheel", "Each piece is thrown, trimmed and finished on the wheel.", "studio"], ["Glaze", "Glazes are mixed in the studio and tested on every batch.", "mumsie"], ["Kiln", "Fired to 1240°C for strength you can use every day.", "spread_close"]];
const VALUES = [["Handmade", "No moulds, no shortcuts. Every piece passes through our hands."], ["Local", "Made in Saudi Arabia, for the way we gather and eat here."], ["Small-batch", "We make less, so every piece gets the time it deserves."]];

export default function Story() {
  return (
    <>
      <Header />
      <main>
        <section className="story-hero">
          <div className="photo"><img src={img("studio")} alt="The Measure studio" style={{ objectPosition: "40% 60%" }} /></div>
          <div className="card-over"><div className="eyebrow">Our story</div><h1 style={{ marginTop: 14 }}>Made slowly,<br />made to last.</h1></div>
        </section>
        <section className="wrap section story" style={{ alignItems: "start" }}>
          <h2>Measure began with a single wheel and a simple idea.</h2>
          <div className="lead" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p>That the cup you drink from should feel as considered as what&apos;s in it. What started as a small home studio now supplies cafés and restaurants across the Kingdom — and still makes every piece by hand.</p>
            <p>Founder&apos;s story placeholder — two or three sentences about how the studio started, what inspires the forms and glazes, and who it&apos;s for.</p>
          </div>
        </section>
        <section className="wrap" style={{ paddingBottom: 112 }}>
          <div className="eyebrow">The process</div>
          <h2 style={{ margin: "12px 0 40px" }}>From clay to kiln</h2>
          <div className="grid4">
            {PROCESS.map(([t, d, im], i) => (
              <div key={t} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="photo" style={{ height: 300 }}><img src={img(im)} alt={t} loading="lazy" /></div>
                <div className="serif" style={{ fontSize: 20, color: "var(--brand)" }}>0{i + 1}</div>
                <h4>{t}</h4><p className="small muted">{d}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ background: "var(--ink)", color: "#fff" }}>
          <div className="wrap section">
            <div className="eyebrow" style={{ color: "#bdbdbd" }}>What we value</div>
            <h2 style={{ margin: "12px 0 48px" }}>Three things we won&apos;t compromise</h2>
            <div className="values">{VALUES.map(([t, d]) => <div key={t}><h3 style={{ marginBottom: 10 }}>{t}</h3><p style={{ color: "#cfcfcf" }}>{d}</p></div>)}</div>
          </div>
        </section>
        <section className="wrap section">
          <div className="eyebrow">The makers</div>
          <h2 style={{ margin: "12px 0 40px" }}>The hands behind the pieces</h2>
          <div className="grid3">
            {["Founder & potter", "Glaze & kiln lead", "Studio potter"].map((r) => (
              <div key={r} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div className="photo" style={{ height: 380, display: "flex", alignItems: "center", justifyContent: "center" }}><span className="xs" style={{ letterSpacing: ".12em", color: "#8a8278" }}>PORTRAIT</span></div>
                <h4>Maker name</h4><p className="small muted">{r}</p>
              </div>
            ))}
          </div>
        </section>
        <section style={{ background: "var(--sand)" }}>
          <div className="wrap row" style={{ padding: "96px clamp(20px, 8.3vw, 120px)", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div><h2>Visit the studio</h2><p className="muted" style={{ marginTop: 12, maxWidth: 440 }}>See the wheels, the kiln and the pieces in progress. Studio visits by appointment.</p></div>
            <div className="row" style={{ gap: 14, flexWrap: "wrap" }}><Link className="btn primary" href="/contact">Book a visit</Link><Link className="btn secondary" href="/shop">Shop the collection</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
