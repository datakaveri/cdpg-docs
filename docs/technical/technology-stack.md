---
id: technology-stack
title: Technology Stack
sidebar_label: Technology Stack
description: The open-source technology stack used to build, deploy, secure, and operate IUDX — explained layer by layer.
---

# Technology Stack

All software used to build and deploy IUDX is **open-source licensed** and used in its original form, ensuring transparency and compliance with licensing terms. The stack is organized into functional layers, each combining a few proven open-source tools.

![IUDX technology stack — API server, data broker, ingestion, development & testing, data store, gateway & security, deployment, logging, UI, monitoring, sandbox & analytics, and community layers](/img/technical/tech-stack.svg)
*Figure: IUDX technology stack*

## API Server

**Vert.x · Node.js · OpenAPI**

The API servers expose the platform's HTTPS endpoints and act as API gateways for providers and consumers. **Vert.x** provides a high-performance, event-driven, reactive runtime on the JVM; **Node.js** backs lighter-weight services; and **OpenAPI** defines the API contracts so requests can be validated against the specification before any service is invoked.

## Data Broker

**RabbitMQ**

**RabbitMQ** is the message broker that powers asynchronous, event-driven data flow. Adaptors and sensor gateways publish into exchanges; consumers subscribe to queues — enabling the platform's push-based streaming and decoupling producers from consumers.

## Data Ingestion

**Python · Apache NiFi · Logstash**

The ingestion layer brings provider data into the exchange. **Python** powers custom adaptors and transformations; **Apache NiFi** provides visual, flow-based data routing and processing pipelines; and **Logstash** ingests, transforms, and ships data (notably into the search store).

## Development and Testing Tools

**JavaScript · Bash · JMeter · Postman**

The tooling used to build and validate the platform. **JavaScript** and **Bash** for scripting and automation; **Apache JMeter** for load and performance testing; and **Postman** for API development and functional testing.

## Data Store

**Elasticsearch · PostgreSQL · Redis · immudb**

Different stores serve different needs. **Elasticsearch** indexes resource data and metadata for fast geo-spatial, attribute, and text search; **PostgreSQL** holds relational data such as credentials and access policies; **Redis** provides in-memory caching; and **immudb** is an immutable, tamper-evident database used for audit and metering logs.

## API Gateway and Security

**NGINX · Keycloak · SSL/TLS**

The security front door. **NGINX** is the API gateway and reverse proxy that authenticates, controls, and rate-limits traffic; **Keycloak** is the identity and access-management provider (OpenID Connect); and **SSL/TLS** secures all communications in transit.

## Deployment, Scaling and Clustering

**Hazelcast · Docker · Kubernetes · Rancher · ZooKeeper**

The cloud-native foundation. Services are packaged with **Docker**, orchestrated and scaled by **Kubernetes**, and managed across clusters with **Rancher**. **Hazelcast** provides distributed in-memory clustering for stateful services, and **Apache ZooKeeper** handles coordination and configuration for distributed components.

## Logging and System Metrics

**Micrometer · Loki · Prometheus**

Instrumentation across the stack. **Micrometer** exposes application metrics from the services; **Prometheus** collects and stores system and service metrics; and **Loki** aggregates developer and runtime logs for debugging and validation.

## User Interface

**Angular · React**

The web front-ends — such as the catalogue/data explorer and admin interfaces — are built with **Angular** and **React**, giving consumers and providers a single view over the data resources available on the exchange.

## System Monitoring

**Grafana · Kibana**

Dashboards and visualization. **Grafana** visualizes metrics from Prometheus (platform health and performance), while **Kibana** explores logs and search data from Elasticsearch.

## Sandbox and Analytics Layer

**JupyterHub · Apache Superset**

A lightweight analytics surface over exchange data. **JupyterHub** hosts multi-user notebooks for data-science and analysis workflows, and **Apache Superset** provides self-service dashboards and data exploration.

## Community Layer

**osTicket**

**osTicket** is the open-source support-ticket system used to handle queries and support requests from the platform's community of providers, consumers, and developers.
