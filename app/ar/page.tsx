import type { Metadata } from "next";
import Link from "next/link";
import { CartButton } from "@/components/Cart";
import { Footer } from "@/components/Chrome";
import { img } from "@/lib/products";

export const metadata: Metadata = { title: "الرئيسية", description: "خزفٌ مصنوع على مقاسك — أوانٍ يدوية للمقاهي والمطاعم، وقطع حصرية لبيتك وهداياك." };

export default function Arabic() {
  return (
    <>
      <div className="rtl" lang="ar" dir="rtl">
        <div className="announce"><span>توصيل مجاني داخل الرياض للطلبات فوق ٥٠٠ ريال</span><span className="sep">|</span><span className="second">قسّم مشترياتك على ٤ دفعات بدون فوائد مع تمارا</span></div>
        <header className="header">
          <div className="wrap row" style={{ width: "100%", justifyContent: "space-between" }}>
            <Link href="/ar" className="logo" aria-label="مجر Measure Pottery"><img className="m" src="/logo/mark.svg" alt="" /><img className="w" src="/logo/wordmark.svg" alt="Measure Pottery" /></Link>
            <nav className="nav" aria-label="القائمة"><Link href="/shop">المتجر</Link><Link href="/business">للأعمال</Link><Link href="/portfolio">أعمالنا</Link><Link href="/story">قصتنا</Link><Link href="/contact">تواصل معنا</Link></nav>
            <div className="tools"><Link href="/" className="lang" lang="en" style={{ fontFamily: "var(--sans)" }}>EN</Link><CartButton /></div>
          </div>
        </header>
        <main>
          <section className="wrap hero">
            <div>
              <div className="eyebrow">استوديو خزف يدوي · المملكة العربية السعودية</div>
              <h1>خزفٌ مصنوع<br />على مقاسك.</h1>
              <p className="lead" style={{ maxWidth: 520 }}>أوانٍ مصنوعة يدوياً للمقاهي والمطاعم التي تهتم بأدق التفاصيل، وقطع حصرية فريدة لبيتك ولمن تحب.</p>
              <div className="ctas"><Link className="btn primary" href="/business">للمقاهي والمطاعم</Link><Link className="btn secondary" href="/shop">تسوّق القطع الحصرية</Link></div>
            </div>
            <div className="hero-pics">
              <div className="photo"><img src={img("cups_bisque")} alt="أكواب طينية مشكّلة باليد" /></div>
              <div className="stack"><div className="photo"><img src={img("peekabrew")} alt="أكواب مقهى مختومة بالشعار" /></div><div className="photo"><img src={img("mumsie")} alt="أكواب مزججة بالوردي" /></div></div>
            </div>
          </section>
          <section className="wrap paths" style={{ paddingBottom: 112 }}>
            <div className="path dark"><div className="eyebrow" style={{ color: "#bdbdbd" }}>للأعمال</div><h2>لمقهاك أو مطعمك</h2><p style={{ color: "#cfcfcf" }}>أوانٍ مخصّصة بألوانك وشعارك، وبالكميات التي تحتاجها.</p><Link className="btn light" href="/business#quote">اطلب عرض سعر</Link></div>
            <div className="path sandbg"><div className="eyebrow">لك</div><h2>لبيتك وهداياك</h2><p className="muted">قطع محدودة لا تتكرر، مع تغليف هدايا وبطاقة مكتوبة بخط اليد.</p><Link className="btn primary" href="/shop">تسوّق المجموعة</Link></div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
