# Deploying cdpg-docs to novo.iudx.org.in

This site currently deploys to the default GitHub Pages path:
`https://datakaveri.github.io/cdpg-docs/`

To move it to the custom domain `novo.iudx.org.in` instead, do the following.

## 1. Add a CNAME file

Create `static/CNAME` (Docusaurus copies everything under `static/` into the
build output root) containing exactly:

```
novo.iudx.org.in
```

## 2. Point DNS at GitHub Pages

At the DNS provider for `iudx.org.in`, add a CNAME record:

```
novo.iudx.org.in.  CNAME  datakaveri.github.io.
```

DNS propagation can take anywhere from a few minutes to a few hours.

## 3. Set the custom domain in GitHub repo settings

In `https://github.com/datakaveri/cdpg-docs/settings/pages`:

- Set **Custom domain** to `novo.iudx.org.in`
- Once DNS has propagated and GitHub has verified the domain, enable
  **Enforce HTTPS** (GitHub auto-provisions a Let's Encrypt certificate)

## 4. Update docusaurus.config.ts

Switch the site config back to the custom domain:

```ts
url: 'https://novo.iudx.org.in',
baseUrl: '/',
```

## 5. Rebuild and deploy

```bash
npm run clear
npm run build
npm run serve   # sanity check locally
```

Push to `main` — the existing GitHub Actions workflow
(`.github/workflows/deploy-docs.yml`) builds and publishes to the
`gh-pages` branch automatically, and the CNAME file will be carried along
since it lives under `static/`.

## Verification

1. `dig novo.iudx.org.in CNAME` resolves to `datakaveri.github.io`
2. `https://novo.iudx.org.in` loads the site
3. HTTPS works without certificate warnings
