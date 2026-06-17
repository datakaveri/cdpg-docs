---
sidebar_position: 7
---

# File Exchange

Handles **bulk data as files** — for datasets that are exchanged as downloadable artefacts rather than live APIs.

## Capabilities

- **Provider uploads** — providers attach files to their catalogue items, including large files via resumable multipart upload.
- **Consumer downloads** — consumers with `file` access download via short-lived, pre-signed links; the file content streams directly from object storage, not through the platform's application servers.
- **Processing pipeline** — uploaded files can be validated and processed asynchronously before becoming available.

## How access is enforced

A download is only issued after two checks:

1. The requested file belongs to a real catalogue item (verified with the Control Plane).
2. The requester holds an active `file` grant on that item (verified with the Authorization Service).

Pre-signed links are deliberately short-lived, so a leaked link expires quickly and access always snaps back to the policy record.

## Interactions

| Talks to | Why |
|---|---|
| Object storage | File content (upload/download) |
| Authorization Service | Per-download permission checks |
| Control Plane | Item validation |
| Messaging Backbone | Async file-processing jobs, email notifications |
