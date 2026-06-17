# Error Responses

All services return the standard `DxErrorResponse` envelope:

```json
{
  "type": "urn:dx:acl:Forbidden",
  "title": "Forbidden",
  "detail": "Access Denied: Not owner or org_admin of same organisation"
}
```

## Error types

| HTTP | URN suffix | Meaning |
|---|---|---|
| 400 | `Validation` | Malformed input (bad UUID, missing field, invalid enum) |
| 401 | `Unauthorized` | Missing/invalid/expired token |
| 403 | `Forbidden` | Authenticated but not allowed (ownership, role, APD scope) |
| 404 | `NotFound` | Resource/policy does not exist |
| 409 | `Conflict` | Duplicate (e.g. overlapping ACTIVE policy for same accessType) |
| 410 | `Expired` | Resource (e.g. policy) has expired |
| 429 | `TooManyRequests` | Rate limit exceeded |
| 500 | `InternalError` | Unexpected server error — check service logs |
| 502 | `BadGateway` | Upstream dependency failed (gRPC/DB/MQ) |

## Handling guidance

- **4xx** — fix the request; the `detail` field states exactly what failed.
- **409 on policy create** — list existing policies first; see
  [Debugging Policy Creation](../guides/debugging-policy-creation).
- **5xx** — retry with backoff; if persistent, check `/healthz/ready` of the
  service and its dependencies.
