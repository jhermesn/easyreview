---
title: "PLACEHOLDER direct-connect/design-details"
level: associate
order: 30
facts:
  - id: dx-vifs
    text: A private virtual interface reaches a VPC, a public virtual interface reaches public AWS services, and a transit virtual interface reaches transit gateways through a Direct Connect gateway.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html#dx-vif-types
  - id: dx-backup
    text: A configured backup IPsec VPN can provide VPC connectivity if a Direct Connect connection fails.
    source: https://aws.amazon.com/directconnect/faqs/#high-availability-and-resilience--1f5cnkc
  - id: dx-routes
    text: For identical destination prefixes at a virtual private gateway, BGP routes from Direct Connect take priority over Site-to-Site VPN routes, subject to endpoint health.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-route-priority.html
  - id: maximum-resiliency
    text: "Maximum resiliency uses separate connections ending on separate devices in more than one Direct Connect location, protecting against device, connection and full location failure."
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html#maximum_resiliency
cards:
  - id: direct-connect-002
    q: Which AWS Direct Connect virtual interface types reach a VPC, public AWS services and transit gateways?
    a: A private interface reaches a VPC, a public interface reaches public AWS services, and a transit interface reaches transit gateways through a Direct Connect gateway.
    facts: [dx-vifs]
  - id: direct-connect-006
    q: A company needs a backup path to its VPC if AWS Direct Connect fails. What can it use?
    a: Configure a backup Site-to-Site IPsec VPN.
    facts: [dx-backup]
  - id: direct-connect-007
    q: A virtual private gateway receives the same destination prefix from AWS Direct Connect and Site-to-Site VPN using BGP. Which route is preferred?
    a: The Direct Connect route is preferred for matching prefixes.
    facts: [dx-routes]
  - id: direct-connect-013
    q: "Critical workloads need Direct Connect to survive a device failure and the loss of a whole location. Which model fits?"
    a: "Maximum resiliency: separate connections on separate devices in at least two locations."
    facts: [maximum-resiliency]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
