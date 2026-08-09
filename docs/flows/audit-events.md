---
sidebar_position: 9
title: "Flow: Audit Event Production and Consumption"
description: How services produce durable activity facts, how the Audit Service consumes them, and how failures are recovered.
---

# Flow: Audit Event Production and Consumption

## Purpose and status

Audit events provide a durable, queryable record of security and business activity without putting the Audit Service on the synchronous success path. The consumer/read/export service exists; consistent fleet-wide event coverage and a unified provenance envelope are **Partially implemented**.

## Actors and components

Any gateway/Control/Data/Agentic service; `dx-common-go` audit/event publisher; RabbitMQ audit exchange and DLQ; `dx-audit-go`; PostgreSQL audit store; operators, users, and Agent Registry activity views.

## Preconditions

- The producer has a verified principal/workload context and request/trace ID.
- The event schema version and classification are supported.
- Sensitive fields are minimized before publication.

## Main workflow

1. A service completes or denies an auditable operation and constructs an event with event/request/trace IDs, actor and workload, organization, operation, resource, decision/grant/delegation/agent context, outcome, and timestamp.
2. For state-changing facts requiring atomicity, the service appends the audit event through the same domain transaction/outbox. Non-transactional access events publish asynchronously with a bounded producer lifecycle.
3. RabbitMQ routes the versioned event to the durable Audit Service queue.
4. The consumer validates version and schema. Unsupported or malformed messages go to quarantine/DLQ with reason and routing metadata.
5. The consumer inserts idempotently by event ID into the append-only audit store.
6. Authorized users query their own activity; administrators query permitted organization/platform views; CSV export applies the same scope.
7. Agent Registry activity views call the Audit Service using workload identity and owner-scoped filters.

## Failure and recovery

Broker outage does not roll back an already committed domain operation; transactional outboxes retain required audit facts. Consumer/store failure requeues boundedly. Repeated delivery is harmless. Reconciliation compares producer outbox/sequence data with audit ingestion where completeness is required. A backlog or DLQ is an alert, not a reason to discard events.

## Security and retention

Audit reads are authorization-protected and organization-scoped. The store is append-only at the application boundary. Tokens, secrets, presigned URLs, raw payment material, prompt bodies, and unrestricted resource payloads are excluded. Retention, legal hold, export redaction, and tamper-evidence policy require deployment-specific decisions.

## Observability

Monitor publish failure, outbox age, queue depth/age, consumer reconnects, schema rejection, DLQ depth, insert duplication, query/export latency, and expected-versus-ingested counts for critical event families.

