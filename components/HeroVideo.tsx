"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed background video for the mobile hero. The source is only attached
 * on small screens, so desktop visitors never download the video.
 */
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setOn(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const v = ref.current;
    if (!on || !v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().catch(() => {});
  }, [on]);
  return (
    <div className="hero-video" aria-hidden="true">
      {on && <video ref={ref} src={src} poster={poster} muted loop playsInline autoPlay preload="auto" />}
    </div>
  );
}
