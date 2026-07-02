---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
description: A developer's first steps with the Data Exchange — concepts, authentication, and the path from discovery to data access.
---

# Getting Started

This guide orients developers building **against** the Data Exchange (consuming or providing data). If you want to run the platform itself, see [Local Development](./local-development.md).

:::note
All examples target the API Gateway of your deployment (`https://<gateway>` below; `http://localhost:8000` on a local stack). Every request goes through the gateway — services are not reachable directly.
:::

## Core concepts in one minute

| Concept | What it means |
| --- | --- |
| **Resource** | A dataset (`DATABANK`), AI model, or app published to the catalogue |
| **Catalogue** | The JSON-LD metadata index used for discovery |
| **Provider** | Publishes resources and grants access |
| **Consumer** | Discovers resources and uses granted access |
| **Policy** | An explicit, time-bound grant: consumer + resource + access types + expiry |
| **Access types** | `api` (query), `file` (download), `sub` (subscribe) |

Full detail: [Core Concepts](../concepts/core-concepts.md).

## The typical flow

1. **Authenticate** — log in via the platform's identity provider (OIDC) and obtain a JWT; machine clients use app credentials.
2. **Discover** — search the catalogue to find resources (no grant needed — metadata is public).
3. **Obtain access** — request access from the provider (or purchase via the marketplace); the resulting policy takes effect within moments.
4. **Access data** — query APIs, download files, or subscribe, per the access types you hold.

## 1. Authenticate

Obtain a token from the deployment's Keycloak (shown here with the password grant used by test clients; production apps use the Authorization Code + PKCE flow):

```bash
TOKEN=$(curl -sS -X POST 'https://<keycloak>/realms/<realm>/protocol/openid-connect/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=password&client_id=<client>&username=<user>&password=<pass>' \
  | jq -r '.access_token')
```

Send it on every request: `Authorization: Bearer $TOKEN`.

## 2. Discover resources

```bash
curl "https://<gateway>/iudx/v2/cat/search?property=[tags]&value=[[transport]]" \
  -H "Authorization: Bearer $TOKEN"
```

The catalogue returns JSON-LD records describing matching resources, including which **access types** each supports.

## 3. Check / obtain access

If you are a provider granting a consumer access (or approving an access request):

```bash
curl -X POST "https://<gateway>/iudx/acl/apd/v2/policy" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"request":[{"policyType":"INDIVIDUAL","userId":"<consumer-uuid>",
       "itemId":"<resource-id>","itemType":"DATABANK",
       "expiryTime":"2027-12-31T23:59:59Z",
       "constraints":{"access":[{"accessType":"api"}]}}]}'
```

See the [ACL API Reference](../api-reference/acl-endpoints.md) for the full endpoint set.

## 4. Access data

```bash
# Latest data (NGSI-LD)
curl "https://<gateway>/ngsi-ld/v1/entities?id=<resource-id>" \
  -H "Authorization: Bearer $TOKEN"

# Temporal query
curl "https://<gateway>/ngsi-ld/v1/temporal/entities?id=<resource-id>&timerel=between&time=2026-01-01T00:00:00Z&endTime=2026-02-01T00:00:00Z" \
  -H "Authorization: Bearer $TOKEN"

# File download (returns short-lived presigned URLs)
curl -X POST "https://<gateway>/files/v1/databanks/<id>/files/download" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"keys":["<file-key>"],"expiresIn":300}'
```

## Reading responses

Every service returns the same envelope — payload in `results`, errors as `type`/`title`/`detail`. Read [API Standards](./api-standards.md) once and every API on the platform behaves predictably.

## Next steps

- [Platform Endpoints](./endpoints.md) — the full gateway route map.
- [API Standards](./api-standards.md) — envelope, errors, pagination.
- [Data Ingestion](./data-ingestion.md) — publish data into the platform.
- [Local Development](./local-development.md) — run the entire platform on your machine.
