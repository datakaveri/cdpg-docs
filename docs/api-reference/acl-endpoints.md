---
title: ACL Endpoints
description: The Policy Service (ACL) REST API — creating, listing, revoking, and verifying access policies.
---

# ACL Endpoints

The [Policy Service](../components/policy-service.md) provides a RESTful API for managing access policies.

## Base URL

```
https://<gateway>/iudx/acl/apd/v2
```

## Authentication

All endpoints require a valid JWT in the `Authorization: Bearer <token>` header (or app credentials via Basic auth). See the [Authentication Flow](./auth-flow.md).

## Endpoints

### Create Policy

**POST** `/policy`

Creates one or more policy grants. Caller must be the item's owner or an org admin of its organisation.

```bash
curl -X POST https://<gateway>/iudx/acl/apd/v2/policy \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "request": [
      {
        "policyType": "INDIVIDUAL",
        "userId": "00000000-0000-0000-0000-000000000002",
        "itemId": "urn:datakaveri:resource:abc123",
        "itemType": "DATABANK",
        "expiryTime": "2027-12-31T23:59:59Z",
        "constraints": {
          "access": [
            {"accessType": "api"}
          ]
        }
      }
    ]
  }'
```

Response — `201 Created`:

```json
{
  "type": "urn:dx:acl:Success",
  "title": "Policy created",
  "detail": "Successfully created 1 policy",
  "results": [
    { "policyId": "550e8400-e29b-41d4-a716-446655440000" }
  ]
}
```

Error cases:

- **409 Conflict** — an active policy already exists for this user/item/accessType combination
- **403 Forbidden** — caller is not the item owner or org admin
- **400 Bad Request** — invalid request format or missing required fields

---

### Delete Policy

**DELETE** `/policy?id=<policyId>`

Revokes (soft-deletes) a policy. Caller must be the policy's issuer, the item owner, or an org admin of the item's organisation.

```bash
curl -X DELETE "https://<gateway>/iudx/acl/apd/v2/policy?id=550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer <token>"
```

Response — `200 OK`:

```json
{
  "type": "urn:dx:acl:Success",
  "title": "Policy deleted",
  "detail": "Successfully deleted 1 policy"
}
```

The policy's status becomes `DELETED` (it remains queryable for audit) and the corresponding enforcement relationships are removed within moments.

---

### List Consumer Policies

**GET** `/policy/consumer?status=ACTIVE&limit=50&offset=0`

Returns policies usable by the authenticated user.

```bash
curl "https://<gateway>/iudx/acl/apd/v2/policy/consumer?status=ACTIVE" \
  -H "Authorization: Bearer <token>"
```

Response — `200 OK`:

```json
{
  "type": "urn:dx:acl:Success",
  "title": "Success",
  "results": [
    {
      "policyId": "550e8400-e29b-41d4-a716-446655440000",
      "itemId": "urn:datakaveri:resource:abc123",
      "itemType": "DATABANK",
      "ownerId": "00000000-0000-0000-0000-000000000001",
      "status": "ACTIVE",
      "constraints": {"access": [{"accessType": "api"}]},
      "expiryAt": "2027-12-31T23:59:59Z"
    }
  ],
  "paginationInfo": {"offset": 0, "limit": 50, "totalHits": 1}
}
```

---

### List Provider Policies

**GET** `/policy/provider?status=ACTIVE&limit=50&offset=0`

Returns policies **issued by** the authenticated user (as provider). Same response shape as the consumer listing, with each row additionally naming the `consumerId` the grant was issued to.

---

### List Organisation Policies

**GET** `/policy/organisation?limit=50&offset=0`

Returns policies on items owned by the caller's organisation. Requires the `org_admin` role; callers without it receive `403 Forbidden`.

---

### List Platform Policies

**GET** `/policy/platform?limit=50&offset=0`

Returns all policies on the platform. Requires the `cos_admin` role.

---

### Verify Policy

**POST** `/verify`

Checks whether an active policy grant exists for a user/item pair. Used by platform components at access time; also callable for diagnostics.

```bash
curl -X POST https://<gateway>/iudx/acl/apd/v2/verify \
  -H "Content-Type: application/json" \
  -d '{
    "user": {"id": "00000000-0000-0000-0000-000000000002"},
    "item": {"itemId": "urn:datakaveri:resource:abc123"}
  }'
```

Response — success:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "constraints": {"access": [{"accessType": "api"}]},
  "expiryAt": "2027-12-31T23:59:59Z"
}
```

Response — no access:

```json
{
  "type": "urn:dx:acl:Forbidden",
  "title": "No policy found",
  "detail": "No ACTIVE policy exists for this user/item"
}
```

---

## Common patterns

### Constraint examples

Single access type:

```json
{ "access": [ {"accessType": "api"} ] }
```

Multiple access types:

```json
{ "access": [ {"accessType": "api"}, {"accessType": "file"}, {"accessType": "sub"} ] }
```

GROUP policy with organisation access:

```json
{
  "access": [ {"accessType": "api"} ],
  "subjects": { "allowedOrgIds": ["00000000-0000-0000-0000-000000000010"] }
}
```

### Pagination

All list endpoints support `limit` (1–1000, default 50) and `offset` (default 0). Responses include `paginationInfo.totalHits` for building pagination UI.

### Rate limiting

Requests are rate-limited **at the gateway**, per authenticated subject. Exceeding the limit returns `429` with `type: urn:dx:acl:TooManyRequests` — honour any `Retry-After` header and back off exponentially. Limits are deployment-specific; contact your platform operator for the configured values.

---

## See also

- [Error Responses](./error-responses.md) — error codes and meanings
- [Auth Flow](./auth-flow.md) — how authentication works
- [Debugging Policy Creation](../guides/debugging-policy-creation.md) — common issues
