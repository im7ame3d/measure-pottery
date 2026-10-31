import { Cormorant_Garamond, Inter, Noto_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cormorant" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });
const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600"], variable: "--font-arabic" });

// Arabic display face for headings (client-supplied KOMission Black).
const komission = localFont({ src: "../app/fonts/KOMission-Black.otf", weight: "900", variable: "--font-ko", display: "swap" });

export const fontVars = `${cormorant.variable} ${inter.variable} ${arabic.variable}`;
export const arabicHeadVar = komission.variable;
