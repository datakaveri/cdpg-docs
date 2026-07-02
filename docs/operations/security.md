---
id: security
title: Security Considerations
sidebar_label: Security
description: The platform's security model in practice — trust boundaries, secret handling, and the production hardening checklist.
---

# Security Considerations

## The trust model, layer by layer

| Layer | Mechanism |
| --- | --- |
| **Channel** | TLS for all external traffic; in-cluster TLS / network policy for service-to-service |
| **Workload** | Kubernetes NetworkPolicies restrict which service may call which; only the gateway is reachable from outside |
| **User identity** | Validated once at the edge (OIDC/JWT), then carried as **HMAC-signed identity headers** with a freshness timestamp; an invalid signature is a hard failure with no fallback |
| **Resource access** | Per-request ReBAC checks against the [Authorization Service](../components/authorization-service.md) |

## Principles applied across the platform

- **One entry point** — clients can only reach the gateway; every internal port is private. Gateway-only routes can additionally reject any request that did not arrive through the edge.
- **Credentials never travel inward** — the gateway strips the `Authorization` header after validating it; internal services never see or store user credentials. Passwords live only in the identity provider.
- **Explicit validation** — every request is validated against the service's OpenAPI contract before any handler runs; SQL is always parameterized; body-size limits apply everywhere; uploads are type- and size-validated.
- **Least-privilege roles** — provider/org-admin/platform-admin powers are checked on every mutating operation, not assumed from the UI.
- **Auditability** — every mutating endpoint emits an audit event; audit is append-only and asynchronous.
- **Webhooks are verified** — payment callbacks are accepted only with a valid cryptographic signature.
- **Presigned URLs are short-lived** — leaked file links expire in minutes and access snaps back to the policy record.
- **Rate limiting** at the gateway protects open resources from abuse and DDoS.

## Secret handling

- **No default or hardcoded secrets** anywhere, including Compose files — baked configs ship empty secret fields and services refuse to start without required secrets outside dev.
- Secrets are injected as environment variables at runtime — from your secret store via External Secrets in clusters (see [Deployment & GitOps](./deployment-gitops.md)).
- The identity-header **shared secret supports rotation**: services accept an additional-secrets list so the gateway can roll to a new key without downtime.

## Production hardening checklist

- [ ] TLS on every external endpoint; HTTP disabled
- [ ] Real identity provider realm — dev test users and default admin passwords removed
- [ ] Unique, generated secrets (HMAC shared secret, DB, broker, object store) in a secret store — none in Git
- [ ] Kubernetes NetworkPolicies deployed (only the gateway is publicly reachable)
- [ ] JWT validation enabled on every service (no dev bypass anywhere)
- [ ] Rate limits configured at the gateway
- [ ] DLQ and outbox alerts wired ([Monitoring & Health](./monitoring.md))
- [ ] Backups of PostgreSQL, Elasticsearch, and object storage scheduled and restore-tested
- [ ] Periodic security audits and dependency updates scheduled

## Reporting a vulnerability

Please report suspected vulnerabilities privately to **info@cdpg.org.in** rather than opening a public issue.
