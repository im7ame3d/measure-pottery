"use client";

import { usePathname } from "next/navigation";
import { tr } from "@/lib/i18n";
import { rpc } from "@/lib/supabase-config";
import Icon from "./Icon";
import { useLang } from "./Lang";
import SentForm from "./Sent";

const WHATSAPP = "966554352666";
// Enquiries are saved to the database (see the admin dashboard) and handed to WhatsApp as a ready-written
// message. Set NEXT_PUBLIC_SHEET_CONNECTED=1 (with SHEET_WEBHOOK_URL) to send them to the Google Sheet instead.
const SHEET = process.env.NEXT_PUBLIC_SHEET_CONNECTED === "1";

/** Grow a textarea with its content (for browsers without CSS field-sizing). */
const autoGrow = (e: React.FormEvent<HTMLTextAreaElement>) => {
  const el = e.currentTarget;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
};

/**
 * The fill-in-the-blanks business enquiry over the ceiling photo, one sentence per line.
 * Full-screen on the business page; a shorter band above the footer everywhere else.
 */
export default function Enquiry({ id, full = false }: { id: string; full?: boolean }) {
  const lang = useLang();
  const t = tr(lang);
  const page = usePathname();

  const toWhatsApp = (f: Record<string, string>) => {
    // keep a copy for the admin dashboard; keepalive lets it finish even as WhatsApp opens
    rpc("submit_enquiry", { p_business: f.business, p_brief: f.brief, p_phone: f.phone, p_page: page, p_lang: lang }, { keepalive: true }).catch(() => {});
    const text = t(
      `Hi, we're ${f.business}\nWe're looking for:\n${f.brief}\nReach us on ${f.phone}`,
      `مرحباً، نحن ${f.business}\nونبحث عن:\n${f.brief}\nتواصلوا معنا على ${f.phone}`,
    );
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id={id} className={full ? "enquiry" : "enquiry band"}>
      <img className="enquiry-bg" src="/img/business-ceiling.jpg" alt="" loading={full ? undefined : "lazy"} />
      <div className="wrap enquiry-inner">
        <div className="eyebrow">{t("For cafés & businesses", "للمقاهي والأعمال")}</div>
        <SentForm
          className="enquiry-form"
          {...(SHEET ? { endpoint: "/api/enquiry", extra: { page, lang } } : { handoff: toWhatsApp })}
          error={t("Couldn’t send that just now. Please try again in a moment.", "تعذّر الإرسال الآن، حاولوا مرة أخرى بعد قليل.")}
          message={
            <div className="enquiry-done">
              <p className="madlib">{t("Thank you — we have it.", "شكراً لكم — وصلنا طلبكم.")}</p>
              <p className="enquiry-note">{SHEET
                ? t("We'll call you within two business days with a proposal and samples.", "سنتصل بكم خلال يومي عمل بعرض وعيّنات.")
                : t("We've opened WhatsApp with your message ready — just hit send.", "فتحنا لكم واتساب ورسالتكم جاهزة، بس اضغطوا إرسال.")}</p>
            </div>
          }
        >
          <div className="madlib">
            <label className="ml-line">
              <span>{t("Hi, we're", "مرحباً، نحن")}</span>
              <input name="business" required autoComplete="organization" placeholder={t("establishment name", "اسم المنشأة")} className="blank" />
            </label>
            <label className="ml-line">
              <span>{t("looking for", "ونبحث عن")}</span>
              <textarea name="brief" required rows={1} onInput={autoGrow} placeholder={t("a brief about the project", "نبذة عن المشروع")} className="blank brief" />
            </label>
            <label className="ml-line">
              <span>{t("reach us on", "تواصلوا معنا على")}</span>
              <input name="phone" type="tel" required autoComplete="tel" dir="ltr" placeholder="05X XXX XXXX" className="blank phone" />
            </label>
            <input name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          </div>
          <button className="btn enquiry-send">{t("Send", "أرسل")} <Icon name="arrow" /></button>
        </SentForm>
      </div>
    </section>
  );
}
