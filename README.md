# CDPG Documentation

This directory contains the Docusaurus-based documentation for the Collective Data Exchange Platform (CDPG), automatically generated from the system's knowledge graph.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Knowledge graph artifacts in `/Users/gokul/workspace/cdpg/.understand-anything/intermediate/`

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm start
```

Then open **http://localhost:3000** in your browser.

### Build for Production

```bash
npm run build
npm run serve  # to preview the built site locally
```

## Structure

```
.
├── docs/                    # Auto-generated + hand-curated content
│   ├── intro.md            # Welcome page
│   ├── architecture/        # System architecture
│   │   ├── overview.md      # Mermaid diagrams, layer table
│   │   ├── layers/          # One doc per layer
│   │   └── deployment.md    # [HAND-CURATE]
│   ├── learning-path/       # 15-step guided tour
│   │   ├── 01-domain-models.md
│   │   ├── 02-database-schema.md
│   │   └── ...
│   ├── services/            # Per-service guides
│   │   ├── gateway.md
│   │   ├── acl-go.md
│   │   └── ...
│   ├── api-reference/       # API endpoint docs
│   │   ├── acl-endpoints.md [HAND-CURATE]
│   │   ├── auth-flow.md     [HAND-CURATE]
│   │   └── error-responses.md [HAND-CURATE]
│   ├── guides/              # Troubleshooting & examples
│   │   ├── local-dev-setup.md [HAND-CURATE]
│   │   ├── debugging-policy-creation.md [HAND-CURATE]
│   │   └── ...
│   └── reference/           # Database, config, graphs
│       ├── database-schema.md
│       ├── environment-config.md
│       └── dependency-graph.md
├── docusaurus.config.js     # Site configuration
├── sidebars.js              # Navigation structure
├── package.json             # Dependencies
└── README.md               # This file
```

## Regenerating Documentation

When the system architecture changes significantly:

```bash
cd /Users/gokul/workspace/cdpg
# 1. Update knowledge graph (if needed)
# 2. Regenerate docs
go run scripts/generate-docusaurus.go \
  --graph-dir .understand-anything/intermediate \
  --output-dir cdpg-docs/docs \
  --overwrite=true
# 3. Commit changes
git add cdpg-docs/docs/* sidebars.js
git commit -m "docs: regenerate from knowledge graph"
```

## Hand-Curation

The docs include `[HAND-CURATE]` placeholders marking sections you should enrich:

```markdown
### Examples

[HAND-CURATE: Add concrete code examples showing:]
- How to extend this layer
- Common integration patterns
- Testing strategies
```

To complete the documentation:
1. Search for all `[HAND-CURATE]` sections
2. Replace with actual examples, walkthroughs, and explanations
3. Commit your changes

## Deployment

### GitHub Pages

1. Enable GitHub Pages in repository settings (source: gh-pages branch)
2. The `.github/workflows/docs.yml` workflow will auto-deploy on main branch pushes

### ReadTheDocs

1. Connect your GitHub repo to ReadTheDocs
2. RTD will auto-build & deploy on commits

### Self-Hosted

```bash
npm run build
# Serve the 'build/' directory with your web server
# E.g.: nginx, Apache, or Python's http.server
```

## Customization

### Site Title & Logo
Edit `docusaurus.config.js`:
```javascript
title: 'CDPG',
logo: {
  src: 'img/logo.svg',
}
```

### Navigation Bar
Edit the `navbar` section in `docusaurus.config.js`

### Sidebar Order
Edit `sidebars.js` to reorder sections

### Styling
- Dark mode config: `docusaurus.config.js` → `themeConfig.colorMode`
- Custom CSS: `src/css/custom.css`

## Troubleshooting

### Port already in use
```bash
npm start -- --port 3001
```

### Node modules issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Stale build cache
```bash
npm run clear
npm run build
```

## Resources

- [Docusaurus Docs](https://docusaurus.io)
- [Markdown Guide](https://www.markdownguide.org/)
- [Mermaid Diagrams](https://mermaid.js.org/)
- [GitHub Pages Setup](https://docs.github.com/en/pages)

## Contributing

When updating docs:
1. Keep the learning path in logical order (domain → schema → service → transport)
2. Use code examples from actual source (copy-paste to stay in sync)
3. Include both "what" and "why" explanations
4. Link between related docs for easy navigation
5. Test locally before pushing: `npm start`

## See Also

- Main project: [CDPG on GitHub](https://github.com/datakaveri/cdpg)
- Knowledge graph: `/Users/gokul/workspace/cdpg/.understand-anything/intermediate/`
- Generator script: `/Users/gokul/workspace/cdpg/scripts/generate-docusaurus.go`
