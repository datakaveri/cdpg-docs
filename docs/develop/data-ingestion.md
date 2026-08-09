---
id: data-ingestion
title: Data Ingestion
sidebar_label: Data Ingestion
description: Publish data into the Data Exchange using pluggable adapters for APIs, files, IoT, and message queues.
---

# Data Ingestion

The **ingestion layer** provides pluggable adapters for APIs, files, IoT, and message queues, with secure onboarding and validation for diverse data streams.

## Supported sources

| Source type | Examples |
| --- | --- |
| **APIs** | REST/HTTP endpoints, third-party data services |
| **Files** | Batch uploads and archival datasets — via the [File Exchange](../components/file-exchange.md) |
| **IoT** | Sensor streams, real-time device telemetry |
| **Message queues** | Async, high-throughput event streams into the [messaging backbone](../components/messaging-backbone.md) |

The platform natively supports **time-series, streaming, and async data** — not just transactional, batch-oriented exchange.

## Onboarding flow

1. **Register as a provider** through the platform's identity provider.
2. **Describe the resource** — publish its metadata to the [Catalogue](../components/catalogue.md), declaring which access types it will support (`api`, `file`, `sub`).
3. **Configure an adapter** for your source type (API, file, IoT, or queue). Adapters transform data to the platform's model, remove or anonymise PII, and handle duplicates.
4. **Ingest** — push into the message broker or let the platform pull from your API; file-based data uploads through the File Exchange's resumable multipart flow.
5. **Set policy** — grant access to consumers (or leave metadata discoverable and approve access requests as they come).
6. **Publish** — the resource becomes discoverable and accessible per your chosen [access models](../platform/data-access-models.md).

## Schema templates & data dictionaries

To make data interoperable across providers and consumers, the platform supports **schema templates** and **data dictionaries**. This shifts legibility from an ad-hoc, per-agreement responsibility to a governed platform capability. See [The Role of Standards](../platform/standards.md).

## Security on ingestion

- Authenticated onboarding and validation for every stream.
- TLS for data in transit.
- Policy attached at the point of publication — nothing is accessible until granted.
- Full auditability of ingestion and subsequent access.
