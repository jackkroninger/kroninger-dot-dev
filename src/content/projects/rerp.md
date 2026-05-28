---
title: "RERP: Real Estate Resource Planner"
description: "Workday for Property Management"
pubDate: 2026-04-06
status: active #active/completed/archived
techStack: [Python, FastAPI, PostgreSQL, PGVector, TypeScript, React, Stripe, CloudFlare R2]
heroImage:
  src: https://images.kroninger.dev/rerp-demo.png
  alt: "Screenshot of the RERP home screen displaying demo transactions."
repoUrl: https://github.com/jackkroninger/rerp
liveUrl: https://not.public
draft: true
---

## Abstract

RERP (Real Estate Resource Planner) is a multi-tenant ERP that consolidates the entire operational and financial workload of a rental portfolio (rent collection, bookkeeping, leasing, tenant placement, vendor and maintenance tracking, and tax preparation) into a single application. It targets a problem common to small, remotely managed portfolios: the administrative work is real and time-consuming, yet it tends to live scattered across spreadsheets, bank statements, message threads, and an annual tax scramble, while the off-the-shelf alternative (percentage-based property managers, enterprise property management software) quietly erodes already-thin margins. RERP is organized around a single general ledger in which every financial event is a transaction row, governed by a strict ownership hierarchy (entities → properties → tenants → leases) enforced at the database level. It is built on a FastAPI and PostgreSQL backend using async SQLAlchemy, with four separate React/TypeScript frontends (owner, tenant, contractor, and operations), a custom four-table role-based access control system, Stripe-driven rent collection, PDF reporting, and vector-embedding-powered in-app help search. The system is in production use, managing a live portfolio.

## Background

RERP began as a tool for one person with a specific, expensive problem, not as a product to sell. What follows is how it came together and why it was worth building.

### A portfolio on the verge of being given up
 
The owner of a remotely managed, out-of-state rental portfolio was paying percentage-based property managers and, after their cut, barely breaking even while still spending fifteen-plus hours a week reconciling the books and coordinating contractors. It was the kind of overhead that quietly eats a small portfolio alive, and the stress had reached the point of seriously considering walking away from the whole thing. The work itself wasn't the issue so much as its shape: scattered across spreadsheets, bank statements, text threads, and a once-a-year tax scramble, with no single place that told the truth about the money.

### One ledger as the source of truth
 
The core design decision was to make every financial event a transaction row, and to treat that ledger as the single source of truth. Legal entities own properties, properties hold tenants, tenants sign leases, and every dollar — rent, repairs, insurance, legal fees — posts back to the same general ledger. The hierarchy is enforced at the database level, so records can't be orphaned and the books can't silently drift out of sync. The intention of this design was to create a cash-basis interface that needs no accounting knowledge, backed by double-entry rigor and automatic hierarchy roll-ups. Rather than asking the user to maintain a chart of accounts, RERP derives the account structure from the entity hierarchy and applies it per report. The user enters one leg of a transaction (amount, category, and parent record) and the data model supplies the offsetting leg and the roll-up from lease to property to entity.

### The permission system

RERP uses a four-table role-based access control model that resolves authorization dynamically from FastAPI's route registry. Adding a new route doesn't mean hand-wiring permissions, the system simply asks whether any of a user's roles grants access to that route's domain. It's the kind of design that pays for itself every time the application grows.

### From fifteen hours to two
 
After adopting RERP, the portfolio's weekly management burden dropped from fifteen-plus hours to under two. With the books and coordination finally centralized, the owner was able to drop one property manager entirely and move to self-management.

### Architect, not just builder
 
My role on RERP was as the architect. I designed the data model, defined the layered service architecture, and wrote the technical specifications for every feature and fix, with implementation handled by Claude Code under direct review. Owning the design decisions end to end and being accountable for whether the system actually held up in daily use taught me more about shipping a production-shaped application than any project before it.
