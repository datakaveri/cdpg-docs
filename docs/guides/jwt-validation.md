---
title: JWT Validation
description: How tokens are validated across the stack, and how to debug 401s.
---

# JWT Validation

How tokens are validated across the stack, and how to debug 401s.

## Validation rules

- **Signature**: RS256, keys fetched from the identity provider's JWKS endpoint (cached, refreshed periodically).
- **`iss`** must match the configured issuer exactly; **`aud`** is checked when configured.
- **`exp`/`nbf`** enforced with bounded leeway (≤ 300 s).
- Development stacks may run with JWT validation disabled (a synthetic user is injected) — **never use that setting outside local development.**

## Debugging a 401

1. **Decode the token** (jwt.io or `jq`-based decode) — check `iss`, `aud`, `exp` first.
2. **The classic gotcha**: the browser gets the token from the host-visible identity URL (e.g. `localhost:8180`), but backends fetch JWKS over the container network (e.g. `keycloak:8080`). The configured issuer must match the **browser-facing** URL that appears in the token, while the JWKS URL points wherever the backend can reach. See [Configuration](../develop/configuration.md#the-issuerjwks-gotcha-read-this-once).
3. **Check the service's JWKS connectivity**:
   ```bash
   docker exec <svc> wget -qO- http://keycloak:8080/realms/<realm>/protocol/openid-connect/certs | head -c 200
   ```
4. **Clock skew**: compare `date -u` inside the container with the token's `iat`.
5. **On gateway-fronted services**, remember the service never sees your JWT — it sees the gateway's signed identity headers. A 401 from the *service* on a gateway path usually means a header-signature (shared-secret) mismatch, not a token problem.

## See also

- [Auth Flow](../api-reference/auth-flow.md) — claims and identity headers
- [Flow: Authentication & Identity](../flows/authentication.md)
