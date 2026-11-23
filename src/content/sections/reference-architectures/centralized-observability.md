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
  - id: agent
    text: On EC2 and on-premises servers, the CloudWatch agent gathers guest operating system metrics and logs.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent
  - id: guest-metrics
    text: Use the CloudWatch agent to collect guest memory and disk space metrics beyond EC2 basic monitoring.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html#Install-CloudWatch-Agent
  - id: logs-kms
    text: CloudWatch Logs log group encryption supports only symmetric KMS keys.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
  - id: logs-kms-context
    text: The kms:EncryptionContext:aws:logs:arn condition can restrict key use to a specific log group.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
  - id: object-lock
    text: Object Lock compliance retention protects saved log versions from deletion during their retention period.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-retention-modes
  - id: opensearch
    text: CloudWatch Logs can stream log events to OpenSearch through a Lambda subscription delivery path.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_Stream
  - id: subscription-errors
    text: Non-retryable destination errors can disable a subscription for up to 10 minutes, during which logs are skipped.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: missing-breaching
    text: breaching treats missing data as violating the threshold.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-and-missing-data
  - id: missing-not-breaching
    text: notBreaching treats missing data as within the threshold.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarms-and-missing-data.html#alarms-and-missing-data
  - id: firehose-errors
    text: Firehose backup configuration includes an S3 backup bucket, bucket prefix, and error output prefix for failed data.
    source: https://docs.aws.amazon.com/firehose/latest/dev/create-configure-backup.html#create-configure-backup
  - id: athena
    text: Athena runs standard SQL directly on data in S3; it is serverless, so you pay only for the queries you run.
    source: https://docs.aws.amazon.com/athena/latest/ug/what-is.html
  - id: quick-sources
    text: Quick Sight can use Athena, Redshift, OpenSearch Service and S3 as data sources for dashboards.
    source: https://docs.aws.amazon.com/quick/latest/userguide/supported-data-sources.html#relational-data-sources
diagrams:
  - id: centralized-observability
    title: Workload accounts link telemetry to a monitoring account and stream logs to a locked archive
    facts: [cross-purpose, sink, link, limits, sink-policy, cross-queries, cross-alarms, cross-pricing, subscription-purpose, destination-setup, destination-region, firehose-archive, account-filter, agent, guest-metrics, logs-kms, logs-kms-context, object-lock, opensearch, subscription-errors, missing-breaching, missing-not-breaching, firehose-errors, athena, quick-sources]
    width: 1240
    height: 880
    groups:
      - { label: Workload account A, x: 20, y: 20, w: 300, h: 440, tone: neutral, icon: group-aws-account }
      - { label: Workload account B, x: 20, y: 500, w: 300, h: 360, tone: neutral, icon: group-aws-account }
      - { label: Monitoring account, x: 600, y: 20, w: 620, h: 360, tone: mgmt, icon: group-aws-account }
      - { label: Log archive account, x: 600, y: 420, w: 620, h: 440, tone: storage, icon: group-aws-account }
    nodes:
      - { id: agent, label: CloudWatch agent, sub: "EC2 memory, disk, logs", x: 60, y: 70, w: 170, h: 86, tone: compute, icon: cloudwatch, info: "Collects guest OS metrics, such as memory and disk space, and log files." }
      - { id: cwa, label: CloudWatch, sub: "metrics, logs, traces", x: 60, y: 210, w: 170, h: 86, tone: mgmt, icon: cloudwatch, info: "Owns a link to the monitoring account's sink." }
      - { id: logsa, label: Log group, sub: "KMS key, subscription", x: 60, y: 350, w: 170, h: 86, tone: mgmt, icon: res-cloudwatch-logs, info: "Encrypted with a symmetric KMS key; a key policy condition can limit the key to this log group." }
      - { id: cwb, label: CloudWatch, sub: "metrics, logs, traces", x: 60, y: 560, w: 170, h: 86, tone: mgmt, icon: cloudwatch }
      - { id: logsb, label: Log group, sub: subscription filter, x: 60, y: 720, w: 170, h: 86, tone: mgmt, icon: res-cloudwatch-logs }
      - { id: sink, label: OAM sink, sub: cross-account link target, x: 640, y: 80, w: 180, h: 86, tone: mgmt, icon: cloudwatch, info: "Its sink policy allows the organization to create links and limits the shared telemetry types." }
      - { id: dash, label: CloudWatch, sub: dashboards and alarms, x: 940, y: 80, w: 180, h: 86, tone: mgmt, icon: cloudwatch, info: "One Logs Insights query can span log groups in several source accounts. Alarms set to treat missing data as breaching fire when a source goes silent." }
      - { id: sns, label: SNS topic, sub: on-call team, x: 940, y: 250, w: 180, h: 86, tone: integration, icon: res-simple-notification-service-topic }
      - { id: dest, label: Logs destination, sub: access policy, x: 630, y: 480, w: 150, h: 86, tone: mgmt, icon: res-cloudwatch-logs, info: "Same Region as the sending log groups. Its access policy lists the sender accounts." }
      - { id: fh, label: Data Firehose, sub: delivery stream, x: 830, y: 480, w: 150, h: 86, tone: integration, icon: data-firehose }
      - { id: bucket, label: S3 bucket, sub: Object Lock, x: 1030, y: 480, w: 150, h: 86, tone: storage, icon: res-simple-storage-service-bucket, info: "Compliance-mode retention keeps each log version from being deleted during its retention period." }
      - { id: err, label: Error prefix, sub: failed records, x: 630, y: 680, w: 150, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: quick, label: Quick Sight, sub: dashboards, x: 830, y: 680, w: 150, h: 86, tone: integration, icon: quick }
      - { id: athena, label: Athena, sub: SQL on archive, x: 1030, y: 680, w: 150, h: 86, tone: integration, icon: athena }
    edges:
      - { from: agent, to: cwa, step: 1 }
      - { from: cwa, to: sink, step: 2 }
      - { from: cwb, to: sink, step: 2 }
      - { from: sink, to: dash, step: 3 }
      - { from: dash, to: sns, step: 4 }
      - { from: logsa, to: dest, step: 5 }
      - { from: logsb, to: dest, step: 5 }
      - { from: dest, to: fh, step: 6 }
      - { from: fh, to: bucket, step: 6 }
      - { from: bucket, to: athena, step: 7 }
      - { from: quick, to: athena, step: 7 }
      - { from: fh, to: err, step: 8, dashed: true }
    steps:
      - "On EC2, the CloudWatch agent collects guest OS metrics such as memory and disk, plus log files, which basic monitoring does not include."
      - "Each workload account creates a link to the monitoring account's sink, sharing the telemetry types the sink policy accepts."
      - "In the monitoring account, dashboards and Logs Insights queries span all linked accounts in the Region."
      - "Alarms in the monitoring account watch source-account metrics and notify the on-call team through SNS."
      - "Log groups are encrypted with a KMS key. A subscription filter on each log group, or one account-level filter, sends matching events to a logical destination in the log archive account."
      - "The destination hands events to Data Firehose, which delivers them to an S3 bucket whose Object Lock retention keeps them from being deleted."
      - "Athena queries the archive in place, and Quick Sight builds dashboards on those queries."
      - "Records Firehose cannot deliver or process go to an error prefix in S3 instead of being lost."
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
  - id: reference-architectures-140
    q: "Dashboards must show memory and disk usage of EC2 instances, which basic monitoring lacks. What has to be installed?"
    a: "The **CloudWatch agent**, which collects guest OS metrics and log files. Its metrics are billed as custom metrics."
    facts: [agent, guest-metrics]
  - id: reference-architectures-141
    q: "Archived logs must be impossible to delete, even by an administrator, for seven years. Which S3 feature fits?"
    a: "**S3 Object Lock** in compliance mode with a retention period, which protects each log version from deletion until it ends."
    facts: [object-lock]
  - id: reference-architectures-142
    q: "A team encrypts a CloudWatch Logs log group with an asymmetric KMS key, and it fails. Why?"
    a: "Log group encryption supports **only symmetric KMS keys**. A key policy condition on kms:EncryptionContext:aws:logs:arn can limit the key to one log group."
    trap: true
    facts: [logs-kms, logs-kms-context]
  - id: reference-architectures-143
    q: "An application's logs must be searchable in OpenSearch Service as they arrive. Which CloudWatch Logs feature delivers them?"
    a: "A **subscription filter** with a **Lambda** delivery path to OpenSearch. Subscriptions also feed Kinesis Data Streams, Data Firehose or Lambda."
    facts: [opensearch, subscription-purpose]
  - id: reference-architectures-144
    q: "An alarm must fire when a workload stops sending its heartbeat metric altogether. How should missing data be treated?"
    a: "As **breaching**, so missing data counts as violating the threshold. With notBreaching, silence would look healthy."
    trap: true
    facts: [missing-breaching, missing-not-breaching]
  - id: reference-architectures-145
    q: "Auditors want SQL queries and dashboards over years of archived logs in S3 without loading them anywhere. What fits?"
    a: "**Athena** to query the files in place, and **Quick Sight** dashboards with Athena as the data source."
    facts: [athena, quick-sources]
---
Operations questions at the professional level spread a workload across many accounts and ask how one team sees it all and keeps the logs. Two mechanisms do the work: CloudWatch cross-account observability for live viewing and alarms, and CloudWatch Logs subscriptions for a durable copy in a log archive account.

### How it works

1. A monitoring account owns a sink. Each source account creates a link to it, allowed by the sink policy.
2. The monitoring account builds dashboards, runs Logs Insights queries across accounts and creates alarms on source-account metrics.
3. Subscription filters, per log group or account level, send matching log events to a logical destination in the log archive account.
4. The destination passes events to Data Firehose, which delivers them to an S3 bucket with Object Lock; Athena and Quick Sight query it there.
5. The CloudWatch agent adds OS metrics and log files from EC2, and log groups are encrypted with a symmetric KMS key.

| Decision | Choose | When |
|---|---|---|
| OS metrics from EC2 | CloudWatch agent | Memory, disk, log files |
| One view of many accounts | OAM sink and links | Dashboards, queries and alarms across accounts |
| Central, undeletable log archive | Subscription to a destination, Firehose, S3 Object Lock | Retention and audit |
| Search logs as they arrive | Subscription with a Lambda path to OpenSearch | Full-text search |
| Query the archive | Athena and Quick Sight | SQL and dashboards on S3 |
| Detect a silent source | Alarm treating missing data as breaching | Heartbeat metrics |
| Process log events in near real time | Subscription to Kinesis Data Streams or Lambda | Custom processing per event |

### Exam cues

- If the question says one console for metrics, logs and traces from many accounts, think cross-account observability, because links share data without copying it.
- If the question says query logs from several accounts at once, think Logs Insights in the monitoring account.
- If the question says central long-term log storage from many accounts, think subscription filters to a logical destination with Firehose and S3.
- If the question says every log group including new ones, think an account-level subscription filter.
- If the question says EC2 memory or disk metrics, think the CloudWatch agent.
- If the question says logs must never be deleted during retention, think S3 Object Lock in compliance mode.
- If the question says alert when metrics stop arriving, think treat missing data as breaching.

### Remember

- One sink per Region per account; a source shares with up to five monitoring accounts.
- No extra charge for shared logs and metrics; the first trace copy is free.
- Log group and logical destination share a Region.
- Subscription targets: Kinesis Data Streams, Data Firehose, Lambda.

> **Trap:** Cross-account observability works within a Region. Each Region needs its own sink and links.
