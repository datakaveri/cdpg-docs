---
sidebar_position: 12
title: Messaging Backbone
description: RabbitMQ event delivery, transactional outboxes, retries, dead-lettering, and reconciliation.
---

# Messaging Backbone

RabbitMQ carries asynchronous domain, projection, audit, notification, subscription, and worker messages. Shared publishing and consuming foundations are **Implemented**; fleet-wide outbox adoption, reconnect hardening, schema governance, and reconciliation are **Partially implemented**.

| Stream | Producers | Consumers | Purpose |
| --- | --- | --- | --- |
| `policy.*` | Policy Service | Authorization projection, audit, notifications | Grant lifecycle and invalidation |
| `org.member.*` | User Service | Authorization projection, audit | Organisation graph changes |
| `group.member.*` | Planned producer | Authorization projection | Group graph changes — **Planned** |
| Audit events | All business services | Audit Service | Append-only activity history |
| Notification events | Business services | Notification Service | Template-based delivery |
| Ingestion/subscription events | Data producers/services | Data-plane consumers | Data movement and fan-out |
| File-job events | File Service | File workers | Asynchronous processing |

## Delivery contract

Critical producers persist the business change and outbox record in one database transaction. Dispatch uses publisher confirms and stable event IDs. Consumers acknowledge only after their durable side effect, deduplicate by identity/version, retry transient failures with bounded backoff, and route terminal failures to a dead-letter queue.

At-least-once delivery does not guarantee source/projection equality forever. Security projections and business-critical derived state require lag metrics, replay procedures, and periodic reconciliation. Broker unavailability must not erase a committed change; consumer reconnect exhaustion and a non-empty security DLQ are operator alerts.

See [Event-Driven Integrations](../technical/architecture.mdx#event-driven-integrations) and [Audit Event Delivery](../flows/audit-events.md).
