---
title: "Transit Gateway basics"
level: foundational
order: 5
facts:
  - id: hub
    text: "AWS Transit Gateway is a network transit hub that interconnects VPCs and on-premises networks."
    source: https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html#what-is-transit-gateway
cards:
  - id: transit-gateway-010
    q: "A company has 50 VPCs and an on-premises network that must all talk to each other without many peering links. Which service fits?"
    a: "AWS Transit Gateway, a central hub."
    facts: [hub]
---
AWS Transit Gateway is a central hub that connects many VPCs and on-premises networks. [What is AWS Transit Gateway?](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html#what-is-transit-gateway)

### How it works

1. Create a transit gateway.
2. Attach VPCs and VPN or Direct Connect connections.
3. Route tables decide which attachments talk.

### Exam cues

- If the question says connect many VPCs and on-premises networks through one hub, think Transit Gateway.

### Remember

- Hub for VPCs and on-premises networks.

> **Trap:** Transit Gateway replaces a mesh of peering connections with one hub.
