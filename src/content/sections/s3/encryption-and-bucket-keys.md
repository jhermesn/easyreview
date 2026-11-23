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
    text: "Turning on Bucket Keys for a bucket does not change existing objects. For eligible SSE-KMS objects, UpdateObjectEncryption enables a Bucket Key without copying object data."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/update-sse-encryption.html
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
  - id: sse-s3-unique-key
    text: "SSE-S3 encrypts each object with its own unique key and encrypts that key with a root key that S3 rotates regularly."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html#UsingServerSideEncryption
  - id: client-side
    text: "Client-side encryption encrypts data before it is sent to S3, for example with the Amazon S3 Encryption Client, so S3 only ever stores ciphertext and never sees the keys."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingClientSideEncryption.html#UsingClientSideEncryption
  - id: sse-kms-permissions
    text: "Uploading an SSE-KMS object needs kms:GenerateDataKey on the key and downloading it needs kms:Decrypt, so S3 access alone does not let someone read the data."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html#UsingKMSEncryption
  - id: kms-same-region
    text: "With SSE-KMS, the KMS key must be in the same AWS Region as the S3 bucket."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html
  - id: bucket-key-audit
    text: "S3 Bucket Keys reduce the number of KMS CloudTrail records for SSE-KMS objects because S3 reuses temporary key material instead of contacting KMS for every request."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html#bucket-key-cloudtrail
  - id: aws-managed-s3-key
    text: "SSE-KMS can use the AWS managed key aws/s3 when no customer managed key is supplied."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html#sse-kms-cross-account-operations
  - id: default-encryption-existing
    text: "Setting bucket default encryption leaves the encryption of objects already stored in the bucket unchanged."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html
  - id: client-wrapping-key
    text: "The Amazon S3 Encryption Client supports wrapping keys including AWS KMS keys and raw AES or RSA keys, subject to client language support."
    source: https://docs.aws.amazon.com/amazon-s3-encryption-client/latest/developerguide/concepts.html
  - id: sse-s3-header
    text: "An S3 upload can explicitly request SSE-S3 with the x-amz-server-side-encryption header set to AES256."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/specifying-s3-encryption.html
  - id: sse-c-headers
    text: "SSE-C uses customer algorithm, customer key and customer key MD5 request headers."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/specifying-s3-c-encryption.html
  - id: explicit-sse-s3-policy
    text: "An S3 bucket policy can require an explicit SSE-S3 request header, rejecting uploads that omit it even when bucket default encryption is enabled."
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
  - id: aws-managed-key-rotation
    text: "AWS KMS automatically rotates AWS managed key material every year."
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html
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
    q: "An Amazon S3 bucket uses SSE-KMS. What do Bucket Keys change, and how can existing eligible objects use them?"
    a: "Bucket Keys reduce KMS calls, with up to 99% request-cost savings. UpdateObjectEncryption can enable them on existing eligible SSE-KMS objects without copying. The context becomes the bucket ARN; DSSE-KMS is unsupported."
    facts: [bucket-key-cost, bucket-key-cost-saving, bucket-key-context, bucket-key-existing, bucket-key-dsse]
  - id: s3-016
    q: An S3 bucket must reject uploads that do not explicitly request SSE-KMS. What enforces this?
    a: A bucket-policy deny on PutObject when s3:x-amz-server-side-encryption is not aws:kms. Default
      encryption alone can be overridden. A strict header requirement also rejects uploads that omit
      the header.
    facts:
      - kms-upload-policy
      - kms-default-override
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
  - id: s3-151
    q: "Data must be encrypted with a company-specific algorithm and keys before AWS ever receives it. Which S3 encryption option fits?"
    a: "Client-side encryption. The client encrypts the data before upload, so S3 stores only ciphertext. SSE-S3, SSE-KMS and SSE-C all encrypt on the S3 side with AES-256."
    facts: [client-side]
  - id: s3-152
    q: "With SSE-S3, does every object in a bucket share one encryption key?"
    a: "No. Each object gets its own unique key, and S3 encrypts those keys with a root key that it rotates regularly."
    facts: [sse-s3-unique-key]
  - id: s3-167
    q: "S3 administrators must manage a bucket of SSE-KMS objects without being able to read the data. How?"
    a: "Give them S3 permissions but no kms:Decrypt on the KMS key. Reading an SSE-KMS object needs both S3 access and kms:Decrypt."
    facts: [sse-kms-permissions]
  - id: s3-174
    q: "A bucket in eu-west-1 must use SSE-KMS with a customer managed key that lives in us-east-1. Will that work?"
    a: "No. The KMS key must be in the **same Region as the bucket**. Use a KMS key in eu-west-1."
    trap: true
    facts: [kms-same-region]
  - id: s3-175
    q: "An Amazon S3 audit sees fewer AWS KMS CloudTrail records after Bucket Keys are enabled for SSE-KMS. What explains the change?"
    a: "Bucket Keys reduce calls to KMS, so fewer corresponding KMS events appear in CloudTrail."
    facts: [bucket-key-audit]
  - id: s3-177
    q: "An Amazon S3 application needs SSE-KMS within one account without creating a customer managed key. Which key can it use?"
    a: "The AWS managed KMS key aws/s3."
    facts: [aws-managed-s3-key]
  - id: s3-178
    q: "An Amazon S3 bucket changes its default encryption to SSE-KMS. Does that change objects already stored there?"
    a: "No. Existing objects keep their encryption settings; changing the default does not update them."
    facts: [default-encryption-existing]
  - id: s3-222
    q: "Which wrapping keys can the Amazon S3 Encryption Client use?"
    a: "AWS KMS keys or raw AES or RSA keys, subject to client language support."
    facts: [client-wrapping-key]
  - id: s3-226
    q: "Which request header value explicitly selects SSE-S3 for an Amazon S3 upload?"
    a: "Set x-amz-server-side-encryption to AES256."
    facts: [sse-s3-header]
  - id: s3-227
    q: "Which request headers identify an SSE-C key in an Amazon S3 request?"
    a: "The customer algorithm, customer key and customer key MD5 headers."
    facts: [sse-c-headers]
  - id: s3-228
    q: "Why might an Amazon S3 upload fail when default SSE-S3 encryption is enabled?"
    a: "A bucket policy can require an explicit SSE-S3 header and deny requests that omit it."
    facts: [explicit-sse-s3-policy]
  - id: s3-229
    q: "How often does AWS KMS rotate AWS managed key material used with Amazon S3?"
    a: "Every year. S3 describes its SSE-S3 root key rotation as regular."
    facts: [aws-managed-key-rotation, sse-s3-unique-key]
---
S3 server-side encryption protects object data at rest, meaning while stored on disk. S3 encrypts data during storage and decrypts it for authorized reads; the encryption option determines who controls the keys.

### How it works

1. Choose S3-managed keys for the base encryption behavior or AWS Key Management Service (KMS) keys for key access control and auditing. Previously unencrypted objects need a separate copy operation to encrypt them.
2. Use a customer managed KMS key when sharing SSE-KMS objects across accounts. The AWS managed S3 key cannot provide that cross-account sharing.
3. Set bucket default encryption for uploads without explicit encryption settings. Enforce strict requirements with a bucket-policy deny, because request settings can override the default.
4. Enable Bucket Keys for SSE-KMS request savings. Existing eligible SSE-KMS objects can use `UpdateObjectEncryption` to enable Bucket Keys without a data copy. Fewer KMS calls also mean fewer KMS CloudTrail events.
5. If SSE-C is required, provide the key over HTTPS. S3 does not keep that key.

| Option | Key control |
|---|---|
| SSE-S3 | S3 manages keys |
| SSE-KMS | KMS manages keys with key policies and auditing |
| DSSE-KMS | Two layers of server-side encryption with KMS keys |
| SSE-C | Caller supplies and retains the key |

### Exam cues

- If the question asks about rotation of AWS managed KMS keys, think annual rotation, because KMS rotates their key material every year.
- If the question says uploads fail despite default SSE-S3 encryption, think a policy requiring the explicit header, because a request without it is denied.
- If the question says an S3 request supplies its own encryption key, think SSE-C customer algorithm, key and key MD5 headers.
- If the question says explicitly request SSE-S3 on upload, think the encryption header with AES256, because that value selects SSE-S3.
- If the question says encrypt before sending to S3 with a local key or KMS key, think the S3 Encryption Client, because it supports both types with language-specific limitations.
- If the question says S3 KMS request costs are high, think Bucket Keys, because a short-lived bucket-level key reduces calls to KMS.
- If the question says S3 uploads must explicitly request KMS encryption, think a bucket-policy deny for a missing or different encryption header, because a default is overridable.
- If the question says S3 encrypted objects must be shared across accounts, think a customer managed KMS key, because the AWS managed S3 key cannot support that sharing.

### Remember

- Changing bucket default encryption leaves existing objects unchanged.
- SSE-KMS can use the AWS managed `aws/s3` key; cross-account sharing requires a customer managed key.
- New uploads have base SSE-S3 encryption using AES-256 since January 2023; it cannot be disabled and adds no encryption charge.
- Bucket Keys can reduce KMS request costs by up to 99%; savings are not guaranteed for each workload.
- Bucket Keys do not support DSSE-KMS.

> **Trap:** Default SSE-KMS does not require every caller to send a KMS header. A policy that requires that header also rejects an upload that would otherwise inherit the default.
