---
title: Ingestion delivery and retries
level: professional
order: 20
facts:
  - id: search-firehose
    text: Firehose buffers records and sends bulk indexing requests to an OpenSearch Service domain; records must be UTF-8 encoded single-line JSON objects.
    source: https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver
  - id: search-subscription-limits
    text: A CloudWatch log group can have up to five subscription filters; delivery of events is at least once and duplicates can occur.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
  - id: search-retry
    text: CloudWatch Logs retries retryable subscription delivery errors for up to 24 hours; non-retryable errors disable the filter temporarily and logs are skipped during that period.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions
cards:
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
---
Firehose delivery to an OpenSearch Service domain and CloudWatch Logs subscriptions have distinct requirements for record format and delivery errors. Knowing these requirements helps explain how records are indexed and what can happen during subscription delivery. [Firehose delivery](https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver) and [CloudWatch Logs subscriptions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions)

### How it works

1. Send UTF-8 encoded, single-line JSON objects to Firehose. It buffers the records and sends bulk indexing requests to the OpenSearch Service domain. [Firehose delivery](https://docs.aws.amazon.com/firehose/latest/dev/basic-deliver.html#basic-deliver)
2. For CloudWatch Logs subscriptions, expect at-least-once delivery: events can be delivered more than once. A log group can have up to five subscription filters. [CloudWatch Logs subscriptions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions)
3. If subscription delivery encounters a retryable error, CloudWatch Logs retries for up to 24 hours. A non-retryable error temporarily disables the filter, and logs are skipped while it is disabled. [CloudWatch Logs subscriptions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html#Subscriptions)

### Exam cues

- If the question says an application sends records directly to Firehose for OpenSearch indexing, think UTF-8 encoded single-line JSON objects, because Firehose sends those records in bulk indexing requests.
- If the question says subscription events appear more than once, think at-least-once delivery, because duplicates can occur.
- If the question says subscription delivery encounters a retryable error, think retries for up to 24 hours, because CloudWatch Logs handles retryable and non-retryable errors differently.

### Remember

- A CloudWatch Logs log group supports up to five subscription filters.
- CloudWatch Logs retries retryable subscription delivery errors for up to 24 hours.
- Firehose records for OpenSearch Service must be UTF-8 encoded single-line JSON objects.

> **Trap:** At-least-once delivery can produce duplicates. A non-retryable subscription error temporarily disables the filter, and logs are skipped during that period.
