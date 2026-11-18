---
title: "PLACEHOLDER site-to-site-vpn/design-details"
level: associate
order: 30
facts:
  - id: tunnel-failover
    text: Configure both tunnels for redundancy; when one becomes unavailable traffic automatically uses the available tunnel.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html
  - id: large-restrictions
    text: Large Bandwidth Tunnels require a transit gateway or Cloud WAN, both tunnels must use the same bandwidth, and accelerated VPN is not supported.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html#lbt-requirements
  - id: dx-backup
    text: Large Bandwidth Tunnels can provide backup or overlay connectivity for Direct Connect circuits.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html#large-bandwidth-tunnels
  - id: ecmp
    text: Equal Cost Multi Path routing across multiple VPN connections can increase aggregate bandwidth beyond that of a single tunnel.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNTunnels.html#lbt-scaling
  - id: gateway-roles
    text: A customer gateway is an AWS resource describing the customer gateway device, which is physical or software equipment on the customer side.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#concepts
  - id: outside-addresses
    text: Outside tunnel address options include public IPv4, private IPv4 and IPv6; public IPv4 is the default.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/create-vpn-connection.html#create-vpn-connection-console
  - id: route-options
    text: Site-to-Site VPN supports static routing or dynamic routing using BGP; Cloud WAN VPN connections support BGP but not static routing.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/create-vpn-connection.html#create-vpn-connection-console
  - id: ipv6-limits
    text: VPN connections on a virtual private gateway do not support IPv6 traffic, and a single connection cannot carry both IPv4 and IPv6 traffic simultaneously.
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html#site-to-site-limitations
  - id: tgw-ecmp
    text: "AWS Transit Gateway supports ECMP routing, which can be turned on for VPN attachments to spread traffic across several VPN tunnels."
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html#tgw-ecmp
  - id: second-cgw
    text: "A second Site-to-Site VPN connection with a second customer gateway device protects against losing connectivity when one customer device fails and allows maintenance on a device."
    source: https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-redundant-connection.html
cards:
  - id: site-to-site-vpn-002
    q: A company needs its Site-to-Site VPN to survive an AWS tunnel outage. What should it configure?
    a: "Configure both tunnels. If one becomes unavailable, traffic uses the available tunnel."
    facts: [tunnel-failover]
  - id: site-to-site-vpn-003
    q: Can a Site-to-Site VPN attached to a virtual private gateway use Large Bandwidth Tunnels?
    a: "No. Large Bandwidth Tunnels require Transit Gateway or Cloud WAN."
    trap: true
    facts: [large-restrictions]
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
  - id: site-to-site-vpn-010
    q: A Cloud WAN Site-to-Site VPN needs to exchange routes dynamically. Which routing protocol is required?
    a: "Use BGP. Cloud WAN VPN connections do not support static routing."
    facts: [route-options]
  - id: site-to-site-vpn-011
    q: Can one Site-to-Site VPN connection carry both IPv4 and IPv6 traffic simultaneously?
    a: "No. Separate VPN connections are needed; a virtual private gateway VPN does not support IPv6 traffic."
    trap: true
    facts: [ipv6-limits]
  - id: site-to-site-vpn-015
    q: "Traffic over Site-to-Site VPN has outgrown one connection. Which design raises aggregate VPN throughput?"
    a: "Terminate the VPN connections on a transit gateway with ECMP turned on and add more VPN tunnels. Transfer Acceleration and Global Accelerator do not apply to VPN links."
    facts: [tgw-ecmp, ecmp]
  - id: site-to-site-vpn-018
    q: "A Site-to-Site VPN already has two tunnels, but both end on a single on-premises router. How can the design survive that router failing?"
    a: "Add a **second VPN connection to a second customer gateway device**. The two tunnels protect the AWS side; the customer device stays a single point of failure."
    trap: true
    facts: [second-cgw]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
