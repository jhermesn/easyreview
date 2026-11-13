---
title: Standard and Express workflows
level: associate
order: 10
facts:
  - id: workflow-types
    text: A state machine defines a workflow; Standard is the default type, and its type cannot be
      changed after creation.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#choosing-workflow-type
  - id: standard-duration
    text: Standard workflows can run for up to one year.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#choosing-workflow-type
  - id: standard-guarantee
    text: Standard executes tasks and states exactly once unless the workflow explicitly configures
      retries.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#choosing-workflow-type
  - id: standard-history
    text: Standard execution history is normally retained for 90 days after completion.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#choosing-workflow-type
  - id: standard-price
    text: Standard workflow billing counts state transitions.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#choosing-workflow-type
  - id: express-duration
    text: Express workflows can run for up to five minutes.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#choosing-workflow-type
  - id: express-guarantees
    text: Asynchronous Express provides at-least-once execution; synchronous Express provides
      at-most-once execution.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#express-at-least-once-execution
  - id: express-start
    text: StartExecution starts asynchronous Express and returns before completion; StartSyncExecution
      waits for synchronous Express results.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#choosing-workflow-type
  - id: express-price
    text: Express billing depends on execution count, duration, and memory consumption.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#choosing-workflow-type
  - id: standard-features
    text: Standard supports activities, Distributed Map, and supported job and callback integrations;
      Express does not support those features.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#choosing-workflow-type
  - id: idempotent-work
    text: An idempotent action tolerates repetition without changing the outcome; AWS recommends
      idempotent work for Express.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html#choosing-workflow-type
  - id: execution-debugging
    text: Execution details expose state inputs and outputs; Express execution history requires
      CloudWatch Logs logging to be enabled.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/concepts-view-execution-details.html#concepts-view-execution-details
cards:
  - id: step-functions-001
    q: How do Step Functions Standard and Express differ in duration, history, billing, and
      integrations?
    a: "Standard: up to one year, normally 90-day history, billed per state transition, with supported
      job and callback patterns. Express: up to five minutes, history through enabled CloudWatch
      Logs, billed by executions, duration, and memory; request-response only."
    facts:
      - standard-duration
      - standard-history
      - standard-price
      - express-duration
      - express-price
      - standard-features
      - execution-debugging
  - id: step-functions-002
    q: What execution guarantees do Step Functions Standard, asynchronous Express, and synchronous
      Express provide?
    a: "Standard: exactly once unless retries are configured. Asynchronous Express: at least once.
      Synchronous Express: at most once. Use idempotent work for Express."
    trap: true
    facts:
      - standard-guarantee
      - express-guarantees
      - idempotent-work
  - id: step-functions-009
    q: A Step Functions payment workflow can wait several hours and must avoid implicit duplicate task
      execution. Which workflow type fits?
    a: Standard. It supports long executions and does not repeat tasks unless retries are configured.
      Make payment retry handling deliberate.
    facts:
      - standard-duration
      - standard-guarantee
  - id: step-functions-010
    q: A short Step Functions transformation must return its result directly to an API caller. Which
      Express start API fits?
    a: StartSyncExecution. Synchronous Express waits for completion and returns results; the workflow
      must finish within five minutes.
    facts:
      - express-start
      - express-duration
  - id: step-functions-011
    q: A Step Functions Express workflow fails, but its execution history is unavailable. What should
      the team configure?
    a: Enable CloudWatch Logs for the Express state machine. Use execution details to inspect individual
      state inputs and outputs.
    facts:
      - execution-debugging
---

Step Functions runs a workflow, a sequence of steps with rules for moving between them. Its state machine is the workflow definition; an execution is one run. Choose Standard for long processes and Express for short event processing.

### How it works

1. Select a workflow type when creating the state machine. Standard is the default, and the type is fixed after creation.
2. Choose execution behavior using the table below. An idempotent action has the same outcome when repeated, so duplicate processing does not change its result.
3. Start asynchronous Express with `StartExecution` or synchronous Express with `StartSyncExecution` when the caller needs to wait for the result.
4. Inspect state inputs and outputs in execution details. Enable CloudWatch Logs to record Express execution history.

| Workflow | Execution guarantee | Maximum duration | Billing basis |
|---|---|---|---|
| Standard | Exactly once, unless retries are configured | One year | State transitions |
| Asynchronous Express | At least once | Five minutes | Executions, duration, memory |
| Synchronous Express | At most once | Five minutes | Executions, duration, memory |

### Exam cues

- If the question says a payment process waits for hours, think Standard, because it supports long runs without implicit task repetition.
- If the question says a short transformation must return results to its caller, think synchronous Express, because its start call waits for completion.
- If the question says Express failures need investigation, think enabled CloudWatch Logs, because Express does not retain execution history within Step Functions.

### Remember

- Standard: up to one year and normally 90 days of completed execution history.
- Express: up to five minutes; design its work to be idempotent.
- Activities, Distributed Map, job waiting, and task-token callbacks require Standard.

> **Trap:** Synchronous Express starting an execution is different from a Task using `.sync`. Express does not support the job-waiting integration pattern.

> **Trap:** Standard's execution guarantee does not prevent the retries you explicitly configure.
