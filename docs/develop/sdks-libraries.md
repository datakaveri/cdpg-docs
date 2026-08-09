---
id: sdks-libraries
title: SDKs & Shared Libraries
sidebar_label: SDKs & Libraries
description: Client integration and the shared Go platform modules used by services.
---

# SDKs & Shared Libraries

## API clients

Public APIs use HTTPS, JSON, a consistent error/envelope contract, and service OpenAPI documents. Consumers can generate clients with their preferred OpenAPI generator, point them at the platform gateway, and attach an OIDC access token. A single first-party client SDK is **Planned**.

## `dx-common-go` platform modules

The shared Go platform supplies infrastructure capabilities without owning business policy:

| Area | Capability |
| --- | --- |
| Identity | JWT/JWKS validation, workload-token acquisition/validation, caller allowlists, subject-context validation |
| Authorization | Composite PDP client, typed decision/obligation contract, carried-decision verification |
| Transport | Public HTTP middleware and internal gRPC interceptors, request/trace propagation, graceful servers |
| API contract | Response envelope, typed errors, validation, pagination, OpenAPI integration |
| Persistence | PostgreSQL lifecycle, transactions, query helpers, migration runner |
| Cache | Namespaced cache, expiry, invalidation, and safe fallback conventions |
| Events | Publisher confirms, outbox relay, consumer retry, idempotency, dead-letter support |
| Search/storage | Elasticsearch/OpenSearch and S3-compatible client foundations |
| Workers | Bounded concurrency, leases, cancellation, retry, and scheduler lifecycle |
| Observability | Structured logs, Prometheus metrics, OpenTelemetry traces, health/readiness |

Adoption varies by service; see [Shared Platform Architecture](../technical/shared-platform.md) for the current matrix and developer package boundaries.

The library must not contain service-specific business rules, resource schemas, policy authoring logic, or data-plane query semantics. Those remain with the owning service.
