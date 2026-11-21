---
title: Log integrity and protection
level: associate
order: 50
facts:
  - id: integrity-purpose
    text: CloudTrail log file integrity validation detects modification or deletion after delivery.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro
  - id: hash-algorithm
    text: CloudTrail integrity validation uses SHA-256 hashes for log files.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro
  - id: digest-delivery
    text: CloudTrail delivers a digest file each hour containing references and hashes for delivered log
      files.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro
  - id: digest-signature
    text: CloudTrail signs digests using SHA-256 with RSA, and each digest includes the previous digest
      signature when one exists.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro
  - id: digest-location
    text: Digest files arrive in the same S3 bucket as logs but in a separate folder.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro
  - id: validation-separate
    text: Enabling integrity validation creates digest files but does not itself validate delivered
      files.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro
  - id: cli-validation
    text: The validate-logs CLI command checks digest files and referenced log files for modification or
      deletion.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-cli.html#cloudtrail-log-file-validation-cli
  - id: object-lock
    text: S3 Object Lock uses write-once-read-many storage to protect object versions against deletion
      or overwrite for a retention period or legal hold.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock
  - id: mfa-delete
    text: AWS recommends S3 MFA Delete as an additional security measure for stored CloudTrail digest
      files.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro
cards:
  - id: cloudtrail-015
    q: How can auditors detect whether CloudTrail files changed after delivery?
    a: Enable log file integrity validation, retain hourly signed digests, then run validate-logs. Log
      hashes use SHA-256 and digest signatures use SHA-256 with RSA.
    facts:
      - integrity-purpose
      - hash-algorithm
      - digest-delivery
      - digest-signature
      - cli-validation
  - id: cloudtrail-016
    q: Does enabling CloudTrail integrity validation stop audit log deletion?
    a: No. It provides evidence for detecting changes or deletion. Protect stored versions separately
      with S3 Object Lock retention or legal holds.
    trap: true
    facts:
      - integrity-purpose
      - object-lock
  - id: cloudtrail-022
    q: An audit archive needs tamper detection and protection against permanent deletion of stored
      CloudTrail versions. Which controls address both needs?
    a: Use integrity validation with validate-logs for detection, and S3 Object Lock retention or legal
      holds for version protection.
    facts:
      - integrity-purpose
      - cli-validation
      - object-lock
  - id: cloudtrail-035
    q: A team enables CloudTrail integrity validation but never runs a validator. Has CloudTrail already
      validated its archive?
    a: No. Enabling the feature delivers digest files. Validate the files separately with the CLI or a
      custom validator.
    trap: true
    facts:
      - validation-separate
      - cli-validation
---
CloudTrail log file integrity validation gives auditors evidence that delivered files stayed unchanged. A hash is a fingerprint calculated from file contents. A signed digest is an index of those fingerprints whose signature can be checked. It acts as a tamper-evident seal on the archive.

### How it works

1. Enable integrity validation. CloudTrail calculates a SHA-256 hash for each delivered log file.
2. Each hour, CloudTrail delivers a digest containing log references and hashes in a separate folder of the same bucket. It signs the digest using SHA-256 with RSA and links it to the previous digest signature.
3. Validate separately. `validate-logs` checks the digests and the log files they reference.
4. Apply storage protection as well. S3 Object Lock retains object versions using a write-once-read-many model, meaning a retained version cannot be overwritten or deleted under its protection. Retention periods and legal holds control how long protection applies. CLI validation · Object Lock

### Exam cues

- If the question says prove audit files were not altered, think integrity validation followed by `validate-logs`, because signed digests provide the evidence the validator checks.
- If the question says prevent permanent deletion of retained versions, think S3 Object Lock, because a digest supplies detection evidence rather than a storage lock.
- If the question says validation was enabled but no validator ran, think separate validation, because digest delivery alone does not validate the files.

### Remember

- Hash: SHA-256. Digest signature: SHA-256 with RSA. Digest delivery: hourly.
- Enabling digest delivery and running validation are separate actions.
- MFA Delete adds protection for digest files.

> **Trap:** Integrity validation detects changes or deletion; it does not prevent deletion. Use storage protection as well.
