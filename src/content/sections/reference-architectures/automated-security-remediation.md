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
  - id: isolation
    text: AWS recommends isolating a potentially compromised EC2 instance with a dedicated security group and removing its other security groups.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/compromised-ec2.html
  - id: connections
    text: Changing security groups does not terminate existing tracked connections on an EC2 instance.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/compromised-ec2.html
  - id: role-caller
    text: A cross-account AssumeRole caller needs sts:AssumeRole permission on the target role ARN.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole
  - id: role-trust
    text: The target role trust policy must trust the caller or its account for cross-account AssumeRole.
    source: https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html#API_AssumeRole
  - id: detective
    text: Amazon Detective helps investigate security findings and suspicious activity by collecting log data and building visualizations to find the root cause.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
  - id: detective-history
    text: Detective keeps up to a year of historical event data and links activity to GuardDuty findings.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
  - id: eb-retry
    text: By default, EventBridge retries delivering an event to a target for 24 hours and up to 185 times with exponential backoff and jitter; after that the event is dropped.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-retry-policy.html
  - id: eb-dlq
    text: A dead-letter queue, a standard SQS queue set on a rule target, keeps events that could not be delivered so they can be processed later; errors such as missing permissions to the target go there without retries.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html
diagrams:
  - id: automated-security-remediation
    title: Config fixes drift with Automation, and findings trigger a cross-account response
    width: 1240
    height: 800
    groups:
      - { label: Workload account, x: 20, y: 20, w: 560, h: 760, tone: neutral, icon: group-aws-account }
      - { label: Security tooling account, x: 640, y: 20, w: 580, h: 760, tone: security, icon: group-aws-account }
    nodes:
      - { id: bucket, label: S3 bucket, sub: public access opened, x: 60, y: 70, w: 160, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: rule, label: AWS Config, sub: managed rule, x: 330, y: 70, w: 160, h: 86, tone: mgmt, icon: config, info: "Deployed with an organization conformance pack from the security account, so member accounts cannot change it." }
      - { id: runbook, label: Automation, sub: remediation runbook, x: 330, y: 260, w: 160, h: 86, tone: mgmt, icon: res-systems-manager-automation, info: "Runs with the role in `AutomationAssumeRole` and receives the noncompliant resource ID as a parameter." }
      - { id: role, label: Isolation role, sub: trusts security account, x: 60, y: 460, w: 160, h: 86, tone: security, icon: res-identity-access-management-role }
      - { id: ec2, label: EC2 instance, sub: compromised, x: 60, y: 630, w: 160, h: 86, tone: compute, icon: res-ec2-instance }
      - { id: sh, label: Security Hub CSPM, sub: delegated admin, x: 680, y: 70, w: 180, h: 86, tone: security, icon: security-hub, info: "Automation rules can update findings before EventBridge sees them." }
      - { id: detective, label: Detective, sub: investigation, x: 1000, y: 70, w: 170, h: 86, tone: security, icon: detective }
      - { id: eb, label: EventBridge rule, sub: finding pattern, x: 680, y: 210, w: 180, h: 86, tone: integration, icon: res-eventbridge-rule }
      - { id: sns, label: SNS topic, sub: security team, x: 1000, y: 210, w: 170, h: 86, tone: integration, icon: res-simple-notification-service-topic }
      - { id: fn, label: Lambda, sub: response function, x: 1000, y: 350, w: 170, h: 86, tone: compute, icon: lambda }
      - { id: gd, label: GuardDuty, sub: delegated admin, x: 680, y: 490, w: 180, h: 86, tone: security, icon: guardduty }
      - { id: dlq, label: SQS DLQ, sub: undelivered events, x: 1000, y: 490, w: 170, h: 86, tone: integration, icon: simple-queue-service }
    edges:
      - { from: bucket, to: rule, step: 1 }
      - { from: rule, to: runbook, step: 2 }
      - { from: runbook, to: bucket, step: 2 }
      - { from: rule, to: sh, step: 3 }
      - { from: ec2, to: gd, step: 4 }
      - { from: gd, to: eb, step: 5 }
      - { from: sh, to: eb, step: 5 }
      - { from: eb, to: sns, step: 6 }
      - { from: eb, to: fn, step: 6 }
      - { from: fn, to: role, step: 7 }
      - { from: role, to: ec2, step: 7 }
      - { from: sh, to: detective, step: 8 }
      - { from: eb, to: dlq, step: 9, dashed: true }
    steps:
      - "An organization conformance pack from the security account puts the Config rule and its remediation in every member account. A change makes the bucket noncompliant, and the rule evaluates it as NON_COMPLIANT."
      - "Automatic remediation starts a Systems Manager Automation runbook with the noncompliant resource ID, which reverts the setting. Failed attempts retry up to the configured maximum."
      - "With the Config integration on, the rule's evaluation also becomes a finding in Security Hub CSPM."
      - "GuardDuty detects suspicious activity from the EC2 instance and creates a finding in the delegated administrator account."
      - "GuardDuty and Security Hub CSPM send their findings to EventBridge."
      - "An EventBridge rule matches the finding pattern, alerts the security team through SNS and invokes a Lambda response function."
      - "The function assumes the isolation role in the workload account, whose trust policy names the security account's role, and moves the instance to an isolation security group. Connections already tracked stay open."
      - "Analysts investigate the root cause in Detective, which links up to a year of activity to the GuardDuty finding."
      - "If EventBridge cannot deliver to a target after its retries, or the error is not retryable, the event goes to a dead-letter queue instead of being dropped."
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
  - id: reference-architectures-131
    q: "A GuardDuty finding shows an EC2 instance in a workload account talking to a known malicious host. A Lambda function in the security account must contain it automatically. What design fits?"
    a: "An EventBridge rule on the finding invokes Lambda, which **assumes a role in the workload account** (its trust policy names the security account's role) and moves the instance to a dedicated **isolation security group**."
    facts: [isolation, role-caller, role-trust]
  - id: reference-architectures-132
    q: "After a compromised instance is moved to an isolation security group with no rules, the attacker's existing session keeps working. Why?"
    a: "Changing security groups does **not end connections that are already tracked**. Isolation stops new connections; existing ones need other action."
    trap: true
    facts: [connections, isolation]
  - id: reference-architectures-133
    q: "The Lambda target of a security EventBridge rule was down for a day, and some findings never triggered a response. How should the rule be configured?"
    a: "Add a **dead-letter queue** to the target. EventBridge retries for up to 24 hours and 185 attempts by default, then drops the event unless a DLQ keeps it."
    facts: [eb-retry, eb-dlq]
  - id: reference-architectures-134
    q: "An EventBridge rule's target role lost permission to invoke the function. Will EventBridge retry for 24 hours?"
    a: "No. Errors such as **missing permissions** are not retried; the event goes straight to the DLQ if one is configured, or is lost."
    trap: true
    facts: [eb-dlq]
  - id: reference-architectures-135
    q: "After containment, analysts must find the root cause of a GuardDuty finding using months of related activity. Which service fits?"
    a: "**Amazon Detective**, which builds visualizations from log data and links up to a year of history to GuardDuty findings."
    facts: [detective, detective-history]
---
Remediation questions describe a misconfiguration or a threat and ask for the fastest automatic response with the least custom code. Two paths cover most of them: AWS Config with Systems Manager Automation fixes configuration drift, and EventBridge routes security findings to code or people.

### How it works

1. An AWS Config rule, deployed to every account by an organization conformance pack, evaluates each change. [Remediation](https://docs.aws.amazon.com/config/latest/developerguide/remediation.html)
2. For noncompliant resources, automatic remediation runs a Systems Manager Automation runbook, using the role in `AutomationAssumeRole`, and retries up to `MaximumAutomaticAttempts`.
3. With the Config integration on, Security Hub CSPM receives the evaluation as a finding. Automation rules can update findings first.
4. GuardDuty and Security Hub CSPM send findings to EventBridge. A rule matches the pattern and invokes Lambda or SNS, and custom actions let an analyst send one finding on demand.
5. To act in a workload account, the function assumes a role there whose trust policy names the security account, for example to move an instance to an isolation security group.
6. A dead-letter queue on each target keeps events that could not be delivered, and Detective helps analysts find the root cause.

| Need | Use |
|---|---|
| Revert a misconfiguration automatically | Config rule plus automatic remediation (Automation runbook) |
| Same rules and fixes in every account | Organization conformance pack |
| React to threat findings | GuardDuty or Security Hub CSPM finding, then EventBridge, then Lambda or SNS |
| Analyst-chosen response | Security Hub CSPM custom action |
| Act in another account | Lambda assumes a role that trusts the security account |
| Contain a compromised instance | Isolation security group (tracked connections stay open) |
| Never lose a finding event | Dead-letter queue on the rule target |
| Find the root cause | Amazon Detective |

### Exam cues

- If the question says fix noncompliant resources automatically with the least effort, think Config automatic remediation with an Automation runbook.
- If the question says member accounts must not change the rules, think organization conformance pack.
- If the question says act on every new finding, think an EventBridge rule on the finding pattern.
- If the question says an analyst selects which findings to act on, think a Security Hub CSPM custom action.
- If the question says isolate a compromised instance automatically, think EventBridge, Lambda and an isolation security group.
- If the question says events must not be lost when a target fails, think a dead-letter queue on the target.

### Remember

- Automatic remediation requires `AutomationAssumeRole`.
- `MaximumAutomaticAttempts` defaults to 5 (range 1 to 25).
- GuardDuty exports new findings in about 5 minutes; updates every 6 hours by default.
- Automation rules run before EventBridge sees findings.
- EventBridge retries a target for 24 hours and 185 attempts by default, then drops the event without a DLQ.

> **Trap:** A Config aggregator or Security Hub CSPM only reports problems. Something must act on them: automatic remediation, or an EventBridge rule with a target.
