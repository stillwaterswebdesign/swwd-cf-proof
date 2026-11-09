// The one place every component gets its data from. The client is chosen at build time
// (CLIENT=<folder under clients/>, see astro.config.mjs, which points the @client alias at it).
import { brand as clientBrand } from '@client/brand.mjs';
import { enabledPages, PAGE_LABELS } from './define-client.mjs';

// Where the site is served from: '' at a domain root, '/<slug>' when published as a preview (set by SITE_BASE in astro.config.mjs).
export const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export const brand = clientBrand;

export const pages: string[] = enabledPages(brand);

const link = (key: string) => ({
  key,
  label: (PAGE_LABELS as Record<string, string>)[key],
  href: key === 'home' ? `${BASE}/` : `${BASE}/${key}/`,
});

// Header links: everything except Home (the logo) and Contact (the main button).
export const navLinks = pages.filter((k) => k !== 'home' && k !== 'contact').map(link);

// Footer links: every page, in order.
export const footerLinks = pages.map(link);

// A service's page lives at its own `path` (services/<slug> in most looks, <category>/<slug> in Trade).
export const serviceHref = (slug: string) => `${BASE}/${brand.services.find((s: any) => s.slug === slug)?.path ?? `services/${slug}`}/`;
// A category links to its own page when it has one, else to its band on the Services page.
export const categoryHref = (c: any) => (c.page ? `${BASE}/${c.slug}/` : `${BASE}/services/#${c.slug}`);
export const groupHref = (c: any, g: any) => `${categoryHref(c)}#${g.slug}`;
export const projectHref = (slug: string) => `${BASE}/projects/${slug}/`;

export type Brand = typeof brand;
