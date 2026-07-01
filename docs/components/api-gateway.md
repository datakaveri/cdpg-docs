---
sidebar_position: 1
---

# API Gateway

The **single entry point** for all traffic into the Data Exchange. No client ever talks to an internal component directly.

## Responsibilities

- **Authentication** — validates user tokens (OIDC/JWT from the Identity Provider) and machine credentials (app ID + secret, verified against the Control Plane). Both paths produce the same internal identity.
- **Identity propagation** — after authenticating once at the edge, the gateway forwards requests with **cryptographically signed identity headers**. Internal components trust these headers instead of re-validating credentials, keeping them simple and fast.
- **Routing** — maps public API paths to the right internal component (policy, data, files, community).
- **Delegation handling** — when an application acts *on behalf of* a user, the gateway resolves the delegation with the Control Plane and forwards the delegator's identity with appropriately narrowed permissions.

## What it deliberately does not do

- It does not make authorization decisions about *resources* — that is the Authorization Service's job. The gateway only answers "who is this caller?", never "may they access this dataset?".
- It holds no business data.

## Interactions

| Talks to | Why |
|---|---|
| Identity Provider | Token signature verification (key material) |
| Control Plane | App credential verification, delegation resolution |
| All internal components | Forwards authenticated traffic |
