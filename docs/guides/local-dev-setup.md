# Local Development Setup

## Prerequisites

- Docker + Docker Compose
- Go 1.22+, Java 21 (Homebrew openjdk@21), Node 18+
- The 6 application repos cloned next to the orchestration repo (see workspace `SETUP.md`)

## Bring-up

```bash
# Infrastructure (Postgres, Redis, RabbitMQ, Elasticsearch, MinIO, Keycloak)
docker compose --profile infra up -d

# Applications
docker compose --profile infra --profile apps up -d --build

# Health
curl http://localhost:8080/health/live   # controlplane
curl http://localhost:5000/healthz       # community layer
```

## Go services (run directly)

```bash
cd dx-acl-go && go run ./cmd/server     # reads configs/config.yaml
```

Set `jwt.enabled: false` in dev to skip Keycloak (synthetic user injected).

## Java services

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
cd dx-common && mvn -q install -DskipTests        # build shared lib first
cd ../dx-controlplane && mvn -q compile
```

## Test users (Keycloak)

| User | Password | Role |
|---|---|---|
| cosadmin | cosadmin123 | cos_admin |
| orgadmin | orgadmin123 | org_admin |
| provider1 | provider123 | provider |
| consumer1 | consumer123 | consumer |
