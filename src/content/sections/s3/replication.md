---
title: Replication
level: professional
order: 20
facts:
  - id: replication-async
    text: S3 Replication copies objects asynchronously between buckets in the same or different accounts.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
  - id: crr-srr
    text: Cross-Region Replication copies between AWS Regions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
  - id: crr-srr-srr
    text: Same-Region Replication copies within one AWS Region.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
  - id: replication-new
    text: Live replication covers new matching objects and does not copy objects that predate the rule.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
  - id: replication-versions
    text: Both source and destination buckets must have versioning enabled.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-requirements.html#replication-requirements
  - id: replication-role
    text: S3 needs an IAM role granting permission to read source versions and replicate them to the
      destination.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/setting-repl-config-perm-overview.html#setting-repl-config-perm-overview
  - id: replication-account
    text: A cross-account destination requires a bucket policy granting the source account replication
      permissions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-requirements.html#replication-requirements
  - id: replication-owner
    text: Bucket owner enforced Object Ownership on the destination makes the destination account own
      replicas without an owner override.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-change-owner.html#replication-change-owner
  - id: replication-delete
    text: Version-specific deletions are not replicated to the destination.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-what-is-isnot-replicated.html#replication-what-is-replicated
  - id: replication-markers
    text: V2 rules with a Filter element do not replicate delete markers by default; marker replication
      can be enabled for rules without tag filters.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-what-is-isnot-replicated.html#replication-what-is-replicated
  - id: replication-v1
    text: V1 rules without a Filter element replicate delete markers caused by user actions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-what-is-isnot-replicated.html#replication-what-is-replicated
  - id: replication-exclusions
    text: Live replication does not copy replicas created by another rule.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-what-is-isnot-replicated.html#replication-what-is-not-replicated
  - id: replication-archive
    text: Objects stored in Glacier Flexible Retrieval, Glacier Deep Archive, and Intelligent-Tiering
      archive access tiers are not copied by live replication.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-what-is-isnot-replicated.html#replication-what-is-not-replicated
  - id: replication-lifecycle
    text: Lifecycle actions and bucket-level configurations are not replicated.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-what-is-isnot-replicated.html#replication-what-is-not-replicated
  - id: replication-kms-opt-in
    text: Replication of SSE-KMS and DSSE-KMS objects requires explicit opt-in and a destination KMS key
      in the destination Region.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-config-for-kms-objects.html#replication-kms-extra-config
  - id: replication-kms-permissions
    text: SSE-KMS replication requires kms:Decrypt permission on the source key.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-config-for-kms-objects.html#replication-kms-permissions
  - id: replication-kms-permissions-destination
    text: SSE-KMS replication requires kms:Encrypt permission on the destination key.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-config-for-kms-objects.html#replication-kms-permissions
  - id: replication-sse
    text: SSE-S3 and SSE-C replication do not require the SSE-KMS opt-in.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-config-for-kms-objects.html#replication-config-for-kms-objects
  - id: replication-lock
    text: Replication from an Object Lock bucket requires Object Lock on the destination and source
      permissions s3:GetObjectRetention and s3:GetObjectLegalHold.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-requirements.html#replication-requirements
  - id: replication-kms-types
    text: SSE-KMS uses AWS KMS keys for server-side encryption; DSSE-KMS applies two layers of
      encryption.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-config-for-kms-objects.html#replication-config-for-kms-objects
  - id: replication-rtc
    text: S3 Replication Time Control replicates 99.9 percent of uploaded objects within 15 minutes and enables replication metrics.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-time-control.html#replication-time-control
  - id: replication-rtc-quota
    text: The S3 RTC SLA does not apply when the replication transfer rate exceeds the default 1 Gbps quota.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-time-control.html#exceed-rtc-data-transfer-limits
  - id: replication-batch-retry
    text: S3 Batch Replication uses an existing replication configuration and a manifest to retry failed objects or copy existing and previously replicated objects.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-considerations
  - id: replication-batch-deleted
    text: Batch Replication cannot restore a destination version deleted by version ID; copying the source object in place creates a new version eligible for live replication.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-considerations
  - id: replication-status
    text: HeadObject exposes source replication status as PENDING, COMPLETED or FAILED in the x-amz-replication-status header.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-troubleshoot.html#troubleshoot-replication-tips
  - id: replication-cross-account-kms
    text: For cross-account SSE-KMS replication, use a customer managed key owned by the destination account and grant the replication role access in its key policy.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-troubleshoot.html#troubleshoot-replication-tips
  - id: replication-requester-pays
    text: A cross-account replication destination cannot be a Requester Pays bucket.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-requirements.html#replication-requirements
  - id: replication-destination-lifecycle
    text: Destination lifecycle rules use the original object's creation time, not the time the replica arrived.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-requirements.html#replica-and-lifecycle
  - id: replication-config-permission
    text: Setting a replication configuration requires s3:PutReplicationConfiguration and iam:PassRole for the caller.
    source: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketReplication.html#API_PutBucketReplication
  - id: replication-failure-events
    text: Replication failure notifications require replication metrics on the rule, but not S3 Replication Time Control; threshold notifications require S3 RTC.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-metrics-events.html#replication-metrics-events
  - id: replication-encryption-default
    text: Replicas of SSE-S3, SSE-KMS or DSSE-KMS source objects use the source encryption type rather than the destination bucket default.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-config-for-kms-objects.html#replication-default-encryption
  - id: multi-destination
    text: "One source bucket can replicate to a single destination bucket or to multiple destination buckets, in the same Region or in different Regions."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
diagrams:
  - id: s3-cross-region-replication
    title: Cross-account replication for recovery
    width: 1000
    height: 450
    groups:
      - label: Source account / Region
        icon: group-aws-account
        x: 25
        y: 30
        w: 425
        h: 375
        tone: mgmt
      - label: Destination account / Region
        icon: group-aws-account
        x: 550
        y: 30
        w: 425
        h: 375
        tone: mgmt
    nodes:
      - id: source
        label: Source bucket
        sub: versioning enabled
        icon: res-simple-storage-service-bucket
        x: 125
        y: 105
        w: 160
        h: 86
        tone: storage
        info: A live replication rule selects new versions. Use Batch Replication for existing, failed, or
          previously replicated objects.
      - id: role
        label: IAM role
        sub: replication permissions
        icon: res-identity-access-management-role
        x: 125
        y: 285
        w: 180
        h: 86
        tone: security
        info: S3 assumes this role to read source versions and replicate them. SSE-KMS requires source key
          decrypt and destination key encrypt permissions.
      - id: dest
        label: Destination
        sub: versioning enabled
        icon: res-simple-storage-service-bucket
        x: 663
        y: 105
        w: 160
        h: 86
        tone: storage
        info: A cross-account destination bucket policy grants replication access. Bucket owner enforced
          Object Ownership makes the destination account own replicas.
    edges:
      - from: source
        to: role
        step: 1
      - from: role
        to: dest
        step: 2
    steps:
      - A new object version matches the replication rule, and S3 assumes the configured IAM role.
      - S3 copies the version asynchronously, subject to bucket and KMS permissions.
cards:
  - id: s3-006
    q: What must be configured for S3 replication between buckets in different AWS accounts?
    a: Versioning on both buckets, a source replication rule, and an IAM role S3 can assume. The
      destination bucket policy must grant replication access. CRR crosses Regions; SRR stays in one
      Region.
    facts:
      - replication-versions
      - replication-role
      - replication-account
      - crr-srr
      - crr-srr-srr
  - id: s3-008
    q: Does S3 replication copy deletions of object versions and delete markers?
    a: Version-specific deletions are not replicated. V2 rules do not replicate delete markers by
      default; enable it for rules without tag filters. V1 rules replicate markers from user
      deletes. Lifecycle actions are not replicated.
    trap: true
    facts:
      - replication-delete
      - replication-markers
      - replication-v1
      - replication-lifecycle
  - id: s3-009
    q: Which objects or settings does S3 live replication leave out?
    a: Pre-existing objects, replicas from another rule, archived source objects in Glacier Flexible
      Retrieval or Deep Archive and Intelligent-Tiering archive access tiers, lifecycle actions, and
      bucket configurations.
    trap: true
    facts:
      - replication-new
      - replication-exclusions
      - replication-archive
      - replication-lifecycle
  - id: s3-010
    q: How does a team replicate SSE-KMS encrypted S3 objects across Regions?
    a: Opt in to encrypted-object replication and specify a KMS key in the destination Region. Give the
      role source kms:Decrypt and destination kms:Encrypt permissions.
    facts:
      - replication-kms-opt-in
      - replication-kms-permissions
      - replication-kms-permissions-destination
  - id: s3-038
    q: An S3 design replicates bucket A to B and B to C, but objects from A never reach C. What should
      change?
    a: Configure A to replicate directly to the required destinations. Live replication does not copy
      replicas created by another rule.
    trap: true
    facts:
      - replication-exclusions
  - id: s3-039
    q: An S3 team copies immutable object versions into a recovery account. What must be enabled on the
      destination?
    a: Object Lock and versioning. The replication role also needs source s3:GetObjectRetention and
      s3:GetObjectLegalHold permissions.
    facts:
      - replication-lock
      - replication-versions
  - id: s3-084
    q: An S3 replication workload needs a measurable replication time target and CloudWatch metrics. What should the team enable?
    a: Enable S3 Replication Time Control. It replicates 99.9 percent of uploaded objects within 15 minutes and enables replication metrics.
    facts:
      - replication-rtc
  - id: s3-085
    q: An S3 Replication Time Control workload exceeds its default transfer rate quota. Does the SLA apply during that period?
    a: No. The SLA does not apply when the replication transfer rate exceeds the default 1 Gbps quota.
    trap: true
    facts:
      - replication-rtc-quota
  - id: s3-086
    q: How can a team retry failed S3 replicas or replicate objects that existed before a rule?
    a: Run S3 Batch Replication with an existing replication configuration and a manifest.
    facts:
      - replication-batch-retry
  - id: s3-087
    q: A destination S3 object version was deleted by version ID. Can S3 Batch Replication recreate that version?
    a: No. Copy the source object in place to create a new source version eligible for live replication.
    trap: true
    facts:
      - replication-batch-deleted
  - id: s3-088
    q: How can an operator distinguish pending from failed S3 object replication?
    a: Use HeadObject and inspect the x-amz-replication-status header.
    facts:
      - replication-status
  - id: s3-089
    q: A team replicates SSE-KMS encrypted S3 objects to another account. Which destination key should it use?
    a: Use a customer managed KMS key owned by the destination account and grant the replication role access in the key policy.
    facts:
      - replication-cross-account-kms
  - id: s3-090
    q: Can a cross-account S3 replication destination use Requester Pays?
    a: No. Cross-account destination buckets cannot be Requester Pays buckets.
    trap: true
    facts:
      - replication-requester-pays
  - id: s3-091
    q: When does an S3 destination lifecycle rule start counting the age of a replicated object?
    a: From the original object's creation time, not its arrival at the destination.
    facts:
      - replication-destination-lifecycle
  - id: s3-105
    q: An administrator cannot configure an S3 replication role for a bucket. Which permissions must the caller have?
    a: The caller needs s3:PutReplicationConfiguration and iam:PassRole.
    facts:
      - replication-config-permission
  - id: s3-106
    q: A team wants S3 replication failure notifications without a replication time target. Must it enable S3 Replication Time Control?
    a: No. Enable replication metrics on the rule and configure the failure notification. S3 RTC is required for threshold notifications.
    trap: true
    facts:
      - replication-failure-events
  - id: s3-107
    q: An SSE-S3 encrypted S3 object is replicated to a bucket whose default encryption is SSE-KMS. Which encryption type does the replica use?
    a: SSE-S3. Replicas of encrypted objects use the source encryption type, not the destination default.
    trap: true
    facts:
      - replication-encryption-default
  - id: s3-111
    q: "Objects written to one S3 bucket must appear automatically in buckets in three other Regions. What provides this without custom copy code?"
    a: "S3 Replication from the source bucket to each destination bucket. One source can replicate to multiple destination buckets across Regions."
    facts:
      - multi-destination
---
S3 Replication creates copies in other buckets without making the application upload each copy. It is asynchronous: the original write can finish before its replica is available.

### How it works

1. Enable versioning on both buckets. Choose Cross-Region Replication (CRR) for another Region or Same-Region Replication (SRR) for the same Region.
2. Create a source rule selecting objects and a destination. Give S3 an IAM role, a permission identity it can assume to read source versions and write replicas.
3. For a different destination account, grant replication access in its bucket policy. Use destination Bucket owner enforced Object Ownership when that account must own replicas.
4. For server-side encryption using KMS keys (SSE-KMS), or its dual-layer form (DSSE-KMS), explicitly enable encrypted-object replication and specify a destination-Region KMS key. Grant source decrypt and destination encrypt access.
5. S3 copies new matching versions. Configure destination lifecycle and other bucket settings separately.
6. To backfill existing objects or retry failures, run S3 Batch Replication with a manifest and an existing replication configuration. Inspect the source object's `HeadObject` replication status to distinguish pending work from failures.
7. The caller setting replication needs `s3:PutReplicationConfiguration` and `iam:PassRole`. Enable replication metrics and a failure notification to receive failure events; threshold events require S3 RTC.

### Exam cues

- If the question says new S3 writes need copies in another Region, think CRR, because it copies matching versions asynchronously across Regions.
- If the question says S3 replicas must survive version-specific deletes in the source, think replication, because these deletes are not propagated.
- If the question says a replication chain misses copies from its first bucket, think direct source-to-destination rules, because live replication skips replicas from another rule.
- If the question requires a replication time target and CloudWatch visibility, think S3 Replication Time Control, because it enables replication metrics and replicates 99.9 percent of uploaded objects within 15 minutes.
- If the question says an SSE-KMS replica must be readable in another account, think a destination-owned customer managed KMS key and key policy access for the replication role.
- If a destination version was deleted by version ID, think an in-place source copy to create a new version, because Batch Replication cannot recreate that deleted version.
- If the question says copy every new object to buckets in several Regions, think S3 Replication to multiple destinations, because one source bucket can replicate to many.

### Remember

- Both buckets need versioning. Existing objects need Batch Replication.
- V2 delete-marker replication is off by default and cannot be enabled for tag-filtered rules. V1 rules replicate markers from user deletes.
- Lifecycle actions, bucket settings, and archived source objects are excluded.
- An Object Lock source requires Object Lock on the destination and permissions to read retention and legal holds.
- SSE-S3 and SSE-C do not need the SSE-KMS opt-in.
- Replicas of SSE-S3, SSE-KMS, or DSSE-KMS objects keep the source encryption type rather than using the destination bucket default.
- Cross-account destinations cannot use Requester Pays.
- Destination lifecycle rules measure age from the original object's creation time.
- The S3 RTC SLA does not apply above the default 1 Gbps transfer rate quota.

> **Trap:** A destination bucket does not automatically inherit the source lifecycle configuration. A version-specific source delete also does not remove the replica.
