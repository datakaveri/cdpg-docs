---
id: architecture
title: Service Architecture & Components
sidebar_label: Service Architecture
description: The microservices architecture of IUDX and a component-by-component breakdown of the control and data planes.
---

# Service Architecture & Components

IUDX employs a **cloud-universal, microservices-based architecture** that separates responsibilities across a **Control Plane** and a **Data Plane**. This modular design lets data providers and consumers interact securely and efficiently, in accordance with policy and consent, while individual high-load services scale independently.

![IUDX service components — the Catalogue, Authorization, and Resource Server(s) between consumer applications and data providers](/img/technical/arch-service-components.svg)
*Figure: IUDX service components*

A brief explanation of the core components follows.

### Authorization Server (AAA)

The Authorization Server provides identity, authentication, authorization (access control), and audit-log management. Identity services are based on the **Keycloak** open-source identity provider, and authentication uses the **OpenID Connect** framework. Access control to private and protected non-personal data is managed via **JSON Web Tokens (JWT)**: the server specifies APIs for token management (request, revoke, audit) and consent/policy-management APIs that let a provider set, update, and list access-control policies for its resources. See the [Authorization Server](./authorization-server.md) page for detail.

### Catalogue Server

The Catalogue Server provides resource discovery and search. It stores resource metadata as linked-data (**JSON-LD**) objects, with APIs for creating, updating, and deleting metadata, plus powerful search APIs to discover data sources using geo-spatial, attribute, and text queries. See the [Catalogue Server](./catalogue-server.md) page for detail.

### Resource Server

The Resource Server is the key component of the data plane. It provides data access via standard REST APIs (harmonized with **ETSI NGSI-LD**) and serves as the policy-enforcement point for resource access control, with logging and audit. Every resource server can be deployed in two modes:

- **Data Ingestion Mode** — providers push their existing datasets using data adaptors.
- **API Gateway Mode** — the server fetches data from the provider "on the fly" as requested by the consumer.

See the [Resource Server](./resource-server.md) page for detail.

#### Data Ingestion Adaptors

An adaptor is a specialized software module developed for each ingestion pipeline, ensuring continuous data flow between the provider and the platform. Adaptors securely access data from the provider, remove any Personally Identifiable Information (PII), handle duplicates, and transform data to fit the platform's data model. Each adaptor either pulls data via a provider API or lets the provider push data into the IUDX message broker using the **AMQPS** streaming protocol.

#### API Gateway Connectors

An API Gateway connector connects to a Data Provider — via API, database, JDBC connector, etc. — to fetch data when a consumer makes an access request. Each connector securely accesses data, removes PII where applicable, transforms data to the platform's model, and encrypts where applicable.

### Specialized Resource Servers

In addition to the standard Resource Server, IUDX provides resource-server variants for different data shapes:

- **OGC Server** — serves geospatial data via Open Geospatial Consortium (OGC) standard APIs, fed by dedicated OGC adaptors.
- **Streaming Server** — delivers real-time and time-series data streams using streaming protocols.
- **Files Server** — hosts file-based assets, including ZIP archives and individual files, for direct download.

### API Security

All API-based services follow relevant **OWASP API Security** guidelines — secure TLS-based communications, API gateways to analyze, authenticate, and control API traffic, limited port exposure, and rate limiting. Logging for all API usage and metering is stored in an immutable database such as **ImmuDB**. See [Deployment & Security](./deployment.md).

### Load Balancing

Each API server is front-ended with an API gateway that reduces the risk of attacks such as DDoS, limits requests per second and parallel connections, and distributes requests evenly across available services to ensure stability.

### Monitoring and Logging

For full system observability, IUDX captures developer-defined log messages and runtime system and service metrics:

- **Prometheus**-based VM system metrics (CPU, memory, network, etc.)
- **Prometheus**-based service metrics (API calls, event-bus metrics, JVM metrics, etc.)
- **Loki**-based developer log aggregation for runtime debugging and validation.
