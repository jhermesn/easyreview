---
title: Automation rules and custom actions
level: associate
order: 40
facts:
  - id: automation-fields
    text: CSPM automation rules match findings and update supported fields such as Severity, Note, and Workflow, including suppression.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html#automation-rules-criteria-actions
  - id: automation-admin
    text: Only a CSPM administrator creates and manages automation rules.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html#automation-rules-how-it-works
  - id: automation-members
    text: Rules cover matching findings from the administrator and its member accounts.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html#automation-rules-how-it-works
  - id: automation-region
    text: CSPM automation rules apply only in their creation Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html#automation-rules-how-it-works
  - id: automation-limit
    text: CSPM supports up to 100 automation rules per administrator account.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html#automation-rules-how-it-works
  - id: automation-trigger
    text: Rules evaluate new and updated original provider findings ingested through BatchImportFindings after rule creation.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html#automation-rules-findings
  - id: no-update-trigger
    text: BatchUpdateFindings changes do not trigger CSPM automation rules.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html#automation-rules-findings
  - id: automation-order
    text: Automation rules apply in ascending RuleOrder.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html#rule-order
  - id: last-action
    text: When multiple matching rule actions change the same field, the later applied action has the final effect.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html#rule-order
  - id: before-events
    text: CSPM automation rules update findings before EventBridge rules receive and evaluate them.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automations.html#automations
  - id: imported-event
    text: BatchImportFindings and BatchUpdateFindings can generate Security Hub Findings - Imported events with source aws.securityhub.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-all-findings.html#securityhub-cwe-all-findings
  - id: event-targets
    text: EventBridge patterns filter finding attributes and invoke targets such as Lambda functions and SNS topics.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-all-findings.html#securityhub-cwe-all-findings
  - id: manual-action
    text: An operator selects findings and a custom action to emit separate Security Hub Findings - Custom Action events.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-send.html#securityhub-cwe-send
  - id: custom-arn
    text: Create a custom action in CSPM and match its ARN in an EventBridge rule; ARN means Amazon Resource Name.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html#securityhub-cwe-custom-actions
  - id: custom-limits
    text: CSPM supports up to 50 custom actions.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html#securityhub-cwe-custom-actions
  - id: selection-limit
    text: An operator can select up to 20 findings for a custom action at a time.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-send.html#securityhub-cwe-send
  - id: custom-home
    text: Create custom actions in the home Region when managing aggregated findings there.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-custom-actions.html#securityhub-cwe-custom-actions
  - id: cross-account-target
    text: Custom action events are emitted in the account viewing the findings.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-send.html#securityhub-cwe-send
  - id: member-response-role
    text: To change member resources, target code must assume an authorized role deployed in that member account.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cwe-send.html#securityhub-cwe-send
  - id: suppress-not-disable
    text: Suppressing a finding does not stop control checks; disable an irrelevant control to stop its checks and finding generation.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/automation-rules.html#automation-rules-criteria-actions
  - id: workflow-status
    text: "Workflow.Status tracks investigation progress: NEW, NOTIFIED, RESOLVED, or SUPPRESSED."
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-concepts.html#securityhub-concepts
  - id: providers
    text: GuardDuty, Inspector, and Macie send findings to CSPM.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html#securityhub-internal-providers
diagrams:
  - id: security-findings-flow
    title: CSPM finding updates before external response
    width: 1250
    height: 420
    nodes:
      - id: guard
        label: GuardDuty
        icon: guardduty
        x: 20
        y: 20
        w: 180
        h: 72
        tone: security
      - id: inspector
        label: Inspector
        icon: inspector
        x: 20
        y: 160
        w: 180
        h: 72
        tone: security
      - id: macie
        label: Macie
        icon: macie
        x: 20
        y: 300
        w: 180
        h: 72
        tone: security
      - id: hub
        label: Security Hub CSPM
        icon: security-hub
        x: 350
        y: 150
        w: 180
        h: 86
        sub: update finding fields
        tone: security
      - id: bus
        label: EventBridge
        icon: eventbridge
        x: 680
        y: 150
        w: 180
        h: 86
        sub: match updated finding
        tone: integration
      - id: act
        label: Response function
        icon: lambda
        x: 1010
        y: 150
        w: 180
        h: 86
        sub: external resource action
        tone: compute
    edges:
      - from: guard
        to: hub
        step: 1
      - from: inspector
        to: hub
        step: 1
      - from: macie
        to: hub
        step: 1
      - from: hub
        to: bus
        step: 2
      - from: bus
        to: act
        step: 3
    steps:
      - Integrated security services send findings to CSPM.
      - CSPM applies automation field updates before the event reaches EventBridge.
      - An EventBridge rule matches the updated finding and invokes the response function.
cards:
  - id: security-hub-004
    q: For AWS Security Hub CSPM finding handling, when should a team use automation rules or EventBridge?
    a: Use automation rules to update finding fields or suppress findings. Use EventBridge to trigger an external response such as a Lambda function or notification. A custom action lets an operator send selected findings to EventBridge.
    facts:
      - automation-fields
      - event-targets
      - manual-action
  - id: security-hub-005
    q: An AWS Security Hub CSPM team wants a finding status changed automatically and a remediation function invoked. Which mechanisms fit?
    a: Use a CSPM automation rule for the finding update and an EventBridge rule for the external response. Automation updates happen before EventBridge evaluates the finding.
    facts:
      - automation-fields
      - event-targets
      - before-events
  - id: security-hub-025
    q: An AWS Security Hub CSPM automation rule should run after a BatchUpdateFindings call. Why does it not run?
    a: CSPM automation rules do not trigger on BatchUpdateFindings. They evaluate provider findings ingested through BatchImportFindings after rule creation.
    trap: true
    facts:
      - automation-trigger
      - no-update-trigger
  - id: security-hub-026
    q: An AWS Security Hub CSPM operator wants to send selected findings for manual remediation. What should be configured?
    a: Create a custom action and an EventBridge rule matching its ARN, then select findings and the action. For aggregated findings, create the action in the home Region.
    facts:
      - custom-arn
      - manual-action
      - custom-home
  - id: security-hub-027
    q: An AWS Security Hub CSPM administrator launches a custom action against a member finding. In which account is the event emitted, and how can the target change the member resource?
    a: The event is emitted in the administrator viewing account. The target code must assume an authorized role deployed in the member account.
    facts:
      - cross-account-target
      - member-response-role
  - id: security-hub-028
    q: Two matching AWS Security Hub CSPM automation rules change the same finding field. Which update has the final effect?
    a: Rules run in ascending RuleOrder, so the later matching rule has the final effect on that field.
    facts:
      - automation-order
      - last-action
  - id: security-hub-029
    q: An AWS Security Hub CSPM team wants an irrelevant control to stop generating findings. Should it suppress every finding?
    a: Disable the control. Suppression changes finding handling but does not stop the checks.
    trap: true
    facts:
      - suppress-not-disable
  - id: security-hub-030
    q: What event source and detail type should an EventBridge rule match for automatic AWS Security Hub CSPM finding responses?
    a: Source aws.securityhub and detail type Security Hub Findings - Imported. Add finding attribute filters to select relevant events.
    facts:
      - imported-event
      - event-targets
---
Security Hub CSPM automation rules change findings as they arrive. EventBridge routes finding events to external actions. A custom action is the operator's way to send selected findings into an EventBridge response path. Updating a finding's status and repairing the affected resource are separate operations.

### How it works

1. In the administrator account, define an automation rule's matching conditions and field updates. Supported actions include changing `Severity`, adding a `Note`, and updating `Workflow`. Workflow status records investigation progress: `NEW`, `NOTIFIED`, `RESOLVED`, or `SUPPRESSED`.
2. Rules evaluate new and updated provider findings ingested through `BatchImportFindings` after rule creation. A `BatchUpdateFindings` call does not trigger these automation rules. Rules apply in their creation Region to matching administrator and member findings.
3. Apply rules in ascending `RuleOrder`. When matching rules change the same field, the later rule has the final effect. Automation updates occur before EventBridge receives the finding.
4. For automatic response, create an EventBridge rule with source `aws.securityhub` and detail type `Security Hub Findings - Imported`. Filter finding attributes and invoke a target such as Lambda or SNS. Both import and finding update API operations can generate these events.
5. For operator selection, create a custom action and an EventBridge rule matching its ARN, the Amazon Resource Name identifying the action. Select findings and choose that action. Each finding emits a separate `Security Hub Findings - Custom Action` event. Use the home Region when acting on aggregated findings.
6. Custom action events appear in the account viewing the findings. To change a member account's resources, target code must assume an authorized IAM role, temporarily using that role's permissions, in that member account.

| Need | Mechanism | Result |
|---|---|---|
| Update severity or investigation status | CSPM automation rule | Finding fields change |
| Invoke an external response automatically | EventBridge rule for imported findings | Matching events invoke a target |
| Let an operator choose findings for response | CSPM custom action plus EventBridge rule | Selected findings emit custom action events |

### Exam cues

- If the question says suppress matching findings automatically, think CSPM automation rules, because they update finding fields during ingestion.
- If the question says start a response when a finding arrives, think an EventBridge imported-finding rule, because it invokes an external target.
- If the question says an analyst selects findings for remediation, think custom action plus EventBridge, because the operator emits the matching action events.
- If the question says a member resource must be changed from an administrator action, think a member account role, because the viewing account receives the event.

### Remember

- CSPM automation rules: up to 100 per administrator account; deploy in each required Region.
- Custom actions: up to 50; select up to 20 findings at a time.
- `BatchUpdateFindings` can generate EventBridge events but does not trigger CSPM automation rules.
- Suppression does not stop control checks. Disable an irrelevant control to stop its findings.

> **Trap:** An automation rule that marks a finding resolved does not repair the resource. Use an external response path for remediation.
