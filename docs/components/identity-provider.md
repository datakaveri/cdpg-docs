---
sidebar_position: 2
title: Identity Provider
description: Keycloak — all user and machine identity for the platform, delivered over OpenID Connect.
---

# Identity Provider

**Keycloak** provides all identity for the Data Exchange — the platform itself never stores passwords.

## Responsibilities

- **User identity** — registration, login (OIDC Authorization Code flow with **PKCE**), and token issuance for the web portals and APIs.
- **Roles** — every user carries platform roles in their token: `consumer`, `provider`, `org_admin` (manages access for an organisation), `cos_admin` (operates the platform), `delegate` (acts on behalf of another user).
- **Organisation membership** — tokens carry the user's organisation, which downstream components use for organisation-scoped decisions (e.g. an org admin may only manage resources belonging to their own organisation).
- **Service identity** — internal components authenticate to each other using service accounts (client-credentials tokens), so machine-to-machine calls are just as accountable as user calls.

## How the rest of the platform uses it

Components never call the Identity Provider on the request path. The [API Gateway](./api-gateway.md) validates tokens locally using published signing keys (JWKS, cached and refreshed periodically), which keeps authentication fast and keeps Keycloak out of the hot path. Internal services receive the gateway's signed identity headers instead of raw tokens.

## Roles at a glance

| Role | Powers |
| --- | --- |
| `consumer` | Discover resources, request and use granted access |
| `provider` | Publish resources, grant/revoke access to own resources |
| `org_admin` | Everything a provider can do, for **all** resources of their organisation |
| `cos_admin` | Platform-wide visibility and administration |
| `delegate` | Act on behalf of another user within a recorded delegation |

See [Flow: Authentication](../flows/authentication.md) for the full login and token journey, and the [JWT Validation guide](../guides/jwt-validation.md) for debugging.
