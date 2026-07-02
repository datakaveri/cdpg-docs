---
sidebar_position: 5
title: User Service
description: Accounts, organisations, membership, delegations, and app credentials — the platform's IAM core.
---

# User Service

The **IAM core** of the Data Exchange — it knows *who is who*: user profiles, organisations, and the machine identities that act on the platform.

## Responsibilities

- **User profiles** — account details and role assignments, kept in sync with the [Identity Provider](./identity-provider.md).
- **Organisations & membership** — organisation structures, adding and removing members, and organisation administration. Every membership change is published as an event so the [Authorization Service](./authorization-service.md) graph always reflects current membership — this is what makes organisation-wide grants take effect (and cease) automatically.
- **App credentials** — issues and verifies machine credentials (app ID + secret) for applications, including their permitted scopes and expiry. The [API Gateway](./api-gateway.md) verifies these on every machine-to-machine call.
- **Delegations** — records which applications (or delegates) may act on behalf of which users, and with what limits. The gateway resolves delegations here before narrowing and forwarding the delegator's identity.

## Why it matters to other components

Whenever another component needs an authoritative identity fact — *is this app credential valid? may this app act for this user? who are the members of this organisation?* — it asks the User Service (synchronously via gRPC for hot-path checks, or by consuming its membership events).

## Interactions

| Talks to / heard by | Why |
| --- | --- |
| API Gateway | App-credential verification, delegation resolution |
| Identity Provider | Role and account synchronisation |
| Messaging Backbone | Publishes `org.member.added` / `org.member.removed` events |
| Authorization Service | Consumes membership events into the relationship graph |
