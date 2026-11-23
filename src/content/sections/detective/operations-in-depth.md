---
title: Investigation sources and history
level: professional
order: 20
facts:
  - id: core-sources
    text: Detective core sources include CloudTrail logs, VPC Flow Logs and GuardDuty findings for accounts enrolled in GuardDuty.
    source: https://docs.aws.amazon.com/detective/latest/userguide/detective-source-data-about.html#source-data-types
  - id: eks-source
    text: EKS audit logs are a source package that must be enabled for the behavior graph.
    source: https://docs.aws.amazon.com/detective/latest/userguide/usage-tracking-admin.html#usage-cost-by-source
  - id: investigations
    text: Detective Investigation analyzes IAM users and roles for indicators of compromise.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#detective-features
  - id: history
    text: Detective provides access to up to one year of historical event data.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
cards:
  - id: detective-005
    q: Are Amazon EKS audit logs always included in the Amazon Detective core source package?
    a: No. EKS audit logs are a separate source package that must be enabled.
    facts: [core-sources, eks-source]
    trap: true
  - id: detective-006
    q: What does Amazon Detective Investigation analyze for indicators of compromise?
    a: IAM users and roles.
    facts: [investigations]
---
Amazon Detective source packages extend its investigation data. Detective Investigation analyzes IAM users and roles for indicators of compromise, or signs of malicious activity.

### How it works

1. The core sources include CloudTrail logs, VPC Flow Logs and GuardDuty findings for accounts enrolled in GuardDuty.
2. EKS audit logs require a separate source package enabled for the behavior graph.
3. Detective Investigation analyzes IAM users and roles for indicators of compromise.

### Exam cues

- If the question says investigate an IAM user or role for indicators of compromise, think Detective Investigation, because it analyzes those identities.
- If the question says include EKS audit logs in a behavior graph, think of enabling their source package, because they are separate from the core sources.

### Remember

- GuardDuty findings are a core source for accounts enrolled in GuardDuty. EKS audit logs require a separate source package.

> **Trap:** EKS audit logs are not part of the core source package. Enable their separate package for the behavior graph.
