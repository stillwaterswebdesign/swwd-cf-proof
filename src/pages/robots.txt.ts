import type { APIRoute } from 'astro';

// Everything may be crawled except the thank-you page; the sitemap is named so crawlers find it without being told.
export const GET: APIRoute = ({ site }) =>
  new Response(
    ['User-agent: *', 'Allow: /', 'Disallow: /thanks/', '', `Sitemap: ${new URL('/sitemap.xml', site).href}`, ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
