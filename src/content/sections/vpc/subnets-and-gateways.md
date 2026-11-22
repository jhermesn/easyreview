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
    text: "An internet gateway is a redundant, highly available VPC component for internet communication. Resources need a public IPv4 or public IPv6 address, an appropriate subnet route, and security controls that allow the traffic."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html#vpc-igw-internet-access
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
  - id: vpc-region
    text: A VPC belongs to one Region and can have subnets in each of its Availability Zones; each subnet stays in one Availability Zone.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html
  - id: default-vpc
    text: "AWS initially provides a default VPC in each Region with public default subnets, an internet gateway and DNS resolution enabled."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html#default-vpc
  - id: vpc-quotas
    text: "Default quotas allow 5 VPCs per Region and 5 IPv4 CIDR blocks per VPC (adjustable to 50), and only one internet gateway can be attached to a VPC at a time."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html
  - id: igw-route
    text: "A subnet is public when its route table sends 0.0.0.0/0 (or ::/0) to the internet gateway, or a narrower range of public addresses."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html#vpc-igw-internet-access
  - id: gateway-services
    text: Gateway endpoints provide S3 and DynamoDB connectivity without an internet gateway or NAT, do
      not use PrivateLink, and have no additional endpoint charge.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html#gateway-endpoints
  - id: gateway-routes
    text: "A gateway endpoint adds a service prefix-list route to associated route tables. Clients reach the service public endpoint through that route, so the endpoint uses route-table associations rather than network interfaces placed in each subnet."
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html#gateway-endpoint-routing
  - id: gateway-region
    text: Gateway prefix lists are Region-specific, so the endpoint route applies to the service in that
      Region rather than another Region.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html#gateway-endpoint-routing
  - id: egress-only-ipv6
    text: "An egress-only internet gateway allows outbound IPv6 connections from a VPC while preventing connections initiated from the internet."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html
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
  - id: vpc-035
    q: Can one Amazon VPC span several AWS Regions or several Availability Zones?
    a: Only several Availability Zones. A VPC is in one Region and can have subnets in each of its AZs; each subnet is in one AZ.
    trap: true
    facts: [vpc-region]
  - id: vpc-049
    q: "What is the purpose of an internet gateway in Amazon VPC?"
    a: "An internet gateway connects a VPC to the internet. Resources also need a public IPv4 or public IPv6 address, a route to the gateway and security controls that permit traffic."
    facts: [igw]
  - id: vpc-050
    q: "What makes a subnet public?"
    a: "Its route table sends 0.0.0.0/0 (or ::/0) to an internet gateway."
    facts: [igw-route]
  - id: vpc-005
    q: How does a VPC gateway endpoint provide private S3 or DynamoDB access?
    a: It adds an AWS-managed service prefix-list route to associated route tables. No internet gateway
      or NAT is required, and there is no additional endpoint charge. The service prefix list is
      Region-specific.
    facts:
      - gateway-services
      - gateway-routes
      - gateway-region
  - id: vpc-109
    q: "A VPC needs outbound IPv6 internet access without allowing internet hosts to initiate connections. Which gateway fits?"
    a: "An egress-only internet gateway."
    facts: [egress-only-ipv6]
---
Amazon VPC is your own isolated network in AWS. Inside it, subnets split the address range by Availability Zone, route tables steer traffic, and gateways connect the VPC to the internet, other networks or AWS services.

### How it works

1. Create a VPC with an IP address range in a Region.
2. Add subnets, each in one Availability Zone. Use at least two AZs for high availability.
3. Attach an internet gateway and route public subnets to it.
4. Keep most resources in private subnets; give them outbound internet access through a NAT gateway.
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

- If the question says outbound IPv6 internet access without inbound initiated connections, think an egress-only internet gateway, because it blocks connections initiated from the internet.
- If the question says web servers reachable from the internet, think public subnet with an internet gateway, public addresses and permitted security rules, because a gateway alone does not allow traffic.
- If the question says databases must not be reachable from the internet, think private subnet.
- If the question says private instances need outbound internet only, think NAT gateway.

### Remember

- A subnet lives in exactly one AZ.
- AWS recommends private subnets to protect resources.
- NAT gateway: managed by AWS. NAT instance: you manage it.

> **Trap:** An internet gateway alone doesn't make an instance reachable. The subnet needs a route to it, the instance needs a public IPv4 or public IPv6 address, and security controls must permit the traffic.
