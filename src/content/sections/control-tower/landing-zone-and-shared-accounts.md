---
title: Landing zone and shared accounts
level: associate
order: 10
facts:
  - id: landing-zone
    text: Control Tower orchestrates AWS services including Organizations, Service Catalog, and IAM Identity Center to set up and govern a multi-account landing zone.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#what-is-control-tower
  - id: landing-zone-scope
    text: A landing zone contains the organizational units, accounts, identities, and resources subject to governance.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#features
  - id: ou
    text: An organizational unit groups accounts within the organization hierarchy.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html#landing-zone-structure
  - id: management
    text: The management account launches and administers Control Tower.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/special-accounts.html#mgmt-account
  - id: legacy-structure
    text: Landing zone 3.3 and earlier use a Security OU containing the shared Log Archive and Audit accounts.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html#landing-zone-structure
  - id: release-date
    text: Landing zone 4.0 was released in November 2025.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/configuration-updates.html
  - id: optional-integrations
    text: Landing zone 4.0 allows optional Config, CloudTrail, SecurityRoles, and Backup integrations and no longer requires a Security OU.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/landing-zone-v4-migration-guide.html#landing-zone-v4-migration-guide
  - id: integration-ou
    text: Accounts configured for service integrations must share the same parent OU; the management account is exempt from this placement rule.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html#how-it-works-setup
  - id: log-account
    text: The CloudTrail administrator account, formerly Log Archive, is created or selected for centralized CloudTrail logging.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/special-accounts.html#log-archive-account
  - id: config-account
    text: The Config aggregator account, formerly Audit, is created or selected when Config integration is enabled.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/special-accounts.html#audit-account
  - id: new-buckets
    text: In landing zone 4.0, Config log files use a dedicated bucket in the Config aggregator account; CloudTrail logs remain in the logging account.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/special-accounts.html#log-archive-account
  - id: aggregator
    text: Landing zone 4.0 uses a service-linked Config aggregator, which collects configuration data across accounts.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/config-updates-v4.html#config-updates-v4
  - id: config-scope
    text: In landing zone 4.0, landing-zone Config integration configures service integration accounts; member accounts require the Config baseline enabled on their managed OU.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/key-changes-lz-v4.html#key-changes-lz-v4
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
  - id: control-tower-002
    q: What environment does AWS Control Tower set up, and how does its landing zone 4.0 structure differ from earlier versions?
    a: A governed multi-account landing zone. Versions through 3.3 use Log Archive and Audit accounts in a Security OU; 4.0 makes service integrations optional and removes the required Security OU structure.
    facts:
      - landing-zone
      - legacy-structure
      - optional-integrations
  - id: control-tower-003
    q: What are AWS Control Tower's CloudTrail administrator and Config aggregator accounts for?
    a: The CloudTrail administrator account centralizes CloudTrail logs. The Config aggregator account supports Config integration and aggregation; in 4.0 it has its own Config log bucket. Earlier names were Log Archive and Audit.
    facts:
      - log-account
      - config-account
      - new-buckets
      - aggregator
  - id: control-tower-014
    q: A team wants AWS Control Tower landing zone 4.0 controls while keeping its own logging and organizational structure. Must it use every service integration and a mandatory Security OU?
    a: No. Version 4.0 makes service integrations optional and lets customers define their organizational structure.
    trap: true
    facts:
      - optional-integrations
  - id: control-tower-015
    q: A team enables AWS Config integration for an AWS Control Tower 4.0 landing zone but member accounts lack Config recorders. What additional configuration is needed?
    a: Enable the Config baseline on the managed member-account OUs. The landing-zone integration alone configures only service integration accounts.
    trap: true
    facts:
      - config-scope
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
3. Use centralized CloudTrail logging in the CloudTrail administrator account and Config aggregation in the Config aggregator account when those integrations are enabled. An aggregator collects configuration information across accounts.
4. For landing zone 4.0 member accounts, enable the Config baseline on each managed OU that needs Config recording. A baseline is a collection of resources and settings applied for governance.

### Exam cues

- If the question says centrally govern account creation and compliance across an organization, think Control Tower landing zone, because it coordinates account provisioning and governance services.
- If the question says collect activity logs separately from configuration information, think logging and Config integration accounts, because landing zone 4.0 separates their storage.
- If the question says enabling landing-zone Config integration did not configure member accounts, think OU-level Config baseline, because the central integration alone covers service integration accounts.

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
