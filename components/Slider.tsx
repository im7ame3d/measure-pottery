"use client";

import { Children, useEffect, useRef, useState } from "react";
import { useLang } from "./Lang";

/**
 * Full-viewport slides stacked vertically: swipe up to move to the next one
 * (the page eases each slide into place with proximity scroll-snap).
 * A sticky column of dots tracks the current slide; tapping one jumps to it.
 * Each slide gets the class "in" the first time it is mostly on screen,
 * which triggers the same blur-in reveal as the hero text.
 */
export default function Slider({ children, label }: { children: React.ReactNode; label: string }) {
  const lang = useLang();
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.parentElement?.classList.add("ready");
    document.documentElement.classList.add("snap-y");
    const slides = Array.from(el.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.intersectionRatio >= 0.5) {
          e.target.classList.add("in");
          setActive(slides.indexOf(e.target as HTMLElement));
        }
      }),
      { threshold: [0.5] },
    );
    slides.forEach((s) => io.observe(s));
    return () => { io.disconnect(); document.documentElement.classList.remove("snap-y"); };
  }, []);

  const go = (i: number) => (track.current?.children[i] as HTMLElement | undefined)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="slider" aria-roledescription="carousel" aria-label={label}>
      <div className="slider-dots" role="tablist">
        <div>
          {Array.from({ length: count }, (_, i) => (
            <button key={i} type="button" role="tab" aria-selected={i === active} className={i === active ? "on" : ""}
              aria-label={lang === "ar" ? `الشريحة ${i + 1}` : `Slide ${i + 1}`} onClick={() => go(i)} />
          ))}
        </div>
      </div>
      <div className="slider-track" ref={track}>{children}</div>
    </section>
  );
}
