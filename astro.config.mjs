import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jcvegab.dev',
  output: 'static',
  outDir: './out',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        return page !== 'https://jcvegab.dev/404/';
      },
      entryUrl: 'https://jcvegab.dev/sitemap.xml',
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    ssr: {
      noExternal: ['lodash'],
    },
  },
});
