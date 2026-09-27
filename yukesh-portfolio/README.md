# Yukesh Kumar R — Portfolio

A production-ready personal portfolio built with React, Vite, Tailwind CSS, and GSAP.

## Stack

- React 18 + Vite
- Tailwind CSS
- GSAP (hero reveal animation)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> /dist
npm run preview   # preview the production build locally
```

## Editing content

Almost everything on the site — copy, links, education, experience, skills, and
projects — lives in one file:

```
src/data/portfolio.js
```

Open it and update the fields marked `CONFIGURE:`:

| What | Where |
|---|---|
| GitHub profile URL | `profile.github` |
| Resume PDF | drop the file at `public/resume.pdf` (path already wired up) |
| Profile portrait | add an image to `src/assets/images` and set `about.portraitSrc` |
| Project screenshots | add images to `src/assets/images` and set each project's `previewSrc` |
| AI Interview Trainer repo link | `projects[1].repoUrl` |

No other file needs to change for a routine content update.

## Social preview image

Replace `public/og-image.jpg` with a real 1200×630 preview image, and update the
`canonical` / `og:url` values in `index.html` once the site has a permanent domain.

## Deploying

### GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Vercel

1. Import the GitHub repository at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Vite** (auto-detected).
3. Build command: `npm run build` — output directory: `dist` (defaults are correct).
4. Deploy. `vercel.json` is already included so client-side routes (if any are
   added later) won't 404 on refresh.

No environment variables are required for the current build.

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: all entrance/hover animations are skipped
  and content renders in its final state.
- Custom cursor and pointer-reactive glow are disabled on touch devices and
  when reduced motion is requested.
- Images are lazy-loaded; add real project screenshots to keep this working
  as intended.
- Keyboard focus is visible everywhere via `:focus-visible`; a skip-to-content
  link is included for screen reader and keyboard users.
