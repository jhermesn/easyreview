---
title: IP addressing and NAT instances
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
---
VPC addressing mistakes are hard to fix later, and NAT choices trade operations work for flexibility. [VPC CIDR blocks](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html)

### How it works

1. Choose a VPC CIDR between /16 and /28, ideally from RFC 1918 and not overlapping networks you'll connect to.
2. Split it into subnets per AZ and tier; each subnet loses 5 addresses to AWS.
3. For private-subnet egress, use a NAT gateway per AZ, or a NAT instance with source/destination checks off.

| Attribute | NAT gateway | NAT instance |
|---|---|---|
| Availability | Redundant in its AZ | Your own failover scripts |
| Bandwidth | Up to 100 Gbps | Depends on instance type |
| Maintenance | AWS | You patch it |
| Security groups | No | Yes |
| Port forwarding, bastion | No | Yes |

### Exam cues

- If the question says count usable IPs in a subnet, subtract 5.
- If the question says least operational overhead for outbound internet from private subnets, think NAT gateway per AZ.
- If the question says NAT with security groups, port forwarding or a bastion on the same box, think NAT instance.

### Remember

- VPC CIDR /16 to /28; add more blocks later.
- 5 reserved addresses per subnet: .0, .1, .2, .3 and the last.
- NAT instance: disable source/destination checks.

> **Trap:** Plan CIDRs before connecting networks. VPC peering and Transit Gateway can't route between overlapping ranges, so two VPCs both using 10.0.0.0/16 can't be joined later.
