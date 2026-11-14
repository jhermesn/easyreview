---
title: AWS on premises
level: foundational
order: 10
facts:
  - id: purpose
    text: AWS Outposts is a fully managed service that extends AWS infrastructure, services, APIs and tools to customer premises.
    source: https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html#what-is-outposts
  - id: local
    text: Outposts lets customers build and run applications on premises with the same programming interfaces as AWS Regions, using local compute and storage for lower latency and local data processing.
    source: https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html#what-is-outposts
  - id: managed
    text: An Outpost is a pool of AWS compute and storage capacity at a customer site that AWS operates, monitors and manages as part of an AWS Region.
    source: https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html#what-is-outposts
  - id: resources
    text: Subnets on an Outpost can host resources such as EC2 instances, EBS volumes, ECS clusters and RDS instances.
    source: https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html#what-is-outposts
cards:
  - id: outposts-001
    q: A factory must process data locally with very low latency but wants the same AWS APIs and tools it uses in the cloud. Which AWS service fits?
    a: AWS Outposts, which runs AWS infrastructure and services in the customer's own site.
    facts: [purpose, local]
  - id: outposts-002
    q: Who operates and manages the hardware of an AWS Outpost installed in a customer's data center?
    a: AWS. It runs the Outpost as part of an AWS Region.
    facts: [managed]
  - id: outposts-003
    q: Which deployment model does AWS Outposts support?
    a: Hybrid. AWS resources run on premises and connect to the parent AWS Region.
    facts: [purpose, managed]
  - id: outposts-004
    q: Is AWS Outposts the same as AWS Local Zones?
    a: No. Outposts runs AWS capacity at your own site; Local Zones are AWS-run locations near large cities.
    trap: true
    facts: [managed]
---
AWS Outposts puts AWS hardware in your data center. You run AWS services there with the same APIs and tools as in a Region, for workloads that need low latency to on-premises systems or must process data locally. [What is AWS Outposts?](https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html#what-is-outposts)

### How it works

1. AWS installs the Outpost at your site and connects it to a parent Region.
2. Create subnets on the Outpost and launch resources there: EC2, EBS, ECS, RDS.
3. AWS operates, monitors and manages the capacity.

### Exam cues

- If the question says AWS services in our own data center, low latency to on-premises systems, think AWS Outposts.

### Remember

- Fully managed by AWS, at the customer site.
- Same APIs and tools as the Region.

> **Trap:** Outposts doesn't make a workload independent of AWS. It is managed as part of its parent Region.
