import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import Icon from "@/components/Icon";
import SentForm from "@/components/Sent";
import { img } from "@/lib/products";

export const metadata: Metadata = { title: "For cafés & restaurants" };

const CATS = [["Cups & saucers", "peekabrew"], ["Plates", "spread_close"], ["Bowls", "cups_bisque"], ["Serving pieces", "spread_wide"], ["Bespoke pieces", "espresso"]];
const CUSTOM = [["edit", "Logo stamping", "Your mark pressed into the clay or applied under the glaze."], ["grid", "Custom glaze colours", "Match your interior, brand palette or menu."], ["box", "Forms & sizes", "Cup volumes and plate sizes tuned to your service."]];
const MOQ = [["Cups & mugs", "50 pcs", "4–6 weeks"], ["Plates", "40 pcs", "5–7 weeks"], ["Bowls", "40 pcs", "5–7 weeks"], ["Serving pieces", "10 pcs", "4–6 weeks"], ["Custom glaze development", "—", "+2 weeks"]];

export default function Business() {
  return (
    <>
      <Header />
      <main>
        <section className="biz-hero">
          <div className="wrap inner">
            <div>
              <div className="eyebrow" style={{ color: "#bdbdbd" }}>For cafés, restaurants &amp; hotels</div>
              <h1 style={{ margin: "22px 0" }}>Tableware that tells<br />your story.</h1>
              <p style={{ fontSize: 18, color: "#cfcfcf", maxWidth: 500 }}>Handmade cups, plates and serving pieces in your colours and with your logo — sampled, produced and delivered in the quantities your service needs.</p>
              <div className="row" style={{ gap: 14, marginTop: 40, flexWrap: "wrap" }}>
                <a className="btn light" href="#quote">Request a quote <Icon name="arrow" /></a>
                <Link className="btn" style={{ border: "1.5px solid #8d8d8d", color: "#fff" }} href="/portfolio">See our work</Link>
              </div>
            </div>
            <div className="photo" style={{ height: 520 }}><img src={img("spread_close")} alt="Glazed plates and cups prepared for a restaurant" /></div>
          </div>
        </section>

        <section className="wrap stats">
          {[["Small-batch", "Made to order, never mass-produced"], ["Samples first", "Test pieces in real service"], ["Your brand", "Logo stamping & custom glazes"], ["Kingdom-wide", "Delivered with OTO"]].map(([a, b]) => (
            <div key={a}><div className="v">{a}</div><div className="small muted">{b}</div></div>
          ))}
        </section>

        <section className="wrap section">
          <div className="eyebrow">What we make</div>
          <h2 style={{ margin: "12px 0 40px" }}>For every part of your service</h2>
          <div className="cats">
            {CATS.map(([t, im]) => <div key={t}><div className="photo"><img src={img(im)} alt={t} loading="lazy" /></div><div className="row" style={{ justifyContent: "space-between" }}><h4>{t}</h4><Icon name="arrow" size={18} /></div></div>)}
          </div>
        </section>

        <section id="custom" style={{ background: "var(--sand)" }}>
          <div className="wrap section">
            <div className="eyebrow">Customisation</div>
            <h2 style={{ margin: "12px 0 40px" }}>Make it unmistakably yours</h2>
            <div className="custom3">
              {CUSTOM.map(([i, t, d]) => <div className="card" key={t}><div className="icon-circle"><Icon name={i} /></div><h4 style={{ marginBottom: 8 }}>{t}</h4><p className="small muted">{d}</p></div>)}
            </div>
          </div>
        </section>

        <section className="wrap section moq">
          <div><div className="eyebrow">Ordering</div><h2 style={{ margin: "12px 0 18px" }}>Minimums &amp; lead times</h2><p className="muted">Lead times start once your sample is approved. Need something sooner? Tell us your opening date and we&apos;ll do our best.</p></div>
          <div className="table">
            <div className="tr th"><span>ITEM</span><span>MINIMUM ORDER</span><span>LEAD TIME</span></div>
            {MOQ.map(([a, b, c]) => <div className="tr" key={a}><span>{a}</span><span>{b}</span><span>{c}</span></div>)}
          </div>
        </section>

        <section id="quote" className="white">
          <div className="wrap section quote-wrap">
            <div>
              <div className="eyebrow">Request a quote</div>
              <h2 style={{ margin: "12px 0 18px" }}>Tell us about<br />your venue</h2>
              <p className="muted">We&apos;ll reply with a proposal and sample plan within 2 business days.</p>
              <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 14 }}>
                {["Free consultation", "Sample pieces before production", "Clear pricing per piece"].map((t) => <span key={t} className="check-item small"><Icon name="check" /> {t}</span>)}
              </div>
            </div>
            <SentForm className="card" style={{ padding: 44, background: "var(--bg)" }} message={<><h3>Thanks — request received.</h3><p className="muted" style={{ marginTop: 8 }}>We&apos;ll reply with a proposal and sample plan within 2 business days.</p></>}>
              <div className="stepper">{["Your business", "Items & quantities", "Timeline", "References"].map((t, i) => <div key={t} className={i === 0 ? "on" : ""}><i /><span>{i + 1}. {t}</span></div>)}</div>
              <h4 style={{ marginBottom: 18 }}>What type of business are you?</h4>
              <div className="btype" style={{ marginBottom: 28 }}>
                {["Café", "Restaurant", "Hotel", "Other"].map((t, i) => <label key={t}><input type="radio" name="type" defaultChecked={i === 0} />{t}</label>)}
              </div>
              <div className="grid2">
                <div className="field"><label htmlFor="bn">Business name</label><input id="bn" className="input" required /></div>
                <div className="field"><label htmlFor="bc">City</label><select id="bc" className="input"><option>Riyadh</option><option>Jeddah</option><option>Dammam</option><option>Khobar</option><option>Other</option></select></div>
                <div className="field"><label htmlFor="cp">Contact person</label><input id="cp" className="input" required /></div>
                <div className="field"><label htmlFor="mp">Mobile number</label><input id="mp" className="input" type="tel" required placeholder="+966 5X XXX XXXX" /></div>
                <div className="field span2"><label htmlFor="what">What do you need? Items, quantities and timeline</label><textarea id="what" className="input" placeholder="e.g. 120 cups and 60 saucers, logo stamped, for an opening in March" /></div>
                <div className="field span2"><label htmlFor="ig">Instagram or website (optional)</label><input id="ig" className="input" placeholder="@yourcafe" /></div>
              </div>
              <div className="row" style={{ justifyContent: "flex-end", marginTop: 32 }}><button className="btn primary">Send request <Icon name="arrow" /></button></div>
            </SentForm>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
