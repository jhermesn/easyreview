---
title: Log encryption and data protection
level: associate
order: 100
facts:
  - id: logs-encryption
    text: CloudWatch Logs encrypts stored log data by default with AES-GCM.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
  - id: kms-symmetric
    text: CloudWatch Logs log group encryption supports only symmetric KMS keys.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
  - id: kms-service
    text: The KMS key policy must allow the regional CloudWatch Logs service principal,
      logs.<region>.amazonaws.com, to use the key.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
  - id: kms-context
    text: The kms:EncryptionContext:aws:logs:arn condition can restrict key use to a specific log group.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
  - id: kms-new
    text: Associating a KMS key encrypts newly ingested data with that key; older data retains its
      original encryption.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
  - id: kms-delay
    text: Associating or disassociating a KMS key can take up to 5 minutes to take effect.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
  - id: kms-console
    text: Associating a KMS key with an existing log group requires the CLI or API rather than the
      CloudWatch console.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
  - id: kms-access
    text: Disabling or deleting a key, or revoking CloudWatch Logs access to it, prevents reading data
      encrypted with that key.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
  - id: kms-disassociate
    text: Disassociating a key does not remove the need for that key to read older data encrypted with
      it.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html#encrypt-log-data-kms
  - id: mask-policy
    text: Data protection policies can apply at account or log group level and detect sensitive data at
      ingestion.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html#mask-sensitive-log-data
  - id: mask-egress
    text: Selected sensitive data is masked at egress points including Logs Insights, metric filters,
      and subscriptions; logs:Unmask permits viewing originals.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html#mask-sensitive-log-data
  - id: mask-history
    text: A data protection policy does not mask events ingested before the policy existed.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html#mask-sensitive-log-data
  - id: envelope
    text: The AWS Encryption SDK encrypts application data with a data key and stores encrypted copies
      of that data key with the encrypted message.
    source: https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/how-it-works.html
  - id: client-encryption
    text: The AWS Encryption SDK encrypts data in the application before sending it to a service, while
      server-side encryption happens after receipt.
    source: https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/introduction.html
  - id: transport
    text: CloudWatch API communication uses TLS to protect data in transit.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/infrastructure-security.html#infrastructure-security
cards:
  - id: cloudwatch-019
    q: What key and policy does a CloudWatch Logs group need for customer managed KMS encryption?
    a: A symmetric KMS key whose policy permits the regional logs.<region>.amazonaws.com service
      principal. Associate it with the log group; newly ingested data uses it. Disabled or deleted
      keys make their encrypted logs unreadable.
    facts:
      - kms-symmetric
      - kms-service
      - kms-new
      - kms-access
  - id: cloudwatch-020
    q: A CloudWatch Logs group already exists. How can operators associate a KMS key and restrict it to
      that group?
    a: Use the CLI or API, such as associate-kms-key; the console cannot associate a key with an
      existing group. Scope key use with kms:EncryptionContext:aws:logs:arn. Allow up to 5 minutes
      for the change.
    facts:
      - kms-console
      - kms-context
      - kms-delay
  - id: cloudwatch-021
    q: An application already sends sensitive fields to CloudWatch Logs. How can operators mask them in
      future query and subscription output without changing application code?
    a: Apply a data protection policy. It detects selected data at ingestion and masks it at egress.
      logs:Unmask permits viewing originals. Events ingested before the policy remain unmasked.
    facts:
      - mask-policy
      - mask-egress
      - mask-history
  - id: cloudwatch-029
    q: A security requirement says sensitive log fields must be encrypted before leaving the
      application. Does CloudWatch log group KMS encryption satisfy it?
    a: No. Use client-side encryption such as the AWS Encryption SDK before sending data. Envelope
      encryption encrypts the payload with a data key and includes encrypted copies of that key.
      Server-side log group encryption starts after receipt.
    trap: true
    facts:
      - client-encryption
      - envelope
  - id: cloudwatch-045
    q: An operator associates a customer managed KMS key with a CloudWatch log group. Does it re-encrypt
      historical events?
    a: No. Only newly ingested data uses the associated key. Association can take up to 5 minutes. Keep
      older keys available for data already encrypted with them.
    trap: true
    facts:
      - kms-new
      - kms-delay
      - kms-disassociate
  - id: cloudwatch-071
    q: A team disassociates its KMS key from CloudWatch Logs and then disables the key. Can it still
      read older logs encrypted under that key?
    a: No. Disassociation does not re-encrypt existing data. CloudWatch still needs access to the old
      key to decrypt those logs.
    trap: true
    facts:
      - kms-disassociate
      - kms-access
---
CloudWatch Logs encrypts stored events by default. A customer managed KMS key gives you control over the encryption key; a data protection policy controls which sensitive fields appear in output.

### How it works

1. For customer managed encryption, choose a symmetric key, one that uses the same secret for encryption and decryption. Its policy must permit the regional `logs.<region>.amazonaws.com` service identity.
2. Restrict key use to the log group with `kms:EncryptionContext:aws:logs:arn`. Associate the key through the API or CLI for an existing group.
3. Allow up to 5 minutes for association to take effect. Newly ingested events use that key; existing events keep their original encryption.
4. To hide sensitive fields in output, apply a data protection policy. It detects data at ingestion and masks it when it leaves through queries, metric filters, or subscriptions. `logs:Unmask` permits viewing originals.
5. If encryption must happen before submission, encrypt in the application. Envelope encryption uses a data key for the payload and stores encrypted copies of that key with the message.

| Requirement | Mechanism | Where it applies |
| --- | --- | --- |
| Protect API traffic | TLS, encryption over the network | In transit |
| Control stored log encryption keys | Symmetric customer managed KMS key | Newly ingested stored data |
| Hide sensitive fields in output | Data protection policy | Detected events after policy creation |
| Encrypt before leaving the application | Client-side encryption | Application, before service receipt |

### Exam cues

- If the question says use a customer managed key for stored logs, think KMS association and key policy, because the service needs permission to use that key.
- If the question says hide sensitive output without changing the app, think data protection policy, because masking applies at egress.
- If the question says encrypt before transmission to CloudWatch, think client-side envelope encryption, because storage encryption happens after receipt.

### Remember

- Stored logs use AES-GCM by default. Customer managed log group keys must be symmetric.
- Existing group key association requires CLI or API and can take up to 5 minutes.
- Masking policies do not cover events ingested before policy creation.
- Disassociating a key does not remove the need to decrypt older data with it.

> **Trap:** Disabling, deleting, or revoking access to a KMS key can make retained logs unreadable. Disassociation does not re-encrypt that history.
