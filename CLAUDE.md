# Mr Wallet — marketing site

Public marketing site for **Mr Wallet** (budget/finance app): landing, pricing, about, blog, FAQ,
legal pages, `account-deletion`. Deployed to `mister-wallet.com`. The application itself
(authenticated app + all auth routes) lives in a **separate repository** (`mr-wallet`) and is
deployed to `app.mister-wallet.com` — this repo never talks to the API and never imports anything
from that repo.

**Source of truth for this split**: `docs/16-marketing-site-split.md` and
`docs/adr/0015-marketing-site-separation.md` in the `mr-wallet` repo
(`C:\Users\kameganvi\Documents\Projects\budget_manager` on this machine). Read those before any
non-trivial change here — this file only summarizes the parts that matter day to day.

## Stack

- **Astro 7**, `output: 'static'` — zero JS by default. Every page ships as plain HTML unless it
  explicitly opts into a React island.
- **Tailwind v4** via `@tailwindcss/vite` (not the old `@astrojs/tailwind` integration).
- **MDX** content collections for `blog`, `faq`, `legal` (`src/content.config.ts`). No CMS, no
  database — content is versioned files, edited via PR.
- **`@astrojs/sitemap`** for `sitemap-index.xml` with hreflang alternates.
- **React** (`@astrojs/react`) only for interactive islands: `ScreenshotsGallery`, `ThemeToggle`,
  `LanguageSwitcher`, mobile menu. Everything else — cards, FAQ accordions, headers, footers — is
  plain `.astro`.

## Non-negotiable rules

- **No React island unless the thing is genuinely interactive.** A card, a section, a static
  header is `.astro`. Reaching for a React component out of habit reintroduces the hydration cost
  this repo exists to avoid.
- **No Framer Motion, no animation library.** Use CSS (`@starting-style`,
  `animation-timeline: view()`, transitions). A JS animation library on the marketing site is the
  one thing likely to get a PR rejected outright.
- **Two locales, `fr` and `en`, `fr` is default, `prefixDefaultLocale: true`.** Never change this
  to a locale-less default — `/fr` and `/en` are already indexed by Google; changing the URL
  scheme throws that away. See `astro.config.mjs`.
- **fr/en parity is enforced by the build.** `npm run check:i18n`
  (`scripts/check-i18n-parity.ts`) fails if a UI string key or an MDX file exists for one locale
  and not the other. Every new blog post, FAQ entry, or UI string needs both.
- **Content in `src/content/{blog,faq,legal}/{fr,en}/` uses the same filename across locales** —
  the parity script pairs files by name, not by frontmatter.
- **This site never calls the API and never checks auth state.** The CTA is a static link to
  `https://app.mister-wallet.com/fr/login` (see `docs/QUESTIONS.md` in the `mr-wallet` repo for
  why a "already logged in" dynamic CTA was rejected — it would require widening the API's CORS
  origin for a static site that has no other reason to talk to the API).
- **No secrets, no env-gated backend logic.** If a task needs a database, an API key, or
  server-side auth, it does not belong in this repo — flag it instead of building it here.
- **Design tokens in `src/styles/global.css` are copied from `apps/web/src/styles/globals.css`**
  in the `mr-wallet` repo. There is no shared package (ADR-0015 accepts this duplication). If you
  change a color/font token here because the app changed it, say so — don't silently let them
  drift without a note.

## SEO / AEO / GEO (why this repo exists)

- Every page: absolute `<link rel="canonical">`, unique hand-written `<meta name="description">`,
  hreflang fr/en/x-default. See `BaseLayout.astro`.
- JSON-LD: `Organization` + `WebSite` on every page, `SoftwareApplication` on home/pricing,
  `FAQPage` on `/faq`, `BlogPosting` + `BreadcrumbList` on every article.
- Every blog post and FAQ answer opens with a **self-contained 40–60 word answer paragraph** —
  this is what generative search engines quote directly. Write it first, not as an afterthought.
- Performance budget: LCP < 1.5s, CLS < 0.05, zero JS outside islands. If a change adds a script
  tag or a heavy dependency to a static page, that's a regression, not a detail.
- `public/llms.txt` is adapted from the `llms.txt` at the root of the `mr-wallet` repo — keep it in
  sync when product positioning changes.

## Commands

```bash
npm run dev          # dev server
npm run check:i18n   # fr/en parity (UI strings + content files) — fails the build on drift
npm run check:types  # astro check
npm run build         # check:i18n && check:types && astro build
npm run preview       # serve the built dist/
```

## Structure

```
src/
  content.config.ts        # blog/faq/legal collections, glob loader + zod schema
  content/{blog,faq,legal}/{fr,en}/*.mdx
  i18n/ui.ts                # UI string dictionary, fr/en
  i18n/utils.ts              # useTranslations, getLocalizedPath, locale list
  layouts/BaseLayout.astro   # <head>, canonical/hreflang, JSON-LD slot
  components/                # .astro by default; React islands live here too
  pages/
    index.astro              # redirects "/" -> "/{defaultLocale}"
    [locale]/index.astro      # home/landing
    [locale]/blog/{index,[...slug]}.astro
    [locale]/faq.astro
    [locale]/legal/[...slug].astro
    robots.txt.ts
scripts/check-i18n-parity.ts
```

## Current state

Phase 2 (landing content migration) is done. The real landing page is ported from
`apps/web/src/app/[locale]/HomeView.tsx`: hero, features, screenshots, "designed for West Africa",
how-it-works, testimonials, pricing, condensed FAQ, final CTA. All of it is plain `.astro` — no
React islands were needed in the end; `ThemeToggle` and `LanguageSwitcher` are vanilla-JS/CSS
components instead (`src/components/`), which keeps the zero-JS goal intact. Structured content
(feature list, pricing plans, testimonials, FAQ items) lives in `src/i18n/content.ts`, hand-kept in
sync between `fr`/`en` — the parity script only diffs `ui.ts`'s flat keys, not this file's arrays.

`legal/` has real content: `privacy` and `terms` are first-draft copy (each MDX file has an
HTML-comment note — **needs an actual legal review pass before production launch**, this was
written by an agent, not a lawyer). `account-deletion` is fully migrated from
`apps/web/src/app/[locale]/account-deletion/page.tsx` and kept at its original indexed URL
(`/[locale]/account-deletion`, not under `/legal/`).

Real assets are in place: `logo-symbol.svg`, `logo-full.svg`, icon/favicon set, and the four
`screenshots/phone*.png` from `apps/web/public/`. One sample blog post and one sample FAQ entry
still exist per locale — more content is a content task, not a code task, from here on.

Not done yet: Lighthouse CI budget config referenced in `.github/workflows/ci.yml` (no
`lighthouserc` file exists), and this repo has not been pushed to GitHub or deployed anywhere —
both are deliberately deferred (see `docs/16-marketing-site-split.md` Phase 3 verification list
before either happens).
