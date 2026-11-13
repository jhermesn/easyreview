---
title: Cross-account copies
level: professional
order: 30
facts:
  - id: copy-organization
    text: Standard cross-account backup copies require source and destination accounts in the same AWS
      Organizations organization.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html
  - id: copy-enabled
    text: Only the Organizations management account can enable or disable AWS Backup cross-account
      backup.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html#prereq-cab
  - id: copy-role-permissions
    text: The source copy role needs backup:CopyFromBackupVault and backup:CopyIntoBackupVault in its
      identity policy.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html#prereq-cab
  - id: copy-vault-policy
    text: The destination vault resource policy must allow backup:CopyIntoBackupVault for the source
      caller.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html#prereq-cab
  - id: source-key-sharing
    text: A customer managed key encrypting the source resource must allow the destination account to
      use it for a cross-account copy.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html
  - id: destination-key
    text: For fully managed resource types, the destination may use aws/backup or a customer managed
      key; other resource types require a customer managed key for cross-account copies.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html
  - id: managed-key-policy
    text: AWS managed key policies cannot be modified to share access across accounts.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/encryption.html#copy-encryption
  - id: copy-restore-order
    text: With standard vaults, copy the backup into the target account before restoring it there.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html#restore-cab
  - id: restore-service-role
    text: The destination account needs the service-linked role of the service whose resource it
      restores.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html#restore-cab
  - id: default-vault
    text: The destination for a standard cross-account copy cannot be the default vault.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html#security-considerations-cab
  - id: cold-copy-limit
    text: AWS Backup does not support cross-account copies of backups in cold storage.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/recov-point-create-a-copy.html
  - id: organization-departure
    text: A destination account retains backups if it leaves the organization; an SCP denying
      organizations:LeaveOrganization can restrict this.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html#security-considerations-cab
  - id: air-gap-exception
    text: A logically air-gapped vault shared with AWS RAM permits restores in a receiving account
      without first copying the backup into that account.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/logicallyairgappedvault.html#lag-restore
  - id: copy-support
    text: Cross-account copy support depends on the resource type and AWS Regions involved.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-feature-availability.html#features-by-resource
  - id: separate-account-protection
    text: A backup copy in another account can protect recovery data if the production account is
      compromised.
    source: https://aws.amazon.com/blogs/database/automate-cross-account-backups-of-amazon-rds-and-amazon-aurora-databases-with-aws-backup/
diagrams:
  - id: backup-cross-account-restore
    title: "Standard vault: copy before restoring"
    width: 1000
    height: 230
    nodes:
      - id: source
        label: Source vault
        sub: Account A
        icon: backup
        x: 25
        y: 90
        w: 250
        h: 86
        tone: storage
        info: The source copy role needs permissions to copy out and into the destination vault.
      - id: destination
        label: Destination vault
        sub: Account B
        icon: backup
        x: 375
        y: 90
        w: 250
        h: 86
        tone: storage
        info: Its vault policy allows the source caller to copy in. Configure the required key access.
      - id: restore
        label: Restore job
        sub: Account B
        icon: backup
        x: 725
        y: 90
        w: 250
        h: 86
        tone: storage
        info: Restore the copied recovery point in the destination account with the required service-linked
          role.
    edges:
      - from: source
        to: destination
        step: 1
        label: copy
      - from: destination
        to: restore
        step: 2
        label: restore
    steps:
      - Copy a supported recovery point between standard vaults in accounts in the same organization.
      - Start the restore from the destination account copy.
cards:
  - id: backup-004
    q: What prerequisites allow a standard AWS Backup cross-account copy?
    a: Use accounts in the same organization, enable cross-account backup from the management account,
      allow the source role to copy out and in, and allow CopyIntoBackupVault in the destination
      vault policy. Use a non-default destination vault.
    facts:
      - copy-organization
      - copy-enabled
      - copy-role-permissions
      - copy-vault-policy
      - default-vault
  - id: backup-005
    q: An encrypted AWS Backup cross-account copy fails even though its vault policy permits copying.
      What key settings should be checked?
    a: Check source key sharing and the destination key type. AWS managed key policies cannot be shared;
      resource types not fully managed by AWS Backup require customer managed keys for cross-account
      copies.
    trap: true
    facts:
      - source-key-sharing
      - destination-key
      - managed-key-policy
  - id: backup-006
    q: Can AWS Backup restore from a standard vault in account A directly into account B?
    a: No. Copy into account B first, then restore there. A shared logically air-gapped vault supports a
      different restore path.
    trap: true
    facts:
      - copy-restore-order
      - air-gap-exception
  - id: backup-009
    q: Why keep AWS Backup copies in a separate account, and how can an organization restrict that
      account from leaving?
    a: Cross-account copies can protect recovery data if the production account is compromised. An SCP
      denying organizations:LeaveOrganization restricts departure; an account that leaves retains
      its backups.
    facts:
      - separate-account-protection
      - organization-departure
  - id: backup-022
    q: An AWS Backup cross-account copy has an Allow in the destination vault policy but still gets an
      authorization failure. Which identity permissions should be checked?
    a: The source copy role needs backup:CopyFromBackupVault and backup:CopyIntoBackupVault. The
      destination Allow does not replace the source identity policy.
    facts:
      - copy-role-permissions
      - copy-vault-policy
  - id: backup-023
    q: An AWS Backup copy reached a new account, but restoring a resource from a service never used
      there fails. What prerequisite may be absent?
    a: The destination service-linked role. Ensure that the underlying service has created its role in
      that account.
    facts:
      - restore-service-role
---

Cross-account copies place AWS Backup recovery points, or saved backups, in another account in the same organization. They can protect recovery data if the production account is compromised. For standard vaults, recovery follows a copy-then-restore sequence.

### How it works

1. The Organizations management account enables cross-account backup. Confirm that the resource type and Regions support copying.
2. Create a non-default destination vault. Its resource policy, which controls access to that vault, must allow the source caller to use `backup:CopyIntoBackupVault`.
3. Give the source IAM role, an identity with backup permissions, `backup:CopyFromBackupVault` and `backup:CopyIntoBackupVault` in its identity policy.
4. Permit destination-account access to the source customer managed encryption key, whose policy you control. For fully managed resources the destination can use `aws/backup` or a customer managed key; other types require a customer managed key.
5. Copy the backup, then restore in the destination account. Ensure the underlying service has its service-linked role, a role created for that service to act in the account.

### Exam cues

- If the question says a vault policy allows copying but the operation is denied, think source role permissions and encryption-key access, because the vault policy is only one authorization requirement.
- If the question says restore a standard-vault backup into another account, think copy first, because standard vaults do not provide a direct cross-account restore.
- If the question says a destination account might leave the organization with backups, think a service control policy (SCP) denying `organizations:LeaveOrganization`, because the account retains its copies after departure.

### Remember

- Same organization; cross-account backup enabled by the management account.
- The default vault cannot be the destination.
- Backups already in cold storage cannot be copied across accounts.

> **Trap:** The standard-vault copy requirement does not describe every vault. AWS RAM sharing of a logically air-gapped vault permits a receiving account to restore without a preliminary copy.
