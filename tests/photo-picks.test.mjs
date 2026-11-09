// The photo choices in client/brand.mjs: a page never shows the same photo twice, and every chosen photo exists.   npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { brand } from '../client/brand.mjs';

const same = (a, b) => a[0] === b[0] && a[1] === b[1];
const file = ([bank, n]) => new URL(`../client/web/${bank}/${n}.webp`, import.meta.url);
const sectors = brand.sectors ?? [];

test('every sector has its page photo and every photo it names exists', () => {
  for (const s of sectors) {
    assert.ok(Array.isArray(s.image), `${s.title}: no featured photo`);
    for (const p of [s.image, ...(s.stripPhotos ?? [])]) assert.ok(existsSync(file(p)), `${s.title}: ${p.join('/')} is not in client/web`);
  }
});

test('a sector page never repeats its featured photo, or any photo, in its strip', () => {
  for (const s of sectors) {
    const strip = s.stripPhotos ?? [];
    assert.ok(!strip.some((p) => same(p, s.image)), `${s.title}: the strip repeats the featured photo`);
    strip.forEach((p, i) => assert.ok(!strip.slice(0, i).some((q) => same(q, p)), `${s.title}: ${p.join('/')} appears twice in the strip`));
  }
});

test('every sector sets its strip explicitly, so a default can never repeat a photo', () => {
  for (const s of sectors) assert.ok(Array.isArray(s.stripPhotos), `${s.title}: stripPhotos is not set`);
});

test('the home page never repeats a photo: cards, then up to two strip photos per sector', () => {
  const shown = [...sectors.map((s) => s.image), ...sectors.flatMap((s) => (s.stripPhotos ?? []).slice(0, 2))];
  shown.forEach((p, i) => assert.ok(!shown.slice(0, i).some((q) => same(q, p)), `home page shows ${p.join('/')} twice`));
});
