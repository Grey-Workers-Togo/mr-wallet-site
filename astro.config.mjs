// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mister-wallet.com',
  output: 'static',
  // Canonical URLs are emitted without a trailing slash (BaseLayout); keep the sitemap and the host
  // (vercel.json "trailingSlash") on the same convention or crawlers see two URLs per page.
  trailingSlash: 'never',
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'en',
    // Keeps the currently indexed /fr and /en URLs — do not change this to
    // avoid a locale-less default, see docs/16-marketing-site-split.md.
    routing: { prefixDefaultLocale: true },
  },
  integrations: [
    mdx(),
    react(),
    sitemap({
      // "/" is a redirect stub (src/pages/index.astro) — never list it.
      filter: (page) => new URL(page).pathname !== '/',
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', fr: 'fr' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
