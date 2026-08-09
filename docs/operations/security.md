---
id: security
title: Security Operations
sidebar_label: Security
description: Operational controls for identity, policy, data, agent, secret, and incident boundaries.
---

# Security Operations

The canonical architecture is [Security Architecture](../technical/security-architecture.mdx). This page turns that design into operating controls.

## Required controls

- Expose only the public gateway, identity endpoints, and explicitly approved webhooks; deny direct internet access to service ports.
- Require TLS on public connections and authenticated, encrypted workload channels inside the cluster.
- Issue short-lived, audience-bound workload tokens; validate issuer, audience, subject, expiry, issue time, and operation-specific caller allowlists at every receiving service.
- Allow subject assertion only from configured gateway/runtime identities and preserve both subject and actor in logs and audit events.
- Operate the PDP, OpenFGA, OPA policy distribution, and revocation/invalidation paths as security-critical dependencies with default-deny health semantics.
- Reject unknown or unsupported obligations. Never serve unfiltered data after a policy or enforcement error.
- Scope all persistence queries, cache keys, events, indexes, buckets, and exports by the authoritative organisation boundary.
- Store secrets in the deployment secret manager; never put credentials, private keys, tokens, approval codes, presigned URLs, or protected payloads in Git or logs.

## Alerts and runbooks

| Signal | Alert condition | First response |
| --- | --- | --- |
| Token validation failures | Rate or issuer/audience pattern exceeds baseline | Check key rotation, clock skew, client config, and active abuse |
| PDP errors/latency | Mandatory checks exceed SLO | Confirm fail-closed responses; inspect OPA/OpenFGA and dependency health |
| Projection lag/drift | Version watermark exceeds policy SLO | Pause risky grants, replay events, run reconciliation |
| Revocation lag | Invalidation is not observed within the security SLO | Deny affected subject/resource scope and reconcile |
| Security DLQ | Any policy, membership, delegation, approval, or kill-switch event | Quarantine, inspect, repair, and replay with an audit record |
| Unsupported obligation | Any production occurrence | Deny request and fix the PEP/policy compatibility before enabling |
| Agent kill-switch failure | Suspended agent can create a session or tool call | Block Agentic Plane ingress and invalidate sessions/tokens |

## Release checklist

- [ ] Public/private route and NetworkPolicy tests pass.
- [ ] Identity-provider development accounts and bootstrap credentials are absent.
- [ ] Workload audiences, caller allowlists, and subject-asserter lists match the deployed call graph.
- [ ] Default-deny tests cover unavailable OPA, OpenFGA, PDP, and policy bundles.
- [ ] Organisation-isolation tests cover reads, writes, cache entries, search, object storage, events, exports, and support tooling.
- [ ] Policy, membership, delegation, approval, and kill-switch revocation tests meet the agreed latency SLO.
- [ ] Audit, DLQ, outbox, reconciliation, backup, and restore runbooks have been exercised.
- [ ] Agent tools have schema, risk, approval, egress, timeout, and result-sanitisation controls.

Report suspected vulnerabilities privately to **info@cdpg.org.in**, not through a public issue.
