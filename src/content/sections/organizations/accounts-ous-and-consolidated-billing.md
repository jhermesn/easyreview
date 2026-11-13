---
title: Accounts, OUs, and consolidated billing
level: associate
order: 10
facts:
  - id: organizations-accounts-tree
    text: An organization groups AWS accounts under one root, with organizational units that can contain
      accounts and other OUs.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
  - id: organizations-accounts-parent
    text: An account belongs to only one organization and has one parent in that organization hierarchy.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
  - id: organizations-accounts-inherit
    text: Accounts inherit applicable organization policies from their parent OUs and root.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
  - id: organizations-accounts-management
    text: The management account manages the organization and pays its member-account charges.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
  - id: organizations-accounts-separate
    text: Consolidated billing combines payment but does not give the management account access to other
      accounts resources.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html
  - id: organizations-accounts-discount
    text: Combined usage can qualify for volume pricing, Reserved Instance discounts, and Savings Plans
      discounts.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
  - id: organizations-accounts-sharing
    text: Discount sharing requires both the purchasing account and the benefit-receiving account to
      have sharing enabled.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ri-turn-off.html
  - id: organizations-accounts-sharing-controls
    text: The management account controls discount sharing preferences for organization accounts.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/ri-turn-off.html
  - id: organizations-accounts-bill
    text: Consolidated billing produces one bill per Seller of Record and has no additional fee.
    source: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html
  - id: organizations-accounts-default
    text: All features is the default feature set and includes consolidated billing and advanced
      organization management.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html
  - id: organizations-accounts-billing-only
    text: Consolidated-billing-only mode does not support authorization policies or trusted service
      integrations.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
  - id: organizations-accounts-approval
    text: In the standard migration to all features, every invited member must approve; accounts created
      in Organizations do not need migration approval.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html#before-enabling-all
  - id: organizations-accounts-one-way
    text: Once all features is enabled, the organization cannot return to consolidated-billing-only mode.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html
  - id: organizations-accounts-service-role
    text: All-features mode requires AWSServiceRoleForOrganizations in every member account; a missing
      role can require a recreation invitation.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html#before-enabling-all
  - id: organizations-accounts-create-role
    text: Accounts created in Organizations receive OrganizationAccountAccessRole by default.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html
  - id: organizations-accounts-invite-role
    text: Invited accounts do not automatically receive OrganizationAccountAccessRole; it can be created
      manually.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html
  - id: organizations-accounts-assume
    text: Using OrganizationAccountAccessRole requires the management-account caller to have permission
      to assume it.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access-cross-account-role.html
  - id: organizations-accounts-transfer
    text: An existing account can move directly between organizations by accepting an invitation from
      the destination management account.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_account_migration.html
  - id: organizations-accounts-transfer-date
    text: Direct account transfers without an intermediate standalone phase were introduced in November
      2025.
    source: https://aws.amazon.com/about-aws/whats-new/2025/11/aws-organizations-direct-account-transfers/
  - id: organizations-accounts-leave
    text: Direct transfer requires organizations:LeaveOrganization, and a source SCP denying that action
      blocks the transfer.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_account_migration.html#migrate-account-step-1
  - id: organizations-accounts-old-trust
    text: Access roles trusting the old management account are not automatically removed when an account
      leaves.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_account_migration.html#migrate-account-step-2
  - id: organizations-accounts-dependency
    text: Account migration preparation includes checking organization-dependent policies and
      deregistering delegated administrator permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_account_migration.html#migrate-account-step-4
  - id: organizations-accounts-config
    text: AWS Config supports recording AWS::Organizations::Account, Organization, OrganizationalUnit,
      Policy, and ResourcePolicy resource types.
    source: https://docs.aws.amazon.com/config/latest/developerguide/resource-config-reference.html
  - id: organizations-accounts-events-region
    text: Organizations EventBridge monitoring is configured in US East (N. Virginia), us-east-1.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_cloudwatch-integration.html
  - id: organizations-accounts-events
    text: A CloudTrail trail and EventBridge rule can monitor Organizations API actions and route
      notifications to SNS.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_tutorials_cwe.html
  - id: organizations-accounts-root-user
    text: The AWS account root user is the account identity created with access to all its services and
      resources, subject to applicable controls.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html
diagrams:
  - id: organizations-policy-tree
    title: Policy inheritance follows the account path
    width: 800
    height: 250
    nodes:
      - id: root
        label: Organization root
        icon: organizations
        x: 30
        y: 85
        w: 180
        h: 86
        tone: mgmt
        sub: top of policy path
      - id: ou
        label: Workload OU
        icon: organizations
        x: 310
        y: 85
        w: 180
        h: 86
        tone: mgmt
        sub: inherited policies
      - id: member
        label: Member account
        icon: res-organizations-account
        x: 590
        y: 85
        w: 180
        h: 86
        tone: mgmt
        sub: account policies
    edges:
      - from: root
        to: ou
        step: 1
      - from: ou
        to: member
        step: 2
    steps:
      - Root authorization policies apply down the organization hierarchy to member accounts.
      - The member account inherits applicable OU policies in addition to policies attached directly
        to it.
cards:
  - id: organizations-009
    q: Does AWS Organizations consolidated billing grant access to another member account resources?
    a: No. It combines charges and eligible discounts. Cross-account administration still requires an
      access role and permission to assume it.
    facts:
      - organizations-accounts-management
      - organizations-accounts-discount
      - organizations-accounts-separate
      - organizations-accounts-assume
  - id: organizations-013
    q: How does AWS Organizations organize accounts and apply inherited policies?
    a: Accounts sit under the organization root or an OU. OUs can be nested, and applicable policies
      follow the parent path to each account.
    facts:
      - organizations-accounts-tree
      - organizations-accounts-parent
      - organizations-accounts-inherit
  - id: organizations-014
    q: A team invites an existing account to AWS Organizations but cannot find
      OrganizationAccountAccessRole. Why?
    a: Organizations creates that role by default for newly created accounts, not invited accounts.
      Create it manually if needed, and authorize callers to assume it.
    trap: true
    facts:
      - organizations-accounts-create-role
      - organizations-accounts-invite-role
      - organizations-accounts-assume
  - id: organizations-015
    q: A consolidated-billing-only AWS organization needs SCPs. What migration must it complete?
    a: Enable all features. In the standard migration, invited accounts must approve. Created accounts
      do not need approval, but missing AWSServiceRoleForOrganizations roles must be restored. The
      completed migration is one-way.
    facts:
      - organizations-accounts-billing-only
      - organizations-accounts-approval
      - organizations-accounts-service-role
      - organizations-accounts-one-way
  - id: organizations-016
    q: Two AWS Organizations accounts cannot share an otherwise eligible Savings Plans discount. Which
      setting should be checked?
    a: Check RI and Savings Plans discount sharing in the management account. Both the purchasing and
      benefit-receiving accounts must have sharing enabled.
    facts:
      - organizations-accounts-sharing
      - organizations-accounts-sharing-controls
  - id: organizations-017
    q: Must an AWS member account become standalone before joining another organization?
    a: No. Since November 2025, direct transfer uses a destination invitation and acceptance. The moving
      account still needs organizations:LeaveOrganization, and a source SCP can block it.
    trap: true
    facts:
      - organizations-accounts-transfer
      - organizations-accounts-transfer-date
      - organizations-accounts-leave
  - id: organizations-018
    q: An account leaves AWS Organizations, but a role still trusts its old management account. Is that
      role removed automatically?
    a: No. Remove or change the old access role deliberately; leaving the organization does not
      automatically delete it.
    trap: true
    facts:
      - organizations-accounts-old-trust
  - id: organizations-019
    q: How can an AWS Organizations administrator receive an alert when an OU is created or an account
      attempts to leave?
    a: Configure a CloudTrail trail and EventBridge rule in us-east-1, with SNS as a notification
      target.
    facts:
      - organizations-accounts-events-region
      - organizations-accounts-events
  - id: organizations-020
    q: Can AWS Config record the structure and policies of AWS Organizations?
    a: Yes. Supported resource types include AWS::Organizations::Account, Organization,
      OrganizationalUnit, Policy, and ResourcePolicy.
    facts:
      - organizations-accounts-config
---

AWS Organizations groups accounts for central management and billing. An organizational unit (OU) is a folder for accounts or other OUs; policies inherited through that folder hierarchy apply to its accounts.

### How it works

1. Start with the organization root, the top folder, and a management account, which manages the organization and pays member charges. Each account has one parent and belongs to one organization. The organization root is different from an account's root user, its account-owner identity.
2. Group accounts into OUs and attach applicable policies at the root, OU, or account level. Nested OUs inherit their parents' policies.
3. Create a new account or invite an existing one. Created accounts receive `OrganizationAccountAccessRole` by default; invited accounts do not. Cross-account access needs an access role and caller permission to assume it.
4. Choose the feature set. All features is the default and includes billing. For a standard upgrade from billing-only mode, every invited account must approve. Created accounts do not approve the upgrade, but a missing `AWSServiceRoleForOrganizations` must be restored. The completed upgrade cannot be reversed.
5. Combine usage for eligible discounts. The management account controls Reserved Instance and Savings Plans sharing; both the purchasing and receiving accounts must have sharing enabled. Consolidated billing has no added fee and produces one bill per Seller of Record, the AWS entity issuing the bill.

Since November 2025, an account can transfer directly by accepting the destination organization's invitation. It need not become standalone first. Check `organizations:LeaveOrganization` permissions and source SCPs, remove old management-account trust, and review organization dependencies such as delegated administration before moving.

For change tracking, AWS Config can record `AWS::Organizations::Account`, `Organization`, `OrganizationalUnit`, `Policy`, and `ResourcePolicy`. For activity alerts, configure a CloudTrail trail and an EventBridge rule in `us-east-1`, with SNS as a notification target.

### Exam cues

- If the question says an invited account lacks the administrative access role, think create the role explicitly, because invitation does not create it.
- If the question says billing-only mode needs SCPs, think all-features migration, because billing-only mode lacks authorization policies.
- If the question says discounts are not shared, think both accounts' sharing settings, because one enabled side is insufficient.
- If the question says move an existing account between organizations, think destination invitation, because current Organizations supports direct transfer.

### Remember

- All features is the default; enabling it is one-way.
- Billing combines charges and discounts, without granting resource access.
- Organization activity monitoring uses `us-east-1`.

> **Trap:** Moving an account does not automatically delete a role that trusts its former management account.
