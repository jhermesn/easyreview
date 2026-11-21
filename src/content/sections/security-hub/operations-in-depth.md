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
  - id: config-integration
    text: Activate the AWS Config integration to ingest managed and custom Config rule evaluations as CSPM findings through EventBridge.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html#securityhub-internal-providers
  - id: control-config
    text: Most AWS control checks use service-linked AWS Config rules that evaluate recorded resource configuration.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#securityhub-setup-prereqs
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
    q: An AWS Security Hub CSPM team needs managed and custom AWS Config rule evaluations in the findings list. Is enabling a CSPM standard sufficient?
    a: Activate the AWS Config integration. It imports rule evaluations through EventBridge; this is separate from the service-linked Config rules used by CSPM controls.
    trap: true
    facts:
      - config-integration
      - control-config
  - id: security-hub-012
    q: A team expects old AWS Config evaluations to appear after it activates the AWS Security Hub CSPM integration. What is the limitation?
    a: The integration sends evaluations performed after CSPM was enabled. CSPM does not retroactively consolidate older findings.
    trap: true
    facts:
      - config-integration-scope
      - config-rule-exclusions
      - post-enable
---
Security Hub CSPM uses AWS Config for control checks and can also import Config rule evaluations as findings. These are separate paths: control checks depend on recorded resource settings, while the integration brings managed and custom rule results into CSPM.

### How it works

1. Most CSPM control checks use service-linked Config rules to evaluate recorded resource configuration. When CSPM is enabled without Security Hub, manually enable recording for the resource types required by enabled controls in every participating account and Region.
2. If required resource types are missing from manual recording, Config.1 can report FAILED, and the affected control can produce WARNING findings.
3. Activate the AWS Config integration to import managed and custom rule evaluations through EventBridge. The integration excludes service-linked rule evaluations, except those from rules managed by AWS Control Tower.
4. The integration sends evaluations performed after CSPM was enabled. CSPM does not retroactively consolidate findings generated before enablement.

### Exam cues

- If the question says Config.1 is FAILED and a control has WARNING findings under manual recording, think missing resource types in the affected account and Region, because the control needs those settings recorded.
- If the question says import managed or custom Config rule evaluations, think activate the AWS Config integration, because CSPM control checks use a separate service-linked rule path.
- If the question says older evaluations are missing after integration activation, think CSPM enablement time, because the integration sends evaluations performed after CSPM was enabled.

### Remember

- With CSPM alone, manually record the resource types required by enabled controls in every participating account and Region.
- Service-linked rule evaluations are excluded from the integration, except for Control Tower-managed rules.
- Evaluations performed before CSPM enablement are not sent by the integration.

> **Trap:** Enabling a standard does not import managed and custom Config rule evaluations. Activate the Config integration; it does not backfill evaluations from before CSPM enablement.
