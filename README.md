# Möbel — Website

A creative website for Möbel, a MillerKnoll dealer based in Quebec. Built with Eleventy and Vite, featuring Pug templating, SCSS styling, GLSL shader support, and PWA capabilities.

[See Live](https://mobel-website.vercel.app/)

## Pages

### Home
A hero gallery section with product imagery, a brand showcase highlighting the MillerKnoll partnership, a product category slider, and a contact section. Assets are injected at build time via a JSON data file and rendered through Pug loops.

### Products
A filterable product catalogue organized by category and brand. Products and metadata are driven by the central `assets.json` data source.

### About
A brand story section presenting Möbel's positioning as a curated MillerKnoll experience for businesses and homes across Quebec.

## Tech

| Tool | Role |
|---|---|
| [Eleventy (11ty)](https://www.11ty.dev/) | Static site generator |
| [Vite](https://vitejs.dev/) | Asset bundling via `@11ty/eleventy-plugin-vite` |
| [Pug](https://pugjs.org/) | HTML templating engine |
| [Sass](https://sass-lang.com/) | CSS preprocessor |
| [vite-plugin-glslify](https://github.com/glslify/glslify) | GLSL shader imports |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | Progressive Web App support |
| [include-media](https://eduardoboucas.github.io/include-media/) | SCSS breakpoint mixins |
| [FontFaceObserver](https://fontfaceobserver.com/) | Font loading detection |
| Vanilla JS (ESM) | No framework — native ES modules |

## Structure

```
mobel-website/
├── src/
│   ├── app/
│   │   └── index.js                  # JS entry point
│   ├── fonts/                        # Antipol Extended, Montreal (woff/woff2)
│   ├── styles/
│   │   ├── base/                     # Reset, fonts, base styles
│   │   ├── components/               # Preloader, contact
│   │   ├── layout/                   # Header, footer
│   │   ├── pages/                    # Per-page styles (home, products, about)
│   │   ├── shared/                   # Typography, buttons, page transitions
│   │   └── utils/                    # Variables, mixins, functions, responsive
│   └── views/
│       ├── _data/
│       │   └── assets.json           # Centralized content & asset registry
│       ├── _includes/
│       │   ├── layouts/              # home.pug, products.pug, about.pug
│       │   └── partials/             # head, header, footer, preloader, contact
│       └── index.pug                 # Single entry template
├── public/                           # Static assets (passthrough copy)
├── eleventy.config.js                # Eleventy + Vite configuration
└── package.json
```

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To build for production:

```bash
npm run build
```

Output is written to `_site/`.

## Author

**José Félix** — Creative Technologist & Design Engineer
