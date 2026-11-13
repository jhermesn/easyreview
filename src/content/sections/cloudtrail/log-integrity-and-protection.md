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
  - id: validation-gap
    text: Disabling validation breaks the digest chain after one hour, and CloudTrail does not create digests for files delivered while validation was disabled.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_CreateTrail.html#awscloudtrail-CreateTrail-request-EnableLogFileValidation
  - id: cli-validation
    text: The validate-logs CLI command checks digest files and referenced log files for modification or
      deletion.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-cli.html#cloudtrail-log-file-validation-cli
  - id: cli-original
    text: AWS CLI validation requires online access, read permission and log and digest files in their
      original S3 locations; it checks only logs referenced by digests.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-cli.html#cloudtrail-log-file-validation-cli
  - id: cli-parameters
    text: validate-logs requires trail-arn and start-time; organization trails also require account-id,
      and region selects the Region being validated.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-cli.html#cloudtrail-log-file-validation-cli
  - id: invalid-digest
    text: An invalid signature, modified or missing digest, or missing log file is a validation failure
      and does not establish log integrity for affected files.
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
  - id: cloudtrail-017
    q: CloudTrail validate-logs reports an invalid or missing digest. Can the affected log files be
      treated as proven unchanged?
    a: No. The affected integrity evidence failed. The CLI checks only digest-referenced logs and
      requires the original S3 locations.
    trap: true
    facts:
      - invalid-digest
      - cli-original
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
  - id: cloudtrail-036
    q: An auditor validates one member account's CloudTrail organization logs using the CLI. What
      additional selector is required?
    a: Pass --account-id for that member account, along with --trail-arn and --start-time. Use --region
      for the Region being validated.
    facts:
      - cli-parameters
  - id: cloudtrail-049
    q: A team disables CloudTrail log file integrity validation for a week and then reenables it. Can it validate the gap with newly generated digests?
    a: No. CloudTrail does not create digests for files delivered while validation was disabled; the digest chain breaks after one hour.
    trap: true
    facts:
      - validation-gap
      - cli-original
---
CloudTrail log file integrity validation gives auditors evidence that delivered files stayed unchanged. A hash is a fingerprint calculated from file contents. A signed digest is an index of those fingerprints whose signature can be checked. It acts as a tamper-evident seal on the archive. [AWS integrity validation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro)

### How it works

1. Enable integrity validation. CloudTrail calculates a SHA-256 hash for each delivered log file.
2. Each hour, CloudTrail delivers a digest containing log references and hashes in a separate folder of the same bucket. It signs the digest using SHA-256 with RSA and links it to the previous digest signature.
3. Validate separately. `validate-logs` checks the digests and the log files they reference. The CLI requires connectivity, read access and files in their original S3 locations.
4. Apply storage protection as well. S3 Object Lock retains object versions using a write-once-read-many model, meaning a retained version cannot be overwritten or deleted under its protection. Retention periods and legal holds control how long protection applies. [CLI validation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-cli.html#cloudtrail-log-file-validation-cli) · [Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock)

### Exam cues

- If the question says prove audit files were not altered, think integrity validation followed by `validate-logs`, because signed digests provide the evidence the validator checks.
- If the question says prevent permanent deletion of retained versions, think S3 Object Lock, because a digest supplies detection evidence rather than a storage lock.
- If the question says the CLI cannot validate moved files, think original S3 location, because the CLI requires files where CloudTrail delivered them.

### Remember

- Hash: SHA-256. Digest signature: SHA-256 with RSA. Digest delivery: hourly.
- Enabling digest delivery and running validation are separate actions.
- Disabling validation breaks the digest chain after one hour; files delivered while it is disabled do not receive digests.
- `validate-logs` requires `--trail-arn` and `--start-time`; organization trails also need `--account-id`. Select the validation Region with `--region`.
- MFA Delete adds protection for digest files. [AWS storage guidance](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html#cloudtrail-log-file-validation-intro)

> **Trap:** An invalid or missing digest does not prove that every log was altered, but it prevents establishing integrity from that failed evidence. Investigate the reported failure.
