---
title: "Cortex"
description: "A local-first notes system that prefers links to folders."
pubDate: 2025-03-01
status: completed
techStack: [TypeScript, SQLite, FTS5]
# heroImage:                                 # optional cover/thumbnail — uncomment to use
#   src: ../../assets/projects/cortex.jpg     # local asset, OR a full https URL (external / Cloudflare R2)
#   alt: "Describe the image for screen readers"
repoUrl: https://github.com/jkroninger/cortex
draft: false
---

I have tried most of the notes applications. The thing they all get wrong is the same thing: they treat the note as the unit of work, when the unit of work is actually the connection between two notes.

Cortex is my attempt at the simplest possible system that takes that observation seriously. Notes are files. Links are first class. Search is full-text and instantaneous. There is no cloud.
