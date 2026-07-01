---
id: data-plane
title: Data Plane — Data Access
sidebar_label: Data Plane
description: The IUDX Data Plane — the Resource Server, ingestion sources, deployment modes, and the ways consumers access data.
---

# Data Plane: The API Interface for Data Access

The **Data Plane** is where data actually flows. Its core component, the **Resource Server**, supports multiple data sources and formats and serves as the policy-enforcement point for resource access control, with full logging and audit.

![IUDX Data Plane — real-world data sources, ingestion, the Resource Server with deployment modes and core capabilities, egress data-access services, and data consumers](/img/technical/data-plane.png)
*Figure: Data Plane — the API interface for data access*

## Real-World Data Sources

The Data Plane ingests from a wide variety of sources: weather and market information, transit systems, ambulance and emergency services, IoT and sensor networks, public-service data, and other external sources.

## Ingestion

Data enters through **Data Ingestion Adaptors** from several source types:

- **Streaming**, **spatial**, and **temporal** sources
- **Structured files** and **databases**
- **Unstructured files** — PDF, CSV, XLSX, and more

## Resource Server

The Resource Server exposes **REST APIs** and applies **policy enforcement** and **logging & audit** as policy-enforcement points for resource access control. It runs in two deployment modes:

- **Data Ingestion Mode** — providers push their existing datasets into the platform using adaptors.
- **API Gateway Mode** — the server fetches data from the provider "on the fly" as and when requested by the consumer.

**Core capabilities:** authentication, authorization, rate limiting, monitoring, and audit logging.

## Egress (Data Access)

Consumers access and consume data in multiple ways:

- **Data Query APIs** — search, filter, and retrieve data using standard REST APIs.
- **Data Streaming** — real-time data streaming for live dashboards and applications.
- **File Downloads** — datasets as zipped archives or retrieved using specific file keys.

Consumers include applications, dashboards, analytics, and external systems.

## Data Ingestion Adaptors

An adaptor is a specialized software module that establishes a continuous data pipeline between the provider and IUDX. Adaptor responsibilities include securely accessing data from the provider, removing or anonymizing PII, handling duplicate data at an initial stage, transforming data to the platform's data model, and encryption where applicable. Adaptors operate in two ways:

- **Pull via provider API** — the adaptor pulls data using the provider's APIs.
- **Push via message broker** — the provider pushes data directly into the message broker using the **AMQPS** streaming protocol.

:::note
All data access is **consent-based** and requires an authentication token for validation. Every access attempt is **logged and governed** by defined user roles, ensuring compliance and auditability.
:::

See the [Control Plane](./control-plane.md) for discovery, identity, and consent, and [Data Access Models](../platform/data-access-models.md) for the ways consumers access data.
