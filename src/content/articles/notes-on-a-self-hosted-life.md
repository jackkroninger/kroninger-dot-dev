---
title: "Notes on a self-hosted life"
description: "On the small dignities of owning the machine your data lives on, and the unglamorous work of keeping it running."
pubDate: 2026-04-18
tags: [homelab, essay]
draft: true
---

There is a particular kind of quiet that arrives the first time a service you wrote answers a request from a machine in your basement. It is not the satisfaction of shipping — shipping is loud, public, full of dashboards. It is more like the moment a houseplant survives a winter you assumed it would not.

I have been running my own infrastructure for about three years. It started as a single Raspberry Pi tucked into a bookshelf, running a Pi-hole and an SSH daemon and very little else. It now occupies a quarter of a half-height rack: two Proxmox hosts, a NAS, a small switch with more ports than I will ever fill, and a UPS that has saved me exactly twice.

The temptation, when describing a setup like this, is to make it sound like a hobby — quaint, indulgent, the adult equivalent of a model train. I have come to think that framing undersells it. What a homelab teaches you, more than any cloud account ever will, is that infrastructure is a verb. Things break in the night. Certificates expire on holidays. The drive you bought because it was cheap turns out to be cheap for a reason.

None of this is unique to running your own hardware. The lessons travel. The difference is one of stakes and feedback loops: the consequences of a bad decision land on you and only you, and they land quickly. There is no platform team to absorb the blast. You learn, the hard way, what production actually means.
