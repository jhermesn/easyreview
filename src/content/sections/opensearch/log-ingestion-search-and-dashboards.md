---
title: Log ingestion, search, and dashboards
level: associate
order: 10
facts:
  - id: search-purpose
    text: OpenSearch Service manages OpenSearch clusters for search and analytics, including log analytics and application monitoring.
    source: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html#what-is
  - id: search-domain
    text: An OpenSearch Service domain is a cluster with specified settings, instance types, instance counts, and storage.
    source: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html#what-is
  - id: search-dashboards
    text: OpenSearch Dashboards visualizes data in OpenSearch Service.
    source: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html#what-is-features
  - id: search-index
    text: An OpenSearch index is comparable to a database table, with documents as rows and fields as columns.
    source: https://docs.aws.amazon.com/opensearch-service/latest/developerguide/bp.html#bp-sharding-strategy
  - id: search-subscription
    text: A CloudWatch Logs subscription filter can send matching log events to an OpenSearch Service domain in near real time.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_Stream
  - id: search-standard
    text: CloudWatch Logs subscriptions support only Standard class log groups.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: search-role
    text: The CloudWatch console's OpenSearch subscription setup requires a Lambda execution role with access to the domain; a VPC domain also requires the AWSLambdaVPCAccessExecutionRole policy.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_LG
  - id: search-network
    text: An OpenSearch Service domain can use public or VPC access, but its access type cannot be changed after creation.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html#CWL_OpenSearch_Domain
  - id: search-vpc
    text: A VPC is a logically isolated virtual network in which AWS resources can run.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html#what-is-amazon-vpc
  - id: search-firehose
    text: Firehose buffers records and sends bulk indexing requests to an OpenSearch Service domain; records must be UTF-8 encoded single-line JSON objects.
    source: https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver
  - id: search-cloudwatch-firehose
    text: Firehose does not support delivering CloudWatch Logs to an OpenSearch Service destination because CloudWatch combines multiple log events in one Firehose record.
    source: https://docs.aws.amazon.com/firehose/latest/dev/writing-with-cloudwatch-logs.html#writing-with-cloudwatch-logs
  - id: search-subscription-limits
    text: A CloudWatch log group can have up to five subscription filters; delivery of events is at least once and duplicates can occur.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: search-retry
    text: CloudWatch Logs retries retryable subscription delivery errors for up to 24 hours; non-retryable errors disable the filter temporarily and logs are skipped during that period.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: search-athena
    text: Athena runs interactive SQL queries directly against data stored in S3.
    source: https://docs.aws.amazon.com/athena/latest/ug/what-is.html#what-is
diagrams:
  - id: opensearch-log-flow
    title: Search CloudWatch logs
    width: 800
    height: 150
    nodes:
      - { id: logs, label: CloudWatch Logs, x: 25, y: 35, w: 190, h: 72, tone: mgmt, icon: res-cloudwatch-logs }
      - { id: domain, label: OpenSearch, x: 305, y: 35, w: 190, h: 72, tone: integration, icon: opensearch-service }
      - { id: dashboards, label: Dashboards, x: 585, y: 35, w: 190, h: 72, tone: integration, icon: opensearch-service }
    edges:
      - { from: logs, to: domain, step: 1 }
      - { from: domain, to: dashboards, step: 2 }
    steps:
      - A subscription filter sends matching log events to the domain.
      - OpenSearch Dashboards visualizes data in the domain.
cards:
  - id: opensearch-001
    q: A team needs interactive search and dashboards for CloudWatch application logs. What AWS service and ingestion path fit?
    a: "OpenSearch Service and OpenSearch Dashboards. Use a CloudWatch Logs subscription filter for a Standard class log group."
    facts: [search-purpose, search-dashboards, search-subscription, search-standard]
  - id: opensearch-002
    q: A team wants to send CloudWatch Logs through Firehose directly to an OpenSearch Service destination. Is this supported?
    a: "No. Firehose does not support that CloudWatch Logs destination path; use the OpenSearch subscription filter."
    facts: [search-cloudwatch-firehose, search-subscription]
    trap: true
  - id: opensearch-003
    q: A team sends application records directly to Firehose for indexing in OpenSearch Service. What record format is required?
    a: "UTF-8 encoded, single-line JSON objects. Firehose buffers records and sends bulk indexing requests."
    facts: [search-firehose]
  - id: opensearch-004
    q: How many subscription filters can a CloudWatch Logs log group have, and can delivery contain duplicates?
    a: "Up to five filters. Delivery is at least once, so duplicates can occur."
    facts: [search-subscription-limits]
  - id: opensearch-005
    q: How long does CloudWatch Logs retry a retryable error when delivering a subscription to OpenSearch Service?
    a: "Up to 24 hours. Non-retryable errors behave differently and can cause logs to be skipped."
    facts: [search-retry]
  - id: opensearch-006
    q: A team wants to query archived logs directly in S3 using SQL rather than operate a search cluster. Which AWS service fits?
    a: "Amazon Athena. It runs interactive SQL queries directly against data in S3."
    facts: [search-athena]
  - id: opensearch-007
    q: Can an existing OpenSearch Service domain switch from public access to VPC access?
    a: "No. Choose the access type when creating the domain; it cannot be changed afterward."
    facts: [search-network]
    trap: true
---

Amazon OpenSearch Service manages search and analytics clusters for workloads such as application log analysis. OpenSearch Dashboards visualizes the data.

### How it works

1. Create a domain, the managed cluster that stores and searches data. Choose public access or access through a virtual private cloud (VPC), a logically isolated virtual network.
2. For CloudWatch Logs, create an OpenSearch subscription filter on a Standard class log group. The filter selects matching events for near-real-time delivery to the domain. The console setup requires a Lambda execution role with domain access; a VPC domain also needs the AWSLambdaVPCAccessExecutionRole policy.
3. Use OpenSearch Dashboards to visualize the data. An index is like a database table, with documents as rows. For other producers, Firehose can buffer records and send bulk requests, which index multiple records together.

### Exam cues

- If the question says search application logs and build dashboards, think OpenSearch Service and OpenSearch Dashboards, because they provide log analytics and visualization.
- If the question says stream a CloudWatch log group into OpenSearch, think an OpenSearch subscription filter, because it sends matching events to the domain.
- If the question says query archived files directly in S3 using SQL, think Athena, because it queries S3 data without an OpenSearch domain.
- If the question says deliver CloudWatch Logs to OpenSearch through Firehose, think the OpenSearch subscription filter, because Firehose does not support that CloudWatch Logs destination path.

### Remember

- Subscriptions require the Standard log class. A log group supports up to five subscription filters.
- Subscription delivery is at least once, so duplicate events can occur. Retryable errors are retried for up to 24 hours.
- For Firehose to OpenSearch, records must be UTF-8 encoded single-line JSON objects.
- Public or VPC domain access cannot be changed after domain creation.

> **Trap:** Firehose supports OpenSearch destinations, but not delivery of CloudWatch Logs to those destinations. CloudWatch combines multiple log events in a single Firehose record.
