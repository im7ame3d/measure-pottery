export type Lang = "en" | "ar";

/** Returns a picker: t("English", "عربي") gives the string for the active language. */
export const tr = (lang: Lang) => <A, B>(en: A, ar: B): A | B => (lang === "ar" ? ar : en);

/** Arabic is the default language at the root; English lives under /en. */
export const href = (lang: Lang, path: string) => (lang === "en" ? (path === "/" ? "/en" : `/en${path}`) : path);

/** The same page in the other language. */
export const switchHref = (lang: Lang, pathname: string) =>
  lang === "en" ? pathname.replace(/^\/en(?=\/|$)/, "") || "/" : pathname === "/" ? "/en" : `/en${pathname}`;

/** Numbers in Arabic-Indic digits on the Arabic site. */
export const num = (n: number, lang: Lang) => (lang === "ar" ? n.toLocaleString("ar-SA", { useGrouping: false }) : n.toLocaleString("en-US"));
