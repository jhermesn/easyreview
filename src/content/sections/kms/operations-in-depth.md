---
title: "PLACEHOLDER kms/operations-in-depth"
level: professional
order: 80
facts:
  - id: context-match
    text: Decrypting a ciphertext or encrypted data key requires the same encryption context used during
      encryption, with exact case-sensitive matching.
    source: https://docs.aws.amazon.com/kms/latest/APIReference/API_GenerateDataKey.html
  - id: logs-context
    text: CloudWatch Logs uses the log-group ARN in encryption context, referenced by
      kms:EncryptionContext:aws:logs:arn policy conditions.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/encrypt-log-data-kms.html
  - id: admin-use
    text: The console key-administrator statement grants management actions, not cryptographic use.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#key-policy-default-allow-administrators
  - id: admin-escalation
    text: Key administrators able to change policy or create grants can give themselves or others key-use
      permissions.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-default.html#key-policy-default-allow-administrators
  - id: grant-purpose
    text: A grant gives a grantee specified allowed operations on one KMS key without editing key or IAM policies.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/grants.html#grants
  - id: grant-allow
    text: Grants can allow access but cannot deny access.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/grants.html#grants
  - id: grant-lifecycle
    text: Authorized callers remove grant permissions by retiring or revoking the grant.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/grants.html#grants
  - id: grant-token
    text: Grant changes propagate with eventual consistency; a grant token allows immediate use of newly granted
      permissions.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/grants.html#grants
  - id: rotation-id
    text: Rotation within a KMS key preserves its key ID, ARN, policies, and permissions.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-enable.html#rotating-keys-enable
  - id: rotation-history
    text: ListKeyRotations reports completed rotations.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-on-demand.html#rotating-keys-on-demand
  - id: material-date
    text: The rotation date in key material history identifies when that material became current, distinct from
      creating a new logical key.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/list-rotations.html
  - id: manual-new-key
    text: Manual rotation creates a new KMS key and redirects applications or aliases to it.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys-manually.html
  - id: demand-import
    text: Imported symmetric material must be staged in Pending rotation state before on-demand rotation.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-on-demand.html#rotate-on-demand-console
  - id: demand-eligible
    text: On-demand rotation supports symmetric encryption customer managed keys with AWS_KMS or imported EXTERNAL
      material.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html#rotate-keys-how-it-works
  - id: imported-date
    text: On-demand rotation of imported symmetric key material was introduced in June 2025.
    source: https://aws.amazon.com/about-aws/whats-new/2025/06/aws-kms-on-demand-key-rotation-imported-keys/
  - id: demand-schedule
    text: On-demand rotation works with automatic rotation disabled and does not change an existing automatic
      rotation schedule.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/rotating-keys-on-demand.html#rotating-keys-on-demand
  - id: mrk-import-material
    text: For EXTERNAL-origin keys, import the same material into each replica independently; KMS synchronizes
      material identifiers rather than the material.
    source: https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html#mrk-sync-properties
cards:
  - id: kms-018
    q: An application has AWS KMS decrypt permission but changed the letter case of the encryption context used
      with its encrypted data key. Can decryption succeed?
    a: No. The encryption context must match exactly, including case.
    trap: true
    facts:
      - context-match
  - id: kms-021
    q: A team must restrict a CloudWatch Logs KMS key to a specific log group. Which encryption-context value
      identifies the group?
    a: The log group ARN, referenced in a `kms:EncryptionContext:aws:logs:arn` policy condition.
    facts:
      - logs-context
  - id: kms-003
    q: Does the AWS KMS console default key-administrator statement allow cryptographic key use?
    a: No. It grants management actions. Administrators with policy-edit or grant-creation permissions can still
      give themselves use permissions, so this separation is not a security boundary against those
      administrators.
    trap: true
    facts:
      - admin-use
      - admin-escalation
  - id: kms-004
    q: What is an AWS KMS grant and how can a new grant be used immediately?
    a: A grant allows specified operations on one key for a grantee. It cannot deny access and can be retired or
      revoked. Use its grant token before the permission change has propagated.
    facts:
      - grant-purpose
      - grant-allow
      - grant-lifecycle
      - grant-token
  - id: kms-023
    q: A custom AWS KMS rotation-age check uses only key creation date. What does it miss after automatic
      rotation?
    a: Material can rotate while the key ID stays unchanged. Inspect rotation history and material rotation dates,
      and treat manual replacement as a new logical key.
    facts:
      - rotation-id
      - rotation-history
      - material-date
      - manual-new-key
  - id: kms-024
    q: A team imported new symmetric AWS KMS material and needs to activate it without changing the key ARN. Which
      operation fits?
    a: Stage the new material in Pending rotation state, then perform on-demand rotation. Imported symmetric keys
      gained this support in June 2025.
    facts:
      - demand-import
      - demand-eligible
      - rotation-id
      - imported-date
  - id: kms-025
    q: Does an AWS KMS on-demand rotation reset the next automatic rotation date?
    a: No. It leaves the existing automatic schedule unchanged and is available even when automatic rotation is
      disabled.
    trap: true
    facts:
      - demand-schedule
  - id: kms-028
    q: A team replicates an AWS KMS key with imported material and finds the new replica lacks usable material.
      What must it do?
    a: Import the same material into that replica. KMS synchronizes material identifiers but does not transport
      EXTERNAL-origin material.
    facts:
      - mrk-import-material
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
