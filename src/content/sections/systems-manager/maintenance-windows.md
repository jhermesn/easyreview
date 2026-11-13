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
  - id: window-types
    text: Maintenance windows support Run Command, Automation, Lambda and Step Functions Standard tasks;
      Express workflows are unsupported.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/maintenance-windows.html#maintenance-windows
  - id: window-priority
    text: Tasks run in priority order; tasks with the same priority run in parallel.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-vs-maintenance-windows.html#state-manager-vs-maintenance-windows
  - id: window-final
    text: A later-priority task starts after earlier-priority tasks reach a final state, regardless of
      whether those tasks succeeded.
    source: https://docs.aws.amazon.com/systems-manager/latest/userguide/state-manager-vs-maintenance-windows.html#state-manager-vs-maintenance-windows
  - id: window-continue
    text: CutoffBehavior defaults to CONTINUE_TASK, allowing running tasks to continue after cutoff.
    source: https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_RegisterTaskWithMaintenanceWindow.html#systemsmanager-RegisterTaskWithMaintenanceWindow-request-CutoffBehavior
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
  - id: systems-manager-059
    q: A Systems Manager maintenance-window task fails. Does task priority automatically skip all later
      tasks?
    a: No. Later-priority tasks can start after earlier tasks reach a final state, regardless of
      success. Priority orders tasks; it is not a success dependency.
    trap: true
    facts:
      - window-priority
      - window-final
  - id: systems-manager-060
    q: A Systems Manager maintenance window reaches its cutoff while tasks are running. What happens by
      default?
    a: CONTINUE_TASK allows running tasks to continue. Cutoff stops scheduling new tasks; it is not an
      automatic termination deadline.
    trap: true
    facts:
      - window-cutoff
      - window-continue
  - id: systems-manager-061
    q: Which Step Functions workflow type can run as a Systems Manager maintenance-window task?
    a: Standard workflows. Express workflows are unsupported.
    facts:
      - window-types
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
