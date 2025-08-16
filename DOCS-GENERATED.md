Do not commit generated build files

This repository contains an Astro site located at `astro-website/`.

- Source files and templates: `astro-website/src/`, `astro-website/public/`.
- Build output (generated): `astro-website/dist/` — this directory is produced by running `npm run build` inside `astro-website/` and must not be committed into the repository root.

Guidelines:

1. To build the site locally:

```powershell
cd astro-website
npm ci
npm run build
```

2. To preview the built output locally:

```powershell
pushd astro-website/dist
python -m http.server 4321 --bind 127.0.0.1
# or: npx http-server . -p 4321 -a 127.0.0.1
```

3. If you need to force a Pages publication for testing, prefer pushing a repo change and using the Pages dashboard or Cloudflare API to trigger a rebuild rather than copying generated files into the repo root.

4. If a generated file was accidentally committed, create a backup branch or use the commit history to recover it; then remove the generated files from the branch and push the cleanup.

If you want me to add a short note to `README.md` instead, tell me and I will update that file instead of adding this separate doc.
