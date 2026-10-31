import { Footer, Header } from "@/components/Chrome";
import Icon from "@/components/Icon";
import SentForm from "@/components/Sent";
import { tr, type Lang } from "@/lib/i18n";

/** The whole business page: one full-screen section with a fill-in-the-blanks enquiry. */
export default function Business({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const ar = lang === "ar";
  return (
    <>
      <Header />
      <main>
        <section id="quote" className="enquiry">
          <img className="enquiry-bg" src="/img/business-ceiling.jpg" alt="" />
          <div className="wrap enquiry-inner">
            <div className="eyebrow">{t("For cafés, restaurants & hotels", "للمقاهي والمطاعم والفنادق")}</div>
            <SentForm className="enquiry-form" message={
              <div className="enquiry-done">
                <p className="madlib">{t("Thank you — we have it.", "شكراً لكم — وصلنا طلبكم.")}</p>
                <p className="enquiry-note">{t("We'll call you within two business days with a proposal and samples.", "سنتصل بكم خلال يومي عمل بعرض وعيّنات.")}</p>
              </div>
            }>
              <p className="madlib">
                {t("Hi, we're", "مرحباً، نحن")}{" "}
                <input name="business" required autoComplete="organization" aria-label={t("Establishment name", "اسم المنشأة")} placeholder={t("establishment name", "اسم المنشأة")} className="blank" />
                {" "}{t("looking for", "ونبحث عن")}{" "}
                <input name="brief" required aria-label={t("Brief", "نبذة مختصرة")} placeholder={t("a brief — e.g. 120 cups with our logo", "نبذة مختصرة — مثلاً ١٢٠ كوباً بشعارنا")} className="blank wide" />
                {" "}{t("reach us on", "تواصلوا معنا على")}{" "}
                <input name="phone" type="tel" required autoComplete="tel" dir="ltr" aria-label={t("Phone number", "رقم الجوال")} placeholder="05X XXX XXXX" className="blank phone" />
              </p>
              <button className="btn enquiry-send">{t("Send", "أرسل")} <Icon name="arrow" /></button>
            </SentForm>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
