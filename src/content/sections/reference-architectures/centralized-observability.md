---
title: Centralized multi-account observability
level: professional
order: 100
facts:
  - id: cross-purpose
    text: CloudWatch cross-account observability shares operational data between source and monitoring accounts within a Region.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: sink
    text: A sink is the attachment point managed by a monitoring account.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: link
    text: A source account manages a link connecting it to a monitoring account sink.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: limits
    text: Each account supports one sink per Region, and each source account can share with up to five monitoring accounts.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: sink-policy
    text: A sink resource policy grants selected accounts or an organization permission to create links and can restrict shared resource types.
    source: https://docs.aws.amazon.com/OAM/latest/APIReference/API_PutSinkPolicy.html#API_PutSinkPolicy
  - id: cross-queries
    text: A monitoring account can run one Logs Insights query across log groups in multiple source accounts.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html#CloudWatch_Dashboards
  - id: cross-alarms
    text: A cross-account observability monitoring account can create alarms watching source-account metrics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html#CloudWatch_Dashboards
  - id: cross-pricing
    text: Cross-account observability adds no extra cost for logs, metrics, or Application Signals; the first trace copy is free.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html#CloudWatch-Unified-Cross-Account
  - id: subscription-purpose
    text: Subscriptions deliver matching new CloudWatch log events to Kinesis Data Streams, Data Firehose, or Lambda for processing.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: destination-setup
    text: The cross-account recipient creates a target, a delivery role, a logical destination, and an access policy; senders reference the destination ARN in subscription filters.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions-Kinesis.html#CrossAccountSubscriptions-Kinesis
  - id: destination-region
    text: The source log group and logical destination must share a Region; the destination target resource can be in a different Region.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions.html#CrossAccountSubscriptions
  - id: firehose-archive
    text: A CloudWatch Logs subscription can send logs to Firehose for delivery to S3.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters-AccountLevel.html#SubscriptionFilters-AccountLevel
  - id: account-filter
    text: An account-level subscription applies to all log groups unless selection criteria limit which groups are included.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/subscription-concepts.html#subscription-concepts
diagrams:
  - id: centralized-observability
    title: Workload accounts link telemetry to a monitoring account and stream logs to an archive
    width: 1240
    height: 640
    groups:
      - { label: Workload account A, x: 20, y: 20, w: 300, h: 280, tone: neutral, icon: group-aws-account }
      - { label: Workload account B, x: 20, y: 340, w: 300, h: 280, tone: neutral, icon: group-aws-account }
      - { label: Monitoring account, x: 600, y: 20, w: 620, h: 340, tone: mgmt, icon: group-aws-account }
      - { label: Log archive account, x: 600, y: 400, w: 620, h: 220, tone: storage, icon: group-aws-account }
    nodes:
      - { id: cwa, label: CloudWatch, sub: "metrics, logs, traces", x: 60, y: 70, w: 170, h: 86, tone: mgmt, icon: cloudwatch, info: "Owns a link to the monitoring account's sink." }
      - { id: logsa, label: Log group, sub: subscription filter, x: 60, y: 190, w: 170, h: 86, tone: mgmt, icon: res-cloudwatch-logs }
      - { id: cwb, label: CloudWatch, sub: "metrics, logs, traces", x: 60, y: 390, w: 170, h: 86, tone: mgmt, icon: cloudwatch }
      - { id: logsb, label: Log group, sub: subscription filter, x: 60, y: 510, w: 170, h: 86, tone: mgmt, icon: res-cloudwatch-logs }
      - { id: sink, label: OAM sink, sub: cross-account link target, x: 640, y: 80, w: 180, h: 86, tone: mgmt, icon: cloudwatch, info: "Its sink policy allows the organization to create links and limits the shared telemetry types." }
      - { id: dash, label: CloudWatch, sub: dashboards and alarms, x: 940, y: 80, w: 180, h: 86, tone: mgmt, icon: cloudwatch, info: "One Logs Insights query can span log groups in several source accounts." }
      - { id: sns, label: SNS topic, sub: on-call team, x: 940, y: 240, w: 180, h: 86, tone: integration, icon: res-simple-notification-service-topic }
      - { id: dest, label: Logs destination, sub: access policy, x: 630, y: 470, w: 150, h: 86, tone: mgmt, icon: res-cloudwatch-logs, info: "Same Region as the sending log groups. Its access policy lists the sender accounts." }
      - { id: fh, label: Data Firehose, sub: delivery stream, x: 830, y: 470, w: 150, h: 86, tone: integration, icon: data-firehose }
      - { id: bucket, label: S3 bucket, sub: log archive, x: 1030, y: 470, w: 150, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
    edges:
      - { from: cwa, to: sink, step: 1 }
      - { from: cwb, to: sink, step: 1 }
      - { from: sink, to: dash, step: 2 }
      - { from: dash, to: sns, step: 3 }
      - { from: logsa, to: dest, step: 4 }
      - { from: logsb, to: dest, step: 4 }
      - { from: dest, to: fh, step: 5 }
      - { from: fh, to: bucket, step: 5 }
    steps:
      - "Each workload account creates a link to the monitoring account's sink, sharing the telemetry types the sink policy accepts."
      - "In the monitoring account, dashboards and Logs Insights queries span all linked accounts in the Region."
      - "Alarms in the monitoring account watch source-account metrics and notify the on-call team through SNS."
      - "A subscription filter on each log group, or one account-level filter, sends matching events to a logical destination in the log archive account."
      - "The destination hands events to Data Firehose, which delivers them to an S3 bucket for long-term retention."
cards:
  - id: reference-architectures-061
    q: "An operations team wants one CloudWatch console to view metrics, logs and traces from 30 workload accounts in the same Region, without copying data. What fits?"
    a: "**CloudWatch cross-account observability**: a **monitoring account** owns a **sink**, and each source account creates a **link** to it."
    facts: [cross-purpose, sink, link]
  - id: reference-architectures-062
    q: "Every new account in an organization must be able to link to a central CloudWatch monitoring account, sharing only metrics and logs. How is that allowed?"
    a: "A **sink policy** on the monitoring account's sink that grants the organization permission to create links and restricts the shared resource types."
    facts: [sink-policy]
  - id: reference-architectures-063
    q: "During an incident, an engineer must search application logs from five accounts with one query. What does cross-account observability allow?"
    a: "A single **Logs Insights query** in the monitoring account across log groups in multiple source accounts. Alarms there can also watch source-account metrics."
    facts: [cross-queries, cross-alarms]
  - id: reference-architectures-064
    q: "A team plans a second sink in the same Region of its monitoring account, and wants one source account to share with eight monitoring accounts. Are both possible?"
    a: "No. Each account has **one sink per Region**, and a source account can share with **up to five** monitoring accounts."
    trap: true
    facts: [limits]
  - id: reference-architectures-065
    q: "Logs from many accounts must land in one S3 bucket in a log archive account for years. What CloudWatch Logs design fits?"
    a: "**Subscription filters** in each account sending to a **logical destination** in the archive account, backed by **Data Firehose** that delivers to S3."
    facts: [subscription-purpose, destination-setup, firehose-archive]
  - id: reference-architectures-066
    q: "A cross-account CloudWatch Logs subscription fails because the logical destination is in us-east-1 and the log group is in eu-west-1. What is the rule?"
    a: "The log group and the **logical destination must be in the same Region**. The destination's target, such as a Firehose stream, can be in another Region."
    trap: true
    facts: [destination-region]
  - id: reference-architectures-067
    q: "A team wants every log group in an account, including new ones, streamed to a central destination without adding a filter per group. What fits?"
    a: "An **account-level subscription filter**, which covers all log groups unless selection criteria narrow it."
    facts: [account-filter]
---
Operations questions at the professional level spread a workload across many accounts and ask how one team sees it all and keeps the logs. Two mechanisms do the work: CloudWatch cross-account observability for live viewing and alarms, and CloudWatch Logs subscriptions for a durable copy in a log archive account.

### How it works

1. A monitoring account owns a sink. Each source account creates a link to it, allowed by the sink policy. [Cross-account observability](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html)
2. The monitoring account builds dashboards, runs Logs Insights queries across accounts and creates alarms on source-account metrics.
3. Subscription filters, per log group or account level, send matching log events to a logical destination in the log archive account.
4. The destination passes events to Data Firehose, which delivers them to S3.

| Need | Use |
|---|---|
| See and alarm on many accounts live | Cross-account observability (sink and links) |
| Keep logs centrally for years | Subscription filter, logical destination, Firehose, S3 |
| Process log events in near real time | Subscription to Kinesis Data Streams or Lambda |

### Exam cues

- If the question says one console for metrics, logs and traces from many accounts, think cross-account observability, because links share data without copying it.
- If the question says query logs from several accounts at once, think Logs Insights in the monitoring account.
- If the question says central long-term log storage from many accounts, think subscription filters to a logical destination with Firehose and S3.
- If the question says every log group including new ones, think an account-level subscription filter.

### Remember

- One sink per Region per account; a source shares with up to five monitoring accounts.
- No extra charge for shared logs and metrics; the first trace copy is free.
- Log group and logical destination share a Region.
- Subscription targets: Kinesis Data Streams, Data Firehose, Lambda.

> **Trap:** Cross-account observability works within a Region. Each Region needs its own sink and links.
