# Architecture documentation update plan

**Review date:** 2026-08-09
**Scope:** the `cdpg-docs` Docusaurus project and the approved Go-platform architecture sources in the orchestration workspace.

This review is the disposition record for the current architecture refresh. It is intentionally kept outside the published sidebar.

## Evidence reviewed

- The complete Docusaurus navigation, pages, component diagrams, static assets, and build configuration.
- The canonical architecture index, platform architecture, authorization target design, security review, service inventory, ports, roadmap, engineering playbook, Agentic Plane design, GitOps design, and active platform implementation handover.
- Architecture decisions covering workload identity, public REST versus internal gRPC, authorization obligations, data-plane enforcement, event delivery, and deployment boundaries.
- Go gateway, authorization, policy, user, catalogue, data-plane, file, marketplace, and agent-service source where a document did not establish an implementation claim.

## Findings

1. Several pages described mutually incompatible identity-propagation and authorization models.
2. OpenFGA relationship decisions were presented as the entire authorization system; contextual policy and typed enforcement obligations were not represented.
3. The Agentic Plane had less depth than the other planes and did not show its execution, approval, revocation, or failure paths.
4. Status was inconsistent: planned features were often written in the present tense.
5. Control-plane, data-plane, and component pages duplicated responsibility descriptions and sometimes disagreed on the enforcement point.
6. The deployment diagrams did not distinguish central, cluster, provider, and external trust boundaries.
7. Several unreferenced static diagrams encoded superseded component models.

## Page disposition

| Area | Disposition |
| --- | --- |
| Platform overview and architecture | Rewrite around the Go system and three-plane model |
| Control Plane, Data Plane, Agentic Plane | Rewrite with ownership, data, events, failure behavior, status, and workflows |
| Security architecture | Create as the canonical authentication, workload identity, OPA/OpenFGA, and enforcement reference |
| Shared platform architecture | Create, with implementation detail isolated under “For Developers” |
| Current and target state | Create with one status vocabulary and an evidence date |
| Architecture decisions | Create a source map and explicit open-decision register |
| Component pages | Align to the canonical plane/security chapters; remove duplicated policy semantics |
| Workflow pages | Expand authentication, authorization, policy, data, files, marketplace, audit, and agent workflows |
| Diagrams | Replace obsolete identity/authorization flows; add security, event, policy, agent, and status views |
| Obsolete architecture assets | Retire after confirming they are unreferenced |

## Documentation rules applied

- Describe implemented and intended capabilities together only when each is explicitly labelled.
- Use **Implemented**, **Partially implemented**, **In development**, **Planned**, **Deferred**, **Legacy only**, and **Superseded** consistently.
- Treat `dx-authz-go` as the composite policy decision service, OpenFGA as the relationship engine, and OPA as a planned contextual/attribute-policy engine until its deployment and bundle decisions are approved.
- Treat the gateway and application services as enforcement points; data planes consume verified carried decisions and do not make synchronous PDP calls.
- Keep one canonical security explanation and link to it from component, operator, API, and developer pages.
- Record unresolved decisions rather than filling gaps with assumptions.

## Validation gates

- Docusaurus type-check and production build.
- Broken-link, anchor, and image-reference checks.
- XML parsing and browser rendering of changed SVGs.
- Repository-wide terminology scan for superseded trust and platform descriptions.
- Cross-check ports, service names, status labels, and material security claims against approved decisions and implementation evidence.
