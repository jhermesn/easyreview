---
title: Private connectivity and encryption
level: associate
order: 10
facts:
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
  - id: dx-bgp
    text: BGP exchanges routing information between AWS and remote endpoints.
    source: https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-site-to-site-vpn.html
  - id: dx-redundancy
    text: High resiliency uses separate Direct Connect connections at multiple locations to protect against connectivity and location failures.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html#high_resiliency
  - id: bgp-path-order
    text: "On private and transit virtual interfaces, Direct Connect selects routes by longest prefix first, then local preference BGP communities, then AS_PATH length, then MED; local preference communities are recommended for active/passive paths."
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/routing-and-bgp.html
  - id: private-ip-vpn
    text: "Private IP Site-to-Site VPN runs IPsec over Direct Connect without public IP addresses, encrypting traffic between on premises and AWS."
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/private-ip-dx.html
cards:
  - id: direct-connect-001
    q: A company uses AWS Direct Connect and requires encryption in transit. What options should it consider?
    a: Use an IPsec VPN over Direct Connect, or MACsec on a supported connection. MACsec protects the point-to-point link, not every network segment.
    trap: true
    facts: [dx-no-default-encryption, dx-vpn, dx-macsec-scope]
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
  - id: direct-connect-008
    q: How does AWS Direct Connect select between routes on private and transit virtual interfaces?
    a: Longest prefix comes first, then local preference communities, AS_PATH length, and MED.
    facts: [bgp-path-order]
  - id: direct-connect-015
    q: "Does AWS Direct Connect encrypt traffic in transit by default?"
    a: "No. Add encryption in transit, such as an IPsec VPN over the connection or MACsec on a supported connection."
    facts: [dx-no-default-encryption]
  - id: direct-connect-016
    q: "A regulated company needs IPsec encryption over its Direct Connect link without exposing any public IP addresses. Which option fits?"
    a: "**Private IP Site-to-Site VPN** over Direct Connect. It encrypts the traffic without public tunnel addresses."
    facts: [private-ip-vpn]
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
revised:
  - date: 2026-11-23
    note: The routing card now tests route selection order on private and transit virtual interfaces.
    cards: [direct-connect-008]
---
Direct Connect encryption builds on its private network connection. A private path is not automatically an encrypted path.

### How it works

1. Create a virtual interface, a logical connection to an AWS destination.
2. If encryption is required, use Site-to-Site VPN tunnels, encrypted links using IPsec, over a public interface, or MACsec, link-level encryption, on a supported connection. IPsec encrypts between VPN endpoints; MACsec encrypts the link between the customer device and the Direct Connect device.
3. To encrypt traffic without public IP addresses, use private IP Site-to-Site VPN over Direct Connect. For active and passive private virtual interfaces, use local preference Border Gateway Protocol (BGP) communities to influence route selection. Private IP VPN and routing

### Exam cues

- If the question says traffic must remain encrypted when MACsec negotiation fails, think `must_encrypt`, because `should_encrypt` can fall back to cleartext.
- If the question says IPsec without public IP addresses, think private IP Site-to-Site VPN over Direct Connect, because it encrypts traffic without public tunnel addresses.
- If the question says prefer one private interface as active and another as passive, think local preference BGP communities, because AWS recommends them for active and passive paths.

### Remember

- Direct Connect does not encrypt traffic by default.
- MACsec supports dedicated 10, 100 and 400 Gbps connections at selected locations, not hosted connections.
- New MACsec-enabled connections default to `should_encrypt`.

> **Trap:** MACsec does not provide end-to-end encryption across multiple network segments. Use IPsec when protection between VPN endpoints is required.
