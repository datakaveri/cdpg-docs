---
sidebar_position: 9
---

# Messaging Backbone

The **asynchronous nervous system** of the platform (RabbitMQ). Components that must not block each other communicate through events.

## What flows over it

| Event stream | Producer → Consumer | Purpose |
|---|---|---|
| Policy events | Policy Service → Authorization Service | Project every grant/revocation into the enforcement graph |
| Email notifications | Any component → Control Plane | One shared outbound-email pipeline for the whole platform |
| Data ingestion | Data sources → Data Plane | Live data feeding subscriptions |
| File processing | File Exchange → workers | Asynchronous validation/processing of uploads |

## Reliability model

The platform uses the **transactional outbox** pattern for critical events: the event is written to the database *in the same transaction* as the business change, then relayed to the broker by a dispatcher. Consequences:

- A committed policy change **cannot fail to be projected** — if the broker is down, events queue up and flow as soon as it returns.
- Consumers are **idempotent** — duplicate delivery (possible during retries) is detected and ignored, so retries are always safe.

This is what allows the Policy Service and Authorization Service to stay perfectly consistent without ever calling each other synchronously.
