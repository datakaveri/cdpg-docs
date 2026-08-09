---
sidebar_position: 1
title: API Gateway
description: The public policy-enforcement point for authentication, authorization, routing, and identity propagation.
---

# API Gateway

`dx-gateway-go` is the platform's public ingress and a **Policy Enforcement Point (PEP)**. It is **Implemented** for the core routes; route coverage and the target composite authorization contract are **Partially implemented**.

## Responsibilities

- Validate external OIDC access tokens: signature, issuer, audience, expiry, and required claims.
- Derive a typed principal containing subject, organisation, roles, actor/delegation context, and request correlation.
- Ask `dx-authz-go` for operations that require a pre-service decision and enforce **deny**, **allow**, or **allow with obligations**.
- Exchange its workload identity for a short-lived, audience-bound service token when calling an upstream.
- Propagate user/delegation context separately from the gateway's own service identity.
- Route public REST APIs, apply limits and request validation, and produce security/audit telemetry.
- Reject unregistered routes, invalid credentials, unavailable mandatory dependencies, and unenforceable obligations.

The gateway does not own accounts, policy records, relationship tuples, application data, or business authorization rules. Application services repeat object-specific checks after resolving canonical resource facts; the gateway cannot authorize facts it has not yet seen.

## Trust model

The upstream authenticates the gateway using a short-lived Keycloak client-credentials JWT whose `aud` targets that service. The upstream validates the token independently and permits only configured caller identities. Forwarded subject context is accepted only from an allowlisted **subject asserter** and is bound to the request. Directly supplied identity-context fields are discarded.

The exact subject-context carrier and request-binding claims remain an engineering confirmation item. The security properties are normative: workload and subject identities are distinct, tokens are short-lived and audience-scoped, and every service validates its immediate caller.

## Failure contract

| Condition | Result |
| --- | --- |
| Missing or invalid external token | `401 Unauthorized` |
| Authenticated principal lacks permission | `403 Forbidden` |
| PDP unavailable for a mandatory check | Deny; do not call the upstream |
| Required obligation is unsupported | Deny; never silently weaken the decision |
| Upstream or identity provider unavailable | Bounded retry where safe, then a typed `5xx` response |

See [Security Architecture](../technical/security-architecture.mdx), [Authorization Flow](../flows/authorization.mdx), and [Platform Endpoints](../develop/endpoints.md).
