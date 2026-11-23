---
title: S3 operational troubleshooting
level: professional
order: 180
facts:
  - id: cors-fields
    text: AllowedOrigins, AllowedMethods, and AllowedHeaders define the origins, methods, and headers a
      CORS rule permits.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html#cors
  - id: cors-match
    text: S3 uses the first CORS rule matching the request origin, method, and requested headers.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html#cors
  - id: vpc-source
    text: For requests through an S3 VPC endpoint, use aws:VpcSourceIp rather than aws:SourceIp for
      source-address conditions.
    source: https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html#vpc-endpoints-s3
  - id: vpc-pair
    text: Pair aws:VpcSourceIp with aws:SourceVpc or aws:SourceVpce because private IP ranges can
      overlap between VPCs.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-vpcsourceip
  - id: bucket-naming
    text: "General purpose bucket names are 3 to 63 characters of lowercase letters, numbers, periods and hyphens; they cannot look like an IP address, start with xn--, or end with -s3alias."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html#general-purpose-bucket-names
  - id: account-regional-namespace
    text: "Buckets can optionally be created in an account regional namespace, where only the owning account can create names ending in its account ID, Region code and -an, so a chosen prefix cannot be taken by another account."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html#account-regional-naming-rules
  - id: object-tags
    text: "An S3 object can carry up to 10 tags with unique keys, which access policies and lifecycle rule filters can use."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html#object-tagging
  - id: bucket-key-context
    text: Bucket Keys use the bucket ARN as encryption context, so policies expecting an object ARN must
      be updated.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html#bucket-key-policies
  - id: ssec-update
    text: From April 2026, SSE-C is blocked by default in new general purpose buckets and in existing
      buckets in accounts without SSE-C objects.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html#ServerSideEncryptionCustomerKeys
  - id: ssec-enable
    text: To enable SSE-C explicitly, use PutBucketEncryption with BlockedEncryptionTypes set to NONE.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html#ServerSideEncryptionCustomerKeys
  - id: update-object-encryption
    text: "UpdateObjectEncryption changes an existing SSE-S3 or SSE-KMS object to SSE-KMS, or to use an S3 Bucket Key, in place without copying data; it does not accept unencrypted, DSSE-KMS or SSE-C objects."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/update-sse-encryption.html#update-sse-encryption
  - id: bucket-key-existing
    text: "Turning on Bucket Keys for a bucket does not change existing objects. For eligible SSE-KMS objects, UpdateObjectEncryption enables a Bucket Key without copying object data."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/update-sse-encryption.html
  - id: aws-s3-key
    text: "When no KMS key is given for SSE-KMS, S3 uses the AWS managed key aws/s3 of the uploading account."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html#aws-managed-customer-managed-keys
  - id: events-sequencer
    text: PUT and DELETE notification sequencers can order events for the same object key, but not different keys; left-pad shorter values with zeros before comparison.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html#notification-content-structure
  - id: events-queue-size
    text: S3 notifications can be up to 64 KB; SQS rejects a notification exceeding the queue's configured MaximumMessageSize.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html#notification-content-structure
  - id: events-replace-config
    text: PutBucketNotificationConfiguration replaces the whole configuration and normally validates destinations atomically; a failed test causes the entire request to fail.
    source: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutBucketNotificationConfiguration.html#API_PutBucketNotificationConfiguration
  - id: events-key-encoding
    text: The object key in an S3 event notification is URL encoded, with spaces represented by plus signs.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-content-structure.html#notification-content-structure
  - id: access-log-destination
    text: For direct delivery to S3, the access-log destination bucket must be in the same Region and
      account as the source.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-server-access-logging.html#enable-server-access-logging
  - id: inventory-destination
    text: An Inventory destination bucket must be in the source Region, may be in a different account,
      and needs a delivery bucket policy.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory-buckets
  - id: inventory-purpose
    text: S3 Inventory reports object names and selected metadata on a daily or weekly schedule.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory
  - id: inventory-formats
    text: Inventory output formats are CSV, Apache ORC, and Apache Parquet.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory
  - id: inventory-first
    text: The first Inventory report can take up to 48 hours to arrive.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory
  - id: lifecycle-precedence
    text: When lifecycle actions conflict on the same day, permanent deletion takes precedence over transition, which takes precedence over creating a delete marker.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-expire-general-considerations
  - id: lifecycle-newer-versions
    text: Noncurrent version expiration can retain a specified number of newer noncurrent versions; specifying that count requires a Filter element as well as an age.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-expire-general-considerations
  - id: lifecycle-tag-recheck
    text: S3 rechecks tags when a queued tag-filtered expiration executes and skips the expiration if the triggering tag is absent.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html#lifecycle-tag-based-expiration-eligibility
  - id: tag-set-replace
    text: "PutObjectTagging replaces the whole tag set of an object, so adding one tag means reading the set with GetObjectTagging, changing it and putting it back. An object can hold up to 10 tags."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html#tagging-apis
  - id: get-object-acl
    text: The GetObjectAcl API returns the access control list (ACL) of an object.
    source: https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObjectAcl.html
  - id: replication-rtc-quota
    text: The S3 RTC SLA does not apply when the replication transfer rate exceeds the default 1 Gbps quota.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-time-control.html#exceed-rtc-data-transfer-limits
  - id: replication-batch-deleted
    text: Batch Replication cannot restore a destination version deleted by version ID; copying the source object in place creates a new version eligible for live replication.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-batch-replication-batch.html#batch-replication-considerations
  - id: replication-status
    text: HeadObject exposes source replication status as PENDING, COMPLETED or FAILED in the x-amz-replication-status header.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-troubleshoot.html#troubleshoot-replication-tips
  - id: replication-destination-lifecycle
    text: Destination lifecycle rules use the original object's creation time, not the time the replica arrived.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-requirements.html#replica-and-lifecycle
  - id: replication-failure-events
    text: Replication failure notifications require replication metrics on the rule, but not S3 Replication Time Control; threshold notifications require S3 RTC.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication-metrics-events.html#replication-metrics-events
cards:
  - id: s3-065
    q: A browser application on another origin cannot make an authorized S3 request. What CORS settings
      should be checked?
    a: AllowedOrigins, AllowedMethods, and AllowedHeaders. S3 uses the first rule that matches all
      required request attributes.
    facts:
      - cors-fields
      - cors-match
  - id: s3-066
    q: An S3 bucket policy restricts endpoint requests by private IP address. Which conditions prevent
      matching another VPC with the same private range?
    a: Use aws:VpcSourceIp together with aws:SourceVpc or aws:SourceVpce. Do not use aws:SourceIp for
      requests through the endpoint.
    facts:
      - vpc-source
      - vpc-pair
  - id: s3-155
    q: "Is MyBucket_2026 a valid S3 general purpose bucket name?"
    a: "No. Names use only lowercase letters, numbers, periods and hyphens, 3 to 63 characters, so uppercase letters and underscores are rejected."
    facts: [bucket-naming]
  - id: s3-156
    q: "A team wants bucket names that no other AWS account can ever claim first. Which S3 option gives that?"
    a: "The account regional namespace: names carry the account ID, Region code and -an suffix, and only that account can create them."
    facts: [account-regional-namespace]
  - id: s3-157
    q: "How many tags can one S3 object have?"
    a: "Up to 10, each with a unique key."
    facts: [object-tags]
  - id: s3-057
    q: An S3 team enabled Bucket Keys and KMS policies scoped to object ARNs stopped working. What
      should it inspect?
    a: Encryption-context conditions. Bucket Keys use the bucket ARN, so policies that require an object
      ARN must be updated.
    trap: true
    facts:
      - bucket-key-context
  - id: s3-058
    q: A new S3 bucket rejects SSE-C uploads although the caller supplies the correct key. Which dated
      default should be checked?
    a: SSE-C is blocked by default from April 2026 for new general purpose buckets. Explicitly enable it
      through PutBucketEncryption with BlockedEncryptionTypes set to NONE if required.
    facts:
      - ssec-update
      - ssec-enable
  - id: s3-168
    q: "Existing SSE-S3 objects must move to SSE-KMS with a Bucket Key without rewriting them. Which operation does that?"
    a: "UpdateObjectEncryption, which updates the encryption in place with no data copy. CopyObject also works but rewrites each object."
    facts: [update-object-encryption, bucket-key-existing]
  - id: s3-171
    q: "An object is uploaded with SSE-KMS but no key ID, and the bucket default names no key. Which key encrypts it?"
    a: "The AWS managed key aws/s3 of the uploading account."
    facts: [aws-s3-key]
  - id: s3-100
    q: An S3 event consumer maintains an index and receives out-of-order PUT events for one key. How can it identify the later event?
    a: Compare sequencer values for that key after left-padding the shorter value with zeros. Sequencers cannot order different keys.
    facts:
      - events-sequencer
  - id: s3-101
    q: An S3 notification is rejected by an SQS queue with a small message limit. What limit should the team check?
    a: Set the queue MaximumMessageSize to at least 64 KB. Notifications can be up to that size.
    facts:
      - events-queue-size
  - id: s3-102
    q: A PutBucketNotificationConfiguration request adds an SQS target but an existing SNS destination fails validation. Is the new configuration saved?
    a: No. Normal destination validation is atomic and failure rejects the whole request. The operation replaces the whole configuration.
    trap: true
    facts:
      - events-replace-config
  - id: s3-104
    q: An S3 event consumer sees a plus sign in an object key that contains a space. How should it interpret the key?
    a: Decode it as a URL-encoded key; a plus sign represents a space.
    facts:
      - events-key-encoding
  - id: s3-079
    q: An S3 team sends server access logs directly to a different account log bucket. What destination
      requirement prevents this?
    a: Direct S3 server access-log delivery requires the same account and Region as the source bucket.
      Inventory has a different rule and can use another account in the same Region.
    trap: true
    facts:
      - access-log-destination
      - inventory-destination
  - id: s3-081
    q: Which report schedules and file formats does S3 Inventory support?
    a: Daily or weekly reports in CSV, ORC, or Parquet. The initial report may take as long as 48 hours.
    facts:
      - inventory-purpose
      - inventory-formats
      - inventory-first
  - id: s3-094
    q: An S3 object qualifies for permanent deletion and a lifecycle transition on the same day. Which action wins?
    a: Permanent deletion takes precedence over transition.
    facts:
      - lifecycle-precedence
  - id: s3-095
    q: An S3 lifecycle rule must retain a number of newer noncurrent versions before deleting older versions. What configuration is required?
    a: Specify the noncurrent age, the number of newer versions to retain, and a Filter element.
    facts:
      - lifecycle-newer-versions
  - id: s3-096
    q: A queued S3 Lifecycle expiration uses a tag filter, but the triggering tag is removed before execution. What happens?
    a: S3 rechecks the tags and skips expiration if the triggering tag is absent at execution.
    facts:
      - lifecycle-tag-recheck
  - id: s3-109
    q: "A Lambda function adds a tag to S3 objects that already carry other tags, and the old tags disappear. Why?"
    a: "PutObjectTagging replaces the whole tag set. Read the current set with GetObjectTagging, add the new tag and put the full set back."
    facts:
      - tag-set-replace
  - id: s3-129
    q: Which S3 API call returns the ACL of a single object?
    a: GetObjectAcl.
    facts: [get-object-acl]
  - id: s3-085
    q: An S3 Replication Time Control workload exceeds its default transfer rate quota. Does the SLA apply during that period?
    a: No. The SLA does not apply when the replication transfer rate exceeds the default 1 Gbps quota.
    trap: true
    facts:
      - replication-rtc-quota
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
  - id: s3-091
    q: When does an S3 destination lifecycle rule start counting the age of a replicated object?
    a: From the original object's creation time, not its arrival at the destination.
    facts:
      - replication-destination-lifecycle
  - id: s3-106
    q: A team wants S3 replication failure notifications without a replication time target. Must it enable S3 Replication Time Control?
    a: No. Enable replication metrics on the rule and configure the failure notification. S3 RTC is required for threshold notifications.
    trap: true
    facts:
      - replication-failure-events
---
S3 operations depend on configuration details that affect access, encryption, event processing, retention, and replication. Check the relevant settings and API behavior when a bucket or object does not behave as expected.

### How it works

1. For cross-origin resource sharing (CORS), check `AllowedOrigins`, `AllowedMethods`, and `AllowedHeaders`. S3 uses the first rule matching the request origin, method, and headers. For requests through a VPC endpoint, use `aws:VpcSourceIp` with `aws:SourceVpc` or `aws:SourceVpce`; private address ranges can overlap. CORS | VPC endpoints | VPC source IP
2. General purpose bucket names use lowercase letters, numbers, periods, and hyphens. They cannot resemble an IP address, start with `xn--`, or end with `-s3alias`. An account regional namespace uses the account ID, Region code, and `-an` suffix, and only that account can create those names. Bucket naming rules | Account regional namespace
3. When Bucket Keys are enabled, check KMS encryption-context policy conditions: Bucket Keys use the bucket ARN instead of the object ARN. Enabling the setting affects new objects. For existing SSE-S3 or SSE-KMS objects, `UpdateObjectEncryption` can enable a Bucket Key in place without copying data; a copy operation is another option. The update does not accept unencrypted, DSSE-KMS, or SSE-C objects. Bucket Key policies | Bucket Key configuration | Update encryption
4. For event consumers, compare PUT or DELETE sequencers only for the same object key, left-padding the shorter value with zeros. Decode the URL-encoded key, where a plus sign represents a space. When updating notifications, remember that `PutBucketNotificationConfiguration` replaces the whole configuration and normally rejects the entire request if a destination test fails. Event message structure | Notification configuration API
5. For object tags, read the current set with `GetObjectTagging` before adding a tag, then write the complete set with `PutObjectTagging`, which replaces it. Access policies and lifecycle filters can use tags. To inspect an object's access control list (ACL), call `GetObjectAcl`. Object tagging | Tag uses | GetObjectAcl
6. For replication troubleshooting, inspect `x-amz-replication-status` in `HeadObject`. Enable replication metrics for failure notifications; threshold notifications require S3 Replication Time Control (S3 RTC). Destination lifecycle rules count age from the original object's creation time. Replication status | Replication events | Replica lifecycle

### Exam cues

- If a new bucket rejects SSE-C uploads, check the default block. Since April 2026 it applies to new general purpose buckets and existing buckets in accounts without SSE-C objects. Explicitly enable SSE-C with `PutBucketEncryption` and `BlockedEncryptionTypes` set to `NONE`.
- If an SSE-KMS upload specifies no KMS key, think `aws/s3` in the uploading account, because S3 uses that AWS managed key.
- If a queue rejects S3 notifications, check `MaximumMessageSize`, because notifications can reach 64 KB.
- If an S3 Inventory report must go to another account, use a destination bucket in the source Region with a delivery policy. Direct S3 server access log delivery requires the same account and Region as the source. Inventory destinations | Access logging
- If lifecycle actions conflict on the same day, permanent deletion takes precedence over transition, which takes precedence over creating a delete marker. If retaining a count of newer noncurrent versions, specify the count, an age, and a `Filter` element.
- If a destination version was deleted by version ID, copy the source object in place to create a new version eligible for live replication. Batch Replication cannot restore the deleted version.

### Remember

- General purpose bucket names are 3 to 63 characters long.
- An object can have up to 10 tags, each with a unique key.
- Inventory runs daily or weekly in CSV, ORC, or Parquet; the initial report may take as long as 48 hours.
- S3 rechecks tags when a queued tag-filtered expiration executes and skips expiration if the triggering tag is absent.
- The S3 RTC SLA does not apply while the replication transfer rate exceeds the default 1 Gbps quota.

> **Trap:** Replication failure notifications need replication metrics, but they do not require S3 RTC. Threshold notifications do require S3 RTC.
