---
id: overview
title: Overview
sidebar_label: Overview
description: What the CDPG Data Exchange is, who it serves, and how its Go architecture is organized.
slug: /
---

# CDPG Data Exchange

CDPG is a Go-based platform for publishing, discovering, governing, exchanging, and auditing data across organizations. It supports API, geospatial, temporal, subscription, and file-based access, plus an optional Agentic Plane for AI agents operating under explicit delegated authority.

The platform is pre-first-release and not yet production-ready. Pages describe the intended complete architecture and label unfinished behavior explicitly. Start with [Current State and Target State](./technical/current-and-target.mdx) whenever deployment readiness matters.

## Foundational attributes

- **Provider-controlled:** providers and their organizations remain authoritative for resource metadata and access grants.
- **Policy-driven:** authentication proves identity; a separate authorization decision governs each protected operation.
- **Standards-oriented:** OIDC/OAuth 2.0, JSON-LD, NGSI-LD, OGC APIs, OpenAPI, MCP, and CloudEvents-style envelopes define interoperable boundaries.
- **Service-owned:** each Go service owns its capability, data, and contracts and consumes the shared Go platform for cross-cutting behavior.
- **Default deny:** unknown, invalid, expired, unavailable, or unsupported security state does not widen access.
- **Auditable:** user, workload, application, agent, delegation, grant, decision, and approval context can be correlated across the platform.
- **Configuration-selected:** the same images support central deployment and opt-in extensions without code branches for topology.

## How it works

1. A provider onboards resource metadata in the Catalogue and ingests data through a data service or File Exchange.
2. A consumer discovers the resource and receives entitlement through an explicit grant, access request, or marketplace purchase.
3. The Policy Service records the grant and publishes a durable fact; the Authorization Service updates its relationship and contextual-policy projections.
4. The consumer calls the gateway. Authentication establishes principal identity; authorization evaluates the operation, resource, relationships, attributes, context, and delegation.
5. The target data service verifies the carried decision, applies filters/masks/quotas and organization scoping, then returns data and emits audit signals.
6. An enabled agent follows the same path through a governed MCP tool boundary, with additional delegation, risk, approval, and kill-switch controls.

## Primary audiences

| Audience | Start here |
| --- | --- |
| Architects and technical leaders | [Architecture Overview](./technical/overview.mdx) · [System Architecture](./technical/architecture.mdx) |
| Security and risk teams | [Security Architecture](./technical/security-architecture.mdx) · [Architecture Decisions](./technical/decisions.md) |
| Platform engineers and operators | [Deployment Architecture](./technical/deployment.mdx) · [Monitoring](./operations/monitoring.md) |
| Service developers | [Shared Go Platform](./technical/shared-platform.md) · [Getting Started](./develop/getting-started.md) |
| Data providers and consumers | [Core Concepts](./concepts/core-concepts.md) · [Data Access Models](./platform/data-access-models.md) |
| Agent developers | [Agentic Plane](./technical/agentic-plane.mdx) · [Agent Delegation](./flows/agent-delegation.mdx) |
