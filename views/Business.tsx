import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import Icon from "@/components/Icon";
import SentForm from "@/components/Sent";
import { href, tr, type Lang } from "@/lib/i18n";
import { img } from "@/lib/products";

export default function Business({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const ar = lang === "ar";
  const CATS = t(
    [["Cups & saucers", "peekabrew"], ["Plates", "spread_close"], ["Bowls", "cups_bisque"], ["Serving pieces", "spread_wide"], ["Bespoke pieces", "espresso"]],
    [["أكواب وصحون", "peekabrew"], ["أطباق", "spread_close"], ["زبادي", "cups_bisque"], ["قطع تقديم", "spread_wide"], ["قطع حسب الطلب", "espresso"]],
  );
  const CUSTOM = t(
    [["edit", "Logo stamping", "Your mark pressed into the clay or applied under the glaze."], ["grid", "Custom glaze colours", "Match your interior, brand palette or menu."], ["box", "Forms & sizes", "Cup volumes and plate sizes tuned to your service."]],
    [["edit", "ختم الشعار", "شعارك مختوم في الطين أو مطبوع تحت الطلاء."], ["grid", "ألوان طلاء مخصّصة", "تتناغم مع تصميم مكانك وألوان علامتك وقائمتك."], ["box", "أشكال ومقاسات", "سعات الأكواب ومقاسات الأطباق مضبوطة على خدمتك."]],
  );
  const MOQ = t(
    [["Cups & mugs", "50 pcs", "4–6 weeks"], ["Plates", "40 pcs", "5–7 weeks"], ["Bowls", "40 pcs", "5–7 weeks"], ["Serving pieces", "10 pcs", "4–6 weeks"], ["Custom glaze development", "—", "+2 weeks"]],
    [["أكواب وفناجين", "٥٠ قطعة", "٤–٦ أسابيع"], ["أطباق", "٤٠ قطعة", "٥–٧ أسابيع"], ["زبادي", "٤٠ قطعة", "٥–٧ أسابيع"], ["قطع تقديم", "١٠ قطع", "٤–٦ أسابيع"], ["تطوير طلاء مخصّص", "—", "+ أسبوعان"]],
  );
  const STATS = t(
    [["Small-batch", "Made to order, never mass-produced"], ["Samples first", "Test pieces in real service"], ["Your brand", "Logo stamping & custom glazes"], ["Kingdom-wide", "Delivered with OTO"]],
    [["دفعات صغيرة", "تُصنع حسب الطلب، لا إنتاج بالجملة"], ["العيّنات أولاً", "جرّب القطع في خدمتك الفعلية"], ["علامتك", "ختم الشعار وطلاءات مخصّصة"], ["لكل المملكة", "التوصيل مع OTO"]],
  );
  return (
    <>
      <Header />
      <main>
        <section className="biz-hero">
          <div className="wrap inner">
            <div>
              <div className="eyebrow" style={{ color: "#bdbdbd" }}>{t(<>For cafés, restaurants &amp; hotels</>, "للمقاهي والمطاعم والفنادق")}</div>
              <h1 style={{ margin: "22px 0" }}>{t(<>Tableware that tells<br />your story.</>, <>أوانٍ تروي<br />قصتك.</>)}</h1>
              <p style={{ fontSize: 18, color: "#cfcfcf", maxWidth: 500 }}>{t("Handmade cups, plates and serving pieces in your colours and with your logo — sampled, produced and delivered in the quantities your service needs.", "أكواب وأطباق وقطع تقديم مصنوعة يدوياً بألوانك وشعارك — نصنع العيّنات وننتج ونوصل بالكميات التي تحتاجها خدمتك.")}</p>
              <div className="row" style={{ gap: 14, marginTop: 40, flexWrap: "wrap" }}>
                <a className="btn light" href="#quote">{t("Request a quote", "اطلب عرض سعر")} <Icon name="arrow" /></a>
                <Link className="btn" style={{ border: "1.5px solid #8d8d8d", color: "#fff" }} href={href(lang, "/portfolio")}>{t("See our work", "شاهد أعمالنا")}</Link>
              </div>
            </div>
            <div className="photo" style={{ height: 520 }}><img src={img("spread_close")} alt={t("Glazed plates and cups prepared for a restaurant", "أطباق وأكواب مطليّة مجهّزة لمطعم")} /></div>
          </div>
        </section>

        <section className="wrap stats">
          {STATS.map(([a, b]) => (
            <div key={a}><div className="v">{a}</div><div className="small muted">{b}</div></div>
          ))}
        </section>

        <section className="wrap section">
          <div className="eyebrow">{t("What we make", "ماذا نصنع")}</div>
          <h2 style={{ margin: "12px 0 40px" }}>{t("For every part of your service", "لكل جزء من خدمتك")}</h2>
          <div className="cats">
            {CATS.map(([c, im]) => <div key={c}><div className="photo"><img src={img(im)} alt={c} loading="lazy" /></div><div className="row" style={{ justifyContent: "space-between" }}><h4>{c}</h4><Icon name="arrow" size={18} /></div></div>)}
          </div>
        </section>

        <section id="custom" style={{ background: "var(--sand)" }}>
          <div className="wrap section">
            <div className="eyebrow">{t("Customisation", "التخصيص")}</div>
            <h2 style={{ margin: "12px 0 40px" }}>{t("Make it unmistakably yours", "اجعلها تحمل بصمتك")}</h2>
            <div className="custom3">
              {CUSTOM.map(([i, c, d]) => <div className="card" key={c}><div className="icon-circle"><Icon name={i} /></div><h4 style={{ marginBottom: 8 }}>{c}</h4><p className="small muted">{d}</p></div>)}
            </div>
          </div>
        </section>

        <section className="wrap section moq">
          <div><div className="eyebrow">{t("Ordering", "الطلبات")}</div><h2 style={{ margin: "12px 0 18px" }}>{t(<>Minimums &amp; lead times</>, "الحد الأدنى ومدة التنفيذ")}</h2><p className="muted">{t(<>Lead times start once your sample is approved. Need something sooner? Tell us your opening date and we&apos;ll do our best.</>, "تبدأ مدة التنفيذ بعد اعتماد العيّنة. تحتاجها أسرع؟ أخبرنا بموعد افتتاحك وسنبذل قصارى جهدنا.")}</p></div>
          <div className="table">
            <div className="tr th">{t(["ITEM", "MINIMUM ORDER", "LEAD TIME"], ["القطعة", "الحد الأدنى للطلب", "مدة التنفيذ"]).map((x) => <span key={x}>{x}</span>)}</div>
            {MOQ.map(([a, b, c]) => <div className="tr" key={a}><span>{a}</span><span>{b}</span><span>{c}</span></div>)}
          </div>
        </section>

        <section id="quote" className="white">
          <div className="wrap section quote-wrap">
            <div>
              <div className="eyebrow">{t("Request a quote", "اطلب عرض سعر")}</div>
              <h2 style={{ margin: "12px 0 18px" }}>{t(<>Tell us about<br />your venue</>, <>حدّثنا عن<br />مكانك</>)}</h2>
              <p className="muted">{t(<>We&apos;ll reply with a proposal and sample plan within 2 business days.</>, "سنرسل لك عرضاً وخطة للعيّنات خلال يومي عمل.")}</p>
              <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 14 }}>
                {t(["Free consultation", "Sample pieces before production", "Clear pricing per piece"], ["استشارة مجانية", "قطع عيّنة قبل الإنتاج", "تسعير واضح لكل قطعة"]).map((x) => <span key={x} className="check-item small"><Icon name="check" /> {x}</span>)}
              </div>
            </div>
            <SentForm className="card" style={{ padding: 44, background: "var(--bg)" }} message={<><h3>{t("Thanks — request received.", "شكراً — تم استلام طلبك.")}</h3><p className="muted" style={{ marginTop: 8 }}>{t(<>We&apos;ll reply with a proposal and sample plan within 2 business days.</>, "سنرسل لك عرضاً وخطة للعيّنات خلال يومي عمل.")}</p></>}>
              <div className="stepper">{t(["Your business", "Items & quantities", "Timeline", "References"], ["نشاطك", "القطع والكميات", "الجدول الزمني", "مراجع"]).map((s, i) => <div key={s} className={i === 0 ? "on" : ""}><i /><span>{ar ? `${["١", "٢", "٣", "٤"][i]}. ${s}` : `${i + 1}. ${s}`}</span></div>)}</div>
              <h4 style={{ marginBottom: 18 }}>{t("What type of business are you?", "ما نوع نشاطك التجاري؟")}</h4>
              <div className="btype" style={{ marginBottom: 28 }}>
                {t(["Café", "Restaurant", "Hotel", "Other"], ["مقهى", "مطعم", "فندق", "أخرى"]).map((b, i) => <label key={b}><input type="radio" name="type" defaultChecked={i === 0} />{b}</label>)}
              </div>
              <div className="grid2">
                <div className="field"><label htmlFor="bn">{t("Business name", "اسم النشاط")}</label><input id="bn" className="input" required /></div>
                <div className="field"><label htmlFor="bc">{t("City", "المدينة")}</label><select id="bc" className="input">{t(["Riyadh", "Jeddah", "Dammam", "Khobar", "Other"], ["الرياض", "جدة", "الدمام", "الخبر", "أخرى"]).map((c) => <option key={c}>{c}</option>)}</select></div>
                <div className="field"><label htmlFor="cp">{t("Contact person", "اسم المسؤول")}</label><input id="cp" className="input" required /></div>
                <div className="field"><label htmlFor="mp">{t("Mobile number", "رقم الجوال")}</label><input id="mp" className="input" type="tel" dir={ar ? "ltr" : undefined} required placeholder="+966 5X XXX XXXX" /></div>
                <div className="field span2"><label htmlFor="what">{t("What do you need? Items, quantities and timeline", "ماذا تحتاج؟ القطع والكميات والموعد")}</label><textarea id="what" className="input" placeholder={t("e.g. 120 cups and 60 saucers, logo stamped, for an opening in March", "مثال: ١٢٠ كوباً و٦٠ صحناً بختم الشعار، لافتتاح في مارس")} /></div>
                <div className="field span2"><label htmlFor="ig">{t("Instagram or website (optional)", "حساب إنستغرام أو الموقع (اختياري)")}</label><input id="ig" className="input" dir={ar ? "ltr" : undefined} placeholder="@yourcafe" /></div>
              </div>
              <div className="row" style={{ justifyContent: "flex-end", marginTop: 32 }}><button className="btn primary">{t("Send request", "إرسال الطلب")} <Icon name="arrow" /></button></div>
            </SentForm>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
