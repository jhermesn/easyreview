---
title: Governed multi-account landing zone
level: professional
order: 70
facts:
  - id: landing-zone
    text: Control Tower orchestrates AWS services including Organizations, Service Catalog, and IAM Identity Center to set up and govern a multi-account landing zone.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#what-is-control-tower
  - id: controls
    text: AWS Control Tower applies controls (guardrails), which are preventive, detective or proactive rules, to the accounts in its landing zone.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html
  - id: factory
    text: Account Factory provides configurable account templates to standardize account provisioning and enrollment.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#related-services
  - id: shared-names
    text: Shared account default names changed with version 4.0 from Log Archive and Audit to CloudTrail Administrator and Aggregator account; names can be customized.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/getting-started-configure.html#getting-started-configure
  - id: scp-ceiling
    text: An SCP limits the available permissions of principals in member accounts and never grants access.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: scp-management
    text: SCPs do not restrict the management account, but delegated administrator member accounts remain subject to them.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html#scp-effects-on-permissions
  - id: delegated-admin
    text: A delegated administrator is a member account registered to administer a particular supported AWS service for the organization.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_delegated_admin.html
  - id: delegated-services
    text: StackSets, Config, CloudTrail, GuardDuty, Security Hub CSPM, and Backup support service-specific delegated administrators.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services_list.html
  - id: gd-regional
    text: The GuardDuty delegated administrator and members must be configured in each desired Region, using the same delegated administrator account across Regions.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#delegated_admin_important
  - id: org-trail
    text: A management account or CloudTrail delegated administrator can create an organization trail covering management and member accounts.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html
  - id: org-trail-protect
    text: Ordinary member-account users cannot modify, delete, or stop organization trails.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html
  - id: org-trail-new
    text: New organization members are automatically added to an organization trail for logging.
    source: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html
  - id: identity-center
    text: IAM Identity Center gives users MFA-protected single sign-on access to their assigned AWS accounts, with identities managed in Identity Center or a SAML 2.0 identity provider.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html#id_credentials_mfa
  - id: permission-set
    text: A permission set is a collection of IAM policies used to assign account access in IAM Identity Center.
    source: https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html#permissionsetsconcept
  - id: aggregator
    text: A Config aggregator collects configuration and compliance data from multiple accounts and Regions, one account across Regions, or an organization whose accounts have Config enabled.
    source: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html
  - id: aggregator-readonly
    text: Aggregators replicate data into a read-only view and cannot mutate source accounts, deploy rules, or push snapshots back to sources.
    source: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html
  - id: sh-home-region
    text: Cross-Region aggregation replicates findings, updates, insights, control compliance statuses, and security scores to a home Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/finding-aggregation.html#finding-aggregation-overview
  - id: account-create
    text: Service Catalog calls Control Tower; Control Tower first calls Organizations CreateAccount, then applies blueprints and controls.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/accounts.html#accounts
  - id: cfct
    text: CfCT deploys CloudFormation templates, SCPs, and RCPs to accounts or OUs and integrates with lifecycle events to apply configured customizations to new Account Factory accounts.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/cfct-overview.html#cfct-overview
  - id: cfct-stacksets
    text: CfCT deploys CloudFormation resources through StackSets in manifest order; manifest order expresses dependencies.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/cfct-codepipeline-overview.html#code-pipeline-stages
  - id: aft
    text: AFT provides a Terraform pipeline for provisioning and customizing Control Tower accounts through account request files committed to Git.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-overview.html#aft-overview
  - id: aft-scope
    text: AFT is intended for account provisioning and customization, not deployment of application workload resources.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/aft-overview.html#aft-overview
  - id: drift
    text: Governance drift occurs when managed accounts, OUs, or policies change from the configuration expected by Control Tower.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.html#governance-drift
  - id: scp-drift
    text: Editing or detaching a Control Tower-managed SCP causes policy drift; updating the landing zone is a documented remediation.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.html#drift-scp-detached-ou
  - id: drift-events
    text: Landing zone 4.0 and later sends drift notifications to EventBridge in the management account instead of SNS.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/key-changes-lz-v4.html#key-changes-lz-v4
  - id: drift-pattern
    text: The documented drift event uses source aws.controltower and detail-type Drift Detected; a rule can target SNS or Lambda.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.html#eventbridge-creation
  - id: access-role
    text: Accounts created in Organizations receive OrganizationAccountAccessRole by default.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html
  - id: invited-role
    text: Invited accounts do not automatically receive OrganizationAccountAccessRole; it can be created manually.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html
  - id: preventive
    text: Preventive controls block actions that violate policy and use Organizations SCPs, RCPs, or declarative policies.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: detective
    text: Detective controls use Config rules to identify resource noncompliance and report it in the dashboard.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
diagrams:
  - id: governed-multi-account-landing-zone
    title: A landing zone that vends, customizes, logs and watches every account
    facts: [landing-zone, controls, factory, shared-names, scp-ceiling, scp-management, delegated-admin, delegated-services, gd-regional, org-trail, org-trail-protect, org-trail-new, identity-center, permission-set, aggregator, aggregator-readonly, sh-home-region, account-create, cfct, cfct-stacksets, aft, aft-scope, drift, scp-drift, drift-events, drift-pattern, access-role, invited-role, preventive, detective]
    width: 1240
    height: 720
    groups:
      - { label: Management account, x: 20, y: 20, w: 600, h: 430, tone: mgmt, icon: group-aws-account }
      - { label: Workloads OU, x: 20, y: 490, w: 600, h: 210, tone: neutral }
      - { label: CloudTrail administrator account, x: 660, y: 20, w: 560, h: 200, tone: neutral, icon: group-aws-account }
      - { label: Security tooling account, x: 660, y: 260, w: 560, h: 440, tone: security, icon: group-aws-account }
    nodes:
      - { id: ct, label: Control Tower, sub: landing zone, x: 50, y: 70, w: 160, h: 86, tone: mgmt, icon: control-tower, info: "Preventive controls are enforced with SCPs and similar policies; detective controls use Config rules." }
      - { id: org, label: Organizations, sub: OUs and SCPs, x: 240, y: 70, w: 160, h: 86, tone: mgmt, icon: organizations }
      - { id: factory, label: Account Factory, sub: Service Catalog, x: 430, y: 70, w: 160, h: 86, tone: mgmt, icon: service-catalog, info: "Control Tower calls Organizations CreateAccount, then applies blueprints and controls. AFT offers the same vending as a Terraform pipeline." }
      - { id: drift, label: Drift rule, sub: EventBridge, x: 50, y: 200, w: 160, h: 86, tone: integration, icon: res-eventbridge-rule }
      - { id: cfct, label: CfCT, sub: customizations, x: 430, y: 200, w: 160, h: 86, tone: devtools, icon: codepipeline, info: "Deploys CloudFormation templates through StackSets, and SCPs, in manifest order." }
      - { id: sns, label: SNS topic, sub: platform team, x: 50, y: 330, w: 160, h: 86, tone: integration, icon: simple-notification-service }
      - { id: dev, label: Development, sub: member account, x: 240, y: 540, w: 160, h: 86, tone: neutral, icon: res-organizations-account }
      - { id: newacct, label: New account, sub: vended, x: 430, y: 540, w: 160, h: 86, tone: neutral, icon: res-organizations-account, info: "Accounts created through Organizations get OrganizationAccountAccessRole; invited accounts do not." }
      - { id: trail, label: CloudTrail, sub: organization trail, x: 700, y: 70, w: 170, h: 86, tone: mgmt, icon: cloudtrail }
      - { id: logs, label: S3 bucket, sub: central log archive, x: 1000, y: 70, w: 170, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: sh, label: Security Hub CSPM, sub: delegated admin, x: 700, y: 310, w: 180, h: 86, tone: security, icon: security-hub, info: "Aggregates findings from every account into a home Region." }
      - { id: cfg, label: Config aggregator, sub: read-only view, x: 1000, y: 430, w: 180, h: 86, tone: mgmt, icon: config }
      - { id: gd, label: GuardDuty, sub: delegated admin, x: 700, y: 550, w: 180, h: 86, tone: security, icon: guardduty, info: "Configured in each Region with the same delegated administrator account." }
    edges:
      - { from: ct, to: org, step: 1 }
      - { from: org, to: dev, step: 2 }
      - { from: factory, to: cfct, step: 3 }
      - { from: cfct, to: newacct, step: 4 }
      - { from: newacct, to: trail, step: 5 }
      - { from: trail, to: logs, step: 5 }
      - { from: newacct, to: sh, step: 6 }
      - { from: newacct, to: gd, step: 6 }
      - { from: gd, to: sh, step: 6 }
      - { from: newacct, to: cfg, step: 7 }
      - { from: ct, to: drift, step: 8, dashed: true }
      - { from: drift, to: sns, step: 8, dashed: true }
    steps:
      - "Control Tower builds the landing zone on Organizations: OUs, shared accounts, preventive controls enforced as SCPs, and detective controls that use Config rules."
      - "SCPs on the Workloads OU cap what any principal in its accounts can do. They never grant access, and they don't restrict the management account."
      - "A team requests an account through Account Factory. Control Tower calls Organizations CreateAccount and applies the baseline and controls; the lifecycle event starts the CfCT pipeline."
      - "CfCT deploys the company's CloudFormation templates, through StackSets, and its SCPs to the new account in manifest order."
      - "The organization trail covers the new account automatically and delivers to the central log archive bucket. Member accounts cannot stop or change it."
      - "The account sends findings to the delegated administrators in the security tooling account. GuardDuty findings flow into Security Hub CSPM, which aggregates them in its home Region."
      - "A Config aggregator collects the account's configuration and compliance data into a read-only, organization-wide view."
      - "If someone edits or detaches a Control Tower managed SCP, Control Tower detects policy drift and sends a Drift Detected event to EventBridge in the management account. A rule alerts the platform team, which repairs it by updating the landing zone."
cards:
  - id: reference-architectures-040
    q: "A company needs a governed multi-account AWS environment with preventive and detective guardrails and standardized account vending. Which service fits?"
    a: "**AWS Control Tower**: it sets up a landing zone on Organizations, applies controls (guardrails) and creates accounts through Account Factory."
    facts: [landing-zone, controls, factory]
  - id: reference-architectures-041
    q: "An SCP on the Workloads OU allows only approved Regions. A developer in a member account still cannot launch EC2 in an approved Region. Why, and does the SCP restrict the management account?"
    a: "An SCP only **limits** permissions; the developer still needs an IAM policy that grants the action. SCPs do not restrict the management account."
    trap: true
    facts: [scp-ceiling, scp-management]
  - id: reference-architectures-042
    q: "A security team must run GuardDuty and Security Hub CSPM for every account without working in the management account. What should be configured?"
    a: "Register a security tooling account as the **delegated administrator** for each service. For GuardDuty, set it up in every Region with the same account. SCPs still apply to that account."
    facts: [delegated-admin, delegated-services, gd-regional, scp-management]
  - id: reference-architectures-043
    q: "API activity in every account, including accounts created later, must be logged to one bucket, and member account admins must not be able to stop it. What fits?"
    a: "An **organization trail** created from the management account or a CloudTrail delegated administrator. New members join it automatically, and members cannot modify or stop it."
    facts: [org-trail, org-trail-protect, org-trail-new]
  - id: reference-architectures-044
    q: "An auditor wants one read-only view of AWS Config compliance across all accounts. A team proposes a Config aggregator to also turn on recording and deploy rules in member accounts. Will that work?"
    a: "No. An aggregator only **collects** data already recorded and shows it read-only. Recording and rules must be deployed separately, for example with conformance packs or StackSets."
    trap: true
    facts: [aggregator, aggregator-readonly]
  - id: reference-architectures-045
    q: "Engineers need one MFA-protected sign-in to reach the accounts they are assigned, with a standard set of permissions in each. What fits?"
    a: "**IAM Identity Center** with **permission sets** assigned per account."
    facts: [identity-center, permission-set]
  - id: reference-architectures-046
    q: "Security Hub CSPM is enabled in several Regions, and the team wants all findings and security scores in one Region. What should it configure?"
    a: "**Cross-Region aggregation** with a **home Region**, which receives findings, updates, insights and scores from the linked Regions."
    facts: [sh-home-region]
  - id: reference-architectures-127
    q: "Every new account must arrive with the company's network baseline, IAM roles and SCPs, without manual steps after Account Factory creates it. What fits?"
    a: "**Customizations for Control Tower (CfCT)**, which reacts to the account's lifecycle event and deploys templates through StackSets, plus SCPs, in manifest order. AFT does the same as a Terraform pipeline."
    facts: [cfct, cfct-stacksets, aft]
  - id: reference-architectures-128
    q: "A team plans to deploy its application stacks through Account Factory for Terraform (AFT) because it already provisions their accounts. Is that the intended use?"
    a: "No. AFT is meant for **account provisioning and customization**, not for deploying application workloads. Use a deployment pipeline for those."
    trap: true
    facts: [aft-scope]
  - id: reference-architectures-129
    q: "An administrator detached a Control Tower managed SCP from an OU. How does the platform team find out, and how is it repaired?"
    a: "Control Tower detects **policy drift** and, from landing zone 4.0, sends a **Drift Detected** event to EventBridge in the management account; a rule can alert through SNS. **Updating the landing zone** repairs it."
    facts: [drift, scp-drift, drift-events, drift-pattern]
  - id: reference-architectures-130
    q: "An account joined the organization by invitation. The management account's admins try to assume OrganizationAccountAccessRole in it and fail. Why?"
    a: "Only accounts **created** through Organizations get that role by default. For an **invited** account, create the role manually."
    trap: true
    facts: [access-role, invited-role]
---
Governance questions at the professional level describe dozens of accounts and ask how to keep them consistent, logged and monitored without slowing teams down. The answer is a landing zone: Control Tower on top of Organizations, shared accounts for logs and security tooling, guardrails on OUs, and single sign-on for people.

### How it works

1. Control Tower sets up the landing zone on Organizations, with OUs, shared accounts and controls. Account Factory vends new accounts, and CfCT (or AFT, with Terraform) applies the company's customizations to each one. [What is Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html)
2. SCPs on OUs set the maximum permissions for member accounts. IAM policies inside each account still grant the actual access.
3. IAM Identity Center gives people single sign-on, and permission sets define what they get in each account.
4. An organization trail sends every account's activity to the central log archive bucket. Since landing zone 4.0, the shared accounts are named CloudTrail Administrator and Aggregator by default (formerly Log Archive and Audit).
5. A security tooling account is the delegated administrator for GuardDuty and Security Hub CSPM. A Config aggregator gives a read-only compliance view across accounts.
6. Control Tower reports drift, such as an edited managed SCP, as an EventBridge event in the management account; updating the landing zone repairs it.

| Account | Holds | Why separate |
|---|---|---|
| Management | Organizations, Control Tower, Identity Center | SCPs don't restrict it, so keep workloads out |
| CloudTrail administrator (log archive) | Organization trail logs | Members cannot alter the record |
| Security tooling (audit, aggregator) | Delegated admins for security services | Daily security work outside management |
| Workload accounts | Applications, per environment | Blast radius and SCP boundaries |

| Decision | Choose | When |
|---|---|---|
| Vend accounts | Account Factory | Standard accounts from the console or Service Catalog |
| Customize new accounts with CloudFormation | CfCT | Templates and SCPs applied on each lifecycle event |
| Vend and customize with Terraform | AFT | Account requests committed to Git |
| Detect broken governance | Drift Detected events | A managed SCP, OU or shared account changed |
| Admin access to a member account | OrganizationAccountAccessRole | Created by default only in accounts created through Organizations |

### Exam cues

- If the question says set up and govern many accounts with guardrails, think Control Tower, because it orchestrates Organizations, controls and Account Factory.
- If the question says restrict what member accounts can ever do, think SCPs on OUs, because they cap permissions without granting any.
- If the question says manage a security service for all accounts outside the management account, think delegated administrator.
- If the question says log every account and members must not disable it, think organization trail.
- If the question says one read-only compliance view across accounts, think Config aggregator.
- If the question says apply the same customizations to every new account automatically, think CfCT, or AFT for Terraform.
- If the question says someone changed a managed SCP or moved a shared account, think Control Tower drift and updating the landing zone.

### Remember

- SCPs never grant access and don't apply to the management account.
- Delegated administrator accounts are still subject to SCPs.
- GuardDuty delegated admin is set per Region, same account in every Region.
- Organization trails add new accounts automatically.
- Config aggregators are read-only.
- AFT is for accounts, not application workloads.
- Invited accounts have no OrganizationAccountAccessRole until someone creates it.

> **Trap:** Running workloads in the management account defeats the guardrails, because SCPs never restrict that account.
