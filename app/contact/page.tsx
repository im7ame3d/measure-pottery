import type { Metadata } from "next";
import { Footer, Header } from "@/components/Chrome";
import Icon from "@/components/Icon";
import SentForm from "@/components/Sent";

export const metadata: Metadata = { title: "Contact" };

const INFO = [
  ["pin", "Studio", "Studio address, District, Riyadh, Saudi Arabia"],
  ["clock", "Opening hours", "Sun – Thu · 10:00 – 19:00\nSat · 14:00 – 20:00 · Friday closed"],
  ["mail", "Email", "hello@measure.sa"],
  ["phone", "Phone", "+966 5X XXX XXXX"],
];

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <section className="wrap" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="crumb">Home / Contact</div>
          <h1 style={{ marginTop: 18 }}>Get in touch</h1>
          <p className="lead" style={{ marginTop: 12, maxWidth: 620 }}>Questions about an order, a custom piece or tableware for your venue? We usually reply within one business day.</p>
        </section>
        <section className="wrap contact">
          <SentForm className="card" style={{ padding: 44, display: "flex", flexDirection: "column", gap: 20 }} message={<><h3>Thanks — message sent.</h3><p className="muted" style={{ marginTop: 8 }}>We&apos;ll reply within one business day.</p></>}>
            <div className="grid2">
              <div className="field"><label htmlFor="n">Full name</label><input id="n" className="input" required placeholder="Your name" /></div>
              <div className="field"><label htmlFor="p">Mobile number</label><input id="p" className="input" type="tel" placeholder="+966 5X XXX XXXX" /></div>
            </div>
            <div className="field"><label htmlFor="e">Email</label><input id="e" className="input" type="email" required placeholder="name@email.com" /></div>
            <div className="field"><label htmlFor="t">What can we help with?</label>
              <select id="t" className="input"><option>Order support</option><option>Business / bulk order</option><option>Custom piece</option><option>Studio visit</option><option>Other</option></select></div>
            <div className="field"><label htmlFor="m">Message</label><textarea id="m" className="input" required placeholder="Tell us a little more…" /></div>
            <button className="btn primary" style={{ alignSelf: "flex-start", padding: "0 44px" }}>Send message</button>
          </SentForm>
          <div>
            <a className="btn primary block" style={{ height: 60 }} href="https://wa.me/9665XXXXXXXX" target="_blank" rel="noreferrer"><Icon name="whatsapp" size={20} /> Chat with us on WhatsApp</a>
            <div style={{ marginTop: 12 }}>
              {INFO.map(([i, t, b]) => (
                <div className="info" key={t}><Icon name={i} /><div><div style={{ fontWeight: 500 }}>{t}</div><div className="small muted" style={{ whiteSpace: "pre-line" }}>{b}</div></div></div>
              ))}
            </div>
            <div className="photo" style={{ height: 260, marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)" }}><Icon name="pin" size={36} /><span className="xs" style={{ position: "absolute", left: 16, bottom: 12, letterSpacing: ".12em", color: "#8a8278" }}>MAP</span></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
