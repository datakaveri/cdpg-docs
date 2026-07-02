---
sidebar_position: 10
title: Marketplace
description: Monetisable datasets — products, orders, and integrated payments on top of the policy fabric.
---

# Marketplace

The **commercial surface** of the exchange — where providers offer datasets as purchasable products and consumers buy access.

## Capabilities

- **Products** — a provider packages one or more of their catalogue resources as a product with pricing and terms. Product authoring is restricted to the resource owner (enforced through the authorization graph).
- **Orders & payments** — consumers place orders and pay through an integrated payment gateway (Razorpay). Payment confirmations arrive on a dedicated webhook whose signature is cryptographically verified before any order state changes.
- **Fulfilment** — a successful purchase results in the same thing every other access path produces: an **access policy** for the buyer. Purchased access is therefore enforced, listed, audited, and revoked exactly like any granted access.

## Why it works this way

Monetisation is deliberately a layer **on top of** the policy fabric, not beside it. The marketplace never grants access itself — it creates policies through the [Policy Service](./policy-service.md), so there is a single enforcement path and a single audit trail regardless of whether access was granted or sold.

## Interactions

| Talks to | Why |
| --- | --- |
| Policy Service | Creates the buyer's access policy on successful payment |
| Catalogue | Validates the resources behind a product |
| Payment gateway (Razorpay) | Checkout and signed payment webhooks |
| Messaging Backbone | Audit events, purchase notifications |
