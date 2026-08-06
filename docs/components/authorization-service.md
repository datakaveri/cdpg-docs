---
sidebar_position: 3
title: Authorization Service
description: The platform's decision point — real-time relationship-based access checks backed by OpenFGA.
---

# Authorization Service

The platform's **decision point (PDP)**: it answers, in real time, "may this subject perform this action on this resource?" for every data access.

## How it works

The service maintains a **relationship graph** (ReBAC, backed by **OpenFGA**) describing who relates to what: *user U has `api` access to dataset D*, *user U is a member of organisation O*, *organisation O has access to dataset D*. A permission check — `POST /v1/check` with a subject, relation, and object — is a graph question, fast enough to sit on the hot path of every data request.

## Where the relationships come from

The Authorization Service holds **no original data**. It is a projection of the [Policy Service](./policy-service.md) and the [User Service](./user-service.md):

1. A policy is granted or revoked, or an organisation membership changes.
2. The change is published as an event on the [messaging backbone](./messaging-backbone.md) — transactionally (outbox pattern), so it cannot be lost.
3. The Authorization Service consumes the event and writes or deletes the corresponding relationship tuples.

This means a grant becomes enforceable within moments of being created, and a revocation takes effect just as quickly — without the Policy Service ever being on the request path.

| Event | Effect on the graph |
| --- | --- |
| `policy.create` / `policy.delete` | Write/delete `(subject, access-type relation, resource)` tuples |
| `org.member.added` / `org.member.removed` | Write/delete `(user, member, organisation)` tuples |
| `group.member.*` | Write/delete group-membership tuples |
| `delegation.*` | Write/delete the delegated relationships an agent acts under |

Consumers of these events are **idempotent** — duplicate delivery during retries is detected and ignored. Unparseable messages are dead-lettered for inspection, never silently dropped.

## What asks it questions

| Caller | Question |
| --- | --- |
| [API Gateway](./api-gateway.md) | Route-level relationship checks before proxying |
| [Data Plane](./data-plane.md) | "May this user query this dataset's API?" |
| [File Exchange](./file-exchange.md) | "May this user download files of this databank?" |
| [Agent Plane](./agent-plane.md) | "May this agent do this — *and* may the user it acts for?" |
| Other components | Generic relationship checks |

## Expiry and revocation

Two properties matter more than raw check latency:

- **Expiry is evaluated on every decision**, against the service's own clock — never a caller-supplied time, and never dependent on a cleanup job having run. A grant past its expiry stops working at that instant.
- **Creation and revocation are not symmetric.** A grant that has not yet projected causes a denial, which is safe and retryable. A revocation that has not yet propagated would mean continued unauthorized access — so revocation reaches the decision path first, and graph cleanup follows.

## Delegated agents

An agent request carries two identities and is checked twice: the delegating user must hold the permission, **and** the agent must hold a separate delegated relationship to the same resource. An agent is therefore always narrower than its user, and revoking a delegation leaves the user's own access untouched. See the [Agentic Plane](../technical/agentic-plane.mdx).

## Group resolution

Group policies (e.g. "everyone in organisation O may access dataset D") are answered through the graph itself: the consumer's organisation membership connects them to the grant — no per-user fan-out is needed when organisations grow.

See the [Relationship Authorization guide](../guides/fga-authorization.mdx) for the relationship model and debugging.
