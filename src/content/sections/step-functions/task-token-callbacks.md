---
title: Task token callbacks
level: professional
order: 40
facts:
  - id: callback-pause
    text: A supported .waitForTaskToken task in a Standard workflow waits for an external process such
      as an approval or legacy worker.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token
  - id: context-token
    text: JSONPath task parameters can read the task token from $$.Task.Token in the execution Context
      object.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token
  - id: queue-token
    text: The SQS sendMessage.waitForTaskToken integration can send a token in the message body for an
      external consumer.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token
  - id: token-completion
    text: SendTaskSuccess or SendTaskFailure with the token completes the waiting task with success or
      failure.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token
  - id: token-account
    text: A task-token callback must use a principal in the same AWS account as the state machine.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token
  - id: token-heartbeat
    text: HeartbeatSeconds limits the gap between heartbeats; SendTaskHeartbeat keeps the task active
      without completing it.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-task.html#task-state-fields
  - id: token-timeout
    text: TimeoutSeconds limits total task runtime; callback tasks have no default task timeout and can
      wait until the one-year Standard execution limit.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/state-task.html#task-state-fields
  - id: token-expiry
    text: When a callback task times out and is retried, its replacement token is newly generated.
    source: https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html#connect-wait-token
diagrams:
  - id: sfn-wait-for-token
    title: Step Functions callback with a task token
    width: 1092
    height: 350
    nodes:
      - id: sfn
        label: Step Functions
        sub: Standard callback
        icon: step-functions
        h: 86
        x: 28
        y: 178
        w: 190
        tone: integration
        info: A supported .waitForTaskToken task pauses for a callback. JSONPath reads the token from
          $$.Task.Token. Configure a heartbeat and overall task timeout.
      - id: sqs
        label: SQS queue
        sub: message carries token
        icon: res-simple-queue-service-queue
        h: 86
        x: 420
        y: 38
        w: 170
        tone: integration
        info: The SQS message body carries the task token for an external consumer.
      - id: worker
        label: External worker
        sub: human or legacy system
        icon: res-client
        h: 86
        x: 784
        y: 178
        w: 190
        tone: user
        info: The worker returns the token using a principal in the same AWS account as the state machine.
    edges:
      - from: sfn
        to: sqs
        step: 1
        label: send token
      - from: sqs
        to: worker
        step: 2
        label: poll
      - from: worker
        to: sfn
        step: 3
        label: SendTaskSuccess
        dashed: true
    steps:
      - The task state calls SQS `sendMessage.waitForTaskToken` and passes the token in the message
        body, then pauses.
      - An external consumer reads the message and starts its work.
      - The consumer calls SendTaskSuccess or SendTaskFailure with the token. SendTaskHeartbeat
        keeps the heartbeat interval active but does not complete the task.
cards:
  - id: step-functions-006
    q: A Step Functions workflow must wait for a human approval before continuing. What should the team
      use?
    a: A supported .waitForTaskToken task in a Standard workflow. Pass the task token, then report
      approval or rejection with SendTaskSuccess or SendTaskFailure. Set heartbeat and overall task
      timeouts.
    facts:
      - callback-pause
      - context-token
      - token-completion
      - token-heartbeat
      - token-timeout
  - id: step-functions-019
    q: An external worker tries to complete a Step Functions callback task using credentials from
      another AWS account. Why does its token not work?
    a: Task-token calls require a principal in the state machine account. Arrange for the callback
      caller to use a permitted principal in that account.
    facts:
      - token-account
  - id: step-functions-020
    q: A Step Functions approval worker sends heartbeats, but its task never advances. Which call
      completes it?
    a: SendTaskSuccess or SendTaskFailure with the token. SendTaskHeartbeat only keeps the heartbeat
      interval active and does not complete the task.
    trap: true
    facts:
      - token-completion
      - token-heartbeat
  - id: step-functions-021
    q: Which Step Functions timeout bounds total callback task duration even when the worker keeps
      sending heartbeats?
    a: TimeoutSeconds. HeartbeatSeconds limits the gap between heartbeats; it does not replace the
      overall task timeout.
    facts:
      - token-timeout
      - token-heartbeat
---

A Step Functions callback task pauses a Standard workflow while an external process works. Its task token is a unique value linking the worker's response to the waiting task, so human approval or a legacy process can complete later.

### How it works

1. Select a supported `.waitForTaskToken` integration. For JSONPath, read `$$.Task.Token` from the Context object, the execution's internal information object.
2. Pass the token to the worker. With `sqs:sendMessage.waitForTaskToken`, put it in the message body; the external consumer reads that message.
3. Set `HeartbeatSeconds` to bound silence between heartbeats and `TimeoutSeconds` to bound total task runtime. `SendTaskHeartbeat` keeps the heartbeat interval active.
4. Call `SendTaskSuccess` or `SendTaskFailure` with the token using a principal, an AWS identity, in the state machine's account.
5. If the task times out and is retried, supply the new task token to the worker.

### Exam cues

- If the question says wait for a person to approve, think a Standard callback task, because completion arrives from an external process.
- If the question says an external worker polls a queue, think an SQS message carrying the task token, because the worker must associate its response with the waiting task.
- If the question says callbacks use a different account's credentials, think same-account principal, because task tokens do not work with a principal in another account.

### Remember

- JSONPath token path: `$$.Task.Token`.
- Completion: `SendTaskSuccess` or `SendTaskFailure`; heartbeats do not complete work.
- Callback tasks have no default task timeout. The enclosing Standard execution can last up to one year.

> **Trap:** Regular heartbeats do not extend `TimeoutSeconds`. Set both the heartbeat interval and the overall deadline.
