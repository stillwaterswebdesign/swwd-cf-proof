import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The one place the live address is set: canonical links, the sitemap, robots.txt, social previews and the structured data all read it.
// (If the site is ever served from a different address, change it here and nowhere else.)
const SITE_URL = 'https://jdgaskinsconstruction.com';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  vite: {
    resolve: {
      alias: {
        // this business's data and photos
        '@client': path.join(root, 'client'),
        // the design (the General look)
        '@look': path.join(root, 'src', 'looks', 'general'),
      },
    },
  },
});
