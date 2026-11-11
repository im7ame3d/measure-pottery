"use client";

import { useEffect, useState } from "react";
import { tr } from "@/lib/i18n";
import { CONTACT } from "@/lib/shipping";
import { useLang } from "./Lang";

/**
 * Floating WhatsApp chat button, fixed in the bottom corner on every page.
 * On a page with the full-screen video hero it waits until the hero is scrolled
 * past, so it never sits on top of the hero's buttons.
 */
export default function FloatingWhatsApp() {
  const t = tr(useLang());
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.querySelector(".vhero");
    const update = () => setShow(!hero || hero.getBoundingClientRect().bottom < window.innerHeight * 0.35);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return (
    <a
      className={`wa-float${show ? " on" : ""}`}
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={t("Chat with us on WhatsApp", "تواصل معنا عبر واتساب")}
      tabIndex={show ? undefined : -1}
    >
      {/* WhatsApp glyph */}
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path fill="currentColor" d="M16.04 3C9.4 3 4 8.36 4 14.97c0 2.11.56 4.17 1.62 5.99L4 29l8.27-1.58a12.1 12.1 0 0 0 3.77.6C22.68 28.02 28 22.66 28 16.05 28 9.44 22.68 3 16.04 3zm0 22.9c-1.24 0-2.45-.2-3.6-.6l-.26-.09-4.9.94.96-4.7-.17-.28a9.74 9.74 0 0 1-1.48-5.2c0-5.4 4.4-9.8 9.45-9.8 5.4 0 9.8 4.4 9.8 9.8 0 5.6-4.4 10-9.8 10zm5.37-7.33c-.29-.15-1.73-.85-2-.95-.27-.1-.47-.15-.66.15-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.44a8.8 8.8 0 0 1-1.62-2.01c-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.44 1.05 2.82 1.2 3.02.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.73-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34z" />
      </svg>
    </a>
  );
}
