---
title: Operational controls and failure handling
level: professional
order: 100
facts:
  - id: dest-failures
    text: DestinationDeliveryFailures reports failed delivery of invocation records, including permission, size, and unsupported-target errors.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-retain-records
  - id: dest-permissions
    text: The function execution role needs permission to deliver to its destination, such as sqs:SendMessage or sns:Publish.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#destinations-permissions
  - id: sns-record-size
    text: SNS destination messages are limited to 256 KB by default, so an invocation record containing a large asynchronous payload can fail delivery.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-destinations
  - id: dest-s3
    text: An S3 bucket is supported as an asynchronous on-failure destination only.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-async-destinations
  - id: s3-destination-permissions
    text: An S3 failure destination needs s3:PutObject and s3:ListBucket on the execution role; a bucket encrypted with a KMS key also requires kms:GenerateDataKey.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#destinations-permissions
  - id: async-config
    text: MaximumRetryAttempts controls asynchronous function-error retries and accepts 0 through 2.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-configuring.html#invocation-async-configuring
  - id: async-system-retries
    text: Lambda retries asynchronous throttles and system errors for up to six hours by default, with exponential backoff from one second to five minutes.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-error-handling.html#invocation-async-error-handling
  - id: async-age
    text: MaximumEventAgeInSeconds limits time in the asynchronous queue to at most six hours.
    source: https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-configuring.html#invocation-async-configuring
  - id: alb-multivalue
    text: Enabling lambda.multi_value_headers.enabled on the ALB target group preserves repeated headers and query parameters as arrays; responses must then use multiValueHeaders.
    source: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html#multi-value-headers
  - id: extensions
    text: An external Lambda extension is a separate process in the execution environment; an internal extension runs within the runtime process.
    source: https://docs.aws.amazon.com/lambda/latest/dg/lambda-extensions.html#lambda-extensions
  - id: sqs-partial
    text: Enable ReportBatchItemFailures in FunctionResponseTypes and return failed SQS message IDs as itemIdentifier entries in batchItemFailures to retry only failed messages.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-errorhandling
  - id: sqs-fifo-partial
    text: For SQS FIFO partial responses, stop after the first failure and return failed and unprocessed messages to preserve order.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-errorhandling
  - id: sqs-visibility
    text: AWS recommends SQS visibility timeout of at least six times the function timeout plus MaximumBatchingWindowInSeconds.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html#services-sqs-configure
  - id: sqs-throw
    text: Throwing an exception from a Lambda SQS handler makes the entire batch fail even when partial responses are enabled.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-errorhandling
  - id: parallel-factor
    text: ParallelizationFactor can increase concurrent batches per Kinesis shard from the default 1 to 10, while preserving partition-key ordering.
    source: https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html#with-kinesis
  - id: sqs-partial-scaling
    text: With ReportBatchItemFailures enabled, Lambda does not scale down SQS message polling when function invocations fail.
    source: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html#services-sqs-batchfailurereporting
  - id: eni-reuse
    text: Lambda shares Hyperplane network interfaces among functions in the same account that use the same subnet and security-group combination.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#configuration-vpc-enis
cards:
  - id: lambda-025
    q: A Lambda on-failure destination receives no records after its permissions change. What should the team inspect?
    a: Inspect DestinationDeliveryFailures and the function execution role permission to send to the target. Destination delivery itself can fail.
    facts:
      - dest-failures
      - dest-permissions
  - id: lambda-052
    q: Large asynchronous Lambda failure records exceed the SNS destination message limit. Which destination can retain them, and what permissions does it need?
    a: Use an S3 on-failure destination. Grant the execution role `s3:PutObject` and `s3:ListBucket`; a KMS-encrypted bucket also needs `kms:GenerateDataKey`.
    facts:
      - sns-record-size
      - dest-s3
      - s3-destination-permissions
  - id: lambda-019
    q: A Lambda function has MaximumRetryAttempts set to 0, but asynchronous events still wait during throttling. Why?
    a: The setting controls function-error retries. Throttles and system errors use a separate retry path, bounded by event age, with a six-hour default.
    trap: true
    facts:
      - async-config
      - async-system-retries
      - async-age
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
  - id: lambda-002
    q: A Lambda SQS consumer reprocesses successful messages after one message fails. What settings and response should it use?
    a: Enable ReportBatchItemFailures and return failed message IDs in batchItemFailures. For FIFO, stop at the first failure and also return unprocessed messages. AWS recommends visibility timeout of at least six times function timeout plus the batching window.
    facts:
      - sqs-partial
      - sqs-fifo-partial
      - sqs-visibility
  - id: lambda-003
    q: A Lambda consumer retries an entire SQS batch after one record fails. How can it avoid retrying successful records?
    a: Enable ReportBatchItemFailures in the mapping FunctionResponseTypes and return failed message IDs as itemIdentifier entries in batchItemFailures.
    facts:
      - sqs-partial
  - id: lambda-009
    q: A Lambda SQS consumer enables ReportBatchItemFailures but throws an exception after processing part of the batch. What is retried?
    a: The entire batch fails. Catch item-level errors and return a partial response with failed message IDs to preserve successful results.
    facts:
      - sqs-throw
      - sqs-partial
  - id: lambda-039
    q: A Lambda Kinesis consumer needs more parallel work per shard while retaining partition-key order. What setting applies?
    a: ParallelizationFactor, from 1 by default through 10 concurrent batches per shard.
    facts:
      - parallel-factor
  - id: lambda-053
    q: An SQS queue feeds Lambda and some messages routinely fail. How can the team avoid retrying successful messages without reducing polling on failures?
    a: Enable `ReportBatchItemFailures` and return failed message IDs. Lambda does not scale down polling on function failures with that setting enabled.
    facts:
      - sqs-partial
      - sqs-partial-scaling
  - id: lambda-047
    q: Several Lambda functions use the same subnet and security groups. Does Lambda need a separate network interface for every function?
    a: No. Functions in the same account can share a Hyperplane ENI when they use the same combination of subnet and security group.
    trap: true
    facts:
      - eni-reuse
---
Lambda operational settings control how asynchronous errors are retried, how failed records are delivered, and how queue and stream consumers handle batches. These controls also help diagnose delivery, networking, and integration issues.

### How it works

1. For asynchronous function errors, set `MaximumRetryAttempts` from 0 to 2. `MaximumEventAgeInSeconds` limits queue age to at most six hours. Throttles and system errors follow a separate retry path with exponential backoff.
2. If a destination receives no invocation records, check `DestinationDeliveryFailures` and the execution role permissions. Delivery can fail because of permissions, record size, or an unsupported target.
3. An S3 destination is available for failures, including large records that exceed the SNS message limit. Its execution role needs `s3:PutObject` and `s3:ListBucket`; a KMS-encrypted bucket also needs `kms:GenerateDataKey`.
4. For SQS partial batch responses, enable `ReportBatchItemFailures` in `FunctionResponseTypes` and return failed message IDs as `itemIdentifier` entries in `batchItemFailures`. For FIFO (first-in, first-out), stop at the first failure and return failed and unprocessed messages. Throwing an exception fails the entire batch. With this setting enabled, Lambda does not scale down polling when function invocations fail.
5. Set the SQS visibility timeout to at least six times the function timeout plus `MaximumBatchingWindowInSeconds`, as AWS recommends. For Kinesis, `ParallelizationFactor` increases concurrent batches per shard while preserving partition-key order.
6. For an Application Load Balancer (ALB) Lambda target, enable multi-value headers to preserve repeated headers and query parameters as arrays. The response must then use `multiValueHeaders`.
7. An external extension runs as a separate process in the execution environment; an internal extension runs inside the runtime process. Lambda can also share Hyperplane network interfaces between functions in the same account that use the same subnet and security-group combination.

### Exam cues

- If the question says events still wait after function-error retries are disabled, think throttling or system errors, because they use a separate retry path.
- If the question says a destination stopped receiving records after a permissions change, think `DestinationDeliveryFailures` and the execution role, because delivery can fail independently.
- If the question says successful SQS messages are retried with failed ones, think partial batch responses, because the handler can report failed IDs.
- If the question says a Kinesis consumer needs more concurrent batches per shard while retaining partition-key order, think `ParallelizationFactor`, because it controls that concurrency.
- If the question says an ALB loses repeated query parameters, think multi-value headers, because the setting preserves them as arrays.
- If the question says functions in one account use the same subnet and security groups, think Hyperplane interface reuse, because they can share an interface.

### Remember

- Asynchronous throttles and system errors retry for up to six hours by default, with backoff from one second to five minutes.
- SNS destination messages have a 256 KB default limit; S3 is an asynchronous on-failure destination only.
- SQS visibility timeout recommendation: at least `6 × function timeout + batching window`.
- Kinesis `ParallelizationFactor`: 1 by default, up to 10 concurrent batches per shard.

> **Trap:** Setting `MaximumRetryAttempts` to 0 stops function-error retries, but does not disable the separate retry path for asynchronous throttles and system errors. An SQS handler that throws an exception also fails the whole batch, even with partial responses enabled.
