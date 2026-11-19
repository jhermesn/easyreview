---
title: Maintenance windows
level: associate
order: 90
facts:
  - id: window-purpose
    text: Maintenance Windows schedules potentially disruptive maintenance on selected resources.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/maintenance-windows.html#maintenance-windows
  - id: window-parts
    text: A maintenance window defines a schedule, duration, targets and registered tasks.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/maintenance-windows.html#maintenance-windows
  - id: window-cutoff
    text: Cutoff specifies how many hours before the window ends Systems Manager stops scheduling new
      tasks.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_CreateMaintenanceWindow.html#systemsmanager-CreateMaintenanceWindow-request-Cutoff
  - id: window-cancel
    text: At cutoff, CANCEL_TASK stops new invocations for Automation, Lambda and Step Functions; for
      Run Command it attempts cancellation without guaranteeing the underlying process stops.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_RegisterTaskWithMaintenanceWindow.html#systemsmanager-RegisterTaskWithMaintenanceWindow-request-CutoffBehavior
  - id: window-patch
    text: AWS-RunPatchBaseline can run as a maintenance-window task to patch managed nodes.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-aws-runpatchbaseline.html#patch-manager-aws-runpatchbaseline
  - id: window-scope
    text: A maintenance window targets nodes in one account-Region pair; Quick Setup patch policies
      support multiple account-Region pairs.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-policies.html#patch-manager-policies
  - id: window-baseline
    text: A patch baseline defines the approval rules used to select patches for an operation.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager-predefined-and-custom-patch-baselines.html#patch-manager-predefined-and-custom-patch-baselines
  - id: patch-lb-runbook
    text: "The AWS-owned Automation runbook AWSEC2-PatchLoadBalancerInstance removes an instance from its Classic Load Balancer, ALB or NLB target group, waits for connection draining, installs OS updates, and registers the instance again."
    source: https://docs.aws.amazon.com/systems-manager-automation-runbooks/latest/userguide/automation-awsec2-patch-load-balancer-instance.html#automation-awsec2-patch-load-balancer-instance
cards:
  - id: systems-manager-024
    q: A team needs Systems Manager patch installation only during an approved maintenance period. Which
      feature controls execution time?
    a: A maintenance window with a schedule, duration, cutoff, targets and a task such as
      AWS-RunPatchBaseline. The baseline controls approved patches.
    facts:
      - window-purpose
      - window-parts
      - window-cutoff
      - window-patch
  - id: systems-manager-034
    q: A team must patch EC2 and registered on-premises nodes outside business hours. How can Systems
      Manager select patches and execution time?
    a: Use Patch Manager baselines to select approved patches, then schedule AWS-RunPatchBaseline in a
      maintenance window.
    facts:
      - window-patch
      - window-purpose
  - id: systems-manager-112
    q: "Instances behind an ALB must be patched without receiving traffic while they patch, within a defined window. What fits with the least custom work?"
    a: "Run the AWSEC2-PatchLoadBalancerInstance Automation runbook from a Systems Manager maintenance window. It deregisters each instance, waits for draining, patches it and registers it again."
    facts: [patch-lb-runbook]
---
A maintenance window defines when Systems Manager should schedule maintenance that could disrupt a workload. It separates the allowed execution period from the document that performs the work.

### How it works

1. Set the schedule, duration and cutoff. Cutoff is the number of hours before the end when new tasks stop being scheduled.
2. Register targets and tasks. A patching task can run `AWS-RunPatchBaseline` against managed nodes.
3. Assign task priorities. Tasks sharing a priority run in parallel; the next priority waits for earlier tasks to reach a final state.
4. Choose cutoff behavior. `CONTINUE_TASK` is the default. `CANCEL_TASK` has different behavior for Run Command and the other task types.

| Task type | Executes |
|---|---|
| Run Command | A command document on managed nodes |
| Automation | An Automation runbook |
| Lambda | A function |
| Step Functions | A Standard workflow, not Express |

### Exam cues

- If the question says patch only in an approved maintenance period, think a maintenance window, because its schedule controls task start times.
- If the question says run tasks in an ordered sequence, think task priorities, because later priorities wait for earlier tasks to finish.
- If the question says one patch configuration must span accounts and Regions, think a Quick Setup patch policy, because a maintenance window has one account-Region scope.

### Remember

- Cutoff stops new task scheduling; running tasks continue by default.
- Same priority means parallel execution.
- A final state includes failure, so priority alone does not make success conditional.
- For Run Command, `CANCEL_TASK` attempts cancellation but cannot guarantee the underlying process stops.

> **Trap:** A window end time is not a guarantee that every process has stopped. Account for duration and cutoff behavior.
