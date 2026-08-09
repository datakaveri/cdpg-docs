---
id: endpoints
title: Platform Endpoints
sidebar_label: Endpoints
description: The configured public gateway route inventory and ownership boundaries.
---

# Platform Endpoints

All public application traffic enters through `dx-gateway-go` on port `8000`. Routes are deployment configuration and can be disabled by environment. The inventory below reflects the checked-in Go gateway configuration; service-local OpenAPI documents remain authoritative for individual operations.

| Public prefix | Owner | Gateway authentication | Status |
| --- | --- | --- | --- |
| `/iudx/v2/cat` | Catalogue | Optional for discovery; writes checked by service | **Implemented** |
| `/iudx/v2/auth` | User Service | Route-specific | **Partially implemented** |
| `/acl` | Policy Service | Required | **Implemented** |
| `/authz` | Authorization Service | Required; administrative/debug exposure should be restricted | **Implemented** |
| `/files` | File Service | Required | **Partially implemented** |
| `/community` | Community Layer | Required | **Partially implemented** |
| `/marketplace` | Marketplace | Required | **Partially implemented** |
| `/marketplace-webhook` | Marketplace | No user token; exact callback and provider signature required | **Implemented** |
| `/audit` | Audit Service | Required | **Implemented** |
| `/iudx/v2/resource_servers` | Registry | Public reads; privileged writes | **Implemented** |
| `/iudx/v2/acl_servers` | Registry | Public reads; privileged writes | **Implemented** |
| `/iudx/v2/subscriptions` | Subscription Service | Required | **Implemented** |
| `/ogc` | OGC Data Plane | Route-specific | **Partially implemented** |
| `/agents`, `/agent-templates`, `/delegations` | Agent Registry | Required | **In development** |
| `/agent` | Agent Runtime | Required; supports streaming | **In development** |
| `/approvals` | MCP Gateway | Required | **In development** |
| `/healthz` | Gateway | None | **Implemented** |
| `/sadx/v1` | Federated extensions | Environment-dependent | **Deferred** |

The NGSI-LD public-query route and some service routes are not present consistently in every environment. They must not be advertised as operational until the gateway and GitOps route manifests agree and automated route tests pass.

Gateway authentication does not replace service authorization. Services enforce object ownership, organisation scope, and any obligations once canonical resource facts are known. Webhooks use a narrowly matched route and provider-specific signature verification; a path beneath the webhook prefix must not inherit unauthenticated access.

Local service ports are diagnostic/development interfaces, not public contracts. See [Deployment Architecture](../technical/deployment.mdx) and [API Standards](./api-standards.md).
