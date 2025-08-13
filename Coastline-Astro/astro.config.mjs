import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://www.example.com', // TODO: replace with real domain
  output: 'static',
  experimental: {
    contentCollectionCache: true
  }
});
