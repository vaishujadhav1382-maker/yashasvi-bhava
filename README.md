# Yashasvi Bhav – React (Vite) Port

This is a React (Vite) conversion of the static website found in the workspace root. The look and behavior are kept the same, with assets moved to `public/` and the original interactivity implemented via React effects.

## Getting Started

- Install dependencies
  - `npm install`

- Run the dev server
  - `npm run dev`
  - Open http://localhost:5173

- Build for production
  - `npm run build`
  - Preview the build: `npm run preview`

## Project Structure

- `index.html`
  - Head metadata and external CSS (Font Awesome, Swiper CSS) and favicon references
- `src/App.jsx`
  - Main page markup in JSX, mirroring the original `index.html`
  - Interactivity migrated from `script.js` to React `useEffect` (menu toggle, fade-in on scroll, smooth scroll, scrollspy, form submission simulation)
- `src/style.css`
  - Original `style.css` content, imported globally from `src/main.jsx`
- `public/`
  - Static assets (images, video) that are referenced directly by path

## Assets (Images/Video)

Images must be placed under `public/` so they can be referenced directly in the JSX. The app expects these paths:

- `/yb logo.jpg` (already copied)
- `/demo.mp4` (already copied)
- `/img/` folder for gallery images. Add the following files to match the JSX references:
  - `public/img/busns1.jpg`
  - `public/img/poster2.png`
  - `public/img/p1.jpeg`
  - `public/img/poster9.jpeg`
  - `public/img/busns3.jpeg`
  - `public/img/poster6.jpg`

If your filenames differ, either rename them to the above or update the `src` attributes in `src/App.jsx` accordingly.

## Notes

- Font Awesome and Swiper CSS are linked via CDN in `index.html` just like the original site. If you do not need Swiper, you can remove that `<link>`.
- Routing is not used; the original site is a single page with section anchors. If you later want multi-page routing, install React Router and split components into routes.

## Deploy

- Any static host that serves the `dist/` folder works (Netlify, Vercel, GitHub Pages, etc.)
- Typical flow:
  1. `npm run build`
  2. Deploy the contents of `dist/`
