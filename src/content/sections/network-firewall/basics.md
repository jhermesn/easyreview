---
title: Network Firewall basics
level: foundational
order: 5
facts:
  - id: vpc-inspection
    text: AWS Network Firewall filters and inspects traffic for Amazon VPCs.
    source: https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html
cards:
  - id: network-firewall-015
    q: Which AWS service filters and inspects traffic for an Amazon VPC?
    a: AWS Network Firewall.
    facts: [vpc-inspection]
  - id: network-firewall-017
    q: A company needs to inspect traffic entering and leaving its Amazon VPC. Which AWS service fits?
    a: AWS Network Firewall.
    facts: [vpc-inspection]
---
AWS Network Firewall filters and inspects network traffic for Amazon VPCs.

### How it works

1. Create a firewall for VPC traffic.
2. Configure its inspection rules.
3. Route traffic through the firewall.

### Exam cues

- If the question says inspect VPC network traffic, think AWS Network Firewall, because it filters traffic for VPCs.

### Remember

- AWS Network Firewall inspects VPC traffic.

> **Trap:** Creating a firewall alone does not route traffic through it.
