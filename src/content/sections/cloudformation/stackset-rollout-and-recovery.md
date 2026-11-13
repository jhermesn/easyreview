---
title: StackSet rollout and recovery
level: professional
order: 160
facts:
  - id: region-order
    text: StackSet Region concurrency defaults to Sequential; Parallel can operate across Regions
      simultaneously.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts
  - id: account-concurrency
    text: Maximum concurrent accounts limits simultaneous target-account operations within a Region.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts
  - id: failure-tolerance
    text: Failure tolerance counts allowed failures per Region; exceeding it stops the operation and
      prevents progression to remaining Regions.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts
  - id: strict
    text: Strict failure tolerance reduces actual account concurrency as failures occur and caps it at
      failure tolerance plus one.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: soft
    text: Soft failure tolerance keeps the specified account concurrency despite failures.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-associate-stackset-with-org.html#stacksets-orgs-associate-stackset-with-org
  - id: outdated
    text: OUTDATED means a stack is not current because a create or update failed, or its StackSet
      operation failed or stopped before reaching that stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts
  - id: inoperable
    text: INOPERABLE can follow a failed stack-instance deletion and excludes the instance from later
      StackSet updates.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts
  - id: inoperable-recovery
    text: An INOPERABLE instance can require deletion with RetainStacks true, followed by manual cleanup
      of the detached stack.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html#stacksets-concepts
  - id: operation-status
    text: A StackSet operation can report SUCCEEDED while some instances failed within its failure
      tolerance.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-troubleshooting.html#stacksets-troubleshooting
  - id: failure-results
    text: list-stack-set-operation-results gives per-account status reasons; list-stack-instances
      supports DETAILED_STATUS and LAST_OPERATION_ID filters.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-troubleshooting.html#stacksets-troubleshooting
  - id: target-quota
    text: A StackSet stack operation can fail when a target account has reached the quota for a resource the template creates.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-troubleshooting.html#common-reasons-for-stack-operation-failure
  - id: global-name-collision
    text: A StackSet stack operation can fail when the template tries to create a global resource such as an S3 bucket with a name that is not unique.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-troubleshooting.html#common-reasons-for-stack-operation-failure
  - id: failure-count
    text: FailedStackInstancesCount reports instance failures even when a StackSet operation reports
      SUCCEEDED.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-troubleshooting.html#stacksets-troubleshooting
  - id: retry
    text: After fixing a StackSet failure, retry a create or update operation with the current template
      and target the affected accounts and Regions.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-troubleshooting.html#retrying-failed-stack-creation-or-update-operations
  - id: retain-stacks
    text: Retain stacks removes stack instances from StackSet management while leaving the stacks and
      their resources running in target accounts.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stackinstances-delete.html#stackinstances-delete
  - id: empty-set
    text: Delete all stack instances before deleting the StackSet itself.
    source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-troubleshooting.html#stacksets-troubleshooting
cards:
  - id: cloudformation-007
    q: Which CloudFormation StackSet settings control deployment pace and tolerated failures?
    a: Region concurrency and order, maximum concurrent accounts, and failure tolerance per Region.
      Sequential Region deployment is the default; exceeding tolerance stops the operation.
    facts:
      - region-order
      - account-concurrency
      - failure-tolerance
  - id: cloudformation-010
    q: What do CloudFormation StackSet OUTDATED and INOPERABLE stack instances mean?
    a: OUTDATED means the instance is not current after a failed or stopped create/update operation.
      INOPERABLE can follow failed deletion and is excluded from later updates; detach it with
      RetainStacks if required and clean up manually.
    facts:
      - outdated
      - inoperable
      - inoperable-recovery
  - id: cloudformation-027
    q: Some CloudFormation StackSet instances remain OUTDATED after an update. How should the team
      investigate and retry?
    a: Read per-account StatusReason with list-stack-set-operation-results, or filter
      list-stack-instances by DETAILED_STATUS and LAST_OPERATION_ID. Fix the cause and retry with
      the current template. An overall SUCCEEDED can still contain tolerated failures.
    trap: true
    facts:
      - outdated
      - failure-results
      - retry
      - operation-status
  - id: cloudformation-106
    q: A CloudFormation StackSet operation reports SUCCEEDED but some accounts lack the update. What
      should the team inspect?
    a: FailedStackInstancesCount and per-instance status reasons. Failure tolerance can permit instance
      failures without failing the overall operation.
    trap: true
    facts:
      - operation-status
      - failure-count
      - failure-results
  - id: cloudformation-107
    q: A team must stop managing selected CloudFormation stacks through StackSets while keeping their
      resources. What option should it use?
    a: Delete the stack instances with Retain stacks enabled. The stacks stay in the target accounts and
      can be managed individually.
    facts:
      - retain-stacks
  - id: cloudformation-108
    q: How do strict and soft CloudFormation StackSet failure tolerance differ?
    a: Strict mode reduces actual account concurrency as failures occur, staying within failure
      tolerance plus one. Soft mode keeps the specified concurrency despite failures.
    facts:
      - strict
      - soft
  - id: cloudformation-137
    q: A CloudFormation StackSet fails to create IAM roles in one target account that has reached its role quota. What should the team investigate?
    a: The target account's IAM role quota. A resource quota already reached in the target account can prevent stack creation.
    facts:
      - target-quota
  - id: cloudformation-138
    q: A CloudFormation StackSet template creates an S3 bucket with a name already in use. Why can a target stack fail?
    a: The bucket name must be globally unique. A collision for a global resource can cause the stack operation to fail.
    facts:
      - global-name-collision
---
StackSet operation preferences control how widely a CloudFormation change runs at once and how many failures it tolerates. Recovery starts with each account and Region result, because an overall operation status can hide tolerated failures.

### How it works

1. Choose Region order and concurrency. `Sequential` is the default; `Parallel` operates across Regions simultaneously.
2. Limit concurrent accounts and set failure tolerance per Region. Strict mode reduces actual concurrency as failures occur, staying within tolerance plus one; soft mode keeps the requested account concurrency.
3. Inspect operation results and per-instance status reasons. `FailedStackInstancesCount` can reveal failures even when the operation is `SUCCEEDED`.
4. Fix the reported cause and retry the affected targets with the current template. When detaching stacks is intended, use `Retain stacks` to leave them running outside StackSet management.

Check whether the target account has reached a resource quota or whether a global resource name, such as an S3 bucket name, is already in use.

| Instance status | Meaning | Recovery |
|---|---|---|
| `OUTDATED` | Not current after a failed operation or one stopped before reaching it | Inspect the reason, fix, and retry |
| `INOPERABLE` | Failed deletion left an unstable instance | May require detach with retention and manual cleanup |
| Retained stack | Removed from StackSet management | Manage the remaining stack in its target account |

### Exam cues

- If the question says some accounts failed but the operation succeeded, think tolerated failures, because failure tolerance can allow `SUCCEEDED` with failed instances.
- If the question says preserve resources while removing StackSet membership, think `Retain stacks`, because it detaches the stacks instead of deleting them.
- If the question says concurrency must fall after failures, think strict failure tolerance, because it adjusts the account concurrency level.
- If the question says a target account cannot create more roles or a bucket name is already taken, think quota or global name collision, because either can fail a stack operation.

### Remember

- Failure tolerance and account concurrency apply per Region.
- Exceeding tolerance stops the operation and prevents progression to remaining Regions.
- Use `list-stack-set-operation-results` for per-account results, or `list-stack-instances` filters `DETAILED_STATUS` and `LAST_OPERATION_ID`.
- Remove all instances before deleting the StackSet.

> **Trap:** OUTDATED describes StackSet deployment currency. It does not mean the resources were changed outside CloudFormation.
