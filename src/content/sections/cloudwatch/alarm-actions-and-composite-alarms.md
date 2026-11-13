---
title: Alarm actions and composite alarms
level: associate
order: 40
facts:
  - id: metric-actions
    text: Metric alarms can trigger SNS notifications, Lambda functions, EC2 actions, Auto Scaling
      actions, and supported Systems Manager actions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#CloudWatch_Alarms
  - id: state-actions
    text: Alarm actions normally run on state changes; Auto Scaling actions repeat once per minute while
      the alarm stays in the relevant state.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#CloudWatch_Alarms
  - id: composite-rule
    text: A composite alarm evaluates states of other alarms rather than metric values.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Composite_Alarm.html#Create_Composite_Alarm
  - id: composite-operators
    text: Composite rules use ALARM, OK, and INSUFFICIENT_DATA tests with AND, OR, NOT, and parentheses.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Composite_Alarm.html#Create_Composite_Alarm
  - id: composite-actions
    text: Composite alarms support SNS, Lambda, Systems Manager actions, and CloudWatch investigations.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Composite_Alarm.html#Create_Composite_Alarm
  - id: composite-no-ec2
    text: Composite alarms cannot perform EC2 or Auto Scaling actions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#CloudWatch_Alarms
  - id: cross-account-composite
    text: Creating cross-account composite alarms is not supported.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#CloudWatch_Alarms
  - id: ec2-actions
    text: EC2 alarm actions include stop, terminate, reboot, and recover.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#UsingAlarmActions
  - id: ec2-recover
    text: For EC2 system status failures, use a recovery alarm on StatusCheckFailed_System;
      StatusCheckFailed_Instance is not a recovery trigger.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#AddingRecoverActions
  - id: ec2-reboot
    text: A reboot action suits instance status check failures and restarts the operating system on the
      same host.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html#AddingRebootActions
  - id: alarm-eventbridge
    text: CloudWatch sends alarm state-change events to EventBridge, where rules can route them to
      targets.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch-and-eventbridge.html#cloudwatch-and-eventbridge
  - id: composite-suppression
    text: A suppressor alarm in ALARM prevents composite alarm actions; WaitPeriod and ExtensionPeriod
      delay actions around suppressor transitions. AWS recommends 60 seconds for each.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-suppression.html#Create_Composite_Alarm_Suppression_Wait_Extension
  - id: composite-cycle
    text: Cyclic composite alarm dependencies stop evaluation and prevent deletion; setting one AlarmRule
      to False breaks the cycle.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Composite_Alarm.html#Create_Composite_Alarm
  - id: alarm-action-validation
    text: CloudWatch does not validate configured alarm actions or detect errors from attempts to invoke
      nonexistent EC2 Auto Scaling actions or SNS topics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#CloudWatch_Alarms
  - id: alarm-test-state
    text: SetAlarmState temporarily changes an alarm state until the next alarm comparison.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html#common-features-of-alarms
  - id: alarm-lambda-permission
    text: Lambda alarm actions can invoke a function in another account; its resource policy must allow
      lambda.alarms.cloudwatch.amazonaws.com to invoke it, with source account and alarm ARN restrictions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-actions-Lambda.html#alarms-and-actions-Lambda
  - id: composite-create-permission
    text: Creating a composite alarm requires cloudwatch:PutCompositeAlarm scoped to all resources; an IAM
      user creating one with OpsItem actions also needs iam:CreateServiceLinkedRole.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutCompositeAlarm.html#API_PutCompositeAlarm
  - id: composite-limits
    text: A composite rule can reference up to 100 alarms, and a single alarm can be referenced by up to
      150 composite alarms.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutCompositeAlarm.html#API_PutCompositeAlarm
  - id: alarm-mute
    text: Scheduled alarm mute rules suppress actions but not state evaluation for targeted metric and
      composite alarms in the same account and Region.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-mute-rules.html#effects-of-mute-rules
  - id: alarm-mute-end
    text: After a mute window ends, CloudWatch executes actions for the current state if it differs from
      the state at the start; otherwise it executes no actions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-mute-rules.html#effects-of-mute-rules
cards:
  - id: cloudwatch-010
    q: Several related CloudWatch alarms page the same team. Which alarm type can combine their
      conditions into one notification?
    a: A composite alarm. Its rule tests the states of other alarms with operators such as AND, OR, and
      NOT, so the team can notify from the combined condition.
    facts:
      - composite-rule
      - composite-operators
      - composite-actions
  - id: cloudwatch-011
    q: Can a CloudWatch composite alarm recover an EC2 instance or execute an Auto Scaling policy?
    a: No. Use a metric alarm for EC2 or Auto Scaling actions. A composite can notify SNS, invoke
      Lambda, use supported Systems Manager actions, or start an investigation.
    trap: true
    facts:
      - composite-no-ec2
      - composite-actions
  - id: cloudwatch-027
    q: A team needs one notification from related CloudWatch alarms and automatic EC2 recovery. How
      should it configure actions?
    a: Use a composite alarm for the combined notification and a metric alarm for EC2 recovery.
      Composite alarms cannot perform the recovery action.
    trap: true
    facts:
      - composite-actions
      - composite-no-ec2
      - ec2-actions
  - id: cloudwatch-034
    q: What can react automatically to a CloudWatch alarm state change?
    a: Configure alarm actions such as SNS, Lambda, EC2, Auto Scaling, or Systems Manager. An
      EventBridge rule can also route the state-change event. Use StatusCheckFailed_System for a
      system-failure recovery alarm.
    facts:
      - metric-actions
      - alarm-eventbridge
      - ec2-recover
  - id: cloudwatch-052
    q: A CloudWatch alarm stays in ALARM after invoking an Auto Scaling action. Can it invoke the action
      again without another state change?
    a: Yes. Auto Scaling actions repeat once per minute while the alarm remains in the relevant state.
      Most other alarm actions run on state changes.
    trap: true
    facts:
      - state-actions
  - id: cloudwatch-053
    q: An EC2 guest operating system fails its instance status check. Should a CloudWatch alarm use
      reboot or system recovery?
    a: Reboot is the appropriate instance-check action. System recovery addresses underlying host
      failures monitored by StatusCheckFailed_System.
    facts:
      - ec2-reboot
      - ec2-recover
  - id: cloudwatch-098
    q: During a deployment, a team wants a CloudWatch composite alarm to retain its state but suppress
      SNS actions while a maintenance alarm is in ALARM. What should it configure?
    a: Use the maintenance alarm as an action suppressor. Configure wait and extension periods around
      its transitions; AWS recommends 60 seconds for each.
    facts:
      - composite-suppression
  - id: cloudwatch-099
    q: Two CloudWatch composite alarms depend on each other and cannot be deleted. How can an operator
      restore evaluation and remove the dependency?
    a: Set one composite alarm's AlarmRule to False to break the dependency cycle.
    facts:
      - composite-cycle
  - id: cloudwatch-100
    q: A CloudWatch alarm transitions to ALARM but its configured SNS topic does not exist. Does
      CloudWatch validate the action when the alarm is configured?
    a: No. CloudWatch does not validate the action or detect errors from attempts to invoke nonexistent
      SNS or Auto Scaling actions.
    trap: true
    facts:
      - alarm-action-validation
  - id: cloudwatch-101
    q: An operator tests a CloudWatch alarm action with SetAlarmState. Does the forced state persist?
    a: No. It is temporary and lasts until the next alarm comparison.
    facts:
      - alarm-test-state
  - id: cloudwatch-105
    q: A CloudWatch alarm must invoke a Lambda function in another AWS account. What permission must
      the function resource policy grant?
    a: Allow lambda.alarms.cloudwatch.amazonaws.com to invoke the function. Restrict the source account
      and alarm ARN.
    facts:
      - alarm-lambda-permission
  - id: cloudwatch-106
    q: An IAM user cannot create a CloudWatch composite alarm with a Systems Manager OpsItem action.
      Which permissions should be checked?
    a: Grant cloudwatch:PutCompositeAlarm scoped to all resources and iam:CreateServiceLinkedRole.
    facts:
      - composite-create-permission
  - id: cloudwatch-107
    q: A CloudWatch composite alarm must combine more than 100 underlying alarms. Can one composite
      rule reference all of them?
    a: No. A composite rule can reference up to 100 alarms.
    facts:
      - composite-limits
  - id: cloudwatch-108
    q: A team wants to silence CloudWatch metric and composite alarm actions during a recurring
      maintenance window while keeping state evaluation active. What should it configure?
    a: A scheduled alarm mute rule targeting alarms in the same account and Region.
    facts:
      - alarm-mute
  - id: cloudwatch-109
    q: A CloudWatch alarm changes state during a mute window and is still in that new state when the
      window ends. What happens to its actions?
    a: CloudWatch executes the current state's actions if the final state differs from the state at the
      start of the window.
    facts:
      - alarm-mute-end
---
CloudWatch alarm actions turn a detected condition into a notification or response. A composite alarm combines other alarms so related symptoms can produce a single notification.

### How it works

1. Create metric alarms for the measurements that indicate trouble. Attach direct responses where needed.
2. Create a composite rule such as `ALARM("cpu") AND ALARM("errors")`. It reads child alarm states, not metric values.
3. Notify from the composite when the combined condition holds. Use SNS, a message delivery service, or another supported action.
4. Keep EC2 and Auto Scaling actions on metric alarms. EventBridge rules can also route alarm state-change events to automation.
5. To suppress composite actions during maintenance, configure a suppressor alarm. Its wait period gives
   the suppressor time to enter ALARM; its extension period gives the composite time to recover after
   the suppressor returns to OK.

| Action | Metric alarm | Composite alarm |
| --- | --- | --- |
| SNS notification or Lambda function | Supported | Supported |
| Systems Manager action | Supported | Supported |
| EC2 stop, terminate, reboot, or recover | Supported | Not supported |
| Auto Scaling action | Supported | Not supported |

### Exam cues

- If the question says several related alarms cause duplicate paging, think a composite condition, because it combines child states before notifying.
- If the question says one combined alert and EC2 recovery, think separate composite and metric actions, because a composite cannot recover EC2.
- If the question says the EC2 host has a system status failure, think recovery with `StatusCheckFailed_System`, because recovery addresses underlying host impairment.
- If composite alarms form a dependency cycle and cannot be deleted, set one rule to `False` to break the cycle.
- If a configured SNS action does not run, check that the topic exists. CloudWatch does not validate configured actions.
- If an alarm invokes Lambda in another account, grant the CloudWatch alarm service principal access in the function resource policy.
- If maintenance follows a schedule, use a mute rule for metric or composite actions without stopping evaluation. After the window, actions run if the final state differs from the initial state.
- If creating a composite alarm is denied, check that `cloudwatch:PutCompositeAlarm` is scoped to `*`. OpsItem actions also require `iam:CreateServiceLinkedRole` for an IAM user.

### Remember

- Composite rules use AND, OR, NOT and state tests ALARM, OK, INSUFFICIENT_DATA.
- Auto Scaling actions repeat each minute while the relevant state persists. Other actions normally run on state changes.
- Reboot suits an instance status failure; recovery suits a system status failure.
- Cross-account composite alarm creation is unsupported.
- AWS recommends 60 seconds each for composite action suppression wait and extension periods.
- `SetAlarmState` is temporary, ending at the next alarm comparison.
- A composite rule can reference up to 100 alarms; an alarm can be referenced by up to 150 composites.

> **Trap:** A composite alarm that invokes Lambda does not gain a native EC2 recovery action. Put the native recovery action on the metric alarm.
