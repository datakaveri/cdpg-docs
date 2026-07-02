---
id: glossary
title: Glossary
sidebar_label: Glossary
description: Definitions of the terms and acronyms used throughout the Data Exchange documentation.
---

# Glossary

## Roles & actors

| Term | Definition |
| --- | --- |
| **Data Provider** | A legal entity responsible for providing data resources, their metadata, and authorization to use them. |
| **Data Consumer** | A legal entity that consumes a resource, bound to the provider's terms of use. |
| **Org Admin** | A user who manages access on behalf of all providers in their organisation (`org_admin` role). |
| **Platform Admin / COS Admin** | The operator of the exchange itself (`cos_admin` role). |
| **Delegate** | An entity (user or application) authorised to act on behalf of a provider or consumer within a recorded, scoped delegation. |
| **Data Principal** | A legal entity whose Personally Identifiable Information is associated with a data resource. |
| **Organisation** | A group of users and resources under common administration; membership travels in tokens and the authorization graph. |

## Resources & data

| Term | Definition |
| --- | --- |
| **Resource** | Anything shareable on the exchange, uniquely identified and registered in the catalogue. |
| **Databank** | A dataset resource (`DATABANK` item type) — API-queryable data, downloadable files, or both. |
| **AI Model / App** | The other catalogue item types (`AIMODEL`, `APPS`). |
| **Catalogue** | The registry of metadata about all resources available on the exchange, in JSON-LD. |
| **Metadata** | Standardized, machine-interpretable information describing a resource's data. |
| **Access type** | What a grant covers: `api` (query), `file` (download), `sub` (subscribe). |

## Access control

| Term | Definition |
| --- | --- |
| **Policy** | An explicit, time-bound, revocable record granting a consumer (or group) specified access types on a resource. |
| **PAP** (Policy Administration Point) | The [Policy Service](../components/policy-service.md) — where policies are created, listed, and revoked. |
| **PDP** (Policy Decision Point) | The [Authorization Service](../components/authorization-service.md) — answers allow/deny questions in real time. |
| **PEP** (Policy Enforcement Point) | The [API Gateway](../components/api-gateway.md) and data-side services — where decisions are enforced. |
| **ReBAC** | Relationship-Based Access Control — authorization evaluated over a graph of subject–relation–object tuples. |
| **OpenFGA** | The open-source Zanzibar-style engine storing and evaluating the relationship graph. |
| **Tuple** | One relationship fact in the graph, e.g. *(user U, `api`, databank D)*. |
| **Access request** | A consumer's formal request for access, which a provider can approve into a policy. |

## Identity & security

| Term | Definition |
| --- | --- |
| **OIDC** (OpenID Connect) | The authentication protocol; the platform's identity provider is Keycloak. |
| **PKCE** | Proof Key for Code Exchange — protects the OIDC code flow for browser/mobile apps. |
| **JWT** | The signed token carrying a caller's identity, roles, and organisation. |
| **JWKS** | The identity provider's published signing keys, used to validate JWTs. |
| **Identity headers** (`X-Subject-*`) | The HMAC-signed headers the gateway forwards in place of credentials. |
| **App credentials** | Machine identity (app ID + secret) for M2M callers. |
| **Delegation** | A recorded, scoped authorisation for an app to act on behalf of a user. |
| **Presigned URL** | A short-lived, self-authorising link for direct object-storage upload/download. |

## Architecture & operations

| Term | Definition |
| --- | --- |
| **Control Plane** | The services that decide who may access what — catalogue, user, policy, authorization. |
| **Data Plane** | The services that serve content — NGSI-LD queries, OGC, subscriptions, files. |
| **Messaging backbone** | RabbitMQ — the event bus connecting components asynchronously. |
| **Transactional outbox** | Pattern that writes an event in the same DB transaction as the change, guaranteeing it is eventually published. |
| **DLQ** (Dead-Letter Queue) | Where messages land after repeated processing failures — monitored, never silently dropped. |
| **GitOps** | Declarative deployment: Git describes the environments; ArgoCD reconciles clusters to match. |
| **Federated topology** | A data plane running inside a provider's network, connected to the central control plane. |

## Standards

| Term | Definition |
| --- | --- |
| **NGSI-LD** | ETSI standard for context-information APIs — the platform's data-query interface. |
| **OGC API Features** | Open Geospatial Consortium standard for serving geospatial features. |
| **JSON-LD** | Linked-data JSON — the catalogue's metadata format. |
| **IS 18003** | The Bureau of Indian Standards adoption of the platform's interface specifications. |
| **PII** | Personally Identifiable Information. |
