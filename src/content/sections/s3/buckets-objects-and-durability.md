---
title: Buckets, objects, and durability
level: foundational
order: 1
facts:
  - id: object-storage
    text: Amazon S3 is an object storage service for storing and protecting any amount of data for uses such as data lakes, websites, mobile applications, backup and restore, archive and big data analytics.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#Welcome
  - id: object-bucket
    text: In Amazon S3 an object is a file and any metadata that describes it, and a bucket is a container for objects; each object has a key that identifies it uniquely within the bucket.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#CoreConcepts
  - id: region
    text: To store data in Amazon S3 you create a bucket, choosing its name and AWS Region, then upload data to it as objects.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#CoreConcepts
  - id: private
    text: S3 buckets and objects are private and accessible only when access is explicitly granted, through bucket policies, IAM policies, ACLs or access points.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#CoreConcepts
  - id: durability
    text: Amazon S3 is designed for 99.999999999% (11 nines) durability, and S3 Standard for 99.99% availability.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html#DataDurability
  - id: multi-az
    text: S3 Standard, S3 Intelligent-Tiering, S3 Standard-IA and the S3 Glacier storage classes store objects redundantly on multiple devices across at least three Availability Zones in a Region.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html#DataDurability
  - id: versioning
    text: S3 Versioning keeps multiple versions of an object in the same bucket, so accidentally deleted or overwritten objects can be restored.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#CoreConcepts
  - id: flat
    text: S3 buckets have a flat structure, not a file system hierarchy; console folders are shared key name prefixes.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-folders.html
  - id: transfer-acceleration
    text: S3 Transfer Acceleration speeds up long-distance transfers to a bucket by routing them through CloudFront edge locations.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html
  - id: audit-data
    text: CloudTrail S3 data events record object-level API activity such as reads and writes.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cloudtrail-logging-s3-info.html#cloudtrail-logging-s3-info
  - id: audit-default
    text: CloudTrail does not log data events by default; they must be enabled and incur additional
      charges.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cloudtrail-logging-s3-info.html#cloudtrail-logging-s3-info
  - id: inventory-purpose
    text: "S3 Inventory produces daily or weekly object and metadata listings for an entire bucket or for keys with a selected prefix."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory-buckets
  - id: multipart
    text: Multipart upload sends an object as independent parts, in any order and in parallel, which raises throughput and lets you retry only the parts that failed on an unreliable network.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html#mpuoverview
  - id: bpa-no-grant
    text: "Block Public Access settings constrain permissions granted through policies or ACLs; removing a block does not itself grant public access."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html
  - id: multi-destination
    text: "One source bucket can replicate to a single destination bucket or to multiple destination buckets, in the same Region or in different Regions."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html#replication
  - id: request-pricing
    text: "S3 request charges depend on the request type and storage class, including GET and COPY requests."
    source: https://aws.amazon.com/s3/pricing/
  - id: cors-browser
    text: "S3 cross-origin resource sharing permits configured browser applications to access resources across origins."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html
  - id: mfa-delete
    text: "S3 MFA Delete requires additional authentication to permanently delete an object version or change bucket versioning state."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html
  - id: simple-delete-marker
    text: "Deleting without a version ID in a versioning-enabled S3 bucket creates a delete marker instead of permanently deleting the object."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/DeletingObjects.html
  - id: deny-delete
    text: "An S3 bucket policy can explicitly deny object deletion permissions."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/DeletingObjects.html
  - id: object-lock
    text: "S3 Object Lock protects object versions from deletion or overwrite for a retention period."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html
  - id: event-notifications
    text: "S3 Event Notifications send messages when configured bucket events occur."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html
  - id: internet-transfer
    text: "Internet data transfer into S3 is free; outbound internet transfer is subject to pricing and applicable allowances."
    source: https://aws.amazon.com/s3/pricing/
  - id: acceleration-download
    text: "S3 Transfer Acceleration supports object GET and PUT requests through its acceleration endpoint."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration-getting-started.html
  - id: event-notification-cost
    text: "S3 Event Notifications have no additional S3 notification charge; destination services can incur charges."
    source: https://aws.amazon.com/s3/faqs/
  - id: mfa-simple-delete
    text: "An S3 delete request that does not specify a version can succeed without an MFA token in an MFA-enabled bucket."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/DeletingObjects.html
cards:
  - id: s3-112
    q: What kind of storage is Amazon S3, and what are its two main building blocks?
    a: Object storage. Data is stored as objects (a file plus metadata, identified by a key) inside buckets.
    facts: [object-storage, object-bucket]
  - id: s3-113
    q: What durability is Amazon S3 designed for?
    a: 99.999999999% (11 nines).
    facts: [durability]
  - id: s3-114
    q: How does Amazon S3 Standard protect objects against the loss of a data center?
    a: It stores objects redundantly across at least three Availability Zones in the Region.
    facts: [multi-az]
  - id: s3-115
    q: A new Amazon S3 bucket is created without any policy. Can anyone on the internet read its objects?
    a: No. Buckets and objects are private until access is explicitly granted.
    trap: true
    facts: [private]
  - id: s3-116
    q: Which use cases fit Amazon S3 object storage?
    a: Data lakes, static websites, mobile app content, backup and restore, archives and big data analytics.
    facts: [object-storage]
  - id: s3-117
    q: How can a company recover an Amazon S3 object that someone overwrote by mistake?
    a: Turn on S3 Versioning. It keeps earlier versions in the bucket, so the old version can be restored.
    facts: [versioning]
  - id: s3-126
    q: Users around the world upload large files to one Amazon S3 bucket and uploads are slow. Which S3 feature speeds them up?
    a: S3 Transfer Acceleration, which routes uploads through CloudFront edge locations.
    facts: [transfer-acceleration]
  - id: s3-127
    q: Does Amazon S3 store objects in a folder hierarchy like a file system?
    a: No. S3 is flat; folders in the console are shared key name prefixes.
    trap: true
    facts: [flat]
  - id: s3-034
    q: An S3 audit needs object reads recorded while a scheduled job lists bucket contents. Which
      features fit?
    a: Enable CloudTrail S3 data events for object activity and S3 Inventory for the listing. Data
      events are not logged by default; Inventory lists objects and metadata rather than access
      calls.
    trap: true
    facts:
      - audit-data
      - audit-default
      - inventory-purpose
  - id: s3-136
    q: A 3 GB upload to Amazon S3 over a flaky network keeps restarting from zero. What should the client use?
    a: "Multipart upload, so only the failed parts are retried."
    facts: [multipart]
  - id: s3-195
    q: "An Amazon S3 bucket has Block Public Access turned off but no policy or ACL grants public reads. Does turning off the block make its objects public?"
    a: "No. Public reads still need an applicable policy or ACL grant."
    facts: [bpa-no-grant]
  - id: s3-111
    q: "Objects written to one S3 bucket must appear automatically in buckets in three other Regions. What provides this without custom copy code?"
    a: "S3 Replication from the source bucket to each destination bucket. One source can replicate to multiple destination buckets across Regions."
    facts:
      - multi-destination
  - id: s3-213
    q: "What affects the cost of Amazon S3 GET and COPY requests?"
    a: "The request type, storage class and number of requests."
    facts: [request-pricing]
  - id: s3-214
    q: "What controls browser access to an Amazon S3 resource from a different origin?"
    a: "Configure S3 cross-origin resource sharing (CORS)."
    facts: [cors-browser]
  - id: s3-215
    q: "Which Amazon S3 operations require MFA when MFA Delete is enabled?"
    a: "Permanent version deletion and changes to the bucket versioning state."
    facts: [mfa-delete]
  - id: s3-216
    q: "What does an Amazon S3 delete request without a version ID do in a versioning-enabled bucket?"
    a: "It creates a delete marker; the prior object version remains."
    facts: [simple-delete-marker]
  - id: s3-217
    q: "How can an Amazon S3 bucket policy prevent object deletion?"
    a: "Explicitly deny the applicable delete permissions."
    facts: [deny-delete]
  - id: s3-218
    q: "Which Amazon S3 feature protects object versions from deletion or overwrite for a retention period?"
    a: "S3 Object Lock."
    facts: [object-lock]
  - id: s3-219
    q: "How can an Amazon S3 bucket notify another service when a configured event occurs?"
    a: "Use S3 Event Notifications."
    facts: [event-notifications]
  - id: s3-221
    q: "How does Amazon S3 price internet data transfer in each direction?"
    a: "Internet transfer in is free; transfer out is subject to pricing and applicable allowances."
    facts: [internet-transfer]
  - id: s3-234
    q: "Can Amazon S3 Transfer Acceleration support downloads as well as uploads?"
    a: "Yes. Its acceleration endpoint supports GET and PUT requests."
    facts: [acceleration-download]
  - id: s3-235
    q: "Does Amazon S3 charge an additional fee for Event Notifications?"
    a: "No additional S3 notification fee applies; destination services can charge."
    facts: [event-notification-cost]
  - id: s3-240
    q: "Does a simple Amazon S3 delete request need an MFA token when MFA Delete is enabled?"
    a: "A delete request without a version ID can succeed without an MFA token and create a delete marker."
    facts: [mfa-simple-delete, simple-delete-marker]
---
Amazon S3 stores data as objects in buckets. It is built for any amount of data with very high durability, so it is the default place on AWS for files, backups, data lakes and static website content.

### How it works

1. Create a bucket in a Region.
2. Upload objects. Each one is a file plus metadata, identified by a key.
3. S3 stores each object across at least three Availability Zones in most storage classes.
4. Grant access explicitly with policies; everything starts private.

| Storage type | AWS example | Holds |
|---|---|---|
| Object | Amazon S3 | Files plus metadata, accessed over HTTP by key |
| Block | Amazon EBS, instance store | Volumes attached to an instance |
| File | Amazon EFS, Amazon FSx | Shared file systems mounted over a network |

### Exam cues

- If the question says a simple S3 delete adds a marker, think no MFA token is required for that request, because MFA Delete protects permanent version deletion.
- If the question says estimate S3 Event Notifications cost, think destination service charges, because S3 does not add a notification charge.
- If the question says accelerate a long-distance S3 download, think Transfer Acceleration, because the acceleration endpoint supports GET as well as PUT.
- If the question says estimate S3 internet transfer costs, think free inbound transfer and priced outbound transfer, because the directions are billed differently.
- If the question says react to bucket events, think S3 Event Notifications, because S3 sends messages for configured events.
- If the question says retain an object version against deletion or overwrite, think S3 Object Lock, because it enforces retention.
- If the question says prevent object deletion, think an explicit deny in the S3 bucket policy, because it restricts delete permissions.
- If the question says delete an S3 object without a version ID, think delete marker, because versioning preserves the prior version.
- If the question says protect permanent version deletion with another authentication factor, think S3 MFA Delete, because it protects version deletion and versioning state changes.
- If the question says a browser application needs a resource from another origin, think S3 CORS, because it controls permitted cross-origin requests.
- If the question says estimate S3 request costs, think request type and storage class, because their rates differ.
- If the question says store unlimited files, backups or static web content, think Amazon S3.
- If the question says highest durability, think S3's 11 nines.

### Remember

- Durability: 99.999999999%. S3 Standard availability: 99.99%.
- Objects live in buckets; buckets live in a Region.

> **Trap:** S3 is not a disk you mount on an instance. For a boot or database volume use block storage (Amazon EBS); for a shared file system use Amazon EFS or Amazon FSx.
