import { ui, defaultLocale, type Locale, type UiKey } from "./ui";

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (lang === "en" || lang === "de" || lang === "fr") return lang;
  return defaultLocale;
}

export function useTranslations(lang: Locale) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLocale][key];
  };
}

export function localizedPath(lang: Locale, path: string): string {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return clean ? `/${lang}/${clean}/` : `/${lang}/`;
}

/**
 * Several content collections (products, certificates, facility photos)
 * are currently English-only, with translations added over time. Rather
 * than a page going blank on /de/ or /fr/ until a translation exists, this
 * groups entries by their shared `group` id and prefers a same-language
 * entry when one exists, falling back to English otherwise. Once someone
 * adds e.g. `hdpe-pipes-de.md`, the German page picks it up automatically
 * -- no code change needed at any call site.
 */
export function withLangFallback<T extends { data: { group: string; lang: string } }>(
  entries: T[],
  lang: Locale
): T[] {
  const byGroup = new Map<string, T>();
  for (const entry of entries) {
    const existing = byGroup.get(entry.data.group);
    if (!existing || entry.data.lang === lang) {
      if (!existing || existing.data.lang !== lang) {
        byGroup.set(entry.data.group, entry);
      }
    }
  }
  return [...byGroup.values()];
}
