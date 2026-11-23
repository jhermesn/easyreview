---
title: "Global Accelerator basics"
level: foundational
order: 5
facts:
  - id: accelerators
    text: "AWS Global Accelerator creates accelerators that improve the performance of applications for local and global users."
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html#what-is-global-accelerator
  - id: fixed-entry
    text: Global Accelerator provides static IP addresses that accept client traffic at an AWS edge location and route it over the AWS global network to regional endpoints.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html#introduction-how-it-works
  - id: tcp-udp
    text: Global Accelerator listeners support TCP and UDP, so it also serves non-HTTP workloads.
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/about-listeners.html
  - id: anycast
    text: "Clients reach Global Accelerator's static IP addresses at a nearby AWS edge location, because the edge network announces those addresses as anycast."
    source: https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html
cards:
  - id: global-accelerator-013
    q: "How do AWS Global Accelerator static IP addresses direct clients to an AWS edge location?"
    a: "The edge network announces them as anycast addresses, so each client enters AWS at a nearby edge location."
    facts: [anycast]
  - id: global-accelerator-012
    q: Which users can benefit from AWS Global Accelerator performance improvements?
    a: Both local and global users.
    facts: [accelerators]
  - id: global-accelerator-010
    q: "Which protocols can AWS Global Accelerator listeners use for non-HTTP workloads?"
    a: "TCP and UDP."
    facts: [tcp-udp]
  - id: global-accelerator-009
    q: "A global application needs fixed IP addresses and traffic routed over the AWS global network to regional endpoints. Which service fits?"
    a: "AWS Global Accelerator provides static IP addresses at AWS edge locations and routes traffic to regional endpoints over the AWS global network."
    facts: [fixed-entry]
revised:
  - date: 2026-11-23
    note: The card now tests how anycast directs clients to the AWS edge.
    cards: [global-accelerator-013]
  - date: 2026-11-23
    note: The Global Accelerator card now tests which users can benefit from performance improvements.
    cards: [global-accelerator-012]
  - date: 2026-11-23
    note: The card now tests the protocols supported by Global Accelerator listeners.
    cards: [global-accelerator-010]
---
AWS Global Accelerator sends users onto the AWS global network close to them to improve application performance.

### How it works

1. Create an accelerator.
2. Add application endpoints in one or more Regions.
3. Users connect through anycast static IP addresses at a nearby AWS edge location to a healthy endpoint.

### Exam cues

- If the question says improve global application performance without caching, think Global Accelerator.

### Remember

- Accelerators for local and global users.

> **Trap:** Global Accelerator does not cache content; CloudFront does.
