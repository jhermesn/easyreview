---
title: Scan coverage and Classic assessments
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
Amazon Inspector uses workload scan types to assess resources. Understanding how EC2 inventory is collected and which Lambda functions qualify helps explain scan coverage. [First activation](https://docs.aws.amazon.com/inspector/latest/user/scanning-resources.html) enables EC2, ECR, and Lambda standard scanning.

### How it works

1. For EC2, Inspector compares collected software metadata with security advisories. Agent-based scanning uses Systems Manager Agent, while agentless scanning uses EBS snapshots. [Hybrid mode](https://docs.aws.amazon.com/inspector/latest/user/scanning-ec2.html) combines the methods for managed and eligible unmanaged instances.
2. For Lambda, check the [function's eligibility](https://docs.aws.amazon.com/inspector/latest/user/scanning-lambda.html#supported-functions): a supported runtime, `$LATEST`, recent invocation or update, and no exclusion tag.
3. Recognize the historical [Inspector Classic assessment model](https://aws.amazon.com/blogs/security/how-to-set-up-continuous-golden-ami-vulnerability-assessments-with-amazon-inspector/): EC2 instances launched from golden AMIs used an Inspector agent, tag-selected assessment targets, and assessment templates.

### Exam cues

- If the question says an EC2 instance is managed or eligible but unmanaged, think hybrid scanning, because it uses agent-based and agentless methods respectively.
- If the question says a Lambda function has not been invoked or updated for more than 90 days, think scan eligibility, because recent activity is required.
- If the question says an Inspector agent, assessment targets, and templates, think Inspector Classic, because those describe its historical assessment model.

### Remember

- Hybrid is the default EC2 scan mode.
- Lambda eligibility requires a supported runtime, `$LATEST`, an invocation or update within 90 days, and no exclusion tag.
- Lambda code scanning and machine image scanning require separate activation.
- Inspector Classic support ended [May 20, 2026](https://docs.aws.amazon.com/managedservices/latest/onboardingguide/inspector.html).

> **Trap:** An Inspector agent and tag-selected assessment targets describe Inspector Classic. Current Inspector uses workload scan types, and Classic support has ended.
