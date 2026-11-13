---
title: Trusted access and delegated administration
level: professional
order: 40
facts:
  - id: organizations-integration-trusted
    text: Trusted access lets a supported AWS service perform organization-wide tasks on behalf of the
      organization.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html
  - id: organizations-integration-linked
    text: A trusted service creates service-linked roles in member accounts when needed, not necessarily
      in every account immediately.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html
  - id: organizations-integration-service-tools
    text: AWS recommends enabling and disabling trusted access through the integrated service tools when
      available so initialization and cleanup occur.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html
  - id: organizations-integration-delegate
    text: A delegated administrator is a member account registered to administer a particular supported
      AWS service for the organization.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_delegated_admin.html
  - id: organizations-integration-prerequisite
    text: Before registering a delegated administrator, confirm service support and enable trusted
      access for that service.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_delegated_admin.html
  - id: organizations-integration-permissions
    text: Service delegation grants service-specific administrative permissions and read-only
      Organizations permissions; it does not grant general organization mutation rights.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_delegated_admin.html#integrate_delegated_admin-permissions
  - id: organizations-integration-management
    text: AWS recommends keeping workloads in member accounts and reserving management-account use for
      tasks that require it.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_delegated_admin.html
  - id: organizations-integration-support-one
    text: StackSets, Config, CloudTrail, GuardDuty, Security Hub CSPM, and Backup support
      service-specific delegated administrators.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html
  - id: organizations-integration-support-two
    text: Detective, Inspector, Macie, Firewall Manager, IAM Access Analyzer, Systems Manager, IAM
      Identity Center, and Service Catalog support delegated administration.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html
  - id: organizations-integration-no-support
    text: RAM, Control Tower, and Directory Service support trusted access but not a service-specific
      delegated administrator through the Organizations integration.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html
  - id: organizations-integration-scp
    text: Delegated administrator member accounts remain subject to SCPs.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: organizations-integration-ram-init
    text: RAM organization sharing must be enabled through RAM to create
      AWSServiceRoleForResourceAccessManager; enabling trusted access only through Organizations
      does not create it.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html
  - id: organizations-integration-ram-sharing
    text: After normal organization sharing is enabled, RAM shares to accounts, OUs, or the organization
      do not require resource-share invitations.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html
  - id: organizations-integration-ram-iam
    text: Administrators in consuming accounts must grant their principals IAM access to resources
      shared through RAM.
    source: https://docs.aws.amazon.com/ram/latest/userguide/getting-started-sharing.html
  - id: organizations-integration-trail
    text: A management account or CloudTrail delegated administrator can create an organization trail
      covering management and member accounts.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html
  - id: organizations-integration-trail-protect
    text: Ordinary member-account users cannot modify, delete, or stop organization trails.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html
  - id: organizations-integration-trail-new
    text: New organization members are automatically added to an organization trail for logging.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html
  - id: organizations-integration-stacksets
    text: Service-managed StackSets use trusted access and create deployment IAM roles on behalf of the
      user.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html
  - id: organizations-integration-stacksets-target
    text: Service-managed StackSets target organization accounts or OUs and do not deploy to the
      management account.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html
  - id: organizations-integration-stacksets-auto
    text: StackSet automatic deployments can deploy to new accounts added to a targeted organization or
      OU.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html
  - id: organizations-integration-disable
    text: Disabling trusted access through Organizations does not guarantee removal of historical
      service data or configuration.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html
diagrams:
  - id: organizations-service-delegation
    title: Delegate service administration to a member
    width: 800
    height: 250
    nodes:
      - id: org
        label: Organizations
        icon: organizations
        x: 30
        y: 85
        w: 180
        h: 86
        tone: mgmt
        sub: enable service trust
      - id: admin
        label: Delegated admin
        icon: res-organizations-account
        x: 310
        y: 85
        w: 180
        h: 86
        tone: mgmt
        sub: member account
      - id: service
        label: GuardDuty
        icon: guardduty
        x: 590
        y: 85
        w: 180
        h: 86
        tone: security
        sub: organization management
    edges:
      - from: org
        to: admin
        step: 1
      - from: admin
        to: service
        step: 2
    steps:
      - After trusted access is enabled, register a supported member account for service-specific
        administration.
      - That account manages the service for organization accounts while remaining subject to
        member-account SCPs.
cards:
  - id: organizations-010
    q: A team must administer a supported service across AWS Organizations without routinely using the
      management account. What should it configure?
    a: Enable trusted access and register a service-specific delegated administrator member account. Use
      the service tools for setup when available.
    facts:
      - organizations-integration-trusted
      - organizations-integration-delegate
      - organizations-integration-prerequisite
      - organizations-integration-service-tools
  - id: organizations-011
    q: Do all AWS Organizations services with trusted access support delegated administrators?
    a: No. StackSets, Config, CloudTrail, and GuardDuty support delegation, while RAM, Control Tower,
      and Directory Service do not support service-specific delegated administration through this
      integration.
    trap: true
    facts:
      - organizations-integration-support-one
      - organizations-integration-no-support
  - id: organizations-027
    q: An AWS Organizations administrator enables RAM trusted access only in Organizations, but
      organization sharing fails. What setup is missing?
    a: Enable organization sharing through RAM so AWSServiceRoleForResourceAccessManager is created. The
      Organizations switch alone does not create that role.
    trap: true
    facts:
      - organizations-integration-ram-init
  - id: organizations-028
    q: A team needs a CloudTrail trail for current and future AWS Organizations member accounts that
      members cannot disable. What fits?
    a: Create an organization trail from the management account or a CloudTrail delegated administrator.
      New members are added automatically, and ordinary member users cannot modify or stop it.
    facts:
      - organizations-integration-trail
      - organizations-integration-trail-new
      - organizations-integration-trail-protect
  - id: organizations-029
    q: An AWS Organizations team must deploy a common CloudFormation baseline to accounts entering a
      workload OU. What integration fits?
    a: Use a service-managed StackSet with trusted access and automatic deployments to that OU.
      CloudFormation creates the deployment roles and skips the management account.
    facts:
      - organizations-integration-stacksets
      - organizations-integration-stacksets-target
      - organizations-integration-stacksets-auto
  - id: organizations-030
    q: Does registering an AWS service delegated administrator let that account change the entire AWS
      Organizations structure?
    a: No. Service-specific delegation grants that service administration plus read-only Organizations
      permissions. It does not itself grant organization mutation rights, and SCPs still apply to
      the member account.
    trap: true
    facts:
      - organizations-integration-permissions
      - organizations-integration-scp
  - id: organizations-031
    q: Does disabling an AWS Organizations trusted-access switch guarantee the service deletes its
      historical configuration?
    a: No. Cleanup depends on the service. Use its own tools to disable integration when available and
      check its documented cleanup behavior.
    trap: true
    facts:
      - organizations-integration-disable
      - organizations-integration-service-tools
---

Trusted access lets an AWS service work across organization accounts. Delegated administration lets a chosen member account manage that service for the organization, reducing routine use of the management account.

### How it works

1. Check the service's Organizations integration. Trusted access and delegated administration are separate capabilities; support for one does not guarantee the other.
2. Enable trusted access through the service's own tools when available. This performs its initialization. The service can create service-linked roles, roles reserved for that service, in member accounts when needed.
3. Register a supported member account as the service's delegated administrator. It receives service-specific permissions plus read-only Organizations permissions, not general rights to change the organization hierarchy.
4. Keep workloads in member accounts and use the management account for tasks that require it. Delegated administrator accounts remain subject to SCPs.
5. Disable integrations through the service when possible so cleanup can run. Turning off the Organizations switch does not guarantee deletion of historical configuration or data.

| Integration | Service-specific delegation | Purpose |
| --- | --- | --- |
| StackSets | Yes | Deploy infrastructure across organization accounts |
| Config | Yes | Manage organization configuration and compliance |
| CloudTrail | Yes | Manage organization trails |
| GuardDuty, Security Hub CSPM, Backup | Yes | Manage the respective service across accounts |
| RAM | No | Share supported resources with accounts and OUs |
| Control Tower, Directory Service | No | Use their supported trusted-access integrations |

Other documented delegation examples include Detective, Inspector, Macie, Firewall Manager, IAM Access Analyzer, Systems Manager, IAM Identity Center, and Service Catalog.

Enable RAM sharing from RAM itself so its service-linked role is created. Normal organization shares avoid invitation exchanges, but consuming administrators must still grant their principals IAM access.

An organization trail covers the management and member accounts, automatically adds new members, and cannot be changed by ordinary member-account users. Service-managed StackSets create deployment roles and can automatically deploy stacks, collections of CloudFormation-managed resources, to new accounts entering a target OU. They skip the management account.

### Exam cues

- If the question says manage a supported security service from a member account, think trusted access plus delegated administration, because delegation is service-specific.
- If the question says RAM sharing fails after only enabling Organizations trusted access, think enable sharing through RAM, because that setup creates the required role.
- If the question says deploy a baseline whenever accounts enter an OU, think automatic service-managed StackSets, because they track the target's account membership.
- If the question says members must not disable central audit logging, think organization trail, because ordinary members cannot modify it.

### Remember

- Delegated service administration includes read-only Organizations access.
- Trusted services create service-linked roles when needed.
- RAM, Control Tower, and Directory Service have trusted access without service-specific delegated administration through this integration.

> **Trap:** Enabling trusted access is not the same as completing a service's initialization. RAM explicitly requires its own sharing setup.
