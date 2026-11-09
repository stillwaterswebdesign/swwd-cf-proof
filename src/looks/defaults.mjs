// Per-look defaults: the palette and fonts a client gets when it does not set its own, plus the
// look's display name. Plain data (no Astro) so astro.config.mjs and the client files can import it.
// Every client may override any color or font in its own brand.mjs; a look only supplies the starting point.

export const LOOKS = {
  // Rugged and bold: condensed headings, rounded cards, slate + safety orange + hard-hat yellow.
  ridge: {
    label: 'Ridge',
    colors: {
      primary: '#24323f', // nav, headings, buttons
      accent: '#e8710a', // icons, rules, decoration (not for text on white)
      cta: '#f5b921', // call-to-action buttons
      sand: '#ece6da', // warm section background
      bg: '#f6f5f2', // page background
      ink: '#151d26', // headings / dark text
      body: '#4a5560', // body copy
    },
    fonts: {
      heading: 'Barlow Condensed',
      headingFallback: "'Arial Narrow', system-ui, sans-serif",
      body: 'Inter',
      googleUrl: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600&display=swap',
    },
  },
  // Quiet and refined: serif headings, square corners, hairline rules, deep green + brass on cream.
  studio: {
    label: 'Studio',
    colors: {
      primary: '#1f3a2e',
      accent: '#a8814a',
      cta: '#1f3a2e', // studio buttons are solid primary; the accent is used for rules and numerals
      sand: '#efe9dd',
      bg: '#faf8f4',
      ink: '#17211c',
      body: '#4f5a54',
    },
    fonts: {
      heading: 'Fraunces',
      headingFallback: "Georgia, 'Times New Roman', serif",
      body: 'DM Sans',
      googleUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=DM+Sans:wght@400;500;600&display=swap',
    },
  },
  // One person's name on the door: italic serif, mounted photographs, big plain statements, warm paper and walnut.
  // `sparse`: built for a client with little to say, so it only gets the pages it has real content for
  // (no empty Services or Process page). Made for a solo builder whose name is the brand.
  signature: {
    label: 'Signature',
    sparse: true,
    galleryPage: true, // supports a photos-only Gallery page (client field `photoPage`)
    approachPage: true, // supports a "How we work" page (client field `approach`)
    colors: {
      primary: '#2b2118',
      accent: '#9a4a2b',
      cta: '#2b2118', // buttons are solid primary; the accent is for rules, numerals and italics
      sand: '#e9e1d2',
      bg: '#f5f0e6',
      ink: '#1e1a15',
      body: '#4c443a',
    },
    fonts: {
      heading: 'Newsreader',
      headingFallback: "Georgia, 'Times New Roman', serif",
      body: 'Hanken Grotesk',
      googleUrl: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Hanken+Grotesk:wght@400;500;600&display=swap',
    },
  },
  // A service trade with a long list of services and no photos (plumbing, electrical ...): the services are the content.
  // Photo-free on purpose (nothing here calls img(), so a client with no photos can still publish), a Services menu that
  // drops down into the client's service groups, and services shown as grouped lists, not photo cards.
  // Pairs with the client fields `category` / `group` on each service (see define-client.mjs serviceCategories).
  trade: {
    label: 'Trade',
    sparse: true, // no empty Process page; a Services page only when the client lists services
    categoryPages: true, // each service category (Plumbing, Electrical) can have its own page, with its services' pages nested under it
    colors: {
      primary: '#173452', // header, hero, buttons
      accent: '#1f6fb5', // rules, numerals, icons (not for small text on white)
      cta: '#f2b705', // call-to-action buttons
      sand: '#e8eef4', // cool section background
      bg: '#f6f8fa', // page background
      ink: '#0f1c2b', // headings / dark text
      body: '#43505c', // body copy
    },
    fonts: {
      heading: 'Barlow Condensed',
      headingFallback: "'Arial Narrow', system-ui, sans-serif",
      body: 'Inter',
      googleUrl: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600&display=swap',
    },
  },
  // A general contractor that works across sectors (commercial, residential, municipal), not one trade and not one-home-at-a-time:
  // a clear, businesslike layout that leads with the logo and the sectors served. Photo-forward but photo-tolerant (the work is
  // shown from whatever the client has; gallery sections list every photo found in a bank, see assets.ts bankPhotos).
  // `sectorPages`: each client `sectors` entry gets its own page (/commercial/, /residential/ ...).
  general: {
    label: 'General',
    sparse: true,
    sectorPages: true,
    galleryPage: true,
    colors: {
      primary: '#0b1e3f', // navy: header strip, hero, footer
      accent: '#881f30', // burgundy: rules, numerals, links on white
      cta: '#881f30', // buttons
      onCta: '#ffffff', // text on buttons
      ctaOnDark: '#e3d392', // gold: labels and rules on navy
      sand: '#e3e5e9', // silver tint section background
      bg: '#f3f4f6', // page background
      ink: '#0a1630', // headings
      body: '#3d4859', // body copy
    },
    fonts: {
      heading: 'Montserrat',
      headingFallback: "'Arial Black', Arial, system-ui, sans-serif",
      body: 'Source Sans 3',
      googleUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Source+Sans+3:wght@400;600;700&display=swap',
    },
  },
};

export const LOOK_NAMES = Object.keys(LOOKS);
