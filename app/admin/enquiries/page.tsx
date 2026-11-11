"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { admin, dateAr, ENQUIRY_STATUS } from "@/lib/admin";

type Enquiry = { id: number; created_at: string; business: string; brief: string; phone: string; page: string | null; status: string; notes: string | null };

const wa = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "").replace(/^0/, "966")}`;

export default function Enquiries() {
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [filter, setFilter] = useState("open");

  const load = () => admin().from("enquiries").select("*").order("created_at", { ascending: false }).then(({ data }) => setRows((data as Enquiry[]) ?? []));
  useEffect(() => { load(); }, []);

  async function update(id: number, patch: Partial<Enquiry>) {
    setRows((rs) => rs?.map((r) => (r.id === id ? { ...r, ...patch } : r)) ?? null);
    const { error } = await admin().from("enquiries").update(patch).eq("id", id);
    if (error) { alert("تعذّر الحفظ: " + error.message); load(); }
  }
  async function remove(id: number) {
    if (!confirm("حذف هذا الطلب نهائياً؟")) return;
    const { error } = await admin().from("enquiries").delete().eq("id", id);
    if (error) alert("تعذّر الحذف: " + error.message); else setRows((rs) => rs?.filter((r) => r.id !== id) ?? null);
  }

  const shown = (rows ?? []).filter((r) => filter === "all" || (filter === "open" ? r.status !== "closed" : r.status === filter));

  return (
    <AdminShell title="طلبات الأعمال" actions={
      <select className="input adm-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="open">المفتوحة</option>
        <option value="all">الكل</option>
        {Object.entries(ENQUIRY_STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
    }>
      {rows === null ? <p className="muted">جارٍ التحميل…</p> : shown.length === 0 ? <div className="adm-card"><p className="muted">لا توجد طلبات هنا.</p></div> : (
        <div className="adm-stack">
          {shown.map((r) => (
            <article key={r.id} id={`e${r.id}`} className="adm-card">
              <div className="adm-card-head">
                <h2>{r.business}</h2>
                <span className={`adm-badge s-${r.status}`}>{ENQUIRY_STATUS[r.status]}</span>
              </div>
              <p className="adm-brief">{r.brief}</p>
              <p className="muted small">{dateAr(r.created_at)}{r.page && <> · من صفحة <span dir="ltr">{r.page}</span></>}</p>
              <div className="adm-row">
                <a className="btn primary" href={wa(r.phone)} target="_blank" rel="noreferrer">واتساب <span dir="ltr">{r.phone}</span></a>
                <select className="input adm-select" value={r.status} onChange={(e) => update(r.id, { status: e.target.value })}>
                  {Object.entries(ENQUIRY_STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <button className="adm-link danger" onClick={() => remove(r.id)}>حذف</button>
              </div>
              <label className="adm-field"><span>ملاحظات داخلية</span>
                <textarea className="input" defaultValue={r.notes ?? ""} onBlur={(e) => e.target.value !== (r.notes ?? "") && update(r.id, { notes: e.target.value })} placeholder="مثلاً: أرسلنا عيّنات، السعر المتفق عليه…" />
              </label>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
