---
sidebar_position: 12
title: Messaging Backbone
description: RabbitMQ — the asynchronous nervous system connecting the platform's components.
---

# Messaging Backbone

The **asynchronous nervous system** of the platform (RabbitMQ). Components that must not block each other communicate through events.

## What flows over it

| Event stream | Producer → Consumer | Purpose |
| --- | --- | --- |
| Policy events (`policy.*`) | Policy Service → Authorization Service | Project every grant/revocation into the enforcement graph |
| Membership events (`org.member.*`, `group.member.*`) | User Service → Authorization Service | Keep organisation membership current in the graph |
| Audit events | Any component → Audit service | One immutable audit trail for the whole platform |
| Email notifications | Any component → Notification service | One shared outbound-email pipeline |
| Data ingestion | Data sources → Data Plane | Live data feeding subscriptions |
| File processing | File Exchange → workers | Asynchronous validation/processing of uploads |

## Reliability model

The platform uses the **transactional outbox** pattern for critical events: the event is written to the database *in the same transaction* as the business change, then relayed to the broker by a dispatcher. Consequences:

- A committed policy change **cannot fail to be projected** — if the broker is down, events queue up in the outbox and flow as soon as it returns.
- Consumers are **idempotent** — duplicate delivery (possible during retries) is detected by message ID and ignored, so retries are always safe.
- Every queue is **durable** and paired with a **dead-letter queue (DLQ)**: after bounded retries, an unprocessable message is dead-lettered for inspection rather than dropped or looped forever. A non-empty policy DLQ is an operational alarm — see [Monitoring & Health](../operations/monitoring.md).
- Consumers **reconnect automatically** with exponential backoff after a broker restart.

This is what allows the Policy Service and Authorization Service to stay consistent without ever calling each other synchronously.
