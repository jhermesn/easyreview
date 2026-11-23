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
  - id: peer-nontransitive
    text: "Peering is not transitive: two VPCs peered with the same VPC do not gain connectivity to each other through it."
    source: https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html#vpc-peering-limitations
  - id: rules-ram
    text: Resolver forwarding rules can be shared with accounts through AWS Resource Access Manager (RAM).
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-rules-managing.html#resolver-rules-managing-sharing
  - id: phz-scope
    text: A private hosted zone supplies records to associated VPCs through VPC Resolver.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
diagrams:
  - id: hybrid-network-hub
    title: Data center connected to VPCs in several accounts through one transit gateway
    facts: [tgw-hub, dxgw-tgw, dx-no-encryption, vpn-backup, dx-preferred, tgw-route-tables, tgw-ram, resolver-endpoints, dx-max-resiliency, encrypt-dx, peer-nontransitive, rules-ram, phz-scope]
    width: 1240
    height: 900
    groups:
      - { label: Corporate data center, x: 20, y: 160, w: 240, h: 570, tone: neutral, icon: group-corporate-data-center }
      - { label: DX locations, x: 300, y: 40, w: 190, h: 360, tone: neutral }
      - { label: Region, x: 720, y: 20, w: 500, h: 870, tone: neutral, icon: group-region }
      - { label: Network account, x: 740, y: 60, w: 220, h: 300, tone: neutral, icon: group-aws-account }
      - { label: Production account, x: 990, y: 60, w: 210, h: 170, tone: neutral, icon: group-aws-account }
      - { label: Development account, x: 990, y: 270, w: 210, h: 170, tone: neutral, icon: group-aws-account }
      - { label: Shared services account, x: 740, y: 600, w: 460, h: 280, tone: neutral, icon: group-aws-account }
    nodes:
      - { id: router, label: Customer router, sub: BGP, x: 40, y: 220, w: 200, h: 86, tone: network, icon: res-vpc-customer-gateway }
      - { id: dns, label: DNS servers, sub: on premises, x: 40, y: 620, w: 200, h: 86, tone: neutral, icon: res-servers, info: "Forward queries for AWS private zone names to the Resolver inbound endpoint, and answer queries for corporate names." }
      - { id: dx1, label: Direct Connect, sub: location 1, x: 320, y: 90, w: 150, h: 86, tone: network, icon: direct-connect, info: "Private, not encrypted by default." }
      - { id: dx2, label: Direct Connect, sub: location 2, x: 320, y: 290, w: 150, h: 86, tone: network, icon: direct-connect, info: "A separate connection on a separate device at a second location, for maximum resiliency." }
      - { id: vpn, label: Site-to-Site VPN, sub: backup path, x: 320, y: 560, w: 150, h: 86, tone: network, icon: site-to-site-vpn, info: "IPsec over the internet. Routes learned over Direct Connect win while it is healthy." }
      - { id: dxgw, label: DX gateway, sub: transit VIF, x: 530, y: 190, w: 150, h: 86, tone: network, icon: res-direct-connect-gateway }
      - { id: ram, label: AWS RAM, sub: share to accounts, x: 770, y: 110, w: 160, h: 86, tone: security, icon: resource-access-manager, info: "Shares the transit gateway, and the Resolver forwarding rules, with the workload accounts." }
      - { id: tgw, label: Transit Gateway, sub: route tables, x: 770, y: 250, w: 160, h: 86, tone: network, icon: transit-gateway, info: "Separate route tables keep production and development apart while both reach shared services and on premises." }
      - { id: prod, label: Production VPC, sub: attachment, x: 1015, y: 100, w: 160, h: 86, tone: network, icon: virtual-private-cloud }
      - { id: dev, label: Development VPC, sub: attachment, x: 1015, y: 310, w: 160, h: 86, tone: network, icon: virtual-private-cloud }
      - { id: inbound, label: Inbound endpoint, sub: shared VPC, x: 770, y: 640, w: 180, h: 86, tone: network, icon: res-route-53-resolver, info: "Receives queries from on-premises DNS servers and answers them with VPC Resolver." }
      - { id: outbound, label: Outbound endpoint, sub: forwarding rules, x: 770, y: 770, w: 180, h: 86, tone: network, icon: res-route-53-resolver, info: "Sends VPC queries for corporate domains to the on-premises DNS servers named in each forwarding rule." }
      - { id: phz, label: Private zone, sub: Route 53, x: 1010, y: 700, w: 170, h: 86, tone: network, icon: route-53 }
    edges:
      - { from: ram, to: prod, step: 1 }
      - { from: ram, to: dev, step: 1 }
      - { from: tgw, to: prod, step: 2 }
      - { from: tgw, to: dev, step: 2 }
      - { from: tgw, to: inbound, step: 2 }
      - { from: router, to: dx1, step: 3 }
      - { from: dx1, to: dxgw, step: 3 }
      - { from: dxgw, to: tgw, step: 3 }
      - { from: router, to: dx2, step: 4 }
      - { from: dx2, to: dxgw, step: 4 }
      - { from: dns, to: inbound, step: 5 }
      - { from: inbound, to: phz, step: 5 }
      - { from: outbound, to: dns, step: 6 }
      - { from: router, to: vpn, step: 7, dashed: true }
      - { from: vpn, to: tgw, step: 7, dashed: true }
    steps:
      - "The network account shares the transit gateway with the workload accounts through AWS RAM, so their VPCs can attach to it."
      - "Each VPC attaches to the transit gateway. Its route tables let production and development reach shared services and on premises, but not each other."
      - "The data center reaches AWS over Direct Connect: a transit virtual interface to a Direct Connect gateway associated with the transit gateway."
      - "A second connection at another Direct Connect location removes the single point of failure on the private path."
      - "On-premises DNS servers forward queries for private zone names to the Resolver inbound endpoint, which answers from the private hosted zone."
      - "VPC queries for corporate names match a forwarding rule, shared to the accounts through RAM, and leave through the outbound endpoint to the on-premises DNS servers."
      - "If the Direct Connect path fails, the Site-to-Site VPN to the transit gateway carries the traffic over the internet."
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
    a: "No. By default, traffic on Direct Connect is **not encrypted**. A **Private IP Site-to-Site VPN** over the connection adds IPsec encryption without public IP addresses."
    trap: true
    facts: [dx-no-encryption, encrypt-dx]
  - id: reference-architectures-081
    q: A company's only Direct Connect connection is a single point of failure for critical workloads. What gives maximum resiliency for the private path?
    a: "Separate connections ending on **separate devices** in **more than one Direct Connect location**."
    facts: [dx-max-resiliency]
  - id: reference-architectures-082
    q: VPC A is peered with VPC B, and VPC B with VPC C. Can instances in VPC A reach VPC C through VPC B?
    a: "No. Peering is **not transitive**. Peer A with C directly, or attach all three to a **transit gateway**."
    trap: true
    facts: [peer-nontransitive, tgw-hub]
  - id: reference-architectures-083
    q: Ten workload accounts must resolve corporate domain names through one outbound endpoint in a shared services account. How do the rules reach their VPCs?
    a: "Share the **Resolver forwarding rules** through **AWS RAM**, then associate them with each VPC."
    facts: [rules-ram, resolver-endpoints]
---
Hybrid questions describe a data center that must reach many VPCs reliably and privately. The common answer is a hub: one transit gateway that every VPC attaches to, Direct Connect as the main path from the data center, a VPN as the backup, and Route 53 Resolver endpoints so names resolve in both directions.

### How it works

1. A transit virtual interface connects the Direct Connect link to a Direct Connect gateway, which is associated with the transit gateway.
2. A Site-to-Site VPN to the same transit gateway gives a backup path; Direct Connect routes win while it is healthy.
3. VPCs from many accounts attach to the transit gateway, shared through AWS RAM.
4. Transit gateway route tables decide which attachments reach which, for example keeping production and development apart.
5. A second Direct Connect connection at another location removes the single point of failure on the private path.
6. Resolver inbound and outbound endpoints in a shared services VPC connect VPC DNS and corporate DNS. AWS RAM shares the forwarding rules with the workload accounts.

| Need | Choice |
|---|---|
| Many VPCs and on premises in one routing domain | Transit Gateway hub |
| Main private path from the data center | Direct Connect with a transit VIF and Direct Connect gateway |
| Cheap backup path | Site-to-Site VPN to the transit gateway |
| Isolate environments on a shared hub | Separate transit gateway route tables |
| DNS in both directions | Resolver inbound and outbound endpoints |
| Same forwarding rules in many accounts | Share the Resolver rules through AWS RAM |
| Maximum resiliency for the private path | Separate connections at more than one Direct Connect location |
| Encrypt traffic over Direct Connect | Private IP Site-to-Site VPN over the connection |

### Exam cues

- If the question says many VPCs, many accounts and on premises, think Transit Gateway shared with AWS RAM, because peering does not scale and is not transitive.
- If the question says Direct Connect to VPCs behind a transit gateway, think transit VIF and Direct Connect gateway.
- If the question says backup for Direct Connect at low cost, think Site-to-Site VPN.
- If the question says Direct Connect must be encrypted, think a Private IP Site-to-Site VPN over it, because Direct Connect is not encrypted by default.
- If the question says on-premises servers resolve private hosted zone names, think a Resolver inbound endpoint.
- If the question says EC2 instances resolve corporate names, think an outbound endpoint with forwarding rules.

### Remember

- Direct Connect routes are preferred over VPN routes for the same prefix.
- Maximum resiliency: separate connections on separate devices in more than one location.
- Route tables, not the transit gateway itself, isolate environments.
- VPC peering is not transitive.

> **Trap:** A VPN backup protects against losing the Direct Connect link, but one connection at one location is still one point of failure for the main path. Resiliency questions want connections at more than one location.
