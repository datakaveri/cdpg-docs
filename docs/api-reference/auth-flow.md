---
title: Authentication and Authorization Contract
description: External token, workload identity, subject context, and decision-response contracts.
---

# Authentication and Authorization Contract

## External request

Clients send an OIDC access token to the gateway:

```http
Authorization: Bearer <access-token>
X-Request-ID: <optional-client-correlation-id>
```

The gateway validates signature, issuer, audience, expiry, issue time, subject, and the claims required by the route. Invalid or absent credentials return `401`. Authentication alone never grants access.

## Internal request

The immediate caller presents a short-lived Keycloak client-credentials token whose audience names the destination service. The destination validates the token and checks the caller's client ID against its operation allowlist. When a user or agent is represented, the subject/actor context is carried separately and is accepted only from an authorised subject asserter.

The final serialized subject-context and request-binding fields are not yet fixed. Implementations must preserve these semantics: immutable subject, optional actor and delegation identifier, organisation, authentication time, original request/trace IDs, destination audience, short expiry, and integrity binding to the workload call.

## Authorization decision

```json
{
  "principal": {
    "subject": "user:<id>",
    "actor": "agent:<id>",
    "organisation": "org:<id>"
  },
  "action": "dataset.query",
  "resource": {"type": "dataset", "id": "dataset:<id>"},
  "context": {"purpose": "research", "request_id": "<id>"},
  "profile": "data-query"
}
```

The composite PDP response is versioned and includes `allow`, stable reason codes, decision ID, expiry, relationship/policy versions, cache instructions, and typed obligations. A deny or error response contains no usable obligations. PEPs deny if the decision is expired, bound to different inputs, or contains an obligation they cannot enforce.

OpenFGA relationship evaluation is **Implemented**. OPA contextual evaluation and the complete typed response contract are **Planned** and require an approved interface specification before clients depend on the example shape.

See [Security Architecture](../technical/security-architecture.mdx) and [Error Responses](./error-responses.md).
