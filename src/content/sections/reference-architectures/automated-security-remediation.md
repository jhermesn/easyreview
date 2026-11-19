---
title: Automated security remediation
level: professional
order: 80
facts:
  - id: remediation-runbook
    text: Config remediation runs a managed or custom Systems Manager Automation document defining the corrective actions.
    source: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
  - id: automatic-remediation
    text: Automatic remediation starts configured corrective actions for resources reported as noncompliant.
    source: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
  - id: automatic-role
    text: Automatic Config remediation requires a value for AutomationAssumeRole.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_PutRemediationConfigurations.html
  - id: resource-parameter
    text: A remediation parameter can use a static value or dynamically receive the noncompliant resource ID.
    source: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
  - id: retry-attempts
    text: MaximumAutomaticAttempts is the maximum failed automatic-remediation attempts, defaults to 5, and accepts 1 through 25.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_RemediationConfiguration.html#config-Type-RemediationConfiguration-MaximumAutomaticAttempts
  - id: organization-pack
    text: An organization conformance pack deploys Config rules and remediation actions together across member accounts.
    source: https://docs.aws.amazon.com/config/latest/developerguide/conformance-pack-organization-apis.html#conformance-pack-organization-apis
  - id: central-ownership
    text: Member accounts cannot modify the underlying organization conformance pack rules and remediation actions.
    source: https://docs.aws.amazon.com/config/latest/developerguide/conformance-pack-organization-apis.html#conformance-pack-organization-apis
  - id: config-integration
    text: Activate the AWS Config integration to ingest managed and custom Config rule evaluations as CSPM findings through EventBridge.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html#securityhub-internal-providers
  - id: event-targets
    text: EventBridge patterns filter finding attributes and invoke targets such as Lambda functions and SNS topics.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-all-findings.html#securityhub-cwe-all-findings
  - id: custom-action
    text: Create a custom action in CSPM and match its ARN in an EventBridge rule; ARN means Amazon Resource Name.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html#securityhub-cwe-custom-actions
  - id: automation-rules
    text: CSPM automation rules update findings before EventBridge rules receive and evaluate them.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automations.html#automations
  - id: gd-export
    text: GuardDuty retains findings for 90 days and exports active findings to EventBridge; new active findings are exported within about 5 minutes.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty_exportfindings
  - id: gd-updates
    text: New GuardDuty findings are sent to EventBridge near real time; updates to existing findings default to 6 hours and can be set to 15 minutes or 1 hour.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#eventbridge-freq-notifications-gdu
diagrams:
  - id: automated-security-remediation
    title: Config fixes drift with Automation, and findings trigger event-driven responses
    width: 1240
    height: 640
    groups:
      - { label: Workload account, x: 20, y: 20, w: 560, h: 600, tone: neutral, icon: group-aws-account }
      - { label: Security tooling account, x: 640, y: 20, w: 580, h: 600, tone: security, icon: group-aws-account }
    nodes:
      - { id: bucket, label: S3 bucket, sub: public access opened, x: 60, y: 70, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: rule, label: AWS Config, sub: managed rule, x: 330, y: 70, w: 160, h: 86, tone: mgmt, icon: config, info: "Deployed with an organization conformance pack, so member accounts cannot change it." }
      - { id: runbook, label: Automation, sub: remediation runbook, x: 330, y: 260, w: 160, h: 86, tone: mgmt, icon: res-systems-manager-automation, info: "Runs with the role in `AutomationAssumeRole` and receives the noncompliant resource ID as a parameter." }
      - { id: gd, label: GuardDuty, sub: threat finding, x: 60, y: 460, w: 160, h: 86, tone: security, icon: guardduty }
      - { id: sh, label: Security Hub CSPM, sub: findings, x: 680, y: 70, w: 180, h: 86, tone: security, icon: security-hub, info: "Automation rules can update findings before EventBridge sees them." }
      - { id: eb, label: EventBridge rule, sub: finding pattern, x: 680, y: 300, w: 180, h: 86, tone: integration, icon: res-eventbridge-rule }
      - { id: fn, label: Lambda, sub: response function, x: 1000, y: 300, w: 170, h: 86, tone: compute, icon: lambda }
      - { id: sns, label: SNS topic, sub: security team, x: 1000, y: 480, w: 170, h: 86, tone: integration, icon: res-simple-notification-service-topic }
    edges:
      - { from: bucket, to: rule, step: 1 }
      - { from: rule, to: runbook, step: 2 }
      - { from: runbook, to: bucket, step: 2 }
      - { from: rule, to: sh, step: 3 }
      - { from: gd, to: eb, step: 4 }
      - { from: sh, to: eb, step: 4 }
      - { from: eb, to: fn, step: 5 }
      - { from: eb, to: sns, step: 5 }
    steps:
      - "A change makes the bucket noncompliant, and the Config rule evaluates it as NON_COMPLIANT."
      - "Automatic remediation starts a Systems Manager Automation runbook with the noncompliant resource ID, which reverts the setting. Failed attempts retry up to the configured maximum."
      - "With the Config integration on, the rule's evaluation also becomes a Security Hub CSPM finding."
      - "GuardDuty exports new findings to EventBridge within about 5 minutes, and Security Hub CSPM sends findings and custom actions there too."
      - "An EventBridge rule matches the finding pattern and invokes a Lambda response function and an SNS topic for the security team."
cards:
  - id: reference-architectures-047
    q: "An S3 bucket that becomes public must be fixed automatically within minutes, using AWS managed tooling with no custom servers. What design fits?"
    a: "An **AWS Config rule** with **automatic remediation** that runs a **Systems Manager Automation runbook**, passing the noncompliant resource ID as a parameter."
    facts: [remediation-runbook, automatic-remediation, resource-parameter]
  - id: reference-architectures-048
    q: "Automatic remediation on an AWS Config rule fails to save. The runbook and parameters are set. What is commonly missing?"
    a: "The **AutomationAssumeRole** value: automatic remediation requires a role for the Automation runbook to run with."
    trap: true
    facts: [automatic-role]
  - id: reference-architectures-049
    q: "A security team must deploy the same Config rules and remediations to every member account, and account admins must not be able to change them. What fits?"
    a: "An **organization conformance pack**. It deploys rules and remediation actions together, and member accounts cannot modify them."
    facts: [organization-pack, central-ownership]
  - id: reference-architectures-050
    q: "A team wants a Lambda function to run automatically whenever a high-severity Security Hub CSPM or GuardDuty finding appears. What should it build?"
    a: "An **EventBridge rule** whose pattern matches the finding attributes, with the Lambda function (and an SNS topic if people must know) as targets."
    facts: [event-targets, gd-export]
  - id: reference-architectures-051
    q: "Analysts want to choose a Security Hub CSPM finding in the console and send it to a ticketing workflow on demand, not for every finding. What fits?"
    a: "A Security Hub CSPM **custom action**, matched by its ARN in an EventBridge rule that targets the workflow."
    facts: [custom-action]
  - id: reference-architectures-052
    q: "An EventBridge rule triggers on GuardDuty findings, but changes to an existing finding arrive hours later. Why, and what can change it?"
    a: "New findings export in about 5 minutes, but **updates to existing findings** default to every 6 hours. Set the frequency to 15 minutes or 1 hour."
    trap: true
    facts: [gd-export, gd-updates]
  - id: reference-architectures-053
    q: "A Security Hub CSPM automation rule suppresses some findings, and an EventBridge rule should only see the remaining ones. Does the order work?"
    a: "Yes. **Automation rules update findings before** EventBridge rules receive and evaluate them."
    facts: [automation-rules]
---
Remediation questions describe a misconfiguration or a threat and ask for the fastest automatic response with the least custom code. Two paths cover most of them: AWS Config with Systems Manager Automation fixes configuration drift, and EventBridge routes security findings to code or people.

### How it works

1. An AWS Config rule, deployed to every account by an organization conformance pack, evaluates each change. [Remediation](https://docs.aws.amazon.com/config/latest/developerguide/remediation.html)
2. For noncompliant resources, automatic remediation runs a Systems Manager Automation runbook, using the role in `AutomationAssumeRole`, and retries up to `MaximumAutomaticAttempts`.
3. With the Config integration on, Security Hub CSPM receives the evaluation as a finding. Automation rules can update findings first.
4. GuardDuty and Security Hub CSPM send findings to EventBridge. A rule matches the pattern and invokes Lambda or SNS, and custom actions let an analyst send one finding on demand.

| Need | Use |
|---|---|
| Revert a misconfiguration automatically | Config rule plus automatic remediation (Automation runbook) |
| Same rules and fixes in every account | Organization conformance pack |
| React to threat findings | GuardDuty or Security Hub CSPM finding, then EventBridge, then Lambda or SNS |
| Analyst-chosen response | Security Hub CSPM custom action |

### Exam cues

- If the question says fix noncompliant resources automatically with the least effort, think Config automatic remediation with an Automation runbook.
- If the question says member accounts must not change the rules, think organization conformance pack.
- If the question says act on every new finding, think an EventBridge rule on the finding pattern.
- If the question says an analyst selects which findings to act on, think a Security Hub CSPM custom action.

### Remember

- Automatic remediation requires `AutomationAssumeRole`.
- `MaximumAutomaticAttempts` defaults to 5 (range 1 to 25).
- GuardDuty exports new findings in about 5 minutes; updates every 6 hours by default.
- Automation rules run before EventBridge sees findings.

> **Trap:** A Config aggregator or Security Hub CSPM only reports problems. Something must act on them: automatic remediation, or an EventBridge rule with a target.
