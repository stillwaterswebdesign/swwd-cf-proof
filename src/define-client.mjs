// Turns a client's brand.mjs into the object every component reads (`brand`).
//
// A client file only states what is true about that business. This fills in what a look can safely
// default (palette, fonts) and generic, claim-free wording (a form's option lists, section headings).
// It deliberately has NO default for anything that is a claim about the business (licensed, insured,
// years in business, warranty, "estimate in a few days", reviews, stats, prices): those come from the
// client or are left out, so a mockup can never make a promise the business did not make.
//
// There are no business-type presets. A contractor lists the services it actually offers, in any mix
// (new homes, remodels, additions, outdoor living ...), and may group them with `group`.
//
// Set LOOK=<name> in the environment to preview any client in another look without editing its file.
import { LOOKS, LOOK_NAMES } from './looks/defaults.mjs';

const GENERIC = {
  logoSub: 'Construction',
  quoteLabel: 'Start a conversation', // what the main buttons say
  cta: { title: 'Ready to talk about your project?', text: 'Tell us what you have in mind and we will get back to you.' },
  serviceAreaLead: 'If you are nearby but not listed, ask us.',
  formNote: '',
  social: [],
};

// Option lists for the contact form. Generic on purpose: nothing here claims anything about a business.
const FORM_OPTIONS = {
  budget: ['Under $50,000', '$50,000 – $150,000', '$150,000 – $400,000', '$400,000 – $750,000', 'Over $750,000', 'Not sure yet'],
  timeline: ['As soon as possible', 'Within 3 months', '3 – 6 months', '6 – 12 months', 'More than a year away', 'Just exploring'],
  plans: ['I have plans or drawings', 'I have a rough sketch or ideas', 'I need design help', 'Not sure yet'],
  land: ['I own the lot or land', 'Under contract on a lot', 'Still looking for land', 'Not applicable (existing home)'],
  heard: ['Google search', 'Referral from a friend or family', 'Drove past a job site', 'Social media', 'Realtor or architect', 'Other'],
};

// Section headings. Generic on purpose: nothing here claims anything about a business.
const HEADINGS = {
  services: { topper: 'What we do', title: 'Our services', lead: '' },
  projects: { topper: 'Our work', title: 'Recent projects', lead: '' },
  gallery: { topper: 'Recent work', title: 'Our work', lead: '' },
  steps: { topper: 'How it works', title: 'How a project works', lead: '' },
  pricing: { topper: 'Pricing', title: 'How we price a project', lead: '' },
  reviews: { topper: 'Customer reviews', title: 'What customers say', lead: '' },
  praise: { topper: 'In their words', title: 'What customers say', lead: '' },
  faq: { topper: 'Questions', title: 'Questions and answers', lead: '' },
  area: { topper: 'Service area', title: 'Where we work', lead: GENERIC.serviceAreaLead },
  story: { topper: 'Our story', title: 'About us', lead: '' },
  values: { topper: 'What we promise', title: 'What you can count on', lead: '' },
  team: { topper: 'The team', title: 'Meet the team', lead: '' },
  contact: { topper: 'Talk to us', title: 'Tell us about your project', lead: 'Call, email or send the form.' },
};
const INTRO = { services: 'What we build and renovate.', projects: 'A look at our recent work.', process: 'How a project goes from first call to the final walk-through.', area: 'Where we build and renovate.', about: '', contact: 'Call, email or send the form.' };

const slugify = (s) => String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export function defineClient(data) {
  const look = process.env.LOOK || data.look;
  if (!LOOKS[look]) throw new Error(`brand.look must be one of: ${LOOK_NAMES.join(', ')} (got "${look}")`);
  const base = LOOKS[look];

  // Every service/project gets a URL slug. A service with a `body` (paragraphs) gets its own page; a project always does.
  // A look with `categoryPages` (Trade) gives each category its own page and nests a service's page under it (/plumbing/water-heaters/);
  // every other look keeps /services/<slug>/.
  const categoryPages = !!base.categoryPages;
  const services = (data.services ?? []).map((s) => {
    const slug = slugify(s.slug ?? s.title);
    return { slug, body: [], includes: [], signs: [], ...s, path: categoryPages && s.category ? `${slugify(s.category)}/${slug}` : `services/${slug}` };
  });
  const projects = (data.projects ?? []).map((p) => ({ slug: slugify(p.slug ?? p.title), body: [], specs: [], gallery: [], ...p }));

  // Services shown in groups when the client gives them a `group` ("New homes", "Remodeling" ...), in order of first appearance.
  const groupNames = [...new Set(services.map((s) => s.group ?? ''))];
  const serviceGroups = groupNames.map((name) => ({ name, items: services.filter((s) => (s.group ?? '') === name) }));

  // Two levels for a client with a long service list: a service's `category` ("Plumbing", "Electrical") contains its `group`s
  // ("Sewer & drain"), which contain the services. Drives the Trade look's dropdown menu and Services page. A client with no
  // categories gets one nameless category holding its groups, so every look can rely on the shape.
  // `groupBlurbs: { 'Toilets': 'a short line' }` puts a line under a group's heading on its category page.
  const categoryNames = [...new Set(services.map((s) => s.category ?? ''))];
  const serviceCategories = categoryNames.map((name) => {
    const inCat = services.filter((s) => (s.category ?? '') === name);
    const groups = [...new Set(inCat.map((s) => s.group ?? ''))].map((g) => ({ name: g, slug: slugify(g || name), blurb: data.groupBlurbs?.[g] ?? '', items: inCat.filter((s) => (s.group ?? '') === g) }));
    const slug = slugify(name);
    // `page` is the category's own page content (client field categoryPages: { plumbing: { title, lead, body: [...] } }); no content = no page.
    return { name, slug, groups, page: categoryPages && name ? (data.categoryPages?.[slug] ?? null) : null };
  });

  return {
    ...GENERIC,
    ...data,
    look,
    colors: { ...base.colors, ...(data.colors ?? {}) },
    fonts: { ...base.fonts, ...(data.fonts ?? {}) },
    cta: { ...GENERIC.cta, ...(data.cta ?? {}) },
    // areaLine: a plain sentence about where the business works ("Aiken, SC and the surrounding area"), for a client with no address or area list
    contact: { hoursShort: '', promise: '', areaLine: '', ...data.contact },
    hero: { proof: [], cards: [], formTitle: 'Tell us about your project', ...(data.hero ?? {}) },
    headings: Object.fromEntries(Object.entries(HEADINGS).map(([k, v]) => [k, { ...v, ...(data.headings?.[k] ?? {}) }])),
    intro: { ...INTRO, ...(data.intro ?? {}) },
    form: { ...FORM_OPTIONS, ...(data.form ?? {}) },
    about: { values: [], story: [], ...(data.about ?? {}) },
    services,
    serviceGroups,
    serviceCategories,
    projects,
    // How the business prices work: a method, never numbers unless the client supplies them. { lead, points: [{ title, text }] }
    pricing: data.pricing ?? null,
    // The person whose name is the brand (Signature look): { name, role, photo: [bank, n], alt? }. Absent = not shown.
    owner: data.owner ?? null,
    // One line in the owner's own words: { text, by }. Only ever something the client actually said.
    quote: data.quote ?? null,
    // Photos for the home page's arrangement of prints, as [bank, n]; empty = the default strip slots.
    gallery: data.gallery ?? [],
    // A photos-only Gallery page (only looks with `galleryPage` build it): { title, lead, topper?, sections: [{ title, photos }] }.
    // A photo is [bank, n] or { photo: [bank, n], alt }.
    photoPage: data.photoPage ?? null,
    // A "How we work" page about the business's way of working (only looks with `approachPage` build it):
    // { topper, title, lead, photo?, photoAlt?, intro: { title, paragraphs }, points?: { title, lead?, items: [{ title, text }] }, why?: { title, paragraphs } }
    approach: data.approach ?? null,
    // Sector pages (only looks with `sectorPages` build them): [{ slug?, title, summary, image: [bank, n], lead, body: [], points: [{ title, text }], reviews?: true }]
    sectors: (data.sectors ?? []).map((s) => ({ slug: slugify(s.slug ?? s.title), body: [], points: [], ...s })),
    // General look home page: a few customer phrases pulled from real reviews [{ title, text, by }] (text is an exact excerpt), and
    // an intro for the "who we are" block (`whoTitle`, `whoText`: paragraphs).
    praise: data.praise ?? [],
    whoText: data.whoText ?? [],
    whoTitle: data.whoTitle ?? 'Who we are',
    // Optional sections: an absent one is simply not rendered.
    stats: data.stats ?? [],
    statsJoin: data.statsJoin ?? '', // with exactly two stats: the phrase between them ("all focused on"), drawn as an arrow (Signature look)
    steps: data.steps ?? [],
    reviews: data.reviews ?? [],
    faqs: data.faqs ?? [],
    team: data.team ?? [],
    serviceArea: data.serviceArea ?? [],
    areaNotes: data.areaNotes ?? {}, // { 'Town': 'a real paragraph about working there' }
  };
}

// Which pages this client's site has. There is no Pricing page: nobody in this trade publishes prices.
// How the business prices work appears on the Process page when the client gives a `pricing` method.
// A `sparse` look (see looks/defaults.mjs) leaves out a Services or Process page the client has nothing to put on.
export function enabledPages(brand) {
  const sparse = !!LOOKS[brand.look]?.sparse;
  return [
    'home',
    // A look with category pages (Trade) has no separate Services page when the categories have their own pages: those ARE the services pages.
    (!sparse || brand.services.length) && !(LOOKS[brand.look]?.categoryPages && brand.serviceCategories.some((c) => c.page)) ? 'services' : null,
    brand.projects.length ? 'projects' : null,
    brand.approach && LOOKS[brand.look]?.approachPage ? 'how-we-work' : null,
    brand.photoPage && LOOKS[brand.look]?.galleryPage ? 'gallery' : null,
    !sparse || brand.steps.length || brand.pricing ? 'process' : null,
    brand.serviceArea.length ? 'service-area' : null,
    'about',
    'contact',
  ].filter(Boolean);
}

export const PAGE_LABELS = { home: 'Home', services: 'Services', projects: 'Projects', gallery: 'Gallery', 'how-we-work': 'How we work', process: 'Our process', 'service-area': 'Areas we serve', about: 'About', contact: 'Contact' };

// Every URL path the site builds, with the page kind and the item it shows (for detail pages).
// A path is '' for the home page, 'services', 'services/<slug>', ...
export function allRoutes(brand) {
  const routes = enabledPages(brand).map((key) => ({ path: key === 'home' ? '' : key, key }));
  for (const c of brand.serviceCategories) if (c.page) routes.push({ path: c.slug, key: 'category', slug: c.slug });
  for (const s of brand.services) if (s.body.length) routes.push({ path: s.path, key: 'service', slug: s.slug });
  if (LOOKS[brand.look]?.sectorPages) for (const s of brand.sectors) routes.push({ path: s.slug, key: 'sector', slug: s.slug });
  for (const p of brand.projects) routes.push({ path: `projects/${p.slug}`, key: 'project', slug: p.slug });
  return routes;
}
