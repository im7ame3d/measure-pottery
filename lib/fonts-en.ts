import localFont from "next/font/local";
import { latinVars } from "./fonts-latin";

// English pages only need Arabic for the "العربية" switch, so it isn't preloaded.
const thmanyahLink = localFont({ src: "../app/fonts/thmanyah-sans-Regular.woff2", weight: "400", variable: "--font-arabic", display: "swap", preload: false });

export const enFontVars = `${latinVars} ${thmanyahLink.variable}`;
