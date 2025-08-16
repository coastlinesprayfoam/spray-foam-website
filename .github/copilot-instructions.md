# AI Coding Agent Instructions for Coastline Spray Foam Website

## Big Picture Architecture
- This is a static business website for Coastline Spray Foam, built with HTML, CSS (Bootstrap 5 + custom), and minimal JS. All main pages are in the project root (`index.html`, `about.html`, etc.).
- The `assets/` folder contains all CSS, JS, and images. Navigation and gallery logic are in `assets/js/`. Styling is centralized in `assets/css/style.css`.
- There is an `astro-website/` subproject using Astro for advanced layouts and blog features. See its own README for build/dev commands.

## Developer Workflows
- **Local Development:**
  - Serve static site: `python -m http.server 8000` (from `spray-foam-website` folder)
  - Astro dev: `npm install && npm run dev` (from `astro-website`)
- **Deployment:**
  - GitHub Pages: Enable in repo settings, set branch to `main` or `static`.
  - Custom domain: Add CNAME file, configure DNS, enable HTTPS.
- **Branching:**
  - Main branch is for production. `static` branch is for static site deployments.

## Project-Specific Conventions
- Navigation is unified via `navigation-template.html` and `assets/js/unified-navigation.js`. Do not duplicate nav markup; update these sources for global changes.
- Contact form has been removed; all contact links use `mailto:` or `tel:`.
- All business info (phone, email, service areas) is hardcoded in multiple pages and navigation.
- SEO: Meta tags, Open Graph, and Schema.org structured data are present in each HTML file. Geo-targeting is used for Florida.
- Accessibility: WCAG compliance, skip links, ARIA labels, semantic HTML, and color contrast are enforced.
- Images: Optimized and lazy-loaded. Gallery uses `gallery.js` for filtering and lightbox.
- Legal pages: `privacy-policy.html`, `terms-of-service.html`, `warranty.html`.

## Integration Points & External Dependencies
- Bootstrap 5 via CDN.
- Google Fonts (Inter).
- Service worker for caching (`sw.js`).
- Astro subproject uses npm dependencies (see `astro-website/package.json`).

## Examples & Patterns
- To add a new page, copy the structure of an existing HTML file and update navigation via the template/script.
- To update styles, use `assets/css/style.css` and follow the color/typography system described in README.
- For Astro pages, use the layout in `astro-website/src/layouts/Layout.astro` and run Astro build commands.

## Key Files & Directories
- `index.html`, `about.html`, `services.html`, etc.: Main static pages
- `assets/css/style.css`: Centralized styles
- `assets/js/unified-navigation.js`, `navigation-template.html`: Navigation system
- `gallery.html`, `assets/js/gallery.js`: Gallery logic
- `astro-website/`: Astro subproject for advanced features

---
For any unclear conventions or missing documentation, ask the user for clarification or examples from the codebase before making changes.
