export type Lang = "en" | "ar";

/** Returns a picker: t("English", "عربي") gives the string for the active language. */
export const tr = (lang: Lang) => <A, B>(en: A, ar: B): A | B => (lang === "ar" ? ar : en);

/** Prefixes an internal path with /ar for the Arabic site. */
export const href = (lang: Lang, path: string) => (lang === "ar" ? (path === "/" ? "/ar" : `/ar${path}`) : path);

/** The same page in the other language. */
export const switchHref = (lang: Lang, pathname: string) =>
  lang === "ar" ? pathname.replace(/^\/ar(?=\/|$)/, "") || "/" : pathname === "/" ? "/ar" : `/ar${pathname}`;

/** Numbers in Arabic-Indic digits on the Arabic site. */
export const num = (n: number, lang: Lang) => (lang === "ar" ? n.toLocaleString("ar-SA", { useGrouping: false }) : n.toLocaleString("en-US"));
