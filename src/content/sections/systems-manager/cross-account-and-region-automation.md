---
title: Cross-account and Region automation
level: professional
order: 50
facts:
  - id: cross-automation
    text: Systems Manager Automation can run from a central account across target AWS accounts,
      organizational units and Regions.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-multiple-accounts-regions.html#running-automations-multiple-accounts-regions
  - id: cross-admin-role
    text: AWS-SystemsManager-AutomationAdministrationRole belongs in the central account and permits
      assuming target execution roles.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-multiple-accounts-regions.html#setup-management-account-iam-roles
  - id: cross-execution-role
    text: Every target account requires AWS-SystemsManager-AutomationExecutionRole; AWS recommends
      CloudFormation StackSets to deploy it.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-multiple-accounts-regions.html#setup-management-account-iam-roles
  - id: cross-pass-role
    text: The caller needs iam:PassRole for the central Automation administration role.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-multiple-accounts-regions.html#multiple-console
  - id: cross-ou
    text: Targeting organizational units requires a management or delegated administrator account that
      can list accounts in the OUs.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-multiple-accounts-regions.html#running-automations-multiple-accounts-regions
  - id: cross-shared
    text: A custom runbook must be shared with every target account.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-multiple-accounts-regions.html#running-automations-multiple-accounts-regions
  - id: cross-location
    text: Location concurrency limits simultaneous account-Region pairs.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-multiple-accounts-regions.html#multiple-console
  - id: cross-resource
    text: Resource rate controls limit concurrent targets and tolerated errors inside each
      account-Region pair.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-multiple-accounts-regions.html#multiple-console
  - id: cross-child
    text: The parent execution exposes child Automation execution IDs; child output must be retrieved in
      its target account and Region.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-multiple-accounts-regions.html#running-automations-multiple-accounts-regions
  - id: cross-approval
    text: aws:approve does not support multi-account and Region automations.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-action-approve.html#automation-action-approve
  - id: term-organizational-unit
    text: "Organizational unit: A group of AWS accounts within an AWS Organizations hierarchy."
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html#orgs_getting-started_concepts
  - id: term-iam-passrole
    text: "iam:PassRole: Permission for a caller to pass an IAM role to an AWS service."
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html#id_roles_use_passrole
diagrams:
  - id: ssm-automation-cross-account
    title: Automation assumes execution roles in target accounts
    width: 1100
    height: 470
    groups:
      - label: Central account
        icon: group-aws-account
        x: 20
        y: 20
        w: 340
        h: 430
        tone: mgmt
      - label: Target account A, Region A
        icon: group-aws-account
        x: 540
        y: 20
        w: 540
        h: 200
        tone: mgmt
      - label: Target account B, Region B
        icon: group-aws-account
        x: 540
        y: 250
        w: 540
        h: 200
        tone: mgmt
    nodes:
      - id: start
        label: Automation
        sub: runbook and locations
        icon: res-systems-manager-automation
        x: 70
        y: 80
        w: 240
        h: 86
        tone: mgmt
      - id: admin
        label: Admin role
        sub: central account
        icon: res-identity-access-management-role
        x: 70
        y: 300
        w: 240
        h: 86
        tone: security
      - id: execa
        label: Execution role
        sub: target account
        icon: res-identity-access-management-role
        x: 570
        y: 90
        w: 190
        h: 86
        tone: security
      - id: nodea
        label: Target nodes
        sub: child execution
        icon: res-ec2-instances
        x: 850
        y: 90
        w: 190
        h: 86
        tone: compute
      - id: execb
        label: Execution role
        sub: target account
        icon: res-identity-access-management-role
        x: 570
        y: 320
        w: 190
        h: 86
        tone: security
      - id: nodeb
        label: Target nodes
        sub: child execution
        icon: res-ec2-instances
        x: 850
        y: 320
        w: 190
        h: 86
        tone: compute
    edges:
      - from: start
        to: admin
        step: 1
      - from: admin
        to: execa
        step: 2
      - from: admin
        to: execb
        step: 2
      - from: execa
        to: nodea
        step: 3
      - from: execb
        to: nodeb
        step: 3
    steps:
      - Start the central runbook using the administration role.
      - Use the administration role to assume the execution role in each target account.
      - Run child automations on the selected resources in each target account and Region.
cards:
  - id: systems-manager-018
    q: A team must run a Systems Manager Automation runbook across member accounts and Regions. What
      must it configure?
    a: Create the administration role in the central account and an execution role in every target
      account. Select target accounts or OUs and Regions; share custom runbooks with every target.
      OU targeting requires a management or delegated administrator account.
    facts:
      - cross-automation
      - cross-admin-role
      - cross-execution-role
      - cross-shared
      - cross-ou
  - id: systems-manager-019
    q: What do location concurrency and resource concurrency control in Systems Manager multi-account
      Automation?
    a: Location concurrency limits simultaneous account-Region pairs. Resource concurrency limits
      targets running within each pair; resource error controls also apply within each pair.
    facts:
      - cross-location
      - cross-resource
  - id: systems-manager-050
    q: A Systems Manager parent Automation shows child execution IDs but no detailed target output.
      Where should an operator look?
    a: Retrieve the child execution output using its execution ID in the target account and Region.
    facts:
      - cross-child
  - id: systems-manager-051
    q: A central Systems Manager workflow cannot assume the role needed to launch cross-account
      Automation. Which caller permission should be checked?
    a: Check iam:PassRole on AWS-SystemsManager-AutomationAdministrationRole, along with the
      administration and target execution role setup.
    facts:
      - cross-pass-role
      - cross-admin-role
      - cross-execution-role
---
Multi-account and Region Automation runs a centrally selected runbook in other AWS locations. A location is an account-Region pair; each location can contain multiple target resources.

### How it works

1. Create `AWS-SystemsManager-AutomationAdministrationRole` in the central account. The caller needs `iam:PassRole`, permission to pass that role to Automation.
2. Create `AWS-SystemsManager-AutomationExecutionRole` in every target account. CloudFormation StackSets can deploy the role across those accounts.
3. Select accounts or organizational units (OUs), Regions and resource targets. An OU is a group of accounts in AWS Organizations. Share a custom runbook with every target account.
4. Set location concurrency across account-Region pairs and resource concurrency and error controls within each pair.
5. Monitor the parent execution for child execution IDs. Read each child execution in its own account and Region for detailed output.

### Exam cues

- If the question says centrally remediate resources across accounts and Regions, think multi-account and Region Automation, because the central role can reach target execution roles.
- If the question says only a few locations may change at once, think location concurrency, because it limits account-Region pairs.
- If the question says only a few instances may change in each location, think resource concurrency, because it limits targets within that pair.

### Remember

- Administration role: central account. Execution role: every target account.
- OU targeting requires the management account or a delegated administrator.
- Custom runbooks must be shared with all targets.
- `aws:approve` is unsupported in multi-account and Region automations.

> **Trap:** Location concurrency does not limit how many resources run inside a location. Configure resource rate controls too.
