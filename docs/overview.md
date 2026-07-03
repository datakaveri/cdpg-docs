---
id: overview
title: Overview
sidebar_label: Overview
slug: /overview
description: The Data Exchange — an open-source platform for secure, consent-driven, standards-based sharing of data across organizations.
---

# Data Exchange Platform

**The Data Exchange (DX) is an open-source platform for the secure, authenticated, and consent-driven exchange of data between providers and consumers.**

It is developed by the **Centre of Data for Public Good (CDPG)** at the Indian Institute of Science (IISc), Bengaluru, as the next generation of the **India Urban Data Exchange (IUDX)** lineage. It is designed as **Digital Public Infrastructure (DPI)**: it interconnects data silos across cities, government bodies, academic institutions, and enterprises — rather than consolidating data into a central repository — so that providers retain full control over what data they expose and to whom.

The platform's architecture and API specifications have been adopted by the **Bureau of Indian Standards as IS 18003**, and the technology has been deployed across **50+ Indian smart cities** as well as in the agriculture, e-governance, and geospatial sectors.

## Foundational attributes

- **Open Source** — transparent, adaptable, and vendor-neutral.
- **API-driven and modular** — a cloud-native fleet of independently deployable microservices behind a single API gateway.
- **Secure and privacy-first** — authentication once at the edge, fine-grained relationship-based authorization on every data access, and a full audit trail.
- **Interoperable** — built on open standards (NGSI-LD, OGC, JSON-LD, OAuth2/OIDC) for collaboration across diverse systems and sectors.

## How it works

Everything a client does enters through one **API Gateway**, which authenticates the caller and propagates a signed identity to the internal services. Behind it, the platform separates two concerns:

- The **Control Plane** decides *who may access what* — the **Catalogue** (discovery), the **User service** (accounts, organisations), the **Policy service** (explicit, time-bound access grants), and the **Authorization service** (real-time permission checks backed by a relationship graph).
- The **Data Plane** serves *the content itself* — NGSI-LD queries, OGC geospatial APIs, streaming subscriptions, and bulk file exchange — asking the Authorization service one fast question per request.

The design is **federated**: a data plane can run inside a provider's own network while connecting to a central control plane, so data never has to leave the provider's custody. See the [System Architecture](./technical/architecture.mdx) for the full picture.

## Who it is for

The platform is designed to be deployed and operated by **governments, public agencies, enterprises, and research institutions** that need to share and consume data across organizational boundaries without surrendering control of their data.

## How to navigate these docs

| If you are a… | Start here |
| --- | --- |
| **Newcomer** — what is this platform? | [Key Features](./platform/key-features.md) · [Core Concepts](./concepts/core-concepts.md) |
| **Architect** — how is it built? | [System Architecture](./technical/architecture.mdx) · [Platform Components](/docs/category/components) |
| **Developer** — build against it | [Getting Started](./develop/getting-started.md) · [API Standards](./develop/api-standards.md) |
| **API consumer** — call the APIs | [Platform Endpoints](./develop/endpoints.md) · [API Reference](/docs/category/api-reference) |
| **DevOps / operator** — run it | [Local Development](./develop/local-development.md) · [Operations](/docs/category/operations) |
| **Migrating from the legacy platform** | [Migration Overview](./migration/overview.md) · [Client Migration Guide](./migration/client-guide.md) |
| **Contributor** — improve it | [Contributing](./resources/contributing.md) |

---

:::info Get in touch
For more details visit [dataforpublicgood.org.in](https://dataforpublicgood.org.in) or email **info@cdpg.org.in**.
:::
