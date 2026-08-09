---
id: glossary
title: Glossary
description: Canonical CDPG architecture and product terminology.
---

# Glossary

| Term | Definition |
| --- | --- |
| **CDPG** | The Go-based data-exchange platform described by this documentation. |
| **Control Plane** | Services that own identity-domain records, catalogue metadata, policy administration, decisions, commerce, registry, credits, audit, and notifications. |
| **Data Plane** | Services that ingest, store, query, filter, subscribe to, and deliver governed data. |
| **Agentic Plane** | Agent Registry, Agent Runtime, and MCP Gateway capabilities for governed delegated execution. |
| **Identity Provider (IdP)** | Keycloak, which authenticates principals and issues OIDC/OAuth tokens. |
| **Principal** | An authenticated user, application, workload, or agent. |
| **Subject** | The person or application whose authority is being exercised. |
| **Actor** | The agent or intermediary performing an action for a subject. |
| **Organisation** | The primary administrative and isolation boundary for users, resources, policies, queries, and audit visibility. |
| **Delegation** | A revocable, scoped, and time-bounded authority for an actor to act for a subject. |
| **Resource / databank** | A catalogue-registered dataset or other governed asset addressable by policy. |
| **Access mode** | The operation family a grant covers, such as API query, file delivery, or subscription. |
| **PAP** | Policy Administration Point; `dx-acl-go` owns policy authoring and lifecycle records. |
| **PDP** | Policy Decision Point; `dx-authz-go` composes relationship and contextual evaluations. |
| **PEP** | Policy Enforcement Point; the gateway, application service, MCP Gateway, or data executor that applies a decision and its obligations. |
| **ReBAC** | Relationship-Based Access Control: deciding from subject–relation–object relationships. |
| **ABAC** | Attribute-Based Access Control: deciding from trusted principal, resource, action, and environment attributes. |
| **OpenFGA** | The relationship graph and ReBAC evaluation engine. |
| **OPA** | Open Policy Agent; the planned engine for contextual/attribute policy and typed obligations. |
| **Obligation** | A mandatory enforcement instruction attached to an allow decision, such as a row filter, field mask, rate ceiling, purpose limit, or human approval. |
| **Carried decision** | A short-lived, integrity-protected authorization result passed to a data executor so it need not call the PDP synchronously. |
| **OIDC / OAuth 2.0** | Protocols used for user authentication, workload credentials, and delegated token exchange. |
| **JWT / JWKS** | The signed token format and published key set used to validate it. |
| **Workload identity** | A service's own authenticated identity, distinct from any represented subject or actor. |
| **Subject asserter** | An allowlisted workload permitted to forward subject/actor context to another service. |
| **MCP** | Model Context Protocol; the tool-description and invocation boundary governed by the MCP Gateway. |
| **Semantic firewall** | Argument, intent, risk, output, and prompt-injection controls around agent tool execution. |
| **HITL** | Human in the loop; explicit approval required before a risk-classified action proceeds. |
| **Kill switch** | An immediate control that suspends an agent and prevents new sessions/tool actions. |
| **Outbox** | A table written in the same transaction as a domain change and later relayed to the event broker. |
| **DLQ** | Dead-letter queue for messages that exceeded bounded retries and require investigation. |
| **Reconciliation** | Comparing authoritative records with projections and repairing drift. |
| **NGSI-LD** | ETSI context-information APIs used by the resource data plane. |
| **OGC API** | Open Geospatial Consortium interfaces implemented by the geospatial data plane. |
| **GitOps** | Declarative deployment in which versioned manifests are reconciled into a cluster. |

See [Current and Target State](../technical/current-and-target.mdx) for status terms.
