// Seeded from the `home` namespace of apps/web/messages/{fr,en}.json in the
// mr-wallet repo (docs/16-marketing-site-split.md, Phase 2). Keep both
// objects in the same shape — the i18n parity check fails the build
// otherwise (scripts/check-i18n-parity.ts).
export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'fr';

export const ui = {
  fr: {
    'nav.pricing': 'Tarifs',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.login': 'Se connecter',
    'hero.title': 'Mr Wallet',
    'hero.cta': 'Se connecter',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    'nav.pricing': 'Pricing',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.login': 'Log in',
    'hero.title': 'Mr Wallet',
    'hero.cta': 'Log in',
    'footer.rights': 'All rights reserved.',
  },
} as const;
