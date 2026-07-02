---
sidebar_position: 11
title: Supporting Services
description: The registry, credits ledger, audit trail, and notification services that round out the platform.
---

# Supporting Services

Four smaller services provide platform-wide capabilities that every other component relies on.

## Registry

The registry of **data servers** participating in the exchange — resource servers (data planes) and policy servers, including federated ones operated by third parties. Records each server's endpoints and capabilities so the rest of the platform (and clients) can resolve *where* a resource is served. Writes are platform-admin-gated.

## Credits

A **credit ledger** for usage-based consumption: balances per user/organisation, atomic add/deduct operations, and a request/approval workflow for topping up. Services that meter usage deduct credits; administrators review and approve credit requests.

## Audit

The platform's **immutable audit trail**. Every mutating endpoint across the platform publishes an audit event to the [messaging backbone](./messaging-backbone.md); the audit service consumes them into an append-only log and exposes a read API with filtering, pagination, and **CSV export**. Consumers can see their own activity; administrators can see everything.

Auditing is asynchronous by design — it never blocks or slows the request that generated the event.

## Notifications

The platform's **single outbound-email pipeline**. Components never send email themselves; they publish a notification event (grant issued, access requested, submission received…), and the notification service resolves the recipient's address, renders the template, and sends — with retry and a dead-letter queue for failures, so a flaky mail server never breaks a business operation.

## Interactions

| Service | Consumes | Provides |
| --- | --- | --- |
| Registry | — | Server resolution API |
| Credits | Deduction calls from metering services | Balance & request APIs |
| Audit | Audit events from all services | Query API + CSV export |
| Notifications | Notification events from all services | Outbound email |
