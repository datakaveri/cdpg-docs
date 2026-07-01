---
id: authorization-server
title: Authorization Server
sidebar_label: Authorization Server
description: The IUDX Authorization Server — certificate-based identity, role management, the policy engine, and the token manager.
---

# Authorization Server

The IUDX Authorization service allows data sharing while respecting the access requirements set by the provider of a resource. It ensures that only an authorized entity can obtain access tokens to reach private/protected data.

The main functions of the Authorization service are:

- **Resource access authorization** — grant access to access-controlled resources.
- **Resource access policy management** — manage policies that specify access rules.
- **Authentication and registration services**.

## Authorization Server APIs

APIs fall into three groups:

- **Auth APIs** — used by providers and other users to manage access policies and request tokens. All Auth APIs require a valid IUDX-issued **client certificate**.
- **Admin APIs** — approve provider registration requests and register organizations; require a valid IUDX-issued certificate and can be called by IUDX Admins.
- **Consent APIs** — registration for the various roles (Provider, Consumer, Data Ingester, Onboarder).

| # | API | Method | Description |
| --- | --- | --- | --- |
| 1 | `/auth/v1/token` | POST | Request a token |
| 2 | `/auth/v1/token/introspect` | POST | Introspect a token |
| 3 | `/auth/v1/audit/tokens` | POST | Audit tokens |
| 4 | `/auth/v1/token/revoke` | POST | Revoke a token |
| 5 | `/auth/v1/token/revoke-all` | POST | Revoke all tokens belonging to a certificate |
| 6 | `/auth/v1/provider/access` | POST · GET · DELETE | Create, get, or delete access policies |
| 7 | `/auth/v1/certificate-info` | POST | Get user certificate details |
| 8 | `/auth/v1/admin/provider/registrations` | GET · PUT | Get / update provider registration status |

*Table 3: Authorization Server APIs (summary)*

## Solution Architecture

![IUDX Authorization Server solution architecture — API gateway, certificate manager, role manager, policy engine, and token manager](/img/technical/arch-authorization-server.svg)
*Figure 7: Authorization Server Solution Architecture*

### API Server

A server-side web API implementation of the publicly exposed endpoints, methods, and services. All users interact with the Authorization Server primarily via the API Server.

### Certificate Manager

A **client certificate** is an X.509 certificate used to authenticate users during the SSL handshake. A valid client certificate is needed for all primary APIs (except registration) via a **mutual TLS** process. Certificates are issued and managed by this module, which handles user registration and establishes identity at various levels of security.

- **Provider registration** — a user registers as a Provider by supplying their organization, a Certificate Signing Request (CSR), and personal details. The request is subject to Admin approval; on approval, a signed certificate is emailed and is later used to grant consumer access, audit tokens, and revoke tokens. The Provider must also describe themselves in the Catalogue by creating a Provider Item.
- **Consumer / Onboarder / Data Ingester registration** — Onboarders and Data Ingesters must be associated with an organization. A first-time registrant supplies a CSR and receives a certificate by email; an already-registered user reuses their existing certificate.

### Role Manager

Every user is assigned **at least one role** during registration and can be dynamically assigned additional roles. Roles establish initial permissions and clarify the hierarchy of permissions; finer-grained permissions are handled by the Policy Engine.

| Role | Description |
| --- | --- |
| **Provider** | Owner of datasets on IUDX, with ultimate control; may delegate managerial tasks (catalogue entry, data ingestion). |
| **Consumer** | Uses datasets for product development and analysis; accesses open datasets, requests access to secure datasets, and runs filtering/summarizing queries. |
| **Onboarder** | Delegated by providers to manage catalogue entries that aid discovery and attribute semantics. |
| **Data Ingester** | Delegated by providers to adapt datasets so they comply with catalogue-entry validations and can be served by the Resource Server. |
| **Admin** | Performs top-level checks while registering a new provider; scope limited to a few preliminary tasks (get provider registrations, approve/reject a provider, register an organization). |

### Policy Engine

Providers use the Policy Engine to manage policies that contextually specify the conditions under which a user is allowed or denied access (for example, specific API endpoints on the Resource Server). Providers can:

- **Create access policies** — give Consumers access to call specific APIs, give Onboarders access to onboard resources, and give Data Ingesters access to push data.
- **Get access policies** — retrieve all policies they have set.
- **Delete access policies** — remove policies they have set.

### Token Manager

The Authorization Server issues tokens to users who have established their identity; these tokens are used for further interactions with the Catalogue and Resource Servers.

- **Request a token** — a Consumer requests a token to access protected resources/APIs; Onboarders and Data Ingesters request tokens to add catalogue items or push data on behalf of a provider.
- **Introspect a token (TIP)** — the Resource and Catalogue Servers validate tokens via introspection, which returns the resource IDs and APIs the token was issued for.
- **Audit tokens** — a Provider retrieves details of tokens issued for their resources (status, consumer, resource IDs, APIs).
- **Revoke tokens** — a Provider revokes tokens by hash (obtained from the audit); revoked tokens can no longer be introspected.
- **Revoke all tokens for a consumer** — a Provider revokes all tokens issued to a consumer based on the certificate serial number and fingerprint.

See the [Control Plane](./control-plane.md) for how identity, discovery, and consent fit together, and [Data Access Models](../platform/data-access-models.md) for how access differs by data class.
