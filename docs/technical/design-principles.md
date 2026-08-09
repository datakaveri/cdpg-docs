---
id: design-principles
title: CDPG Architecture Principles
sidebar_label: Design Principles
description: Governing principles for the Go platform across all three planes.
---

# CDPG Architecture Principles

These principles are normative for the intended Go platform. Conformance is **Partially implemented** and is measured per service in [Current and Target State](./current-and-target.mdx).

| Principle | Architectural consequence |
| --- | --- |
| **Provider authority** | Providers and their organisations remain authoritative for resource metadata, grants, and permitted delivery modes. |
| **Authentication is not authorization** | Identity is established first; a separate, explicit decision governs every protected operation. |
| **Default deny** | Missing, invalid, expired, unavailable, stale, or unenforceable security state never broadens access. |
| **Distinct identities** | User/application subject, delegated agent actor, and immediate service workload remain independently accountable. |
| **Central decisions, distributed enforcement** | `dx-authz-go` composes policy; the gateway, service, MCP Gateway, or data executor enforces where canonical facts and effects are known. |
| **Obligations are mandatory** | A PEP applies every filter, mask, limit, purpose, approval, and audit obligation or denies the operation. |
| **Organisation isolation in depth** | Organisation scope is present in authorization, datastore predicates, cache keys, search/index ownership, object namespaces, events, exports, and audit visibility. |
| **Service ownership** | One service owns each business capability and its data. Shared Go modules supply infrastructure, not domain logic. |
| **Durable facts, repairable projections** | Critical state changes use outboxes; delivery is at-least-once; consumers are idempotent; reconciliation repairs drift. |
| **Open, versioned contracts** | Public REST/OpenAPI and domain standards are versioned; internal gRPC/protobuf contracts are explicit and compatibility-tested. |
| **Configuration-selected topology** | The same images use typed configuration and feature gates; business logic does not branch on the deployment shape. |
| **Least privilege and bounded authority** | Tokens, decisions, delegations, object capabilities, approvals, and agent tools are audience-, action-, resource-, and time-bounded. |
| **Observable failure** | Logs, metrics, traces, decision IDs, outbox/DLQ state, projection lag, and audit records make security and recovery paths diagnosable. |
| **Safe lifecycle** | Startup validates configuration and dependencies; readiness protects traffic; cancellation, leases, idempotency, retry budgets, and graceful shutdown prevent duplicate or abandoned work. |
| **Status honesty** | Intended behavior is labelled **Planned** or **In development** until code, tests, deployment, and operational evidence meet its gate. |

## Decision hierarchy

When principles conflict, preserve security and correctness first, then availability, performance, and convenience. A false denial may be retried and investigated; an accidental allow or silently ignored obligation is not an acceptable availability strategy.

Architecture decisions refine these principles. See [Decisions and Open Gaps](./decisions.md), [Security Architecture](./security-architecture.mdx), and [Shared Go Platform](./shared-platform.md).
