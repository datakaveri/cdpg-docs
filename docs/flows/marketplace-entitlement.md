---
sidebar_position: 6
title: "Flow: Marketplace Purchase and Entitlement"
description: Product authoring, order/payment state, callback verification, grant creation, projection, and recovery.
---

# Flow: Marketplace Purchase and Entitlement

## Purpose and status

Marketplace converts a verified payment into the same auditable access grant used by direct provider approval. Product, merchant, order, payment, invoice, provider adapter, and grant-creation paths exist; end-to-end authorization target and full failure/reconciliation evidence are **Partially implemented**.

## Actors and components

Provider; consumer; Gateway; Marketplace; Catalogue; Authorization Service; payment provider; Policy Service; RabbitMQ; OpenFGA/OPA target; Credits where configured; Audit/Notification services.

## Preconditions

- Provider owns or administers the catalogue resource and has an active payment account.
- Product binds an immutable resource/access-constraint/version and valid price.
- Consumer is authenticated and eligible under organization/policy rules.

## Main workflow

1. Provider creates a product. Marketplace authorizes resource ownership and verifies catalogue existence/access modes.
2. Consumer browses products and creates an order with an idempotency key. Marketplace stores local pending order state before requesting the provider order.
3. Consumer completes payment using the payment provider.
4. Provider sends a callback to the dedicated endpoint. Marketplace verifies the provider signature, timestamp/replay rules, provider name, amount, currency, and order/product binding.
5. In one idempotent transaction Marketplace records payment and invoice state; duplicate callbacks return the original result.
6. Marketplace calls the Policy Service using its own workload identity and provider/entitlement context. ACL validates the product resource and creates a normalized grant.
7. Policy outbox publishes; Authorization projections update relationships/context. The consumer is entitled only after activation succeeds.
8. Marketplace exposes purchase/invoice status and emits audit/notification facts with payment references but no sensitive credentials.

## Authorization and ownership

Product authoring requires an ownership/organization relationship. Consumer order access is consumer-scoped. The payment callback authenticates as the payment provider, not as a user. Marketplace owns commerce state but does not write OpenFGA or data stores directly; ACL owns the grant and Authz owns the decision.

## Failure and recovery

- Invalid callbacks fail before mutation.
- Duplicate order/callback/grant requests return the recorded result.
- Payment captured but grant activation failed remains a visible `entitlement_pending` state; reconciliation retries ACL idempotently and alerts after an SLO.
- Grant revoked or expired removes data access without changing immutable purchase/accounting history.
- Refund/chargeback-to-grant behavior is an open product decision and must not be inferred.

## Audit and observability

Correlate order, payment, invoice, product, resource, provider, consumer organization, ACL grant, policy event, decision, and request/trace IDs. Monitor signature failures, duplicate callbacks, provider latency, captured-without-entitlement age, grant projection lag, and refund/chargeback mismatches.

