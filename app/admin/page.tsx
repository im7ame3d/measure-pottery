"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { admin, dateAr, ENQUIRY_STATUS, ORDER_STATUS, riyal } from "@/lib/admin";

type Order = { id: number; created_at: string; status: string; total: number; customer: { first_name: string; last_name: string } };
type Enquiry = { id: number; created_at: string; business: string; status: string };

export default function Overview() {
  const [stats, setStats] = useState<{ newOrders: number; newEnquiries: number; products: number; projects: number } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    const sb = admin();
    const count = (q: PromiseLike<{ count: number | null }>) => Promise.resolve(q).then((r) => r.count ?? 0);
    Promise.all([
      count(sb.from("orders").select("id", { count: "exact", head: true }).in("status", ["pending_payment", "paid", "preparing"])),
      count(sb.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new")),
      count(sb.from("products").select("id", { count: "exact", head: true })),
      count(sb.from("projects").select("id", { count: "exact", head: true })),
    ]).then(([newOrders, newEnquiries, products, projects]) => setStats({ newOrders, newEnquiries, products, projects })).catch(() => {});
    sb.from("orders").select("id,created_at,status,total,customer").order("created_at", { ascending: false }).limit(5).then(({ data }) => setOrders((data as Order[]) ?? []));
    sb.from("enquiries").select("id,created_at,business,status").order("created_at", { ascending: false }).limit(5).then(({ data }) => setEnquiries((data as Enquiry[]) ?? []));
  }, []);

  const tiles = [
    { label: "طلبات تحتاج متابعة", value: stats?.newOrders, href: "/admin/orders" },
    { label: "طلبات أعمال جديدة", value: stats?.newEnquiries, href: "/admin/enquiries" },
    { label: "المنتجات", value: stats?.products, href: "/admin/products" },
    { label: "مشاريع أعمالنا", value: stats?.projects, href: "/admin/projects" },
  ];

  return (
    <AdminShell title="نظرة عامة">
      <div className="adm-tiles">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className="adm-tile">
            <span className="adm-tile-v">{t.value === undefined ? "…" : t.value.toLocaleString("ar-SA")}</span>
            <span className="muted">{t.label}</span>
          </Link>
        ))}
      </div>
      <div className="adm-two">
        <section className="adm-card">
          <div className="adm-card-head"><h2>آخر الطلبات</h2><Link href="/admin/orders">الكل</Link></div>
          {orders.length === 0 ? <p className="muted">لا توجد طلبات بعد.</p> : (
            <ul className="adm-list">
              {orders.map((o) => (
                <li key={o.id}><Link href={`/admin/orders#o${o.id}`}><b>#{o.id}</b> {o.customer.first_name} {o.customer.last_name}<span className="muted">{dateAr(o.created_at)}</span><span>{riyal(o.total)}</span><span className={`adm-badge s-${o.status}`}>{ORDER_STATUS[o.status]}</span></Link></li>
              ))}
            </ul>
          )}
        </section>
        <section className="adm-card">
          <div className="adm-card-head"><h2>آخر طلبات الأعمال</h2><Link href="/admin/enquiries">الكل</Link></div>
          {enquiries.length === 0 ? <p className="muted">لا توجد طلبات بعد.</p> : (
            <ul className="adm-list">
              {enquiries.map((e) => (
                <li key={e.id}><Link href={`/admin/enquiries#e${e.id}`}><b>{e.business}</b><span className="muted">{dateAr(e.created_at)}</span><span className={`adm-badge s-${e.status}`}>{ENQUIRY_STATUS[e.status]}</span></Link></li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
