---
title: Encryption and Bucket Keys
level: associate
order: 90
facts:
  - id: encryption-at-rest
    text: Server-side encryption protects object data stored on disk; S3 encrypts uploads and decrypts
      authorized reads.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html#ServerSideEncryptionCustomerKeys
  - id: sse-base
    text: Since January 2023, all new S3 uploads receive server-side encryption.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html#default-encryption-faq
  - id: sse-base-default
    text: SSE-S3 is the base default when no other encryption is selected.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html#default-encryption-faq
  - id: sse-base-cost
    text: Default SSE-S3 encryption adds no encryption charge.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html#default-encryption-faq
  - id: sse-aes
    text: SSE-S3 uses AES-256 with S3-managed encryption keys.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html#default-encryption-faq
  - id: sse-mandatory
    text: Base encryption for new uploads cannot be disabled.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html#default-encryption-faq
  - id: sse-existing
    text: Automatic encryption of new uploads does not encrypt previously stored unencrypted objects.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-encryption-faq.html#default-encryption-faq
  - id: kms-control
    text: Customer managed KMS keys allow control of key access, rotation, disablement, and auditing.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html#aws-managed-customer-managed-keys
  - id: kms-cross-account
    text: Cross-account sharing of SSE-KMS objects requires a customer managed key rather than the AWS
      managed S3 key.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html#sse-kms-cross-account-operations
  - id: kms-upload-policy
    text: A bucket policy can deny PutObject when s3:x-amz-server-side-encryption is not aws:kms.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/S3-artifact-encryption.html#S3-artifact-encryption
  - id: kms-specific-key
    text: A bucket policy can require a specific KMS key with
      s3:x-amz-server-side-encryption-aws-kms-key-id.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html#require-sse-kms
  - id: kms-default-override
    text: Upload-request encryption settings can override the bucket default encryption configuration.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html#require-sse-kms
  - id: bucket-key-cost
    text: Bucket Keys use short-lived bucket-level keys to reduce SSE-KMS calls to KMS.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html#bucket-key
  - id: bucket-key-cost-saving
    text: Bucket Keys can reduce KMS request costs by up to 99%.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html#bucket-key
  - id: bucket-key-existing
    text: Enabling Bucket Keys affects new objects; existing objects need a copy operation to use them.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html#configure-bucket-key
  - id: bucket-key-context
    text: Bucket Keys use the bucket ARN as encryption context, so policies expecting an object ARN must
      be updated.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html#bucket-key-policies
  - id: bucket-key-dsse
    text: Bucket Keys do not support DSSE-KMS.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html#bucket-key
  - id: ssec-keys
    text: SSE-C requires the caller to supply the encryption key for upload and retrieval; S3 does not
      retain the key.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html#ServerSideEncryptionCustomerKeys
  - id: ssec-loss
    text: Losing an SSE-C key means losing access to its object.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html#ServerSideEncryptionCustomerKeys
  - id: ssec-https
    text: SSE-C requests require HTTPS.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html#ServerSideEncryptionCustomerKeys
  - id: ssec-update
    text: From April 2026, SSE-C is blocked by default for new general purpose buckets and existing
      buckets in accounts without SSE-C objects.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html#ServerSideEncryptionCustomerKeys
  - id: ssec-enable
    text: To enable SSE-C explicitly, use PutBucketEncryption with BlockedEncryptionTypes set to NONE.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerSideEncryptionCustomerKeys.html#ServerSideEncryptionCustomerKeys
  - id: arn-definition
    text: An Amazon Resource Name (ARN) uniquely identifies an AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#reference-arns
  - id: context-definition
    text: An encryption context supplies additional identifying information to KMS and can be used in
      key access policies.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html#encryption-context
  - id: dsse-layers
    text: DSSE-KMS applies two layers of server-side encryption to uploaded objects.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingDSSEncryption.html#UsingDSSEncryption
  - id: kms-quota
    text: Each upload or download of an SSE-KMS object calls KMS and counts against the Region's KMS request quota, so heavy traffic can be throttled; SSE-S3 makes no KMS calls.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/requests-per-second.html
cards:
  - id: s3-014
    q: What encryption does S3 apply to a new upload with no encryption settings?
    a: SSE-S3 using AES-256 and S3-managed keys. It has applied to new uploads since January 2023 at no
      extra charge and cannot be disabled. It does not retroactively encrypt older objects.
    facts:
      - sse-base
      - sse-base-default
      - sse-base-cost
      - sse-aes
      - sse-mandatory
      - sse-existing
  - id: s3-015
    q: What do S3 Bucket Keys change for SSE-KMS?
    a: They reduce KMS request traffic with short-lived bucket-level keys, reducing KMS request costs by
      up to 99%. The encryption context uses the bucket ARN. Existing objects need copying, and
      DSSE-KMS is unsupported.
    facts:
      - bucket-key-cost
      - bucket-key-cost-saving
      - bucket-key-context
      - bucket-key-existing
      - bucket-key-dsse
  - id: s3-016
    q: An S3 bucket must reject uploads that do not explicitly request SSE-KMS. What enforces this?
    a: A bucket-policy deny on PutObject when s3:x-amz-server-side-encryption is not aws:kms. Default
      encryption alone can be overridden. A strict header requirement also rejects uploads that omit
      the header.
    facts:
      - kms-upload-policy
      - kms-default-override
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
  - id: s3-059
    q: An S3 team wants another account to read SSE-KMS objects. Is the AWS managed S3 key sufficient?
    a: No. Use a customer managed KMS key with access configured for the other account.
    trap: true
    facts:
      - kms-cross-account
  - id: s3-060
    q: What must a caller retain to read an S3 object encrypted with SSE-C?
    a: The original encryption key and the mapping to its object or version. Supply the key over HTTPS
      on retrieval; S3 does not keep it, and losing it loses access.
    facts:
      - ssec-keys
      - ssec-loss
      - ssec-https
  - id: s3-131
    q: S3 requests on an SSE-KMS bucket start failing with throttling at high request rates. Why?
    a: Each SSE-KMS object request calls KMS and counts against the KMS request quota. S3 Bucket Keys or SSE-S3 cut those calls.
    facts: [kms-quota, bucket-key-cost]
---
S3 server-side encryption protects object data at rest, meaning while stored on disk. S3 encrypts data during storage and decrypts it for authorized reads; the encryption option determines who controls the keys.

### How it works

1. Choose S3-managed keys for the base encryption behavior or AWS Key Management Service (KMS) keys for key access control and auditing. Previously unencrypted objects need a separate copy operation to encrypt them.
2. Use a customer managed KMS key when sharing SSE-KMS objects across accounts. The AWS managed S3 key cannot provide that cross-account sharing.
3. Set bucket default encryption for uploads without explicit encryption settings. Enforce strict requirements with a bucket-policy deny, because request settings can override the default.
4. Enable Bucket Keys for SSE-KMS request savings. The encryption context, additional identifying information sent to KMS, uses a bucket ARN rather than an object ARN. An ARN is the AWS identifier of a resource; update policy conditions that require the object identifier.
5. If SSE-C is required, explicitly enable it where blocked and provide the key over HTTPS. S3 does not keep that key.

| Option | Key control |
|---|---|
| SSE-S3 | S3 manages keys |
| SSE-KMS | KMS manages keys with key policies and auditing |
| DSSE-KMS | Two layers of server-side encryption with KMS keys |
| SSE-C | Caller supplies and retains the key |

### Exam cues

- If the question says S3 KMS request costs are high, think Bucket Keys, because a short-lived bucket-level key reduces calls to KMS.
- If the question says S3 uploads must explicitly request KMS encryption, think a bucket-policy deny for a missing or different encryption header, because a default is overridable.
- If the question says S3 encrypted objects must be shared across accounts, think a customer managed KMS key, because the AWS managed S3 key cannot support that sharing.

### Remember

- New uploads have base SSE-S3 encryption using AES-256 since January 2023; it cannot be disabled and adds no encryption charge.
- Bucket Keys can reduce KMS request costs by up to 99%; savings are not guaranteed for each workload. Existing objects require copying.
- Bucket Keys do not support DSSE-KMS.
- Since April 2026, SSE-C is blocked by default for new general purpose buckets and existing buckets in accounts without SSE-C objects. `PutBucketEncryption` with `BlockedEncryptionTypes: NONE` enables it.

> **Trap:** Default SSE-KMS does not require every caller to send a KMS header. A policy that requires that header also rejects an upload that would otherwise inherit the default.
