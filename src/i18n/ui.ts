// Seeded from the `home` and `accountDeletion` namespaces of
// apps/web/messages/{fr,en}.json in the mr-wallet repo
// (docs/16-marketing-site-split.md, Phase 2). Keep both objects in the same
// shape — the i18n parity check fails the build otherwise
// (scripts/check-i18n-parity.ts). Array/object content (feature lists,
// pricing plans, testimonials...) lives in `./content.ts` instead, since the
// parity script only diffs top-level keys of this flat dictionary.
export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'fr';

export const ui = {
  fr: {
    login: 'Se connecter',
    register: "S'inscrire",
    mySpace: 'Mon espace',
    accessMySpace: 'Accéder à mon espace',

    'nav.features': 'Fonctionnalités',
    'nav.howItWorks': 'Comment ça marche',
    'nav.pricing': 'Tarifs',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',

    'seo.title': 'Mr Wallet — Gestion de budget et suivi des dépenses',
    'seo.description':
      'Gère comptes, budgets, dépenses, dettes, objectifs et récurrences dans une seule application simple. Multi-devises (FCFA, EUR, USD). Gratuit pour démarrer.',

    'hero.title': 'Mr Wallet',
    'hero.badge': 'Gestion financière personnelle',
    'hero.tagline': 'Pilote ton cash, tes budgets et tes projets.',
    'hero.description':
      'Mr Wallet rassemble tes comptes, tes dépenses, tes dettes, tes objectifs et tes récurrences dans une expérience simple et actionnable.',
    'hero.ctaPrimary': 'Créer mon espace',
    'hero.ctaSecondary': 'Voir les modules',
    'hero.trust.multiCurrencyTitle': 'Multi-devises',
    'hero.trust.multiCurrencyDescription': 'FCFA, EUR, USD',
    'hero.trust.ledgerTitle': 'Ledger',
    'hero.trust.ledgerDescription': 'Soldes fiables',
    'hero.trust.mobileTitle': 'Mobile',
    'hero.trust.mobileDescription': 'Usage quotidien',
    'hero.mock.dailyBudget': 'Reste à vivre',
    'hero.mock.perDay': '/ jour',
    'hero.mock.stable': 'stable',
    'hero.mock.totalBalance': 'Solde total',
    'hero.mock.savings': 'Épargne',
    'hero.mock.row1Label': 'Mobile money',
    'hero.mock.row1Sub': 'Frais inclus',
    'hero.mock.row2Label': 'Objectif épargne',
    'hero.mock.row2Sub': 'Alimenté ce mois',
    'hero.mock.row3Label': 'Courses marché',
    'hero.mock.row3Sub': 'Budget alimentaire',

    'features.title': 'Tout votre pilotage financier, en un seul endroit',
    'features.subtitle':
      'Une architecture modulaire où chaque domaine métier est isolé, avec ses entités, ses règles et son API.',

    'screenshots.title': 'Vois-le en action',
    'screenshots.subtitle': "Un aperçu rapide du dashboard, des budgets et des transactions sur ton téléphone.",
    'screenshots.alt': "Capture d'écran de l'application Mr Wallet",

    'designedFor.title': "Conçu pour l'Afrique de l'Ouest",
    'designedFor.description':
      "L'application part du terrain : argent liquide, mobile money, revenus variables, entraide familiale, dettes informelles et objectifs d'épargne très concrets.",
    'designedFor.cta': 'Explorer le dashboard',
    'designedFor.whyTitle': 'Pourquoi Mr Wallet ?',

    'howItWorks.title': 'Commencer en 4 étapes',

    'testimonials.title': 'Adopté par les premiers utilisateurs',
    'testimonials.subtitle': 'Quelques mots de personnes qui gèrent leur argent avec Mr Wallet.',

    'pricing.title': 'Tarifs simples',
    'pricing.subtitle': "Tout ce qu'il faut pour gérer ton argent, gratuit pendant qu'on construit.",

    'faq.title': 'Questions fréquentes',

    'ctaFinal.title': 'Prêt ? Commence maintenant.',
    'ctaFinal.primary': "S'inscrire gratuitement",
    'ctaFinal.secondaryPrefix': 'ou',
    'ctaFinal.secondary': 'se connecter',

    'footer.description': 'Les finances personnelles, en simple.',
    'footer.productTitle': 'Produit',
    'footer.linksTitle': 'Ressources',
    'footer.docs': 'Docs',
    'footer.github': 'GitHub',
    'footer.contact': 'Contact',
    'footer.privacy': 'Confidentialité',
    'footer.terms': "Conditions d'utilisation",
    'footer.accountDeletion': 'Supprimer mon compte',
    'footer.rights': 'Tous droits réservés.',

    'accountDeletion.title': 'Demander la suppression du compte',
    'accountDeletion.intro':
      'Vous pouvez supprimer définitivement votre compte Mr Wallet et toutes les données associées à tout moment.',
    'accountDeletion.selfServiceTitle': 'Supprimer vous-même (immédiat)',
    'accountDeletion.selfServiceStep1': 'Connectez-vous à votre compte.',
    'accountDeletion.selfServiceStep2': 'Allez dans Paramètres.',
    'accountDeletion.selfServiceStep3': 'Faites défiler jusqu’à « Supprimer le compte » et confirmez.',
    'accountDeletion.selfServiceNote':
      'Votre compte et toutes les données associées (comptes, transactions, budgets, catégories, tags, dettes, objectifs, récurrences, notifications, appareils push) sont supprimés définitivement et immédiatement. Cette action est irréversible.',
    'accountDeletion.loginHref': 'https://app.mister-wallet.com/fr/login',
    'accountDeletion.noAccessTitle': 'Vous ne pouvez pas vous connecter ?',
    'accountDeletion.noAccessBody':
      "Écrivez-nous depuis l'adresse email liée à votre compte, nous le supprimerons sous 30 jours.",
    'accountDeletion.contactLink': 'contact@mister-wallet.com',
  },
  en: {
    login: 'Log in',
    register: 'Sign up',
    mySpace: 'My space',
    accessMySpace: 'Access my space',

    'nav.features': 'Features',
    'nav.howItWorks': 'How it works',
    'nav.pricing': 'Pricing',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',

    'seo.title': 'Mr Wallet — Personal Budget & Expense Tracker',
    'seo.description':
      'Track accounts, budgets, expenses, debts, goals and recurring payments in one simple app. Multi-currency support (FCFA, EUR, USD). Free to start.',

    'hero.title': 'Mr Wallet',
    'hero.badge': 'Personal finance management',
    'hero.tagline': 'Pilot your cash, budgets and projects.',
    'hero.description':
      'Mr Wallet brings your accounts, expenses, debts, goals and recurrences into one simple, actionable experience.',
    'hero.ctaPrimary': 'Create my space',
    'hero.ctaSecondary': 'See the modules',
    'hero.trust.multiCurrencyTitle': 'Multi-currency',
    'hero.trust.multiCurrencyDescription': 'FCFA, EUR, USD',
    'hero.trust.ledgerTitle': 'Ledger',
    'hero.trust.ledgerDescription': 'Reliable balances',
    'hero.trust.mobileTitle': 'Mobile',
    'hero.trust.mobileDescription': 'Daily use',
    'hero.mock.dailyBudget': 'Left to spend',
    'hero.mock.perDay': '/ day',
    'hero.mock.stable': 'stable',
    'hero.mock.totalBalance': 'Total balance',
    'hero.mock.savings': 'Savings',
    'hero.mock.row1Label': 'Mobile money',
    'hero.mock.row1Sub': 'Fees included',
    'hero.mock.row2Label': 'Savings goal',
    'hero.mock.row2Sub': 'Funded this month',
    'hero.mock.row3Label': 'Market groceries',
    'hero.mock.row3Sub': 'Food budget',

    'features.title': 'All your financial steering, in one place',
    'features.subtitle':
      'A modular architecture where each business domain is isolated, with its own entities, rules and API.',

    'screenshots.title': 'See it in action',
    'screenshots.subtitle': 'A quick look at the dashboard, budgets and transactions on your phone.',
    'screenshots.alt': 'Mr Wallet app screenshot',

    'designedFor.title': 'Designed for West Africa',
    'designedFor.description':
      'The app starts from the ground: cash, mobile money, variable income, family support, informal debts and very concrete savings goals.',
    'designedFor.cta': 'Explore the dashboard',
    'designedFor.whyTitle': 'Why Mr Wallet?',

    'howItWorks.title': 'Get started in 4 steps',

    'testimonials.title': 'Loved by early users',
    'testimonials.subtitle': 'A few words from people managing their money with Mr Wallet.',

    'pricing.title': 'Simple pricing',
    'pricing.subtitle': "Everything you need to manage your money, free while we're building.",

    'faq.title': 'Frequently asked questions',

    'ctaFinal.title': 'Ready? Get started now.',
    'ctaFinal.primary': 'Sign up for free',
    'ctaFinal.secondaryPrefix': 'or',
    'ctaFinal.secondary': 'log in',

    'footer.description': 'Personal finance, kept simple.',
    'footer.productTitle': 'Product',
    'footer.linksTitle': 'Resources',
    'footer.docs': 'Docs',
    'footer.github': 'GitHub',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms of service',
    'footer.accountDeletion': 'Delete my account',
    'footer.rights': 'All rights reserved.',

    'accountDeletion.title': 'Request account deletion',
    'accountDeletion.intro':
      'You can permanently delete your Mr Wallet account and all associated data at any time.',
    'accountDeletion.selfServiceTitle': 'Delete it yourself (instant)',
    'accountDeletion.selfServiceStep1': 'Log in to your account.',
    'accountDeletion.selfServiceStep2': 'Go to Settings.',
    'accountDeletion.selfServiceStep3': 'Scroll to "Delete account" and confirm.',
    'accountDeletion.selfServiceNote':
      'Your account and all associated data (accounts, transactions, budgets, categories, tags, debts, goals, recurrences, notifications, push devices) are permanently deleted immediately. This action cannot be undone.',
    'accountDeletion.loginHref': 'https://app.mister-wallet.com/en/login',
    'accountDeletion.noAccessTitle': "Can't log in?",
    'accountDeletion.noAccessBody':
      'Email us from the address linked to your account and we will delete it for you within 30 days.',
    'accountDeletion.contactLink': 'contact@mister-wallet.com',
  },
} as const;
