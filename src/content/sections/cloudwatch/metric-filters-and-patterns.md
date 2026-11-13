---
title: Metric filters and patterns
level: associate
order: 70
facts:
  - id: filter-purpose
    text: A CloudWatch Logs metric filter turns matching ingested log events into numerical CloudWatch
      metric data.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#MonitoringLogData
  - id: filter-standard
    text: Metric filters are supported only on Standard log class groups.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#MonitoringLogData
  - id: filter-new
    text: Metric filters publish data only for events after filter creation; they do not backfill stored
      events.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#MonitoringLogData
  - id: filter-config
    text: A metric filter specifies a pattern, metric namespace, metric name, and metric value.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#search-filter-concepts
  - id: filter-count
    text: A metric value of 1 counts occurrences of matching events.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#search-filter-concepts
  - id: filter-zero
    text: A default value of 0 reports zero when logs arrive in a minute but none match.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#search-filter-concepts
  - id: filter-no-logs
    text: A metric filter emits no value for a minute in which no logs are ingested, even if its default
      value is 0.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#search-filter-concepts
  - id: filter-dimensions
    text: Metric filters with dimensions cannot have a default value.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#search-filter-concepts
  - id: filter-json
    text: A JSON filter can compare a numeric field with a value, such as { $.status = 500 }.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html#matching-terms-json-log-events
  - id: filter-syntax
    text: Filter patterns support matching terms in text, JSON, and space-delimited logs; Logs Insights
      has a separate query language.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html#FilterAndPatternSyntax
  - id: filter-alarm
    text: The CloudWatch metric produced by a log filter can be graphed or used by a metric alarm.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#MonitoringLogData
diagrams:
  - id: cloudwatch-log-metric-alarm
    title: From application logs to an alarm
    width: 1000
    height: 190
    nodes:
      - id: logs
        label: Log group
        icon: res-cloudwatch-logs
        tone: mgmt
        x: 25
        y: 55
        w: 190
        h: 86
      - id: filter
        label: Metric filter
        icon: res-cloudwatch-logs
        tone: mgmt
        x: 275
        y: 55
        w: 190
        h: 86
      - id: metric
        label: Custom metric
        icon: cloudwatch
        tone: mgmt
        x: 525
        y: 55
        w: 190
        h: 86
      - id: alarm
        label: Metric alarm
        icon: res-cloudwatch-alarm
        tone: mgmt
        x: 775
        y: 55
        w: 190
        h: 86
    edges:
      - from: logs
        to: filter
        step: 1
      - from: filter
        to: metric
        step: 2
      - from: metric
        to: alarm
        step: 3
    steps:
      - New events reach the metric filter.
      - Matching events publish metric values.
      - The metric alarm evaluates the generated metric.
cards:
  - id: cloudwatch-013
    q: An application sends ERROR log events to CloudWatch Logs. How can the team alarm on the error
      count?
    a: Create a metric filter on the Standard log group with a matching pattern and metric value 1, then
      alarm on that metric. Default 0 covers ingested logs with no matches, but not minutes without
      ingestion.
    facts:
      - filter-purpose
      - filter-standard
      - filter-count
      - filter-alarm
      - filter-zero
      - filter-no-logs
  - id: cloudwatch-030
    q: A team needs a CloudWatch alarm when newly ingested JSON logs contain numeric status 500. What
      filter pattern fits?
    a: Use { $.status = 500 } in a metric filter, then alarm on the resulting metric. It starts counting
      after filter creation and does not backfill stored events.
    facts:
      - filter-json
      - filter-alarm
      - filter-new
  - id: cloudwatch-062
    q: A CloudWatch Logs metric filter has default value 0, but the application sends no logs for a
      minute. Does the filter publish zero?
    a: No. A default applies when logs arrive but none match. A minute with no ingestion produces no
      value.
    trap: true
    facts:
      - filter-zero
      - filter-no-logs
  - id: cloudwatch-063
    q: A team wants a CloudWatch Logs metric filter with service dimensions and a default value of zero.
      Can it configure both?
    a: No. A metric filter with dimensions cannot specify a default value. Choose the dimension design
      and alarm missing-data behavior accordingly.
    trap: true
    facts:
      - filter-dimensions
---
A CloudWatch Logs metric filter converts matching incoming log events into numbers that an alarm can monitor. Think of it as a counter on arriving events, rather than a search over stored history.

### How it works

1. Collect application logs in a Standard log class group. Choose a filter pattern, which is an expression describing which events match.
2. Set the metric namespace, name, and value. A value of 1 counts each matching event. For JSON, structured data with named fields, `{ $.status = 500 }` matches a numeric status field.
3. Choose a default if the metric has no dimensions. Default 0 covers a minute with ingested logs but no matches. No ingestion still means no datapoint.
4. Create a metric alarm on the generated metric. Use Logs Insights separately to investigate stored history.

### Exam cues

- If the question says alert on new application error messages, think metric filter followed by metric alarm, because the filter converts log matches into measurements.
- If the question says JSON logs have numeric status 500, think `{ $.status = 500 }`, because it matches that field value.
- If the question says count errors already stored before filter creation, think Logs Insights, because metric filters do not backfill.

### Remember

- Standard log class only. New events only.
- Value 1 counts matches. Default 0 requires incoming logs during that minute.
- Dimensions and default values cannot be combined.
- Filter patterns and Logs Insights queries have different syntax.

> **Trap:** Default zero does not prove that logging is alive. A silent producer generates no datapoint.
