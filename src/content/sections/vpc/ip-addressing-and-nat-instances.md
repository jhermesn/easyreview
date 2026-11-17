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
    text: In every subnet, the first four IPv4 addresses (network, VPC router, DNS, future use) and the last address (broadcast) are reserved, so a /24 subnet has 251 usable addresses.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html
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
    text: Since November 19, 2025, a NAT gateway can run in regional mode, which expands automatically to every Availability Zone where the VPC has workloads and needs no public subnet.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateways-regional.html#nat-gateways-regional
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
    text: Amazon VPC IP Address Manager (IPAM) plans, tracks and monitors IP addresses across AWS workloads with automated workflows.
    source: https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html#what-it-is-ipam
  - id: traffic-mirroring
    text: VPC Traffic Mirroring copies network traffic from an elastic network interface and sends it to out-of-band security and monitoring appliances.
    source: https://docs.aws.amazon.com/vpc/latest/mirroring/what-is-traffic-mirroring.html#what-is-traffic-mirroring
  - id: ipv6-only-subnet
    text: "An IPv6-only subnet has an IPv6 CIDR block and no IPv4 CIDR block, in a VPC that has an IPv6 CIDR; its resources communicate over IPv6."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#subnet-basics
cards:
  - id: vpc-036
    q: How many usable IPv4 addresses does a /24 subnet in a VPC have, and why?
    a: "251. AWS reserves the first four addresses and the last one in every subnet."
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
    a: "A **regional NAT gateway**: one NAT ID that expands to every AZ with workloads, with no public subnet and one shared route."
    facts: [regional-nat, regional-nat-route]
  - id: vpc-042
    q: Older practice answers say "one NAT gateway per AZ, each in a public subnet, with a route table per AZ." What changed in November 2025?
    a: "Regional NAT gateways expand across AZs automatically, need no public subnet and use one route entry. Zonal NAT gateways per AZ still work and are still needed for private NAT."
    trap: true
    facts: [regional-nat, regional-nat-private]
  - id: vpc-043
    q: A network team must plan and track CIDR allocations across hundreds of VPCs and accounts to avoid overlaps. Which feature fits?
    a: "Amazon VPC IP Address Manager (IPAM)."
    facts: [ipam]
  - id: vpc-044
    q: A security team needs a copy of the packets from specific EC2 instances sent to an intrusion detection appliance. Which VPC feature fits?
    a: "VPC Traffic Mirroring (Flow Logs record metadata, not packet contents)."
    facts: [traffic-mirroring]
  - id: vpc-047
    q: "A dual-stack VPC has run out of IPv4 addresses for new instances, but has plenty of IPv6 space. What lets you keep launching?"
    a: "Create an IPv6-only subnet and launch the instances there, if the workloads can communicate over IPv6."
    facts: [ipv6-only-subnet]
---
VPC addressing mistakes are hard to fix later, and NAT choices trade operations work for flexibility. [VPC CIDR blocks](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html)

### How it works

1. Choose a VPC CIDR between /16 and /28, ideally from RFC 1918 and not overlapping networks you'll connect to.
2. Split it into subnets per AZ and tier; each subnet loses 5 addresses to AWS.
3. For private-subnet egress, use a regional NAT gateway (one for the VPC), zonal NAT gateways per AZ, or a NAT instance with source/destination checks off.
4. Use IPAM to plan and track CIDRs across many VPCs, and Traffic Mirroring when appliances need packet copies.

| Attribute | Regional NAT gateway | Zonal NAT gateway | NAT instance |
|---|---|---|---|
| Availability | Expands across AZs automatically | Redundant in its AZ; one per AZ | Your own failover scripts |
| Public subnet needed | No | Yes (public NAT) | Yes |
| Capacity | Up to 32 IP addresses per AZ | Up to 100 Gbps, up to 8 IP addresses | Depends on instance type |
| Maintenance | AWS | AWS | You patch it |
| Security groups | No | No | Yes |
| Port forwarding, bastion | No | No | Yes |

### Exam cues

- If the question says count usable IPs in a subnet, subtract 5.
- If the question says least operational overhead for outbound internet from private subnets across AZs, think a regional NAT gateway (older answers: a NAT gateway per AZ).
- If the question says NAT with security groups, port forwarding or a bastion on the same box, think NAT instance.

### Remember

- VPC CIDR /16 to /28; add more blocks later.
- 5 reserved addresses per subnet: .0, .1, .2, .3 and the last.
- Regional NAT gateway since November 19, 2025: no public subnet, one route; zonal for private NAT.
- NAT instance: disable source/destination checks.

> **Trap:** Plan CIDRs before connecting networks. VPC peering and Transit Gateway can't route between overlapping ranges, so two VPCs both using 10.0.0.0/16 can't be joined later.
