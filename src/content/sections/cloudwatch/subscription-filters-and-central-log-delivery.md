---
title: Subscription filters and central log delivery
level: professional
order: 80
facts:
  - id: subscription-purpose
    text: Subscriptions deliver matching new CloudWatch log events to Kinesis Data Streams, Data
      Firehose, or Lambda for processing.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: subscription-class
    text: Subscriptions require Standard log class groups.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: subscription-limit
    text: The CloudWatch Logs quota table allows up to 5 subscription filters per log group.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/cloudwatch_limits_cwl.html#cloudwatch_limits_cwl
  - id: account-limit
    text: An account can have 1 account-level subscription filter per Region.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: subscription-delay
    text: Subscription events are usually delivered less than 3 minutes after ingestion.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: subscription-encoding
    text: Subscription payloads use gzip compression and base64 encoding at their receiving interfaces.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: subscription-lambda-payload
    text: Direct Lambda subscriptions carry the base64-encoded gzip payload in awslogs.data.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters-AccountLevel.html#SubscriptionFilters-AccountLevel
  - id: subscription-at-least-once
    text: Subscriptions deliver at least once, so duplicate events can occur.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: subscription-retries
    text: Retryable destination errors are retried for up to 24 hours.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: subscription-access-errors
    text: Non-retryable destination errors can disable a subscription for up to 10 minutes, during which
      logs are skipped.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: destination-setup
    text: The cross-account recipient creates a target, a delivery role, a logical destination, and an
      access policy; senders reference the destination ARN in subscription filters.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions-Kinesis.html#CrossAccountSubscriptions-Kinesis
  - id: destination-region
    text: The source log group and logical destination must share a Region; the destination target
      resource can be in a different Region.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions.html#CrossAccountSubscriptions
  - id: cross-account-lambda
    text: Cross-account Lambda delivery uses a recipient role permitting invocation, Lambda invoke
      permission for CloudWatch Logs, a logical destination, and an access policy allowing senders.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CrossAccountSubscriptions-Lambda.html#CrossAccountSubscriptions-Lambda
  - id: account-selection
    text: An account-level subscription applies to all log groups unless selection criteria limit which
      groups are included.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/subscription-concepts.html#subscription-concepts
  - id: recursion
    text: Exclude log groups belonging to subscription delivery components to prevent recursive log
      delivery.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters-AccountLevel.html#SubscriptionFilters-AccountLevel
  - id: create-event
    text: EventBridge can match CloudTrail-delivered CloudWatch Logs API events with source aws.logs,
      eventSource logs.amazonaws.com, and an eventName filter.
    source: https://docs.aws.amazon.com/eventbridge/latest/ref/events-ref-logs.html#event-ref-logs-events-via-CT
  - id: attach-filter
    text: PutSubscriptionFilter creates or updates a filter for the named log group and destination.
    source: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html#API_PutSubscriptionFilter
  - id: lambda-event-target
    text: An EventBridge rule can invoke Lambda as a target.
    source: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-targets.html#eb-console-targets
  - id: kinesis-lambda
    text: Lambda reads Kinesis records through an event source mapping whose records carry
      base64-encoded data.
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html
  - id: firehose-kinesis
    text: Data Firehose can use Kinesis Data Streams as a source and deliver to S3.
    source: https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html
  - id: opensearch-delivery
    text: CloudWatch Logs can stream log events to OpenSearch through a Lambda subscription delivery
      path.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_Stream
  - id: kinesis-distribution
    text: Kinesis subscription delivery groups records by log stream by default; Random distribution spreads
      records more evenly and can reduce throttling.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
  - id: subscription-transform
    text: For an active log transformer, applyOnTransformedLogs selects transformed events when true rather
      than the original ingested events.
    source: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html#CWL-PutSubscriptionFilter-request-applyOnTransformedLogs
  - id: subscription-system-fields
    text: Subscription filters can emit account, Region, and source log group system fields and select
      events by account and Region system fields.
    source: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html#CWL-PutSubscriptionFilter-request-emitSystemFields
  - id: subscription-pass-role
    text: PutSubscriptionFilter requires iam:PassRole for destinations other than Lambda.
    source: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html#API_PutSubscriptionFilter
  - id: subscription-source-arn
    text: A CloudWatch Logs delivery role trust policy can restrict role assumption with aws:SourceArn to
      reduce confused deputy risk.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
  - id: centralization-rule
    text: CloudWatch Logs centralization rules replicate new log data across organization accounts and
      Regions into destination log groups; existing historical data is not copied.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatchLogs_Centralization.html#CloudWatchLogs_Centralization
  - id: centralization-prerequisites
    text: CloudWatch Logs centralization requires source and destination accounts in the same AWS
      organization and trusted access for CloudWatch.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatchLogs_Centralization.html#centralization-prerequisites
  - id: centralization-kms
    text: Centralization rules can exclude source groups encrypted with customer managed keys; destination
      customer managed keys require permission for CloudWatch Logs and the tag LogsManaged=true.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatchLogs_Centralization.html#create-centralization-rule
  - id: delivery-metrics
    text: The AWS/Logs DeliveryErrors and DeliveryThrottling metrics count subscription delivery errors
      and throttled log events respectively.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CloudWatch-Logs-Monitoring-CloudWatch-Metrics.html#cwl-metrics
  - id: subscription-pattern-select
    text: "A subscription filter forwards only the log events that match its filter pattern, so the pattern decides which entries the destination receives."
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#DestinationKinesisExample
diagrams:
  - id: cloudwatch-central-logs
    title: Central log aggregation across accounts
    width: 1200
    height: 510
    groups:
      - label: Source accounts
        icon: group-aws-account
        x: 25
        y: 30
        w: 300
        h: 450
        tone: mgmt
      - label: Central log account (same Region)
        icon: group-aws-account
        x: 388
        y: 30
        w: 788
        h: 450
        tone: mgmt
    nodes:
      - id: lg1
        label: Log group
        sub: account A + filter
        icon: res-cloudwatch-logs
        x: 56
        y: 120
        w: 190
        h: 86
        tone: mgmt
        info: The sender creates a subscription filter pointing to the recipient destination ARN. A Standard
          log group supports up to five subscription filters.
      - id: lg2
        label: Log group
        sub: account B + filter
        icon: res-cloudwatch-logs
        x: 56
        y: 315
        w: 190
        h: 86
        tone: mgmt
        info: Each sender configures delivery to the recipient destination. An account-level subscription
          policy can cover eligible groups unless selection criteria exclude them.
      - id: dest
        label: Logs destination
        sub: access policy + role
        icon: res-cloudwatch-logs
        x: 425
        y: 218
        w: 150
        h: 86
        tone: mgmt
        info: The recipient creates the logical destination, its delivery role, and an access policy
          allowing the senders. The log group and logical destination must be in the same Region.
          The target resource may be in another Region.
      - id: kds
        label: Kinesis stream
        sub: Data Streams
        icon: kinesis-data-streams
        x: 688
        y: 90
        w: 150
        h: 86
        tone: integration
        info: This branch uses Kinesis Data Streams as the destination target. A logical destination can
          also point directly to Firehose or, with the documented permissions, Lambda.
      - id: fn
        label: Lambda
        sub: custom processing
        icon: lambda
        x: 950
        y: 90
        w: 150
        h: 86
        tone: compute
        info: A Lambda event source mapping reads Kinesis records. The record data contains gzip-compressed
          subscription events; decode the Kinesis record data before decompressing. Direct
          Logs-to-Lambda subscriptions use awslogs.data.
      - id: fh
        label: Firehose
        sub: buffer + deliver
        icon: data-firehose
        x: 688
        y: 330
        w: 150
        h: 86
        tone: integration
        info: Firehose can read from Kinesis Data Streams and deliver buffered records to S3.
      - id: s3
        label: S3 archive
        sub: query with Athena
        icon: res-simple-storage-service-bucket
        x: 950
        y: 330
        w: 150
        h: 86
        tone: storage
        info: S3 stores delivered log batches for archival and analysis.
    edges:
      - from: lg1
        to: dest
        step: 1
      - from: lg2
        to: dest
        step: 1
      - from: dest
        to: kds
        step: 2
      - from: kds
        to: fn
        step: 3
      - from: kds
        to: fh
        step: 4
      - from: fh
        to: s3
        step: 5
    steps:
      - Source subscriptions send matching new log events to the recipient logical destination.
      - The destination role permits CloudWatch Logs to write into Kinesis Data Streams.
      - A Lambda event source mapping can read Kinesis records for processing.
      - Firehose can also read the Kinesis stream.
      - Firehose buffers and delivers records to S3.
cards:
  - id: cloudwatch-015
    q: What are the CloudWatch Logs subscription filter limits and delivery guarantees?
    a: Up to 5 filters per Standard log group and 1 account-level filter per Region. Delivery is usually
      within 3 minutes, uses gzip, and is at least once. Retryable errors are retried for up to 24
      hours.
    facts:
      - subscription-limit
      - subscription-class
      - account-limit
      - subscription-delay
      - subscription-encoding
      - subscription-at-least-once
      - subscription-retries
  - id: cloudwatch-016
    q: Several AWS accounts must stream CloudWatch logs to a security account. What does each side
      configure?
    a: The recipient creates the target, delivery role, logical destination, and destination access
      policy. Senders create subscription filters referencing the destination ARN. The source group
      and logical destination share a Region.
    facts:
      - destination-setup
      - destination-region
  - id: cloudwatch-028
    q: A security account needs matching CloudWatch log events from other accounts as they arrive. What
      delivery configuration fits?
    a: Cross-account subscription filters to a recipient logical destination. The destination access
      policy authorizes senders, and the delivery role authorizes writing to the target.
    facts:
      - subscription-purpose
      - destination-setup
  - id: cloudwatch-032
    q: A security team needs central near-real-time analysis of CloudWatch logs from many accounts.
      Which ingestion path fits?
    a: Source subscription filters to a security-account logical destination backed by Kinesis Data
      Streams or Firehose. Consumers can analyze the delivered events; subscriptions use gzip and
      may deliver duplicates.
    facts:
      - destination-setup
      - subscription-encoding
      - subscription-at-least-once
  - id: cloudwatch-033
    q: Which CloudWatch feature forwards new log events to another processing system, and how does
      direct Lambda delivery encode them?
    a: A subscription filter. Targets include Kinesis Data Streams, Firehose, and Lambda. Direct Lambda
      subscriptions carry base64-encoded gzip data in awslogs.data.
    facts:
      - subscription-purpose
      - subscription-lambda-payload
  - id: cloudwatch-064
    q: A company wants every eligible current and future CloudWatch log group in an account to forward
      logs without per-group automation. What should it configure?
    a: An account-level subscription policy. Without selection criteria it covers all eligible log
      groups; exclude delivery component log groups to prevent recursion.
    facts:
      - account-selection
      - recursion
  - id: cloudwatch-065
    q: A central Lambda function must process CloudWatch logs from another account directly. Is a
      cross-account Lambda subscription destination supported?
    a: Yes. Configure the recipient invocation role, Lambda permission, logical destination, and
      destination access policy, then point the sender filter at that destination.
    trap: true
    facts:
      - cross-account-lambda
  - id: cloudwatch-066
    q: A team uses per-group CloudWatch log subscriptions and must attach a Firehose filter when a group
      is created. How can it automate that?
    a: Match the CloudTrail-delivered CreateLogGroup API event in EventBridge, invoke Lambda, and have
      the function call PutSubscriptionFilter for the new group and Firehose destination. An
      account-level policy can avoid this per-group workflow.
    facts:
      - create-event
      - lambda-event-target
      - attach-filter
      - account-selection
  - id: cloudwatch-067
    q: A CloudWatch Logs subscription retries delivery to a consumer. What must the consumer tolerate?
    a: Duplicate events. Subscription delivery is at least once, and retryable failures are retried for
      up to 24 hours.
    facts:
      - subscription-at-least-once
      - subscription-retries
  - id: cloudwatch-068
    q: A CloudWatch Logs subscription sends through Kinesis to Lambda. Should the function expect the
      direct-subscription awslogs.data envelope?
    a: No. The function receives Kinesis records through its event source mapping. Decode each record
      data value and then decompress the subscription payload. awslogs.data belongs to direct
      Logs-to-Lambda delivery.
    trap: true
    facts:
      - kinesis-lambda
      - subscription-encoding
      - subscription-lambda-payload
  - id: cloudwatch-094
    q: A CloudWatch Logs subscription throttles a Kinesis Data Streams destination on a busy log stream.
      Which distribution option can spread writes more evenly?
    a: Set distribution to Random. The default groups records by log stream, which can concentrate writes.
    facts:
      - kinesis-distribution
  - id: cloudwatch-095
    q: A CloudWatch Logs subscription must match fields produced by an active log transformer. Which
      setting selects those fields?
    a: Set applyOnTransformedLogs to true. The filter then uses transformed rather than original events.
    facts:
      - subscription-transform
  - id: cloudwatch-096
    q: A central CloudWatch Logs subscription must identify and select events by their original account
      and Region. Which subscription options help?
    a: Emit the source system fields and use fieldSelectionCriteria to select account and Region values.
    facts:
      - subscription-system-fields
  - id: cloudwatch-097
    q: An engineer creates a CloudWatch Logs subscription to Kinesis Data Streams. What permission
      and role trust restriction are relevant?
    a: The caller needs iam:PassRole. Restrict the CloudWatch Logs delivery role trust with aws:SourceArn.
    facts:
      - subscription-pass-role
      - subscription-source-arn
  - id: cloudwatch-102
    q: An organization needs CloudWatch log groups copied across accounts and Regions into central
      CloudWatch log groups. Which feature applies and does it copy historical events?
    a: Use CloudWatch Logs centralization rules with trusted access. Only new events after rule creation
      are copied; historical events are not.
    facts:
      - centralization-rule
      - centralization-prerequisites
  - id: cloudwatch-103
    q: A CloudWatch Logs centralization rule fails to deliver to a destination encrypted with a customer
      managed KMS key. What key configuration should the team check?
    a: Check that the key permits CloudWatch Logs and has the LogsManaged=true tag. Also check whether
      the rule excludes source log groups encrypted with customer managed keys.
    facts:
      - centralization-kms
  - id: cloudwatch-104
    q: A team needs to detect throttling and errors forwarding CloudWatch Logs subscriptions to Firehose.
      Which CloudWatch metrics should it monitor?
    a: Monitor AWS/Logs DeliveryThrottling for throttled events and DeliveryErrors for delivery errors.
    facts:
      - delivery-metrics
  - id: cloudwatch-111
    q: "A CloudWatch Logs log group must stream entries to another service, but entries containing personal data must not be delivered. Where is the selection made?"
    a: "In the subscription filter pattern. CloudWatch Logs forwards only events that match it, so a pattern that matches only the wanted entries keeps the others out of the destination."
    facts:
      - subscription-pattern-select
      - subscription-purpose
---
A CloudWatch Logs subscription forwards matching new events to a processing destination. Cross-account delivery lets a security account receive events without polling every source account.

### How it works

1. The recipient creates a target such as Kinesis Data Streams or Firehose. A delivery role is the permission set CloudWatch Logs assumes to write to that target.
2. The recipient creates a logical destination, an attachment point identified by an Amazon Resource Name (ARN), and a destination access policy permitting senders.
3. Each sender creates a subscription filter pointing to that ARN. The log group and logical destination must share a Region, although the target resource can be elsewhere.
4. For direct cross-account Lambda delivery, grant the recipient role invocation rights and let CloudWatch Logs invoke the function. Create the logical destination and sender access policy before the sender filter.
5. Process compressed batches and tolerate duplicates. Direct Lambda delivery uses `awslogs.data`; delivery through Kinesis uses the Kinesis event record structure.
6. For an active log transformer, set `applyOnTransformedLogs` to match transformed rather than original events. Emit system fields to identify account, Region, and source log group, and use field selection criteria to select source accounts or Regions.

For automatic coverage, use an account-level subscription policy and selection criteria, rules choosing eligible log groups. Exclude log groups produced by the delivery workflow to prevent a loop. If a design needs per-group setup, an EventBridge rule can match CloudTrail API events using `source: aws.logs`, `eventSource: logs.amazonaws.com`, and `eventName: CreateLogGroup`, invoke Lambda, and call `PutSubscriptionFilter` for Firehose.

### Exam cues

- If the question says central security processing as events arrive, think subscription filters and a recipient destination, because the sources push matching events.
- If the question says automatically include new log groups, think account-level subscription, because it covers eligible groups without a filter-creation function.
- If the question says a function in another account must receive logs directly, think the documented Lambda logical destination, because cross-account Lambda delivery is supported with the required permissions.
- If the question says search delivered logs in OpenSearch, think the CloudWatch Logs streaming integration, because it uses a Lambda subscription delivery path.
- If Kinesis delivery throttles a busy log stream, think `Random` distribution, because the default groups records by log stream.
- If creating a subscription to Kinesis fails authorization, check `iam:PassRole`. Restrict the delivery role trust with `aws:SourceArn` to reduce confused deputy risk.
- If an organization needs central CloudWatch log groups across accounts and Regions, think centralization rules. Trusted access is required and only new events are copied.
- If centralization to a customer managed KMS key fails, check key permissions and the `LogsManaged=true` tag. The rule can also exclude source groups encrypted with customer managed keys.
- If subscription delivery is failing, monitor `AWS/Logs` metrics `DeliveryErrors` and `DeliveryThrottling`.
- If the question says send only some log entries to a stream or function, think the subscription filter pattern, because only matching events are forwarded.

### Remember

- Standard class only; up to 5 filters per group and 1 account-level filter per Region.
- Delivery is usually under 3 minutes. Retryable errors are retried up to 24 hours.
- Delivery is at least once, meaning a consumer may see an event again.
- Non-retryable errors can disable forwarding for up to 10 minutes and skip logs during that time.
- The diagram shows a Kinesis-based path with Lambda processing and Firehose delivery to S3; direct Firehose and Lambda destinations are alternatives.

> **Trap:** A subscription's delivery role and destination access policy solve different permission checks. Permission to send to a destination does not give CloudWatch Logs permission to invoke or write to the target.

> **Trap:** Subscribing the processing function's own log group can feed its output back into the same workflow. Exclude delivery component groups.
