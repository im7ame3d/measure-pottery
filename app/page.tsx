import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import Icon from "@/components/Icon";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, img } from "@/lib/products";

const STEPS = [
  ["01", "Consult", "Tell us about your venue, menu and the pieces you need."],
  ["02", "Sample", "We throw and glaze samples for you to test in service."],
  ["03", "Production", "Your order is made in small batches, logo-stamped if you like."],
  ["04", "Delivery", "Packed with care and delivered to your door across the Kingdom."],
];
const GIFTS = [["Under 200 SAR", "espresso", "/shop"], ["Gift sets", "mumsie", "/shop?c=Gift%20sets"], ["One-of-a-kind pieces", "spread_wide", "/shop"]];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="wrap hero">
          <div>
            <div className="eyebrow">Handmade ceramics studio · Saudi Arabia</div>
            <h1>Ceramics, made<br />to measure.</h1>
            <p className="lead" style={{ maxWidth: 500 }}>Tableware crafted for cafés and restaurants that care about every detail — and exclusive, one-of-a-kind pieces for your home and the people you love.</p>
            <div className="ctas">
              <Link className="btn primary" href="/business">For Cafés &amp; Restaurants <Icon name="arrow" /></Link>
              <Link className="btn secondary" href="/shop">Shop Exclusive Pieces</Link>
            </div>
            <div className="checks small muted">
              <span className="check-item"><Icon name="check" /> Small-batch, handmade</span>
              <span className="check-item"><Icon name="check" /> Custom glazes &amp; logos</span>
            </div>
          </div>
          <div className="hero-pics">
            <div className="photo"><img src={img("cups_bisque")} alt="Hand-shaped cups drying before glazing" /></div>
            <div className="stack">
              <div className="photo"><img src={img("peekabrew")} alt="Café cups stamped with the Peek a Brew logo" /></div>
              <div className="photo"><img src={img("mumsie")} alt="Pink-glazed cups lettered by hand" /></div>
            </div>
          </div>
        </section>

        <section className="wrap" style={{ paddingBottom: 96 }}>
          <div className="eyebrow" style={{ textAlign: "center", marginBottom: 28 }}>Served at cafés &amp; restaurants across the Kingdom</div>
          <div className="logos">{Array.from({ length: 6 }, (_, i) => <div key={i}>CLIENT LOGO</div>)}</div>
        </section>

        <section className="wrap paths" style={{ paddingBottom: 112 }}>
          <div className="path dark">
            <div className="eyebrow" style={{ color: "#bdbdbd" }}>For business</div>
            <h2>For your café<br />or restaurant</h2>
            <p style={{ color: "#cfcfcf", maxWidth: 420 }}>Custom tableware in your colours, with your logo, made in the quantities you need.</p>
            <ul style={{ color: "#e6e6e6" }}>
              <li className="check-item"><Icon name="check" /> Cups, plates, bowls &amp; serving pieces</li>
              <li className="check-item"><Icon name="check" /> Logo stamping &amp; custom glazes</li>
              <li className="check-item"><Icon name="check" /> Samples before production</li>
            </ul>
            <Link className="btn light" href="/business#quote">Request a quote <Icon name="arrow" /></Link>
          </div>
          <div className="path sandbg">
            <div className="eyebrow">For you</div>
            <h2>For your home<br />&amp; gifting</h2>
            <p className="muted" style={{ maxWidth: 420 }}>Limited, one-of-a-kind pieces — when they&apos;re gone, they&apos;re gone. Gift-wrapped with a handwritten note on request.</p>
            <ul>
              <li className="check-item"><Icon name="check" /> Exclusive pieces, never repeated</li>
              <li className="check-item"><Icon name="check" /> Gift wrapping &amp; personal message</li>
              <li className="check-item"><Icon name="check" /> Pay in 4 with Tamara</li>
            </ul>
            <Link className="btn primary" href="/shop">Shop the collection <Icon name="arrow" /></Link>
          </div>
        </section>

        <section className="wrap" style={{ paddingBottom: 112 }}>
          <div className="section-head">
            <div><div className="eyebrow">Exclusive pieces</div><h2 style={{ marginTop: 12 }}>Featured this season</h2></div>
            <Link className="btn secondary" href="/shop">View all pieces <Icon name="arrow" /></Link>
          </div>
          <div className="grid4">{PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        </section>

        <section className="white">
          <div className="wrap section">
            <div className="section-head" style={{ marginBottom: 56 }}>
              <div><div className="eyebrow">B2B ordering</div><h2 style={{ marginTop: 12 }}>How it works</h2></div>
              <Link className="btn primary" href="/business#quote">Start your order</Link>
            </div>
            <div className="steps4">
              {STEPS.map(([n, t, d]) => (
                <div className="step" key={n}><div className="n">{n}</div><h4 style={{ margin: "10px 0 8px" }}>{t}</h4><p className="small muted">{d}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap section story">
          <div className="photo" style={{ height: 560 }}><img src={img("studio")} alt="The Measure studio with a table of glazed cups" /></div>
          <div>
            <div className="eyebrow">Our story</div>
            <h2 style={{ margin: "14px 0 22px" }}>From clay to kiln,<br />by hand.</h2>
            <p className="lead">Every piece starts as a lump of clay on our wheel. We throw, trim, glaze and fire in small batches — so each cup, plate and vase carries the marks of the hands that made it.</p>
            <Link className="btn secondary" href="/story" style={{ marginTop: 36 }}>Meet the studio</Link>
          </div>
        </section>

        <section className="wrap" style={{ paddingBottom: 112 }}>
          <div className="eyebrow">Gift ideas</div>
          <h2 style={{ margin: "12px 0 40px" }}>Something made by hand</h2>
          <div className="grid3">
            {GIFTS.map(([t, im, href]) => (
              <Link href={href} key={t} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="photo" style={{ height: 360 }}><img src={img(im)} alt={t} loading="lazy" /></div>
                <div className="row" style={{ justifyContent: "space-between" }}><h4>{t}</h4><Icon name="arrow" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="quote">
          <div className="wrap">
            <blockquote>“Our guests ask about the cups before they ask about the coffee. The pieces made our space feel like ours.”</blockquote>
            <div className="small" style={{ marginTop: 28, fontWeight: 500 }}>Client name</div>
            <div className="xs muted">Owner, Café name — Riyadh</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
