---
id: catalogue-server
title: Catalogue Server
sidebar_label: Catalogue Server
description: The IUDX Catalogue Server — the JSON-LD metadata store with discovery APIs, its components, and multi-tenancy.
---

# Catalogue Server

The IUDX Catalogue is a store of **meta-information** associated with the data resources available in the data exchange. It provides search capabilities to discover data sources of interest and allows data providers to manage the meta-information pertaining to their resources.

The Catalogue Server interacts with the [Authorization Server](./authorization-server.md)'s authentication service to allow only authorized writes and updates: the authorized entity (an **onboarder**) presents an access token, which the server validates via token introspection. The catalogue stores information as **JSON-LD documents**, making the metadata semantically described and machine-interpretable, and uses an interface to a database component to store and search resource meta-information.

## Catalogue Server APIs

The Catalogue Server primarily supports APIs for storing and retrieving meta-information about resources.

| # | API | Method | Description |
| --- | --- | --- | --- |
| 1 | `/iudx/cat/v1/search` | GET | Discover resources — owner, data-descriptor, access URL, etc. — using spatial (geo), tags, and attribute queries |
| 2 | `/iudx/cat/v1/count` | GET | Discover the number of available resources using spatial, tags, and attribute queries |
| 3 | `/iudx/cat/v1/item` | POST, PUT, GET, DELETE | CRUD of items (resourceItem, resourceGroup, resourceServer, provider) |
| 4 | `/iudx/cat/v1/list/{type}` | GET | List all documents (by id) of a type (resource, resourceGroup, provider, resourceServer) |

*Table 2: Catalogue Server APIs*

## Solution Architecture

Like the Resource Server, the Catalogue Server uses a **service-mesh architecture**.

![IUDX Catalogue Server solution architecture — API gateway, discovery and cataloguing services, and the JSON-LD metadata store](/img/technical/arch-catalogue-server.svg)
*Figure 5: Catalogue Server Solution Architecture*

### API Server

An HTTPS web server acting as the **API gateway** for actors to interact with the Catalogue Server. It is also responsible for calling the Authorization Server (via the authentication service) to authenticate and authorize writes to the database.

### Database Discovery Service

Called by the API Server to serve consumer dataset-discovery requests. Depending on the query, it returns the document itself, a count of matching documents, or a list of matching IDs. Supported queries include:

- **Attribute search** — by key-value pairs such as name and tags.
- **Geo-spatial search** — by circle, bounding box, polygon, or line string.
- **Text search** — free-text search.
- **Complex search** — a combination of the above.
- **List** — lists all items of a type (resource, resourceGroup, resourceServer, provider).

### Item Cataloguing Service

Validates the schema and relationship links of items being created, based on the **itemType** (resource, resourceGroup, resourceServer, provider). It interacts extensively with the Authorization Server so that only providers or delegated onboarders (with a valid access token) may use it. Its functionalities — split for logical grouping between a **Validation Service** and a **Database Service** — include:

- **Item creation/updation/deletion** — managing all item/dataset types.
- **Item schema validation** — confirming an item conforms to a valid schema for its type.
- **Item link validation** — confirming links are valid and permitted (e.g. a resource may link to a resourceGroup only if both belong to the same provider).
- **Item summarization** — indexing discovery-relevant properties (e.g. text description and name) into a private field so the item is query-able by the database.

### Authentication Service

Validates tokens via the Authorization Server's token-introspection APIs.

## Multi-tenancy

The Catalogue Server is **multi-tenant**, with tenants being the various **Smart-City / Municipal corporations, organizations**, or — where no such entity can be conceived — the general IUDX owner. This lets applications such as user interfaces segregate data resources according to the city to which they belong.

See the [Control Plane](./control-plane.md) for the consumer-facing view of discovery.
