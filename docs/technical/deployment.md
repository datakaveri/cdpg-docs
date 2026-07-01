---
id: deployment
title: Deployment Architecture & Security
sidebar_label: Deployment & Security
description: The deployment components of the IUDX platform and the security best practices applied across the stack.
---

# Deployment Architecture & Security

## Deployment Architecture

![IUDX deployment architecture — explorers/contributors and admin reaching the IUDX cloud through a WAF, CloudFront, and NGINX load balancer/gateway into a private network of control- and data-plane servers, data stores, and observability tooling](/img/technical/arch-deployment.svg)
*Figure 9: Deployment Architecture*

Figure 9 depicts the deployment architecture of the **IUDX** platform, showing the flow of data and security mechanisms across components. External explorers and contributors reach the platform over HTTPS through a **CloudFront CDN with WAF** and an **NGINX load balancer / gateway**; large assets can be downloaded directly via signed URLs from object storage (AWS S3 or equivalent). Administrators access the private network for system-wide oversight.

### IUDX Cloud

The central cloud environment hosting core services and data-management infrastructure, divided into a **Private Network** and a **Public Network**, protected by firewalls and TLS.

### Gateways and Servers

- **Identity Gateway and Server** — authenticates and authorizes users using token-based access control, ensuring secure identification and permission handling before resource access.
- **AAA Gateway and Server** — the AAA (Authentication, Authorization, and Accounting) server validates tokens issued by the Identity Server, enforces data-access policies, and logs access activity for auditing.
- **Catalogue Gateway and Server** — manages requests for metadata and resources; the Catalogue Server holds metadata for all datasets, enabling search and discovery.
- **Resource Gateway and Server** — ingests and manages provider data; the Resource Server handles secure transfer and processing after validation.

### Data Pipeline

- **Data Broker** — handles data flow between the ingestion pipeline and core storage/processing, bridging external sources and internal services.
- **Credentials / Policy Data Store** — stores authentication and policy information to enforce access control and data-sharing rules.

### Data Stores

- **Meta-Data / Data Store** — stores dataset metadata and the data exchanged through the platform.
- **Auditing / Metering Data Store** — tracks resource usage, monitors access, maintains audit trails, and logs metering information for usage reporting.

### Operations

- **Metrics, Logs, and Monitoring** — continuously monitors platform health, capturing performance metrics and operational logs; critical events feed an **Alerting System** that notifies administrators.
- **Backup System** — maintains regular backups of essential data and configurations for disaster recovery and fault tolerance.

### Additional Deployment Components

The production deployment also includes components supporting the wider platform surface:

- **OGC Server** and **Files Connect Server** — serve geospatial APIs and file-based assets respectively, alongside the core Resource Server.
- **RS Proxy** — proxies resource access across the federated data plane.
- **Data stores** — RabbitMQ (data streaming and ingestion), Elasticsearch (data and meta-data store), PostgreSQL (credentials/policy and audit logs), ImmuDB (immutable audit logs), and a PostGIS geo-spatial data store.
- **Observability** — Prometheus, Grafana, and Loki for metrics, logs, and monitoring.

### Network Security

- **Public Network** — external users connect with secured token-based access; data must pass through security gateways (Identity, AAA, Catalogue, Resource) for validation and filtering.
- **Private Network** — internal data and services are protected from unauthorized access, hosting the main data pipeline, storage, and monitoring under controlled access by the DX Systems team.
- **Role of Admin** — the Admin entity, outside the private network, is responsible for system-wide oversight, policy management, performance monitoring, and system health.

Overall, this deployment provides multiple layers of security, data governance, and monitoring for smooth, secure, and efficient operation of the DX platform.

## Security Considerations

The following security best practices are followed in developing each core component:

- **TLS-based secure communications** between all components of IUDX.
- All services exposed strictly **per access-control policies**.
- **Certificate-based authentication** for issuing tokens (X.509 client certificates via mutual TLS — see the [Authorization Server](./authorization-server.md)).
- Communication between IUDX components is **not exposed to the public IP network**.
- An **API gateway** authenticates, controls, and analyzes API traffic.
- **Explicit validation** of HTTP requests to bar invalid requests.
- **Limited port exposure** for all public services.
- **Rate-limiting** provisions to prevent DDoS attacks on open resources.

All deployed services are secured at multiple touch points, employing:

- **TLS encryption** — all data between clients and the service is encrypted to protect against eavesdropping and tampering.
- **Input validation** — all client inputs are validated to prevent injection attacks and ensure data integrity.
- **Regular audits** — periodic security audits identify and address potential vulnerabilities.

## Docker Swarm deployment (single node)

The IUDX platform can be deployed on **Docker Swarm** using the scripts and stack files in the [iudx-deployment](https://github.com/datakaveri/iudx-deployment/tree/master/Docker-Swarm-deployment/single-node) repository. Each component runs as a single Swarm service and can be scaled manually.

The platform exposes endpoints through two ports: one for **HTTPS** traffic (passed to **NGINX**, which routes to the appropriate service) and one for **RabbitMQ** management and **AMQPS** streaming. The whole system is observed by a monitoring stack — **Prometheus** for metrics, **Promtail** and **Loki** for logs, and **Grafana** for visualization and alerting.

### When to use it

- **Manual scaling** — scale a service by increasing the number of replica containers backing it.
- **Cloud-agnostic** — a layered architecture and open-source tooling avoid dependence on cloud-specific services.
- **Cost-effective** — typically runs on a single node, or 4–6 nodes depending on load.
- **Best for** small-scale deployments, prototyping, and proofs-of-concept where high reliability is not critical. (For production-grade, highly available deployments, a Kubernetes-based deployment is recommended.)

### Layered architecture

Deployment follows a layered model, so a technology in any one layer can be swapped without affecting the rest — which is also what keeps the deployment cloud-agnostic. Layers are brought up from the innermost outward:

1. **Cloud infrastructure** — VPC, subnets, load balancers, IAM users/roles, service accounts, virtual machines, and security groups.
2. **Operating system** — any modern Linux server distribution supported by Docker; tested on **Ubuntu 20.04 / 22.04 LTS**.
3. **Docker** — `docker-ce`, the CLI, build, and the compose plugin installed on every node.
4. **Docker Swarm** — a Swarm cluster (one or more nodes) with an overlay network named `overlay-net`.
5. **Add-ons** — components essential to features but not part of the IUDX platform itself: the **NGINX** HTTPS API gateway and the **monitoring stack**.
6. **Workload / IUDX system** — the IUDX components themselves, deployed via Swarm stack files.

### Deployment order

IUDX components depend on one another (expressed in the repository as a Directed Acyclic Graph), so they are deployed in **six stages**, innermost dependencies first:

| Stage | Components |
| --- | --- |
| **1 — Datastores & broker** | immudb · RabbitMQ · PostgreSQL · Redis · ZooKeeper · Elasticsearch (ELK deployed together) |
| **2 — Logging, identity & ingestion** | Logstash · Kibana · Keycloak · Ingestion pipeline · Auditing server |
| **3 — Authorization** | AAA server |
| **4 — Catalogue** | Catalogue server |
| **5 — Data plane** | Resource Server · Resource Server Proxy · File server · GIS server · Data Ingestion server |
| **6 — Monitoring** | Advanced monitoring stack |

:::tip Get the deployment code
The Swarm stack files, infrastructure scripts, and the architecture/dependency diagrams are maintained in the [datakaveri/iudx-deployment](https://github.com/datakaveri/iudx-deployment) repository under `Docker-Swarm-deployment/single-node`.
:::
