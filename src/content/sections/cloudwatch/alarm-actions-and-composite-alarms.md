---
title: Alarm actions and composite alarms
level: associate
order: 40
facts:
  - id: metric-actions
    text: Metric alarms can trigger SNS notifications, Lambda functions, EC2 actions, Auto Scaling
      actions, and supported Systems Manager actions.
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
  - id: billing-alarm
    text: A billing alarm watches the EstimatedCharges metric and notifies through Amazon SNS; billing alerts must be turned on first, and billing metric data is stored in US East (N. Virginia).
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html
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
  - id: cloudwatch-053
    q: An EC2 guest operating system fails its instance status check. Should a CloudWatch alarm use
      reboot or system recovery?
    a: Reboot is the appropriate instance-check action. System recovery addresses underlying host
      failures monitored by StatusCheckFailed_System.
    facts:
      - ec2-reboot
      - ec2-recover
  - id: cloudwatch-113
    q: A company wants an email when its estimated AWS charges pass 500 USD, using CloudWatch. What does it set up, and in which Region?
    a: A CloudWatch billing alarm on EstimatedCharges with an SNS notification, created in US East (N. Virginia) after turning on billing alerts.
    facts: [billing-alarm]
---
CloudWatch alarm actions turn a detected condition into a notification or response. A composite alarm combines other alarms so related symptoms can produce a single notification.

### How it works

1. Create metric alarms for the measurements that indicate trouble. Attach direct responses where needed.
2. Create a composite rule such as `ALARM("cpu") AND ALARM("errors")`. It reads child alarm states, not metric values.
3. Notify from the composite when the combined condition holds. Use SNS, a message delivery service, or another supported action.
4. Keep EC2 and Auto Scaling actions on metric alarms. EventBridge rules can also route alarm state-change events to automation.

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
- If the question says alert when estimated charges pass a threshold, think a CloudWatch billing alarm in US East (N. Virginia) or AWS Budgets, because both alert on spend.

### Remember

- Composite rules use AND, OR, NOT and state tests ALARM, OK, INSUFFICIENT_DATA.
- Reboot suits an instance status failure; recovery suits a system status failure.
- Cross-account composite alarm creation is unsupported.

> **Trap:** A composite alarm that invokes Lambda does not gain a native EC2 recovery action. Put the native recovery action on the metric alarm.
