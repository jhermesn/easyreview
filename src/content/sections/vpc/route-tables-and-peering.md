---
title: Route tables and peering
level: associate
order: 20
facts:
  - id: route-pair
    text: Each VPC route specifies a destination address range or prefix list and a target for matching
      traffic.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html#VPC_Route_Tables
  - id: route-association
    text: A subnet uses one route table; without an explicit association it uses the main route table,
      and multiple subnets may share a table.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/subnet-route-tables.html#subnet-route-tables
  - id: route-prefix
    text: VPC routing normally selects the most specific matching destination, called longest prefix
      match.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/route-tables-priority.html#route-table-longest-prefix-match
  - id: route-defaults
    text: The default route 0.0.0.0/0 matches all IPv4 addresses; ::/0 matches all IPv6 addresses, and
      the two protocols have separate routes.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/subnet-route-tables.html#route-table-routes
  - id: peer-setup
    text: Peering requires request acceptance, routes to the peer range on both sides, and security
      controls that permit the traffic.
    source: https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html#vpc-peering-basics
  - id: peer-overlap
    text: VPC peering does not support matching or overlapping IPv4 or IPv6 CIDR blocks.
    source: https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html#vpc-peering-limitations
  - id: peer-nontransitive
    text: "Peering is not transitive: two VPCs peered with the same VPC do not gain connectivity to each
      other through it."
    source: https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html#vpc-peering-limitations
  - id: peer-edge
    text: A peer cannot use another VPC internet gateway, NAT device, VPN, Direct Connect connection, or
      S3 gateway endpoint through the peering connection.
    source: https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html#vpc-peering-limitations
  - id: tgw-overlap
    text: Transit Gateway also cannot route between attached VPCs with identical or overlapping CIDRs;
      overlapping attachment routes are not propagated.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/tgw-vpc-attachments.html#tgw-vpc-attachments
  - id: nat-public
    text: "A zonal public NAT gateway uses a public subnet and an Elastic IP for private-instance internet egress. It changes the instance source IPv4 address to its own private IPv4 address; the internet gateway maps that address to its Elastic IP. NAT reverses the translation for replies."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html
  - id: nat-private
    text: A private NAT gateway supports private connectivity, has no Elastic IP, and cannot provide
      internet egress through an internet gateway.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html#vpc-nat-gateway
  - id: nat-zonal
    text: A zonal NAT gateway is redundant within its AZ; using one per AZ and routing each AZ to its
      own gateway avoids dependence on another AZ for egress.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html#nat-gateway-basics
  - id: nat-security
    text: NAT gateways cannot have security groups; subnet ACLs and instance security groups control
      their traffic.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html#nat-gateway-basics
  - id: nat-bandwidth
    text: A zonal NAT gateway starts with 5 Gbps of bandwidth and automatically scales up to 100 Gbps.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html#nat-gateway-basics
  - id: ipv6-egress
    text: "An egress-only internet gateway is horizontally scaled, redundant and highly available. It permits outbound IPv6 connections and their responses while blocking unsolicited inbound IPv6 connections."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html
  - id: ipv6-route
    text: To use an egress-only internet gateway, add a route such as ::/0 targeting it.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html#egress-only-internet-gateway-basics
  - id: inter-region-peering
    text: "VPC peering also works between VPCs in different Regions; their resources talk over private IP addresses without a gateway or VPN, and inter-Region traffic is encrypted."
    source: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html#what-is-vpc-peering
  - id: local-route
    text: "By default, every route table holds a local route for each VPC CIDR, so subnets of the VPC can reach one another; a route more specific than the local one has to cover a whole subnet CIDR and point at a Gateway Load Balancer endpoint, a network interface or a NAT gateway."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/subnet-route-tables.html#route-table-routes
  - id: igw-nat
    text: "For IPv4, an internet gateway translates an instance private address to its public IPv4 address; the instance sees its private address. IPv6 internet traffic uses the instance public IPv6 address directly, without this IPv4 address translation."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html#ip-addresses-and-nat
  - id: peer-accounts
    text: "VPC peering can connect VPCs in different AWS accounts, in the same Region or in different Regions."
    source: https://docs.aws.amazon.com/vpc/latest/peering/create-vpc-peering-connection.html
  - id: peer-sg-region
    text: "For a peered VPC in the same Region, a security group rule can reference its security group. Use the peer VPC CIDR block instead when the peer is in another Region."
    source: https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-security-groups.html
  - id: peer-dns
    text: "Peering DNS resolution defaults to off. When enabled, the public IPv4 DNS hostname of a peer instance resolves across the peering connection to that instance's private IPv4 address."
    source: https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-dns.html
  - id: peering-backbone
    text: "Inter-Region VPC peering traffic stays in private IP address space, is encrypted, and stays on the AWS global backbone without crossing the public internet."
    source: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
  - id: middlebox-routing
    text: "A route more specific than the local route, matching a whole subnet CIDR, can send traffic between subnets in a VPC through a middlebox such as a Gateway Load Balancer endpoint, Network Firewall endpoint or appliance network interface."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/route-table-options.html#route-tables-appliance-routing
  - id: nat64-translation
    text: "NAT64 enables IPv6-only resources to communicate with IPv4 resources."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-nat64-dns64.html
  - id: peering-vpcs-only
    text: "A VPC peering connection connects two VPCs; an on-premises network is not a VPC peer."
    source: https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html
cards:
  - id: vpc-011
    q: A VPC subnet has no explicit route-table association. Which table directs its traffic?
    a: The main route table. Every subnet uses exactly one route table.
    facts:
      - route-association
  - id: vpc-012
    q: A VPC route table has a default internet route and a more specific route to a peer network. Which
      route handles the peer addresses?
    a: The more specific peer route. VPC routing uses longest prefix match.
    facts:
      - route-prefix
  - id: vpc-013
    q: VPC A peers with B and C. Can B reach C through A without another connection?
    a: No. VPC peering is not transitive; B and C need their own direct connection or another suitable
      routing design.
    trap: true
    facts:
      - peer-nontransitive
  - id: vpc-014
    q: Two VPCs use overlapping address ranges. Does replacing peering with Transit Gateway fix their
      routing?
    a: No. Neither peering nor Transit Gateway supports routing between overlapping VPC CIDRs.
    trap: true
    facts:
      - peer-overlap
      - tgw-overlap
  - id: vpc-015
    q: Instances in several AZs share one zonal NAT gateway. How should the team remove the shared AZ
      dependency for internet egress?
    a: Create a zonal NAT gateway in each AZ. Route each private subnet to the gateway in its own AZ.
    facts:
      - nat-zonal
  - id: vpc-016
    q: "Which Amazon VPC route sends general IPv6 internet traffic through an egress-only internet gateway?"
    a: "Add an IPv6 default route, ::/0, targeting the egress-only internet gateway."
    facts: [ipv6-route]
  - id: vpc-017
    q: Which controls protect a zonal NAT gateway, and how does its bandwidth scale?
    a: Use subnet ACLs and instance security groups; the gateway itself cannot have a security group.
      Its bandwidth automatically scales from 5 Gbps to 100 Gbps.
    facts:
      - nat-security
      - nat-bandwidth
  - id: vpc-048
    q: "EC2 instances in VPCs in Ohio and N. Virginia must exchange data privately. What is the simplest setup?"
    a: "An inter-Region VPC peering connection, plus routes to the peer CIDR in each route table."
    facts: [inter-region-peering]
  - id: vpc-059
    q: "Traffic between two subnets of a VPC must pass through a firewall appliance. How can the route tables force that?"
    a: "Add a route more specific than the local route, matching the destination subnet CIDR and targeting the appliance network interface or a Gateway Load Balancer endpoint."
    facts: [local-route]
  - id: vpc-060
    q: "Does an EC2 instance with a public IPv4 address see that public address on its own network interface?"
    a: "No. The OS sees only the private address; the internet gateway translates to the public IPv4 address."
    trap: true
    facts: [igw-nat]
  - id: vpc-066
    q: "Can an Amazon VPC use a peered VPC internet gateway or NAT device for internet access?"
    a: "No. A peer cannot use another VPC internet gateway or NAT device through the peering connection."
    facts: [peer-edge]
  - id: vpc-067
    q: "Instances in peered VPCs call each other by public DNS hostname, and the traffic resolves to public IP addresses. How can the hostnames resolve to private IPs?"
    a: "Turn on **DNS resolution for the peering connection** (off by default). Public IPv4 DNS hostnames then resolve to private IPv4 addresses."
    facts: [peer-dns]
  - id: vpc-091
    q: "Does an Amazon VPC internet gateway translate a public IPv6 address the same way it translates an instance private IPv4 address?"
    a: "No. IPv6 uses the assigned public IPv6 address directly; IPv4 uses address translation at the internet gateway."
    facts: [igw-nat]
  - id: vpc-094
    q: "What availability properties does an Amazon VPC egress-only internet gateway have?"
    a: "It is horizontally scaled, redundant and highly available."
    facts: [ipv6-egress]
  - id: vpc-106
    q: "Does traffic over an inter-Region Amazon VPC peering connection cross the public internet?"
    a: "No. It stays in private IP space, is encrypted and stays on the AWS global backbone."
    facts: [peering-backbone]
  - id: vpc-107
    q: "What routes exist by default for Amazon VPC CIDR blocks?"
    a: "A local route for every VPC CIDR is in each route table by default, so subnets can reach one another."
    facts: [local-route]
  - id: vpc-111
    q: "Does Amazon VPC NAT64 provide native IPv6-to-IPv6 internet egress?"
    a: "No. NAT64 translates IPv6 traffic for IPv4 destinations. For outbound-only IPv6 internet access, use an egress-only internet gateway."
    facts: [nat64-translation, ipv6-egress]
  - id: vpc-117
    q: "Can an on-premises network be an endpoint of an Amazon VPC peering connection?"
    a: "No. VPC peering connects two VPCs."
    facts: [peering-vpcs-only]

diagrams:
  - id: vpc-direct-peering
    title: Peering needs routes on both sides
    width: 860
    height: 260
    nodes:
      - id: a
        label: VPC A
        sub: route to B via peering
        icon: virtual-private-cloud
        tone: network
        x: 30
        y: 100
        w: 230
        h: 86
      - id: b
        label: VPC B
        sub: route to A via peering
        icon: virtual-private-cloud
        tone: network
        x: 600
        y: 100
        w: 230
        h: 86
    edges:
      - from: a
        to: b
        label: private traffic
        step: 1
      - from: b
        to: a
        step: 2
        dashed: true
    steps:
      - Add a route for the peer destination range on the requester side.
      - Add a return route on the accepter side and allow traffic through the network controls.
revised:
  - date: 2026-11-23
    note: The IPv6 gateway card now tests the required route.
    cards: [vpc-016]
  - date: 2026-11-23
    note: The peering card now tests edge-to-edge routing restrictions.
    cards: [vpc-066]
  - date: 2026-11-23
    note: The IPv6 gateway card now tests availability properties.
    cards: [vpc-094]
  - date: 2026-11-23
    note: The subnet routing card now tests default local routes.
    cards: [vpc-107]
---

A VPC route table chooses where traffic goes. Each route pairs a destination address range with a target, such as a gateway or a peering connection. Peering provides a direct private path between two VPCs when their address ranges do not overlap.

### How it works

1. Find the subnet's route table. It uses the main table unless you explicitly associate another one.
2. Match the destination using the most specific route. A CIDR block is an address range written with a prefix length; a longer matching prefix is more specific.
3. For peering, request and accept the connection, add routes to the peer ranges on both sides, and permit traffic in the security controls.
4. For private IPv4 internet egress, route to a zonal public NAT gateway. It replaces instance source addresses with its own private IPv4 address; the internet gateway maps that address to the gateway Elastic IP. Replies reverse the translation. A zonal public NAT gateway needs a public subnet.
5. When using zonal NAT gateways, create one per AZ and route each AZ locally. An Availability Zone (AZ) is a separate location within a Region. For outbound-only IPv6, route to an egress-only internet gateway.

| Path | Target or requirement |
|---|---|
| All IPv4 destinations | `0.0.0.0/0` route |
| All IPv6 destinations | `::/0` route; IPv4 routes do not cover IPv6 |
| Direct private peer | Accepted peering, non-overlapping ranges, routes on both sides |
| Private IPv4 internet egress | Public NAT gateway, then internet gateway |
| Private connectivity through address translation | Private NAT gateway; no Elastic IP or internet egress |
| Outbound-only IPv6 internet access | Egress-only internet gateway |

### Exam cues

- If the question says connect an on-premises network as a VPC peer, think another hybrid connection, because VPC peering connects two VPCs.
- If the question says an IPv6-only workload must reach an IPv4 destination, think NAT64, because it translates traffic to IPv4.
- If the question says peering is active but communication fails, think routes and security controls on both sides, because acceptance alone does not configure them.
- If the question says B and C must communicate through their shared peer A, think non-transitive peering, because a peering connection is a direct relationship only.
- If the question says zonal NAT internet access must survive another AZ's outage, think a local NAT gateway per AZ, because sharing one creates an AZ dependency.
- If the question says IPv6 clients need outbound access without unsolicited inbound access, think `::/0` to an egress-only internet gateway, because it permits initiated connections and their responses.

### Remember

- Each subnet uses one route table; several subnets can share it.
- IPv6 internet traffic uses public IPv6 addresses directly; IPv4 uses translation at the internet gateway.
- An egress-only internet gateway is redundant, highly available and horizontally scaled.
- Zonal NAT bandwidth scales automatically from 5 Gbps to 100 Gbps. NAT gateways have no security groups.
- Peering does not share a peer's internet gateway, NAT, VPN, Direct Connect, or S3 gateway endpoint.
- Inter-Region peering traffic is encrypted and stays on the AWS backbone.
- A subnet-CIDR route more specific than the local route can send east-west traffic through a middlebox.

> **Trap:** Transit Gateway does not solve overlapping VPC address ranges. It also cannot route between VPCs whose CIDRs overlap.
