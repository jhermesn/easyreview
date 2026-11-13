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
    text: A public NAT gateway in a public subnet uses an Elastic IP and routes through an internet
      gateway to support outbound internet access from private instances.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html#vpc-nat-gateway
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
    text: An egress-only internet gateway supports outbound IPv6 connections and their responses while
      preventing unsolicited inbound IPv6 connections.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html#egress-only-internet-gateway
  - id: ipv6-route
    text: To use an egress-only internet gateway, add a route such as ::/0 targeting it.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html#egress-only-internet-gateway-basics
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
    a: Create a zonal NAT gateway per AZ and route each private subnet to its local AZ gateway.
    facts:
      - nat-zonal
  - id: vpc-016
    q: IPv6 instances need internet connections initiated only from inside the VPC. Which gateway and
      route fit?
    a: An egress-only internet gateway with an IPv6 default route ::/0 targeting it. It permits
      responses but prevents unsolicited inbound connections.
    facts:
      - ipv6-egress
      - ipv6-route
  - id: vpc-017
    q: Which controls protect a zonal NAT gateway, and how does its bandwidth scale?
    a: Use subnet ACLs and instance security groups; the gateway itself cannot have a security group.
      Its bandwidth automatically scales from 5 Gbps to 100 Gbps.
    facts:
      - nat-security
      - nat-bandwidth
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
---

A VPC route table chooses where traffic goes. Each route pairs a destination address range with a target, such as a gateway or a peering connection. Peering provides a direct private path between two VPCs when their address ranges do not overlap.

### How it works

1. Find the subnet's route table. It uses the main table unless you explicitly associate another one.
2. Match the destination using the most specific route. A CIDR block is an address range written with a prefix length; a longer matching prefix is more specific.
3. For peering, request and accept the connection, add routes to the peer ranges on both sides, and permit traffic in the security controls.
4. For private IPv4 internet egress, route to a public NAT gateway, which translates source addresses. It needs a public subnet, an Elastic IP address, and a path through an internet gateway.
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

- If the question says peering is active but communication fails, think routes and security controls on both sides, because acceptance alone does not configure them.
- If the question says B and C must communicate through their shared peer A, think non-transitive peering, because a peering connection is a direct relationship only.
- If the question says zonal NAT internet access must survive another AZ's outage, think a local NAT gateway per AZ, because sharing one creates an AZ dependency.
- If the question says IPv6 clients need outbound access without unsolicited inbound access, think `::/0` to an egress-only internet gateway, because it permits initiated connections and their responses.

### Remember

- Each subnet uses one route table; several subnets can share it.
- Zonal NAT bandwidth scales automatically from 5 Gbps to 100 Gbps. NAT gateways have no security groups.
- Peering does not share a peer's internet gateway, NAT, VPN, Direct Connect, or S3 gateway endpoint.

> **Trap:** Transit Gateway does not solve overlapping VPC address ranges. It also cannot route between VPCs whose CIDRs overlap.
