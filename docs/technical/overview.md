---
id: overview
title: Architecture Overview & Interfaces
sidebar_label: Overview & Interfaces
description: What the Data Exchange does, its control and data planes, and the standard interfaces (IS 18003) that connect them.
---

# Architecture Overview & Interfaces

The Data Exchange facilitates controlled and secure **any-to-any exchange** of all forms of public and privately owned data. It provides a set of services that enable providers to publish data and data sources, and consumers to consume resources from one or more data servers — based on explicit access grants from the provider.

The platform addresses two key stakeholders: **Data Providers** and **Data Consumers**. A provider makes data resources available through the exchange and retains full authority and ownership to control access and authorize consumers. A consumer uses those resources for purposes such as application development. The high-level objective is to enable seamless, secure access of data to consumers while respecting the access-control policies set by the provider.

## Control Plane and Data Plane

![Data-exchange ecosystem — industry/startup and smart e-governance consumers connected through the Control Plane and Data Plane to data sources and providers](/img/technical/arch-ecosystem.svg)
*Figure: Data-exchange ecosystem*

The platform separates responsibilities across two planes:

- The **Control Plane** manages user registration, data-access management, policy enforcement decisions, metadata management, and data discovery.
    - **Catalogue service** — hosts the structured, human- and machine-readable meta-information (formats, units, resource type, etc.) for each data resource; providers manage it via management APIs and consumers discover resources via search APIs. See the [Catalogue](../components/catalogue.md).
    - **Identity, policy & authorization services** — user and organisation management, explicit access policies, and real-time permission checks. See the [Control Plane](./control-plane.md).
- The **Data Plane** focuses on data delivery, auditing, and metering.
    - **Data access & ingestion services** — data resources owned by a provider are hosted here and accessed via open, standard data-access APIs (NGSI-LD, OGC); the plane also serves bulk files and streaming subscriptions. See the [Data Plane](./data-plane.md).

Data is sourced from providers through data-ingestion adapters or fetched on demand. Provider-set access policies are enforced by the platform before any data is delivered to a consumer.

These services are designed against a consistent set of [Design Principles](./design-principles.md).

## Standard interfaces

The platform is defined by a small set of interfaces: **Resource/Data access (R)**, **Discover (D)**, **Management (M)**, **Authorization and access control (A)**, **Consent (C)**, and **Identity (I)**. The data-access, discovery, management, and authorization interfaces are based on the published **IS 18003 Unified Data Exchange BIS standard**; the identity service is based on the **OIDC** protocol, and the consent interface is out-of-band.

![Interface view — data-consumer applications interacting with the Control Plane and Data Plane via the R, A, D, M, C, and I interfaces](/img/technical/arch-interface-view.svg)

*Figure: Workflow within the platform (interface view)*

A consumer uses the **Discovery (D)** interface to identify available resources, obtains access for a resource via the **Consent (C)** interface, authenticates via the **Authorization (A)** interface, and calls the **Resource (R)** interface to access the data. Providers maintain resource metadata and access-control policies via the **Management (M)** interface, and register with the platform via **Identity (I)**.

### Interface definitions

| Interface | Functionality | Users |
| --- | --- | --- |
| **Management (M)** | Create, update, and delete catalogue items; create, update, and deactivate policies for non-personal datasets | Data Providers and their delegates |
| **Consent (C)** | Upload, revoke, and audit consent artefacts for a resource, purpose, and data principal | Data Providers, Data Consumers, and delegates |
| **Discovery (D)** | List and search metadata in the catalogue | Data Providers, Data Consumers, and delegates |
| **Authorization (A)** | Authenticate and obtain an access token | Data Providers, Data Consumers, and delegates |
| **Resource (R)** | Obtain data for a resource from the data plane | Data Consumers and their delegates |
| **Identity (I)** | Register with the platform | Data Providers, Data Consumers, and delegates |

:::tip Explore the planes
See the [Control Plane](./control-plane.md) (discovery, identity, policy) and the [Data Plane](./data-plane.md) (data access) for the services behind these interfaces, and the [System Architecture](./architecture.md) for how they fit together.
:::
