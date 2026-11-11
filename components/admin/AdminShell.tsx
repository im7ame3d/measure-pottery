"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { admin } from "@/lib/admin";

const NAV = [
  { href: "/admin", label: "نظرة عامة" },
  { href: "/admin/orders", label: "الطلبات" },
  { href: "/admin/enquiries", label: "طلبات الأعمال" },
  { href: "/admin/products", label: "المنتجات" },
  { href: "/admin/projects", label: "أعمالنا" },
];

/** Signs the admin in, checks they're on the admin list, and frames every dashboard page. */
export default function AdminShell({ title, actions, children }: { title: string; actions?: React.ReactNode; children: React.ReactNode }) {
  const path = usePathname();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const sb = admin();
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!session) { setIsAdmin(undefined); return; }
    admin().rpc("is_admin").then(({ data }) => setIsAdmin(data === true));
  }, [session]);

  if (session === undefined || (session && isAdmin === undefined)) return <div className="adm-center"><p className="muted">جارٍ التحميل…</p></div>;
  if (!session) return <Login />;
  if (!isAdmin)
    return (
      <div className="adm-center">
        <div className="adm-card adm-narrow">
          <h1 className="adm-h1">لا تملك صلاحية الدخول</h1>
          <p className="muted">الحساب <b dir="ltr">{session.user.email}</b> غير مضاف كمسؤول، أو لم يتم تأكيد البريد بعد.</p>
          <button className="btn secondary" onClick={() => admin().auth.signOut()}>تسجيل الخروج</button>
        </div>
      </div>
    );

  return (
    <div className="adm">
      <aside className="adm-side">
        <Link href="/admin" className="adm-brand"><img src="/logo/logo.svg" alt="Measure Ceramics" /></Link>
        <nav>
          {NAV.map((n) => {
            const on = n.href === "/admin" ? path === "/admin" : path.startsWith(n.href);
            return <Link key={n.href} href={n.href} className={on ? "on" : undefined}>{n.label}</Link>;
          })}
        </nav>
        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noreferrer">عرض الموقع ↗</a>
          <span className="muted" dir="ltr">{session.user.email}</span>
          <button className="adm-link" onClick={() => admin().auth.signOut()}>تسجيل الخروج</button>
        </div>
      </aside>
      <main className="adm-main">
        <header className="adm-head"><h1 className="adm-h1">{title}</h1>{actions && <div className="adm-actions">{actions}</div>}</header>
        {children}
      </main>
    </div>
  );
}

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const sb = admin();
    if (mode === "in") {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) setMsg({ ok: false, text: error.message.includes("confirm") ? "لم يتم تأكيد البريد بعد. افتح رسالة التأكيد في بريدك." : "البريد أو كلمة المرور غير صحيحة." });
      else { location.reload(); return; } // reload so the page loads its data as the signed-in admin
    } else {
      const { error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/admin` } });
      setMsg(error ? { ok: false, text: error.message } : { ok: true, text: "أرسلنا رسالة تأكيد إلى بريدك. افتحها ثم سجّل الدخول هنا." });
    }
    setBusy(false);
  }

  return (
    <div className="adm-center">
      <form className="adm-card adm-narrow" onSubmit={submit}>
        <img src="/logo/logo.svg" alt="Measure Ceramics" className="adm-login-logo" />
        <h1 className="adm-h1">{mode === "in" ? "تسجيل الدخول" : "إنشاء حساب المسؤول"}</h1>
        <label className="adm-field"><span>البريد الإلكتروني</span><input className="input" type="email" dir="ltr" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
        <label className="adm-field"><span>كلمة المرور</span><input className="input" type="password" dir="ltr" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "in" ? "current-password" : "new-password"} /></label>
        {msg && <p className={msg.ok ? "adm-ok" : "adm-err"}>{msg.text}</p>}
        <button className="btn primary" disabled={busy}>{busy ? "…" : mode === "in" ? "دخول" : "إنشاء الحساب"}</button>
        <button type="button" className="adm-link" onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }}>
          {mode === "in" ? "أول مرة؟ أنشئ حسابك" : "عندي حساب، سجّل دخولي"}
        </button>
      </form>
    </div>
  );
}
