---
title: Organization backup policies
level: professional
order: 20
facts:
  - id: policy-plans
    text: An Organizations backup policy creates corresponding backup plans in affected accounts.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/manage-cross-account.html#cross-account-management-overview
  - id: policy-attachment
    text: Backup policies can attach to an organization root, organizational unit, or account and
      combine through policy inheritance.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_backup.html
  - id: enable-management
    text: The Organizations management account must enable AWS Backup cross-account management before
      policies manage multiple accounts.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/manage-cross-account.html#enable-cross-account
  - id: policy-prerequisites
    text: Referenced backup vaults must exist in every target account and Region, and the referenced IAM
      role must exist and permit the backup.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_backup_syntax.html#backup-policy-syntax-reference
  - id: policy-selection
    text: Organizations backup policies select resource types or tags, not individual resource ARNs; use
      a local plan assignment for individual resources.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/manage-cross-account.html#create-backup-policy
  - id: effective-plan
    text: Policies with the same backup plan name merge into an effective backup policy for an account;
      policies with different plan names can coexist.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/manage-cross-account.html#cross-account-management-overview
  - id: delegate-management
    text: A registered AWS Backup delegated administrator is a member account that can manage backup
      policies and monitor jobs across accounts.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/manage-cross-account.html#backup-delegatedadmin
  - id: management-opt-in
    text: For Organizations-managed plans, management-account service opt-in settings override
      member-account settings, including delegated administrators.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/manage-cross-account.html#cross-account-management-overview
  - id: monitoring-setting
    text: Enabling cross-account monitoring lets the management account monitor backup, copy, and
      restore activity across the organization.
    source: https://docs.aws.amazon.com/aws-backup/latest/devguide/manage-cross-account.html#enable-cross-account
diagrams:
  - id: backup-policy-inheritance
    title: Apply backup policies across accounts
    width: 1000
    height: 230
    nodes:
      - id: policy
        label: Root policy
        sub: Organizations
        icon: organizations
        x: 25
        y: 90
        w: 250
        h: 86
        tone: mgmt
        info: Attach common backup requirements at the organization root.
      - id: ou
        label: OU policy
        sub: Inherited settings
        icon: organizations
        x: 375
        y: 90
        w: 250
        h: 86
        tone: mgmt
        info: Policies with matching plan names combine through inheritance.
      - id: plan
        label: Account plan
        sub: AWS Backup
        icon: backup
        x: 725
        y: 90
        w: 250
        h: 86
        tone: storage
        info: The effective policy creates a local plan; the vault and role must already exist.
    edges:
      - from: policy
        to: ou
        step: 1
        label: inherit
      - from: ou
        to: plan
        step: 2
        label: apply
    steps:
      - The OU inherits the root policy and combines it with applicable OU settings.
      - The effective policy creates the corresponding account backup plan.
cards:
  - id: backup-003
    q: How can an organization apply AWS Backup plans to multiple accounts?
    a: Enable cross-account management, then attach an Organizations backup policy to the root, an OU,
      or accounts. Provision the referenced vaults and IAM role in the target accounts and Regions.
    facts:
      - enable-management
      - policy-plans
      - policy-attachment
      - policy-prerequisites
  - id: backup-019
    q: An Organizations AWS Backup policy references a vault and IAM role that are absent in a member
      account. Does attaching the policy create those prerequisites?
    a: No. Provision the vault and role before the plan runs. The policy creates the plan, not these
      prerequisites.
    trap: true
    facts:
      - policy-plans
      - policy-prerequisites
  - id: backup-020
    q: A team needs an Organizations AWS Backup policy to protect one resource by its exact ARN. Which
      assignment should it use?
    a: Use a local backup plan assignment. Organization policies select resource types or tags, not
      individual resource ARNs.
    facts:
      - policy-selection
  - id: backup-021
    q: Which service opt-in settings control an AWS Backup plan managed through Organizations?
    a: The management account settings override member-account settings for that plan, even when a
      delegated administrator manages it.
    facts:
      - management-opt-in
---

Organizations backup policies apply AWS Backup plans across accounts. Attach a policy to the organization root, an organizational unit (OU, a group of accounts), or a single account to define its backup requirements centrally.

### How it works

1. The management account enables cross-account management. It can register a member account as a delegated administrator, which gives that account backup administration duties.
2. Provision the referenced vaults in each target account and Region. Provision an IAM role, an identity AWS Backup can assume with permission to perform backups.
3. Attach policies with backup rules, Regions, resource selections, and the role. Select resources by type or tags.
4. Inheritance combines applicable policies into the account's effective policy. Plans with the same name merge; differently named plans can coexist.
5. Enable cross-account monitoring to inspect backup, copy, and restore activity centrally.

### Exam cues

- If the question says apply backup requirements to an OU, think an Organizations backup policy, because it creates plans in the affected accounts.
- If the question says an inherited plan cannot run in a new account, think missing vaults or role permissions, because policy attachment requires those prerequisites.
- If the question says target one resource by exact ARN, think a local plan assignment, because organization policies select types or tags.

### Remember

- Management-account service opt-in settings govern Organizations-managed plans.
- A delegated administrator is an account with backup administration duties.
- Every referenced vault must exist in its target account and Region.

> **Trap:** A centrally created plan does not provision its referenced vaults or IAM role. Create those before relying on the policy.
