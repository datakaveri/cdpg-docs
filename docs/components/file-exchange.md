---
sidebar_position: 8
title: File Exchange
description: Bulk data as files — resumable uploads, presigned downloads, and asynchronous processing.
---

# File Exchange

Handles **bulk data as files** — for datasets that are exchanged as downloadable artefacts rather than live APIs.

## Capabilities

- **Provider uploads** — providers attach files to their catalogue items, including large files via resumable **multipart upload**: the service issues the upload, hands out per-part presigned URLs, and finalises when all parts are confirmed.
- **Consumer downloads** — consumers with `file` access download via short-lived, **pre-signed links**; the file content streams directly from object storage, not through the platform's application servers.
- **Processing pipeline** — uploaded files can be validated and processed asynchronously (virus scanning, format detection, previews) before becoming available. Jobs are dispatched over the [messaging backbone](./messaging-backbone.md) and tracked through statuses `PENDING → RUNNING → COMPLETED | FAILED`.
- **Assets** — platform-level file assets (documentation, imagery) with role-restricted upload.

## How access is enforced

A download is only issued after two checks:

1. The requested file belongs to a real catalogue item (verified with the [Catalogue](./catalogue.md)).
2. The requester holds an active `file` grant on that item (verified with the [Authorization Service](./authorization-service.md)).

Pre-signed links are deliberately short-lived, so a leaked link expires quickly and access always snaps back to the policy record.

## Interactions

| Talks to | Why |
| --- | --- |
| Object storage (S3/MinIO) | File content (upload/download via presigned URLs) |
| Authorization Service | Per-download permission checks |
| Catalogue | Item validation |
| Messaging Backbone | Async file-processing jobs, audit and email events |
