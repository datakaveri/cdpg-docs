---
id: sdks-libraries
title: SDKs & Shared Libraries
sidebar_label: SDKs & Libraries
description: The shared libraries behind every platform service, and what API clients can use today.
---

# SDKs & Shared Libraries

## For API clients

The platform's APIs are plain HTTPS + JSON behind one gateway, with a uniform envelope and OpenAPI specs served by every service at `/docs`. That makes client generation straightforward in any language:

1. Fetch the OpenAPI spec of the service you integrate with.
2. Generate a typed client (`openapi-generator`, `oapi-codegen`, `openapi-typescript`, …).
3. Point it at the gateway and attach `Authorization: Bearer <token>`.

A dedicated first-party client SDK is on the roadmap; until then, generated clients plus the [API Standards](./api-standards.md) page are the supported path.

## `dx-common-go` — the platform service library

Every platform service is thin because the cross-cutting machinery lives in one shared Go library. If you contribute a service (or read service code), this is the vocabulary:

| Area | What it provides |
| --- | --- |
| **Auth** | JWT/JWKS validation, HMAC identity-header signing and verification, the resolver middleware (gateway-signed headers preferred, JWT fallback), gateway-origin enforcement |
| **Authorization** | Client for the Authorization Service's `/v1/check` |
| **HTTP** | Standard middleware stack (request ID, logging, CORS, compression, recovery, timeouts), OpenAPI request validation, graceful-shutdown HTTP server |
| **Responses** | The DX envelope writer and the platform error taxonomy — services never hand-roll response JSON |
| **Persistence** | PostgreSQL pool + generic DAO with a safe condition/query builder, transactions; Elasticsearch client + query DSL; S3/MinIO helpers |
| **Messaging** | RabbitMQ publisher with confirms and reconnect, consumer scaffolding with bounded retry, DLQ wiring, and idempotency by message ID |
| **Config** | The environment-driven config loader described in [Configuration](./configuration.md) |
| **Observability** | Structured logging (request-ID propagated) and Prometheus request/consumer metrics |

The library contains **no business logic** — it is infrastructure only, which is what keeps the platform's 15+ services consistent (see the service standards in [Contributing](../resources/contributing.md)).

## `dx-common` — the legacy Java library

The previous-generation Java services share `dx-common`: multi-issuer JWT validation, RabbitMQ integration, Elasticsearch/PostgreSQL proxies, and auditing bases. It remains in service until the [migration](../migration/overview.md) completes.
