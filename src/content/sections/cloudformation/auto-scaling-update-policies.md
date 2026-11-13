---
title: Auto Scaling update policies
level: professional
order: 180
facts:
  - id: rolling
    text: AutoScalingRollingUpdate replaces instances in batches within the existing Auto Scaling group
      for supported property changes.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-rollingupdate
  - id: batch-default
    text: Rolling MaxBatchSize defaults to 1 and has a maximum of 100.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-rollingupdate
  - id: inservice-default
    text: Rolling MinInstancesInService defaults to 0 and must be less than the group MaxSize.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-rollingupdate
  - id: signals-default
    text: Rolling WaitOnResourceSignals defaults to false.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-rollingupdate
  - id: successful-percent
    text: Rolling MinSuccessfulInstancesPercent defaults to 100 and requires WaitOnResourceSignals true
      when specified.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-rollingupdate
  - id: pause
    text: Rolling PauseTime has a maximum of PT1H and defaults to PT5M when WaitOnResourceSignals is
      true; otherwise it has no default.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-rollingupdate
  - id: signal-timeout
    text: With WaitOnResourceSignals true, PauseTime is the success-signal timeout and missing required
      signals fails the update.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-rollingupdate
  - id: old-policy
    text: Rollback uses the UpdatePolicy from before the failed update; AWS recommends a separate update
      for policy changes before triggering replacements.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-rollingupdate
  - id: suspend
    text: AWS recommends suspending interfering Auto Scaling processes during rolling updates; its
      example suspends HealthCheck, ReplaceUnhealthy, AZRebalance, AlarmNotification,
      ScheduledActions, and InstanceRefresh.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#aws-attribute-updatepolicy-examples
  - id: replacing
    text: AutoScalingReplacingUpdate with WillReplace true creates a new group, retains the old group
      during creation, and deletes it after successful replacement.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-replacingupdate
  - id: matching-creation
    text: A replacing update should have a matching CreationPolicy; insufficient creation success
      signals cause rollback to the old group.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-replacingupdate
  - id: precedence
    text: When both rolling and replacing policies are present, WillReplace true gives the replacing
      policy precedence.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#aws-resource-update-policies
  - id: refresh
    text: AutoScalingInstanceRefresh supports Auto Scaling instance maintenance policies, while
      CloudFormation rolling updates do not honor them.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#cfn-attributes-updatepolicy-rollingupdate
  - id: refresh-exclusive
    text: AutoScalingInstanceRefresh and AutoScalingRollingUpdate cannot both be specified on the same
      group.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-attribute-updatepolicy.html#aws-resource-update-policies
cards:
  - id: cloudformation-015
    q: A CloudFormation Auto Scaling rolling update must wait for EC2 application setup. Which settings
      make it wait?
    a: "Set AutoScalingRollingUpdate with WaitOnResourceSignals true and report readiness from each
      required instance. PauseTime becomes the timeout: default PT5M, maximum PT1H. Tune
      MaxBatchSize, MinInstancesInService, and the success percentage."
    facts:
      - rolling
      - signal-timeout
      - pause
  - id: cloudformation-016
    q: A CloudFormation update changes MaxBatchSize and then fails. Which policy values govern rollback?
    a: The UpdatePolicy from before the failed update. Apply policy changes in a separate stack update
      before a replacement-triggering change.
    trap: true
    facts:
      - old-policy
  - id: cloudformation-017
    q: How do CloudFormation AutoScalingRollingUpdate and AutoScalingReplacingUpdate differ?
    a: Rolling replaces instances in the same group. Replacing with WillReplace true creates a new group
      and keeps the old group until success; pair it with CreationPolicy. WillReplace true takes
      precedence when both policies exist.
    facts:
      - rolling
      - replacing
      - matching-creation
      - precedence
  - id: cloudformation-113
    q: A CloudFormation Auto Scaling rolling replacement is disrupted by health replacement and
      scheduled scaling. Which policy setting helps?
    a: SuspendProcesses. AWS recommends suspending interfering processes; its example lists HealthCheck,
      ReplaceUnhealthy, AZRebalance, AlarmNotification, ScheduledActions, and InstanceRefresh.
    facts:
      - suspend
  - id: cloudformation-114
    q: A CloudFormation Auto Scaling update must honor its instance maintenance policy. Should it use
      AutoScalingRollingUpdate?
    a: Use AutoScalingInstanceRefresh. CloudFormation rolling updates do not honor that maintenance
      policy, and the two policies cannot be combined on one group.
    trap: true
    facts:
      - refresh
      - refresh-exclusive
  - id: cloudformation-115
    q: What are the default CloudFormation rolling-update batch size, minimum in-service count, and
      signal-wait setting?
    a: MaxBatchSize 1, MinInstancesInService 0, and WaitOnResourceSignals false. Enable signals
      explicitly when application readiness must control progress.
    facts:
      - batch-default
      - inservice-default
      - signals-default
diagrams:
  - id: cfn-rolling-signals
    title: Wait for readiness within each replacement batch
    width: 840
    height: 210
    nodes:
      - id: policy
        label: Rolling policy
        icon: res-cloudformation-template
        info: UpdatePolicy chooses batch size, in-service capacity, and signal waiting.
        x: 25
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: group
        label: Auto Scaling group
        icon: ec2-auto-scaling
        info: Replace instances in batches inside the existing group.
        x: 310
        y: 65
        w: 200
        h: 72
        tone: mgmt
      - id: instances
        label: New instances
        icon: res-ec2-instances
        info: When WaitOnResourceSignals is true, report setup success within PauseTime.
        x: 595
        y: 65
        w: 200
        h: 72
        tone: mgmt
    edges:
      - from: policy
        to: group
        step: 1
      - from: group
        to: instances
        step: 2
    steps:
      - Apply the rolling replacement settings to the group update.
      - Replace a batch and wait for its required signals before proceeding.
---
CloudFormation Auto Scaling update policies control how instances change when a stack update changes the group's configuration. Choose batches within the existing group, replacement of the whole group, or an Auto Scaling instance refresh.

### How it works

1. Choose the update policy for the required replacement behavior.
2. For rolling updates, set batch size and the minimum instances to keep in service. Enable `WaitOnResourceSignals` to require readiness reports after application setup.
3. With signal waiting enabled, `PauseTime` is the deadline for the required signals. Suspend Auto Scaling processes that could interfere with the rolling operation.
4. If the update rolls back, CloudFormation uses the previous update policy. Apply policy changes separately before the change that triggers replacement.

| Policy | Mechanism | Readiness control |
|---|---|---|
| `AutoScalingRollingUpdate` | Replace batches inside the same group | `WaitOnResourceSignals` and `PauseTime` |
| `AutoScalingReplacingUpdate` | With `WillReplace: true`, create a new group and keep the old one until success | Matching `CreationPolicy` |
| `AutoScalingInstanceRefresh` | Use Auto Scaling refresh features, including instance maintenance policies | Use this when the group maintenance policy must be honored |

### Exam cues

- If the question says wait for application setup between replacement batches, think rolling updates with resource signals, because a batch must meet its signal requirement before progress.
- If the question says rollback uses an unexpectedly small batch, think the previous update policy, because the failed update's policy does not govern rollback.
- If the question says preserve an instance maintenance policy, think `AutoScalingInstanceRefresh`, because CloudFormation rolling updates do not honor that policy.

### Remember

- Rolling defaults: `MaxBatchSize: 1`, `MinInstancesInService: 0`, `WaitOnResourceSignals: false`.
- `MaxBatchSize` maximum: 100. `MinInstancesInService` must be below group `MaxSize`.
- `MinSuccessfulInstancesPercent` defaults to 100; specifying it requires signal waiting.
- With signals enabled, `PauseTime` defaults to `PT5M`; maximum `PT1H`. Without signals, it has no default.
- AWS's rolling-update example suspends `HealthCheck`, `ReplaceUnhealthy`, `AZRebalance`, `AlarmNotification`, `ScheduledActions`, and `InstanceRefresh`.

> **Trap:** WillReplace true takes precedence over a rolling policy. AutoScalingInstanceRefresh and AutoScalingRollingUpdate cannot both be set on the same group.
