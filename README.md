# Möbel Creative Website

A creative, static marketing site for Möbel, built with Eleventy (11ty) and Vite. The project uses Pug for templates, Sass for styling, and Vite plugins for PWA support and GLSL shader imports.

## Overview
- Static site generation with Eleventy
- Asset bundling and dev server via Vite
- Pug templates for HTML
- Sass for styling
- PWA support (service worker + asset caching)
- GLSL imports for shader workflows

## Tech Stack
- Eleventy v3
- Vite (via `@11ty/eleventy-plugin-vite`)
- Pug (`@11ty/eleventy-plugin-pug`)
- Sass
- TypeScript (available for tooling)
- Vite PWA (`vite-plugin-pwa`)
- GLSL imports (`vite-plugin-glslify`)

## Requirements
- Node.js (LTS recommended)
- npm

## Getting Started
Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

The site is served at `http://localhost:3000` by default.

Build for production:

```sh
npm run build
```

Clean the output directory:

```sh
npm run clean
```

## Scripts
- `npm run dev`: Clean and serve Eleventy with incremental builds
- `npm run build`: Clean and build the site for production
- `npm run clean`: Remove the `_site` output directory

## Project Structure
```
.
├── public/             # Static assets copied as-is
├── src/
│   ├── app/            # Client-side JS (Vite root)
│   ├── fonts/          # Font files
│   ├── styles/         # Sass and CSS
│   └── views/          # Pug templates (Eleventy input)
│       ├── _data/      # Eleventy data files
│       ├── _includes/  # Pug includes and partials
│       └── index.pug   # Main entry template
├── _site/              # Build output (generated)
└── eleventy.config.js  # Eleventy + Vite configuration
```

## Configuration Notes
- Eleventy input directory: `src/views`
- Output directory: `_site`
- Pug is the HTML template engine
- Vite root: `src`
- Public assets: `public`
- Server runs on port `3000`
- HTML output is minified in production builds

### Vite Aliases
- `@styles` → `src/styles`
- `@app` → `src/app`
- `@utils` → `src/app/utils`
- `@components` → `src/app/components`
- `@shaders` → `src/app/shaders`
- `@classes` → `src/app/classes`
- `@animations` → `src/app/animations`
- `@pages` → `src/app/pages`
- `@canvas` → `src/app/components/Canvas`

## Deployment
The production build outputs static files to `_site`. Deploy the contents of `_site` to any static hosting provider.
