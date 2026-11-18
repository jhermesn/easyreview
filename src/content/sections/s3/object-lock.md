---
title: Object Lock
level: associate
order: 80
facts:
  - id: lock-worm
    text: S3 Object Lock uses write-once-read-many protection against deletion or overwrite of object
      versions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock
  - id: lock-versioning
    text: Object Lock requires S3 Versioning and protects individual versions rather than the object
      name.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock
  - id: lock-writes
    text: A protected version does not prevent new versions or delete markers from being added to the
      same key.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock
  - id: lock-governance
    text: Governance retention can be bypassed with s3:BypassGovernanceRetention and the
      x-amz-bypass-governance-retention:true request header.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-retention-modes
  - id: lock-compliance
    text: Compliance retention prevents any user, including root, from deleting the protected version or
      shortening its retention.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-retention-modes
  - id: lock-extend
    text: An authorized user can extend an object retention period.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-retention-periods
  - id: lock-legal
    text: A legal hold has no expiry and remains until a caller with s3:PutObjectLegalHold removes it.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-legal-holds
  - id: lock-independent
    text: Legal holds and retention periods are independent, and a version can have both.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-legal-holds
  - id: lock-default
    text: A bucket default retention duration can be specified in days or years and applies to new
      object versions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-retention-periods
  - id: lock-individual
    text: Explicit per-version retention settings override the bucket default for that version.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-retention-periods
  - id: lock-enable-existing
    text: Object Lock can be enabled on an existing bucket.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-configure.html#object-lock-configure
  - id: lock-permanent-setting
    text: After enabling Object Lock, it cannot be disabled and versioning cannot be suspended on that
      bucket.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-managing.html#object-lock-managing
  - id: lock-delete-response
    text: An ordinary DELETE of a protected object can succeed by adding a delete marker while the
      protected version remains locked.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html#object-lock-how-deletes-work
cards:
  - id: s3-019
    q: What distinguishes S3 Object Lock governance and compliance retention modes?
    a: Governance permits bypass with s3:BypassGovernanceRetention plus the bypass header. Compliance
      prevents even root from deleting the protected version or shortening retention. Both protect
      individual versions in a versioning-enabled bucket.
    facts:
      - lock-governance
      - lock-compliance
      - lock-versioning
  - id: s3-020
    q: An S3 audit has no known end date. Which Object Lock control keeps selected versions protected
      until an authorized person releases them?
    a: A legal hold. It has no expiry and requires s3:PutObjectLegalHold to remove. It is independent of
      a retention period, so both can protect the same version.
    facts:
      - lock-legal
      - lock-independent
  - id: s3-032
    q: An S3 backup must resist deletion by a compromised administrator, including root, for a fixed
      retention period. What design fits?
    a: Object Lock compliance mode with versioning and a bucket default retention for the required
      period. Compliance retention cannot be shortened by root.
    facts:
      - lock-compliance
      - lock-versioning
      - lock-default
  - id: s3-055
    q: An S3 version protected by Object Lock disappears from ordinary GET requests after a successful
      DELETE. Was the locked data removed?
    a: Not necessarily. A DELETE without a version ID can add a delete marker while leaving the
      protected version intact.
    trap: true
    facts:
      - lock-delete-response
      - lock-writes
  - id: s3-056
    q: An S3 team enabled Object Lock on an existing bucket and wants to suspend versioning. Is this
      supported?
    a: No. Once Object Lock is enabled, it cannot be disabled and versioning cannot be suspended.
    trap: true
    facts:
      - lock-enable-existing
      - lock-permanent-setting
---
S3 Object Lock prevents protected object versions from being overwritten or deleted. Its write-once-read-many model means data can be read repeatedly while the saved version remains protected.

### How it works

1. Enable Object Lock and versioning. You can enable Object Lock on an existing bucket, but cannot later disable it or suspend versioning.
2. Choose a retention mode. Governance allows an explicit authorized bypass; compliance protects the version even from the root user.
3. Apply a bucket default in days or years, or explicit retention to individual versions. Individual settings override the default for that version.
4. Use a legal hold when the release date is unknown. Removing a hold does not remove an independent retention period.
5. Keep the version ID for recovery. A new write or ordinary delete can change what an ordinary read sees while leaving the locked version protected.

| Control | Release condition |
|---|---|
| Governance retention | Expiry or authorized explicit bypass |
| Compliance retention | Retention expiry; no user bypass |
| Legal hold | Explicit removal by an authorized caller |

### Exam cues

- If the question says even the S3 account root user must not delete a backup version during retention, think compliance mode, because it has no governance-style bypass.
- If the question says S3 audit data must remain locked until an investigator releases it, think legal hold, because it has no expiry.
- If the question says a successful S3 delete appears to defeat Object Lock, think delete marker, because hiding a key does not delete its protected version.

### Remember

- Governance bypass needs both `s3:BypassGovernanceRetention` and the explicit bypass header.
- Retention can be extended; compliance retention cannot be shortened.
- Legal hold removal requires `s3:PutObjectLegalHold`.

> **Trap:** Object Lock protects versions, so it does not prevent another version or delete marker from becoming current.
