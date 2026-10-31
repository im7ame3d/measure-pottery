import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/Chrome";
import Icon from "@/components/Icon";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, bySlug } from "@/lib/products";
import BuyBox from "./BuyBox";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return { title: p?.name ?? "Product", description: p?.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug);
  if (!p) notFound();
  const related = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 4);
  return (
    <>
      <Header />
      <main>
        <section className="wrap" style={{ paddingTop: 36 }}>
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <Link href={`/shop?c=${encodeURIComponent(p.category)}`}>{p.category}</Link> / {p.name}</div>
        </section>
        <BuyBox p={p} />
        <section className="wrap" style={{ paddingBottom: 96 }}>
          <div className="dark-banner">
            <div><div className="eyebrow" style={{ color: "#bdbdbd" }}>For business</div><h3 style={{ marginTop: 10 }}>Love this glaze for your café?</h3><p style={{ color: "#cfcfcf", marginTop: 8 }}>We can make cups, plates and bowls in the same finish, in the quantities you need.</p></div>
            <Link className="btn light" href="/business#quote">Request a quote <Icon name="arrow" /></Link>
          </div>
        </section>
        <section className="wrap" style={{ paddingBottom: 112 }}>
          <h2 style={{ marginBottom: 36 }}>You may also like</h2>
          <div className="grid4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, offers: { "@type": "Offer", price: p.price, priceCurrency: "SAR" } }) }} />
    </>
  );
}
