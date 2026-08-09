---
sidebar_position: 3
title: Authorization Service
description: The composite policy decision point combining relationship, contextual, and delegated-authority decisions.
---

# Authorization Service

`dx-authz-go` is the platform **Policy Decision Point (PDP)**. Its OpenFGA relationship checks and event projection are **Implemented**; the complete OPA-based contextual-policy path and typed-obligation contract are **Planned**.

## Responsibility boundary

| Concern | Owner |
| --- | --- |
| Durable grants, expiry, revocation, and policy lifecycle | [Policy Service](./policy-service.md) |
| Organisation and group membership facts | [User Service](./user-service.md) |
| Relationship graph and ReBAC evaluation | OpenFGA, mediated by `dx-authz-go` |
| Contextual/attribute rules and obligation derivation | OPA, mediated by `dx-authz-go` — **Planned** |
| Decision composition and stable decision API | `dx-authz-go` |
| Enforcement | Gateway, application services, MCP Gateway, and data-plane executors |

OpenFGA answers structural questions such as whether a user is a member of an organisation or has an access relationship to a resource. OPA evaluates policy over trusted context such as operation, resource classification, purpose, risk, time, location, device, and delegated-agent constraints. Neither engine authenticates callers or owns source-of-truth business records.

## Decision contract

The composite request contains the authenticated subject, workload caller, optional actor/delegation chain, action, canonical resource identifiers and attributes, organisation boundary, request context, and desired decision profile. The response contains allow/deny, reason codes, policy/relationship versions, expiry, cache instructions, and typed obligations such as row filters, field masks, purpose limits, rate ceilings, or required human approval.

Decisions are **default deny**. An engine error, missing authoritative context, stale or invalid policy data, malformed input, or an obligation the PEP cannot enforce produces a denial. Sensitive allow decisions are short-lived; revocations invalidate affected decisions.

## Projection and reconciliation

`policy.*` and membership events project authoritative changes into OpenFGA with at-least-once delivery. Consumers must be idempotent, preserve event versions, dead-letter terminal failures, and expose projection lag. A periodic reconciliation job compares source records with the graph because event delivery alone cannot prove ongoing convergence. The current tuple/relation mapping and the missing group-membership producer are implementation gaps.

See [Security Architecture](../technical/security-architecture.mdx), [Relationship and Context Authorization](../guides/fga-authorization.mdx), and [Policy Lifecycle](../flows/policy-lifecycle.mdx).
