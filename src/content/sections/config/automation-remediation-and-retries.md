---
title: Automation remediation and retries
level: associate
order: 30
facts:
  - id: remediation-runbook
    text: Config remediation runs a managed or custom Systems Manager Automation document defining the
      corrective actions.
    source: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html#remediation
  - id: manual-remediation
    text: Manual remediation requires an operator to select resources and start the configured
      remediation action.
    source: https://docs.aws.amazon.com/config/latest/developerguide/setup-manualremediation.html#setup-manualremediation
  - id: automatic-remediation
    text: Automatic remediation starts configured corrective actions for resources reported as
      noncompliant.
    source: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
  - id: automatic-role
    text: Automatic Config remediation requires a value for AutomationAssumeRole.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_PutRemediationConfigurations.html
  - id: resource-parameter
    text: A remediation parameter can use a static value or dynamically receive the noncompliant
      resource ID.
    source: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
  - id: service-linked-remediation
    text: PutRemediationConfigurations cannot add remediation to service-linked rules, including
      organization rules, pack rules, and Security Hub rules.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_PutRemediationConfigurations.html
  - id: pack-remediation
    text: Add remediation for a service-linked pack rule to the conformance pack template and update the
      pack.
    source: https://docs.aws.amazon.com/config/latest/developerguide/service-linked-awsconfig-rules.html#service-linked-awsconfig-rules
  - id: retry-attempts
    text: MaximumAutomaticAttempts is the maximum failed automatic-remediation attempts, defaults to 5,
      and accepts 1 through 25.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_RemediationConfiguration.html#config-Type-RemediationConfiguration-MaximumAutomaticAttempts
  - id: retry-window
    text: RetryAttemptSeconds is the time window for counting attempts before adding a remediation
      exception and defaults to 60 seconds.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_RemediationConfiguration.html#config-Type-RemediationConfiguration-RetryAttemptSeconds
  - id: compliance-events
    text: EventBridge can match Config Rules Compliance Change events from aws.config and
      ComplianceChangeNotification messages to react to changed compliance.
    source: https://docs.aws.amazon.com/config/latest/developerguide/monitor-config-with-cloudwatchevents.html#create-cloudwatch-events-rule-for-awsconfig
  - id: event-delivery
    text: Config emits events to EventBridge on a best-effort basis.
    source: https://docs.aws.amazon.com/config/latest/developerguide/monitor-config-with-cloudwatchevents.html#create-cloudwatch-events-rule-for-awsconfig
  - id: sns-target
    text: An EventBridge rule can send matching events to an Amazon SNS topic.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html
  - id: key-rotation-rule
    text: The periodic access-keys-rotated rule checks whether active IAM access keys exceed
      maxAccessKeyAge, which defaults to 90 days.
    source: https://docs.aws.amazon.com/config/latest/developerguide/access-keys-rotated.html
  - id: root-key-exclusion
    text: The access-keys-rotated rule does not evaluate root user access keys.
    source: https://docs.aws.amazon.com/config/latest/developerguide/access-keys-rotated.html
  - id: ssh-rule
    text: The restricted-ssh rule flags unrestricted incoming SSH access from 0.0.0.0/0 or ::/0 as
      NON_COMPLIANT and uses configuration-change and periodic triggers.
    source: https://docs.aws.amazon.com/config/latest/developerguide/restricted-ssh.html#restricted-ssh
  - id: organization-pack
    text: An organization conformance pack deploys Config rules and remediation actions together across
      member accounts.
    source: https://docs.aws.amazon.com/config/latest/developerguide/conformance-pack-organization-apis.html#conformance-pack-organization-apis
  - id: recording-flow
    text: "AWS Config records only selected supported resource types; continuous recording captures changes as they occur, while daily recording keeps the latest state in a 24-hour period only if it differs from the previous recorded state."
    source: https://docs.aws.amazon.com/config/latest/developerguide/select-resources.html#select-resources-recording-frequency
  - id: rule-triggers
    text: Config rule evaluations can follow configuration changes, a periodic schedule, or both.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_components.html#evaluate-config_use-managed-rules-trigger
  - id: aggregation-flow
    text: An aggregator provides a read-only copy of source account and Region configuration and
      compliance data.
    source: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html
  - id: runbook-definition
    text: An Automation runbook defines the actions that Systems Manager performs in sequential steps.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-documents.html
  - id: role-definition
    text: An IAM role is an assumable identity with permissions governing the actions it may perform.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
  - id: configure-passrole
    text: PutRemediationConfigurations lists iam:PassRole to ssm.amazonaws.com as a dependent permission.
    source: https://docs.aws.amazon.com/service-authorization/latest/reference/list_config.html
  - id: passrole-definition
    text: iam:PassRole permits a caller to pass an IAM role to an AWS service for that service to assume
      later.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html
  - id: topic-definition
    text: An SNS topic is a communication channel delivering messages to subscribing endpoints.
    source: https://docs.aws.amazon.com/config/latest/developerguide/how-does-config-work.html#delivery-channel-SNS-topic
  - id: s3-logging-remediation
    text: The managed rule s3-bucket-logging-enabled flags buckets without server access logging, and the AWS-ConfigureS3BucketLogging runbook can remediate them automatically.
    source: https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-logging-enabled.html
  - id: list-key-metadata
    text: "IAM ListAccessKeys returns access key metadata including status and creation date."
    source: https://docs.aws.amazon.com/IAM/latest/APIReference/API_ListAccessKeys.html
  - id: lambda-target
    text: An EventBridge rule can invoke an AWS Lambda function as a target.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html
diagrams:
  - id: config-compliance-flow
    title: Record, evaluate, remediate and aggregate
    width: 1260
    height: 420
    nodes:
      - id: resource
        label: EC2 instance
        sub: configuration change
        icon: res-ec2-instance
        h: 86
        x: 20
        y: 70
        w: 160
        tone: compute
        info: An example supported resource selected for recording.
      - id: recorder
        label: Config recorder
        sub: configuration items
        icon: config
        h: 86
        x: 300
        y: 70
        w: 180
        tone: mgmt
        info: Records selected resource configurations. Periodic rule evaluations do not depend on
          configuration items.
      - id: rule
        label: Config rule
        sub: evaluation results
        icon: config
        h: 86
        x: 600
        y: 70
        w: 180
        tone: mgmt
        info: Evaluates on matching configuration changes, a periodic schedule, or both, depending on the
          rule.
      - id: remedy
        label: SSM Automation
        sub: corrective runbook
        icon: res-systems-manager-automation
        h: 86
        x: 1020
        y: 70
        w: 190
        tone: mgmt
        info: Automatic remediation uses a runbook, parameters, and AutomationAssumeRole. Manual remediation
          waits for an operator.
      - id: agg
        label: Aggregator
        sub: central account
        icon: config
        h: 86
        x: 600
        y: 285
        w: 180
        tone: mgmt
        info: Reads replicated configuration and compliance data. It cannot deploy rules into source
          accounts.
      - id: bus
        label: EventBridge
        sub: compliance change
        icon: eventbridge
        h: 86
        x: 1020
        y: 285
        w: 190
        tone: integration
        info: Matches compliance change events for notifications or other workflows. Config event delivery
          is best effort.
    edges:
      - from: resource
        to: recorder
        step: 1
      - from: recorder
        to: rule
        step: 2
      - from: rule
        to: remedy
        step: 3
        label: noncompliance
      - from: rule
        to: agg
        step: 4
        label: read-only copy
        dashed: true
      - from: rule
        to: bus
        step: 5
        label: event
        dashed: true
    steps:
      - A configuration change to a selected resource produces a configuration item at the recording
        frequency.
      - A configuration-change rule evaluates matching changes; periodic evaluations run on their
        schedule.
      - Configured automatic remediation starts a runbook for reported noncompliance; manual
        remediation waits for an operator.
      - An aggregator independently collects source configuration and compliance data into a central
        read-only view.
      - Compliance changes can independently trigger EventBridge notifications or other workflows.

cards:
  - id: config-001
    q: A team wants AWS Config to detect old active IAM user access keys, alert operators, and support
      an automated response. Which components fit?
    a: Use access-keys-rotated with maxAccessKeyAge, an EventBridge compliance-change rule targeting
      SNS, and a suitable Automation remediation runbook if a fix is required. The age defaults to
      90 days; root keys are excluded.
    facts:
      - key-rotation-rule
      - root-key-exclusion
      - compliance-events
      - sns-target
      - remediation-runbook
  - id: config-008
    q: How does an AWS Config rule automatically correct a noncompliant resource?
    a: Configure automatic remediation with a Systems Manager Automation runbook, its parameters, and
      AutomationAssumeRole. A parameter can receive the resource ID dynamically.
    facts:
      - automatic-remediation
      - remediation-runbook
      - automatic-role
      - resource-parameter
  - id: config-009
    q: What starts manual versus automatic AWS Config remediation?
    a: An operator starts manual remediation for selected resources. Automatic remediation starts for
      reported noncompliance and can retry failed actions within its configured window.
    facts:
      - manual-remediation
      - automatic-remediation
      - retry-attempts
      - retry-window
  - id: config-020
    q: A security team needs AWS Config rules and automatic fixes for unwanted S3 public access across
      member accounts. How should it package the deployment?
    a: Use an organization conformance pack containing the rule and suitable Automation remediation. Add
      pack-rule remediation through the pack template, rather than attaching it directly to an
      organization rule.
    facts:
      - organization-pack
      - pack-remediation
      - service-linked-remediation
  - id: config-021
    q: A team wants an alert when AWS Config detects unrestricted incoming SSH in security groups, but
      wants a person to decide on the fix. What should it configure?
    a: Use restricted-ssh and an EventBridge compliance-change rule targeting SNS. Keep remediation
      manual so an operator starts any configured fix.
    facts:
      - ssh-rule
      - compliance-events
      - sns-target
      - manual-remediation
  - id: config-043
    q: An AWS Config compliance alert needs to notify an SNS topic without automatically correcting
      resources. Which event path fits?
    a: Match aws.config Config Rules Compliance Change events with EventBridge and target SNS. Automatic
      remediation is a separately configured action; Config event delivery is best effort.
    facts:
      - compliance-events
      - sns-target
      - automatic-remediation
      - event-delivery
  - id: config-050
    q: A company must turn on S3 server access logging automatically for any bucket that lacks it. What fits?
    a: The AWS Config rule s3-bucket-logging-enabled with automatic remediation through the AWS-ConfigureS3BucketLogging runbook.
    facts: [s3-logging-remediation]
  - id: config-054
    q: "An AWS Config audit needs every configuration change for selected supported resources. Should the team choose daily or continuous recording?"
    a: "Continuous recording. Daily recording retains only the latest changed state over a 24-hour period."
    facts: [recording-flow]
  - id: config-060
    q: "How can a team identify old inactive IAM user access keys that the AWS Config access-keys-rotated rule does not evaluate?"
    a: "List the user access keys and compare their status and creation dates independently."
    facts: [list-key-metadata, key-rotation-rule]
  - id: config-063
    q: How can AWS Config compliance changes invoke an AWS Lambda function?
    a: Match Config compliance change events with an EventBridge rule that targets the Lambda function.
    facts: [compliance-events, lambda-target]
---
AWS Config **remediation** corrects a resource that a rule reports as noncompliant. The rule detects the problem; a Systems Manager Automation **runbook**, a document listing corrective actions, performs the fix.

### How it works

1. Associate a managed or custom Automation runbook with a supported Config rule. For rules created by a conformance pack, put the remediation in the pack template and update the pack. Direct `PutRemediationConfigurations` does not support service-linked rules, including organization rules.
2. Supply the runbook's parameters. A **static parameter** stays fixed; a **dynamic parameter** receives the noncompliant resource ID at runtime.
3. Choose manual or automatic remediation. Manual waits for an operator to select resources and start the action. Automatic starts for reported noncompliance and requires `AutomationAssumeRole`, the IAM role whose permissions Automation uses.
4. Configure retries for failed automatic actions within a time window.
5. For notifications, match `aws.config` events of type `Config Rules Compliance Change` in EventBridge and target an SNS topic, a channel for publishing messages to subscribers. `ComplianceChangeNotification` identifies a changed compliance result. This notification path is separate from automatic remediation.

### Exam cues

- If the question says invoke Lambda after an AWS Config compliance change, think an EventBridge rule, because it can match the event and target the function.
- If the question says find old inactive IAM keys, think ListAccessKeys and compare creation dates, because access-keys-rotated evaluates active keys.
- If the question says automatically correct noncompliant resources, think Config remediation plus an Automation runbook, because the evaluation and corrective action have separate responsibilities.
- If the question says alert on unrestricted incoming SSH but let a person decide the fix, think `restricted-ssh`, EventBridge, SNS, and manual remediation, because automatic correction is not required for notification.
- If the question says detect old active IAM user access keys, think periodic `access-keys-rotated` with `maxAccessKeyAge`, because it compares key age with the configured threshold.
- If the question says deploy checks and fixes across member accounts, think an organization conformance pack, because it packages both in the deployment template.
- If the question says enable S3 server access logging for buckets without it, think `s3-bucket-logging-enabled` and `AWS-ConfigureS3BucketLogging`, because the rule detects missing logging and the runbook can remediate it automatically.

### Remember

- Recording covers selected supported resource types. Continuous recording captures changes as they happen; daily recording retains only the latest changed state over 24 hours.
- `access-keys-rotated` defaults to 90 days and excludes root user keys.
- `restricted-ssh` checks unrestricted SSH from `0.0.0.0/0` or `::/0`, meaning any IPv4 or IPv6 address. It has both change and periodic triggers.
- Automatic remediation requires `AutomationAssumeRole` even when a runbook can otherwise run without an explicit role.
- Config event delivery to EventBridge is best effort.

> **Trap:** An EventBridge notification does not automatically fix the resource. Automatic remediation is configured separately.
