---
id: standards
title: Standards and Interoperability
sidebar_label: The Role of Standards
description: Standards used at CDPG boundaries, their scope, and current implementation status.
---

# Standards and Interoperability

CDPG adopts standards at boundaries where they materially improve portability and conformance. This does not imply that every optional part of every standard is implemented. Service-specific conformance must be demonstrated by contract tests and published profiles.

| Boundary | Standard/profile | Use | Status |
| --- | --- | --- | --- |
| User authentication | OpenID Connect, OAuth 2.0, PKCE | Browser/mobile authentication and access tokens | **Implemented** |
| Workload and delegated identity | OAuth 2.0 client credentials and token exchange | Service identity and user-subject/agent-actor delegation | **Partially implemented** |
| Public APIs | HTTPS, REST/JSON, OpenAPI | Client contracts, validation, and generated SDKs | **Partially implemented** |
| Internal APIs | gRPC and Protocol Buffers | Typed service-to-service contracts | **In development** |
| Catalogue metadata | JSON-LD | Linked resource descriptions and semantic context | **Partially implemented** |
| Context data | ETSI NGSI-LD | Entity, temporal, attribute, and geospatial queries | **Partially implemented** |
| Geospatial data | OGC API Features, Tiles, Coverages, Processes, Records; CQL2/CRS profiles | GIS discovery, query, analysis, and delivery | **Partially implemented** |
| Agent tools | Model Context Protocol | Governed tool discovery and invocation | **In development** |
| Events | Versioned CloudEvents-style envelope over AMQP | Correlation, schema evolution, replay, and audit | **Partially implemented** |
| Object access | S3-compatible APIs | Multipart transfer and short-lived object capabilities | **Implemented** |
| Telemetry | OpenTelemetry and Prometheus exposition | Traces, metrics, and correlation | **Partially implemented** |
| Federation | Mutual TLS, verifiable trust lists, signed/encrypted envelopes | Cross-operator trust boundary | **Deferred** |

## Conformance rules

- Document the exact profile, supported operations, versions, extensions, and omitted optional capabilities.
- Generate or validate contracts in CI where possible; a library name is not conformance evidence.
- Preserve standard error/content negotiation semantics at the owning boundary, then map them into the platform error envelope without losing meaning.
- Version extensions in a CDPG namespace and do not redefine standard fields.
- Treat security profiles—issuer, audience, algorithms, token type, scopes, trust anchors, and replay rules—as part of conformance.

## Planned evolution

EDR, Maps, Routes, DGGS, Styles, and full STAC support are potential OGC evolution, not current capability. Federation profiles, decision-attestation format, policy bundle format, and a complete event schema registry remain open architecture work.

See [Technology Stack](../technical/technology-stack.md), [Data Plane](../technical/data-plane.md), and [Architecture Decisions](../technical/decisions.md).
