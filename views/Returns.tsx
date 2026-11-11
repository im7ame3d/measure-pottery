import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { href, tr, type Lang } from "@/lib/i18n";
import { sar } from "@/lib/products";
import { CONTACT, DELIVERY, FREE_SHIPPING_OVER } from "@/lib/shipping";

/** Returns, exchanges and shipping policy: what a payment provider asks a store to publish. */
export default function Returns({ lang }: { lang: Lang }) {
  const t = tr(lang);
  const ar = lang === "ar";
  const phone = <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" dir="ltr">{CONTACT.phone}</a>;
  const email = <a href={`mailto:${CONTACT.email}`} dir="ltr">{CONTACT.email}</a>;
  return (
    <>
      <Header />
      <main>
        <section className="wrap policy">
          <div className="crumb"><Link href={href(lang, "/")}>{t("Home", "الرئيسية")}</Link> / {t("Returns & exchanges", "الاستبدال والاسترجاع")}</div>
          <h1>{t("Returns, exchanges & shipping", "سياسة الاستبدال والاسترجاع والشحن")}</h1>
          <p className="lead">{t(
            "Every piece is made by hand in our studio in Dhahran. If something isn't right, we'll make it right. Here is how.",
            "كل قطعة مصنوعة يدوياً في معملنا بالظهران، وإذا ما كانت القطعة مثل ما تتوقع، نحلّها معك. هذي التفاصيل:",
          )}</p>

          <h2>{t("Returns & exchanges", "الإرجاع والاستبدال")}</h2>
          <ul>
            <li>{t("You can return or exchange a piece within 7 days of receiving it.", "يحق لك إرجاع القطعة أو استبدالها خلال ٧ أيام من تاريخ استلامها.")}</li>
            <li>{t("The piece must be unused, undamaged and in its original packaging.", "بشرط أن تكون القطعة غير مستخدمة وبحالتها الأصلية وفي تغليفها الأصلي.")}</li>
            <li>{t("Exchanges are for a piece of the same value, or you pay the difference, subject to availability.", "الاستبدال يكون بقطعة بنفس القيمة أو مع دفع فرق السعر، حسب توفر القطع.")}</li>
          </ul>

          <h2>{t("Pieces that can't be returned", "قطع لا يمكن إرجاعها")}</h2>
          <ul>
            <li>{t("Custom orders made to your request: your logo, colours, glaze or sizes, including business orders.", "الطلبات المخصّصة المصنوعة حسب طلبك: بشعارك أو ألوانك أو طلاء أو مقاسات خاصة، ومنها طلبات المقاهي والأعمال.")}</li>
            <li>{t("Gift wrapping.", "خدمة تغليف الهدايا.")}</li>
          </ul>
          <p>{t(
            "Small differences in colour, glaze and shape are part of handmade ceramics and aren't a defect.",
            "الاختلافات البسيطة في اللون والطلاء والشكل جزء من طبيعة الخزف المصنوع يدوياً، ولا تُعدّ عيباً في القطعة.",
          )}</p>

          <h2>{t("Damaged or broken on arrival", "القطع التالفة أو المكسورة عند الوصول")}</h2>
          <p>{t(
            "Contact us within 48 hours of delivery with photos of the piece and the packaging. We'll replace it or refund it in full, at no cost to you, custom orders included.",
            "تواصل معنا خلال ٤٨ ساعة من الاستلام مع صور للقطعة والتغليف، ونستبدلها أو نعيد لك المبلغ كاملاً بدون أي تكلفة عليك، حتى لو كان الطلب مخصّصاً.",
          )}</p>

          <h2>{t("How to return a piece", "طريقة الإرجاع")}</h2>
          <ol>
            <li>{t(<>Message us on WhatsApp {phone} or email {email} with your order number.</>, <>راسلنا على واتساب {phone} أو على البريد {email} مع رقم الطلب.</>)}</li>
            <li>{t("We'll confirm the return and send you shipping instructions.", "نأكد لك الطلب ونرسل لك تعليمات شحن القطعة.")}</li>
            <li>{t("Once the piece reaches us and we've checked it, we'll process your refund or exchange.", "بعد وصول القطعة لنا وفحصها، ننفّذ الاسترداد أو الاستبدال.")}</li>
          </ol>

          <h2>{t("Refunds", "استرداد المبلغ")}</h2>
          <ul>
            <li>{t("Refunds go back to the original payment method within 7–14 business days of us receiving the piece.", "يُعاد المبلغ بنفس طريقة الدفع خلال ٧ إلى ١٤ يوم عمل من استلامنا للقطعة.")}</li>
            <li>{t("Orders paid with Tamara are refunded through Tamara.", "الطلبات المدفوعة عبر تمارا يُعاد مبلغها عن طريق تمارا.")}</li>
            <li>{t("For returns that aren't due to a defect, return shipping is paid by the customer and the original delivery fee isn't refunded.", "في حال الإرجاع لغير عيب، يتحمّل العميل تكلفة شحن الإرجاع، ولا تُسترد رسوم التوصيل الأصلية.")}</li>
          </ul>

          <h2>{t("Prices & delivery", "الأسعار والتوصيل")}</h2>
          <p>{t("All prices are shown in Saudi riyals. Delivery options and fees:", "جميع الأسعار معروضة بالريال السعودي. خيارات التوصيل ورسومها:")}</p>
          <table className="policy-table">
            <tbody>
              {DELIVERY.map((d) => (
                <tr key={d.id}>
                  <th scope="row">{ar ? d.ar[0] : d.title}</th>
                  <td>{ar ? d.ar[1] : d.sub}</td>
                  <td>{d.price ? sar(d.price, lang) : t("Free", "مجاناً")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{t(<>Standard delivery is free on orders over {sar(FREE_SHIPPING_OVER)}.</>, <>التوصيل العادي مجاني للطلبات فوق {sar(FREE_SHIPPING_OVER, lang)}.</>)}</p>

          <h2>{t("Contact us", "تواصل معنا")}</h2>
          <p>{t(<>WhatsApp / phone: {phone}<br />Email: {email}</>, <>واتساب / جوال: {phone}<br />البريد الإلكتروني: {email}</>)}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
