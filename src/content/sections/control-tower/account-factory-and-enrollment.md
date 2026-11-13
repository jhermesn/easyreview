---
title: Account Factory and enrollment
level: professional
order: 30
facts:
  - id: factory
    text: Account Factory provides configurable account templates to standardize account provisioning and enrollment.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html#related-services
  - id: baseline
    text: Single-account provisioning, update, and customization require a target OU with AWSControlTowerBaseline enabled.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html#account-factory
  - id: baseline-definition
    text: A baseline is a group of resources and settings used to establish governance on a target OU or account.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/types-of-baselines.html#types-of-baselines
  - id: permissions
    text: By default, IAM Identity Center users who provision accounts belong to AWSAccountFactory or the management group.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html#account-factory
  - id: request
    text: A standard Account Factory request can start in the Control Tower console, Service Catalog console, or Service Catalog ProvisionProduct API.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/accounts.html#accounts
  - id: create
    text: Service Catalog calls Control Tower; Control Tower first calls Organizations CreateAccount, then applies blueprints and controls.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/accounts.html#accounts
  - id: poll
    text: Service Catalog polls the workflow and reports the completed provisioning result.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/accounts.html#accounts
  - id: manual-role
    text: Manual single-account enrollment requires AWSControlTowerExecution with AdministratorAccess and trust in the management account.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/enrollment-prerequisites.html#enrollment-prerequisites
  - id: enroll-org
    text: An existing account must be in the same organization and enrolled into a registered OU; conflicting Config resources must be handled before enrollment.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/enrollment-prerequisites.html#enrollment-prerequisites
  - id: auto-role
    text: Precreating AWSControlTowerExecution is not required for auto-enrollment or enrollment through Register OU.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/enrollment-prerequisites.html#enrollment-prerequisites
  - id: auto-enroll
    text: Optional auto-enrollment applies destination OU baseline resources and controls when an account moves into a registered OU.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/account-auto-enrollment.html#account-auto-enrollment
  - id: afc-blueprint
    text: AFC applies one Service Catalog blueprint product per account, stored in a hub account in the landing zone home Region.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/af-customization-page.html#af-limitations
  - id: afc-targets
    text: AFC supports home-Region-only or all-governed-Region deployment, not an arbitrary subset.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/af-customization-page.html#af-limitations
  - id: afc-product
    text: With AFC blueprint customization, Control Tower does not create an Account Factory provisioned product in its management account.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/af-customization-page.html#af-limitations
  - id: lifecycle
    text: Lifecycle events record completed Control Tower operations with Succeeded or Failed state and are recorded as non-API CloudTrail service events.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/lifecycle-events.html#lifecycle-events
  - id: event-delivery
    text: Lifecycle events are delivered to EventBridge; an active CloudTrail trail with logging enabled is required.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/lifecycle-events.html#lifecycle-events
  - id: event-automation
    text: EventBridge rules can trigger subsequent automation based on completed lifecycle events.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/lifecycle-events.html#lifecycle-events
  - id: event-retry
    text: A creation retry for an account that already exists can emit UpdateManagedAccount; automation should consider both CreateManagedAccount and UpdateManagedAccount.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/lifecycle-events.html#lifecycle-events
  - id: cfct
    text: CfCT deploys CloudFormation templates, SCPs, and RCPs to accounts or OUs and integrates with lifecycle events to apply configured customizations to new Account Factory accounts.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/cfct-overview.html#cfct-overview
  - id: cfct-baseline
    text: CfCT target OUs require AWSControlTowerBaseline.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/cfct-overview.html#cfct-overview
  - id: cfct-manifest
    text: The CfCT configuration package contains a manifest, templates, and policy JSON; the manifest defines resources and deployment targets.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/cfct-codepipeline-overview.html#cfct-codepipeline-overview
  - id: cfct-order
    text: CfCT pipeline order is source, build validation, optional manual approval, SCP, RCP, and CloudFormation resources.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/cfct-codepipeline-overview.html#code-pipeline-stages
  - id: cfct-dependencies
    text: CfCT deploys CloudFormation resources through StackSets in manifest order; manifest order expresses dependencies.
    source: https://docs.aws.amazon.com/controltower/latest/userguide/cfct-codepipeline-overview.html#code-pipeline-stages
  - id: scp-definition
    text: A service control policy (SCP) limits the permissions available to identities in member accounts and does not grant permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: rcp-definition
    text: A resource control policy (RCP) limits permissions available on resources in member accounts and does not grant permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html
  - id: declarative-definition
    text: A declarative policy enforces the desired configuration of a supported AWS service across an organization.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_declarative_policies.html
  - id: stackset-definition
    text: CloudFormation StackSets deploy related stacks across accounts and Regions.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html
diagrams:
  - id: control-tower-account-factory
    title: Standard Account Factory request and completion event
    width: 1125
    height: 660
    nodes:
      - id: requester
        label: Requester
        sub: console or API
        icon: res-users
        x: 25
        y: 188
        w: 150
        h: 86
        tone: user
        info: An authorized user requests standard Account Factory provisioning through the console or Service Catalog API.
      - id: sc
        label: Service Catalog
        sub: Account Factory product
        icon: service-catalog
        x: 300
        y: 188
        w: 180
        h: 86
        tone: mgmt
        info: This standard flow uses a Service Catalog provisioned product. AFC blueprint provisioning has a different representation and does not create this product in the management account.
      - id: ct
        label: Control Tower
        sub: provisioning workflow
        icon: control-tower
        x: 613
        y: 188
        w: 160
        h: 86
        tone: mgmt
        info: Runs the workflow, then applies the baseline and the **controls** enabled on the target OU. The target OU must have the baseline enabled.
      - id: org
        label: Organizations
        sub: CreateAccount
        icon: organizations
        x: 900
        y: 45
        w: 160
        h: 86
        tone: mgmt
        info: Control Tower calls `CreateAccount` first. The new account lands in the chosen OU.
      - id: acct
        label: New account
        sub: baseline + controls
        icon: group-aws-account
        x: 900
        y: 330
        w: 160
        h: 86
        tone: mgmt
        info: Control Tower applies resources and controls required by the account and target OU configuration.
      - id: event
        label: EventBridge
        sub: lifecycle completion
        icon: eventbridge
        x: 613
        y: 530
        w: 180
        h: 86
        tone: integration
      - id: automation
        label: Automation
        sub: configured target
        icon: lambda
        x: 900
        y: 530
        w: 180
        h: 86
        tone: compute
    edges:
      - from: requester
        to: sc
        step: 1
        label: request
      - from: sc
        to: ct
        step: 2
        label: calls
      - from: ct
        to: org
        step: 3
      - from: ct
        to: acct
        step: 4
      - from: ct
        to: event
        step: 5
        label: completion event
      - from: event
        to: automation
        step: 6
        label: match success
    steps:
      - An authorized user starts a standard Account Factory request through the console or Service Catalog ProvisionProduct API.
      - Service Catalog calls Control Tower and keeps polling it until the workflow finishes.
      - As its first step Control Tower calls Organizations `CreateAccount`.
      - Control Tower applies the required account configuration and controls, and Service Catalog reports the workflow result.
      - A lifecycle event records completion and success or failure. Delivery to EventBridge requires an active CloudTrail trail with logging enabled.
      - An EventBridge rule can trigger the next automation step after a successful lifecycle event.
  - id: control-tower-cfct-stages
    title: CfCT validates before deploying policies and resources
    width: 1490
    height: 190
    nodes:
      - id: source
        label: Source package
        icon: codepipeline
        x: 20
        y: 55
        w: 170
        h: 72
        tone: devtools
      - id: build
        label: Validate
        icon: codebuild
        x: 275
        y: 55
        w: 170
        h: 72
        tone: devtools
      - id: approve
        label: Approval (opt)
        icon: res-users
        x: 530
        y: 55
        w: 170
        h: 72
        tone: user
      - id: scp
        label: SCP stage
        icon: organizations
        x: 785
        y: 55
        w: 170
        h: 72
        tone: mgmt
      - id: rcp
        label: RCP stage
        icon: organizations
        x: 1040
        y: 55
        w: 170
        h: 72
        tone: mgmt
      - id: stacks
        label: StackSets
        icon: cloudformation
        x: 1295
        y: 55
        w: 170
        h: 72
        tone: mgmt
    edges:
      - from: source
        to: build
        step: 1
      - from: build
        to: approve
        step: 2
      - from: approve
        to: scp
        step: 3
      - from: scp
        to: rcp
        step: 4
      - from: rcp
        to: stacks
        step: 5
    steps:
      - Read the configuration package and validate its manifest and templates.
      - Pause for approval if the optional approval stage is enabled.
      - Deploy the service control policies.
      - Deploy the resource control policies.
      - Deploy CloudFormation resources through StackSets in manifest order.
cards:
  - id: control-tower-009
    q: What does AWS Control Tower Account Factory do, and which OU prerequisite applies to single-account provisioning?
    a: It standardizes account creation and enrollment from configurable templates. The target OU must have AWSControlTowerBaseline enabled. By default, provisioning Identity Center users belong to AWSAccountFactory or the management group.
    facts:
      - factory
      - baseline
      - permissions
  - id: control-tower-010
    q: An administrator must manually enroll an existing AWS account into AWS Control Tower. What must be prepared?
    a: Use an account in the same organization and a registered target OU. Add AWSControlTowerExecution with AdministratorAccess and management-account trust, and resolve conflicting Config resources. Precreating the role is not required for auto-enrollment or Register OU.
    facts:
      - manual-role
      - enroll-org
      - auto-role
  - id: control-tower-019
    q: A team wants a standard AWS Control Tower account customized with a Service Catalog blueprint from a central account. Which feature fits?
    a: Account Factory Customization (AFC). Store one blueprint product in a hub account in the landing zone home Region.
    facts:
      - afc-blueprint
  - id: control-tower-020
    q: An AWS Control Tower AFC team wants a different blueprint deployment subset for each account. What Region choices does AFC support?
    a: Home Region only or all governed Regions. Arbitrary Region subsets are not supported.
    trap: true
    facts:
      - afc-targets
  - id: control-tower-021
    q: A team must trigger automation after AWS Control Tower finishes provisioning an account. What event path should it use?
    a: Use an EventBridge rule matching successful lifecycle completion. Enable logging on an active CloudTrail trail and handle both CreateManagedAccount and UpdateManagedAccount for retries.
    facts:
      - lifecycle
      - event-delivery
      - event-automation
      - event-retry
  - id: control-tower-022
    q: New AWS Control Tower accounts must receive custom CloudFormation resources and organizational policies automatically. Which extension fits?
    a: Customizations for AWS Control Tower (CfCT). It uses configured templates and policies with lifecycle integration; target OUs require AWSControlTowerBaseline.
    facts:
      - cfct
      - cfct-baseline
  - id: control-tower-023
    q: How does an AWS Control Tower CfCT administrator express a dependency between custom CloudFormation resources?
    a: Place the resources in dependency order in the manifest. CfCT deploys them through StackSets in that order.
    facts:
      - cfct-manifest
      - cfct-dependencies
  - id: control-tower-024
    q: An AWS Control Tower AFC account was provisioned with a blueprint, but no Account Factory provisioned product appears in the management account. Is this expected?
    a: Yes. Blueprint customization does not create that Account Factory provisioned product in the management account.
    trap: true
    facts:
      - afc-product
---
Account Factory standardizes AWS account creation and enrollment. A baseline is the set of resources and settings used for governance. Account Factory Customization (AFC) adds a blueprint, a Service Catalog product describing the resources and configuration an account should receive.

### How it works

1. For single-account provisioning, select an OU with AWSControlTowerBaseline enabled. By default, provisioning IAM Identity Center users belong to AWSAccountFactory or the management group.
2. In the standard Service Catalog workflow, a console or ProvisionProduct request calls Control Tower. Control Tower first calls Organizations CreateAccount, applies the required resources and controls, and Service Catalog polls for the result.
3. For manual enrollment, prepare AWSControlTowerExecution with AdministratorAccess and management-account trust. Use the same organization and a registered target OU, and resolve conflicting Config resources. Auto-enrollment and Register OU do not require you to precreate the role.
4. For AFC, store one Service Catalog blueprint in a hub account in the landing zone home Region. Choose deployment in the home Region only or all governed Regions. AFC blueprint provisioning does not create an Account Factory provisioned product in the management account.
5. For automation after provisioning, match successful lifecycle events in EventBridge. A lifecycle event marks operation completion. An active CloudTrail trail with logging enabled is required for delivery. Handle both CreateManagedAccount and UpdateManagedAccount because retries can emit the latter.
6. For custom CloudFormation resources and organizational policies, use Customizations for AWS Control Tower (CfCT). Its manifest, a file listing resources and targets, drives source retrieval, build validation, optional approval, service control policy (SCP) deployment, resource control policy (RCP) deployment, and CloudFormation StackSets, which deploy related stacks across accounts and Regions. SCPs limit member-account identity permissions; RCPs limit access to member-account resources. Resource order in the manifest expresses dependencies. Target OUs need AWSControlTowerBaseline.

### Exam cues

- If the question says create or enroll accounts consistently, think Account Factory, because it applies standardized account configuration.
- If the question says apply one Service Catalog blueprint from a hub account, think AFC, because it customizes accounts during provisioning or update.
- If the question says start automation only after account provisioning finishes, think a successful lifecycle event, because an initial CreateAccount request is not the completed workflow.
- If the question says automatically distribute custom templates and organizational policies to new accounts, think CfCT, because it integrates custom deployment with account lifecycle events.

### Remember

| Requirement | Mechanism |
|---|---|
| Standard account provisioning | Account Factory |
| One catalog blueprint per account | AFC |
| Automation after operation completion | Lifecycle event and EventBridge rule |
| Custom templates, SCPs, and RCPs across accounts or OUs | CfCT |

- Single-account provisioning and CfCT target OUs require AWSControlTowerBaseline.
- AFC allows one blueprint per account and two Region choices: home only or all governed Regions.
- Lifecycle event state is Succeeded or Failed. Filter for the result your workflow requires.
- CfCT validates its configuration before policy and resource deployment; manual approval is optional.

> **Trap:** The account can already exist when a provisioning retry begins. Listen for UpdateManagedAccount as well as CreateManagedAccount before deciding which automation to run.
