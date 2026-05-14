# Sagar Haremanik — Portfolio

A static portfolio site with three interaction variations (Subtle / Kinetic / Playful).
No build step — pure HTML, JS, and CSS. Babel-in-browser transpiles JSX at runtime.

## Local preview

Just open `index.html` in a browser, or run any static server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Structure

```
index.html       # entry point (variation switcher + tweaks panel)
Portfolio.html   # duplicate for any tooling that references it
src/
  base.css       # shared design tokens & base styles
  data.js        # all resume content (single source of truth)
  subtle.jsx     # editorial variation
  kinetic.jsx    # scroll-reveal + animated variation (default)
  playful.jsx    # cursor follower + tilt cards variation
vercel.json      # caching headers
```

## Deploy to Vercel

### Option A — drag & drop (no CLI)
1. Zip the project folder.
2. Go to https://vercel.com/new
3. Drag the zip in. Vercel detects it as a static site automatically.
4. Click **Deploy**. Done.

### Option B — Vercel CLI
```bash
npm i -g vercel
vercel        # first run: link / create project
vercel --prod # deploy production
```

### Option C — GitHub
1. Push this folder to a GitHub repo.
2. On vercel.com, click **Add New → Project**, import the repo.
3. Framework preset: **Other** (no build command, output directory: `./`).
4. Deploy.

## Updating content

All copy lives in `src/data.js` — edit there and refresh.
