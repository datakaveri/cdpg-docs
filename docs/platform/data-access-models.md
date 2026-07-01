---
id: data-access-models
title: Data Access Models
sidebar_label: Data Access Models
description: The flexible data flows IUDX supports — bulk downloads, pull-based APIs, and push-based streams.
---

# Data Access Models

IUDX supports a range of data flows so consumers can access data in the way that best fits their use case. Every model is governed by the same **consent and access-policy** fabric, and every access is authenticated and logged.

## 1. Bulk Download

A copy of a dataset is downloaded to authorized users.

- **Best for:** static or historical datasets, and large-scale offline analysis.
- **Enables:** integration into the consumer's own systems.

## 2. Pull-based API Access

Regulated, policy-based, on-demand access on a **per-record basis** through secure, standardized APIs (harmonized with **NGSI-LD**).

- **Best for:** controlled, metered consumption of live or frequently updated data.
- **Enables:** fine-grained, auditable access aligned to consent and policy.

## 3. Push-based Streams

Real-time updates streamed to subscribed consumers via the data broker.

- **Best for:** IoT and time-series data, and applications that react to live events.
- **Enables:** low-latency, event-driven integration.

## Choosing a model

| Model | Pattern | Typical use |
| --- | --- | --- |
| **Bulk Download** | Full copy to user | Static / historical datasets, large-scale analysis |
| **Pull-based API** | On-demand, per-record | Controlled, metered access to live data |
| **Push-based Stream** | Real-time subscription | IoT, time-series, event-driven applications |

## Data classes

Access also depends on a dataset's class. IUDX supports **public** data (openly accessible), **restricted** data (access granted by the provider on request, per policy), and **monetisable** data models. Restricted access is governed by the provider's policies in the [Authorization Server](../technical/authorization-server.md).

:::note Emerging: privacy-preserving compute
For sensitive data, CDPG is developing privacy-enhancing techniques — including computation inside secure enclaves so that analysis can run without the raw data leaving the provider's control. These build on the same consent and policy foundation.
:::
