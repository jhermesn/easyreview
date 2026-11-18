---
title: "PLACEHOLDER control-tower/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
