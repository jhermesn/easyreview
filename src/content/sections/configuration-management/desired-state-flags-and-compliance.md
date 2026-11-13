---
title: Desired state, flags, and compliance
level: associate
order: 20
facts:
  - id: association
    text: A State Manager association defines a desired configuration, targets, and a schedule for applying it.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-about.html
  - id: new-nodes
    text: State Manager automatically applies an association to new managed nodes that match its tag or all-node targets.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-vs-maintenance-windows.html
  - id: compliance
    text: State Manager associations report compliance with their required state.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-vs-maintenance-windows.html
  - id: external
    text: State Manager integrates with Chef recipes, Ansible playbooks, and PowerShell Desired State Configuration.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-vs-maintenance-windows.html
  - id: window
    text: Maintenance Windows start tasks within a specified time window; already started actions can finish after the window ends.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-vs-maintenance-windows.html
  - id: flags
    text: AppConfig changes application behavior with feature flags and free-form configuration without redeploying application code.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html
  - id: validate
    text: AppConfig validators check configuration syntax and semantics before deployment.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html
  - id: rollout
    text: AppConfig deployment strategies roll out configuration changes over a defined period.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html
  - id: rollback
    text: AppConfig can roll back a deployment when its configured CloudWatch alarm enters ALARM, with the necessary permissions.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
  - id: poll
    text: AppConfig Agent caches configuration locally and polls the AppConfig data plane for updates.
    source: https://docs.aws.amazon.com/appconfig/latest/userguide/about-data-plane.html
  - id: record
    text: AWS Config records resource configuration history and relationships.
    source: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html
  - id: rules
    text: AWS Config rules evaluate resource configuration against desired settings and report noncompliance.
    source: https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html
  - id: remediate
    text: AWS Config remediation uses Systems Manager Automation documents for noncompliant resources.
    source: https://docs.aws.amazon.com/config/latest/developerguide/remediation.html
  - id: proactive
    text: AWS Config proactive evaluation can assess resource properties before deployment but does not prevent deployment or remediate noncompliant resources.
    source: https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_turn-on-proactive-rules.html
  - id: hook
    text: CloudFormation Hooks can prevent provisioning when configured to fail on noncompliance.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/what-is-cloudformation-hooks.html
  - id: scp
    text: Service control policies limit maximum permissions in member accounts without granting permissions.
    source: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
  - id: parameters
    text: Parameter Store holds named configuration values; SecureString encrypts values using AWS KMS.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
  - id: parameter-update
    text: Parameter Store updates take effect on the next read without gradual rollout or automatic rollback.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
  - id: rotation
    text: Secrets Manager supports automatic rotation, including managed rotation and Lambda-based rotation.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
  - id: replicas
    text: Secrets Manager can replicate encrypted secrets across Regions and propagates rotated primary values to replicas.
    source: https://docs.aws.amazon.com/secretsmanager/latest/userguide/replicate-secrets.html
diagrams:
  - id: configuration-remediation
    title: Evaluate resource settings, then repair violations
    width: 800
    height: 180
    nodes:
      - id: config
        label: AWS Config
        icon: config
        tone: mgmt
        x: 30
        y: 45
        w: 200
        h: 86
      - id: automation
        label: Automation
        icon: res-systems-manager-automation
        tone: mgmt
        x: 300
        y: 45
        w: 200
        h: 86
      - id: resource
        label: AWS resource
        icon: res-ec2-instance
        tone: compute
        x: 570
        y: 45
        w: 200
        h: 86
    edges:
      - from: config
        to: automation
        step: 1
      - from: automation
        to: resource
        step: 2
    steps:
      - A rule identifies noncompliance and invokes its configured remediation.
      - The Automation document performs the remediation actions.
cards:
  - id: configuration-management-003
    q: Which AWS tools maintain server settings, deploy feature flags, and evaluate resource compliance?
    a: State Manager maintains server configuration. AppConfig deploys application settings and flags. AWS Config records resource configurations and evaluates rules.
    facts:
      - association
      - flags
      - record
      - rules
  - id: configuration-management-009
    q: An Auto Scaling group adds EC2 instances that must receive standard OS settings and report compliance. Which AWS feature fits?
    a: State Manager associations targeting matching tags or all nodes. New matching managed nodes receive the configuration.
    facts:
      - new-nodes
      - association
      - compliance
  - id: configuration-management-010
    q: A team must gradually enable an application feature and undo the change if error alarms fire. Which AWS tool fits?
    a: AppConfig with a deployment strategy and configured CloudWatch alarms. Validators check the configuration before deployment.
    facts:
      - flags
      - validate
      - rollout
      - rollback
  - id: configuration-management-011
    q: A team enables AWS Config proactive evaluation. Does this automatically block noncompliant resources from deployment?
    a: No. Proactive evaluation reports results. Use an enforcement control such as a CloudFormation Hook configured to fail for provisioning prevention.
    trap: true
    facts:
      - proactive
      - hook
  - id: configuration-management-012
    q: An AWS Config rule finds a resource noncompliant. Which mechanism can perform the repair?
    a: A Systems Manager Automation document associated with the rule as a remediation action.
    facts:
      - remediate
  - id: configuration-management-013
    q: An application reads a new Parameter Store value and fails. Does Parameter Store automatically roll it back?
    a: No. Parameter Store updates take effect on the next read. AppConfig provides a managed gradual rollout and alarm-based rollback workflow.
    trap: true
    facts:
      - parameter-update
      - rollout
      - rollback
---
Configuration management keeps operational settings consistent as systems change. Separate the resource definition, the settings inside servers, the application settings, and the compliance record so each change uses the right control.

### How it works

1. For managed servers, create a State Manager association: a desired configuration linked to targets and an execution schedule. Matching new nodes receive it, and associations report compliance.
2. For application behavior, use AppConfig feature flags, settings that enable or disable behavior, or free-form configuration. Validators check the data before a deployment strategy releases it gradually.
3. Configure CloudWatch alarms and permissions for AppConfig rollback. The AppConfig Agent polls for updates and keeps a local cached copy for the application.
4. For resource compliance, let AWS Config record configuration history and evaluate rules. Attach Systems Manager Automation documents, called runbooks, for remediation, meaning actions that repair noncompliance.

| Requirement | Fit |
|---|---|
| Maintain server settings, including Chef, Ansible, or PowerShell DSC configurations | State Manager |
| Start maintenance tasks during a chosen period | Maintenance Windows |
| Gradually change application flags with validation and alarm rollback | AppConfig |
| Record resource settings, relationships, and rule results | AWS Config |
| Store named settings, including KMS-encrypted SecureString values | Parameter Store |
| Rotate credentials and replicate secrets across Regions | Secrets Manager |

### Exam cues

- If the question says automatically configure new Auto Scaling instances, think State Manager with tag targets, because matching managed nodes receive the association.
- If the question says release a flag gradually and reverse on alarms, think AppConfig, because its deployment workflow provides rollout and rollback controls.
- If the question says investigate past resource settings and repair violations, think AWS Config with Automation remediation, because recording, evaluation, and repair are separate parts of that workflow.
- If the question says restrict maximum permissions across member accounts, think service control policies, because they set permission limits without granting access.

### Remember

- A maintenance window controls task start times. An action already running can finish after the window ends.
- Parameter Store applies updates on the next read; it has no automatic gradual rollout or rollback.
- Secrets Manager can propagate rotated primary secret values to Region replicas.
- Proactive AWS Config evaluation assesses proposed properties but does not block deployment or remediate them.

> **Trap:** AWS Config can evaluate a proposed resource before deployment. Evaluation alone does not prevent creation. Use a CloudFormation Hook configured to fail when provisioning must be rejected.
