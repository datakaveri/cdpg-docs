---
id: design-principles
title: IUDX Design Principles
sidebar_label: Design Principles
description: The twelve design principles that guide the architecture and implementation of IUDX, and their alignment with NUIS and IndEA.
---

# IUDX Design Principles

IUDX adheres to the following design principles, which serve as guidelines for the design and implementation of the various interfaces in the exchange layer. The architecture, API specification, and implementation of IUDX are all designed using these principles.

## The twelve principles

| Principle | What it means |
| --- | --- |
| **Open APIs and Standards** | Open APIs, data models, and exchange standards enable data interoperability, functional extensibility, and information exchange across application verticals and city departments. IUDX aligns with existing standards and promotes reuse of taxonomies and vocabularies. |
| **Consent-driven data sharing** | Data is shared with a consumer only if the provider explicitly provides consent, preserving the privacy of data. |
| **Minimalistic by design** | APIs are minimalistic and domain-agnostic to be inclusive across a wide range of applications, while extensible data models let providers add custom metadata and data attributes. |
| **Secure by design** | Security is incorporated into the design of all components from the ground up, following security best practices in component design and implementation. |
| **Accountability** | IUDX ensures accountability of all transactions that require authentication and authorization, carried out by various stakeholders. |
| **Unbundling** | Complex tasks are broken into smaller microservices, enabling efficient and robust design. Seamless data exchange is split into simpler interfaces organized as multiple microservices. |
| **User-centric** | The design takes the two key stakeholders — data providers and consumers — into account and simplifies their interactions with the exchange layer. |
| **Scalable by design** | Components are designed to scale. A federated design is supported for data-access services, so multiple servers can co-exist and reduce data bottlenecks. |
| **Technology-agnostic** | The design is neutral to applications, programming languages, and platforms, providing seamless and secure flow of data between stakeholders. |
| **Open source** | IUDX is an open-source software product using leading open-source tools and technologies, with no proprietary tools or services. |
| **Cloud-deployable** | IUDX is designed for cloud deployment and can utilize state-of-the-art cloud infrastructure. |
| **Extensibility, modularity & service orientation** | The design is extensible, modular, and service-oriented, enabling scaling up/down without affecting other components and allowing independent design and development. |

## Services architecture

IUDX is a platform made of an aggregation of different services — for example, the Resource Server Database, Resource Server Databroker, and Catalogue Server Database. Following the **unbundling** and **service orientation** principles, each capability is implemented as an independent microservice within a service-mesh architecture, so high-load services can scale independently. The three core services are the [Catalogue Server](./catalogue-server.md), the [Authorization Server](./authorization-server.md), and one or more [Resource Servers](./resource-server.md).

## Alignment with NUIS and IndEA

IUDX's principles map directly onto the **National Urban Innovation Stack (NUIS)** design principles from the NUIS digital blueprint:

| NUIS principle | How IUDX aligns |
| --- | --- |
| **Interoperability through Open APIs & Standards** | "Open APIs and data models for data exchange" ensures interoperability and enables innovative applications across verticals. |
| **Privacy and Security by Design** | "Consent-driven data sharing" plus "Secure by design" (HTTPS APIs) ensure authenticity, confidentiality, and integrity, sharing data only with authorized entities. |
| **Extensibility through Layered Design** | "Extensibility, modularity and service orientation" keeps components modular and independently evolvable. |
| **Evolvability and Scale** | "Scalable by design", "modularity", and "Cloud deployable" let services scale horizontally and cost-effectively. |
| **Federated Architecture** | "Scalable by design" lets the data-access microservice operate in a federated mode for distributed data handling. |
| **Transparency and Accountability** | Open APIs make public open data available for analysis, supporting transparency of operations. |
| **Inclusive and Domain Modeling** | "Open APIs" and "Minimalistic by design" serve a diverse set of developers; domain-specific models are handled via extensible data models. |
| **Minimalistic** | APIs and data models follow the "Minimalistic by design" principle. |
| **Unbundling** | Exactly aligned with the NUIS unbundling principle — a key factor in designing the APIs. |
| **Non-Repudiable** | "Accountability" ensures all stakeholder transactions are logged and available for internal audit. |

IUDX also aligns with the **IndEA** (India Enterprise Architecture) reference models. Of the eight reference models, the **Data Reference Model**, **Technology Reference Model**, and **Security Reference Model** are the most relevant to a data-exchange layer, and IUDX is aligned with the broad principles defined for each.
