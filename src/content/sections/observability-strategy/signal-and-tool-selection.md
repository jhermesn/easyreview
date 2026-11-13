---
title: Signal and tool selection
level: associate
order: 10
facts:
  - id: metrics
    text: CloudWatch metrics track performance data, and alarms monitor metrics against thresholds.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html#cloudwatch-monitoring-overview
  - id: logs
    text: CloudWatch Logs Insights interactively searches and analyzes CloudWatch Logs data.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html#AnalyzingLogData
  - id: log-group
    text: A CloudWatch log group contains log streams with shared retention, monitoring, and access settings.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html#Working-with-log-groups-and-streams
  - id: athena
    text: Athena queries data directly in S3 using SQL.
    source: https://docs.aws.amazon.com/athena/latest/ug/what-is.html#what-is
  - id: quick
    text: AWS Quick Sight provides business intelligence and data visualization.
    source: https://docs.aws.amazon.com/quick/latest/userguide/what-is.html#what-is
  - id: quick-s3
    text: AWS Quick Sight supports S3 data sources.
    source: https://docs.aws.amazon.com/quick/latest/userguide/working-with-data-sources.html#working-with-data-sources
  - id: grafana
    text: Amazon Managed Grafana queries, correlates, and visualizes metrics, logs, and traces from multiple sources.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html#what-is-Amazon-Managed-Service-Grafana
  - id: cloudtrail
    text: CloudTrail records actions by users, roles, and AWS services and can identify the actor and time.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html#cloudtrail-user-guide
  - id: config
    text: AWS Config records supported resource configurations and history and evaluates rules for compliance.
    source: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html#common-scenarios
  - id: flows
    text: VPC Flow Logs capture information about IP traffic to and from VPC network interfaces.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs
  - id: drift
    text: CloudFormation drift detection compares actual supported resource properties with expected explicitly set properties.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html#what-is-drift
  - id: prometheus
    text: Amazon Managed Service for Prometheus stores container metrics and supports PromQL queries.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/what-is-Amazon-Managed-Service-Prometheus.html#what-is-Amazon-Managed-Service-Prometheus
  - id: container-insights
    text: CloudWatch Container Insights collects and summarizes metrics and logs for containerized applications.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html#ContainerInsights
  - id: traces
    text: X-Ray uses traces of requests and downstream calls to identify latency and bottlenecks.
    source: https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html#aws-xray
  - id: application-signals
    text: Application Signals provides application metrics, correlated traces, dependency maps, and service level objectives.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Monitoring-Intro.html#CloudWatch-Application-Monitoring-Intro
  - id: slo
    text: A service level objective tracks a performance indicator against a chosen goal and threshold.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html#CloudWatch-ServiceLevelObjectives
  - id: synthetics
    text: Synthetics canaries are scheduled scripts that simulate customer actions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html#CloudWatch_Synthetics_Canaries
  - id: rum
    text: CloudWatch RUM collects client-side performance data from actual user sessions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html#CloudWatch-RUM
  - id: guardduty
    text: GuardDuty detects threats by analyzing AWS data sources and logs.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#what-is-guardduty
  - id: inspector
    text: Inspector scans EC2 instances, ECR images, and Lambda functions for software vulnerabilities and unintended network exposure.
    source: https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html#what-is-inspector
  - id: security-hub
    text: Security Hub CSPM aggregates findings and runs checks against security controls.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html#what-is-securityhub
  - id: data-streams
    text: Kinesis Data Streams supports multiple applications consuming a stream independently.
    source: https://docs.aws.amazon.com/streams/latest/dev/introduction.html#using-the-service
  - id: firehose
    text: Amazon Data Firehose buffers streaming data and delivers it to destinations including S3 and OpenSearch Service.
    source: https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html#what-is-this-service
  - id: opensearch
    text: Amazon OpenSearch Service supports log analytics and visualization with OpenSearch Dashboards.
    source: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html#what-is
  - id: emr
    text: Amazon EMR runs big data frameworks including Apache Hadoop and Spark for data processing.
    source: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html#emr-what-is-emr
  - id: metric-stream
    text: CloudWatch metric streams deliver metrics continuously to destinations including S3, with JSON and OpenTelemetry formats available.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html#CloudWatch-Metric-Streams
  - id: macie
    text: Amazon Macie discovers sensitive data in S3 and monitors bucket security and access control.
    source: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html#what-is-macie
  - id: detective
    text: Amazon Detective helps investigate security findings using aggregated data and visualizations.
    source: https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html#what-is-detective
  - id: access-analyzer
    text: IAM Access Analyzer can identify resources shared with external entities.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification
  - id: waf
    text: AWS WAF monitors HTTP and HTTPS requests and controls access to protected web resources.
    source: https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html#waf-intro
  - id: cross-account
    text: CloudWatch cross-account observability lets a central monitoring account view metrics, logs, and traces from linked source accounts.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html#cloudwatch-cross-account-overview
cards:
  - id: observability-strategy-002
    q: A team needs business analysis of data in S3 and a dashboard combining monitoring sources. Which services fit?
    a: Use AWS Quick Sight for business visualization and Amazon Managed Grafana for operational dashboards across sources.
    facts: [quick, quick-s3, grafana]
  - id: observability-strategy-003
    q: A team needs to analyze CloudWatch log groups during an incident and query archived S3 data with SQL. Which tools fit?
    a: Use CloudWatch Logs Insights for log groups and Athena for SQL over S3 data.
    facts: [logs, athena]
  - id: observability-strategy-005
    q: Which AWS services show who changed a security group and its earlier configuration?
    a: CloudTrail records the actor and action; AWS Config provides recorded configuration history.
    facts: [cloudtrail, config]
  - id: observability-strategy-008
    q: Which AWS tools show a security group change actor, configuration history, network traffic, and stack drift?
    a: CloudTrail, AWS Config, VPC Flow Logs, and CloudFormation drift detection, respectively.
    facts: [cloudtrail, config, flows, drift]
  - id: observability-strategy-009
    q: Where can a team query Kubernetes container metrics in PromQL, inspect container logs, and investigate distributed traces on AWS?
    a: Use Amazon Managed Service for Prometheus for PromQL metrics, Container Insights for logs and metrics, and X-Ray for traces.
    facts: [prometheus, container-insights, traces]
  - id: observability-strategy-010
    q: How do GuardDuty, Inspector, and Security Hub CSPM differ?
    a: GuardDuty detects threats, Inspector scans workloads for vulnerabilities and unintended exposure, and Security Hub CSPM aggregates findings and checks security controls.
    facts: [guardduty, inspector, security-hub]
  - id: observability-strategy-011
    q: A team needs to monitor a checkout journey even when nobody is using the application. What AWS feature fits?
    a: CloudWatch Synthetics canaries run scheduled scripts that simulate customer actions.
    facts: [synthetics]
  - id: observability-strategy-012
    q: A team needs to investigate actual browser session performance rather than simulated checks. What AWS feature fits?
    a: CloudWatch RUM collects client-side data from real user sessions.
    facts: [rum, synthetics]
    trap: true
  - id: observability-strategy-015
    q: A team needs to deliver streaming logs to S3 without managing a delivery application. Which AWS service fits?
    a: Amazon Data Firehose buffers and delivers streaming data to S3.
    facts: [firehose]
  - id: observability-strategy-016
    q: A security team needs to discover sensitive data in S3 and investigate suspicious findings. Which AWS services fit?
    a: Amazon Macie discovers sensitive S3 data; Amazon Detective helps investigate security findings.
    facts: [macie, detective]
  - id: observability-strategy-017
    q: How can a team continually export CloudWatch metrics to S3?
    a: Use a CloudWatch metric stream, with JSON or OpenTelemetry output.
    facts: [metric-stream]
---
Observability uses measurements, records, and request traces to understand how a workload behaves. Choose a tool by the question and where the data lives.

### How it works

1. Use metrics, numerical measurements over time, to identify changes and set CloudWatch alarms. Use logs, records of events, for details.
2. Query CloudWatch log groups, collections of streams with shared retention and access settings, with Logs Insights or use Athena SQL for data stored in S3.
3. Use a trace, a record of a request and its downstream calls, to investigate latency with X-Ray. Application Signals combines application metrics, correlated traces, and dependency maps. A service level objective (SLO) is a measurable performance target.
4. For security and configuration, combine activity records, resource history, network traffic, and findings rather than expecting one service to answer every question.

| Question | Tool |
|---|---|
| Who made an AWS action? | CloudTrail |
| How was a recorded resource configured? Is it compliant? | AWS Config |
| What IP traffic reached a network interface? | VPC Flow Logs |
| Does a supported stack resource differ from its explicitly set template properties? | CloudFormation drift detection |
| Where are threats, vulnerabilities, or consolidated findings? | GuardDuty, Inspector, or Security Hub CSPM, respectively |
| Where can I query container metrics in PromQL, the Prometheus query language? | Amazon Managed Service for Prometheus |
| Where can I see container metrics and logs? | CloudWatch Container Insights |
| Where can I visualize operational signals from multiple sources? | Amazon Managed Grafana |
| Where can I visualize business data in S3? | AWS Quick Sight |
| Where can independent applications consume streaming data? | Kinesis Data Streams |
| Where can I buffer and deliver streaming data to S3 or OpenSearch? | Amazon Data Firehose |
| Where can I analyze and visualize logs with a search engine? | Amazon OpenSearch Service |
| Where can I process large datasets with Spark or Hadoop? | Amazon EMR |
| Where can I discover sensitive data in S3? | Amazon Macie |
| Where can I investigate suspicious security findings? | Amazon Detective |
| Where can I find resources shared with external entities? | IAM Access Analyzer |
| Where can I control web requests to protected applications? | AWS WAF |

### Exam cues

- If the question says query archived S3 data with SQL, think Athena, because it queries data directly in S3.
- If the question says who changed a security group and what it looked like before, think CloudTrail and AWS Config, because they provide action records and configuration history.
- If the question says simulate a user journey without traffic, think Synthetics, because canaries run scheduled scripts.
- If the question says actual user sessions, think RUM, because it collects client-side session data.
- If the question says export CloudWatch metrics continuously to S3, think metric streams, because they deliver metrics in near real time.
- If the question says observe several linked accounts centrally, think CloudWatch cross-account observability, because the monitoring account can view their metrics, logs, and traces.

### Remember

- GuardDuty detects threats; Inspector scans workloads for vulnerabilities and unintended exposure; Security Hub CSPM aggregates findings and checks security controls.
- Drift detection compares supported resource properties that are explicitly set, not every possible property.

> **Trap:** CloudTrail identifies actions and actors, but AWS Config supplies the recorded resource configuration history. Neither replaces VPC Flow Logs for traffic information.
