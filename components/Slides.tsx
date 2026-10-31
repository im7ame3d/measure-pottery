"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One photo at a time. Photos blur-fade into each other every few seconds;
 * the dots (or a swipe on phones) switch by hand; `dots={false}` for an auto-only version.
 * Still for reduced-motion visitors.
 */
export default function Slides({ images, label, dots = true }: { images: { src: string; alt: string }[]; label?: (i: number, n: number) => string; dots?: boolean }) {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0); // bumps on manual changes so the auto timer restarts
  const touchX = useRef<number | null>(null);
  const n = images.length;

  useEffect(() => {
    if (n < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 4500);
    return () => clearInterval(id);
  }, [n, tick]);

  const go = (i: number) => { setActive((i + n) % n); setTick((x) => x + 1); };

  return (
    <div
      className={dots ? "slides" : "slides auto"}
      onTouchStart={dots ? (e) => { touchX.current = e.touches[0].clientX; } : undefined}
      onTouchEnd={(e) => {
        if (!dots || touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
      }}
    >
      {images.map((im, i) => (
        <div key={im.src} className={`photo slide${i === active ? " on" : ""}`} aria-hidden={i !== active || undefined}>
          <img src={im.src} alt={im.alt} loading={i ? "lazy" : undefined} />
        </div>
      ))}
      {dots && n > 1 && (
        <div className="slides-dots" dir="ltr">
          {images.map((im, i) => <button key={im.src} type="button" className={i === active ? "on" : undefined} aria-label={label ? label(i + 1, n) : `${i + 1} / ${n}`} aria-current={i === active || undefined} onClick={() => go(i)} />)}
        </div>
      )}
    </div>
  );
}
