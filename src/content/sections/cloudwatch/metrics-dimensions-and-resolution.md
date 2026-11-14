---
title: Metrics, dimensions, and resolution
level: associate
order: 10
facts:
  - id: metric-identity
    text: A traditional CloudWatch metric is a time series identified by its namespace, name, and
      dimension combination.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric
  - id: namespace
    text: A namespace separates related metrics from metrics in other namespaces; AWS service namespaces
      commonly start with AWS/.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Namespace
  - id: dimension
    text: A dimension is a name and value that identifies a variation of a traditional CloudWatch metric.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Dimension
  - id: dimension-limit
    text: A traditional CloudWatch metric supports up to 30 dimensions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Dimension
  - id: custom-aggregation
    text: CloudWatch does not automatically aggregate traditional custom metrics across different
      dimension combinations.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#dimension-combinations
  - id: metric-region
    text: Traditional CloudWatch metrics belong to the Region where they are created.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric
  - id: resolution
    text: Traditional custom metrics have standard resolution of 60 seconds or high resolution of 1
      second.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Resolution_definition
  - id: high-resolution-publish
    text: PutMetricData uses StorageResolution=1 to publish high-resolution custom metrics.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html#high-resolution-metrics
  - id: high-resolution-alarms
    text: High-resolution alarms support periods of 10, 20, or 30 seconds and cost more than standard
      alarms.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-evaluation.html#high-resolution-alarms
  - id: retention-subminute
    text: Metric data with periods shorter than 60 seconds is available for 3 hours.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric
  - id: retention-minute
    text: Metric data at a 1-minute period is available for 15 days.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric
  - id: retention-five-minute
    text: Metric data at a 5-minute period is available for 63 days.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric
  - id: retention-hour
    text: Metric data at a 1-hour period is available for 455 days, or 15 months.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric
  - id: retention-rollup
    text: CloudWatch aggregates older metric data into coarser periods before its eventual expiration.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric
  - id: ec2-basic
    text: EC2 basic monitoring is the default and has no charge; status checks have 1-minute periods and
      other metrics have 5-minute periods.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/manage-detailed-monitoring.html
  - id: ec2-detailed
    text: EC2 detailed monitoring provides 1-minute metrics with additional per-metric charges.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/manage-detailed-monitoring.html
  - id: percentile
    text: The p95 statistic is the value below which 95 percent of samples fall; percentiles describe a
      distribution rather than its average.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Statistics-definitions.html#Statistics-definitions
  - id: latency-percentile
    text: A high latency percentile exposes the experience of slower requests that an average can hide.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Percentiles
  - id: otel-distinction
    text: CloudWatch OpenTelemetry metrics use labels rather than traditional dimensions and follow
      different resolution and retention behavior.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Dimension
  - id: quota-percent-alarm
    text: "For services that publish usage metrics to Service Quotas, the metric math expression m1/SERVICE_QUOTA(m1)*100 shows usage as a percentage of the quota, and a CloudWatch alarm on it can notify before the quota is reached."
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Quotas-Visualize-Alarms.html#CloudWatch-Quotas-Visualize-Alarms
  - id: purpose
    text: Amazon CloudWatch monitors AWS resources and applications in real time, covering resource utilization, application performance and operational health.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html
cards:
  - id: cloudwatch-001
    q: What identifies a traditional CloudWatch metric, and what does a new dimension value do?
    a: Namespace, metric name, and dimensions identify it. A new dimension combination creates a
      separate metric. The limit is 30 dimensions, and custom metrics are not automatically
      aggregated across combinations.
    facts:
      - metric-identity
      - dimension
      - dimension-limit
      - custom-aggregation
  - id: cloudwatch-002
    q: Which resolutions can traditional CloudWatch custom metrics use, and which sub-minute alarm
      periods are supported?
    a: Standard resolution is 60 seconds; high resolution is 1 second with StorageResolution=1.
      High-resolution alarms support 10, 20, or 30 seconds at a higher charge.
    facts:
      - resolution
      - high-resolution-publish
      - high-resolution-alarms
  - id: cloudwatch-003
    q: How long does CloudWatch retain traditional metric data at each granularity?
    a: "Sub-minute: 3 hours. One minute: 15 days. Five minutes: 63 days. One hour: 455 days. Older data
      is aggregated before it finally expires."
    facts:
      - retention-subminute
      - retention-minute
      - retention-five-minute
      - retention-hour
      - retention-rollup
  - id: cloudwatch-004
    q: An EC2 fleet uses basic monitoring, but its CloudWatch CPU alarm needs fresh data each minute.
      What should change?
    a: Enable detailed monitoring. Basic CPU metrics use 5-minute periods; detailed monitoring provides
      1-minute metrics for an additional charge. Status checks already use 1-minute periods with
      basic monitoring.
    facts:
      - ec2-basic
      - ec2-detailed
  - id: cloudwatch-046
    q: An application has an acceptable average latency in CloudWatch, but some users report slow
      requests. Which statistic should operators examine?
    a: A high percentile such as p95. It shows the slower end of the latency distribution that an
      average can hide.
    facts:
      - percentile
      - latency-percentile
  - id: cloudwatch-047
    q: A team publishes a traditional CloudWatch custom metric separately for each server. Will omitting
      the server dimension automatically return a fleet aggregate?
    a: No. Publish the required aggregate or calculate it explicitly. Traditional custom metrics do not
      automatically aggregate across dimension combinations.
    trap: true
    facts:
      - custom-aggregation
  - id: cloudwatch-110
    q: "A team wants an SNS alert when an AWS service usage metric passes 80 percent of its service quota. How can CloudWatch do this?"
    a: "Graph the usage metric, add the metric math expression m1/SERVICE_QUOTA(m1)*100, and create an alarm on it with a threshold of 80 that notifies the SNS topic."
    facts:
      - quota-percent-alarm
  - id: cloudwatch-114
    q: Which AWS service monitors resource utilization, application performance and operational health of AWS resources?
    a: Amazon CloudWatch.
    facts: [purpose]
---
CloudWatch metrics store measurements over time, such as CPU use or request latency, the delay a request experiences. For traditional metrics, the namespace is the container, the metric name is the measurement, and dimensions are name and value pairs identifying what was measured.

### How it works

1. Publish data under a namespace, metric name, and dimension combination. Changing a dimension creates a separate metric in that Region.
2. Choose standard or high resolution for a custom metric. With PutMetricData, set `StorageResolution=1` for high resolution.
3. Select a period, the time interval over which CloudWatch calculates a statistic. Use an average for the mean or a percentile to examine the distribution. The p95 value has 95 percent of samples below it.
4. Graph or alarm on the statistic. CloudWatch combines older measurements into coarser periods before they expire.

### Exam cues

- If the question says EC2 CPU data must arrive each minute, think detailed monitoring, because basic CPU monitoring uses 5-minute periods.
- If the question says a healthy average hides slow requests, think a high latency percentile, because it exposes the slower part of the distribution.
- If the question says custom metrics differ by server dimension, think separate metrics, because CloudWatch does not automatically combine those dimensions.
- If the question says alert before a service quota is reached, think a CloudWatch alarm on usage divided by SERVICE_QUOTA, because metric math turns usage into a percentage of the quota.

### Remember

| Traditional metric data period | Retention |
| --- | --- |
| Below 60 seconds | 3 hours |
| 1 minute | 15 days |
| 5 minutes | 63 days |
| 1 hour | 455 days, or 15 months |

- Standard resolution: 60 seconds. High resolution: 1 second. Maximum dimensions: 30.
- High-resolution alarm periods include 10, 20, and 30 seconds.
- Basic EC2 status checks already use 1-minute periods. Detailed monitoring adds charges for other 1-minute metrics.

> **Trap:** A shorter alarm period cannot make basic EC2 CPU metrics arrive more often. Change the monitoring configuration.

> **Trap:** These namespace, dimension, and retention rules describe traditional CloudWatch metrics. OpenTelemetry metrics use labels and have different storage behavior.
