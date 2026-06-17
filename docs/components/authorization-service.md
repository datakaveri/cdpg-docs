---
sidebar_position: 5
---

# Authorization Service

The platform's **decision point**: it answers, in real time, "may this subject perform this action on this resource?" for every data access.

## How it works

The service maintains a **relationship graph** (ReBAC, backed by OpenFGA) describing who relates to what: *user U has `api` access to dataset D*, *user U is a member of organisation O*, *organisation O has access to dataset D*. A permission check is a graph question — fast enough to sit on the hot path of every data request.

## Where the relationships come from

The Authorization Service holds **no original data**. It is a projection of the Policy Service:

1. A policy is granted or revoked in the Policy Service.
2. The change is published as an event on the messaging backbone (transactionally, so it cannot be lost).
3. The Authorization Service consumes the event and updates the relationship graph.

This means a grant becomes enforceable within moments of being created, and a revocation takes effect just as quickly — without the Policy Service ever being on the request path.

## What asks it questions

| Caller | Question |
|---|---|
| Data Plane | "May this user query this dataset's API?" |
| File Exchange | "May this user download files of this databank?" |
| Gateway / other components | Generic relationship checks |

## Group resolution

Group policies (e.g. "everyone in organisation O may access dataset D") are answered through the graph itself: the consumer's organisation membership connects them to the grant — no per-user fan-out is needed when organisations grow.
