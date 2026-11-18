---
title: "PLACEHOLDER security-hub/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
