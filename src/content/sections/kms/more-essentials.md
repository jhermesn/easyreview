---
title: "PLACEHOLDER kms/more-essentials"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
