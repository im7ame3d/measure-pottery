import { NextResponse } from "next/server";

/**
 * Business enquiries → Google Sheet.
 * Forwards the form to a Google Apps Script web app (see scripts/google-sheet-enquiries.gs)
 * whose URL lives only in the SHEET_WEBHOOK_URL environment variable on the server.
 */

const LIMITS = { business: 120, brief: 1000, phone: 30, page: 200 } as const;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
/** Like clean, but keeps the line breaks people type into the brief. */
const cleanLines = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\r\n?/g, "\n").replace(/[^\S\n]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  // honeypot: real visitors never see or fill the "website" field
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const business = clean(body.business, LIMITS.business);
  const brief = cleanLines(body.brief, LIMITS.brief);
  const phone = clean(body.phone, LIMITS.phone);
  const digits = phone.replace(/\D/g, "");
  if (!business || !brief || digits.length < 7 || digits.length > 15) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) {
    console.error("enquiry: SHEET_WEBHOOK_URL is not set");
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  }

  const row = {
    business,
    brief,
    phone,
    page: clean(body.page, LIMITS.page),
    lang: body.lang === "en" ? "en" : "ar",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(10_000),
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !out?.ok) throw new Error(`sheet responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("enquiry: could not reach the sheet", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
