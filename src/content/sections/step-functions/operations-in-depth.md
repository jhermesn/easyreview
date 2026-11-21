---
title: Activities, variables, and terminal states
level: professional
order: 50
facts:
  - id: activity-worker
    text: An activity worker polls GetActivityTask with the activity ARN, receives input and a
      taskToken, then reports using SendTaskSuccess or SendTaskFailure.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-activities.html#activities-overview
  - id: workflow-variables
    text: Workflow variables store values for later steps without passing them through every
      intermediate state output.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/workflow-variables.html#workflow-variables
  - id: pass-state
    text: Pass forwards input without doing work and can transform or add data to output.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-pass.html#state-pass
  - id: succeed-state
    text: Succeed ends a workflow, branch, or iteration successfully.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-succeed.html#state-succeed
  - id: fail-state
    text: Fail stops execution with failure unless enclosing error handling catches it.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-fail.html#state-fail
cards:
  - id: step-functions-014
    q: An on-premises worker must pull Step Functions work when it has capacity. How does an activity
      supply and complete a task?
    a: Poll GetActivityTask using the activity ARN. Process the returned input and use its taskToken in
      SendTaskSuccess or SendTaskFailure.
    facts:
      - activity-worker
  - id: step-functions-016
    q: A Step Functions workflow must keep an API result for a later step without forwarding it through
      every intermediate step. What feature fits?
    a: Workflow variables. Store the result once and reference it in later steps.
    facts:
      - workflow-variables
  - id: step-functions-018
    q: Which Step Functions states transform data without external work and explicitly end a workflow?
    a: Pass forwards or transforms data. Succeed ends successfully; Fail ends with failure unless
      enclosing error handling catches it.
    facts:
      - pass-state
      - succeed-state
      - fail-state
---
Step Functions can coordinate work pulled by an activity worker, retain values for later states, and control how a workflow ends. These features separate task execution, data handling, and completion.

### How it works

1. An activity worker polls `GetActivityTask` with the activity ARN. It receives input and a task token, then uses the token with `SendTaskSuccess` or `SendTaskFailure` to report the result.
2. Store a result in a workflow variable for a later step without passing it through every intermediate state output.
3. Use Pass to forward input without doing work, or to transform or add output data. Succeed ends a workflow, branch, or iteration successfully. Fail stops execution with failure unless enclosing error handling catches it.

### Exam cues

- If the question says an on-premises worker pulls tasks when it has capacity, think activity, because the worker polls for input and reports the result with its task token.
- If the question says keep an API result for a later step, think workflow variables, because intermediate states need not pass the value through their outputs.
- If the question says transform data without external work, think Pass. If it says explicitly end successfully or signal failure, think Succeed or Fail, respectively.

### Remember

- `GetActivityTask` uses the activity ARN; the response includes input and a task token.
- `SendTaskSuccess` and `SendTaskFailure` use the task token to report the result.
- Fail stops execution with failure unless enclosing error handling catches it.

> **Trap:** Pass handles data without doing work; it does not report an activity result. The worker reports success or failure using the task token.
