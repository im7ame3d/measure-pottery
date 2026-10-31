import localFont from "next/font/local";
import { latinVars } from "./fonts-latin";

// Arabic uses the Thmanyah family, mirroring the English serif + sans pairing:
// Serif Display for headings, Serif Text for serif details (prices, product names), Sans for body.
const thmanyahSans = localFont({
  src: [
    { path: "../app/fonts/thmanyah-sans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/thmanyah-sans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/thmanyah-sans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
});
const thmanyahDisplay = localFont({ src: "../app/fonts/thmanyah-serif-display-Medium.woff2", weight: "500", variable: "--font-arabic-display", display: "swap" });
const thmanyahText = localFont({
  src: [
    { path: "../app/fonts/thmanyah-serif-text-Regular.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/thmanyah-serif-text-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-arabic-serif",
  display: "swap",
  preload: false,
});

export const arFontVars = `${latinVars} ${thmanyahSans.variable} ${thmanyahDisplay.variable} ${thmanyahText.variable}`;
