---
title: Hybrid network hub with Direct Connect and Transit Gateway
level: associate
order: 40
facts:
  - id: tgw-hub
    text: Transit Gateway is a network transit hub that interconnects VPCs and on-premises networks through attachments.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html
  - id: dxgw-tgw
    text: A Direct Connect connection reaches the VPCs and VPNs attached to a transit gateway through a transit virtual interface to a Direct Connect gateway that is associated with the transit gateway.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-transit-gateways.html
  - id: dx-no-encryption
    text: Direct Connect does not encrypt traffic in transit by default.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/encryption-in-transit.html
  - id: vpn-backup
    text: A Site-to-Site VPN can act as a backup path that keeps VPC connectivity if the Direct Connect connection fails.
    source: https://aws.amazon.com/directconnect/faqs/#high-availability-and-resilience--1f5cnkc
  - id: dx-preferred
    text: For identical destination prefixes at a virtual private gateway, BGP routes learned over Direct Connect are preferred over Site-to-Site VPN routes, subject to endpoint health.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-route-priority.html
  - id: tgw-route-tables
    text: Each transit gateway attachment is associated with a transit gateway route table, and attachments can propagate their routes into route tables, which controls which networks can reach each other.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html
  - id: tgw-ram
    text: AWS RAM can share a transit gateway with other accounts or the whole organization, so their VPCs can attach to it.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/working-with-transit-gateways.html#transit-gateway-share
  - id: resolver-endpoints
    text: A Route 53 Resolver inbound endpoint lets on-premises DNS servers forward queries into a VPC, and an outbound endpoint with forwarding rules sends VPC queries to resolvers on the on-premises network.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-overview-DSN-queries-to-vpc.html
  - id: dx-max-resiliency
    text: Maximum Direct Connect resiliency uses separate connections ending on separate devices in more than one Direct Connect location.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html#maximum_resiliency
  - id: encrypt-dx
    text: To encrypt traffic over Direct Connect, run a Private IP Site-to-Site VPN over it, which uses IPsec without public IP addresses.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/private-ip-dx.html
diagrams:
  - id: hybrid-network-hub
    title: Data center connected to several VPCs through one transit gateway
    width: 1240
    height: 700
    groups:
      - { label: Corporate data center, x: 20, y: 140, w: 280, h: 420, tone: neutral, icon: group-corporate-data-center }
      - { label: Region, x: 790, y: 20, w: 430, h: 660, tone: neutral, icon: group-region }
    nodes:
      - { id: router, label: Customer router, sub: BGP, x: 60, y: 220, w: 200, h: 86, tone: network, icon: res-vpc-customer-gateway }
      - { id: dns, label: DNS servers, sub: on premises, x: 60, y: 440, w: 200, h: 86, tone: neutral, icon: res-servers, info: "Forward queries for AWS private zones to the Resolver **inbound** endpoint. The Resolver **outbound** endpoint forwards queries for corporate names back here." }
      - { id: dx, label: Direct Connect, sub: primary path, x: 380, y: 180, w: 150, h: 86, tone: network, icon: direct-connect, info: "Private, not encrypted by default. For maximum resiliency, use separate connections at more than one location." }
      - { id: vpn, label: Site-to-Site VPN, sub: backup path, x: 380, y: 440, w: 150, h: 86, tone: network, icon: site-to-site-vpn, info: "IPsec over the internet. Routes learned over Direct Connect win while it is healthy." }
      - { id: dxgw, label: DX gateway, sub: transit VIF, x: 580, y: 180, w: 150, h: 86, tone: network, icon: res-direct-connect-gateway }
      - { id: tgw, label: Transit Gateway, sub: hub, x: 830, y: 300, w: 160, h: 86, tone: network, icon: transit-gateway, info: "Separate route tables keep production and development apart while both reach shared services and on premises." }
      - { id: prod, label: Production VPC, sub: account A, x: 1040, y: 60, w: 160, h: 86, tone: network, icon: virtual-private-cloud }
      - { id: dev, label: Development VPC, sub: account B, x: 1040, y: 300, w: 160, h: 86, tone: network, icon: virtual-private-cloud }
      - { id: shared, label: Shared VPC, sub: Resolver endpoints, x: 1040, y: 540, w: 160, h: 86, tone: network, icon: res-route-53-resolver, info: "Holds the Route 53 Resolver inbound and outbound endpoints and other shared services." }
    edges:
      - { from: router, to: dx, step: 1 }
      - { from: dx, to: dxgw, step: 1 }
      - { from: dxgw, to: tgw, step: 1 }
      - { from: router, to: vpn, step: 2, dashed: true }
      - { from: vpn, to: tgw, step: 2, dashed: true }
      - { from: tgw, to: prod, step: 3 }
      - { from: tgw, to: dev, step: 3 }
      - { from: tgw, to: shared, step: 4 }
    steps:
      - "The data center reaches AWS over Direct Connect: a transit virtual interface to a Direct Connect gateway associated with the transit gateway."
      - "A Site-to-Site VPN to the same transit gateway is the backup path over the internet. Direct Connect routes are preferred while it is up."
      - "VPCs in several accounts attach to the transit gateway, shared through AWS RAM. Route tables decide which attachments can reach each other."
      - "The shared services VPC holds Route 53 Resolver inbound and outbound endpoints, so names resolve in both directions."
cards:
  - id: reference-architectures-021
    q: A company with 30 VPCs in several accounts and one data center wants a single place to route between all of them instead of a mesh of peering connections. Which service fits?
    a: "**AWS Transit Gateway**, a hub that VPC, VPN and Direct Connect gateway attachments connect to. Share it across accounts with AWS RAM."
    facts: [tgw-hub, tgw-ram]
  - id: reference-architectures-022
    q: How does a Direct Connect connection reach many VPCs that are attached to a transit gateway?
    a: "Create a **transit virtual interface** to a **Direct Connect gateway**, and associate that gateway with the transit gateway."
    facts: [dxgw-tgw]
  - id: reference-architectures-023
    q: A company wants a low-cost backup for its single Direct Connect connection. What fits, and which path carries traffic while both are up?
    a: "A **Site-to-Site VPN** as backup. For identical prefixes, the Direct Connect routes are preferred while the connection is healthy."
    facts: [vpn-backup, dx-preferred]
  - id: reference-architectures-024
    q: Production and development VPCs share one transit gateway, and both need the shared services VPC but must never reach each other. How is that done?
    a: "Use **separate transit gateway route tables**: associate each VPC with a table that has routes to shared services and on premises, but not to the other environment."
    facts: [tgw-route-tables]
  - id: reference-architectures-025
    q: Servers in a data center must resolve names in a Route 53 private hosted zone, and EC2 instances must resolve corporate names. Which Route 53 Resolver setup fits?
    a: "An **inbound endpoint** for queries from on premises, and an **outbound endpoint** with forwarding rules for queries to corporate DNS."
    facts: [resolver-endpoints]
  - id: reference-architectures-026
    q: A security team assumes traffic over Direct Connect is encrypted. Is it?
    a: "No. Direct Connect does **not encrypt** traffic by default. A **Private IP Site-to-Site VPN** over the connection adds IPsec encryption without public IP addresses."
    trap: true
    facts: [dx-no-encryption, encrypt-dx]
---
Hybrid questions describe a data center that must reach many VPCs reliably and privately. The common answer is a hub: one transit gateway that every VPC attaches to, Direct Connect as the main path from the data center, a VPN as the backup, and Route 53 Resolver endpoints so names resolve in both directions.

### How it works

1. A transit virtual interface connects the Direct Connect link to a Direct Connect gateway, which is associated with the transit gateway. [Direct Connect gateways and Transit Gateway](https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-transit-gateways.html)
2. A Site-to-Site VPN to the same transit gateway gives a backup path; Direct Connect routes win while it is healthy.
3. VPCs from many accounts attach to the transit gateway, shared through AWS RAM.
4. Transit gateway route tables decide which attachments reach which, for example keeping production and development apart.
5. Resolver inbound and outbound endpoints in a shared services VPC connect VPC DNS and corporate DNS.

| Need | Choice |
|---|---|
| Many VPCs and on premises in one routing domain | Transit Gateway hub |
| Main private path from the data center | Direct Connect with a transit VIF and Direct Connect gateway |
| Cheap backup path | Site-to-Site VPN to the transit gateway |
| Isolate environments on a shared hub | Separate transit gateway route tables |
| DNS in both directions | Resolver inbound and outbound endpoints |

### Exam cues

- If the question says many VPCs, many accounts and on premises, think Transit Gateway shared with AWS RAM, because peering does not scale and is not transitive.
- If the question says Direct Connect to VPCs behind a transit gateway, think transit VIF and Direct Connect gateway.
- If the question says backup for Direct Connect at low cost, think Site-to-Site VPN.
- If the question says Direct Connect must be encrypted, think a Private IP Site-to-Site VPN over it, because Direct Connect is not encrypted by default.
- If the question says on-premises servers resolve private hosted zone names, think a Resolver inbound endpoint.

### Remember

- Direct Connect routes are preferred over VPN routes for the same prefix.
- Maximum resiliency: separate connections on separate devices in more than one location.
- Route tables, not the transit gateway itself, isolate environments.

> **Trap:** A VPN backup protects against losing the Direct Connect link, but one connection at one location is still one point of failure for the main path. Resiliency questions want connections at more than one location.
