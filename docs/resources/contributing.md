---
id: contributing
title: Contributing
---

# Contributing

## Documentation changes

1. Start from the canonical [Architecture](../technical/architecture.mdx), [Security Architecture](../technical/security-architecture.mdx), and [Current and Target State](../technical/current-and-target.mdx).
2. Confirm implementation claims in approved decisions or the owning Go repository.
3. Use the defined status vocabulary and include an evidence date for volatile claims.
4. Keep one canonical explanation; link to it from component, API, developer, and operator pages.
5. Update diagrams and accessible descriptions with the page that changes the flow.
6. Add an open decision when evidence is incomplete. Do not turn an intended capability into present tense.

## Service changes

- Keep business logic in the owning service and cross-cutting infrastructure in the shared Go platform.
- Preserve public REST contracts and use authenticated gRPC for approved internal calls.
- Treat workload identity, subject context, authorization, organisation scope, audit, and graceful shutdown as part of the interface.
- Publish business-critical events through an outbox; make consumers idempotent and operationally replayable.
- Document public contract or architecture changes before merge.

## Validation

Run formatting, type checking, the Docusaurus production build, internal-link validation, SVG XML/render checks, and terminology scans. Security or policy changes also require default-deny, revocation, obligation, and organisation-isolation test evidence.

Do not commit credentials, generated experiment notes, build output, or editor-specific files. Follow the repository pull-request template and request review from the owning architecture/security team for cross-plane changes.
