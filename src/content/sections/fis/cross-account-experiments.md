---
title: Cross-account experiments
level: professional
order: 30
facts:
  - id: multi-scope
    text: FIS multi-account experiments test applications spanning multiple AWS accounts within one
      Region.
    source: https://docs.aws.amazon.com/fis/latest/userguide/multi-account.html#multi-account
  - id: multi-owner
    text: The orchestrator account owns the FIS template and experiment; target accounts hold the
      affected resources.
    source: https://docs.aws.amazon.com/fis/latest/userguide/multi-account.html#multi-account-concepts
  - id: multi-mode
    text: accountTargeting defaults to single-account; multi-account enables targets in other configured
      accounts.
    source: https://docs.aws.amazon.com/fis/latest/userguide/experiment-options.html#account-targeting
  - id: multi-config
    text: A multi-account template needs a target account configuration for each target account,
      including accountId, roleArn, and optional description.
    source: https://docs.aws.amazon.com/fis/latest/userguide/experiment-options.html#template-target-account-configurations
  - id: multi-unique
    text: Target account IDs must be unique in a template, and only one role ARN can be configured for
      each target account.
    source: https://docs.aws.amazon.com/fis/latest/userguide/multi-account-prerequisites.html#permissions
  - id: multi-chain
    text: The orchestrator experiment role trusts FIS and grants sts:AssumeRole on target account roles.
    source: https://docs.aws.amazon.com/fis/latest/userguide/multi-account-prerequisites.html#permissions
  - id: multi-target-role
    text: Each target role trusts the orchestrator role and grants permissions to perform fault actions
      on target resources.
    source: https://docs.aws.amazon.com/fis/latest/userguide/multi-account-prerequisites.html#permissions
  - id: multi-trust
    text: AWS target role trust examples restrict aws:PrincipalArn to the orchestrator role and
      sts:ExternalId to the orchestrator experiment ARN pattern.
    source: https://docs.aws.amazon.com/fis/latest/userguide/multi-account-prerequisites.html#permissions
  - id: multi-alarms
    text: Multi-account stop conditions require cross-account CloudWatch setup with read-only sharing
      from target accounts; Metric Math can combine shared metrics.
    source: https://docs.aws.amazon.com/fis/latest/userguide/multi-account-prerequisites.html#alarms-and-monitoring
  - id: multi-tags
    text: AWS recommends consistent resource tags across target accounts for multi-account FIS resource
      selection.
    source: https://docs.aws.amazon.com/fis/latest/userguide/multi-account.html#best-practices
  - id: multi-az
    text: Use Availability Zone IDs rather than AZ names for consistent cross-account zonal targeting.
    source: https://docs.aws.amazon.com/fis/latest/userguide/multi-account.html#best-practices
  - id: multi-safety
    text: To stop and prevent multi-account experiments, engage the safety lever in the account and
      Region where those experiments run.
    source: https://docs.aws.amazon.com/fis/latest/userguide/multi-account-prerequisites.html#safety-levers-for-multi-accounts
cards:
  - id: fis-006
    q: How can an FIS experiment affect resources in another AWS account?
    a: Set accountTargeting to multi-account and add target account configurations. The orchestrator
      role trusts FIS and can assume target roles, whose policies permit the fault actions.
    facts:
      - multi-mode
      - multi-config
      - multi-chain
      - multi-target-role
  - id: fis-015
    q: A central FIS template must test resources in two workload accounts. Where do the template and
      fault-action permissions belong?
    a: The orchestrator account owns the template and experiment. Each workload account has a target
      role granting fault-action permissions; the orchestrator role can assume those roles.
    facts:
      - multi-owner
      - multi-chain
      - multi-target-role
  - id: fis-016
    q: An FIS multi-account experiment must stop when a metric in a target account becomes unhealthy.
      What extra monitoring setup is needed?
    a: Configure cross-account CloudWatch monitoring with read-only sharing from the target account. Use
      the resulting alarm as the experiment stop condition; Metric Math can combine shared metrics.
    facts:
      - multi-alarms
  - id: fis-017
    q: An FIS experiment must disrupt the same physical Availability Zone across accounts. Should it use
      an AZ name such as us-east-1a?
    a: Use an AZ ID. AZ IDs consistently identify the same zone across accounts, while AZ names may map
      differently.
    trap: true
    facts:
      - multi-az
  - id: fis-018
    q: Does the default FIS accountTargeting mode reach resources in other accounts when their roles
      already exist?
    a: No. The default is single-account. Configure multi-account and a target account configuration for
      each target account.
    trap: true
    facts:
      - multi-mode
      - multi-config
  - id: fis-019
    q: An FIS orchestrator has sts:AssumeRole permission, but access to a target account still fails.
      Which other side of the role chain must be checked?
    a: The target role trust policy must permit the orchestrator role. Its permissions policy must also
      authorize the fault actions on target resources.
    facts:
      - multi-chain
      - multi-target-role
      - multi-trust
diagrams:
  - id: fis-cross-account-role-chain
    title: FIS assumes the orchestrator role and then the target role
    width: 1160
    height: 260
    groups:
      - label: Orchestrator account
        icon: group-aws-account
        x: 20
        y: 30
        w: 510
        h: 200
        tone: mgmt
      - label: Target account
        icon: group-aws-account
        x: 620
        y: 30
        w: 520
        h: 200
        tone: mgmt
    nodes:
      - id: fis
        label: FIS
        icon: fault-injection-service
        x: 40
        y: 100
        w: 160
        h: 72
        tone: mgmt
        info: FIS uses the experiment role in the orchestrator account.
      - id: orchestrator
        label: Orchestrator role
        icon: res-identity-access-management-role
        x: 320
        y: 100
        w: 160
        h: 72
        tone: security
        info: Trusts FIS and allows sts:AssumeRole on the configured target role.
      - id: target
        label: Target role
        icon: res-identity-access-management-role
        x: 650
        y: 100
        w: 160
        h: 72
        tone: security
        info: Trusts the orchestrator role and authorizes actions on target resources.
      - id: resource
        label: Target instance
        icon: res-ec2-instance
        x: 930
        y: 100
        w: 160
        h: 72
        tone: compute
        info: An example target resource affected by an authorized fault action.
    edges:
      - from: fis
        to: orchestrator
        label: assume
        step: 1
      - from: orchestrator
        to: target
        label: assume
        step: 2
      - from: target
        to: resource
        label: act
        step: 3
    steps:
      - FIS assumes the orchestrator experiment role.
      - The orchestrator role assumes the configured role in the target account.
      - The target role permissions authorize fault actions on resources.
---

A multi-account FIS experiment injects faults into a workload spread across AWS accounts within one Region. The orchestrator account owns and starts the experiment; each target account supplies a role that permits actions on its resources.

### How it works

1. Set `accountTargeting` to `multi-account`. Add one target account configuration for each target account with its `accountId` and `roleArn`; the description is optional.
2. Create the orchestrator experiment role. Its trust policy allows FIS to assume it, and its permissions allow `sts:AssumeRole` on the configured target roles.
3. In each target account, trust the orchestrator role and grant the required fault-action permissions. This is role chaining: the service uses one role to assume another. AWS examples constrain the target trust with `aws:PrincipalArn` and `sts:ExternalId`.
4. Select resources using consistent tags across accounts. For matching the same Availability Zone across accounts, use an AZ ID, the stable cross-account zone identifier.
5. Share monitoring data through cross-account CloudWatch setup when stop conditions depend on target-account metrics. Use read-only sharing; Metric Math can combine metrics into an alarm for the experiment.

### Exam cues

- If the question says a central account must inject faults into workload accounts, think multi-account targeting and role chaining, because the orchestrator and target roles have separate responsibilities.
- If the question says target-account health must stop the central experiment, think cross-account CloudWatch sharing, because the orchestrator needs the monitoring data for its stop condition.
- If the question says the same zone must be affected across accounts, think AZ IDs, because they identify zones consistently.

### Remember

- The default targeting mode is `single-account`.
- Each target account configuration uses `accountId` and `roleArn`.
- Target account IDs are unique within the template; only one role ARN is configured per target account.
- Multi-account experiments stay within one Region.
- Engage the safety lever in the experiment's account and Region to stop and prevent its runs.

> **Trap:** Permission to assume a role is only one side of the chain. The target role must also trust the orchestrator and permit the selected fault actions.
