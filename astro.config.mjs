import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: 'https://vikingdevtj.com/',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/antonio-herrera-cv'),
    }),
  ],
  adapter: netlify({
    devFeatures: {
      edgeFunctions: false,
    },
  }),
});