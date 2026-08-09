---
title: Troubleshooting
description: The most common problems on a local or fresh Data Exchange deployment, and how to fix them.
---

# Troubleshooting

The issues below account for most first-hour problems on a local stack. Work top-down: infrastructure health → authentication → events → data.

## A service container is `unhealthy`

```bash
make dev-status                    # who is unhealthy?
make dev-logs SVC=<service>        # why?
```

The usual causes, in order of likelihood:

1. **Its database doesn't exist yet** — run `make dev-init-dbs` (idempotent; required once after a fresh volume wipe).
2. **A dependency isn't up yet** — Postgres/RabbitMQ/Keycloak still starting; give the stack a minute and re-check.
3. **Port collision on the host** — something else owns the port (`lsof -i :<port>`); stop it or change the mapping.

## Every request returns 401

Check for an **issuer/JWKS mismatch**: the token carries the public issuer URL while the backend may fetch keys from an internal endpoint. The configured issuer must equal the token's `iss` claim exactly; the JWKS URL points wherever the backend can reach the identity provider. See [Configuration](../develop/configuration.md#issuer-and-jwks-endpoints) and [JWT Validation](./jwt-validation.md).

Also check token expiry, destination audience, configured workload caller allowlist, and subject-asserter permission. Gateway authentication may succeed while the destination correctly rejects the internal caller context.

## Policy created but access still denied (403)

The grant exists in the Policy Service but hasn't reached the Authorization Service. Check the event pipeline:

1. **Outbox draining?** Unsent rows piling up in the policy outbox mean the dispatcher can't reach the broker.
2. **Broker up, queue bound?** Check the RabbitMQ management UI — the policy queue should have a consumer.
3. **DLQ empty?** A non-empty policy dead-letter queue means events are arriving but failing to apply — inspect a dead-lettered message.
4. **Check the graph directly** — `POST /v1/check` on the Authorization Service with the subject/relation/object you expect.

Full pipeline walkthrough: [FGA Authorization](./fga-authorization.mdx).

## Catalogue search fails with `index_not_found_exception`

The Elasticsearch catalogue index hasn't been created (first-ever boot only). Create the catalogue index with its mappings, then retry — see the index-setup step in [Local Development](../develop/local-development.md).

## `make dev-demo` step fails

Each step names the flow it verifies — use it to localise the fault:

| Failing step | Look at |
| --- | --- |
| JWT acquisition | Keycloak up? realm imported? |
| Health checks | `make dev-status`, service logs |
| Policy propagation | The event pipeline (above) |
| 401/403 enforcement | Gateway logs, shared secret |
| Routing to services | Gateway route config, upstream health |

## Nothing works after a `git pull`

Rebuild images (`make dev-build`) — a changed service still runs its old image until rebuilt. When in doubt: `make dev-nuke && make dev-up && make dev-init-dbs` gives you a guaranteed-clean stack at the cost of local data.

---

Still stuck? Check the service's own logs first (`make dev-logs SVC=…`), then its `/healthz/ready` endpoint — readiness failures name the dependency that's down. For platform-level help, see [Contributing](../resources/contributing.md) for where to file issues.
