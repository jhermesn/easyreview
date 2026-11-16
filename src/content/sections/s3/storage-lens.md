---
title: Storage Lens
level: associate
order: 170
facts:
  - id: what
    text: S3 Storage Lens is a storage analytics feature that gives organization-wide visibility into object storage usage and activity, with recommendations to cut costs and apply data protection best practices.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html#storage_lens
  - id: dashboard
    text: S3 Storage Lens has a default dashboard updated daily, and you can create dashboards scoped by Region, bucket or AWS Organizations account.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html#storage-lens-dashboards-intro
  - id: tiers
    text: S3 Storage Lens offers free metrics and paid advanced metrics; the advanced tier adds features such as prefix aggregation and contextual recommendations.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html#storage-lens-dashboards-intro
  - id: best-practices
    text: S3 Storage Lens shows, for example, the share of buckets with encryption, Object Lock or Versioning enabled, and buckets missing lifecycle rules.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html#storage-lens-dashboards-intro
cards:
  - id: s3-145
    q: A company with 40 accounts in AWS Organizations must find every S3 bucket across Regions that doesn't have versioning enabled, from one dashboard. Which feature fits?
    a: "**S3 Storage Lens** with an organization-level dashboard."
    facts: [what, dashboard, best-practices]
  - id: s3-146
    q: Which S3 Storage Lens tier gives prefix-level aggregation and contextual recommendations?
    a: "The advanced (paid) metrics tier."
    facts: [tiers]
  - id: s3-147
    q: How often does the S3 Storage Lens default dashboard update?
    a: "Daily."
    facts: [dashboard]
---
S3 Storage Lens answers "what do we store, where, and are we following best practices?" across accounts and Regions, without scripts over S3 Inventory. [S3 Storage Lens](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html)

### How it works

1. A default dashboard covers the account and refreshes daily.
2. Custom dashboard configurations scope metrics to Regions, buckets or Organizations accounts.
3. Metrics cover usage, cost optimization, data protection, access management and performance; advanced metrics add prefix detail and recommendations.

### Exam cues

- If the question says organization-wide view of S3 usage or best-practice gaps (versioning, encryption, lifecycle), think S3 Storage Lens.
- If the question says a per-object list of keys and metadata, think S3 Inventory.

### Remember

- Default dashboard, daily updates.
- Free and advanced metrics; advanced adds prefixes and recommendations.

> **Trap:** S3 Storage Lens reports aggregates and trends. It doesn't change bucket settings; you still enable versioning or lifecycle rules yourself.
