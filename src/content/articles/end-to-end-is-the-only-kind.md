---
title: "End-to-end is the only kind of integration that matters"
description: "Most integration failures are not technical. They are failures of imagination about what the pipe is for."
pubDate: 2026-02-09
tags: [integrations, workday]
draft: false
---

Integration work has a reputation problem. To most engineers it sounds like plumbing — important, sure, but somewhere downstream of the interesting parts of the system. I would like to argue the opposite: integrations are where the interesting part of the system actually is, because they are where two people's models of the world have to agree.

Every integration I have shipped that went badly went badly for the same reason. Someone, somewhere, treated the pipe as a technical artifact rather than a social one. They asked what data needs to move and not why. They wrote the mapping and shipped it and were genuinely surprised when, six months later, the business had drifted and the integration had not.

The cure is unglamorous. You write down, in plain English, what each field means to the people who use it. You trace the lifecycle of a single record from origin to grave. You ask the operations team what they would do if the integration disappeared tomorrow. You build the thing only after you can answer those questions without checking your notes.
