# Debugging Policy Creation

This guide walks through common issues when creating policies and how to troubleshoot them.

## Issue: 409 Conflict — Policy Already Exists

**Symptom:** POST `/policy` returns:
```json
{
  "type": "urn:dx:acl:Conflict",
  "title": "Conflict",
  "detail": "Active policy already exists for accessType(s): api"
}
```

**Root Cause:** A policy for the same item+consumer combo with overlapping access types already exists and is ACTIVE.

**Debugging Steps:**

1. Check existing policies for the user/item combo:
   ```bash
   curl "https://api/v1/policy/consumer?itemId=<itemId>" \
     -H "Authorization: Bearer <token>"
   ```

2. Look for rows where:
   - `consumerId` matches the target user
   - `itemId` matches
   - `status` = `ACTIVE`
   - `expiryAt` is in the future

3. If the old policy should be removed:
   ```bash
   curl -X DELETE "https://api/v1/policy?id=<oldPolicyId>" \
     -H "Authorization: Bearer <token>"
   ```

**Prevention:** Query existing policies before creating new ones.

---

## Issue: 403 Forbidden — Not Owner or Org Admin

**Symptom:** POST `/policy` returns:
```json
{
  "type": "urn:dx:acl:Forbidden",
  "title": "Forbidden",
  "detail": "Access Denied: Not owner or org_admin of same organisation"
}
```

**Root Cause:** The caller doesn't have permission to grant access to this item.

**Debugging Steps:**

1. Verify the caller's token:
   ```bash
   # Decode JWT (use jwt.io or similar)
   # Check: "sub" (user ID), "organisation_id", "roles"
   ```

2. Verify the item's owner:
   ```bash
   # Query the catalogue
   curl "https://api/v1/cat/item/<itemId>" \
     -H "Authorization: Bearer <token>" | jq .ownerUserId
   ```

3. Check if caller is org_admin:
   ```bash
   # Decode JWT: Look for "org_admin" in "roles" array
   ```

**Fixes:**
- If the item owner should be changed: Contact the resource owner
- If the user should be org_admin: Check with the organisation administrator

---

## Issue: 400 Bad Request — Invalid Input

**Symptom:** POST `/policy` returns:
```json
{
  "type": "urn:dx:acl:Validation",
  "title": "Bad Request",
  "detail": "itemId must be a UUID"
}
```

**Common Causes:**

| Error | Check |
|-------|-------|
| itemId is not UUID | Use valid UUID format (e.g., `550e8400-e29b-41d4-a716-446655440000`) |
| userId is not UUID | Ensure consumer ID is a valid UUID |
| Invalid itemType | Use only `DATABANK`, `AIMODEL`, or `APPS` |
| expiryTime in past | Ensure expiry is a future date (ISO-8601 format) |
| accessType not allowed | Check item's `resourceServer[].accessTypes` in catalogue |

**Debugging:**

```bash
# Validate UUIDs
echo "550e8400-e29b-41d4-a716-446655440000" | grep -E "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"

# Check item details
curl "https://api/v1/cat/item/<itemId>" | jq '.type, .resourceServer[].accessTypes'

# Validate ISO-8601 date
date -d "2027-12-31T23:59:59Z" "+%Y-%m-%d"  # Should print a valid date
```

---

## Issue: 500 Internal Server Error

**Symptom:** POST `/policy` returns 500 with unclear error.

**Debugging Steps:**

1. Check service logs:
   ```bash
   docker logs dx-acl-go  # or the service name
   tail -100 /var/log/cdpg/acl.log
   ```

2. Look for errors like:
   - Catalogue lookup failure (GetItem gRPC timeout)
   - Database connection error
   - RabbitMQ connection error

3. Check service health:
   ```bash
   curl http://localhost:8080/healthz/live
   curl http://localhost:8080/healthz/ready
   ```

4. Verify dependencies are running:
   ```bash
   docker ps | grep -E "postgres|rabbitmq|controlplane"
   ```

---

## Success Checklist

✅ Before creating a policy, verify:
- [ ] Caller's JWT is valid and unexpired
- [ ] Caller is the item owner (or org_admin)
- [ ] Item exists in the catalogue
- [ ] Requested accessTypes are in the item's resourceServer list
- [ ] No active conflicting policy exists
- [ ] Expiry date is in the future

✅ After creating a policy:
- [ ] Return value includes policyId
- [ ] Policy appears in `/policy/provider` list
- [ ] Policy appears in recipient's `/policy/consumer` list
- [ ] `/verify` returns the policy

---

## See Also

- [API Reference](../api-reference/acl-endpoints) — Full endpoint docs
- [Error Responses](../api-reference/error-responses) — All error codes
- [Policy Service](../components/policy-service) — How grants work
