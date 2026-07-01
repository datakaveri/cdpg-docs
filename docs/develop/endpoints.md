---
id: endpoints
title: Platform Endpoints & API Reference
sidebar_label: Endpoints & APIs
description: Component-to-endpoint mapping for an IUDX deployment, with links to each component's API documentation.
---

# Platform Endpoints & API Reference

This page maps each IUDX platform component to its mapped domain (and sub-path) and, where available, its API documentation. The URLs below point to the reference deployment at **`platform.iudx.io`** — on your own deployment, substitute your host while keeping the same sub-paths.

:::note
A blank in the **API docs** column means interactive API documentation is not separately published for that component (it is an internal or third-party service).
:::

## Core data exchange

These are the services that make up the IUDX [Control Plane](../technical/control-plane.md) and [Data Plane](../technical/data-plane.md).

| Component | Role in IUDX | Endpoint | API docs |
| --- | --- | --- | --- |
| **Control Plane** | Catalogue, discovery & management | [`/controlplane`](https://platform.iudx.io/controlplane) | [API docs](https://platform.iudx.io/controlplane/apis) |
| **ACL** (Access Control List) | Authorization & access policies | [`/controlplane/acl`](https://platform.iudx.io/controlplane/acl) | [API docs](https://platform.iudx.io/controlplane/acl/apis) |
| **Auditing Server** | Audit & metering of access | — | — |
| **Data Plane Server** | Resource server — data access | [`/dataplane`](https://platform.iudx.io/dataplane) | [API docs](https://platform.iudx.io/dataplane/apis) |
| **Resource Server Proxy** | Federated resource access | [`/dataplane/rsp`](https://platform.iudx.io/dataplane/rsp) | [API docs](https://platform.iudx.io/dataplane/rsp/apis) |
| **GeoServer** | Geospatial (OGC) data | [`/geoserver`](https://platform.iudx.io/geoserver) | — |
| **File Server** | File-based assets (Files Connect) | [`/files-connect-api`](https://platform.iudx.io/files-connect-api) | [API docs](https://platform.iudx.io/files-connect-api/apis) |

## Platform services

Supporting services for messaging, identity, observability, and community.

| Component | Role in IUDX | Endpoint | API docs |
| --- | --- | --- | --- |
| **RabbitMQ** | Data broker — streaming / pub-sub | [`/databroker`](https://platform.iudx.io/databroker) | — |
| **Keycloak** | Identity & authentication | [`/auth`](https://platform.iudx.io/auth) | — |
| **Kibana** | Logs & search visualization | [`/kibana`](https://platform.iudx.io/kibana) | — |
| **osTicket** | Help desk / support | [`/help-desk`](https://platform.iudx.io/help-desk) | — |
| **Community Layer** | Community portal | [`/community`](https://platform.iudx.io/community) | [Docs](https://platform.iudx.io/community/docs) |

## Sandbox & tooling

| Component | Role in IUDX | Endpoint | API docs |
| --- | --- | --- | --- |
| **Sandbox Connect API** | Sandbox access API | [`/sandbox-connect-api/api`](https://platform.iudx.io/sandbox-connect-api/api) | [API docs](https://platform.iudx.io/sandbox-connect-api/v1/apis/) |
| **User Docs** | Sandbox user documentation | [`/sandbox-connect-api/user-docs`](https://platform.iudx.io/sandbox-connect-api/user-docs) | [Docs](https://platform.iudx.io/sandbox-connect-api/user-docs/docs/intro) |
| **MCP Server** | Model Context Protocol server | [`/mcp-server`](https://platform.iudx.io/mcp-server) | — |

---

For the conceptual API surface behind these endpoints — catalogue, exchange, authorization, and consent — see [APIs & Standards](./apis.md).
