import { ui, defaultLocale, type Locale } from './ui';

export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  if (maybeLocale in ui) return maybeLocale as Locale;
  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: keyof (typeof ui)[typeof defaultLocale]): string {
    return ui[locale]?.[key] ?? ui[defaultLocale][key];
  };
}

export function getLocalizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `/${locale}/${clean}`.replace(/\/$/, '') || `/${locale}`;
}

export const locales: Locale[] = ['en', 'fr'];
