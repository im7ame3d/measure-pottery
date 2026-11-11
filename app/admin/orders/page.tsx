"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { admin, dateAr, DELIVERY_AR, ORDER_STATUS, PAYMENT_AR, riyal } from "@/lib/admin";

type Order = {
  id: number; created_at: string; status: string; notes: string | null; delivery: string; payment: string; gift_wrap: boolean;
  subtotal: number; shipping: number; gift_wrap_fee: number; total: number;
  customer: { first_name: string; last_name: string; email: string; phone: string };
  address: { street: string; district: string; city: string; postal_code: string; national_address: string };
  items: { slug: string; name_ar: string; price: number; qty: number }[];
};

const wa = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "").replace(/^0/, "966")}`;

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [filter, setFilter] = useState("open");
  const [open, setOpen] = useState<number | null>(null);

  const load = () =>
    admin().from("orders").select("*").order("created_at", { ascending: false }).then(({ data }) => setOrders((data as Order[]) ?? []));
  useEffect(() => { load(); const h = location.hash.match(/^#o(\d+)/); if (h) setOpen(Number(h[1])); }, []);

  async function update(id: number, patch: Partial<Order>) {
    setOrders((os) => os?.map((o) => (o.id === id ? { ...o, ...patch } : o)) ?? null);
    const { error } = await admin().from("orders").update(patch).eq("id", id);
    if (error) { alert("تعذّر الحفظ: " + error.message); load(); }
  }

  const shown = (orders ?? []).filter((o) => filter === "all" || (filter === "open" ? !["delivered", "cancelled"].includes(o.status) : o.status === filter));

  return (
    <AdminShell title="الطلبات" actions={
      <select className="input adm-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="open">المفتوحة</option>
        <option value="all">الكل</option>
        {Object.entries(ORDER_STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
    }>
      {orders === null ? <p className="muted">جارٍ التحميل…</p> : shown.length === 0 ? <div className="adm-card"><p className="muted">لا توجد طلبات هنا.</p></div> : (
        <div className="adm-stack">
          {shown.map((o) => (
            <article key={o.id} id={`o${o.id}`} className="adm-card adm-order">
              <button className="adm-row-btn" onClick={() => setOpen(open === o.id ? null : o.id)} aria-expanded={open === o.id}>
                <b>#{o.id}</b>
                <span>{o.customer.first_name} {o.customer.last_name}</span>
                <span className="muted">{dateAr(o.created_at)}</span>
                <span>{riyal(o.total)}</span>
                <span className={`adm-badge s-${o.status}`}>{ORDER_STATUS[o.status]}</span>
              </button>
              {open === o.id && (
                <div className="adm-order-body">
                  <div className="adm-grid3">
                    <div><h3>العميل</h3><p>{o.customer.first_name} {o.customer.last_name}<br /><a href={wa(o.customer.phone)} target="_blank" rel="noreferrer" dir="ltr">{o.customer.phone}</a><br /><a href={`mailto:${o.customer.email}`} dir="ltr">{o.customer.email}</a></p></div>
                    <div><h3>العنوان</h3><p>{o.address.street}<br />{o.address.district}، {o.address.city}{o.address.postal_code && <><br />الرمز البريدي: {o.address.postal_code}</>}{o.address.national_address && <><br />العنوان الوطني: <span dir="ltr">{o.address.national_address}</span></>}</p></div>
                    <div><h3>التوصيل والدفع</h3><p>{DELIVERY_AR[o.delivery] ?? o.delivery}<br />{PAYMENT_AR[o.payment] ?? o.payment}{o.gift_wrap && <><br />مع تغليف هدية</>}</p></div>
                  </div>
                  <table className="adm-table">
                    <thead><tr><th>القطعة</th><th>الكمية</th><th>السعر</th></tr></thead>
                    <tbody>
                      {o.items.map((i) => <tr key={i.slug}><td>{i.name_ar}</td><td>{i.qty.toLocaleString("ar-SA")}</td><td>{riyal(i.price * i.qty)}</td></tr>)}
                      <tr className="muted"><td colSpan={2}>التوصيل</td><td>{riyal(o.shipping)}</td></tr>
                      {o.gift_wrap && <tr className="muted"><td colSpan={2}>تغليف الهدية</td><td>{riyal(o.gift_wrap_fee)}</td></tr>}
                      <tr><td colSpan={2}><b>الإجمالي</b></td><td><b>{riyal(o.total)}</b></td></tr>
                    </tbody>
                  </table>
                  <div className="adm-grid2">
                    <label className="adm-field"><span>حالة الطلب</span>
                      <select className="input" value={o.status} onChange={(e) => update(o.id, { status: e.target.value })}>
                        {Object.entries(ORDER_STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </label>
                    <label className="adm-field"><span>ملاحظات داخلية</span>
                      <textarea className="input" defaultValue={o.notes ?? ""} onBlur={(e) => e.target.value !== (o.notes ?? "") && update(o.id, { notes: e.target.value })} placeholder="مثلاً: رقم الشحنة، موعد التوصيل…" />
                    </label>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
