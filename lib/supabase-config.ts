/**
 * Supabase project for the site's data (products, projects, orders, enquiries) and the admin login.
 * The URL and publishable key are public by design: the database's row-level security decides what
 * anyone can read or write. Override with NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_KEY.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://komkaftyinfcpwctvypc.supabase.co";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || "sb_publishable_cwA6z4Kf-IHOx19-uXWDCA_8cWCWgJS";

/** Call a public database function (e.g. place_order) without loading the Supabase client library. */
export async function rpc<T>(fn: string, args: Record<string, unknown>, init?: RequestInit): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    ...init,
  });
  if (!res.ok) throw new Error(`${fn} failed (${res.status})`);
  return res.json() as Promise<T>;
}
