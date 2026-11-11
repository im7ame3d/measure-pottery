"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./supabase-config";

/** Supabase client for the admin dashboard (keeps the admin signed in on this browser). */
let client: SupabaseClient | null = null;
export const admin = () =>
  (client ??= createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: true, storageKey: "measure-admin", autoRefreshToken: true } }));

/** Tell the public site to reload products and projects now. */
export async function refreshSite() {
  const { data } = await admin().auth.getSession();
  const token = data.session?.access_token;
  if (!token) return;
  await fetch("/api/revalidate", { method: "POST", headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
}

/** Shrink large photos in the browser before upload (long side 2000px, JPEG), then store them in the "media" bucket. */
export async function uploadImage(file: File, folder: string): Promise<string> {
  let body: Blob = file;
  let ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  if (/^image\/(jpeg|png|webp)$/.test(file.type)) {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    if (scale < 1 || file.size > 1_500_000) {
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bmp.width * scale);
      canvas.height = Math.round(bmp.height * scale);
      canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
      const keepPng = file.type === "image/png";
      body = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), keepPng ? "image/png" : "image/jpeg", 0.86));
      ext = keepPng ? "png" : "jpg";
    }
  }
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await admin().storage.from("media").upload(path, body, { contentType: body.type || file.type, upsert: false });
  if (error) throw error;
  return admin().storage.from("media").getPublicUrl(path).data.publicUrl;
}

/** "Wave Whisper Cup" → "wave-whisper-cup" */
export const slugify = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

export const ORDER_STATUS: Record<string, string> = {
  pending_payment: "بانتظار الدفع",
  paid: "مدفوع",
  preparing: "قيد التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
};
export const ENQUIRY_STATUS: Record<string, string> = { new: "جديد", contacted: "تم التواصل", closed: "مغلق" };
export const DELIVERY_AR: Record<string, string> = { standard: "توصيل عادي", express: "توصيل سريع", pickup: "استلام من المعمل" };
export const PAYMENT_AR: Record<string, string> = { card: "مدى / بطاقة", apple: "Apple Pay" };

export const dateAr = (iso: string) =>
  new Date(iso).toLocaleString("ar-SA", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", calendar: "gregory", numberingSystem: "arab" });
export const riyal = (n: number | string) => `${Number(n).toLocaleString("ar-SA", { useGrouping: false, maximumFractionDigits: 2 })} ⃁`;
