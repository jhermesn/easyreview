---
title: Finding investigation
level: associate
order: 10
facts:
  - id: purpose
    text: Amazon Detective helps investigate security findings and suspicious activity to identify their root cause.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
  - id: core-sources
    text: Detective core sources include CloudTrail logs, VPC Flow Logs and GuardDuty findings for accounts enrolled in GuardDuty.
    source: https://docs.aws.amazon.com/detective/latest/userguide/detective-source-data-about.html#source-data-types
  - id: eks-source
    text: EKS audit logs are a source package that must be enabled for the behavior graph.
    source: https://docs.aws.amazon.com/detective/latest/userguide/usage-tracking-admin.html#usage-cost-by-source
  - id: separate-streams
    text: Detective uses independent streams of CloudTrail and VPC flow log events without using existing logging configurations.
    source: https://docs.aws.amazon.com/detective/latest/userguide/detective-source-data-about.html#source-data-types
  - id: security-findings
    text: AWS security findings is an optional source package that ingests Security Hub CSPM findings into Detective.
    source: https://docs.aws.amazon.com/detective/latest/userguide/detective-source-data-about.html#source-data-types-optional
  - id: security-findings-default
    text: The AWS security findings package is enabled by default for new behavior graphs created after May 16, 2023.
    source: https://docs.aws.amazon.com/detective/latest/userguide/source-data-types-asff.html#source-data-types-asff
  - id: graph
    text: Detective uses event data and machine learning to create an interactive view of resource behavior and interactions over time.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#detective-how-works
  - id: history
    text: Detective provides access to up to one year of historical event data.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
  - id: groups
    text: Detective finding groups bring related findings and entities together for investigation.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#detective-features
  - id: investigations
    text: Detective Investigation analyzes IAM users and roles for indicators of compromise.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#detective-features
  - id: accounts
    text: A Detective behavior graph can link analyzed data from one or more AWS accounts; an administrator can invite member accounts to contribute.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#detective-who-uses
  - id: pivot
    text: Detective integrates with GuardDuty and Security Hub CSPM so an investigator can pivot from a GuardDuty finding to Detective.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#detective-who-uses
  - id: guardduty
    text: GuardDuty analyzes AWS logs using threat intelligence and machine learning to identify potentially malicious activity.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#detective-related-services
diagrams:
  - id: detective-source-graph
    title: Core sources feed the behavior graph
    width: 720
    height: 420
    nodes:
      - { id: trail, label: CloudTrail, icon: cloudtrail, x: 30, y: 30, w: 170, h: 72, tone: mgmt }
      - { id: flows, label: VPC Flow Logs, icon: virtual-private-cloud, x: 30, y: 174, w: 170, h: 72, tone: network }
      - { id: findings, label: GuardDuty, icon: guardduty, x: 30, y: 318, w: 170, h: 72, tone: security }
      - { id: graph, label: Detective, icon: detective, x: 480, y: 174, w: 170, h: 86, tone: security, sub: behavior graph }
    edges:
      - { from: trail, to: graph, step: 1 }
      - { from: flows, to: graph, step: 2 }
      - { from: findings, to: graph, step: 3 }
    steps:
      - Detective uses CloudTrail events from graph accounts.
      - Detective uses VPC flow log events from independent streams.
      - Detective ingests GuardDuty findings for enrolled accounts and links activity over time.
cards:
  - id: detective-001
    q: Which service helps investigate the root cause of a GuardDuty finding?
    a: Amazon Detective. It connects activity over time in a behavior graph using core sources including CloudTrail, VPC Flow Logs and GuardDuty findings.
    facts: [purpose, core-sources, graph]
  - id: detective-002
    q: How much historical event data can Amazon Detective make available?
    a: Up to one year.
    facts: [history]
  - id: detective-003
    q: A security team needs to investigate related findings and affected resources together. What Amazon Detective feature helps?
    a: Finding groups. They bring related findings and entities together for investigation.
    facts: [groups]
  - id: detective-004
    q: A security team needs Amazon Detective to investigate suspicious activity across multiple AWS accounts. What can connect their data?
    a: A behavior graph. An administrator can invite member accounts to contribute data.
    facts: [accounts]
  - id: detective-005
    q: Are Amazon EKS audit logs always included in the Amazon Detective core source package?
    a: No. EKS audit logs are a separate source package that must be enabled.
    facts: [core-sources, eks-source]
    trap: true
  - id: detective-006
    q: What does Amazon Detective Investigation analyze for indicators of compromise?
    a: IAM users and roles.
    facts: [investigations]
  - id: detective-007
    q: Must a team configure its existing CloudTrail trail or VPC Flow Logs for Amazon Detective to consume its core event streams?
    a: No. Detective uses independent streams and does not use existing logging configurations.
    facts: [separate-streams]
    trap: true
---

Amazon Detective helps investigate security findings and suspicious activity to understand their root cause. Its behavior graph connects activity and resources over time.

### How it works

1. Detective collects core data from CloudTrail logs, VPC Flow Logs, which describe network flows, and GuardDuty findings. It uses independent event streams without using existing logging configurations.
2. Detective analyzes the data and builds a behavior graph, a linked view of resource activity and interactions.
3. Investigators explore the timeline and resource relationships to understand a finding. Finding groups bring related findings and entities together.
4. A graph administrator can invite other AWS accounts to contribute data. Investigators can move from a GuardDuty finding in GuardDuty or Security Hub CSPM into Detective.

### Exam cues

- If the question says investigate the context and root cause of a GuardDuty finding, think Detective, because it connects activity and resources over time.
- If the question says find potentially malicious activity in AWS logs, think GuardDuty, because it analyzes logs for threats; use Detective to investigate findings.
- If the question says investigate an IAM user or role for signs of compromise, think Detective Investigation, because it analyzes those identities for indicators of compromise, which are observed signs of malicious activity.

### Remember

- Detective provides up to one year of historical event data.
- Core sources include CloudTrail, VPC Flow Logs and GuardDuty findings. EKS audit logs require the separate source package.
- The optional AWS security findings package brings in Security Hub CSPM findings. It is enabled by default for new behavior graphs created after May 16, 2023.

> **Trap:** Detective investigates findings; GuardDuty identifies potentially malicious activity. They are complementary, not interchangeable.
