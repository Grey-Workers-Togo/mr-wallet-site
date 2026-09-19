// Structured (array/object) editorial content for the landing page, seeded
// from the `home` namespace of apps/web/messages/{fr,en}.json in the
// mr-wallet repo (docs/16-marketing-site-split.md, Phase 2). Kept separate
// from `ui.ts` because the i18n parity script only diffs top-level string
// keys — these arrays are hand-kept in sync between fr/en instead.
import type { Locale } from './ui';

export interface FeatureItem {
  icon: 'bar-chart' | 'smartphone' | 'gauge' | 'target' | 'repeat' | 'hand-coins';
  title: string;
  description: string;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  badge?: string;
  cta: string;
  features: string[];
  href: string;
  highlighted?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const featuresItems: Record<Locale, FeatureItem[]> = {
  fr: [
    {
      icon: 'bar-chart',
      title: 'Comptes multiples',
      description: 'Centralisez tous vos comptes dans une vue unique, avec soldes et historique consolidés.',
    },
    {
      icon: 'smartphone',
      title: 'Transactions & catégories',
      description: 'Classez chaque opération, suivez vos dépenses par catégorie et identifiez vos tendances.',
    },
    {
      icon: 'repeat',
      title: 'Transactions récurrentes',
      description: 'Automatisez les opérations répétitives : loyer, salaire, abonnements.',
    },
    {
      icon: 'gauge',
      title: 'Budgets avec alertes',
      description: 'Définissez des plafonds par catégorie et recevez des alertes avant de les dépasser.',
    },
    {
      icon: 'hand-coins',
      title: 'Dettes & échéancier',
      description: 'Planifiez le remboursement de vos dettes avec un échéancier clair et prévisionnel.',
    },
    {
      icon: 'target',
      title: "Objectifs d'épargne",
      description: 'Fixez des cibles, suivez votre progression et restez motivé jusqu’au but.',
    },
  ],
  en: [
    {
      icon: 'bar-chart',
      title: 'Multiple accounts',
      description: 'Centralize all your accounts in a single view, with consolidated balances and history.',
    },
    {
      icon: 'smartphone',
      title: 'Transactions & categories',
      description: 'Classify every operation, track your spending by category and spot your trends.',
    },
    {
      icon: 'repeat',
      title: 'Recurring transactions',
      description: 'Automate repetitive operations: rent, salary, subscriptions.',
    },
    {
      icon: 'gauge',
      title: 'Budgets with alerts',
      description: 'Set caps per category and get alerted before you exceed them.',
    },
    {
      icon: 'hand-coins',
      title: 'Debts & repayment schedule',
      description: 'Plan your debt repayments with a clear, forward-looking schedule.',
    },
    {
      icon: 'target',
      title: 'Savings goals',
      description: 'Set targets, track your progress and stay motivated until the finish line.',
    },
  ],
};

export const howItWorksSteps: Record<Locale, StepItem[]> = {
  fr: [
    { title: "S'inscrire", description: 'Email et mot de passe. 30 secondes.' },
    { title: 'Importer ou saisir', description: 'Import CSV/Excel ou saisie manuelle.' },
    { title: 'Définir tes budgets', description: 'Templates ou personnalisé.' },
    { title: 'Regarder croître', description: 'Dashboards et rapports.' },
  ],
  en: [
    { title: 'Sign up', description: 'Email and password. 30 seconds.' },
    { title: 'Import or enter', description: 'CSV/Excel import or manual entry.' },
    { title: 'Set your budgets', description: 'Templates or fully custom.' },
    { title: 'Watch it grow', description: 'Dashboards and reports.' },
  ],
};

export const testimonialItems: Record<Locale, TestimonialItem[]> = {
  fr: [
    {
      name: 'Awa D.',
      role: 'Designer freelance, Lomé',
      quote:
        'La première appli budget qui comprend vraiment les frais mobile money et les revenus irréguliers.',
    },
    {
      name: 'Kossi M.',
      role: 'Commerçante, Cotonou',
      quote: 'Je sais enfin exactement combien je peux dépenser aujourd’hui sans vérifier trois applis.',
    },
    {
      name: 'Fatou S.',
      role: 'Étudiante, Dakar',
      quote:
        "Créer mon premier objectif d'épargne a pris deux minutes. Voir la barre de progression avancer me motive.",
    },
  ],
  en: [
    {
      name: 'Awa D.',
      role: 'Freelance designer, Lomé',
      quote: 'First budget app that actually understands mobile money fees and irregular income.',
    },
    {
      name: 'Kossi M.',
      role: 'Small business owner, Cotonou',
      quote: 'I finally know exactly how much I can spend today without checking three apps.',
    },
    {
      name: 'Fatou S.',
      role: 'Student, Dakar',
      quote: 'Setting up my first savings goal took two minutes. Seeing the progress bar move keeps me motivated.',
    },
  ],
};

export const pricingPlans: Record<Locale, PricingPlan[]> = {
  fr: [
    {
      name: 'Gratuit',
      price: '0 F',
      period: '/ pour toujours',
      badge: 'Plan actuel',
      cta: 'Créer mon espace',
      href: 'https://app.mister-wallet.com/fr/register',
      highlighted: true,
      features: [
        'Comptes et transactions illimités',
        'Budgets, objectifs, dettes et récurrences',
        'Import et export CSV/Excel',
        'Multi-devises (FCFA, EUR, USD)',
      ],
    },
    {
      name: 'Pro',
      price: 'Bientôt',
      cta: 'Me prévenir',
      href: 'mailto:contact@mister-wallet.com?subject=Mr%20Wallet%20Pro',
      features: [
        'Connecteurs bancaires',
        'Comptes partagés et budgets familiaux',
        'Rapports et prévisions avancés',
        'Support prioritaire',
      ],
    },
  ],
  en: [
    {
      name: 'Free',
      price: '0 F',
      period: '/ forever',
      badge: 'Current plan',
      cta: 'Create my space',
      href: 'https://app.mister-wallet.com/en/register',
      highlighted: true,
      features: [
        'Unlimited accounts and transactions',
        'Budgets, goals, debts and recurrences',
        'CSV/Excel import and export',
        'Multi-currency (FCFA, EUR, USD)',
      ],
    },
    {
      name: 'Pro',
      price: 'Soon',
      cta: 'Notify me',
      href: 'mailto:contact@mister-wallet.com?subject=Mr%20Wallet%20Pro',
      features: [
        'Bank connectors',
        'Shared accounts and household budgets',
        'Advanced reports and forecasts',
        'Priority support',
      ],
    },
  ],
};

export const designedForReasons: Record<Locale, string[]> = {
  fr: [
    'FCFA par défaut, avec EUR et USD quand tes finances sortent du local',
    'Pensé pour les revenus irréguliers, les frais mobile money et les virements entre comptes',
    'Un ledger interne pour garder des soldes cohérents, même quand l’historique grandit',
    'Deux langues dès le départ, français et anglais',
  ],
  en: [
    'FCFA by default, with EUR and USD when your finances go abroad',
    'Built for irregular income, mobile money fees and transfers between accounts',
    'An internal ledger keeps balances consistent, even as history grows',
    'Two languages from day one, French and English',
  ],
};

// Condensed FAQ shown on the home page, distinct from the long-form
// `faq` content collection at /[locale]/faq. Both carry FAQPage JSON-LD.
export const homeFaqItems: Record<Locale, FaqItem[]> = {
  fr: [
    { question: 'Combien ça coûte ?', answer: 'Gratuit, zéro publicité.' },
    { question: 'Mes données sont-elles protégées ?', answer: 'Chiffrement et audit log complet.' },
    {
      question: 'Puis-je importer les relevés de ma banque ?',
      answer: 'CSV/Excel dès aujourd’hui, des connecteurs directs sont prévus.',
    },
    { question: 'Ça fonctionne sur mobile ?', answer: "Oui, c'est une PWA installable." },
    { question: 'Comment je récupère mes données ?', answer: 'Export complet à tout moment.' },
    { question: 'Y a-t-il une limite de transactions ?', answer: 'Non.' },
    {
      question: 'Que se passe-t-il si je supprime mon compte ?',
      answer: 'Suppression logique, puis définitive après 30 jours.',
    },
  ],
  en: [
    { question: 'How much does it cost?', answer: 'Free, no ads.' },
    { question: 'Is my data protected?', answer: 'Encryption and a full audit log.' },
    { question: 'Can I import from my bank?', answer: 'CSV/Excel today, direct connectors are planned.' },
    { question: 'Does it work on mobile?', answer: "Yes, it's an installable PWA." },
    { question: 'How do I get my data back?', answer: 'Full export at any time.' },
    { question: 'Is there a transaction limit?', answer: 'No.' },
    {
      question: 'What happens if I delete my account?',
      answer: 'Soft delete, then permanent deletion after 30 days.',
    },
  ],
};
