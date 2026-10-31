"use client";

import { tr } from "@/lib/i18n";
import Icon from "./Icon";
import { useLang } from "./Lang";
import SentForm from "./Sent";

/**
 * The fill-in-the-blanks business enquiry over the ceiling photo.
 * Full-screen on the business page; a shorter band above the footer everywhere else.
 */
export default function Enquiry({ id, full = false }: { id: string; full?: boolean }) {
  const t = tr(useLang());
  return (
    <section id={id} className={full ? "enquiry" : "enquiry band"}>
      <img className="enquiry-bg" src="/img/business-ceiling.jpg" alt="" loading={full ? undefined : "lazy"} />
      <div className="wrap enquiry-inner">
        <div className="eyebrow">{t("For cafés & businesses", "للمقاهي والأعمال")}</div>
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
            <input name="brief" required aria-label={t("About the project", "نبذة عن المشروع")} placeholder={t("a brief about the project", "نبذة عن المشروع")} className="blank wide" />
            {" "}{t("reach us on", "تواصلوا معنا على")}{" "}
            <input name="phone" type="tel" required autoComplete="tel" dir="ltr" aria-label={t("Phone number", "رقم الجوال")} placeholder="05X XXX XXXX" className="blank phone" />
          </p>
          <button className="btn enquiry-send">{t("Send", "أرسل")} <Icon name="arrow" /></button>
        </SentForm>
      </div>
    </section>
  );
}
