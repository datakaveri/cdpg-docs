# IUDX Documentation Portal

The official documentation and product portal for **IUDX** — the Intelligent Universal Data Exchange. Built with [Docusaurus](https://docusaurus.io/) and themed to the **CDPG** house style.

## What's inside

- **Landing page** (`src/pages/index.tsx`) — hero, differentiators, key features, data access models, proven deployments, and core benefits.
- **Documentation** (`docs/`):
  - **The Platform** — Architecture, Key Features, Data Access Models, Standards, Technology Stack, Licensing & Pricing.
  - **For Developers** — Getting Started, APIs & Standards, Data Ingestion.
  - **Adoption** — Use Cases, Market Comparison.
- **Theme** (`src/css/custom.css`) — official CDPG style system: Navy `#1F3569` (primary), Orange `#F57E20` (accent), Teal `#0E7C86`, Green `#1E8E5A`, Berry `#B23A48`, Slate `#6A7488`; Calibri typography; light + dark modes.
- **Brand assets** (`static/img/`) — recreated IUDX wordmark (`logo.svg`), favicon, layered architecture diagram, and social card.

## Prerequisites

- Node.js 18+ (tested on Node 22)

## Install

```bash
npm install
```

## Local development

```bash
npm start
```

Starts a dev server at http://localhost:3000 with live reload.

## Production build

```bash
npm run build      # outputs to ./build
npm run serve      # preview the production build locally
```

## Deployment

The `build/` directory is fully static and can be hosted on any static host (GitHub Pages, Netlify, S3/CloudFront, Nginx, etc.). Set the production `url` and `baseUrl` in `docusaurus.config.ts` to match your host.

---

Maintained by the Centre for Data for Public Good (CDPG), IISc. Contact: **info@cdpg.org.in** · [dataforpublicgood.org.in](https://dataforpublicgood.org.in)
