---
title: Invocation and retries
level: associate
order: 10
facts:
  - id: sync-call
    text: A synchronous invocation waits for the function result.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-sync.html#invocation-sync
  - id: sync-errors
    text: Lambda does not automatically retry function-code errors for direct synchronous invocations; the caller decides whether to retry.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-retries.html#invocation-retries
  - id: async-queue
    text: Lambda manages an internal event queue for asynchronous invocations.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html#invocation-async-error-handling
  - id: async-function-retries
    text: By default, Lambda retries an asynchronous function error twice, waiting one minute before the second attempt and two minutes before the third.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html#invocation-async-error-handling
  - id: async-config
    text: MaximumRetryAttempts controls asynchronous function-error retries and accepts 0 through 2.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-configuring.html#invocation-async-configuring
  - id: async-system-retries
    text: Lambda retries asynchronous throttles and system errors for up to six hours by default, with exponential backoff from one second to five minutes.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html#invocation-async-error-handling
  - id: async-age
    text: MaximumEventAgeInSeconds limits time in the asynchronous queue to at most six hours.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-configuring.html#invocation-async-configuring
  - id: async-duplicates
    text: Asynchronous invocation can deliver duplicate events even when the function succeeds.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html#invocation-async-error-handling
  - id: mapping-retries
    text: For SQS event source mappings, source-queue visibility timeout and redrive policy control retries and failed-message handling.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-retries.html#invocation-retries
  - id: timeout-default
    text: The Lambda function timeout defaults to three seconds.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html#configuration-timeout
  - id: timeout-standard
    text: The normal Lambda function timeout can be set from 1 to 900 seconds, in one-second increments.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html#configuration-timeout
  - id: timeout-managed
    text: Lambda Managed Instances allow up to 5,400 seconds for asynchronous invocations and event source mappings other than Amazon MQ and Amazon DocumentDB.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html#configuration-timeout
  - id: durable-execution
    text: Lambda durable executions can run for up to one year, using checkpoints and replay to recover progress.
    source: https://docs.aws.amazon.com/lambda/latest/dg/durable-functions.html#durable-functions
  - id: durable-replay
    text: On replay, completed checkpointed operations use stored results instead of running again; waits suspend execution without compute charges.
    source: https://docs.aws.amazon.com/lambda/latest/dg/durable-functions.html#durable-functions-how-it-works
  - id: durable-quota-change
    text: In November 2026 the default running durable executions quota increased from one million to five million per account, except in N. Virginia, Oregon, and Ireland, where the new quota is twice as high.
    source: https://aws.amazon.com/about-aws/whats-new/2026/11/lambda-durable-functions-default-quotas/
  - id: memory-cpu
    text: Lambda assigns CPU capacity in proportion to configured memory.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html#configuration-memory
  - id: memory-range
    text: Lambda memory ranges from 128 to 10,240 MB in 1-MB increments, with 128 MB as the default.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html#configuration-memory
  - id: memory-vcpu
    text: At 1,769 MB, a Lambda function receives CPU capacity equivalent to one vCPU.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html#configuration-memory
  - id: tmp-storage
    text: Each execution environment has its own temporary /tmp storage, configurable from 512 to 10,240 MB in 1-MB increments.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-ephemeral-storage.html#configuration-ephemeral-storage
  - id: tmp-encryption
    text: Lambda encrypts /tmp data at rest using an AWS managed key.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-ephemeral-storage.html#configuration-ephemeral-storage
  - id: alb-json
    text: An Application Load Balancer invokes a Lambda target directly with a JSON representation of the HTTP request.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#receive-event-from-load-balancer
  - id: alb-response
    text: An ALB Lambda response uses JSON fields including statusCode, isBase64Encoded, headers, and body.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#respond-to-load-balancer
  - id: alb-multivalue
    text: Enabling lambda.multi_value_headers.enabled on the ALB target group preserves repeated headers and query parameters as arrays; responses must then use multiValueHeaders.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#multi-value-headers
  - id: extensions
    text: An external Lambda extension is a separate process in the execution environment; an internal extension runs within the runtime process.
    source: https://docs.aws.amazon.com/lambda/latest/dg/lambda-extensions.html#lambda-extensions
  - id: init-order
    text: Lambda initialization runs extension initialization, runtime initialization, and function initialization before invoking the handler.
    source: https://docs.aws.amazon.com/lambda/latest/dg/lambda-extensions.html#using-extensions-env
diagrams:
  - id: lambda-async-invocation-flow
    title: Asynchronous invocation separates acceptance from execution
    width: 900
    height: 320
    nodes:
      - id: caller
        label: Caller
        icon: res-client
        x: 30
        y: 100
        w: 170
        h: 72
        tone: user
      - id: queue
        label: Lambda queue
        icon: lambda
        x: 300
        y: 100
        w: 170
        h: 72
        tone: compute
      - id: handler
        label: Handler
        icon: res-lambda-lambda-function
        x: 590
        y: 100
        w: 170
        h: 72
        tone: compute
    edges:
      - from: caller
        to: queue
        step: 1
      - from: queue
        to: handler
        step: 2
    steps:
      - The caller submits an event to the Lambda-managed asynchronous queue.
      - Lambda invokes the handler and applies asynchronous retry rules.
  - id: lambda-alb-request-flow
    title: ALB converts HTTP requests into Lambda events
    width: 900
    height: 320
    nodes:
      - id: client
        label: HTTP client
        icon: res-client
        x: 30
        y: 100
        w: 170
        h: 72
        tone: user
      - id: alb
        label: ALB
        icon: elastic-load-balancing
        x: 300
        y: 100
        w: 170
        h: 72
        tone: network
      - id: function
        label: Lambda target
        icon: lambda
        x: 590
        y: 100
        w: 170
        h: 72
        tone: compute
    edges:
      - from: client
        to: alb
        step: 1
      - from: alb
        to: function
        step: 2
    steps:
      - The client sends an HTTP request to the Application Load Balancer.
      - ALB invokes the Lambda target with a JSON request; the function returns a JSON response.
cards:
  - id: lambda-004
    q: What are the default timeout and normal maximum timeout for a Lambda function?
    a: Three seconds by default; normally up to 900 seconds (15 minutes). Lambda Managed Instances have a longer allowance for qualifying asynchronous and event source mapping invocations.
    facts:
      - timeout-default
      - timeout-standard
      - timeout-managed
  - id: lambda-005
    q: Who retries synchronous Lambda function errors, and what happens after an asynchronous function error?
    a: The synchronous caller decides whether to retry. For asynchronous invocation, Lambda retries function errors twice by default, after waits of one minute and then two minutes. MaximumRetryAttempts can be 0 through 2.
    facts:
      - sync-errors
      - async-function-retries
      - async-config
  - id: lambda-019
    q: A Lambda function has MaximumRetryAttempts set to 0, but asynchronous events still wait during throttling. Why?
    a: The setting controls function-error retries. Throttles and system errors use a separate retry path, bounded by event age, with a six-hour default.
    trap: true
    facts:
      - async-config
      - async-system-retries
      - async-age
  - id: lambda-020
    q: A CPU-bound Lambda function has enough memory but runs too slowly. Which resource setting should the team test increasing?
    a: Memory. Lambda increases CPU capacity in proportion to memory; 1,769 MB provides the equivalent of one vCPU.
    facts:
      - memory-cpu
      - memory-vcpu
  - id: lambda-021
    q: A Lambda function needs more local scratch space for a downloaded object. What storage can it configure?
    a: Increase ephemeral /tmp storage, from 512 to 10,240 MB. It belongs to one execution environment and is encrypted at rest.
    facts:
      - tmp-storage
      - tmp-encryption
  - id: lambda-022
    q: An ALB invokes a Lambda function, but repeated query parameters are lost. What should the team enable?
    a: Enable lambda.multi_value_headers.enabled on the target group. The request uses arrays for repeated values, and the function must use multiValueHeaders in its response.
    facts:
      - alb-multivalue
  - id: lambda-023
    q: How do internal and external Lambda extensions differ?
    a: An internal extension runs inside the runtime process. An external extension runs as a separate process in the same execution environment.
    facts:
      - extensions
  - id: lambda-054
    q: A Lambda workflow must wait for human approval for days and recover progress after interruptions. Which Lambda feature fits?
    a: Use a durable function with checkpointed steps and waits. A durable execution can last up to one year; replay uses stored results for completed checkpoints.
    facts:
      - durable-execution
      - durable-replay
  - id: lambda-055
    q: How did the default account quota for running Lambda durable executions change in November 2026?
    a: It rose from one million to five million, except in N. Virginia, Oregon, and Ireland, where the new quota is twice as high.
    facts:
      - durable-quota-change
---
Lambda runs function code in response to invocations, meaning requests to execute the function. A synchronous caller waits for the result; an asynchronous caller hands work to Lambda's event queue. The invocation path determines who owns retries.

### How it works

1. For a direct synchronous request, Lambda runs the handler, the function that processes the event, and returns its result. The caller decides whether to retry a function error.
2. For asynchronous invocation, Lambda queues the event and later runs the function. Function errors get two retries by default, after waits of one minute and then two minutes. Throttles, meaning rejected requests because capacity is unavailable, and system errors use a separate backoff path that increases the delay between attempts.
3. Set `MaximumRetryAttempts` for function errors and `MaximumEventAgeInSeconds` for queue age. An event can arrive twice even after success, so processing must be idempotent: repeating the same event must not create extra effects.
4. An event source mapping, a Lambda resource that reads a queue or stream, follows its source-specific retry rules. For SQS, configure visibility timeout and the source queue's redrive policy, which moves repeatedly received messages to a failure queue.
5. Lambda initializes extensions, then the runtime that executes the language, then initialization code outside the handler. An internal extension runs inside the runtime; an external extension runs in a separate process in the same execution environment, the isolated space that holds function resources.
6. Set timeout, memory, and temporary storage for the work. More memory also provides more CPU capacity. Each environment has its own encrypted `/tmp` scratch directory.
7. For long-running workflows, a Lambda durable function uses checkpoints, saved progress for operations, and replay. Replay reuses completed checkpoint results; waits suspend execution without compute charges.

| Invocation path | Result delivery | Function-error retry owner |
|---|---|---|
| Direct synchronous | Caller waits for result | Caller |
| Asynchronous | Lambda queues the event | Lambda |
| SQS mapping | Lambda reads a queue batch | Mapping and queue settings |

An Application Load Balancer (ALB) invokes a Lambda target directly with a JSON request, rather than opening a network connection to the function. Return a JSON response with `statusCode`, `isBase64Encoded`, `headers`, and `body`. Enable `lambda.multi_value_headers.enabled` on the target group to preserve repeated headers and query parameters as arrays, and then return headers in `multiValueHeaders`.

### Exam cues

- If the question says a synchronous Lambda call failed, think caller retry logic, because Lambda does not automatically retry that function error.
- If the question says asynchronous events still wait with retries disabled, think throttling or system errors, because `MaximumRetryAttempts` only controls function errors.
- If the question says CPU-bound Lambda processing is slow, think increasing memory, because CPU capacity scales with memory.
- If the question says an ALB loses repeated query parameters, think multi-value headers, because that target-group setting preserves arrays of values.
- If the question says a Lambda workflow must wait for a human decision for days and resume after interruption, think a durable function, because it checkpoints progress and supports long waits.

### Remember

- Function-error retries: 2 by default, configurable from 0 to 2. Throttle/system-error retry duration: up to 6 hours by default, with backoff from 1 second to 5 minutes.
- Maximum asynchronous queue age: 6 hours.
- Timeout: 3 seconds by default, normally 1 through 900 seconds. Lambda Managed Instances permit up to 5,400 seconds for asynchronous and event source mapping invocations except Amazon MQ and Amazon DocumentDB.
- Memory: 128 MB by default, 128 through 10,240 MB in 1-MB steps. At 1,769 MB, CPU capacity equals one virtual CPU (vCPU).
- Temporary storage: 512 through 10,240 MB in 1-MB steps, per environment.
- Durable executions can last up to one year. In November 2026 the default running-execution quota rose from one million to five million per account, with twice that new quota in N. Virginia, Oregon, and Ireland.

> **Trap:** Disabling asynchronous function-error retries does not prevent duplicate events or turn off the separate throttling retry path.
