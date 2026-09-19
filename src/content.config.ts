import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const editorialSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  ogImage: z.string().optional(),
});

// One sub-collection per locale so a missing translation is a missing file,
// not a missing field — the i18n parity script (scripts/check-i18n-parity.ts)
// diffs blog/fr/*.mdx against blog/en/*.mdx by slug.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: editorialSchema,
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    // Self-contained 40-60 word answer, used as FAQPage acceptedAnswer.text
    // for AEO/GEO (generative engines quote this directly) — see docs/16.
    answer: z.string(),
    order: z.number().default(0),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedDate: z.coerce.date(),
  }),
});

export const collections = { blog, faq, legal };
