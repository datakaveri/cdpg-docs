---
sidebar_position: 3
---

# Control Plane

The **administrative core** of the Data Exchange — it knows what exists on the platform and who is who.

## Responsibilities

- **Catalogue** — the registry of everything shareable on the exchange: datasets (databanks), AI models, and applications. Each catalogue item records its provider, owning organisation, descriptive metadata, and **which access types it supports** (API access, file download, subscription).
- **Accounts & organisations** — user profiles, organisation structures, and organisation administration.
- **App credentials** — issues and verifies machine credentials for applications, including their permitted scopes and expiry.
- **Delegations** — records which applications may act on behalf of which users, and with what limits.
- **Notifications** — sends outbound email to users (grant notifications, acknowledgements) triggered by events from other components.

## Why it matters to other components

Whenever another component needs an authoritative fact — *who owns this dataset? which organisation does it belong to? which access types does it support? is this app credential valid?* — it asks the Control Plane. For example, the Policy Service validates every grant request against the catalogue before accepting it.

## Interactions

| Talks to / heard by | Why |
|---|---|
| Policy Service | Provides item details for grant validation |
| Gateway | Verifies app credentials, resolves delegations |
| Messaging Backbone | Consumes email-notification events from all components |
