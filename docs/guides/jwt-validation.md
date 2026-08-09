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
2. **Issuer/JWKS topology**: the browser gets the token from the public identity URL, while backends may fetch JWKS over an internal network. The configured issuer must match the URL in the token, while the JWKS URL points wherever the backend can reach. See [Configuration](../develop/configuration.md#issuer-and-jwks-endpoints).
3. **Check the service's JWKS connectivity**:
   ```bash
   docker exec <svc> wget -qO- http://keycloak:8080/realms/<realm>/protocol/openid-connect/certs | head -c 200
   ```
4. **Clock skew**: compare `date -u` inside the container with the token's `iat`.
5. **On gateway-fronted services**, distinguish the client token from the gateway's destination-bound workload token. A service-side `401` can mean a wrong workload audience, unknown caller, expired token, or unauthorized subject asserter even when the external token was valid.

## See also

- [Auth Flow](../api-reference/auth-flow.md) — external and workload identity contracts
- [Flow: Authentication & Identity](../flows/authentication.mdx)
