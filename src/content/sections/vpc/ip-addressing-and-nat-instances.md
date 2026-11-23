---
title: IP addressing and NAT options
level: associate
order: 50
facts:
  - id: vpc-size
    text: A VPC's IPv4 CIDR block must be between /16 (65,536 addresses) and /28 (16 addresses), and you can associate more IPv4 CIDR blocks after creation.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html
  - id: rfc1918
    text: AWS recommends VPC CIDR blocks from the RFC 1918 private ranges 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html
  - id: reserved
    text: "A standard IPv4 subnet reserves its first four addresses and its last address, leaving 251 usable in a /24 and 4,091 in a /20. The subnet base plus two stays reserved even when DNS uses the primary VPC base plus two. VPCs do not support broadcast. Bring Your Own IP (BYOIP) IPv4 ranges allow use of every address, including the first and last."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html#subnet-sizing-ipv4
  - id: nat-compare
    text: AWS recommends NAT gateways over NAT instances for availability, bandwidth up to 100 Gbps and no maintenance; a NAT instance needs scripted failover and its bandwidth depends on its instance type.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html
  - id: nat-instance-features
    text: Unlike a NAT gateway, a NAT instance can have security groups, can be customized for port forwarding, and can double as a bastion server.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html
  - id: src-dst
    text: A NAT instance must have source/destination checks disabled so it can forward traffic it didn't originate.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/work-with-nat-instances.html#EIP_Disable_SrcDestCheck
  - id: regional-nat
    text: "Available since November 2025, a regional NAT gateway needs no public subnet. Automatic mode manages IP addresses and expands across Availability Zones with workloads; manual mode leaves addresses and AZ coverage to you."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateways-regional.html#how-regional-nat-gateways-work
  - id: regional-nat-route
    text: A regional NAT gateway uses one NAT ID across Availability Zones, so private subnets in every zone can share the same route entry.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateways-regional.html#benefits
  - id: regional-nat-private
    text: Regional NAT gateways don't offer private connectivity; for private NAT use cases AWS recommends zonal NAT gateways.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateways-regional.html#when-to-use-regional-nat-gateways
  - id: regional-nat-ips
    text: A regional NAT gateway supports up to 32 IP addresses per Availability Zone, compared with 8 for a zonal NAT gateway, and each address adds about 55,000 concurrent connections to one destination.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateways-regional.html#benefits
  - id: ipam
    text: "Amazon VPC IP Address Manager (IPAM) plans, tracks and monitors address usage and can automatically assign VPC CIDRs according to business rules."
    source: https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html
  - id: traffic-mirroring
    text: VPC Traffic Mirroring copies network traffic from an elastic network interface and sends it to out-of-band security and monitoring appliances.
    source: https://docs.aws.amazon.com/vpc/latest/mirroring/what-is-traffic-mirroring.html#what-is-traffic-mirroring
  - id: ipv6-only-subnet
    text: "An IPv6-only subnet has an IPv6 CIDR block and no IPv4 CIDR block, in a VPC that has an IPv6 CIDR; its resources communicate over IPv6."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#subnet-basics
  - id: subnet-size
    text: "An IPv4 subnet uses a /28 through /16 CIDR inside a VPC CIDR and cannot overlap another subnet. A standard /28 has 11 usable addresses after five reservations; IPv4 BYOIP allows use of all addresses."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html#subnet-sizing-ipv4
  - id: ipv6-sizes
    text: "A VPC supports IPv6 CIDRs from /44 to /60 in steps of four prefix bits, at creation or later. An IPv6 subnet must use a range from an associated VPC IPv6 CIDR."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html#vpc-sizing-ipv6
  - id: secondary-cidr
    text: "An additional IPv4 CIDR must not overlap an existing VPC CIDR. A VPC with a CIDR from 10.0.0.0/8 cannot add a CIDR from 172.16.0.0/12 or 192.168.0.0/16."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html#add-cidr-block-restrictions
  - id: nat64
    text: "A NAT gateway translates IPv6 traffic to IPv4 with NAT64. Enable DNS64 on the subnet containing the IPv6-only workloads, and route the synthesized 64:ff9b::/96 destinations to the NAT gateway."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-nat64-dns64.html#nat-gateway-nat64-dns64-walkthrough-internet
  - id: default-vpc-components
    text: "AWS initially creates a default VPC with 172.31.0.0/16 and /20 default subnets, plus a default security group and network ACL. You can add secondary IPv4 CIDRs, subnets, route tables and security groups."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc-components.html
  - id: dhcp-immutable
    text: "A DHCP option set cannot be modified; to change DNS, NTP or other options, create a new set and associate it with the VPC."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/DHCPOptionSet.html
  - id: ipam-share
    text: "An IPAM pool can be shared with other accounts through AWS RAM so they allocate CIDRs for their VPCs from it; sharing requires integrating IPAM with AWS Organizations."
    source: https://docs.aws.amazon.com/vpc/latest/ipam/share-pool-ipam.html
  - id: nat-cost
    text: "NAT gateways are billed for provisioned hours and each GB processed, with applicable data transfer charges added. Regional NAT hourly usage is counted separately for each configured Availability Zone."
    source: https://aws.amazon.com/vpc/pricing/
  - id: dhcp-options
    text: "A DHCP option set supplies settings such as DNS servers, domain names, NTP time servers and NetBIOS name servers to VPC clients."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/DHCPOptionSet.html#CreatingaDHCPOptionSet
  - id: dhcp-association
    text: "A VPC can use one DHCP option set at a time or none; choosing no option set disables domain name resolution in that VPC."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/DHCPOptionSet.html#ChangingDHCPOptionsofaVPC
  - id: subnet-auto-addresses
    text: "Public IPv4 auto-assignment is enabled in default subnets and normally disabled in nondefault subnets; nondefault subnets created by the EC2 launch wizard start with it enabled. IPv6 auto-assignment is a separate setting, disabled by default, that can be changed to assign addresses from the subnet IPv6 CIDR to new network interfaces."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/subnet-public-ip.html
  - id: default-vpc-recreate
    text: "After deleting a default VPC you can create a new default VPC, provided the Region has none; an existing nondefault VPC cannot be designated as the default."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/work-with-default-vpc.html#create-default-vpc
  - id: secondary-subnets
    text: "A subnet IPv4 CIDR can come from the primary VPC CIDR or an associated secondary IPv4 CIDR."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html#vpc-resize
  - id: public-ipv4
    text: "An automatically assigned public IPv4 address comes from Amazon's pool and returns to that pool when disassociated. Use an Elastic IP address when you need a public IPv4 address allocated persistently to your account."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html#vpc-public-ipv4-addresses
  - id: public-ipv6-access
    text: "Public IPv6 addressing alone does not make a VPC resource reachable from the internet. Subnet routing, security groups and network ACLs control that reachability."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html#vpc-ipv6-addresses-public
  - id: private-nat-overlap
    text: "Private NAT can connect workloads in overlapping VPC ranges by translating traffic into a separate routable address range. The AWS design routes translated traffic through Transit Gateway to a load balancer in the destination VPC routable range."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-scenarios.html#private-nat-overlapping-networks
cards:
  - id: vpc-036
    q: "How many usable IPv4 addresses does a standard Amazon VPC /24 subnet have?"
    a: "251. Five addresses are reserved in a standard subnet; IPv4 BYOIP ranges allow all addresses to be used."
    facts: [reserved]
  - id: vpc-037
    q: What are the smallest and largest IPv4 CIDR blocks allowed for a VPC?
    a: "/28 (16 addresses) to /16 (65,536 addresses); more blocks can be added later."
    facts: [vpc-size]
  - id: vpc-038
    q: Which NAT option supports security groups, port forwarding and acting as a bastion host?
    a: "A NAT instance. A NAT gateway supports none of them, but is managed and highly available."
    facts: [nat-instance-features, nat-compare]
  - id: vpc-039
    q: A new NAT instance launches fine, but private instances still can't reach the internet through it. Which instance setting is most often missed?
    a: "Source/destination checks must be disabled on the NAT instance."
    trap: true
    facts: [src-dst]
  - id: vpc-040
    q: A team must pick between a NAT gateway and a NAT instance for production egress with the least operations work. Which fits and why?
    a: "A NAT gateway: AWS-managed, redundant in its AZ, scales to 100 Gbps; deploy one per AZ."
    facts: [nat-compare]
  - id: vpc-041
    q: A VPC spans three Availability Zones and needs highly available outbound internet access from private subnets with the least setup, and no public subnets. Which NAT option fits (2025 onward)?
    a: "A regional NAT gateway in automatic mode. AWS manages addresses and AZ expansion; private subnets use the same NAT ID across zones."
    facts: [regional-nat, regional-nat-route]
  - id: vpc-042
    q: "Can an Amazon VPC regional NAT gateway provide private NAT connectivity?"
    a: "No. AWS recommends zonal NAT gateways for private NAT use cases."
    facts: [regional-nat-private]
  - id: vpc-043
    q: A network team must plan and track CIDR allocations across hundreds of VPCs and accounts to avoid overlaps. Which feature fits?
    a: "Amazon VPC IP Address Manager (IPAM). It tracks address usage and automatically allocates VPC CIDRs according to business rules."
    facts: [ipam]
  - id: vpc-044
    q: A security team needs a copy of the packets from specific EC2 instances sent to an intrusion detection appliance. Which VPC feature fits?
    a: "VPC Traffic Mirroring (Flow Logs record metadata, not packet contents)."
    facts: [traffic-mirroring]
  - id: vpc-047
    q: "A dual-stack VPC has run out of IPv4 addresses for new instances, but has plenty of IPv6 space. What lets you keep launching?"
    a: "Create an IPv6-only subnet and launch the instances there, if the workloads can communicate over IPv6."
    facts: [ipv6-only-subnet]
  - id: vpc-055
    q: "How many usable IPv4 addresses does a standard Amazon VPC /28 subnet have?"
    a: "11. A /28 contains 16 addresses, and five are reserved in a standard subnet. IPv4 BYOIP is an exception."
    facts: [subnet-size]
  - id: vpc-056
    q: "IPv6-only instances must reach an IPv4-only API on the internet. What VPC features make that work?"
    a: "A NAT gateway with NAT64, DNS64 enabled on the workload subnet, and a 64:ff9b::/96 route to the gateway."
    facts: [nat64]
  - id: vpc-057
    q: "A team needs to change the DNS servers handed out in a VPC. Can it edit the current DHCP option set?"
    a: "No. DHCP option sets cannot be modified; create a new one and associate it with the VPC."
    trap: true
    facts: [dhcp-immutable]
  - id: vpc-058
    q: "What IPv4 CIDR and default subnet size does AWS initially configure for a default Amazon VPC?"
    a: "172.31.0.0/16 for the VPC and /20 for default subnets. You can add more IPv4 CIDRs and nondefault subnets."
    facts: [default-vpc-components]
  - id: vpc-068
    q: "A network team wants every account in an AWS Organization to allocate non-overlapping VPC CIDRs from a central address plan. Which design fits?"
    a: "**VPC IPAM integrated with AWS Organizations**, with IPAM pools shared through **AWS RAM**. Accounts allocate VPC CIDRs from the shared pool."
    facts: [ipam-share, ipam]
  - id: vpc-070
    q: "An Amazon VPC application requires IPv4 broadcast discovery. Will a subnet broadcast address make that work?"
    a: "No. VPCs do not support broadcast; the last IPv4 address of a standard subnet is reserved."
    facts: [reserved]
  - id: vpc-071
    q: "An Amazon VPC has a /20 subnet. How many IPv4 addresses can resources normally use?"
    a: "4,091. A /20 contains 4,096 addresses, with five reserved in a standard subnet."
    facts: [reserved]
  - id: vpc-074
    q: "An Amazon VPC uses 10.20.0.0/16. Can it expand with a secondary CIDR from 172.16.0.0/12?"
    a: "No. A VPC with a CIDR from 10.0.0.0/8 cannot add a CIDR from either of the other RFC 1918 ranges."
    facts: [secondary-cidr]
  - id: vpc-075
    q: "An Amazon VPC design uses one regional NAT gateway across three Availability Zones. Does that incur only one hourly gateway charge?"
    a: "No. Regional NAT usage is billed per configured AZ-hour, plus per-GB processing and applicable data transfer charges."
    facts: [nat-cost]
  - id: vpc-077
    q: "An Amazon VPC must distribute custom DNS and time-server settings to instances. Which configuration supplies them?"
    a: "A DHCP option set. It can specify DNS servers, domain names, NTP servers and NetBIOS name servers."
    facts: [dhcp-options]
  - id: vpc-078
    q: "An Amazon VPC needs different DHCP options. Can two option sets be associated at once?"
    a: "No. A VPC uses at most one DHCP option set. Selecting no option set disables domain name resolution."
    facts: [dhcp-association]
  - id: vpc-079
    q: "Does an Amazon VPC default subnet automatically assign both public IPv4 and IPv6 addresses?"
    a: "No. Public IPv4 auto-assignment starts enabled in default subnets; IPv6 auto-assignment is separate and starts disabled."
    facts: [subnet-auto-addresses]
  - id: vpc-082
    q: "A team deleted its default Amazon VPC. Can it mark an existing custom VPC as the default?"
    a: "No. Create a new default VPC if the Region has none; an existing custom VPC cannot become the default."
    facts: [default-vpc-recreate]
  - id: vpc-085
    q: "An Amazon VPC primary IPv4 CIDR has no room for another subnet. How can the team add subnet capacity?"
    a: "Associate a suitable secondary IPv4 CIDR and create the subnet from that range."
    facts: [secondary-subnets]
  - id: vpc-088
    q: "An Amazon EC2 application in a VPC needs a public IPv4 address that stays allocated to its AWS account. Which address type fits?"
    a: "An Elastic IP address. Automatically assigned public IPv4 addresses return to Amazon's pool when disassociated."
    facts: [public-ipv4]
  - id: vpc-090
    q: "An Amazon VPC was created without IPv6. Must it be replaced to add IPv6 subnets?"
    a: "No. Associate an IPv6 CIDR with the existing VPC, then allocate subnet ranges from it."
    facts: [ipv6-sizes]
  - id: vpc-104
    q: "An Amazon EC2 instance has a public IPv6 address in a VPC. Does that address alone make it reachable from the internet?"
    a: "No. Subnet routing, security groups and network ACLs must also allow the traffic."
    facts: [public-ipv6-access]
  - id: vpc-105
    q: "Two Amazon VPCs contain overlapping workload CIDRs. How can private NAT enable one workload to call a service in the other VPC?"
    a: "Translate the source through a private NAT gateway in a separate routable range, then route through Transit Gateway to a load balancer in the destination VPC routable range."
    facts: [private-nat-overlap]
revised:
  - date: 2026-11-23
    note: The regional NAT card now tests private connectivity support.
    cards: [vpc-042]
---
VPC addressing mistakes are hard to fix later, and NAT choices trade operations work for flexibility.

### How it works

1. Choose a VPC CIDR between /16 and /28, ideally from RFC 1918 and not overlapping networks you'll connect to.
2. Split it into subnets per AZ and tier; a standard IPv4 subnet reserves five addresses. Bring Your Own IP (BYOIP) IPv4 ranges allow every address to be used.
3. For private-subnet egress, use a regional NAT gateway (one for the VPC), zonal NAT gateways per AZ, or a NAT instance with source/destination checks off.
4. Use IPAM to plan and track CIDRs across many VPCs, and Traffic Mirroring when appliances need packet copies.

| Attribute | Regional NAT gateway | Zonal NAT gateway | NAT instance |
|---|---|---|---|
| Availability | Automatic mode expands across AZs; manual mode uses your AZ coverage | Redundant in its AZ; one per AZ | Your own failover scripts |
| Public subnet needed | No | Yes (public NAT) | Yes |
| Capacity | Up to 32 IP addresses per AZ | Up to 100 Gbps, up to 8 IP addresses | Depends on instance type |
| Maintenance | AWS | AWS | You patch it |
| Security groups | No | No | Yes |
| Port forwarding, bastion | No | No | Yes |

Use DHCP option sets for custom DNS or time servers; a VPC can have one associated set or none. Public IPv4 and IPv6 auto-assignment are separate subnet settings. Default subnets start with public IPv4 auto-assignment enabled and IPv6 auto-assignment disabled.

Expand IPv4 capacity with secondary VPC CIDRs and create subnets from either primary or secondary ranges. IPv6 CIDRs can be added after VPC creation; subnet ranges must come from a VPC IPv6 block. IPAM can assign VPC CIDRs according to business rules.

Public IPv6 internet reachability depends on subnet routes, security groups and network ACLs. For IPv6-only workloads reaching IPv4 services, enable DNS64 on the workload subnet and route `64:ff9b::/96` to a NAT gateway. DNS64 supplies a synthesized IPv6 destination; NAT64 translates the traffic to IPv4.

Private NAT can connect overlapping workload networks when you introduce separate routable CIDRs, translate the source, and route to a load balancer through Transit Gateway.

NAT costs include provisioned hours, processed GB and applicable data transfer. Regional NAT hourly charges accrue per configured AZ. For an address that stays allocated to the account, choose an Elastic IP instead of an automatically assigned public IPv4 address.

Default VPCs can be extended with additional CIDRs and subnets. A deleted default VPC can be replaced by a new default VPC if the Region has none.

### Exam cues

- If the question says count usable IPv4 addresses in a standard subnet, subtract five, because AWS reserves them; IPv4 BYOIP is an exception.
- If the question says least operational overhead for outbound internet from private subnets across AZs, think a regional NAT gateway (older answers: a NAT gateway per AZ).
- If the question says NAT with security groups, port forwarding or a bastion on the same box, think NAT instance.

### Remember

- VPC CIDR /16 to /28; add more blocks later.
- Standard IPv4 subnets reserve the first four addresses and the last. IPv4 BYOIP permits all addresses. A standard /20 has 4,091 usable addresses.
- Regional NAT gateway since November 2025: no public subnet, one NAT ID across AZs; zonal for private NAT. Automatic mode manages addresses and AZ expansion; manual mode leaves both to you.
- NAT instance: disable source/destination checks.

> **Trap:** VPC peering and Transit Gateway cannot route directly between overlapping CIDRs. A private NAT design can translate the source into a separate routable range and reach a destination load balancer through Transit Gateway.
