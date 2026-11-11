"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Field, ImageList, Toggle, UploadButton } from "@/components/admin/Fields";
import { admin, refreshSite, slugify } from "@/lib/admin";

type Img = { src: string; alt_ar: string; alt_en: string };
type Project = {
  slug: string; name_ar: string; name_en: string; type_ar: string; type_en: string; city_ar: string; city_en: string;
  text_ar: string; text_en: string; logo_url: string | null; logo_height: number; images: Img[]; published: boolean; sort: number;
};
const BLANK: Project = {
  slug: "", name_ar: "", name_en: "", type_ar: "", type_en: "", city_ar: "", city_en: "", text_ar: "", text_en: "",
  logo_url: null, logo_height: 28, images: [], published: true, sort: 0,
};

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const router = useRouter();
  const [p, setP] = useState<Project | null>(isNew ? BLANK : null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const set = <K extends keyof Project>(k: K, v: Project[K]) => setP((x) => (x ? { ...x, [k]: v } : x));

  useEffect(() => {
    if (isNew) return;
    admin().from("projects").select("*").eq("id", id).single().then(({ data }) => setP(data ? { ...BLANK, ...data } : null));
  }, [id, isNew]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!p) return;
    setSaving(true); setMsg(null);
    const row = { ...p, slug: p.slug || slugify(p.name_en) } as Project & { id?: string };
    delete row.id;
    const q = isNew ? admin().from("projects").insert(row).select("id").single() : admin().from("projects").update(row).eq("id", id).select("id").single();
    const { data, error } = await q;
    setSaving(false);
    if (error) { setMsg({ ok: false, text: error.message.includes("duplicate") ? "الرابط (slug) مستخدم لمشروع آخر." : "تعذّر الحفظ: " + error.message }); return; }
    await refreshSite();
    setMsg({ ok: true, text: "تم الحفظ وتحديث الموقع." });
    if (isNew && data) router.replace(`/admin/projects/${data.id}`);
  }

  async function remove() {
    if (!confirm("حذف هذا المشروع نهائياً؟")) return;
    const { error } = await admin().from("projects").delete().eq("id", id);
    if (error) { alert("تعذّر الحذف: " + error.message); return; }
    await refreshSite();
    router.replace("/admin/projects");
  }

  return (
    <AdminShell title={isNew ? "مشروع جديد" : p?.name_ar || "تعديل المشروع"} actions={<Link className="adm-link" href="/admin/projects">← كل المشاريع</Link>}>
      {!p ? <p className="muted">جارٍ التحميل…</p> : (
        <form className="adm-form" onSubmit={save}>
          <section className="adm-card">
            <h2>العميل</h2>
            <div className="adm-grid2">
              <Field label="اسم العميل بالعربي" required value={p.name_ar} onChange={(v) => set("name_ar", v)} />
              <Field label="اسم العميل بالإنجليزي" en required value={p.name_en} onChange={(v) => set("name_en", v)} />
              <Field label="النوع بالعربي" value={p.type_ar} onChange={(v) => set("type_ar", v)} hint="مثلاً: مقهى، مخبز، مطعم" />
              <Field label="النوع بالإنجليزي" en value={p.type_en} onChange={(v) => set("type_en", v)} hint="e.g. Café, Bakery" />
              <Field label="المدينة بالعربي" value={p.city_ar} onChange={(v) => set("city_ar", v)} />
              <Field label="المدينة بالإنجليزي" en value={p.city_en} onChange={(v) => set("city_en", v)} />
            </div>
          </section>

          <section className="adm-card">
            <h2>الشعار</h2>
            <div className="adm-row">
              {p.logo_url ? <img src={p.logo_url} alt="" style={{ height: p.logo_height, width: "auto" }} /> : <span className="muted small">لا يوجد شعار.</span>}
              <UploadButton folder="logos" accept="image/svg+xml,image/png,image/webp" label={p.logo_url ? "تغيير الشعار" : "+ رفع الشعار"} onUploaded={([u]) => set("logo_url", u)} />
              {p.logo_url && <button type="button" className="adm-link danger" onClick={() => set("logo_url", null)}>إزالة</button>}
            </div>
            <Field label="ارتفاع الشعار (بكسل)" type="number" value={p.logo_height} onChange={(v) => set("logo_height", Math.min(80, Math.max(12, Number(v) || 24)))} hint="الأفضل شعار أسود بخلفية شفافة (SVG أو PNG)." />
          </section>

          <section className="adm-card">
            <h2>الصور</h2>
            <p className="muted small">الصورة الأولى هي الغلاف. عند وجود أكثر من صورة تظهر كشرائح.</p>
            <ImageList
              items={p.images}
              src={(i) => i.src}
              onChange={(v) => set("images", v)}
              render={(i, setI) => (
                <div className="adm-alt">
                  <input className="input" placeholder="وصف الصورة بالعربي" value={i.alt_ar} onChange={(e) => setI({ ...i, alt_ar: e.target.value })} />
                  <input className="input" dir="ltr" placeholder="Image description (English)" value={i.alt_en} onChange={(e) => setI({ ...i, alt_en: e.target.value })} />
                </div>
              )}
            />
            <UploadButton folder="projects" multiple label="+ رفع صور" onUploaded={(urls) => set("images", [...p.images, ...urls.map((src) => ({ src, alt_ar: "", alt_en: "" }))])} />
          </section>

          <section className="adm-card">
            <h2>التعريف بالمشروع</h2>
            <div className="adm-grid2">
              <Field label="النص بالعربي" multiline value={p.text_ar} onChange={(v) => set("text_ar", v)} />
              <Field label="النص بالإنجليزي" multiline en value={p.text_en} onChange={(v) => set("text_en", v)} />
            </div>
          </section>

          <section className="adm-card">
            <h2>الظهور</h2>
            <Toggle label="ظاهر في الموقع" checked={p.published} onChange={(v) => set("published", v)} />
            <div className="adm-grid2">
              <Field label="الترتيب" type="number" value={p.sort} onChange={(v) => set("sort", Number(v) || 0)} hint="الأصغر يظهر أولاً." />
              <Field label="الرابط (slug)" en value={p.slug} onChange={(v) => set("slug", slugify(v))} hint="يُنشأ تلقائياً من الاسم الإنجليزي." />
            </div>
          </section>

          <div className="adm-savebar">
            {msg && <span className={msg.ok ? "adm-ok" : "adm-err"}>{msg.text}</span>}
            {!isNew && <button type="button" className="adm-link danger" onClick={remove}>حذف المشروع</button>}
            <button className="btn primary" disabled={saving}>{saving ? "جارٍ الحفظ…" : "حفظ"}</button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}
