---
title: Hooks
level: professional
order: 220
facts:
  - id: hook
    text: A CloudFormation Hook evaluates configured targets before provisioning or during change set
      creation.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/hooks-concepts.html#hook-terms-hook
  - id: hook-targets
    text: Hook targets can be RESOURCE, STACK, CHANGE_SET, or CLOUD_CONTROL.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/hooks-concepts.html#hook-terms-hook-target
  - id: hook-actions
    text: RESOURCE, STACK, and CLOUD_CONTROL targets support CREATE, UPDATE, and DELETE actions;
      CHANGE_SET supports CREATE only.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/hooks-concepts.html#hook-terms-target-action
  - id: hook-fail
    text: FailureMode FAIL stops provisioning on a failed check; for a stack operation, the
      configuration can roll back the stack.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/hook-configuration-schema.html#hooks-failuremode
  - id: hook-warn
    text: FailureMode WARN permits provisioning to continue with a warning when the check fails.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/hooks-concepts.html#hook-terms-failure-mode
  - id: hook-trial
    text: AWS recommends activating Hooks in WARN to assess effects before switching to FAIL.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/hooks-concepts.html#hook-terms-failure-mode
  - id: hook-enable
    text: HookInvocationStatus ENABLED enables an activated Hook; DISABLED prevents invocation.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/hook-configuration-schema.html#hooks-hookinvocationstatus
  - id: hook-kinds
    text: CloudFormation offers Guard Hooks, Lambda Hooks, and proactive control-based Hooks.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/hook-configuration-schema.html#hook-configuration-examples
  - id: cloudcontrol
    text: Hooks can evaluate resource operations performed through the Cloud Control API as well as
      CloudFormation.
    source: https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/hooks-concepts.html#hook-terms-hook
cards:
  - id: cloudformation-022
    q: A team must reject noncompliant CloudFormation resource configurations before provisioning. What
      should it use?
    a: An enabled CloudFormation Hook targeting the relevant operations with FailureMode FAIL. WARN
      reports failure but allows provisioning to continue. Guard, Lambda, and proactive
      control-based Hooks are available.
    facts:
      - hook
      - hook-fail
      - hook-warn
      - hook-kinds
  - id: cloudformation-122
    q: A team wants to observe a new CloudFormation Hook policy before blocking deployments. Which
      failure mode should it start with?
    a: WARN. It lets provisioning continue while showing failures; switch to FAIL after assessing the
      impact.
    facts:
      - hook-warn
      - hook-trial
  - id: cloudformation-123
    q: Can a CloudFormation Hook evaluate a resource operation sent through the Cloud Control API?
    a: Yes, with the CLOUD_CONTROL target. Hooks also support RESOURCE, STACK, and CHANGE_SET targets.
    trap: true
    facts:
      - hook-targets
      - cloudcontrol
  - id: cloudformation-124
    q: Which action invokes a CloudFormation Hook configured for a CHANGE_SET target?
    a: CREATE. Unlike RESOURCE, STACK, and CLOUD_CONTROL targets, CHANGE_SET does not support UPDATE or
      DELETE target actions.
    facts:
      - hook-actions
---
A CloudFormation Hook checks a proposed configuration before an operation proceeds. It can enforce an organization's rules at the resource, stack, or change set boundary, and can also evaluate Cloud Control API operations.

### How it works

1. Choose a Guard, Lambda, or proactive control-based Hook and configure its checks.
2. Activate it and set `HookInvocationStatus` to `ENABLED`. Select the target operations and actions.
3. Select the failure mode. Start with `WARN` to observe failures, then switch to `FAIL` when blocking is intended.

| Target | What it evaluates | Actions |
|---|---|---|
| `RESOURCE` | CloudFormation resource operation | `CREATE`, `UPDATE`, `DELETE` |
| `STACK` | Stack template | `CREATE`, `UPDATE`, `DELETE` |
| `CHANGE_SET` | Change set | `CREATE` only |
| `CLOUD_CONTROL` | Cloud Control API resource operation | `CREATE`, `UPDATE`, `DELETE` |

### Exam cues

- If the question says reject a noncompliant resource before CloudFormation provisions it, think a Hook with `FAIL`, because failed evaluation stops provisioning.
- If the question says assess a new policy without blocking stacks, think `WARN`, because provisioning continues with a warning.

### Remember

- `HookInvocationStatus` is `ENABLED` or `DISABLED`.
- `WARN` permits progress; `FAIL` stops it and can trigger stack rollback.

> **Trap:** Hooks are not limited to CloudFormation stack calls. CLOUD_CONTROL targets cover Cloud Control API operations too; coverage depends on the configured target and action.
