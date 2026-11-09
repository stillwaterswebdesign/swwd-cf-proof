// Photo banks and default slots for every client.
//
// A client's originals live in clients/<client>/photos/<bank>/ (large, git-ignored). tools/optimize-photos.mjs
// turns every photo into a web-sized WebP at clients/<client>/web/<bank>/<n>.webp, where <n> is the 1-based
// position of the file in that bank folder when sorted by name.
//
// Content refers to a photo as [bank, n] (e.g. a project's `image: ['kitchens', 2]`). The page chrome (hero,
// headers, call-to-action background) uses the named SLOTS below, which a client can override in its own
// photos.config.mjs. A photo that does not exist yet renders a labeled placeholder that names its folder
// (see assets.ts), so a site builds, and can be judged, with zero photos.

export const COMPOSITE = 'composite-before-after';
export const COMPOSITE_PICKS = { before: ['before-after', 1], after: ['before-after', 2] };

// The folders a client gets (see clients/_template/photos/README.md). `label` and `alt` describe the photo
// that belongs there; `send` is how many to supply so there is a choice.
export const BANKS = {
  'hero-wide': { label: 'Hero, wide exterior', alt: 'Finished home exterior', send: 5 },
  'new-home-exteriors': { label: 'New home exteriors', alt: 'Exterior of a newly built home', send: 10 },
  'living-spaces': { label: 'Living spaces', alt: 'Living room in a newly built home', send: 8 },
  kitchens: { label: 'Kitchens', alt: 'Kitchen with custom cabinets and counters', send: 8 },
  'baths-and-suites': { label: 'Baths and suites', alt: 'Bathroom with tiled shower and vanity', send: 6 },
  'outdoor-living': { label: 'Porches, decks, patios', alt: 'Covered porch and deck', send: 6 },
  'framing-and-stages': { label: 'Framing and build stages', alt: 'Home under construction', send: 8 },
  'site-and-foundation': { label: 'Site work and foundations', alt: 'Foundation and site preparation', send: 4 },
  'additions-and-remodels': { label: 'Additions and remodels', alt: 'Home addition or remodel', send: 8 },
  'before-after': { label: 'Before and after (2 photos)', alt: 'Before and after of a renovated room', send: 2 },
  'owner-portrait': { label: 'Portrait of the owner', alt: 'Portrait of the builder', send: 2 },
  'crew-and-team': { label: 'Crew and team', alt: 'Builder and crew at work', send: 4 },
  'details-closeups': { label: 'Detail close-ups', alt: 'Close-up of lumber, tile and hardware', send: 6 },
  'plans-and-drawings': { label: 'Plans and drawings', alt: 'House plans on a work table', send: 3 },
  'land-and-neighborhood': { label: 'Land, lots and neighborhood', alt: 'Building lot and surroundings', send: 4 },
  // General contractor (the General look): the company logo and work by sector.
  logo: { label: 'Company logo (1 = full logo, 2 = round emblem)', alt: 'Company logo', send: 2 },
  'commercial-work': { label: 'Commercial projects', alt: 'Commercial project', send: 12 },
  'residential-work': { label: 'Residential projects', alt: 'Residential project', send: 12 },
  'public-work': { label: 'Municipal and public projects', alt: 'Municipal project', send: 12 },
  'marine-work': { label: 'Marine construction projects', alt: 'Marine construction project', send: 12 },
  // Service trades (the Trade look): plumbing and electrical.
  'plumber-at-work': { label: 'Plumber at work', alt: 'Plumber working on a pipe', send: 5 },
  'faucets-and-sinks': { label: 'Faucets, sinks, garbage disposals', alt: 'Kitchen sink and faucet', send: 5 },
  'toilets-and-baths': { label: 'Toilets and bathrooms', alt: 'Bathroom fixtures', send: 4 },
  'water-heaters': { label: 'Water heaters', alt: 'Water heater in a utility room', send: 4 },
  'pipes-and-repiping': { label: 'Pipes and re-piping', alt: 'Copper and plastic water pipes', send: 5 },
  'sewer-and-drain': { label: 'Sewer and drain work', alt: 'Sewer line work', send: 4 },
  'electrician-at-work': { label: 'Electrician at work', alt: 'Electrician working on wiring', send: 5 },
  'electrical-panels': { label: 'Electrical panels and breakers', alt: 'Electrical panel with circuit breakers', send: 4 },
  wiring: { label: 'Wiring', alt: 'Electrical wiring in a wall', send: 4 },
  'lighting-and-fans': { label: 'Lighting and ceiling fans', alt: 'Light fixture and ceiling fan', send: 5 },
  'outlets-and-switches': { label: 'Outlets and switches', alt: 'Electrical outlet and light switch', send: 4 },
  'pool-and-spa': { label: 'Pool and spa', alt: 'Backyard pool and spa', send: 3 },
  'home-exteriors': { label: 'Home exteriors', alt: 'Exterior of a home', send: 4 },
};

// Named slots used by the page chrome. Value: [bank, n].
export const SLOTS = {
  hero: ['hero-wide', 1],
  'header-bg': ['details-closeups', 1],
  'cta-bg': ['details-closeups', 2],
  'about-story': ['crew-and-team', 1],
  'area-bg': ['land-and-neighborhood', 1],
  'strip-1': ['new-home-exteriors', 1],
  'strip-2': ['kitchens', 1],
  'strip-3': ['living-spaces', 1],
  'strip-4': ['outdoor-living', 1],
};

// Alt text for the named slots.
export const ALTS = {
  hero: 'Finished home exterior',
  'header-bg': 'Close-up of lumber and framing',
  'cta-bg': 'Tools and plans on a work table',
  'about-story': 'The crew at work on a house',
  'area-bg': 'Building lot and surroundings',
  'strip-1': 'Newly built home',
  'strip-2': 'Finished kitchen',
  'strip-3': 'Finished living room',
  'strip-4': 'Covered porch',
};
