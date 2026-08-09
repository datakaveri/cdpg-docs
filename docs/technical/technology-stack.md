---
id: technology-stack
title: Technology Stack
sidebar_label: Technology Stack
description: Technology choices for the Go platform and the responsibility each choice carries.
---

# Technology Stack

The platform chooses technologies at clear responsibility boundaries. A technology's presence does not transfer business ownership to infrastructure: OpenFGA is not the policy administrator, OPA is not the identity provider, and RabbitMQ is not a system of record.

| Layer | Technology | Architectural use | Status |
| --- | --- | --- | --- |
| Services | Go 1.25, chi-compatible `net/http`, OpenAPI | Gateway, control, data, agent, and worker services | **Implemented** |
| Public APIs | HTTPS, REST/JSON, SSE, JSON-LD, NGSI-LD, OGC APIs | Client and standards-facing contracts | **Partially implemented** |
| Internal APIs | gRPC, Protocol Buffers | Typed service-to-service calls | **In development** |
| Identity | Keycloak 26.x, OIDC, OAuth 2.0, PKCE, client credentials, RFC 8693 | User/application/workload/agent authentication and token exchange | **Partially implemented** |
| Relationship authorization | OpenFGA | Ownership, membership, groups, grants, delegated agent relationships | **Partially implemented** |
| Contextual authorization | Open Policy Agent (OPA), Rego bundles | Attribute/context rules, platform guardrails, typed obligation selection | **Planned** |
| Relational data | PostgreSQL | Service-owned domain state, outboxes, audit, sessions | **Implemented** |
| Spatial data | PostgreSQL + PostGIS | OGC collections, features, CQL2/CRS/spatial queries | **Implemented** |
| Search and temporal data | Elasticsearch | Catalogue discovery and NGSI-LD query indexes | **Implemented** |
| Cache/hot state | Redis | Caches, rate counters, sessions, token vault, approvals, denylist mirror | **Implemented** with durability gaps by use |
| Messaging | RabbitMQ/AMQP | Versioned domain facts, authorization projection, audit, notifications, jobs | **Partially implemented** |
| Object storage | S3-compatible APIs, MinIO in local development | Files, attachments, COGs, derived artifacts | **Implemented** |
| Agent protocol | Model Context Protocol (Streamable HTTP) | Tool discovery and governed invocation | **Implemented** locally |
| LLM adapters | Provider interface; Anthropic and deterministic mock implementations | Agent planning only; never authorization | **Partially implemented** |
| Runtime platform | `dx-common-go/platform` | Bootstrap, configuration, HTTP/gRPC, persistence, cache, events, identity, health, resilience | **Partially implemented** |
| Containers | Distroless/non-root images, Docker Compose | Reproducible services and local integration | **Implemented** |
| Orchestration | Kubernetes, Helm, ArgoCD ApplicationSets | Declarative deployment, scaling, rollout, topology selection | **In development** |
| Secrets | External Secrets Operator plus a deployment secret manager | Workload, database, broker, payment, object-store, and model-provider credentials | **In development** |
| Observability | Prometheus, OpenTelemetry, structured logging; Grafana-compatible backends | Metrics, traces, logs, health, alerting | **Partially implemented** |
| Federation | Mutual TLS, dynamic trust store, signed/encrypted envelopes | Cross-operator boundary | **Deferred** |

## Selection principles

- Prefer open, versioned interfaces at external boundaries and typed contracts between services we own.
- Keep specialized query semantics specialized: Elasticsearch and PostGIS do not sit behind a lowest-common-denominator search abstraction.
- Keep stateful correctness in the owning service/database; caches and brokers accelerate or distribute facts.
- Keep policy engines behind the composite authorization contract so PEPs do not integrate with OpenFGA or OPA directly.
- Introduce optional infrastructure only when a feature gate selects the capability and its failure behavior is documented.

For developer-facing package and repository detail, see [Shared Go Platform](./shared-platform.md).
