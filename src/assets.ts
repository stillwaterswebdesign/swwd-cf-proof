// Resolves a photo "slot" (see photos.defaults.mjs, overridden per client in clients/<client>/photos.config.mjs)
// to an optimized image URL, plus its alt text.
// A slot whose optimized WebP does not exist yet (no photo supplied for it) resolves to a labeled placeholder
// graphic instead of failing the build, so the layout can be judged before photos arrive. Every placeholder
// carries the token PLACEHOLDER_TOKEN, which tools/client-checks.mjs looks for so a publish can be refused.
import { getImage } from 'astro:assets';
import { SLOTS as DEFAULT_SLOTS, ALTS as DEFAULT_ALTS, BANKS } from './photos.defaults.mjs';
import { brand } from './brand';

export const PLACEHOLDER_TOKEN = 'SWWD-PLACEHOLDER-PHOTO';

// A client's photos.config.mjs is optional (a client that uses the default slots does not need one).
const overrides = Object.values(import.meta.glob('@client/photos.config.mjs', { eager: true }))[0] as { SLOTS?: object; ALTS?: object } | undefined;
const SLOTS = { ...DEFAULT_SLOTS, ...(overrides?.SLOTS ?? {}) } as Record<string, string | [string, number]>;
const ALTS = { ...DEFAULT_ALTS, ...(overrides?.ALTS ?? {}) } as Record<string, string>;

// Only THIS client's photos are bundled: the alias points at one client folder (see astro.config.mjs).
const photos = import.meta.glob('@client/web/**/*.webp', { eager: true, import: 'default' }) as Record<string, { src: string } | string>;
const url = (hit: { src: string } | string) => (typeof hit === 'string' ? hit : hit.src);
const byFile = new Map(Object.entries(photos).map(([key, hit]) => [key.replace(/\\/g, '/').split('/web/').pop() as string, hit]));

function placeholder(label: string): string {
  const text = label.replace(/[^A-Za-z0-9 ,.&-]/g, '').slice(0, 60);
  const { primary, ink, cta } = brand.colors;
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">' +
    `<desc>${PLACEHOLDER_TOKEN}</desc>` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${primary}"/><stop offset="1" stop-color="${ink}"/></linearGradient>` +
    '<pattern id="p" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#ffffff" stroke-opacity="0.07" stroke-width="2"/></pattern></defs>' +
    '<rect width="1200" height="800" fill="url(#g)"/><rect width="1200" height="800" fill="url(#p)"/>' +
    `<path d="M470 470L600 360L730 470V560H470Z" fill="none" stroke="${cta === primary ? '#ffffff' : cta}" stroke-width="10" stroke-linejoin="round" opacity="0.85"/>` +
    `<text x="600" y="640" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="34" fill="#ffffff" fill-opacity="0.75">${text || 'Photo placeholder'}</text>` +
    '</svg>';
  // encodeURIComponent leaves ( ) ' ! * alone; the result is used inside unquoted CSS url(...), so encode them too.
  const encoded = encodeURIComponent(svg).replace(/[()'!*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
  return `data:image/svg+xml,${encoded}`;
}

// A photo reference is either a named slot ('hero') or a [bank, n] pair (['kitchens', 2]) written in a client's content.
export type PhotoRef = string | [string, number] | undefined;

function resolve(ref: PhotoRef): { file: string; bank: string; n: number; named?: string } | null {
  if (!ref) return null;
  const pick = Array.isArray(ref) ? ref : SLOTS[ref];
  if (!pick) throw new Error(`contracting: no photo slot named "${ref}"`);
  const [bank, n] = typeof pick === 'string' ? [pick, 1] : pick;
  return { file: `${bank}/${n}`, bank, n, named: typeof ref === 'string' ? ref : undefined };
}

export function img(ref: PhotoRef): string {
  const r = resolve(ref);
  if (!r) return placeholder('Photo placeholder');
  const hit = byFile.get(`${r.file}.webp`);
  // the placeholder names the folder (and position) the photo belongs in
  return hit ? url(hit) : placeholder(`${BANKS[r.bank]?.label ?? r.bank} no. ${r.n}`);
}

// A photo as <img> attributes for a responsive image: the original (as the fallback src), plus smaller copies at the given widths, so a phone
// downloads a small file instead of the full-size photo. `width`/`height` are the original's, so the browser reserves the right shape.
// Falls back to the plain URL when the photo is a placeholder (nothing to resize).
export async function imgSet(ref: PhotoRef, widths: number[]): Promise<{ src: string; srcset?: string; width?: number; height?: number }> {
  const r = resolve(ref);
  const hit = r ? byFile.get(`${r.file}.webp`) : undefined;
  if (!hit || typeof hit === 'string') return { src: img(ref) };
  const meta = hit as unknown as { src: string; width: number; height: number };
  const smaller = widths.filter((w) => w < meta.width);
  const copies = await Promise.all(smaller.map((w) => getImage({ src: hit as any, width: w, format: 'webp', quality: 80 })));
  const srcset = [...copies.map((c, i) => `${c.src} ${smaller[i]}w`), `${meta.src} ${meta.width}w`].join(', ');
  return { src: meta.src, srcset, width: meta.width, height: meta.height };
}

// The photo's URL, or null when that photo has not been supplied. The Trade look uses this so a slot with no photo is simply left out
// (no placeholder graphic), which is what lets a client with few or no photos publish.
export function maybeImg(ref: PhotoRef): string | null {
  const r = resolve(ref);
  if (!r) return null;
  const hit = byFile.get(`${r.file}.webp`);
  return hit ? url(hit) : null;
}

export function alt(ref: PhotoRef, text?: string): string {
  if (text) return text;
  const r = resolve(ref);
  if (!r) return '';
  return (r.named && ALTS[r.named]) || BANKS[r.bank]?.alt || '';
}

// Every photo found in a bank, as [bank, n] refs (so a gallery shows exactly what the client dropped in the folder).
// An empty bank gives `fallback` placeholder refs, so the layout can still be judged (and a publish is refused until real photos exist).
export function bankPhotos(bank: string, fallback = 3): [string, number][] {
  const have = [...byFile.keys()].filter((k) => k.startsWith(`${bank}/`)).length;
  return Array.from({ length: have || fallback }, (_, i) => [bank, i + 1] as [string, number]);
}
