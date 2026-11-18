---
title: "PLACEHOLDER opensearch/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
