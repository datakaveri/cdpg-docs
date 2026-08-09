---
sidebar_position: 4
title: "Flow: Dataset Onboarding and Discovery"
description: Registering metadata, provisioning storage, ingesting content, publishing discovery, and recovering partial onboarding.
---

# Flow: Dataset Onboarding and Discovery

## Purpose and status

Onboarding turns a provider-owned data source into a governed, discoverable resource with a stable identity, declared interfaces, storage/index state, and authorization metadata. Catalogue CRUD and major data stores are **Partially implemented**; a single orchestrated onboarding workflow and complete NGSI-LD ingestion/admin path are **Planned**.

## Actors and components

Provider or organization administrator; API Gateway; Catalogue; Registry; Policy/Authorization services; NGSI-LD, OGC, or File data service; Elasticsearch/PostGIS/S3; ingestion adapter; Audit and Notification services.

## Preconditions

- The provider is authenticated and belongs to the owning organization.
- The requested resource type, identifier, schema, access modes, and endpoint type are supported.
- The provider has authority to publish in the selected organization and storage namespace.

## Main workflow

1. Provider submits JSON-LD metadata with stable ID, owner/organization, schema, geography/time coverage, access modes, and intended serving component.
2. Gateway authenticates; Catalogue enforces provider/organization ownership and validates identifiers, schema references, and lifecycle state.
3. Catalogue stores the metadata in a non-discoverable onboarding state and emits an audit fact.
4. The serving component provisions an Elasticsearch index/alias, PostGIS collection, S3 namespace/multipart target, or subscription topology through an idempotent operation.
5. Ingestion adapter validates, normalizes, de-identifies where configured, and writes initial data. Invalid records are rejected or quarantined with reason and source correlation.
6. Registry records the serving endpoint/capabilities. Authorization registers owner/resource relationships and operation types.
7. Health/conformance checks verify storage, endpoint, schema, and policy readiness.
8. Catalogue atomically moves the item to a discoverable state. Public search returns only metadata approved for discovery; protected content remains gated.
9. Audit and notification events record publication and notify the provider of completion or actionable failure.

## Authorization points and ownership

Catalogue owns metadata and publication state; the selected data service owns content and storage; Registry owns endpoint records; Policy/Authz own grants/decisions. Provider and organization predicates are enforced at both metadata and storage operations. Publishing metadata never grants consumers data access.

## Failure and recovery

Every provisioning step uses the resource ID as an idempotency key. A failed step leaves the Catalogue item non-discoverable and records which component owns cleanup/retry. Reconciliation compares metadata state with index/collection/bucket and Registry state. Partial storage is deleted or resumed according to retention policy; it is never made public by a later unrelated retry.

## Audit and observability

Track onboarding/resource ID, organization, actor/workload, schema/version, provisioner operation, storage/index reference, validation counts, quarantined records, lifecycle state, retries, and completion latency. Alert on stuck onboarding age and metadata-to-storage/registry drift.

## Known limitations

NGSI-LD ingestion/admin ownership and full cross-service orchestration need final decisions. Data-quality/de-identification policies are deployment/provider-specific and must be documented with each adapter.

