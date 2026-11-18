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
  - id: tgw-ecmp
    text: "AWS Transit Gateway supports ECMP routing, which can be turned on for VPN attachments to spread traffic across several VPN tunnels."
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html#tgw-ecmp
  - id: route-propagation
    text: "With a virtual private gateway, enable route propagation on the subnet route tables so the VPN static prefixes or BGP routes appear there when the connection is up."
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/SetUpVPNConnections.html#vpn-configure-routing
  - id: cgw-behind-nat
    text: "If the customer gateway device sits behind NAT, register the NAT device public IP address as the customer gateway address and allow UDP 500 and 4500 for NAT traversal."
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/cgw-options.html
  - id: second-cgw
    text: "A second Site-to-Site VPN connection with a second customer gateway device protects against losing connectivity when one customer device fails and allows maintenance on a device."
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-redundant-connection.html
  - id: tunnel-auth
    text: "Site-to-Site VPN tunnel endpoints authenticate with a pre-shared key, the default, or with certificates."
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-tunnel-authentication-options.html
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
  - id: site-to-site-vpn-004
    q: A company needs encrypted Direct Connect traffic without public IP addresses. Which VPN option fits?
    a: "Private IP Site-to-Site VPN over Direct Connect."
    facts: [private-ip-dx]
  - id: site-to-site-vpn-009
    q: A team assumes Direct Connect encrypts traffic by default. What should it know before using Site-to-Site VPN?
    a: "Direct Connect does not encrypt traffic by default. Private IP Site-to-Site VPN can encrypt it without public IP addresses."
    trap: true
    facts: [dx-encryption, private-ip-dx]
  - id: site-to-site-vpn-016
    q: "A Site-to-Site VPN is up, but instances cannot reach on-premises hosts. The VPC uses a virtual private gateway. What is often missing?"
    a: "Route propagation (or static routes) in the subnet route tables toward the virtual private gateway."
    facts: [route-propagation]
---
AWS Site-to-Site VPN connects an on-premises network to a virtual private cloud (VPC), an isolated virtual network in AWS, using IPsec, a protocol for securing IP traffic. Each connection has two encrypted tunnels for availability.

### How it works

1. Define a customer gateway resource describing the physical or software device on your network.
2. Select an AWS endpoint: a virtual private gateway for one VPC, or a transit gateway for multiple VPCs and on-premises networks.
3. Configure both tunnels on the customer device. They terminate in different Availability Zones, and traffic can use the available tunnel if one fails.
4. Configure VPC route tables to send traffic for the remote network to the AWS gateway.

### Exam cues

- If the question says encrypt Direct Connect traffic without public addresses, think private IP Site-to-Site VPN, because it encrypts traffic over Direct Connect.
- If the question says a VPN is up but VPC instances cannot reach the remote network, think subnet route tables, because route propagation can add VPN routes for a virtual private gateway. [Configure routing](https://docs.aws.amazon.com/vpn/latest/s2svpn/SetUpVPNConnections.html#vpn-configure-routing)
- If the question asks for tunnel bandwidth, think standard or Large Bandwidth Tunnels, because their per-tunnel limits differ. [Tunnel bandwidth options](https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html#tunnel-bandwidth-options)

### Remember

- Standard tunnels support up to 1.25 Gbps each by default; Large Bandwidth Tunnels support up to 5 Gbps each.
- Both tunnels must use the same bandwidth setting. Large Bandwidth Tunnels require Transit Gateway or Cloud WAN and a fixed customer gateway IP address.
- Large Bandwidth Tunnels do not support accelerated VPN.
- Direct Connect does not encrypt traffic by default.

> **Trap:** A virtual private gateway cannot use Large Bandwidth Tunnels. Use Transit Gateway or Cloud WAN for that option.
