---
id: client-guide
title: Client Migration Guide
sidebar_label: Client Migration Guide
description: The exact changes a client must make to move from the legacy platform to the current Data Exchange.
---

# Client Migration Guide

**Audience:** teams integrating a client (UI, API consumer, or service) with the current platform. This page lists **only the places where the contract changed** — if a change isn't listed here, assume the legacy contract still holds.

## 1. Cross-cutting changes (do these once)

### 1.1 Send all traffic through the gateway

- **Was:** clients called each service directly on its own host/port.
- **Now:** call the **API Gateway** with the same `Authorization: Bearer <JWT>` you already use.
- **You must:** repoint base URLs to the gateway. Do not call services on their own ports — those are internal.

### 1.2 Response envelope

```json
{ "type": "urn:dx:<svc>:Success", "title": "Success",
  "results": [ … ],
  "paginationInfo": { "offset": 0, "limit": 20, "totalHits": 42 } }
```

- **You must:** read payload from **`results`** (not `data`, not a bare array); read page metadata from `paginationInfo`.
- **Affects most:** clients of the old Node (`{success, data}`) and Python (`{success, data, message}`) services. Java-track clients already used this envelope — only the URN namespace changes.

### 1.3 Error format

```json
{ "type": "urn:dx:<svc>:<ErrorCode>", "title": "Not Found", "detail": "…" }
```

- **You must:** treat any non-2xx as an error and read **`detail`**; stop relying on a boolean `success` field or a nested `error.code`.

### 1.4 URN namespaces

The `type` URN is now per-service (`urn:dx:acl:*`, `urn:dx:user:*`, `urn:dx:cat:*`, …). Don't hard-match old namespaces; match on HTTP status + the URN suffix.

## 2. Per-service changes

| Service | Required client change |
| --- | --- |
| **File exchange** | Paths gain `/v1/` (via gateway: `/files/v1/databanks/{id}/…`). **Upload flow changed:** initiate with `{fileName, contentType, fileSize}` → server returns `{uploadId, key, partSize}`; request each part URL separately; complete with `{parts: [{partNumber, etag}]}` (no `key`). **Download** is always `{keys: […], expiresIn}` → presigned URLs (no direct streaming). Processing **status enum is UPPERCASE** (`PENDING | RUNNING | COMPLETED | FAILED`). Asset-upload roles changed (consumers can no longer upload assets). |
| **Community layer** | **Redesigned API** (sanctioned). Sub-resources are plural (`/reactions`, `/votes`, `/comments`); unified `…/actions/{action}` split into `/pin`, `/unpin`, `/bookmark`; `…/challenge/by_id/{id}` → `…/challenge/{id}`. Admin role widened (`cos_admin` **or** `org_admin`). Treat this as integrating a new API. |
| **Data plane (NGSI-LD)** | Temporal params renamed: **`time` / `endTime`** (were `timeAt` / `endTimeAt`; the legacy names are still accepted for compatibility). Default page size is `50` (was `100`). App-credential token auth for data queries is not yet available — use a user JWT via the gateway. |
| **OGC geospatial** | Standard OGC API Features paths under `/ogc/*`; advanced features (CQL, tiles) not yet available. |
| **Catalogue / user / policy / registry / credits / subscriptions** | Envelope + URN changes (§1) only — paths and field semantics preserved. Workflows not yet migrated (KYC, org-approval) remain on the legacy endpoints for now. |

## 3. What is NOT changing

- **Authentication** — you still obtain a JWT from the same identity provider and send `Authorization: Bearer <JWT>`. Only the target host becomes the gateway.
- **Your data** — the current services run on the same underlying data, so IDs, references, and content you already hold remain valid.
- **Resource identifier formats** and the meaning of fields, unless listed in §2.

## 4. Migration playbook

1. Repoint your base URL to the gateway.
2. Adopt the envelope (`results` + status/`detail` error handling).
3. Apply the per-service path changes from §2.
4. Rework the file-upload flow (file-exchange clients only).
5. Confirm role requirements for your operations.
6. Keep using legacy endpoints for features not yet migrated ([Migration Overview](./overview.md)) — the gateway does not proxy those.
7. Validate against a staging deployment before cutover ([Testing](../develop/testing.md)).
