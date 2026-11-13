---
title: Vault Lock and air-gapped vaults
level: professional
order: 50
facts:
  - id: lock-purpose
    text: AWS Backup Vault Lock enforces write-once, read-many retention by rejecting early recovery
      point deletion and lifecycle changes.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html#backup-vault-lock-benefits
  - id: governance-removal
    text: A governance-mode vault lock can be removed by a user with sufficient IAM permissions.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html#backup-vault-lock-modes
  - id: compliance-lock
    text: After compliance grace time ends, no user or AWS can remove the lock; recovery points remain
      until their lifecycle completes.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html#backup-vault-lock-modes
  - id: grace-minimum
    text: Compliance-mode Vault Lock requires at least 3 days of grace time before the lock becomes
      immutable.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html#lock-backup-vault-console
  - id: grace-configuration
    text: ChangeableForDays selects compliance mode; omitting it selects governance mode.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html#lock-backup-vault-cli
  - id: retention-check
    text: Vault Lock retention bounds reject new backup and copy jobs with incompatible retention, but
      do not change existing recovery point lifecycles.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html#lock-backup-vault-console
  - id: empty-vault
    text: A compliance-locked vault can be deleted when it contains no recovery points.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html#backup-vault-lock-modes
  - id: air-gap-lock
    text: A logically air-gapped vault has compliance-mode Vault Lock built in.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/logicallyairgappedvault.html#lag-overview
  - id: air-gap-key
    text: Logically air-gapped vaults use an AWS owned encryption key by default and optionally support
      a customer managed KMS key.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/logicallyairgappedvault.html#lag-overview
  - id: air-gap-sharing
    text: AWS RAM can share a logically air-gapped vault with other accounts, including accounts outside
      the organization, for direct restores.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/logicallyairgappedvault.html#lag-overview
  - id: air-gap-storage
    text: Logically air-gapped vault backups are stored in an AWS Backup service-owned account.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/logicallyairgappedvault.html#lag-overview
diagrams:
  - id: backup-air-gap-sharing
    title: Share protected backups for a direct restore
    width: 1000
    height: 230
    nodes:
      - id: vault
        label: Air-gapped vault
        sub: Compliance locked
        icon: backup
        x: 25
        y: 90
        w: 250
        h: 86
        tone: storage
        info: Backups reside in a service-owned account and the vault has compliance-mode lock built in.
      - id: share
        label: Resource share
        sub: AWS RAM
        icon: resource-access-manager
        x: 375
        y: 90
        w: 250
        h: 86
        tone: security
        info: Grant a receiving account access, including an account outside the organization.
      - id: restore
        label: Restore job
        sub: Receiving account
        icon: backup
        x: 725
        y: 90
        w: 250
        h: 86
        tone: storage
        info: Restore from the shared vault without first copying into the receiving account.
    edges:
      - from: vault
        to: share
        step: 1
        label: share
      - from: share
        to: restore
        step: 2
        label: restore
    steps:
      - Share the logically air-gapped vault through AWS RAM.
      - The receiving account restores from the shared recovery point.
cards:
  - id: backup-007
    q: How do governance and compliance modes differ in AWS Backup Vault Lock?
    a: Governance locks can be removed by authorized users. Compliance locks become immutable after
      grace time of at least 3 days; backups remain protected until their lifecycle completes.
    trap: true
    facts:
      - governance-removal
      - compliance-lock
      - grace-minimum
  - id: backup-008
    q: What protects an AWS Backup logically air-gapped vault, and how can another account restore from
      it?
    a: Built-in compliance-mode Vault Lock and encryption with an AWS owned key by default. AWS RAM
      sharing allows another account to restore directly; a customer managed key is optional.
    facts:
      - air-gap-lock
      - air-gap-key
      - air-gap-sharing
  - id: backup-012
    q: An AWS Backup design must reject early backup deletion even by privileged users. Which Vault Lock
      mode should it use?
    a: Compliance mode after its grace time expires. Governance mode remains removable by users with
      sufficient IAM permissions.
    facts:
      - compliance-lock
      - governance-removal
  - id: backup-028
    q: A team needs to restore AWS Backup data from an account outside its organization without first
      copying recovery points. Which vault can provide this?
    a: A logically air-gapped vault shared through AWS RAM. Its sharing supports receiving accounts
      outside the organization.
    facts:
      - air-gap-sharing
  - id: backup-029
    q: Do new AWS Backup Vault Lock retention bounds rewrite the retention of existing recovery points?
    a: No. Existing recovery points keep their lifecycle. Incompatible new backup or copy jobs fail.
    trap: true
    facts:
      - retention-check
---

Vault Lock protects AWS Backup recovery points against early deletion or lifecycle changes. Its write-once, read-many model means backups remain readable while their retention period, the time they must be kept, is enforced.

### How it works

1. Select governance mode for a lock that authorized users can remove, or compliance mode for an immutable lock after grace time.
2. For compliance mode, set `ChangeableForDays` to give at least 3 days to review the configuration. Omitting that parameter selects governance mode.
3. Set retention bounds. Incompatible new backup and copy jobs fail. Existing recovery points keep their lifecycle settings.
4. For protected backups with direct sharing, use a logically air-gapped vault. It includes compliance-mode lock and stores backups in an AWS Backup service-owned account.
5. Share that vault using AWS RAM, which grants other accounts access to the shared resource. Receiving accounts can restore directly, including accounts in another organization.

| Protection | Lock removal | Recovery path |
|---|---|---|
| Standard vault, governance | Authorized users can remove the lock | Standard restore or copy workflow |
| Standard vault, compliance | Immutable after grace time | Standard restore or copy workflow |
| Logically air-gapped vault | Compliance-mode lock built in | Direct restore through RAM sharing |

### Exam cues

- If the question says privileged users must not delete backups early, think compliance mode after grace time, because a governance lock can be removed.
- If the question says another organization must restore directly, think a RAM-shared logically air-gapped vault, because it supports that sharing path.
- If the question says new copy jobs fail after retention bounds are added, think lifecycle mismatch, because Vault Lock rejects incompatible new jobs.

### Remember

- Compliance grace time is at least 3 days.
- A logically air-gapped vault defaults to an AWS owned key; a customer managed key is optional.
- A compliance-locked standard vault can be deleted when empty.

> **Trap:** Adding retention bounds does not lengthen the lifecycle of backups already in the vault. Existing recovery points keep their original lifecycle.
