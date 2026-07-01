---
sidebar_position: 2
---

# Identity Provider

**Keycloak** provides all identity for the Data Exchange — the platform itself never stores passwords.

## Responsibilities

- **User identity** — registration, login (OIDC with PKCE), and token issuance for the web portals and APIs.
- **Roles** — every user carries platform roles in their token: `consumer`, `provider`, `org_admin` (manages access for an organisation), `cos_admin` (operates the platform).
- **Organisation membership** — tokens carry the user's organisation, which downstream components use for organisation-scoped decisions (e.g. an org admin may only manage resources belonging to their own organisation).
- **Service identity** — internal components authenticate to each other using service accounts (client-credentials tokens), so machine-to-machine calls are just as accountable as user calls.

## How the rest of the platform uses it

Components never call the Identity Provider on the request path. They validate tokens locally using published signing keys, which keeps authentication fast and keeps Keycloak out of the hot path.

## Roles at a glance

| Role | Powers |
|---|---|
| `consumer` | Discover resources, request and use granted access |
| `provider` | Publish resources, grant/revoke access to own resources |
| `org_admin` | Everything a provider can do, for **all** resources of their organisation |
| `cos_admin` | Platform-wide visibility and administration |
