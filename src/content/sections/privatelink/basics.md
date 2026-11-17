---
title: "PrivateLink basics"
level: foundational
order: 5
facts:
  - id: private-access
    text: "AWS PrivateLink privately connects a VPC to services as if they were in the VPC, without an internet gateway, NAT device or public IP address."
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html#what-is-privatelink
cards:
  - id: privatelink-011
    q: "Instances in a private subnet must reach an AWS service without traffic going over the internet. What provides that?"
    a: "AWS PrivateLink, through an interface VPC endpoint."
    facts: [private-access]
---
AWS PrivateLink lets a VPC reach services privately, without the public internet. [What is AWS PrivateLink?](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html#what-is-privatelink)

### How it works

1. Create an endpoint for the service in the VPC.
2. Traffic to the service stays on the AWS network.
3. No internet gateway or NAT device is needed.

### Exam cues

- If the question says private access to services without the internet, think PrivateLink.

### Remember

- No internet gateway, NAT or public IP needed.

> **Trap:** PrivateLink exposes specific services; it does not connect whole networks like peering.
