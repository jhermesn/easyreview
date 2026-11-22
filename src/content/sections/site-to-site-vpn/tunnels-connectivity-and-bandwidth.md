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
  - id: target-gateways
    text: A virtual private gateway attaches to one VPC; a transit gateway connects multiple VPCs and on-premises networks.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#concepts
  - id: two-tunnels
    text: Each VPN connection has two encrypted tunnels, which can both be used for high availability.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#concepts
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
  - id: private-ip-dx
    text: Private IP Site-to-Site VPN can encrypt Direct Connect traffic without public IP addresses.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/Examples.html#private-ip-direct-connect
  - id: dx-encryption
    text: Direct Connect does not encrypt traffic in transit by default.
    source: https://docs.aws.amazon.com/directconnect/latest/UserGuide/encryption-in-transit.html
  - id: route-propagation
    text: "With a virtual private gateway, enable route propagation on the subnet route tables so the VPN static prefixes or BGP routes appear there when the connection is up."
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/SetUpVPNConnections.html#vpn-configure-routing
  - id: cgw-behind-nat
    text: "If the customer gateway device sits behind NAT, register the NAT device public IP address as the customer gateway address and allow UDP 500 and 4500 for NAT traversal."
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/cgw-options.html
  - id: tunnel-auth
    text: "Site-to-Site VPN tunnel endpoints authenticate with a pre-shared key, the default, or with certificates."
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-tunnel-authentication-options.html
  - id: vpn-pricing
    text: "AWS Site-to-Site VPN charges for each connection-hour the connection is provisioned, with partial hours billed as full hours, plus standard data transfer charges."
    source: https://aws.amazon.com/vpn/pricing/
  - id: certificate-no-ip
    text: A public Site-to-Site VPN using a private certificate from AWS Private CA does not require a customer gateway IP address.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/cgw-options.html
  - id: cgw-static-ip
    text: When specified, the Site-to-Site VPN customer gateway IP address must be static.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/cgw-options.html
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
  - id: site-to-site-vpn-019
    q: "What does an AWS Site-to-Site VPN connection cost while it is provisioned but idle?"
    a: "The hourly connection charge still applies; data transfer charges add only for traffic sent."
    facts: [vpn-pricing]
  - id: site-to-site-vpn-021
    q: Must a public AWS Site-to-Site VPN customer gateway have an IP address when using a private certificate from AWS Private CA?
    a: No. An IP address is not required for that public VPN configuration.
    facts: [certificate-no-ip]
---
AWS Site-to-Site VPN connects an on-premises network to a virtual private cloud (VPC), an isolated virtual network in AWS, using IPsec, a protocol for securing IP traffic. Each connection has two encrypted tunnels for availability.

### How it works

1. Select an AWS endpoint: a virtual private gateway for one VPC, or a transit gateway for multiple VPCs and on-premises networks.
2. Configure the customer gateway device. The connection has two tunnels that terminate in different Availability Zones.
3. Configure VPC route tables to send traffic for the remote network to the AWS gateway.

### Exam cues

- If the question says a public Site-to-Site VPN customer gateway uses a private certificate, think an IP address is optional, because that certificate configuration does not require one.
- If the question says encrypt Direct Connect traffic without public addresses, think private IP Site-to-Site VPN, because it encrypts traffic over Direct Connect.
- If the question says a VPN is up but VPC instances cannot reach the remote network, think subnet route tables, because route propagation can add VPN routes for a virtual private gateway.
- If the question asks for tunnel bandwidth, think standard or Large Bandwidth Tunnels, because their per-tunnel limits differ.

### Remember

- Standard tunnels support up to 1.25 Gbps each by default; Large Bandwidth Tunnels support up to 5 Gbps each.
- Both tunnels must use the same bandwidth setting. Large Bandwidth Tunnels require Transit Gateway or Cloud WAN and a fixed customer gateway IP address.
- Large Bandwidth Tunnels do not support accelerated VPN.
- Direct Connect does not encrypt traffic by default.
- Pricing: per connection-hour (partial hours round up) plus data transfer.

> **Trap:** A virtual private gateway cannot use Large Bandwidth Tunnels. Use Transit Gateway or Cloud WAN for that option.
