---
title: Creation and deletion failures
level: associate
order: 70
facts:
  - id: events
    text: Stack events and their status reasons identify resource provisioning failures.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting
  - id: create-rollback
    text: ROLLBACK_COMPLETE after failed stack creation permits only stack deletion, so another attempt
      requires deleting and recreating the stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting
  - id: preserve
    text: Preserve successfully provisioned resources leaves successful creations in place and failed
      creations in CREATE_FAILED for troubleshooting and retry or update.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stack-failure-options.html#stack-failure-options
  - id: init-log
    text: cfn-init troubleshooting output on Linux is available in /var/log/cfn-init.log.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/cfn-init.html#cfn-init-options
  - id: command-log
    text: The Linux /var/log/cfn-init-cmd.log file helps diagnose commands run during CloudFormation
      bootstrap.
    source: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent-New-Instances-CloudFormation.html#CloudWatch-Agent-CloudFormation-troubleshooting
  - id: userdata-log
    text: EC2 Linux user-data script output is available in /var/log/cloud-init-output.log.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-shell-scripts
  - id: delete-failures
    text: A non-empty S3 bucket, a security group still in use, or missing underlying delete permissions
      can prevent stack resource deletion.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting-errors-delete-stack-fails
  - id: delete-retry
    text: For DELETE_FAILED, retry deletion after fixing the resource or use RetainResources to leave
      specified failed resources behind.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html#troubleshooting-errors-delete-stack-fails
  - id: force-delete
    text: FORCE_DELETE_STACK permits deleting a DELETE_FAILED stack while retaining resources that
      cannot be deleted and their dependencies.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-delete-stack.html#cfn-console-delete-stack
  - id: termination
    text: Termination protection blocks stack deletion and is disabled by default; a blocked delete
      leaves the stack status unchanged.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-protect-stacks.html#using-cfn-protect-stacks
  - id: nested-protection
    text: Termination protection is controlled on the root stack and passed to its nested stacks, but
      does not prevent an update from removing a nested stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-protect-stacks.html#using-cfn-protect-stacks
  - id: events-by-operation
    text: Every stack operation gets an operation ID; stack events are grouped by it, and describe-events can filter one operation to failed events only (FailedEvents=true) to find the failing resource.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/view-stack-events-by-operation.html
cards:
  - id: cloudformation-041
    q: A CloudFormation stack reaches ROLLBACK_COMPLETE after its first creation failed. How can the
      team deploy again?
    a: Delete the stack and create it again. For a diagnostic attempt, preserve successfully provisioned
      resources so failures remain available for investigation and retry or update.
    facts:
      - create-rollback
      - preserve
  - id: cloudformation-043
    q: A CloudFormation EC2 bootstrap fails. Which records should the team inspect?
    a: Read the stack events and status reason, then /var/log/cfn-init.log for helper output,
      /var/log/cfn-init-cmd.log for commands, and /var/log/cloud-init-output.log for user-data
      output.
    facts:
      - events
      - init-log
      - command-log
      - userdata-log
  - id: cloudformation-048
    q: A CloudFormation stack is DELETE_FAILED because a resource cannot be removed. What recovery
      options exist?
    a: Fix the dependency, contents, or delete permission and retry; retain the failed resource with
      RetainResources; or force-delete the stack, leaving undeletable resources and their
      dependencies behind.
    facts:
      - delete-failures
      - delete-retry
      - force-delete
  - id: cloudformation-049
    q: Does CloudFormation termination protection block an update that removes a nested stack?
    a: No. It blocks stack deletion requests. Protection is disabled by default and is controlled
      through the root stack for nested stacks. A blocked deletion leaves the status unchanged.
    trap: true
    facts:
      - termination
      - nested-protection
  - id: cloudformation-055
    q: A populated S3 bucket causes CloudFormation stack deletion to fail. How can the team complete
      deletion?
    a: Empty the bucket and retry, or retain that failed resource while deleting the stack.
      CloudFormation cannot delete a non-empty bucket.
    facts:
      - delete-failures
      - delete-retry
  - id: cloudformation-082
    q: A team needs to inspect an EC2 instance after CloudFormation creation fails and then resume
      provisioning. Which failure option should it select?
    a: Preserve successfully provisioned resources. It leaves successful creations available and lets
      the team troubleshoot, then retry or update.
    facts:
      - preserve
  - id: cloudformation-083
    q: A protected CloudFormation stack receives a DeleteStack request. Does it become DELETE_FAILED?
    a: No. Termination protection rejects deletion and leaves the stack and its status unchanged.
    trap: true
    facts:
      - termination
  - id: cloudformation-150
    q: A CloudFormation update with nested stacks failed. How does an engineer list only the failed events of that update?
    a: Use describe-events with the update's operation ID and the FailedEvents=true filter.
    facts: [events-by-operation]
---
CloudFormation events explain which resource operation failed and why. Recovery depends on whether creation failed, rollback finished, or deletion left resources behind.

### How it works

1. Read stack events and their status reasons to find the failed resource operation.
2. For EC2 bootstrap, inspect the relevant logs. Bootstrap means the software installation and configuration performed as an instance starts.
3. If failed creation ends in `ROLLBACK_COMPLETE`, delete and recreate the stack. For investigation and resumption, choose `Preserve successfully provisioned resources` before the operation, then troubleshoot and retry or update.
4. For `DELETE_FAILED`, fix the blocking resource and retry, retain selected failed resources, or force-delete the stack while leaving undeletable resources and their dependencies.

| Linux log | Diagnose |
|---|---|
| `/var/log/cfn-init.log` | cfn-init helper activity |
| `/var/log/cfn-init-cmd.log` | Commands run during bootstrap |
| `/var/log/cloud-init-output.log` | EC2 user-data script output |

### Exam cues

- If the question says a non-empty S3 bucket blocks stack deletion, think empty and retry or retain the bucket, because the bucket contents prevent deletion.
- If the question says a failed initial deployment must be inspected and resumed, think preserve successfully provisioned resources, because automatic rollback would remove the successful creations.
- If the question says `ROLLBACK_COMPLETE` after the first create, think delete and recreate, because that state allows only deletion.

### Remember

- Missing delete permission or an in-use security group can also prevent deletion.
- `FORCE_DELETE_STACK` is a recovery option for `DELETE_FAILED`; resources can remain afterward.
- Termination protection defaults to off, applies through the root stack to nested stacks, and rejects deletion without changing stack status.

> **Trap:** Termination protection does not prevent an update from removing a nested stack. A blocked deletion request does not itself put the stack in DELETE_FAILED.
