---
title: StackSet permissions and targeting
level: professional
order: 150
facts:
  - id: stackset
    text: A StackSet deploys one template as stacks across selected AWS accounts and Regions; a stack
      instance associates it with an account and Region.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts
  - id: self-managed
    text: Self-managed StackSets require administrator and execution IAM roles with a trust relationship
      between accounts.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts
  - id: service-managed
    text: Service-managed StackSets create the needed roles for accounts managed in AWS Organizations
      and require trusted access.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: targeting
    text: Service-managed StackSets can target the organization or OUs, including child OUs.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: ou
    text: An organizational unit is a group of AWS Organizations accounts that can be targeted together.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: automatic
    text: Automatic deployment creates StackSet instances for accounts added to the targeted
      organization or OUs.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: account-removal
    text: Automatic deployment settings choose whether to retain or delete stacks when accounts leave
      the targeted organization or OUs.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: management-excluded
    text: Service-managed StackSets do not deploy stack instances into the organization management
      account.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: delegation
    text: The management account or a delegated administrator can initiate service-managed StackSet
      operations, but operations are performed by the management account.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: unsupported
    text: Service-managed StackSets do not support nested stacks or templates containing macros or
      transforms.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: sam-transform
    text: AWS::Serverless is a CloudFormation-hosted transform that expands SAM syntax into a
      CloudFormation template.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html#template-macros
  - id: overrides
    text: StackSet parameter values can be overridden for selected accounts and Regions; later StackSet
      updates preserve those overrides.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stackinstances-override.html#stackinstances-override
  - id: override-membership
    text: Parameter overrides applied to current target OU members do not apply to future members, which
      receive StackSet defaults.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stackinstances-override.html#stackinstances-override-console
diagrams:
  - id: cfn-stacksets-deployment
    title: Deploy a service-managed StackSet to OU members
    width: 800
    height: 430
    nodes:
      - id: admin
        label: StackSet
        sub: management or delegate
        icon: cloudformation
        x: 30
        y: 110
        w: 200
        h: 86
        tone: mgmt
        info: Trusted access lets StackSets create roles. A delegated administrator can initiate operations
          performed by the management account.
      - id: orgs
        label: AWS Organizations
        sub: OU membership
        icon: organizations
        x: 30
        y: 310
        w: 200
        h: 86
        tone: mgmt
        info: Automatic deployment adds instances for new target members. Account removal can retain or
          delete their stacks.
      - id: acca
        label: Member account A
        sub: stack in each Region
        icon: res-organizations-account
        x: 450
        y: 30
        w: 230
        h: 86
        tone: mgmt
        info: A stack instance associates the StackSet with one target account and Region.
      - id: accb
        label: Member account B
        sub: stack in each Region
        icon: res-organizations-account
        x: 450
        y: 205
        w: 230
        h: 86
        tone: mgmt
        info: Service-managed deployment excludes the management account.
    edges:
      - from: admin
        to: acca
        step: 1
        label: deploy
      - from: admin
        to: accb
        step: 2
        label: deploy
      - from: orgs
        to: admin
        step: 3
        label: membership change
        dashed: true
    steps:
      - Create a stack instance in a selected member account and Region.
      - Deploy the same template to the other selected account and Region targets.
      - With automatic deployment, account membership changes cause subsequent deployments or
        removals.
cards:
  - id: cloudformation-001
    q: A team needs one CloudFormation template deployed as separate stacks across accounts and Regions.
      Which feature should it use?
    a: StackSets. Each stack instance associates the StackSet with a target account and Region.
    facts:
      - stackset
  - id: cloudformation-005
    q: How do CloudFormation self-managed and service-managed StackSet permissions differ?
    a: "Self-managed: configure administrator and execution roles with cross-account trust.
      Service-managed: use Organizations trusted access and let StackSets create the needed roles."
    facts:
      - self-managed
      - service-managed
  - id: cloudformation-006
    q: A CloudFormation baseline must reach every new account in an OU automatically. What should the
      team configure?
    a: A service-managed StackSet targeting the OU with automatic deployment. Choose whether to retain
      or delete stacks when an account leaves the target.
    facts:
      - targeting
      - automatic
      - account-removal
  - id: cloudformation-008
    q: Will a CloudFormation service-managed StackSet deploy into the organization management account?
    a: No. Management-account deployment is excluded even when targeting the organization. Handle its
      resources with a separate deployment.
    trap: true
    facts:
      - management-excluded
  - id: cloudformation-009
    q: Can a CloudFormation service-managed StackSet template contain nested stacks or macros?
    a: No. Service-managed StackSets do not support nested stacks, macros, or transforms.
    trap: true
    facts:
      - unsupported
  - id: cloudformation-025
    q: A CloudFormation baseline must reach OU members and the management account. Can one
      service-managed StackSet cover both?
    a: No. Use the service-managed StackSet for members and a separate deployment for the management
      account, which is excluded.
    trap: true
    facts:
      - targeting
      - management-excluded
  - id: cloudformation-026
    q: Can a CloudFormation service-managed StackSet directly deploy a template containing the SAM
      transform?
    a: No. AWS::Serverless is a transform, and service-managed StackSets do not support templates
      containing transforms.
    trap: true
    facts:
      - unsupported
      - sam-transform
  - id: cloudformation-061
    q: How can a delegated administrator roll out a CloudFormation baseline to current and future OU
      accounts?
    a: Use a service-managed StackSet with trusted access, OU targeting, and automatic deployment. A
      delegated administrator can initiate it; operations are performed by the management account.
    facts:
      - service-managed
      - targeting
      - automatic
      - delegation
  - id: cloudformation-104
    q: A CloudFormation StackSet needs a larger instance size in one account and Region. Must the team
      duplicate the template?
    a: No. Override that template parameter for the selected stack instances. Later StackSet updates
      preserve the overridden value.
    facts:
      - overrides
  - id: cloudformation-105
    q: A CloudFormation StackSet parameter override was applied to existing OU members. Will a newly
      added account inherit that override?
    a: No. It receives the StackSet default values; overrides on existing members do not automatically
      apply to future members.
    trap: true
    facts:
      - override-membership
---
StackSets deploy a CloudFormation template as separate stacks across accounts and Regions. A stack instance is the association between the StackSet and one target account and Region.

### How it works

1. Select a permission model and configure its prerequisites.
2. Select accounts and Regions. With service-managed permissions, target an organization or organizational unit (OU), a group of accounts; child OUs are included.
3. Enable automatic deployment to add stacks as accounts join the target. Choose retention or deletion when accounts leave.
4. Override template parameter values for selected account and Region combinations when they need different settings. Later StackSet updates preserve those overrides.

| Model | Permissions | Target management |
|---|---|---|
| Self-managed | Administrator and execution roles with cross-account trust | Select accounts and Regions |
| Service-managed | Organizations trusted access; StackSets creates roles | Organization or OUs, with optional automatic deployment |

### Exam cues

- If the question says apply a baseline to new OU accounts automatically, think a service-managed StackSet with automatic deployment, because account membership drives new stack instances.
- If the question says one account needs a different template input, think a stack-instance parameter override, because the template can remain shared.
- If the question says include the management account in an organization rollout, think a separate deployment for it, because service-managed StackSets exclude that account.

### Remember

- A delegated administrator can initiate service-managed operations; the management account performs them.
- Service-managed StackSets do not support nested stacks, macros, or transforms, including `AWS::Serverless`.
- Overrides applied to existing OU members do not carry to future members; they receive StackSet defaults.

> **Trap:** Targeting the whole organization still excludes the management account. Automatic deployment does not remove that exclusion.
