---
title: Workspaces, ingestion, and PromQL
level: associate
order: 10
facts:
  - id: serverless
    text: AMP manages ingestion, storage, and queries for Prometheus-compatible metrics without servers for the
      customer to operate.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/what-is-Amazon-Managed-Service-Prometheus.html#what-is-Amazon-Managed-Service-Prometheus
  - id: replication
    text: Metrics in a workspace are replicated across three Availability Zones in the same Region.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/what-is-Amazon-Managed-Service-Prometheus.html#what-is-Amazon-Managed-Service-Prometheus
  - id: retention-default
    text: Workspace metrics are retained for 150 days by default and then deleted.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/what-is-Amazon-Managed-Service-Prometheus.html#what-is-Amazon-Managed-Service-Prometheus
  - id: retention-max
    text: Workspace retention can be configured up to 1095 days.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/what-is-Amazon-Managed-Service-Prometheus.html#what-is-Amazon-Managed-Service-Prometheus
  - id: query
    text: AMP uses PromQL, the Prometheus query language, to filter and aggregate metrics.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/what-is-Amazon-Managed-Service-Prometheus.html#what-is-Amazon-Managed-Service-Prometheus
  - id: ingest-first
    text: Metrics must be ingested into a workspace before they can be queried or used for alerts.
    source: https://docs.aws.amazon.com/prometheus/latest/userguide/AMP-ingest-methods.html#AMP-ingest-methods
  - id: grafana
    text: Amazon Managed Grafana can use AMP as a data source for dashboards.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/what-is-Amazon-Managed-Service-Grafana.html#what-is-Amazon-Managed-Service-Grafana
  - id: grafana-login
    text: Managed Grafana users sign in through IAM Identity Center, SAML 2.0, or both, rather than IAM user
      authentication.
    source: https://docs.aws.amazon.com/grafana/latest/userguide/authentication-in-AMG.html#authentication-in-AMG
  - id: metric-definition
    text: A metric is a variable measured as data points over time.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric
  - id: zone-definition
    text: An Availability Zone is an isolated location within an AWS Region.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones
cards:
  - id: managed-prometheus-001
    q: What does Amazon Managed Service for Prometheus store, and what are its replication and retention settings?
    a: Prometheus-compatible metrics, replicated across three Availability Zones in one Region. Retention defaults
      to 150 days and can be configured up to 1095 days.
    facts:
      - serverless
      - replication
      - retention-default
      - retention-max
  - id: managed-prometheus-007
    q: A team needs PromQL queries for container metrics without maintaining the metrics storage servers. Which
      AWS service fits?
    a: Amazon Managed Service for Prometheus. It manages metrics ingestion, storage, and queries and supports
      PromQL.
    facts:
      - serverless
      - query
  - id: managed-prometheus-008
    q: An AMP workspace must retain metrics for two years. Must the team export them after 150 days?
    a: No. Configure workspace retention above the 150-day default, up to 1095 days.
    facts:
      - retention-default
      - retention-max
    trap: true
  - id: managed-prometheus-009
    q: A team has AMP metrics and needs shared dashboards with workforce sign-in. What can it use?
    a: Amazon Managed Grafana with AMP as a data source, and IAM Identity Center or SAML 2.0 for user sign-in.
    facts:
      - grafana
      - grafana-login
---
Amazon Managed Service for Prometheus (AMP) stores and queries Prometheus-compatible metrics without requiring you to operate storage servers. A metric is a measured value over time; PromQL is the language used to select and combine those values.

### How it works

1. Send metrics into a workspace, the destination where AMP stores them.
2. AMP replicates the data across three Availability Zones within one Region. An Availability Zone is an isolated location within a Region.
3. Use PromQL to filter and aggregate the stored metrics. Managed Grafana can query the workspace for dashboards.
4. Set the retention period, the time metrics remain stored before automatic deletion.

### Exam cues

- If the question says keep PromQL and stop maintaining metrics storage servers, think AMP, because it provides managed Prometheus-compatible ingestion, storage, and querying.
- If the question says retain metrics beyond 150 days, think workspace retention configuration, because 150 days is the default rather than the maximum.
- If the question says shared AMP dashboards with workforce sign-in, think Managed Grafana with IAM Identity Center or SAML, because dashboard authentication uses those identity providers.

### Remember

- Replication: three Availability Zones in the same Region.
- Retention: 150 days by default; maximum 1095 days.
- Ingest metrics before querying or alerting on them.

> **Trap:** Three Availability Zones do not mean three Regions. Workspace replication stays within one Region.
