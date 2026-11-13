---
title: Service control policies
level: professional
order: 20
facts:
  - id: organizations-scp-ceiling
    text: An SCP limits the available permissions of principals in member accounts and never grants
      access.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: organizations-scp-all-features
    text: SCPs require the organization all-features mode and the SCP policy type enabled.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: organizations-scp-path
    text: An action needs an SCP Allow at every level from the root through each OU to the target
      account.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html#how_scps_allow
  - id: organizations-scp-deny
    text: An explicit SCP Deny at any point on the account path overrides allows at other levels.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html#how_scps_deny
  - id: organizations-scp-full
    text: Organizations attaches FullAWSAccess to the root, OUs, and accounts by default to allow
      actions through SCP evaluation.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html#strategy_using_scps
  - id: organizations-scp-remove
    text: Removing FullAWSAccess without another Allow at that level blocks actions for affected member
      principals.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: organizations-scp-denylist
    text: A deny-list SCP strategy retains FullAWSAccess or another Allow policy and adds Deny
      restrictions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html
  - id: organizations-scp-allowlist
    text: An allow-list SCP strategy replaces broad allows with selected actions; lower levels cannot
      broaden an ancestor ceiling.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html#strategy_using_scps
  - id: organizations-scp-iam
    text: AdministratorAccess cannot override a missing SCP Allow or an explicit SCP Deny.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: organizations-scp-member-root
    text: SCPs restrict member-account root users subject to the documented root-task exceptions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#scp-effects-on-permissions
  - id: organizations-scp-management
    text: SCPs do not restrict the management account, but delegated administrator member accounts
      remain subject to them.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#scp-effects-on-permissions
  - id: organizations-scp-linked
    text: SCPs do not restrict service-linked roles.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#scp-effects-on-permissions
  - id: organizations-scp-exceptions
    text: SCP exceptions include root-user Enterprise Support enrollment and CloudFront trusted-signer
      functionality.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#not-restricted-by-scp
  - id: organizations-scp-external
    text: SCPs on a resource-owning member account do not restrict principals in accounts outside that
      organization.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#scp-effects-on-permissions
  - id: organizations-scp-region
    text: A Region-deny SCP can use aws:RequestedRegion with NotAction exceptions for global services
      such as IAM.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_syntax.html
  - id: organizations-scp-endpoint
    text: aws:RequestedRegion controls the endpoint called, not all cross-Region effects of that
      operation.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-requestedregion
  - id: organizations-scp-global
    text: Some global services use endpoints outside permitted workload Regions, so a Region deny needs
      appropriate service exceptions.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_aws_deny-requested-region.html
  - id: organizations-scp-config
    text: An SCP can deny config:DeleteConfigurationRecorder, config:DeleteDeliveryChannel,
      config:PutConfigurationRecorder, config:PutDeliveryChannel, and
      config:StopConfigurationRecorder.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/mandatory-controls.html
  - id: organizations-scp-selective
    text: SCP statements can deny selected actions with conditions, leaving other actions subject to
      their existing permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_syntax.html
  - id: organizations-scp-testing
    text: AWS recommends testing SCP impact on a limited set of accounts before broad attachment at the
      root.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html
  - id: organizations-scp-principal
    text: A principal is an identity that can make AWS requests, such as a user, role, or service.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html
  - id: organizations-scp-config-recorder
    text: A Config recorder captures resource configurations, and its delivery channel selects
      destinations for recorded data.
    source: https://docs.aws.amazon.com/config/latest/developerguide/update-dc-console.html
diagrams:
  - id: organizations-scp-path
    title: Every level must permit the action
    width: 800
    height: 250
    nodes:
      - id: root
        label: Root SCP
        icon: organizations
        x: 30
        y: 85
        w: 180
        h: 86
        tone: mgmt
        sub: Allow required
      - id: ou
        label: OU SCP
        icon: organizations
        x: 310
        y: 85
        w: 180
        h: 86
        tone: mgmt
        sub: Allow required
      - id: account
        label: Account SCP
        icon: res-organizations-account
        x: 590
        y: 85
        w: 180
        h: 86
        tone: mgmt
        sub: Allow required
    edges:
      - from: root
        to: ou
        step: 1
      - from: ou
        to: account
        step: 2
    steps:
      - The root and every parent OU must allow the action. An applicable explicit Deny blocks it.
      - The account must also allow the action through its SCPs; IAM still needs to grant access.
cards:
  - id: organizations-001
    q: What does an AWS Organizations service control policy grant?
    a: Nothing. An SCP sets the permission ceiling for member-account principals. IAM or resource
      policies must supply access within that ceiling, and SCPs require all-features mode.
    facts:
      - organizations-scp-ceiling
      - organizations-scp-all-features
  - id: organizations-002
    q: How are SCP permissions evaluated through nested AWS Organizations OUs?
    a: The action needs an Allow at every level from root through the OUs to the account. An explicit
      Deny anywhere on that path wins.
    facts:
      - organizations-scp-path
      - organizations-scp-deny
  - id: organizations-003
    q: An AWS Organizations administrator removes FullAWSAccess from the root and leaves only a
      deny-only SCP there. What happens?
    a: Affected member principals lose the Allow at the root, blocking their actions. Keep FullAWSAccess
      for a deny-list strategy or replace it with suitable explicit allows.
    trap: true
    facts:
      - organizations-scp-full
      - organizations-scp-remove
      - organizations-scp-denylist
  - id: organizations-004
    q: A member-account administrator has AdministratorAccess but an operation is blocked by an AWS
      Organizations SCP. Can IAM override it?
    a: No. The SCP ceiling still applies. Inspect every level on the account path for a missing Allow or
      explicit Deny.
    trap: true
    facts:
      - organizations-scp-iam
      - organizations-scp-path
      - organizations-scp-deny
  - id: organizations-005
    q: Can an SCP restrict the root user, users, or roles in the AWS Organizations management account?
    a: No. The management account is outside SCP restrictions. Delegated administrator member accounts
      remain restricted.
    trap: true
    facts:
      - organizations-scp-management
  - id: organizations-006
    q: Which AWS Organizations principals and tasks are exempt from SCP restrictions?
    a: The management account and service-linked roles are exempt. Some root-only tasks, including
      Enterprise Support enrollment and CloudFront trusted-signer functionality, are also
      exceptions. Member root users are otherwise restricted.
    facts:
      - organizations-scp-management
      - organizations-scp-linked
      - organizations-scp-exceptions
      - organizations-scp-member-root
  - id: organizations-021
    q: An AWS Organizations Region-deny SCP breaks IAM calls. How should the policy be corrected?
    a: Use appropriate NotAction exceptions for required global services. aws:RequestedRegion evaluates
      the endpoint Region; global endpoints may sit outside permitted workload Regions.
    facts:
      - organizations-scp-region
      - organizations-scp-global
      - organizations-scp-endpoint
  - id: organizations-022
    q: An AWS Organizations team must preserve baseline Config recording while leaving unrelated Config
      administration available. What SCP approach fits?
    a: Deny the recorder/channel modification, deletion, and stop actions that must be protected, with
      any required administrative exceptions. Avoid denying all Config actions.
    facts:
      - organizations-scp-config
      - organizations-scp-selective
  - id: organizations-023
    q: An AWS Organizations OU allow-list excludes an action, but the account-level SCP allows it. Is
      that sufficient?
    a: No. A lower-level allow cannot broaden an ancestor ceiling. The action needs an Allow at every
      level and no applicable explicit Deny.
    trap: true
    facts:
      - organizations-scp-allowlist
      - organizations-scp-path
      - organizations-scp-deny
---

A service control policy (SCP) is an organization-wide permissions limit for member-account identities. A principal is the identity making a request, such as a user or role. Passing SCP evaluation only leaves an action eligible; access still needs the appropriate IAM or resource policy.

### How it works

1. Enable all features and the SCP policy type. Attach policies to the root, OUs, or accounts.
2. Follow the account's path from the root. An action needs an `Allow` at every level, including the account. Any applicable explicit `Deny` wins.
3. Choose a policy strategy. A deny list retains `FullAWSAccess` or another suitable allow policy and adds restrictions. An allow list replaces broad allows with selected actions. A child cannot restore what an ancestor excludes.
4. Evaluate permissions inside that ceiling. Even `AdministratorAccess` cannot override an SCP restriction. Member-account root users and delegated administrators remain subject to SCPs, apart from documented exceptions.
5. Test restrictions on a limited set of accounts before widening their attachment.

For a Region restriction, use `aws:RequestedRegion` and exempt required global-service actions with `NotAction`. Global services can have endpoints outside the permitted workload Regions. This condition controls the endpoint called, not every cross-Region effect of a request.

For Config protection, deny selected baseline changes: `config:DeleteConfigurationRecorder`, `config:DeleteDeliveryChannel`, `config:PutConfigurationRecorder`, `config:PutDeliveryChannel`, and `config:StopConfigurationRecorder`. A recorder captures resource configurations; a delivery channel sends them to configured destinations. Conditions can preserve required administrative exceptions. Unrelated Config actions remain subject to their existing permissions.

### Exam cues

- If the question says an IAM administrator is denied by an SCP, think the entire policy path, because IAM cannot override the ceiling.
- If the question says a deny-only SCP replaces `FullAWSAccess`, think missing Allow, because a Deny statement does not supply the required Allow.
- If the question says a Region restriction breaks global services, think `NotAction` exceptions, because those service endpoints may use another Region.
- If the question says protect baseline Config without blocking all administration, think selected action denies, because SCPs can restrict specific operations.

### Remember

- SCPs grant no permissions.
- The management account and service-linked roles are exempt.
- Member-account root users are restricted, with documented exceptions such as Enterprise Support enrollment and CloudFront trusted-signer functions.
- An SCP does not restrict external principals simply because they access a resource in your member account.

> **Trap:** A delegated administrator is still a member account. Delegation does not exempt it from SCPs.
