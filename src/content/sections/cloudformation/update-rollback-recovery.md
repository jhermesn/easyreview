---
title: Update rollback recovery
level: professional
order: 80
facts:
  - id: rollback-state
    text: UPDATE_ROLLBACK_FAILED means CloudFormation could not finish rolling back an update and cannot
      accept another stack update.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-continueupdaterollback.html#using-cfn-updating-stacks-continueupdaterollback
  - id: continue
    text: Fix the rollback failure and use Continue update rollback to reach UPDATE_ROLLBACK_COMPLETE
      before retrying updates.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-continueupdaterollback.html#using-cfn-updating-stacks-continueupdaterollback
  - id: causes
    text: Resources changed or deleted outside CloudFormation, insufficient permissions, limits, and
      missing signals can prevent update rollback.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting-errors-update-rollback-failed
  - id: skip-eligibility
    text: ResourcesToSkip should contain the minimum necessary resources that failed during rollback,
      not during the forward update.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-continueupdaterollback.html#using-cfn-updating-stacks-continueupdaterollback
  - id: skip-status
    text: Skipped rollback resources are marked UPDATE_COMPLETE but can differ from the template and
      must be reconciled before another update.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-continueupdaterollback.html#using-cfn-updating-stacks-continueupdaterollback
  - id: force
    text: The continue-update-rollback force-rollback option skips rollback-failing resources across the
      stack hierarchy.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-continueupdaterollback.html#continue-update-rollback-force-rollback
  - id: exclusive
    text: force-rollback and resources-to-skip cannot be used in the same request.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-continueupdaterollback.html#continue-update-rollback-force-rollback
  - id: nested-skip
    text: A skipped resource inside a nested stack uses NestedStackName.ResourceLogicalID in
      ResourcesToSkip.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-continueupdaterollback.html#using-cfn-updating-stacks-continueupdaterollback
  - id: completion-event
    text: CloudFormation Stack Status Change events use source aws.cloudformation and report the stack
      status in detail.status-details.status.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/event-detail-stack-status-change.html#event-detail-stack-status-change
  - id: success-status
    text: UPDATE_COMPLETE is the stack status for a successful update.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/event-detail-stack-status-change.html
cards:
  - id: cloudformation-039
    q: A CloudFormation update rollback fails and the stack is UPDATE_ROLLBACK_FAILED. How should the
      team recover?
    a: Read the failure reason, fix its cause, and continue update rollback. The stack must reach
      UPDATE_ROLLBACK_COMPLETE before another update can proceed.
    facts:
      - rollback-state
      - continue
      - causes
  - id: cloudformation-040
    q: When should a team skip resources during CloudFormation update rollback, and what must happen
      afterward?
    a: Skip the minimum rollback-failing resources only when their cause cannot be fixed. Skipped
      resources become UPDATE_COMPLETE but must be reconciled with the template before another
      update. force-rollback skips rollback failures across nested stacks and cannot be combined
      with resources-to-skip.
    trap: true
    facts:
      - skip-eligibility
      - skip-status
      - force
      - exclusive
  - id: cloudformation-084
    q: A CloudFormation rollback fails inside a nested stack and the team must skip one resource. Which
      identifier format is required?
    a: NestedStackName.ResourceLogicalID. Select a resource that failed during rollback, not one that
      only failed during the forward update.
    facts:
      - nested-skip
      - skip-eligibility
  - id: cloudformation-085
    q: Automation must run only after a successful CloudFormation stack update. Which EventBridge event
      fields should it match?
    a: Match source aws.cloudformation, detail-type CloudFormation Stack Status Change, and
      detail.status-details.status equal to UPDATE_COMPLETE.
    facts:
      - completion-event
      - success-status
  - id: cloudformation-086
    q: A CloudFormation rollback skip marks a resource UPDATE_COMPLETE. Does that prove it matches the
      template?
    a: No. The status allows rollback to continue. Reconcile the skipped resource and template before
      the next update.
    trap: true
    facts:
      - skip-status
---
Update rollback tries to return a CloudFormation stack to its previous working state. If that recovery fails, the stack enters `UPDATE_ROLLBACK_FAILED` and needs repair before another update.

### How it works

1. Inspect the rollback failure reason. External deletion, permissions, limits, or missing signals can stop recovery.
2. Fix the cause and choose `Continue update rollback` to reach `UPDATE_ROLLBACK_COMPLETE`.
3. If the cause cannot be fixed, skip the minimum required rollback-failing resources. For a nested resource, use `NestedStackName.ResourceLogicalID`. Alternatively, `force-rollback` skips rollback failures across the hierarchy.
4. Reconcile skipped resources with the template before attempting another update. Their `UPDATE_COMPLETE` status does not prove their configuration matches.

### Exam cues

- If the question says an update rollback is stuck, think fix the cause and continue update rollback, because `UPDATE_ROLLBACK_FAILED` blocks further updates.
- If the question says only one nested resource cannot roll back, think a targeted `ResourcesToSkip` entry, because the list can identify that child resource.
- If the question says run automation after a successful update, think an EventBridge rule on the stack status event, because its status field identifies completion.

### Remember

- Skip resources that failed during rollback, not merely during the forward update.
- `force-rollback` and `resources-to-skip` are mutually exclusive.
- Successful-update events use source `aws.cloudformation`, detail-type `CloudFormation Stack Status Change`, and `detail.status-details.status: UPDATE_COMPLETE`.

> **Trap:** Skipping a resource completes control-plane recovery but can leave its real configuration inconsistent with the template. Repair that inconsistency before another update.
