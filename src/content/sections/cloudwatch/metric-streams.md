---
title: Metric streams
level: associate
order: 130
facts:
  - id: ms-purpose
    text: Metric streams continuously deliver CloudWatch metric updates through Data Firehose to S3 or
      another supported destination.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html#CloudWatch-Metric-Streams
  - id: ms-formats
    text: Metric streams support JSON, OpenTelemetry 1.0.0, and OpenTelemetry 0.7.0 output formats.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html#CloudWatch-Metric-Streams
  - id: ms-filters
    text: A metric stream supports up to 1000 include filters or exclude filters for namespaces or
      specific metrics, but cannot mix the two filter modes.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html#CloudWatch-Metric-Streams
  - id: ms-new
    text: New metrics matching an existing stream filter are included automatically.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html#CloudWatch-Metric-Streams
  - id: ms-cross
    text: A monitoring-account metric stream can include metrics from linked source accounts.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html#CloudWatch-Metric-Streams
  - id: ms-quick
    text: CloudWatch offers custom Firehose setup, quick S3 setup with needed resources created by
      default, and quick setup for supported partners.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html#CloudWatch-Metric-Streams
  - id: ms-dimensions
    text: Selecting a metric name and namespace streams all dimension combinations for that metric.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-setup.html#CloudWatch-metric-streams-setup
  - id: ms-order
    text: Metric stream data is sent every minute and can reach the destination out of order.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-setup.html#CloudWatch-metric-streams-setup
  - id: ms-age
    text: Metric streams exclude metrics whose timestamps are more than two days old.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-setup.html#CloudWatch-metric-streams-setup
  - id: ms-buffer
    text: Final destination latency depends on Firehose buffering by payload size or maximum wait time,
      whichever is reached first.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-setup.html#CloudWatch-metric-streams-setup
  - id: ms-trust
    text: The metric-stream IAM role must trust streams.metrics.cloudwatch.amazonaws.com.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-trustpolicy.html#CloudWatch-metric-streams-trustpolicy
  - id: ms-write
    text: The metric-stream role needs firehose:PutRecord and firehose:PutRecordBatch permissions scoped
      to the delivery stream.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-trustpolicy.html#CloudWatch-metric-streams-trustpolicy
  - id: ms-statistics
    text: Metric streams always include Minimum, Maximum, SampleCount, and Sum; additional statistics
      can be configured.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-statistics.html#CloudWatch-metric-streams-statistics
  - id: ms-running
    text: A Running metric stream can have no output if its filters match no data.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-operation.html#CloudWatch-metric-streams-operation
  - id: term-namespace
    text: A metric namespace keeps related metrics together and separates them from other metric
      collections.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Namespace
  - id: term-dimension
    text: A dimension is a name and value that identifies a particular variation of a metric.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Dimension
  - id: term-role
    text: An IAM role is an identity with permissions that an authorized user, application, or service
      can assume.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
  - id: ms-not-extraction
    text: Metric filters turn matching incoming log events into numeric CloudWatch metrics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#MonitoringLogData
cards:
  - id: cloudwatch-022
    q: Which CloudWatch mechanism continuously exports metric updates to S3 or another analytics
      destination?
    a: A metric stream through Data Firehose. Custom Firehose, quick S3, and supported partner setup
      workflows are available.
    facts:
      - ms-purpose
      - ms-quick
  - id: cloudwatch-043
    q: A company needs CloudWatch metrics continuously delivered to an external monitoring endpoint
      without polling. Which path fits?
    a: CloudWatch metric stream to Data Firehose and a supported destination. Delivery latency depends
      on Firehose buffering; linked source-account metrics can be included by a monitoring account.
    facts:
      - ms-purpose
      - ms-buffer
      - ms-cross
  - id: cloudwatch-044
    q: How can a CloudWatch metric stream select metrics, and which output formats are supported?
    a: Use up to 1000 include filters or exclude filters, but not both modes. Formats are JSON,
      OpenTelemetry 1.0.0, and OpenTelemetry 0.7.0. New matching metrics are included automatically.
    facts:
      - ms-filters
      - ms-formats
      - ms-new
  - id: cloudwatch-085
    q: A CloudWatch metric stream is Running but its destination receives no data. Can its filters
      explain this?
    a: Yes. Running does not mean matching metrics exist. Check whether the selected namespaces and
      metrics have data matching the filters.
    trap: true
    facts:
      - ms-running
  - id: cloudwatch-086
    q: A CloudWatch metric stream cannot write to its Firehose stream. Which role settings should
      operators inspect?
    a: Trust for streams.metrics.cloudwatch.amazonaws.com and permissions for firehose:PutRecord and
      firehose:PutRecordBatch on the delivery stream.
    facts:
      - ms-trust
      - ms-write
diagrams:
  - id: cloudwatch-metric-stream-delivery
    title: Metric updates reach S3 through Firehose
    width: 900
    height: 230
    nodes:
      - id: metrics
        label: CloudWatch
        sub: metric stream
        icon: cloudwatch
        x: 30
        y: 90
        w: 210
        h: 86
        tone: mgmt
      - id: firehose
        label: Firehose
        sub: buffer + deliver
        icon: data-firehose
        x: 350
        y: 90
        w: 200
        h: 86
        tone: integration
      - id: bucket
        label: S3 bucket
        sub: metric records
        icon: res-simple-storage-service-bucket
        x: 670
        y: 90
        w: 200
        h: 86
        tone: storage
    edges:
      - from: metrics
        to: firehose
        step: 1
        label: updates
      - from: firehose
        to: bucket
        step: 2
        label: deliver
    steps:
      - The metric stream sends selected CloudWatch metric updates to Firehose using its delivery
        role.
      - Firehose buffers and delivers records to the configured S3 destination.
---
A metric stream continuously sends CloudWatch metric updates through Data Firehose to S3 or another supported destination. It moves measurements that already exist in CloudWatch to another system.

### How it works

1. Choose a custom Firehose delivery stream, quick S3 setup, or a supported partner setup. Firehose is the delivery layer that forwards the updates to the chosen destination.
2. Give the metric-stream IAM role, a permission identity assumed by a service, trust for `streams.metrics.cloudwatch.amazonaws.com`. Allow `firehose:PutRecord` and `firehose:PutRecordBatch` on the delivery stream.
3. Select all metrics or use include filters or exclude filters on namespaces or metric names. A namespace is a named collection of metrics. All dimension combinations, the name/value labels identifying a metric series, are sent for a selected metric name and namespace. New matching metrics are included automatically.
4. Choose the output format. A monitoring account can include linked source-account metrics. Updates are sent every minute; Firehose buffers by size or wait time, and delivery can arrive out of order.

| Output format | Selection |
|---|---|
| JSON | JSON-formatted metric records |
| OpenTelemetry 1.0.0 | OpenTelemetry 1.0.0 encoding |
| OpenTelemetry 0.7.0 | OpenTelemetry 0.7.0 encoding |

### Exam cues

- If the question says continuously deliver metrics to an external tool, think metric stream and Firehose, because this path pushes updates to a supported destination.
- If the question says include metrics created later, think a matching stream filter, because new matching metrics enter the stream automatically.
- If the question says the stream is Running but empty, think filter selection, because Running alone does not imply matching data exists.

### Remember

- Up to 1000 include filters or exclude filters; a stream cannot mix those modes.
- Formats: JSON, OpenTelemetry 1.0.0, OpenTelemetry 0.7.0.
- Always included statistics: `Minimum`, `Maximum`, `SampleCount`, `Sum`.
- Updates are sent every minute. Timestamps more than two days old are excluded.
- Firehose buffering affects final latency; arrival order is not guaranteed.

> **Trap:** Metric streams export existing metrics. A requirement to create metrics from incoming logs calls for a metric filter.
