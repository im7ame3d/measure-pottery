"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/lib/admin";

/** A labelled text input or textarea; `en` fields are typed left-to-right. */
export function Field({ label, value, onChange, multiline, en, required, type = "text", hint }: {
  label: string; value: string | number; onChange: (v: string) => void; multiline?: boolean; en?: boolean; required?: boolean; type?: string; hint?: string;
}) {
  return (
    <label className="adm-field">
      <span>{label}{required && " *"}</span>
      {multiline
        ? <textarea className="input" dir={en ? "ltr" : undefined} required={required} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input className="input" dir={en ? "ltr" : undefined} required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} />}
      {hint && <small className="muted">{hint}</small>}
    </label>
  );
}

export function Toggle({ label, checked, onChange, hint }: { label: string; checked: boolean; onChange: (v: boolean) => void; hint?: string }) {
  return (
    <label className="adm-toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span><b>{label}</b>{hint && <small className="muted">{hint}</small>}</span>
    </label>
  );
}

/** Upload button: sends the picked files to storage and hands back their public URLs. */
export function UploadButton({ folder, multiple, accept = "image/jpeg,image/png,image/webp", label, onUploaded }: {
  folder: string; multiple?: boolean; accept?: string; label: string; onUploaded: (urls: string[]) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  async function pick(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    try {
      const urls: string[] = [];
      for (const f of Array.from(files)) urls.push(await uploadImage(f, folder));
      onUploaded(urls);
    } catch (e) {
      alert("تعذّر رفع الصورة: " + (e as Error).message);
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }
  return (
    <>
      <input ref={input} type="file" accept={accept} multiple={multiple} hidden onChange={(e) => pick(e.target.files)} />
      <button type="button" className="btn secondary" disabled={busy} onClick={() => input.current?.click()}>{busy ? "جارٍ الرفع…" : label}</button>
    </>
  );
}

/** Ordered list of photos with move and remove controls (the first is the cover). */
export function ImageList<T>({ items, src, onChange, render }: {
  items: T[]; src: (item: T) => string; onChange: (items: T[]) => void; render?: (item: T, set: (item: T) => void) => React.ReactNode;
}) {
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  if (!items.length) return <p className="muted small">لا توجد صور بعد.</p>;
  return (
    <ul className="adm-images">
      {items.map((it, i) => (
        <li key={src(it) + i}>
          <div className="adm-thumb"><img src={src(it)} alt="" />{i === 0 && <span className="adm-cover">الغلاف</span>}</div>
          {render?.(it, (v) => onChange(items.map((x, k) => (k === i ? v : x))))}
          <div className="adm-row">
            <button type="button" className="adm-link" onClick={() => move(i, -1)} disabled={i === 0} aria-label="تقديم">→</button>
            <button type="button" className="adm-link" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="تأخير">←</button>
            <button type="button" className="adm-link danger" onClick={() => onChange(items.filter((_, k) => k !== i))}>إزالة</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
