---
sidebar_position: 4
---

# Policy Service (ACL)

The **system of record for access grants**. Every "user X may access resource Y" statement on the platform is a policy stored here.

## Responsibilities

- **Granting** — a provider (or org admin) creates a policy giving a consumer access to a resource, with an expiry date and constraints (which access types: API, file, subscription).
- **Revoking** — policies are soft-deleted, preserving a full audit history of who had access and when.
- **Listing** — four views: *my grants as a consumer*, *grants I issued as a provider*, *all grants in my organisation* (org admin), *all grants on the platform* (platform admin).
- **Verification** — answers "does an active policy exist for this user and resource?" — used by other platform components at access time.

## Policy model

| Aspect | Meaning |
|---|---|
| **Individual policy** | Grants one named consumer access to one resource |
| **Group policy** | Grants access by criteria — allowed organisations, allowed users, allowed roles |
| **Access types** | What the grant covers: `api`, `file`, `sub` (subscription) — validated against what the resource actually supports |
| **Expiry** | Every grant is time-bound; expired grants stop working automatically |
| **Status** | `ACTIVE` or `DELETED` (revoked) — never physically removed |

## Rules it enforces

1. Only the **resource owner** or an **org admin of the resource's organisation** may grant or revoke access to it.
2. A grant must reference a **real catalogue item**, and may only cover access types that item supports (validated against the Control Plane).
3. **No overlapping grants** — if a consumer already holds an active grant for the same resource and access type, a second one is rejected.
4. Every change is **projected to the Authorization Service** so enforcement always matches the record — atomically, via the messaging backbone.

## Interactions

| Talks to | Why |
|---|---|
| Control Plane | Validate the resource on every grant (owner, organisation, supported access types) |
| Messaging Backbone | Publish grant/revocation events for the Authorization Service |
| Control Plane (events) | Trigger email notifications to consumers |
