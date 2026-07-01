# JWT Validation

How tokens are validated across the stack, and how to debug 401s.

## Validation rules (dx-common-go `auth/jwt`)

- Signature: RS256 only, keys fetched from Keycloak JWKS (cached, refreshed hourly)
- `iss` must match configured issuer; `aud` checked when configured
- `exp`/`nbf` with bounded leeway (≤300s)
- When `jwt.enabled: false` (dev only) a synthetic user is injected — never use in production

## Debugging a 401

1. Decode the token at jwt.io — check `iss`, `aud`, `exp`.
2. The classic gotcha: browser gets the token from `localhost:8180`, but
   backends fetch JWKS from `keycloak:8080` (Docker network). The configured
   issuer must match the **browser-facing** URL.
3. Check the service's JWKS connectivity:
   ```bash
   docker exec <svc> wget -qO- http://keycloak:8080/realms/cdpg/protocol/openid-connect/certs | head -c 200
   ```
4. Clock skew: compare `date -u` inside the container vs the token's `iat`.

## See also

- [Auth Flow](../api-reference/auth-flow)
