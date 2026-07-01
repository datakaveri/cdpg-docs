---
id: control-plane
title: Control Plane — Data Discovery
sidebar_label: Control Plane
description: The IUDX Control Plane — the central API layer for securely managing, discovering, and accessing data across the ecosystem.
---

# Control Plane: The API Interface for Data Discovery

The **Control Plane** is the central API layer that securely manages, discovers, and governs access to data across the ecosystem. It is the home of IUDX's Central Directory Services.

![IUDX Control Plane — core services architecture (Data Discovery, Identity, Auditing, AAA), interfaces, control-plane components, and the consent-validator flow](/img/technical/control-plane.png)
*Figure: Control Plane — the API interface for data discovery*

## Core Services Architecture

The Control Plane is organized around four cooperating services:

- **Data Discovery Service** — lets consumers discover data, and publish and search data and metadata.
- **Identity Service** — handles user registration, authentication, and profile management; authenticates users and manages identities.
- **AAA Service** — authorizes access and enforces policies and account usage.
- **Auditing Service** — monitors and audits all access events and actions.

## Interfaces (APIs)

| Interface | Purpose |
| --- | --- |
| **Data Discovery (D)** | Publish and search data and metadata |
| **Identity (I)** | User registration, authentication, and profile management |
| **Authorization (A)** | Token management, consent, policies, and access control |
| **Monitoring (M)** | Audit logs, monitoring events, and usage |

## Control Plane Components

- **AAA Server** — security, authentication, and authorization; audit logs. *(Interfaces: I, A, M)*
- **Catalogue Server** — resource metadata in **JSON-LD**; powers data discovery. *(Interface: D)*
- **Data Explorer** — a UI to discover and explore data resources and their metadata. *(User interface)*
- **Consent Validator** — consent management for PII, including revocation and access control. *(Interface: C)*

## Consent Validator Flow

For personal data, the consent validator coordinates a clear sequence: the **Data Principal** gives consent, a **consent artefact** is created, the **consent validator** verifies it, and the **data provider** stores the consent. It validates the availability of PII data with the data provider before storing consent, supporting two integration styles:

- **APIs** for create, update, delete, and view of consent records.
- **Custom integration** with each data provider (for example, using a Jan Aadhar member id, or a PDS/ration number for Rythu Bharosa-style schemes).

## Ecosystem Participants

- **Data Providers** — publish data and metadata, and set policies and access via consent.
- **Application Developers / Data Consumers** — discover, request, and use data securely via APIs.
- **Data Principals (Citizens)** — provide consent for the use of their personal data.

For the data-access side of the platform, see the [Data Plane](./data-plane.md).
