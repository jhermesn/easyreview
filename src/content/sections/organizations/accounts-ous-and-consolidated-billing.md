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
  - id: organizations-accounts-old-trust
    text: Access roles trusting the old management account are not automatically removed when an account
      leaves.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_account_migration.html#migrate-account-step-2
  - id: organizations-accounts-dependency
    text: Account migration preparation includes checking organization-dependent policies and
      deregistering delegated administrator permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_account_migration.html#migrate-account-step-4
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
  - id: tag-policies
    text: "AWS Organizations tag policies standardize the tags on resources across the organization's accounts, including the case of tag keys and values."
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html#orgs_manage_policies_tag-policies
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
  - id: organizations-034
    q: "Cost allocation reports break because teams tag resources as CostCenter, costcenter and cost-center. Which AWS Organizations feature enforces one standard?"
    a: "**Tag policies**."
    facts: [tag-policies]
---

AWS Organizations groups accounts for central management and billing. An organizational unit (OU) is a folder for accounts or other OUs; policies inherited through that folder hierarchy apply to its accounts.

### How it works

1. Start with the organization root, the top folder, and a management account, which manages the organization and pays member charges. Each account has one parent and belongs to one organization. The organization root is different from an account's root user, its account-owner identity.
2. Group accounts into OUs and attach applicable policies at the root, OU, or account level. Nested OUs inherit their parents' policies.
3. Create a new account or invite an existing one. Created accounts receive `OrganizationAccountAccessRole` by default; invited accounts do not. Cross-account access needs an access role and caller permission to assume it.
4. Choose the feature set. All features is the default and includes billing.
5. Combine usage for eligible discounts. The management account controls Reserved Instance and Savings Plans sharing; both the purchasing and receiving accounts must have sharing enabled. Consolidated billing has no added fee and produces one bill per Seller of Record, the AWS entity issuing the bill.

When an account leaves, review roles that trust the former management account. They are not automatically deleted.

For activity alerts, configure a CloudTrail trail and an EventBridge rule in `us-east-1`, with SNS as a notification target.

### Exam cues

- If the question says an invited account lacks the administrative access role, think create the role explicitly, because invitation does not create it.
- If the question says discounts are not shared, think both accounts' sharing settings, because one enabled side is insufficient.

### Remember

- All features is the default.
- Billing combines charges and discounts, without granting resource access.
- Organization activity monitoring uses `us-east-1`.

> **Trap:** Moving an account does not automatically delete a role that trusts its former management account.
