---
title: "PLACEHOLDER step-functions/operations-in-depth"
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
PLACEHOLDER first paragraph.

### How it works

PLACEHOLDER

### Exam cues

PLACEHOLDER

### Remember

PLACEHOLDER

> **Trap:** PLACEHOLDER
