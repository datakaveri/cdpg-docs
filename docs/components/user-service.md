---
sidebar_position: 5
title: User and Organisation Service
description: The authority for profiles, organisations, membership, applications, and delegation records.
---

# User and Organisation Service

`dx-user-go` owns platform profiles, organisations, membership, application records, and delegation metadata. Core user and organisation capabilities are **Partially implemented**; full delegation, application credential, group-membership, and assurance workflows remain incomplete.

## Responsibilities

- Maintain profile and organisation records linked to identity-provider subjects.
- Enforce organisation-admin boundaries on membership and organisation changes.
- Publish `org.member.*` changes transactionally for OpenFGA projection.
- Own application registration and delegation records, while Keycloak remains the credential/token issuer.
- Provide authoritative organisation and delegation facts to policy administration and decision services over authenticated internal APIs.

The service does not store passwords, issue access tokens, or decide resource access. Token claims are evidence of authentication; authoritative organisation state comes from this service and its versioned authorization projection.

## Isolation and failure behavior

Every organisation-scoped read and mutation includes an organisation predicate derived from trusted principal context. A caller-supplied organisation identifier cannot widen scope. Membership removal and delegation revocation publish cache-invalidation and projection events; while consistency is uncertain, affected access fails closed. A missing group-membership producer and incomplete delegation paths are documented implementation gaps.

See [Control Plane](../technical/control-plane.mdx), [Security Architecture](../technical/security-architecture.mdx), and [Policy Lifecycle](../flows/policy-lifecycle.mdx).
