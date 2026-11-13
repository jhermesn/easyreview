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
    text: When a private zone matches but lacks the requested name and record type, VPC Resolver returns NXDOMAIN rather than using public DNS.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
  - id: public-fallback
    text: If no private zone matches, VPC Resolver performs normal public resolution.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
  - id: rule-priority
    text: An associated Resolver forwarding rule for the same domain takes precedence over a private hosted zone.
    source: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html#hosted-zone-private-considerations
cards:
  - id: route53-020
    q: A Route 53 private hosted zone matches a name but lacks the requested record. Does Resolver try public DNS?
    a: No. It returns NXDOMAIN. The most specific matching private zone controls the lookup.
    facts:
      - specific
      - no-fallback
    trap: true
  - id: route53-029
    q: An application has a public DNS record but receives NXDOMAIN inside an associated VPC. A matching Route 53 private zone lacks that name and type. Why?
    a: The matching private hosted zone controls the lookup, and there is no fallback to the public record. Add the required record to the private zone.
    facts:
      - no-fallback
    trap: true
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
---
A private hosted zone is a collection of DNS records available through associated VPCs. It supports internal names and split-view DNS, where the same domain has different internal and external records.

### How it works

1. Associate the private zone with the VPCs that need its records. Set enableDnsSupport and enableDnsHostnames to true.
2. VPC Resolver checks for a matching private zone. When several private zones match, it chooses the most specific name.
3. It looks for the requested record name and type. If either is missing, it returns NXDOMAIN, the DNS response meaning the domain does not exist, without trying the public record.
4. If no private zone matches, it uses normal public DNS resolution. An associated forwarding rule for the same domain takes precedence over the private zone.

### Exam cues

- If the question says a public name fails only inside a VPC with a matching private zone, think a missing private record, because Resolver does not fall back to public DNS.
- If the question says one hostname needs separate internal and external answers, think split-view DNS, because public and private zones can share the name.

### Remember

- Both VPC DNS attributes must be true.
- The most specific matching private zone wins.
- A forwarding rule for the same domain wins over a private zone.

> **Trap:** Creating a public record does not repair a missing record in a matching private zone.
