---
id: endpoints
title: Platform Endpoints
sidebar_label: Endpoints
description: The gateway route map — every public path prefix and the component that serves it.
---

# Platform Endpoints

All public traffic enters through the **API Gateway**. The table below maps each public path prefix to the component that serves it. On your own deployment, prepend your gateway host (locally: `http://localhost:8000`).

The route table is **configuration, not code** — deployments can enable, disable, or re-map routes without rebuilding anything.

## Route map

| Path prefix | Component | Auth at gateway | Notes |
| --- | --- | --- | --- |
| `/iudx/v2/cat` | [Catalogue](../components/catalogue.md) | pass-through | Reads are public; writes identity-checked in-service |
| `/iudx/v2/auth` | [User Service](../components/user-service.md) | pass-through | Profiles, orgs, delegations, app credentials; public JWKS lives here |
| `/acl` | [Policy Service](../components/policy-service.md) | required | Policy CRUD + verify (`/iudx/acl/apd/v2/…` service path) |
| `/authz` | [Authorization Service](../components/authorization-service.md) | required | `POST /v1/check` relationship checks |
| `/ngsi-ld/v1` | [Data Plane](../components/data-plane.md) | required | Entity, temporal, and geo queries |
| `/ogc` | Data Plane (OGC) | required | OGC API Features — collections, items |
| `/iudx/v2/subscriptions` | Data Plane (subscriptions) | required | Subscription CRUD, user-scoped |
| `/files` | [File Exchange](../components/file-exchange.md) | required | Uploads, downloads, processing (`/files/v1/…`) |
| `/community` | [Community Layer](../components/community-layer.md) | required | Discussions and challenges |
| `/marketplace` | [Marketplace](../components/marketplace.md) | required | Products and orders |
| `/marketplace-webhook` | Marketplace | none | Payment-gateway callbacks — signature verified in-service |
| `/audit` | [Audit](../components/supporting-services.md#audit) | required | Query + CSV export; admin/consumer split in-service |
| `/iudx/v2/resource_servers` | [Registry](../components/supporting-services.md#registry) | pass-through | Reads public; writes platform-admin-gated |
| `/iudx/v2/acl_servers` | Registry | pass-through | As above |
| `/healthz` | Gateway itself | none | Gateway liveness |

**Two routing patterns:**

- **Authenticated + stripped** (`/files`, `/acl`, `/audit`, …) — the gateway authenticates, strips the prefix, and forwards with signed identity headers. The upstream sees a clean path and trusts the headers.
- **Pass-through** (`/iudx/v2/cat`, `/iudx/v2/auth`, registry) — the path is forwarded verbatim and the service enforces identity itself, which allows anonymous reads on public data.

:::note Legacy services
Endpoints of the previous-generation platform that have not yet migrated (see [Migration](../migration/overview.md)) are reached on the legacy hosts directly — the gateway routes only to the current services.
:::

## Per-service API documentation

Every service serves its own interactive OpenAPI documentation at its `/docs` endpoint. For the request/response conventions shared by all of them, see [API Standards](./api-standards.md); for worked examples, see the [API Reference](/docs/category/api-reference).
