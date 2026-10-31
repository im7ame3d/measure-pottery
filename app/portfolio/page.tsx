"use client";

import Link from "next/link";
import { useState } from "react";
import { Footer, Header } from "@/components/Chrome";
import Icon from "@/components/Icon";
import { img } from "@/lib/products";

const CASES = [
  { type: "Café", city: "Riyadh", text: "Custom espresso cups with a stamped logo and matte charcoal glaze.", im: "peekabrew" },
  { type: "Restaurant", city: "Jeddah", text: "A full dinner service — plates, bowls and sharing platters.", im: "spread_wide" },
  { type: "Hotel", city: "AlUla", text: "Breakfast tableware in a desert-sand glaze for the lounge.", im: "cups_bisque" },
  { type: "Café", city: "Khobar", text: "Pour-over sets and cups for a specialty coffee bar.", im: "eyes" },
  { type: "Restaurant", city: "Riyadh", text: "Hand-thrown bowls for a tasting menu.", im: "mumsie" },
  { type: "Café", city: "Dammam", text: "Takeaway-counter mugs and saucers.", im: "studio" },
];
const FILTERS = ["All", "Cafés", "Restaurants", "Hotels"];

export default function Portfolio() {
  const [f, setF] = useState("All");
  const list = CASES.filter((c) => f === "All" || f.startsWith(c.type));
  return (
    <>
      <Header />
      <main>
        <section className="wrap" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div className="crumb">Home / Portfolio</div>
          <h1 style={{ marginTop: 18 }}>Our clients</h1>
          <p className="lead" style={{ marginTop: 12 }}>Cafés, restaurants and hotels serving on Measure tableware.</p>
          <div className="row" style={{ gap: 10, marginTop: 32, flexWrap: "wrap" }}>
            {FILTERS.map((x) => <button key={x} className={`chip ${f === x ? "on" : ""}`} aria-pressed={f === x} onClick={() => setF(x)}>{x}</button>)}
          </div>
        </section>
        <section className="wrap" style={{ paddingBottom: 96 }}>
          <div className="featured">
            <div className="photo"><img src={img("spread_close")} alt="Featured project: a restaurant tableware collection" /></div>
            <div className="copy">
              <span className="eyebrow">Featured project</span>
              <h2>Client name</h2>
              <div className="row" style={{ gap: 8, flexWrap: "wrap" }}><span className="tag">Restaurant</span><span className="tag">Riyadh</span><span className="tag">420 pieces</span></div>
              <p className="muted">A complete tableware collection — from bread plates to dessert bowls — glazed to echo the restaurant&apos;s limestone walls.</p>
              <div className="pull"><span className="serif" style={{ fontSize: 22 }}>“Every plate feels like part of the room.”</span><div className="xs muted" style={{ marginTop: 6 }}>— Owner name, Head chef</div></div>
              <Link className="btn secondary" href="/business#quote" style={{ alignSelf: "flex-start", marginTop: 8 }}>Start a project like this</Link>
            </div>
          </div>
        </section>
        <section className="wrap cases" style={{ paddingBottom: 112 }}>
          {list.map((c, i) => (
            <article key={i}>
              <div className="photo"><img src={img(c.im)} alt={`${c.type} project in ${c.city}`} loading="lazy" /></div>
              <div className="row" style={{ gap: 8 }}><span className="tag">{c.type}</span><span className="tag">{c.city}</span></div>
              <h3 style={{ margin: "14px 0 6px" }}>Client name</h3>
              <p className="small muted">{c.text}</p>
              <span className="row small" style={{ gap: 8, fontWeight: 500, marginTop: 12 }}>View project <Icon name="arrow" size={16} /></span>
            </article>
          ))}
        </section>
        <section className="wrap" style={{ paddingBottom: 112 }}>
          <div className="dark-banner">
            <div><h2>Your venue could be next.</h2><p style={{ color: "#cfcfcf", marginTop: 10 }}>Tell us what you&apos;re opening and we&apos;ll take it from there.</p></div>
            <Link className="btn light" href="/business#quote">Request a quote <Icon name="arrow" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
