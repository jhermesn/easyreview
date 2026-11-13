---
title: OpsCenter
level: associate
order: 160
facts:
  - id: ops-purpose
    text: OpsCenter centralizes investigation and resolution of operational work items called OpsItems.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter
  - id: ops-create
    text: CloudWatch alarms entering ALARM and EventBridge rules can create OpsItems automatically;
      users can also create them manually.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter
  - id: ops-context
    text: OpsItems show affected resources and alarm or event context, and OpsCenter brings together
      Config, CloudTrail and CloudWatch information for investigation.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter
  - id: ops-runbook
    text: OpsCenter can run Systems Manager Automation runbooks to help resolve an OpsItem.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html#OpsCenter
  - id: ops-hash
    text: OpsItem deduplication uses a hash of the deduplication string and the resource that initiated
      the OpsItem.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter-working-deduplication.html#OpsCenter-working-deduplication
  - id: ops-open
    text: If the matching OpsItem is open or in progress, deduplication prevents creation of another
      matching item.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter-working-deduplication.html#OpsCenter-working-deduplication
  - id: ops-resolved
    text: If the matching OpsItem is resolved, another request can create a new OpsItem.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter-working-deduplication.html#OpsCenter-working-deduplication
cards:
  - id: systems-manager-032
    q: What is Systems Manager OpsCenter, and how are OpsItems created?
    a: OpsCenter centralizes operational issues as OpsItems. They can be created manually or
      automatically by CloudWatch alarms and EventBridge rules, then investigated and resolved with
      resource context and Automation runbooks.
    facts:
      - ops-purpose
      - ops-create
      - ops-context
      - ops-runbook
  - id: systems-manager-079
    q: A team needs CloudWatch alarms to create operational work records with affected resources and
      remediation runbooks. Which Systems Manager tool fits?
    a: OpsCenter. An alarm entering ALARM can create an OpsItem with investigation context, and
      operators can run Automation runbooks.
    facts:
      - ops-create
      - ops-context
      - ops-runbook
  - id: systems-manager-080
    q: Repeated events for the same resource should not open duplicate Systems Manager OpsItems. What
      should the team configure?
    a: A consistent deduplication string. OpsCenter hashes it with the initiating resource and
      suppresses creation when the matching OpsItem is open or in progress.
    facts:
      - ops-hash
      - ops-open
  - id: systems-manager-081
    q: A Systems Manager OpsItem was resolved before the same issue recurred. Does deduplication prevent
      a new OpsItem forever?
    a: No. A matching resolved OpsItem allows a new OpsItem to be created.
    trap: true
    facts:
      - ops-resolved
---
OpsCenter keeps operational issues in one place as OpsItems, work records that link an issue to affected AWS resources. An operator can investigate the record and run an Automation runbook to help resolve it.

### How it works

1. Create an OpsItem manually or configure CloudWatch alarms and EventBridge rules to create one when an issue occurs.
2. Inspect the affected resource, alarm or event details, and the Config, CloudTrail and CloudWatch context available in OpsCenter.
3. Run an appropriate Automation runbook to help resolve the issue.
4. Use a deduplication string, a chosen identifier for repeated reports, to prevent matching open or in-progress OpsItems from multiplying.

### Exam cues

- If the question says one operational record with resource context and remediation, think OpsCenter, because an OpsItem supports investigation and runbook execution.
- If the question says an alarm should open an operational issue, think an OpsItem alarm action, because CloudWatch ALARM transitions can create OpsItems.
- If the question says repeated events create duplicate work, think deduplication, because OpsCenter combines the deduplication string with the initiating resource.

### Remember

- OpsItems can be created manually or through alarms and events.
- Matching open or in-progress OpsItems suppress duplicates.
- A matching resolved OpsItem allows a new record for recurrence.

> **Trap:** A deduplication string does not permanently silence an issue. A new item can be created after the old one is resolved.
