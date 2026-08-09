---
sidebar_position: 11
title: Supporting Services
description: Registry, credits, audit, notification, and subscription responsibilities.
---

# Supporting Services

## Registry — **Implemented**

`dx-registry-go` owns resource-server and policy-server registrations, advertised endpoints, health/capability metadata, and administrative lifecycle. Public discovery and privileged mutation use separate authorization profiles.

## Credits — **Implemented**

`dx-credits-go` owns balances, immutable ledger entries, atomic debit/credit operations, and approval state. A business operation that consumes credits must use idempotency keys and an explicit consistency boundary so a retry cannot double-charge.

## Audit — **Implemented**, hardening ongoing

`dx-audit-go` consumes versioned audit events into an append-only store and exposes role- and organisation-scoped query and CSV export. Producers emit request, subject, actor, workload, resource, action, decision, outcome, and trace correlation without credentials or protected payloads. Delivery is asynchronous; business requests do not report success based on audit-consumer availability.

## Notifications — **Implemented**, provider recovery varies

`dx-notification-go` owns templates, recipient resolution, dispatch attempts, bounded retries, and terminal failure records. Business services publish intent rather than sending email directly. Notification failure never rolls back an already committed business operation.

## Subscriptions — **Implemented**

`dx-subscription-go` owns subscription definitions and delivery state. Provisioning and delivery are scoped by the access decision, resource, organisation, expiry, and delivery endpoint. Revocation or policy expiry stops future delivery and is auditable.

See [Control Plane](../technical/control-plane.mdx), [Audit Event Delivery](../flows/audit-events.md), and [Shared Platform Architecture](../technical/shared-platform.md).
