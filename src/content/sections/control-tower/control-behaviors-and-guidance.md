---
title: Control behaviors and guidance
level: professional
order: 20
facts:
  - id: control
    text: A control is an ongoing governance rule, also called a guardrail.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/controls.html#controls
  - id: scope
    text: Controls generally apply at OU scope and affect all accounts in the selected OU.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/controls.html#controls
  - id: preventive
    text: Preventive controls block actions that violate policy and use Organizations SCPs, RCPs, or declarative policies.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: detective
    text: Detective controls use Config rules to identify resource noncompliance and report it in the dashboard.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: proactive
    text: Proactive controls use CloudFormation hooks to evaluate supported CloudFormation resources before provisioning and block noncompliant resources.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: preventive-status
    text: Preventive status is enforced or not enabled, and preventive controls are supported in all AWS Regions.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: detective-status
    text: Detective status is clear, in violation, or not enabled; detective controls apply only in Control Tower-supported Regions.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: proactive-status
    text: Proactive evaluation results are PASS, FAIL, or SKIP.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: guidance
    text: Mandatory, strongly recommended, and elective are guidance categories independent of control behavior.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: mandatory-v4
    text: Starting in landing zone 4.0, mandatory controls are not applied by default; deployment depends on enabled capabilities.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/control-behavior.html#control-behavior
  - id: version-date
    text: Landing zone 4.0 was released in November 2025.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/configuration-updates.html
  - id: management-exception
    text: The management account root user and administrators can perform actions that controls would otherwise deny.
    source: https://docs.aws.amazon.com/controltower/latest/controlreference/controls.html#exception-to-controls
  - id: region-deny
    text: The landing-zone Region deny control cannot deny the home Region and exempts global services such as IAM and Organizations.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/region-deny.html#region-deny
  - id: region-deny-scope
    text: AWS-GR_REGION_DENY governs the landing zone on OUs with AWSControlTowerBaseline, while CT.MULTISERVICE.PV.1 is configurable for selected OUs.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/region-deny.html#region-deny
  - id: config-baseline
    text: Landing zone 4.0 introduces ConfigBaseline for detective controls without requiring AWSControlTowerBaseline.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/config-updates-v4.html#config-updates-v4
  - id: scp-definition
    text: A service control policy (SCP) limits the permissions available to identities in member accounts and does not grant permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: rcp-definition
    text: A resource control policy (RCP) limits permissions available on resources in member accounts and does not grant permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
  - id: declarative-definition
    text: A declarative policy enforces the desired configuration of a supported AWS service across an organization.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_declarative_policies.html
cards:
  - id: control-tower-004
    q: Which AWS Control Tower control behavior should prevent actions, find existing violations, or check CloudFormation resources before provisioning?
    a: Preventive uses Organizations policies; detective uses Config rules; proactive uses CloudFormation hooks.
    facts:
      - preventive
      - detective
      - proactive
  - id: control-tower-005
    q: What are AWS Control Tower control guidance categories, and do they determine the implementation?
    a: Mandatory, strongly recommended, and elective. Guidance is independent of preventive, detective, or proactive behavior. In landing zone 4.0, mandatory controls are not applied by default.
    facts:
      - guidance
      - mandatory-v4
  - id: control-tower-006
    q: An AWS Control Tower proactive control is enabled, but a user directly calls a service API to create a noncompliant resource. Does that proactive control evaluate the request?
    a: No. Proactive controls evaluate resources provisioned through CloudFormation hooks. Use suitable preventive controls or detective rules for other provisioning paths.
    trap: true
    facts:
      - proactive
      - preventive
      - detective
  - id: control-tower-007
    q: How does AWS Region coverage differ for AWS Control Tower preventive and detective controls?
    a: Preventive controls are supported in all Regions. Detective controls apply in Control Tower-supported Regions. Region deny is a separate preventive restriction with home-Region and global-service exceptions.
    facts:
      - preventive-status
      - detective-status
      - region-deny
  - id: control-tower-008
    q: Can the root user or administrators in the AWS Control Tower management account perform actions that controls otherwise deny?
    a: Yes. The management account has a documented exception intended to keep it usable.
    trap: true
    facts:
      - management-exception
  - id: control-tower-013
    q: A governance team needs AWS Control Tower to stop noncompliant CloudFormation provisioning and identify existing resource violations. Which behaviors should it combine?
    a: Proactive controls for CloudFormation provisioning and detective controls for existing violations.
    facts:
      - proactive
      - detective
  - id: control-tower-017
    q: An AWS Control Tower administrator wants Region restrictions on selected OUs rather than the entire landing zone. Which control fits?
    a: Use the configurable OU Region deny control CT.MULTISERVICE.PV.1. AWS-GR_REGION_DENY is the separate landing-zone control.
    facts:
      - region-deny-scope
  - id: control-tower-018
    q: What status values should an AWS Control Tower operator expect for preventive, detective, and proactive controls?
    a: "Preventive: enforced or not enabled. Detective: clear, in violation, or not enabled. Proactive: PASS, FAIL, or SKIP."
    facts:
      - preventive-status
      - detective-status
      - proactive-status
---
A Control Tower control is an ongoing governance rule, also called a guardrail. Behavior describes how the rule works. Guidance describes whether AWS categorizes it as mandatory, strongly recommended, or elective.

### How it works

1. Choose the required outcome: block a prohibited action, report an existing violation, or evaluate a CloudFormation resource before provisioning. A CloudFormation hook is a check on the provisioning operation.
2. Preventive implementations include service control policies (SCPs), which limit member-account identity permissions; resource control policies (RCPs), which limit permissions on member-account resources; and declarative policies, which enforce service configuration.
3. Enable the suitable control for the target OU. Controls generally affect every account in that OU.
4. Read the status using the control's behavior. A detective violation reports noncompliance; a proactive failure stops the relevant CloudFormation provisioning.
5. Check version and integration prerequisites. Landing zone 4.0 can use ConfigBaseline for detective controls without the full AWSControlTowerBaseline.

### Exam cues

- If the question says stop a prohibited action, think preventive control, because Organizations policies restrict the operation.
- If the question says report existing configuration violations, think detective control, because Config rules evaluate resource compliance.
- If the question says reject a noncompliant CloudFormation resource before provisioning, think proactive control, because a hook checks that provisioning path.

### Remember

| Behavior | Implementation | Status or result |
|---|---|---|
| Preventive | Organizations SCPs, RCPs, or declarative policies | enforced / not enabled |
| Detective | Config rules | clear / in violation / not enabled |
| Proactive | CloudFormation hooks | PASS / FAIL / SKIP |

- Preventive controls are supported in all Regions; detective controls apply in Control Tower-supported Regions.
- Guidance and behavior are independent categories.
- Starting with landing zone 4.0, released in November 2025, mandatory controls are no longer applied by default.
- The management account root user and administrators have an exception to control restrictions.
- AWS-GR_REGION_DENY applies across the landing zone's baselined OUs. CT.MULTISERVICE.PV.1 targets selected OUs. The home Region and certain global services are exempt from landing-zone Region deny.

> **Trap:** A proactive control covers CloudFormation provisioning. It does not evaluate a resource created through a direct service API call.
