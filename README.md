# Mr Wallet — marketing site

Public marketing site for [Mr Wallet](https://app.mister-wallet.com), deployed to
`mister-wallet.com`. Static, Astro 7, zero JS by default. Landing, pricing, blog, FAQ and legal
pages live here; the application and all auth routes live in a separate repository at
`app.mister-wallet.com`.

Read [CLAUDE.md](./CLAUDE.md) first — it covers the rules that matter for this repo (i18n parity,
no animation libraries, no auth/API calls from this site, design token duplication). Full
background: `docs/16-marketing-site-split.md` and `docs/adr/0015-marketing-site-separation.md` in
the `mr-wallet` repo.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run check:i18n` | fr/en parity check (UI strings + content files) |
| `npm run check:types` | `astro check` |
| `npm run build` | `check:i18n && check:types && astro build` → `./dist/` |
| `npm run preview` | Preview the production build locally |

## Structure

```
src/
  content.config.ts        # blog/faq/legal collections
  content/{blog,faq,legal}/{fr,en}/*.mdx
  i18n/                     # UI dictionary + helpers
  layouts/BaseLayout.astro  # <head>, canonical/hreflang, JSON-LD
  components/
  pages/[locale]/...
scripts/check-i18n-parity.ts
```
