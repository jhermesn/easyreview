---
title: Account boundaries and shared services
level: professional
order: 10
facts:
  - id: isolation
    text: AWS accounts provide security, access, and billing boundaries; access between accounts is not allowed by
      default.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/dedicated-accounts.html#dedicated-accounts
  - id: separate-environments
    text: Use separate accounts for production and non-production workloads to apply distinct controls and isolate
      resources and data.
    source: https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/benefits-of-using-multiple-aws-accounts.html#benefits-of-using-multiple-aws-accounts
  - id: ou-design
    text: Group accounts into organizational units by security and operational requirements rather than copying
      the reporting hierarchy.
    source: https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/design-principles-for-your-multi-account-strategy.html#design-principles-for-your-multi-account-strategy
  - id: management
    text: Avoid application workloads in the management account and restrict access because SCPs do not constrain
      that account.
    source: https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/design-principles-for-your-multi-account-strategy.html#design-principles-for-your-multi-account-strategy
  - id: account-roles
    text: AWS SRA separates security tooling, log archives, network infrastructure, and application workloads into
      dedicated accounts.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/dedicated-accounts.html#dedicated-accounts
  - id: shared-services
    text: A shared services account hosts services used by multiple applications and teams.
    source: https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/checklist.html#checklist
  - id: quotas
    text: Multiple accounts distribute account-scoped service quotas and API request rate limits.
    source: https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/benefits-of-using-multiple-aws-accounts.html#benefits-of-using-multiple-aws-accounts
  - id: ram-share
    text: AWS RAM shares supported resources with accounts, organizational units, or the organization.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html
  - id: ram-invitations
    text: With RAM organization sharing enabled, normal shares inside the organization do not require invitations;
      retain-on-leave account shares are an exception.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html
  - id: ram-enable
    text: Enable organization sharing through RAM so that its required service-linked role is created.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html
  - id: ram-permissions
    text: For a cross-account RAM share, its managed permission sets the maximum available permissions; the consumer
      account must also grant its users or roles access through identity policies.
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is-how-sharing
  - id: ram-regions
    text: A RAM share holds Regional resources in the same Region as the share; global resources use a share in
      us-east-1.
    source: https://docs.aws.amazon.com/ram/latest/userguide/what-is.html#what-is-how-sharing
  - id: subnet-sharing
    text: A VPC owner can share subnets with accounts in the same organization; participants manage their own
      resources but cannot manage other participants' resources.
    source: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html
  - id: cross-account-role
    text: Cross-account role access requires destination-role trust and permissions plus permission for the
      originating identity to assume the role.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html
  - id: ram-org-requirements
    text: Enabling RAM organization sharing requires all Organizations features, a management account principal,
      ram:EnableSharingWithAwsOrganization, iam:CreateServiceLinkedRole, organizations:EnableAWSServiceAccess,
      and organizations:DescribeOrganization.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-orgs
  - id: ram-leave
    text: Organization sharing normally ends when a consumer leaves. For a new direct account share,
      RetainSharingOnAccountLeaveOrganization requires external principals to be allowed and an accepted invitation.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html#getting-started-sharing-orgs
  - id: ram-owner-quota
    text: Sharing a resource does not change the permissions or quotas applying to it in its owner account.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html
  - id: org-account-quota
    text: The default Organizations account quota is 10 and is adjustable; new organizations can have a lower
      quota, and pending invitations count against it.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_reference_limits.html#default-maximum-number-of-accounts
  - id: shared-permissions
    text: In November 2026 AWS RAM added sharing of customer managed permissions so receiving accounts can
      associate them with their own resource shares.
    source: https://docs.aws.amazon.com/ram/latest/userguide/doc-history.html
  - id: quota-request-template
    text: "With Service Quotas trusted access in AWS Organizations, a quota request template automatically requests quota increases when new accounts are created in the organization."
    source: https://docs.aws.amazon.com/organizations/latest/userguide/services-that-can-integrate-servicequotas.html#services-that-can-integrate-servicequotas
cards:
  - id: multi-account-strategy-009
    q: Why use separate AWS accounts for production and development rather than only separate VPCs?
    a: Accounts provide security, access, and billing boundaries and allow different controls for production and
      non-production.
    facts:
      - isolation
      - separate-environments
  - id: multi-account-strategy-010
    q: A company wants AWS organizational units to mirror every manager and reporting line. What grouping
      principle should it use?
    a: Group accounts by shared security and operational requirements so controls match the accounts they govern.
    facts:
      - ou-design
  - id: multi-account-strategy-011
    q: Which dedicated AWS accounts separate security operations from audit-log storage?
    a: A security tooling account operates security services; a log archive account ingests and archives logs.
    facts:
      - account-roles
  - id: multi-account-strategy-012
    q: A platform team wants to share supported network resources with an entire OU without invitation handling.
      What should it configure?
    a: Enable AWS RAM sharing with Organizations through RAM, then create an organization resource share for the
      OU.
    facts:
      - ram-share
      - ram-invitations
      - ram-enable
  - id: multi-account-strategy-013
    q: Should an application be deployed in the AWS Organizations management account so that an SCP can protect
      it?
    a: No. SCPs do not constrain the management account. Keep application workloads in member accounts and
      restrict management-account access.
    facts:
      - management
    trap: true
  - id: multi-account-strategy-031
    q: A workload account cannot use a subnet shared by AWS RAM even though the share permits the operation. What
      permissions should its administrator check?
    a: Grant the workload identity access with an IAM identity policy. The RAM managed permission is a ceiling,
      not a substitute for the consumer account's identity permissions.
    facts:
      - ram-permissions
  - id: multi-account-strategy-023
    q: In which Region must an AWS RAM share be created for a Regional resource?
    a: In the resource's Region. A share containing global resources uses us-east-1.
    facts:
      - ram-regions
  - id: multi-account-strategy-024
    q: A network account shares an Amazon VPC subnet with workload accounts in its organization. Can one workload
      account manage another participant's EC2 instances?
    a: No. Participants manage their own resources, not resources owned by other participants.
    facts:
      - subnet-sharing
    trap: true
  - id: multi-account-strategy-025
    q: A developer in one AWS account needs to assume a role to access an Amazon S3 bucket in another account.
      What must both accounts configure?
    a: The destination role needs trust and bucket permissions; the originating identity needs permission to assume
      that role.
    facts:
      - cross-account-role
  - id: multi-account-strategy-026
    q: An administrator enabled trusted access in AWS Organizations but cannot share an OU resource through
      AWS RAM. What setup is required?
    a: Enable sharing through RAM from the management account with all Organizations features enabled and the
      required RAM, IAM and Organizations permissions.
    facts:
      - ram-enable
      - ram-org-requirements
  - id: multi-account-strategy-027
    q: An AWS RAM resource must remain shared with a specific account after that account leaves the organization.
      How should the share be created?
    a: Enable RetainSharingOnAccountLeaveOrganization on a new direct account share, allow external principals
      and have the consumer accept its invitation.
    facts:
      - ram-leave
  - id: multi-account-strategy-028
    q: A team shares a resource using AWS RAM to avoid the resource owner's quota. Does sharing increase that
      quota?
    a: No. Sharing does not change the quotas that apply to the resource in its owning account.
    trap: true
    facts:
      - ram-owner-quota
  - id: multi-account-strategy-029
    q: An AWS Organizations management account cannot add another member account. Which account quota and
      pending invitations should it check?
    a: The default account quota is 10 and is adjustable, though new organizations can have a lower quota.
      Pending invitations count against it.
    facts:
      - org-account-quota
  - id: multi-account-strategy-030
    q: A platform team wants other AWS accounts to reuse its customer managed AWS RAM permission on their own
      resource shares. What feature can it use?
    a: Share the customer managed permission. RAM added this capability in November 2026.
    facts:
      - shared-permissions
  - id: multi-account-strategy-032
    q: "Every new account in an AWS organization needs higher quotas for some services from day one. What avoids manual requests per account?"
    a: "A Service Quotas quota request template with trusted access enabled in Organizations. It requests the increases automatically when accounts are created."
    facts:
      - quota-request-template
diagrams:
  - id: account-shared-resource
    title: Share a supported resource across accounts
    width: 1000
    height: 210
    nodes:
      - id: owner
        label: Resource owner
        icon: res-organizations-account
        info: The owning account creates a RAM resource share.
        x: 30
        y: 60
        w: 190
        h: 86
        tone: mgmt
      - id: share
        label: RAM share
        icon: resource-access-manager
        info: The share specifies a supported resource and an account, OU, or organization.
        x: 280
        y: 60
        w: 190
        h: 86
        tone: security
      - id: consumer
        label: Consumer account
        icon: res-organizations-account
        info: The consumer accesses the shared resource under the share permissions.
        x: 530
        y: 60
        w: 190
        h: 86
        tone: mgmt
    edges:
      - from: owner
        to: share
        step: 1
      - from: share
        to: consumer
        step: 2
    steps:
      - The resource owner creates the share in RAM.
      - An authorized consumer gains access to the shared resource.
---
An AWS account is an isolation boundary for resources, access, and billing. Separate accounts let teams apply different controls and limit how far an operational or security mistake can spread.

### How it works

1. Separate production and non-production workloads into accounts. Account-scoped quotas and API request limits are also distributed across those accounts.
2. Group accounts into organizational units (OUs), groups that share governance requirements. Base the structure on security and operational needs.
3. Separate shared responsibilities.

   | Account | Responsibility |
   |---|---|
   | Management | Organization administration; keep application workloads elsewhere |
   | Security tooling | Operate security services across accounts |
   | Log archive | Ingest and archive logs separately from workloads |
   | Network | Operate shared networking infrastructure |
   | Shared services | Host services used by multiple teams |
   | Application | Run application workloads |

4. Use AWS RAM resource shares for supported resources that several accounts need. Enable organization sharing through RAM to create its required service-linked role, a role reserved for that service.
5. For cross-account shares, the RAM managed permission sets the maximum actions. The consumer account must grant its identities access too. For role-based access, configure destination role trust and permissions and allow the originating identity to assume it.
6. A network account can share VPC subnets with accounts in the same organization. Each participant manages its own resources, not another participant's resources.
7. Enable organization sharing from the management account through RAM with all Organizations features and the required RAM, IAM and Organizations permissions. Sharing does not raise the resource owner's quota.
8. A consumer normally loses organization-shared access when it leaves. To retain a direct account share, set `RetainSharingOnAccountLeaveOrganization` when creating it, allow external principals and have the consumer accept the invitation.
9. Since November 2026, teams can share customer managed RAM permissions for receiving accounts to use on their own resource shares.

### Exam cues

- If the question says development changes must not affect production access or quotas, think separate accounts, because accounts create access boundaries and distribute account-scoped limits.
- If the question says many accounts need the same supported infrastructure resource, think RAM, because sharing gives access without creating a separate resource in every account.
- If the question says protect workload data from workload administrators, think a separate log archive or data account with restricted access, because account access is separate by default.
- If a RAM share exists but a workload role is denied, check its identity policy as well as the share's managed permission.
- If a developer needs access to a bucket in another account, think an IAM role with destination trust and permissions and an `sts:AssumeRole` grant in the originating account.
- If the question says new accounts in an organization need higher quotas automatically, think a Service Quotas quota request template, because it requests increases at account creation.

### Remember

- Group OUs by control requirements.
- SCPs do not constrain the management account.
- Ordinary RAM shares inside an enabled organization do not require invitations.
- Regional RAM resources and their share must be in the same Region. Shares for global resources use `us-east-1`.
- The default Organizations account quota is 10 and is adjustable. New organizations can have a lower quota; pending invitations count against it.

> **Trap:** An OU groups accounts for governance. It does not replace the account boundary or automatically grant access between accounts.
