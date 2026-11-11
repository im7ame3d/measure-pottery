import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { SUPABASE_KEY, SUPABASE_URL } from "@/lib/supabase-config";

/**
 * Called by the admin dashboard after it saves a product or project, so the public site shows the
 * change straight away instead of within a minute. Only a signed-in admin's session is accepted.
 */
export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/is_admin`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: "{}",
      cache: "no-store",
    });
    if (!res.ok || (await res.json()) !== true) return NextResponse.json({ ok: false }, { status: 403 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  revalidateTag("catalog");
  return NextResponse.json({ ok: true });
}
