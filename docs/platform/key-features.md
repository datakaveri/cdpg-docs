---
id: key-features
title: Key Features
sidebar_label: Key Features
description: The Data Exchange capability set — open APIs, discovery, policy-driven access control, flexible data access, and security.
---

# Key Features

The Data Exchange represents a shift from fragmented, closed data systems to an open, secure, and interoperable data ecosystem. Its key capabilities are:

## Open, standards-based APIs

Resource-access APIs harmonized with **ETSI NGSI-LD**, native **OGC API Features** for geospatial data, plus RESTful APIs throughout — enabling interoperability with legacy and modern systems and semantic data modeling for richer context.

## Discovery and metadata

A **Catalogue service** indexes and describes available datasets, AI models, and applications as linked-data (**JSON-LD**) objects, with geo-spatial, attribute, and free-text search so consumers can find relevant resources. See the [Catalogue](../components/catalogue.md).

## Policy-driven access control

Every access is an **explicit, time-bound policy** the provider (or their organisation's admin) granted and can revoke at any time. Policies are enforced in real time through **relationship-based access control (ReBAC)** — a graph of who relates to what, checked on every data request — with audit logs for traceability. Providers define precisely who can access what, down to *which user may call which API on which dataset, until when*. See [Core Concepts](../concepts/core-concepts.md).

## Flexible data exchange models

The platform supports a range of data flows:

- **Pull-based APIs** — on-demand access to data records (NGSI-LD temporal, spatial, and attribute queries).
- **Push-based streams** — real-time updates via subscriptions.
- **Bulk file exchange** — resumable multipart uploads and presigned downloads for historical or large-scale data.

Data models supported include **public, restricted, and monetisable** datasets — the latter through the built-in [Marketplace](../components/marketplace.md). See [Data Access Models](./data-access-models.md).

## Single, secure entry point

All traffic enters through one **API Gateway** that authenticates each caller once (OIDC/JWT for users, app credentials for machines) and propagates a **cryptographically signed identity** to internal services — one place to reason about authentication, rate limiting, and routing. See the [API Gateway](../components/api-gateway.md).

## Organisation-aware governance

Organisations, org admins, and platform admins each have clearly scoped powers. Group policies grant access to whole organisations through the authorization graph — no per-user fan-out as organisations grow.

## Federated, cloud-native architecture

A modular fleet of independently deployable microservices separating the Control Plane and Data Plane. A data plane can run **inside a provider's own network** (federated topology) while connecting to a central control plane — data never leaves the provider's custody. Supports both **centralised** (national/state) and **federated** (departmental/city) deployments.

## Community and engagement

Discussions and data challenges live alongside the catalogue — under the same identity and organisation model — so questions, answers, and challenge results stay connected to the resources they are about. See the [Community Layer](../components/community-layer.md).

## Security and observability

TLS in transit, JWT validation at the edge with HMAC-signed internal identity, per-request authorization checks, audit events from every mutating endpoint, and Prometheus-based metrics with health endpoints on every service. See [Security](../operations/security.md) and [Monitoring & Health](../operations/monitoring.md).

---

## Feature summary

| Area | Highlights |
| --- | --- |
| **Open APIs & standards** | NGSI-LD · OGC API Features · JSON-LD catalogue · REST |
| **Discovery** | Geo-spatial, attribute, and text search over a JSON-LD catalogue |
| **Access control** | Explicit time-bound policies · ReBAC (OpenFGA) · real-time enforcement · audit |
| **Flexible access** | Pull APIs · push streams (subscriptions) · bulk file exchange · marketplace |
| **Architecture** | Cloud-native microservices · single gateway · Control & Data planes · federated |
| **Security** | TLS · OIDC/JWT at the edge · signed internal identity · rate limiting · audit |
