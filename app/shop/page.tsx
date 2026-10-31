import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer, Header } from "@/components/Chrome";
import ShopGrid from "./ShopGrid";

export const metadata: Metadata = { title: "Shop" };

export default function Shop() {
  return (
    <>
      <Header />
      <main>
        <section className="wrap" style={{ paddingTop: 48, paddingBottom: 40 }}>
          <div className="crumb">Home / Shop</div>
          <h1 style={{ marginTop: 18 }}>Shop</h1>
          <p className="lead" style={{ marginTop: 12 }}>Handmade pieces for your table, your shelves and your gifts.</p>
        </section>
        <Suspense><ShopGrid /></Suspense>
      </main>
      <Footer />
    </>
  );
}
