---
title: Batch Replication
level: professional
order: 30
facts:
  - id: batch-purpose
    text: S3 Batch Replication copies existing, previously replicated, or failed objects on demand
      through a Batch Operations job.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#s3-batch-replication-batch
  - id: batch-rule
    text: The source bucket must already have a replication configuration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-considerations
  - id: batch-role
    text: The Batch Operations job role needs permissions for the underlying replication operation.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-considerations
  - id: batch-manifest
    text: A Batch Replication manifest lists object keys for the job.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-manifest
  - id: batch-manifest-formats
    text: A supplied Batch Replication manifest can be CSV or an S3 Inventory report.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-manifest
  - id: batch-manifest-generated
    text: S3 can generate a Batch Replication manifest from the replication configuration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-manifest
  - id: batch-version
    text: A caller-supplied manifest for versioned objects must include version IDs.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-manifest
  - id: batch-region
    text: An S3-generated manifest must be stored in the source bucket Region.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-manifest
  - id: batch-none
    text: The NONE status filter selects objects for which S3 has never attempted replication.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-filters
  - id: batch-failed
    text: The FAILED status filter selects objects whose previous replication attempt failed.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-filters
  - id: batch-completed
    text: The COMPLETED status filter selects previously replicated source objects, including objects to
      backfill into another destination.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-filters
  - id: batch-replica
    text: The REPLICA status filter selects replicas made from another source bucket.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-filters
  - id: batch-report
    text: A requested CSV completion report lists objects and their success or failure results.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-completion-report
  - id: batch-rtc
    text: Replication Time Control does not apply to Batch Replication.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
  - id: batch-archive
    text: Batch Replication does not support objects stored in Glacier Flexible Retrieval or Deep
      Archive.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-considerations
  - id: batch-tiering
    text: Intelligent-Tiering Archive Access and Deep Archive Access objects must be restored to
      Frequent Access before Batch Replication.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-considerations
  - id: batch-deleted
    text: Batch Replication cannot re-replicate a replica deleted from the destination by version ID;
      copying the source in place creates a new version that initiates live replication.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-considerations
cards:
  - id: s3-003
    q: Some S3 objects have FAILED replication status after a permissions error. How can a team retry
      them after fixing access?
    a: Run S3 Batch Replication with the FAILED status filter. Review the completion report for
      remaining failures.
    trap: true
    facts:
      - batch-purpose
      - batch-failed
      - batch-report
  - id: s3-007
    q: Does a new S3 live replication rule copy objects already stored in the source bucket?
    a: No. Use Batch Replication to backfill existing objects. Keep the source replication configuration
      in place; RTC does not apply to the batch job.
    trap: true
    facts:
      - batch-purpose
      - batch-rule
      - batch-rtc
  - id: s3-040
    q: An S3 team adds another recovery destination for objects already copied elsewhere. Which Batch
      Replication filter helps backfill it?
    a: COMPLETED. It selects source objects that S3 has already replicated.
    facts:
      - batch-completed
  - id: s3-041
    q: A versioned S3 bucket needs selected historical versions copied through Batch Replication. What
      must its custom CSV manifest identify?
    a: Object keys and version IDs. Only the selected versions are replicated.
    facts:
      - batch-manifest
      - batch-manifest-formats
      - batch-manifest-generated
      - batch-version
  - id: s3-042
    q: An S3 recovery replica was deleted by version ID. Can Batch Replication simply recreate that same
      replica?
    a: No. Copy the source object in place to create a new source version and initiate live replication.
    trap: true
    facts:
      - batch-deleted
---
S3 Batch Replication fills gaps that live replication does not cover, such as data written before a rule existed. It runs an explicit job over a manifest, a list of objects to process.

### How it works

1. Keep a replication configuration on the source bucket and give the Batch Operations job role the required replication permissions.
2. Generate a manifest from that configuration or supply CSV or S3 Inventory. Include version IDs in a caller-supplied manifest for versioned objects.
3. Filter by replication status to select never-attempted objects, failures, previously replicated source objects, or replicas.
4. Run the job and request a CSV completion report. Fix the cause of any failure before submitting a retry.

| Status filter | Objects selected |
|---|---|
| `NONE` | No prior replication attempt |
| `FAILED` | Failed attempt |
| `COMPLETED` | Previously replicated source objects |
| `REPLICA` | Copies made from another source |

### Exam cues

- If the question says an S3 bucket already holds data when CRR is enabled, think Batch Replication, because live replication does not backfill.
- If the question says an S3 replication permission problem was fixed, think a job filtered to `FAILED`, because it targets failed attempts.
- If the question says an S3 replica was permanently deleted by version ID, think copying the source in place, because Batch Replication cannot re-replicate that deleted replica.

### Remember

- An S3-generated manifest stays in the source Region.
- RTC does not apply to batch jobs.
- Glacier Flexible Retrieval and Deep Archive source objects are unsupported. Restore Intelligent-Tiering archive tiers to Frequent Access first.

> **Trap:** A Batch Replication retry does not repair the permissions that caused the failure. Correct the cause before retrying.
