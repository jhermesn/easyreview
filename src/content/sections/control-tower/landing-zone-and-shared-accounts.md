---
title: Landing zone and shared accounts
level: associate
order: 10
facts:
  - id: landing-zone-scope
    text: A landing zone contains the organizational units, accounts, identities, and resources subject to governance.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#features
  - id: ou
    text: An organizational unit groups accounts within the organization hierarchy.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html#landing-zone-structure
  - id: management
    text: The management account launches and administers Control Tower.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/special-accounts.html#mgmt-account
  - id: release-date
    text: Landing zone 4.0 was released in November 2025.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/configuration-updates.html
  - id: optional-integrations
    text: Landing zone 4.0 allows optional Config, CloudTrail, SecurityRoles, and Backup integrations and no longer requires a Security OU.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/landing-zone-v4-migration-guide.html#landing-zone-v4-migration-guide
  - id: integration-ou
    text: Accounts configured for service integrations must share the same parent OU; the management account is exempt from this placement rule.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html#how-it-works-setup
  - id: home-region
    text: The home Region cannot be changed after landing zone setup.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/getting-started-configure.html#getting-started-configure
  - id: default-names
    text: Shared account default names changed with version 4.0 from Log Archive and Audit to CloudTrail Administrator and Aggregator account; names can be customized.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/getting-started-configure.html#getting-started-configure
  - id: baseline-definition
    text: A baseline is a group of resources and configurations applied to a target.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/types-of-baselines.html#types-of-baselines
  - id: controls
    text: AWS Control Tower applies controls (guardrails), which are preventive, detective or proactive rules, to the accounts in its landing zone.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html
diagrams:
  - id: control-tower-integration-accounts
    title: Landing zone 4.0 optional integration accounts
    width: 900
    height: 345
    nodes:
      - id: ct
        label: Management
        sub: Control Tower
        icon: control-tower
        x: 25
        y: 125
        w: 180
        h: 86
        tone: mgmt
      - id: logs
        label: Logging account
        sub: CloudTrail logs
        icon: group-aws-account
        x: 650
        y: 40
        w: 215
        h: 86
        tone: mgmt
      - id: config
        label: Config account
        sub: Config data + aggregator
        icon: group-aws-account
        x: 650
        y: 220
        w: 215
        h: 86
        tone: mgmt
    groups:
      - label: Integration OU
        x: 610
        y: 5
        w: 275
        h: 330
        tone: mgmt
    edges:
      - from: ct
        to: logs
        label: CloudTrail enabled
      - from: ct
        to: config
        label: Config enabled
    steps: []
cards:
  - id: control-tower-014
    q: A team wants AWS Control Tower landing zone 4.0 controls while keeping its own logging and organizational structure. Must it use every service integration and a mandatory Security OU?
    a: No. Version 4.0 makes service integrations optional and lets customers define their organizational structure.
    trap: true
    facts:
      - optional-integrations
  - id: control-tower-016
    q: Can an AWS Control Tower administrator change the home Region after landing zone setup?
    a: No. The home Region is fixed after setup.
    facts:
      - home-region
  - id: control-tower-034
    q: Which AWS service sets up a multi-account landing zone and applies preventive and detective guardrails to its accounts?
    a: AWS Control Tower.
    facts: [controls]
---
AWS Control Tower sets up and governs a multi-account landing zone. A landing zone is the environment containing the accounts, identities, and resources that follow your governance rules. An organizational unit (OU) groups accounts under the organization hierarchy.

### How it works

1. Use the management account to launch and administer Control Tower. It coordinates services such as Organizations, Service Catalog, and IAM Identity Center.
2. Choose service integrations and the accounts that host their central resources. Service integration accounts share a parent OU; this placement rule excludes the management account.
3. Apply controls to landing zone accounts. Controls can be preventive, detective, or proactive rules.

### Exam cues

- If the question says centrally govern account creation and compliance across an organization, think Control Tower landing zone, because it coordinates account provisioning and governance services.
- If the question says keep an existing organizational structure and choose integrations, think landing zone 4.0, because integrations are optional and a Security OU is no longer required.
- If the question says change the home Region after setup, think choose it during setup, because it cannot be changed later.

### Remember

| Role | Earlier default name | Current purpose when enabled |
|---|---|---|
| Management account | Management | Administers the landing zone |
| CloudTrail administrator | Log Archive | Central CloudTrail log storage |
| Config aggregator | Audit | Configuration aggregation and dedicated Config storage |

- Landing zone 4.0 was released in November 2025. It makes service integrations optional and removes the mandatory Security OU structure.
- Versions 3.3 and earlier use the shared Log Archive and Audit accounts in a Security OU.
- Account names can be customized. The home Region cannot change after setup.

> **Trap:** Do not assume every landing zone always creates the same shared-account structure. The version and enabled service integrations determine the configuration.
