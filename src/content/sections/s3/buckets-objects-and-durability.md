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
---
Amazon S3 stores data as objects in buckets. It is built for any amount of data with very high durability, so it is the default place on AWS for files, backups, data lakes and static website content. [What is Amazon S3?](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html#Welcome)

### How it works

1. Create a bucket in a Region.
2. Upload objects. Each one is a file plus metadata, identified by a key.
3. S3 stores each object across at least three Availability Zones in most storage classes. [Data protection in Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html#DataDurability)
4. Grant access explicitly with policies; everything starts private.

| Storage type | AWS example | Holds |
|---|---|---|
| Object | Amazon S3 | Files plus metadata, accessed over HTTP by key |
| Block | Amazon EBS, instance store | Volumes attached to an instance |
| File | Amazon EFS, Amazon FSx | Shared file systems mounted over a network |

### Exam cues

- If the question says store unlimited files, backups or static web content, think Amazon S3.
- If the question says highest durability, think S3's 11 nines.

### Remember

- Durability: 99.999999999%. S3 Standard availability: 99.99%.
- Objects live in buckets; buckets live in a Region.

> **Trap:** S3 is not a disk you mount on an instance. For a boot or database volume use block storage (Amazon EBS); for a shared file system use Amazon EFS or Amazon FSx.
