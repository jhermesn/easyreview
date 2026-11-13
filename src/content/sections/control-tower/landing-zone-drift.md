---
title: Landing zone drift
level: professional
order: 50
facts:
  - id: drift
    text: Governance drift occurs when managed accounts, OUs, or policies change from the configuration expected by Control Tower.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.html#governance-drift
  - id: baseline-inheritance
    text: Baseline inheritance drift means an account baseline configuration differs from its parent OU; use an account update, OU re-registration, or ResetEnabledBaseline to repair it.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.html#drift-enabled-baseline
  - id: control-inheritance
    text: With auto-enrollment off, moving accounts can leave detective and proactive controls inherited from the previous OU; preventive controls are not subject to this inheritance drift.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.md#drift-enabled-controls
  - id: remove-leftover
    text: Leftover inherited controls must be removed with DisableControl using their EnabledControlIdentifier; updating the account, re-registering the OU, or ResetEnabledControl does not remove them.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.md#drift-enabled-controls
  - id: auto-enroll
    text: Auto-enrollment applies destination OU configurations on future moves but does not remove leftover controls from earlier moves.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.md#drift-enabled-controls
  - id: scp-drift
    text: Editing or detaching a Control Tower-managed SCP causes policy drift; updating the landing zone is a documented remediation.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.html#drift-scp-detached-ou
  - id: daily-scans
    text: Control Tower scans managed SCPs, RCPs, and declarative policies daily.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/drift.html#scp-invariance-scans
  - id: v4-events
    text: Landing zone 4.0 and later sends drift notifications to EventBridge in the management account instead of SNS.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/key-changes-lz-v4.html#key-changes-lz-v4
  - id: release-date
    text: Landing zone 4.0 was released in November 2025.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/configuration-updates.html
  - id: event-pattern
    text: The documented drift event uses source aws.controltower and detail-type Drift Detected; a rule can target SNS or Lambda.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.html#eventbridge-creation
  - id: legacy-notifications
    text: Older landing zones use SNS drift notifications aggregated in the audit account; the drift guide notes these notifications are unavailable with auto-enrollment enabled.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/drift.html#detecting-drift
  - id: role-drift
    text: Missing required IAM roles can make the landing zone unavailable until role drift is resolved.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.html#governance-drift
  - id: shared-account-move
    text: A moved shared account is repaired by updating the landing zone.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.html#drift-account-moved-resolution
  - id: trusted-access
    text: Disabling Control Tower trusted access interrupts Organizations change events and is remediated by resetting the landing zone.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.html#drift-disable-trust-resolution
  - id: enrollment-block
    text: Landing zone drift can prevent the console Enroll account feature from working; use the documented alternate provisioning path while repairing drift.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/drift.html#drift-and-accounts
  - id: not-resource-drift
    text: Control Tower governance drift detection does not detect arbitrary changes to resources contained in a baseline.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/governance-drift.html#governance-drift
  - id: scp-definition
    text: A service control policy (SCP) limits the permissions available to identities in member accounts and does not grant permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: rcp-definition
    text: A resource control policy (RCP) limits permissions available on resources in member accounts and does not grant permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
  - id: declarative-definition
    text: A declarative policy enforces the desired configuration of a supported AWS service across an organization.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_declarative_policies.html
diagrams:
  - id: control-tower-v4-drift-events
    title: Landing zone 4.0 drift notifications use EventBridge
    width: 1000
    height: 180
    nodes:
      - id: ct
        label: Control Tower
        icon: control-tower
        x: 20
        y: 50
        w: 190
        h: 72
        tone: mgmt
      - id: events
        label: EventBridge rule
        sub: management account
        icon: eventbridge
        x: 405
        y: 43
        w: 190
        h: 86
        tone: integration
      - id: target
        label: SNS target
        icon: simple-notification-service
        x: 790
        y: 50
        w: 190
        h: 72
        tone: integration
    edges:
      - from: ct
        to: events
        step: 1
        label: Drift Detected
      - from: events
        to: target
        step: 2
        label: configured target
    steps:
      - Control Tower sends a Drift Detected event to EventBridge in the management account.
      - A matching rule routes the event to the configured notification target.
cards:
  - id: control-tower-001
    q: An AWS Control Tower account was moved between OUs with auto-enrollment disabled. Detective controls from the old OU remain. How are they removed?
    a: Disable the leftover inherited controls using DisableControl and their EnabledControlIdentifier. Account updates, OU re-registration, and ResetEnabledControl do not remove these old inherited controls. Preventive controls are not subject to this inheritance drift.
    trap: true
    facts:
      - control-inheritance
      - remove-leftover
  - id: control-tower-012
    q: What can cause AWS Control Tower governance drift, and how should operators choose remediation?
    a: "Changes to managed OUs, accounts, or policies can cause drift. Repair the affected object: reset a baseline for baseline drift, disable leftover inherited controls after a move, or update/reset the landing zone for the documented landing-zone drift type."
    facts:
      - drift
      - baseline-inheritance
      - remove-leftover
      - scp-drift
      - trusted-access
  - id: control-tower-030
    q: An AWS Control Tower landing zone 4.0 team receives no drift alerts on its old audit-account SNS subscription. What should it configure?
    a: Create an EventBridge rule in the management account for source aws.controltower and detail-type Drift Detected, then route it to SNS or Lambda.
    trap: true
    facts:
      - v4-events
      - event-pattern
  - id: control-tower-031
    q: Does enabling AWS Control Tower auto-enrollment remove inherited controls left over from an earlier account move?
    a: No. It handles future moves. Remove earlier leftover controls explicitly with DisableControl.
    trap: true
    facts:
      - auto-enroll
      - remove-leftover
  - id: control-tower-032
    q: An operator detached an AWS Control Tower-managed SCP from an OU. Which repair path is documented?
    a: Update the landing zone to restore its managed policy configuration. Managed policies are scanned daily for drift.
    facts:
      - scp-drift
      - daily-scans
  - id: control-tower-033
    q: Does AWS Control Tower governance drift detection identify every resource edit inside an account baseline?
    a: No. It does not detect arbitrary resource drift inside a baseline.
    trap: true
    facts:
      - not-resource-drift
---
Drift means the managed environment no longer matches the governance configuration Control Tower expects. The repair depends on whether the mismatch affects a baseline, inherited control, managed policy, or landing-zone resource.

### How it works

1. Control Tower monitors governance configuration and scans managed policies daily. Service control policies (SCPs) limit member-account identity permissions. Resource control policies (RCPs) limit access to member-account resources. Declarative policies enforce service configuration.
2. Route notifications according to the landing-zone version. Starting with 4.0, released in November 2025, drift events go to EventBridge in the management account instead of SNS.
3. Create an EventBridge rule matching source aws.controltower and detail-type Drift Detected. Configure an SNS or Lambda target to receive the event.
4. Identify the affected object before choosing a repair. Baseline drift, leftover inherited controls, and landing-zone drift have different remediation paths.
5. Consider auto-enrollment for future account moves. It applies destination OU configurations, but does not repair leftover controls from moves that already happened.

### Exam cues

- If the question says an old OU's detective or proactive control remains after an account move, think DisableControl on the inherited control, because account updates and control resets do not remove that leftover inheritance.
- If the question says drift notifications disappeared after moving to landing zone 4.0, think management-account EventBridge rule, because the notification destination changed.
- If the question says a managed SCP was edited or detached, think policy drift and landing-zone update, because Control Tower expects to maintain that policy configuration.

### Remember

| Drift type | Documented repair |
|---|---|
| Baseline inheritance mismatch | Update the account, re-register its OU, or ResetEnabledBaseline |
| Old inherited detective or proactive control | DisableControl with its EnabledControlIdentifier |
| Managed SCP changed or detached | Update the landing zone |
| Shared account moved | Update the landing zone |
| Control Tower trusted access disabled | Reset the landing zone |

- Preventive controls are not subject to the old-OU control inheritance drift described above.
- Older landing zones use SNS aggregation in the audit account; the drift guide excludes these SNS notifications when auto-enrollment is enabled.
- Missing required roles can make the landing zone unavailable. Drift can also block console enrollment.
- Governance drift detection does not find every resource change inside a baseline.

> **Trap:** Enabling auto-enrollment prevents problems on future moves. It does not remove controls left behind by a previous move.
