---
title: "Workday, decoded"
description: "A year of building inside one of the more opaque platforms in enterprise software — and what it taught me about API design."
pubDate: 2025-11-22
tags: [workday, field notes]
# heroImage:                                       # optional cover image — uncomment to use
#   src: ../../assets/articles/workday-decoded.jpg  # local asset, OR a full https URL (external / Cloudflare R2)
#   alt: "Describe the image for screen readers"
draft: false
---

Workday is, depending on who you ask, either a marvel of consistent design or a Rorschach test for consultants. I think it is both. After a year of building integrations against it I have opinions, most of them affectionate.

What Workday gets right, and what most enterprise platforms still get wrong, is that the model is the API. There is no second-class story for the things the UI does that the API cannot. If a Workday user can do it, an integration can do it, and almost always through the same vocabulary.

What it gets wrong is documentation as a literary form. The reference exists. It is exhaustive. It is also a labyrinth that assumes you already know which thread you are pulling.
