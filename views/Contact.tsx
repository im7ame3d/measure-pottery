import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import Icon from "@/components/Icon";
import { href, tr, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/shipping";

const { phone: PHONE, whatsapp: WHATSAPP, email: EMAIL } = CONTACT;

/** Contact: just two ways to reach us — WhatsApp and email. */
export default function Contact({ lang }: { lang: Lang }) {
  const t = tr(lang);
  return (
    <>
      <Header />
      <main>
        <section className="wrap contact-page">
          <div className="crumb"><Link href={href(lang, "/")}>{t("Home", "الرئيسية")}</Link> / {t("Contact", "تواصل معنا")}</div>
          <h1 style={{ marginTop: 18 }}>{t("Get in touch", "تواصل معنا")}</h1>
          <div className="contact-buttons">
            <a className="btn primary contact-btn" href={WHATSAPP} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" size={22} />
              <span><b>{t("WhatsApp", "واتساب")}</b><small dir="ltr">{PHONE}</small></span>
            </a>
            <a className="btn secondary contact-btn" href={`mailto:${EMAIL}`}>
              <Icon name="mail" size={22} />
              <span><b>{t("Email", "البريد الإلكتروني")}</b><small dir="ltr">{EMAIL}</small></span>
            </a>
          </div>
        </section>
      </main>
      <Footer enquiry={false} />
    </>
  );
}
