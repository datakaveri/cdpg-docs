---
id: data-plane
title: Data Plane — Data Access
sidebar_label: Data Plane
description: The Data Exchange Data Plane — the services that ingest, query, stream, and deliver data under policy enforcement.
---

# Data Plane: The Content Itself

The **Data Plane** is where data actually flows. Once a consumer holds a valid grant, the data-side services are where they exercise it — every request checked in real time against the [Authorization Service](../components/authorization-service.md).

## Real-world data sources

The Data Plane ingests from a wide variety of sources: weather and market information, transit systems, IoT and sensor networks, public-service data, geospatial layers, and file-based archives.

## Ingestion

Data enters through **ingestion adapters** from several source types:

- **Streaming**, **spatial**, and **temporal** sources
- **Structured files** and **databases**
- **Unstructured files** — PDF, CSV, XLSX, and more

Adapters securely access data from the provider, remove or anonymise PII, handle duplicates, and transform data to the platform's data model. They either pull via a provider API or let the provider push into the message broker. See [Data Ingestion](../develop/data-ingestion.md).

## Data-access services

| Service | What it serves |
| --- | --- |
| **NGSI-LD search** | Latest-value, temporal, attribute, and geo-spatial queries over published datasets |
| **OGC API Features** | The same geospatial data through open OGC standards, so standard GIS tooling connects directly |
| **Subscriptions** | Consumers with `sub` access receive a stream of new data as it arrives, rather than polling |
| **File Exchange** | Bulk data as files — resumable uploads, presigned downloads, async processing |

See the [Data Plane component page](../components/data-plane.md) and [File Exchange](../components/file-exchange.md) for detail.

## Egress (data access)

Consumers access and consume data in multiple ways:

- **Data query APIs** — search, filter, and retrieve data using standard REST APIs (NGSI-LD).
- **Data streaming** — real-time subscriptions for live dashboards and applications.
- **File downloads** — datasets retrieved via short-lived presigned links from object storage.

Consumers include applications, dashboards, analytics, and external systems. Which models a given resource supports is declared in its catalogue entry — see [Data Access Models](../platform/data-access-models.md).

## How access is enforced

The data-side services never interpret policies themselves. On each request they ask the Authorization Service one question — *may this subject perform this access type on this resource?* — and serve or refuse accordingly. This keeps enforcement consistent platform-wide: the Data Plane, File Exchange, and any future component all enforce exactly the same grants.

:::note
All data access is **policy-based** and requires an authenticated identity. Every access attempt is **logged and audited**, ensuring compliance and traceability.
:::

See the [Control Plane](./control-plane.mdx) for discovery, identity, and policy.
