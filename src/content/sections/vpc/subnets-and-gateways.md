---
title: Subnets and gateways
level: foundational
order: 1
facts:
  - id: vpc
    text: Amazon VPC launches AWS resources in a logically isolated virtual network that you define, closely resembling a traditional data center network.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#what-is-amazon-vpc
  - id: subnet
    text: A subnet is a range of IP addresses in a VPC and must reside in a single Availability Zone.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#amazon-vpc-features
  - id: route-tables
    text: Route tables determine where network traffic from a subnet or gateway is directed.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#amazon-vpc-features
  - id: public-private
    text: A public subnet has a direct route to an internet gateway; a private subnet doesn't, and its resources need a NAT device to reach the internet.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#configure-subnets
  - id: vpn-only
    text: A VPN-only subnet has a route to a Site-to-Site VPN connection through a virtual private gateway and no route to an internet gateway.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#configure-subnets
  - id: private-recommended
    text: AWS recommends private subnets to protect AWS resources.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html#configure-subnets
  - id: igw
    text: An internet gateway is a horizontally scaled, redundant, highly available VPC component that allows communication between the VPC and the internet, for resources with a public IPv4 or IPv6 address.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html#VPC_Internet_Gateway
  - id: nat
    text: A NAT gateway lets instances in a private subnet connect to services outside the VPC while external services can't initiate connections to them; a public NAT gateway sits in a public subnet with an Elastic IP address.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html#vpc-nat-gateway
  - id: endpoints
    text: A VPC endpoint connects a VPC to AWS services privately, without an internet gateway or NAT device.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#amazon-vpc-features
  - id: peering-tgw
    text: A VPC peering connection routes traffic between two VPCs, and a transit gateway acts as a central hub routing traffic between VPCs, VPN connections and AWS Direct Connect connections.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#amazon-vpc-features
  - id: nat-gateway-managed
    text: A NAT gateway is managed by AWS with no maintenance; a NAT instance is an EC2 instance the customer manages, including patching.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html
cards:
  - id: vpc-026
    q: What is an Amazon VPC subnet, and how many Availability Zones can one subnet span?
    a: A range of IP addresses in the VPC. It lives in exactly one Availability Zone.
    facts: [subnet]
  - id: vpc-027
    q: What makes a VPC subnet public rather than private?
    a: A public subnet has a route to an internet gateway; a private subnet doesn't.
    facts: [public-private]
  - id: vpc-028
    q: Instances in a private subnet must download patches from the internet but must not accept incoming connections. What should the company add?
    a: A NAT gateway in a public subnet, with a route from the private subnet to it.
    facts: [nat, public-private]
  - id: vpc-029
    q: Which VPC component allows two-way communication between a VPC and the internet?
    a: An internet gateway.
    facts: [igw]
  - id: vpc-030
    q: How can instances in a private subnet reach Amazon S3 without going through the internet?
    a: Through a VPC endpoint, which connects to AWS services privately without an internet gateway or NAT.
    facts: [endpoints]
  - id: vpc-031
    q: Does a NAT gateway let people on the internet connect to instances in a private subnet?
    a: No. It allows outbound connections only; external services can't initiate connections through it.
    trap: true
    facts: [nat]
  - id: vpc-032
    q: Which VPC component directs traffic from a subnet to a gateway or another network?
    a: A route table.
    facts: [route-tables]
  - id: vpc-033
    q: A company wants private subnets to reach the internet through NAT with no instances to patch. Should it use a NAT gateway or a NAT instance?
    a: A NAT gateway, which AWS manages. A NAT instance is an EC2 instance the customer must patch and maintain.
    facts: [nat-gateway-managed]
---
Amazon VPC is your own isolated network in AWS. Inside it, subnets split the address range by Availability Zone, route tables steer traffic, and gateways connect the VPC to the internet, other networks or AWS services. [What is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#what-is-amazon-vpc)

### How it works

1. Create a VPC with an IP address range in a Region.
2. Add subnets, each in one Availability Zone. Use at least two AZs for high availability.
3. Attach an internet gateway and route public subnets to it. [Internet gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html#VPC_Internet_Gateway)
4. Keep most resources in private subnets; give them outbound internet access through a NAT gateway. [NAT gateways](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html#vpc-nat-gateway)
5. Reach AWS services privately with VPC endpoints, other VPCs with peering or a transit gateway, and on-premises networks with a VPN or Direct Connect.

| Component | Purpose |
|---|---|
| Subnet | IP range in one AZ, public or private |
| Route table | Where traffic from a subnet goes |
| Internet gateway | Two-way internet access for public subnets |
| NAT gateway | Outbound-only internet access for private subnets |
| Virtual private gateway | VPN connection to an on-premises network |
| VPC endpoint | Private access to AWS services |
| Peering, transit gateway | Connect VPCs to each other |

### Exam cues

- If the question says web servers reachable from the internet, think public subnet with an internet gateway.
- If the question says databases must not be reachable from the internet, think private subnet.
- If the question says private instances need outbound internet only, think NAT gateway.

### Remember

- A subnet lives in exactly one AZ.
- AWS recommends private subnets to protect resources.
- NAT gateway: managed by AWS. NAT instance: you manage it.

> **Trap:** An internet gateway alone doesn't make an instance reachable. The subnet needs a route to it, and the instance needs a public IP address.
