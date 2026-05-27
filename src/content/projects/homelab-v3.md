---
title: "Homelab v3"
description: "A quiet rack in a corner of the basement that runs the services I refuse to rent."
pubDate: 2026-02-01
status: active
techStack: [Proxmox, ZFS, Tailscale, Caddy]
# heroImage:                                     # optional cover/thumbnail — uncomment to use
#   src: ../../assets/projects/homelab-v3.jpg     # local asset, OR a full https URL (external / Cloudflare R2)
#   alt: "Describe the image for screen readers"
repoUrl: https://github.com/jkroninger/homelab
draft: false
---

The third iteration of a home infrastructure project that began with a single Raspberry Pi and has grown, slowly and stubbornly, into something I would not be embarrassed to show a coworker.

Two Proxmox hosts handle compute. A four-bay NAS handles storage, with ZFS doing the parts of my job that I would otherwise forget to do. Tailscale stitches the whole thing together across two physical locations. Caddy fronts everything that needs a hostname.

The point of the project, beyond the obvious utility, is to keep a working knowledge of what an ops job is actually like. The cloud is a wonderful abstraction. It is also one I would prefer not to lose the ability to question.
