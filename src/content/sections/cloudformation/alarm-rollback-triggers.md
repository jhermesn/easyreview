---
title: Alarm rollback triggers
level: professional
order: 90
facts:
  - id: alarm-action
    text: Rollback triggers roll back a whole stack create or update operation if a configured alarm
      enters ALARM during the operation or monitoring period.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html#using-cfn-rollback-triggers
  - id: alarm-count
    text: A stack can have up to 5 rollback triggers, identified by CloudWatch alarm ARNs.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html#using-cfn-rollback-triggers
  - id: alarm-types
    text: Rollback triggers support AWS::CloudWatch::Alarm and AWS::CloudWatch::CompositeAlarm.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html#using-cfn-rollback-triggers
  - id: monitoring
    text: MonitoringTimeInMinutes ranges from 0 to 180 and defaults to 0 in the API.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_RollbackConfiguration.html#API_RollbackConfiguration_Contents
  - id: zero-monitoring
    text: A monitoring time of 0 still monitors triggers during stack creation or updating.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_RollbackConfiguration.html#API_RollbackConfiguration_Contents
  - id: cleanup
    text: For an update, CloudFormation waits until the monitoring period ends before cleaning up old
      resources.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html#using-cfn-rollback-triggers
  - id: missing-data
    text: INSUFFICIENT_DATA alone does not trigger rollback; configure the alarm to treat missing data
      as breaching if missing metrics should cause an alarm.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html#using-cfn-rollback-triggers
  - id: missing-alarm
    text: A missing rollback-trigger alarm causes the stack operation to fail and roll back.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html#using-cfn-rollback-triggers
  - id: rollback-exclusion
    text: CloudFormation does not monitor rollback triggers while rolling back an update.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html#using-cfn-rollback-triggers
cards:
  - id: cloudformation-042
    q: How can a CloudFormation update roll back when an application metric degrades during deployment
      or shortly afterward?
    a: Configure up to 5 CloudWatch alarm rollback triggers and a monitoring period of 0 to 180 minutes.
      ALARM triggers rollback; INSUFFICIENT_DATA alone does not.
    facts:
      - alarm-action
      - alarm-count
      - monitoring
      - missing-data
  - id: cloudformation-087
    q: A CloudFormation update uses MonitoringTimeInMinutes 0. Are its rollback-trigger alarms ignored
      during deployment?
    a: No. CloudFormation still monitors alarms during the operation. Zero removes the additional
      monitoring period after resource deployment.
    trap: true
    facts:
      - zero-monitoring
  - id: cloudformation-088
    q: A CloudFormation rollback should occur when application metrics stop arriving. What must the
      alarm do?
    a: Treat missing data as breaching so the alarm can enter ALARM. INSUFFICIENT_DATA by itself does
      not start rollback.
    trap: true
    facts:
      - missing-data
  - id: cloudformation-089
    q: Which CloudWatch alarm types can CloudFormation use as rollback triggers?
    a: Metric alarms (AWS::CloudWatch::Alarm) and composite alarms (AWS::CloudWatch::CompositeAlarm).
    facts:
      - alarm-types
---
Rollback triggers connect CloudFormation deployment recovery to CloudWatch alarms. They let application behavior stop an operation even when resource provisioning itself has succeeded.

### How it works

1. Configure alarm ARNs as rollback triggers. An ARN is the AWS identifier for a resource. Both metric alarms and composite alarms are supported; a composite alarm combines alarm states.
2. CloudFormation monitors the alarms during stack creation or updating and for the configured period after resources deploy.
3. If an alarm enters `ALARM`, CloudFormation rolls back the whole operation. If the period ends successfully during an update, it cleans up old resources.

### Exam cues

- If the question says application errors rise after resources deploy, think rollback triggers with a monitoring window, because the alarms remain active after resource deployment.
- If the question says missing metrics must stop deployment, think treating missing alarm data as breaching, because `INSUFFICIENT_DATA` alone does not trigger rollback.

### Remember

- Maximum: 5 rollback triggers.
- API monitoring period: 0 to 180 minutes, default 0.
- Zero still monitors alarms during the operation.
- A missing alarm makes the operation fail and roll back.
- Triggers are not monitored while an update rolls back.

> **Trap:** A zero-minute monitoring period disables only the additional wait after deployment. It does not disable alarms during provisioning.
