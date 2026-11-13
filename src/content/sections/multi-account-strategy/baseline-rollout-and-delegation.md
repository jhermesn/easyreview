---
title: Baseline rollout and delegation
level: professional
order: 20
facts:
  - id: scp
    text: An SCP limits maximum permissions for member-account IAM principals but never grants permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#orgs_manage_policies_scps
  - id: scp-exceptions
    text: SCPs do not constrain the management account or service-linked roles; delegated administrator member
      accounts remain subject to SCPs.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#orgs_manage_policies_scps
  - id: rcp
    text: An RCP limits access to supported member-account resources, including requests by external principals,
      but does not grant access or constrain management-account resources.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
  - id: trusted-access
    text: Trusted access allows an integrated AWS service to perform organization tasks and create required
      service-linked roles.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html
  - id: delegation
    text: A delegated administrator is a member account authorized to administer a particular integrated service
      for the organization.
    source: https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/design-principles-for-your-multi-account-strategy.html#design-principles-for-your-multi-account-strategy
  - id: control-scope
    text: Control Tower controls apply to organizational units and their accounts.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/controls.html#controls
  - id: preventive
    text: Control Tower preventive controls disallow noncompliant actions and can use SCPs, RCPs, and declarative
      policies.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: detective
    text: Control Tower detective controls use AWS Config rules to detect noncompliance.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: proactive
    text: Control Tower proactive controls use CloudFormation hooks to check resources before CloudFormation
      provisions them.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: factory
    text: Account Factory provisions Control Tower accounts through a workflow involving Service Catalog and
      Organizations, then applies blueprints and controls.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/accounts.html
  - id: aft
    text: AFT provides a Terraform pipeline for Control Tower account provisioning and customization; it requires
      an existing landing zone and is not an application deployment pipeline.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-overview.html
  - id: stacksets
    text: Service-managed StackSets require trusted access and create target-account roles for deployments across
      organization accounts and selected Regions.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: stackset-exclusion
    text: Service-managed StackSets do not deploy into the management account or accounts outside the organization.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: automatic
    text: StackSets automatic deployment can add stacks when accounts join target OUs and delete or retain stacks
      when accounts leave.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-manage-auto-deployment.html#stacksets-orgs-manage-auto-deployment
  - id: central-policy
    text: Security Hub CSPM central configuration lets a delegated administrator apply configuration policies to
      accounts and OUs in the home and linked Regions.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html#central-configuration-intro
  - id: scp-all-features
    text: SCPs require all features enabled in Organizations and are unavailable with consolidated billing alone.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#orgs_manage_policies_scps
  - id: rcp-all-features
    text: RCPs require all features enabled in Organizations and are unavailable with consolidated billing alone.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
cards:
  - id: multi-account-strategy-014
    q: An AWS team wants preventive, detective, and proactive controls across an OU. How does Control Tower
      implement them?
    a: Preventive controls use Organizations policies; detective controls use Config rules; proactive controls use
      CloudFormation hooks before provisioning.
    facts:
      - preventive
      - detective
      - proactive
      - control-scope
  - id: multi-account-strategy-015
    q: What is the difference between AWS Organizations trusted access and delegated administration?
    a: Trusted access lets a supported service work across the organization. Delegated administration authorizes a
      member account to administer that particular service.
    facts:
      - trusted-access
      - delegation
  - id: multi-account-strategy-016
    q: New AWS accounts joining an OU must receive the same baseline stacks in selected Regions. What should the
      platform team use?
    a: Service-managed CloudFormation StackSets with trusted access and automatic deployment enabled for that OU.
    facts:
      - stacksets
      - automatic
  - id: multi-account-strategy-017
    q: An SCP permits an action, but an IAM role has no policy granting that action. Is the role authorized?
    a: No. SCPs limit permissions; they do not grant them.
    facts:
      - scp
    trap: true
  - id: multi-account-strategy-018
    q: A team already uses Control Tower and wants Terraform-driven account provisioning and customization. Which
      feature fits?
    a: Account Factory for Terraform (AFT). It requires an existing Control Tower landing zone and manages
      accounts rather than application deployments.
    facts:
      - aft
  - id: multi-account-strategy-019
    q: Can a service-managed StackSet deploy a baseline into the AWS Organizations management account?
    a: No. Deploy that account separately; service-managed StackSets exclude it.
    facts:
      - stackset-exclusion
    trap: true
  - id: multi-account-strategy-022
    q: An AWS organization uses only consolidated billing and needs SCP and RCP permission boundaries. What
      prerequisite is missing?
    a: Enable all features in AWS Organizations. SCPs and RCPs are not available in consolidated-billing-only
      organizations.
    facts:
      - scp-all-features
      - rcp-all-features
---
A multi-account baseline is a common set of policies and resources rolled out across accounts. Organizations supplies policy boundaries; Control Tower adds account provisioning and controls; integrated services can delegate administration to member accounts.

### How it works

1. Attach permission limits at the appropriate organization or OU scope. A service control policy (SCP) limits what member-account identities can do. A resource control policy (RCP) limits access to supported resources, including access by outside identities. Neither grants access. Both require all features in Organizations; consolidated billing alone is insufficient.
2. Enable trusted access for an integrated service so it can perform organization-wide work. Register a delegated administrator for that service when supported, reducing daily use of the management account.
3. Apply Control Tower controls to OUs.

   | Control behavior | Implementation | Result |
   |---|---|---|
   | Preventive | SCP, RCP, or declarative policy | Disallows noncompliant actions |
   | Detective | Config rule | Reports noncompliance |
   | Proactive | CloudFormation hook | Checks resources before CloudFormation provisioning |

4. Provision accounts with Account Factory. For Terraform-based account workflows, use AFT with an existing landing zone, the governed Control Tower environment.
5. Deploy baseline resources with service-managed StackSets, a way to deploy stacks across accounts and Regions. Enable automatic deployment for future accounts in target OUs and choose whether stacks are retained when accounts leave.
6. Use Security Hub CSPM central configuration policies for service settings in the home and linked Regions. Service-specific configuration and resource deployment solve different parts of the baseline.

### Exam cues

- If the question says install baseline resources automatically when accounts join an OU, think service-managed StackSets with automatic deployment, because OU membership drives stack creation.
- If the question says reduce management-account use, think service-specific delegated administration, because a member account can administer a supported integration.
- If the question says reject a noncompliant resource before CloudFormation creates it, think proactive control, because its hook runs before provisioning.

### Remember

- SCPs exclude the management account and service-linked roles; they still constrain delegated administrator member accounts.
- RCPs cover supported member-account resources, not management-account resources.
- Service-managed StackSets require trusted access and exclude the management account.
- AFT provisions and customizes accounts, not application resources.

> **Trap:** Registering a delegated administrator for one service does not make that account the administrator of every integrated service.
