---
title: "PLACEHOLDER vpc/operations-in-depth"
level: professional
order: 60
facts:
  - id: flow-status
    text: OK means normal logging, NODATA means no traffic during the interval, and SKIPDATA means some
      records were skipped because of internal capacity constraints or errors.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-log-records.html#flow-logs-fields
  - id: credential-vpc
    text: Compare aws:Ec2InstanceSourceVpc with endpoint-only aws:SourceVpc to restrict EC2 role
      credentials to requests from their original VPC; account for AWS service calls on the role
      behalf.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-ec2instancesourcevpc
  - id: sg-exceptions
    text: Security groups do not filter Amazon DNS, DHCP, EC2 instance metadata, ECS task metadata,
      Windows activation, Time Sync, or reserved VPC router addresses.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html#security-group-basics
  - id: acl-exceptions
    text: Network ACLs do not filter Amazon DNS, DHCP, EC2 instance metadata, ECS task metadata, Windows
      activation, Time Sync, or reserved VPC router addresses.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
  - id: dns-filter
    text: Use Route 53 Resolver DNS Firewall to filter DNS requests through the VPC Resolver.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-basics
cards:
  - id: vpc-023
    q: A VPC Flow Log shows NODATA for one interval and SKIPDATA for another. Do both mean there was no
      traffic?
    a: No. NODATA means no traffic in the interval. SKIPDATA means records were skipped because of
      internal capacity constraints or errors.
    trap: true
    facts:
      - flow-status
  - id: vpc-020
    q: A team wants EC2 role credentials usable only through an endpoint in the VPC where they were
      issued. Which condition values should it compare?
    a: aws:Ec2InstanceSourceVpc and aws:SourceVpc. Scope the policy to EC2 role credentials and account
      for AWS services making calls on their behalf.
    facts:
      - credential-vpc
  - id: vpc-004
    q: Which AWS platform traffic bypasses VPC security-group and network-ACL filtering?
    a: Amazon DNS, DHCP, EC2 instance metadata, ECS task metadata, Windows activation, Time Sync, and
      reserved VPC router addresses. Use Resolver DNS Firewall for DNS filtering.
    trap: true
    facts:
      - sg-exceptions
      - acl-exceptions
      - dns-filter
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
