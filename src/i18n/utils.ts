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
