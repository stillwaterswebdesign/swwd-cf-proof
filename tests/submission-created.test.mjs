// Tests for the form-email function.   npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEmail, oneLine, escapeHtml, sendWithRetry, makeHandler, FROM, BUSINESS_EMAIL } from '../netlify/functions/submission-created.mjs';

const payload = (over = {}) => ({
  id: 'abc123', number: 7, form_name: 'contact', created_at: '2026-11-09T14:52:21.127Z',
  data: { name: 'Pat Sample', phone: '(803) 555-0147', email: 'pat@example.com', message: 'We want a two-car garage.\nCall after 5?', consent_contact: 'on', ...over },
});

test('the email goes to the business, from the verified sender, replying to the visitor', () => {
  const m = buildEmail(payload());
  assert.deepEqual(m.to, [BUSINESS_EMAIL]);
  assert.equal(m.from, FROM);
  assert.equal(m.reply_to, 'pat@example.com');
  assert.equal(m.subject, 'New website inquiry from Pat Sample');
  assert.match(m.text, /Phone: \(803\) 555-0147/);
  assert.match(m.text, /two-car garage\.\nCall after 5\?/);
  assert.match(m.html, /two-car garage\.<br>Call after 5\?/);
});

test('a recipient override is used (testing)', () => assert.deepEqual(buildEmail(payload(), { to: 'me@example.com' }).to, ['me@example.com']));

test('line breaks in the name cannot inject email headers', () => {
  const m = buildEmail(payload({ name: 'Pat\r\nBcc: attacker@example.com' }));
  assert.ok(!/[\r\n]/.test(m.subject), 'subject has no line break');
  assert.equal(m.subject, 'New website inquiry from Pat Bcc: attacker@example.com');
  assert.equal(m.bcc, undefined);
});

test('visitor text is escaped in the HTML version', () => {
  const m = buildEmail(payload({ message: '<script>alert(1)</script> & "quotes"' }));
  assert.ok(!m.html.includes('<script>'));
  assert.match(m.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt; &amp; &quot;quotes&quot;/);
});

test('no usable visitor email: no reply-to, and the message says to call', () => {
  const m = buildEmail(payload({ email: 'not an email' }));
  assert.equal(m.reply_to, undefined);
  assert.match(m.text, /call or text the number above/);
});

test('missing name falls back, and very long text is cut', () => {
  assert.match(buildEmail(payload({ name: '' })).subject, /from a website visitor$/);
  assert.ok(buildEmail(payload({ message: 'x'.repeat(20000) })).text.length < 6000);
  assert.equal(oneLine('a\n\nb\t c'), 'a b c');
  assert.equal(escapeHtml(`<>&"'`), '&lt;&gt;&amp;&quot;&#39;');
});

const fake = (...responses) => { const calls = []; const f = async (url, opts) => { calls.push({ url, opts }); const r = responses.shift(); if (r instanceof Error) throw r; return r; }; f.calls = calls; return f; };
const res = (status, body = {}) => ({ ok: status >= 200 && status < 300, status, json: async () => body, text: async () => JSON.stringify(body) });
const noWait = async () => {};

test('a good send returns the Resend id, with the key and an idempotency key', async () => {
  const f = fake(res(200, { id: 'em_1' }));
  const out = await sendWithRetry({ to: ['a@b.co'] }, { key: 're_test', idempotencyKey: 'contact-1', fetchImpl: f, wait: noWait });
  assert.deepEqual(out, { ok: true, id: 'em_1' });
  assert.equal(f.calls[0].url, 'https://api.resend.com/emails');
  assert.equal(f.calls[0].opts.headers.Authorization, 'Bearer re_test');
  assert.equal(f.calls[0].opts.headers['Idempotency-Key'], 'contact-1');
});

test('a rate limit or server error is retried, then succeeds', async () => {
  const f = fake(res(429), res(500), res(200, { id: 'em_2' }));
  assert.deepEqual(await sendWithRetry({}, { key: 'k', fetchImpl: f, wait: noWait }), { ok: true, id: 'em_2' });
  assert.equal(f.calls.length, 3);
});

test('a network error is retried too', async () => {
  const f = fake(new Error('socket hang up'), res(200, { id: 'em_3' }));
  assert.equal((await sendWithRetry({}, { key: 'k', fetchImpl: f, wait: noWait })).ok, true);
});

test('a bad key or unverified domain is not retried', async () => {
  const f = fake(res(403, { message: 'domain is not verified' }));
  const out = await sendWithRetry({}, { key: 'k', fetchImpl: f, wait: noWait });
  assert.equal(out.ok, false);
  assert.match(out.error, /403/);
  assert.equal(f.calls.length, 1);
});

test('it gives up after three failed tries', async () => {
  const f = fake(res(500), res(500), res(500));
  assert.equal((await sendWithRetry({}, { key: 'k', fetchImpl: f, wait: noWait })).ok, false);
  assert.equal(f.calls.length, 3);
});

const event = (p) => ({ body: JSON.stringify({ payload: p }) });

test('handler: sends a contact submission to the business by default', async () => {
  const f = fake(res(200, { id: 'em_4' }));
  const out = await makeHandler({ env: { RESEND_API_KEY: 're_x' }, fetchImpl: f, wait: noWait })(event(payload()));
  assert.equal(out.statusCode, 200);
  assert.deepEqual(JSON.parse(f.calls[0].opts.body).to, [BUSINESS_EMAIL]);
});

test('handler: FORM_TO_EMAIL redirects it (testing)', async () => {
  const f = fake(res(200, { id: 'em_5' }));
  await makeHandler({ env: { RESEND_API_KEY: 're_x', FORM_TO_EMAIL: 'me@example.com' }, fetchImpl: f, wait: noWait })(event(payload()));
  assert.deepEqual(JSON.parse(f.calls[0].opts.body).to, ['me@example.com']);
});

test('handler: another form is ignored, and a missing key is reported without sending', async () => {
  const f = fake();
  const h = makeHandler({ env: { RESEND_API_KEY: 're_x' }, fetchImpl: f, wait: noWait });
  assert.equal((await h(event({ ...payload(), form_name: 'newsletter' }))).statusCode, 200);
  assert.equal(f.calls.length, 0);
  const noKey = await makeHandler({ env: {}, fetchImpl: f, wait: noWait })(event(payload()));
  assert.equal(noKey.statusCode, 500);
  assert.equal(f.calls.length, 0);
});

test('handler: a Resend failure returns 500 and never leaks the key', async () => {
  const f = fake(res(403, { message: 'domain is not verified' }));
  const logged = []; const orig = console.error; console.error = (...a) => logged.push(a.join(' '));
  try {
    const out = await makeHandler({ env: { RESEND_API_KEY: 're_secretvalue' }, fetchImpl: f, wait: noWait })(event(payload()));
    assert.equal(out.statusCode, 500);
    assert.ok(!JSON.stringify(out).includes('re_secretvalue') && !logged.join('\n').includes('re_secretvalue'));
  } finally { console.error = orig; }
});

test('handler: a malformed body is a 400', async () => {
  assert.equal((await makeHandler({ env: {}, fetchImpl: fake(), wait: noWait })({ body: 'not json' })).statusCode, 400);
});
