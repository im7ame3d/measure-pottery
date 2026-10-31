import { Footer, Header } from "@/components/Chrome";
import Icon from "@/components/Icon";
import SentForm from "@/components/Sent";
import { tr, type Lang } from "@/lib/i18n";

export default function Contact({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const ar = lang === "ar";
  const INFO: [string, string, React.ReactNode][] = [
    ["pin", t("Studio", "المرسم"), t("Studio address, District, Riyadh, Saudi Arabia", "عنوان المرسم، الحي، الرياض، المملكة العربية السعودية")],
    ["clock", t("Opening hours", "ساعات العمل"), t("Sun – Thu · 10:00 – 19:00\nSat · 14:00 – 20:00 · Friday closed", "الأحد – الخميس · ١٠:٠٠ – ١٩:٠٠\nالسبت · ١٤:٠٠ – ٢٠:٠٠ · الجمعة مغلق")],
    ["mail", t("Email", "البريد الإلكتروني"), ar ? <span dir="ltr">hello@measure.sa</span> : "hello@measure.sa"],
    ["phone", t("Phone", "الهاتف"), ar ? <span dir="ltr">+966 5X XXX XXXX</span> : "+966 5X XXX XXXX"],
  ];
  return (
    <>
      <Header />
      <main>
        <section className="wrap" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <div className="crumb">{t("Home / Contact", "الرئيسية / تواصل معنا")}</div>
          <h1 style={{ marginTop: 18 }}>{t("Get in touch", "تواصل معنا")}</h1>
          <p className="lead" style={{ marginTop: 12, maxWidth: 620 }}>{t("Questions about an order, a custom piece or tableware for your venue? We usually reply within one business day.", "لديك سؤال عن طلب، أو قطعة مخصّصة، أو أوانٍ لمكانك؟ نرد عادةً خلال يوم عمل واحد.")}</p>
        </section>
        <section className="wrap contact">
          <SentForm className="card" style={{ padding: 44, display: "flex", flexDirection: "column", gap: 20 }} message={<><h3>{t("Thanks — message sent.", "شكراً — تم إرسال رسالتك.")}</h3><p className="muted" style={{ marginTop: 8 }}>{t(<>We&apos;ll reply within one business day.</>, "سنرد عليك خلال يوم عمل واحد.")}</p></>}>
            <div className="grid2">
              <div className="field"><label htmlFor="n">{t("Full name", "الاسم الكامل")}</label><input id="n" className="input" required placeholder={t("Your name", "اسمك")} /></div>
              <div className="field"><label htmlFor="p">{t("Mobile number", "رقم الجوال")}</label><input id="p" className="input" type="tel" dir={ar ? "ltr" : undefined} placeholder="+966 5X XXX XXXX" /></div>
            </div>
            <div className="field"><label htmlFor="e">{t("Email", "البريد الإلكتروني")}</label><input id="e" className="input" type="email" dir={ar ? "ltr" : undefined} required placeholder="name@email.com" /></div>
            <div className="field"><label htmlFor="t">{t("What can we help with?", "كيف يمكننا مساعدتك؟")}</label>
              <select id="t" className="input">{t(["Order support", "Business / bulk order", "Custom piece", "Studio visit", "Other"], ["دعم الطلبات", "طلب أعمال / كميات", "قطعة مخصّصة", "زيارة المرسم", "أخرى"]).map((o) => <option key={o}>{o}</option>)}</select></div>
            <div className="field"><label htmlFor="m">{t("Message", "الرسالة")}</label><textarea id="m" className="input" required placeholder={t("Tell us a little more…", "أخبرنا بالمزيد…")} /></div>
            <button className="btn primary" style={{ alignSelf: "flex-start", padding: "0 44px" }}>{t("Send message", "إرسال الرسالة")}</button>
          </SentForm>
          <div>
            <a className="btn primary block" style={{ height: 60 }} href="https://wa.me/9665XXXXXXXX" target="_blank" rel="noreferrer"><Icon name="whatsapp" size={20} /> {t("Chat with us on WhatsApp", "تحدّث معنا عبر واتساب")}</a>
            <div style={{ marginTop: 12 }}>
              {INFO.map(([i, title, b]) => (
                <div className="info" key={i}><Icon name={i} /><div><div style={{ fontWeight: 500 }}>{title}</div><div className="small muted" style={{ whiteSpace: "pre-line" }}>{b}</div></div></div>
              ))}
            </div>
            <div className="photo" style={{ height: 260, marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)" }}><Icon name="pin" size={36} /><span className="xs" style={{ position: "absolute", insetInlineStart: 16, bottom: 12, letterSpacing: ".12em", color: "#8a8278" }}>{t("MAP", "الخريطة")}</span></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
