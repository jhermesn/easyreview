---
title: Idempotent automation
level: professional
order: 80
facts:
  - id: idempotent
    text: An idempotent operation produces no extra side effects when repeated with the same input.
    source: https://docs.aws.amazon.com/powertools/python/latest/utilities/idempotency/
  - id: duplicate-events
    text: Lambda functions must handle duplicate events safely and validate events.
    source: https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#best-practices
  - id: stable-key
    text: An idempotency key identifies a business operation using stable input fields; changing timestamps or random fields can defeat deduplication.
    source: https://aws.amazon.com/blogs/compute/handling-lambda-functions-idempotency-with-aws-lambda-powertools/
  - id: persistent-result
    text: Idempotency can store a key and result in durable storage such as DynamoDB and return the existing result for a duplicate.
    source: https://aws.amazon.com/blogs/compute/handling-lambda-functions-idempotency-with-aws-lambda-powertools/
  - id: concurrent-lock
    text: An idempotency lock acquired before processing prevents concurrent invocations from both treating the same operation as new.
    source: https://aws.amazon.com/blogs/compute/handling-lambda-functions-idempotency-with-aws-lambda-powertools/
  - id: partial-side-effects
    text: If an operation succeeds before idempotency state is saved and the invocation then fails, a retry can repeat the side effect.
    source: https://aws.amazon.com/blogs/compute/handling-lambda-functions-idempotency-with-aws-lambda-powertools/
  - id: conditional-write
    text: DynamoDB conditional writes can make updates idempotent when the condition checks the attribute being updated.
    source: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html#WorkingWithItems.ConditionalUpdate
  - id: reuse-clients
    text: Initialize SDK clients and database connections outside the Lambda handler so reused execution environments can reuse them.
    source: https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#best-practices
  - id: reuse-cache
    text: Static assets cached in /tmp can be reused by subsequent invocations in the same environment.
    source: https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#best-practices
  - id: avoid-user-state
    text: AWS recommends not storing user data, events, or security-sensitive information in a reused Lambda execution environment.
    source: https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#best-practices
  - id: pipeline-result
    text: A CodePipeline Lambda action reports its job result using PutJobSuccessResult or PutJobFailureResult.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html#actions-invoke-lambda-function-create-function
  - id: pipeline-sensitive-event
    text: A CodePipeline Lambda event can contain temporary artifact credentials and must not be logged in full.
    source: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-invoke-lambda-function.html
  - id: powertools-idempotency
    text: Powertools for AWS Lambda provides an idempotency utility with persistent results, concurrency handling, and expiration of in-progress executions.
    source: https://docs.aws.amazon.com/powertools/python/latest/utilities/idempotency/
diagrams:
  - id: lambda-idempotency-sequence
    title: Claim an operation before doing work and saving its result
    width: 850
    height: 330
    nodes:
      - id: function
        label: Lambda
        icon: lambda
        x: 30
        y: 110
        w: 170
        h: 72
        tone: compute
      - id: lock
        label: Claim key
        icon: dynamodb
        x: 300
        y: 30
        w: 170
        h: 72
        tone: database
      - id: work
        label: Business action
        icon: res-client
        x: 590
        y: 110
        w: 170
        h: 72
        tone: user
      - id: result
        label: Save result
        icon: dynamodb
        x: 300
        y: 220
        w: 170
        h: 72
        tone: database
    edges:
      - from: function
        to: lock
        step: 1
        label: claim
      - from: lock
        to: work
        step: 2
        label: process
      - from: work
        to: result
        step: 3
        label: complete
    steps:
      - Use the stable operation key to acquire a persistent lock before processing.
      - Perform the business action only after claiming the operation.
      - Save the completed result so a duplicate can return it; handle failure between the action and this save.
cards:
  - id: lambda-017
    q: How should a Lambda automation prevent duplicate events from repeating a business operation?
    a: Use a stable idempotency key and persistent state, such as DynamoDB, to recognize completed operations. Protect concurrent attempts with a lock; make individual side effects safe to retry.
    facts:
      - idempotent
      - stable-key
      - persistent-result
      - concurrent-lock
      - partial-side-effects
  - id: lambda-034
    q: Two Lambda invocations receive the same business event at nearly the same time. Why is checking a completed-event table insufficient by itself?
    a: Both can see no completed record before either writes it. Acquire an idempotency lock before processing, or use an idempotency utility that handles concurrent attempts.
    facts:
      - concurrent-lock
      - powertools-idempotency
  - id: lambda-035
    q: A Lambda function repeatedly creates SDK clients and database connections. How can it reduce repeated setup?
    a: Initialize clients and connections outside the handler so invocations in a reused execution environment can reuse them.
    facts:
      - reuse-clients
  - id: lambda-036
    q: A Lambda automation keeps processed-event IDs only in memory or /tmp. Is that a reliable duplicate-processing guard?
    a: No. Local reuse applies only within the same execution environment. Store idempotency state in persistent storage such as DynamoDB.
    trap: true
    facts:
      - reuse-cache
      - persistent-result
  - id: lambda-037
    q: A Lambda action returns normally, but its CodePipeline action does not complete. What must the handler report?
    a: Call PutJobSuccessResult or PutJobFailureResult for the job. Do not log the entire event because it can include temporary artifact credentials.
    facts:
      - pipeline-result
      - pipeline-sensitive-event
---
Idempotent automation can process the same request repeatedly without creating extra business effects. Lambda retries and duplicate delivery make this necessary: a repeated event must not create an extra order or repeat a completed update.

### How it works

1. Validate the event and choose a stable idempotency key, an identifier for the intended business operation. Do not let changing timestamps or random input fields create a new key for the same operation.
2. Store the key in persistent storage such as DynamoDB. Acquire a lock before processing so two invocations cannot both treat the operation as new. Powertools for AWS Lambda provides an idempotency utility that handles persistent results, concurrent attempts, and in-progress expiration.
3. Perform the operation and save its completed result. A duplicate can return that result. A DynamoDB conditional write, an update performed only when a condition matches, can make a state change safe to repeat when the condition checks the attribute being changed.
4. Account for failure after a side effect but before the completed result is saved. A lock or completed-event table alone does not make every external action safe to repeat.
5. Initialize software development kit (SDK) clients and database connections outside the handler. Reused environments can reuse them and static files in `/tmp`; keep durable idempotency state in persistent storage and avoid retaining user or security-sensitive data locally.
6. When Lambda implements a CodePipeline action, call `PutJobSuccessResult` or `PutJobFailureResult` to report the job result. Do not log the full event, which can contain temporary artifact credentials.

### Exam cues

- If the question says a retried Lambda event repeats a completed update, think stable idempotency keys and persistent results, because delivery can repeat.
- If the question says simultaneous duplicates pass the completed-event check, think an early idempotency lock, because both requests can observe an absent record.
- If the question says SDK setup repeats on every invocation, think initialization outside the handler, because reused environments retain reusable clients.
- If the question says a successful Lambda action leaves CodePipeline waiting, think explicit job-result reporting, because returning from the handler does not report the pipeline job result.

### Remember

- Idempotency describes the business effect, not whether the handler executes again.
- Cache reuse is limited to the execution environment that holds the cache.
- A result saved after an external side effect leaves a failure window that must be handled.

> **Trap:** Disabling retries does not establish idempotency. Duplicate input still needs a stable identity and durable handling.
