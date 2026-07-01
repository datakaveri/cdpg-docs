---
id: data-ingestion
title: Data Ingestion
sidebar_label: Data Ingestion
description: Publish data into IUDX using pluggable adapters for APIs, files, IoT, and message queues.
---

# Data Ingestion

The **Data Ingestion Layer** provides pluggable adapters for APIs, files, IoT, and message queues, with secure onboarding and validation pipelines for diverse data streams.

## Supported sources

| Source type | Examples |
| --- | --- |
| **APIs** | REST/HTTP endpoints, third-party data services |
| **Files** | Batch uploads, archival/legacy datasets |
| **IoT** | Sensor streams, real-time device telemetry |
| **Message queues** | Async, high-throughput event streams |

IUDX natively supports **time-series, streaming, and async data** — not just transactional, batch-oriented exchange.

## Onboarding flow

1. **Register as a provider** through federated identity.
2. **Describe the resource** — publish metadata to the JSON-LD catalog.
3. **Configure an adapter** for your source type (API, file, IoT, or queue).
4. **Validate** — data passes through secure validation pipelines on ingestion.
5. **Set policy & consent** — define who can access the resource and under what terms.
6. **Publish** — the resource becomes discoverable and accessible per your chosen [access models](../platform/data-access-models.md).

## Schema templates & data dictionaries

To make data interoperable across providers and consumers, IUDX supports **schema templates** and **data dictionaries**. This shifts legibility from an ad-hoc, per-agreement responsibility to a platform capability — a key difference from legacy data exchanges. See [The Role of Standards](../platform/standards.md).

## Security on ingestion

- Secure onboarding and validation pipelines for every stream.
- Automated TLS/SSL for data in transit.
- Consent and policy attached at the point of publication.
- Full auditability of ingestion and subsequent access.
