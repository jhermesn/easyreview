---
title: "PLACEHOLDER sns/operations-in-depth"
level: professional
order: 40
facts:
  - id: propagation
    text: Filter policy additions or changes can take up to 15 minutes to fully take effect.
    source: https://docs.aws.amazon.com/sns/latest/dg/sns-subscription-filter-policies.html#sns-subscription-filter-policies
  - id: scaling-success
    text: Auto Scaling SNS notification types autoscaling:EC2_INSTANCE_LAUNCH and
      autoscaling:EC2_INSTANCE_TERMINATE report successful instance launch and termination.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#ec2-auto-scaling-sns-notifications
  - id: scaling-failure
    text: Auto Scaling SNS notification types autoscaling:EC2_INSTANCE_LAUNCH_ERROR and
      autoscaling:EC2_INSTANCE_TERMINATE_ERROR report failed launch and termination.
    source: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-sns-notifications.html#ec2-auto-scaling-sns-notifications
  - id: commands
    text: Systems Manager Run Command and Maintenance Windows can publish command or per-node invocation status
      changes to SNS Standard topics.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-sns-notifications.html
  - id: organization
    text: Organizations activity can trigger EventBridge rules in us-east-1 with SNS as a notification target.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_cloudwatch-integration.html#orgs_cloudwatch-integration
  - id: advisor
    text: Trusted Advisor check metrics in us-east-1 can be monitored by CloudWatch alarms that notify SNS.
    source: https://docs.aws.amazon.com/awssupport/latest/user/cloudwatch-metrics-ta.html#cloudwatch-metrics-ta
  - id: database
    text: Aurora event notifications use an SNS destination topic whose policy allows the RDS event service to
      publish.
    source: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_Events.GrantingPermissions.html#USER_Events.GrantingPermissions
cards:
  - id: sns-016
    q: A new SNS subscription filter seems to behave inconsistently immediately after an update. What documented
      behavior explains this?
    a: Eventual consistency. Filter policy changes can take up to 15 minutes to fully take effect.
    facts:
      - propagation
  - id: sns-010
    q: Which Auto Scaling notification types send successful launch and termination events to SNS?
    a: autoscaling:EC2_INSTANCE_LAUNCH and autoscaling:EC2_INSTANCE_TERMINATE. Failure variants end in _ERROR.
    facts:
      - scaling-success
      - scaling-failure
  - id: sns-011
    q: A Systems Manager operator needs SNS notifications for failed commands on individual nodes. What should be
      configured?
    a: Run Command SNS status notifications at invocation level, selecting the failure states, with an SNS
      Standard topic.
    facts:
      - commands
  - id: sns-012
    q: A team needs SNS notifications for Organizations account activity or Trusted Advisor check changes. Where
      should the routing be configured?
    a: In us-east-1. Use Organizations EventBridge rules targeting SNS, or CloudWatch alarms on Trusted Advisor
      metrics with an SNS action.
    facts:
      - organization
      - advisor
  - id: sns-013
    q: Aurora event notifications must reach an SNS topic. What access policy is required at the destination?
    a: The SNS topic policy must allow the RDS event service to publish the database event notifications.
    facts:
      - database
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
