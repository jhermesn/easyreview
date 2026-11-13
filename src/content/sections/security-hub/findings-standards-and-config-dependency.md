---
title: Findings, standards, and Config dependency
level: associate
order: 10
facts:
  - id: cspm-purpose
    text: Security Hub CSPM collects security findings across services and accounts and evaluates resources against security standards.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html#what-is-securityhub
  - id: finding
    text: A finding records a security check or security-related detection.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-concepts.html#securityhub-concepts
  - id: finding-origin
    text: Control findings come from CSPM security checks; integrations provide other findings.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-concepts.html#securityhub-concepts
  - id: asff
    text: CSPM processes findings in AWS Security Finding Format, a common format for security finding data.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html#what-is-securityhub
  - id: standards
    text: CSPM supports AWS Foundational Security Best Practices and standards based on CIS, PCI DSS, and NIST frameworks; a standard groups security controls.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html#what-is-securityhub
  - id: control-config
    text: Most AWS control checks use service-linked AWS Config rules that evaluate recorded resource configuration.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#securityhub-setup-prereqs
  - id: manual-config
    text: With CSPM enabled without Security Hub, manually enable AWS Config recording for the resource types required by enabled controls in every participating account and Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#manual-config-setup
  - id: service-recorder
    text: When both CSPM and Security Hub are enabled, CSPM automatically creates AWSConfigurationRecorderForSecurityHubCSPM for the required control resources in each applicable account and Region.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#service-linked-config-recorder
  - id: recorder-date
    text: AWS added guidance for the CSPM service-linked configuration recorder in May 2026.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/doc-history.html#doc-history
  - id: recording-gap
    text: With manual recording, missing required resource recording can cause Config.1 FAILED findings and WARNING findings for the affected control.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#config-1-overview
  - id: daily-recording
    text: Daily AWS Config recording can delay change-triggered control findings until the 24-hour recording period ends.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-setup-prereqs.html#config-resource-recording
  - id: enable-default
    text: EnableSecurityHub defaults EnableDefaultStandards to true; false enables CSPM without its automatically enabled standards.
    source: https://docs.aws.amazon.com/securityhub/1.0/APIReference/API_EnableSecurityHub.html#API_EnableSecurityHub_RequestBody
  - id: default-standards
    text: EnableSecurityHub automatically enables AWS Foundational Security Best Practices and CIS AWS Foundations Benchmark v1.2.0 unless opted out.
    source: https://docs.aws.amazon.com/securityhub/1.0/APIReference/API_EnableSecurityHub.html#API_EnableSecurityHub
  - id: config-integration
    text: Activate the AWS Config integration to ingest managed and custom Config rule evaluations as CSPM findings through EventBridge.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html#securityhub-internal-providers
  - id: config-integration-scope
    text: The AWS Config integration sends evaluations performed after CSPM enablement.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html#securityhub-internal-providers
  - id: config-rule-exclusions
    text: The AWS Config integration excludes service-linked rule evaluations except those from Control Tower-managed rules.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html#securityhub-internal-providers
  - id: post-enable
    text: CSPM does not retroactively consolidate security findings generated before it was enabled.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html#what-is-securityhub
  - id: provider-services
    text: GuardDuty, Inspector, Macie, Firewall Manager, and IAM Access Analyzer can send findings to CSPM.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html#securityhub-internal-providers
  - id: patch-findings
    text: Systems Manager Patch Manager can send patch compliance findings to Security Hub CSPM.
    source: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-internal-providers.html#securityhub-internal-providers
diagrams:
  - id: security-hub-config-integration
    title: Config rule results imported as CSPM findings
    width: 1040
    height: 340
    nodes:
      - id: config
        label: AWS Config
        icon: config
        x: 20
        y: 70
        w: 180
        h: 86
        sub: managed and custom rules
        tone: mgmt
      - id: bus
        label: EventBridge
        icon: eventbridge
        x: 350
        y: 70
        w: 180
        h: 86
        sub: rule evaluations
        tone: integration
      - id: hub
        label: Security Hub CSPM
        icon: security-hub
        x: 690
        y: 70
        w: 180
        h: 86
        sub: ASFF findings
        tone: security
    edges:
      - from: config
        to: bus
        step: 1
      - from: bus
        to: hub
        step: 2
    steps:
      - AWS Config publishes rule evaluations after CSPM enablement.
      - The active Config integration converts evaluations to ASFF findings; CSPM control checks use a separate service-linked rule path.
cards:
  - id: security-hub-001
    q: Which prerequisite supports most AWS Security Hub CSPM control checks when CSPM is enabled without Security Hub?
    a: Enable AWS Config and record the resource types required by the controls in each participating account and Region. When both CSPM and Security Hub are enabled, CSPM creates a service-linked recorder automatically.
    facts:
      - control-config
      - manual-config
      - service-recorder
  - id: security-hub-002
    q: What does AWS Security Hub CSPM add to findings from GuardDuty, Inspector, and Macie?
    a: A consolidated view using ASFF and security control checks grouped into standards such as FSBP, CIS, PCI DSS, and NIST.
    facts:
      - cspm-purpose
      - asff
      - standards
      - provider-services
  - id: security-hub-007
    q: A team wants AWS Security Hub CSPM findings from integrations without enabling the default standards. Which API setting fits?
    a: Set EnableDefaultStandards to false in EnableSecurityHub. Omitting it defaults to true.
    facts:
      - enable-default
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
  - id: security-hub-010
    q: Which standards does the EnableSecurityHub API enable by default for AWS Security Hub CSPM?
    a: AWS Foundational Security Best Practices and CIS AWS Foundations Benchmark v1.2.0. Set EnableDefaultStandards to false to opt out.
    facts:
      - default-standards
      - enable-default
  - id: security-hub-011
    q: Both AWS Security Hub and Security Hub CSPM are enabled in an account and Region. Must an operator manually create the CSPM configuration recorder?
    a: No. CSPM creates AWSConfigurationRecorderForSecurityHubCSPM automatically for control resource recording.
    trap: true
    facts:
      - service-recorder
  - id: security-hub-012
    q: A team expects old AWS Config evaluations to appear after it activates the AWS Security Hub CSPM integration. What is the limitation?
    a: The integration sends evaluations performed after CSPM was enabled. CSPM does not retroactively consolidate older findings.
    trap: true
    facts:
      - config-integration-scope
      - config-rule-exclusions
      - post-enable
  - id: security-hub-033
    q: A team wants patch compliance alongside security control findings in AWS Security Hub CSPM. Which integration supplies it?
    a: Systems Manager Patch Manager can send patch compliance findings to Security Hub CSPM.
    facts:
      - patch-findings
---
AWS Security Hub Cloud Security Posture Management (CSPM) collects security findings and tests resource settings against security standards. A finding is a record of a security check or detection. A control is one security check requirement; a standard groups related controls. CSPM uses AWS Security Finding Format (ASFF), a shared structure for findings from different sources.

### How it works

1. Enable CSPM in the accounts and Regions that need coverage. The `EnableSecurityHub` API enables AWS Foundational Security Best Practices (FSBP) and CIS AWS Foundations Benchmark v1.2.0 by default. Set `EnableDefaultStandards: false` to opt out of those standards while keeping CSPM enabled.
2. Enable the standards and controls you need. Supported frameworks include CIS, PCI DSS, and NIST, which define sets of security requirements. Most AWS control checks use service-linked Config rules, rules created for the service to evaluate resource settings.
3. Provide the required resource recording. With CSPM alone, manually configure AWS Config in each participating account and Region. With both CSPM and Security Hub enabled, CSPM creates `AWSConfigurationRecorderForSecurityHubCSPM` automatically.
4. Receive findings from integrations such as GuardDuty, Inspector, Macie, Firewall Manager, and IAM Access Analyzer. Patch Manager can also contribute patch compliance findings. CSPM consolidates findings generated after enablement, not earlier history.
5. To import evaluations from your managed and custom Config rules, activate the AWS Config integration. Config sends evaluations through EventBridge and CSPM converts them to ASFF. This integration excludes service-linked rules except those managed by Control Tower.

AWS added service-linked recorder guidance in May 2026. For older scenarios or CSPM-only setups, keep the manual Config prerequisite in mind. A configuration recorder is the component that captures resource settings. With manual recording, missing required resource types can produce a failed `Config.1` finding and warning findings for the affected control. Daily recording can delay change-triggered findings until the 24-hour recording period ends.

| Requirement | Mechanism | What it provides |
|---|---|---|
| Check AWS resource settings | CSPM controls backed by service-linked Config rules | Control findings |
| Import managed or custom Config rule results | AWS Config integration through EventBridge | ASFF findings for those evaluations |
| Collect findings from other security tools | Product integrations | Findings in a common format |

### Exam cues

- If the question says assess resources against security standards and combine detector findings, think Security Hub CSPM, because it provides controls and a common findings view.
- If the question says CSPM without Security Hub has missing control evaluations, think required Config recording, because most AWS controls need recorded resource settings.
- If the question says collect Config rule evaluations without enabling default standards, think `EnableDefaultStandards: false` plus the Config integration, because service enablement, standards, and integration ingestion are separate choices.

### Remember

- API default: `EnableDefaultStandards` is `true`.
- API default standards: FSBP and CIS AWS Foundations Benchmark v1.2.0.
- Manual recording: cover required resource types in every applicable account and Region.
- Both services enabled: CSPM creates the service-linked recorder automatically.

> **Trap:** Enabling a CSPM standard is not the same as importing your managed and custom Config rule results. Those results use the AWS Config integration.
