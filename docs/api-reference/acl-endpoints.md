# ACL Endpoints

The Access Control List (ACL) service provides a RESTful API for managing policy grants in CDPG.

## Base URL

```
https://api.example.com/iudx/acl/apd/v2
```

## Authentication

All endpoints require a valid JWT token in the `Authorization: Bearer <token>` header, or Basic auth for appID/secret.

## Endpoints

### Create Policy

**POST** `/policy`

Creates one or more policy grants.

#### Request

```bash
curl -X POST https://api.example.com/iudx/acl/apd/v2/policy \
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

#### Response

```json
{
  "type": "urn:dx:acl:Success",
  "title": "Policy created",
  "detail": "Successfully created 1 policy",
  "results": [
    {
      "policyId": "550e8400-e29b-41d4-a716-446655440000"
    }
  ]
}
```

#### Error Cases

- **409 Conflict** — Policy already exists for this user/item/accessType combo
- **403 Forbidden** — Caller is not the item owner or org_admin
- **400 Bad Request** — Invalid request format or missing required fields

---

### Delete Policy

**DELETE** `/policy?id=<policyId>`

Revokes (soft-deletes) a policy.

#### [HAND-CURATE] Add example request/response

---

### List Consumer Policies

**GET** `/policy/consumer?status=ACTIVE&limit=50&offset=0`

Returns policies usable by the authenticated user.

#### [HAND-CURATE] Add example request/response

---

### List Provider Policies

**GET** `/policy/provider?status=ACTIVE&limit=50&offset=0`

Returns policies issued by the authenticated user.

#### [HAND-CURATE] Add example request/response

---

### List Organisation Policies

**GET** `/policy/organisation?limit=50&offset=0`

Returns policies on items owned by the caller's organisation (org_admin only).

#### [HAND-CURATE] Add example request/response

---

### List Platform Policies

**GET** `/policy/platform?limit=50&offset=0`

Returns all policies (cos_admin only).

#### [HAND-CURATE] Add example request/response

---

### Verify Policy

**POST** `/verify`

Checks whether a policy grant exists and is active.

#### Request

```bash
curl -X POST https://api.example.com/iudx/acl/apd/v2/verify \
  -H "Content-Type: application/json" \
  -d '{
    "user": {"id": "00000000-0000-0000-0000-000000000002"},
    "item": {"itemId": "urn:datakaveri:resource:abc123"}
  }'
```

#### Response (Success)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "constraints": {"access": [{"accessType": "api"}]},
  "expiryAt": "2027-12-31T23:59:59Z"
}
```

#### Response (No Access)

```json
{
  "type": "urn:dx:acl:Forbidden",
  "title": "No policy found",
  "detail": "No ACTIVE policy exists for this user/item"
}
```

---

## Common Patterns

### Constraint Examples

#### Single Access Type
```json
{
  "access": [
    {"accessType": "api"}
  ]
}
```

#### Multiple Access Types
```json
{
  "access": [
    {"accessType": "api"},
    {"accessType": "file"},
    {"accessType": "sub"}
  ]
}
```

#### GROUP Policy with Org Access
```json
{
  "access": [
    {"accessType": "api"}
  ],
  "subjects": {
    "allowedOrgIds": ["00000000-0000-0000-0000-000000000010"]
  }
}
```

---

## Rate Limiting

[HAND-CURATE: Document rate limits, quotas, and backoff strategies]

---

## Pagination

All list endpoints support:
- `limit` (1-1000, default 50)
- `offset` (default 0)

Response includes `totalHits` for building pagination UI.

---

## See Also

- [Error Responses](./error-responses) — Error codes and meanings
- [Auth Flow](./auth-flow) — How authentication works
- [Troubleshooting](../guides/debugging-policy-creation) — Common issues
