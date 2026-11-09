import type { APIRoute } from 'astro';
import { brand } from '../brand';
import { allRoutes } from '../define-client.mjs';

// Every page the site builds, from the same list the router uses, so the sitemap can never name a page that does not exist or miss one that does.
// (The thank-you and 404 pages are left out on purpose.)
export const GET: APIRoute = ({ site }) => {
  const urls = allRoutes(brand).map((r: { path: string }) => new URL(r.path ? `/${r.path}/` : '/', site).href);
  const body = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls.map((u: string) => `  <url><loc>${u}</loc></url>`), '</urlset>', ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
