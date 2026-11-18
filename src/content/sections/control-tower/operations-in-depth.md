---
title: Landing zone integrations and Config scope
level: professional
order: 60
facts:
  - id: landing-zone
    text: Control Tower orchestrates AWS services including Organizations, Service Catalog, and IAM Identity Center to set up and govern a multi-account landing zone.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#what-is-control-tower
  - id: legacy-structure
    text: Landing zone 3.3 and earlier use a Security OU containing the shared Log Archive and Audit accounts.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html#landing-zone-structure
  - id: optional-integrations
    text: Landing zone 4.0 allows optional Config, CloudTrail, SecurityRoles, and Backup integrations and no longer requires a Security OU.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/landing-zone-v4-migration-guide.html#landing-zone-v4-migration-guide
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
  - id: control-tower-015
    q: A team enables AWS Config integration for an AWS Control Tower 4.0 landing zone but member accounts lack Config recorders. What additional configuration is needed?
    a: Enable the Config baseline on the managed member-account OUs. The landing-zone integration alone configures only service integration accounts.
    trap: true
    facts:
      - config-scope
---
AWS Control Tower orchestrates AWS Organizations, AWS Service Catalog, and AWS IAM Identity Center to set up and govern a [multi-account landing zone](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#what-is-control-tower). Landing zone versions differ in their account structure and service integrations.

### How it works

1. In [versions 3.3 and earlier](https://docs.aws.amazon.com/controltower/latest/userguide/how-control-tower-works.html#landing-zone-structure), the Security organizational unit (OU) contains the shared Log Archive and Audit accounts. [Version 4.0](https://docs.aws.amazon.com/controltower/latest/userguide/landing-zone-v4-migration-guide.html#landing-zone-v4-migration-guide) no longer requires a Security OU and makes AWS Config, AWS CloudTrail, SecurityRoles, and AWS Backup integrations optional.
2. For centralized CloudTrail logging, create or select a [CloudTrail administrator account](https://docs.aws.amazon.com/controltower/latest/userguide/special-accounts.html#log-archive-account), formerly Log Archive. When Config integration is enabled, create or select a [Config aggregator account](https://docs.aws.amazon.com/controltower/latest/userguide/special-accounts.html#audit-account), formerly Audit.
3. In version 4.0, CloudTrail logs remain in the logging account, while Config logs use a [dedicated bucket](https://docs.aws.amazon.com/controltower/latest/userguide/special-accounts.html#log-archive-account) in the Config aggregator account. A [service-linked Config aggregator](https://docs.aws.amazon.com/controltower/latest/userguide/config-updates-v4.html#config-updates-v4) collects configuration data across accounts.
4. Landing-zone Config integration configures service integration accounts. To configure member accounts, enable the [Config baseline](https://docs.aws.amazon.com/controltower/latest/userguide/key-changes-lz-v4.html#key-changes-lz-v4) on their managed OU.

### Exam cues

- If the question says a team needs its own organizational structure, think landing zone 4.0, because it does not require a Security OU.
- If the question says to locate CloudTrail logs and Config data, think the CloudTrail administrator and Config aggregator accounts, because version 4.0 uses dedicated Config log storage and an aggregator.
- If the question says member accounts lack Config recorders after landing-zone integration is enabled, think the Config baseline on their managed OU, because the landing-zone integration configures service integration accounts.

### Remember

- Versions 3.3 and earlier place Log Archive and Audit in a Security OU.
- Version 4.0 makes the listed service integrations optional and does not require a Security OU.
- The Config aggregator collects configuration data across accounts; Config logs and CloudTrail logs use separate buckets in version 4.0.

> **Trap:** Enabling landing-zone Config integration alone does not configure member accounts. Enable the Config baseline on their managed OU as well.
