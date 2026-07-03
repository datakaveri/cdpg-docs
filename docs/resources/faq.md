---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
description: Common questions about the Data Exchange — for adopters, developers, and operators.
---

# Frequently Asked Questions

## About the platform

**Is this a data repository? Do you store my data centrally?**
No. The exchange *interconnects* data sources; providers retain custody and full control. In the federated topology, the data plane runs inside the provider's own network and data never leaves it — only identity tokens and policy tuples cross the boundary.

**What does it cost?**
Nothing to license. The platform is open source and released as a Digital Public Good — see [Licensing](../platform/licensing.md).

**How is this different from other data-exchange platforms?**
Low onboarding barriers, native support for streaming/time-series data, fine-grained dynamic authorization instead of certificate schemes, and standards-based interoperability. See the [Market Comparison](../adoption/market-comparison.md).

**Where is it deployed today?**
Across 50+ Indian smart cities, plus agriculture (ADeX), e-governance (IPeG), and national geospatial (GDI) deployments — see [Use Cases](../adoption/use-cases.md) and [Case Studies](../adoption/case-studies.md).

## For consumers and developers

**Can I browse what data exists without an account or grant?**
Yes — catalogue **metadata is public**. The data itself requires an access grant.

**How do I get access to a dataset?**
Request access from the provider (or buy it on the [Marketplace](../components/marketplace.md) if it's monetised). The provider's grant takes effect within moments — no manual sync. See [Flow: Consuming Data](../flows/data-consumption.mdx).

**How quickly does a revocation take effect?**
Within moments. Enforcement is checked on **every** request against the authorization graph, which is updated as soon as the revocation event propagates.

**Why did I get 403 right after being granted access?**
Almost always event-propagation lag or a stalled event pipeline — see [Troubleshooting](../guides/troubleshooting.md#policy-created-but-access-still-denied-403).

**Is there an SDK?**
Every service publishes an OpenAPI spec you can generate typed clients from; a first-party SDK is on the roadmap. See [SDKs & Libraries](../develop/sdks-libraries.md).

**Can my application act on behalf of a user?**
Yes — via **delegation**: the user records what the app may do for them, and the platform narrows the app's effective identity to that intersection. See [Flow: Authentication](../flows/authentication.mdx).

## For providers

**Do I lose control of my data by publishing it?**
No. Publishing puts *metadata* in the catalogue. Every access to the data itself requires a policy you (or your org admin) granted, time-bound and revocable at any time, with a full audit trail.

**What kinds of data can I publish?**
Live APIs (NGSI-LD), geospatial layers (OGC), streaming feeds (subscriptions), and file-based datasets — a single catalogue item can support several access types at once. See [Data Access Models](../platform/data-access-models.md).

**Can I charge for access?**
Yes — package resources as products on the [Marketplace](../components/marketplace.md); a successful purchase creates a normal access policy for the buyer.

## For operators

**What do I need to run it?**
Docker Compose for evaluation and development ([Local Development](../develop/local-development.md)); Kubernetes + ArgoCD for production ([Deployment & GitOps](../operations/deployment-gitops.md)).

**Can I migrate gradually from the legacy platform?**
Yes — that's the design. Both stacks run in parallel on the same data, and capabilities cut over one at a time. See [Migration](../migration/overview.md).

**What should I monitor?**
Health/readiness endpoints, gateway error rates, authorization-check latency, and above all **event-pipeline health** (outbox backlog and dead-letter queues). See [Monitoring & Health](../operations/monitoring.md).
