---
sidebar_position: 8
title: File Exchange
description: Governed multipart upload, object access, metadata, and asynchronous file processing.
---

# File Exchange

`dx-files-connect-api-go` owns file metadata, multipart-upload state, processing jobs, and object-store access. Upload/download, processing jobs, and S3-compatible integration are **Partially implemented**; streaming archive delivery and some hardening controls remain incomplete.

## Upload and processing

After the gateway authenticates the provider, the service verifies catalogue ownership and the authorization decision. It records an upload session, issues narrowly scoped and short-lived object-store capabilities, verifies completion metadata, then commits a processing job and outbox event. Workers validate the object, derive metadata or previews, and transition the job idempotently through pending, running, completed, or failed states.

## Download

A consumer presents a decision bound to the file, resource, action, subject, and expiry. The service validates the carried decision and required obligations, then either streams the object or issues a short-lived object-store capability according to the approved delivery profile. A missing or stale decision, ownership mismatch, quarantined object, or unsupported obligation is denied.

## Recovery and signals

Multipart sessions expire and incomplete parts are garbage-collected. Worker messages use bounded retry and dead-letter handling; retries use stable job and object identifiers. Metrics cover active uploads, processing latency, failures, quarantines, bytes transferred, and decision denials. Audit records contain metadata and capability identifiers, never file contents or secret URLs.

See [File Upload and Processing](../flows/file-processing.md) and [Data Plane Architecture](../technical/data-plane.md).
