---
sidebar_position: 4
title: Policy Service (ACL)
description: The policy administration point and durable system of record for grants, constraints, expiry, and revocation.
---

# Policy Service (ACL)

`dx-acl-go` is the **Policy Administration Point (PAP)** and durable authority for access grants. Core policy CRUD and `policy.*` publication are **Implemented**; the complete typed policy schema, OPA bundle lifecycle, and reconciliation controls are **Planned**.

## Responsibilities

- Validate that the author is entitled to administer the canonical resource.
- Validate subject, resource, access mode, effective period, constraints, and organisation boundary.
- Persist policy versions and lifecycle state; preserve revocation history.
- Commit a transactional outbox record with every enforcement-relevant change.
- Publish versioned policy events for OpenFGA projection, contextual-policy compilation, cache invalidation, notifications, and audit.
- Expose administrative/listing views without becoming the request-path PDP.

The service does not authenticate users, evaluate relationship graphs, execute contextual rules, or enforce decisions. Catalogue and User Service provide authoritative resource and subject facts; `dx-authz-go` composes decisions; PEPs enforce them.

## Lifecycle guarantees

Creation is fail-safe: access remains denied until the new relationship and contextual policy version are active. Revocation is security-critical: deny markers and cache invalidation take precedence over asynchronous cleanup. Expiry is evaluated during decision making, not only by a background sweeper.

Critical events use an outbox, publisher confirms, idempotent consumers, bounded retry, and dead-letter handling. Projection lag and source-versus-graph drift are observable and repairable.

See [Policy Lifecycle](../flows/policy-lifecycle.mdx), [Authorization Service](./authorization-service.md), and [Security Architecture](../technical/security-architecture.mdx).
