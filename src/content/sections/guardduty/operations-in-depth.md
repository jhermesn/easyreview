---
title: "PLACEHOLDER guardduty/operations-in-depth"
level: professional
order: 30
facts:
  - id: dns-stream
    text: GuardDuty accesses EC2 DNS queries through AWS DNS resolvers, not other DNS resolvers, and does not require Resolver query logging to be configured.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_dns
  - id: optional-runtime
    text: Runtime Monitoring analyzes operating system events on EKS, EC2, and ECS including Fargate.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
  - id: runtime-agent
    text: The GuardDuty security agent provides runtime events for Runtime Monitoring on EC2.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_vpc
  - id: optional-rds-lambda
    text: RDS Protection analyzes supported database login activity, while Lambda Protection monitors Lambda network activity.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
  - id: finding-archive
    text: Archived findings, including new occurrences of suppressed findings, are not exported by default.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty-export-findings-considerations
  - id: finding-export-regions
    text: Findings export settings are Regional. The S3 bucket and KMS key must share a Region, and
      opt-in Region destinations have additional cross-Region restrictions.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty-export-findings-considerations
  - id: finding-org-export
    text: A GuardDuty administrator's export includes findings from associated members generated in the
      same Region.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty-export-findings-considerations
  - id: finding-aggregation
    text: GuardDuty aggregates related recurring activity into the original finding, updating its count
      and latest details; earlier details can be replaced.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/finding-aggregation.html#finding-aggregation
  - id: flow-stream
    text: GuardDuty uses an independent duplicate stream of EC2 VPC flow logs without requiring the customer to create or configure flow logs.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_vpc
  - id: finding-frequency
    text: New GuardDuty findings are sent to EventBridge near real time; updates to existing findings
      default to 6 hours and can be set to 15 minutes or 1 hour.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#eventbridge-freq-notifications-gdu
  - id: org-auto-enable
    text: GuardDuty organization auto-enable supports ALL, NEW, and NONE; changing to NONE does not
      disable existing accounts. Malware Protection for S3 is excluded from these preferences.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/set-guardduty-auto-enable-preferences.html#set-guardduty-auto-enable-preferences
  - id: org-regional
    text: The GuardDuty delegated administrator and members must be configured in each desired Region,
      using the same delegated administrator account across Regions.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#delegated_admin_important
cards:
  - id: guardduty-008
    q: An EC2 instance uses a non-AWS DNS resolver. Can GuardDuty analyze its DNS queries through its foundational DNS source?
    a: No. GuardDuty accesses that source through AWS DNS resolvers.
    trap: true
    facts: [dns-stream]
  - id: guardduty-010
    q: What does GuardDuty Runtime Monitoring analyze, and does it use an agent on EC2?
    a: Operating system events on supported EKS, EC2, and ECS workloads, including Fargate. EC2 runtime events come from the GuardDuty security agent.
    facts: [optional-runtime, runtime-agent]
  - id: guardduty-011
    q: A team needs GuardDuty detection of unusual database logins and Lambda network activity. Which plans apply?
    a: RDS Protection analyzes supported database logins; Lambda Protection analyzes Lambda network activity.
    facts: [optional-rds-lambda]
  - id: guardduty-024
    q: A GuardDuty suppression rule archives a recurring finding. Will new occurrences be exported to
      the configured S3 bucket by default?
    a: No. Archived findings and new occurrences of suppressed findings are not exported by default.
    trap: true
    facts: [finding-archive]
  - id: guardduty-026
    q: A company exports GuardDuty member findings from multiple Regions to a central S3 bucket. What
      Regional configuration and encryption constraints apply?
    a: Configure export in each source Region. The destination bucket and KMS key must share a Region;
      opt-in destination Regions have additional restrictions. An administrator exports associated
      member findings from its Region.
    facts: [finding-export-regions, finding-org-export]
  - id: guardduty-028
    q: Repeated SSH brute-force attempts produce one GuardDuty finding instead of a new finding each
      time. How does GuardDuty handle the repeated activity?
    a: It aggregates related occurrences, increasing the count and updating details. Older details can
      be replaced, so retain VPC Flow Logs for individual activity.
    facts: [finding-aggregation, flow-stream]
  - id: guardduty-029
    q: A team needs faster EventBridge notifications for recurring GuardDuty findings. Which setting
      should it change?
    a: Set the update frequency to 15 minutes or 1 hour instead of the default 6 hours. New findings
      are sent near real time.
    facts: [finding-frequency]
  - id: guardduty-030
    q: An organization wants GuardDuty automatically enabled for existing and future member accounts.
      Which auto-enable setting applies, and does it cover Malware Protection for S3?
    a: Choose ALL in each desired Region. Malware Protection for S3 is not covered by organization
      auto-enable preferences.
    facts: [org-auto-enable, org-regional]
---
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
