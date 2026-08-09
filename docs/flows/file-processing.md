---
sidebar_position: 5
title: "Flow: File Upload and Processing"
description: Multipart upload, object ownership, asynchronous processing, download, cleanup, and recovery.
---

# Flow: File Upload and Processing

## Purpose and status

The File Exchange accepts large provider files without proxying all bytes through the API service, processes them asynchronously, and serves authorized downloads. Multipart upload, metadata, processing jobs, ownership scoping, presigned access, and cleanup exist; bounded streaming aggregate downloads and complete crash recovery are **In development**.

## Actors and components

Provider; consumer; Gateway; File Exchange; Policy/Authorization services; PostgreSQL; S3-compatible object storage; Redis; RabbitMQ; processing and cleanup workers; Audit/Notification services.

## Preconditions

- Provider is authenticated and authorized for the databank/asset.
- File type, count, part size, total size, checksum, and object namespace pass policy.
- Storage and database readiness are healthy.

## Main workflow

1. Provider requests multipart initiation with databank/asset ID and file metadata.
2. File Exchange verifies the carried decision, owner/organization scope, quotas, and safe normalized object key; it persists an upload record.
3. Service returns short-lived presigned part URLs. The provider uploads directly to object storage.
4. Provider submits completion with part/checksum data. The service verifies ownership and upload state before completing the multipart object.
5. Completion transaction marks the file received, creates a durable processing job, and appends its outbox fact.
6. RabbitMQ delivers the job to a worker. The worker claims it idempotently, validates/scans/transforms, writes derived artifacts, and records terminal status.
7. Audit and notification facts announce success or actionable failure. Retryable failures retain job state and attempt count; permanent failures dead-letter/quarantine with reason.
8. An authorized consumer requests download. The service resolves metadata by owner/databank, verifies decision obligations, and returns a short-lived presigned URL or bounded stream.
9. Cleanup removes abandoned multipart uploads, expired temporary objects, and derived artifacts according to retention policy.

## Authorization and data ownership

PostgreSQL metadata is the source of object ownership; an S3 key supplied by the caller is only an input. Every list, preview, download, report, ZIP, metadata read, delete, abort, and completion query includes owner/databank/organization scope. Presigned URLs bind one action, object, and short expiry.

## Failure and recovery

- Database failure before presign creates no usable upload record.
- Partial uploads remain isolated and are aborted by cleanup after the configured window.
- Repeated completion/job delivery returns the stored outcome by idempotency key.
- Worker crash releases a durable claim; reconciliation checks object and job state before retry.
- Object-store failure never marks a file processed or deleted prematurely.
- Aggregate count/byte limits are evaluated before fetching objects; streaming ZIP remains an open gate.

## Audit and observability

Record request/decision ID, actor/workload, organization, databank/asset, file metadata ID, multipart upload ID, size/checksum, job/event ID, worker attempt, object-store operation class, processing status, bytes served, and cleanup result. Do not log raw credentials, presigned URLs, or full object keys.

