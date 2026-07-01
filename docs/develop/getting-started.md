---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
description: A developer's first steps with IUDX — concepts, roles, and the path from discovery to data access.
---

# Getting Started

This guide orients developers building **against** IUDX (consuming or providing data) and teams **deploying** the platform.

:::note
IUDX is delivered as a cloud-native stack. The snippets below illustrate the standard, standards-based interaction patterns (NGSI-LD, OGC, OAuth2). Endpoint hosts depend on your deployment.
:::

## Core concepts

| Concept | What it means |
| --- | --- |
| **Resource** | A dataset, model, app, or stream published to the catalog. |
| **Catalog** | The JSON-LD metadata index used for [data discovery](../platform/data-access-models.md). |
| **Provider** | An entity that publishes resources and sets access policy. |
| **Consumer** | An entity that discovers and accesses resources. |
| **Token** | A JWT obtained via OAuth2 that authorizes a specific access. |
| **Policy & consent** | Rules that govern who can access what, enforced at the API layer. |

## The typical flow

1. **Register & authenticate** — obtain credentials through federated identity (OIDC/SAML) and request an access token (OAuth2/JWT).
2. **Discover** — query the catalog to find resources.
3. **Request access** — obtain a token scoped to a resource, subject to consent and policy.
4. **Access data** — choose a [data access model](../platform/data-access-models.md): bulk download, pull-based API, or push-based stream.

## 1. Authenticate

```bash
curl -X POST https://auth.<your-deployment>/auth/v1/token \
  -H "Content-Type: application/json" \
  -d '{
    "itemId": "<resource-id>",
    "itemType": "resource",
    "role": "consumer"
  }'
```

The response contains a signed **JWT** to be sent as a `Bearer` token on subsequent requests.

## 2. Discover resources

```bash
curl "https://catalogue.<your-deployment>/iudx/cat/v1/search?property=[tags]&value=[[transport,bus]]"
```

The catalog returns JSON-LD records describing matching resources, including their access modalities.

## 3. Access data via API

```bash
curl "https://rs.<your-deployment>/ngsi-ld/v1/entities?id=<resource-id>" \
  -H "Authorization: Bearer <JWT>"
```

## Next steps

- [APIs & Standards](./apis.md) — the API surface and the standards behind it.
- [Data Ingestion](./data-ingestion.md) — publish data into the platform.
- [Data Access Models](../platform/data-access-models.md) — pick the right access pattern.
