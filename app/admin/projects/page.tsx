"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { admin, refreshSite } from "@/lib/admin";

type Row = { id: string; slug: string; name_ar: string; city_ar: string; type_ar: string; images: { src: string }[]; logo_url: string | null; published: boolean };

export default function Projects() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const load = () => admin().from("projects").select("id,slug,name_ar,city_ar,type_ar,images,logo_url,published").order("sort").order("created_at").then(({ data }) => setRows((data as Row[]) ?? []));
  useEffect(() => { load(); }, []);

  async function toggle(r: Row) {
    setRows((rs) => rs?.map((x) => (x.id === r.id ? { ...x, published: !r.published } : x)) ?? null);
    const { error } = await admin().from("projects").update({ published: !r.published }).eq("id", r.id);
    if (error) { alert("تعذّر الحفظ: " + error.message); load(); } else refreshSite();
  }

  return (
    <AdminShell title="أعمالنا" actions={<Link className="btn primary" href="/admin/projects/new">+ مشروع جديد</Link>}>
      {rows === null ? <p className="muted">جارٍ التحميل…</p> : rows.length === 0 ? <div className="adm-card"><p className="muted">لا توجد مشاريع بعد.</p></div> : (
        <div className="adm-card adm-flush">
          <table className="adm-table adm-products">
            <thead><tr><th /><th>المشروع</th><th>النوع والمدينة</th><th>ظاهر في الموقع</th><th /></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td><div className="adm-mini">{r.images[0] && <img src={r.images[0].src} alt="" />}</div></td>
                  <td><Link href={`/admin/projects/${r.id}`} className="adm-proj">{r.logo_url && <img src={r.logo_url} alt="" />}<b>{r.name_ar}</b></Link></td>
                  <td className="muted">{r.type_ar} · {r.city_ar}</td>
                  <td><input type="checkbox" checked={r.published} onChange={() => toggle(r)} aria-label="ظاهر في الموقع" /></td>
                  <td><Link className="adm-link" href={`/admin/projects/${r.id}`}>تعديل</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
