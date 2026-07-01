---
sidebar_position: 1
---

# Flow: Consuming Data

The complete journey from discovering a dataset to receiving its data.

```mermaid
sequenceDiagram
    actor C as Consumer
    participant GW as API Gateway
    participant CP as Control Plane
    participant P as Provider
    participant ACL as Policy Service
    participant AZ as Authorization Service
    participant DP as Data Plane

    C->>GW: Browse catalogue
    GW->>CP: search
    CP-->>C: matching datasets

    C->>P: Request access (out of band / access request)
    P->>GW: Grant policy (consumer, dataset, access types, expiry)
    GW->>ACL: create policy
    ACL->>CP: validate dataset (owner, access types)
    ACL->>ACL: store grant + project event
    ACL-->>AZ: (async) relationship added
    ACL-->>C: email: access granted

    C->>GW: Query the dataset (token)
    GW->>DP: forward + identity
    DP->>AZ: may C `api`-access this dataset?
    AZ-->>DP: allowed
    DP-->>C: data
```

## Stages

1. **Discover** — the consumer searches the catalogue. Metadata is public; the data itself is not.
2. **Request & grant** — the provider (or their org admin) issues a policy naming the consumer, the dataset, the permitted access types, and an expiry.
3. **Propagation** — the grant is automatically projected into the Authorization Service. No manual sync, nothing to deploy.
4. **Consume** — every data request is checked in real time. When the policy expires or is revoked, access stops immediately.
