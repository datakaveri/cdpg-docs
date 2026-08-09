---
id: monitoring
title: Monitoring & Health
sidebar_label: Monitoring & Health
description: The operational surface of every service — health endpoints, metrics, logs, and the signals that matter.
---

# Monitoring & Health

Every platform service exposes the same operational surface, so one dashboard pattern covers the whole fleet.

## Per-service endpoints

| Endpoint | Purpose |
| --- | --- |
| `GET /healthz/live` | Liveness — the process is up (restart if failing) |
| `GET /healthz/ready` | Readiness — **real dependency checks** (DB, broker, downstream services); failing readiness removes the instance from traffic and names the broken dependency |
| `GET /metrics` | Prometheus metrics — request rates, latencies, error counts, consumer/job outcomes |
| `GET /docs` | The service's own API documentation |

## The observability stack

- **Prometheus** scrapes every service's `/metrics` for system and application metrics.
- **Grafana** dashboards visualize platform health and per-service performance.
- **Loki** aggregates structured logs. Every log line carries a **request ID** propagated from the gateway through every service a request touches — one ID reconstructs the whole journey.

## Signals worth alerting on

| Signal | Why it matters |
| --- | --- |
| **Policy DLQ depth > 0** | Policy/membership events are failing to apply — enforcement is drifting from the policy record. Investigate immediately. |
| **Outbox backlog growing** | The event dispatcher can't reach the broker; grants are committed but not yet enforceable. |
| Gateway 5xx rate | An upstream is failing — readiness endpoints will name which |
| `/v1/check` latency | Authorization sits on the data hot path; sustained latency degrades every data request |
| Readiness flapping | A dependency (DB/broker) is unstable |
| Notification DLQ depth | Users silently not receiving emails |

## Audit trail

Operational monitoring tells you the platform is healthy; the [Audit service](../components/supporting-services.md) tells you what its users did — every mutating action, queryable and exportable. Both matter; don't conflate them.

## Smoke verification

After any deployment or infrastructure change, the end-to-end smoke test validates the critical paths in under a minute — see [Testing](../develop/testing.md).
