---
id: faq
title: Frequently Asked Questions
---

# Frequently Asked Questions

## Is the complete target architecture operational?

No. The platform is pre-first-release. Core Go services run locally and many capabilities are implemented, while composite OPA authorization, complete workload-identity adoption, data-plane hardening, Agentic Plane GitOps, and several reconciliation controls remain incomplete. See [Current and Target State](../technical/current-and-target.mdx).

## Is authentication the same as authorization?

No. Keycloak and the gateway establish who the caller is. `dx-authz-go`, OpenFGA, and planned OPA evaluation determine what that principal may do. A PEP then enforces the result and every obligation. See [Security Architecture](../technical/security-architecture.mdx).

## Why use both OpenFGA and OPA?

They answer different parts of a decision. OpenFGA resolves durable relationships and membership. OPA is the planned evaluator for contextual/attribute rules and typed obligations. `dx-authz-go` owns their composition and a stable external decision contract.

## Does a data service call the PDP for every row or query?

No. A control-plane PEP obtains a decision and passes a short-lived carried decision to the data executor. The executor validates it and compiles obligations into the query or delivery operation. Invalid or unenforceable decisions are denied.

## Can an agent do everything its user can do?

No. Agent access is the intersection of user permission, active delegation, agent lifecycle state, contextual policy, tool policy, and any required human approval. Revocation or kill switch blocks new execution and invalidates active authority.

## Where do I find API paths and ports?

Use [Platform Endpoints](../develop/endpoints.md) for public prefixes. Public integrations use the gateway; service-local ports are deployment details.

## How are failed asynchronous operations recovered?

Critical changes use transactional outboxes, publisher confirms, idempotent consumers, bounded retry, dead-letter queues, replay tooling, and reconciliation. Business-specific recovery is documented in the owning workflow.

## How do I report a security issue?

Report it privately to **info@cdpg.org.in** rather than opening a public issue.
