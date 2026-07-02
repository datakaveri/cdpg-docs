---
id: release-notes
title: Release Notes
sidebar_label: Release Notes
description: Notable changes to the Data Exchange platform, most recent first.
---

# Release Notes

Notable platform changes, most recent first. Service-level changelogs live in each service's repository; this page tracks what adopters and integrators need to know.

## 2026 — Current platform (in progress)

The generational re-architecture into Go microservices behind a single gateway. Highlights:

- **New:** API Gateway as the single entry point — JWT validation at the edge, signed identity propagation, config-driven routing.
- **New:** Relationship-based authorization (OpenFGA) with a PAP/PDP split — grants enforce and revoke within moments, platform-wide.
- **New:** Marketplace for monetisable datasets with integrated payments.
- **New:** Platform-wide standards — one response envelope, one error taxonomy, embedded OpenAPI validation, uniform health/metrics endpoints ([API Standards](../develop/api-standards.md)).
- **Redesigned:** Community Layer (discussions + challenges) with moderation, search, and leaderboards.
- **Re-implemented on the same data:** catalogue, policy administration, user/IAM, audit, notifications, registry, credits, subscriptions, NGSI-LD data plane, OGC geospatial, file exchange.
- **Migration:** both stacks run in parallel; see the [Migration Overview](../migration/overview.md) for current status and the [Client Migration Guide](../migration/client-guide.md) for required client changes.

**Known gaps** (remaining on the legacy stack for now): KYC and org-approval workflows, NGSI-LD ingestion/admin endpoints, OGC advanced features (CQL, tiles) — tracked in the [Migration Overview](../migration/overview.md).

## Earlier — Legacy platform

The previous generation (Java control plane and data plane, Node.js file service, Python community service) remains in operation during the parallel-run period. Its documented behaviour is preserved by the current services except where the [Client Migration Guide](../migration/client-guide.md) says otherwise.

:::note Versioning
Platform releases are coordinated through the GitOps repository — an environment's exact service versions are always visible there ([Deployment & GitOps](../operations/deployment-gitops.md)).
:::
