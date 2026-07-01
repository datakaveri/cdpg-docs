---
id: overview
title: Architecture Overview & Interfaces
sidebar_label: Overview & Interfaces
description: What IUDX does, its three core services, the control and data planes, and the interfaces that connect them.
---

# Architecture Overview & Interfaces

IUDX facilitates controlled and secure **any-to-any exchange** of all forms of public and privately owned data. It provides a set of services that enable providers to publish data and data sources, and consumers to consume resources from one or more data servers — based on explicit consent obtained from the provider.

IUDX addresses two key stakeholders: **Data Providers** and **Data Consumers**. A provider makes data resources available through the exchange and retains full authority and ownership to control access and authorize consumers. A consumer uses those resources for purposes such as application development. The high-level objective is to enable seamless, secure access of data to consumers while respecting the access-control policies set by the provider.

## Control Plane and Data Plane

![IUDX data-exchange ecosystem — industry/startup and smart e-governance consumers connected through the IUDX Control Plane and Data Plane to data sources and providers](/img/technical/arch-ecosystem.svg)
*Figure: Data-exchange ecosystem*

IUDX separates responsibilities across two planes:

- The **Control Plane** manages user registration, data-access management, consent validation, metadata management, and data discovery.
    - **Catalogue service** — provided by the [Catalogue Server](./catalogue-server.md). Hosts the structured, human- and machine-readable meta-information (formats, units, resource type, etc.) for each data resource; providers manage it via management APIs and consumers discover resources via search APIs.
    - **Authorization & Authentication services** — provided by the [Authorization Server](./authorization-server.md). Registers and modifies access-control policies, handles stakeholder registration and token issuance, and provides the token-validation services used by resource servers.
- The **Data Plane** focuses on data delivery, auditing, and metering.
    - **Data access & ingestion services** — provided by one or more [Resource Servers](./resource-server.md). Data resources owned by a provider are hosted here and accessed via open, standard data-access APIs; resource servers also expose publication endpoints so providers can ingest data.

Data is sourced from providers through a Data Ingestion Adapter or API Gateway Connector. Provider-set access policies are enforced by IUDX before any data is delivered to a consumer. Applications retrieve data using a connector that subscribes via streaming protocols and RESTful APIs.

These services are designed against a consistent set of [Design Principles](./design-principles.md).

## IUDX interfaces

The platform is defined by a small set of interfaces: **Resource/Data access (R)**, **Discover (D)**, **Management (M)**, **Authorization and access control (A)**, **Consent (C)**, and **Identity (I)**. The data-access, discovery, management, and authorization interfaces are based on the published **IS 18003 Unified Data Exchange BIS standard**; the identity service is based on the **OIDC** protocol, and the consent interface is out-of-band.

![IUDX interface view — data-consumer applications interacting with the Control Plane and Data Plane via the R, A, D, M, C, and I interfaces](/img/technical/arch-interface-view.svg)

*Figure: Workflow within the platform (interface view)*

A consumer uses the **Discovery (D)** interface to identify available resources, obtains consent for a resource via the **Consent (C)** interface, requests an access token via the **Authorization (A)** interface, and presents that token to the **Resource (R)** interface to access the data. Providers maintain resource metadata and access-control policies via the **Management (M)** interface, and register with the platform via **Identity (I)**.

### Interface definitions

| Interface | Functionality | Users |
| --- | --- | --- |
| **Management (M)** | Create, update, and delete catalogue items; create, update, and deactivate policies for non-personal datasets | Data Providers and their delegates |
| **Consent (C)** | Upload, revoke, and audit consent artefacts for a resource, purpose, and data principal | Data Providers, Data Consumers, and delegates |
| **Discovery (D)** | List and search metadata in the catalogue | Data Providers, Data Consumers, and delegates |
| **Authorization (A)** | Obtain an access token from the Authorization Server | Data Providers, Data Consumers, and delegates |
| **Resource (R)** | Obtain data for a resource from the Resource Server | Data Consumers and their delegates |
| **Identity (I)** | Register with the IUDX platform | Data Providers, Data Consumers, and delegates |

:::tip Explore the planes
See the [Control Plane](./control-plane.md) (discovery, identity, consent) and the [Data Plane](./data-plane.md) (data access) for the full API surface behind these interfaces.
:::
