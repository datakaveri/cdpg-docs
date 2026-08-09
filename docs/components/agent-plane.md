---
sidebar_position: 13
title: Agentic Plane Services
description: Agent Registry, MCP Gateway, and Agent Runtime responsibilities and implementation status.
---

# Agentic Plane Services

The Agentic Plane consists of three Go services. Their repositories and local runtime are **In development**; production GitOps integration, complete cross-replica coordination, and several governance controls are not operational.

## Agent Registry — `dx-agent-registry-go`

Owns agent records, versioned templates, lifecycle state, agent identity provisioning, approved capabilities, and the kill switch. It coordinates durable delegation records with the Policy Service and identity lifecycle with Keycloak; it does not execute prompts or decide access.

## Agent Runtime — `dx-agent-runtime-go`

Owns sessions, conversation/execution state, SSE delivery, planning, retry checkpoints, and delegated token exchange. It proposes tool calls but has no direct data-service egress and never stores a reusable user credential.

## MCP Gateway — `dx-mcp-gateway-go`

Is the sole governed tool boundary. It discovers allowlisted tools, validates arguments, classifies risk, applies a semantic firewall, requests composite authorization, parks approval-required actions, obtains a destination-bound credential, invokes the platform gateway, and sanitises tool results before the model sees them.

## Invariants

- The user remains the subject and the agent is recorded as actor.
- User permission, active delegation, agent lifecycle, contextual policy, and any human approval must all permit the action.
- Every capability is narrower than the delegating user's authority and is resource-, action-, audience-, and time-bounded.
- Suspended agents, revoked grants, expired sessions, unavailable mandatory checks, and invalid approval state fail closed.
- Plan, tool arguments, decision IDs, approvals, workload/subject identities, outcome, and revocation events are correlated in the audit trail.

See [Agentic Plane Architecture](../technical/agentic-plane.mdx) and [Agent Tool Invocation](../flows/agent-delegation.mdx).
