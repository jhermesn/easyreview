---
title: Tunnels, connectivity, and bandwidth
level: associate
order: 10
facts:
  - id: secure-connection
    text: Site-to-Site VPN connects an on-premises network to VPCs using IPsec.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#VPC_VPN
  - id: vpc
    text: A VPC is a logically isolated virtual network in AWS.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html
  - id: gateway-roles
    text: A customer gateway is an AWS resource describing the customer gateway device, which is physical or software equipment on the customer side.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#concepts
  - id: target-gateways
    text: A virtual private gateway attaches to one VPC; a transit gateway connects multiple VPCs and on-premises networks.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#concepts
  - id: two-tunnels
    text: Each VPN connection has two encrypted tunnels, which can both be used for high availability.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#concepts
  - id: tunnel-failover
    text: Configure both tunnels for redundancy; when one becomes unavailable traffic automatically uses the available tunnel.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html
  - id: tunnel-zones
    text: Each tunnel terminates in a different Availability Zone.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html
  - id: routing
    text: Configure the customer gateway device and VPC route tables to direct traffic for the remote network to the AWS gateway.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/Examples.html#SingleVPN
  - id: bandwidth
    text: Standard tunnel bandwidth is up to 1.25 Gbps per tunnel by default; Large Bandwidth Tunnels support up to 5 Gbps per tunnel.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html#tunnel-bandwidth-options
  - id: large-restrictions
    text: Large Bandwidth Tunnels require a transit gateway or Cloud WAN, both tunnels must use the same bandwidth, and accelerated VPN is not supported.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html#lbt-requirements
  - id: large-fixed-ip
    text: Large Bandwidth Tunnels require a customer gateway with a fixed IP address.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html#lbt-requirements
  - id: ecmp
    text: Equal Cost Multi Path routing across multiple VPN connections can increase aggregate bandwidth beyond that of a single tunnel.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html#lbt-scaling
  - id: dx-backup
    text: Large Bandwidth Tunnels can provide backup or overlay connectivity for Direct Connect circuits.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html#large-bandwidth-tunnels
  - id: private-ip-dx
    text: Private IP Site-to-Site VPN can encrypt Direct Connect traffic without public IP addresses.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/Examples.html#private-ip-direct-connect
  - id: outside-addresses
    text: Outside tunnel address options include public IPv4, private IPv4 and IPv6; public IPv4 is the default.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/create-vpn-connection.html#create-vpn-connection-console
  - id: dx-encryption
    text: Direct Connect does not encrypt traffic in transit by default.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/encryption-in-transit.html
  - id: route-options
    text: Site-to-Site VPN supports static routing or dynamic routing using BGP; Cloud WAN VPN connections support BGP but not static routing.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/create-vpn-connection.html#create-vpn-connection-console
  - id: ipv6-limits
    text: VPN connections on a virtual private gateway do not support IPv6 traffic, and a single connection cannot carry both IPv4 and IPv6 traffic simultaneously.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#site-to-site-limitations
diagrams:
  - id: vpn-two-tunnels
    title: Two VPN tunnels
    width: 800
    height: 300
    nodes:
      - { id: customer, label: Customer device, x: 20, y: 112, w: 160, h: 72, tone: network }
      - { id: tunnel1, label: Tunnel 1, x: 305, y: 20, w: 150, h: 72, tone: network, icon: site-to-site-vpn }
      - { id: tunnel2, label: Tunnel 2, x: 305, y: 208, w: 150, h: 72, tone: network, icon: site-to-site-vpn }
      - { id: aws, label: Transit gateway, x: 620, y: 112, w: 160, h: 72, tone: network, icon: transit-gateway }
    edges:
      - { from: customer, to: tunnel1, step: 1 }
      - { from: tunnel1, to: aws, step: 2 }
      - { from: customer, to: tunnel2, step: 3 }
      - { from: tunnel2, to: aws, step: 4 }
    steps:
      - Configure the first encrypted tunnel.
      - The first tunnel reaches the AWS gateway.
      - Configure the second encrypted tunnel for redundancy.
      - The second tunnel reaches the AWS gateway in another Availability Zone.
cards:
  - id: site-to-site-vpn-001
    q: What are the tunnel and bandwidth options for AWS Site-to-Site VPN?
    a: "Each connection has two encrypted tunnels. Standard bandwidth is up to 1.25 Gbps per tunnel by default; Large Bandwidth Tunnels support up to 5 Gbps per tunnel on Transit Gateway or Cloud WAN."
    facts: [two-tunnels, bandwidth, large-restrictions]
  - id: site-to-site-vpn-002
    q: A company needs its Site-to-Site VPN to survive an AWS tunnel outage. What should it configure?
    a: "Configure both tunnels. If one becomes unavailable, traffic uses the available tunnel."
    facts: [tunnel-failover]
  - id: site-to-site-vpn-003
    q: Can a Site-to-Site VPN attached to a virtual private gateway use Large Bandwidth Tunnels?
    a: "No. Large Bandwidth Tunnels require Transit Gateway or Cloud WAN."
    trap: true
    facts: [large-restrictions]
  - id: site-to-site-vpn-004
    q: A company needs encrypted Direct Connect traffic without public IP addresses. Which VPN option fits?
    a: "Private IP Site-to-Site VPN over Direct Connect."
    facts: [private-ip-dx]
  - id: site-to-site-vpn-005
    q: What can provide backup connectivity for a Direct Connect circuit?
    a: "A Site-to-Site VPN Large Bandwidth Tunnel can provide backup connectivity."
    facts: [dx-backup]
  - id: site-to-site-vpn-006
    q: How can a Site-to-Site VPN design scale aggregate bandwidth beyond one large tunnel?
    a: "Use Equal Cost Multi Path routing across multiple VPN connections."
    facts: [ecmp]
  - id: site-to-site-vpn-007
    q: What is the difference between a Site-to-Site VPN customer gateway and customer gateway device?
    a: "The customer gateway is an AWS resource describing the device. The device is physical or software equipment on the customer side."
    facts: [gateway-roles]
  - id: site-to-site-vpn-008
    q: What outside tunnel address types can an AWS Site-to-Site VPN use, and what is the default?
    a: "Public IPv4, private IPv4 or IPv6. Public IPv4 is the default."
    facts: [outside-addresses]
  - id: site-to-site-vpn-009
    q: A team assumes Direct Connect encrypts traffic by default. What should it know before using Site-to-Site VPN?
    a: "Direct Connect does not encrypt traffic by default. Private IP Site-to-Site VPN can encrypt it without public IP addresses."
    trap: true
    facts: [dx-encryption, private-ip-dx]
  - id: site-to-site-vpn-010
    q: A Cloud WAN Site-to-Site VPN needs to exchange routes dynamically. Which routing protocol is required?
    a: "Use BGP. Cloud WAN VPN connections do not support static routing."
    facts: [route-options]
  - id: site-to-site-vpn-011
    q: Can one Site-to-Site VPN connection carry both IPv4 and IPv6 traffic simultaneously?
    a: "No. Separate VPN connections are needed; a virtual private gateway VPN does not support IPv6 traffic."
    trap: true
    facts: [ipv6-limits]
---
AWS Site-to-Site VPN connects an on-premises network to a virtual private cloud (VPC), an isolated virtual network in AWS, using IPsec, a protocol for securing IP traffic. Each connection has two encrypted tunnels for availability.

### How it works

1. Define a customer gateway resource describing the physical or software device on your network.
2. Select an AWS endpoint: a virtual private gateway for one VPC, or a transit gateway for multiple VPCs and on-premises networks.
3. Configure both tunnels on the customer device. They terminate in different Availability Zones, and traffic can use the available tunnel if one fails.
4. Configure VPC route tables to send traffic for the remote network to the AWS gateway.

### Exam cues

- If the question says a Direct Connect circuit needs a backup, think Site-to-Site VPN, because Large Bandwidth Tunnels can provide backup connectivity.
- If the question says encrypt Direct Connect traffic without public addresses, think private IP Site-to-Site VPN, because it encrypts traffic over Direct Connect.
- If the question says more aggregate bandwidth than one large tunnel is needed, think Equal Cost Multi Path routing across multiple VPN connections, because it can spread traffic over multiple paths.

### Remember

- Standard tunnels support up to 1.25 Gbps each by default; Large Bandwidth Tunnels support up to 5 Gbps each.
- Both tunnels must use the same bandwidth setting. Large Bandwidth Tunnels require Transit Gateway or Cloud WAN and a fixed customer gateway IP address.
- Large Bandwidth Tunnels do not support accelerated VPN.
- Outside addresses can be public IPv4, private IPv4 or IPv6; public IPv4 is the default.
- Routing can be static or dynamic using Border Gateway Protocol (BGP), which exchanges routes. Cloud WAN VPN connections require BGP.
- One VPN connection cannot carry both IPv4 and IPv6 traffic simultaneously. A virtual private gateway VPN does not support IPv6 traffic.
- Direct Connect does not encrypt traffic by default.

> **Trap:** A virtual private gateway cannot use Large Bandwidth Tunnels. Use Transit Gateway or Cloud WAN for that option.
