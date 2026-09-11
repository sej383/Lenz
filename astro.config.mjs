// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.lenzphotos.com',
  integrations: [sitemap()],
  vite: {
    build: {
      // Vite inlines any imported asset under 4KB as a base64 data: URI by
      // default. One of @fontsource-variable/manrope's unicode-range font
      // subsets (Cyrillic Extended — unused on this all-English site, but
      // still a real declared @font-face) is small enough to trip that
      // threshold, which produced a `src: url(data:font/woff2;base64,...)`
      // rule our CSP's `font-src 'self'` correctly blocks. Disabling
      // inlining entirely keeps every font subset (present and future,
      // Manrope or Inter) served as a real same-origin file instead of a
      // data URI, so font-src never needs weakening to allow `data:`.
      assetsInlineLimit: 0,
    },
  },
});
