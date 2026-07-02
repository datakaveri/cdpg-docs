---
sidebar_position: 7
title: Data Plane
description: The services that serve the actual data — NGSI-LD queries, OGC standard interfaces, and streaming subscriptions.
---

# Data Plane

Serves the **actual data** of the exchange. Once a consumer holds a valid grant, the Data Plane is where they exercise it.

## Capabilities

- **Resource queries (NGSI-LD)** — fetch the latest records of published datasets, with attribute filtering and the full comparison operator set (`==`, `!=`, `<`, `>`, `<=`, `>=`).
- **Temporal queries** — "give me observations `between` these timestamps" (also `before`, `after`, `during`), with CSV export for bulk retrieval and aggregation support (histograms, metric aggregations).
- **Geospatial queries** — bounding box, polygon, circle, and line-string searches over location-tagged data (`within`, `intersects`, `contains`, and more).
- **Subscriptions** — consumers with `sub` access receive a stream of new data as it arrives rather than polling; each subscription is provisioned its own queue on the [messaging backbone](./messaging-backbone.md).
- **OGC standard interfaces** — a dedicated **OGC API Features** service exposes geospatial data through open OGC standards (collections, GeoJSON features, datetime/bbox filters), so standard GIS tooling can connect directly. Backed by PostGIS.

## How access is enforced

The Data Plane never interprets policies itself. On each request it asks the [Authorization Service](./authorization-service.md) one question — *may this subject perform this access type on this resource?* — and serves or refuses accordingly. This keeps enforcement consistent platform-wide: the Data Plane, File Exchange, and any future component all enforce exactly the same grants.

## Interactions

| Talks to | Why |
| --- | --- |
| Authorization Service | Per-request permission checks |
| Elasticsearch / PostGIS | Query execution over published data |
| Messaging Backbone | Ingests live data streams; provisions subscription queues |
