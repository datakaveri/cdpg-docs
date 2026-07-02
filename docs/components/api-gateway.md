---
sidebar_position: 1
title: API Gateway
description: The single entry point for all traffic — authentication at the edge, signed identity propagation, and routing.
---

# API Gateway

The **single entry point** for all traffic into the Data Exchange. No client ever talks to an internal component directly.

## Responsibilities

- **Authentication** — validates user tokens (OIDC/JWT from the [Identity Provider](./identity-provider.md)) and machine credentials (app ID + secret, verified against the [User Service](./user-service.md)). Both paths produce the same internal identity.
- **Identity propagation** — after authenticating once at the edge, the gateway forwards requests with **cryptographically signed identity headers** (`X-Subject-Id`, `X-Subject-Email`, `X-Subject-Roles`, `X-Subject-Org-Id`, an issued-at timestamp, and an HMAC signature over all of them). Internal components verify one signature instead of re-validating credentials, keeping them simple and fast. The original `Authorization` header is **stripped** before proxying.
- **Authorization enforcement** — routes can require a relationship check: the gateway calls the [Authorization Service](./authorization-service.md) (`POST /v1/check`) and refuses with `403` before the upstream is ever reached.
- **Routing** — maps public API paths to the right internal component by longest prefix, optionally stripping the prefix. The route table is configuration, not code — see [Platform Endpoints](../develop/endpoints.md).
- **Delegation handling** — when an application acts *on behalf of* a user, the gateway resolves the delegation with the User Service and forwards the delegator's identity with appropriately narrowed permissions.

## What it deliberately does not do

- It does not hold business data or make resource-level decisions on its own — "may this caller access this dataset?" is always answered by the Authorization Service.
- It does not proxy identity blindly: the signed headers include a freshness timestamp, so captured headers cannot be replayed later.

## Trust model

Internal services run a shared **resolver middleware**: if the signed identity headers are present, the HMAC is verified (an invalid signature is a hard `401` — it never falls back to other authentication, which prevents identity smuggling); if absent, a direct JWT is accepted as fallback. Sensitive routes can additionally require gateway origin, rejecting any request that did not come through the edge.

## Interactions

| Talks to | Why |
| --- | --- |
| Identity Provider | Token signature verification (cached JWKS key material) |
| Authorization Service | Per-route relationship checks |
| User Service | App credential verification, delegation resolution |
| All internal components | Forwards authenticated traffic with signed identity |
