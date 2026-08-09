---
id: shared-platform
title: Shared Go Platform Architecture
sidebar_label: Shared Go Platform
description: Cross-cutting capabilities supplied by dx-common-go and the conventions every Go service consumes.
---

# Shared Go Platform Architecture

`dx-common-go/platform` is the internal platform SDK for the service fleet. It owns cross-cutting mechanics so each application repository contains domain rules, use cases, and adapters rather than its own interpretation of authentication, HTTP envelopes, transactions, events, health, or shutdown.

**Status:** **Partially implemented.** Bootstrap, configuration, HTTP, errors, paging, PostgreSQL, caching, events, health, workload identity, and observability foundations are adopted across the core fleet. SDK versioning, complete gRPC migration, conformance automation, and several operational hardening items remain open.

## Capability map

| Capability | Platform responsibility | Service responsibility | Status |
| --- | --- | --- | --- |
| HTTP and API | Router, middleware order, request binding, typed handlers, standard envelope, paging, OpenAPI serving | Operation contract, validation rules, business response | **Implemented** |
| Configuration | Typed load, defaults, environment overrides, validation, explicit modes | Service-specific schema and safe defaults | **Implemented** |
| Persistence | Pool lifecycle, context transaction, query helpers, error mapping, migration runner | Data model, versioned migrations, repository queries | **Implemented** |
| Caching | Cache interface, Redis adapter, cache-aside and rate-limit primitives | Key design, TTL bound, invalidation trigger, failure mode | **Partially implemented** |
| Messaging | Typed envelope, AMQP adapter, durable topology, outbox, reconnect supervision, health | Topics, event schemas, idempotent handlers, reconciliation | **Partially implemented** |
| Workers and jobs | Lifecycle supervision, cancellation, bounded shutdown | Idempotent unit of work, durable leases, recovery rules | **Partially implemented** |
| Search | Elasticsearch client and focused helpers | Index lifecycle, aliases, mappings, query semantics | **Implemented** without a backend-neutral search abstraction |
| Observability | Structured logs, request IDs, metrics, traces, liveness/readiness contracts | Domain metrics, dependency checks, SLOs, actionable alerts | **Partially implemented** |
| Error handling | Stable error taxonomy, HTTP/gRPC mapping, response writer | Domain error meaning and safe details | **Implemented** |
| Security | JWT validation, workload identity, subject context, shared PEP seams | Operation policy, resource extraction, business enforcement | **Partially implemented** |
| Resilience | Retry and circuit-breaker primitives, timeouts, graceful shutdown | Idempotency, retry classification, dependency-specific policy | **Partially implemented** |
| Testing | Test helpers, fake identity provider, real-router patterns | Domain, negative tenancy, crash, replica, and contract tests | **Partially implemented** |
| Deployment | One container contract, health endpoints, config-check boot mode | Service image, migrations, resource requirements | **Partially implemented** |

## Service shape

```text
cmd/server/main.go       composition through platform/bootstrap
internal/domain/        entities and invariants; no infrastructure imports
internal/service/       use cases and consumer-owned interfaces
internal/repository/    adapters for service-owned persistence
internal/api/           route set and typed HTTP handlers
internal/events/        event definitions, publishers, consumers
internal/workflows/     only for durable multi-step processes
db/migrations/          versioned schema changes
openapi/                the public contract and operation metadata
configs/config.yaml     development defaults; never production secrets
```

Dependencies point inward: API and event adapters call use cases; use cases depend on narrow interfaces; infrastructure implements those interfaces. The domain package imports none of them.

## HTTP and API conventions

- Public APIs are HTTP/REST behind `dx-gateway-go`; internal service calls converge on gRPC.
- The OpenAPI document owns paths, schemas, operation identifiers, and—at target state—authentication and authorization metadata.
- The normal response envelope is `{type, title, detail, result, context}` with pagination metadata when relevant.
- Standards-native responses remain native where wrapping would break the standard, notably GeoJSON and other OGC documents.
- Every service exposes `/healthz/live`, `/healthz/ready`, `/metrics`, and a configurable OpenAPI/Swagger surface.

## Persistence and migrations

Each service owns its logical data and schema. New deployments use a database or schema per service and apply versioned migrations end to end. One explicitly configured actor applies migrations; ordinary replicas start with schema changes disabled.

Repositories use parameterized queries and allowlisted identifiers. Transactions propagate through context so all repositories in one use case join the same transaction. Network calls, notifications, and goroutines are forbidden inside retryable transaction callbacks; external effects follow commit through an outbox or a subsequent step.

## Caching

Caches accelerate reads but never become the source of truth for identity, grants, ownership, or payments. Authorization cache keys include subject, actor, operation, resource, tenant/organization context, relevant attributes, relationship revision, and policy revision. A cached allow cannot outlive the earliest token, grant, policy, or attestation expiry. Revocation invalidates or outranks cached allows.

Redis is also used for rate counters and Agentic Plane hot state. Those uses declare whether Redis is a cache or load-bearing state; the failure mode must be explicit.

## Messaging and event delivery

State-changing facts use a transactional outbox: the domain write and outbox row commit together, a dispatcher claims rows exclusively, and RabbitMQ delivers a versioned envelope to idempotent consumers. Durable queues have dead-letter handling; incompatible versions and malformed payloads are quarantined rather than discarded.

Events carry an ID, type, version, occurrence time, correlation/causation context, actor, and organization where applicable. Consumer-first rollout supports the current and immediately previous event schema across rolling updates.

## Workers and scheduled jobs

Continuous workers run under the application lifecycle, expose health, reconnect with bounded backoff, and stop within the shutdown budget. Work that must have a single owner uses a durable lease, not a process-local lock. Scheduled work is preferably a one-shot invocation from the scheduler. Every job is idempotent and records enough state to reconcile after a crash.

## Search and object storage

Search remains technology-specific because Elasticsearch and PostGIS expose materially different query models. The platform supplies focused clients and instrumentation; service repositories own mappings, index aliases, spatial operators, and query contracts.

Object storage uses an S3-compatible interface. Request paths stream bodies, bound item counts and aggregate bytes, use short-lived presigned access where appropriate, and clean multipart or temporary artifacts on cancellation and failure.

## Observability and operations

- A request/correlation ID propagates across HTTP, gRPC, database, and broker boundaries.
- Logs are structured and exclude credentials, personal data, full object keys, and raw policy documents.
- Authorization emits stable reason codes, decision IDs, engine revisions, cache outcomes, and enforcement results.
- Liveness is process-only. Readiness checks every dependency required by enabled routes and reports bounded, non-sensitive detail.
- Graceful shutdown stops ingress, drains workers, closes broker/database clients, and force-terminates at a configured deadline.

## Testing and release conventions

Unit tests cover domain rules; route tests exercise the real router and response mapper; integration tests use real PostgreSQL/Redis/RabbitMQ where semantics matter; end-to-end smoke tests traverse the gateway. Security-sensitive services add negative ownership and organization-isolation cases, malformed-event tests, replica races, crash recovery, and failure-injection tests.

The target release model uses tagged SDK versions and blocks incompatible changes through fleet compilation, contract checks, generated conformance checks, and rendered-environment boot tests.

## For Developers

Low-level package APIs, dependency rules, and adoption checklists live in the source set:

- [Platform SDK design](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/PLATFORM-ARCHITECTURE.md)
- [Service architecture](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/GO-SERVICE-ARCHITECTURE.md)
- [Normative service standards](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/GO-SERVICE-STANDARDS.md)
- [Testing strategy](../develop/testing.md)
- [Configuration](../develop/configuration.md)

