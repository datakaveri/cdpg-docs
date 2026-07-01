---
id: overview
title: Overview
sidebar_label: Overview
slug: /overview
description: IUDX — an open-source data exchange that enables secure, consent-driven, standards-based sharing of data across organizations.
---

# IUDX

**The Intelligent Universal Data Exchange (IUDX) is an open-source platform for secure, authenticated, and consent-driven exchange of data between providers and consumers.**

IUDX is developed by the **Centre of Data for Public Good (CDPG)** at the Indian Institute of Science (IISc), Bengaluru. It is designed as **Digital Public Infrastructure (DPI)**: which interconnects data silos across cities, government bodies, academic institutions, and enterprises, rather than consolidating data into a central repository, so that providers retain full control over what data they expose and to whom.

IUDX's architecture and API specifications have been adopted by the **Bureau of Indian Standards as IS 18003**, and the platform has been deployed across **50+ Indian smart cities** as well as in the agriculture, e-governance, and geospatial sectors.

## Foundational attributes

- **Open Source** — transparent, adaptable, and vendor-neutral.
- **API-driven and modular** — a cloud-native, microservices architecture that is easy to integrate and extend.
- **Secure and privacy-first** — protecting data ownership and trust through consent and policy enforcement.
- **Interoperable** — built on open standards (NGSI-LD, OGC, and others) for collaboration across diverse systems and sectors.

## How it works

IUDX is made up of three core services and two planes:

- A **Catalogue Server** for discovering datasets, APIs, and metadata.
- An **Authorization Server** for identity, access policy, and consent.
- One or more **Resource Servers** that publish and serve the data.

The **Control Plane** governs discovery, identity, and consent; the **Data Plane** delivers data, with auditing and metering. The design is **federated** — multiple, independently operated resource servers (including third-party servers) can coexist in a single exchange.

## Who it is for

IUDX is designed to be deployed and operated by **governments, public agencies, enterprises, and research institutions** that need to share and consume data across organizational boundaries without surrendering control of their data.

## How to navigate these docs

| If you want to… | Start here |
| --- | --- |
| Understand the architecture | [Architecture Overview & Interfaces](./technical/overview.md) |
| See the capability set | [Key Features](./platform/key-features.md) |
| Learn how data is accessed | [Data Access Models](./platform/data-access-models.md) |
| Understand standards & interoperability | [The Role of Standards](./platform/standards.md) |
| Build against the platform | [Getting Started for Developers](./develop/getting-started.md) |
| See where it is deployed | [Use Cases](./adoption/use-cases.md) |

---

:::info Get in touch
For more details visit [dataforpublicgood.org.in](https://dataforpublicgood.org.in) or email **info@cdpg.org.in**.
:::
