---
slug: /
sidebar_position: 1
---

# CDPG Data Exchange

The **Collective Data Exchange Platform (CDPG)** enables organisations to **publish, discover, and consume data securely**. Data providers register datasets, AI models, and applications in a central catalogue; consumers request access; and the platform enforces every grant with fine-grained, relationship-based access control — down to the level of *which user may call which API on which dataset, until when*.

## What problems it solves

- **Controlled sharing** — providers stay in control: every access is an explicit, time-bound policy they (or their organisation's admin) granted, and can revoke at any time.
- **Trust between parties** — all access is authenticated (users via OIDC, machines via app credentials) and every grant is verifiable.
- **Multiple data modalities** — live APIs, temporal/geospatial queries, OGC standard interfaces (WFS/WMS/tiles), and bulk file exchange are all served through one platform.
- **Organisation-aware governance** — organisations, org admins, and platform admins each have clearly scoped powers.

## The platform at a glance

The Data Exchange is built from **9 core components**:

| # | Component | Role |
|---|-----------|------|
| 1 | [API Gateway](components/api-gateway) | Single entry point — authentication, routing, identity propagation |
| 2 | [Identity Provider](components/identity-provider) | Keycloak — user & machine identity (OIDC) |
| 3 | [Control Plane](components/control-plane) | Catalogue, accounts, organisations, app credentials |
| 4 | [Policy Service (ACL)](components/policy-service) | Grant, list, revoke and verify access policies |
| 5 | [Authorization Service](components/authorization-service) | Real-time permission checks (ReBAC / OpenFGA) |
| 6 | [Data Plane](components/data-plane) | Serves the actual data — queries, subscriptions, OGC APIs |
| 7 | [File Exchange](components/file-exchange) | Bulk file upload/download with object storage |
| 8 | [Community Layer](components/community-layer) | Discussions, challenges, engagement around datasets |
| 9 | [Messaging Backbone](components/messaging-backbone) | Event bus connecting the components asynchronously |

See the **[Architecture Overview](architecture/overview)** for how they fit together, or follow the key **[Platform Flows](flows/data-consumption)** to understand a request end-to-end.

## Who uses it

| Actor | What they do |
|---|---|
| **Provider** | Publishes datasets/models/apps to the catalogue, grants access |
| **Consumer** | Discovers resources, requests access, consumes data |
| **Org Admin** | Manages access on behalf of all providers in their organisation |
| **Platform Admin (COS Admin)** | Operates the exchange itself |
| **Applications (M2M)** | Programmatic access using app credentials, optionally on behalf of users (delegation) |
