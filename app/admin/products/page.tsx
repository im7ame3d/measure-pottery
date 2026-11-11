"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { admin, refreshSite, riyal } from "@/lib/admin";

type Row = { id: string; slug: string; name_ar: string; price: number; images: string[]; published: boolean; sold_out: boolean; sort: number };

export default function Products() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const load = () => admin().from("products").select("id,slug,name_ar,price,images,published,sold_out,sort").order("sort").order("created_at").then(({ data }) => setRows((data as Row[]) ?? []));
  useEffect(() => { load(); }, []);

  async function toggle(r: Row, key: "published" | "sold_out") {
    setRows((rs) => rs?.map((x) => (x.id === r.id ? { ...x, [key]: !r[key] } : x)) ?? null);
    const { error } = await admin().from("products").update({ [key]: !r[key] }).eq("id", r.id);
    if (error) { alert("تعذّر الحفظ: " + error.message); load(); } else refreshSite();
  }

  return (
    <AdminShell title="المنتجات" actions={<Link className="btn primary" href="/admin/products/new">+ منتج جديد</Link>}>
      {rows === null ? <p className="muted">جارٍ التحميل…</p> : rows.length === 0 ? <div className="adm-card"><p className="muted">لا توجد منتجات بعد.</p></div> : (
        <div className="adm-card adm-flush">
          <table className="adm-table adm-products">
            <thead><tr><th /><th>المنتج</th><th>السعر</th><th>ظاهر في الموقع</th><th>نفدت الكمية</th><th /></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td><div className="adm-mini">{r.images[0] && <img src={r.images[0]} alt="" />}</div></td>
                  <td><Link href={`/admin/products/${r.id}`}><b>{r.name_ar}</b></Link><br /><small className="muted" dir="ltr">{r.slug}</small></td>
                  <td>{riyal(r.price)}</td>
                  <td><input type="checkbox" checked={r.published} onChange={() => toggle(r, "published")} aria-label="ظاهر في الموقع" /></td>
                  <td><input type="checkbox" checked={r.sold_out} onChange={() => toggle(r, "sold_out")} aria-label="نفدت الكمية" /></td>
                  <td><Link className="adm-link" href={`/admin/products/${r.id}`}>تعديل</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
