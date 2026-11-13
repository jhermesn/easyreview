---
title: Resolver endpoints and rules
level: associate
order: 70
facts:
  - id: resolver-default
    text: VPC Resolver is available by default in every VPC and answers VPC names, associated private hosted zones and public names.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html#resolver
  - id: resolver-address
    text: The VPC network base address plus two connects to VPC Resolver.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html#resolver
  - id: inbound
    text: Inbound endpoints provide private IP addresses for DNS queries forwarded from your network into the VPC.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-inbound-queries.html#resolver-forwarding-inbound-queries
  - id: inbound-link
    text: Inbound endpoints need Direct Connect or VPN connectivity from the querying network.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-inbound-queries.html#resolver-forwarding-inbound-queries
  - id: inbound-forward
    text: On-premises DNS forwards the AWS domain to inbound endpoint IP addresses; VPC Resolver returns the answer through the reverse path.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html#resolver
  - id: outbound
    text: Outbound endpoints send queries from VPCs to external DNS servers using forwarding rules associated with the VPCs.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-outbound-queries.html#resolver-forwarding-outbound-queries
  - id: outbound-link
    text: Outbound endpoints need connectivity through Direct Connect, VPN or a NAT gateway.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-outbound-queries.html#resolver-forwarding-outbound-queries
  - id: endpoint-reuse
    text: One outbound endpoint can serve multiple VPCs in the same Region.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-outbound-queries.html#resolver-forwarding-outbound-queries
  - id: rule
    text: Each forwarding rule specifies a domain name and the target DNS server IP addresses.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-outbound-queries.html#resolver-forwarding-outbound-queries
  - id: target-choice
    text: VPC Resolver selects a rule target IP at random and retries a randomly selected target if a target does not respond.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-outbound-queries.html#resolver-forwarding-outbound-queries
  - id: precedence
    text: A forwarding rule for the same domain takes precedence over a private hosted zone.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
diagrams:
  - id: route53-hybrid-dns
    title: Hybrid DNS with Resolver endpoints
    width: 900
    height: 340
    groups:
      - label: VPC
        icon: group-virtual-private-cloud-vpc
        x: 20
        y: 20
        w: 610
        h: 300
        tone: network
    nodes:
      - id: ec2
        label: EC2 instance
        icon: res-ec2-instance
        x: 40
        y: 130
        w: 120
        h: 72
        tone: compute
        info: The VPC network base address plus two connects to VPC Resolver.
      - id: resolver
        label: VPC Resolver
        sub: VPC+2
        icon: res-route-53-resolver
        x: 230
        y: 122
        w: 130
        h: 86
        tone: network
        info: Answers VPC names, private hosted zone records and public names. A **forwarding rule** that matches the domain sends the query out instead. A rule beats a private hosted zone for the same domain.
      - id: outb
        label: Outbound endpoint
        sub: ENIs in your subnets
        icon: res-route-53-resolver
        x: 460
        y: 44
        w: 150
        h: 86
        tone: network
        info: "Source of forwarded queries. Needs a path to the on-premises DNS servers: **Direct Connect, VPN or a NAT gateway**. One endpoint can serve several VPCs in the Region."
      - id: inb
        label: Inbound endpoint
        sub: private IPs
        icon: res-route-53-resolver
        x: 460
        y: 210
        w: 150
        h: 86
        tone: network
        info: On-premises DNS forwards queries to these private IPs over **Direct Connect or VPN**. Resolver answers from private hosted zones and VPC names.
      - id: onprem
        label: On-premises DNS
        sub: corp.example.com
        icon: res-client
        x: 720
        y: 122
        w: 160
        h: 86
        tone: user
        info: Authoritative for the on-premises domain. Needs a conditional forwarder for the AWS domain that points to the inbound endpoint IPs.
    edges:
      - from: ec2
        to: resolver
        step: 1
        label: query
      - from: resolver
        to: outb
        step: 2
        label: rule
      - from: outb
        to: onprem
        step: 3
        label: forward
      - from: onprem
        to: inb
        step: 4
        label: forward
        dashed: true
      - from: inb
        to: resolver
        step: 5
        label: resolve
        dashed: true
    steps:
      - An instance asks the VPC resolver for an on-premises name.
      - A forwarding rule for that domain sends the query to the outbound endpoint.
      - The outbound endpoint forwards it over the private link to the on-premises DNS server.
      - In the other direction, an on-premises server conditionally forwards an AWS domain to the inbound endpoint IPs.
      - The inbound endpoint hands the query to the VPC resolver, which answers from the private hosted zone.
cards:
  - id: route53-021
    q: A VPC has a Route 53 private zone and a Resolver forwarding rule for the same domain. Which one handles queries?
    a: The forwarding rule takes precedence and sends the query to its configured DNS servers.
    facts:
      - precedence
    trap: true
  - id: route53-022
    q: On-premises servers need Route 53 private-zone names over Direct Connect. What should the team configure?
    a: An inbound Resolver endpoint and an on-premises conditional forwarder that sends queries for that domain to the endpoint IPs.
    facts:
      - inbound
      - inbound-link
      - inbound-forward
  - id: route53-023
    q: VPC instances must resolve an on-premises domain through Route 53 Resolver. What configuration is required?
    a: An outbound endpoint and a domain forwarding rule associated with the VPCs. Provide connectivity to the target DNS servers through Direct Connect, VPN or NAT.
    facts:
      - outbound
      - rule
      - outbound-link
  - id: route53-046
    q: Does a Route 53 outbound Resolver rule use its first target DNS server as a preferred primary?
    a: No. VPC Resolver selects target IPs at random and retries a randomly selected target if one does not answer.
    facts:
      - target-choice
    trap: true
---
VPC Resolver looks up public names, VPC names and private-zone records. Resolver endpoints connect it to DNS servers in another network. Inbound and outbound describe the direction of the DNS query relative to AWS.

### How it works

1. A VPC client queries VPC Resolver, reachable at the VPC network base address plus two.
2. For an on-premises domain, associate a forwarding rule with the VPC. A forwarding rule names the domain and the DNS servers that should answer it.
3. Resolver sends the matching query through an outbound endpoint. That endpoint needs a path to the target servers through Direct Connect, VPN or a network address translation (NAT) gateway, which translates private source addresses for external traffic.
4. For the opposite direction, configure the on-premises server with a conditional forwarder, a rule that forwards only a selected domain, pointing to inbound endpoint IPs.
5. The inbound endpoint receives the query over Direct Connect or VPN. VPC Resolver answers from the applicable private zone and returns the result along the reverse path.

### Exam cues

- If the question says on-premises clients need private AWS names, think inbound endpoint plus conditional forwarding, because the query enters the VPC.
- If the question says VPC clients need on-premises names, think outbound endpoint plus a VPC-associated forwarding rule, because the query leaves AWS for its answer.

### Remember

- Inbound endpoint addresses are private.
- An outbound endpoint can serve multiple VPCs in the same Region.
- A forwarding rule for the same domain overrides a private zone.
- Target DNS server IPs are selected at random, not in a preferred order.

> **Trap:** An outbound endpoint does not receive on-premises queries for an AWS private zone. That direction needs an inbound endpoint.
