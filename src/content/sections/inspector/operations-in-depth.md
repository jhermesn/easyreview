---
title: "PLACEHOLDER inspector/operations-in-depth"
level: professional
order: 30
facts:
  - id: ec2-methods
    text: EC2 scans compare collected software metadata with security advisories; agent-based scanning uses Systems Manager Agent and agentless scanning uses EBS snapshots.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-ec2.html
  - id: hybrid-default
    text: Hybrid is the default EC2 scanning mode and uses agent-based scanning for managed instances and agentless scanning for eligible unmanaged instances.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-ec2.html
  - id: classic-model
    text: Historically, Inspector Classic assessed EC2 instances launched from golden AMIs using an Inspector agent, tag-selected assessment targets, and assessment templates.
    source: https://aws.amazon.com/blogs/security/how-to-set-up-continuous-golden-ami-vulnerability-assessments-with-amazon-inspector/
  - id: classic-retired
    text: Amazon Inspector Classic reached end of support on May 20, 2026.
    source: https://docs.aws.amazon.com/managedservices/latest/onboardingguide/inspector.html
  - id: initial-types
    text: First activation enables EC2, ECR, and Lambda standard scanning; Lambda code scanning and machine image scanning require separate activation.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-resources.html
  - id: lambda-eligibility
    text: Eligible Lambda functions use a supported runtime, are $LATEST, were invoked or updated within 90 days, and are not excluded by tags.
    source: https://docs.aws.amazon.com/inspector/latest/user/scanning-lambda.html#supported-functions
cards:
  - id: inspector-002
    q: How does Amazon Inspector collect EC2 software information, and what scan mode is the default?
    a: Systems Manager Agent or EBS snapshots. The default hybrid mode combines agent-based scanning for managed instances with agentless scanning for eligible unmanaged instances.
    facts:
      - ec2-methods
      - hybrid-default
  - id: inspector-005
    q: An older Amazon Inspector design uses tag-selected assessment targets, assessment templates, and an Inspector agent. Which version is this?
    a: Inspector Classic. Its support ended May 20, 2026. Current Inspector uses workload scan types.
    trap: true
    facts:
      - classic-model
      - classic-retired
      - initial-types
  - id: inspector-008
    q: An Amazon Inspector Lambda function has not been invoked or updated for more than 90 days. Why might it be outside scan coverage?
    a: Lambda scan eligibility requires an invocation or update within 90 days, a supported runtime, $LATEST, and no exclusion tag.
    trap: true
    facts:
      - lambda-eligibility
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
