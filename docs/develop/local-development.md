---
id: local-development
title: Local Development
sidebar_label: Local Development
description: Run the entire Data Exchange locally with Docker Compose — from zero to a verified stack in a few commands.
---

# Local Development

The entire platform — every service plus all infrastructure — runs locally with Docker Compose, driven by a single `Makefile` in the orchestration repository. From zero to a fully running stack takes 15–30 minutes (mostly Docker pulls and builds).

## Prerequisites

| Tool | Version | Notes |
| --- | --- | --- |
| Docker Desktop | Latest | Needs Compose v2 (`docker compose`, not `docker-compose`) |
| Git | Any | With SSH keys configured for GitHub |
| Go | 1.22+ | Only if running services outside Docker |
| Make | Any | Ships with macOS Xcode tools |

## Step 1 — Clone the orchestrator and services

The orchestration repository (`cdpg-claude`) holds the Compose files, configs, and a clone script. Service repositories are cloned **inside** it (the Docker build context requires it):

```bash
git clone git@github.com:datakaveri/cdpg-claude.git && cd cdpg-claude
git checkout dev
make dev-clone        # clones every service repo here, on dev (idempotent)
```

## Step 2 — Boot and initialise

```bash
make dev-up           # boot everything (~3–10 min cold, ~10 s warm)
make dev-init-dbs     # create service databases (first run only, idempotent)
```

Monitor progress:

```bash
make dev-status                    # table of all containers + status
make dev-logs SVC=dx-gateway-go    # tail one service
```

## Step 3 — Verify

```bash
make dev-demo
```

The smoke test exercises eight end-to-end flows — JWT acquisition, health checks, policy propagation (grant → enforce → revoke → deny), gateway authentication and routing, and membership events. **All eight should be green.**

## Step 4 — Get a token and explore

```bash
make dev-token        # fetches a JWT for the test consumer → /tmp/jwt.txt
TOKEN=$(cat /tmp/jwt.txt)
curl -H "Authorization: Bearer $TOKEN" http://localhost:8000/files/v1/health
```

| What | Where |
| --- | --- |
| API Gateway (single entry) | http://localhost:8000 |
| Keycloak admin | http://localhost:8180 (admin / admin) |
| RabbitMQ management | http://localhost:15672 (admin / admin) |
| MinIO console | http://localhost:9003 (minioadmin / minioadmin) |
| Elasticsearch | http://localhost:9200 |
| OpenFGA playground | http://localhost:3001 |

### Test users (Keycloak realm `iudx`)

| User | Password | Role |
| --- | --- | --- |
| cosadmin | cosadmin123 | cos_admin |
| orgadmin | orgadmin123 | org_admin |
| provider1 | provider123 | provider |
| consumer1 | consumer123 | consumer |
| delegate1 | delegate123 | delegate |

:::caution Dev credentials
These users, passwords, and admin consoles are **local-development defaults only**. Production deployments provision real identities and secrets — see [Security](../operations/security.md).
:::

## Daily workflow

```bash
make dev-up                        # start (idempotent)
make dev-down                      # stop, keep data
make dev-nuke                      # stop + delete all volumes (fresh start)
make dev-restart-go                # restart the Go services after changes

# Rebuild one service after editing its code
docker compose -f docker-compose.go-stack.yml build dx-acl-go
docker compose -f docker-compose.go-stack.yml up -d dx-acl-go

# Gateway route changes need no rebuild (config is volume-mounted)
docker compose -f docker-compose.go-stack.yml restart dx-gateway-go
```

## Running one service outside Docker

Each service reads baked development defaults from its `configs/config.yaml` and accepts environment-variable overrides:

```bash
cd dx-acl-go && go run ./cmd/server
```

See [Configuration](./configuration.md) for the configuration model and the JWT/JWKS networking gotcha that bites everyone once.

## Troubleshooting

If something doesn't come up healthy, start with [Troubleshooting](../guides/troubleshooting.md).
