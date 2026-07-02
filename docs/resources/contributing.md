---
id: contributing
title: Contributing
sidebar_label: Contributing
description: How to contribute to the Data Exchange — workflow, standards, and expectations.
---

# Contributing

The Data Exchange is open source — contributions of code, documentation, and issue reports are welcome. All repositories live under [github.com/datakaveri](https://github.com/datakaveri).

## Where things live

| What | Where |
| --- | --- |
| Each platform service | Its own repository (`dx-<name>-go`) |
| Shared service library | `dx-common-go` |
| Local-dev orchestration (Compose, Makefile, engineering docs) | The orchestration repository |
| Cluster deployment | The GitOps repository |
| This documentation | `cdpg-docs` |

## Workflow

1. **Branch from `dev`** — `dev` is the integration branch across all repositories; `main` tracks releases.
2. **Small, focused branches** — `feat/<topic>`, `fix/<topic>`, `docs/<topic>`.
3. **Quality gates before a PR** (service code):
   ```bash
   go build ./...  &&  go test ./...  &&  gofmt -l .  &&  go vet ./...  &&  golangci-lint run
   ```
4. **Verify against the running platform** — bring up the local stack and run the smoke test (`make dev-demo`) for changes touching auth, policies, events, or routing. See [Local Development](../develop/local-development.md).
5. **PRs are reviewed against the platform service standards** — the common boot contract, configuration model, middleware stack, response envelope, eventing rules (outbox, DLQ, idempotency), observability, and security requirements. Deviations need a documented exception.
6. **Client-visible contract changes** must be documented **before merge** — see how the [Client Migration Guide](../migration/client-guide.md) is maintained. Undocumented contract drift is treated as a bug.

## What makes a good contribution

- **One concern per PR**, with tests that demonstrate the behaviour.
- **Match the surrounding code** — the platform's strength is that every service looks the same; novelty in structure is a cost, not a feature.
- **Update the docs in the same change** when behaviour, configuration, or contracts change.
- **Table-driven tests** for logic; handler tests for endpoints; integration tests against the shared local infra where persistence or messaging is involved ([Testing](../develop/testing.md)).

## Reporting issues

- **Bugs** — file against the service's repository with reproduction steps; include request/response and the `type` URN from the error envelope.
- **Contract drift** — a response that doesn't match these docs or the legacy contract is a bug even if "it works".
- **Security issues** — report privately to **info@cdpg.org.in**; do not open a public issue. See [Security](../operations/security.md).

## Contributing to this documentation

Docs follow the same PR workflow. Keep pages concise, cross-link related topics, prefer diagrams (Mermaid) for flows, and follow the terminology in the [Glossary](./glossary.md). Build locally with `npm start` and verify there are no broken links (`npm run build` fails on them).
