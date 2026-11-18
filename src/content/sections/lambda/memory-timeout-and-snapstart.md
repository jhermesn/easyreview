---
title: Memory, timeout and SnapStart
level: associate
order: 90
facts:
  - id: memory-range
    text: A Lambda function's memory can be set from 128 MB (the default) to 10,240 MB in 1 MB steps.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html
  - id: memory-cpu
    text: Lambda allocates CPU power in proportion to configured memory, so memory is the main lever for function performance.
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html
  - id: timeout
    text: A Lambda function's timeout defaults to 3 seconds and can be set from 1 to 900 seconds (15 minutes).
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html
  - id: snapstart
    text: Lambda SnapStart cuts cold start latency, often to under a second, by initializing the function when you publish a version and resuming later invocations from a cached snapshot.
    source: https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html#snapstart
  - id: snapstart-runtimes
    text: SnapStart supports Java 11 and later, Python 3.12 and later, and .NET 8 and later managed runtimes.
    source: https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html#snapstart-runtimes
  - id: ephemeral-storage
    text: "Lambda /tmp ephemeral storage is configurable from 512 MB to 10,240 MB, is unique to each execution environment and is encrypted at rest."
    source: https://docs.aws.amazon.com/lambda/latest/dg/configuration-ephemeral-storage.html#configuration-ephemeral-storage
cards:
  - id: lambda-060
    q: A CPU-bound Lambda function at 512 MB runs slowly, and its memory use is low. Which setting speeds it up?
    a: "Raise the function's **memory**: Lambda gives CPU in proportion to memory (128 MB to 10,240 MB)."
    trap: true
    facts: [memory-cpu, memory-range]
  - id: lambda-061
    q: A batch job takes about 25 minutes per run. Can it run as one AWS Lambda invocation?
    a: "No. The Lambda timeout maximum is 900 seconds (15 minutes); use AWS Batch, ECS or Fargate, or split the work with Step Functions."
    trap: true
    facts: [timeout]
  - id: lambda-062
    q: A Java Lambda function behind API Gateway has multi-second cold starts. Which Lambda feature reduces them without paying for idle capacity?
    a: "**Lambda SnapStart**, which resumes from a snapshot taken when the version is published (provisioned concurrency also works, at a cost)."
    facts: [snapstart, snapstart-runtimes]
  - id: lambda-063
    q: What are the default and maximum timeout for an AWS Lambda function?
    a: "Default 3 seconds; maximum 900 seconds (15 minutes)."
    facts: [timeout]
  - id: lambda-066
    q: "A containerized Lambda function needs 5 GB of scratch space during each run. Does it need EFS?"
    a: "No. Set the function ephemeral storage (/tmp) to at least 5 GB; it goes up to 10,240 MB. EFS is for data that must persist or be shared."
    facts: [ephemeral-storage]
---
Lambda sizing has one main dial: memory, which also sets CPU. Timeout caps how long a run can take, and SnapStart cuts cold starts for supported runtimes. [Configure Lambda function memory](https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html)

### How it works

1. Set memory between 128 MB and 10,240 MB; CPU grows with it.
2. Set a timeout up to 15 minutes; a run that exceeds it is stopped.
3. For Java, Python or .NET, enable SnapStart on published versions: Lambda initializes once and resumes later cold starts from a snapshot.

### Exam cues

- If the question says a Lambda function is slow or CPU-bound, think more memory.
- If the question says a task runs longer than 15 minutes, think Batch, ECS or Fargate, or Step Functions instead of one Lambda invocation.
- If the question says cold starts for Java functions, think SnapStart (or provisioned concurrency).

### Remember

- Memory 128 MB to 10,240 MB; CPU proportional.
- Timeout default 3 seconds, maximum 900 seconds.
- SnapStart: Java 11+, Python 3.12+, .NET 8+.

> **Trap:** Lambda has no separate CPU setting. To get more CPU, raise memory.
