/** Delivery options and fees, shared by checkout and the returns & shipping policy page. */
export const DELIVERY = [
  { id: "standard", title: "Standard delivery", sub: "2–4 business days", price: 25, ar: ["توصيل عادي", "٢–٤ أيام عمل"] },
  { id: "express", title: "Express delivery", sub: "Next business day · Riyadh only", price: 45, ar: ["توصيل سريع", "يوم العمل التالي · داخل الرياض فقط"] },
  { id: "pickup", title: "Studio pickup", sub: "Ready in 1 business day", price: 0, ar: ["الاستلام من المعمل", "جاهز خلال يوم عمل واحد"] },
];

/** Standard delivery is free on orders at or above this subtotal (SAR). */
export const FREE_SHIPPING_OVER = 500;

/** Contact details shown in the footer, the contact page and the policy page. */
export const CONTACT = { phone: "+966 55 435 2666", whatsapp: "https://wa.me/966554352666", email: "Noraalsheikh90@gmail.com" };
