// Makes the favicon set from the company's own mark (client/logo-source/mark.png) or, without one, its initials, on a tile in the site's primary color.
//   npm run icons
// Writes to public/: favicon.ico (16, 32 and 48 px), favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png (180 px, square: iOS rounds it
// itself and paints any transparency black), android-chrome-192x192.png, android-chrome-512x512.png, and site.webmanifest.
// The logo file has a white background and no transparency, so the white is keyed out first (soft edge, so the roof's edges stay smooth).
import sharp from 'sharp';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'client', 'logo-source', 'mark.png'); // the company's own mark (white background is keyed out); without it the initials are used
const OUT = path.join(root, 'public');
const NAVY = '#213262'; // the site's primary color
const PAPER = '#ffffff'; // the site's background color (the initials, when there is no mark)
const INITIALS = 'JD';
mkdirSync(OUT, { recursive: true });

// 1. the roof with the white removed: alpha rises from 0 (pure white) to 1 (anything noticeably yellow)
let roof;
if (existsSync(SRC)) {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const lowest = Math.min(data[i], data[i + 1], data[i + 2]);
    data[i + 3] = Math.max(0, Math.min(255, Math.round(((255 - lowest) / 140) * 255)));
  }
  roof = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).trim().png().toBuffer();
} else {
  roof = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><text x="200" y="230" font-family="Georgia, serif" font-weight="700" font-size="240" text-anchor="middle" fill="${PAPER}">${INITIALS}</text></svg>`)).trim().png().toBuffer();
}

// 2. the tile: navy square (rounded for browser icons) with the roof centered, a little below the middle so it looks centered optically
async function tile(size, { rounded = true } = {}) {
  const roofW = Math.round(size * 0.74);
  const r = await sharp(roof).resize({ width: roofW }).toBuffer();
  const rh = (await sharp(r).metadata()).height;
  const base = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}"${rounded ? ` rx="${Math.round(size * 0.18)}"` : ''} fill="${NAVY}"/></svg>`,
  );
  return sharp(base)
    .composite([{ input: r, left: Math.round((size - roofW) / 2), top: Math.round((size - rh) / 2 + size * 0.02) }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const files = {
  'favicon-16x16.png': await tile(16),
  'favicon-32x32.png': await tile(32),
  'apple-touch-icon.png': await tile(180, { rounded: false }),
  'android-chrome-192x192.png': await tile(192),
  'android-chrome-512x512.png': await tile(512),
};
for (const [name, buf] of Object.entries(files)) writeFileSync(path.join(OUT, name), buf);

// 3. favicon.ico: an ICO container holding PNG images (16, 32, 48)
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => tile(s)));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = pngs.map((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); e.writeUInt8(sizes[i], 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(png.length, 8); e.writeUInt32LE(offset, 12);
  offset += png.length;
  return e;
});
writeFileSync(path.join(OUT, 'favicon.ico'), Buffer.concat([header, ...entries, ...pngs]));

// 4. the web app manifest
writeFileSync(path.join(OUT, 'site.webmanifest'), JSON.stringify({
  name: 'J.D. Gaskins Construction, Inc.',
  short_name: 'J.D. Gaskins',
  icons: [
    { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
  ],
  theme_color: NAVY,
  background_color: PAPER,
  display: 'standalone',
}, null, 2) + '\n');

console.log('icons written to public/:', ['favicon.ico', ...Object.keys(files), 'site.webmanifest'].join(', '));
