import type { APIRoute } from 'astro';

const SITE_URL = 'https://mister-wallet.com';

export const GET: APIRoute = () => {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
};
