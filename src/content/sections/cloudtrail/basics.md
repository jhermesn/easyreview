---
title: "CloudTrail basics"
level: foundational
order: 5
facts:
  - id: records-actions
    text: "AWS CloudTrail records actions taken by users, roles and AWS services as events, whether they come from the console, the CLI, SDKs or APIs, to support auditing, governance and compliance."
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html#cloudtrail-user-guide
  - id: event-history-basic
    text: "Event history shows the last 90 days of management events in a Region, is on by default and costs nothing to view."
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html#cloudtrail-user-guide
  - id: trail-basic
    text: "A trail delivers events to an Amazon S3 bucket for longer storage, optionally also to CloudWatch Logs and EventBridge."
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html#cloudtrail-user-guide
  - id: insights-baseline
    text: CloudTrail Insights learns a baseline from past API activity and emits events when call or
      error rates depart from it.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html#logging-insights-events-with-cloudtrail
  - id: insights-write
    text: Management API call-rate Insights require write management events and Insights enabled on the
      trail or source event data store.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html#logging-insights-events-with-cloudtrail
  - id: insights-errors
    text: Management API error-rate Insights require read or write management events, or both, with
      Insights enabled.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html#logging-insights-events-with-cloudtrail
  - id: insights-opt-in
    text: Insights logging is disabled by default and incurs additional charges when enabled.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-insights-events
cards:
  - id: cloudtrail-053
    q: "An auditor asks who deleted an S3 bucket yesterday in an AWS account. Which service answers it?"
    a: "AWS CloudTrail, which records API calls with the identity, time and source of each action."
    facts: [records-actions]
  - id: cloudtrail-054
    q: "How far back can AWS CloudTrail Event history show management events without any setup?"
    a: "90 days, per Region, at no charge. Keeping events longer needs a trail to an S3 bucket."
    facts: [event-history-basic, trail-basic]
  - id: cloudtrail-055
    q: "Does Amazon CloudWatch or AWS CloudTrail record which IAM user called an AWS API?"
    a: "AWS CloudTrail. CloudWatch monitors metrics and logs about resource performance."
    trap: true
    facts: [records-actions]
  - id: cloudtrail-019
    q: What does CloudTrail Insights detect, and which management events must be recorded first?
    a: Call-rate or error-rate deviations from a learned baseline. Management call-rate Insights need
      write events; error-rate Insights need read or write events, or both. Enable Insights
      explicitly.
    facts:
      - insights-baseline
      - insights-write
      - insights-errors
      - insights-opt-in
---
AWS CloudTrail is the audit log of an AWS account: it records who did what, when and from where through the console, CLI, SDKs and APIs.

### How it works

1. A user, role or AWS service calls an AWS API.
2. CloudTrail records the call as an event with the identity, time and source.
3. Event history keeps 90 days of management events; a trail stores events in an S3 bucket for as long as you need.

### Exam cues

- If the question says who made a change or which API call happened, think CloudTrail, because it records account activity.
- If the question says keep the activity log for years, think a CloudTrail trail to S3, because Event history keeps only 90 days.

### Remember

- Event history: 90 days of management events, free.
- Trails store events in S3.

> **Trap:** CloudTrail answers who did what. CloudWatch answers how resources perform, and AWS Config answers how a resource was configured over time.
