---
id: api-standards
title: API Standards
sidebar_label: API Standards
description: The platform-wide API contract — response envelope, error taxonomy, pagination, versioning, and URN namespaces.
---

# API Standards

Every service on the Data Exchange speaks the same API dialect. Learn it once and every endpoint on the platform behaves predictably.

## Response envelope

**Success** — payload always in `results` (an array), page metadata in `paginationInfo`:

```json
{
  "type": "urn:dx:acl:Success",
  "title": "Success",
  "results": [ { "...": "..." } ],
  "paginationInfo": { "offset": 0, "limit": 20, "totalHits": 42 }
}
```

**Error** — machine-readable `type`, human-readable `title` and `detail`:

```json
{
  "type": "urn:dx:acl:Forbidden",
  "title": "Forbidden",
  "detail": "Access Denied: Not owner or org_admin of same organisation"
}
```

Client rules: read payload from **`results`**; treat any non-2xx as an error and read **`detail`**; never rely on a boolean `success` field.

## URN namespaces

The `type` URN is scoped per service: `urn:dx:acl:*`, `urn:dx:user:*`, `urn:dx:cat:*`, `urn:dx:file:*`, … Match on **HTTP status + URN suffix** (e.g. `Conflict`), not on the full string, so your client survives namespace additions. The full status/URN table is in [Error Responses](../api-reference/error-responses.md).

## URL structure & versioning

- Client-facing APIs live under a versioned base path: **`/iudx/v2/<domain>/…`** (e.g. `/iudx/v2/cat`, `/iudx/v2/subscriptions`). Documented exceptions preserve older contracts (e.g. the ACL service's `/iudx/acl/apd/v2` and NGSI-LD's standard `/ngsi-ld/v1` paths).
- Paths are routed by the gateway; some prefixes are stripped before the service sees them. The public contract is always the **gateway path** — see [Platform Endpoints](./endpoints.md).

## Pagination, filtering, sorting

- List endpoints accept `limit` (1–1000, default 50) and `offset` (default 0); responses include `totalHits`.
- Filters and sort fields are **allowlisted per endpoint** — unknown query parameters are rejected rather than ignored, so typos fail fast.

## Standards compliance

| API family | Standard |
| --- | --- |
| Catalogue metadata | JSON-LD |
| Data queries | ETSI NGSI-LD (`/ngsi-ld/v1/…`) |
| Geospatial | OGC API Features |
| Authentication | OAuth2 / OIDC / JWT |

## Validation & documentation

Every service embeds its **OpenAPI** specification and validates each request against it before any handler runs — malformed input is rejected with a `400` and a precise `detail`. The same spec is served as interactive documentation at each service's `/docs` endpoint.

## Operational endpoints

Every service also exposes `GET /healthz/live`, `GET /healthz/ready`, and `GET /metrics` (Prometheus) — see [Monitoring & Health](../operations/monitoring.md).
