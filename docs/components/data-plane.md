---
sidebar_position: 7
title: Data Plane Services
description: NGSI-LD, OGC, subscription, and file services that ingest, query, filter, and deliver governed data.
---

# Data Plane Services

The Data Plane executes governed data operations. It is not one service and it is not a policy authority.

| Service | Capability | Status |
| --- | --- | --- |
| `dx-dataplane-rs-go` | NGSI-LD entity, temporal, spatial, aggregation, and search paths | **Partially implemented** |
| `dx-dataplane-ogc-go` | OGC Features, Tiles, Coverages, Processes/jobs, Records-lite, CQL2, CRS | **Partially implemented** |
| `dx-subscription-go` | Subscription definitions and asynchronous delivery | **Implemented** |
| `dx-files-connect-api-go` | Multipart upload, object access, metadata, and processing jobs | **Partially implemented** |

## Authorization model

The gateway or owning control-plane service obtains a decision before dispatch and carries a signed, short-lived decision artifact or equivalent verified context. Data services validate that artifact and enforce typed obligations such as filters, field masks, limits, purpose, or expiry while compiling the query or issuing an object-store capability.

Data-plane executors **do not synchronously call the PDP**. A missing, expired, mismatched, or unsupported carried decision is denied. This keeps policy availability out of high-volume query execution without moving policy interpretation into each data service.

## Data ownership

- Elasticsearch stores indexed NGSI-LD entity and temporal data.
- PostGIS stores geospatial feature, coverage, process, and records data.
- S3-compatible storage holds file payloads; service-owned PostgreSQL records hold metadata and job state.
- RabbitMQ carries ingestion, subscription, processing, audit, and notification events.

Each service owns its schema/index/bucket namespace, query compilation, consistency checks, retry rules, and recovery procedure. Catalogue metadata, policy records, and relationship tuples remain Control Plane data.

See [Data Plane Architecture](../technical/data-plane.md), [Data Consumption](../flows/data-consumption.mdx), and [File Processing](../flows/file-processing.md).
