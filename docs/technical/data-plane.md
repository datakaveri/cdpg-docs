---
id: data-plane
title: Data Plane
sidebar_label: Data Plane
description: Ingestion, storage, search, NGSI-LD, OGC, files, subscriptions, authorization enforcement, and recovery.
---

# Data Plane

The Data Plane ingests, stores, queries, filters, and delivers resource content. It owns data-path correctness and enforcement, while the Control Plane owns resource metadata, grants, and authorization decisions.

**Status:** **Partially implemented.** NGSI-LD query, OGC, file, and subscription capabilities exist at different maturity levels. Complete carried authorization obligations, NGSI-LD ingestion/admin, bounded aggregate downloads, and production recovery/SLO evidence remain open.

## Capabilities and ownership

| Capability | Responsible component | Primary store | Status |
| --- | --- | --- | --- |
| NGSI-LD latest/entity queries | `dx-dataplane-rs-go` | Elasticsearch | **Implemented** |
| NGSI-LD temporal, geo, aggregation, bulk, CSV | `dx-dataplane-rs-go` | Elasticsearch | **Implemented** with real-data validation gaps |
| NGSI-LD ingestion and index administration | Data ingestion owner / `dx-dataplane-rs-go` | RabbitMQ, Elasticsearch | **Planned** ownership/coverage |
| OGC Features Parts 1–4 | `dx-dataplane-ogc-go` | PostgreSQL/PostGIS | **Implemented** |
| OGC CQL2, CRS, Tiles | `dx-dataplane-ogc-go` | PostGIS, tile cache | **Implemented** |
| OGC Coverages | `dx-dataplane-ogc-go` | PostGIS metadata, S3 COG | **Partially implemented** |
| OGC Processes and jobs | `dx-dataplane-ogc-go` and optional worker | PostGIS/job state | **Partially implemented** |
| OGC Records-lite | `dx-dataplane-ogc-go` | PostGIS | **Implemented** |
| Multipart file upload/download | `dx-files-connect-api-go` | PostgreSQL, S3, Redis | **Implemented** |
| File processing and cleanup | File workers | RabbitMQ, PostgreSQL, S3 | **Partially implemented** |
| Streaming subscriptions | `dx-subscription-go` | PostgreSQL, RabbitMQ | **Partially implemented** |
| Discussions/challenges attachments | `dx-community-layer-go` | PostgreSQL, S3 | **Implemented** |
| EDR, Maps, Routes, DGGS, Styles, full STAC | Future OGC evolution | Not selected | **Deferred** |

## Ingestion and onboarding

Onboarding begins in the Control Plane: the provider registers resource metadata, ownership, organization, schemas, access modes, and serving endpoint in the Catalogue and Registry. The data path then provisions the corresponding index, collection, object-storage namespace, or subscription topology.

Source adapters validate and normalize data, attach stable resource identity and timestamps, reject malformed input, and write to the data service that owns the target representation. PII removal and semantic transformation are provider/data-pipeline responsibilities configured before publication. An item is discoverable or accessible only after required metadata, storage, authorization, and health gates succeed.

See [Dataset Onboarding](../flows/dataset-onboarding.md).

## NGSI-LD and search

`dx-dataplane-rs-go` serves `/ngsi-ld/v1/entities`, entity-by-ID, bulk query, temporal queries, and temporal CSV download. It supports allowlisted attribute operators, bounding boxes and GeoJSON relationships, time relations, and aggregations. Elasticsearch stores latest and temporal observations in resource-addressed indexes.

The service owns index naming, query construction, pagination bounds, result shaping, and dependency health. Query fields and sort/filter operators are allowlisted. Unbounded export, user-supplied Elasticsearch DSL, and index names derived without normalization are prohibited.

## OGC and spatial processing

`dx-dataplane-ogc-go` owns a PostGIS schema for collections and features. It serves standards-native OGC/GeoJSON documents and exposes:

- landing, conformance, collections, queryables, and feature CRUD;
- bounding box, datetime, property, sort, CQL2-text, and CRS transforms;
- Mapbox Vector Tiles and tile-matrix metadata;
- coverage metadata and whole-COG presigned access;
- process catalog, execution jobs, results, and dismissal;
- Records-lite discovery.

Spatial queries use parameterized PostGIS functions and GIST/GIN indexes. CQL2 identifiers come from the collection queryables allowlist. Coverage subsetting, broader raster preparation, and the deferred OGC families are not presented as implemented.

## File and object-storage workflows

The File Exchange stores metadata in PostgreSQL and bytes in an S3-compatible store. Multipart upload separates initiation, direct object parts, completion, and processing. Downloads use short-lived presigned access or bounded streaming. Every key-addressed operation first resolves a record scoped by owner or databank; a guessed key is not evidence of permission.

Processing jobs are persisted and published to RabbitMQ. Workers claim jobs, update status, write derived artifacts, and record errors. Cleanup workers remove abandoned multipart or temporary objects. Aggregate operations bound object count and total bytes before reading any object. Streaming ZIP completion remains **In development**.

See [File Upload and Processing](../flows/file-processing.md).

## Subscriptions and streaming

`dx-subscription-go` owns the subscription record and user scope. A subscription describes resource, delivery configuration, and lifecycle. Broker provisioning and data delivery are asynchronous and must be idempotent. The subscriber's entitlement is evaluated at creation and again when required by delivery policy; revocation stops future delivery. End-to-end delivery validation and complete failure reconciliation remain open.

## Authorization and filtering

The Data Plane is an enforcement boundary, not an independent PDP.

1. An upstream PEP obtains a composite authorization decision.
2. The decision artefact binds subject, actor, workload, operation, resource, organization, revisions, validity, and typed obligations.
3. The data service verifies integrity and freshness before any store access.
4. It translates normalized row predicates to parameterized Elasticsearch/PostGIS/SQL operations, applies field allow/mask rules, and consumes quota at the side-effect owner.
5. Ownership and organization predicates are added even when the decision allows.
6. Unsupported obligations, invalid translation, stale decision, quota failure, or data-scope mismatch deny without partial results.

The same decision is not re-evaluated by calling the PDP from the Data Plane. This avoids split decisions and unnecessary availability coupling while keeping policy state centralized.

## Control Plane interaction

| Control fact | Producer | Data Plane use |
| --- | --- | --- |
| Resource metadata and endpoint | Catalogue/Registry | Resolve format, access mode, schema, serving component |
| Grant and decision | ACL/Authz | Permit operation and supply obligations |
| Organization/ownership | User/Catalogue/Authz | Add mandatory datastore scope |
| Purchase entitlement | Marketplace → ACL | Create the same grant used by direct access |
| Credits/quota | Credits/Authz | Bound metered use and record consumption |
| Audit requirements | Authz/platform policy | Emit decision and access facts |
| Subscription registration | Subscription Service | Configure allowed delivery |

## Failure, retry, and recovery

| Failure | Behavior | Recovery |
| --- | --- | --- |
| Invalid/stale decision | Deny before store access | Obtain a new decision; alert on systematic validation failures |
| Elasticsearch/PostGIS unavailable | Return bounded dependency error; readiness fails | Retry idempotent reads; restore/replicate store; reconcile indexes |
| Object store unavailable | Do not complete upload/job state | Retry with idempotency; abort multipart artifacts after timeout |
| Broker unavailable | Commit domain state with outbox where supported; do not lose job/event | Dispatcher reconnects and drains; alert on backlog |
| Worker crash | Durable job remains claimable; no duplicate irreversible effect | Lease expiry and reconciliation resume safely |
| Malformed data | Reject/quarantine without indexing partial invalid content | Provider corrects and replays with same idempotency key |
| Oversized query/download | Reject before expensive fetch or allocation | Caller narrows request or uses supported streaming export |
| Projection lag | New access remains denied | Monitor lag and reconcile; never bypass authorization |

## Audit and observability

Data services emit request/trace ID, resource and organization IDs, decision ID, obligation translation/enforcement result, query class, rows/features/bytes returned, cache status, latency, store errors, job state transitions, and audit events. They never log tokens, raw sensitive filters, full object keys, or payload contents.

Key alerts include decision rejection, cross-organization negative-test failures, store saturation, slow/failed spatial queries, index alias drift, processing-job age, outbox/DLQ depth, abandoned multipart growth, subscription delivery lag, and aggregate byte-limit rejection rates.

## Data ownership

Each data service owns its database/schema, indexes, buckets, migrations, and recovery procedures. Catalogue metadata is not the data payload. OpenFGA/OPA policy state is not copied into every data service. Redis may be a cache or explicit hot state but never the only durable record of a completed business side effect.
