---
title: Virtual interfaces and resiliency
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
AWS Direct Connect designs use virtual interfaces to reach different AWS destinations and backup paths to maintain connectivity when a connection fails. [Virtual interface types](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html#dx-vif-types) and [backup VPN](https://aws.amazon.com/directconnect/faqs/#high-availability-and-resilience--1f5cnkc)

### How it works

1. Choose a virtual interface for the destination: private for a virtual private cloud (VPC), public for public AWS services, or transit for transit gateways through a Direct Connect gateway. [Interface types](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html#dx-vif-types)
2. Configure a backup IPsec VPN to provide VPC connectivity if Direct Connect fails. [Backup VPN](https://aws.amazon.com/directconnect/faqs/#high-availability-and-resilience--1f5cnkc)
3. For matching destination prefixes at a virtual private gateway, routes learned through Border Gateway Protocol (BGP) from Direct Connect take priority over Site-to-Site VPN routes, subject to endpoint health. [Route priority](https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-route-priority.html)
4. For maximum resiliency, use separate connections on separate devices in more than one Direct Connect location. This protects against device, connection and full location failure. [Maximum resiliency](https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html#maximum_resiliency)

### Exam cues

- If the question says reach public AWS services, think public virtual interface, because each interface type reaches a different destination.
- If the question says provide a backup path to a VPC, think a configured IPsec VPN, because it can provide connectivity if Direct Connect fails.
- If the question says survive the loss of a Direct Connect location, think maximum resiliency, because it uses separate connections across multiple locations.

### Remember

- Private interface: VPC. Public interface: public AWS services. Transit interface: transit gateways through a Direct Connect gateway.
- Maximum resiliency uses more than one location and separate devices.

> **Trap:** A VPN backup does not automatically take priority over Direct Connect. At a virtual private gateway, Direct Connect BGP routes are preferred for matching prefixes, subject to endpoint health.
