---
id: apis
title: APIs & Standards
sidebar_label: APIs & Standards
description: The open, standards-based API surface of IUDX — catalog, exchange, auth, and consent.
---

# APIs & Standards

IUDX exposes **open-source APIs** built on open standards, so integrations are portable and interoperable by design.

## API families

| API family | Standard | Purpose |
| --- | --- | --- |
| **Catalog** | JSON-LD | Discover and describe resources (datasets, models, apps). |
| **Resource / Exchange** | NGSI-LD, OGC | Read and subscribe to data on a per-record basis. |
| **Authentication** | OAuth2, JWT | Obtain and validate scoped access tokens. |
| **Identity** | OIDC, SAML | Federated login across organizations. |
| **Consent & Policy** | DEPA-based | Capture consent and enforce access policy for PII. |
| **Audit** | — | Retrieve auditable records of API calls and downloads. |

## Standards-first design

- **NGSI-LD & OGC** for context and geospatial data exchange.
- **JSON-LD** for a linked, machine-readable metadata catalog.
- **OAuth2 / JWT** for token-based access.
- **OIDC / SAML** for federated identity.
- **DEPA** for consent management of personal data.

The platform is **FIWARE compatible** and based on ETSI, OGC, and BIS standards. See [The Role of Standards](../platform/standards.md).

## Access patterns

The same APIs support multiple [data access models](../platform/data-access-models.md):

- **Bulk download** — request a copy of a dataset.
- **Pull-based API access** — query individual records with policy enforcement.
- **Push-based streams** — subscribe to real-time updates via the data broker.

## Authorization model

Access is governed by **resource/user-level ABAC** (attribute-based access control) — fine-grained, dynamic, and easy to manage and revoke, in contrast to coarse-grained, certificate-based schemes. See the [Market Comparison](../adoption/market-comparison.md) for how this compares to legacy platforms.

:::tip
Because authorization is dynamic and attribute-based, providers can grant and revoke granular access without re-issuing certificates or coordinating ecosystem-wide changes.
:::
