"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Field, ImageList, Toggle, UploadButton } from "@/components/admin/Fields";
import { admin, refreshSite, slugify } from "@/lib/admin";

type Product = {
  id?: string; slug: string; name_ar: string; name_en: string; description_ar: string; description_en: string;
  details_ar: string; details_en: string; price: number | string; capacity_ar: string; capacity_en: string;
  category: string; images: string[]; published: boolean; sold_out: boolean; sort: number;
};
const BLANK: Product = {
  slug: "", name_ar: "", name_en: "", description_ar: "", description_en: "", details_ar: "", details_en: "",
  price: "", capacity_ar: "", capacity_en: "", category: "Cups & mugs", images: [], published: true, sold_out: false, sort: 0,
};

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const router = useRouter();
  const [p, setP] = useState<Product | null>(isNew ? BLANK : null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const set = <K extends keyof Product>(k: K, v: Product[K]) => setP((x) => (x ? { ...x, [k]: v } : x));

  useEffect(() => {
    if (isNew) return;
    admin().from("products").select("*").eq("id", id).single().then(({ data }) =>
      setP(data ? { ...BLANK, ...data, capacity_ar: data.capacity_ar ?? "", capacity_en: data.capacity_en ?? "" } : null));
  }, [id, isNew]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!p) return;
    setSaving(true); setMsg(null);
    const row = {
      ...p,
      slug: p.slug || slugify(p.name_en),
      price: Number(p.price),
      capacity_ar: p.capacity_ar || null,
      capacity_en: p.capacity_en || null,
    };
    delete (row as Partial<Product>).id;
    const q = isNew ? admin().from("products").insert(row).select("id").single() : admin().from("products").update(row).eq("id", id).select("id").single();
    const { data, error } = await q;
    setSaving(false);
    if (error) { setMsg({ ok: false, text: error.message.includes("duplicate") ? "الرابط (slug) مستخدم لمنتج آخر." : "تعذّر الحفظ: " + error.message }); return; }
    await refreshSite();
    setMsg({ ok: true, text: "تم الحفظ وتحديث الموقع." });
    if (isNew && data) router.replace(`/admin/products/${data.id}`);
  }

  async function remove() {
    if (!confirm("حذف هذا المنتج نهائياً من المتجر؟")) return;
    const { error } = await admin().from("products").delete().eq("id", id);
    if (error) { alert("تعذّر الحذف: " + error.message); return; }
    await refreshSite();
    router.replace("/admin/products");
  }

  return (
    <AdminShell title={isNew ? "منتج جديد" : p?.name_ar || "تعديل المنتج"} actions={<Link className="adm-link" href="/admin/products">← كل المنتجات</Link>}>
      {!p ? <p className="muted">جارٍ التحميل…</p> : (
        <form className="adm-form" onSubmit={save}>
          <section className="adm-card">
            <h2>الاسم والسعر</h2>
            <div className="adm-grid2">
              <Field label="الاسم بالعربي" required value={p.name_ar} onChange={(v) => set("name_ar", v)} />
              <Field label="الاسم بالإنجليزي" en required value={p.name_en} onChange={(v) => set("name_en", v)} />
              <Field label="السعر (ريال)" type="number" required value={p.price} onChange={(v) => set("price", v)} />
              <Field label="الرابط (slug)" en value={p.slug} onChange={(v) => set("slug", slugify(v))} hint={`يظهر في عنوان الصفحة: /product/${p.slug || slugify(p.name_en) || "…"}`} />
            </div>
          </section>

          <section className="adm-card">
            <h2>الصور</h2>
            <p className="muted small">الصورة الأولى هي التي تظهر في المتجر. الأفضل صور بخلفية فاتحة ومقاس طولي.</p>
            <ImageList items={p.images} src={(s) => s} onChange={(v) => set("images", v)} />
            <UploadButton folder="products" multiple label="+ رفع صور" onUploaded={(urls) => set("images", [...p.images, ...urls])} />
          </section>

          <section className="adm-card">
            <h2>الوصف</h2>
            <div className="adm-grid2">
              <Field label="الوصف بالعربي" multiline value={p.description_ar} onChange={(v) => set("description_ar", v)} />
              <Field label="الوصف بالإنجليزي" multiline en value={p.description_en} onChange={(v) => set("description_en", v)} />
              <Field label="السعة بالعربي" value={p.capacity_ar} onChange={(v) => set("capacity_ar", v)} hint="مثلاً: ٢٥٠ مل (اتركها فارغة لإخفاء قسم السعة)" />
              <Field label="السعة بالإنجليزي" en value={p.capacity_en} onChange={(v) => set("capacity_en", v)} hint="e.g. 250 ml" />
            </div>
          </section>

          <section className="adm-card">
            <h2>الظهور</h2>
            <Toggle label="ظاهر في الموقع" checked={p.published} onChange={(v) => set("published", v)} hint="عند إيقافه يختفي المنتج من المتجر." />
            <Toggle label="نفدت الكمية" checked={p.sold_out} onChange={(v) => set("sold_out", v)} hint="يبقى ظاهراً لكن لا يمكن شراؤه." />
            <Field label="الترتيب" type="number" value={p.sort} onChange={(v) => set("sort", Number(v) || 0)} hint="الأصغر يظهر أولاً." />
          </section>

          <div className="adm-savebar">
            {msg && <span className={msg.ok ? "adm-ok" : "adm-err"}>{msg.text}</span>}
            {!isNew && <button type="button" className="adm-link danger" onClick={remove}>حذف المنتج</button>}
            {!isNew && p.published && <a className="adm-link" href={`/product/${p.slug}`} target="_blank" rel="noreferrer">عرض في الموقع ↗</a>}
            <button className="btn primary" disabled={saving}>{saving ? "جارٍ الحفظ…" : "حفظ"}</button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}
