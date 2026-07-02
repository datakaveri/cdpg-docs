---
sidebar_position: 6
title: Catalogue
description: The registry of everything shareable on the exchange — JSON-LD metadata with geo-spatial, attribute, and text search.
---

# Catalogue

The **registry of everything shareable** on the exchange: datasets (databanks), AI models, and applications. If a resource is not in the catalogue, it does not exist to the platform.

## What a catalogue item records

- The resource's **provider** and **owning organisation**.
- Descriptive **metadata** as linked-data (**JSON-LD**) — semantically described and machine-interpretable: formats, units, tags, spatial extent, licence.
- **Which access types it supports** (`api`, `file`, `sub`) — the [Policy Service](./policy-service.md) validates every grant against this list.
- The **item type**: `DATABANK`, `AIMODEL`, or `APPS`.

## Discovery

Consumers search the catalogue without any grant — metadata is public even when data is not:

- **Attribute search** — by key-value pairs such as name and tags.
- **Geo-spatial search** — by circle, bounding box, polygon, or line string.
- **Text search** — free-text relevance search.
- **Complex search** — combinations of the above.

The search index is **Elasticsearch**; results return the metadata plus the access modalities, so a consumer knows *how* they could consume a resource before requesting access.

## Management

Providers (and their delegates) create, update, and delete their own items. Writes are identity-checked — only the owner or an org admin of the owning organisation may modify an item — and every item is schema-validated for its type before it is accepted. Providers also get a *my assets* view of everything they own.

## Why other components depend on it

Whenever another component needs an authoritative resource fact — *who owns this dataset? which organisation does it belong to? which access types does it support?* — it asks the catalogue. The Policy Service validates every grant request against it; the [File Exchange](./file-exchange.md) confirms a file belongs to a real item before issuing a download.

## Interactions

| Talks to / heard by | Why |
| --- | --- |
| Policy Service | Item details for grant validation (gRPC) |
| Elasticsearch | Metadata index for discovery |
| API Gateway | Public read path; identity-checked write path |
