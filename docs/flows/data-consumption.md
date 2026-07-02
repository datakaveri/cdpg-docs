---
sidebar_position: 2
title: "Flow: Consuming Data"
description: The complete journey from discovering a dataset to receiving its data.
---

# Flow: Consuming Data

The complete journey from discovering a dataset to receiving its data.

```mermaid
sequenceDiagram
    actor C as Consumer
    participant GW as API Gateway
    participant CAT as Catalogue
    participant P as Provider
    participant ACL as Policy Service
    participant AZ as Authorization Service
    participant DP as Data Plane

    C->>GW: Browse catalogue
    GW->>CAT: search
    CAT-->>C: matching datasets

    C->>P: Request access (access request / out of band)
    P->>GW: Grant policy (consumer, dataset, access types, expiry)
    GW->>ACL: create policy
    ACL->>CAT: validate dataset (owner, access types)
    ACL->>ACL: store grant + outbox event
    ACL-->>AZ: (async) relationship added
    ACL-->>C: email: access granted

    C->>GW: Query the dataset (token)
    GW->>DP: forward + signed identity
    DP->>AZ: may C `api`-access this dataset?
    AZ-->>DP: allowed
    DP-->>C: data
```

## Stages

1. **Discover** — the consumer searches the [Catalogue](../components/catalogue.md). Metadata is public; the data itself is not.
2. **Request & grant** — the provider (or their org admin) issues a policy naming the consumer, the dataset, the permitted access types, and an expiry. Consumers can raise a formal access request, or a purchase on the [Marketplace](../components/marketplace.md) can create the policy automatically.
3. **Propagation** — the grant is automatically projected into the [Authorization Service](../components/authorization-service.md). No manual sync, nothing to deploy.
4. **Consume** — every data request is checked in real time. When the policy expires or is revoked, access stops immediately.
