---
title: Conformance packs and organization rules
level: professional
order: 40
facts:
  - id: pack-definition
    text: A conformance pack is a collection of Config rules and remediation actions deployed as one
      entity to an account and Region or across an organization.
    source: https://docs.aws.amazon.com/config/latest/developerguide/conformance-packs.html#conformance-packs
  - id: pack-template
    text: A conformance pack uses a YAML template listing managed or custom Config rules and remediation
      actions.
    source: https://docs.aws.amazon.com/config/latest/developerguide/conformance-packs.html#conformance-packs
  - id: pack-api
    text: PutOrganizationConformancePack deploys conformance packs across member accounts and can be
      called only by the management account or a delegated administrator.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_PutOrganizationConformancePack.html
  - id: organization-features
    text: Organization conformance pack deployment requires all features enabled in AWS Organizations.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_PutOrganizationConformancePack.html
  - id: delegated-setup
    text: A delegated administrator for organization conformance packs must be registered for
      config-multiaccountsetup.amazonaws.com.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_PutOrganizationConformancePack.html
  - id: organization-rule-api
    text: Organization Config rules can be created only through the API or CLI, including
      PutOrganizationConfigRule, not the Config console.
    source: https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html#config-rule-multi-account-deployment
  - id: region-deployment
    text: Organization rule and conformance pack API deployments are Region-specific and must be
      repeated in other target Regions.
    source: https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html#config-rule-multi-account-deployment-considerations
  - id: membership-lifecycle
    text: Organization rules and packs deploy to newly joined accounts and are removed when accounts
      leave the organization.
    source: https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html#config-rule-multi-account-deployment-considerations
  - id: recording-prerequisite
    text: AWS directs customers to enable Config recording before deploying organization rules and
      conformance packs.
    source: https://docs.aws.amazon.com/config/latest/developerguide/conformance-pack-organization-apis.html#conformance-pack-organization-deployment
  - id: new-account-retries
    text: When a newly joined account lacks a recorder, deployment of existing organization rules and
      packs is retried for seven hours after the account joins.
    source: https://docs.aws.amazon.com/config/latest/developerguide/config-rule-multi-account-deployment.html#config-rule-multi-account-deployment-considerations
  - id: central-ownership
    text: Member accounts cannot modify the underlying organization conformance pack rules and
      remediation actions.
    source: https://docs.aws.amazon.com/config/latest/developerguide/conformance-pack-organization-apis.html#conformance-pack-organization-apis
  - id: account-exclusions
    text: Organization conformance pack deployment can exclude specified accounts.
    source: https://docs.aws.amazon.com/config/latest/developerguide/conformance-pack-organization-apis.html#conformance-pack-organization-apis
  - id: pack-remediation-update
    text: To add remediation to a service-linked rule in a conformance pack, add it to the pack template
      and update the pack.
    source: https://docs.aws.amazon.com/config/latest/developerguide/service-linked-awsconfig-rules.html#service-linked-awsconfig-rules
  - id: direct-remediation-restriction
    text: PutRemediationConfigurations does not support service-linked rules, including organization
      rules, pack rules, and Security Hub rules.
    source: https://docs.aws.amazon.com/config/latest/APIReference/API_PutRemediationConfigurations.html
  - id: aggregator-readonly
    text: An aggregator replicates configuration and compliance data into a read-only view and cannot
      deploy rules to source accounts.
    source: https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html
  - id: service-linked-ownership
    text: Service-linked Config rules are owned by their creating AWS service and cannot be edited or
      deleted directly by a customer while subscribed to that service.
    source: https://docs.aws.amazon.com/config/latest/developerguide/service-linked-awsconfig-rules.html#service-linked-awsconfig-rules
  - id: delegate-definition
    text: A delegated administrator for an integrated AWS service is a member account registered to
      administer that service across the organization.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
diagrams:
  - id: config-organization-pack-flow
    title: Deploy an organization pack separately in each target Region
    width: 820
    height: 320
    nodes:
      - id: admin
        label: Config admin
        sub: management or delegate
        icon: config
        x: 20
        y: 115
        w: 200
        h: 86
        tone: mgmt
        info: Deploys the YAML pack through PutOrganizationConformancePack. A delegated administrator is a
          member account authorized to administer this integration.
      - id: member-a
        label: Member account A
        sub: rules and remediation
        icon: config
        x: 560
        y: 25
        w: 220
        h: 86
        tone: mgmt
        info: Recording must be configured. The member cannot modify the centrally managed pack resources.
      - id: member-b
        label: Member account B
        sub: rules and remediation
        icon: config
        x: 560
        y: 210
        w: 220
        h: 86
        tone: mgmt
        info: New accounts receive the pack after joining, subject to prerequisites and account exclusions.
    edges:
      - from: admin
        to: member-a
        step: 1
        label: deploy pack
      - from: admin
        to: member-b
        step: 2
        label: deploy pack
    steps:
      - From the management or delegated administrator account, deploy the template to member
        accounts in the chosen Region.
      - The same organization deployment covers other included member accounts. Repeat deployment in
        each other required Region.
cards:
  - id: config-012
    q: What does an AWS Config conformance pack contain, and what format defines it?
    a: A YAML template bundling managed or custom Config rules and remediation actions. Deploy it as one
      entity in an account and Region or across an organization.
    facts:
      - pack-definition
      - pack-template
  - id: config-013
    q: How does an AWS Config organization conformance pack follow account membership changes?
    a: It deploys to newly joined accounts and is removed when accounts leave. Deploy from the
      management account or a delegated administrator; member accounts cannot modify its rules and
      remediation actions.
    facts:
      - pack-api
      - membership-lifecycle
      - central-ownership
  - id: config-014
    q: How are AWS Config organization rules created, and what happens when a newly joined account has
      no recorder?
    a: Create rules through the API or CLI, such as PutOrganizationConfigRule, separately in each
      Region. Deployment retries for seven hours after the account joins if a recorder is
      unavailable.
    trap: true
    facts:
      - organization-rule-api
      - region-deployment
      - new-account-retries
  - id: config-023
    q: A security team needs common AWS Config checks deployed across member accounts and one central
      compliance view. Which two features fit?
    a: An organization conformance pack deploys the rules and remediation actions. An aggregator
      collects a read-only central view; it does not deploy the checks.
    trap: true
    facts:
      - pack-definition
      - pack-api
      - aggregator-readonly
  - id: config-038
    q: A new AWS account joins an organization with AWS Config organization rules, but no recorder
      exists. What should the administrator do within the deployment retry window?
    a: Create and enable the required recorder. Existing organization rule and pack deployments are
      retried for seven hours after the account joins when a recorder is unavailable.
    facts:
      - recording-prerequisite
      - new-account-retries
  - id: config-039
    q: A team needs to add automatic remediation to an AWS Config rule created by a conformance pack.
      Should it call PutRemediationConfigurations directly?
    a: No. Add the remediation action to the conformance pack template and update the pack. Direct
      remediation configuration is unsupported for these service-linked rules.
    trap: true
    facts:
      - pack-remediation-update
      - direct-remediation-restriction
---
An AWS Config **conformance pack** bundles compliance rules and remediation actions into one deployment. Use an **organization rule** for a centrally managed rule, or an organization conformance pack when the deployment should include a collection of checks and fixes.

### How it works

1. Enable Config recording in the target accounts and Regions. For organization packs, enable all Organizations features. Deploy from the management account or a **delegated administrator**, a member account authorized to administer the integration. Register that delegate for `config-multiaccountsetup.amazonaws.com`.
2. Write a **YAML template**, a text file describing the pack's managed or custom rules and remediation actions. Deploy it with `PutOrganizationConformancePack`. For individual organization rules, use `PutOrganizationConfigRule` through the API or CLI; their creation is unavailable in the Config console.
3. Deploy separately in each target Region. Specify excluded accounts when some members should not receive a pack. Member accounts cannot modify centrally deployed pack rules and remediation actions.
4. As accounts join, Config deploys the existing organization rules and packs to them. When accounts leave, Config removes those deployments. If a new account has no recorder, deployment retries for seven hours after it joins.
5. To add or change remediation for a rule in a pack, update the pack template. These are **service-linked rules**, rules owned by the service that creates them. Direct `PutRemediationConfigurations` calls do not support them.

### Exam cues

- If the question says deploy common checks and fixes to member accounts, think an organization conformance pack, because the template packages rules with remediation actions.
- If the question says new accounts must inherit checks, think organization rules or packs with recorder setup, because membership changes trigger deployment but prerequisites still apply.
- If the question says keep a central compliance dashboard and deploy checks, think an aggregator plus an organization deployment, because aggregation is read-only.
- If the question says attach remediation directly to a pack rule, think update the pack template, because the pack owns its service-linked rules.

### Remember

| Feature | Main job |
|---|---|
| Organization rule | Deploy an individual rule centrally |
| Organization conformance pack | Deploy rules and remediation together |
| Aggregator | Read configuration and compliance data centrally |

- Organization rule creation is API or CLI only.
- Organization rule and pack API deployments are per Region.
- Recorder unavailable in a newly joined account: deployment retries for seven hours.
- New accounts receive deployments; leaving accounts lose them. Account exclusions can limit pack deployment.

> **Trap:** Adding remediation directly to an organization rule is unsupported by `PutRemediationConfigurations`. Use a conformance pack template when deploying rules and remediation together.

> **Trap:** Creating an aggregator does not deploy rules or establish recording in source accounts.
