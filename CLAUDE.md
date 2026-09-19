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
- **Two locales, `fr` and `en`, `en` is default, `prefixDefaultLocale: true`.** Never change this
  to a locale-less default — `/fr` and `/en` are already indexed by Google; changing the URL
  scheme throws that away. `defaultLocale` (in `astro.config.mjs` and `src/i18n/ui.ts`) only drives
  `/` -> `/en`, `x-default` hreflang and the sitemap; keep the two in sync. Blog slugs are English in
  both locales (same filename, see parity rule below).
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

- Every page: absolute `<link rel="canonical">` (no trailing slash — `trailingSlash: 'never'` in
  `astro.config.mjs` and `"trailingSlash": false` in `vercel.json` must agree with the sitemap),
  unique hand-written `<meta name="description">`, hreflang en/fr/x-default, OG/Twitter tags with
  a 1200x630 card (`public/og-default.png`, regenerate with `node scripts/generate-og-image.mjs`),
  `og:type=article` on posts. See `BaseLayout.astro`. `/` is filtered out of the sitemap (redirect
  stub) and `src/pages/404.astro` is `noindex`.
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
    [locale]/pricing.astro    # plans from content.ts + the gratuit-pro FAQ entry (single source)
    [locale]/about.astro      # publisher + principles; Organization schema from src/lib/schema.ts
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

`legal/` has real content: `privacy` merges the Phase 2 draft with the real legal-entity info from
the 2022 privacypolicies.com source (Grey Workers Togo, Zanguera, Lomé, Togo — entity, minors,
data-transfer, legal-disclosure sections). `terms` has no equivalent historical source and is still
first-draft copy. Both MDX files carry an HTML-comment note — **needs an actual legal review pass
before production launch**, product-facing claims (Argon2id, no bank connector, no ads) are
verified against the code but the legal framing is not lawyer-reviewed. `account-deletion` is fully
migrated from `apps/web/src/app/[locale]/account-deletion/page.tsx` and kept at its original indexed
URL (`/[locale]/account-deletion`, not under `/legal/`).

Real assets are in place: `logo-symbol.svg`, `logo-full.svg`, icon/favicon set, and the four
`screenshots/phone*.png` from `apps/web/public/`. One sample blog post and one sample FAQ entry
still exist per locale — more content is a content task, not a code task, from here on.

Phase 3 (SEO/AEO/GEO) is done: JSON-LD (`Organization`+`WebSite`, `SoftwareApplication`,
`FAQPage` with `acceptedAnswer.text`, `BlogPosting`+`BreadcrumbList`), absolute canonical +
hreflang fr/en/x-default on every page, a real per-page `<meta name="description">` (`faq` and
`legal` collections now carry their own `description`/`answer` fields — no more reused
`seo.description` placeholder), `public/llms.txt` adapted for the marketing domain, and
`lighthouserc.json` (Performance ≥95 / SEO=100 / Accessibility ≥95) wired into
`.github/workflows/ci.yml`'s Lighthouse CI step.

Not done yet: this repo has not been pushed to GitHub or deployed anywhere — deliberately deferred
until the user pushes it themselves (see `docs/16-marketing-site-split.md` Phase 3 verification
list before either happens). Phase 4 (`apps/web` cleanup in the `mr-wallet` repo) is done.

Phase 5 redirects live in `vercel.json` (hosting assumed to be Vercel — if that changes, port the rules
to the new host, Astro's own `redirects` config only emits meta-refresh HTML on a static build, not a
real 301). Every app/auth route 301s to `app.mister-wallet.com`, both with and without a locale prefix
(pre-cutover verification/reset emails carry no locale), plus `/manifest.json`, `/sw.js`,
`/.well-known/assetlinks.json` and `www` -> apex. `statusCode: 301` is deliberate: Vercel's
`permanent: true` emits 308. When the app gains a new top-level route, add it to `vercel.json`;
marketing pages (`/{locale}`, `account-deletion`, `blog`, `faq`, `legal`) must never match a rule.
Query-string preservation on these redirects has not been checked against a live deployment yet.
