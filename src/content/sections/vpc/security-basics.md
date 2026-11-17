---
title: "VPC security basics"
level: foundational
order: 5
facts:
  - id: sg-basic
    text: "A security group acts as a virtual firewall for an instance: only traffic its rules allow reaches it, and it is stateful, so responses are allowed back automatically."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#vpc-security-groups
  - id: nacl-basic
    text: "A network ACL allows or denies inbound and outbound traffic at the subnet level."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#vpc-network-acls
cards:
  - id: vpc-062
    q: "Which VPC control works at the instance level and only has allow rules: security groups or network ACLs?"
    a: "Security groups. Network ACLs work at the subnet level and can allow or deny."
    facts: [sg-basic, nacl-basic]
  - id: vpc-063
    q: "A team must block one IP address from reaching every instance in a subnet. Which VPC feature can deny it?"
    a: "A network ACL, which can deny traffic at the subnet level; security groups only allow."
    trap: true
    facts: [nacl-basic, sg-basic]
---
A VPC has two built-in network filters: security groups around instances and network ACLs around subnets. [Security groups](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#vpc-security-groups)

### How it works

1. Traffic entering a subnet passes its network ACL.
2. Traffic reaching an instance passes its security group.
3. Security groups let responses back automatically; network ACLs need rules both ways.

### Exam cues

- If the question says instance-level firewall, think security group.
- If the question says subnet-level allow and deny rules, think network ACL.

### Remember

- Security group: instance level, stateful.
- Network ACL: subnet level, allow and deny.

> **Trap:** Security groups cannot deny a specific address; use a network ACL for an explicit deny.
