---
title: Private connectivity and encryption
level: professional
order: 10
facts:
  - id: dx-connection
    text: Direct Connect links an internal network to a Direct Connect location and bypasses internet service providers in the path to AWS.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html
  - id: dx-vifs
    text: A private virtual interface reaches a VPC, a public virtual interface reaches public AWS services, and a transit virtual interface reaches transit gateways through a Direct Connect gateway.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html#dx-vif-types
  - id: dx-vpc
    text: A VPC is a logically isolated virtual network in AWS.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
  - id: dx-no-default-encryption
    text: Direct Connect does not encrypt traffic in transit by default.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/encryption-in-transit.html
  - id: dx-vpn
    text: A Site-to-Site VPN can use a Direct Connect public virtual interface to reach its public endpoint and establish IPsec tunnels to a virtual private gateway.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-site-to-site-vpn.html
  - id: dx-macsec-scope
    text: MACsec encrypts the point-to-point connection between the customer edge device and the Direct Connect device, not all network segments end to end.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/MACsec.html
  - id: dx-macsec-support
    text: MACsec is supported on dedicated 10, 100 and 400 Gbps connections at selected locations, but not on hosted connections.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/MACsec.html#supported-connections
  - id: dx-modes
    text: MACsec should_encrypt falls back to unencrypted traffic if negotiation fails; must_encrypt stops traffic if encryption cannot be established.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/MACsec.html#concepts
  - id: dx-mode-default
    text: New MACsec-enabled connections default to should_encrypt.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/MACsec.html#concepts
  - id: dx-backup
    text: A configured backup IPsec VPN can provide VPC connectivity if a Direct Connect connection fails.
    source: https://aws.amazon.com/directconnect/faqs/#high-availability-and-resilience--1f5cnkc
  - id: dx-routes
    text: For identical destination prefixes at a virtual private gateway, BGP routes from Direct Connect take priority over Site-to-Site VPN routes, subject to endpoint health.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-route-priority.html
  - id: dx-bgp
    text: BGP exchanges routing information between AWS and remote endpoints.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-site-to-site-vpn.html
  - id: dx-redundancy
    text: High resiliency uses separate Direct Connect connections at multiple locations to protect against connectivity and location failures.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html#high_resiliency
cards:
  - id: direct-connect-001
    q: A company uses AWS Direct Connect and requires encryption in transit. What options should it consider?
    a: Use an IPsec VPN over Direct Connect, or MACsec on a supported connection. MACsec protects the point-to-point link, not every network segment.
    trap: true
    facts: [dx-no-default-encryption, dx-vpn, dx-macsec-scope]
  - id: direct-connect-002
    q: Which AWS Direct Connect virtual interface types reach a VPC, public AWS services and transit gateways?
    a: A private interface reaches a VPC, a public interface reaches public AWS services, and a transit interface reaches transit gateways through a Direct Connect gateway.
    facts: [dx-vifs]
  - id: direct-connect-003
    q: A company wants an encrypted connection to its VPC over AWS Direct Connect using a public VPN endpoint. What should it configure?
    a: Establish Site-to-Site VPN IPsec tunnels over a Direct Connect public virtual interface.
    facts: [dx-vpn]
  - id: direct-connect-004
    q: A company needs its AWS Direct Connect link to stop passing traffic if MACsec negotiation fails. Which mode should it use?
    a: Use must_encrypt. The default should_encrypt mode can fall back to unencrypted traffic.
    trap: true
    facts: [dx-modes, dx-mode-default]
  - id: direct-connect-005
    q: Can a hosted AWS Direct Connect connection use MACsec?
    a: No. MACsec is not supported on hosted connections.
    trap: true
    facts: [dx-macsec-support]
  - id: direct-connect-006
    q: A company needs a backup path to its VPC if AWS Direct Connect fails. What can it use?
    a: Configure a backup Site-to-Site IPsec VPN.
    facts: [dx-backup]
  - id: direct-connect-007
    q: A virtual private gateway receives the same destination prefix from AWS Direct Connect and Site-to-Site VPN using BGP. Which route is preferred?
    a: The Direct Connect route is preferred for matching prefixes.
    facts: [dx-routes]
diagrams:
  - id: direct-connect-vpn-flow
    title: IPsec VPN over Direct Connect
    width: 800
    height: 160
    nodes:
      - { id: customer, label: Customer router, x: 30, y: 40, w: 150, h: 72, tone: neutral }
      - { id: dx, label: Direct Connect, icon: direct-connect, x: 300, y: 40, w: 160, h: 72, tone: network }
      - { id: vpn, label: VPN endpoint, icon: site-to-site-vpn, x: 610, y: 40, w: 160, h: 72, tone: network }
    edges:
      - { from: customer, to: dx, step: 1 }
      - { from: dx, to: vpn, step: 2 }
    steps:
      - The customer connects to a Direct Connect location.
      - A public virtual interface reaches the VPN endpoint for IPsec tunnels.
---
AWS Direct Connect links an internal network to AWS without using internet service providers in the connection path. A private path is not automatically an encrypted path.

### How it works

1. Connect your network to a Direct Connect location. A virtual interface is a logical connection to an AWS destination.
2. Choose a private interface for a virtual private cloud (VPC), an isolated AWS network, a public interface for public AWS services, or a transit interface for transit gateways through a Direct Connect gateway.
3. If encryption is required, use Site-to-Site VPN tunnels, encrypted links using IPsec, over a public interface, or MACsec, link-level encryption, on a supported connection. IPsec encrypts between VPN endpoints; MACsec encrypts the link between the customer device and the Direct Connect device.
4. For a backup, configure Site-to-Site VPN separately. A virtual private gateway routes between a VPC and these connections. For matching destination prefixes at that gateway, Direct Connect routes learned through Border Gateway Protocol (BGP), a way to exchange routes, take priority over VPN routes, subject to endpoint health.

### Exam cues

- If the question says traffic must remain encrypted when MACsec negotiation fails, think `must_encrypt`, because `should_encrypt` can fall back to cleartext.
- If the question says the Direct Connect link fails, think a separately configured Site-to-Site VPN backup, because it can carry VPC traffic.
- If the question says protect against a location failure, think connections at multiple Direct Connect locations, because a single location remains a shared failure point.

### Remember

- Direct Connect does not encrypt traffic by default.
- MACsec supports dedicated 10, 100 and 400 Gbps connections at selected locations, not hosted connections.
- New MACsec-enabled connections default to `should_encrypt`.

> **Trap:** MACsec does not provide end-to-end encryption across multiple network segments. Use IPsec when protection between VPN endpoints is required.
