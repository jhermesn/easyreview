---
title: Config recording and finding imports
level: professional
order: 50
facts:
  - id: manual-config
    text: With CSPM enabled without Security Hub, manually enable AWS Config recording for the resource types required by enabled controls in every participating account and Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#manual-config-setup
  - id: recording-gap
    text: With manual recording, missing required resource recording can cause Config.1 FAILED findings and WARNING findings for the affected control.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#config-1-overview
  - id: config-integration-scope
    text: The AWS Config integration sends evaluations performed after CSPM enablement.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html#securityhub-internal-providers
  - id: config-rule-exclusions
    text: The AWS Config integration excludes service-linked rule evaluations except those from Control Tower-managed rules.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html#securityhub-internal-providers
  - id: post-enable
    text: CSPM does not retroactively consolidate security findings generated before it was enabled.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html#what-is-securityhub
cards:
  - id: security-hub-008
    q: A team enabled AWS Security Hub CSPM without Security Hub, but a control shows WARNING and Config.1 shows FAILED. What recording issue should it check?
    a: Check whether AWS Config records the resource type required by that control in the affected account and Region.
    facts:
      - manual-config
      - recording-gap
  - id: security-hub-009
    q: "Which service-linked AWS Config rule evaluations does the Security Hub CSPM Config integration include?"
    a: "It excludes service-linked rule evaluations except those from AWS Control Tower-managed rules."
    trap: true
    facts: [config-rule-exclusions]
  - id: security-hub-012
    q: A team expects old AWS Config evaluations to appear after it activates the AWS Security Hub CSPM integration. What is the limitation?
    a: The integration sends evaluations performed after CSPM was enabled. CSPM does not retroactively consolidate older findings.
    trap: true
    facts:
      - config-integration-scope
      - post-enable
revised:
  - date: 2026-11-23
    note: The Config integration card now tests the service-linked rule exclusion.
    cards: [security-hub-009]
---
Security Hub CSPM Config recording and finding imports build on the Config dependency and integration.

### How it works

1. If required resource types are missing from manual recording, Config.1 can report FAILED, and the affected control can produce WARNING findings.
2. The Config integration excludes service-linked rule evaluations, except those from rules managed by AWS Control Tower.
3. The integration sends evaluations performed after CSPM was enabled. CSPM does not retroactively consolidate findings generated before enablement.

### Exam cues

- If the question says Config.1 is FAILED and a control has WARNING findings under manual recording, think missing resource types in the affected account and Region, because the control needs those settings recorded.
- If the question says import service-linked Config rule evaluations, think Control Tower-managed rules, because the integration excludes other service-linked rules.
- If the question says older evaluations are missing after integration activation, think CSPM enablement time, because the integration sends evaluations performed after CSPM was enabled.

### Remember

- Service-linked rule evaluations are excluded from the integration, except for Control Tower-managed rules.
- Evaluations performed before CSPM enablement are not sent by the integration.

> **Trap:** The Config integration does not backfill evaluations from before CSPM enablement.
