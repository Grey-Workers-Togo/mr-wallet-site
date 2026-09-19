/**
 * Fails the build when fr/en drift: a missing UI string key, or a content
 * file (blog/faq/legal) that exists for one locale but not the other.
 * Ported from apps/web/scripts/check-i18n-parity.ts in the mr-wallet repo
 * (docs/16-marketing-site-split.md, Phase 1) and extended to also check MDX
 * content twins.
 */
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { ui, type Locale } from '../src/i18n/ui';

const locales = Object.keys(ui) as Locale[];
let hasError = false;

function fail(message: string) {
  console.error(`[i18n-parity] ${message}`);
  hasError = true;
}

// 1. UI dictionary keys.
const [first, ...rest] = locales;
const referenceKeys = new Set(Object.keys(ui[first]));
for (const locale of rest) {
  const keys = new Set(Object.keys(ui[locale]));
  for (const key of referenceKeys) {
    if (!keys.has(key)) fail(`ui.ts: "${key}" present in "${first}" but missing in "${locale}"`);
  }
  for (const key of keys) {
    if (!referenceKeys.has(key)) fail(`ui.ts: "${key}" present in "${locale}" but missing in "${first}"`);
  }
}

// 2. Content collection twins (blog, faq, legal).
const contentRoot = join(import.meta.dirname, '..', 'src', 'content');
const collections = readdirSync(contentRoot).filter((entry) =>
  statSync(join(contentRoot, entry)).isDirectory(),
);

function listSlugs(collection: string, locale: string): Set<string> {
  const dir = join(contentRoot, collection, locale);
  try {
    return new Set(readdirSync(dir).filter((f) => f.endsWith('.mdx')));
  } catch {
    return new Set();
  }
}

for (const collection of collections) {
  const [refLocale, ...restLocales] = locales;
  const refSlugs = listSlugs(collection, refLocale);
  for (const locale of restLocales) {
    const slugs = listSlugs(collection, locale);
    for (const slug of refSlugs) {
      if (!slugs.has(slug)) fail(`${collection}/${refLocale}/${slug} has no ${locale} twin`);
    }
    for (const slug of slugs) {
      if (!refSlugs.has(slug)) fail(`${collection}/${locale}/${slug} has no ${refLocale} twin`);
    }
  }
}

if (hasError) {
  console.error(`\n[i18n-parity] failed — fix the drift above before building.`);
  process.exit(1);
}

console.log(`[i18n-parity] ok — ${locales.join('/')} in sync across ui.ts and content/.`);
