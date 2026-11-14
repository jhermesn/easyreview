---
title: Logs Insights
level: associate
order: 90
facts:
  - id: insights-purpose
    text: CloudWatch Logs Insights interactively searches and analyzes stored CloudWatch log events.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-languages
    text: Supported query languages are Logs Insights QL, OpenSearch PPL, and OpenSearch SQL.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-fields
    text: Logs Insights automatically discovers fields in supported AWS service logs and JSON
      application logs.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-timeout
    text: Queries in any supported language time out after 60 minutes.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-results
    text: Query results remain available for 7 days.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-cost
    text: Logs Insights charges depend on data scanned regardless of query language.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-creation
    text: Logs Insights cannot read events whose timestamps precede creation of their log group.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-index
    text: Field indexes can reduce scan volume and improve query performance.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-ql
    text: Logs Insights QL pipes commands such as fields, filter, stats, and sort to select, restrict,
      aggregate, and order events.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html#CWL_QuerySyntax
  - id: insights-dashboard
    text: Logs Insights query results can be added to a CloudWatch dashboard.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: insights-scheduled
    text: CloudWatch scheduled queries run log queries on a schedule and can deliver results to Amazon S3.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/ScheduledQueries.html#ScheduledQueries
  - id: filter-history
    text: A newly created metric filter does not process historical events.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html#MonitoringLogData
  - id: contributor-insights
    text: CloudWatch Contributor Insights rules analyze structured log events and rank the top contributors by a field, such as the instance or IP that sends the most errors.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContributorInsights.html
  - id: insight-metric
    text: Metric math's INSIGHT_RULE_METRIC function turns a Contributor Insights rule into a metric, so an alarm can fire, for example, when the top contributor's share of the total is too high.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/using-metric-math.html
cards:
  - id: cloudwatch-014
    q: A team wants the error count in CloudWatch logs from last week. Will a newly created metric
      filter count those stored events?
    a: No. Query the stored events with Logs Insights. Metric filters start publishing only for events
      after filter creation.
    trap: true
    facts:
      - insights-purpose
      - filter-history
  - id: cloudwatch-026
    q: Which query languages does CloudWatch Logs Insights support, and how long do queries and results
      last?
    a: Logs Insights QL, OpenSearch PPL, and OpenSearch SQL. Queries time out after 60 minutes; results
      remain for 7 days. Charges depend on data scanned.
    facts:
      - insights-languages
      - insights-timeout
      - insights-results
      - insights-cost
  - id: cloudwatch-069
    q: CloudWatch Logs Insights investigations scan too much data. What can reduce the scan volume?
    a: Create field indexes for frequently queried fields and limit the groups and time range being
      investigated. Indexes let Logs Insights skip irrelevant data.
    facts:
      - insights-index
      - insights-cost
  - id: cloudwatch-070
    q: Can CloudWatch Logs Insights query events whose timestamps are older than their log group
      creation time?
    a: No. Those timestamps are outside the events Logs Insights can access for that group.
    trap: true
    facts:
      - insights-creation
  - id: cloudwatch-093
    q: A team needs a CloudWatch Logs Insights query to run regularly and save results in Amazon S3. What feature fits?
    a: Use a scheduled query with an S3 destination.
    facts: [insights-scheduled]
  - id: cloudwatch-115
    q: A team must find which EC2 instance produces the most error log lines and alarm when one instance causes over half of them. What fits?
    a: A CloudWatch Contributor Insights rule on the logs, plus an alarm on INSIGHT_RULE_METRIC comparing the top contributor with the total.
    facts: [contributor-insights, insight-metric]
---
CloudWatch Logs Insights searches stored log events to answer questions about past behavior. Use it when the evidence is already in the logs and a newly created metric filter would start too late.

### How it works

1. Choose the log groups and time range for the investigation.
2. Select Logs Insights QL, OpenSearch PPL, or OpenSearch SQL. A query language specifies how to select and combine records.
3. With Logs Insights QL, use `fields` to select fields, `filter` to restrict events, `stats` to calculate aggregates, and `sort` to order results. Pipes pass results between commands.
4. Use automatically discovered fields in supported logs and JSON. Field indexes, lookup structures for selected fields, can reduce how much data a query scans.
5. Inspect results or add a query to a dashboard for repeated viewing.
6. Use a scheduled query to run log analysis regularly and deliver results to a destination such as Amazon S3.

### Exam cues

- If the question says count errors already logged last week, think Logs Insights, because it queries stored events.
- If the question says investigate request details and aggregate failures, think query filtering and statistics, because they operate on the selected log records.
- If the question says reduce repeated query scan volume, think field indexes and a focused time range, because charges depend on data scanned.
- If the question says run a log query regularly and save its results to S3, think scheduled queries, because they automate execution and delivery.

### Remember

- Query timeout: 60 minutes. Results remain available for 7 days.
- Query languages: Logs Insights QL, OpenSearch PPL, OpenSearch SQL.
- Events with timestamps before log group creation cannot be read by Logs Insights.

> **Trap:** A metric filter does not count yesterday's stored events when created today. Use a historical query.
