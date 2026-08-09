---
id: configuration
title: Configuration
sidebar_label: Configuration
description: Typed, environment-driven service configuration and deployment validation.
---

# Configuration

Go services load configuration once at startup into typed structures. Development defaults may be embedded or versioned, but secrets and environment-specific endpoints are injected at runtime by Compose or the GitOps secret/config mechanism.

```yaml
identity:
  issuer: https://identity.example/realms/cdpg
  jwks_url: https://identity.internal/realms/cdpg/protocol/openid-connect/certs
  audience: dx-catalogue-go
  allowed_callers: [dx-gateway-go, dx-acl-go]
authorization:
  endpoint: dns:///dx-authz-go:8090
  fail_closed: true
database:
  schema_mode: provision
```

## Rules

- Business code receives validated configuration; it does not read environment variables directly.
- The external token issuer and the network-reachable JWKS URL are separate settings when topology requires it.
- Service identity includes destination audience, allowed caller IDs, and allowed subject asserters. Wildcards are prohibited in production.
- `schema_mode` is a deployment setting. Exactly one actor provisions versioned migrations; ordinary replicas do not execute DDL.
- Secrets have no usable production defaults and services fail startup when required values are missing.
- Routes, feature gates, dependency endpoints, timeouts, retry budgets, and policy versions are explicit and observable.

## Validation

Every service must support a no-traffic configuration check used by CI and deployment gates. It validates syntax, required fields, URL/audience consistency, route targets, caller allowlists, secret references, database connectivity metadata, and incompatible feature combinations without mutating production data.

## Issuer and JWKS endpoints

The token issuer must exactly match the `iss` claim that clients receive. The JWKS endpoint is the network-reachable location from which a service retrieves signing keys; in a container or cluster it may use a different hostname from the public issuer. Separating these settings prevents topology from weakening issuer validation.

| Concern | Source |
| --- | --- |
| Development defaults | Service `configs/` directory |
| Local overrides | Orchestration Compose environment |
| Cluster values | Environment overlays in the GitOps repository |
| Secrets | External secret manager references |
| Policy bundles | Versioned, verified policy-distribution channel — **Planned** |

See [Shared Platform Architecture](../technical/shared-platform.md) and [Deployment Architecture](../technical/deployment.mdx).
