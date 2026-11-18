---
title: Data sources and threat findings
level: associate
order: 10
facts:
  - id: detection
    text: GuardDuty analyzes AWS data sources using threat intelligence and machine learning to identify suspicious and potentially malicious activity.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#what-is-guardduty
  - id: threats
    text: GuardDuty can detect compromised credentials and unauthorized cryptomining on EC2 instances and container workloads.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#what-is-guardduty
  - id: finding
    text: A GuardDuty finding represents a potential security issue detected in AWS accounts, workloads, or data.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html
  - id: foundational
    text: GuardDuty automatically ingests CloudTrail management events, EC2 VPC flow logs, and DNS logs as foundational data sources.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
  - id: cloudtrail-stream
    text: GuardDuty consumes CloudTrail management events through an independent duplicate stream without changing existing CloudTrail configurations.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_controlplane
  - id: flow-stream
    text: GuardDuty uses an independent duplicate stream of EC2 VPC flow logs without requiring the customer to create or configure flow logs.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_vpc
  - id: dns-stream
    text: GuardDuty accesses EC2 DNS queries through AWS DNS resolvers, not other DNS resolvers, and does not require Resolver query logging to be configured.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_dns
  - id: logs-retention
    text: GuardDuty extracts fields for profiling and anomaly detection and discards the foundational source logs.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_data-sources
  - id: optional-s3
    text: S3 Protection analyzes S3 data events to detect potential risks such as data exfiltration and destruction.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
  - id: optional-eks
    text: EKS Audit Log Monitoring analyzes Kubernetes audit logs for suspicious activity.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
  - id: optional-runtime
    text: Runtime Monitoring analyzes operating system events on EKS, EC2, and ECS including Fargate.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
  - id: runtime-agent
    text: The GuardDuty security agent provides runtime events for Runtime Monitoring on EC2.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_vpc
  - id: optional-malware
    text: Malware Protection for EC2 scans associated EBS volumes, while Malware Protection for S3 scans newly uploaded S3 objects.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
  - id: optional-rds-lambda
    text: RDS Protection analyzes supported database login activity, while Lambda Protection monitors Lambda network activity.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
  - id: s3-independent
    text: Malware Protection for S3 can be used without enabling GuardDuty, unlike the other protection plans.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html#features-of-guardduty
  - id: trial
    text: First-time GuardDuty use in a Region provides a 30-day free trial for foundational detection.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_data-sources
  - id: severity
    text: Finding severity ranges from 1.0 to 10.0, with higher values indicating greater risk.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings-severity.html
  - id: runtime-default
    text: Runtime Monitoring is not enabled by default when GuardDuty is enabled.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty-pricing.html#using-guardduty-30-day-free-trial
  - id: finding-retention
    text: GuardDuty retains findings for 90 days and exports active findings to EventBridge; new active
      findings are exported within about 5 minutes.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty_exportfindings
  - id: finding-archive
    text: Archived findings, including new occurrences of suppressed findings, are not exported by default.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty-export-findings-considerations
  - id: finding-export-permissions
    text: S3 findings export requires a bucket policy allowing GuardDuty to upload and a KMS key policy
      allowing GuardDuty to generate a data key; source account and detector ARN can restrict access.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty-exporting-findings-kms-policy
  - id: finding-export-regions
    text: Findings export settings are Regional. The S3 bucket and KMS key must share a Region, and
      opt-in Region destinations have additional cross-Region restrictions.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty-export-findings-considerations
  - id: finding-org-export
    text: A GuardDuty administrator's export includes findings from associated members generated in the
      same Region.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_exportfindings.html#guardduty-export-findings-considerations
  - id: global-events
    text: GuardDuty replicates relevant CloudTrail global service events for processing in each Region
      where GuardDuty is enabled.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#cloudtrail_global
  - id: org-regional
    text: The GuardDuty delegated administrator and members must be configured in each desired Region,
      using the same delegated administrator account across Regions.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_organizations.html#delegated_admin_important
  - id: finding-aggregation
    text: GuardDuty aggregates related recurring activity into the original finding, updating its count
      and latest details; earlier details can be replaced.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/finding-aggregation.html#finding-aggregation
  - id: finding-frequency
    text: New GuardDuty findings are sent to EventBridge near real time; updates to existing findings
      default to 6 hours and can be set to 15 minutes or 1 hour.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html#eventbridge-freq-notifications-gdu
  - id: org-auto-enable
    text: GuardDuty organization auto-enable supports ALL, NEW, and NONE; changing to NONE does not
      disable existing accounts. Malware Protection for S3 is excluded from these preferences.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/set-guardduty-auto-enable-preferences.html#set-guardduty-auto-enable-preferences
  - id: s3-malware-role
    text: Malware Protection for S3 requires a service role with permissions for the managed EventBridge
      rule and S3 objects; KMS access is needed for supported KMS-encrypted objects.
    source: https://docs.aws.amazon.com/guardduty/latest/ug/malware-protection-s3-iam-policy-prerequisite.html#malware-protection-s3-iam-policy-prerequisite
cards:
  - id: guardduty-001
    q: Which AWS service detects potentially compromised credentials and unauthorized cryptomining by analyzing AWS activity?
    a: GuardDuty. It analyzes foundational CloudTrail management events, EC2 VPC flow logs, and DNS logs.
    facts: [detection, threats, foundational]
  - id: guardduty-007
    q: A team has not configured a CloudTrail trail or VPC Flow Logs delivery. Can GuardDuty analyze foundational events?
    a: Yes. GuardDuty consumes independent streams without changing the customer's CloudTrail or flow log configuration.
    trap: true
    facts: [cloudtrail-stream, flow-stream]
  - id: guardduty-009
    q: Which GuardDuty protection plans address suspicious S3 data activity and malware in newly uploaded S3 objects?
    a: S3 Protection analyzes data events; Malware Protection for S3 scans newly uploaded objects.
    facts: [optional-s3, optional-malware]
  - id: guardduty-012
    q: "A security team needs to detect potentially compromised AWS credentials and unauthorized cryptomining. Which service fits?"
    a: "Amazon GuardDuty analyzes AWS data sources to identify suspicious activity, including compromised credentials and unauthorized cryptomining."
    facts: [detection, threats]
  - id: guardduty-023
    q: A security team needs GuardDuty findings retained beyond the service retention period. What
      should it configure?
    a: Export findings to S3. GuardDuty retains findings for 90 days and sends active findings to EventBridge.
    facts: [finding-retention]
  - id: guardduty-025
    q: A central S3 bucket receives GuardDuty findings encrypted with a KMS key. What resource
      permissions are required?
    a: Allow GuardDuty to upload in the bucket policy and generate a data key in the KMS key policy.
      Restrict access with the source account and detector ARN.
    facts: [finding-export-permissions]
  - id: guardduty-027
    q: A company enables GuardDuty in one Region and expects centralized protection across every Region
      in AWS Organizations. What else must it configure?
    a: Configure the same delegated administrator and its members in each desired Region. GuardDuty
      processes relevant global service events in each Region where it is enabled.
    facts: [org-regional, global-events]
  - id: guardduty-031
    q: "A team wants to scan newly uploaded Amazon S3 objects for malware. Which GuardDuty feature fits?"
    a: "GuardDuty Malware Protection for S3 scans newly uploaded S3 objects."
    facts: [optional-malware]
---
Amazon GuardDuty detects potential threats by analyzing AWS activity and threat intelligence. A finding is a report of a potential security issue, not proof that a resource is compromised.

### How it works

1. Enable GuardDuty in a Region. It starts analyzing CloudTrail management events, EC2 VPC flow logs, and DNS queries from AWS resolvers.
2. GuardDuty receives independent streams. It does not need a customer-configured trail, flow log, or Resolver query log. It extracts fields for analysis and discards the source logs, so configure your own logging when you need retention.
3. GuardDuty compares activity with threat intelligence, such as known malicious addresses, and uses machine learning to identify anomalies. It creates findings for potential threats, including compromised credentials and unauthorized cryptomining.
4. Choose protection plans for other signals. An audit log records actions; operating system events describe activity inside a running workload.
5. Configure the same delegated administrator and members in each desired Region. GuardDuty processes
   relevant global service events in each enabled Region.
6. Route active findings through EventBridge or configure S3 export for longer retention. S3 export
   requires bucket and KMS key policies; restrict access using the source account and detector ARN.

| Protection | What it analyzes |
| --- | --- |
| S3 Protection | S3 data events for risks such as exfiltration, the unauthorized movement of data |
| EKS Audit Log Monitoring | Kubernetes audit logs |
| Runtime Monitoring | Operating system events on EKS, EC2, and ECS, including Fargate |
| Malware Protection | EC2 EBS volumes or newly uploaded S3 objects, depending on the plan |
| RDS and Lambda Protection | Supported database logins or Lambda network activity, respectively |

### Exam cues

- If the question says unusual API calls or cryptomining, think GuardDuty, because it identifies potentially malicious activity from AWS signals.
- If the question says no trail or VPC flow log delivery exists, think foundational detection still works, because GuardDuty receives independent streams.
- If the question says scan new S3 objects for malware, think Malware Protection for S3, because S3 Protection focuses on data activity rather than object scanning.
- If S3 malware scanning cannot access encrypted uploads, check the service role's EventBridge, S3, and KMS permissions.

### Remember

- First-time foundational detection has a 30-day trial per Region.
- Finding severity is 1.0 to 10.0; higher numbers indicate greater risk.
- Malware Protection for S3 can be used without enabling GuardDuty.
- Findings are retained for 90 days. New active findings are exported to EventBridge within about 5 minutes.

> **Trap:** GuardDuty's access to independent log streams does not provide retained customer logs. Configure the relevant logging service when you need to access or retain those logs.
