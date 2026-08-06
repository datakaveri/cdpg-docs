---
sidebar_position: 13
title: Agent Plane Services
description: The three optional services that let AI agents act under delegation — the registry, the MCP tool gateway, and the agent runtime.
---

# Agent Plane Services

Three optional services that together let an AI agent act on a user's behalf without ever holding the user's credential. They deploy only where an operator enables them; nothing else on the platform depends on them.

See the [Agentic Plane](../technical/agentic-plane.mdx) for the model these services implement.

## Agent Registry

The control plane for agents.

- **Agent records and templates** — what an agent is, which template version it runs, which tools it may be offered.
- **Agent identity** — provisions an identity for each agent in the [Identity Provider](./identity-provider.md), so an agent is a distinct principal rather than a label on someone else's session.
- **Delegation** — records delegation grants through the [Policy Service](./policy-service.md). Agent grants live in the same durable store as every other access grant; there is no separate agent permission system to keep in sync.
- **Kill switch** — suspends an agent platform-wide. Enforced at the [API Gateway](./api-gateway.md), so it takes effect without waiting for a token to expire.

## MCP Gateway

The tool boundary, and the agent's only route out.

Every tool call passes the same pipeline before anything reaches the exchange:

| Stage | What it does |
| --- | --- |
| **Schema** | Validates arguments against the tool's declared schema; malformed calls stop here |
| **Scope** | Confirms the tool and its target fall inside the delegation grant |
| **Risk** | Classifies the operation; consequential ones park for human approval |
| **Credential** | Attaches the delegated token — at the boundary, after the plan is fixed |

Two consequences worth stating plainly: the reasoning layer never handles a raw credential, and there is no second egress. An agent's reachable surface is exactly the published tool set.

Responses are wrapped and marked as untrusted before returning to the model, so retrieved content is material to summarise rather than instructions to follow.

## Agent Runtime

Sessions and planning.

- **Sessions and streaming** — conversation state and event streaming to the user interface.
- **Planning loop** — proposes tools. It proposes; the MCP Gateway disposes.
- **Token exchange** — exchanges the user's token for one naming the user as subject and the agent as actor. Both identities travel on every request.

## What these services do not do

- They do not decide access. Authorization is answered by the [Authorization Service](./authorization-service.md), which checks the user's permission **and** the agent's delegated permission.
- They do not serve data. Agent requests reach the [Data Plane](./data-plane.md) through the same [API Gateway](./api-gateway.md) as human traffic.
- They do not store grants. Delegations live in the Policy Service.

That division is deliberate: an agent plane that made its own access decisions would be a second policy system to keep correct.
