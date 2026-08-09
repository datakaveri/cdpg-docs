---
sidebar_position: 2
title: Identity Provider
description: Keycloak-based user, application, workload, and agent authentication.
---

# Identity Provider

Keycloak is the platform identity provider. User OIDC flows and service accounts are **Implemented**; fine-grained audience, caller-allowlist, subject-asserter, and agent token-exchange adoption is **Partially implemented**.

## Identity classes

- **People** authenticate using OIDC Authorization Code with PKCE and receive a short-lived access token.
- **External applications** use registered confidential or public clients appropriate to their environment.
- **Platform workloads** use client credentials to obtain short-lived tokens targeted to a specific service audience.
- **Agents** are distinct principals. Delegated execution carries the user as subject and the agent as actor; the runtime exchanges credentials rather than sharing the user's token.

Keycloak proves identity and issues claims. It does not decide dataset access, own organisation membership records, or evaluate access policies. Those authorization responsibilities belong to the User Service, Policy Service, `dx-authz-go`, OpenFGA, OPA, and the relevant enforcement point.

## Validation

Every receiving boundary validates the token signature against cached JWKS keys and checks `iss`, `aud`, `sub`, `exp`, `iat`, and the expected token type. Workload calls also validate the caller client against an operation-specific allowlist. Key rotation uses overlapping JWKS validity and bounded cache refresh; a token that cannot be validated fails closed.

Subject and workload identity remain separate. A service accepts forwarded subject or actor context only from an authorised subject asserter and records both identities in audit events.

See [Authentication and Identity Propagation](../flows/authentication.mdx), [JWT Validation](../guides/jwt-validation.md), and [Security Architecture](../technical/security-architecture.mdx).
