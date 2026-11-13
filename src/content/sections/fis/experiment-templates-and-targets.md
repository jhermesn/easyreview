---
title: Experiment templates and targets
level: associate
order: 10
facts:
  - id: template-purpose
    text: FIS injects real faults into real AWS resources so teams can observe workload behavior; AWS
      recommends planning and pre-production experiments before production.
    source: https://docs.aws.amazon.com/fis/latest/userguide/what-is.html#what-is
  - id: template-components
    text: An FIS experiment template defines actions, targets, stop conditions, and an IAM experiment
      role.
    source: https://docs.aws.amazon.com/fis/latest/userguide/experiment-templates.html#experiment-templates
  - id: template-resolve
    text: FIS resolves target resources at experiment start, before actions begin, and uses that
      selected set for the experiment.
    source: https://docs.aws.amazon.com/fis/latest/userguide/targets.html#targets
  - id: template-criteria
    text: Targets can use specific resource identifiers or selection criteria such as tags and filters;
      a target cannot combine resource IDs with tags or filters.
    source: https://docs.aws.amazon.com/fis/latest/userguide/targets.html#target-identification
  - id: template-tags
    text: When an FIS target has multiple tags, a resource must match all specified tags.
    source: https://docs.aws.amazon.com/fis/latest/userguide/targets.html#target-identification
  - id: template-all
    text: ALL selects every matching target resource.
    source: https://docs.aws.amazon.com/fis/latest/userguide/targets.html#target-selection-mode
  - id: template-count
    text: COUNT(n) selects a specified number of matching resources at random.
    source: https://docs.aws.amazon.com/fis/latest/userguide/targets.html#target-selection-mode
  - id: template-percent
    text: PERCENT(n) selects a specified percentage of matching resources at random; fractional resource
      counts round down.
    source: https://docs.aws.amazon.com/fis/latest/userguide/targets.html#target-selection-mode
  - id: template-sequence
    text: An FIS action startAfter lists actions that must finish before it starts; actions without
      dependencies start when the experiment starts.
    source: https://docs.aws.amazon.com/fis/latest/userguide/action-sequence.html#action-syntax
  - id: template-empty
    text: The default emptyTargetResolutionMode is fail; skip allows unresolved non-identifier targets
      to be skipped, but missing explicitly identified targets still fail.
    source: https://docs.aws.amazon.com/fis/latest/userguide/experiment-options.html#empty-target-resolution-mode
  - id: template-preview
    text: Starting with actionsMode skip-all previews resolved targets without injecting faults; run-all
      is the default.
    source: https://docs.aws.amazon.com/fis/latest/userguide/experiment-options.html#actions-mode
  - id: template-preview-limit
    text: An FIS target preview does not verify permission to perform fault actions and can differ from
      targets selected by a later run.
    source: https://docs.aws.amazon.com/fis/latest/userguide/experiment-options.html#actions-mode
  - id: template-permissions
    text: The experiment role trusts fis.amazonaws.com and needs permissions for the selected actions;
      AWS recommends restricting permissions with resource ARNs or tags.
    source: https://docs.aws.amazon.com/fis/latest/userguide/getting-started-iam-service-role.html#getting-started-iam-service-role
  - id: template-source
    text: AWS recommends aws:SourceAccount and aws:SourceArn conditions in the FIS role trust policy to
      restrict the experiment origin.
    source: https://docs.aws.amazon.com/fis/latest/userguide/getting-started-iam-service-role.html#create-fis-role-prereqs
  - id: template-az
    text: "The AZ Availability: Power Interruption scenario simulates outage symptoms including stopped
      compute, impaired scaling, subnet connectivity loss, and database failover."
    source: https://docs.aws.amazon.com/fis/latest/userguide/az-availability-scenario.html#az-availability-scenario
  - id: template-health
    text: A stop condition uses a CloudWatch alarm to stop an FIS experiment when workload performance
      crosses an unacceptable threshold.
    source: https://docs.aws.amazon.com/fis/latest/userguide/experiment-templates.html#experiment-templates
  - id: template-arn
    text: An Amazon Resource Name, or ARN, uniquely identifies an AWS resource.
    source: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html#reference-arns
cards:
  - id: fis-001
    q: A team must test whether a multi-AZ application tolerates losing an Availability Zone. Which FIS
      scenario fits?
    a: "Use AZ Availability: Power Interruption with scoped targets and stop conditions. It injects
      outage symptoms including compute loss, impaired scaling, connectivity loss, and database
      failover. Plan and run it in pre-production first."
    facts:
      - template-az
      - template-purpose
      - template-components
  - id: fis-002
    q: What does an AWS FIS experiment template define?
    a: Actions, targets, stop conditions, and the IAM experiment role. Starting an experiment uses that
      blueprint to inject the selected faults.
    facts:
      - template-components
      - template-purpose
  - id: fis-005
    q: Which IAM role does FIS use for an experiment, and how should it be scoped?
    a: Use an experiment role that trusts fis.amazonaws.com and grants only the required action
      permissions on selected resource ARNs or tags. Add aws:SourceAccount and aws:SourceArn trust
      conditions.
    facts:
      - template-permissions
      - template-source
  - id: fis-007
    q: An FIS experiment must affect one randomly chosen instance from a tagged group. Which
      selectionMode fits?
    a: COUNT(1). FIS randomly selects one matching resource when targets are resolved at experiment
      start.
    facts:
      - template-count
      - template-resolve
  - id: fis-008
    q: An FIS experiment must finish one fault before beginning another. Which action field enforces the
      dependency?
    a: Set startAfter on the later action to name the earlier action. Actions without dependencies can
      start at the beginning together.
    facts:
      - template-sequence
  - id: fis-009
    q: A team wants to inspect FIS target selection without injecting faults. Which starting option
      should it use, and what does it not prove?
    a: Use actionsMode skip-all. The preview does not prove permission to execute fault actions, and a
      later run can resolve different targets.
    trap: true
    facts:
      - template-preview
      - template-preview-limit
  - id: fis-010
    q: An FIS tagged target resolves no resources. What is the default outcome, and which option can
      allow it to be skipped?
    a: The default emptyTargetResolutionMode is fail. Set skip to allow an unresolved non-identifier
      target to be skipped; a missing explicit resource identifier still fails.
    facts:
      - template-empty
diagrams:
  - id: fis-action-dependencies
    title: Use startAfter to order FIS actions
    width: 800
    height: 300
    nodes:
      - id: first
        label: First action
        icon: fault-injection-service
        x: 40
        y: 90
        w: 160
        h: 72
        tone: mgmt
        info: This action starts without a dependency.
      - id: next
        label: Next action
        icon: fault-injection-service
        x: 320
        y: 90
        w: 160
        h: 72
        tone: mgmt
        info: Its startAfter names the first action, so it waits for completion.
      - id: last
        label: Final action
        icon: fault-injection-service
        x: 600
        y: 90
        w: 160
        h: 72
        tone: mgmt
        info: Its startAfter names the next action, so it waits for that action to finish.
    edges:
      - from: first
        to: next
        label: finish first
        step: 1
      - from: next
        to: last
        label: finish next
        step: 2
    steps:
      - The first action completes before the dependent action starts.
      - The next action completes before the final dependent action starts.
---

AWS Fault Injection Service runs controlled fault experiments to test how a workload responds to disruption. A template is the experiment blueprint: it specifies the fault actions, affected resources, stop conditions, and permissions.

### How it works

1. Plan the behavior to test and try it in pre-production first. FIS performs real actions on real resources.
2. Define targets, the resources eligible for a fault. Use resource identifiers or criteria such as tags and filters. With multiple tags, resources must match all of them.
3. Limit the blast radius, meaning the resources affected, with a selection mode. FIS selects targets before actions start and keeps that set for the experiment.
4. Choose actions and parameters. Use `startAfter` when another action must finish first. Actions without dependencies start at the beginning.
5. Supply an experiment role that trusts `fis.amazonaws.com` and permits the required actions. An Amazon Resource Name, or ARN, identifies a specific resource. Restrict its resource permissions and use `aws:SourceAccount` and `aws:SourceArn` trust conditions.
6. Preview target selection with `actionsMode: skip-all`, then run the planned experiment with stop conditions. These are CloudWatch alarms that stop the experiment when workload performance crosses an unacceptable threshold. A preview resolves targets but does not prove fault-action permissions.

| Selection mode | Effect |
|---|---|
| `ALL` | Every matching resource |
| `COUNT(n)` | A random selection of the specified number |
| `PERCENT(n)` | A random selection of the specified percentage, rounded down to whole resources |

### Exam cues

- If the question says inject one failure into a tagged fleet, think `COUNT(1)`, because it selects one matching resource at random.
- If the question says one disruption must finish before the next starts, think `startAfter`, because declaration order does not express an execution dependency.
- If the question says inspect targets without faults, think `skip-all`, because it previews resolution while skipping actions.
- If the question says simulate an Availability Zone power interruption, think the AZ Availability: Power Interruption scenario, because it combines compute, scaling, networking, and database disruption symptoms.

### Remember

- `actionsMode` defaults to `run-all`.
- `emptyTargetResolutionMode` defaults to `fail`. `skip` does not excuse a missing explicit identifier.
- Target selection happens before any fault action starts.
- A preview can resolve a different set from a later run and does not verify fault-action permissions.

> **Trap:** A successful target preview does not prove the experiment role can execute the faults. It tests selection while skipping those actions.
