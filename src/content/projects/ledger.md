---
title: "Ledger"
description: "A plain-text accounting tool I wrote because every existing one wanted to be a platform."
pubDate: 2025-07-01
status: active
techStack: [Go, SQLite, HTMX]
# heroImage:                                 # optional cover/thumbnail — uncomment to use
#   src: ../../assets/projects/ledger.jpg     # local asset, OR a full https URL (external / Cloudflare R2)
#   alt: "Describe the image for screen readers"
repoUrl: https://github.com/jkroninger/ledger
draft: false
---

Ledger is a personal-finance application built around the observation that I do not need a budgeting platform. I need a place to write down what I spent, and a way to ask questions of that record later.

The whole application is about eight hundred lines of Go and a handful of HTMX templates. It writes to a single SQLite file that I back up nightly. It will never have an iOS app and it will never have a logo.
