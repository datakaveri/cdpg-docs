---
id: key-features
title: Key Features
sidebar_label: Key Features
description: The Data Exchange capability set — open APIs, discovery, policy-driven access control, flexible data access, and security.
---

# Key Features

The Data Exchange represents a shift from fragmented, closed data systems to an open, secure, and interoperable data ecosystem. Its key capabilities are:

## Open, standards-based APIs

Resource-access APIs harmonized with **ETSI NGSI-LD**, native **OGC APIs** for geospatial data, and consistent REST APIs enable semantic and spatial interoperability.

## Discovery and metadata

A **Catalogue service** indexes and describes available datasets, AI models, and applications as linked-data (**JSON-LD**) objects, with geo-spatial, attribute, and free-text search so consumers can find relevant resources. See the [Catalogue](../components/catalogue.md).

## Policy-driven access control

Protected access is governed by an **explicit, time-bound policy** that the provider or authorised organisation administrator can revoke. OpenFGA relationship checks are **Implemented**. The target composite decision also uses OPA for contextual/attribute rules and typed obligations, then carries those obligations to data executors for local enforcement. See [Security Architecture](../technical/security-architecture.mdx).

## Flexible data exchange models

The platform supports a range of data flows:

- **Pull-based APIs** — on-demand access to data records (NGSI-LD temporal, spatial, and attribute queries).
- **Push-based streams** — real-time updates via subscriptions.
- **Bulk file exchange** — resumable multipart uploads and presigned downloads for historical or large-scale data.

Data models supported include **public, restricted, and monetisable** datasets — the latter through the built-in [Marketplace](../components/marketplace.md). See [Data Access Models](./data-access-models.md).

## Single, secure entry point

All public traffic enters through one **API Gateway**. It validates OIDC/JWT credentials, obtains an audience-bound workload credential for the destination, and propagates subject or actor context separately. Receiving services verify both the immediate caller and its authority to assert that context. See the [API Gateway](../components/api-gateway.md).

## Organisation-aware governance

Organisations, org admins, and platform admins each have clearly scoped powers. Group policies grant access to whole organisations through the authorization graph — no per-user fan-out as organisations grow.

## Federated, cloud-native architecture

A modular fleet of independently deployable Go services separates the Control Plane, Data Plane, and Agentic Plane. The central topology is **In development**. A provider-operated federated topology is **Deferred** pending reviewed cross-domain trust, conformance, and operational controls.

## Community and engagement

Discussions and data challenges live alongside the catalogue — under the same identity and organisation model — so questions, answers, and challenge results stay connected to the resources they are about. See the [Community Layer](../components/community-layer.md).

## Security and observability

TLS in transit, OIDC/JWT authentication at the edge, audience-bound workload identity, composite OpenFGA/OPA authorization, fail-closed enforcement, audit events, Prometheus metrics, and health endpoints form the target security baseline. OpenFGA checks and observability are **Implemented**; composite OPA decisions and full workload-identity adoption are **Partially implemented** or **Planned**. See [Security Architecture](../technical/security-architecture.mdx) and [Monitoring & Health](../operations/monitoring.md).

---

## Feature summary

| Area | Highlights |
| --- | --- |
| **Open APIs & standards** | NGSI-LD · OGC API Features · JSON-LD catalogue · REST |
| **Discovery** | Geo-spatial, attribute, and text search over a JSON-LD catalogue |
| **Access control** | Explicit time-bound policies · OpenFGA ReBAC · planned OPA context/obligations · audit |
| **Flexible access** | Pull APIs · push streams (subscriptions) · bulk file exchange · marketplace |
| **Architecture** | Go microservices · single gateway · Control, Data & Agentic planes · configuration-selected deployment |
| **Security** | TLS · OIDC/JWT · audience-bound workloads · fail-closed authorization · rate limiting · audit |
