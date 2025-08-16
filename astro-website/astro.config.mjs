// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://coastlinesprayfoam.com',
  output: 'static',
  // Use the local `public` directory. We copied the repo-root static files
  // into `astro-website/public/` so the dev server can serve the live-site
  // files without pointing `publicDir` at the repo root (which causes
  // outDir/publicDir conflicts).
  publicDir: 'public',
  build: {
    assets: 'assets'
  }
});
