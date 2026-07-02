---
id: control-plane
title: Control Plane — Discovery & Governance
sidebar_label: Control Plane
description: The Data Exchange Control Plane — the services that manage discovery, identity, policy, and authorization decisions.
---

# Control Plane: Who May Access What

The **Control Plane** is the set of services that securely manage, discover, and govern access to data across the ecosystem. Nothing on the control side ever serves resource data — it decides, records, and describes.

## Core services

| Service | Responsibility |
| --- | --- |
| [Catalogue](../components/catalogue.md) | Resource metadata in **JSON-LD**; geo-spatial, attribute, and text discovery |
| [User Service](../components/user-service.md) | User profiles, organisations and membership, delegations, app credentials |
| [Identity Provider](../components/identity-provider.md) | Authentication (OIDC) — the platform never stores passwords |
| [Policy Service](../components/policy-service.md) | The system of record for access grants — create, list, revoke, verify |
| [Authorization Service](../components/authorization-service.md) | Real-time permission checks from a relationship graph (ReBAC/OpenFGA) |
| [Supporting services](../components/supporting-services.md) | Server registry, credits ledger, audit trail, notifications |

## How a decision is made

The control plane splits **policy administration** from **policy decisions**:

- The **Policy Service (PAP — policy administration point)** owns the authoritative ledger of grants. Every grant names a consumer (or group), a resource, the permitted access types, and an expiry.
- The **Authorization Service (PDP — policy decision point)** holds a projection of those grants as relationship tuples, optimised for one thing: answering *"may this subject perform this action on this resource?"* in milliseconds.
- The two are synchronised **asynchronously and reliably** — every policy change is written to a transactional outbox in the same database transaction as the grant, then relayed over the [messaging backbone](../components/messaging-backbone.md). A committed grant cannot fail to become enforceable.

The **API Gateway** acts as the **policy enforcement point (PEP)**: it authenticates every request at the edge and — together with the data-side services — consults the PDP before content is served.

```mermaid
flowchart LR
    P[Provider] -->|grant / revoke| PAP[Policy Service<br/>PAP]
    PAP -->|outbox → events| MQ[(Messaging backbone)]
    MQ --> PDP[Authorization Service<br/>PDP]
    GW[API Gateway<br/>PEP] -->|/v1/check| PDP
    DP[Data-side services] -->|/v1/check| PDP
```

## Ecosystem participants

- **Data Providers** — publish resources and metadata, and control access via policies.
- **Data Consumers / application developers** — discover, request, and use data securely via APIs.
- **Organisation admins** — manage access on behalf of all providers in their organisation.
- **Platform admins (cos_admin)** — operate the exchange itself.

For the data-access side of the platform, see the [Data Plane](./data-plane.md).
