---
id: key-features
title: Key Features
sidebar_label: Key Features
description: The IUDX capability set — open APIs, discovery, consent and access control, flexible data access, and security.
---

# Key Features

IUDX represents a shift from fragmented, closed data systems to an open, secure, and interoperable data ecosystem. Its key capabilities are:

## Open, standards-based APIs

Resource-access APIs harmonized with **ETSI NGSI-LD**, plus support for **OGC**, **GTFS**, **FHIR**, and RESTful APIs — enabling interoperability with legacy and modern systems and semantic data modeling for richer context.

## Discovery and metadata

A **Catalogue Server** indexes and describes available datasets, APIs, and metadata as linked-data (**JSON-LD**) objects, with powerful geo-spatial, attribute, and text search so consumers can find relevant resources.

## Consent and access control

Dynamic, user-defined access policies, **consent-driven data sharing**, a policy engine and authorization services that validate access at runtime, and audit logs for traceability and transparency. Providers define precisely who can access what, and under what terms.

## Flexible data exchange models

The platform supports a range of data flows:

- **Pull-based APIs** — on-demand access to data records.
- **Push-based streams** — real-time updates.
- **Bulk downloads** — for historical or large-scale analysis.

Data models supported include **public, restricted, and monetisable** datasets. See [Data Access Models](./data-access-models.md).

## Federated, cloud-native architecture

A modular, microservices architecture separating the Control Plane and Data Plane. Multiple, independently operated resource servers — including third-party servers — coexist in a single federated exchange, supporting both **centralised** (national/state) and **federated** (departmental/city) deployments.

## Security and observability

TLS everywhere, certificate-based authentication, API gateways for traffic control and rate limiting, immutable audit logs, and Prometheus/Grafana/Loki-based monitoring. See [Deployment & Security](../technical/deployment.md).

---

## Feature summary

| Area | Highlights |
| --- | --- |
| **Open APIs & standards** | NGSI-LD · OGC · GTFS · FHIR · REST · JSON-LD catalogue |
| **Discovery** | Geo-spatial, attribute, and text search over a JSON-LD catalogue |
| **Consent & access control** | Dynamic policies · consent-driven sharing · policy engine · audit logs |
| **Flexible access** | Pull APIs · push streams · bulk downloads |
| **Architecture** | Cloud-native microservices · Control & Data planes · federated |
| **Security** | TLS · certificate auth · API gateway · immutable audit |
