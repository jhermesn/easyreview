---
title: "PLACEHOLDER detective/operations-in-depth"
level: professional
order: 20
facts:
  - id: history
    text: Detective provides access to up to one year of historical event data.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
  - id: core-sources
    text: Detective core sources include CloudTrail logs, VPC Flow Logs and GuardDuty findings for accounts enrolled in GuardDuty.
    source: https://docs.aws.amazon.com/detective/latest/userguide/detective-source-data-about.html#source-data-types
  - id: eks-source
    text: EKS audit logs are a source package that must be enabled for the behavior graph.
    source: https://docs.aws.amazon.com/detective/latest/userguide/usage-tracking-admin.html#usage-cost-by-source
  - id: investigations
    text: Detective Investigation analyzes IAM users and roles for indicators of compromise.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#detective-features
cards:
  - id: detective-002
    q: How much historical event data can Amazon Detective make available?
    a: Up to one year.
    facts: [history]
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
