---
id: technology-stack
title: Technology Stack
sidebar_label: Technology Stack
description: The open-source technology stack used to build, deploy, secure, and operate the Data Exchange — explained layer by layer.
---

# Technology Stack

All software used to build and deploy the Data Exchange is **open-source licensed**, ensuring transparency and compliance with licensing terms. The stack is organized into functional layers, each combining a few proven open-source tools.

## Application services

**Go · chi router · OpenAPI**

The platform services are written in **Go** — small, fast, statically compiled binaries with a common service skeleton. HTTP routing uses **chi**; every service embeds its **OpenAPI** contract and validates requests against it before any handler runs. A shared library (`dx-common-go`) provides authentication, persistence, messaging, and response handling so services stay thin — see [SDKs & Shared Libraries](../develop/sdks-libraries.md).

The previous-generation services (**Vert.x**/Java, Node.js, Python) remain in operation during the migration period — see [Migration](../migration/overview.md).

## Identity & access

**Keycloak · OpenFGA**

**Keycloak** is the identity provider — user registration, OIDC login (with PKCE), token issuance, and service accounts. **OpenFGA** is the relationship-tuple store behind the Authorization Service, evaluating Zanzibar-style ReBAC checks on the hot path of every data request.

## Data stores

**PostgreSQL · Elasticsearch · Redis · MinIO (S3)**

Different stores serve different needs. **PostgreSQL** holds relational data — policies, accounts, organisations, credits, subscriptions (with **PostGIS** for OGC geospatial features). **Elasticsearch** indexes catalogue metadata and resource data for fast geo-spatial, attribute, and text search. **Redis** provides in-memory caching (token keys, sessions, rate limits). **MinIO** (or any S3-compatible store) holds file-exchange content, served via presigned URLs.

## Messaging

**RabbitMQ**

**RabbitMQ** is the message broker that powers asynchronous, event-driven flow: policy and membership events into the authorization graph, file-processing jobs, audit events, email notifications, and live data feeding subscriptions. Critical events use a **transactional outbox** so a committed change is never lost. See the [Messaging Backbone](../components/messaging-backbone.md).

## Ingestion

**Adapters (Go/Python) · Logstash**

The ingestion layer brings provider data into the exchange — custom adapters for APIs, files, IoT, and message queues, with **Logstash** available for shipping into the search store.

## API gateway & security

**dx-gateway (Go) · NGINX · TLS**

The platform's own **API Gateway** authenticates every request (JWT via Keycloak JWKS, app credentials for machines), enforces authorization, signs internal identity headers, and reverse-proxies to services. **NGINX** fronts deployments as load balancer/TLS terminator; **TLS** secures all communications in transit.

## Deployment & orchestration

**Docker · Kubernetes · Helm · ArgoCD**

Services are packaged with **Docker** (multi-stage builds to minimal images), orchestrated by **Kubernetes** using **Helm** charts, and deployed declaratively through **ArgoCD** GitOps — see [Deployment & GitOps](../operations/deployment-gitops.md). Local development runs the whole platform with **Docker Compose** — see [Local Development](../develop/local-development.md).

## Observability

**Prometheus · Grafana · Loki**

Every service exposes Prometheus metrics and structured logs. **Prometheus** collects system and service metrics, **Grafana** visualizes platform health and performance, and **Loki** aggregates logs for debugging. See [Monitoring & Health](../operations/monitoring.md).

## User interfaces

**Angular · React**

The web front-ends — catalogue/data explorer and admin interfaces — are built with **Angular** and **React**, giving consumers and providers a single view over the resources available on the exchange.

---

## Stack summary

| Layer | Technologies |
| --- | --- |
| Services | Go, chi, OpenAPI (legacy: Vert.x/Java, Node.js, Python) |
| Identity & access | Keycloak (OIDC), OpenFGA (ReBAC) |
| Data stores | PostgreSQL/PostGIS, Elasticsearch, Redis, MinIO/S3 |
| Messaging | RabbitMQ |
| Edge | dx-gateway (Go), NGINX, TLS |
| Deployment | Docker, Kubernetes, Helm, ArgoCD |
| Observability | Prometheus, Grafana, Loki |
| UI | Angular, React |
