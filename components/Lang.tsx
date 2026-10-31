"use client";

import { createContext, useContext } from "react";
import type { Lang } from "@/lib/i18n";

const LangCtx = createContext<Lang>("en");

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangCtx.Provider value={lang}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
