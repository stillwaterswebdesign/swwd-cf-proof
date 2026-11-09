// The General look: what src/pages/[...slug].astro needs from a look (a Layout and one body per page kind).
// For a general contractor that works across sectors (commercial, residential, municipal, marine). Home, a Sector page per
// client `sectors` entry, the photos-only Gallery page, About and Contact. This site has no services, projects, process or
// service-area pages, so none of those are built.
export { default as Layout } from './Layout.astro';
export { default as Home } from './pages/Home.astro';
export { default as Sector } from './pages/Sector.astro';
export { default as Gallery } from './pages/PhotoPage.astro';
export { default as About } from './pages/About.astro';
export { default as Contact } from './pages/Contact.astro';
