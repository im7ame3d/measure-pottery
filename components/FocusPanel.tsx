"use client";

import { useEffect, useRef } from "react";

/**
 * A full-screen photo panel. Its text blurs in the first time it comes into view, and while the panel
 * sits squarely on screen ("optimal position") it gets the class "focus", which animates its call to action.
 */
export default function FocusPanel({ children, label }: { children: React.ReactNode; label: string }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.classList.add("ready");
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio >= 0.5) el.classList.add("in");
      el.classList.toggle("focus", e.intersectionRatio >= 0.8);
    }, { threshold: [0, 0.5, 0.8, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <section className="panel" ref={root} aria-label={label}>{children}</section>;
}
