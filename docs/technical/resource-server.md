---
id: resource-server
title: Resource Server
sidebar_label: Resource Server
description: The IUDX Resource Server — the data plane that serves and ingests data per provider policy, its APIs, components, and multi-tenancy.
---

# Resource Server

The Resource Server is the **data plane** for datasets served by IUDX. Its main function is to serve data to consumers in accordance with the access-policy rules set by the provider of the resource.

To do this, the Resource Server implements an interface with the [Authorization Server](./authorization-server.md) to authenticate data access: for any access to protected resources, the Resource Server requires the consumer to present an access token, which it validates using the Authorization Server's **token introspection** APIs before serving the data. It also hosts an interface to a **data broker** for streaming data access, and an interface to a **database** component to serve data according to search criteria such as temporal and geo-spatial queries.

## Resource Server APIs

The Resource Server supports APIs for data access and search, data subscription, and some management interfaces. APIs are implemented per the **NGSI-LD** specification where applicable.

| # | API | Method | Description |
| --- | --- | --- | --- |
| 1 | `/ngsi-ld/v1/entities/{id}` | GET | Get the latest data of a resource |
| 2 | `/ngsi-ld/v1/temporal/entities` | GET | Query a resource using temporal and attribute properties |
| 3 | `/ngsi-ld/v1/entities` | GET | Query a resource using spatial (geo), temporal, and attribute properties |
| 4 | `/ngsi-ld/v1/entityOperations/query` | POST | Query a resource using spatial, temporal, and attribute properties via a JSON payload |
| 5 | `/iudx/v1/adapter/register` | POST, PUT, GET, DELETE | CRUD of publishers (adapters) for data ingestion |
| 6 | `/ngsi-ld/v1/subscription` | POST, PUT, PATCH, GET, DELETE | CRUD of subscribers (consumers) for data consumption |

*Table 1: Resource Server APIs*

## Solution Architecture

The Resource Server is built using a **service-mesh architecture**, which allows specific high-load containers/services to scale with ease.

![IUDX Resource Server solution architecture — API gateway, core service-mesh services, and the database and data-broker stores](/img/technical/arch-resource-server.svg)
*Figure 3: Resource Server Solution Architecture*

### API Server

An API Server is an HTTPS web server that serves as an **API gateway** for actors (consumers and providers) to interact with the Resource Server's services; its APIs follow the **NGSI-LD** specification where applicable. The API Server performs query and input validation to ensure conformance with the API specification before executing the requested service (database read/write, data-broker subscription registration, etc.), and is responsible for calling the Authorization Server (via the authentication service) to authenticate and authorize access to restricted resources.

### Database Search Service

Called by the API Server to serve consumer data requests per the NGSI-LD specification. Supported searches include:

- **Attribute search** — by key-value pairs (text or numeric), e.g. name, licence-plate-number.
- **Geo-spatial search** — by circle, bounding box, polygon, or line string.
- **Text search** — free-text search.
- **Complex search** — a combination of attribute, geo-spatial, and text searches.

Responses can additionally be filtered on attributes to make the data more manageable.

### Data Broker Service

Used by the API Server to interact with the data broker to create, update, and delete exchanges, queues, and subscriptions. Ancillary services include: **create/delete exchange** (into which adaptors, sensor-gateways, or sensors publish data), **create/delete queue** (to which published data is queued for subscription), and **create/update/delete subscription** (binding a sender exchange to a receiver queue by topic or ID).

### Authentication Service

Interacts with the IUDX Authorization Server to **validate tokens** provided by a consumer of a protected resource (token introspection).

### Database Connector Service

Routes between the data broker (to which streaming data may be published) and the database (where the data will be stored).

## Multi-tenancy

The Resource Server is a **multi-tenant** system whose tenants are **data providers**. All Resource and ResourceGroup (dataset) IDs encode information about the provider of the data. This segregates resource data by provider for ease of access and management, and makes conditional access control to protected resources possible via the Authorization Server.

See the [Data Plane](./data-plane.md) page for the consumer-facing view of data access.
