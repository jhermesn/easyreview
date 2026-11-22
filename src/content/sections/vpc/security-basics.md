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
  - id: flow-scope
    text: Flow logs can cover a VPC, subnet, or network interface; VPC and subnet logs monitor their
      network interfaces.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-basics.html#flow-logs-basics
  - id: flow-destinations
    text: VPC Flow Logs publish to CloudWatch Logs, S3, or Data Firehose.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs
  - id: flow-fields
    text: Flow records include source and destination addresses and ports, protocol, packet and byte
      counts, timestamps, action, and logging status.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-log-records.html#flow-logs-fields
  - id: flow-no-payload
    text: VPC Flow Logs do not capture packet contents.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/application.html
  - id: flow-outside-path
    text: Flow log collection occurs outside the network traffic path and does not affect its throughput
      or latency.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs
  - id: sg-scope
    text: Security groups control allowed inbound and outbound traffic for associated resources and
      their network interfaces.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#vpc-security-groups
  - id: sg-stateful
    text: Security groups track connections and automatically allow response traffic for allowed
      requests regardless of opposite-direction rules.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#security-group-basics
  - id: sg-allows
    text: Security groups have allow rules only; rules across multiple attached groups combine into one
      set of permissions.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-characteristics
  - id: acl-subnet
    text: "Each VPC subnet has one network ACL, and one ACL can serve multiple subnets. Creating a custom ACL does not attach it to a subnet; associate it explicitly to apply its rules."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/create-network-acl.html#CreateACL
  - id: acl-stateless
    text: "Network ACLs do not track connections. Traffic between subnets must pass the source outbound and destination inbound rules; replies must pass both subnet ACLs in the reverse direction."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
  - id: acl-order
    text: ACL rules allow or deny traffic in ascending rule-number order; the first match wins, and
      numbered rules range from 1 to 32766.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
  - id: sg-sources
    text: "A security group rule source or destination is an IPv4 or IPv6 CIDR range, a single address written as a /32 or /128, a prefix list ID, or another security group; an internet gateway ID is not a valid source."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
  - id: default-security-group
    text: "When an EC2 instance is launched without a specified security group, EC2 associates the VPC default security group."
    source: https://docs.aws.amazon.com/vpc/latest/userguide/default-security-group.html
cards:
  - id: vpc-062
    q: "What does a security group do in an Amazon VPC?"
    a: "A security group acts as a virtual firewall for an instance and controls which traffic can reach it."
    facts: [sg-basic]
  - id: vpc-063
    q: "Which Amazon VPC security control allows or denies traffic at the subnet level?"
    a: "A network ACL controls inbound and outbound traffic at the subnet level."
    facts: [nacl-basic]
  - id: vpc-007
    q: What do VPC Flow Logs record, and where can the records be published?
    a: IP traffic metadata such as addresses, ports, protocol, bytes, and ACCEPT or REJECT, at VPC,
      subnet, or network-interface scope. Publish to CloudWatch Logs, S3, or Data Firehose. Packet
      contents are not captured, and collection is outside the traffic path.
    facts:
      - flow-scope
      - flow-destinations
      - flow-fields
      - flow-no-payload
      - flow-outside-path
  - id: vpc-001
    q: How do VPC security groups and network ACLs differ?
    a: Security groups protect associated resources, track connections, and have allow rules only.
      Network ACLs protect subnets, do not track connections, and process allow or deny rules from
      lowest number to first match. A subnet has one ACL.
    facts:
      - sg-scope
      - sg-stateful
      - sg-allows
      - acl-subnet
      - acl-stateless
      - acl-order
  - id: vpc-045
    q: "Which of these cannot be the source of a security group inbound rule: a CIDR block, a single IP, another security group, or an internet gateway ID?"
    a: "An internet gateway ID. Sources are CIDR ranges (including single addresses), prefix lists and security groups."
    facts: [sg-sources]
  - id: vpc-102
    q: "A team creates a custom Amazon VPC network ACL but does not associate a subnet. Do its rules affect an existing subnet?"
    a: "No. Associate the custom ACL with the subnet to apply its rules; creation alone changes no subnet association."
    facts: [acl-subnet]
  - id: vpc-108
    q: "Which security group does Amazon EC2 associate with an instance launched without a specified security group?"
    a: "The VPC default security group."
    facts: [default-security-group]
---
A VPC has two built-in network filters: security groups around instances and network ACLs around subnets.

### How it works

1. Traffic entering a subnet passes its network ACL.
2. Traffic reaching an instance passes its security group.
3. Security groups let responses back automatically; network ACLs need rules both ways.

### Exam cues

- If the question says no security group was specified for an EC2 instance, think the VPC default security group, because EC2 associates it at launch.
- If the question says instance-level firewall, think security group.
- If the question says subnet-level allow and deny rules, think network ACL.

### Remember

- Security group: instance level, stateful.
- Network ACL: subnet level, allow and deny.

> **Trap:** Security groups cannot deny a specific address; use a network ACL for an explicit deny.
