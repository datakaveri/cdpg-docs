---
id: overview
title: Migration Overview
sidebar_label: Migration Overview
description: How the legacy platform is being replaced by the current Data Exchange — the governing principles, what has migrated, and what remains.
---

# Migration Overview

The Data Exchange is the re-architecture of the previous-generation platform (a Java control plane and data plane, a Node.js file service, and a Python community service) into the current fleet of Go microservices behind a single gateway. The two stacks **run in parallel** during the transition, and capabilities cut over one at a time.

## Governing principles

Two rules govern the entire migration:

1. **Same data.** The current services run on the **legacy databases and search indices unchanged** — same schemas, no destructive migrations. The new stack re-implements the application layer over the *same* data, so behaviour can be validated against the legacy stack and both can run in parallel without divergence. (The one sanctioned exception is the redesigned Community Layer, which owns new databases.)
2. **Same contract.** New services preserve the **legacy API contract** wherever possible. Where the contract had to change to meet the platform-wide standard (response envelope, error format, URL versioning), the delta is explicitly documented for clients — see the [Client Migration Guide](./client-guide.md). Undocumented contract drift is treated as a bug.

## What changed platform-wide

| | Legacy | Current |
| --- | --- | --- |
| **Entry point** | Each service reached directly | Everything through the [API Gateway](../components/api-gateway.md) |
| **Authentication** | Each service validated the JWT itself | Gateway validates once; services trust signed identity headers |
| **Authorization** | Per-service policy lookups | Central [Policy Service](../components/policy-service.md) + real-time ReBAC checks |
| **Response shape** | Three different envelopes (Java/Node/Python) | One [standard envelope](../develop/api-standards.md) |
| **Architecture** | Modular monolith (Java control plane) + separate services | 15+ single-purpose services with a shared library |

## Migration status

| Capability | Status |
| --- | --- |
| Gateway, authorization, policy administration | ✅ Migrated (new capabilities — no legacy counterpart for the PDP) |
| Audit, notifications, registry, credits, subscriptions | ✅ Migrated |
| Marketplace | ✅ New capability |
| Community layer | ✅ Migrated (sanctioned redesign — new API and schema) |
| File exchange | ✅ Migrated (a few secondary endpoints still legacy-only) |
| Catalogue | ⚠ Largely migrated; some workflows (e.g. delegated onboarding flows) still on legacy |
| User / IAM (profiles, orgs, delegation, app credentials) | ⚠ Largely migrated; KYC and org-approval workflows still on legacy |
| NGSI-LD data plane | ⚠ Core queries migrated (entity/temporal/geo/aggregation); ingestion & admin endpoints still legacy |
| OGC geospatial | ⚠ Core OGC API Features migrated; advanced features (CQL, tiles) pending |

During the parallel run, **policy and membership changes must be made through the current stack** — changes made directly in the legacy control plane do not propagate into the new enforcement graph.

## Recommended cutover sequence

1. **Catalogue** — shares the search index with legacy; lowest risk.
2. **Policy + authorization + user** — make the current stack the single writer for policies and membership.
3. **Data plane** — after validating query parity on real data.
4. **Community layer** — migrate the UI to the redesigned API.
5. **File exchange** — after clients adopt the new upload flow.

Clients should migrate by following the [Client Migration Guide](./client-guide.md); operators verify each step with the platform smoke test ([Testing](../develop/testing.md)).
