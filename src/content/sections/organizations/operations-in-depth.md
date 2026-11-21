---
title: Account migrations and policy controls
level: professional
order: 50
facts:
  - id: organizations-accounts-billing-only
    text: Consolidated-billing-only mode does not support authorization policies or trusted service
      integrations.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
  - id: organizations-accounts-approval
    text: In the standard migration to all features, every invited member must approve; accounts created
      in Organizations do not need migration approval.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html#before-enabling-all
  - id: organizations-accounts-service-role
    text: All-features mode requires AWSServiceRoleForOrganizations in every member account; a missing
      role can require a recreation invitation.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html#before-enabling-all
  - id: organizations-accounts-one-way
    text: Once all features is enabled, the organization cannot return to consolidated-billing-only mode.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_support-all-features.html
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
  - id: organizations-accounts-config
    text: AWS Config supports recording AWS::Organizations::Account, Organization, OrganizationalUnit,
      Policy, and ResourcePolicy resource types.
    source: https://docs.aws.amazon.com/config/latest/developerguide/resource-config-reference.html
  - id: remove-standalone
    text: "To remove a member account from an organization, the account needs the information to stand alone: a support plan, verified contact information and a current payment method."
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_remove.html#orgs_manage_account-before-remove
  - id: organizations-rcp-baseline
    text: Enabling RCPs attaches RCPFullAWSAccess to the root, every OU, and every account; it cannot be
      detached.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps_evaluation.html
  - id: organizations-rcp-effect
    text: Custom RCPs use Deny; Allow is reserved for the managed RCPFullAWSAccess policy.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps_syntax.html
  - id: organizations-rcp-organization
    text: aws:PrincipalOrgID identifies the requesting principal organization and avoids enumerating its
      accounts.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-principalorgid
  - id: organizations-rcp-service-exception
    text: An RCP using principal-organization restrictions must account for AWS service principals, for
      example with aws:PrincipalIsAWSService exceptions.
    source: https://docs.aws.amazon.com/whitepapers/latest/building-a-data-perimeter-on-aws/perimeter-implementation.html
  - id: organizations-rcp-source-org
    text: aws:SourceOrgID can restrict service-principal access to requests originating from resources
      in a trusted organization.
    source: https://docs.aws.amazon.com/whitepapers/latest/building-a-data-perimeter-on-aws/perimeter-implementation.html
  - id: organizations-scp-region
    text: A Region-deny SCP can use aws:RequestedRegion with NotAction exceptions for global services
      such as IAM.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_syntax.html
  - id: organizations-scp-global
    text: Some global services use endpoints outside permitted workload Regions, so a Region deny needs
      appropriate service exceptions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_aws_deny-requested-region.html
  - id: organizations-scp-endpoint
    text: aws:RequestedRegion controls the endpoint called, not all cross-Region effects of that
      operation.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-requestedregion
  - id: imdsv2-scp
    text: A policy can deny requests signed with EC2 role credentials when ec2:RoleDelivery is below 2.0, which forces credentials to come from IMDSv2; in an SCP this applies across member accounts.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ExamplePolicies_EC2.html
cards:
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
  - id: organizations-017
    q: Must an AWS member account become standalone before joining another organization?
    a: No. Since November 2025, direct transfer uses a destination invitation and acceptance. The moving
      account still needs organizations:LeaveOrganization, and a source SCP can block it.
    trap: true
    facts:
      - organizations-accounts-transfer
      - organizations-accounts-transfer-date
      - organizations-accounts-leave
  - id: organizations-020
    q: Can AWS Config record the structure and policies of AWS Organizations?
    a: Yes. Supported resource types include AWS::Organizations::Account, Organization,
      OrganizationalUnit, Policy, and ResourcePolicy.
    facts:
      - organizations-accounts-config
  - id: organizations-032
    q: What must a member account of an AWS organization have before it can be removed to become a standalone account?
    a: A support plan, verified contact information and a current payment method.
    facts: [remove-standalone]
  - id: organizations-024
    q: Can an AWS Organizations administrator detach RCPFullAWSAccess to build an RCP allow list?
    a: No. The managed policy cannot be detached. Custom RCPs use Deny; only the managed
      RCPFullAWSAccess policy supports Allow.
    trap: true
    facts:
      - organizations-rcp-baseline
      - organizations-rcp-effect
  - id: organizations-025
    q: An AWS Organizations team applies an RCP using aws:PrincipalOrgID and breaks CloudTrail log
      delivery. What exception may be missing?
    a: Account for AWS service principals with an aws:PrincipalIsAWSService condition. A service
      principal is not an IAM principal belonging to your organization; aws:SourceOrgID can
      constrain the service request origin.
    facts:
      - organizations-rcp-organization
      - organizations-rcp-service-exception
      - organizations-rcp-source-org
  - id: organizations-021
    q: An AWS Organizations Region-deny SCP breaks IAM calls. How should the policy be corrected?
    a: Use appropriate NotAction exceptions for required global services. aws:RequestedRegion evaluates
      the endpoint Region; global endpoints may sit outside permitted workload Regions.
    facts:
      - organizations-scp-region
      - organizations-scp-global
      - organizations-scp-endpoint
  - id: organizations-033
    q: An organization must block use of instance role credentials obtained through IMDSv1 in every account. What fits?
    a: An SCP that denies requests when ec2:RoleDelivery is below 2.0, so only IMDSv2 credentials work.
    facts: [imdsv2-scp]
---
AWS Organizations feature settings, account transfers, and policies affect how accounts are managed. The feature set determines whether authorization policies are available, while policy conditions can restrict requests across member accounts.

### How it works

1. To use authorization policies in a billing-only organization, enable all features. In the standard migration, invited members approve; accounts created in Organizations do not. Each member needs `AWSServiceRoleForOrganizations`; a missing role can require a recreation invitation.
2. To move an account, accept an invitation from the destination management account. A source SCP denying `organizations:LeaveOrganization` blocks the direct transfer. To remove an account to become standalone, it needs a support plan, verified contact information, and a current payment method.
3. AWS Config can record Organizations account, organization, OU, policy, and resource policy resource types.
4. When RCPs are enabled, RCPFullAWSAccess is attached to the root, each OU, and each account. It cannot be detached. Custom RCPs use `Deny`; `Allow` is reserved for the managed policy.
5. In an RCP, `aws:PrincipalOrgID` identifies the requesting principal's organization. Account for AWS service principals with an `aws:PrincipalIsAWSService` exception; `aws:SourceOrgID` can restrict service requests to those originating from resources in a trusted organization.
6. A Region-deny SCP can use `aws:RequestedRegion` with `NotAction` exceptions for global services. The condition checks the endpoint called, not every cross-Region effect. An SCP can also deny requests signed with EC2 role credentials when `ec2:RoleDelivery` is below 2.0, requiring IMDSv2 credentials across member accounts.

### Exam cues

- If the question says billing-only mode needs SCPs, think all-features migration, because billing-only mode does not support authorization policies.
- If the question says an account transfer is blocked, think `organizations:LeaveOrganization`, because a source SCP can deny that action.
- If the question says an organization-only RCP breaks service delivery, think a service-principal exception, because the restriction must account for AWS service principals.
- If the question says a Region deny breaks IAM, think `NotAction` exceptions, because global service endpoints can be outside the permitted workload Regions.
- If the question says block requests using IMDSv1 role credentials across member accounts, think an SCP denying `ec2:RoleDelivery` below 2.0, because that requires IMDSv2 credentials.

### Remember

- All-features migration is one-way.
- Direct transfers have been available since November 2025 without an intermediate standalone phase.
- `RCPFullAWSAccess` cannot be detached; custom RCPs use `Deny`.

> **Trap:** A direct account transfer does not require the account to become standalone first, but a source SCP denying `organizations:LeaveOrganization` can still block it.
