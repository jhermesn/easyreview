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
diagrams:
  - id: governed-multi-account-landing-zone
    title: A landing zone with shared logging and security accounts
    width: 1240
    height: 720
    groups:
      - { label: Management account, x: 20, y: 20, w: 560, h: 300, tone: mgmt, icon: group-aws-account }
      - { label: CloudTrail administrator account, x: 640, y: 20, w: 580, h: 300, tone: neutral, icon: group-aws-account }
      - { label: Workloads OU, x: 20, y: 360, w: 560, h: 340, tone: neutral }
      - { label: Security tooling account, x: 640, y: 360, w: 580, h: 340, tone: security, icon: group-aws-account }
    nodes:
      - { id: ct, label: Control Tower, sub: landing zone, x: 60, y: 70, w: 160, h: 86, tone: mgmt, icon: control-tower, info: "Sets up the OUs and shared accounts, applies controls and vends accounts through Account Factory." }
      - { id: org, label: Organizations, sub: OUs and SCPs, x: 330, y: 70, w: 160, h: 86, tone: mgmt, icon: organizations }
      - { id: idc, label: Identity Center, sub: permission sets, x: 60, y: 200, w: 180, h: 86, tone: security, icon: iam-identity-center }
      - { id: trail, label: CloudTrail, sub: organization trail, x: 680, y: 90, w: 170, h: 86, tone: mgmt, icon: cloudtrail }
      - { id: logs, label: S3 bucket, sub: central log archive, x: 1000, y: 90, w: 170, h: 86, tone: storage, icon: res-simple-storage-service-bucket }
      - { id: prod, label: Production, sub: member account, x: 60, y: 430, w: 160, h: 86, tone: neutral, icon: res-organizations-account }
      - { id: dev, label: Development, sub: member account, x: 330, y: 430, w: 160, h: 86, tone: neutral, icon: res-organizations-account }
      - { id: sh, label: Security Hub CSPM, sub: delegated admin, x: 680, y: 420, w: 180, h: 86, tone: security, icon: security-hub, info: "Aggregates findings from every account into a home Region." }
      - { id: gd, label: GuardDuty, sub: delegated admin, x: 680, y: 580, w: 180, h: 86, tone: security, icon: guardduty, info: "Configured in each Region with the same delegated administrator account." }
    edges:
      - { from: ct, to: org, step: 1 }
      - { from: org, to: prod, step: 2 }
      - { from: org, to: dev, step: 2 }
      - { from: idc, to: prod, step: 3 }
      - { from: idc, to: dev, step: 3 }
      - { from: org, to: trail, step: 4 }
      - { from: trail, to: logs, step: 4 }
      - { from: dev, to: sh, step: 5 }
      - { from: dev, to: gd, step: 5 }
      - { from: gd, to: sh, step: 6 }
    steps:
      - "Control Tower builds the landing zone on Organizations: OUs, shared accounts and controls. Account Factory creates new accounts from a standard template."
      - "Service control policies on the OUs cap what any principal in a member account can do. They never grant access, and they don't restrict the management account."
      - "People sign in once through IAM Identity Center and get access to each account through permission sets."
      - "An organization trail records every account, including accounts added later, and delivers to the central log archive bucket. Member accounts cannot stop or change it."
      - "Each member account sends security findings to delegated administrators in the security tooling account, so daily security work stays out of the management account."
      - "GuardDuty findings flow into Security Hub CSPM, which aggregates findings from all Regions in its home Region."
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
---
Governance questions at the professional level describe dozens of accounts and ask how to keep them consistent, logged and monitored without slowing teams down. The answer is a landing zone: Control Tower on top of Organizations, shared accounts for logs and security tooling, guardrails on OUs, and single sign-on for people.

### How it works

1. Control Tower sets up the landing zone on Organizations, with OUs, shared accounts and controls. Account Factory vends new accounts from a template. [What is Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html)
2. SCPs on OUs set the maximum permissions for member accounts. IAM policies inside each account still grant the actual access.
3. IAM Identity Center gives people single sign-on, and permission sets define what they get in each account.
4. An organization trail sends every account's activity to the central log archive bucket. Since landing zone 4.0, the shared accounts are named CloudTrail Administrator and Aggregator by default (formerly Log Archive and Audit).
5. A security tooling account is the delegated administrator for GuardDuty and Security Hub CSPM. A Config aggregator gives a read-only compliance view across accounts.

| Account | Holds | Why separate |
|---|---|---|
| Management | Organizations, Control Tower, Identity Center | SCPs don't restrict it, so keep workloads out |
| CloudTrail administrator (log archive) | Organization trail logs | Members cannot alter the record |
| Security tooling (audit, aggregator) | Delegated admins for security services | Daily security work outside management |
| Workload accounts | Applications, per environment | Blast radius and SCP boundaries |

### Exam cues

- If the question says set up and govern many accounts with guardrails, think Control Tower, because it orchestrates Organizations, controls and Account Factory.
- If the question says restrict what member accounts can ever do, think SCPs on OUs, because they cap permissions without granting any.
- If the question says manage a security service for all accounts outside the management account, think delegated administrator.
- If the question says log every account and members must not disable it, think organization trail.
- If the question says one read-only compliance view across accounts, think Config aggregator.

### Remember

- SCPs never grant access and don't apply to the management account.
- Delegated administrator accounts are still subject to SCPs.
- GuardDuty delegated admin is set per Region, same account in every Region.
- Organization trails add new accounts automatically.
- Config aggregators are read-only.

> **Trap:** Running workloads in the management account defeats the guardrails, because SCPs never restrict that account.
