---
id: configuration
title: Configuration
sidebar_label: Configuration
description: How platform services are configured — environment-driven settings, baked dev defaults, and secret handling.
---

# Configuration

Every platform service follows the same configuration model, so once you know it for one service you know it for all of them.

## The model

1. **Baked development defaults** — each service ships a `configs/config.yaml` compiled into its image with sensible local-dev values (local hostnames, dev ports, empty secrets).
2. **Environment-variable overrides** — at runtime, environment variables override any baked value. This is the *only* production configuration mechanism: containers are configured entirely through their environment (injected by Compose locally, by Helm values + External Secrets in clusters).
3. **No mounted config files** — services do not read config files from volumes at the application level; what's in the image plus the environment is the complete truth.

```yaml
# configs/config.yaml — baked dev defaults (never secrets)
jwt:
  issuer: http://localhost:8180/realms/iudx
  jwks_url: http://keycloak:8080/realms/iudx/protocol/openid-connect/certs
  cache_ttl_minutes: 10
hmac:
  shared_secret: ""        # must be set via env outside dev
```

```yaml
# docker-compose / Helm — env overrides
environment:
  JWT_ISSUER: http://localhost:8180/realms/iudx
  JWT_JWKS_URL: http://keycloak:8080/realms/iudx/protocol/openid-connect/certs
  HMAC_SHARED_SECRET: ${HMAC_SHARED_SECRET}
```

## Rules that keep configuration sane

- **Environment variables are unprefixed and uniform** across services (`JWT_ISSUER`, `RABBITMQ_URL`, …) — no per-service prefixes to memorise.
- **Secrets never appear in baked config or in Git** — the baked value is empty, the runtime injects the real one, and services validate at startup that required secrets are present outside dev.
- **Business code never reads the environment directly** — configuration is loaded once at boot into a typed struct; everything downstream receives values explicitly.

## The issuer/JWKS gotcha (read this once)

The browser and the backend see the identity provider at **different URLs** in containerised environments:

- The browser logs in at `http://localhost:8180`, so tokens carry `iss: http://localhost:8180/realms/iudx`.
- A backend container reaches Keycloak at `http://keycloak:8080` on the Docker network.

Token validation matches the **issuer exactly as it appears in the token**, while fetching keys from wherever the backend can actually reach. That is why the configuration has *two* URLs:

| Setting | Value | Meaning |
| --- | --- | --- |
| `jwt.issuer` | the **browser-facing** URL | must equal the token's `iss` claim |
| `jwt.jwks_url` | the **backend-reachable** URL | where signing keys are fetched |

Setting both to the same URL is the most common cause of mysterious `401`s in local development — see [JWT Validation](../guides/jwt-validation.md).

## Legacy services

The previous-generation Java services use Vert.x JSON config files with per-environment merging instead of this model. They are configured as before until retired — see [Migration](../migration/overview.md).

## Where configuration lives

| Concern | Location |
| --- | --- |
| Dev defaults | `configs/config.yaml` in each service repo |
| Local overrides | `docker-compose*.yml` in the orchestration repo |
| Cluster values | Helm values per environment in the GitOps repo — see [Deployment & GitOps](../operations/deployment-gitops.md) |
| Secrets (cluster) | External Secrets Operator → injected as env vars |
