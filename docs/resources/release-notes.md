---
id: release-notes
title: Architecture Release Notes
---

# Architecture Release Notes

## 2026-08-09 — Go platform architecture baseline

- Established Control Plane, Data Plane, and Agentic Plane as equal top-level architecture views.
- Defined authentication, workload identity, subject/actor propagation, and fail-closed enforcement boundaries.
- Defined `dx-authz-go` as the composite PDP, OpenFGA as the relationship engine, and OPA as the **Planned** contextual/obligation engine.
- Documented carried authorization decisions for data-plane execution.
- Added policy, membership, agent, audit, marketplace, dataset, and file workflows with status and recovery paths.
- Added shared Go platform, deployment, trust-boundary, event-integration, and current/target documentation.
- Recorded unresolved decisions for OPA topology and bundle governance, the final subject-context contract, decision-artifact format, revocation SLO, reconciliation, and Agentic Plane production deployment.

This page records documentation architecture baselines. Product release readiness remains tracked by [Current and Target State](../technical/current-and-target.mdx) and the engineering roadmap.
