// REAL prospect, General look: J.D. Gaskins Construction, Inc., a general contractor in Aiken, SC working across commercial,
// residential, and municipal projects.
// Facts come from what the operator was given: the business description (specialties, established October 2008, Dean Gaskins'
// Chamber of Commerce membership and school), the address and phone, and four customer reviews quoted as written: Rover, George G and
// Perry Luvr (Google) and Felecia F. (Yelp, January 14, 2026, an updated review). The Google review from "apple pear" was replaced by the
// Yelp review on 2026-11-09 at the operator's request. What the reviews show (new homes built for residents) is the only basis for saying
// the business builds new homes.
// Tone, from the operator's brief: professional but warm; eager to hear about new projects and to work out how to make them
// happen within budget; honest about keeping the customer updated on every part of the project; engaged, not just waiting to be done.
// Held back until the business confirms them: the list of public-sector bids found on a bid site (a bid is not a completed
// project), any license or insurance claim (only a reviewer's words, quoted), prices, hours, a service area
// beyond Aiken, and whether Dean is the owner.
// 2026-11-06: new logo (yellow roof, navy lettering) and the site's colors taken from it; all photos replaced with the ones the owner
// sent through the upload page; new address; a Marine Construction page (the owner says the company is skilled in all marine construction,
// from fishing piers to marinas, and the photos show docks, piers, boardwalks, and gangways).
// House style: ALWAYS the Oxford comma ("commercial, residential, and municipal").
import { defineClient } from '../src/define-client.mjs';

export const brand = defineClient({
  look: 'general',
  // From the new logo: the yellow of the roof (#fcb040 to #fecc5a), the navy of the lettering (#213262), and a white page.
  colors: {
    primary: '#213262', // navy: header strip, hero shade, footer
    accent: '#213262', // navy: small labels and links on white (the rules beside them are yellow)
    cta: '#fcb040', // yellow: buttons
    onCta: '#213262', // navy text on the yellow buttons
    ctaOnDark: '#fecc5a', // lighter yellow: labels on navy
    sand: '#eef1f7', // pale blue-grey section background
    bg: '#ffffff', // page background
    ink: '#1a2754', // headings
    body: '#3a4666', // body copy
  },
  fictional: false,

  name: 'J.D. Gaskins Construction, Inc.',
  shortName: 'J.D. Gaskins',
  logoSub: 'Construction, Inc.',
  tagline: 'Vision, integrity, and the extra mile.',
  blurb: 'J.D. Gaskins Construction, Inc. is a general contractor in Aiken, SC, building commercial, residential, and municipal projects, and marine construction from fishing piers to marinas. Established in 2008.',
  homeTitle: 'J.D. Gaskins Construction | General contractor in Aiken, SC',
  // The description Google may show under the home page's title (about 150 characters).
  metaDescription: 'General contractor in Aiken, SC building commercial, residential, municipal, and marine projects since 2008. Call (803) 641-4068.',
  quoteLabel: 'Request a quote',

  contact: {
    phone: '(803) 641-4068',
    phoneHref: 'tel:+18036414068',
    email: 'construct@jdgaskins.com',
    address: ['2104 Silver Bluff Rd', 'Aiken, SC 29803'],
    hours: [],
    areaLine: 'Based in Aiken, SC',
  },

  // The headline is drawn from what customers say about working with J.D.: great vision for projects, honest with integrity,
  // and "goes the extra distance".
  hero: {
    image: ['hero-wide', 1],
    topper: 'Aiken, SC · Since 2008',
    headline: 'Vision, integrity, and the extra mile.',
    lead: 'Commercial, residential, municipal, and marine construction in Aiken, SC. Tell us what you are picturing, and we will work with you to make it real, with honest answers and regular updates along the way.',
    formTitle: 'Send us a message',
  },

  whoTitle: 'Bringing your vision to life',
  whoText: [
    'J.D. Gaskins Construction is a general contractor based in Aiken, SC. We work with government agencies, businesses, and residents, and we excel at bringing your vision to life on time and within budget.',
    'We start by sitting down with you, picturing the possibilities, and figuring out how to bring them to life within your budget. From there, we stay in it with you, and we keep you updated on where things stand every step of the way.',
  ],
  stats: [
    { value: 'Since 2008', label: 'Our business started in October of 2008 and we\'ve been serving the residents of the Aiken area ever since' },
  ],

  help: {
    topper: 'How we can help',
    title: 'New builds, repairs, and upgrades.',
    lead: 'Whether you are starting from the ground up or improving what you already have, we are glad to be part of it.',
    items: [
      { title: 'New builds', text: 'Starting from scratch? Let us help you picture it, plan it, and build it from the ground up, for your business, your family, or your community.' },
      { title: 'Repairs', text: 'When something has worn out or been damaged, we will tell you plainly what it needs and get it working again.' },
      { title: 'Upgrades and expansions', text: 'Need more room, or want to give an older space new life? We will help you see what is possible and what it will take.' },
    ],
  },

  ways: {
    topper: 'How we work with you',
    title: 'You will always know where things stand',
    lead: 'We are not a crew waiting for the job to be done. We are in it with you.',
    items: [
      { title: 'We start by listening', text: 'Tell us what you are picturing. We will ask questions, share ideas, and help you figure out how to make it happen within your budget.' },
      { title: 'Honest, open communication', text: 'We want you to know what is going on in every part of your project, from the schedule to the costs to the surprises, and we will keep you updated along the way.' },
      { title: 'Excited to get started', text: 'We care how your project turns out. A new project is something we look forward to, and we bring that energy to the job site.' },
    ],
  },

  headings: {
    story: { topper: 'Who we are', title: 'About us' },
    gallery: { topper: 'Our work', title: 'Recent work' },
    reviews: { topper: 'Customer reviews', title: 'What customers say' },
    praise: { topper: 'In their words', title: 'What customers say about working with J.D.' },
    contact: { topper: 'Get in touch', title: 'Let’s talk about your project', lead: 'Call us, or send a message and we will be in touch.' },
  },
  intro: {
    about: '',
    contact: 'Planning something new? We would love to hear about it.',
  },
  cta: { title: 'Have something in mind? Let’s talk.', text: 'Tell us what you are picturing. We would love to hear about it, and we will be honest about what it takes.' },

  // The sectors. Each gets its own page (/commercial/ ...) and a card on the home page.
  // `workBank` is the photo folder whose photos show on that page and on the home strip.
  sectors: [
    {
      title: 'Commercial',
      summary: 'New construction, repairs, upgrades, and expansions for businesses and their workplaces.',
      image: ['commercial-work', 1],
      imageAlt: 'An open-air event pavilion built by J.D. Gaskins Construction',
      workBank: 'commercial-work',
      // the featured photo (no. 1, the open-air pavilion) is not repeated; these are three other commercial projects: the red pavilion, the metal building with a covered patio, the white barn
      stripPhotos: [['commercial-work', 4], ['commercial-work', 6], ['commercial-work', 7]],
      lead: 'When it comes to your commercial property, we would love to help you build it, repair it, upgrade it, or expand it.',
      body: [
        'When you need a new building, more room, a repair, or a fresh start for an older space, J.D. Gaskins Construction is a general contractor you can call for your commercial construction needs.',
        'We like to start by listening: what you do, how your space works today, and what you wish it could do. Then we work with you to figure out how to get there within your budget, and we keep you in the loop on every part of the project along the way.',
      ],
      points: [
        { title: 'New construction', text: 'A new building, planned with you and built from the ground up.' },
        { title: 'Repairs', text: 'We will tell you plainly what needs fixing and what it will take.' },
        { title: 'Upgrades', text: 'Bring an older workplace up to date.' },
        { title: 'Expansions', text: 'More room for your team, your customers, and your plans.' },
      ],
    },
    {
      title: 'Residential',
      summary: 'Great homes, built with care, plus additions, repairs, and upgrades.',
      image: ['residential-work', 1],
      imageAlt: 'A finished farmhouse-style home built by J.D. Gaskins Construction',
      workBank: 'residential-work',
      lead: 'We build great homes, and we take pride in getting the details right, from the first foundation to the final walk-through.',
      body: [
        'J.D. Gaskins Construction builds residential homes, and we are excited about every one. We care about the choices that matter in the long run, and we want the people who live in these homes to be proud of them for years to come.',
        'We also work with residents to expand, repair, and upgrade existing homes. Whatever the project, we are honest about what it takes, and we keep everyone informed on where things stand, good news or bad.',
      ],
      points: [
        { title: 'New homes', text: 'Quality homes, built with care from the ground up.' },
        { title: 'Additions and expansions', text: 'More space for the way people live.' },
        { title: 'Repairs', text: 'Honest answers about what needs fixing.' },
        { title: 'Upgrades and renovations', text: 'New life for an existing home.' },
      ],
      // the featured photo (no. 1, the farmhouse) is not repeated; under "Residential work": the blue-roof home, the white kitchen, and the townhomes
      stripPhotos: [['residential-work', 2], ['residential-work', 3], ['residential-work', 21]],
    },
    {
      title: 'Municipal',
      summary: 'Work with government agencies and public facilities.',
      image: ['public-work', 2],
      imageAlt: 'A small public building with a new concrete walkway and accessible parking',
      workBank: 'public-work',
      // the folder holds only three photos: the bridge with the crew, and two of the same building (the featured one is one of them). Showing the other one would repeat that building, so this page has no photo strip.
      stripPhotos: [],
      lead: 'We work with many government agencies, and clear, open communication matters to us on every project.',
      body: [
        'Public projects come with their own requirements, schedules, and paperwork. J.D. Gaskins Construction works with many government agencies, and we believe the people we work for should always know where a project stands.',
        'If you represent an agency with a facility to build, expand, repair, or upgrade, we would love to hear about it, learn what you need, and work out how to deliver it within your budget.',
      ],
    },
    {
      title: 'Marine Construction',
      summary: 'Fishing piers, docks, boardwalks, and marinas, built on the water.',
      image: ['marine-work', 1],
      imageAlt: 'A finished dock with railings stretching out over the water, built by J.D. Gaskins Construction',
      workBank: 'marine-work',
      // the featured photo (no. 1, the railed boardwalk) is not repeated; these are three other marine projects: a finished dock, an aluminum gangway, and a concrete boat-ramp pour
      stripPhotos: [['marine-work', 2], ['marine-work', 14], ['marine-work', 16]],
      lead: 'From fishing piers to marinas, we build on the water. We are skilled in marine construction of every kind, and we bring the same honest communication to it that we bring to every project.',
      body: [
        'Building over and beside the water takes experience, the right equipment, and careful planning. J.D. Gaskins Construction is skilled in marine construction of every kind, from fishing piers to marinas.',
        'We work with property owners, businesses, and public agencies to plan and build docks, piers, boardwalks, and marina facilities, and to repair or rebuild the ones they already have. As on every project, we start by listening, we work out how to do it within your budget, and we keep you updated on where things stand.',
      ],
      pointsTopper: 'Marine work',
      pointsTitle: 'What we build on the water',
      points: [
        { title: 'Fishing piers', text: 'Piers built for people to fish from and enjoy the water.' },
        { title: 'Docks and floating docks', text: 'Fixed and floating docks, with the pilings, decking, and gangways that go with them.' },
        { title: 'Boardwalks and walkways', text: 'New boardwalks over marsh and shoreline, and rebuilds of worn ones.' },
        { title: 'Marinas', text: 'Docks and facilities for marinas, planned and built with you.' },
        { title: 'Repairs and rebuilds', text: 'When a marine structure is worn or damaged, we will tell you plainly what it needs.' },
      ],
      stripTitle: 'Marine work',
    },
  ],

  // Exact excerpts from real customer reviews (Google and Yelp), each shown on the home page with the reviewer's name (`by`) as it appears on the
  // review site. The headings are short labels for what the quote says.
  praise: [
    { title: 'Experienced, honest, and reliable', text: 'Dean is truly an experienced, honest and reliable contractor.', by: 'Felecia F.' },
    { title: 'Outstanding professionalism', text: 'I trust JD Gaskins group because so far I have seen respectable decisions, outstanding professionalism and insight for what I need.', by: 'George G' },
    { title: 'Knowledgeable and competent', text: 'So far we\u2019ve found JD to be knowledgeable and competent for the most challenging of contracting projects.', by: 'Perry Luvr' },
  ],
  reviews: [
    {
      name: 'Rover',
      text: 'We call JD a rare find. He stays busy, always working many jobs and crews. … our new house is, to us, luxurious and futuristic-like. His teams are many and never once did they give me any problems.',
    },
    {
      name: 'Felecia F.',
      source: 'Yelp review',
      text: 'Dean is truly an experienced, honest and reliable contractor. He’s building our approximately 3,150 sq. ft. 2-story home and the cost is less than others, but the customizations are way better, not just another cookie cutter house. They will also handle a French drain for my cousin’s home in the county later. Quality is the key here, and JD Gaskins is a top mover in the business. You do NOT find his caliber of contractors out there, I know from my own lifetime of using contractors, he’s a rare find.',
    },
    {
      name: 'George G',
      text: 'I trust JD Gaskins group because so far I have seen respectable decisions, outstanding professionalism and insight for what I need. He will use the better options of components, and I don’t have to doubt his word.',
    },
    {
      name: 'Perry Luvr',
      text: 'So far we’ve found JD to be knowledgeable and competent for the most challenging of contracting projects. Most things in life are hit or miss or problematic. JD Gaskins I will entrust our new build with. He will keep things in line surely with his learned experiences in the past.',
    },
  ],

  about: {
    sectorsTitle: 'What we build',
    story: [
      'J.D. Gaskins Construction, Inc. is a general contractor based in Aiken, SC. Our business started in October of 2008.',
      'We specialize in commercial, residential, and municipal projects, working with government agencies, businesses, and residents to build, expand, repair, and upgrade their workplaces and homes. We are also skilled in marine construction of every kind, from fishing piers to marinas. We are happiest when we are digging into something new, and we love the moment a customer’s idea starts to look possible.',
      'We believe in honest, open communication. We want you to know what is happening on your project at every stage, and we will keep you updated on its status from the first conversation to the last day on site.',
      'Dean Gaskins is a community-involved member of the Chamber of Commerce in Aiken and grew up in the Aiken area.',
    ],
  },

  // The gallery page: every photo from the folders below, in one run (no grouping shown). Photos live in clients/jd-gaskins-construction/photos/<folder>/.
  photoPage: {
    topper: 'Our work',
    title: 'Our work',
    navLabel: 'Our work',
    lead: 'A look at our residential, commercial, municipal, and marine work.',
    // one section, in this order: residential, commercial, municipal, marine photos (no grouping shown)
    sections: [
      { banks: ['residential-work', 'commercial-work', 'public-work', 'marine-work'], alt: 'Work by J.D. Gaskins Construction' },
    ],
  },

  // A plain contact form: name, phone, email, a message.
  form: { simple: true, messageLabel: 'Please describe your project', submitLabel: 'Send message' },
});
