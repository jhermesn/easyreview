---
title: EventBridge routing and Region coverage
level: professional
order: 20
facts:
  - id: rule
    text: EventBridge rules match AWS Health events and invoke targets such as SNS, Lambda, and SQS.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
  - id: source
    text: The source value aws.health matches both public and account-specific Health events; aws.health* does not.
    source: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events
  - id: scope
    text: The eventScopeCode field distinguishes PUBLIC from ACCOUNT_SPECIFIC events in EventBridge.
    source: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events
  - id: account-only
    text: EventBridge rules receive Health notifications for their own AWS account.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
  - id: delivery
    text: AWS Health attempts durable delivery to EventBridge at least once.
    source: https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#cloudwatch-events-health
  - id: regional-rules
    text: Create an EventBridge rule in each Region whose AWS Health events you want to receive.
    source: https://docs.aws.amazon.com/health/latest/ug/choosing-a-region.html#choosing-a-region
  - id: backup-region
    text: In the standard AWS partition Oregon backs up other Regions, while N. Virginia backs up Oregon.
    source: https://docs.aws.amazon.com/health/latest/ug/choosing-a-region.html#choosing-a-region
  - id: public-backup
    text: Public events reach the backup Region only when a valid rule exists in the affected Region.
    source: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events-backup-rules
  - id: account-backup
    text: Account-specific events are sent to both affected and backup Regions regardless of rules in the affected Region.
    source: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events-backup-rules
  - id: deduplication
    text: AWS recommends deduplicating backup events using the event ARN and communicationId.
    source: https://docs.aws.amazon.com/health/latest/ug/about-public-events.html#about-public-events-backup-rules
  - id: event-fields
    text: The event schema uses eventArn for the event identifier and detail.eventRegion for the impacted Region.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-events-eventbridge-schema.html#schema-details
  - id: delivery-region
    text: The top-level region field identifies the Region to which the notification was delivered.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-events-eventbridge-schema.html#aws-health-event-schema
  - id: communication-id
    text: communicationId identifies a communication and includes a page number for paginated events.
    source: https://docs.aws.amazon.com/health/latest/ug/aws-health-events-eventbridge-schema.html#schema-details
  - id: simplified
    text: A single Oregon rule can capture account-specific events from all standard partition Regions but does not provide high availability or public events.
    source: https://docs.aws.amazon.com/health/latest/ug/choosing-a-region.html#simplified-integration
  - id: global
    text: A rule in N. Virginia is required to receive global AWS Health events.
    source: https://docs.aws.amazon.com/health/latest/ug/choosing-a-region.html#global-events
  - id: retirement
    text: A rule can invoke Systems Manager Automation to stop and start a Systems Manager managed EBS-backed EC2 instance scheduled for retirement.
    source: https://docs.aws.amazon.com/health/latest/ug/automating-instance-actions.html#automating-instance-actions
  - id: credentials
    text: AWS Health generates AWS_RISK_CREDENTIALS_EXPOSED when AWS detects a publicly exposed IAM access key.
    source: https://aws.amazon.com/blogs/compute/automate-your-it-operations-using-aws-step-functions-and-amazon-cloudwatch-events/
  - id: response
    text: An event rule can invoke a Step Functions workflow that deletes an exposed IAM key, summarizes recent API activity, and sends an SNS notification.
    source: https://aws.amazon.com/blogs/compute/automate-your-it-operations-using-aws-step-functions-and-amazon-cloudwatch-events/
diagrams:
  - id: health-event-routing
    title: Route an AWS Health event
    width: 720
    height: 150
    nodes:
      - { id: health, label: AWS Health, icon: health-dashboard, x: 25, y: 35, w: 170, h: 72, tone: mgmt }
      - { id: rule, label: EventBridge, icon: eventbridge, x: 275, y: 35, w: 170, h: 72, tone: integration }
      - { id: target, label: SNS, icon: simple-notification-service, x: 525, y: 35, w: 170, h: 72, tone: integration }
    edges:
      - { from: health, to: rule, step: 1 }
      - { from: rule, to: target, step: 2 }
    steps:
      - AWS Health sends an event to EventBridge.
      - A matching rule sends the event to an SNS topic.
cards:
  - id: health-001
    q: How can a team receive notifications for AWS Health events affecting its account?
    a: Create an EventBridge rule matching source `aws.health` and target an SNS topic.
    facts: [rule, source]
  - id: health-003
    q: An AWS Health notice schedules retirement of an EBS-backed EC2 instance. How can a team automate the stop and start?
    a: Match the event with an EventBridge rule targeting Systems Manager Automation. The instance must be managed by Systems Manager.
    facts: [retirement]
  - id: health-008
    q: An AWS Health public event must reach an EventBridge backup rule. What is required in the affected Region?
    a: A valid EventBridge rule in the affected Region. Without it, public events are not sent to the backup Region.
    facts: [public-backup]
    trap: true
  - id: health-009
    q: How can an AWS Health integration avoid duplicate processing from primary and backup Regions?
    a: Deduplicate using `eventArn` and `communicationId`; Health attempts delivery at least once.
    facts: [deduplication, event-fields, delivery]
  - id: health-010
    q: A team needs all standard partition account-specific AWS Health events through one EventBridge rule. What is the tradeoff?
    a: Use the simplified integration in Oregon. It does not provide high availability or public events.
    facts: [simplified]
  - id: health-011
    q: How can a team automate response to an exposed IAM access key reported by AWS Health?
    a: Match `AWS_RISK_CREDENTIALS_EXPOSED` with an event rule and invoke a Step Functions remediation workflow.
    facts: [credentials, response]
  - id: health-012
    q: Which Region needs an EventBridge rule to receive global AWS Health events?
    a: US East (N. Virginia).
    facts: [global]
  - id: health-013
    q: An AWS Health event arrives in a backup Region. Which field identifies the impacted Region?
    a: "`detail.eventRegion`. The top-level `region` identifies the delivery Region."
    facts: [event-fields, delivery-region]
    trap: true
---
AWS Health sends events to Amazon EventBridge so rules can route matching events to notification or automation targets.

### How it works

1. Create a regional EventBridge rule with the exact source `aws.health`. A rule is a filter that selects events and sends matches to a target.
2. Optionally filter `eventScopeCode` for `PUBLIC` or `ACCOUNT_SPECIFIC`. Rules receive notifications for their own account.
3. Choose a target such as an SNS topic, a Lambda function, or an SQS queue. For example, an SNS topic can notify subscribers.
4. For resilient regional coverage, create rules in the affected and backup Regions and deduplicate by `eventArn` and `communicationId`. Deduplication prevents repeated processing of the same communication. A paginated event has a distinct communication ID per page.

### Exam cues

- If the question says an EBS-backed EC2 instance has a retirement notice, think EventBridge and Systems Manager Automation, because a rule can trigger stop and start for a Systems Manager managed instance.
- If the question says an IAM access key was publicly exposed, think the `AWS_RISK_CREDENTIALS_EXPOSED` event and a Step Functions response, because the workflow can remove the key and notify the security team.
- If the question says one rule must capture account-specific events across the standard AWS partition, think the Oregon simplified integration, because it aggregates those events without high availability.
- If the question says global Health events, think N. Virginia, because a rule there is required for global events.

### Remember

- In the standard partition, Oregon is the backup for other Regions; N. Virginia is the backup for Oregon.
- Account-specific events go to the affected and backup Regions regardless of the affected Region's rules.
- Public events reach the backup Region only if a valid rule exists in the affected Region.
- Health attempts delivery to EventBridge at least once.
- The top-level `region` is the delivery Region; `detail.eventRegion` is the impacted Region.

> **Trap:** A backup rule alone does not capture public events from an affected Region without a valid rule there. The simplified integration also excludes public events.
