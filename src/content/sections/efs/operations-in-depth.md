---
title: EFS operational controls
level: professional
order: 40
facts:
  - id: iam-actions
    text: ClientMount authorizes read-only access, ClientWrite authorizes writes, and ClientRootAccess
      authorizes use of root.
    source: https://docs.aws.amazon.com/efs/latest/ug/iam-access-control-nfs-efs.html#efs-filesystempolicy-actions
  - id: posix-check
    text: EFS checks numeric POSIX user and group identities against file and directory permissions.
    source: https://docs.aws.amazon.com/efs/latest/ug/accessing-fs-nfs-permissions.html#accessing-fs-nfs-permissions
  - id: missing-root
    text: An access-point root directory must exist or specify creation ownership and permissions;
      otherwise mounting the access point fails.
    source: https://docs.aws.amazon.com/efs/latest/ug/enforce-root-directory-access-point.html#create-root-directory-access-point
  - id: cross-account-role
    text: Cross-account replication requires a supplied IAM role and cannot use the EFS service-linked
      role; passing a role requires iam:PassRole.
    source: https://docs.aws.amazon.com/efs/latest/ug/efs-replication.html#efs-replication-permissions
cards:
  - id: efs-015
    q: An EFS IAM policy allows mounting, but writes fail. What additional permissions must the team
      examine?
    a: ClientWrite for write authorization and POSIX directory and file permissions for the effective
      user and group. ClientMount grants read-only access.
    facts:
      - iam-actions
      - posix-check
  - id: efs-016
    q: An EFS access point names a root directory that does not exist and supplies no creation
      permissions. What happens?
    a: The mount fails. Create the directory with appropriate permissions or provide access-point
      creation ownership and permissions.
    facts:
      - missing-root
  - id: efs-020
    q: An EFS replication configuration spans AWS accounts. Can the team rely on the EFS service-linked
      role?
    a: No. It must supply an IAM role for cross-account replication, and the configuring identity needs
      iam:PassRole.
    trap: true
    facts:
      - cross-account-role
---

Amazon EFS operational settings control client access, storage transitions, and replication across accounts. These checks help diagnose failed mounts or writes and configure storage and replication permissions.

### How it works

1. For a failed write, check the IAM client actions: `ClientMount` grants read-only access, `ClientWrite` authorizes writes, and `ClientRootAccess` authorizes root use. Check the POSIX permissions for the numeric user and group as well.
2. For a failed access-point mount, check whether its root directory exists. If it does not, specify creation ownership and permissions so EFS can create it.
3. Review the lifecycle transition defaults for Infrequent Access (IA) and Archive. Archive requires Elastic throughput; an Archive transition policy prevents switching to Bursting or Provisioned throughput.
4. For cross-account replication, supply an IAM role and grant the configuring identity `iam:PassRole` to pass it.

### Exam cues

- If the question says an EFS mount succeeds but writes fail, think `ClientWrite` and POSIX file and directory permissions, because `ClientMount` authorizes read-only access.
- If the question says an access-point root is missing and no creation permissions are supplied, think mount failure, because EFS cannot create the root without ownership and permissions.
- If the question says an Archive transition policy blocks a throughput change, think Elastic throughput, because Archive requires it.
- If the question says replication crosses AWS accounts, think a supplied IAM role and `iam:PassRole`, because the EFS service-linked role cannot be used for cross-account replication.

### Remember

- The documented default transitions are 30 days without access in Standard for IA and 90 days for Archive.
- `ClientRootAccess` authorizes root use; `ClientWrite` authorizes writes.

> **Trap:** A successful mount does not establish write permission. Check both `ClientWrite` and the effective user and group's POSIX permissions.
