---
title: Attachments, route tables, and sharing
level: professional
order: 10
facts:
  - id: hub
    text: A transit gateway is a Regional virtual router connecting VPCs and on-premises networks.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html
  - id: vpc-subnet
    text: A VPC is a virtual network, and a subnet is a range of IP addresses in one Availability Zone.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#amazon-vpc-features
  - id: cidr
    text: CIDR notation represents VPC IP addresses.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html
  - id: attachments
    text: Attachments can connect VPCs, VPN connections, Direct Connect gateways, Connect attachments and peer transit gateways.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html#tgw-attachments-overview
  - id: subnet-zones
    text: A VPC attachment uses one subnet per enabled Availability Zone; resources in zones without an attachment cannot reach the transit gateway.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html#tgw-az-overview
  - id: subnet-routes
    text: VPC subnet route tables need routes to the transit gateway and attachment subnet route tables need routes to destinations within the VPC.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/tgw-vpc-attachments.html#vpc-attachment-routing-requirements
  - id: associations
    text: Each attachment can associate with one transit gateway route table; a table can associate with many attachments.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html#tgw-route-table-association-overview
  - id: propagation
    text: An attachment can propagate routes to one or more transit gateway route tables; VPC attachments propagate VPC CIDR blocks.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html#tgw-route-propagation-overview
  - id: static
    text: Transit gateway route tables can contain static routes, and a static route has priority over a propagated route with the same destination.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html#tgw-route-propagation-overview
  - id: isolation
    text: Additional transit gateway route tables can isolate subsets of attachments.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html#tgw-route-tables-overview
  - id: blackhole
    text: A blackhole route drops traffic matching the route.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html#tgw-route-tables-overview
  - id: overlap
    text: Transit Gateway does not route between VPCs with overlapping CIDR blocks; the new VPC's overlapping routes are not propagated.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/tgw-vpc-attachments.html
  - id: ram
    text: AWS RAM can share a transit gateway for VPC attachments across accounts or an organization.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/working-with-transit-gateways.html#transit-gateway-share
  - id: share-permissions
    text: A participant can create VPC attachments but cannot modify the shared transit gateway's route tables, associations or propagations.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/working-with-transit-gateways.html#transit-gateway-considerations
  - id: share-vpn
    text: A Site-to-Site VPN attachment must be created in the account that owns the transit gateway.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/working-with-transit-gateways.html#transit-gateway-considerations
  - id: appliance
    text: Appliance mode keeps a flow on the same Availability Zone for the appliance VPC attachment for the flow's lifetime.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html#tgw-az-overview
  - id: peering
    text: Transit gateway peering attachments require static routes.
    source: https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html#tgw-route-table-peering
diagrams:
  - id: transit-gateway-routing
    title: Traffic between attached VPCs
    width: 800
    height: 180
    nodes:
      - { id: source, label: Source subnet, x: 20, y: 54, w: 160, h: 72, tone: network }
      - { id: hub, label: Transit gateway, x: 320, y: 54, w: 160, h: 72, tone: network, icon: transit-gateway }
      - { id: dest, label: Target subnet, x: 620, y: 54, w: 160, h: 72, tone: network }
    edges:
      - { from: source, to: hub, step: 1 }
      - { from: hub, to: dest, step: 2 }
    steps:
      - The source subnet route sends remote traffic to the transit gateway.
      - The source attachment's associated route table selects the destination attachment.
cards:
  - id: transit-gateway-001
    q: How do Transit Gateway route tables segment traffic?
    a: "Associate each attachment with at most one route table and propagate its routes to one or more tables. Separate tables can isolate groups of attachments. VPC subnet routes are also required."
    facts: [associations, propagation, isolation, subnet-routes]
  - id: transit-gateway-002
    q: Ten accounts need to use one Transit Gateway for their VPCs. How can they share it?
    a: "Share the gateway using AWS RAM. Participants can create VPC attachments, but the owner controls transit gateway route tables."
    facts: [ram, share-permissions]
  - id: transit-gateway-003
    q: Two VPCs attached to Transit Gateway have overlapping CIDR blocks. Can the gateway route between them?
    a: "No. Use non-overlapping address ranges; overlapping routes for the new attachment are not propagated."
    trap: true
    facts: [overlap]
  - id: transit-gateway-004
    q: A VPC workload cannot reach Transit Gateway from one Availability Zone, despite a subnet route. What attachment setting should be checked?
    a: "Enable an attachment subnet in that Availability Zone. Resources in zones without an attachment cannot reach the gateway."
    facts: [subnet-zones]
  - id: transit-gateway-005
    q: A stateful firewall sits in an inspection VPC attached to Transit Gateway. What keeps a flow on the same appliance attachment Availability Zone?
    a: "Enable appliance mode on the VPC attachment."
    facts: [appliance]
  - id: transit-gateway-006
    q: What routes are required for a Transit Gateway peering attachment?
    a: "Create static routes pointing to the peering attachment."
    facts: [peering]
  - id: transit-gateway-007
    q: Can a participant create a Site-to-Site VPN attachment in its account on a Transit Gateway shared by another account?
    a: "No. The VPN attachment must be created in the gateway owner's account."
    trap: true
    facts: [share-vpn]
  - id: transit-gateway-008
    q: What happens when static and propagated Transit Gateway routes have the same destination?
    a: "The static route takes priority."
    facts: [static]
---
AWS Transit Gateway is a Regional virtual router that connects virtual private clouds (VPCs), which are isolated AWS networks, and on-premises networks. Think of it as a hub whose attachments connect networks and whose route tables choose paths.

### How it works

1. Attach VPCs, VPN connections or Direct Connect gateways. For a VPC, select one attachment subnet, a range of IP addresses, in each Availability Zone that needs gateway access.
2. Associate each attachment with a transit gateway route table. That table selects the destination attachment for traffic entering from the associated attachment.
3. Propagate routes, meaning install routes learned from an attachment, into one or more tables, or add static routes that you create yourself. Separate tables can isolate groups of attachments.
4. Add routes in VPC subnet tables toward the gateway and ensure attachment subnet tables can reach the target subnets. Configure return routes too.
5. To connect accounts, the owner shares the gateway through AWS Resource Access Manager (RAM); participants create VPC attachments and the owner manages gateway route tables.

### Exam cues

- If the question says attached VPC address ranges overlap, think renumbering, because Transit Gateway does not route between overlapping VPC CIDR blocks, the notation used for IP address ranges.
- If the question says a stateful firewall must keep a flow in one Availability Zone, think appliance mode, because it keeps the flow on the same appliance attachment zone.
- If the question says a participant needs to change the shared gateway's route table, think gateway owner, because participants cannot change its tables or associations.
- If the question says connect peered transit gateways, think static routes, because peering attachments require them.

### Remember

- An attachment associates with at most one gateway route table but can propagate to one or more tables.
- A static route takes priority over a propagated route with the same destination. A blackhole route drops matching traffic.
- A Site-to-Site VPN attachment must be created in the gateway owner's account.

> **Trap:** An attachment alone does not establish traffic flow. Configure the VPC and transit gateway route tables and the return path.
