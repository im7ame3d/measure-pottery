import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { href, tr, type Lang } from "@/lib/i18n";
import { CONTACT } from "@/lib/shipping";

/** Terms and conditions for using the site and buying from it. */
export default function Terms({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const h = (p: string) => href(lang, p);
  const phone = <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" dir="ltr">{CONTACT.phone}</a>;
  const email = <a href={`mailto:${CONTACT.email}`} dir="ltr">{CONTACT.email}</a>;
  return (
    <>
      <Header />
      <main>
        <section className="wrap policy">
          <div className="crumb"><Link href={h("/")}>{t("Home", "الرئيسية")}</Link> / {t("Terms & conditions", "الشروط والأحكام")}</div>
          <h1>{t("Terms & conditions", "الشروط والأحكام")}</h1>
          <p className="policy-date">{t("Last updated: 11 November 2026", "آخر تحديث: ١١ نوفمبر ٢٠٢٦")}</p>
          <p className="lead">{t(
            "Welcome to Measure Ceramics, a ceramics production studio in Dhahran, Saudi Arabia. By using measure-ceramics.com or placing an order, you agree to these terms.",
            "مرحباً بك في Measure Ceramics، استوديو إنتاج خزف في الظهران بالمملكة العربية السعودية. باستخدامك لموقع measure-ceramics.com أو إتمامك لطلب، فإنك توافق على هذه الشروط والأحكام.",
          )}</p>

          <h2>{t("Our products", "منتجاتنا")}</h2>
          <ul>
            <li>{t("Every piece is handmade, so each one is unique.", "كل قطعة مصنوعة يدوياً، لذلك كل قطعة فريدة بذاتها.")}</li>
            <li>{t("Small differences in colour, glaze, size and shape from the photos are part of handmade ceramics and aren't a defect.", "الاختلافات البسيطة عن الصور في اللون والطلاء والمقاس والشكل جزء من طبيعة الخزف اليدوي، ولا تُعدّ عيباً.")}</li>
            <li>{t("We do our best to show colours accurately, but they can look slightly different from one screen to another.", "نحرص على عرض الألوان بدقة، لكنها قد تظهر مختلفة قليلاً من شاشة لأخرى.")}</li>
          </ul>

          <h2>{t("Prices", "الأسعار")}</h2>
          <ul>
            <li>{t("All prices are in Saudi riyals and are shown on each product.", "جميع الأسعار بالريال السعودي، وتظهر على كل منتج.")}</li>
            <li>{t("Delivery fees are shown at checkout before you pay.", "تظهر رسوم التوصيل في صفحة إتمام الطلب قبل الدفع.")}</li>
            <li>{t("We may change prices at any time; the price that applies is the one shown when you place your order.", "قد نغيّر الأسعار في أي وقت، والسعر المعتمد هو السعر الظاهر وقت إتمام طلبك.")}</li>
          </ul>

          <h2>{t("Orders", "الطلبات")}</h2>
          <ul>
            <li>{t("Your order is confirmed once payment is complete; we'll send you a confirmation.", "يُعدّ طلبك مؤكداً بعد إتمام الدفع، ونرسل لك تأكيداً بذلك.")}</li>
            <li>{t("If a piece turns out to be unavailable after you order, we'll tell you and refund the full amount.", "إذا تبيّن أن قطعة غير متوفرة بعد طلبك، نبلغك ونعيد لك المبلغ كاملاً.")}</li>
            <li>{t("Please make sure your contact details and address are correct, as they're used for delivery.", "يُرجى التأكد من صحة بيانات التواصل والعنوان، لأنها تُستخدم في التوصيل.")}</li>
          </ul>

          <h2>{t("Payment", "الدفع")}</h2>
          <p>{t(
            "We accept mada, Visa, Mastercard and Apple Pay through a licensed payment provider. We don't store your card details.",
            "نقبل الدفع عبر مدى وفيزا وماستركارد وApple Pay من خلال مزوّد دفع مرخّص، ولا نحتفظ ببيانات بطاقتك.",
          )}</p>

          <h2>{t("Delivery", "التوصيل")}</h2>
          <ul>
            <li>{t("We deliver across Saudi Arabia through our shipping partners, such as Aramex.", "نوصّل لجميع مناطق المملكة عبر شركائنا في الشحن مثل أرامكس.")}</li>
            <li>{t("Delivery times shown at checkout are estimates and may vary with the city and the shipping company.", "مدد التوصيل الظاهرة عند الدفع تقديرية، وقد تختلف حسب المدينة وشركة الشحن.")}</li>
            <li>{t("If a piece arrives damaged, contact us within 48 hours of delivery, as set out in the returns policy.", "إذا وصلت القطعة تالفة، تواصل معنا خلال ٤٨ ساعة من الاستلام كما توضّح سياسة الاسترجاع.")}</li>
          </ul>

          <h2>{t("Custom and business orders", "الطلبات المخصّصة وطلبات الأعمال")}</h2>
          <ul>
            <li>{t("For cafés, restaurants and businesses, quantities, prices, designs and production time are agreed in a written quote before we start.", "في طلبات المقاهي والمطاعم والأعمال، يُتفق على الكميات والأسعار والتصاميم ومدة التنفيذ في عرض سعر مكتوب قبل البدء.")}</li>
            <li>{t("You confirm that you have the right to use any logo or design you send us.", "تقرّ بأن لديك الحق في استخدام أي شعار أو تصميم ترسله لنا.")}</li>
            <li>{t("Custom pieces are made for you and can't be returned unless they're defective.", "القطع المخصّصة تُصنع لك خصيصاً، ولا يمكن إرجاعها إلا في حال وجود عيب فيها.")}</li>
          </ul>

          <h2>{t("Returns & exchanges", "الإرجاع والاستبدال")}</h2>
          <p>{t(<>Returns, exchanges and refunds follow our <Link href={h("/returns")}>returns &amp; exchanges policy</Link>.</>, <>يخضع الإرجاع والاستبدال والاسترداد لـ<Link href={h("/returns")}>سياسة الاستبدال والاسترجاع</Link>.</>)}</p>

          <h2>{t("Intellectual property", "الملكية الفكرية")}</h2>
          <p>{t(
            "The designs, photos, text and logo on this site belong to Measure Ceramics and may not be copied or used without our written permission.",
            "التصاميم والصور والنصوص والشعار في هذا الموقع مملوكة لـ Measure Ceramics، ولا يجوز نسخها أو استخدامها دون إذن كتابي منّا.",
          )}</p>

          <h2>{t("Privacy", "الخصوصية")}</h2>
          <p>{t(<>How we handle your information is explained in our <Link href={h("/privacy")}>privacy policy</Link>.</>, <>نوضّح طريقة تعاملنا مع معلوماتك في <Link href={h("/privacy")}>سياسة الخصوصية</Link>.</>)}</p>

          <h2>{t("Governing law", "النظام المعمول به")}</h2>
          <p>{t(
            "These terms are governed by the laws of the Kingdom of Saudi Arabia, and the competent courts in the Kingdom have jurisdiction over any dispute.",
            "تخضع هذه الشروط لأنظمة المملكة العربية السعودية، وتختص الجهات القضائية المختصة في المملكة بالنظر في أي نزاع.",
          )}</p>

          <h2>{t("Changes to these terms", "التعديلات على الشروط")}</h2>
          <p>{t(
            "We may update these terms from time to time. The version that applies is the one published on this page when you place your order.",
            "قد نحدّث هذه الشروط من وقت لآخر، والنسخة المعتمدة هي المنشورة في هذه الصفحة وقت إتمام طلبك.",
          )}</p>

          <h2>{t("Contact us", "تواصل معنا")}</h2>
          <p>{t(<>WhatsApp / phone: {phone}<br />Email: {email}</>, <>واتساب / جوال: {phone}<br />البريد الإلكتروني: {email}</>)}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
