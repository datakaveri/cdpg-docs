---
sidebar_position: 10
title: Marketplace
description: Products, orders, payments, fulfilment, and entitlement creation.
---

# Marketplace

`dx-marketplace-go` owns commercial products, orders, payment attempts, and fulfilment state. Core catalogue linkage, Razorpay integration, and orders are **Partially implemented**.

Providers package authorised catalogue resources as products. Consumers create orders and complete payment with the external payment provider. Webhook signatures, event identity, amount, currency, order reference, and state transition are verified before the order changes. Duplicate callbacks are idempotent.

Payment does not itself grant data access. Confirmed payment initiates fulfilment through the Policy Service, which creates the authoritative entitlement and publishes its enforcement projections. An order becomes fulfilled only when policy creation succeeds; otherwise it remains retryable and visible to operators. Refund, expiry, cancellation, and revocation must update both commercial state and access policy without losing audit history.

Metrics and audit events cover product changes, order transitions, webhook validation, payment failures, fulfilment lag, and entitlement identifiers. Sensitive payment material is never stored in application logs.

See [Marketplace Purchase and Entitlement](../flows/marketplace-entitlement.md) and [Policy Service](./policy-service.md).
