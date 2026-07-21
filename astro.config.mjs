import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jcvegab.dev',
  output: 'static',
  outDir: './out',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
