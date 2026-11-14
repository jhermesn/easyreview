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
  - id: stale-snapshot
    text: Automatic remediation uses periodically captured compliance snapshots and can run on resources
      that became compliant after the snapshot.
    source: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
  - id: remediation-diagnostics
    text: DescribeRemediationExecutionStatus and its CLI equivalent
      describe-remediation-execution-status report execution states, step timestamps, and failure
      messages.
    source: https://docs.aws.amazon.com/config/latest/developerguide/setup-autoremediation.html#setup-autoremediation
  - id: automation-permissions
    text: Automation failures can result from insufficient action permissions, a missing Systems Manager
      trust relationship, or missing iam:PassRole permission for the caller starting Automation.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-troubleshooting.html
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
  - id: exception-blocks
    text: A remediation exception excludes a resource from automatic remediation until the exception is
      cleared.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_PutRemediationExceptions.html
  - id: concurrency-control
    text: ConcurrentExecutionRatePercentage limits the percentage of noncompliant resources remediated
      in parallel and defaults to 10 percent.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_SsmControls.html#config-Type-SsmControls-ConcurrentExecutionRatePercentage
  - id: error-control
    text: ErrorPercentage controls the error percentage allowed before Systems Manager stops running
      automations for the rule and defaults to 50 percent.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_SsmControls.html#config-Type-SsmControls-ErrorPercentage
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
  - id: s3-public-runbook
    text: AWS-DisableS3BucketPublicReadWrite uses S3 Block Public Access and takes the target bucket in
      S3BucketName.
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-aws-disables3bucketpublicreadwrite.html
  - id: organization-pack
    text: An organization conformance pack deploys Config rules and remediation actions together across
      member accounts.
    source: https://docs.aws.amazon.com/config/latest/developerguide/conformance-pack-organization-apis.html#conformance-pack-organization-apis
  - id: recording-flow
    text: A recorder stores configuration changes for selected resource types as configuration items.
    source: https://docs.aws.amazon.com/config/latest/developerguide/stop-start-recorder.html#stop-start-recorder
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
  - id: config-010
    q: AWS Config automatic remediation starts for a resource that is already compliant. Why can this
      happen?
    a: Its compliance snapshot can be stale. A resource corrected after the snapshot can still be
      selected for automatic remediation.
    trap: true
    facts:
      - stale-snapshot
  - id: config-011
    q: AWS Config remediation fails despite a valid runbook. Which execution details and permissions
      should an operator inspect?
    a: Use DescribeRemediationExecutionStatus for failed steps and errors. Check parameter values,
      Automation role action permissions and Systems Manager trust, and any PassRole error for the
      caller starting Automation.
    facts:
      - remediation-diagnostics
      - resource-parameter
      - automation-permissions
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
  - id: config-025
    q: Which AWS Config remediation controls limit simultaneous fixes and repeated failures?
    a: ConcurrentExecutionRatePercentage limits parallel remediation; ErrorPercentage controls when
      errors stop further automations. MaximumAutomaticAttempts and RetryAttemptSeconds control
      retries before an exception.
    facts:
      - concurrency-control
      - error-control
      - retry-attempts
      - retry-window
  - id: config-026
    q: An AWS Config rule flags unwanted public S3 bucket access. Which runbook and parameters can
      support automatic correction?
    a: AWS-DisableS3BucketPublicReadWrite uses S3 Block Public Access. Supply S3BucketName and
      AutomationAssumeRole for automatic Config remediation; pack rules require remediation in the
      pack template.
    facts:
      - s3-public-runbook
      - automatic-role
      - pack-remediation
  - id: config-040
    q: What are AWS Config automatic remediation's default failed-attempt count and retry window?
    a: MaximumAutomaticAttempts defaults to 5 and RetryAttemptSeconds to 60 seconds. Reaching the
      failure threshold within the window adds a remediation exception that blocks further automatic
      remediation.
    facts:
      - retry-attempts
      - retry-window
      - exception-blocks
  - id: config-041
    q: What are the AWS Config remediation defaults for concurrency and allowed errors?
    a: ConcurrentExecutionRatePercentage defaults to 10 percent; ErrorPercentage defaults to 50 percent.
    facts:
      - concurrency-control
      - error-control
  - id: config-042
    q: An AWS Config resource has a remediation exception after repeated failures. Will automatic
      remediation keep retrying it?
    a: No. The exception excludes it from automatic remediation until the exception is cleared.
    trap: true
    facts:
      - exception-blocks
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
---
AWS Config **remediation** corrects a resource that a rule reports as noncompliant. The rule detects the problem; a Systems Manager Automation **runbook**, a document listing corrective actions, performs the fix.

### How it works

1. Associate a managed or custom Automation runbook with a supported Config rule. For rules created by a conformance pack, put the remediation in the pack template and update the pack. Direct `PutRemediationConfigurations` does not support service-linked rules, including organization rules.
2. Supply the runbook's parameters. A **static parameter** stays fixed; a **dynamic parameter** receives the noncompliant resource ID at runtime. For example, `AWS-DisableS3BucketPublicReadWrite` uses S3 Block Public Access and takes the bucket name in `S3BucketName`.
3. Choose manual or automatic remediation. Manual waits for an operator to select resources and start the action. Automatic starts for reported noncompliance and requires `AutomationAssumeRole`, the IAM role whose permissions Automation uses.
4. Configure retries and execution controls. **Concurrency** is how many fixes may run at once. A **remediation exception** stops automatic remediation for a resource until the exception is cleared.
5. Inspect failures with `DescribeRemediationExecutionStatus` or `describe-remediation-execution-status`. Check failed steps, parameter values, role permissions, its **trust relationship**, which permits Systems Manager to assume it, and any `iam:PassRole` error for the caller starting Automation. `iam:PassRole` permits passing a role for a service to use; Config remediation setup also lists it as a dependent permission.
6. For notifications, match `aws.config` events of type `Config Rules Compliance Change` in EventBridge and target an SNS topic, a channel for publishing messages to subscribers. `ComplianceChangeNotification` identifies a changed compliance result. This notification path is separate from automatic remediation.

### Exam cues

- If the question says automatically correct noncompliant resources, think Config remediation plus an Automation runbook, because the evaluation and corrective action have separate responsibilities.
- If the question says alert on unrestricted incoming SSH but let a person decide the fix, think `restricted-ssh`, EventBridge, SNS, and manual remediation, because automatic correction is not required for notification.
- If the question says detect old active IAM user access keys, think periodic `access-keys-rotated` with `maxAccessKeyAge`, because it compares key age with the configured threshold.
- If the question says corrected resources are still remediated, think a stale compliance snapshot, because automatic remediation selects resources from periodically captured compliance data.
- If the question says deploy checks and fixes across member accounts, think an organization conformance pack, because it packages both in the deployment template.

### Remember

| Setting | Meaning | Default |
|---|---|---|
| `MaximumAutomaticAttempts` | Failed attempts counted before an exception; accepts 1 through 25 | 5 |
| `RetryAttemptSeconds` | Window for counting attempts before an exception | 60 seconds |
| `ConcurrentExecutionRatePercentage` | Percentage of noncompliant resources allowed to run in parallel | 10 percent |
| `ErrorPercentage` | Allowed errors before Systems Manager stops further automations | 50 percent |

- `access-keys-rotated` defaults to 90 days and excludes root user keys.
- `restricted-ssh` checks unrestricted SSH from `0.0.0.0/0` or `::/0`, meaning any IPv4 or IPv6 address. It has both change and periodic triggers.
- Automatic remediation requires `AutomationAssumeRole` even when a runbook can otherwise run without an explicit role.
- Config event delivery to EventBridge is best effort.

> **Trap:** The retry window counts attempts before adding an exception. It is not a guaranteed interval between attempts or a guaranteed repair deadline.

> **Trap:** A compliant resource can still be selected by automatic remediation if the latest compliance snapshot is stale.
