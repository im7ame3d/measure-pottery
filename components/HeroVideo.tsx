"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed background video for the hero.
 * Phones: the portrait video fills the screen.
 * Wider screens: the same video plays blurred across the whole hero, with the sharp
 * portrait video framed on one side (the source is portrait, so stretching it
 * edge to edge would crop and soften it).
 */
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const bg = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLVideoElement>(null);
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 641px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    bg.current?.play().catch(() => {});
    frame.current?.play().catch(() => {});
  }, [wide]);
  const still = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div className="hero-video" aria-hidden="true">
      <video ref={bg} className="hero-bg" src={src} poster={poster} muted loop playsInline autoPlay={!still} preload="auto" />
      {wide && (
        <div className="hero-frame">
          <video ref={frame} src={src} poster={poster} muted loop playsInline autoPlay={!still} preload="auto" />
        </div>
      )}
    </div>
  );
}
