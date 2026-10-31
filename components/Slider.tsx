"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "./Lang";

/**
 * A full-screen panel of slides stacked vertically. While the panel fills the screen,
 * one swipe up (or one wheel/trackpad flick) moves exactly one slide; a swipe down goes
 * back. Before the first slide and after the last one, swipes scroll the page normally.
 * A column of dots tracks the current slide; tapping one jumps to it.
 * Each slide gets the class "in" when it is shown, which triggers the hero's blur-in reveal.
 */
export default function Slider({ children, label }: { children: React.ReactNode; label: string }) {
  const lang = useLang();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = useRef(0);
  const busy = useRef(false);
  const count = Children.count(children);

  const go = useCallback((i: number) => {
    const el = track.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (!el || !slide) return;
    current.current = i;
    setActive(i);
    slide.classList.add("in");
    busy.current = true;
    el.scrollTo({ top: slide.offsetTop, behavior: "smooth" });
    window.setTimeout(() => { busy.current = false; }, 750);
  }, []);

  useEffect(() => {
    const panel = root.current, el = track.current;
    if (!panel || !el) return;
    panel.classList.add("ready");
    const first = el.children[0] as HTMLElement | undefined;

    // reveal the first slide when the panel scrolls into view
    const io = new IntersectionObserver(([e]) => { if (e.intersectionRatio >= 0.5) first?.classList.add("in"); }, { threshold: [0.5] });
    io.observe(panel);

    const lock = (ms: number) => { busy.current = true; window.setTimeout(() => { busy.current = false; }, ms); };
    /** What a swipe in this direction should do: "align" the panel to fill the screen, "move" one slide, or nothing (page scrolls). */
    const action = (dir: 1 | -1): "align" | "move" | null => {
      const top = panel.getBoundingClientRect().top;
      if (Math.abs(top) > window.innerHeight * 0.35) return null;           // panel not near the screen: normal page scroll
      if ((dir === 1 && top > 4) || (dir === -1 && top < -4)) return "align"; // arriving: settle the panel, don't skip a slide
      const next = current.current + dir;
      return next >= 0 && next < count ? "move" : null;                    // beyond first/last slide: page scrolls on
    };
    const run = (dir: 1 | -1, a: "align" | "move") => {
      if (busy.current) return;
      if (a === "align") { window.scrollBy({ top: panel.getBoundingClientRect().top, behavior: "smooth" }); lock(700); }
      else go(current.current + dir);
    };

    // touch: decide on the first move whether this swipe changes slides or scrolls the page
    let startY = 0, decided = false, plan: "align" | "move" | null = null;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; decided = false; plan = null; };
    const onMove = (e: TouchEvent) => {
      const dy = startY - e.touches[0].clientY;            // > 0 = finger moving up = next slide
      if (!decided && Math.abs(dy) > 6) { decided = true; plan = action(dy > 0 ? 1 : -1); }
      if (plan) e.preventDefault();
    };
    const onEnd = (e: TouchEvent) => {
      if (!plan) return;
      const dy = startY - (e.changedTouches[0]?.clientY ?? startY);
      if (Math.abs(dy) > 40) run(dy > 0 ? 1 : -1, plan);
      plan = null;
    };

    // wheel / trackpad: one gesture = one slide
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 4) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const a = action(dir);
      if (!a) return;
      e.preventDefault();
      run(dir, a);
    };

    panel.addEventListener("touchstart", onStart, { passive: true });
    panel.addEventListener("touchmove", onMove, { passive: false });
    panel.addEventListener("touchend", onEnd);
    panel.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      io.disconnect();
      panel.removeEventListener("touchstart", onStart);
      panel.removeEventListener("touchmove", onMove);
      panel.removeEventListener("touchend", onEnd);
      panel.removeEventListener("wheel", onWheel);
    };
  }, [count, go]);

  return (
    <section className="slider" ref={root} aria-roledescription="carousel" aria-label={label}>
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
