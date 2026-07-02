---
id: testing
title: Testing
sidebar_label: Testing
description: How the platform is tested — unit, integration, contract, and end-to-end layers — and how to test your own integration.
---

# Testing

## The testing pyramid

| Layer | What it covers | Runs against |
| --- | --- | --- |
| **Unit** | Business logic per service; table-driven tests | Nothing external (mocks/fakes) |
| **Handler** | Each HTTP endpoint's request/response behaviour, envelope, and error mapping | In-process router |
| **Integration** | Repositories and messaging against real infrastructure | Local Postgres/ES/RabbitMQ/MinIO from the Compose stack |
| **Contract** | The API surface against the embedded OpenAPI spec — every request is validated in all environments, so drift fails loudly | Any environment |
| **End-to-end** | The whole platform: authentication, policy propagation, enforcement, routing | The full local stack |

## The end-to-end smoke test

The orchestration repo ships a one-command verification of the running stack:

```bash
make dev-demo
```

It exercises the flows that matter most: JWT acquisition → health checks → **policy create propagating through the messaging backbone into the authorization graph** → gateway `401` without a token → `403` without a policy → routing to data-side services → membership events → **revocation propagating back to deny**. All green means the platform's critical paths work.

Use it as your regression gate: run it after any change that touches authentication, policies, events, or routing.

## Quality gates for service code

Every service change must pass locally before review:

```bash
go build ./...
go test ./...
gofmt -l .          # must print nothing
go vet ./...
golangci-lint run
```

## Testing your client integration

1. Run the platform locally ([Local Development](./local-development.md)) and use the test users.
2. Script your flows against `http://localhost:8000` exactly as you would against production.
3. Assert on the [standard envelope](./api-standards.md) — payload in `results`, errors by status + `detail`.
4. Test the *unhappy* paths deliberately: expired token (`401`), no policy (`403`), duplicate policy (`409`) — the platform's error contract is stable and worth encoding in your tests.
