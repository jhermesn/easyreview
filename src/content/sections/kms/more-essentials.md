---
title: Encryption defaults and key ownership
level: foundational
order: 70
facts:
  - id: s3-default
    text: Since January 5, 2023, Amazon S3 automatically encrypts all new object uploads with SSE-S3 (AES-256) at no additional cost and with no performance impact.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html#default-encryption-faq
  - id: cloudtrail-default
    text: CloudTrail log files delivered to S3 are encrypted by default with SSE-S3, or with SSE-KMS if you choose a KMS key.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html
  - id: storage-gateway-default
    text: AWS Storage Gateway encrypts data in transit with TLS and, by default, encrypts the data it stores in Amazon S3 with SSE-S3.
    source: https://docs.aws.amazon.com/filegateway/latest/files3/encryption.html
  - id: efs-at-create
    text: Amazon EFS encryption at rest is set when the file system is created and can't be added to an unencrypted file system later.
    source: https://docs.aws.amazon.com/efs/latest/ug/encryption-at-rest.html
  - id: redshift-default
    text: Since January 10, 2025, new Amazon Redshift provisioned clusters are encrypted by default; clusters restored from snapshots are not affected.
    source: https://docs.aws.amazon.com/redshift/latest/mgmt/behavior-changes.html#encryption-by-default
  - id: key-types
    text: KMS keys are customer managed keys (you create and control them), AWS managed keys (created in your account by a service, a legacy type) and AWS owned keys (owned by a service, used for encryption by default).
    source: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html
cards:
  - id: kms-041
    q: A company uploads new objects to Amazon S3 without configuring encryption. Are they stored unencrypted?
    a: No. Since January 5, 2023, S3 encrypts all new uploads with SSE-S3 (AES-256) automatically, at no extra cost.
    trap: true
    facts: [s3-default]
  - id: kms-044
    q: "Which of these encrypt data by default with no setting to change: CloudTrail log files, Storage Gateway data in S3, a new Amazon EFS file system created through the API?"
    a: CloudTrail log files (SSE-S3) and Storage Gateway data (SSE-S3, plus TLS in transit). EFS encryption at rest is a setting chosen when the file system is created.
    trap: true
    facts: [cloudtrail-default, storage-gateway-default, efs-at-create]
  - id: kms-045
    q: Are new Amazon Redshift provisioned clusters encrypted by default?
    a: Yes, since January 10, 2025, unless they are restored from a snapshot.
    facts: [redshift-default]
  - id: kms-046
    q: Which three kinds of KMS keys exist, and which one does a customer fully control?
    a: Customer managed keys (full control), AWS managed keys (created by a service in your account) and AWS owned keys (owned by the service).
    facts: [key-types]
---
AWS services offer encryption defaults and settings for stored data. Knowing which service applies a default and who controls a key helps you choose the right setting. [S3 defaults](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html#default-encryption-faq) · [KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html)

### How it works

1. Amazon S3 automatically encrypts new object uploads with server-side encryption using S3 managed keys (SSE-S3). CloudTrail log files delivered to S3 use SSE-S3 by default, or server-side encryption with a KMS key (SSE-KMS) when you choose a key. [S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html#default-encryption-faq) · [CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html)
2. AWS Storage Gateway uses TLS for data in transit and SSE-S3 by default for data it stores in S3. New Amazon Redshift provisioned clusters are encrypted by default, except that the change does not affect clusters restored from snapshots. [Storage Gateway](https://docs.aws.amazon.com/filegateway/latest/files3/encryption.html) · [Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/behavior-changes.html#encryption-by-default)
3. Choose encryption at rest when creating an Amazon EFS file system. You cannot add it to an unencrypted file system later. [EFS](https://docs.aws.amazon.com/efs/latest/ug/encryption-at-rest.html)
4. Choose a KMS key type by who controls it. You create and control customer managed keys; an AWS service creates AWS managed keys in your account and owns AWS owned keys. [KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html)

### Exam cues

- If the question says new S3 uploads without an encryption setting, think SSE-S3, because S3 encrypts new uploads automatically.
- If the question says full control of a KMS key, think customer managed key, because you create and control it.
- If the question says add encryption to an existing unencrypted EFS file system, think creation time, because its encryption setting cannot be added later.

### Remember

- Since January 5, 2023, S3 encrypts new uploads with SSE-S3 using AES-256, at no extra cost or performance impact.
- Since January 10, 2025, new Redshift provisioned clusters are encrypted by default; the change does not affect clusters restored from snapshots.
- AWS managed keys are a legacy type; AWS owned keys are used by services for encryption by default.

> **Trap:** Encryption defaults differ by service. EFS encryption at rest is set at creation, while S3 automatically encrypts new uploads.
