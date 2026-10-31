"use client";

import { Fragment, useEffect } from "react";

/** Splits text into word spans the proximity effect can blur individually (whole words, so Arabic stays joined). */
export function BlurWords({ text }: { text: string }) {
  return <>{text.split(/(\s+)/).map((w, i) => (/^\s+$/.test(w) || !w ? <Fragment key={i}>{w}</Fragment> : <span key={i} className="bw">{w}</span>))}</>;
}

/** Multi-line variant: lines joined by <br />. */
export function BlurLines({ lines }: { lines: string[] }) {
  return <>{lines.map((l, i) => <Fragment key={i}>{i > 0 && <br />}<BlurWords text={l} /></Fragment>)}</>;
}

/**
 * Words near the cursor or finger blur in proportion to how close they are,
 * then ease back into focus. Text is fully sharp at rest.
 */
export default function ProximityBlur({ root, radius = 120, max = 6 }: { root: string; radius?: number; max?: number }) {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(root);
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".bw"));
    if (!words.length) return;
    const cur = new Float32Array(words.length);
    let px = -1e5, py = -1e5, active = false, raf = 0;

    const tick = () => {
      let settling = false;
      for (let i = 0; i < words.length; i++) {
        const r = words[i].getBoundingClientRect();
        // distance from the pointer to the word's box (0 when over it)
        const dx = Math.max(r.left - px, 0, px - r.right);
        const dy = Math.max(r.top - py, 0, py - r.bottom);
        const k = active ? Math.max(0, 1 - Math.hypot(dx, dy) / radius) : 0;
        const target = max * k * k;
        cur[i] += (target - cur[i]) * 0.16;
        if (Math.abs(target - cur[i]) > 0.03) settling = true;
        const b = cur[i];
        words[i].style.filter = b > 0.05 ? `blur(${b.toFixed(2)}px)` : "";
        words[i].style.opacity = b > 0.05 ? String(1 - (b / max) * 0.3) : "";
      }
      raf = settling || active ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const at = (x: number, y: number) => { px = x; py = y; active = true; kick(); };
    const off = () => { active = false; kick(); };

    const onPointer = (e: PointerEvent) => at(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) at(t.clientX, t.clientY); };
    el.addEventListener("pointermove", onPointer);
    el.addEventListener("pointerdown", onPointer);
    el.addEventListener("pointerleave", off);
    el.addEventListener("pointercancel", off);
    el.addEventListener("touchstart", onTouch, { passive: true });
    el.addEventListener("touchmove", onTouch, { passive: true });
    el.addEventListener("touchend", off);
    el.addEventListener("touchcancel", off);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onPointer);
      el.removeEventListener("pointerdown", onPointer);
      el.removeEventListener("pointerleave", off);
      el.removeEventListener("pointercancel", off);
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("touchmove", onTouch);
      el.removeEventListener("touchend", off);
      el.removeEventListener("touchcancel", off);
    };
  }, [root, radius, max]);
  return null;
}
