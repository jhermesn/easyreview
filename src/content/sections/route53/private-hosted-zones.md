---
title: Private hosted zones
level: associate
order: 60
facts:
  - id: private-scope
    text: A private hosted zone supplies records to associated VPCs through VPC Resolver.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
  - id: dns-flags
    text: Private hosted zones require enableDnsSupport and enableDnsHostnames to be true.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
  - id: split
    text: Split-view DNS uses public and private hosted zones with the same name to give internal and external clients different records.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
  - id: specific
    text: For overlapping private hosted zones, VPC Resolver chooses the most specific matching zone.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
  - id: no-fallback
    text: When a private zone matches but lacks the requested name, VPC Resolver returns NXDOMAIN without querying public DNS, unless public DNS fallback is enabled for the zone; when the name exists without the requested record type, it returns NODATA.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
  - id: public-fallback
    text: If no private zone matches, VPC Resolver performs normal public resolution.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
  - id: rule-priority
    text: An associated Resolver forwarding rule for the same domain takes precedence over a private hosted zone.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
  - id: vpc-dns-attributes
    text: "enableDnsSupport (default true) lets a VPC use the Amazon-provided DNS server, and enableDnsHostnames (default false except in a default VPC) controls public DNS hostname assignment; an instance with a public IPv4 address receives a public DNS hostname only when both attributes are true. Private hosted zones also require both attributes."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/AmazonDNS-concepts.html#vpc-dns-support
  - id: resolver-address
    text: "The Route 53 Resolver in a VPC answers at 169.254.169.253 (fd00:ec2::253 for IPv6) and at the VPC primary IPv4 CIDR base plus two."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/AmazonDNS-concepts.html
cards:
  - id: route53-020
    q: "A team needs DNS records that are available to resources in selected VPCs. What Route 53 feature fits?"
    a: "A private hosted zone associated with those VPCs supplies records through VPC Resolver."
    facts:
      - private-scope
  - id: route53-029
    q: "A company needs the same domain name to return different DNS records to internal and external clients. What Route 53 design fits?"
    a: "Use split-view DNS with public and private hosted zones that have the same name."
    facts:
      - split
  - id: route53-044
    q: A team needs one application hostname to give internal and external clients different addresses through Route 53. What should it use?
    a: "Split-view DNS: public and private hosted zones with the same name, with the private zone associated to the VPCs."
    facts:
      - split
      - private-scope
  - id: route53-045
    q: Which VPC DNS attributes must be enabled for Route 53 private hosted zones?
    a: Set enableDnsSupport and enableDnsHostnames to true.
    facts:
      - dns-flags
  - id: route53-070
    q: "Instances in a new custom VPC cannot resolve names in a private hosted zone associated with that VPC. Which VPC settings should be checked?"
    a: "enableDnsSupport and enableDnsHostnames must both be true. In a nondefault VPC, DNS hostnames start disabled."
    trap: true
    facts: [vpc-dns-attributes]
  - id: route53-071
    q: "How do resources in an associated VPC resolve names in a Route 53 private hosted zone?"
    a: "VPC Resolver answers using records from the associated private hosted zone."
    facts: [private-scope]
  - id: route53-077
    q: "An EC2 instance has a public IPv4 address but no public DNS hostname. Which VPC settings used with Amazon Route 53 Resolver should be checked?"
    a: "Set both enableDnsSupport and enableDnsHostnames to true. A public IPv4 address alone does not enable a public DNS hostname."
    facts: [vpc-dns-attributes]
revised:
  - date: 2026-11-21
    note: A private hosted zone can now enable public DNS fallback, so names missing from the zone are retried against public DNS instead of returning NXDOMAIN.
    cards: []
---
A private hosted zone is a collection of DNS records available through associated VPCs. It supports internal names and split-view DNS, where the same domain has different internal and external records.

### How it works

1. Associate the private zone with the VPCs that need its records. Set enableDnsSupport and enableDnsHostnames to true.
2. VPC Resolver checks for a matching private zone. When several private zones match, it chooses the most specific name.
3. It looks for the requested record name and type. A missing name returns NXDOMAIN, the DNS response meaning the domain does not exist, without trying public DNS unless the zone has public DNS fallback enabled. An existing name without that record type returns NODATA.
4. If no private zone matches, it uses normal public DNS resolution. An associated forwarding rule for the same domain takes precedence over the private zone.

For public DNS hostnames on EC2 instances with public IPv4 addresses, both VPC DNS attributes must also be true.

### Exam cues

- If the question says a public name fails only inside a VPC with a matching private zone, think a missing private record, because Resolver does not fall back to public DNS unless public DNS fallback is enabled on the zone.
- If the question says one hostname needs separate internal and external answers, think split-view DNS, because public and private zones can share the name.

### Remember

- Both VPC DNS attributes must be true for private zones and for public DNS hostname assignment.
- The most specific matching private zone wins.
- A forwarding rule for the same domain wins over a private zone.

> **Trap:** Creating a public record does not repair a missing record in a matching private zone.
