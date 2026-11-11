import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { href, tr, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/shipping";

/** Privacy policy: what the site collects, why, who sees it and the customer's rights (Saudi PDPL). */
export default function Privacy({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const phone = <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" dir="ltr">{CONTACT.phone}</a>;
  const email = <a href={`mailto:${CONTACT.email}`} dir="ltr">{CONTACT.email}</a>;
  return (
    <>
      <Header />
      <main>
        <section className="wrap policy">
          <div className="crumb"><Link href={href(lang, "/")}>{t("Home", "الرئيسية")}</Link> / {t("Privacy policy", "سياسة الخصوصية")}</div>
          <h1>{t("Privacy policy", "سياسة الخصوصية")}</h1>
          <p className="policy-date">{t("Last updated: 11 November 2026", "آخر تحديث: ١١ نوفمبر ٢٠٢٦")}</p>
          <p className="lead">{t(
            "Measure Ceramics respects your privacy. This policy explains what information we collect when you use measure-ceramics.com, why we collect it and how we protect it, in line with Saudi Arabia's Personal Data Protection Law.",
            "تحترم Measure Ceramics خصوصيتك. توضّح هذه السياسة المعلومات التي نجمعها عند استخدامك لموقع measure-ceramics.com، وسبب جمعها وطريقة حمايتها، وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية.",
          )}</p>

          <h2>{t("Information we collect", "المعلومات التي نجمعها")}</h2>
          <ul>
            <li>{t("When you place an order: your name, mobile number, email address and delivery address.", "عند إتمام الطلب: الاسم ورقم الجوال والبريد الإلكتروني وعنوان التوصيل.")}</li>
            <li>{t("When you send a business enquiry: the establishment name, the project brief and your phone number.", "عند إرسال طلب للأعمال: اسم المنشأة ونبذة عن المشروع ورقم الجوال.")}</li>
            <li>{t("When you subscribe to our newsletter: your email address.", "عند الاشتراك في رسائل المعمل: البريد الإلكتروني.")}</li>
            <li>{t("When you contact us on WhatsApp or by email: the details you choose to share.", "عند تواصلك معنا عبر واتساب أو البريد الإلكتروني: ما تختار مشاركته معنا.")}</li>
          </ul>
          <p>{t(
            "We don't collect or store your card details. Payments are processed by a licensed payment provider over a secure, encrypted connection.",
            "لا نجمع بيانات بطاقتك ولا نحتفظ بها؛ تتم عمليات الدفع عبر مزوّد دفع مرخّص وباتصال آمن ومشفّر.",
          )}</p>

          <h2>{t("How we use your information", "كيف نستخدم معلوماتك")}</h2>
          <ul>
            <li>{t("To process, deliver and follow up on your orders.", "لتنفيذ طلباتك وتوصيلها ومتابعتها.")}</li>
            <li>{t("To reply to your enquiries and prepare quotes and samples.", "للرد على استفساراتك وإعداد عروض الأسعار والعيّنات.")}</li>
            <li>{t("To handle returns, exchanges and refunds.", "لمعالجة طلبات الإرجاع والاستبدال والاسترداد.")}</li>
            <li>{t("To send you news about new collections, only if you subscribe. You can unsubscribe at any time.", "لإرسال أخبار المجموعات الجديدة، فقط إذا اشتركت بنفسك، ويمكنك إلغاء الاشتراك في أي وقت.")}</li>
          </ul>

          <h2>{t("Who we share it with", "مع من نشارك معلوماتك")}</h2>
          <p>{t(
            "We don't sell or rent your information. We share only what's needed with the parties that help us serve you:",
            "لا نبيع معلوماتك ولا نؤجّرها. نشارك فقط ما يلزم مع الجهات التي تساعدنا في خدمتك:",
          )}</p>
          <ul>
            <li>{t("Shipping companies, such as Aramex, to deliver your order.", "شركات الشحن مثل أرامكس، لتوصيل طلبك.")}</li>
            <li>{t("The payment provider, to complete your payment.", "مزوّد خدمة الدفع، لإتمام عملية الدفع.")}</li>
            <li>{t("Our website hosting provider, which stores the site and its technical logs.", "مزوّد استضافة الموقع، الذي يحفظ الموقع وسجلاته التقنية.")}</li>
            <li>{t("Government authorities, when the law requires it.", "الجهات الحكومية، عندما يتطلب النظام ذلك.")}</li>
          </ul>

          <h2>{t("Cookies and browser storage", "ملفات تعريف الارتباط والتخزين في المتصفح")}</h2>
          <p>{t(
            "We don't use advertising or tracking cookies. Your shopping cart is saved in your own browser so it's still there when you come back; you can clear it at any time from your browser settings.",
            "لا نستخدم ملفات تعريف ارتباط إعلانية أو للتتبّع. تُحفظ سلة مشترياتك في متصفحك أنت حتى تجدها عند عودتك، ويمكنك مسحها في أي وقت من إعدادات المتصفح.",
          )}</p>

          <h2>{t("How long we keep it", "مدة الاحتفاظ بالمعلومات")}</h2>
          <p>{t(
            "We keep your information only as long as needed for the purposes above, or as long as the law requires, for example for invoices and accounting records.",
            "نحتفظ بمعلوماتك طوال المدة اللازمة للأغراض المذكورة أعلاه فقط، أو المدة التي يتطلبها النظام، مثل الفواتير والسجلات المحاسبية.",
          )}</p>

          <h2>{t("Protecting your information", "حماية معلوماتك")}</h2>
          <p>{t(
            "The site runs over an encrypted connection (HTTPS), and only the people who need your information to serve you can access it.",
            "يعمل الموقع عبر اتصال مشفّر (HTTPS)، ولا يطّلع على معلوماتك إلا من يحتاجها لخدمتك.",
          )}</p>

          <h2>{t("Your rights", "حقوقك")}</h2>
          <p>{t("Under the Personal Data Protection Law, you have the right to:", "بموجب نظام حماية البيانات الشخصية، يحق لك:")}</p>
          <ul>
            <li>{t("Know what information we hold about you and get a copy of it.", "معرفة المعلومات التي نحتفظ بها عنك والحصول على نسخة منها.")}</li>
            <li>{t("Ask us to correct or update it.", "طلب تصحيحها أو تحديثها.")}</li>
            <li>{t("Ask us to delete it when it's no longer needed.", "طلب حذفها عندما لا تعود هناك حاجة لها.")}</li>
            <li>{t("Withdraw your consent to marketing messages.", "سحب موافقتك على الرسائل التسويقية.")}</li>
          </ul>

          <h2>{t("Changes to this policy", "التعديلات على هذه السياسة")}</h2>
          <p>{t(
            "We may update this policy from time to time. The latest version is always on this page, with its date at the top.",
            "قد نحدّث هذه السياسة من وقت لآخر، وتكون النسخة الأحدث منشورة دائماً في هذه الصفحة مع تاريخ التحديث في أعلاها.",
          )}</p>

          <h2>{t("Contact us", "تواصل معنا")}</h2>
          <p>{t(<>For any question about your data or to use your rights:<br />WhatsApp / phone: {phone}<br />Email: {email}</>, <>لأي استفسار عن بياناتك أو لممارسة حقوقك:<br />واتساب / جوال: {phone}<br />البريد الإلكتروني: {email}</>)}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
