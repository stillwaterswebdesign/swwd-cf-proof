// Every quote on the home page is a word-for-word excerpt of a real review in client/brand.mjs, and carries the reviewer's name.   npm test
// (A client with no reviews or no home-page quotes passes: these tests only check what is there.)
import test from 'node:test';
import assert from 'node:assert/strict';
import { brand } from '../client/brand.mjs';

// compare ignoring curly versus straight quotes, a leading or trailing ellipsis, and extra spaces
const norm = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/^\s*…\s*/, '').replace(/\s*…\s*$/, '').replace(/\s+/g, ' ').trim();
const praise = brand.praise ?? [];
const reviews = brand.reviews ?? [];

test('every home-page quote is a word-for-word excerpt of a review, from the reviewer named under it', () => {
  for (const q of praise) {
    assert.ok(q.by && q.by.trim(), `"${q.title}" has no reviewer name`);
    const review = reviews.find((r) => r.name === q.by);
    assert.ok(review, `no review in the file is by ${q.by}`);
    assert.ok(norm(review.text).includes(norm(q.text)), `the quote under ${q.by} is not an exact excerpt of that review: "${q.text}"`);
  }
});

test('no reviewer is shown twice in the home-page quotes', () => {
  const names = praise.map((q) => q.by);
  assert.equal(new Set(names).size, names.length);
});

test('every full review names its reviewer and says where it came from, or defaults to Google', () => {
  for (const r of reviews) {
    assert.ok(r.name && r.text, 'a review is missing its name or text');
    assert.ok(r.source === undefined || /review$/i.test(r.source), `${r.name}: source should read like "Yelp review"`);
  }
});
