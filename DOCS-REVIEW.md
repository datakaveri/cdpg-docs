# Documentation Review — cdpg-docs

**Date:** 2026-07-03 · **Branch reviewed:** `main` (3dc86d4) · **Refresh branch:** `docs-refresh`

This report records the findings that drove the restructuring on the `docs-refresh`
branch. It reviews everything on `main` and maps each page to a disposition
(keep / update / rewrite / merge / remove).

---

## 1. State of the `main` branch

`main` is the result of merging **two unrelated documentation sites** into one
repository (PR #3, commit `0105852`):

| Set | Origin | Files | Config |
|-----|--------|-------|--------|
| **A — IUDX site** (active) | `feat/initial-docs-setup` | `docs/overview.md`, `docs/technical/*`, `docs/platform/*`, `docs/develop/*`, `docs/adoption/*`, `src/*` | `docusaurus.config.ts` + `sidebars.ts` |
| **B — CDPG generated set** (orphaned) | original `Initial commit` | `docs/intro.md`, `docs/architecture/*`, `docs/components/*`, `docs/flows/*`, `docs/guides/*`, `docs/api-reference/*` | `docusaurus.config.js` + `sidebars.js` (unused) |

Docusaurus resolves the **`.ts` config**, so the deployed site is Set A. Set B
is built (its pages get URLs) but is **unreachable from any navigation** — 21
orphaned pages, including the most technically current content in the repo.

### Structural problems

1. **Duplicate config files** — `docusaurus.config.js`/`sidebars.js` shadow the
   real `.ts` files; the `.js` config even declares a mermaid theme that is not
   in `package.json`. Confusing and dead. → **Removed.**
2. **Orphaned content** — Set B's components/flows/guides/api-reference pages
   are invisible to users. → **Integrated into the new navigation.**
3. **Two competing landing pages** — `docs/intro.md` (slug `/`) vs
   `docs/overview.md` (slug `/overview`). → **Merged into one overview.**
4. **Mermaid diagrams that never rendered** — Set B uses ` ```mermaid ` blocks,
   but the active config had no `@docusaurus/theme-mermaid`. → **Theme added.**
5. **Wrong repo metadata** — `projectName: iudx-novo-docs`, `editUrl` pointing
   at `datakaveri/iudx-novo-docs`. → **Fixed to `cdpg-docs`.**

---

## 2. Outdated / obsolete content (Set A)

The IUDX pages describe the **previous-generation platform**. Verified against
the current platform source (`cdpg-claude` orchestration repo, `dev` branch):

| Page | What is outdated |
|------|------------------|
| `technical/authorization-server.md` | Entire auth model: X.509 **client certificates + mutual TLS**, token introspection, Onboarder/Data-Ingester roles. Current platform uses **Keycloak OIDC + JWT**, an API-gateway PEP with HMAC identity headers, and **OpenFGA ReBAC** (PDP/PAP split). Rewritten. |
| `technical/catalogue-server.md` | `/iudx/cat/v1/*` API paths and token-introspection writes; current catalogue is `dx-catalogue-go` under `/iudx/v2/cat`, gateway-fronted. Rewritten as a component page. |
| `technical/resource-server.md` | Single monolithic "Resource Server"; the data plane is now several services (NGSI-LD search, OGC API Features, file exchange, subscriptions). Replaced by Data Plane pages. |
| `technical/technology-stack.md` | Vert.x/Node.js-centric; missing Go (chi), OpenFGA, MinIO; lists Angular-only UI, ZooKeeper, NiFi, osTicket as core. Updated to the current stack while keeping still-true layers. |
| `technical/control-plane.md` / `data-plane.md` | Conceptually still valid (planes), but component names and responsibilities updated to the current service fleet. |
| `technical/deployment.md` | Docker-Swarm-first guidance; current deployment is Docker Compose (dev) + Kubernetes/ArgoCD GitOps (prod). Rewritten; security section kept and updated. |
| `develop/getting-started.md` | `auth/v1/token` and `iudx/cat/v1/search` examples target retired endpoints. Rewritten against the gateway (`:8000`) and current APIs. |
| `develop/apis.md` | Claims "resource/user-level ABAC"; the platform is **ReBAC** (OpenFGA). Folded into the new API-standards + components pages. |
| `develop/endpoints.md` | Endpoint map predates the Go gateway route table. Rewritten from the live gateway config. |

**Still accurate, kept with light edits:** `overview.md` (merged),
`platform/key-features.md`, `platform/standards.md`, `platform/licensing.md`,
`platform/data-access-models.md`, `technical/design-principles.md`,
`technical/overview.md` (IS 18003 interface model), `adoption/*` (3 pages),
`technical/definitions.md` (extended into a fuller glossary).

## 3. Outdated content (Set B)

Set B is much closer to the current platform but has gaps:

- `api-reference/acl-endpoints.md` — five `[HAND-CURATE]` placeholders (list/
  delete examples, rate limiting). **Filled.**
- `guides/local-dev-setup.md` — references "6 application repos" and a
  `SETUP.md` that doesn't exist; the current workflow is `make dev-clone` /
  `dev-up` / `dev-init-dbs` / `dev-demo` with ~20 repos. **Rewritten.**
- Component set covers 9 components; the platform now has **15 Go services**
  (missing: user/IAM service, marketplace, credits, registry, subscriptions,
  audit, notifications, catalogue as its own service). **Added.**

## 4. Missing documentation (new pages written)

- Core concepts (resources, roles, policies, access types, tokens)
- Local development / installation guide (current `make` workflow)
- Configuration guide (env-driven Go config; legacy Vert.x note)
- API standards (response envelope, error taxonomy, pagination, URN namespaces)
- SDKs & shared libraries (`dx-common-go`, `dx-common`)
- Testing guide
- Operations: GitOps deployment, monitoring & health, security considerations
- **Migration guides** (legacy → current platform; client contract changes)
- FAQ, extended glossary, contributing guide, release notes

## 5. Duplicates & inconsistencies resolved

- Two landing pages (`intro.md` + `overview.md`) → one.
- Auth described 3 different ways (certificates in Set A, OIDC in Set B,
  ABAC in `develop/apis.md`) → one consistent model everywhere.
- Terminology unified: **IUDX** (brand/standard) vs **DX / Data Exchange**
  (the platform), *databank/dataset*, *provider/consumer/org admin/cos admin*,
  *policy* vs *grant* usage aligned; component naming matched to service names.
- `overview.md` "three core services" vs `intro.md` "9 components" → one
  current component model.

## 6. Broken links / navigation issues

- 21 pages unreachable from navigation (Set B) — fixed by the new sidebar.
- `sidebars.js`/`config.js` dead files — removed.
- `guides/local-dev-setup.md` referenced a non-existent `SETUP.md`.
- Mermaid blocks rendered as plain code fences (no theme) — fixed.
- Build now runs with `onBrokenLinks: 'throw'` and passes.

## 7. New information architecture

Preserves Set A's proven shape (MOSIP-style: Get Started → Architecture →
Components → Develop → Adoption → Resources, generated category landing pages,
same theme/homepage) while covering the current platform:

```
Overview
Get Started            key features · design principles · core concepts · licensing
Architecture & Technology
                       interfaces (IS 18003) · system architecture · control plane ·
                       data plane · technology stack · standards · deployment architecture
Platform Components    gateway · identity · authorization (PDP) · policy (PAP) · user/IAM ·
                       catalogue · data plane services · file exchange · community ·
                       marketplace · supporting services · messaging backbone
Platform Flows         authentication · consuming data · policy lifecycle
Data Exchange          data ingestion · data access models
Develop                getting started · local development · configuration ·
                       API standards · endpoints · SDKs & libraries · testing
API Reference          auth flow · ACL endpoints · error responses
Guides                 JWT validation · FGA authorization · debugging policies · troubleshooting
Operations             deployment & GitOps · monitoring & health · security
Migration              overview · client migration guide
Adoption               use cases · case studies · market comparison
Resources              FAQ · glossary · release notes · contributing
```

Audience entry points (developer / platform admin / DevOps / API consumer /
contributor) are routed from the Overview page.

## 8. Sources of truth used

Current-platform facts were taken from the orchestration repo
(`cdpg-claude`, branch `dev`) documentation: ARCHITECTURE, MIGRATION,
CLIENT-CONTRACT-CHANGES, AUTH, QUICK-START, SERVICES, PORTS,
GO-SERVICE-STANDARDS, DATABASE, TESTING, GITOPS, CONTRIBUTING, plus the live
gateway route table. Where the platform is still in transition (e.g. features
remaining on the legacy Java control plane), the docs say so explicitly rather
than describing an aspirational end state.

> **Note:** the task brief referred to a `dev` branch of `cdpg-docs`; no such
> branch exists on the remote. The "latest platform" content source used
> instead is the `dev`-branch documentation of the orchestration repo plus the
> orphaned Set B pages, which together describe the current platform.
