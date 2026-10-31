"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  images: { src: string; alt: string }[];
  /** Accessible name for each dot, e.g. "Photo 2 of 3". */
  label?: (i: number, n: number) => string;
  /**
   * "swipe": swipe (or tap the dots) to slide between photos.
   * "auto": slides to the next photo on its own every few seconds, no dots.
   */
  mode?: "swipe" | "auto";
};

/** One photo at a time, sliding sideways between them. */
export default function Slides({ images, label, mode = "swipe" }: Props) {
  const n = images.length;
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // auto mode: advance every 4.5s (still for reduced-motion visitors)
  useEffect(() => {
    if (mode !== "auto" || n < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 4500);
    return () => clearInterval(id);
  }, [mode, n]);

  if (mode === "auto") {
    return (
      <div className="slides auto">
        {/* laid out left-to-right in both languages so slide i sits at -i × 100% */}
        <div className="slides-belt" dir="ltr" style={{ transform: `translateX(${-active * 100}%)` }}>
          {images.map((im, i) => (
            <div key={im.src} className="photo" aria-hidden={i !== active || undefined}><img src={im.src} alt={im.alt} loading={i ? "lazy" : undefined} /></div>
          ))}
        </div>
      </div>
    );
  }

  const go = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };
  return (
    <div className="slides">
      {/* the track is laid out left-to-right in both languages so scroll positions map straight to slide numbers */}
      <div className="slides-track" ref={track} dir="ltr" onScroll={(e) => setActive(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
        {images.map((im, i) => <div key={im.src} className="photo"><img src={im.src} alt={im.alt} loading={i ? "lazy" : undefined} /></div>)}
      </div>
      {n > 1 && (
        <div className="slides-dots" dir="ltr">
          {images.map((im, i) => <button key={im.src} type="button" className={i === active ? "on" : undefined} aria-label={label ? label(i + 1, n) : `${i + 1} / ${n}`} aria-current={i === active || undefined} onClick={() => go(i)} />)}
        </div>
      )}
    </div>
  );
}
