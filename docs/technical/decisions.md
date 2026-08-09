---
id: decisions
title: Architecture Decisions and Open Gaps
sidebar_label: Decisions & Gaps
description: The decisions that shape the Go platform and the unresolved questions that documentation must not guess.
---

# Architecture Decisions and Open Gaps

This page is the Docusaurus decision index. It summarizes the governing choice and links to the full record or source design. Implementation status remains on [Current State and Target State](./current-and-target.mdx).

**Status:** the decision index is **Implemented**; each unresolved item below is **Planned** architecture work and must not be presented as an operational capability.

## Governing decisions

| Decision | Consequence | Source |
| --- | --- | --- |
| Go services are the platform architecture | All component, workflow, deployment, and developer guidance describes the Go fleet | [Platform architecture](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/PLATFORM-ARCHITECTURE.md) |
| Each service owns its business capability and data | Public contracts and data ownership follow service boundaries; shared infrastructure does not create shared domain ownership | [Service architecture](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/GO-SERVICE-ARCHITECTURE.md) |
| Workloads are first-class identities | Each service obtains a short-lived, asymmetric, audience-bound token; receiving services authorize caller identity separately from user identity | [ADR-06](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/adr/ADR-06-workload-identity-and-subject-delegation.md) |
| Internal service calls use gRPC | Client-facing APIs remain HTTP/REST; shared interceptors carry the same workload and subject model over gRPC | [ADR-14](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/adr/ADR-14-internal-transport-is-grpc.md) |
| Authorization is composite | `dx-authz-go` orchestrates relationship, contextual, delegation, and trust inputs behind one `Authorize` contract | [Authorization target](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/AUTHORIZATION-PLATFORM-TARGET-DESIGN.md) |
| Relationships and contextual policy have separate engines | OpenFGA answers graph relationships. OPA evaluates contextual and attribute policy and returns typed obligations. The composite PDP combines them. | Platform-owner direction reflected in this documentation; canonical ADR update required |
| Decisions are centralized; enforcement is distributed | The gateway or application PEP obtains a decision. The decision and obligations travel to the data service; data planes do not call the PDP again. | [ADR-10/A1](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/adr/ADR-10-A1-obligations-carried-forward.md) |
| Policy administration is separate from decision evaluation | `dx-acl-go` owns grant authoring and history; `dx-authz-go` owns request-time decisions; neither bypasses the other | [Authorization target](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/AUTHORIZATION-PLATFORM-TARGET-DESIGN.md) |
| Grant changes use durable asynchronous projection | Domain write and outbox append are atomic; consumers are idempotent; incompatible messages are quarantined; reconciliation repairs projections | [Messaging design](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/MESSAGING-AND-WORKERS.md) |
| Agent authority is derivative | An agent action requires the user's own right, the agent's delegated right, an active grant, and an active agent; HITL is mandatory for high-risk tools | [Agent Plane](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/AGENT-PLANE.md) |
| Deployment is configuration-selected | The same images support central and, when enabled, federated topologies. GitOps selects components and injects environment configuration and secrets. | [GitOps](https://github.com/datakaveri/cdpg-claude/blob/dev/claude-docs/GITOPS.md) |

## OPA and OpenFGA boundary

The OPA direction is newer than the current canonical authorization target's contextual-evaluator choice. This documentation treats OPA as the intended contextual engine because that is the requested platform direction, while preserving the stable boundaries from the target design:

- OpenFGA owns relationship reachability, not arbitrary conditions, filters, masks, or quotas.
- OPA receives normalized input and policy data from `dx-authz-go`; policy code does not perform ad-hoc database or OpenFGA calls.
- `dx-authz-go` owns orchestration, final combination, decision IDs, cache semantics, reason codes, and attestation issuance.
- PEPs enforce the returned decision and the obligations they support. An unsupported obligation is a deny.

The full ADR set must be updated before implementation so the OPA choice has one canonical source.

## Open decisions

| Gap | Why it matters | Required owner/evidence |
| --- | --- | --- |
| OPA deployment mode | Sidecar, embedded runtime, or remote service changes latency, failure domains, and bundle rollout | Architecture and operations decision with a measured latency/failure test |
| Policy bundle authority | Signing keys, repository, revision naming, promotion, rollback, and emergency disable are not fixed | Security/platform ownership decision |
| Decision-attestation lifetime and revocation | A carried decision was made in the past; its safe staleness bound is a product and security decision | Product risk tier plus security review |
| Operation and permission registry | Stable operation IDs, permission names, resource types, and extraction rules must be canonical before `/v1/authorize` | API governance decision and generated registry |
| Default contextual profile | The policy profile for operations without an explicit profile must not be inferred | Security decision; default should remain deny until ratified |
| Organization hierarchy model | Organization membership exists; group membership production and hierarchy semantics are incomplete | Identity/domain model and event producer ownership |
| Multi-tenant SaaS isolation | Current target assumes one exchange tenant with organizations inside it | Explicit tenancy architecture before hosting unrelated exchange operators together |
| Decision-cache TTLs | Cache safety depends on token expiry, grant expiry, bundle revision, and revocation SLO | Load tests and security-approved bounds |
| Federated authorization contract | Remote decision provenance, trust anchors, failure behavior, and policy ownership need a versioned contract | Federation ADR and conformance suite |
| Agent sender constraint | Delegated tokens are bearer credentials until DPoP or equivalent binding is implemented | Agent security work item and threat test |

Until an open decision is closed, implementations must choose the safe direction: default deny, no silent fallback, and no statement that the capability is operational.
