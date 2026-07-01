---
sidebar_position: 6
---

# Data Plane

Serves the **actual data** of the exchange. Once a consumer holds a valid grant, the Data Plane is where they exercise it.

## Capabilities

- **Resource queries** — fetch records from published datasets, with filtering.
- **Temporal queries** — "give me observations between these timestamps."
- **Geospatial queries** — bounding box, polygon, and proximity searches over location-tagged data.
- **Subscriptions** — consumers with `sub` access receive a stream of new data as it arrives, rather than polling.
- **OGC standard interfaces** — a dedicated OGC-compliant server exposes the same data through open geospatial standards (WFS, WMS, map tiles), so standard GIS tooling can connect directly.

## How access is enforced

The Data Plane never interprets policies itself. On each request it asks the Authorization Service one question — *may this subject perform this access type on this resource?* — and serves or refuses accordingly. This keeps enforcement consistent platform-wide: the Data Plane, File Exchange, and any future component all enforce exactly the same grants.

## Interactions

| Talks to | Why |
|---|---|
| Authorization Service | Per-request permission checks |
| Search & storage infrastructure | Query execution over published data |
| Messaging Backbone | Ingests live data streams for subscriptions |
